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
import { isNotFoundError } from "../../helpers/error-handling-helpers";
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
type InAppPurchaseType = components["schemas"]["InAppPurchaseType"];

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
  if (!priceScheduleRel) {
    // Return undefined when there's no price schedule (e.g., MISSING_METADATA state)
    logger.info(`  No price schedule relationship found`);
    return undefined;
  }

  logger.info(`  Fetching price schedule for ID: ${priceScheduleRel.id}`);

  const baseTerritoryResponse = await fetchBaseTerritory(priceScheduleRel.id);
  if (!baseTerritoryResponse.data) {
    // No base territory means no valid price schedule
    logger.info(
      `  No base territory found for price schedule ${priceScheduleRel.id}`
    );
    return undefined;
  }

  const territoryParseResult = TerritoryCodeSchema.safeParse(
    baseTerritoryResponse.data.id
  );
  if (!territoryParseResult.success) {
    // Invalid base territory means no valid price schedule
    logger.warn(`  Invalid base territory: ${baseTerritoryResponse.data.id}`);
    return undefined;
  }

  const baseTerritory = territoryParseResult.data;
  logger.info(`  Base territory: ${baseTerritory}`);
  let prices: z.infer<typeof PriceSchema>[] = [];

  const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
    fetchManualPrices(priceScheduleRel.id),
    fetchAutomaticPrices(priceScheduleRel.id, baseTerritory),
  ]);

  const manualPrices = processPriceResponse(manualPricesResponse);
  const automaticPrices = processPriceResponse(automaticPricesResponse);

  prices = [...manualPrices, ...automaticPrices];

  logger.info(`  Found ${prices.length} prices: ${JSON.stringify(prices)}`);

  // If we have a base territory but no prices, this is an incomplete price schedule
  // This commonly happens with IAPs in MISSING_METADATA state
  if (prices.length === 0) {
    logger.info(
      `  Incomplete price schedule (no prices found) - returning undefined`
    );
    return undefined;
  }

  // Ensure the base territory has a corresponding price
  const hasBaseTerritoryPrice = prices.some(
    (p) => p.territory === baseTerritory
  );
  if (!hasBaseTerritoryPrice) {
    logger.warn(
      `  Base territory ${baseTerritory} not found in prices - returning undefined`
    );
    return undefined;
  }

  return { baseTerritory, prices };
}

// Map in-app purchase availability
export async function mapInAppPurchaseAvailability(
  iapId: string
): Promise<InAppPurchase["availability"]> {
  logger.info(`  Fetching availability for IAP ID: ${iapId}`);

  try {
    const {
      fetchInAppPurchaseAvailability,
      fetchInAppPurchaseAvailabilityTerritories,
    } = await import("./api-client");

    // First, fetch the availability data for the IAP
    const availabilityResponse = await fetchInAppPurchaseAvailability(iapId);

    if (!availabilityResponse.data) {
      logger.info(`  No availability data found for IAP ${iapId}`);
      return undefined;
    }

    logger.info(
      `  Availability attributes: ${JSON.stringify(
        availabilityResponse.data.attributes
      )}`
    );

    const availableInNewTerritories =
      availabilityResponse.data.attributes?.availableInNewTerritories || false;

    // Fetch the actual territories using the availability ID
    let availableTerritories: z.infer<typeof TerritoryCodeSchema>[] = [];

    try {
      const territoriesResponse =
        await fetchInAppPurchaseAvailabilityTerritories(
          availabilityResponse.data.id
        );

      if (territoriesResponse.data) {
        availableTerritories = territoriesResponse.data
          .map((territory) => {
            const territoryParseResult = TerritoryCodeSchema.safeParse(
              territory.id
            );
            if (!territoryParseResult.success) {
              logger.warn(`Invalid territory code: ${territory.id}. Skipping.`);
              return null;
            }
            return territoryParseResult.data;
          })
          .filter((t): t is NonNullable<typeof t> => t !== null);
      }

      logger.info(
        `  Found ${
          availableTerritories.length
        } available territories: ${JSON.stringify(availableTerritories)}`
      );
    } catch (territoryError) {
      const is404Error = isNotFoundError(territoryError);
      if (is404Error) {
        logger.info(
          `  No territories found for availability ${availabilityResponse.data.id}`
        );
        availableTerritories = [];
      } else {
        logger.warn(
          `  Failed to fetch territories for availability ${availabilityResponse.data.id}: ${territoryError}`
        );
        throw territoryError;
      }
    }

    return {
      availableInNewTerritories,
      availableTerritories,
    };
  } catch (error) {
    const is404Error = isNotFoundError(error);
    if (is404Error) {
      logger.info(
        `  No availability found for IAP ${iapId} (likely MISSING_METADATA state)`
      );
      return undefined;
    } else {
      logger.warn(`  Failed to fetch availability for IAP ${iapId}: ${error}`);
      throw error;
    }
  }
}

// Map single in-app purchase
export async function mapInAppPurchase(
  iap: InAppPurchaseV2,
  includedById: IncludedByIdMap
): Promise<InAppPurchase | null> {
  logger.info(
    `Mapping IAP: ${iap.attributes?.productId} (${iap.attributes?.name}) - State: ${iap.attributes?.state}`
  );

  const localizations = mapLocalizations(
    iap.relationships?.inAppPurchaseLocalizations?.data,
    includedById
  );

  const priceSchedule = await fetchAndMapIAPPrices(
    iap.relationships?.iapPriceSchedule?.data,
    includedById
  );

  const availability = await mapInAppPurchaseAvailability(iap.id);

  const reviewNote = iap.attributes?.reviewNote;
  const mappedIAP = {
    productId: iap.attributes?.productId || "",
    type: iap.attributes?.inAppPurchaseType as InAppPurchaseType,
    referenceName: iap.attributes?.name || "",
    familySharable: iap.attributes?.familySharable || false,
    reviewNote: reviewNote === null ? undefined : reviewNote,
    localizations: localizations,
    priceSchedule: priceSchedule,
    availability: availability,
  };

  logger.info(
    `  Final IAP mapping: ${JSON.stringify({
      productId: mappedIAP.productId,
      hasLocalizations: mappedIAP.localizations.length > 0,
      hasPriceSchedule: !!mappedIAP.priceSchedule,
      hasAvailability: !!mappedIAP.availability,
    })}`
  );

  return mappedIAP;
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
