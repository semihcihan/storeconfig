import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import {
  AppStoreModelSchema,
  InAppPurchaseSchema,
  SubscriptionGroupSchema,
  SubscriptionOfferDurationSchema,
  SubscriptionSchema,
} from "../models/app-store";
import { z } from "zod";
import { api } from "../services/api";
import type { components } from "../generated/app-store-connect-api";
import { TerritoryCodeSchema } from "../models/territories";
import { LocaleCodeSchema } from "../models/locales";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchase = z.infer<typeof InAppPurchaseSchema>;
type SubscriptionGroup = z.infer<typeof SubscriptionGroupSchema>;
type Subscription = z.infer<typeof SubscriptionSchema>;

type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchaseLocalization =
  components["schemas"]["InAppPurchaseLocalization"];
type InAppPurchasePriceSchedule =
  components["schemas"]["InAppPurchasePriceSchedule"];
type APISubscriptionGroup = components["schemas"]["SubscriptionGroup"];
type APISubscription = components["schemas"]["Subscription"];
type APISubscriptionGroupLocalization =
  components["schemas"]["SubscriptionGroupLocalization"];
type APISubscriptionLocalization =
  components["schemas"]["SubscriptionLocalization"];
type APIIntroductoryOffer =
  components["schemas"]["SubscriptionIntroductoryOffer"];
type APIPromotionalOffer =
  components["schemas"]["SubscriptionPromotionalOffer"];
type APISubscriptionAvailability =
  components["schemas"]["SubscriptionAvailability"];
type InAppPurchaseAvailability =
  components["schemas"]["InAppPurchaseAvailability"];
type APISubscriptionPrice = components["schemas"]["SubscriptionPrice"];
type APISubscriptionPricesResponse =
  components["schemas"]["SubscriptionPricesResponse"];
type APISubscriptionPricePoint =
  components["schemas"]["SubscriptionPricePoint"];

async function fetchInAppPurchases(appId: string) {
  const include: (
    | "inAppPurchaseLocalizations"
    | "iapPriceSchedule"
    | "inAppPurchaseAvailability"
  )[] = [
    "inAppPurchaseLocalizations",
    "iapPriceSchedule",
    "inAppPurchaseAvailability",
  ];

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
        "fields[inAppPurchaseLocalizations]": fieldsInAppPurchaseLocalizations,
        "fields[inAppPurchaseAvailabilities]": [
          "availableInNewTerritories",
          "availableTerritories",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchInAppPurchaseAvailabilityTerritories(
  availabilityId: string
) {
  const response = await api.GET(
    "/v1/inAppPurchaseAvailabilities/{id}/availableTerritories",
    {
      params: { path: { id: availabilityId }, query: { limit: 200 } },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionAvailabilityTerritories(
  availabilityId: string
) {
  const response = await api.GET(
    "/v1/subscriptionAvailabilities/{id}/availableTerritories",
    {
      params: { path: { id: availabilityId }, query: { limit: 200 } },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionAvailability(subscriptionId: string) {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionAvailability",
    {
      params: {
        path: { id: subscriptionId },
      },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionLocalizations(subscriptionId: string) {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionLocalizations",
    {
      params: { path: { id: subscriptionId }, query: { limit: 50 } },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionIntroductoryOffers(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/introductoryOffers", {
    params: {
      path: { id: subscriptionId },
      query: { limit: 50, include: ["territory"] },
    },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionPromotionalOffers(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/promotionalOffers", {
    params: { path: { id: subscriptionId }, query: { limit: 50 } },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionPrices(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/prices", {
    params: {
      path: { id: subscriptionId },
      query: {
        limit: 100,
        include: ["territory", "subscriptionPricePoint"],
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

async function fetchSubscriptionGroups(appId: string) {
  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: {
        limit: 50,
        include: ["subscriptions", "subscriptionGroupLocalizations"],
        "fields[subscriptions]": [
          "name",
          "productId",
          "subscriptionPeriod",
          "familySharable",
          "subscriptionLocalizations",
          "promotionalOffers",
          "introductoryOffers",
          "groupLevel",
        ],
        "fields[subscriptionGroupLocalizations]": [
          "name",
          "customAppName",
          "locale",
        ],
        "fields[subscriptionGroups]": [
          "referenceName",
          "subscriptions",
          "subscriptionGroupLocalizations",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

function processSubscriptionPriceResponse(
  response: APISubscriptionPricesResponse
): { price: string; territory: z.infer<typeof TerritoryCodeSchema> }[] {
  if (!response || !response.included) {
    return [];
  }

  const includedById = (response.included || []).reduce(
    (map: any, item: any) => {
      map[`${item.type}-${item.id}`] = item;
      return map;
    },
    {}
  );

  const prices: {
    price: string;
    territory: z.infer<typeof TerritoryCodeSchema>;
  }[] = [];
  for (const priceData of response.data) {
    const priceRel = priceData.relationships?.subscriptionPricePoint?.data;
    const territoryRel = priceData.relationships?.territory?.data;
    if (priceRel && territoryRel) {
      const pricePoint = includedById[
        `${priceRel.type}-${priceRel.id}`
      ] as APISubscriptionPricePoint;
      const territory = includedById[`${territoryRel.type}-${territoryRel.id}`];

      if (pricePoint && pricePoint.attributes && territory) {
        const territoryParseResult = TerritoryCodeSchema.safeParse(
          territory.id
        );
        if (
          territoryParseResult.success &&
          pricePoint.attributes.customerPrice
        ) {
          prices.push({
            price: pricePoint.attributes.customerPrice,
            territory: territoryParseResult.data,
          });
        }
      }
    }
  }
  return prices;
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

function mapLocalizations(
  localizationRels:
    | { id: string; type: "inAppPurchaseLocalizations" }[]
    | undefined,
  includedById: any
): {
  locale: z.infer<typeof LocaleCodeSchema>;
  name: string;
  description: string;
}[] {
  if (!localizationRels) {
    return [];
  }
  return (
    localizationRels
      .map((rel) => {
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
          logger.warn(`Invalid locale code: ${locale}. Skipping.`);
          return null;
        }
        return {
          locale: localeParseResult.data,
          name: locData.attributes?.name || "",
          description: locData.attributes?.description || "",
        };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null) || []
  );
}

async function fetchBaseTerritory(priceScheduleId: string) {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/baseTerritory",
    {
      params: { path: { id: priceScheduleId } },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAndMapIAPPrices(
  priceScheduleRel:
    | { id: string; type: "inAppPurchasePriceSchedules" }
    | undefined,
  includedById: any
): Promise<InAppPurchase["priceSchedule"]> {
  let prices: {
    price: string;
    territory: z.infer<typeof TerritoryCodeSchema>;
  }[] = [];
  let baseTerritory: z.infer<typeof TerritoryCodeSchema> = "USA";

  if (priceScheduleRel) {
    const baseTerritoryResponse = await fetchBaseTerritory(priceScheduleRel.id);
    if (baseTerritoryResponse.data) {
      const territoryParseResult = TerritoryCodeSchema.safeParse(
        baseTerritoryResponse.data.id
      );
      if (territoryParseResult.success) {
        baseTerritory = territoryParseResult.data;
      }
    }

    const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
      fetchManualPrices(priceScheduleRel.id),
      fetchAutomaticPrices(priceScheduleRel.id, baseTerritory),
    ]);

    const manualPrices = processPriceResponse(manualPricesResponse);
    const automaticPrices = processPriceResponse(automaticPricesResponse);

    prices = [...manualPrices, ...automaticPrices];
  }

  return { baseTerritory, prices };
}

async function fetchAndMapSubscriptionPrices(
  subscription: APISubscription
): Promise<Subscription["priceSchedule"]> {
  if (!subscription.id) {
    logger.warn(`Subscription has no ID. Cannot fetch prices.`);
    return { baseTerritory: "USA", prices: [] };
  }
  const pricesResponse = await fetchSubscriptionPrices(subscription.id);
  const prices = processSubscriptionPriceResponse(pricesResponse);
  return { baseTerritory: "USA", prices };
}

async function mapInAppPurchaseAvailability(
  availabilityRel:
    | { id: string; type: "inAppPurchaseAvailabilities" }
    | undefined,
  includedById: any
): Promise<{
  availableInNewTerritories: boolean;
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
}> {
  if (!availabilityRel) {
    return {
      availableInNewTerritories: true,
      availableTerritories: [],
    };
  }
  const availability = includedById[
    `${availabilityRel.type}-${availabilityRel.id}`
  ] as InAppPurchaseAvailability;

  if (!availability) {
    return {
      availableInNewTerritories: true,
      availableTerritories: [],
    };
  }

  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

  const territoriesResponse = await fetchInAppPurchaseAvailabilityTerritories(
    availability.id
  );
  const territoryRels = territoriesResponse.data;

  if (!territoryRels) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const availableTerritories = territoryRels
    .map((rel) => {
      const territoryParseResult = TerritoryCodeSchema.safeParse(rel.id);
      if (!territoryParseResult.success) {
        logger.warn(`Invalid territory code from availability: ${rel.id}`);
        return null;
      }
      return territoryParseResult.data;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

async function mapSubscriptionAvailability(
  response: components["schemas"]["SubscriptionAvailabilityResponse"]
): Promise<{
  availableInNewTerritories: boolean;
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
}> {
  const availability = response.data;
  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

  if (!availability.id) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const territoriesResponse = await fetchSubscriptionAvailabilityTerritories(
    availability.id
  );
  const territoryRels = territoriesResponse.data;

  if (!territoryRels) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const availableTerritories = territoryRels
    .map((rel) => {
      const territoryParseResult = TerritoryCodeSchema.safeParse(rel.id);
      if (!territoryParseResult.success) {
        logger.warn(`Invalid territory code from availability: ${rel.id}`);
        return null;
      }
      return territoryParseResult.data;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

async function mapInAppPurchases(
  data: InAppPurchasesV2Response
): Promise<InAppPurchase[]> {
  const includedById = (data.included || []).reduce((map, item) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {} as any);

  const iaps = await Promise.all(
    (data.data || []).map(async (iap): Promise<InAppPurchase | null> => {
      const localizations = mapLocalizations(
        iap.relationships?.inAppPurchaseLocalizations?.data,
        includedById
      );

      const priceSchedule = await fetchAndMapIAPPrices(
        iap.relationships?.iapPriceSchedule?.data,
        includedById
      );

      const availability = await mapInAppPurchaseAvailability(
        iap.relationships?.inAppPurchaseAvailability?.data,
        includedById
      );

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
        priceSchedule: priceSchedule,
        availability: availability,
      };
    })
  );

  return iaps.filter((iap): iap is NonNullable<typeof iap> => iap !== null);
}

function mapSubscriptionLocalizations(
  response: components["schemas"]["SubscriptionLocalizationsResponse"]
): Subscription["localizations"] {
  return (response.data || []).map((loc) => {
    const localeParseResult = LocaleCodeSchema.safeParse(
      loc.attributes?.locale
    );
    return {
      locale: localeParseResult.success ? localeParseResult.data : "en-US",
      name: loc.attributes?.name || "",
      description: loc.attributes?.description || "",
    };
  });
}

async function mapIntroductoryOffers(
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<Subscription["introductoryOffers"]> {
  const includedById = (response.included || []).reduce((map, item) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {} as any);

  const offers = await Promise.all(
    (response.data || []).map(async (offerData) => {
      if (!offerData.attributes) return null;

      const territoryId = offerData.relationships?.territory?.data?.id;
      const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
      if (!territoryParseResult.success) {
        logger.warn(
          `Invalid territory code for introductory offer: ${territoryId}`
        );
        return null;
      }

      const offerType = offerData.attributes?.offerMode;
      const durationInfo = parseOfferDuration(offerData.attributes);

      const priceSchedule = {
        baseTerritory: territoryParseResult.data,
        prices: [],
      };

      if (
        offerType === "PAY_AS_YOU_GO" &&
        "numberOfPeriods" in durationInfo &&
        durationInfo.numberOfPeriods
      ) {
        return {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: durationInfo.numberOfPeriods,
          priceSchedule: priceSchedule,
        };
      } else if (
        offerType === "PAY_UP_FRONT" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          type: "PAY_UP_FRONT" as const,
          duration: durationInfo.duration,
          priceSchedule: priceSchedule,
        };
      } else if (
        offerType === "FREE_TRIAL" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          type: "FREE" as const,
          duration: durationInfo.duration,
        };
      }
      return null;
    })
  );

  return offers.filter((o): o is NonNullable<typeof o> => o !== null);
}

async function mapPromotionalOffers(
  response: components["schemas"]["SubscriptionPromotionalOffersResponse"]
): Promise<Subscription["promotionalOffers"]> {
  if (!response.data) {
    return [];
  }

  const offers = await Promise.all(
    response.data.map(async (offerData) => {
      if (!offerData?.attributes) return null;

      const offerType = offerData.attributes?.offerMode;
      const durationInfo = parseOfferDuration(offerData.attributes);

      // TODO: Fetch price schedule for each offer
      const priceSchedule = {
        baseTerritory: "USA" as const, // Placeholder
        prices: [],
      };

      const baseOffer = {
        id: offerData.id,
        referenceName: offerData.attributes.name || "",
      };

      if (
        offerType === "PAY_AS_YOU_GO" &&
        "numberOfPeriods" in durationInfo &&
        durationInfo.numberOfPeriods
      ) {
        return {
          ...baseOffer,
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: durationInfo.numberOfPeriods,
          priceSchedule: priceSchedule,
        };
      } else if (
        offerType === "PAY_UP_FRONT" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          ...baseOffer,
          type: "PAY_UP_FRONT" as const,
          duration: durationInfo.duration,
          priceSchedule: priceSchedule,
        };
      } else if (
        offerType === "FREE_TRIAL" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          ...baseOffer,
          type: "FREE" as const,
          duration: durationInfo.duration,
        };
      }
      return null;
    })
  );

  return offers.filter((o): o is NonNullable<typeof o> => o !== null);
}

async function mapSubscriptionGroups(
  data: components["schemas"]["SubscriptionGroupsResponse"],
  allIAPs: InAppPurchasesV2Response
): Promise<SubscriptionGroup[]> {
  const includedById = (data.included || []).reduce((map, item) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {} as any);

  const groups = await Promise.all(
    (data.data || []).map(async (group): Promise<SubscriptionGroup | null> => {
      const groupLocalizations = (
        group.relationships?.subscriptionGroupLocalizations?.data?.map(
          (rel) => {
            const locData = includedById[
              `${rel.type}-${rel.id}`
            ] as APISubscriptionGroupLocalization;
            if (!locData) return null;
            const locale = locData.attributes?.locale;
            const localeParseResult = LocaleCodeSchema.safeParse(locale);
            if (!localeParseResult.success) return null;
            return {
              locale: localeParseResult.data,
              name: locData.attributes?.name || "",
              customName: locData.attributes?.customAppName || null,
            };
          }
        ) || []
      ).filter((l): l is NonNullable<typeof l> => l !== null);

      const subscriptions = await Promise.all(
        (group.relationships?.subscriptions?.data || []).map(
          async (rel): Promise<Subscription | null> => {
            const subData = includedById[
              `${rel.type}-${rel.id}`
            ] as APISubscription;
            if (!subData) return null;

            const subscriptionPeriod = subData.attributes?.subscriptionPeriod;
            if (!subscriptionPeriod) {
              logger.warn(
                `Subscription ${subData.id} has no subscription period. Skipping.`
              );
              return null;
            }

            const [
              localizationsResponse,
              introductoryOffersResponse,
              promotionalOffersResponse,
              availabilityResponse,
            ] = await Promise.all([
              fetchSubscriptionLocalizations(subData.id),
              fetchSubscriptionIntroductoryOffers(subData.id),
              fetchSubscriptionPromotionalOffers(subData.id),
              fetchSubscriptionAvailability(subData.id),
            ]);

            const localizations = mapSubscriptionLocalizations(
              localizationsResponse
            );
            const introductoryOffers = await mapIntroductoryOffers(
              introductoryOffersResponse
            );
            const promotionalOffers = await mapPromotionalOffers(
              promotionalOffersResponse
            );
            const availability = await mapSubscriptionAvailability(
              availabilityResponse
            );

            const priceSchedule = await fetchAndMapSubscriptionPrices(subData);

            const sub: Subscription = {
              productId: subData.attributes?.productId || "",
              referenceName: subData.attributes?.name || "",
              groupLevel: subData.attributes?.groupLevel || 0,
              familySharable: subData.attributes?.familySharable || false,
              subscriptionPeriod: subscriptionPeriod,
              localizations: localizations,
              introductoryOffers: introductoryOffers,
              promotionalOffers: promotionalOffers,
              priceSchedule: priceSchedule,
              availability: availability,
            };
            return sub;
          }
        )
      );

      const result: SubscriptionGroup = {
        referenceName: group.attributes?.referenceName || "",
        localizations: groupLocalizations,
        subscriptions: subscriptions.filter(
          (s): s is NonNullable<typeof s> => s !== null
        ),
      };
      return result;
    })
  );
  return groups.filter((g): g is NonNullable<typeof g> => g !== null);
}

function parseOfferDuration(
  attributes:
    | APIIntroductoryOffer["attributes"]
    | APIPromotionalOffer["attributes"]
):
  | { duration: z.infer<typeof SubscriptionOfferDurationSchema> }
  | { numberOfPeriods: number }
  | {} {
  if (!attributes) return {};

  const { duration, numberOfPeriods, offerMode } = attributes as any;

  if (offerMode === "PAY_AS_YOU_GO" && numberOfPeriods && numberOfPeriods > 0) {
    return { numberOfPeriods: numberOfPeriods };
  }

  if (duration) {
    const durationMapping: {
      [key: string]: z.infer<typeof SubscriptionOfferDurationSchema>;
    } = {
      P3D: "THREE_DAYS",
      P7D: "ONE_WEEK",
      P14D: "TWO_WEEKS",
      P1M: "ONE_MONTH",
      P2M: "TWO_MONTHS",
      P3M: "THREE_MONTHS",
      P6M: "SIX_MONTHS",
      P1Y: "ONE_YEAR",
      THREE_DAYS: "THREE_DAYS",
      ONE_WEEK: "ONE_WEEK",
      TWO_WEEKS: "TWO_WEEKS",
      ONE_MONTH: "ONE_MONTH",
      TWO_MONTHS: "TWO_MONTHS",
      THREE_MONTHS: "THREE_MONTHS",
      SIX_MONTHS: "SIX_MONTHS",
      ONE_YEAR: "ONE_YEAR",
    };
    if (durationMapping[duration]) {
      return { duration: durationMapping[duration] };
    }
  }

  return {};
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
      const mappedSubscriptionGroups = await mapSubscriptionGroups(
        subscriptionGroupsData,
        inAppPurchasesData
      );

      const result: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: appId,
        inAppPurchases: mappedIAPs,
        subscriptionGroups: mappedSubscriptionGroups,
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
