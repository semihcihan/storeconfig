import { logger } from "../../utils/logger";
import {
  AppStoreModelSchema,
  AvailabilitySchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";
import { api } from "../api";
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

// Get IAP availability for a specific IAP
export async function getIAPAvailability(
  iapId: string
): Promise<InAppPurchaseAvailabilityResponse | null> {
  const response = await api.GET(
    "/v2/inAppPurchases/{id}/inAppPurchaseAvailability",
    {
      params: {
        path: { id: iapId },
        query: {
          include: ["availableTerritories"],
          "fields[inAppPurchaseAvailabilities]": [
            "availableInNewTerritories",
            "availableTerritories",
          ],
        },
      },
    }
  );

  if (response.error) {
    logger.info(`No IAP availability found for IAP ${iapId}`);
    return null;
  }

  return response.data;
}

// Create IAP availability
export async function createIAPAvailability(
  request: InAppPurchaseAvailabilityCreateRequest
): Promise<InAppPurchaseAvailabilityResponse> {
  const response = await api.POST("/v1/inAppPurchaseAvailabilities", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Helper function to create IAP availability for a specific IAP
async function createIAPAvailabilityForIAP(
  iapId: string,
  availability: z.infer<typeof AvailabilitySchema>
): Promise<string> {
  logger.info(`Creating IAP availability for IAP ${iapId}...`);

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

  logger.info(`Successfully created IAP availability: ${response.data.id}`);
  return response.data.id;
}

// Main function to update IAP availability
export async function updateIAPAvailability(
  productId: string,
  availability: z.infer<typeof AvailabilitySchema>,
  appId: string,
  currentIAPsResponse: InAppPurchasesV2Response
): Promise<void> {
  logger.info(`Updating IAP availability for product ${productId}`);
  logger.info(
    `Available territories: ${JSON.stringify(
      availability.availableTerritories
    )}`
  );
  logger.info(
    `Available in new territories: ${availability.availableInNewTerritories}`
  );

  // Find the IAP by product ID
  const iapId = extractIAPId(currentIAPsResponse, productId);
  if (!iapId) {
    throw new Error(`IAP with product ID ${productId} not found`);
  }

  // Check if IAP already has availability
  const existingAvailability = await getIAPAvailability(iapId);

  if (existingAvailability?.data?.id) {
    logger.info(
      `IAP ${productId} already has availability. Updating via POST-as-upsert pattern...`
    );
    logger.info(`Existing availability ID: ${existingAvailability.data.id}`);
    logger.info(
      `Current availableInNewTerritories: ${existingAvailability.data.attributes?.availableInNewTerritories}`
    );

    // Apple's API uses POST-as-upsert pattern: creating availability for an IAP that already has it
    // will update the existing availability rather than creating a duplicate
    logger.info(`Updating IAP availability for product ${productId}`);
    await createIAPAvailabilityForIAP(iapId, availability);
    logger.info(
      `Successfully updated IAP availability for product ${productId}`
    );
    return;
  }

  // Create new IAP availability
  logger.info(`Creating new IAP availability for product ${productId}`);
  await createIAPAvailabilityForIAP(iapId, availability);

  logger.info(`IAP availability update completed for product ${productId}`);
}
