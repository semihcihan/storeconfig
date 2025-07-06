import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";
import { api } from "../services/api";
import type { components } from "../generated/app-store-connect-api";
import { TerritoryCodeSchema } from "../models/territories";
import { LocaleCodeSchema } from "../models/locales";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchaseV2 = components["schemas"]["InAppPurchaseV2"];
type InAppPurchaseLocalization =
  components["schemas"]["InAppPurchaseLocalization"];
type InAppPurchasePrice = components["schemas"]["InAppPurchasePrice"];
type InAppPurchasePricePoint = components["schemas"]["InAppPurchasePricePoint"];
type InAppPurchasePricePointsResponse =
  components["schemas"]["InAppPurchasePricePointsResponse"];
type InAppPurchasePriceSchedule =
  components["schemas"]["InAppPurchasePriceSchedule"];
type Territory = components["schemas"]["Territory"];

async function fetchInAppPurchases(appId: string) {
  const include: ("inAppPurchaseLocalizations" | "iapPriceSchedule")[] = [
    "inAppPurchaseLocalizations",
    "iapPriceSchedule",
  ];

  const fieldsInAppPurchaces: (
    | "name"
    | "productId"
    | "inAppPurchaseType"
    | "reviewNote"
    | "familySharable"
    | "inAppPurchaseLocalizations"
    | "iapPriceSchedule"
  )[] = [
    "name",
    "productId",
    "inAppPurchaseType",
    "reviewNote",
    "familySharable",
    "inAppPurchaseLocalizations",
    "iapPriceSchedule",
  ];

  const fieldsInAppPurchasePriceSchedules: (
    | "manualPrices"
    | "baseTerritory"
  )[] = ["manualPrices", "baseTerritory"];

  const fieldsInAppPurchasePrices: (
    | "price"
    | "startDate"
    | "endDate"
    | "territory"
  )[] = ["price", "startDate", "endDate", "territory"];

  const fieldsInAppPurchaseLocalizations: (
    | "name"
    | "description"
    | "locale"
  )[] = ["name", "description", "locale"];

  const response = await api.GET("/v1/apps/{id}/inAppPurchasesV2", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: include,
        "fields[inAppPurchases]": fieldsInAppPurchaces,
        "fields[inAppPurchaseLocalizations]": fieldsInAppPurchaseLocalizations,
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchManualPrices(priceScheduleId: string) {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/manualPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 100,
          include: ["territory", "inAppPurchasePricePoint"],
          "fields[inAppPurchasePrices]": ["startDate", "territory"],
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAutomaticPrices(
  priceScheduleId: string,
  territoryId: string
) {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/automaticPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 1,
          include: ["territory", "inAppPurchasePricePoint"],
          "fields[inAppPurchasePrices]": ["startDate", "territory"],
          "filter[territory]": [territoryId],
        },
      },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

function processPriceResponse(
  response: any
): { price: string; territory: z.infer<typeof TerritoryCodeSchema> }[] {
  if (!response || !response.included) {
    return [];
  }

  return (response.included as any[])
    .filter((item) => item.type === "inAppPurchasePricePoints")
    .map((pricePoint) => {
      let territoryId: string | null = null;
      try {
        const decodedId = Buffer.from(pricePoint.id, "base64").toString(
          "utf-8"
        );
        const idParts = JSON.parse(decodedId);
        territoryId = idParts.t;
      } catch (e) {
        logger.warn(`Could not decode price point ID: ${pricePoint.id}`);
        return null;
      }

      if (!territoryId) return null;

      const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
      if (!territoryParseResult.success) {
        logger.warn(
          `Invalid territory code from price point ID: ${territoryId}`
        );
        return null;
      }

      return {
        price: pricePoint.attributes?.customerPrice || "",
        territory: territoryParseResult.data,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

async function mapInAppPurchases(
  data: InAppPurchasesV2Response
): Promise<AppStoreModel["inAppPurchases"]> {
  const includedById = (data.included || []).reduce((map, item) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {} as any);

  const iaps = await Promise.all(
    (data.data || []).map(async (iap) => {
      const localizationRels =
        iap.relationships?.inAppPurchaseLocalizations?.data;

      const localizations = (
        localizationRels?.map((rel) => {
          const locData = includedById[
            `${rel.type}-${rel.id}`
          ] as InAppPurchaseLocalization;
          if (!locData) {
            logger.warn(
              `  Could not find included data for localization ${rel.id}`
            );
            return null;
          }

          const locale = locData.attributes?.locale;
          const localeParseResult = LocaleCodeSchema.safeParse(locale);
          if (!localeParseResult.success) {
            logger.warn(`  Invalid locale code: ${locale}. Skipping.`);
            return null;
          }
          return {
            locale: localeParseResult.data,
            name: locData.attributes?.name || "",
            description: locData.attributes?.description || "",
          };
        }) || []
      ).filter((l): l is NonNullable<typeof l> => l !== null);

      let prices: {
        price: string;
        territory: z.infer<typeof TerritoryCodeSchema>;
      }[] = [];
      let baseTerritory: z.infer<typeof TerritoryCodeSchema> = "USA";

      const priceScheduleRel = iap.relationships?.iapPriceSchedule?.data;
      if (priceScheduleRel) {
        const priceSchedule = includedById[
          `${priceScheduleRel.type}-${priceScheduleRel.id}`
        ] as InAppPurchasePriceSchedule;
        const baseTerritoryRel =
          priceSchedule?.relationships?.baseTerritory?.data;
        if (baseTerritoryRel) {
          const territoryParseResult = TerritoryCodeSchema.safeParse(
            baseTerritoryRel.id
          );
          if (territoryParseResult.success) {
            baseTerritory = territoryParseResult.data;
          }
        }

        const [manualPricesResponse, automaticPricesResponse] =
          await Promise.all([
            fetchManualPrices(priceScheduleRel.id),
            fetchAutomaticPrices(priceScheduleRel.id, baseTerritory),
          ]);

        const manualPrices = processPriceResponse(manualPricesResponse);
        const automaticPrices = processPriceResponse(automaticPricesResponse);

        prices = [...manualPrices, ...automaticPrices];
      }

      return {
        productId: iap.attributes?.productId || "",
        type: iap.attributes?.inAppPurchaseType as
          | "CONSUMABLE"
          | "NON_CONSUMABLE"
          | "NON_RENEWING_SUBSCRIPTION",
        referenceName: iap.attributes?.name || "",
        familySharable: iap.attributes?.familySharable || false,
        reviewNote: iap.attributes?.reviewNote || "",
        localizations: localizations,
        priceSchedule: {
          baseTerritory: baseTerritory,
          prices: prices,
        },
      };
    })
  );

  return iaps;
}

async function fetchSubscriptionGroups(appId: string) {
  // Mock implementation
  logger.warn(
    "Subscription group fetching is not implemented. Using mock data."
  );
  return Promise.resolve([]);
}

function mapSubscriptionGroups(
  data: any[]
): AppStoreModel["subscriptionGroups"] {
  // Mock implementation
  return [];
}

const fetchCommand: CommandModule = {
  command: "fetch",
  describe:
    "Fetches IAPs and subscriptions from App Store Connect for a specific app.",
  builder: {
    id: {
      describe: "The App ID to fetch details for.",
      demandOption: true,
      type: "string",
    },
    file: {
      describe: "Path to the output JSON file.",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const appId = argv.id as string;
    const outputFile = argv.file as string;

    logger.info(
      `Fetching details for app ID: ${appId} and writing to ${outputFile}`
    );

    try {
      const inAppPurchasesData = await fetchInAppPurchases(appId);
      const subscriptionGroupsData = await fetchSubscriptionGroups(appId);
      const mappedIAPs = await mapInAppPurchases(inAppPurchasesData);

      const result: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: appId,
        inAppPurchases: mappedIAPs,
        subscriptionGroups: mapSubscriptionGroups(subscriptionGroupsData),
      };

      const parsedData = AppStoreModelSchema.parse(result);

      fs.writeFileSync(outputFile, JSON.stringify(parsedData, null, 2));

      logger.info(
        `Successfully fetched app details and wrote to ${outputFile}`
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Data validation failed:", error.errors);
      } else if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        (error as any).data?.errors
      ) {
        logger.error("Failed to fetch app details:");
        logger.error(
          "API Error:",
          JSON.stringify((error as any).data, null, 2)
        );
      } else if (error instanceof Error) {
        logger.error("An error occurred:", error.message);
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default fetchCommand;
