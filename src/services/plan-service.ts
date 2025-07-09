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
      // Call API to update app availability
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
  }
}

export async function showPlan(plan: AnyAction[]) {
  for (const action of plan) {
    await showAction(action);
  }
}
