import { logger } from "../utils/logger";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModelSchema } from "../models/app-store";
import { updateAppAvailability } from "./apply/app-availability-service";
import { createAppPriceSchedule } from "./apply/app-pricing-service";
import {
  createNewInAppPurchase,
  updateExistingInAppPurchase,
  createIAPLocalization,
  updateIAPLocalization,
  deleteIAPLocalization,
} from "./apply/in-app-purchase-service";
import { updateIAPAvailability } from "./apply/iap-availability-service";
import { updateIAPPricing } from "./apply/iap-pricing-service";
import { fetchInAppPurchases } from "../domains/in-app-purchases/api-client";
import {
  createNewSubscriptionGroup,
  updateExistingSubscriptionGroup,
  createSubscriptionGroupLocalization,
  updateSubscriptionGroupLocalization,
  deleteSubscriptionGroupLocalization,
} from "./apply/subscription-service";
import { z } from "zod";
import type { components } from "../generated/app-store-connect-api";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];

async function executeAction(
  action: AnyAction,
  appId: string,
  currentState: AppStoreModel,
  desiredState: AppStoreModel,
  currentIAPsResponse?: InAppPurchasesV2Response,
  currentSubscriptionGroupsResponse?: SubscriptionGroupsResponse,
  newlyCreatedSubscriptionGroups?: Map<string, string>,
  newlyCreatedIAPs?: Map<string, string>
) {
  logger.info(`Executing action: ${action.type}`);
  switch (action.type) {
    // In-App Purchases
    case "CREATE_IN_APP_PURCHASE":
      logger.info(`  Product ID: ${action.payload.inAppPurchase.productId}`);
      const iapId = await createNewInAppPurchase(
        appId,
        action.payload.inAppPurchase
      );
      if (newlyCreatedIAPs && iapId) {
        newlyCreatedIAPs.set(action.payload.inAppPurchase.productId, iapId);
      }
      break;
    case "UPDATE_IN_APP_PURCHASE":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      await updateExistingInAppPurchase(
        appId,
        action.payload.productId,
        action.payload.changes,
        currentIAPsResponse
      );
      break;

    // IAP Localizations
    case "CREATE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.localization.locale}`);
      await createIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.localization,
        currentIAPsResponse,
        newlyCreatedIAPs
      );
      break;
    case "UPDATE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      await updateIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.locale,
        action.payload.changes,
        currentIAPsResponse
      );
      break;
    case "DELETE_IAP_LOCALIZATION":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      await deleteIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.locale,
        currentIAPsResponse
      );
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

      // Execute the comprehensive IAP pricing update
      await updateIAPPricing(
        action.payload.productId,
        action.payload.priceSchedule,
        currentIAPsResponse!,
        newlyCreatedIAPs
      );
      break;

    // IAP Availability
    case "UPDATE_IAP_AVAILABILITY":
      logger.info(`  Product ID: ${action.payload.productId}`);
      logger.info(
        `  Availability: ${JSON.stringify(action.payload.availability)}`
      );
      await updateIAPAvailability(
        action.payload.productId,
        action.payload.availability,
        appId,
        currentIAPsResponse!,
        newlyCreatedIAPs
      );
      break;

    // App-level availability (non-pricing)
    case "UPDATE_APP_AVAILABILITY":
      await updateAppAvailability(
        action.payload.availableTerritories,
        appId,
        currentState
      );
      break;

    // App-level pricing
    case "UPDATE_APP_PRICING":
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

      // Execute the pricing update with the complete schedule provided by diff-service
      await createAppPriceSchedule(action.payload.priceSchedule, appId);
      break;

    // Subscription Groups
    case "CREATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.group.referenceName}`);
      const groupId = await createNewSubscriptionGroup(
        appId,
        action.payload.group
      );
      if (newlyCreatedSubscriptionGroups && groupId) {
        newlyCreatedSubscriptionGroups.set(
          action.payload.group.referenceName,
          groupId
        );
      }
      break;
    case "UPDATE_SUBSCRIPTION_GROUP":
      logger.info(`  Group Ref Name: ${action.payload.referenceName}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      await updateExistingSubscriptionGroup(
        appId,
        action.payload.referenceName,
        action.payload.changes,
        currentSubscriptionGroupsResponse
      );
      break;

    // Subscription Group Localizations
    case "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.localization.locale}`);
      await createSubscriptionGroupLocalization(
        appId,
        action.payload.groupReferenceName,
        action.payload.localization,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptionGroups
      );
      break;
    case "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      logger.info(`  Changes: ${JSON.stringify(action.payload.changes)}`);
      await updateSubscriptionGroupLocalization(
        appId,
        action.payload.groupReferenceName,
        action.payload.locale,
        action.payload.changes,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptionGroups
      );
      break;
    case "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION":
      logger.info(`  Group Ref Name: ${action.payload.groupReferenceName}`);
      logger.info(`  Locale: ${action.payload.locale}`);
      await deleteSubscriptionGroupLocalization(
        appId,
        action.payload.groupReferenceName,
        action.payload.locale,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptionGroups
      );
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
  currentState: AppStoreModel,
  desiredState: AppStoreModel
) {
  logger.info(`Applying plan with ${plan.length} actions for app ${appId}`);

  // Check if we have any IAP-related actions to avoid unnecessary API call
  const hasIAPActions = plan.some(
    (action) =>
      action.type.includes("IAP") || action.type.includes("IN_APP_PURCHASE")
  );

  // Check if we have any subscription-related actions to avoid unnecessary API call
  const hasSubscriptionActions = plan.some(
    (action) =>
      action.type.includes("SUBSCRIPTION_GROUP") ||
      action.type.includes("SUBSCRIPTION")
  );

  // Fetch raw IAP response once if needed
  let currentIAPsResponse: InAppPurchasesV2Response | undefined;
  if (hasIAPActions) {
    currentIAPsResponse = await fetchInAppPurchases(appId);
  }

  // Fetch raw subscription groups response once if needed
  let currentSubscriptionGroupsResponse: SubscriptionGroupsResponse | undefined;
  if (hasSubscriptionActions) {
    const { fetchSubscriptionGroups } = await import(
      "../domains/subscriptions/api-client"
    );
    currentSubscriptionGroupsResponse = await fetchSubscriptionGroups(appId);
  }

  // Track newly created subscription groups and IAPs for use in subsequent actions
  const newlyCreatedSubscriptionGroups = new Map<string, string>();
  const newlyCreatedIAPs = new Map<string, string>();

  // Execute all actions individually
  for (const action of plan) {
    await executeAction(
      action,
      appId,
      currentState,
      desiredState,
      currentIAPsResponse,
      currentSubscriptionGroupsResponse,
      newlyCreatedSubscriptionGroups,
      newlyCreatedIAPs
    );
  }

  logger.info("Plan application completed");
}
