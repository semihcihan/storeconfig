import { api } from "../../services/api";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { ContextualError } from "@semihcihan/shared";
import { API_FIELD_CONFIGS, API_LIMITS } from "../../helpers/constants";

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
    throw new ContextualError(`Failed to fetch app`, {
      appleError: response.error,
    });
  }

  return response.data;
}

export async function fetchApps(): Promise<
  components["schemas"]["AppsResponse"]
> {
  const config = API_FIELD_CONFIGS.apps;
  const response = await api.GET("/v1/apps", {
    params: {
      query: {
        "fields[apps]": ["name"],
        "fields[appStoreVersions]": ["platform"],
        include: config.include as any,
        "filter[appStoreVersions.platform]": ["IOS"],
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
      },
    },
  });

  if (!response.data) {
    throw new ContextualError(`Failed to fetch apps`, {
      appleError: response.error,
    });
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
    throw new ContextualError(`Failed to update app`, {
      appleError: response.error,
    });
  }

  return response.data;
}
