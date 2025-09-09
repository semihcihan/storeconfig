import {
  createAppStoreVersionLocalization,
  getAppStoreVersionLocalization,
  updateAppStoreVersionLocalization,
  deleteAppStoreVersionLocalization,
  getAppStoreVersionLocalizationsForVersion,
} from "./api-client";
import type { AppStoreVersionLocalizationSchema } from "@semihcihan/shared";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { z } from "zod";

type AppStoreVersionLocalization =
  components["schemas"]["AppStoreVersionLocalizationResponse"]["data"];

export class LocalizationService {
  async createLocalization(
    versionId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreVersionLocalizationSchema>
  ): Promise<AppStoreVersionLocalization> {
    const response = await createAppStoreVersionLocalization(
      versionId,
      locale,
      {
        description: localizationData.description,
        keywords: localizationData.keywords,
        marketingUrl: localizationData.marketingUrl,
        promotionalText: localizationData.promotionalText,
        supportUrl: localizationData.supportUrl,
        whatsNew: localizationData.whatsNew,
      }
    );
    return response.data;
  }

  async getLocalization(
    localizationId: string
  ): Promise<AppStoreVersionLocalization> {
    const response = await getAppStoreVersionLocalization(localizationId);
    return response.data;
  }

  async updateLocalization(
    localizationId: string,
    localizationData: z.infer<typeof AppStoreVersionLocalizationSchema>
  ): Promise<AppStoreVersionLocalization> {
    const response = await updateAppStoreVersionLocalization(localizationId, {
      description: localizationData.description,
      keywords: localizationData.keywords,
      marketingUrl: localizationData.marketingUrl,
      promotionalText: localizationData.promotionalText,
      supportUrl: localizationData.supportUrl,
      whatsNew: localizationData.whatsNew,
    });
    return response.data;
  }

  async deleteLocalization(localizationId: string): Promise<void> {
    await deleteAppStoreVersionLocalization(localizationId);
  }

  async getLocalizationsForVersion(
    versionId: string
  ): Promise<AppStoreVersionLocalization[]> {
    const response = await getAppStoreVersionLocalizationsForVersion(versionId);
    return response.data;
  }

  async findLocalizationByLocale(
    versionId: string,
    locale: string
  ): Promise<AppStoreVersionLocalization | null> {
    const localizations = await this.getLocalizationsForVersion(versionId);
    return (
      localizations.find((loc) => loc.attributes?.locale === locale) || null
    );
  }
}
