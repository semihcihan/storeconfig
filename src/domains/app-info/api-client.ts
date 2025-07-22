import { api } from "../../services/api";
import type { components } from "../../generated/app-store-connect-api";

export async function createAppInfoLocalization(
  appInfoId: string,
  locale: string,
  localizationData: {
    name: string;
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
          name: localizationData.name,
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
        attributes: localizationData,
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

export async function getAppInfosForApp(
  appId: string
): Promise<components["schemas"]["AppInfosResponse"]> {
  const response = await api.GET("/v1/apps/{id}/appInfos", {
    params: {
      path: { id: appId },
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
