import { AppStoreVersionService } from "./app-store-version-service";
import { AppStoreVersionLocalizationService } from "./app-store-version-localization-service";
import { AppInfoLocalizationService } from "./app-info-localization-service";
import { AppInfoService } from "./app-info-service";
import type {
  AppStoreModelSchema,
  AppStoreLocalizationSchema,
  AppInfoMetadataSchema,
} from "../models/app-store";
import { z } from "zod";

export class AppStoreVersionAggregatorService {
  private versionService: AppStoreVersionService;
  private versionLocalizationService: AppStoreVersionLocalizationService;
  private appInfoLocalizationService: AppInfoLocalizationService;
  private appInfoService: AppInfoService;

  constructor() {
    this.versionService = new AppStoreVersionService();
    this.versionLocalizationService = new AppStoreVersionLocalizationService();
    this.appInfoLocalizationService = new AppInfoLocalizationService();
    this.appInfoService = new AppInfoService();
  }

  async applyVersionMetadata(
    appId: string,
    data: z.infer<typeof AppStoreModelSchema>
  ): Promise<void> {
    const errors: string[] = [];

    try {
      // Handle version string
      if (data.versionString) {
        await this.handleVersionString(appId, data.versionString);
      }

      // Handle unified localizations
      if (data.localizations && data.localizations.length > 0) {
        await this.handleUnifiedLocalizations(appId, data.localizations);
      }

      // Handle app info metadata
      if (data.appInfoMetadata) {
        await this.handleAppInfoMetadata(appId, data.appInfoMetadata);
      }
    } catch (error) {
      errors.push(
        `Failed to apply version metadata: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    if (errors.length > 0) {
      throw new Error(
        `Version metadata application failed:\n${errors.join("\n")}`
      );
    }
  }

  private async handleVersionString(
    appId: string,
    versionString: string
  ): Promise<void> {
    try {
      const versions = await this.versionService.getVersionsForApp(appId);

      if (versions.length === 0) {
        await this.versionService.createVersion(appId, versionString);
      } else {
        const latestVersion = versions[0];
        await this.versionService.updateVersion(
          latestVersion.id,
          versionString
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

  private async handleUnifiedLocalizations(
    appId: string,
    localizations: z.infer<typeof AppStoreLocalizationSchema>[]
  ): Promise<void> {
    try {
      const versions = await this.versionService.getVersionsForApp(appId);
      if (versions.length === 0) {
        throw new Error("No app store version found. Create a version first.");
      }

      const latestVersion = versions[0];
      const appInfos = await this.appInfoService.getAppInfoForApp(appId);
      if (appInfos.length === 0) {
        throw new Error("No app info found. Cannot apply localizations.");
      }

      const appInfo = appInfos[0];

      for (const localization of localizations) {
        await this.handleSingleLocalization(
          latestVersion.id,
          appInfo.id,
          localization
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to handle unified localizations: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async handleSingleLocalization(
    versionId: string,
    appInfoId: string,
    localization: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<void> {
    const locale = localization.locale;

    // Handle app info localizations (app-level fields)
    const appInfoFields = {
      locale: localization.locale,
      name: localization.name,
      subtitle: localization.subtitle,
      privacyPolicyUrl: localization.privacyPolicyUrl,
      privacyChoicesUrl: localization.privacyChoicesUrl,
    };

    if (this.hasAppInfoFields(appInfoFields)) {
      await this.handleAppInfoLocalization(appInfoId, locale, appInfoFields);
    }

    // Handle version localizations (version-specific fields)
    const versionFields = {
      locale: localization.locale,
      description: localization.description,
      keywords: localization.keywords,
      marketingUrl: localization.marketingUrl,
      promotionalText: localization.promotionalText,
      supportUrl: localization.supportUrl,
      whatsNew: localization.whatsNew,
    };

    if (this.hasVersionFields(versionFields)) {
      await this.handleVersionLocalization(versionId, locale, versionFields);
    }
  }

  private async handleAppInfoLocalization(
    appInfoId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<void> {
    try {
      const existingLocalization =
        await this.appInfoLocalizationService.findLocalizationByLocale(
          appInfoId,
          locale
        );

      if (existingLocalization) {
        await this.appInfoLocalizationService.updateLocalization(
          existingLocalization.id,
          localizationData
        );
      } else {
        await this.appInfoLocalizationService.createLocalization(
          appInfoId,
          locale,
          localizationData
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to handle app info localization for ${locale}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async handleVersionLocalization(
    versionId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<void> {
    try {
      const existingLocalization =
        await this.versionLocalizationService.findLocalizationByLocale(
          versionId,
          locale
        );

      if (existingLocalization) {
        await this.versionLocalizationService.updateLocalization(
          existingLocalization.id,
          localizationData
        );
      } else {
        await this.versionLocalizationService.createLocalization(
          versionId,
          locale,
          localizationData
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to handle version localization for ${locale}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async handleAppInfoMetadata(
    appId: string,
    metadata: z.infer<typeof AppInfoMetadataSchema>
  ): Promise<void> {
    try {
      const appInfos = await this.appInfoService.getAppInfoForApp(appId);
      if (appInfos.length === 0) {
        throw new Error("No app info found. Cannot apply metadata.");
      }

      const appInfo = appInfos[0];
      await this.appInfoService.updateAppInfo(appInfo.id, metadata);
    } catch (error) {
      throw new Error(
        `Failed to handle app info metadata: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private hasAppInfoFields(
    localization: z.infer<typeof AppStoreLocalizationSchema>
  ): boolean {
    return !!(
      localization.name ||
      localization.subtitle ||
      localization.privacyPolicyUrl ||
      localization.privacyChoicesUrl
    );
  }

  private hasVersionFields(
    localization: z.infer<typeof AppStoreLocalizationSchema>
  ): boolean {
    return !!(
      localization.description ||
      localization.keywords ||
      localization.marketingUrl ||
      localization.promotionalText ||
      localization.supportUrl ||
      localization.whatsNew
    );
  }
}
