import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { isNotFoundError } from "../../helpers/error-handling-helpers";
import { paginateV2 } from "../../helpers/pagination-helpers";
import { logger } from "../../utils/logger";
import type { components } from "../../generated/app-store-connect-api";

type AppAvailabilityV2Response =
  components["schemas"]["AppAvailabilityV2Response"];

// Fetch app availability with all territory availabilities
export async function fetchAppAvailability(
  appId: string
): Promise<AppAvailabilityV2Response | null> {
  // First, get the app availability ID without including territoryAvailabilities
  const appAvailabilityResponse = await api.GET(
    "/v1/apps/{id}/appAvailabilityV2",
    {
      params: {
        path: { id: appId },
        query: {
          "fields[appAvailabilities]": API_FIELD_CONFIGS.appAvailability
            .fieldsAppAvailabilities as any,
        },
      },
    }
  );

  if (appAvailabilityResponse.error) {
    const is404Error = isNotFoundError(appAvailabilityResponse.error);
    if (is404Error) {
      logger.info(
        `App availability not found for app ${appId} (not created yet)`
      );
      return null;
    }
    throw appAvailabilityResponse.error;
  }

  const appAvailabilityId = appAvailabilityResponse.data?.data?.id;
  if (!appAvailabilityId) {
    logger.warn(`No app availability found for app ${appId}`);
    return null;
  }

  // Now fetch all territory availabilities using the v2 endpoint with proper pagination
  const allTerritoryAvailabilities = await paginateV2(
    "/v2/appAvailabilities/{id}/territoryAvailabilities",
    appAvailabilityId,
    {
      "fields[territoryAvailabilities]": API_FIELD_CONFIGS
        .territoryAvailabilities.fieldsTerritoryAvailabilities as any,
    }
  );

  // Combine the results to match the expected structure
  return {
    data: appAvailabilityResponse.data.data,
    included: allTerritoryAvailabilities as any,
    links: appAvailabilityResponse.data.links,
  };
}

// NEW: App Store Version API functions
export async function createAppStoreVersion(
  appId: string,
  versionString: string,
  copyright?: string
): Promise<components["schemas"]["AppStoreVersionResponse"]> {
  const response = await api.POST("/v1/appStoreVersions", {
    body: {
      data: {
        type: "appStoreVersions",
        attributes: {
          platform: "IOS",
          versionString,
          ...(copyright !== undefined && { copyright }),
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
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to create app store version: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function getAppStoreVersion(
  versionId: string
): Promise<components["schemas"]["AppStoreVersionResponse"]> {
  const response = await api.GET("/v1/appStoreVersions/{id}", {
    params: {
      path: { id: versionId },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app store version: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function updateAppStoreVersion(
  versionId: string,
  versionString: string,
  copyright?: string
): Promise<components["schemas"]["AppStoreVersionResponse"]> {
  const response = await api.PATCH("/v1/appStoreVersions/{id}", {
    params: {
      path: { id: versionId },
    },
    body: {
      data: {
        type: "appStoreVersions",
        id: versionId,
        attributes: {
          versionString,
          ...(copyright !== undefined && { copyright }),
        },
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update app store version: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function deleteAppStoreVersion(versionId: string): Promise<void> {
  const response = await api.DELETE("/v1/appStoreVersions/{id}", {
    params: {
      path: { id: versionId },
    },
  });

  if (response.error) {
    throw new Error(
      `Failed to delete app store version: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }
}

export async function getAppStoreVersionsForApp(
  appId: string
): Promise<components["schemas"]["AppStoreVersionsResponse"]> {
  const response = await api.GET("/v1/apps/{id}/appStoreVersions", {
    params: {
      path: { id: appId },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app store versions: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

// NEW: App Store Version Localization API functions
export async function createAppStoreVersionLocalization(
  versionId: string,
  locale: string,
  localizationData: {
    description?: string;
    keywords?: string;
    marketingUrl?: string;
    promotionalText?: string;
    supportUrl?: string;
    whatsNew?: string;
  }
): Promise<components["schemas"]["AppStoreVersionLocalizationResponse"]> {
  const response = await api.POST("/v1/appStoreVersionLocalizations", {
    body: {
      data: {
        type: "appStoreVersionLocalizations",
        attributes: {
          locale,
          description: localizationData.description,
          keywords: localizationData.keywords,
          marketingUrl: localizationData.marketingUrl,
          promotionalText: localizationData.promotionalText,
          supportUrl: localizationData.supportUrl,
          whatsNew: localizationData.whatsNew,
        },
        relationships: {
          appStoreVersion: {
            data: {
              type: "appStoreVersions",
              id: versionId,
            },
          },
        },
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to create app store version localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function getAppStoreVersionLocalization(
  localizationId: string
): Promise<components["schemas"]["AppStoreVersionLocalizationResponse"]> {
  const response = await api.GET("/v1/appStoreVersionLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app store version localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function updateAppStoreVersionLocalization(
  localizationId: string,
  localizationData: {
    description?: string;
    keywords?: string;
    marketingUrl?: string;
    promotionalText?: string;
    supportUrl?: string;
    whatsNew?: string;
  }
): Promise<components["schemas"]["AppStoreVersionLocalizationResponse"]> {
  const response = await api.PATCH("/v1/appStoreVersionLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
    body: {
      data: {
        type: "appStoreVersionLocalizations",
        id: localizationId,
        attributes: {
          description: localizationData.description,
          keywords: localizationData.keywords,
          marketingUrl: localizationData.marketingUrl,
          promotionalText: localizationData.promotionalText,
          supportUrl: localizationData.supportUrl,
          whatsNew: localizationData.whatsNew,
        },
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update app store version localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function fetchApp(
  appId: string
): Promise<components["schemas"]["AppResponse"]> {
  const response = await api.GET("/v1/apps/{id}", {
    params: {
      path: { id: appId },
      query: {
        "fields[apps]": ["primaryLocale", "name", "bundleId", "sku"],
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to fetch app: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function updateApp(
  appId: string,
  attributes: {
    primaryLocale?: string;
    name?: string;
    bundleId?: string;
    copyright?: string;
  }
): Promise<components["schemas"]["AppResponse"]> {
  const response = await api.PATCH("/v1/apps/{id}", {
    params: { path: { id: appId } },
    body: {
      data: {
        type: "apps",
        id: appId,
        attributes,
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update app: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function deleteAppStoreVersionLocalization(
  localizationId: string
): Promise<void> {
  const response = await api.DELETE("/v1/appStoreVersionLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
  });

  if (response.error) {
    throw new Error(
      `Failed to delete app store version localization: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }
}

export async function getAppStoreVersionLocalizationsForVersion(
  versionId: string
): Promise<components["schemas"]["AppStoreVersionLocalizationsResponse"]> {
  const response = await api.GET(
    "/v1/appStoreVersions/{id}/appStoreVersionLocalizations",
    {
      params: {
        path: { id: versionId },
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to get app store version localizations: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}
