import { z } from "zod";
import {
  InAppPurchaseSchema,
  PriceSchema,
  SubscriptionGroupLocalizationSchema,
  SubscriptionGroupSchema,
  SubscriptionSchema,
  IntroductoryOfferSchema,
  PromotionalOfferSchema,
  LocalizationSchema,
  AvailabilitySchema,
  SubscriptionPeriodSchema,
  SubscriptionOfferDurationSchema,
  PriceScheduleSchema,
  AppStoreLocalizationSchema,
  AppStoreVersionLocalizationSchema,
  AppStoreAppInfoLocalizationSchema,
  LocaleCodeSchema,
  TerritoryCodeSchema,
} from "@semihcihan/shared";

// #################################################################################
// Base Action Types
// #################################################################################

export type Action<T extends string, P> = {
  type: T;
  payload: P;
};

// #################################################################################
// In-App Purchase Action Types
// #################################################################################

export type CreateInAppPurchaseAction = Action<
  "CREATE_IN_APP_PURCHASE",
  {
    inAppPurchase: z.infer<typeof InAppPurchaseSchema>;
  }
>;

export type UpdateInAppPurchaseAction = Action<
  "UPDATE_IN_APP_PURCHASE",
  {
    productId: string;
    changes: {
      referenceName?: string;
      familySharable?: boolean;
      reviewNote?: string;
    };
  }
>;

// #################################################################################
// IAP Localization Action Types
// #################################################################################

export type CreateIapLocalizationAction = Action<
  "CREATE_IAP_LOCALIZATION",
  {
    productId: string;
    localization: z.infer<typeof LocalizationSchema>;
  }
>;

export type UpdateIapLocalizationAction = Action<
  "UPDATE_IAP_LOCALIZATION",
  {
    productId: string;
    locale: z.infer<typeof LocaleCodeSchema>;
    changes: {
      name?: string;
      description?: string;
    };
  }
>;

export type DeleteIapLocalizationAction = Action<
  "DELETE_IAP_LOCALIZATION",
  {
    productId: string;
    locale: z.infer<typeof LocaleCodeSchema>;
  }
>;

// #################################################################################
// IAP Price Schedule Action Types
// #################################################################################

export type UpdateIapPricingAction = Action<
  "UPDATE_IAP_PRICING",
  {
    productId: string;
    priceSchedule: z.infer<typeof PriceScheduleSchema>;
    changes: {
      addedPrices: z.infer<typeof PriceSchema>[];
      updatedPrices: z.infer<typeof PriceSchema>[];
      deletedTerritories: z.infer<typeof TerritoryCodeSchema>[];
    };
  }
>;

// #################################################################################
// IAP Availability Action Types
// #################################################################################

export type UpdateIapAvailabilityAction = Action<
  "UPDATE_IAP_AVAILABILITY",
  {
    productId: string;
    availability: z.infer<typeof AvailabilitySchema>;
  }
>;

// #################################################################################
// App-level Action Types
// #################################################################################

export type UpdateAppAvailabilityAction = Action<
  "UPDATE_APP_AVAILABILITY",
  {
    availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
  }
>;

export type UpdateAppPricingAction = Action<
  "UPDATE_APP_PRICING",
  {
    priceSchedule: z.infer<typeof PriceScheduleSchema>;
    changes: {
      addedPrices: z.infer<typeof PriceSchema>[];
      updatedPrices: z.infer<typeof PriceSchema>[];
      deletedTerritories: z.infer<typeof TerritoryCodeSchema>[];
    };
  }
>;

export type UpdateAppDetailsAction = Action<
  "UPDATE_APP_DETAILS",
  {
    primaryLocale?: z.infer<typeof LocaleCodeSchema>;
    name?: string;
    bundleId?: string;
    copyright?: string;
  }
>;

// #################################################################################
// Subscription Group Action Types
// #################################################################################

export type CreateSubscriptionGroupAction = Action<
  "CREATE_SUBSCRIPTION_GROUP",
  {
    group: z.infer<typeof SubscriptionGroupSchema>;
  }
>;

export type UpdateSubscriptionGroupAction = Action<
  "UPDATE_SUBSCRIPTION_GROUP",
  {
    referenceName: string;
    changes: {
      referenceName?: string;
    };
  }
>;

export type CreateSubscriptionGroupLocalizationAction = Action<
  "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION",
  {
    groupReferenceName: string;
    localization: z.infer<typeof SubscriptionGroupLocalizationSchema>;
  }
>;

export type UpdateSubscriptionGroupLocalizationAction = Action<
  "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION",
  {
    groupReferenceName: string;
    locale: z.infer<typeof LocaleCodeSchema>;
    changes: {
      name?: string;
      customAppName?: string;
    };
  }
>;

export type DeleteSubscriptionGroupLocalizationAction = Action<
  "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION",
  {
    groupReferenceName: string;
    locale: z.infer<typeof LocaleCodeSchema>;
  }
>;

// #################################################################################
// Subscription Action Types
// #################################################################################

export type CreateSubscriptionAction = Action<
  "CREATE_SUBSCRIPTION",
  {
    groupReferenceName: string;
    subscription: z.infer<typeof SubscriptionSchema>;
  }
>;

export type UpdateSubscriptionAction = Action<
  "UPDATE_SUBSCRIPTION",
  {
    productId: string;
    changes: {
      referenceName?: string;
      familySharable?: boolean;
      groupLevel?: number;
      subscriptionPeriod?: z.infer<typeof SubscriptionPeriodSchema>;
    };
  }
>;

export type CreateSubscriptionLocalizationAction = Action<
  "CREATE_SUBSCRIPTION_LOCALIZATION",
  {
    subscriptionProductId: string;
    localization: z.infer<typeof LocalizationSchema>;
  }
>;

export type UpdateSubscriptionLocalizationAction = Action<
  "UPDATE_SUBSCRIPTION_LOCALIZATION",
  {
    subscriptionProductId: string;
    locale: z.infer<typeof LocaleCodeSchema>;
    changes: {
      name?: string;
      description?: string;
    };
  }
>;

export type DeleteSubscriptionLocalizationAction = Action<
  "DELETE_SUBSCRIPTION_LOCALIZATION",
  {
    subscriptionProductId: string;
    locale: z.infer<typeof LocaleCodeSchema>;
  }
>;

// #################################################################################
// Subscription Price Action Types
// #################################################################################

export type CreateSubscriptionPriceAction = Action<
  "CREATE_SUBSCRIPTION_PRICE",
  {
    subscriptionProductId: string;
    changes: {
      addedPrices: z.infer<typeof PriceSchema>[];
      updatedPrices: z.infer<typeof PriceSchema>[];
    };
  }
>;

// #################################################################################
// Subscription Availability Action Types
// #################################################################################

export type UpdateSubscriptionAvailabilityAction = Action<
  "UPDATE_SUBSCRIPTION_AVAILABILITY",
  {
    subscriptionProductId: string;
    availability: z.infer<typeof AvailabilitySchema>;
  }
>;

// #################################################################################
// Subscription Offer Action Types
// #################################################################################

export type CreateIntroductoryOfferAction = Action<
  "CREATE_INTRODUCTORY_OFFER",
  {
    subscriptionProductId: string;
    subscriptionPeriod: z.infer<typeof SubscriptionOfferDurationSchema>;
    offer: z.infer<typeof IntroductoryOfferSchema>;
  }
>;

export type DeleteIntroductoryOfferAction = Action<
  "DELETE_INTRODUCTORY_OFFER",
  {
    subscriptionProductId: string;
    offer: z.infer<typeof IntroductoryOfferSchema>;
  }
>;

export type CreatePromotionalOfferAction = Action<
  "CREATE_PROMOTIONAL_OFFER",
  {
    subscriptionProductId: string;
    offer: z.infer<typeof PromotionalOfferSchema>;
  }
>;

export type DeletePromotionalOfferAction = Action<
  "DELETE_PROMOTIONAL_OFFER",
  {
    subscriptionProductId: string;
    offerId: string;
  }
>;

// #################################################################################
// Version Metadata Action Types
// #################################################################################

export type UpdateVersionMetadataAction = Action<
  "UPDATE_VERSION_METADATA",
  {
    copyright?: string;
    versionString?: string;
  }
>;

// #################################################################################
// App Store Localization Action Types
// #################################################################################

export type CreateAppLocalizationAction = Action<
  "CREATE_APP_LOCALIZATION",
  {
    localization: z.infer<typeof AppStoreLocalizationSchema>;
  }
>;

export type UpdateAppLocalizationAction = Action<
  "UPDATE_APP_LOCALIZATION",
  {
    locale: z.infer<typeof LocaleCodeSchema>;
    versionChanges: Partial<z.infer<typeof AppStoreVersionLocalizationSchema>>;
    appInfoChanges: Partial<z.infer<typeof AppStoreAppInfoLocalizationSchema>>;
  }
>;

export type DeleteAppLocalizationAction = Action<
  "DELETE_APP_LOCALIZATION",
  {
    locale: z.infer<typeof LocaleCodeSchema>;
  }
>;

// #################################################################################
// Union Types
// #################################################################################

export type AnyAction =
  // In-App Purchases
  | CreateInAppPurchaseAction
  | UpdateInAppPurchaseAction
  // IAP Localizations
  | CreateIapLocalizationAction
  | UpdateIapLocalizationAction
  | DeleteIapLocalizationAction
  // IAP Prices
  | UpdateIapPricingAction
  // IAP Availability
  | UpdateIapAvailabilityAction
  // App-level
  | UpdateAppAvailabilityAction
  | UpdateAppPricingAction
  | UpdateAppDetailsAction
  // Version Metadata
  | UpdateVersionMetadataAction
  // App Store Localizations
  | CreateAppLocalizationAction
  | UpdateAppLocalizationAction
  | DeleteAppLocalizationAction
  // Subscription Groups
  | CreateSubscriptionGroupAction
  | UpdateSubscriptionGroupAction
  | CreateSubscriptionGroupLocalizationAction
  | UpdateSubscriptionGroupLocalizationAction
  | DeleteSubscriptionGroupLocalizationAction
  // Subscriptions
  | CreateSubscriptionAction
  | UpdateSubscriptionAction
  | CreateSubscriptionLocalizationAction
  | UpdateSubscriptionLocalizationAction
  | DeleteSubscriptionLocalizationAction
  // Subscription Prices
  | CreateSubscriptionPriceAction
  // Subscription Availability
  | UpdateSubscriptionAvailabilityAction
  // Subscription Offers
  | CreateIntroductoryOfferAction
  | DeleteIntroductoryOfferAction
  | CreatePromotionalOfferAction
  | DeletePromotionalOfferAction;

export type Plan = AnyAction[];
