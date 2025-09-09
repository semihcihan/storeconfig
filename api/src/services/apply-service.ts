import { logger } from "@semihcihan/shared";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModelSchema } from "@semihcihan/shared";
import { updateAppAvailability } from "../domains/availability/service";
import { createAppPriceSchedule } from "../domains/pricing/service";
import {
  createNewInAppPurchase,
  updateExistingInAppPurchase,
  createIAPLocalization,
  updateIAPLocalization,
  deleteIAPLocalization,
} from "../domains/in-app-purchases/service";
import { updateIAPAvailability } from "../domains/in-app-purchases/availability-service";
import { updateIAPPricing } from "../domains/in-app-purchases/pricing-service";
import { updateSubscriptionAvailability } from "../domains/subscriptions/availability-service";
import {
  createSubscriptionPrices,
  findSubscriptionId,
  combineSubscriptionPrices,
} from "../domains/subscriptions/pricing-service";
import {
  createNewSubscriptionGroup,
  updateExistingSubscriptionGroup,
  createSubscriptionGroupLocalization,
  updateSubscriptionGroupLocalization,
  deleteSubscriptionGroupLocalization,
  createNewSubscription,
  updateExistingSubscription,
  createSubscriptionLocalization,
  updateSubscriptionLocalization,
  deleteSubscriptionLocalization,
} from "../domains/subscriptions/service";
import { z } from "zod";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { showAction } from "./plan-service";
import { LocalizationAggregator } from "./localization-aggregator";
import { AppStoreVersionService } from "../domains/versions/service";
import { updateAppDetails } from "./app-service";
import {
  createIntroductoryOffer,
  deleteIntroductoryOffer,
} from "../domains/subscriptions/introductory-offer-service";
import { fetchInAppPurchases } from "../domains/in-app-purchases/api-client";
import { fetchSubscriptionGroups } from "../domains/subscriptions/api-client";

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
  newlyCreatedIAPs?: Map<string, string>,
  newlyCreatedSubscriptions?: Map<string, string>
) {
  await showAction(action);
  const localizationService = new LocalizationAggregator();
  switch (action.type) {
    // In-App Purchases
    case "CREATE_IN_APP_PURCHASE":
      const iapId = await createNewInAppPurchase(
        appId,
        action.payload.inAppPurchase
      );
      if (newlyCreatedIAPs && iapId) {
        newlyCreatedIAPs.set(action.payload.inAppPurchase.productId, iapId);
      }
      break;
    case "UPDATE_IN_APP_PURCHASE":
      await updateExistingInAppPurchase(
        appId,
        action.payload.productId,
        action.payload.changes,
        currentIAPsResponse
      );
      break;

    // IAP Localizations
    case "CREATE_IAP_LOCALIZATION":
      await createIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.localization,
        currentIAPsResponse,
        newlyCreatedIAPs
      );
      break;
    case "UPDATE_IAP_LOCALIZATION":
      await updateIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.locale,
        action.payload.changes,
        currentIAPsResponse
      );
      break;
    case "DELETE_IAP_LOCALIZATION":
      await deleteIAPLocalization(
        appId,
        action.payload.productId,
        action.payload.locale,
        currentIAPsResponse
      );
      break;

    // IAP Pricing (Comprehensive)
    case "UPDATE_IAP_PRICING":
      // Execute the comprehensive IAP pricing update
      await updateIAPPricing(
        action.payload.productId,
        action.payload.priceSchedule,
        currentIAPsResponse!,
        newlyCreatedIAPs
      );
      break;

    // Version Metadata
    case "UPDATE_VERSION_METADATA":
      const versionService = new AppStoreVersionService();
      await versionService.applyVersionMetadata(appId, {
        ...desiredState,
        copyright: action.payload.copyright,
        versionString: action.payload.versionString,
      });
      break;

    // IAP Availability
    case "UPDATE_IAP_AVAILABILITY":
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
      // Execute the pricing update with the complete schedule provided by diff-service
      await createAppPriceSchedule(action.payload.priceSchedule, appId);
      break;

    // App-level details
    case "UPDATE_APP_DETAILS":
      await updateAppDetails(appId, action.payload);
      break;

    // App Store Localizations
    case "CREATE_APP_LOCALIZATION":
      await localizationService.createAppLocalization(
        appId,
        action.payload.localization.locale,
        action.payload.localization
      );
      break;
    case "UPDATE_APP_LOCALIZATION": {
      await localizationService.updateAppLocalization(
        appId,
        action.payload.locale,
        action.payload.versionChanges,
        action.payload.appInfoChanges
      );
      break;
    }
    case "DELETE_APP_LOCALIZATION": {
      await localizationService.deleteAppLocalization(
        appId,
        action.payload.locale
      );
      break;
    }

    // Subscription Groups
    case "CREATE_SUBSCRIPTION_GROUP":
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
      await updateExistingSubscriptionGroup(
        appId,
        action.payload.referenceName,
        action.payload.changes,
        currentSubscriptionGroupsResponse
      );
      break;

    // Subscription Group Localizations
    case "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      await createSubscriptionGroupLocalization(
        appId,
        action.payload.groupReferenceName,
        action.payload.localization,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptionGroups
      );
      break;
    case "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION":
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
      const subscriptionId = await createNewSubscription(
        appId,
        action.payload.groupReferenceName,
        action.payload.subscription,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptionGroups
      );
      if (newlyCreatedSubscriptions && subscriptionId) {
        newlyCreatedSubscriptions.set(
          action.payload.subscription.productId,
          subscriptionId
        );
      }
      break;
    case "UPDATE_SUBSCRIPTION":
      await updateExistingSubscription(
        appId,
        action.payload.productId,
        action.payload.changes,
        currentSubscriptionGroupsResponse
      );
      break;

    // Subscription Localizations
    case "CREATE_SUBSCRIPTION_LOCALIZATION":
      await createSubscriptionLocalization(
        appId,
        action.payload.subscriptionProductId,
        action.payload.localization,
        currentSubscriptionGroupsResponse,
        newlyCreatedSubscriptions
      );
      break;
    case "UPDATE_SUBSCRIPTION_LOCALIZATION":
      await updateSubscriptionLocalization(
        appId,
        action.payload.subscriptionProductId,
        action.payload.locale,
        action.payload.changes,
        currentSubscriptionGroupsResponse
      );
      break;
    case "DELETE_SUBSCRIPTION_LOCALIZATION":
      await deleteSubscriptionLocalization(
        appId,
        action.payload.subscriptionProductId,
        action.payload.locale,
        currentSubscriptionGroupsResponse
      );
      break;

    // Subscription Prices
    case "CREATE_SUBSCRIPTION_PRICE":
      const targetSubscriptionId = findSubscriptionId(
        action.payload.subscriptionProductId,
        newlyCreatedSubscriptions,
        currentSubscriptionGroupsResponse
      );
      const allPrices = combineSubscriptionPrices(
        action.payload.changes.addedPrices,
        action.payload.changes.updatedPrices
      );
      await createSubscriptionPrices(targetSubscriptionId, allPrices);
      break;

    // Subscription Availability
    case "UPDATE_SUBSCRIPTION_AVAILABILITY":
      await updateSubscriptionAvailability(
        action.payload.subscriptionProductId,
        action.payload.availability,
        appId,
        currentSubscriptionGroupsResponse!,
        newlyCreatedSubscriptions
      );
      break;

    // Subscription Offers
    case "CREATE_INTRODUCTORY_OFFER":
      await createIntroductoryOffer(
        action.payload.subscriptionProductId,
        action.payload.subscriptionPeriod,
        action.payload.offer,
        newlyCreatedSubscriptions,
        currentSubscriptionGroupsResponse
      );
      break;
    case "DELETE_INTRODUCTORY_OFFER":
      await deleteIntroductoryOffer(
        action.payload.subscriptionProductId,
        action.payload.offer,
        newlyCreatedSubscriptions,
        currentSubscriptionGroupsResponse
      );
      break;
    case "CREATE_PROMOTIONAL_OFFER":
      break;
    case "DELETE_PROMOTIONAL_OFFER":
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
  currentState: AppStoreModel,
  desiredState: AppStoreModel
) {
  const appId = currentState.appId;
  logger.debug(`Applying plan with ${plan.length} actions for app ${appId}`);

  // Check if we have any IAP-related actions to avoid unnecessary API call
  const hasIAPActions = plan.some(
    (action) =>
      action.type.includes("IAP") || action.type.includes("IN_APP_PURCHASE")
  );

  // Check if we have any subscription-related actions to avoid unnecessary API call
  const hasSubscriptionActions = plan.some(
    (action) =>
      action.type.includes("SUBSCRIPTION_GROUP") ||
      action.type.includes("SUBSCRIPTION") ||
      action.type.includes("INTRODUCTORY_OFFER") ||
      action.type.includes("PROMOTIONAL_OFFER")
  );

  // Fetch raw IAP response once if needed
  let currentIAPsResponse: InAppPurchasesV2Response | undefined;
  if (hasIAPActions) {
    currentIAPsResponse = await fetchInAppPurchases(appId);
  }

  // Fetch raw subscription groups response once if needed
  let currentSubscriptionGroupsResponse: SubscriptionGroupsResponse | undefined;
  if (hasSubscriptionActions) {
    currentSubscriptionGroupsResponse = await fetchSubscriptionGroups(appId);
  }

  // Track newly created subscription groups, IAPs, and subscriptions for use in subsequent actions
  const newlyCreatedSubscriptionGroups = new Map<string, string>();
  const newlyCreatedIAPs = new Map<string, string>();
  const newlyCreatedSubscriptions = new Map<string, string>();

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
      newlyCreatedIAPs,
      newlyCreatedSubscriptions
    );
  }

  logger.debug("Plan applied successfully");
}
