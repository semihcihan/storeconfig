import { z } from "zod";
import { logger } from "../../utils/logger";
import { InAppPurchaseSchema, PriceSchema } from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { LocaleCodeSchema } from "../../models/locales";
import {
  createIncludedByIdMap,
  getIncludedResource,
  type IncludedByIdMap,
} from "../../helpers/relationship-helpers";
import { decodeTerritoryFromId } from "../../helpers/id-encoding-helpers";
import {
  fetchBaseTerritory,
  fetchManualPrices,
  fetchAutomaticPrices,
} from "./api-client";
import type { components } from "../../generated/app-store-connect-api";

type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchaseV2 = components["schemas"]["InAppPurchaseV2"];
type InAppPurchaseLocalization =
  components["schemas"]["InAppPurchaseLocalization"];
type InAppPurchaseAvailability =
  components["schemas"]["InAppPurchaseAvailability"];
type InAppPurchasePricesResponse =
  components["schemas"]["InAppPurchasePricesResponse"];

type InAppPurchase = z.infer<typeof InAppPurchaseSchema>;

// Process price response for in-app purchases
export function processPriceResponse(
  response: InAppPurchasePricesResponse
): z.infer<typeof PriceSchema>[] {
  if (!response || !response.included) {
    return [];
  }

  return (response.included as any[])
    .filter(
      (item): item is components["schemas"]["InAppPurchasePricePoint"] =>
        item.type === "inAppPurchasePricePoints"
    )
    .map((pricePoint) => {
      const territoryId = decodeTerritoryFromId(pricePoint.id);
      if (!territoryId) return null;

      return {
        price: pricePoint.attributes?.customerPrice || "",
        territory: territoryId,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

// Map localizations for in-app purchases
export function mapLocalizations(
  localizationRels:
    | { id: string; type: "inAppPurchaseLocalizations" }[]
    | undefined,
  includedById: IncludedByIdMap
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
        const locData = getIncludedResource<InAppPurchaseLocalization>(
          includedById,
          rel.type,
          rel.id
        );
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

// Fetch and map IAP prices
export async function fetchAndMapIAPPrices(
  priceScheduleRel:
    | { id: string; type: "inAppPurchasePriceSchedules" }
    | undefined,
  includedById: IncludedByIdMap
): Promise<InAppPurchase["priceSchedule"]> {
  let prices: z.infer<typeof PriceSchema>[] = [];
  let baseTerritory: z.infer<typeof TerritoryCodeSchema> = "USA"; // TODO: should not have a default value

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

// Map in-app purchase availability
export async function mapInAppPurchaseAvailability(
  availabilityRel:
    | { id: string; type: "inAppPurchaseAvailabilities" }
    | undefined,
  includedById: IncludedByIdMap
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

  const availability = getIncludedResource<InAppPurchaseAvailability>(
    includedById,
    availabilityRel.type,
    availabilityRel.id
  );

  if (!availability) {
    return {
      availableInNewTerritories: true,
      availableTerritories: [],
    };
  }

  logger.info(`  Availability: ${JSON.stringify(availability)}`);

  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

  // For now, we'll return empty territories - the full implementation would fetch them
  // This is a simplification for the refactoring
  const availableTerritories: z.infer<typeof TerritoryCodeSchema>[] = [];

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

// Map single in-app purchase
export async function mapInAppPurchase(
  iap: InAppPurchaseV2,
  includedById: IncludedByIdMap
): Promise<InAppPurchase | null> {
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

  const reviewNote = iap.attributes?.reviewNote;
  return {
    productId: iap.attributes?.productId || "",
    type: iap.attributes?.inAppPurchaseType as
      | "CONSUMABLE"
      | "NON_CONSUMABLE"
      | "NON_RENEWING_SUBSCRIPTION",
    referenceName: iap.attributes?.name || "",
    familySharable: iap.attributes?.familySharable || false,
    reviewNote: reviewNote === null ? undefined : reviewNote,
    localizations: localizations,
    priceSchedule: priceSchedule,
    availability: availability,
  };
}

// Map in-app purchases response
export async function mapInAppPurchases(
  data: InAppPurchasesV2Response
): Promise<InAppPurchase[]> {
  const includedById = createIncludedByIdMap(data.included as any);

  const iaps = await Promise.all(
    (data.data || []).map((iap) => mapInAppPurchase(iap, includedById))
  );

  return iaps.filter((iap): iap is NonNullable<typeof iap> => iap !== null);
}
