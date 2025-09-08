import {
  createAppInfoLocalization,
  getAppInfoLocalization,
  updateAppInfoLocalization,
  deleteAppInfoLocalization,
  getAppInfoLocalizationsForAppInfo,
} from "./api-client";
import type { components } from "../../generated/app-store-connect-api";
import { z } from "zod";
import { AppStoreAppInfoLocalizationSchema } from "../../models/app-store";

type AppInfoLocalization =
  components["schemas"]["AppInfoLocalizationResponse"]["data"];

export class LocalizationService {
  async createLocalization(
    appInfoId: string,
    locale: string,
    localizationData: z.infer<typeof AppStoreAppInfoLocalizationSchema>
  ): Promise<AppInfoLocalization> {
    const response = await createAppInfoLocalization(appInfoId, locale, {
      name: localizationData.name || "",
      ...(localizationData.subtitle && { subtitle: localizationData.subtitle }),
      ...(localizationData.privacyPolicyUrl && {
        privacyPolicyUrl: localizationData.privacyPolicyUrl,
      }),
      ...(localizationData.privacyChoicesUrl && {
        privacyChoicesUrl: localizationData.privacyChoicesUrl,
      }),
    });
    return response.data;
  }

  async getLocalization(localizationId: string): Promise<AppInfoLocalization> {
    const response = await getAppInfoLocalization(localizationId);
    return response.data;
  }

  async updateLocalization(
    localizationId: string,
    localizationData: z.infer<typeof AppStoreAppInfoLocalizationSchema>
  ): Promise<AppInfoLocalization> {
    const response = await updateAppInfoLocalization(localizationId, {
      ...(localizationData.name && { name: localizationData.name }),
      ...(localizationData.subtitle && { subtitle: localizationData.subtitle }),
      ...(localizationData.privacyPolicyUrl && {
        privacyPolicyUrl: localizationData.privacyPolicyUrl,
      }),
      ...(localizationData.privacyChoicesUrl && {
        privacyChoicesUrl: localizationData.privacyChoicesUrl,
      }),
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
