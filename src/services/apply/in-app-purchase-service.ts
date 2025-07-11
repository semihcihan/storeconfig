import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { z } from "zod";
import {
  createInAppPurchase,
  updateInAppPurchase,
  fetchInAppPurchases,
} from "../../domains/in-app-purchases/api-client";
import type { components } from "../../generated/app-store-connect-api";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchaseV2CreateRequest =
  components["schemas"]["InAppPurchaseV2CreateRequest"];
type InAppPurchaseV2UpdateRequest =
  components["schemas"]["InAppPurchaseV2UpdateRequest"];

// Helper function to map IAP type from our model to API enum
function mapIAPType(
  type: string
): "CONSUMABLE" | "NON_CONSUMABLE" | "NON_RENEWING_SUBSCRIPTION" {
  switch (type) {
    case "CONSUMABLE":
      return "CONSUMABLE";
    case "NON_CONSUMABLE":
      return "NON_CONSUMABLE";
    case "NON_RENEWING_SUBSCRIPTION":
      return "NON_RENEWING_SUBSCRIPTION";
    default:
      throw new Error(`Unknown IAP type: ${type}`);
  }
}

// Helper function to get existing IAP ID by product ID
async function getIAPIdByProductId(
  appId: string,
  productId: string
): Promise<string | null> {
  const iapsResponse = await fetchInAppPurchases(appId);
  const iap = iapsResponse.data?.find(
    (iap) => iap.attributes?.productId === productId
  );
  return iap?.id || null;
}

// Create a new in-app purchase
export async function createNewInAppPurchase(
  appId: string,
  inAppPurchase: AppStoreModel["inAppPurchases"][0]
): Promise<void> {
  logger.info(`Creating new in-app purchase: ${inAppPurchase.productId}`);

  const createRequest: InAppPurchaseV2CreateRequest = {
    data: {
      type: "inAppPurchases",
      attributes: {
        productId: inAppPurchase.productId,
        name: inAppPurchase.referenceName,
        inAppPurchaseType: mapIAPType(inAppPurchase.type),
        familySharable: inAppPurchase.familySharable,
        ...(inAppPurchase.reviewNote && {
          reviewNote: inAppPurchase.reviewNote,
        }),
      },
      relationships: {
        app: {
          data: {
            type: "apps",
            id: appId,
          },
        },
      },
    },
  };

  const response = await createInAppPurchase(createRequest);

  if (!response.data?.id) {
    throw new Error("No IAP ID returned from creation");
  }

  logger.info(`Successfully created in-app purchase: ${response.data.id}`);
}

// Update an existing in-app purchase
export async function updateExistingInAppPurchase(
  appId: string,
  productId: string,
  changes: {
    referenceName?: string;
    familySharable?: boolean;
    reviewNote?: string;
  }
): Promise<void> {
  logger.info(`Updating in-app purchase: ${productId}`);

  // Get the existing IAP ID
  const iapId = await getIAPIdByProductId(appId, productId);
  if (!iapId) {
    throw new Error(`Could not find IAP with product ID: ${productId}`);
  }

  const updateRequest: InAppPurchaseV2UpdateRequest = {
    data: {
      type: "inAppPurchases",
      id: iapId,
      attributes: {
        ...(changes.referenceName && { name: changes.referenceName }),
        ...(changes.familySharable !== undefined && {
          familySharable: changes.familySharable,
        }),
        ...(changes.reviewNote !== undefined && {
          reviewNote: changes.reviewNote,
        }),
      },
    },
  };

  const response = await updateInAppPurchase(iapId, updateRequest);

  if (!response.data?.id) {
    throw new Error("No IAP ID returned from update");
  }

  logger.info(`Successfully updated in-app purchase: ${response.data.id}`);
}
