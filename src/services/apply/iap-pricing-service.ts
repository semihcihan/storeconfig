import { logger } from "../../utils/logger";
import {
  AppStoreModelSchema,
  PriceSchema,
  PriceScheduleSchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";
import { api } from "../api";
import { throwFormattedError } from "../../helpers/error-handling-helpers";
import type { components } from "../../generated/app-store-connect-api";

type Price = z.infer<typeof PriceSchema>;
type Territory = z.infer<typeof TerritoryCodeSchema>;
type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchasePriceScheduleCreateRequest =
  components["schemas"]["InAppPurchasePriceScheduleCreateRequest"];
type InAppPurchasePriceScheduleResponse =
  components["schemas"]["InAppPurchasePriceScheduleResponse"];

// Helper function to extract IAP ID from current state response
function extractIAPId(
  currentIAPsResponse: InAppPurchasesV2Response,
  productId: string
): string | null {
  const iap = currentIAPsResponse.data?.find(
    (iap) => iap.attributes?.productId === productId
  );
  return iap?.id || null;
}

// Helper function to get IAP price schedule ID from IAP ID
async function getIAPPriceScheduleId(iapId: string): Promise<string | null> {
  const response = await api.GET("/v2/inAppPurchases/{id}/iapPriceSchedule", {
    params: { path: { id: iapId } },
  });

  if (response.error) {
    const is404Error = response.error.errors?.some(
      (err: any) => err.status === "404" || err.status === 404
    );
    if (is404Error) {
      return null;
    }
    throwFormattedError("Failed to get IAP price schedule", response.error);
  }

  return response.data.data?.id || null;
}

// Helper function to find IAP price point ID for a given price and territory
async function findIAPPricePointId(
  price: string,
  territory: Territory,
  iapId: string
): Promise<string> {
  const response = await api.GET("/v2/inAppPurchases/{id}/pricePoints", {
    params: {
      path: { id: iapId },
      query: {
        limit: 200,
        include: ["territory"],
        "filter[territory]": [territory],
      },
    },
  });

  if (response.error) {
    throwFormattedError("Failed to get IAP price points", response.error);
  }

  let pricePoints: any[] = [];
  if (
    response.data &&
    typeof response.data === "object" &&
    Array.isArray((response.data as any).data)
  ) {
    pricePoints = (response.data as any).data;
  }

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

// Create price schedule request builder
function buildIAPPriceScheduleRequest(
  iapId: string,
  baseTerritory: Territory,
  prices: Price[]
): InAppPurchasePriceScheduleCreateRequest {
  const manualPrices = [];
  const includedPrices = [];

  for (const priceEntry of prices) {
    const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

    manualPrices.push({
      type: "inAppPurchasePrices" as const,
      id: tempPriceId,
    });

    includedPrices.push({
      type: "inAppPurchasePrices" as const,
      id: tempPriceId,
      attributes: {
        manual: true,
        startDate: null,
        endDate: null,
      },
      relationships: {
        inAppPurchasePricePoint: {
          data: {
            type: "inAppPurchasePricePoints" as const,
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
      type: "inAppPurchasePriceSchedules" as const,
      relationships: {
        inAppPurchase: {
          data: {
            type: "inAppPurchases" as const,
            id: iapId,
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
    included: includedPrices as any,
  };
}

// Create IAP price schedule from scratch
async function createIAPPriceSchedule(
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  iapId: string
): Promise<void> {
  logger.info(
    `Creating IAP price schedule with base territory ${priceSchedule.baseTerritory} for IAP ${iapId}`
  );

  try {
    const createRequest = buildIAPPriceScheduleRequest(
      iapId,
      priceSchedule.baseTerritory,
      priceSchedule.prices
    );

    // Resolve actual price point IDs
    for (let i = 0; i < priceSchedule.prices.length; i++) {
      const priceEntry = priceSchedule.prices[i];
      const pricePointId = await findIAPPricePointId(
        priceEntry.price,
        priceEntry.territory,
        iapId
      );

      (createRequest.included as any)[
        i
      ].relationships.inAppPurchasePricePoint.data.id = pricePointId;
    }

    const response = await api.POST("/v1/inAppPurchasePriceSchedules", {
      body: createRequest,
    });

    if (response.error) {
      throwFormattedError(
        "Failed to create IAP price schedule",
        response.error
      );
    }

    logger.info(
      `Successfully created IAP price schedule with base territory ${priceSchedule.baseTerritory}`
    );
  } catch (error) {
    logger.error(`Error creating IAP price schedule: ${error}`);
    throw error;
  }
}

// Comprehensive IAP pricing update (similar to app pricing)
export async function updateIAPPricing(
  productId: string,
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  currentIAPsResponse: InAppPurchasesV2Response
): Promise<void> {
  logger.info(
    `Updating IAP pricing for ${productId} with comprehensive schedule`
  );

  const iapId = extractIAPId(currentIAPsResponse, productId);
  if (!iapId) {
    throw new Error(`IAP with product ID ${productId} not found`);
  }

  // Check if IAP already has a price schedule
  const existingPriceScheduleId = await getIAPPriceScheduleId(iapId);

  if (existingPriceScheduleId) {
    logger.info(
      `IAP ${productId} already has a price schedule. Apple's API uses POST-as-upsert pattern.`
    );
    logger.info(`Creating new price schedule will update the existing one.`);
  } else {
    logger.info(`Creating new price schedule for IAP ${productId}`);
  }

  // Create the price schedule (this will update if one exists)
  await createIAPPriceSchedule(priceSchedule, iapId);

  logger.info(`Successfully updated IAP pricing for ${productId}`);
}
