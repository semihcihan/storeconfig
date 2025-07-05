import { z } from "zod";

const PriceSchema = z.object({
  price: z.string(),
  territory: z.string(),
});

const PriceScheduleSchema = z.object({
  baseTerritory: z.string(),
  prices: z.array(PriceSchema),
});

const LocalizationSchema = z.object({
  locale: z.string(),
  name: z.string(),
  description: z.string(),
});

const AvailabilitySchema = z.object({
  availableInNewTerritories: z.boolean(),
  availableTerritories: z.array(z.string()),
});

const SubscriptionGroupLocalizationSchema = z.object({
  locale: z.string(),
  name: z.string(),
  customAppName: z.string().optional(),
});

const IntroOfferPayAsYouGoSchema = z.object({
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  priceSchedule: PriceScheduleSchema,
  availableTerritories: z.array(z.string()).optional(),
});

const IntroOfferPayUpFrontSchema = z.object({
  type: z.literal("PAY_UP_FRONT"),
  duration: z.string(),
  priceSchedule: PriceScheduleSchema,
  availableTerritories: z.array(z.string()).optional(),
});

const IntroOfferFreeSchema = z.object({
  type: z.literal("FREE"),
  duration: z.string(),
  availableTerritories: z.array(z.string()).optional(),
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
  duration: z.string(),
  priceSchedule: PriceScheduleSchema,
});

const PromoOfferFreeSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("FREE"),
  duration: z.string(),
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

const SubscriptionSchema = z.object({
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
  availability: AvailabilitySchema.optional(),
});

const SubscriptionGroupSchema = z.object({
  referenceName: z.string(),
  localizations: z.array(SubscriptionGroupLocalizationSchema),
  subscriptions: z.array(SubscriptionSchema),
});

const InAppPurchaseSchema = z.object({
  productId: z.string(),
  type: z.enum(["CONSUMABLE", "NON_CONSUMABLE", "NON_RENEWING_SUBSCRIPTION"]),
  referenceName: z.string(),
  familySharable: z.boolean(),
  priceSchedule: PriceScheduleSchema,
  localizations: z.array(LocalizationSchema),
  reviewNote: z.string().optional(),
  availability: AvailabilitySchema.optional(),
});

export const AppStoreModelSchema = z.object({
  schemaVersion: z.string(),
  appId: z.string(),
  inAppPurchases: z.array(InAppPurchaseSchema).optional(),
  subscriptionGroups: z.array(SubscriptionGroupSchema).optional(),
});
