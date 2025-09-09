import {
  createAppStoreVersion,
  getAppStoreVersion,
  updateAppStoreVersion,
  deleteAppStoreVersion,
  getAppStoreVersionsForApp,
} from "./api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { logger } from "@semihcihan/shared";
import {
  ContextualError,
  isVersionNotUpdatableError,
} from "@semihcihan/shared";
import { AppStoreModelSchema } from "@semihcihan/shared";
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
    logger.debug(`Fetching version metadata for app ${appId}`);
    const versions = await this.getVersionsForApp(appId);
    const latestVersion = this.findLatestVersion(versions);
    if (!latestVersion) {
      throw new Error(`No valid version found for app ${appId}`);
    }

    const versionString = latestVersion.attributes?.versionString;
    const copyright = latestVersion.attributes?.copyright ?? undefined;

    return {
      versionString,
      copyright,
    };
  }

  async applyVersionMetadata(
    appId: string,
    data: z.infer<typeof AppStoreModelSchema>
  ): Promise<void> {
    logger.debug(
      `Applying version metadata for app ${appId}: versionString = ${data.versionString}, copyright = ${data.copyright}`
    );

    if (data.versionString || data.copyright !== undefined) {
      await this.handleVersionString(appId, data.versionString, data.copyright);
    }
  }

  private async handleVersionString(
    appId: string,
    versionString?: string,
    copyright?: string
  ): Promise<void> {
    const versions = await this.getVersionsForApp(appId);

    if (versions.length === 0) {
      if (!versionString) {
        throw new Error(
          "Version string is required when creating a new version"
        );
      }
      logger.debug(
        `Creating new version for app ${appId}: versionString = ${versionString}`
      );
      await this.createVersion(appId, versionString, copyright);
    } else {
      const latestVersion = this.findLatestVersion(versions);
      if (!latestVersion) {
        throw new Error("No valid version found to update");
      }
      try {
        logger.debug(
          `Attempting to update version for app ${appId}: versionString = ${versionString}`
        );
        await this.updateVersion(
          latestVersion.id,
          versionString || latestVersion.attributes?.versionString || "",
          copyright
        );
      } catch (error) {
        // Only fallback to creating a new version if the error indicates the version cannot be updated
        if (isVersionNotUpdatableError(error)) {
          logger.debug(
            `Update failed for version ${latestVersion.id} due to invalid state, creating new version: ${error}`
          );
          if (!versionString) {
            throw new Error(
              "Version string is required when creating a new version after update failure"
            );
          }
          await this.createVersion(appId, versionString, copyright);
        } else {
          // Re-throw other errors (network issues, auth problems, etc.)
          throw error;
        }
      }
    }
  }
}
