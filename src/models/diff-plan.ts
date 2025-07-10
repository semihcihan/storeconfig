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
  PriceScheduleSchema,
} from "./app-store";
import { LocaleCodeSchema } from "./locales";
import { TerritoryCodeSchema } from "./territories";

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

export type DeleteInAppPurchaseAction = Action<
  "DELETE_IN_APP_PURCHASE",
  {
    productId: string;
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

export type UpdateIapBaseTerritoryAction = Action<
  "UPDATE_IAP_BASE_TERRITORY",
  {
    productId: string;
    territory: z.infer<typeof TerritoryCodeSchema>;
  }
>;

export type CreateIapPriceAction = Action<
  "CREATE_IAP_PRICE",
  {
    productId: string;
    price: z.infer<typeof PriceSchema>;
  }
>;

export type UpdateIapPriceAction = Action<
  "UPDATE_IAP_PRICE",
  {
    productId: string;
    price: z.infer<typeof PriceSchema>;
  }
>;

export type DeleteIapPriceAction = Action<
  "DELETE_IAP_PRICE",
  {
    productId: string;
    territory: z.infer<typeof TerritoryCodeSchema>;
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

export type UpdateAppBaseTerritoryAction = Action<
  "UPDATE_APP_BASE_TERRITORY",
  {
    territory: z.infer<typeof TerritoryCodeSchema>;
  }
>;

export type CreateAppPriceScheduleAction = Action<
  "CREATE_APP_PRICE_SCHEDULE",
  {
    priceSchedule: z.infer<typeof PriceScheduleSchema>;
  }
>;

export type CreateAppPriceAction = Action<
  "CREATE_APP_PRICE",
  {
    price: z.infer<typeof PriceSchema>;
  }
>;

export type UpdateAppPriceAction = Action<
  "UPDATE_APP_PRICE",
  {
    price: z.infer<typeof PriceSchema>;
  }
>;

export type DeleteAppPriceAction = Action<
  "DELETE_APP_PRICE",
  {
    territory: z.infer<typeof TerritoryCodeSchema>;
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

export type DeleteSubscriptionGroupAction = Action<
  "DELETE_SUBSCRIPTION_GROUP",
  {
    referenceName: string;
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

export type DeleteSubscriptionAction = Action<
  "DELETE_SUBSCRIPTION",
  {
    productId: string;
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
    price: z.infer<typeof PriceSchema>;
  }
>;

export type UpdateSubscriptionPriceAction = Action<
  "UPDATE_SUBSCRIPTION_PRICE",
  {
    subscriptionProductId: string;
    price: z.infer<typeof PriceSchema>;
  }
>;

export type DeleteSubscriptionPriceAction = Action<
  "DELETE_SUBSCRIPTION_PRICE",
  {
    subscriptionProductId: string;
    territory: z.infer<typeof TerritoryCodeSchema>;
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
// Union Types
// #################################################################################

export type AnyAction =
  // In-App Purchases
  | CreateInAppPurchaseAction
  | UpdateInAppPurchaseAction
  | DeleteInAppPurchaseAction
  // IAP Localizations
  | CreateIapLocalizationAction
  | UpdateIapLocalizationAction
  | DeleteIapLocalizationAction
  // IAP Prices
  | UpdateIapBaseTerritoryAction
  | CreateIapPriceAction
  | UpdateIapPriceAction
  | DeleteIapPriceAction
  // IAP Availability
  | UpdateIapAvailabilityAction
  // App-level
  | UpdateAppAvailabilityAction
  | UpdateAppBaseTerritoryAction
  | CreateAppPriceScheduleAction
  | CreateAppPriceAction
  | UpdateAppPriceAction
  | DeleteAppPriceAction
  // Subscription Groups
  | CreateSubscriptionGroupAction
  | UpdateSubscriptionGroupAction
  | DeleteSubscriptionGroupAction
  | CreateSubscriptionGroupLocalizationAction
  | UpdateSubscriptionGroupLocalizationAction
  | DeleteSubscriptionGroupLocalizationAction
  // Subscriptions
  | CreateSubscriptionAction
  | UpdateSubscriptionAction
  | DeleteSubscriptionAction
  | CreateSubscriptionLocalizationAction
  | UpdateSubscriptionLocalizationAction
  | DeleteSubscriptionLocalizationAction
  // Subscription Prices
  | CreateSubscriptionPriceAction
  | UpdateSubscriptionPriceAction
  | DeleteSubscriptionPriceAction
  // Subscription Availability
  | UpdateSubscriptionAvailabilityAction
  // Subscription Offers
  | CreateIntroductoryOfferAction
  | DeleteIntroductoryOfferAction
  | CreatePromotionalOfferAction
  | DeletePromotionalOfferAction;

export type Plan = AnyAction[];
