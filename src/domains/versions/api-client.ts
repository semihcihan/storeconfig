import { api } from "../../services/api";
import type { components } from "../../generated/app-store-connect-api";

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
      query: {
        "filter[platform]": ["IOS"],
      },
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
