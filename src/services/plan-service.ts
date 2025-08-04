import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";

export async function showAction(action: AnyAction) {
  logger.info(`Executing action: ${action.type}`);
  switch (action.type) {
    // In-App Purchases
    case "CREATE_IN_APP_PURCHASE":
      logger.info(`Product ID: ${action.payload.inAppPurchase.productId}`);
      break;
    case "UPDATE_IN_APP_PURCHASE":
      logger.info(
        `Product ID: ${action.payload.productId}`,
        action.payload.changes
      );
      break;

    // IAP Localizations
    case "CREATE_IAP_LOCALIZATION":
      logger.info(
        `Product ID: ${action.payload.productId}, Locale: ${action.payload.localization.locale}`
      );
      break;
    case "UPDATE_IAP_LOCALIZATION":
      logger.info(
        `Product ID: ${action.payload.productId}, Locale: ${action.payload.locale}`,
        action.payload.changes
      );
      break;
    case "DELETE_IAP_LOCALIZATION":
      logger.info(
        `Product ID: ${action.payload.productId}, Locale: ${action.payload.locale}`
      );
      break;

    // IAP Pricing (Comprehensive)
    case "UPDATE_IAP_PRICING":
      logger.info(
        `Product ID: ${action.payload.productId}, Base Territory: ${action.payload.priceSchedule.baseTerritory}`
      );
      if (action.payload.changes.addedPrices.length > 0) {
        logger.info(
          `Added Prices: ${action.payload.changes.addedPrices.length}`,
          action.payload.changes.addedPrices
        );
      }
      if (action.payload.changes.updatedPrices.length > 0) {
        logger.info(
          `Updated Prices: ${action.payload.changes.updatedPrices.length}`,
          action.payload.changes.updatedPrices
        );
      }
      if (action.payload.changes.deletedTerritories.length > 0) {
        logger.info(
          `Deleted Territories: ${action.payload.changes.deletedTerritories.length}`,
          action.payload.changes.deletedTerritories
        );
      }
      break;

    // IAP Availability
    case "UPDATE_IAP_AVAILABILITY":
      logger.info(
        `Product ID: ${action.payload.productId}`,
        action.payload.availability
      );
      break;

    // App-level
    case "UPDATE_APP_AVAILABILITY":
      logger.info("Available Territories", action.payload.availableTerritories);
      break;
    case "UPDATE_APP_PRICING":
      if (action.payload.priceSchedule) {
        logger.info(
          `Creating new schedule with base territory: ${action.payload.priceSchedule.baseTerritory}, Number of prices: ${action.payload.priceSchedule.prices.length}`
        );
      }
      if (action.payload.changes.addedPrices.length > 0) {
        logger.info(
          `Added Prices: ${action.payload.changes.addedPrices.length}`,
          action.payload.changes.addedPrices
        );
      }
      if (action.payload.changes.updatedPrices.length > 0) {
        logger.info(
          `Updated Prices: ${action.payload.changes.updatedPrices.length}`,
          action.payload.changes.updatedPrices
        );
      }
      if (action.payload.changes.deletedTerritories.length > 0) {
        logger.info(
          `Deleted Territories: ${action.payload.changes.deletedTerritories.length}`,
          action.payload.changes.deletedTerritories
        );
      }
      break;

    // Subscription Groups
    case "CREATE_SUBSCRIPTION_GROUP":
      logger.info(`Group Ref Name: ${action.payload.group.referenceName}`);
      break;
    case "UPDATE_SUBSCRIPTION_GROUP":
      logger.info(
        `Group Ref Name: ${action.payload.referenceName}`,
        action.payload.changes
      );
      break;

    // Subscription Group Localizations
    case "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(
        `Group Ref Name: ${action.payload.groupReferenceName}, Locale: ${action.payload.localization.locale}`
      );
      break;
    case "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(
        `Group Ref Name: ${action.payload.groupReferenceName}, Locale: ${action.payload.locale}`,
        action.payload.changes
      );
      break;
    case "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(
        `Group Ref Name: ${action.payload.groupReferenceName}, Locale: ${action.payload.locale}`
      );
      break;

    // Subscriptions
    case "CREATE_SUBSCRIPTION":
      logger.info(
        `Group Ref Name: ${action.payload.groupReferenceName}, Product ID: ${action.payload.subscription.productId}`
      );
      break;
    case "UPDATE_SUBSCRIPTION":
      logger.info(
        `Product ID: ${action.payload.productId}`,
        action.payload.changes
      );
      break;

    // Subscription Localizations
    case "CREATE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}, Locale: ${action.payload.localization.locale}`
      );
      break;
    case "UPDATE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}, Locale: ${action.payload.locale}`,
        action.payload.changes
      );
      break;
    case "DELETE_SUBSCRIPTION_LOCALIZATION":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}, Locale: ${action.payload.locale}`
      );
      break;

    // Subscription Prices
    case "CREATE_SUBSCRIPTION_PRICE":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}`
      );
      if (action.payload.changes.addedPrices.length > 0) {
        logger.info(
          `Added Prices: ${action.payload.changes.addedPrices.length}`,
          action.payload.changes.addedPrices
        );
      }
      if (action.payload.changes.updatedPrices.length > 0) {
        logger.info(
          `Updated Prices: ${action.payload.changes.updatedPrices.length}`,
          action.payload.changes.updatedPrices
        );
      }
      break;

    // Subscription Availability
    case "UPDATE_SUBSCRIPTION_AVAILABILITY":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}`,
        action.payload.availability
      );
      break;

    // Subscription Offers
    case "CREATE_INTRODUCTORY_OFFER":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}`,
        action.payload.offer
      );
      break;
    case "DELETE_INTRODUCTORY_OFFER":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}`,
        action.payload.offer
      );
      break;
    case "CREATE_PROMOTIONAL_OFFER":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}`,
        action.payload.offer
      );
      break;
    case "DELETE_PROMOTIONAL_OFFER":
      logger.info(
        `Subscription Product ID: ${action.payload.subscriptionProductId}, Offer ID: ${action.payload.offerId}`
      );
      break;

    // Version Metadata
    case "UPDATE_VERSION_METADATA":
      logger.info(
        `Copyright: ${
          action.payload.copyright || "unchanged"
        }, Version String: ${action.payload.versionString || "unchanged"}`
      );
      break;

    // App Details
    case "UPDATE_APP_DETAILS":
      const details = [];
      if (action.payload.primaryLocale)
        details.push(`Primary Locale: ${action.payload.primaryLocale}`);
      if (action.payload.name) details.push(`Name: ${action.payload.name}`);
      if (action.payload.bundleId)
        details.push(`Bundle ID: ${action.payload.bundleId}`);
      if (action.payload.copyright)
        details.push(`Copyright: ${action.payload.copyright}`);
      if (details.length > 0) {
        logger.info(details.join(", "));
      }
      break;

    // App Store Localizations
    case "CREATE_APP_LOCALIZATION":
      logger.info(
        `Locale: ${action.payload.localization.locale}`,
        action.payload.localization
      );
      break;
    case "UPDATE_APP_LOCALIZATION":
      logger.info(`Locale: ${action.payload.locale}`, {
        versionChanges: action.payload.versionChanges,
        appInfoChanges: action.payload.appInfoChanges,
      });
      break;
    case "DELETE_APP_LOCALIZATION":
      logger.info(`Locale: ${action.payload.locale}`);
      break;

    default:
      const _exhaustiveCheck: never = action;
      throw new Error(
        `Unhandled action type: ${(_exhaustiveCheck as any).type}`
      );
  }
}

export async function showPlan(plan: AnyAction[]) {
  for (const action of plan) {
    await showAction(action);
  }
}
