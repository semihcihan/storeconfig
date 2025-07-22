import { z } from "zod";
import {
  AppStoreModelSchema,
  InAppPurchaseSchema,
  SubscriptionGroupLocalizationSchema,
  SubscriptionGroupSchema,
  SubscriptionSchema,
  SubscriptionOfferDurationSchema,
  PriceSchema,
  IntroductoryOfferSchema,
  PromotionalOfferSchema,
  LocalizationSchema,
  AppStoreLocalizationSchema,
  AppStoreVersionLocalizationSchema,
  AppStoreAppInfoLocalizationSchema,
} from "../models/app-store";
import { TerritoryCodeSchema } from "../models/territories";
import { logger } from "../utils/logger";
import { AnyAction, Plan } from "../models/diff-plan";
import { isEqual } from "lodash";
import {
  validateIntroductoryOffers,
  getIntroductoryOfferGroupingKey,
} from "../helpers/introductory-offer-validation";
import { deepEqualUnordered } from "../helpers/validation-helpers";

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

  if (desiredState.inAppPurchases === undefined) {
    return actions;
  }

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

      // Validate IAP update constraints
      if (currentIap.familySharable && !desiredIap.familySharable) {
        throw new Error(
          `Family sharing cannot be turned off for in-app purchase ${productId} once it has been enabled.`
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
        !deepEqualUnordered(
          currentIap.availability?.availableTerritories || [],
          desiredIap.availability.availableTerritories
        )
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
  const currentPricesByTerritory = new Map(
    currentPrices.map((p) => [p.territory, p])
  );
  const desiredPricesByTerritory = new Map(
    desiredPrices.map((p) => [p.territory, p])
  );

  const addedPrices: Price[] = [];
  const updatedPrices: Price[] = [];

  // Find added and updated prices
  for (const [territory, desiredPrice] of desiredPricesByTerritory.entries()) {
    const currentPrice = currentPricesByTerritory.get(territory);
    if (!currentPrice) {
      addedPrices.push(desiredPrice);
    } else if (currentPrice.price !== desiredPrice.price) {
      updatedPrices.push(desiredPrice);
    }
  }

  // Check for deleted territories - this is not allowed for subscriptions
  for (const [territory] of currentPricesByTerritory.entries()) {
    if (!desiredPricesByTerritory.has(territory)) {
      throw new Error(
        `Cannot delete pricing for territory '${territory}' in subscription '${subscriptionProductId}'. Subscriptions must maintain pricing for all territories.`
      );
    }
  }

  // Only create action if there are changes
  if (addedPrices.length > 0 || updatedPrices.length > 0) {
    return [
      {
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId,
          changes: {
            addedPrices,
            updatedPrices,
          },
        },
      },
    ];
  }

  return [];
}

function diffIntroductoryOffers(
  subscriptionProductId: string,
  subscriptionPeriod: string,
  currentOffers: IntroductoryOffer[],
  desiredOffers: IntroductoryOffer[]
): AnyAction[] {
  // Validate that there's only one offer per territory per subscription and duration restrictions
  validateIntroductoryOffers(
    subscriptionProductId,
    subscriptionPeriod,
    desiredOffers
  );

  const actions: AnyAction[] = [];

  // Create maps for efficient lookup by grouping key
  const currentOffersByKey = new Map<string, IntroductoryOffer>();
  const desiredOffersByKey = new Map<string, IntroductoryOffer>();

  // Index current offers by their grouping key
  for (const offer of currentOffers) {
    const key = getIntroductoryOfferGroupingKey(offer);
    currentOffersByKey.set(key, offer);
  }

  // Index desired offers by their grouping key
  for (const offer of desiredOffers) {
    const key = getIntroductoryOfferGroupingKey(offer);
    desiredOffersByKey.set(key, offer);
  }

  // Find offers to delete (in current but not in desired, or changed)
  for (const [key, currentOffer] of currentOffersByKey.entries()) {
    const desiredOffer = desiredOffersByKey.get(key);

    if (!desiredOffer || !deepEqualUnordered(currentOffer, desiredOffer)) {
      // Offer doesn't exist in desired state or has changed - delete it
      actions.push({
        type: "DELETE_INTRODUCTORY_OFFER",
        payload: { subscriptionProductId, offer: currentOffer },
      });
    }
  }

  // Find offers to create (in desired but not in current, or changed)
  for (const [key, desiredOffer] of desiredOffersByKey.entries()) {
    const currentOffer = currentOffersByKey.get(key);

    if (!currentOffer || !deepEqualUnordered(currentOffer, desiredOffer)) {
      // Offer doesn't exist in current state or has changed - create it
      actions.push({
        type: "CREATE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId,
          subscriptionPeriod: subscriptionPeriod as z.infer<
            typeof SubscriptionOfferDurationSchema
          >,
          offer: desiredOffer,
        },
      });
    }
  }

  return actions;
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

  // Subscriptions cannot be deleted once created
  for (const [productId] of currentSubsByProductId.entries()) {
    if (!desiredSubsByProductId.has(productId)) {
      throw new Error(
        `Subscription with productId '${productId}' cannot be deleted. Subscriptions cannot be removed once created.`
      );
    }
  }

  for (const [productId, desiredSub] of desiredSubsByProductId.entries()) {
    const currentSub = currentSubsByProductId.get(productId);

    if (!currentSub) {
      actions.push({
        type: "CREATE_SUBSCRIPTION",
        payload: { groupReferenceName, subscription: desiredSub },
      });

      // For new subscriptions, also generate actions for localizations, availability, pricing, and offers
      // Availability must be created before pricing to ensure the subscription is properly configured
      actions.push(
        ...diffSubscriptionLocalizations(
          productId,
          [],
          desiredSub.localizations
        )
      );

      // Create availability first (required field)
      if (desiredSub.availability) {
        actions.push({
          type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
          payload: {
            subscriptionProductId: productId,
            availability: desiredSub.availability,
          },
        });
      }

      // Create pricing after availability is set up
      actions.push(...diffSubscriptionPrices(productId, [], desiredSub.prices));

      actions.push(
        ...diffIntroductoryOffers(
          productId,
          desiredSub.subscriptionPeriod,
          [],
          desiredSub.introductoryOffers || []
        )
      );
      actions.push(
        ...diffPromotionalOffers(
          productId,
          [],
          desiredSub.promotionalOffers || []
        )
      );
    } else {
      // Validate subscription update constraints
      if (desiredSub.subscriptionPeriod !== currentSub.subscriptionPeriod) {
        throw new Error(
          `Subscription period for subscription ${productId} cannot be changed once created. Current: ${currentSub.subscriptionPeriod}, Desired: ${desiredSub.subscriptionPeriod}.`
        );
      }

      if (currentSub.familySharable && !desiredSub.familySharable) {
        throw new Error(
          `Family sharing cannot be turned off for subscription ${productId} once it has been enabled.`
        );
      }

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
          currentSub.subscriptionPeriod,
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

      // Handle availability changes
      if (
        desiredSub.availability &&
        !deepEqualUnordered(currentSub.availability, desiredSub.availability)
      ) {
        // Availability is being added or updated
        actions.push({
          type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
          payload: {
            subscriptionProductId: productId,
            availability: desiredSub.availability,
          },
        });
      } else if (currentSub.availability && !desiredSub.availability) {
        // Availability is being removed
        throw new Error(
          `Cannot remove availability from subscription ${productId}. Availability cannot be removed once set.`
        );
      }
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

  if (desiredState.subscriptionGroups === undefined) {
    return actions;
  }

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

  if (desiredState.availableTerritories === undefined) {
    return actions;
  }

  if (
    !deepEqualUnordered(
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

function diffVersionMetadata(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];

  const currentCopyright = currentState.copyright;
  const desiredCopyright = desiredState.copyright;
  const currentVersionString = currentState.versionString;
  const desiredVersionString = desiredState.versionString;

  // Check if any version metadata has changed
  const copyrightChanged = currentCopyright !== desiredCopyright;
  const versionStringChanged = currentVersionString !== desiredVersionString;

  if (copyrightChanged || versionStringChanged) {
    actions.push({
      type: "UPDATE_VERSION_METADATA",
      payload: {
        copyright: desiredCopyright,
        versionString: desiredVersionString,
      },
    });
  }

  // Diff app store localizations
  actions.push(
    ...diffAppLocalizations(
      currentState.localizations || [],
      desiredState.localizations || []
    )
  );

  return actions;
}

function diffAppLocalizations(
  currentLocalizations: z.infer<typeof AppStoreLocalizationSchema>[],
  desiredLocalizations: z.infer<typeof AppStoreLocalizationSchema>[]
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
        type: "CREATE_APP_LOCALIZATION",
        payload: { localization: desiredLoc },
      });
    } else {
      // Extract version and app info fields for comparison
      const currentVersionFields: z.infer<
        typeof AppStoreVersionLocalizationSchema
      > = {
        description: currentLoc.description,
        keywords: currentLoc.keywords,
        marketingUrl: currentLoc.marketingUrl,
        promotionalText: currentLoc.promotionalText,
        supportUrl: currentLoc.supportUrl,
        whatsNew: currentLoc.whatsNew,
      };

      const desiredVersionFields: z.infer<
        typeof AppStoreVersionLocalizationSchema
      > = {
        description: desiredLoc.description,
        keywords: desiredLoc.keywords,
        marketingUrl: desiredLoc.marketingUrl,
        promotionalText: desiredLoc.promotionalText,
        supportUrl: desiredLoc.supportUrl,
        whatsNew: desiredLoc.whatsNew,
      };

      const currentAppInfoFields: z.infer<
        typeof AppStoreAppInfoLocalizationSchema
      > = {
        name: currentLoc.name,
        subtitle: currentLoc.subtitle,
        privacyPolicyUrl: currentLoc.privacyPolicyUrl,
        privacyChoicesUrl: currentLoc.privacyChoicesUrl,
      };

      const desiredAppInfoFields: z.infer<
        typeof AppStoreAppInfoLocalizationSchema
      > = {
        name: desiredLoc.name,
        subtitle: desiredLoc.subtitle,
        privacyPolicyUrl: desiredLoc.privacyPolicyUrl,
        privacyChoicesUrl: desiredLoc.privacyChoicesUrl,
      };

      // Compare objects directly
      const versionChanged =
        JSON.stringify(currentVersionFields) !==
        JSON.stringify(desiredVersionFields);
      const appInfoChanged =
        JSON.stringify(currentAppInfoFields) !==
        JSON.stringify(desiredAppInfoFields);

      if (versionChanged || appInfoChanged) {
        const versionChanges = versionChanged ? desiredVersionFields : {};
        const appInfoChanges = appInfoChanged ? desiredAppInfoFields : {};

        actions.push({
          type: "UPDATE_APP_LOCALIZATION",
          payload: { locale, versionChanges, appInfoChanges },
        });
      }
    }
  }

  // Find deleted localizations
  for (const [locale] of currentLocsByLocale.entries()) {
    if (!desiredLocsByLocale.has(locale)) {
      actions.push({
        type: "DELETE_APP_LOCALIZATION",
        payload: { locale },
      });
    }
  }

  return actions;
}

function diffAppPricing(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];

  if (!desiredState.pricing) {
    return actions;
  }

  if (!currentState.pricing) {
    actions.push({
      type: "UPDATE_APP_PRICING",
      payload: {
        priceSchedule: desiredState.pricing,
        changes: {
          addedPrices: desiredState.pricing.prices,
          updatedPrices: [],
          deletedTerritories: [],
        },
      },
    });
    return actions;
  }

  const currentSchedule = currentState.pricing;
  const desiredSchedule = desiredState.pricing;

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

function diffAppDetails(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): AnyAction[] {
  const actions: AnyAction[] = [];

  // Check for primary locale changes
  if (
    desiredState.primaryLocale &&
    currentState.primaryLocale !== desiredState.primaryLocale
  ) {
    actions.push({
      type: "UPDATE_APP_DETAILS",
      payload: {
        primaryLocale: desiredState.primaryLocale,
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
  const versionMetadataActions = diffVersionMetadata(
    currentState,
    desiredState
  );
  const appDetailsActions = diffAppDetails(currentState, desiredState);

  const plan: Plan = [
    ...iapActions,
    ...subGroupActions,
    ...appAvailabilityActions,
    ...appPricingActions,
    ...versionMetadataActions,
    ...appDetailsActions,
  ];

  logger.info("Diff completed.");
  logger.info(`Plan contains ${plan.length} actions.`);
  return plan;
}
