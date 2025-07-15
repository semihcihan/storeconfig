import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";

async function showAction(action: AnyAction) {
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

    // IAP Pricing (Comprehensive)
    case "UPDATE_IAP_PRICING":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Pricing changes:`);
      logger.info(
        `    Base Territory: ${action.payload.priceSchedule.baseTerritory}`
      );
      if (action.payload.changes.addedPrices.length > 0) {
        logger.info(
          `    Added Prices: ${action.payload.changes.addedPrices.length}`
        );
        action.payload.changes.addedPrices.forEach((price) => {
          logger.info(`      ${price.territory}: ${price.price}`);
        });
      }
      if (action.payload.changes.updatedPrices.length > 0) {
        logger.info(
          `    Updated Prices: ${action.payload.changes.updatedPrices.length}`
        );
        action.payload.changes.updatedPrices.forEach((price) => {
          logger.info(`      ${price.territory}: ${price.price}`);
        });
      }
      if (action.payload.changes.deletedTerritories.length > 0) {
        logger.info(
          `    Deleted Territories: ${action.payload.changes.deletedTerritories.join(
            ", "
          )}`
        );
      }
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
        `  Available Territories: ${JSON.stringify(
          action.payload.availableTerritories
        )}`
      );
      // Call API to update app availability
      break;
    case "UPDATE_APP_PRICING":
      logger.info("  Pricing changes:");
      if (action.payload.priceSchedule) {
        logger.info(
          `    Creating new schedule with base territory: ${action.payload.priceSchedule.baseTerritory}`
        );
        logger.info(
          `    Number of prices: ${action.payload.priceSchedule.prices.length}`
        );
      }
      if (action.payload.changes.addedPrices.length > 0) {
        logger.info(
          `    Added Prices: ${action.payload.changes.addedPrices.length}`
        );
        action.payload.changes.addedPrices.forEach((price) => {
          logger.info(`      ${price.territory}: ${price.price}`);
        });
      }
      if (action.payload.changes.updatedPrices.length > 0) {
        logger.info(
          `    Updated Prices: ${action.payload.changes.updatedPrices.length}`
        );
        action.payload.changes.updatedPrices.forEach((price) => {
          logger.info(`      ${price.territory}: ${price.price}`);
        });
      }
      if (action.payload.changes.deletedTerritories.length > 0) {
        logger.info(
          `    Deleted Territories: ${action.payload.changes.deletedTerritories.join(
            ", "
          )}`
        );
      }
      break;

    // Subscription Groups
    case "CREATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.group.referenceName}`);
      break;
    case "UPDATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.referenceName}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
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

export async function showPlan(plan: AnyAction[]) {
  for (const action of plan) {
    await showAction(action);
  }
}
