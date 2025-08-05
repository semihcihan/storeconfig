import { logger } from "../../utils/logger";
import {
  AppStoreModelSchema,
  PriceSchema,
  PriceScheduleSchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";
import {
  getIAPPriceScheduleId,
  findIAPPricePointId,
  createIAPPriceSchedule,
} from "./api-client";
import { ContextualError } from "../../helpers/error-handling-helpers";
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
async function createIAPPriceScheduleForIAP(
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  iapId: string
): Promise<void> {
  logger.debug(
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

    await createIAPPriceSchedule(createRequest);

    logger.debug(
      `Successfully created IAP price schedule with base territory ${priceSchedule.baseTerritory}`
    );
  } catch (error) {
    throw error;
  }
}

// Comprehensive IAP pricing update (similar to app pricing)
export async function updateIAPPricing(
  productId: string,
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  currentIAPsResponse: InAppPurchasesV2Response,
  newlyCreatedIAPs?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Updating IAP pricing for ${productId} with comprehensive schedule`
  );

  // Get the IAP ID, checking newly created IAPs first
  let iapId: string | null = null;

  if (newlyCreatedIAPs?.has(productId)) {
    iapId = newlyCreatedIAPs.get(productId)!;
  } else {
    iapId = extractIAPId(currentIAPsResponse, productId);
  }

  if (!iapId) {
    throw new Error(`IAP with product ID ${productId} not found`);
  }

  // Check if IAP already has a price schedule
  const existingPriceScheduleId = await getIAPPriceScheduleId(iapId);

  if (existingPriceScheduleId) {
    logger.debug(
      `IAP ${productId} already has a price schedule. Apple's API uses POST-as-upsert pattern.
      Creating new price schedule will update the existing one.
      `
    );
  } else {
    logger.debug(`Creating new price schedule for IAP ${productId}`);
  }

  // Create the price schedule (this will update if one exists)
  await createIAPPriceScheduleForIAP(priceSchedule, iapId);

  logger.debug(`Successfully updated IAP pricing for ${productId}`);
}
