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
import { validateTerritoryCode } from "../../helpers/id-encoding-helpers";
import { isNotFoundError } from "../../helpers/error-handling-helpers";
import {
  fetchBaseTerritory,
  fetchManualPrices,
  fetchAutomaticPrices,
  fetchInAppPurchaseAvailability,
  fetchInAppPurchaseAvailabilityTerritories,
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
    logger.debug("No response or included data, returning empty array");
    return [];
  }

  if (response.data && response.data.length > 0) {
    logger.debug("Attempting relationship-based price processing");
    const includedById = createIncludedByIdMap(response.included);

    const prices: z.infer<typeof PriceSchema>[] = [];
    for (const priceData of response.data) {
      const pricePointRel =
        priceData.relationships?.inAppPurchasePricePoint?.data;
      const territoryRel = priceData.relationships?.territory?.data;

      if (pricePointRel && territoryRel) {
        logger.debug(
          "Found both price point and territory relationships, using relationship-based approach"
        );

        const pricePoint = getIncludedResource<
          components["schemas"]["InAppPurchasePricePoint"]
        >(includedById, pricePointRel.type, pricePointRel.id);
        const territory = getIncludedResource<
          components["schemas"]["Territory"]
        >(includedById, territoryRel.type, territoryRel.id);

        if (pricePoint && pricePoint.attributes && territory) {
          const territoryCode = validateTerritoryCode(territory.id);
          if (territoryCode && pricePoint.attributes.customerPrice) {
            const priceEntry = {
              price: pricePoint.attributes.customerPrice,
              territory: territoryCode,
            };
            // logger.debug("Created price entry using relationships:", priceEntry);
            prices.push(priceEntry);
          }
        }
      } else {
        logger.debug(
          "Missing price point or territory relationship, skipping relationship-based approach"
        );
      }
    }

    if (prices.length > 0) {
      logger.debug(
        `Successfully processed ${prices.length} prices using relationship-based approach`
      );
      return prices;
    }
  }

  logger.debug("No prices found, returning empty array");
  return [];
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
            `Could not find included data for localization ${rel.id}`
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
    logger.debug("No price schedule relationship found");
    return undefined;
  }

  logger.debug(`Fetching price schedule for ID: ${priceScheduleRel.id}`);

  const baseTerritoryResponse = await fetchBaseTerritory(priceScheduleRel.id);
  if (!baseTerritoryResponse.data) {
    // No base territory means no valid price schedule
    throw new Error(
      `No base territory found for price schedule ${priceScheduleRel.id}`
    );
  }

  const territoryParseResult = TerritoryCodeSchema.safeParse(
    baseTerritoryResponse.data.id
  );
  if (!territoryParseResult.success) {
    // Invalid base territory means no valid price schedule
    logger.warn(`Invalid territory JSON:`, baseTerritoryResponse.data);
    return undefined;
  }

  const baseTerritory = territoryParseResult.data;
  logger.debug(`Base territory: ${baseTerritory}`);
  let prices: z.infer<typeof PriceSchema>[] = [];

  const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
    fetchManualPrices(priceScheduleRel.id),
    fetchAutomaticPrices(priceScheduleRel.id, baseTerritory),
  ]);

  const manualPrices = processPriceResponse(manualPricesResponse);
  const automaticPrices = processPriceResponse(automaticPricesResponse);

  prices = [...manualPrices, ...automaticPrices];

  logger.debug(`Found ${prices.length} prices:`, prices);

  // If we have a base territory but no prices, this is an incomplete price schedule
  // This commonly happens with IAPs in MISSING_METADATA state
  if (prices.length === 0) {
    logger.warn(
      `Incomplete price schedule (no prices found) - returning undefined`
    );
    return undefined;
  }

  // Ensure the base territory has a corresponding price
  const hasBaseTerritoryPrice = prices.some(
    (p) => p.territory === baseTerritory
  );
  if (!hasBaseTerritoryPrice) {
    logger.warn(
      `Base territory price ${baseTerritory} not found in prices`,
      prices
    );
    return undefined;
  }

  return { baseTerritory, prices };
}

// Map in-app purchase availability
export async function mapInAppPurchaseAvailability(
  iapId: string
): Promise<InAppPurchase["availability"]> {
  logger.debug(`Fetching availability for IAP ID: ${iapId}`);

  try {
    // First, fetch the availability data for the IAP
    const availabilityResponse = await fetchInAppPurchaseAvailability(iapId);

    if (!availabilityResponse.data) {
      logger.debug(`No availability data found for IAP ${iapId}`);
      return undefined;
    }

    logger.debug(
      `Availability attributes:`,
      availabilityResponse.data.attributes
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
              logger.warn(
                `Invalid territory code: ${territory.id}. Skipping.`,
                territoriesResponse.data
              );
              return null;
            }
            return territoryParseResult.data;
          })
          .filter((t): t is NonNullable<typeof t> => t !== null);
      }

      logger.debug(
        `Found ${availableTerritories.length} available territories:`,
        availableTerritories
      );
    } catch (territoryError) {
      const is404Error = isNotFoundError(territoryError);
      if (is404Error) {
        logger.debug(
          `No territories found for availability ${availabilityResponse.data.id}`
        );
        availableTerritories = [];
      } else {
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
      logger.debug(
        `No availability found for IAP ${iapId} (likely MISSING_METADATA state)`
      );
      return undefined;
    } else {
      throw error;
    }
  }
}

// Map single in-app purchase
export async function mapInAppPurchase(
  iap: InAppPurchaseV2,
  includedById: IncludedByIdMap
): Promise<InAppPurchase | null> {
  logger.debug(
    `Mapping IAP: ${iap.attributes?.productId} (${iap.attributes?.name}) - State: ${iap.attributes?.state}`
  );

  const localizations = mapLocalizations(
    iap.relationships?.inAppPurchaseLocalizations?.data,
    includedById
  );

  const [priceSchedule, availability] = await Promise.all([
    fetchAndMapIAPPrices(
      iap.relationships?.iapPriceSchedule?.data,
      includedById
    ),
    mapInAppPurchaseAvailability(iap.id),
  ]);

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

  logger.debug("Final IAP mapping:", {
    productId: mappedIAP.productId,
    hasLocalizations: mappedIAP.localizations.length > 0,
    hasPriceSchedule: !!mappedIAP.priceSchedule,
    hasAvailability: !!mappedIAP.availability,
  });

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
