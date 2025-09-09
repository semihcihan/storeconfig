import { z } from "zod";
import { logger } from "@semihcihan/shared";
import { InAppPurchaseSchema, PriceSchema } from "@semihcihan/shared";
import { TerritoryCodeSchema } from "@semihcihan/shared";
import { LocaleCodeSchema } from "@semihcihan/shared";
import {
  createIncludedByIdMap,
  getIncludedResource,
  type IncludedByIdMap,
} from "../../helpers/relationship-helpers";
import { validateTerritoryCode } from "../../helpers/id-encoding-helpers";
import { isNotFoundError } from "@semihcihan/shared";
import { getMostRecentActivePrice } from "../../helpers/date-helpers";
import {
  fetchBaseTerritory,
  fetchManualPrices,
  fetchAutomaticPrices,
  fetchInAppPurchaseAvailability,
  fetchInAppPurchaseAvailabilityTerritories,
} from "./api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";

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
  if (!response?.data || !response?.included) {
    return [];
  }

  const territoryPriceMap = buildTerritoryPriceMap(response);
  return buildFinalPriceResult(territoryPriceMap);
}

function buildTerritoryPriceMap(response: InAppPurchasePricesResponse): Map<
  string,
  Array<{
    price: string;
    territory: string;
    startDate?: string;
    endDate?: string;
  }>
> {
  const territoryPriceMap = new Map<
    string,
    Array<{
      price: string;
      territory: string;
      startDate?: string;
      endDate?: string;
    }>
  >();

  const includedById = createIncludedByIdMap(response.included);

  for (const priceData of response.data) {
    const priceEntry = extractPriceEntry(priceData, includedById);
    if (!priceEntry) continue;

    if (!territoryPriceMap.has(priceEntry.territory)) {
      territoryPriceMap.set(priceEntry.territory, []);
    }
    territoryPriceMap.get(priceEntry.territory)!.push(priceEntry);
  }

  return territoryPriceMap;
}

function extractPriceEntry(
  priceData: components["schemas"]["InAppPurchasePrice"],
  includedById: IncludedByIdMap
): {
  price: string;
  territory: string;
  startDate?: string;
  endDate?: string;
} | null {
  const territory = findTerritory(priceData, includedById);
  if (!territory) return null;

  const pricePoint = findPricePoint(priceData, includedById);
  if (!pricePoint?.attributes?.customerPrice) return null;

  const territoryCode = validateTerritoryCode(territory.id);
  if (!territoryCode) return null;

  return {
    price: pricePoint.attributes.customerPrice,
    territory: territoryCode,
    startDate: priceData.attributes?.startDate,
    endDate: priceData.attributes?.endDate,
  };
}

function findTerritory(
  priceData: components["schemas"]["InAppPurchasePrice"],
  includedById: IncludedByIdMap
): components["schemas"]["Territory"] | null {
  const territoryRel = priceData.relationships?.territory?.data;
  if (!territoryRel) return null;

  return (
    getIncludedResource<components["schemas"]["Territory"]>(
      includedById,
      territoryRel.type,
      territoryRel.id
    ) || null
  );
}

function findPricePoint(
  priceData: components["schemas"]["InAppPurchasePrice"],
  includedById: IncludedByIdMap
): components["schemas"]["InAppPurchasePricePoint"] | null {
  const pricePointRel = priceData.relationships?.inAppPurchasePricePoint?.data;
  if (!pricePointRel) return null;

  return (
    getIncludedResource<components["schemas"]["InAppPurchasePricePoint"]>(
      includedById,
      pricePointRel.type,
      pricePointRel.id
    ) || null
  );
}

function buildFinalPriceResult(
  territoryPriceMap: Map<
    string,
    Array<{
      price: string;
      territory: string;
      startDate?: string;
      endDate?: string;
    }>
  >
): z.infer<typeof PriceSchema>[] {
  const result: z.infer<typeof PriceSchema>[] = [];

  for (const [territory, prices] of territoryPriceMap) {
    const activePrice = getMostRecentActivePrice(prices);
    if (activePrice) {
      result.push({
        price: activePrice.price,
        territory: activePrice.territory as z.infer<
          typeof PriceSchema
        >["territory"],
      });
    }
  }

  return result;
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
