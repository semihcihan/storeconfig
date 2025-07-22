import { logger } from "../utils/logger";
import {
  AppStoreModelSchema,
  PriceSchema,
  PriceScheduleSchema,
} from "../models/app-store";
import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";
import {
  getAppPriceSchedule,
  fetchAppPricePoints,
  fetchCurrentManualPrices,
  fetchBaseTerritory,
  createAppPriceSchedule as createAppPriceScheduleAPI,
} from "../domains/pricing/api-client";
import { throwFormattedError } from "../helpers/error-handling-helpers";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Price = z.infer<typeof PriceSchema>;
type Territory = z.infer<typeof TerritoryCodeSchema>;

// Helper function to get app price schedule ID from app ID
async function getAppPriceScheduleId(appId: string): Promise<string | null> {
  const response = await getAppPriceSchedule(appId);
  return response?.data?.id || null;
}

// Helper function to find app price point ID for a given price and territory
async function findAppPricePointId(
  price: string,
  territory: Territory,
  appId: string
): Promise<string> {
  const response = await fetchAppPricePoints(appId, territory);

  const pricePoints = response.data || [];

  // Find the price point that matches the price and territory
  const pricePoint = pricePoints.find((point: any) => {
    const pointPrice = point.attributes?.customerPrice;
    const pointTerritoryId = point.relationships?.territory?.data?.id;

    return pointPrice === price && pointTerritoryId === territory;
  });

  if (!pricePoint) {
    logger.error(
      `No price point found for price ${price} in territory ${territory}. ` +
        `Found ${pricePoints.length} price points for territory ${territory}. ` +
        `Available prices: ${pricePoints
          .map((p: any) => p.attributes?.customerPrice)
          .join(", ")}`
    );

    throw new Error(
      `No price point found for price ${price} in territory ${territory}`
    );
  }

  return pricePoint.id;
}

// Helper function to get current manual prices from the price schedule
async function getCurrentManualPrices(priceScheduleId: string): Promise<any[]> {
  const response = await fetchCurrentManualPrices(priceScheduleId);
  return response.data || [];
}

// Helper function to get base territory
async function getBaseTerritory(priceScheduleId: string): Promise<string> {
  const response = await fetchBaseTerritory(priceScheduleId);
  return response.data?.id || "";
}

// Create price schedule request builder
function buildPriceScheduleRequest(
  appId: string,
  baseTerritory: Territory,
  prices: Price[]
): any {
  const manualPrices = [];
  const includedPrices = [];

  for (const priceEntry of prices) {
    const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

    manualPrices.push({
      type: "appPrices" as const,
      id: tempPriceId,
    });

    includedPrices.push({
      type: "appPrices" as const,
      id: tempPriceId,
      attributes: {
        manual: true,
        startDate: null,
        endDate: null,
      },
      relationships: {
        appPricePoint: {
          data: {
            type: "appPricePoints" as const,
            id: "placeholder", // Will be replaced by actual price point ID
          },
        },
        territory: {
          data: {
            type: "territories" as const,
            id: priceEntry.territory,
          },
        },
      },
    });
  }

  return {
    data: {
      type: "appPriceSchedules" as const,
      relationships: {
        app: {
          data: {
            type: "apps" as const,
            id: appId,
          },
        },
        baseTerritory: {
          data: {
            type: "territories" as const,
            id: baseTerritory,
          },
        },
        manualPrices: {
          data: manualPrices,
        },
      },
    },
    included: includedPrices,
  };
}

// Create app price schedule from scratch
export async function createAppPriceSchedule(
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  appId: string
): Promise<void> {
  logger.info(
    `Creating app price schedule with base territory ${priceSchedule.baseTerritory} for app ${appId}`
  );

  try {
    const createRequest = buildPriceScheduleRequest(
      appId,
      priceSchedule.baseTerritory,
      priceSchedule.prices
    );

    // Resolve actual price point IDs
    for (let i = 0; i < priceSchedule.prices.length; i++) {
      const priceEntry = priceSchedule.prices[i];
      const pricePointId = await findAppPricePointId(
        priceEntry.price,
        priceEntry.territory,
        appId
      );

      createRequest.included[i].relationships.appPricePoint.data.id =
        pricePointId;
    }

    await createAppPriceScheduleAPI(createRequest);
    logger.info(
      `Successfully created app price schedule with base territory ${priceSchedule.baseTerritory}`
    );
  } catch (error) {
    logger.error(`Error creating app price schedule: ${error}`);
    throw error;
  }
}
