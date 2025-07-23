import {
  createAppStoreVersion,
  getAppStoreVersion,
  updateAppStoreVersion,
  deleteAppStoreVersion,
  getAppStoreVersionsForApp,
} from "./api-client";
import type { components } from "../../generated/app-store-connect-api";
import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { z } from "zod";

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

  private findLatestVersion(
    versions: AppStoreVersion[]
  ): AppStoreVersion | null {
    if (versions.length === 0) {
      return null;
    }

    return versions.reduce((latest, current) => {
      const latestCreatedDate = latest.attributes?.createdDate;
      const currentCreatedDate = current.attributes?.createdDate;

      if (!latestCreatedDate) return current;
      if (!currentCreatedDate) return latest;

      return new Date(currentCreatedDate) > new Date(latestCreatedDate)
        ? current
        : latest;
    });
  }

  async fetchVersionMetadata(appId: string): Promise<{
    versionString?: string;
    copyright?: string;
  }> {
    try {
      const versions = await this.getVersionsForApp(appId);
      const latestVersion = this.findLatestVersion(versions);
      if (!latestVersion) {
        logger.warn(`No valid version found for app ${appId}`);
        return {};
      }

      const versionString = latestVersion.attributes?.versionString;
      const copyright = latestVersion.attributes?.copyright ?? undefined;

      return {
        versionString,
        copyright,
      };
    } catch (error) {
      logger.warn(
        `Failed to fetch version metadata for app ${appId}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return {};
    }
  }

  async applyVersionMetadata(
    appId: string,
    data: z.infer<typeof AppStoreModelSchema>
  ): Promise<void> {
    try {
      // Handle version string and copyright
      if (data.versionString || data.copyright !== undefined) {
        await this.handleVersionString(
          appId,
          data.versionString,
          data.copyright
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to apply version metadata: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async handleVersionString(
    appId: string,
    versionString?: string,
    copyright?: string
  ): Promise<void> {
    try {
      const versions = await this.getVersionsForApp(appId);

      if (versions.length === 0) {
        if (!versionString) {
          throw new Error(
            "Version string is required when creating a new version"
          );
        }
        await this.createVersion(appId, versionString, copyright);
      } else {
        const latestVersion = this.findLatestVersion(versions);
        if (!latestVersion) {
          throw new Error("No valid version found to update");
        }
        await this.updateVersion(
          latestVersion.id,
          versionString || latestVersion.attributes?.versionString || "",
          copyright
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to handle version string: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
