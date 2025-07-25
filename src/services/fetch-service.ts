import { logger } from "../utils/logger";
import {
  AppStoreModelSchema,
  APP_STORE_SCHEMA_VERSION,
} from "../models/app-store";
import { z } from "zod";
import { isNotFoundError } from "../helpers/error-handling-helpers";
import { optimizeLocalizationsByPrimaryLocale } from "../helpers/localization-helpers";

// Import API clients
import { fetchInAppPurchases } from "../domains/in-app-purchases/api-client";
import { fetchSubscriptionGroups } from "../domains/subscriptions/api-client";
import { fetchAppAvailability } from "../domains/availability/api-client";
import { fetchApp } from "../domains/apps/api-client";

// Import mappers
import { mapInAppPurchases } from "../domains/in-app-purchases/mapper";
import { mapSubscriptionGroups } from "../domains/subscriptions/mapper";
import { mapAppAvailability } from "../domains/availability/mapper";

// Import pricing logic
import { mapAppPricing } from "./pricing-aggregator";

// Import services
import { AppStoreVersionService } from "../domains/versions/service";
import { LocalizationAggregator } from "./localization-aggregator";
import { LocaleCodeSchema } from "../models/locales";
import { AppStoreLocalizationSchema } from "../models/app-store";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

// Fetch and map in-app purchases
async function fetchAndMapInAppPurchases(appId: string) {
  try {
    const inAppPurchasesData = await fetchInAppPurchases(appId);
    return await mapInAppPurchases(inAppPurchasesData);
  } catch (error) {
    const is404Error = isNotFoundError(error);
    if (is404Error) {
      logger.debug(
        `In-app purchases not found for app ${appId} (not created yet)`
      );
      return [];
    }
    throw error;
  }
}

// Fetch and map subscription groups
async function fetchAndMapSubscriptionGroups(appId: string) {
  try {
    const subscriptionGroupsData = await fetchSubscriptionGroups(appId);
    return await mapSubscriptionGroups(subscriptionGroupsData);
  } catch (error) {
    const is404Error = isNotFoundError(error);
    if (is404Error) {
      logger.debug(
        `Subscription groups not found for app ${appId} (not created yet)`
      );
      return [];
    }
    throw error;
  }
}

// Fetch and map app availability
async function fetchAndMapAppAvailability(appId: string) {
  try {
    const appAvailabilityData = await fetchAppAvailability(appId);
    return await mapAppAvailability(appAvailabilityData);
  } catch (error) {
    const is404Error = isNotFoundError(error);
    if (is404Error) {
      logger.debug(
        `App availability not found for app ${appId} (not created yet)`
      );
      return [];
    }
    throw error;
  }
}

// Main function to fetch app store state
export async function fetchAppStoreState(
  appId: string
): Promise<AppStoreModel> {
  logger.debug(`Fetching app store state for app ID: ${appId}`);

  const versionService = new AppStoreVersionService();
  const localizationAggregator = new LocalizationAggregator();

  // Fetch all data in parallel
  const [
    mappedIAPs,
    mappedSubscriptionGroups,
    mappedAvailableTerritories,
    mappedPricing,
    versionMetadata,
    localizations,
    appInfo,
  ] = await Promise.all([
    fetchAndMapInAppPurchases(appId),
    fetchAndMapSubscriptionGroups(appId),
    fetchAndMapAppAvailability(appId),
    mapAppPricing(appId),
    versionService.fetchVersionMetadata(appId),
    localizationAggregator.fetchAllLocalizations(appId),
    fetchApp(appId),
  ]);

  const primaryLocale = appInfo.data?.attributes?.primaryLocale as
    | z.infer<typeof LocaleCodeSchema>
    | undefined;

  const optimizedLocalizations = optimizeLocalizationsByPrimaryLocale(
    localizations,
    primaryLocale
  );

  const result: AppStoreModel = {
    schemaVersion: APP_STORE_SCHEMA_VERSION,
    appId: appId,
    primaryLocale,
    pricing: mappedPricing,
    availableTerritories: mappedAvailableTerritories,
    inAppPurchases: mappedIAPs,
    subscriptionGroups: mappedSubscriptionGroups,
    versionString: versionMetadata.versionString,
    localizations:
      optimizedLocalizations.length > 0 ? optimizedLocalizations : undefined,
  };

  const parsedData = AppStoreModelSchema.parse(result);
  return parsedData;
}
