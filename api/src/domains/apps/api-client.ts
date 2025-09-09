import { api } from "../../services/api";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { ContextualError } from "@semihcihan/shared";

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
    throw new ContextualError(
      `Failed to fetch app: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`,
      response.error
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
    throw new ContextualError(
      `Failed to update app: ${
        response.error?.errors?.[0]?.detail || "Unknown error"
      }`,
      response.error
    );
  }

  return response.data;
}
