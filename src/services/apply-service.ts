import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModelSchema } from "../models/app-store";
import { api } from "./api";
import { components } from "../generated/app-store-connect-api";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

// Helper function to get territory availability IDs from an app availability
async function getTerritoryAvailabilities(
  appAvailabilityId: string
): Promise<Map<string, string>> {
  const territoryMap = new Map<string, string>();

  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await api.GET(
      "/v2/appAvailabilities/{id}/territoryAvailabilities",
      {
        params: {
          path: { id: appAvailabilityId },
          query: {
            "fields[territoryAvailabilities]": ["available", "territory"],
            limit: 50,
            ...(cursor ? { cursor } : {}),
          },
        },
      }
    );

    if (response.error) {
      logger.error(
        `Failed to get territory availabilities: ${JSON.stringify(
          response.error
        )}`
      );
      throw new Error(
        `Failed to get territory availabilities: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    const territories = response.data?.data || [];

    // Process territories and decode their IDs to get territory codes
    for (const territory of territories) {
      try {
        const decoded = JSON.parse(
          Buffer.from(territory.id, "base64").toString("utf-8")
        );
        const territoryCode = decoded.t;
        territoryMap.set(territoryCode, territory.id);
      } catch (error) {
        logger.warn(`Failed to decode territory ID: ${territory.id}`);
      }
    }

    // Check for more pages
    cursor = response.data?.meta?.paging?.nextCursor;
    hasMore = !!cursor;
  }

  return territoryMap;
}

// Helper function to update a territory's availability
async function updateTerritoryAvailability(
  territoryAvailabilityId: string,
  available: boolean
): Promise<void> {
  const response = await api.PATCH("/v1/territoryAvailabilities/{id}", {
    params: {
      path: { id: territoryAvailabilityId },
    },
    body: {
      data: {
        type: "territoryAvailabilities",
        id: territoryAvailabilityId,
        attributes: {
          available,
        },
      },
    },
  });

  if (response.error) {
    logger.error(
      `Failed to update territory availability: ${JSON.stringify(
        response.error
      )}`
    );
    throw new Error(
      `Failed to update territory availability: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  logger.info(`Territory availability updated successfully`);
}

// Helper function to ensure app availability resource exists
async function ensureAppAvailability(appId: string): Promise<string> {
  // First try to get existing app availability
  const existingResponse = await api.GET("/v1/apps/{id}/appAvailabilityV2", {
    params: {
      path: { id: appId },
    },
  });

  if (existingResponse.data?.data?.id) {
    logger.info(
      `Found existing app availability: ${existingResponse.data.data.id}`
    );
    return existingResponse.data.data.id;
  }

  // If no existing availability exists, throw an error with helpful message
  throw new Error(
    `App availability not found for app ${appId}. Please ensure the app has availability settings configured in App Store Connect.`
  );
}

async function executeAction(
  action: AnyAction,
  appId: string,
  currentState: AppStoreModel
) {
  logger.info(`Executing action: ${action.type}`);
  switch (action.type) {
    // In-App Purchases
    case "CREATE_IN_APP_PURCHASE":
      logger.info(`  Product ID: ${action.payload.inAppPurchase.productId}`);
      // Call API to create an in-app purchase
      break;
    case "UPDATE_IN_APP_PURCHASE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      // Call API to update an in-app purchase
      break;
    case "DELETE_IN_APP_PURCHASE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      // Call API to delete an in-app purchase
      break;

    // IAP Localizations
    case "CREATE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.localization.locale}`);
      break;
    case "UPDATE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      break;
    case "DELETE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      break;

    // IAP Prices
    case "UPDATE_IAP_BASE_TERRITORY":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Territory: ${action.payload.territory}`);
      break;
    case "CREATE_IAP_PRICE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      break;
    case "UPDATE_IAP_PRICE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      break;
    case "DELETE_IAP_PRICE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Territory: ${action.payload.territory}`);
      break;

    // IAP Availability
    case "UPDATE_IAP_AVAILABILITY":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(
        `  Availability: ${JSON.stringify(action.payload.availability)}`
      );
      // Call API to update IAP availability
      break;

    // App-level
    case "UPDATE_APP_AVAILABILITY":
      logger.info(
        `  Availability: ${JSON.stringify(action.payload.availability)}`
      );

      // Ensure app availability resource exists
      const appAvailabilityId = await ensureAppAvailability(appId);

      // Update availableInNewTerritories setting if needed
      const currentAvailability = currentState.availability;
      const desiredAvailability = action.payload.availability;

      if (
        !currentAvailability ||
        currentAvailability.availableInNewTerritories !==
          desiredAvailability.availableInNewTerritories
      ) {
        logger.info(
          `Updating availableInNewTerritories: ${desiredAvailability.availableInNewTerritories}`
        );
        logger.warn(
          "⚠️  availableInNewTerritories updates are not yet implemented"
        );
        logger.warn(
          "📝 Please manually update this setting in App Store Connect"
        );
      }

      // Get territory availability mapping
      logger.info("Getting territory availability mappings...");
      const territoryMap = await getTerritoryAvailabilities(appAvailabilityId);
      logger.info(`Found ${territoryMap.size} territories`);

      // Build sets of current and desired territories
      const currentTerritories = new Set(
        currentAvailability?.availableTerritories || []
      );
      const desiredTerritories = new Set(
        desiredAvailability.availableTerritories
      );

      // Find territories that need to be enabled
      const territoriesToEnable = Array.from(desiredTerritories).filter(
        (territory) => !currentTerritories.has(territory)
      );

      // Find territories that need to be disabled
      const territoriesToDisable = Array.from(currentTerritories).filter(
        (territory) => !desiredTerritories.has(territory)
      );

      // Update territories
      const totalChanges =
        territoriesToEnable.length + territoriesToDisable.length;
      if (totalChanges > 0) {
        logger.info(`Updating ${totalChanges} territory availabilities...`);

        // Enable territories
        for (const territory of territoriesToEnable) {
          const territoryAvailabilityId = territoryMap.get(territory);
          if (territoryAvailabilityId) {
            logger.info(`Enabling territory: ${territory}`);
            await updateTerritoryAvailability(territoryAvailabilityId, true);
          } else {
            logger.warn(
              `Territory availability ID not found for: ${territory}`
            );
          }
        }

        // Disable territories
        for (const territory of territoriesToDisable) {
          const territoryAvailabilityId = territoryMap.get(territory);
          if (territoryAvailabilityId) {
            logger.info(`Disabling territory: ${territory}`);
            await updateTerritoryAvailability(territoryAvailabilityId, false);
          } else {
            logger.warn(
              `Territory availability ID not found for: ${territory}`
            );
          }
        }

        logger.info("Territory availability updates completed successfully");
      } else {
        logger.info("No territory availability changes needed");
      }

      logger.info("App availability update completed");
      break;
    case "UPDATE_APP_BASE_TERRITORY":
      logger.info(`  Territory: ${action.payload.territory}`);
      // Call API to update app base territory
      break;
    case "CREATE_APP_PRICE":
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      // Call API to create app price
      break;
    case "UPDATE_APP_PRICE":
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      // Call API to update app price
      break;
    case "DELETE_APP_PRICE":
      logger.info(`  Territory: ${action.payload.territory}`);
      // Call API to delete app price
      break;

    // Subscription Groups
    case "CREATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.group.referenceName}`);
      break;
    case "UPDATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.referenceName}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      break;
    case "DELETE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.referenceName}`);
      break;

    // Subscription Group Localizations
    case "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.localization.locale}`);
      break;
    case "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      break;
    case "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      break;

    // Subscriptions
    case "CREATE_SUBSCRIPTION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Product ID: ${action.payload.subscription.productId}`);
      break;
    case "UPDATE_SUBSCRIPTION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      break;
    case "DELETE_SUBSCRIPTION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      break;

    // Subscription Localizations
    case "CREATE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Locale: ${action.payload.localization.locale}`);
      break;
    case "UPDATE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Locale: ${action.payload.locale}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      break;
    case "DELETE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Locale: ${action.payload.locale}`);
      break;

    // Subscription Prices
    case "CREATE_SUBSCRIPTION_PRICE":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      break;
    case "UPDATE_SUBSCRIPTION_PRICE":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Price: ${JSON.stringify(action.payload.price)}`);
      break;
    case "DELETE_SUBSCRIPTION_PRICE":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Territory: ${action.payload.territory}`);
      break;

    // Subscription Availability
    case "UPDATE_SUBSCRIPTION_AVAILABILITY":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(
        `  Availability: ${JSON.stringify(action.payload.availability)}`
      );
      // Call API to update subscription availability
      break;

    // Subscription Offers
    case "CREATE_INTRODUCTORY_OFFER":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Offer: ${JSON.stringify(action.payload.offer)}`);
      break;
    case "DELETE_INTRODUCTORY_OFFER":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Offer: ${JSON.stringify(action.payload.offer)}`);
      break;
    case "CREATE_PROMOTIONAL_OFFER":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Offer: ${JSON.stringify(action.payload.offer)}`);
      break;
    case "DELETE_PROMOTIONAL_OFFER":
      logger.info(
        `  Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      logger.info(`  Offer ID: ${action.payload.offerId}`);
      break;
    default:
      const _exhaustiveCheck: never = action;
      throw new Error(
        `Unhandled action type: ${(_exhaustiveCheck as any).type}`
      );
  }
}

export async function apply(
  plan: AnyAction[],
  appId: string,
  currentState: AppStoreModel
) {
  logger.info(`Applying plan with ${plan.length} actions for app ${appId}`);

  for (const action of plan) {
    await executeAction(action, appId, currentState);
  }

  logger.info("Plan application completed");
}
