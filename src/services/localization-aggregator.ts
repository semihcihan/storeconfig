import { LocalizationService as AppStoreVersionLocalizationService } from "../domains/versions/localization-service";
import { LocalizationService as AppInfoLocalizationService } from "../domains/app-info/localization-service";
import { AppStoreVersionService } from "../domains/versions/service";
import { logger } from "../utils/logger";
import type { components } from "../generated/app-store-connect-api";
import { z } from "zod";
import {
  AppStoreLocalizationSchema,
  AppStoreVersionLocalizationSchema,
  AppStoreAppInfoLocalizationSchema,
} from "../models/app-store";
import { LocaleCodeSchema } from "../models/locales";
import { getAppInfosForApp } from "../domains/app-info/api-client";

type AppStoreVersionLocalization =
  components["schemas"]["AppStoreVersionLocalizationResponse"]["data"];
type AppInfoLocalization =
  components["schemas"]["AppInfoLocalizationResponse"]["data"];

export class LocalizationAggregator {
  private versionLocalizationService: AppStoreVersionLocalizationService;
  private appInfoLocalizationService: AppInfoLocalizationService;
  private versionService: AppStoreVersionService;
  private cachedVersionId: string | null = null;
  private cachedAppInfoId: string | null = null;

  constructor() {
    this.versionLocalizationService = new AppStoreVersionLocalizationService();
    this.appInfoLocalizationService = new AppInfoLocalizationService();
    this.versionService = new AppStoreVersionService();
  }

  private async getCurrentVersion(
    appId: string
  ): Promise<components["schemas"]["AppStoreVersionResponse"]["data"] | null> {
    // Check cache first
    if (this.cachedVersionId) {
      return {
        id: this.cachedVersionId,
      } as components["schemas"]["AppStoreVersionResponse"]["data"];
    }

    const versions = await this.versionService.getVersionsForApp(appId);

    // Find the most recent version that's not in a terminal state
    const currentVersion = versions.find(
      (version: components["schemas"]["AppStoreVersionResponse"]["data"]) => {
        const state = version.attributes?.appVersionState;
        return state && !["REPLACED_WITH_NEW_VERSION"].includes(state);
      }
    );

    if (currentVersion) {
      this.cachedVersionId = currentVersion.id;
    }

    return currentVersion || null;
  }

  private async getAppInfoId(appId: string): Promise<string> {
    if (this.cachedAppInfoId) {
      return this.cachedAppInfoId;
    }

    try {
      const appInfosResponse = await getAppInfosForApp(appId);
      const appInfos = appInfosResponse.data;

      if (!appInfos || appInfos.length === 0) {
        throw new Error(`No app info found for app ${appId}`);
      }

      // If there's only one app info, use it directly
      if (appInfos.length === 1) {
        this.cachedAppInfoId = appInfos[0].id;
        return appInfos[0].id;
      }

      // If there are multiple app infos, filter out replaced ones
      const activeAppInfos = appInfos.filter(
        (appInfo) => appInfo.attributes?.state !== "REPLACED_WITH_NEW_INFO"
      );

      if (activeAppInfos.length === 0) {
        throw new Error(
          `No active app info found for app ${appId} (all app infos have been replaced)`
        );
      }

      if (activeAppInfos.length > 1) {
        logger.warn(
          `Multiple active app infos found for app ${appId} (${
            activeAppInfos.length
          }). Using the first one.
          App info IDs and States: ${activeAppInfos
            .map((info) => `${info.id} (${info.attributes?.state})`)
            .join(", ")}
          `
        );
      }

      // Use the first active app info
      this.cachedAppInfoId = activeAppInfos[0].id;
      return activeAppInfos[0].id;
    } catch (error) {
      logger.warn(
        `Failed to fetch app info for app ${appId}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw new Error(
        `Failed to get app info ID for app ${appId}. App info localizations cannot be managed without a valid app info.`
      );
    }
  }

  async createAppLocalization(
    appId: string,
    locale: z.infer<typeof LocaleCodeSchema>,
    localization: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<{
    versionLocalization?: AppStoreVersionLocalization;
    appInfoLocalization?: AppInfoLocalization;
  }> {
    logger.debug(`Creating/updating app localization for locale: ${locale}`);

    let versionLocalization: AppStoreVersionLocalization | undefined;
    let appInfoLocalization: AppInfoLocalization | undefined;

    // Handle version localization first
    const versionData = {
      description: localization.description,
      keywords: localization.keywords,
      marketingUrl: localization.marketingUrl,
      promotionalText: localization.promotionalText,
      supportUrl: localization.supportUrl,
      whatsNew: localization.whatsNew,
    };

    // Get version context for version localization
    const version = await this.getCurrentVersion(appId);
    if (!version) {
      throw new Error(`No version found for app ${appId}`);
    }

    // Check if version localization exists
    const existingVersionLocalization =
      await this.versionLocalizationService.findLocalizationByLocale(
        version.id,
        locale
      );

    if (existingVersionLocalization) {
      // Only update if there are actual version fields to set
      const hasVersionFields = Object.values(versionData).some(
        (value) => value !== undefined
      );

      if (hasVersionFields) {
        logger.debug(
          `Updating existing version localization for locale: ${locale}`
        );
        versionLocalization =
          await this.versionLocalizationService.updateLocalization(
            existingVersionLocalization.id,
            versionData
          );
      }
    } else {
      // Always create new version localization (only locale is required)
      logger.debug(`Creating new version localization for locale: ${locale}`);
      versionLocalization =
        await this.versionLocalizationService.createLocalization(
          version.id,
          locale,
          versionData
        );
    }

    // Handle app info localization second
    const appInfoData = {
      name: localization.name,
      subtitle: localization.subtitle,
      privacyPolicyUrl: localization.privacyPolicyUrl,
      privacyChoicesUrl: localization.privacyChoicesUrl,
    };

    // Only process app info localization if there's at least a name field (required by API)
    const hasAppInfoFields = Object.values(appInfoData).some(
      (value) => value !== undefined
    );

    if (hasAppInfoFields) {
      // Get app info context just for app info localization
      const appInfoId = await this.getAppInfoId(appId);

      // Check if app info localization exists
      const existingAppInfoLocalization =
        await this.appInfoLocalizationService.findLocalizationByLocale(
          appInfoId,
          locale
        );

      if (existingAppInfoLocalization) {
        // Update existing app info localization
        logger.debug(
          `Updating existing app info localization for locale: ${locale}`
        );
        appInfoLocalization =
          await this.appInfoLocalizationService.updateLocalization(
            existingAppInfoLocalization.id,
            appInfoData
          );
      } else {
        // Create new app info localization
        if (!localization.name) {
          throw new Error(
            `Name is required when creating a new app info localization for locale: ${locale}`
          );
        }

        logger.debug(
          `Creating new app info localization for locale: ${locale}`
        );
        appInfoLocalization =
          await this.appInfoLocalizationService.createLocalization(
            appInfoId,
            locale,
            {
              name: localization.name,
              subtitle: localization.subtitle,
              privacyPolicyUrl: localization.privacyPolicyUrl,
              privacyChoicesUrl: localization.privacyChoicesUrl,
            }
          );
      }
    }

    logger.debug(
      `Successfully processed app localization for locale: ${locale}`
    );
    return { versionLocalization, appInfoLocalization };
  }

  async updateAppLocalization(
    appId: string,
    locale: z.infer<typeof LocaleCodeSchema>,
    versionChanges: Partial<z.infer<typeof AppStoreVersionLocalizationSchema>>,
    appInfoChanges: Partial<z.infer<typeof AppStoreAppInfoLocalizationSchema>>
  ): Promise<{
    versionLocalization?: AppStoreVersionLocalization;
    appInfoLocalization?: AppInfoLocalization;
  }> {
    logger.debug(`Updating/creating app localization for locale: ${locale}`);

    let versionLocalization: AppStoreVersionLocalization | undefined;
    let appInfoLocalization: AppInfoLocalization | undefined;

    // Handle version localization changes first
    if (Object.keys(versionChanges).length > 0) {
      // Get version context just for version localization
      const version = await this.getCurrentVersion(appId);
      if (!version) {
        throw new Error(`No version found for app ${appId}`);
      }

      // Check if version localization exists
      const existingVersionLocalization =
        await this.versionLocalizationService.findLocalizationByLocale(
          version.id,
          locale
        );

      if (existingVersionLocalization) {
        // Update existing version localization
        logger.debug(
          `Updating existing version localization for locale: ${locale}`
        );
        versionLocalization =
          await this.versionLocalizationService.updateLocalization(
            existingVersionLocalization.id,
            versionChanges
          );
      } else {
        // Create new version localization
        logger.debug(`Creating new version localization for locale: ${locale}`);
        versionLocalization =
          await this.versionLocalizationService.createLocalization(
            version.id,
            locale,
            versionChanges
          );
      }
    }

    // Handle app info localization changes second
    if (Object.keys(appInfoChanges).length > 0) {
      // Get app info context just for app info localization
      const appInfoId = await this.getAppInfoId(appId);

      // Check if app info localization exists
      const existingAppInfoLocalization =
        await this.appInfoLocalizationService.findLocalizationByLocale(
          appInfoId,
          locale
        );

      if (existingAppInfoLocalization) {
        // Update existing app info localization
        logger.debug(
          `Updating existing app info localization for locale: ${locale}`
        );
        appInfoLocalization =
          await this.appInfoLocalizationService.updateLocalization(
            existingAppInfoLocalization.id,
            appInfoChanges
          );
      } else {
        // Create new app info localization
        logger.debug(
          `Creating new app info localization for locale: ${locale}`
        );
        appInfoLocalization =
          await this.appInfoLocalizationService.createLocalization(
            appInfoId,
            locale,
            {
              name: appInfoChanges.name || "",
              subtitle: appInfoChanges.subtitle,
              privacyPolicyUrl: appInfoChanges.privacyPolicyUrl,
              privacyChoicesUrl: appInfoChanges.privacyChoicesUrl,
            }
          );
      }
    }

    logger.debug(
      `Successfully processed app localization for locale: ${locale}`
    );
    return { versionLocalization, appInfoLocalization };
  }

  async deleteAppLocalization(
    appId: string,
    locale: z.infer<typeof LocaleCodeSchema>
  ): Promise<void> {
    logger.debug(`Deleting app localization for locale: ${locale}`);

    // Delete version localization first
    const version = await this.getCurrentVersion(appId);
    if (version) {
      const existingVersionLocalization =
        await this.versionLocalizationService.findLocalizationByLocale(
          version.id,
          locale
        );

      if (existingVersionLocalization) {
        logger.debug(`Deleting version localization for locale: ${locale}`);
        await this.versionLocalizationService.deleteLocalization(
          existingVersionLocalization.id
        );
      } else {
        logger.debug(
          `No version localization found for locale: ${locale}, skipping deletion`
        );
      }
    } else {
      logger.debug(
        `No version found for app ${appId}, skipping version localization deletion`
      );
    }

    // Delete app info localization second
    try {
      const appInfoId = await this.getAppInfoId(appId);
      const existingAppInfoLocalization =
        await this.appInfoLocalizationService.findLocalizationByLocale(
          appInfoId,
          locale
        );

      if (existingAppInfoLocalization) {
        logger.debug(`Deleting app info localization for locale: ${locale}`);
        await this.appInfoLocalizationService.deleteLocalization(
          existingAppInfoLocalization.id
        );
      } else {
        logger.debug(
          `No app info localization found for locale: ${locale}, skipping deletion`
        );
      }
    } catch (error) {
      logger.warn(
        `Failed to delete app info localization for locale ${locale}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    logger.debug(`Successfully processed deletion for locale: ${locale}`);
  }

  async fetchAllLocalizations(
    appId: string
  ): Promise<z.infer<typeof AppStoreLocalizationSchema>[]> {
    logger.debug(`Fetching all localizations for app: ${appId}`);

    // Get the current version for the app
    const version = await this.getCurrentVersion(appId);
    if (!version) {
      logger.warn(
        `No version found for app ${appId}, returning empty localizations`
      );
      return [];
    }

    const appInfoId = await this.getAppInfoId(appId);

    // Fetch version localizations
    const versionLocalizations =
      await this.versionLocalizationService.getLocalizationsForVersion(
        version.id
      );

    // Fetch app info localizations
    const appInfoLocalizations =
      await this.appInfoLocalizationService.getLocalizationsForAppInfo(
        appInfoId
      );

    // Create a map of localizations by locale
    const localizationsByLocale = new Map<
      string,
      z.infer<typeof AppStoreLocalizationSchema>
    >();

    // Process version localizations
    versionLocalizations
      .filter((loc) => loc.attributes?.locale)
      .forEach((loc) => {
        const locale = loc.attributes!.locale as z.infer<
          typeof LocaleCodeSchema
        >;
        localizationsByLocale.set(locale, {
          locale,
          description: loc.attributes?.description || undefined,
          keywords: loc.attributes?.keywords || undefined,
          marketingUrl: loc.attributes?.marketingUrl || undefined,
          promotionalText: loc.attributes?.promotionalText || undefined,
          supportUrl: loc.attributes?.supportUrl || undefined,
          whatsNew: loc.attributes?.whatsNew || undefined,
        });
      });

    // Merge app info localizations
    appInfoLocalizations.forEach((loc) => {
      const locale = loc.attributes?.locale as z.infer<typeof LocaleCodeSchema>;
      if (locale) {
        const existing = localizationsByLocale.get(locale) || { locale };
        localizationsByLocale.set(locale, {
          ...existing,
          name: loc.attributes?.name || undefined,
          subtitle: loc.attributes?.subtitle || undefined,
          privacyPolicyUrl: loc.attributes?.privacyPolicyUrl || undefined,
          privacyChoicesUrl: loc.attributes?.privacyChoicesUrl || undefined,
        });
      }
    });

    const result = Array.from(localizationsByLocale.values());
    logger.debug(
      `Successfully fetched ${result.length} localizations for app ${appId}`
    );
    return result;
  }
}
