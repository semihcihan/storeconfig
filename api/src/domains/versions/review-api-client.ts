import { api } from "../../services/api";
import {
  AppReviewInformationSchema,
  ContextualError,
} from "@semihcihan/shared";
import type { z } from "zod";

type AppReviewInformation = z.infer<typeof AppReviewInformationSchema>;

export async function getAppReviewDetail(versionId: string) {
  const response = await api.GET(
    "/v1/appStoreVersions/{id}/appStoreReviewDetail",
    { params: { path: { id: versionId } } }
  );
  if (response.response.status === 404) return undefined;
  if (!response.data) {
    throw new ContextualError("Failed to get app review information", {
      appleError: response.error,
    });
  }
  return response.data.data ?? undefined;
}

export async function createAppReviewDetail(
  versionId: string,
  attributes: AppReviewInformation
) {
  const response = await api.POST("/v1/appStoreReviewDetails", {
    body: {
      data: {
        type: "appStoreReviewDetails",
        attributes,
        relationships: {
          appStoreVersion: {
            data: { type: "appStoreVersions", id: versionId },
          },
        },
      },
    },
  });
  if (!response.data) {
    throw new ContextualError("Failed to create app review information", {
      appleError: response.error,
    });
  }
  return response.data.data;
}

export async function updateAppReviewDetail(
  id: string,
  attributes: AppReviewInformation
) {
  const response = await api.PATCH("/v1/appStoreReviewDetails/{id}", {
    params: { path: { id } },
    body: { data: { type: "appStoreReviewDetails", id, attributes } },
  });
  if (!response.data) {
    throw new ContextualError("Failed to update app review information", {
      appleError: response.error,
    });
  }
  return response.data.data;
}
