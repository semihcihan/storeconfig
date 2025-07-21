import {
  createAppInfoLocalization,
  getAppInfoLocalization,
  updateAppInfoLocalization,
  deleteAppInfoLocalization,
  getAppInfoLocalizationsForAppInfo,
} from "../domains/app-store/api-client";
import type { AppStoreLocalizationSchema } from "../models/app-store";
import type { components } from "../generated/app-store-connect-api";
import { z } from "zod";

type AppInfoLocalization =
  components["schemas"]["AppInfoLocalizationResponse"]["data"];

export class AppInfoLocalizationService {
  async createLocalization(
    appInfoId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<AppInfoLocalization> {
    const response = await createAppInfoLocalization(appInfoId, locale, {
      name: localizationData.name,
      subtitle: localizationData.subtitle,
      privacyPolicyUrl: localizationData.privacyPolicyUrl,
      privacyChoicesUrl: localizationData.privacyChoicesUrl,
    });
    return response.data;
  }

  async getLocalization(localizationId: string): Promise<AppInfoLocalization> {
    const response = await getAppInfoLocalization(localizationId);
    return response.data;
  }

  async updateLocalization(
    localizationId: string,
    localizationData: z.infer<typeof AppStoreLocalizationSchema>
  ): Promise<AppInfoLocalization> {
    const response = await updateAppInfoLocalization(localizationId, {
      name: localizationData.name,
      subtitle: localizationData.subtitle,
      privacyPolicyUrl: localizationData.privacyPolicyUrl,
      privacyChoicesUrl: localizationData.privacyChoicesUrl,
    });
    return response.data;
  }

  async deleteLocalization(localizationId: string): Promise<void> {
    await deleteAppInfoLocalization(localizationId);
  }

  async getLocalizationsForAppInfo(
    appInfoId: string
  ): Promise<AppInfoLocalization[]> {
    const response = await getAppInfoLocalizationsForAppInfo(appInfoId);
    return response.data;
  }

  async findLocalizationByLocale(
    appInfoId: string,
    locale: string
  ): Promise<AppInfoLocalization | null> {
    const localizations = await this.getLocalizationsForAppInfo(appInfoId);
    return (
      localizations.find((loc) => loc.attributes?.locale === locale) || null
    );
  }
}
