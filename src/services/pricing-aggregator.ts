import { logger } from "../utils/logger";
import { PriceScheduleSchema } from "../models/app-store";
import { z } from "zod";
import { isNotFoundError } from "../helpers/error-handling-helpers";
import { decodeTerritoryFromId } from "../helpers/id-encoding-helpers";
import {
  fetchAppManualPrices,
  fetchAppAutomaticPrices,
  fetchAppPriceScheduleBaseTerritory,
} from "../domains/pricing/api-client";

// Process app price response
function processAppPriceResponse(
  response: any // Using any for now to avoid complex type issues
): z.infer<typeof PriceScheduleSchema>["prices"] {
  if (!response || !response.included) {
    return [];
  }

  return (response.included as any[])
    .filter(
      (item): item is any => item.type === "appPricePoints" // Using any for now
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
