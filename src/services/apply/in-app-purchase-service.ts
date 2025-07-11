import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { z } from "zod";
import {
  createInAppPurchase,
  updateInAppPurchase,
  fetchInAppPurchases,
  createInAppPurchaseLocalization,
  updateInAppPurchaseLocalization,
  deleteInAppPurchaseLocalization,
} from "../../domains/in-app-purchases/api-client";
import type { components } from "../../generated/app-store-connect-api";

type InAppPurchaseV2CreateRequest =
  components["schemas"]["InAppPurchaseV2CreateRequest"];
type InAppPurchaseV2UpdateRequest =
  components["schemas"]["InAppPurchaseV2UpdateRequest"];
type InAppPurchaseLocalizationCreateRequest =
  components["schemas"]["InAppPurchaseLocalizationCreateRequest"];
type InAppPurchaseLocalizationUpdateRequest =
  components["schemas"]["InAppPurchaseLocalizationUpdateRequest"];
type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

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

// Utility function to extract IAP ID from raw API response
function extractIAPId(
  apiResponse: InAppPurchasesV2Response,
  productId: string
): string | null {
  const iap = apiResponse.data?.find(
    (iap) => iap.attributes?.productId === productId
  );
  return iap?.id || null;
}

// Utility function to extract localization ID from raw API response
function extractLocalizationId(
  apiResponse: InAppPurchasesV2Response,
  productId: string,
  locale: string
): string | null {
  const iap = apiResponse.data?.find(
    (iap) => iap.attributes?.productId === productId
  );

  if (!iap || !apiResponse.included) {
    return null;
  }

  // Find the localization in the included resources
  const localization = apiResponse.included.find(
    (item: any) =>
      item.type === "inAppPurchaseLocalizations" &&
      item.attributes?.locale === locale &&
      iap.relationships?.inAppPurchaseLocalizations?.data?.some(
        (rel: any) => rel.id === item.id
      )
  );

  return localization?.id || null;
}

// Helper function to get existing IAP ID by product ID (fallback when no raw response provided)
async function getIAPIdByProductId(
  appId: string,
  productId: string
): Promise<string | null> {
  const iapsResponse = await fetchInAppPurchases(appId);
  return extractIAPId(iapsResponse, productId);
}

// Helper function to get existing IAP localization ID (fallback when no raw response provided)
async function getIAPLocalizationId(
  appId: string,
  productId: string,
  locale: string
): Promise<string | null> {
  const iapsResponse = await fetchInAppPurchases(appId);
  return extractLocalizationId(iapsResponse, productId, locale);
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
  },
  currentStateResponse?: InAppPurchasesV2Response
): Promise<void> {
  logger.info(`Updating in-app purchase: ${productId}`);

  // Get the existing IAP ID using utility function or fallback
  const iapId = currentStateResponse
    ? extractIAPId(currentStateResponse, productId)
    : await getIAPIdByProductId(appId, productId);

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

// Create a new IAP localization
export async function createIAPLocalization(
  appId: string,
  productId: string,
  localization: { locale: string; name: string; description: string },
  currentStateResponse?: InAppPurchasesV2Response
): Promise<void> {
  logger.info(
    `Creating IAP localization: ${productId} - ${localization.locale}`
  );

  // Get the existing IAP ID using utility function or fallback
  const iapId = currentStateResponse
    ? extractIAPId(currentStateResponse, productId)
    : await getIAPIdByProductId(appId, productId);

  if (!iapId) {
    throw new Error(`Could not find IAP with product ID: ${productId}`);
  }

  const createRequest: InAppPurchaseLocalizationCreateRequest = {
    data: {
      type: "inAppPurchaseLocalizations",
      attributes: {
        name: localization.name,
        locale: localization.locale,
        description: localization.description,
      },
      relationships: {
        inAppPurchaseV2: {
          data: {
            type: "inAppPurchases",
            id: iapId,
          },
        },
      },
    },
  };

  const response = await createInAppPurchaseLocalization(createRequest);

  if (!response.data?.id) {
    throw new Error("No localization ID returned from creation");
  }

  logger.info(`Successfully created IAP localization: ${response.data.id}`);
}

// Update an existing IAP localization
export async function updateIAPLocalization(
  appId: string,
  productId: string,
  locale: string,
  changes: { name?: string; description?: string },
  currentStateResponse?: InAppPurchasesV2Response
): Promise<void> {
  logger.info(`Updating IAP localization: ${productId} - ${locale}`);

  // Get the existing localization ID using utility function or fallback
  const localizationId = currentStateResponse
    ? extractLocalizationId(currentStateResponse, productId, locale)
    : await getIAPLocalizationId(appId, productId, locale);

  if (!localizationId) {
    throw new Error(
      `Could not find IAP localization with product ID: ${productId} and locale: ${locale}`
    );
  }

  const updateRequest: InAppPurchaseLocalizationUpdateRequest = {
    data: {
      type: "inAppPurchaseLocalizations",
      id: localizationId,
      attributes: {
        ...(changes.name && { name: changes.name }),
        ...(changes.description && { description: changes.description }),
      },
    },
  };

  const response = await updateInAppPurchaseLocalization(
    localizationId,
    updateRequest
  );

  if (!response.data?.id) {
    throw new Error("No localization ID returned from update");
  }

  logger.info(`Successfully updated IAP localization: ${response.data.id}`);
}

// Delete an IAP localization
export async function deleteIAPLocalization(
  appId: string,
  productId: string,
  locale: string,
  currentStateResponse?: InAppPurchasesV2Response
): Promise<void> {
  logger.info(`Deleting IAP localization: ${productId} - ${locale}`);

  // Get the existing localization ID using utility function or fallback
  const localizationId = currentStateResponse
    ? extractLocalizationId(currentStateResponse, productId, locale)
    : await getIAPLocalizationId(appId, productId, locale);

  if (!localizationId) {
    throw new Error(
      `Could not find IAP localization with product ID: ${productId} and locale: ${locale}`
    );
  }

  await deleteInAppPurchaseLocalization(localizationId);

  logger.info(`Successfully deleted IAP localization: ${localizationId}`);
}
