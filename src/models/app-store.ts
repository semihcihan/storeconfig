import { z } from "zod";
import { TerritoryCodeSchema } from "./territories";
import { LocaleCodeSchema } from "./locales";

export const SubscriptionOfferDurationSchema = z.enum([
  "THREE_DAYS",
  "ONE_WEEK",
  "TWO_WEEKS",
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
]);

const PriceSchema = z.object({
  price: z.string(),
  territory: TerritoryCodeSchema,
});

const PriceScheduleSchema = z.object({
  baseTerritory: TerritoryCodeSchema,
  prices: z.array(PriceSchema),
});

const LocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string(),
  description: z.string(),
});

const AvailabilitySchema = z.object({
  availableInNewTerritories: z.boolean(),
  availableTerritories: z.array(TerritoryCodeSchema),
});

const SubscriptionGroupLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string(),
  customName: z.string().optional().nullable(),
});

const IntroOfferPayAsYouGoSchema = z.object({
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  priceSchedule: PriceScheduleSchema,
  availableTerritories: z.array(TerritoryCodeSchema).optional(),
});

const IntroOfferPayUpFrontSchema = z.object({
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  priceSchedule: PriceScheduleSchema,
  availableTerritories: z.array(TerritoryCodeSchema).optional(),
});

const IntroOfferFreeSchema = z.object({
  type: z.literal("FREE"),
  duration: SubscriptionOfferDurationSchema,
  availableTerritories: z.array(TerritoryCodeSchema).optional(),
});

const IntroductoryOfferSchema = z.discriminatedUnion("type", [
  IntroOfferPayAsYouGoSchema,
  IntroOfferPayUpFrontSchema,
  IntroOfferFreeSchema,
]);

const PromoOfferPayAsYouGoSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  priceSchedule: PriceScheduleSchema,
});

const PromoOfferPayUpFrontSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  priceSchedule: PriceScheduleSchema,
});

const PromoOfferFreeSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("FREE"),
  duration: SubscriptionOfferDurationSchema,
});

const PromotionalOfferSchema = z.discriminatedUnion("type", [
  PromoOfferPayAsYouGoSchema,
  PromoOfferPayUpFrontSchema,
  PromoOfferFreeSchema,
]);

const SubscriptionPeriodSchema = z.enum([
  "ONE_WEEK",
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
]);

export const SubscriptionSchema = z.object({
  productId: z.string(),
  referenceName: z.string(),
  groupLevel: z.number(),
  subscriptionPeriod: SubscriptionPeriodSchema,
  familySharable: z.boolean(),
  priceSchedule: PriceScheduleSchema,
  localizations: z.array(LocalizationSchema),
  introductoryOffers: z.array(IntroductoryOfferSchema).optional(),
  promotionalOffers: z.array(PromotionalOfferSchema).optional(),
  reviewNote: z.string().optional(),
  availability: AvailabilitySchema,
});

export const SubscriptionGroupSchema = z.object({
  referenceName: z.string(),
  localizations: z.array(SubscriptionGroupLocalizationSchema),
  subscriptions: z.array(SubscriptionSchema),
});

export const InAppPurchaseSchema = z.object({
  productId: z.string(),
  type: z.enum(["CONSUMABLE", "NON_CONSUMABLE", "NON_RENEWING_SUBSCRIPTION"]),
  referenceName: z.string(),
  familySharable: z.boolean(),
  priceSchedule: PriceScheduleSchema,
  localizations: z.array(LocalizationSchema),
  reviewNote: z.string().optional(),
  availability: AvailabilitySchema,
});

export const AppStoreModelSchema = z.object({
  schemaVersion: z.string(),
  appId: z.string(),
  inAppPurchases: z.array(InAppPurchaseSchema).optional(),
  subscriptionGroups: z.array(SubscriptionGroupSchema).optional(),
});
