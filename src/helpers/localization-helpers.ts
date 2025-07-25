import { logger } from "../utils/logger";
import { AppStoreLocalizationSchema } from "../models/app-store";
import { z } from "zod";

// Helper function to optimize localizations by removing duplicate fields with primary locale
export function optimizeLocalizationsByPrimaryLocale(
  localizations: z.infer<typeof AppStoreLocalizationSchema>[],
  primaryLocale: string | undefined
): z.infer<typeof AppStoreLocalizationSchema>[] {
  // If we don't have a primary locale, return the original localizations
  if (!primaryLocale) {
    return localizations;
  }

  const primaryLocalization = localizations.find(
    (loc) => loc.locale === primaryLocale
  );

  // If we don't have a primary localization, return the original localizations
  if (!primaryLocalization) {
    return localizations;
  }

  const optimizedResult = localizations.map((localization) => {
    if (localization.locale === primaryLocale) {
      return localization;
    }

    // Start with just the locale
    const optimized: z.infer<typeof AppStoreLocalizationSchema> = {
      locale: localization.locale,
    };

    // Get all keys from the localization object (excluding 'locale' which we already set)
    const fieldsToCheck = Object.keys(localization).filter(
      (key) => key !== "locale"
    );

    // Only include fields that differ from the primary locale
    fieldsToCheck.forEach((field) => {
      const fieldKey = field as keyof z.infer<
        typeof AppStoreLocalizationSchema
      >;
      if (localization[fieldKey] !== primaryLocalization[fieldKey]) {
        (optimized as any)[fieldKey] = localization[fieldKey];
      }
    });

    return optimized;
  });

  logger.debug(
    `Optimized ${localizations.length} localizations to avoid duplicates with primary locale: ${primaryLocale}`
  );
  return optimizedResult;
}
