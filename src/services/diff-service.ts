import { z } from "zod";
import {
  AppStoreModelSchema,
  InAppPurchaseSchema,
  PriceScheduleSchema,
  SubscriptionGroupLocalizationSchema,
  SubscriptionGroupSchema,
  SubscriptionSchema,
  PriceSchema,
  IntroductoryOfferSchema,
  PromotionalOfferSchema,
  LocalizationSchema,
} from "../models/app-store";
import { logger } from "../utils/logger";
import { AnyAction, Plan } from "../models/diff-plan";
import { isEqual } from "lodash";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchase = z.infer<typeof InAppPurchaseSchema>;
type InAppPurchaseLocalization = z.infer<typeof LocalizationSchema>;
type SubscriptionGroup = z.infer<typeof SubscriptionGroupSchema>;
type Subscription = z.infer<typeof SubscriptionSchema>;
type SubscriptionLocalization = z.infer<typeof LocalizationSchema>;
type SubscriptionGroupLocalization = z.infer<
  typeof SubscriptionGroupLocalizationSchema
>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;
type PromotionalOffer = z.infer<typeof PromotionalOfferSchema>;
type Price = z.infer<typeof PriceSchema>;

function diffPriceSchedule(
  productId: string,
  currentSchedule: InAppPurchase["priceSchedule"],
  desiredSchedule: InAppPurchase["priceSchedule"]
): AnyAction[] {
  const actions: AnyAction[] = [];

  if (!desiredSchedule) {
    // If the desired state has no price schedule, we don't do anything.
    // Deleting all prices would have to be an explicit action.
    return actions;
  }

  const current = currentSchedule || { baseTerritory: "USA", prices: [] };

  if (current.baseTerritory !== desiredSchedule.baseTerritory) {
    actions.push({
      type: "UPDATE_IAP_BASE_TERRITORY",
      payload: { productId, territory: desiredSchedule.baseTerritory },
    });
  }

  const currentPricesByTerritory = new Map(
    current.prices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredSchedule.prices.map((p) => [p.territory, p])
  );

  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      actions.push({
        type: "CREATE_IAP_PRICE",
        payload: { productId, price: desiredPrice },
      });
    } else if (currentPrice.price !== desiredPrice.price) {
      actions.push({
        type: "UPDATE_IAP_PRICE",
        payload: { productId, price: desiredPrice },
      });
    }
  }

  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      actions.push({
        type: "DELETE_IAP_PRICE",
        payload: { productId, territory },
      });
    }
  }

  return actions;
}

function diffLocalizations(
  productId: string,
  currentLocalizations: InAppPurchaseLocalization[],
  desiredLocalizations: InAppPurchaseLocalization[]
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentLocsByLocale = new Map(
    currentLocalizations.map((loc) => [loc.locale, loc])
  );
  const desiredLocsByLocale = new Map(
    desiredLocalizations.map((loc) => [loc.locale, loc])
  );

  // Find created and updated localizations
  for (const [locale, desiredLoc] of desiredLocsByLocale.entries()) {
    const currentLoc = currentLocsByLocale.get(locale);

    if (!currentLoc) {
      actions.push({
        type: "CREATE_IAP_LOCALIZATION",
        payload: { productId, localization: desiredLoc },
      });
    } else {
      const changes: { name?: string; description?: string } = {};
      if (desiredLoc.name !== currentLoc.name) {
        changes.name = desiredLoc.name;
      }
      if (desiredLoc.description !== currentLoc.description) {
        changes.description = desiredLoc.description;
      }

      if (Object.keys(changes).length > 0) {
        actions.push({
          type: "UPDATE_IAP_LOCALIZATION",
          payload: { productId, locale, changes },
        });
      }
    }
  }

  // Find deleted localizations
  for (const [locale] of currentLocsByLocale.entries()) {
    if (!desiredLocsByLocale.has(locale)) {
      actions.push({
        type: "DELETE_IAP_LOCALIZATION",
        payload: { productId, locale },
      });
    }
  }

  return actions;
}

function diffInAppPurchases(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentIaps = currentState.inAppPurchases || [];
  const desiredIaps = desiredState.inAppPurchases || [];

  const currentIapsByProductId = new Map(
    currentIaps.map((iap) => [iap.productId, iap])
  );
  const desiredIapsByProductId = new Map(
    desiredIaps.map((iap) => [iap.productId, iap])
  );

  for (const [productId, desiredIap] of desiredIapsByProductId.entries()) {
    const currentIap = currentIapsByProductId.get(productId);

    if (!currentIap) {
      actions.push({
        type: "CREATE_IN_APP_PURCHASE",
        payload: { inAppPurchase: desiredIap },
      });
    } else {
      if (currentIap.type !== desiredIap.type) {
        throw new Error(
          `The type for in-app purchase ${productId} cannot be changed. Current: ${currentIap.type}, Desired: ${desiredIap.type}.`
        );
      }
      // Diff top-level properties
      const changes: any = {};
      if (desiredIap.referenceName !== currentIap.referenceName) {
        changes.referenceName = desiredIap.referenceName;
      }
      if (desiredIap.familySharable !== currentIap.familySharable) {
        changes.familySharable = desiredIap.familySharable;
      }
      if (desiredIap.reviewNote !== currentIap.reviewNote) {
        changes.reviewNote = desiredIap.reviewNote;
      }
      if (Object.keys(changes).length > 0) {
        actions.push({
          type: "UPDATE_IN_APP_PURCHASE",
          payload: { productId, changes },
        });
      }

      // Diff nested localizations and prices
      actions.push(
        ...diffLocalizations(
          productId,
          currentIap.localizations || [],
          desiredIap.localizations || []
        )
      );
      actions.push(
        ...diffPriceSchedule(
          productId,
          currentIap.priceSchedule,
          desiredIap.priceSchedule
        )
      );

      if (
        desiredIap.availability &&
        !isEqual(currentIap.availability, desiredIap.availability)
      ) {
        actions.push({
          type: "UPDATE_IAP_AVAILABILITY",
          payload: {
            productId,
            availability: desiredIap.availability,
          },
        });
      }
    }
  }

  for (const [productId] of currentIapsByProductId.entries()) {
    if (!desiredIapsByProductId.has(productId)) {
      actions.push({
        type: "DELETE_IN_APP_PURCHASE",
        payload: { productId },
      });
    }
  }

  return actions;
}

function diffSubscriptionLocalizations(
  subscriptionProductId: string,
  currentLocalizations: SubscriptionLocalization[],
  desiredLocalizations: SubscriptionLocalization[]
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentLocsByLocale = new Map(
    currentLocalizations.map((loc) => [loc.locale, loc])
  );
  const desiredLocsByLocale = new Map(
    desiredLocalizations.map((loc) => [loc.locale, loc])
  );

  for (const [locale, desiredLoc] of desiredLocsByLocale.entries()) {
    const currentLoc = currentLocsByLocale.get(locale);

    if (!currentLoc) {
      actions.push({
        type: "CREATE_SUBSCRIPTION_LOCALIZATION",
        payload: { subscriptionProductId, localization: desiredLoc },
      });
    } else {
      const changes: { name?: string; description?: string } = {};
      if (desiredLoc.name !== currentLoc.name) {
        changes.name = desiredLoc.name;
      }
      if (desiredLoc.description !== currentLoc.description) {
        changes.description = desiredLoc.description;
      }
      if (Object.keys(changes).length > 0) {
        actions.push({
          type: "UPDATE_SUBSCRIPTION_LOCALIZATION",
          payload: { subscriptionProductId, locale, changes },
        });
      }
    }
  }

  for (const [locale] of currentLocsByLocale.entries()) {
    if (!desiredLocsByLocale.has(locale)) {
      actions.push({
        type: "DELETE_SUBSCRIPTION_LOCALIZATION",
        payload: { subscriptionProductId, locale },
      });
    }
  }
  return actions;
}

function diffSubscriptionPrices(
  subscriptionProductId: string,
  currentPrices: Price[],
  desiredPrices: Price[]
): AnyAction[] {
  const actions: AnyAction[] = [];

  const currentPricesByTerritory = new Map(
    currentPrices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredPrices.map((p) => [p.territory, p])
  );

  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      actions.push({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: { subscriptionProductId, price: desiredPrice },
      });
    } else if (currentPrice.price !== desiredPrice.price) {
      actions.push({
        type: "UPDATE_SUBSCRIPTION_PRICE",
        payload: { subscriptionProductId, price: desiredPrice },
      });
    }
  }

  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      actions.push({
        type: "DELETE_SUBSCRIPTION_PRICE",
        payload: { subscriptionProductId, territory },
      });
    }
  }

  return actions;
}

function diffIntroductoryOffers(
  subscriptionProductId: string,
  currentOffers: IntroductoryOffer[],
  desiredOffers: IntroductoryOffer[]
): AnyAction[] {
  if (!isEqual(currentOffers, desiredOffers)) {
    const deleteActions: AnyAction[] = currentOffers.map((o) => ({
      type: "DELETE_INTRODUCTORY_OFFER",
      payload: { subscriptionProductId, offer: o },
    }));
    const createActions: AnyAction[] = desiredOffers.map((o) => ({
      type: "CREATE_INTRODUCTORY_OFFER",
      payload: { subscriptionProductId, offer: o },
    }));
    return [...deleteActions, ...createActions];
  }
  return [];
}

function diffPromotionalOffers(
  subscriptionProductId: string,
  currentOffers: PromotionalOffer[],
  desiredOffers: PromotionalOffer[]
): AnyAction[] {
  // Similar to intro offers, we'll do a simple delete-and-recreate.
  if (!isEqual(currentOffers, desiredOffers)) {
    const deleteActions: AnyAction[] = currentOffers.map((o) => ({
      type: "DELETE_PROMOTIONAL_OFFER",
      payload: { subscriptionProductId, offerId: o.id },
    }));
    const createActions: AnyAction[] = desiredOffers.map((o) => ({
      type: "CREATE_PROMOTIONAL_OFFER",
      payload: { subscriptionProductId, offer: o },
    }));
    return [...deleteActions, ...createActions];
  }
  return [];
}

function diffSubscriptions(
  groupReferenceName: string,
  currentSubscriptions: Subscription[],
  desiredSubscriptions: Subscription[]
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentSubsByProductId = new Map(
    currentSubscriptions.map((s) => [s.productId, s])
  );
  const desiredSubsByProductId = new Map(
    desiredSubscriptions.map((s) => [s.productId, s])
  );

  for (const [productId, desiredSub] of desiredSubsByProductId.entries()) {
    const currentSub = currentSubsByProductId.get(productId);

    if (!currentSub) {
      actions.push({
        type: "CREATE_SUBSCRIPTION",
        payload: { groupReferenceName, subscription: desiredSub },
      });
    } else {
      const changes: any = {};
      if (desiredSub.referenceName !== currentSub.referenceName) {
        changes.referenceName = desiredSub.referenceName;
      }
      if (desiredSub.familySharable !== currentSub.familySharable) {
        changes.familySharable = desiredSub.familySharable;
      }
      if (desiredSub.groupLevel !== currentSub.groupLevel) {
        changes.groupLevel = desiredSub.groupLevel;
      }
      if (desiredSub.subscriptionPeriod !== currentSub.subscriptionPeriod) {
        changes.subscriptionPeriod = desiredSub.subscriptionPeriod;
      }
      if (Object.keys(changes).length > 0) {
        actions.push({
          type: "UPDATE_SUBSCRIPTION",
          payload: { productId, changes },
        });
      }

      actions.push(
        ...diffSubscriptionLocalizations(
          productId,
          currentSub.localizations,
          desiredSub.localizations
        )
      );
      actions.push(
        ...diffSubscriptionPrices(
          productId,
          currentSub.prices,
          desiredSub.prices
        )
      );
      actions.push(
        ...diffIntroductoryOffers(
          productId,
          currentSub.introductoryOffers || [],
          desiredSub.introductoryOffers || []
        )
      );
      actions.push(
        ...diffPromotionalOffers(
          productId,
          currentSub.promotionalOffers || [],
          desiredSub.promotionalOffers || []
        )
      );

      if (
        desiredSub.availability &&
        !isEqual(currentSub.availability, desiredSub.availability)
      ) {
        actions.push({
          type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
          payload: {
            subscriptionProductId: productId,
            availability: desiredSub.availability,
          },
        });
      }
    }
  }

  for (const [productId] of currentSubsByProductId.entries()) {
    if (!desiredSubsByProductId.has(productId)) {
      actions.push({
        type: "DELETE_SUBSCRIPTION",
        payload: { productId },
      });
    }
  }

  return actions;
}

function diffSubscriptionGroupLocalizations(
  groupReferenceName: string,
  currentLocalizations: SubscriptionGroupLocalization[],
  desiredLocalizations: SubscriptionGroupLocalization[]
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentLocsByLocale = new Map(
    currentLocalizations.map((loc) => [loc.locale, loc])
  );
  const desiredLocsByLocale = new Map(
    desiredLocalizations.map((loc) => [loc.locale, loc])
  );

  for (const [locale, desiredLoc] of desiredLocsByLocale.entries()) {
    const currentLoc = currentLocsByLocale.get(locale);
    if (!currentLoc) {
      actions.push({
        type: "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION",
        payload: { groupReferenceName, localization: desiredLoc },
      });
    } else {
      const changes: { name?: string; customAppName?: string } = {};
      if (desiredLoc.name !== currentLoc.name) {
        changes.name = desiredLoc.name;
      }
      if (desiredLoc.customName !== currentLoc.customName) {
        changes.customAppName = desiredLoc.customName ?? undefined;
      }
      if (Object.keys(changes).length > 0) {
        actions.push({
          type: "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION",
          payload: { groupReferenceName, locale, changes },
        });
      }
    }
  }

  for (const [locale] of currentLocsByLocale.entries()) {
    if (!desiredLocsByLocale.has(locale)) {
      actions.push({
        type: "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION",
        payload: { groupReferenceName, locale },
      });
    }
  }
  return actions;
}

function diffSubscriptionGroups(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];
  const currentGroups = currentState.subscriptionGroups || [];
  const desiredGroups = desiredState.subscriptionGroups || [];

  const currentGroupsByName = new Map(
    currentGroups.map((g) => [g.referenceName, g])
  );
  const desiredGroupsByName = new Map(
    desiredGroups.map((g) => [g.referenceName, g])
  );

  const addedGroups: SubscriptionGroup[] = [];
  const removedGroups: SubscriptionGroup[] = [];

  for (const [refName, desiredGroup] of desiredGroupsByName.entries()) {
    const currentGroup = currentGroupsByName.get(refName);

    if (!currentGroup) {
      addedGroups.push(desiredGroup);
    } else {
      // It's an existing group, check for updates within it
      actions.push(
        ...diffSubscriptionGroupLocalizations(
          refName,
          currentGroup.localizations,
          desiredGroup.localizations
        )
      );
      actions.push(
        ...diffSubscriptions(
          refName,
          currentGroup.subscriptions,
          desiredGroup.subscriptions
        )
      );
    }
  }

  for (const [refName, currentGroup] of currentGroupsByName.entries()) {
    if (!desiredGroupsByName.has(refName)) {
      removedGroups.push(currentGroup);
    }
  }

  // Smart rename detection
  if (addedGroups.length === 1 && removedGroups.length === 1) {
    const oldName = removedGroups[0].referenceName;
    const newName = addedGroups[0].referenceName;
    actions.push({
      type: "UPDATE_SUBSCRIPTION_GROUP",
      payload: {
        referenceName: oldName,
        changes: { referenceName: newName },
      },
    });

    // Since we've handled the rename, we need to diff the contents
    // of the renamed group.
    actions.push(
      ...diffSubscriptionGroupLocalizations(
        newName, // use new name for context in sub-diffs
        removedGroups[0].localizations,
        addedGroups[0].localizations
      )
    );
    actions.push(
      ...diffSubscriptions(
        newName, // use new name for context
        removedGroups[0].subscriptions,
        addedGroups[0].subscriptions
      )
    );
  } else {
    // If it's not a simple rename, treat them as separate add/delete
    for (const group of addedGroups) {
      actions.push({
        type: "CREATE_SUBSCRIPTION_GROUP",
        payload: { group },
      });
    }
    for (const group of removedGroups) {
      actions.push({
        type: "DELETE_SUBSCRIPTION_GROUP",
        payload: { referenceName: group.referenceName },
      });
    }
  }

  return actions;
}

function diffAppAvailability(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];
  if (
    desiredState.availability &&
    !isEqual(currentState.availability, desiredState.availability)
  ) {
    actions.push({
      type: "UPDATE_APP_AVAILABILITY",
      payload: {
        availability: desiredState.availability,
      },
    });
  }
  return actions;
}

function diffAppPricing(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];

  const currentSchedule = currentState.pricing;
  const desiredSchedule = desiredState.pricing;

  if (!desiredSchedule) {
    return actions;
  }

  const current = currentSchedule || { baseTerritory: "USA", prices: [] };

  if (current.baseTerritory !== desiredSchedule.baseTerritory) {
    actions.push({
      type: "UPDATE_APP_BASE_TERRITORY",
      payload: { territory: desiredSchedule.baseTerritory },
    });
  }

  const currentPricesByTerritory = new Map(
    current.prices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredSchedule.prices.map((p) => [p.territory, p])
  );

  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      actions.push({
        type: "CREATE_APP_PRICE",
        payload: { price: desiredPrice },
      });
    } else if (currentPrice.price !== desiredPrice.price) {
      actions.push({
        type: "UPDATE_APP_PRICE",
        payload: { price: desiredPrice },
      });
    }
  }

  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      actions.push({
        type: "DELETE_APP_PRICE",
        payload: { territory },
      });
    }
  }

  return actions;
}

export function diff(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): Plan {
  logger.info("Starting diff...");

  if (currentState.schemaVersion !== desiredState.schemaVersion) {
    throw new Error(
      `Schema version mismatch. Current: ${currentState.schemaVersion}, Desired: ${desiredState.schemaVersion}. Aborting.`
    );
  }

  if (currentState.appId !== desiredState.appId) {
    throw new Error(
      `App ID mismatch. Current: ${currentState.appId}, Desired: ${desiredState.appId}. You cannot change the App ID of an existing configuration. Aborting.`
    );
  }

  const iapActions = diffInAppPurchases(currentState, desiredState);
  const subGroupActions = diffSubscriptionGroups(currentState, desiredState);
  const appAvailabilityActions = diffAppAvailability(
    currentState,
    desiredState
  );
  const appPricingActions = diffAppPricing(currentState, desiredState);

  const plan: Plan = [
    ...iapActions,
    ...subGroupActions,
    ...appAvailabilityActions,
    ...appPricingActions,
  ];

  logger.info("Diff completed.");
  logger.info(`Plan contains ${plan.length} actions.`);
  return plan;
}

/*
app pricing
app availability

offers considered as whole
*/
