import {
  getAppInfo,
  updateAppInfo,
  getAppInfosForApp,
} from "../domains/app-store/api-client";
import type { AppInfoMetadataSchema } from "../models/app-store";
import type { components } from "../generated/app-store-connect-api";
import { z } from "zod";

type AppInfo = components["schemas"]["AppInfoResponse"]["data"];

export class AppInfoService {
  async getAppInfo(appInfoId: string): Promise<AppInfo> {
    const response = await getAppInfo(appInfoId);
    return response.data;
  }

  async updateAppInfo(
    appInfoId: string,
    metadata: z.infer<typeof AppInfoMetadataSchema>
  ): Promise<AppInfo> {
    const response = await updateAppInfo(appInfoId, metadata);
    return response.data;
  }

  async getAppInfoForApp(appId: string): Promise<AppInfo[]> {
    const response = await getAppInfosForApp(appId);
    return response.data;
  }
}
