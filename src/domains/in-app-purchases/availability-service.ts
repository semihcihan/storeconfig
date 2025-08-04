import { logger } from "../../utils/logger";
import {
  AppStoreModelSchema,
  AvailabilitySchema,
} from "../../models/app-store";
import { z } from "zod";
import { getIAPAvailability, createIAPAvailability } from "./api-client";
import type { components } from "../../generated/app-store-connect-api";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchaseAvailabilityResponse =
  components["schemas"]["InAppPurchaseAvailabilityResponse"];
type InAppPurchaseAvailabilityCreateRequest =
  components["schemas"]["InAppPurchaseAvailabilityCreateRequest"];

// Helper function to extract IAP ID from API response by product ID
function extractIAPId(
  apiResponse: InAppPurchasesV2Response,
  productId: string
): string | null {
  const iap = apiResponse.data?.find(
    (iap) => iap.attributes?.productId === productId
  );
  return iap?.id || null;
}

// Helper function to create IAP availability for a specific IAP
async function createIAPAvailabilityForIAP(
  iapId: string,
  availability: z.infer<typeof AvailabilitySchema>
): Promise<string> {
  logger.debug(`Creating IAP availability for IAP ${iapId}...`);

  const territoryData = availability.availableTerritories.map((territory) => ({
    type: "territories" as const,
    id: territory,
  }));

  const createRequest: InAppPurchaseAvailabilityCreateRequest = {
    data: {
      type: "inAppPurchaseAvailabilities" as const,
      attributes: {
        availableInNewTerritories: availability.availableInNewTerritories,
      },
      relationships: {
        inAppPurchase: {
          data: {
            type: "inAppPurchases" as const,
            id: iapId,
          },
        },
        availableTerritories: {
          data: territoryData,
        },
      },
    },
  };

  const response = await createIAPAvailability(createRequest);

  if (!response.data?.id) {
    throw new Error("No IAP availability ID returned from creation");
  }

  logger.debug(`Successfully created IAP availability: ${response.data.id}`);
  return response.data.id;
}

// Main function to update IAP availability
export async function updateIAPAvailability(
  productId: string,
  availability: z.infer<typeof AvailabilitySchema>,
  appId: string,
  currentIAPsResponse: InAppPurchasesV2Response,
  newlyCreatedIAPs?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Updating IAP availability for product ${productId}:
    available territories:`,
    availability.availableTerritories,
    `available in new territories: ${availability.availableInNewTerritories}`
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

  // Check if IAP already has availability
  const existingAvailability = await getIAPAvailability(iapId);

  if (existingAvailability?.data?.id) {
    logger.debug(
      `IAP ${productId} already has availability. Updating via POST-as-upsert pattern...
      Existing availability ID: ${existingAvailability.data.id}
      Current availableInNewTerritories: ${existingAvailability.data.attributes?.availableInNewTerritories}`
    );

    // Apple's API uses POST-as-upsert pattern: creating availability for an IAP that already has it
    // will update the existing availability rather than creating a duplicate
    logger.debug(`Updating IAP availability for product ${productId}`);
    await createIAPAvailabilityForIAP(iapId, availability);
    logger.debug(
      `Successfully updated IAP availability for product ${productId}`
    );
    return;
  }

  // Create new IAP availability
  logger.debug(`Creating new IAP availability for product ${productId}`);
  await createIAPAvailabilityForIAP(iapId, availability);

  logger.debug(`IAP availability update completed for product ${productId}`);
}
