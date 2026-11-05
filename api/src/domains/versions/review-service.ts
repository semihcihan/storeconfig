import { AppReviewInformationSchema } from "@semihcihan/shared";
import type { z } from "zod";
import { AppStoreVersionService } from "./service";
import {
  getAppReviewDetail,
  createAppReviewDetail,
  updateAppReviewDetail,
} from "./review-api-client";

type AppReviewInformation = z.infer<typeof AppReviewInformationSchema>;

async function getLatestVersionId(appId: string) {
  const service = new AppStoreVersionService();
  const version = service.findLatestVersion(
    await service.getVersionsForApp(appId)
  );
  if (!version) throw new Error(`No valid IOS version found for app ${appId}`);
  return version.id;
}

export async function fetchAppReviewInformation(
  appId: string
): Promise<AppReviewInformation | undefined> {
  const detail = await getAppReviewDetail(await getLatestVersionId(appId));
  if (!detail?.attributes) return undefined;
  const result: AppReviewInformation = {};
  for (const key of Object.keys(
    AppReviewInformationSchema.shape
  ) as (keyof AppReviewInformation)[]) {
    const value = detail.attributes[key];
    if (value != null && (key === "notes" || value !== "")) result[key] = value;
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

export async function applyAppReviewInformation(
  appId: string,
  information: AppReviewInformation
): Promise<void> {
  const versionId = await getLatestVersionId(appId);
  const detail = await getAppReviewDetail(versionId);
  if (detail) {
    await updateAppReviewDetail(detail.id, information);
  } else {
    await createAppReviewDetail(versionId, information);
  }
}
