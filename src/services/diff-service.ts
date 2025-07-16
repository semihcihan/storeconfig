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
import { TerritoryCodeSchema } from "../models/territories";
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

  // If current schedule is undefined, we're creating a new price schedule
  if (!currentSchedule) {
    actions.push({
      type: "UPDATE_IAP_PRICING",
      payload: {
        productId,
        priceSchedule: desiredSchedule,
        changes: {
          addedPrices: desiredSchedule.prices,
          updatedPrices: [],
          deletedTerritories: [],
        },
      },
    });
    return actions;
  }

  const current = currentSchedule;

  // Check if any changes are needed
  const baseTerritoryChanging =
    current.baseTerritory !== desiredSchedule.baseTerritory;

  const currentPricesByTerritory = new Map(
    current.prices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredSchedule.prices.map((p) => [p.territory, p])
  );

  // Track all price changes
  const addedPrices: Price[] = [];
  const updatedPrices: Price[] = [];
  const deletedTerritories: z.infer<typeof TerritoryCodeSchema>[] = [];

  // Find added and updated prices
  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      addedPrices.push(desiredPrice);
    } else if (currentPrice.price !== desiredPrice.price) {
      updatedPrices.push(desiredPrice);
    }
  }

  // Find deleted prices
  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      deletedTerritories.push(territory);
    }
  }

  // If there are any changes, generate a single comprehensive UPDATE_IAP_PRICING action
  const hasChanges =
    baseTerritoryChanging ||
    addedPrices.length > 0 ||
    updatedPrices.length > 0 ||
    deletedTerritories.length > 0;

  if (hasChanges) {
    actions.push({
      type: "UPDATE_IAP_PRICING",
      payload: {
        productId,
        priceSchedule: desiredSchedule, // Always provide the complete target state
        changes: {
          addedPrices,
          updatedPrices,
          deletedTerritories,
        },
      },
    });
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

  // First, check that all current IAPs are present in desired state
  // In-app purchases cannot be deleted once created
  for (const [productId] of currentIapsByProductId.entries()) {
    if (!desiredIapsByProductId.has(productId)) {
      throw new Error(
        `In-app purchase with productId '${productId}' cannot be deleted. In-app purchases cannot be removed once created.`
      );
    }
  }

  for (const [productId, desiredIap] of desiredIapsByProductId.entries()) {
    const currentIap = currentIapsByProductId.get(productId);

    if (!currentIap) {
      actions.push({
        type: "CREATE_IN_APP_PURCHASE",
        payload: { inAppPurchase: desiredIap },
      });

      // For new IAPs, also generate actions for localizations and pricing
      actions.push(
        ...diffLocalizations(productId, [], desiredIap.localizations || [])
      );
      actions.push(
        ...diffPriceSchedule(productId, undefined, desiredIap.priceSchedule)
      );

      if (desiredIap.availability) {
        actions.push({
          type: "UPDATE_IAP_AVAILABILITY",
          payload: {
            productId,
            availability: desiredIap.availability,
          },
        });
      }
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
      if (desiredSub.reviewNote !== currentSub.reviewNote) {
        changes.reviewNote = desiredSub.reviewNote;
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
      const changes: { name?: string; customName?: string } = {};
      if (desiredLoc.name !== currentLoc.name) {
        changes.name = desiredLoc.name;
      }
      if (desiredLoc.customName !== currentLoc.customName) {
        changes.customName = desiredLoc.customName ?? undefined;
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

  // First, check that all current subscription groups are present in desired state
  // Subscription groups cannot be deleted once created
  for (const [referenceName] of currentGroupsByName.entries()) {
    if (!desiredGroupsByName.has(referenceName)) {
      throw new Error(
        `Subscription group with reference name '${referenceName}' cannot be deleted. Subscription groups cannot be removed once created.`
      );
    }
  }

  for (const [refName, desiredGroup] of desiredGroupsByName.entries()) {
    const currentGroup = currentGroupsByName.get(refName);

    if (!currentGroup) {
      actions.push({
        type: "CREATE_SUBSCRIPTION_GROUP",
        payload: { group: desiredGroup },
      });
      // Also create actions for localizations and subscriptions
      actions.push(
        ...diffSubscriptionGroupLocalizations(
          refName,
          [],
          desiredGroup.localizations
        )
      );
      actions.push(
        ...diffSubscriptions(refName, [], desiredGroup.subscriptions)
      );
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

  return actions;
}

function diffAppAvailability(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];
  if (
    !isEqual(
      currentState.availableTerritories,
      desiredState.availableTerritories
    )
  ) {
    actions.push({
      type: "UPDATE_APP_AVAILABILITY",
      payload: {
        availableTerritories: desiredState.availableTerritories,
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

  // If neither current nor desired have pricing, no action needed
  if (!currentSchedule && !desiredSchedule) {
    return actions;
  }

  // Handle case where pricing is being removed (current defined, desired undefined)
  if (currentSchedule && !desiredSchedule) {
    throw new Error(
      "Cannot remove all pricing from an app. Apps must have at least one price configured. " +
        "If you want to remove the app from sale, use app availability settings instead."
    );
  }

  // Handle case where pricing is being added (current undefined, desired defined)
  if (!currentSchedule && desiredSchedule) {
    // Create the entire price schedule at once
    actions.push({
      type: "UPDATE_APP_PRICING",
      payload: {
        priceSchedule: desiredSchedule,
        changes: {
          addedPrices: desiredSchedule.prices,
          updatedPrices: [],
          deletedTerritories: [],
        },
      },
    });
    return actions;
  }

  // At this point, both currentSchedule and desiredSchedule are defined
  if (!currentSchedule || !desiredSchedule) {
    // This should never happen due to the checks above, but TypeScript needs this
    return actions;
  }

  const currentPricesByTerritory = new Map(
    currentSchedule.prices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredSchedule.prices.map((p) => [p.territory, p])
  );

  const baseTerritoryChanging =
    currentSchedule.baseTerritory !== desiredSchedule.baseTerritory;

  // Track all price changes
  const addedPrices: Price[] = [];
  const updatedPrices: Price[] = [];
  const deletedTerritories: z.infer<typeof TerritoryCodeSchema>[] = [];

  // Find added and updated prices
  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      addedPrices.push(desiredPrice);
    } else if (currentPrice.price !== desiredPrice.price) {
      updatedPrices.push(desiredPrice);
    }
  }

  // Find deleted prices
  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      deletedTerritories.push(territory);
    }
  }

  // If there are any changes, generate the UPDATE_APP_PRICING action
  const hasChanges =
    baseTerritoryChanging ||
    addedPrices.length > 0 ||
    updatedPrices.length > 0 ||
    deletedTerritories.length > 0;

  if (hasChanges) {
    actions.push({
      type: "UPDATE_APP_PRICING",
      payload: {
        priceSchedule: desiredSchedule, // Always provide the complete target state
        changes: {
          addedPrices,
          updatedPrices,
          deletedTerritories,
        },
      },
    });
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
