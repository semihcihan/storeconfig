import { AppStoreVersionService } from "./app-store-version-service";
import { AppStoreVersionLocalizationService } from "./app-store-version-localization-service";
import {
  AppStoreModelSchema,
  AppStoreLocalizationSchema,
} from "../models/app-store";
import { LocaleCodeSchema } from "../models/locales";
import { z } from "zod";
import { logger } from "../utils/logger";

export class AppStoreVersionAggregatorService {
  private versionService: AppStoreVersionService;
  private versionLocalizationService: AppStoreVersionLocalizationService;

  constructor() {
    this.versionService = new AppStoreVersionService();
    this.versionLocalizationService = new AppStoreVersionLocalizationService();
  }

  async fetchVersionMetadata(appId: string): Promise<{
    versionString?: string;
    localizations?: z.infer<typeof AppStoreLocalizationSchema>[];
  }> {
    try {
      const versions = await this.versionService.getVersionsForApp(appId);
      if (versions.length === 0) {
        logger.info(`No app store versions found for app ${appId}`);
        return {};
      }

      const latestVersion = versions[0];
      const versionString = latestVersion.attributes?.versionString;

      const localizations = await this.fetchUnifiedLocalizations(
        latestVersion.id
      );

      return {
        versionString,
        localizations: localizations.length > 0 ? localizations : undefined,
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

  private async fetchUnifiedLocalizations(
    versionId: string
  ): Promise<z.infer<typeof AppStoreLocalizationSchema>[]> {
    try {
      const versionLocalizations =
        await this.versionLocalizationService.getLocalizationsForVersion(
          versionId
        );

      return versionLocalizations
        .filter((loc) => loc.attributes?.locale)
        .map((loc) => ({
          locale: loc.attributes!.locale as z.infer<typeof LocaleCodeSchema>,
          description: loc.attributes?.description || undefined,
          keywords: loc.attributes?.keywords || undefined,
          marketingUrl: loc.attributes?.marketingUrl || undefined,
          promotionalText: loc.attributes?.promotionalText || undefined,
          supportUrl: loc.attributes?.supportUrl || undefined,
          whatsNew: loc.attributes?.whatsNew || undefined,
        }));
    } catch (error) {
      logger.warn(
        `Failed to fetch version localizations for version ${versionId}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return [];
    }
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
      // For now, we'll skip app info localizations since we removed the AppInfoService
      // App info localizations can be managed directly in App Store Connect

      for (const localization of localizations) {
        await this.handleSingleLocalization(latestVersion.id, localization);
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
    localization: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<void> {
    const locale = localization.locale;

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
