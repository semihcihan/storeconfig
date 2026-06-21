import { logger } from "@semihcihan/shared";
import { AppStoreModelSchema } from "@semihcihan/shared";
import {
  isSubscriptionGroupLocalizationNotUpdatableError,
  isSubscriptionLocalizationNotUpdatableError,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  fetchSubscriptionGroups as fetchSubscriptionGroupsApi,
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
  fetchSubscriptionGroupLocalizations,
  fetchSubscriptionsForGroup,
} from "./api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";

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
type SubscriptionGroupLocalization =
  components["schemas"]["SubscriptionGroupLocalization"];
type SubscriptionLocalization = components["schemas"]["SubscriptionLocalization"];
type SubscriptionGroupsIncludedItem = NonNullable<
  SubscriptionGroupsResponse["included"]
>[number];
type SubscriptionCreateRequest =
  components["schemas"]["SubscriptionCreateRequest"];
type SubscriptionUpdateRequest =
  components["schemas"]["SubscriptionUpdateRequest"];
type SubscriptionIncludedItem =
  | SubscriptionGroupsIncludedItem
  | SubscriptionLocalization;

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
const APPROVED_LOCALIZATION_STATE = "APPROVED";

function selectPreferredLocalization<T extends { attributes?: { state?: string } }>(
  localizations: T[]
): T | null {
  if (localizations.length === 0) {
    return null;
  }

  return (
    localizations.find(
      (localization) =>
        localization.attributes?.state !== APPROVED_LOCALIZATION_STATE
    ) || localizations[0] || null
  );
}

function isSubscriptionResource(
  item: SubscriptionIncludedItem
): item is components["schemas"]["Subscription"] {
  return item.type === "subscriptions";
}

function isSubscriptionLocalizationResource(
  item: SubscriptionIncludedItem
): item is SubscriptionLocalization {
  return item.type === "subscriptionLocalizations";
}

function buildGroupLocalizationRelationshipData(
  localizations: components["schemas"]["SubscriptionGroupLocalization"][]
): { id: string; type: "subscriptionGroupLocalizations" }[] {
  return localizations.map((localization) => ({
    id: localization.id,
    type: "subscriptionGroupLocalizations",
  }));
}

function buildSubscriptionRelationshipData(
  subscriptions: components["schemas"]["Subscription"][]
): { id: string; type: "subscriptions" }[] {
  return subscriptions.map((subscription) => ({
    id: subscription.id,
    type: "subscriptions",
  }));
}

function mergeIncludedResources(
  existingIncluded: SubscriptionGroupsIncludedItem[] = [],
  newIncluded: Array<
    | components["schemas"]["SubscriptionGroupLocalization"]
    | components["schemas"]["Subscription"]
  >
): SubscriptionGroupsIncludedItem[] {
  const seen = new Set(existingIncluded.map((item) => `${item.type}:${item.id}`));
  const merged = [...existingIncluded];

  newIncluded.forEach((item) => {
    const key = `${item.type}:${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item as SubscriptionGroupsIncludedItem);
    }
  });

  return merged;
}

async function attachGroupLocalizations(
  response: SubscriptionGroupsResponse
): Promise<SubscriptionGroupsResponse> {
  const groups = response.data || [];
  if (groups.length === 0) {
    return response;
  }

  const localizationResults = await Promise.all(
    groups.map(async (group) => {
      const localizationsResponse = await fetchSubscriptionGroupLocalizations(
        group.id
      );
      return {
        groupId: group.id,
        localizations: localizationsResponse.data || [],
      };
    })
  );

  localizationResults.forEach(({ groupId, localizations }) => {
    const group = groups.find((item) => item.id === groupId);
    if (!group) return;

    group.relationships = {
      ...group.relationships,
      subscriptionGroupLocalizations: {
        ...group.relationships?.subscriptionGroupLocalizations,
        data: buildGroupLocalizationRelationshipData(localizations) as any,
      },
    };

    response.included = mergeIncludedResources(
      response.included || [],
      localizations
    ) as any;
  });

  return response;
}

async function attachSubscriptions(
  response: SubscriptionGroupsResponse
): Promise<SubscriptionGroupsResponse> {
  const groups = response.data || [];
  if (groups.length === 0) {
    return response;
  }

  const subscriptionResults = await Promise.all(
    groups.map(async (group) => {
      const subscriptionsResponse = await fetchSubscriptionsForGroup(group.id);
      return {
        groupId: group.id,
        subscriptions: subscriptionsResponse.data || [],
      };
    })
  );

  subscriptionResults.forEach(({ groupId, subscriptions }) => {
    const group = groups.find((item) => item.id === groupId);
    if (!group) return;

    group.relationships = {
      ...group.relationships,
      subscriptions: {
        ...group.relationships?.subscriptions,
        data: buildSubscriptionRelationshipData(subscriptions) as any,
      },
    };

    response.included = mergeIncludedResources(
      response.included || [],
      subscriptions
    ) as any;
  });

  return response;
}

// Note: Does not include subscription localizations
export async function fetchSubscriptionGroups(
  appId: string
): Promise<SubscriptionGroupsResponse> {
  let response = await fetchSubscriptionGroupsApi(appId);
  response = await attachGroupLocalizations(response);
  response = await attachSubscriptions(response);
  return response;
}

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

function extractSubscriptionGroupLocalization(
  apiResponse: SubscriptionGroupsResponse,
  groupReferenceName: string,
  locale: string
): SubscriptionGroupLocalization | null {
  const group = apiResponse.data?.find(
    (group) => group.attributes?.referenceName === groupReferenceName
  );

  if (!group || !apiResponse.included) {
    return null;
  }

  const localizations = apiResponse.included.filter(
    (item: any): item is SubscriptionGroupLocalization =>
      item.type === "subscriptionGroupLocalizations" &&
      item.attributes?.locale === locale &&
      !!group.relationships?.subscriptionGroupLocalizations?.data?.some(
        (rel: any) => rel.id === item.id
      )
  );

  return selectPreferredLocalization(localizations);
}

// Utility function to extract subscription group localization ID from raw API response
function extractSubscriptionGroupLocalizationId(
  apiResponse: SubscriptionGroupsResponse,
  groupReferenceName: string,
  locale: string
): string | null {
  return extractSubscriptionGroupLocalization(
    apiResponse,
    groupReferenceName,
    locale
  )?.id || null;
}

// Helper function to get existing subscription group localization ID (fallback when no raw response provided)
async function getSubscriptionGroupLocalizationId(
  appId: string,
  groupReferenceName: string,
  locale: string
): Promise<string | null> {
  const localization = await getSubscriptionGroupLocalization(
    appId,
    groupReferenceName,
    locale
  );
  return localization?.id || null;
}

async function getSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  locale: string
): Promise<SubscriptionGroupLocalization | null> {
  const response = await fetchSubscriptionGroups(appId);
  return extractSubscriptionGroupLocalization(response, groupReferenceName, locale);
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
    (item): item is components["schemas"]["Subscription"] =>
      isSubscriptionResource(item) && item.attributes?.productId === productId
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

function extractSubscriptionLocalization(
  apiResponse: SubscriptionGroupsResponse,
  productId: string,
  locale: string
): SubscriptionLocalization | null {
  if (!apiResponse.included) {
    return null;
  }

  const included = apiResponse.included as SubscriptionIncludedItem[];

  // Find the subscription in the included resources
  const subscription = included.find(
    (item): item is components["schemas"]["Subscription"] =>
      isSubscriptionResource(item) && item.attributes?.productId === productId
  );

  if (!subscription) {
    return null;
  }

  const localizations = included.filter(
    (item): item is SubscriptionLocalization =>
      isSubscriptionLocalizationResource(item) &&
      item.attributes?.locale === locale &&
      !!(
        subscription.relationships as any
      )?.subscriptionLocalizations?.data?.some((rel: any) => rel.id === item.id)
  );

  return selectPreferredLocalization(localizations);
}

// Utility function to extract subscription localization ID from raw API response
function extractSubscriptionLocalizationId(
  apiResponse: SubscriptionGroupsResponse,
  productId: string,
  locale: string
): string | null {
  return extractSubscriptionLocalization(apiResponse, productId, locale)?.id || null;
}

// Helper function to get existing subscription localization ID (fallback when no raw response provided)
async function getSubscriptionLocalizationId(
  appId: string,
  productId: string,
  locale: string
): Promise<string | null> {
  const localization = await getSubscriptionLocalization(appId, productId, locale);
  return localization?.id || null;
}

async function getSubscriptionLocalization(
  appId: string,
  productId: string,
  locale: string
): Promise<SubscriptionLocalization | null> {
  // First get the subscription ID
  const subscriptionId = await getSubscriptionIdByProductId(appId, productId);

  if (!subscriptionId) {
    return null;
  }

  // Then fetch the subscription localizations
  const response = await fetchSubscriptionLocalizations(subscriptionId);

  const localizationsForLocale =
    response.data?.filter(
      (item): item is SubscriptionLocalization =>
        item.attributes?.locale === locale
    ) || [];

  const localization = selectPreferredLocalization(localizationsForLocale);

  return localization;
}

function buildSubscriptionGroupLocalizationFromExisting(
  locale: string,
  changes: { name?: string; customName?: string | null },
  existingLocalization: SubscriptionGroupLocalization
): { locale: string; name: string; customName?: string | null } {
  return {
    locale,
    name: changes.name ?? existingLocalization.attributes?.name ?? "",
    customName:
      changes.customName !== undefined
        ? changes.customName
        : existingLocalization.attributes?.customAppName ?? null,
  };
}

function buildSubscriptionLocalizationFromExisting(
  locale: string,
  changes: { name?: string; description?: string },
  existingLocalization: SubscriptionLocalization
): { locale: string; name: string; description?: string } {
  return {
    locale,
    name: changes.name ?? existingLocalization.attributes?.name ?? "",
    description:
      changes.description ?? existingLocalization.attributes?.description ?? "",
  };
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
    groupId = extractSubscriptionGroupId(currentStateResponse, groupReferenceName);
  }

  if (!groupId) {
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

  let existingLocalization = currentStateResponse
    ? extractSubscriptionGroupLocalization(
        currentStateResponse,
        groupReferenceName,
        locale
      )
    : null;

  if (!existingLocalization) {
    existingLocalization = await getSubscriptionGroupLocalization(
      appId,
      groupReferenceName,
      locale
    );
  }

  if (existingLocalization?.attributes?.state === APPROVED_LOCALIZATION_STATE) {
    await createSubscriptionGroupLocalization(
      appId,
      groupReferenceName,
      buildSubscriptionGroupLocalizationFromExisting(
        locale,
        changes,
        existingLocalization
      ),
      currentStateResponse,
      newlyCreatedSubscriptionGroups
    );
    return;
  }

  let localizationId = existingLocalization?.id || null;

  if (!localizationId) {
    localizationId = await getSubscriptionGroupLocalizationId(
      appId,
      groupReferenceName,
      locale
    );
  }

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

  let response;
  try {
    response = await updateSubscriptionGroupLocalizationAPI(
      localizationId,
      updateRequest
    );
  } catch (error) {
    if (isSubscriptionGroupLocalizationNotUpdatableError(error)) {
      await createSubscriptionGroupLocalization(
        appId,
        groupReferenceName,
        {
          locale,
          name: changes.name ?? existingLocalization?.attributes?.name ?? "",
          customName:
            changes.customName !== undefined
              ? changes.customName
              : existingLocalization?.attributes?.customAppName ?? null,
        },
        currentStateResponse,
        newlyCreatedSubscriptionGroups
      );
      return;
    }
    throw error;
  }

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
  let localizationId = currentStateResponse
    ? extractSubscriptionGroupLocalizationId(
        currentStateResponse,
        groupReferenceName,
        locale
      )
    : null;

  if (!localizationId) {
    localizationId = await getSubscriptionGroupLocalizationId(
      appId,
      groupReferenceName,
      locale
    );
  }

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
  }

  if (!subscriptionId) {
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

  let existingLocalization = currentStateResponse
    ? extractSubscriptionLocalization(currentStateResponse, productId, locale)
    : null;

  if (!existingLocalization) {
    existingLocalization = await getSubscriptionLocalization(
      appId,
      productId,
      locale
    );
  }

  if (existingLocalization?.attributes?.state === APPROVED_LOCALIZATION_STATE) {
    await createSubscriptionLocalization(
      appId,
      productId,
      buildSubscriptionLocalizationFromExisting(
        locale,
        changes,
        existingLocalization
      ),
      currentStateResponse
    );
    return;
  }

  let localizationId = existingLocalization?.id || null;

  if (!localizationId) {
    localizationId = await getSubscriptionLocalizationId(appId, productId, locale);
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

  let response;
  try {
    response = await updateSubscriptionLocalizationAPI(
      localizationId,
      updateRequest
    );
  } catch (error) {
    if (isSubscriptionLocalizationNotUpdatableError(error)) {
      await createSubscriptionLocalization(
        appId,
        productId,
        {
          locale,
          name: changes.name ?? existingLocalization?.attributes?.name ?? "",
          description:
            changes.description ??
            existingLocalization?.attributes?.description ??
            "",
        },
        currentStateResponse
      );
      return;
    }
    throw error;
  }

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
