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
  versionString: string
): Promise<components["schemas"]["AppStoreVersionResponse"]> {
  const response = await api.POST("/v1/appStoreVersions", {
    body: {
      data: {
        type: "appStoreVersions",
        attributes: {
          platform: "IOS",
          versionString,
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
  versionString: string
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

// NEW: App Info API functions
export async function getAppInfo(
  appInfoId: string
): Promise<components["schemas"]["AppInfoResponse"]> {
  const response = await api.GET("/v1/appInfos/{id}", {
    params: {
      path: { id: appInfoId },
      query: {
        include: [
          "primaryCategory",
          "primarySubcategoryOne",
          "primarySubcategoryTwo",
          "secondaryCategory",
          "secondarySubcategoryOne",
          "secondarySubcategoryTwo",
        ],
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app info: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function updateAppInfo(
  appInfoId: string,
  metadata: {
    primaryCategory?: string;
    secondaryCategory?: string;
    primarySubcategoryOne?: string;
    primarySubcategoryTwo?: string;
    secondarySubcategoryOne?: string;
    secondarySubcategoryTwo?: string;
    contentRightsDeclaration?:
      | "DOES_NOT_USE_THIRD_PARTY_CONTENT"
      | "USES_THIRD_PARTY_CONTENT";
  }
): Promise<components["schemas"]["AppInfoResponse"]> {
  const relationships: any = {};

  if (metadata.primaryCategory) {
    relationships.primaryCategory = {
      data: {
        type: "appCategories",
        id: metadata.primaryCategory,
      },
    };
  }

  if (metadata.secondaryCategory) {
    relationships.secondaryCategory = {
      data: {
        type: "appCategories",
        id: metadata.secondaryCategory,
      },
    };
  }

  if (metadata.primarySubcategoryOne) {
    relationships.primarySubcategoryOne = {
      data: {
        type: "appCategories",
        id: metadata.primarySubcategoryOne,
      },
    };
  }

  if (metadata.primarySubcategoryTwo) {
    relationships.primarySubcategoryTwo = {
      data: {
        type: "appCategories",
        id: metadata.primarySubcategoryTwo,
      },
    };
  }

  if (metadata.secondarySubcategoryOne) {
    relationships.secondarySubcategoryOne = {
      data: {
        type: "appCategories",
        id: metadata.secondarySubcategoryOne,
      },
    };
  }

  if (metadata.secondarySubcategoryTwo) {
    relationships.secondarySubcategoryTwo = {
      data: {
        type: "appCategories",
        id: metadata.secondarySubcategoryTwo,
      },
    };
  }

  const response = await api.PATCH("/v1/appInfos/{id}", {
    params: {
      path: { id: appInfoId },
    },
    body: {
      data: {
        type: "appInfos",
        id: appInfoId,
        ...(Object.keys(relationships).length > 0 && { relationships }),
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update app info: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function getAppInfosForApp(
  appId: string
): Promise<components["schemas"]["AppInfosResponse"]> {
  const response = await api.GET("/v1/apps/{id}/appInfos", {
    params: {
      path: { id: appId },
      query: {
        include: [
          "primaryCategory",
          "primarySubcategoryOne",
          "primarySubcategoryTwo",
          "secondaryCategory",
          "secondarySubcategoryOne",
          "secondarySubcategoryTwo",
        ],
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app infos: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

// NEW: App Info Localization API functions
export async function createAppInfoLocalization(
  appInfoId: string,
  locale: string,
  localizationData: {
    name?: string;
    subtitle?: string;
    privacyPolicyUrl?: string;
    privacyChoicesUrl?: string;
  }
): Promise<components["schemas"]["AppInfoLocalizationResponse"]> {
  const response = await api.POST("/v1/appInfoLocalizations", {
    body: {
      data: {
        type: "appInfoLocalizations",
        attributes: {
          locale,
          name: localizationData.name || "",
          ...(localizationData.subtitle && {
            subtitle: localizationData.subtitle,
          }),
          ...(localizationData.privacyPolicyUrl && {
            privacyPolicyUrl: localizationData.privacyPolicyUrl,
          }),
          ...(localizationData.privacyChoicesUrl && {
            privacyChoicesUrl: localizationData.privacyChoicesUrl,
          }),
        },
        relationships: {
          appInfo: {
            data: {
              type: "appInfos",
              id: appInfoId,
            },
          },
        },
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to create app info localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function getAppInfoLocalization(
  localizationId: string
): Promise<components["schemas"]["AppInfoLocalizationResponse"]> {
  const response = await api.GET("/v1/appInfoLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app info localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function updateAppInfoLocalization(
  localizationId: string,
  localizationData: {
    name?: string;
    subtitle?: string;
    privacyPolicyUrl?: string;
    privacyChoicesUrl?: string;
  }
): Promise<components["schemas"]["AppInfoLocalizationResponse"]> {
  const response = await api.PATCH("/v1/appInfoLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
    body: {
      data: {
        type: "appInfoLocalizations",
        id: localizationId,
        attributes: {
          name: localizationData.name,
          subtitle: localizationData.subtitle,
          privacyPolicyUrl: localizationData.privacyPolicyUrl,
          privacyChoicesUrl: localizationData.privacyChoicesUrl,
        },
      },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update app info localization: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}

export async function deleteAppInfoLocalization(
  localizationId: string
): Promise<void> {
  const response = await api.DELETE("/v1/appInfoLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
  });

  if (response.error) {
    throw new Error(
      `Failed to delete app info localization: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }
}

export async function getAppInfoLocalizationsForAppInfo(
  appInfoId: string
): Promise<components["schemas"]["AppInfoLocalizationsResponse"]> {
  const response = await api.GET("/v1/appInfos/{id}/appInfoLocalizations", {
    params: {
      path: { id: appInfoId },
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to get app info localizations: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  return response.data;
}
