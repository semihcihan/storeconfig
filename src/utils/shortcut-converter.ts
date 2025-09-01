import { territoryCodes } from "../models/territories";
import { deepEqualUnordered } from "../helpers/validation-helpers";
import { logger } from "./logger";
import { AppStoreLocalizationSchema } from "../models/app-store";
import { z } from "zod";

export const WORLDWIDE_TERRITORY_CODE = "worldwide";

function isWorldwideTerritory(territory: string): boolean {
  return territory.toLowerCase() === WORLDWIDE_TERRITORY_CODE.toLowerCase();
}

function isAllTerritories(territories: string[]): boolean {
  return deepEqualUnordered(territories, territoryCodes);
}

export function useShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  // Apply availability shortcuts first
  let converted = useAvailabilityShortcuts(data);

  // Then apply localization shortcuts
  converted = useLocalizationShortcuts(converted);

  return converted;
}

function useAvailabilityShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle availableTerritories - can be array or string
  if (converted.availableTerritories) {
    if (Array.isArray(converted.availableTerritories)) {
      if (isAllTerritories(converted.availableTerritories)) {
        converted.availableTerritories = WORLDWIDE_TERRITORY_CODE;
      }
    }
    // If it's already a string (worldwide), leave it as is
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (converted.availability.availableTerritories) {
      if (Array.isArray(converted.availability.availableTerritories)) {
        if (isAllTerritories(converted.availability.availableTerritories)) {
          converted.availability.availableTerritories =
            WORLDWIDE_TERRITORY_CODE;
        }
      }
      // If it's already a string (worldwide), leave it as is
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (
          offer.type === "FREE_TRIAL" &&
          convertedOffer.availableTerritories
        ) {
          if (Array.isArray(convertedOffer.availableTerritories)) {
            if (isAllTerritories(convertedOffer.availableTerritories)) {
              convertedOffer.availableTerritories = WORLDWIDE_TERRITORY_CODE;
            }
          }
          // If it's already a string (worldwide), leave it as is
        }
        // PAY_AS_YOU_GO and PAY_UP_FRONT offers no longer have availableTerritories
        // so they don't participate in shortcut conversion

        return convertedOffer;
      }
    );
  }

  // Handle inAppPurchases
  if (Array.isArray(converted.inAppPurchases)) {
    converted.inAppPurchases = converted.inAppPurchases.map((iap: any) => {
      return useAvailabilityShortcuts(iap);
    });
  }

  // Handle subscriptionGroups
  if (Array.isArray(converted.subscriptionGroups)) {
    converted.subscriptionGroups = converted.subscriptionGroups.map(
      (group: any) => {
        const convertedGroup = { ...group };

        if (Array.isArray(convertedGroup.subscriptions)) {
          convertedGroup.subscriptions = convertedGroup.subscriptions.map(
            (sub: any) => {
              return useAvailabilityShortcuts(sub);
            }
          );
        }

        return convertedGroup;
      }
    );
  }

  return converted;
}

function useLocalizationShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle localizations optimization only at top level
  if (Array.isArray(converted.localizations) && converted.primaryLocale) {
    converted.localizations = optimizeLocalizationsByPrimaryLocale(
      converted.localizations,
      converted.primaryLocale
    );
  }

  return converted;
}

function optimizeLocalizationsByPrimaryLocale(
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

export function removeShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  // Remove localization shortcuts first
  let converted = removeLocalizationShortcuts(data);

  // Then remove availability shortcuts
  converted = removeAvailabilityShortcuts(converted);

  return converted;
}

function removeAvailabilityShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle availableTerritories - can be array or string
  if (converted.availableTerritories) {
    if (
      typeof converted.availableTerritories === "string" &&
      isWorldwideTerritory(converted.availableTerritories)
    ) {
      // Convert WW back to all territories for display
      converted.availableTerritories = [...territoryCodes];
    }
    // If it's already an array, leave it as is
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (converted.availability.availableTerritories) {
      if (
        typeof converted.availability.availableTerritories === "string" &&
        isWorldwideTerritory(converted.availability.availableTerritories)
      ) {
        converted.availability.availableTerritories = [...territoryCodes];
      }
      // If it's already an array, leave it as is
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (
          offer.type === "FREE_TRIAL" &&
          convertedOffer.availableTerritories
        ) {
          if (
            typeof convertedOffer.availableTerritories === "string" &&
            isWorldwideTerritory(convertedOffer.availableTerritories)
          ) {
            convertedOffer.availableTerritories = [...territoryCodes];
          }
          // If it's already an array, leave it as is
        }
        // PAY_AS_YOU_GO and PAY_UP_FRONT offers no longer have availableTerritories
        // so they don't participate in shortcut conversion

        return convertedOffer;
      }
    );
  }

  // Handle inAppPurchases
  if (Array.isArray(converted.inAppPurchases)) {
    converted.inAppPurchases = converted.inAppPurchases.map((iap: any) => {
      return removeAvailabilityShortcuts(iap);
    });
  }

  // Handle subscriptionGroups
  if (Array.isArray(converted.subscriptionGroups)) {
    converted.subscriptionGroups = converted.subscriptionGroups.map(
      (group: any) => {
        const convertedGroup = { ...group };

        if (Array.isArray(convertedGroup.subscriptions)) {
          convertedGroup.subscriptions = convertedGroup.subscriptions.map(
            (sub: any) => {
              return removeAvailabilityShortcuts(sub);
            }
          );
        }

        return convertedGroup;
      }
    );
  }

  return converted;
}

function removeLocalizationShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle localizations de-optimization only at top level
  if (Array.isArray(converted.localizations) && converted.primaryLocale) {
    converted.localizations = deoptimizeLocalizationsByPrimaryLocale(
      converted.localizations,
      converted.primaryLocale
    );
  }

  return converted;
}

function deoptimizeLocalizationsByPrimaryLocale(
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

  const deoptimizedResult = localizations.map((localization) => {
    if (localization.locale === primaryLocale) {
      return localization;
    }

    // Start with the primary localization as base
    const deoptimized: z.infer<typeof AppStoreLocalizationSchema> = {
      ...primaryLocalization,
      locale: localization.locale,
    };

    // Override with any fields that are present in the optimized localization
    Object.keys(localization).forEach((field) => {
      if (field !== "locale") {
        const fieldKey = field as keyof z.infer<
          typeof AppStoreLocalizationSchema
        >;
        (deoptimized as any)[fieldKey] = (localization as any)[fieldKey];
      }
    });

    return deoptimized;
  });

  logger.debug(
    `Deoptimized ${localizations.length} localizations to restore full data with primary locale: ${primaryLocale}`
  );
  return deoptimizedResult;
}
