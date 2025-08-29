import { logger } from "../utils/logger";
import { PriceScheduleSchema } from "../models/app-store";
import { z } from "zod";
import { isNotFoundError } from "../helpers/error-handling-helpers";
import { decodeTerritoryFromId } from "../helpers/id-encoding-helpers";

import { getMostRecentActivePrice } from "../helpers/date-helpers";
import type { components } from "../generated/app-store-connect-api";
import {
  fetchAppManualPrices,
  fetchAppAutomaticPrices,
  fetchAppPriceScheduleBaseTerritory,
} from "../domains/pricing/api-client";

// Process app price response
export function processAppPriceResponse(
  response: components["schemas"]["AppPricesV2Response"]
): z.infer<typeof PriceScheduleSchema>["prices"] {
  if (!response || !response.included) {
    return [];
  }

  logger.debug("Processing app price response:", response);

  // Use the new date-aware processing
  // Handle cases where there's no data or included items
  if (!response.data || response.data.length === 0 || !response.included) {
    logger.debug("No data or included items found in response");
    return [];
  }

  // Group prices by territory to handle multiple price entries per territory
  const territoryPriceMap = new Map<
    string,
    Array<{
      price: string;
      territory: string;
      startDate?: string;
      endDate?: string;
    }>
  >();

  // Process the data array (AppPriceV2 objects) to get date information
  response.data.forEach((appPrice) => {
    if (appPrice.type !== "appPrices") return;

    // Get territory ID from relationships
    const territoryRelationshipId = appPrice.relationships?.territory?.data?.id;
    if (!territoryRelationshipId) return;

    // Find the territory object in the included array
    const territory = response.included?.find(
      (item): item is components["schemas"]["Territory"] =>
        item.type === "territories" && item.id === territoryRelationshipId
    );
    if (!territory) return;

    // Try to get the price point ID from relationships first
    let pricePointRelationshipId =
      appPrice.relationships?.appPricePoint?.data?.id;

    // If appPricePoint relationship is missing, try to find the price point by matching territory
    if (!pricePointRelationshipId) {
      logger.debug(
        `No price point relationship found for appPrice ${appPrice.id}, attempting to match by territory`
      );

      // Find price points that belong to the same territory by decoding their IDs
      const matchingPricePoint = response.included?.find(
        (item): item is components["schemas"]["AppPricePointV3"] => {
          if (item.type !== "appPricePoints") return false;

          try {
            const pricePointTerritory = decodeTerritoryFromId(item.id);
            return pricePointTerritory === territoryRelationshipId;
          } catch {
            // If decoding fails, skip this price point
            return false;
          }
        }
      );

      if (matchingPricePoint) {
        pricePointRelationshipId = matchingPricePoint.id;
      }
    }

    if (!pricePointRelationshipId) return;

    // Find the corresponding price point in the included array
    const pricePoint = response.included?.find(
      (item): item is components["schemas"]["AppPricePointV3"] =>
        item.type === "appPricePoints" && item.id === pricePointRelationshipId
    );

    if (!pricePoint?.attributes?.customerPrice) return;

    const priceEntry = {
      price: pricePoint.attributes.customerPrice,
      territory: territory.id,
      startDate: appPrice.attributes?.startDate,
      endDate: appPrice.attributes?.endDate,
    };

    if (!territoryPriceMap.has(territory.id)) {
      territoryPriceMap.set(territory.id, []);
    }
    territoryPriceMap.get(territory.id)!.push(priceEntry);
  });

  // For each territory, get the most recent active price
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

  logger.debug(
    `Processed ${result.length} active prices from ${territoryPriceMap.size} territories with date filtering`
  );
  return result;
}

// Map app pricing
export async function mapAppPricing(
  appId: string
): Promise<z.infer<typeof PriceScheduleSchema> | undefined> {
  try {
    // First, try to get the base territory from the price schedule
    const baseTerritoryResponse = await fetchAppPriceScheduleBaseTerritory(
      appId
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
      fetchAppManualPrices(appId),
      fetchAppAutomaticPrices(appId, baseTerritory),
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
