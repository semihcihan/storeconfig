import { z } from "zod";
import {
  SubscriptionPeriodSchema,
  SubscriptionOfferDurationSchema,
} from "@semihcihan/shared";

// Subscription period mappings between Apple's format and our format
export const SUBSCRIPTION_PERIOD_MAPPING: {
  [key: string]: z.infer<typeof SubscriptionPeriodSchema>;
} = {
  P1W: "ONE_WEEK",
  P1M: "ONE_MONTH",
  P2M: "TWO_MONTHS",
  P3M: "THREE_MONTHS",
  P6M: "SIX_MONTHS",
  P1Y: "ONE_YEAR",
  ONE_WEEK: "ONE_WEEK",
  ONE_MONTH: "ONE_MONTH",
  TWO_MONTHS: "TWO_MONTHS",
  THREE_MONTHS: "THREE_MONTHS",
  SIX_MONTHS: "SIX_MONTHS",
  ONE_YEAR: "ONE_YEAR",
};

// Duration mappings for offers between Apple's format and our format
export const DURATION_MAPPING: {
  [key: string]: z.infer<typeof SubscriptionOfferDurationSchema>;
} = {
  P3D: "THREE_DAYS",
  P7D: "ONE_WEEK",
  P14D: "TWO_WEEKS",
  P1M: "ONE_MONTH",
  P2M: "TWO_MONTHS",
  P3M: "THREE_MONTHS",
  P6M: "SIX_MONTHS",
  P1Y: "ONE_YEAR",
  THREE_DAYS: "THREE_DAYS",
  ONE_WEEK: "ONE_WEEK",
  TWO_WEEKS: "TWO_WEEKS",
  ONE_MONTH: "ONE_MONTH",
  TWO_MONTHS: "TWO_MONTHS",
  THREE_MONTHS: "THREE_MONTHS",
  SIX_MONTHS: "SIX_MONTHS",
  ONE_YEAR: "ONE_YEAR",
};

// API field configurations
export const API_FIELD_CONFIGS = {
  inAppPurchases: {
    include: [
      "inAppPurchaseLocalizations",
      "iapPriceSchedule",
      "inAppPurchaseAvailability",
    ],
    fieldsInAppPurchaseLocalizations: ["name", "description", "locale"],
    fieldsInAppPurchaseAvailabilities: [
      "availableInNewTerritories",
      "availableTerritories",
    ],
  },
  subscriptionGroups: {
    include: ["subscriptions", "subscriptionGroupLocalizations"],
    fieldsSubscriptions: [
      "name",
      "productId",
      "subscriptionPeriod",
      "familySharable",
      "subscriptionLocalizations",
      "promotionalOffers",
      "introductoryOffers",
      "groupLevel",
      "reviewNote",
    ],
    fieldsSubscriptionGroupLocalizations: ["name", "customAppName", "locale"],
    fieldsSubscriptionGroups: [
      "referenceName",
      "subscriptions",
      "subscriptionGroupLocalizations",
    ],
  },
  subscriptionOffers: {
    include: ["territory", "subscriptionPricePoint"],
  },
  subscriptionPrices: {
    include: ["territory", "subscriptionPricePoint"],
  },
  subscriptionOfferPrices: {
    include: ["territory", "subscriptionPricePoint", "startDate", "endDate"],
  },
  manualPrices: {
    include: ["territory", "inAppPurchasePricePoint"],
    fieldsInAppPurchasePrices: [
      "startDate",
      "endDate",
      "territory",
      "inAppPurchasePricePoint",
    ],
  },
  automaticPrices: {
    include: ["territory", "inAppPurchasePricePoint"],
    fieldsInAppPurchasePrices: [
      "startDate",
      "territory",
      "inAppPurchasePricePoint",
    ],
  },
  appAvailability: {
    fieldsAppAvailabilities: ["availableInNewTerritories"],
  },
  territoryAvailabilities: {
    include: ["territory"],
    fieldsTerritoryAvailabilities: ["available", "territory"],
  },
  appPrices: {
    include: ["territory", "appPricePoint"],
    fieldsAppPrices: [
      "startDate",
      "endDate",
      "manual",
      "territory",
      "appPricePoint",
    ],
  },
  territories: {
    fieldsTerritories: ["currency"],
  },
};

// API limits
export const API_LIMITS = {
  DEFAULT_LIMIT_v1: 200,
  DEFAULT_LIMIT_v2: 8000,
} as const;
