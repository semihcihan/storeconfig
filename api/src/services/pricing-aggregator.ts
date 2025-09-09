import { logger } from "@semihcihan/shared";
import { PriceScheduleSchema } from "@semihcihan/shared";
import { z } from "zod";
import { isNotFoundError } from "@semihcihan/shared";

import { getMostRecentActivePrice } from "../helpers/date-helpers";

import type { components } from "@semihcihan/app-store-connect-api-types";
import {
  fetchAppManualPrices,
  fetchAppAutomaticPrices,
  fetchAppPriceScheduleBaseTerritory,
  getAppPriceSchedule,
} from "../domains/pricing/api-client";

// Process app price response
export function processAppPriceResponse(
  response: components["schemas"]["AppPricesV2Response"]
): z.infer<typeof PriceScheduleSchema>["prices"] {
  if (!response?.data || !response?.included) {
    return [];
  }

  const territoryPriceMap = buildTerritoryPriceMap(response);
  return buildFinalPriceResult(territoryPriceMap);
}

function buildTerritoryPriceMap(
  response: components["schemas"]["AppPricesV2Response"]
): Map<
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

  for (const appPrice of response.data) {
    if (appPrice.type !== "appPrices") continue;

    const priceEntry = extractPriceEntry(appPrice, response.included);
    if (!priceEntry) continue;

    if (!territoryPriceMap.has(priceEntry.territory)) {
      territoryPriceMap.set(priceEntry.territory, []);
    }
    territoryPriceMap.get(priceEntry.territory)!.push(priceEntry);
  }

  return territoryPriceMap;
}

function extractPriceEntry(
  appPrice: components["schemas"]["AppPriceV2"],
  included: components["schemas"]["AppPricesV2Response"]["included"]
): {
  price: string;
  territory: string;
  startDate?: string;
  endDate?: string;
} | null {
  const territory = findTerritory(appPrice, included);
  if (!territory) return null;

  const pricePoint = findPricePoint(appPrice, included);
  if (!pricePoint?.attributes?.customerPrice) return null;

  return {
    price: pricePoint.attributes.customerPrice,
    territory: territory.id,
    startDate: appPrice.attributes?.startDate,
    endDate: appPrice.attributes?.endDate,
  };
}

function findTerritory(
  appPrice: components["schemas"]["AppPriceV2"],
  included: components["schemas"]["AppPricesV2Response"]["included"]
): components["schemas"]["Territory"] | null {
  const territoryId = appPrice.relationships?.territory?.data?.id;
  if (!territoryId) return null;

  return (
    included?.find(
      (item): item is components["schemas"]["Territory"] =>
        item.type === "territories" && item.id === territoryId
    ) || null
  );
}

function findPricePoint(
  appPrice: components["schemas"]["AppPriceV2"],
  included: components["schemas"]["AppPricesV2Response"]["included"]
): components["schemas"]["AppPricePointV3"] | null {
  const pricePointId = appPrice.relationships?.appPricePoint?.data?.id;
  if (!pricePointId) return null;

  return (
    included?.find(
      (item): item is components["schemas"]["AppPricePointV3"] =>
        item.type === "appPricePoints" && item.id === pricePointId
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
): z.infer<typeof PriceScheduleSchema>["prices"] {
  const result: z.infer<typeof PriceScheduleSchema>["prices"] = [];

  for (const [territory, prices] of territoryPriceMap) {
    const activePrice = getMostRecentActivePrice(prices);
    if (activePrice) {
      result.push({
        price: activePrice.price,
        territory: activePrice.territory as z.infer<
          typeof PriceScheduleSchema
        >["prices"][0]["territory"],
      });
    }
  }

  return result;
}

// Map app pricing
export async function mapAppPricing(
  appId: string
): Promise<z.infer<typeof PriceScheduleSchema> | undefined> {
  try {
    // First, get the app price schedule
    const priceScheduleResponse = await getAppPriceSchedule(appId);

    if (!priceScheduleResponse?.data) {
      // No price schedule found - this means pricing was not created yet
      logger.debug(`No app price schedule found for app ${appId}`);
      return undefined;
    }

    const priceScheduleId = priceScheduleResponse.data.id;
    if (!priceScheduleId) {
      logger.warn(`Invalid price schedule ID:`, priceScheduleResponse);
      return undefined;
    }

    // Get the base territory from the price schedule
    const baseTerritoryResponse = await fetchAppPriceScheduleBaseTerritory(
      priceScheduleId
    );

    if (!baseTerritoryResponse.data) {
      // No base territory found - this means pricing was not created yet
      return undefined;
    }

    const baseTerritory = baseTerritoryResponse.data.id;
    if (!baseTerritory) {
      logger.warn(`Invalid base territory:`, baseTerritoryResponse);
      return undefined;
    }

    const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
      fetchAppManualPrices(priceScheduleId),
      fetchAppAutomaticPrices(priceScheduleId, baseTerritory),
    ]);

    const manualPrices = processAppPriceResponse(manualPricesResponse);
    const automaticPrices = processAppPriceResponse(automaticPricesResponse);

    const prices = [...manualPrices, ...automaticPrices];

    return { baseTerritory: baseTerritory as any, prices };
  } catch (error) {
    // Only handle 404 errors gracefully - they mean pricing doesn't exist yet
    const is404Error = isNotFoundError(error);

    if (is404Error) {
      logger.debug(
        `App pricing not found or not configured yet for app ${appId}`
      );
      return undefined;
    }
    // For other errors (auth, server errors, etc.), re-throw so user knows something is wrong
    throw error;
  }
}
