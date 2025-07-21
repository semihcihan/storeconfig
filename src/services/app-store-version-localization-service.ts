import {
  createAppStoreVersionLocalization,
  getAppStoreVersionLocalization,
  updateAppStoreVersionLocalization,
  deleteAppStoreVersionLocalization,
  getAppStoreVersionLocalizationsForVersion,
} from "../domains/app-store/api-client";
import type { AppStoreLocalizationSchema } from "../models/app-store";
import type { components } from "../generated/app-store-connect-api";
import { z } from "zod";

type AppStoreVersionLocalization =
  components["schemas"]["AppStoreVersionLocalizationResponse"]["data"];

export class AppStoreVersionLocalizationService {
  async createLocalization(
    versionId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
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
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
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
