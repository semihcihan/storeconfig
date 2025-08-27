import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { z } from "zod";
import {
  fetchSubscriptionGroups,
  createSubscriptionGroup as createSubscriptionGroupAPI,
  updateSubscriptionGroup as updateSubscriptionGroupAPI,
  createSubscriptionGroupLocalization as createSubscriptionGroupLocalizationAPI,
  updateSubscriptionGroupLocalization as updateSubscriptionGroupLocalizationAPI,
  deleteSubscriptionGroupLocalization as deleteSubscriptionGroupLocalizationAPI,
  createSubscription as createSubscriptionAPI,
  updateSubscription as updateSubscriptionAPI,
  createSubscriptionLocalization as createSubscriptionLocalizationAPI,
  updateSubscriptionLocalization as updateSubscriptionLocalizationAPI,
  deleteSubscriptionLocalization as deleteSubscriptionLocalizationAPI,
  fetchSubscriptionLocalizations,
} from "./api-client";
import type { components } from "../../generated/app-store-connect-api";

type SubscriptionGroupCreateRequest =
  components["schemas"]["SubscriptionGroupCreateRequest"];
type SubscriptionGroupUpdateRequest =
  components["schemas"]["SubscriptionGroupUpdateRequest"];
type SubscriptionGroupResponse =
  components["schemas"]["SubscriptionGroupResponse"];
type SubscriptionGroupLocalizationCreateRequest =
  components["schemas"]["SubscriptionGroupLocalizationCreateRequest"];
type SubscriptionGroupLocalizationUpdateRequest =
  components["schemas"]["SubscriptionGroupLocalizationUpdateRequest"];
type SubscriptionGroupLocalizationResponse =
  components["schemas"]["SubscriptionGroupLocalizationResponse"];
type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];
type SubscriptionCreateRequest =
  components["schemas"]["SubscriptionCreateRequest"];
type SubscriptionUpdateRequest =
  components["schemas"]["SubscriptionUpdateRequest"];

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

// Utility function to extract subscription group ID from raw API response
function extractSubscriptionGroupId(
  apiResponse: SubscriptionGroupsResponse,
  referenceName: string
): string | null {
  const group = apiResponse.data?.find(
    (group) => group.attributes?.referenceName === referenceName
  );
  return group?.id || null;
}

// Utility function to extract subscription group localization ID from raw API response
function extractSubscriptionGroupLocalizationId(
  apiResponse: SubscriptionGroupsResponse,
  groupReferenceName: string,
  locale: string
): string | null {
  const group = apiResponse.data?.find(
    (group) => group.attributes?.referenceName === groupReferenceName
  );

  if (!group || !apiResponse.included) {
    return null;
  }

  // Find the localization in the included resources
  const localization = apiResponse.included.find(
    (item: any) =>
      item.type === "subscriptionGroupLocalizations" &&
      item.attributes?.locale === locale &&
      group.relationships?.subscriptionGroupLocalizations?.data?.some(
        (rel: any) => rel.id === item.id
      )
  );

  return localization?.id || null;
}

// Helper function to get existing subscription group localization ID (fallback when no raw response provided)
async function getSubscriptionGroupLocalizationId(
  appId: string,
  groupReferenceName: string,
  locale: string
): Promise<string | null> {
  const response = await fetchSubscriptionGroups(appId);
  return extractSubscriptionGroupLocalizationId(
    response,
    groupReferenceName,
    locale
  );
}

// Utility function to extract subscription ID from raw API response
function extractSubscriptionId(
  apiResponse: SubscriptionGroupsResponse,
  productId: string
): string | null {
  if (!apiResponse.included) {
    return null;
  }

  // Find the subscription in the included resources
  const subscription = apiResponse.included.find(
    (item: any) =>
      item.type === "subscriptions" && item.attributes?.productId === productId
  );

  return subscription?.id || null;
}

// Helper function to get existing subscription ID by product ID (fallback when no raw response provided)
async function getSubscriptionIdByProductId(
  appId: string,
  productId: string
): Promise<string | null> {
  const response = await fetchSubscriptionGroups(appId);
  return extractSubscriptionId(response, productId);
}

// Helper function to get existing subscription group ID by reference name (fallback when no raw response provided)
async function getSubscriptionGroupIdByReferenceName(
  appId: string,
  referenceName: string
): Promise<string | null> {
  const response = await fetchSubscriptionGroups(appId);
  return extractSubscriptionGroupId(response, referenceName);
}

// Utility function to extract subscription localization ID from raw API response
function extractSubscriptionLocalizationId(
  apiResponse: SubscriptionGroupsResponse,
  productId: string,
  locale: string
): string | null {
  if (!apiResponse.included) {
    return null;
  }

  // Find the subscription in the included resources
  const subscription = apiResponse.included.find(
    (item: any) =>
      item.type === "subscriptions" && item.attributes?.productId === productId
  );

  if (!subscription) {
    return null;
  }

  // Find the localization in the included resources
  const localization = apiResponse.included.find(
    (item: any) =>
      item.type === "subscriptionLocalizations" &&
      item.attributes?.locale === locale &&
      (
        subscription.relationships as any
      )?.subscriptionLocalizations?.data?.some((rel: any) => rel.id === item.id)
  );

  return localization?.id || null;
}

// Helper function to get existing subscription localization ID (fallback when no raw response provided)
async function getSubscriptionLocalizationId(
  appId: string,
  productId: string,
  locale: string
): Promise<string | null> {
  // First get the subscription ID
  const subscriptionId = await getSubscriptionIdByProductId(appId, productId);

  if (!subscriptionId) {
    return null;
  }

  // Then fetch the subscription localizations
  const response = await fetchSubscriptionLocalizations(subscriptionId);

  // Find the localization with the matching locale
  const localization = response.data?.find(
    (item: any) => item.attributes?.locale === locale
  );

  return localization?.id || null;
}

// Create a new subscription group
export async function createNewSubscriptionGroup(
  appId: string,
  group: NonNullable<AppStoreModel["subscriptionGroups"]>[0]
): Promise<string> {
  logger.debug(`Creating new subscription group: ${group.referenceName}`);

  const createRequest: SubscriptionGroupCreateRequest = {
    data: {
      type: "subscriptionGroups",
      attributes: {
        referenceName: group.referenceName,
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

  const response = await createSubscriptionGroupAPI(createRequest);

  if (!response.data?.id) {
    throw new Error("No subscription group ID returned from creation");
  }

  logger.debug(`Successfully created subscription group: ${response.data.id}`);

  return response.data.id;
}

// Update an existing subscription group
export async function updateExistingSubscriptionGroup(
  appId: string,
  referenceName: string,
  changes: {
    referenceName?: string;
  },
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(`Updating subscription group: ${referenceName}`);

  // Get the existing subscription group ID using utility function or fallback
  const groupId = currentStateResponse
    ? extractSubscriptionGroupId(currentStateResponse, referenceName)
    : await getSubscriptionGroupIdByReferenceName(appId, referenceName);

  if (!groupId) {
    throw new Error(
      `Could not find subscription group with reference name: ${referenceName}`
    );
  }

  const updateRequest: SubscriptionGroupUpdateRequest = {
    data: {
      type: "subscriptionGroups",
      id: groupId,
      attributes: {
        ...(changes.referenceName && { referenceName: changes.referenceName }),
      },
    },
  };

  const response = await updateSubscriptionGroupAPI(groupId, updateRequest);

  if (!response.data?.id) {
    throw new Error("No subscription group ID returned from update");
  }

  logger.debug(`Successfully updated subscription group: ${response.data.id}`);
}

// Create a new subscription group localization
export async function createSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  localization: { locale: string; name: string; customName?: string | null },
  currentStateResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptionGroups?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Creating subscription group localization: ${groupReferenceName} - ${localization.locale}`
  );

  // Get the subscription group ID, checking newly created subscription groups first
  let groupId: string | null = null;

  if (newlyCreatedSubscriptionGroups?.has(groupReferenceName)) {
    groupId = newlyCreatedSubscriptionGroups.get(groupReferenceName)!;
  } else if (currentStateResponse) {
    groupId = extractSubscriptionGroupId(
      currentStateResponse,
      groupReferenceName
    );
  } else {
    groupId = await getSubscriptionGroupIdByReferenceName(
      appId,
      groupReferenceName
    );
  }

  if (!groupId) {
    throw new Error(
      `Could not find subscription group with reference name: ${groupReferenceName}`
    );
  }

  const createRequest: SubscriptionGroupLocalizationCreateRequest = {
    data: {
      type: "subscriptionGroupLocalizations",
      attributes: {
        name: localization.name,
        locale: localization.locale,
        // Note: Apple API doesn't support setting customAppName to null
        // When customName is null, it's ignored (not included in the request)
        ...(localization.customName && {
          customAppName: localization.customName,
        }),
      },
      relationships: {
        subscriptionGroup: {
          data: {
            type: "subscriptionGroups",
            id: groupId,
          },
        },
      },
    },
  };

  const response = await createSubscriptionGroupLocalizationAPI(createRequest);

  if (!response.data?.id) {
    throw new Error(
      "No subscription group localization ID returned from creation"
    );
  }

  logger.debug(
    `Successfully created subscription group localization: ${response.data.id}`
  );
}

// Update an existing subscription group localization
export async function updateSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  locale: string,
  changes: { name?: string; customName?: string | null },
  currentStateResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptionGroups?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Updating subscription group localization: ${groupReferenceName} - ${locale}`
  );

  // Get the existing localization ID using utility function or fallback
  const localizationId = currentStateResponse
    ? extractSubscriptionGroupLocalizationId(
        currentStateResponse,
        groupReferenceName,
        locale
      )
    : await getSubscriptionGroupLocalizationId(
        appId,
        groupReferenceName,
        locale
      );

  if (!localizationId) {
    throw new Error(
      `Could not find subscription group localization: ${groupReferenceName} - ${locale}`
    );
  }

  const updateRequest: SubscriptionGroupLocalizationUpdateRequest = {
    data: {
      type: "subscriptionGroupLocalizations",
      id: localizationId,
      attributes: {
        ...(changes.name && { name: changes.name }),
        // Note: Apple API doesn't support setting customAppName to null
        // When customName is null, it's ignored (not included in the request)
        ...(changes.customName && { customAppName: changes.customName }),
      },
    },
  };

  const response = await updateSubscriptionGroupLocalizationAPI(
    localizationId,
    updateRequest
  );

  if (!response.data?.id) {
    throw new Error(
      "No subscription group localization ID returned from update"
    );
  }

  logger.debug(
    `Successfully updated subscription group localization: ${response.data.id}`
  );
}

// Delete an existing subscription group localization
export async function deleteSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  locale: string,
  currentStateResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptionGroups?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Deleting subscription group localization: ${groupReferenceName} - ${locale}`
  );

  // Get the existing localization ID using utility function or fallback
  const localizationId = currentStateResponse
    ? extractSubscriptionGroupLocalizationId(
        currentStateResponse,
        groupReferenceName,
        locale
      )
    : await getSubscriptionGroupLocalizationId(
        appId,
        groupReferenceName,
        locale
      );

  if (!localizationId) {
    throw new Error(
      `Could not find subscription group localization: ${groupReferenceName} - ${locale}`
    );
  }

  await deleteSubscriptionGroupLocalizationAPI(localizationId);

  logger.debug(
    `Successfully deleted subscription group localization: ${localizationId}`
  );
}

// Create a new subscription
export async function createNewSubscription(
  appId: string,
  groupReferenceName: string,
  subscription: {
    productId: string;
    referenceName: string;
    familySharable: boolean;
    groupLevel: number;
    subscriptionPeriod: string;
    reviewNote?: string;
  },
  currentStateResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptionGroups?: Map<string, string>
): Promise<string> {
  logger.debug(`Creating new subscription: ${subscription.productId}`);

  // Get the subscription group ID, checking newly created subscription groups first
  let groupId: string | null = null;

  if (newlyCreatedSubscriptionGroups?.has(groupReferenceName)) {
    groupId = newlyCreatedSubscriptionGroups.get(groupReferenceName)!;
  } else if (currentStateResponse) {
    groupId = extractSubscriptionGroupId(
      currentStateResponse,
      groupReferenceName
    );
  } else {
    groupId = await getSubscriptionGroupIdByReferenceName(
      appId,
      groupReferenceName
    );
  }

  if (!groupId) {
    throw new Error(
      `Could not find subscription group with reference name: ${groupReferenceName}`
    );
  }

  const createRequest: SubscriptionCreateRequest = {
    data: {
      type: "subscriptions",
      attributes: {
        name: subscription.referenceName,
        productId: subscription.productId,
        familySharable: subscription.familySharable,
        subscriptionPeriod: subscription.subscriptionPeriod as any,
        groupLevel: subscription.groupLevel,
        ...(subscription.reviewNote && { reviewNote: subscription.reviewNote }),
      },
      relationships: {
        group: {
          data: {
            type: "subscriptionGroups",
            id: groupId,
          },
        },
      },
    },
  };

  const response = await createSubscriptionAPI(createRequest);

  if (!response.data?.id) {
    throw new Error("No subscription ID returned from creation");
  }

  logger.debug(`Successfully created subscription: ${response.data.id}`);

  return response.data.id;
}

// Update an existing subscription
export async function updateExistingSubscription(
  appId: string,
  productId: string,
  changes: {
    referenceName?: string;
    familySharable?: boolean;
    groupLevel?: number;
    subscriptionPeriod?: string;
    reviewNote?: string;
  },
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(`Updating subscription: ${productId}`);

  // Get the subscription ID using utility function or fallback
  const subscriptionId = currentStateResponse
    ? extractSubscriptionId(currentStateResponse, productId)
    : await getSubscriptionIdByProductId(appId, productId);

  if (!subscriptionId) {
    throw new Error(
      `Could not find subscription with product ID: ${productId}`
    );
  }

  const updateRequest: SubscriptionUpdateRequest = {
    data: {
      type: "subscriptions",
      id: subscriptionId,
      attributes: {
        ...(changes.referenceName && { name: changes.referenceName }),
        ...(changes.familySharable !== undefined && {
          familySharable: changes.familySharable,
        }),
        ...(changes.groupLevel !== undefined && {
          groupLevel: changes.groupLevel,
        }),
        ...(changes.subscriptionPeriod && {
          subscriptionPeriod: changes.subscriptionPeriod as any,
        }),
        ...(changes.reviewNote !== undefined && {
          reviewNote: changes.reviewNote,
        }),
      },
    },
  };

  const response = await updateSubscriptionAPI(subscriptionId, updateRequest);

  if (!response.data?.id) {
    throw new Error("No subscription ID returned from update");
  }

  logger.debug(`Successfully updated subscription: ${response.data.id}`);
}

// Create a new subscription localization
export async function createSubscriptionLocalization(
  appId: string,
  productId: string,
  localization: { locale: string; name: string; description?: string },
  currentStateResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptions?: Map<string, string>
): Promise<void> {
  logger.debug(
    `Creating subscription localization: ${productId} - ${localization.locale}`
  );

  // Get the subscription ID, checking newly created subscriptions first
  let subscriptionId: string | null = null;

  if (newlyCreatedSubscriptions?.has(productId)) {
    subscriptionId = newlyCreatedSubscriptions.get(productId)!;
  } else if (currentStateResponse) {
    subscriptionId = extractSubscriptionId(currentStateResponse, productId);
  } else {
    subscriptionId = await getSubscriptionIdByProductId(appId, productId);
  }

  if (!subscriptionId) {
    throw new Error(
      `Could not find subscription with product ID: ${productId}`
    );
  }

  const createRequest = {
    data: {
      type: "subscriptionLocalizations" as const,
      attributes: {
        name: localization.name,
        locale: localization.locale,
        ...(localization.description && {
          description: localization.description,
        }),
      },
      relationships: {
        subscription: {
          data: {
            type: "subscriptions" as const,
            id: subscriptionId,
          },
        },
      },
    },
  };

  const response = await createSubscriptionLocalizationAPI(createRequest);

  if (!response.data?.id) {
    throw new Error("No subscription localization ID returned from creation");
  }

  logger.debug(
    `Successfully created subscription localization: ${response.data.id}`
  );
}

// Update an existing subscription localization
export async function updateSubscriptionLocalization(
  appId: string,
  productId: string,
  locale: string,
  changes: { name?: string; description?: string },
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(`Updating subscription localization: ${productId} - ${locale}`);

  // Try to get the localization ID from included resources first
  let localizationId: string | null = null;

  if (currentStateResponse) {
    localizationId = extractSubscriptionLocalizationId(
      currentStateResponse,
      productId,
      locale
    );
  }

  // If not found in included resources, fall back to individual fetch
  if (!localizationId) {
    localizationId = await getSubscriptionLocalizationId(
      appId,
      productId,
      locale
    );
  }

  if (!localizationId) {
    throw new Error(
      `Could not find subscription localization with product ID: ${productId} and locale: ${locale}`
    );
  }

  const updateRequest = {
    data: {
      type: "subscriptionLocalizations" as const,
      id: localizationId,
      attributes: {
        ...(changes.name && { name: changes.name }),
        ...(changes.description && { description: changes.description }),
      },
    },
  };

  const response = await updateSubscriptionLocalizationAPI(
    localizationId,
    updateRequest
  );

  if (!response.data?.id) {
    throw new Error("No subscription localization ID returned from update");
  }

  logger.debug(
    `Successfully updated subscription localization: ${response.data.id}`
  );
}

// Delete a subscription localization
export async function deleteSubscriptionLocalization(
  appId: string,
  productId: string,
  locale: string,
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(`Deleting subscription localization: ${productId} - ${locale}`);

  // Try to get the localization ID from included resources first
  let localizationId: string | null = null;

  if (currentStateResponse) {
    localizationId = extractSubscriptionLocalizationId(
      currentStateResponse,
      productId,
      locale
    );
  }

  // If not found in included resources, fall back to individual fetch
  if (!localizationId) {
    localizationId = await getSubscriptionLocalizationId(
      appId,
      productId,
      locale
    );
  }

  if (!localizationId) {
    throw new Error(
      `Could not find subscription localization with product ID: ${productId} and locale: ${locale}`
    );
  }

  await deleteSubscriptionLocalizationAPI(localizationId);

  logger.debug(
    `Successfully deleted subscription localization: ${localizationId}`
  );
}
