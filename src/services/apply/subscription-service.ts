import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { z } from "zod";
import { api } from "../api";
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

// Helper function to get existing subscription group ID by reference name (fallback when no raw response provided)
async function getSubscriptionGroupIdByReferenceName(
  appId: string,
  referenceName: string
): Promise<string | null> {
  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: { limit: 200 },
    },
  });

  if (response.error) {
    throw response.error;
  }

  return extractSubscriptionGroupId(response.data, referenceName);
}

// Helper function to get existing subscription group localization ID (fallback when no raw response provided)
async function getSubscriptionGroupLocalizationId(
  appId: string,
  groupReferenceName: string,
  locale: string
): Promise<string | null> {
  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: ["subscriptionGroupLocalizations"],
        "fields[subscriptionGroupLocalizations]": [
          "name",
          "customAppName",
          "locale",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  return extractSubscriptionGroupLocalizationId(
    response.data,
    groupReferenceName,
    locale
  );
}

// Create a new subscription group
export async function createNewSubscriptionGroup(
  appId: string,
  group: AppStoreModel["subscriptionGroups"][0]
): Promise<void> {
  logger.info(`Creating new subscription group: ${group.referenceName}`);

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

  const response = await api.POST("/v1/subscriptionGroups", {
    body: createRequest,
  });

  if (response.error) {
    throw response.error;
  }

  if (!response.data?.data?.id) {
    throw new Error("No subscription group ID returned from creation");
  }

  logger.info(
    `Successfully created subscription group: ${response.data.data.id}`
  );
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
  logger.info(`Updating subscription group: ${referenceName}`);

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

  const response = await api.PATCH("/v1/subscriptionGroups/{id}", {
    params: { path: { id: groupId } },
    body: updateRequest,
  });

  if (response.error) {
    throw response.error;
  }

  if (!response.data?.data?.id) {
    throw new Error("No subscription group ID returned from update");
  }

  logger.info(
    `Successfully updated subscription group: ${response.data.data.id}`
  );
}

// Create a new subscription group localization
export async function createSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  localization: { locale: string; name: string; customName?: string | null },
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.info(
    `Creating subscription group localization: ${groupReferenceName} - ${localization.locale}`
  );

  // Get the existing subscription group ID using utility function or fallback
  const groupId = currentStateResponse
    ? extractSubscriptionGroupId(currentStateResponse, groupReferenceName)
    : await getSubscriptionGroupIdByReferenceName(appId, groupReferenceName);

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

  const response = await api.POST("/v1/subscriptionGroupLocalizations", {
    body: createRequest,
  });

  if (response.error) {
    throw response.error;
  }

  if (!response.data?.data?.id) {
    throw new Error(
      "No subscription group localization ID returned from creation"
    );
  }

  logger.info(
    `Successfully created subscription group localization: ${response.data.data.id}`
  );
}

// Update an existing subscription group localization
export async function updateSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  locale: string,
  changes: { name?: string; customName?: string | null },
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.info(
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
        ...(changes.customName && { customAppName: changes.customName }),
      },
    },
  };

  const response = await api.PATCH("/v1/subscriptionGroupLocalizations/{id}", {
    params: { path: { id: localizationId } },
    body: updateRequest,
  });

  if (response.error) {
    throw response.error;
  }

  if (!response.data?.data?.id) {
    throw new Error(
      "No subscription group localization ID returned from update"
    );
  }

  logger.info(
    `Successfully updated subscription group localization: ${response.data.data.id}`
  );
}

// Delete an existing subscription group localization
export async function deleteSubscriptionGroupLocalization(
  appId: string,
  groupReferenceName: string,
  locale: string,
  currentStateResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.info(
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

  const response = await api.DELETE("/v1/subscriptionGroupLocalizations/{id}", {
    params: { path: { id: localizationId } },
  });

  if (response.error) {
    throw response.error;
  }

  logger.info(
    `Successfully deleted subscription group localization: ${localizationId}`
  );
}
