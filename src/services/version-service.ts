import {
  createAppStoreVersion,
  getAppStoreVersion,
  updateAppStoreVersion,
  deleteAppStoreVersion,
  getAppStoreVersionsForApp,
} from "../domains/versions/api-client";
import type { components } from "../generated/app-store-connect-api";

type AppStoreVersion = components["schemas"]["AppStoreVersionResponse"]["data"];

export type AppVersionState =
  | "ACCEPTED"
  | "DEVELOPER_REJECTED"
  | "IN_REVIEW"
  | "INVALID_BINARY"
  | "METADATA_REJECTED"
  | "PENDING_APPLE_RELEASE"
  | "PENDING_DEVELOPER_RELEASE"
  | "PREPARE_FOR_SUBMISSION"
  | "PROCESSING_FOR_DISTRIBUTION"
  | "READY_FOR_DISTRIBUTION"
  | "READY_FOR_REVIEW"
  | "REJECTED"
  | "REPLACED_WITH_NEW_VERSION"
  | "WAITING_FOR_EXPORT_COMPLIANCE"
  | "WAITING_FOR_REVIEW";

export class AppStoreVersionService {
  async createVersion(
    appId: string,
    versionString: string,
    copyright?: string
  ): Promise<AppStoreVersion> {
    const response = await createAppStoreVersion(
      appId,
      versionString,
      copyright
    );
    return response.data;
  }

  async getVersion(versionId: string): Promise<AppStoreVersion> {
    const response = await getAppStoreVersion(versionId);
    return response.data;
  }

  async updateVersion(
    versionId: string,
    versionString: string,
    copyright?: string
  ): Promise<AppStoreVersion> {
    const response = await updateAppStoreVersion(
      versionId,
      versionString,
      copyright
    );
    return response.data;
  }

  async deleteVersion(versionId: string): Promise<void> {
    await deleteAppStoreVersion(versionId);
  }

  async getVersionsForApp(appId: string): Promise<AppStoreVersion[]> {
    const response = await getAppStoreVersionsForApp(appId);
    return response.data;
  }
}
