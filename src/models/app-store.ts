import { z } from "zod";
import { TerritoryCodeSchema, territoryCodes } from "./territories";
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

export const PriceSchema = z.object({
  price: z.string(),
  territory: TerritoryCodeSchema,
});

export const PriceScheduleSchema = z
  .object({
    baseTerritory: TerritoryCodeSchema,
    prices: z.array(PriceSchema),
  })
  .refine(
    (data) => {
      return data.prices.some((p) => p.territory === data.baseTerritory);
    },
    {
      message:
        "The base territory must have a corresponding price in the prices array",
      path: ["prices"],
    }
  );

export const LocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string(),
  description: z.string(),
});

export const AvailabilitySchema = z.object({
  availableInNewTerritories: z.boolean(),
  availableTerritories: z.array(TerritoryCodeSchema),
});

export const SubscriptionGroupLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string(),
  customName: z.string().optional().nullable(),
});

const IntroOfferPayAsYouGoSchema = z.object({
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  prices: z.array(PriceSchema),
  availableTerritories: z.array(TerritoryCodeSchema),
});

const IntroOfferPayUpFrontSchema = z.object({
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  prices: z.array(PriceSchema),
  availableTerritories: z.array(TerritoryCodeSchema),
});

const IntroOfferFreeSchema = z.object({
  type: z.literal("FREE"),
  duration: SubscriptionOfferDurationSchema,
  availableTerritories: z.array(TerritoryCodeSchema),
});

export const IntroductoryOfferSchema = z.discriminatedUnion("type", [
  IntroOfferPayAsYouGoSchema,
  IntroOfferPayUpFrontSchema,
  IntroOfferFreeSchema,
]);

const PromoOfferPayAsYouGoSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  prices: z.array(PriceSchema),
});

const PromoOfferPayUpFrontSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  prices: z.array(PriceSchema),
});

const PromoOfferFreeSchema = z.object({
  id: z.string(),
  referenceName: z.string(),
  type: z.literal("FREE"),
  duration: SubscriptionOfferDurationSchema,
});

export const PromotionalOfferSchema = z.discriminatedUnion("type", [
  PromoOfferPayAsYouGoSchema,
  PromoOfferPayUpFrontSchema,
  PromoOfferFreeSchema,
]);

export const SubscriptionPeriodSchema = z.enum([
  "ONE_WEEK",
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
]);

export const SubscriptionSchema = z
  .object({
    productId: z.string(),
    referenceName: z.string(),
    groupLevel: z.number(),
    subscriptionPeriod: SubscriptionPeriodSchema,
    familySharable: z.boolean(),
    prices: z.array(PriceSchema),
    localizations: z.array(LocalizationSchema),
    introductoryOffers: z.array(IntroductoryOfferSchema).optional(),
    promotionalOffers: z.array(PromotionalOfferSchema).optional(),
    reviewNote: z.string().optional(),
    availability: AvailabilitySchema.optional(),
  })
  .refine(
    (data) => {
      // Only validate territory coverage if there are prices
      if (data.prices.length === 0) {
        return true;
      }

      const allTerritoryCodes = new Set(territoryCodes);
      const providedTerritoryCodes = new Set(
        data.prices.map((price) => price.territory)
      );

      // Check if all territory codes are covered
      for (const territoryCode of Array.from(allTerritoryCodes)) {
        if (!providedTerritoryCodes.has(territoryCode)) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Subscription must include prices for all territories",
      path: ["prices"],
    }
  );

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
  priceSchedule: PriceScheduleSchema.optional(),
  localizations: z.array(LocalizationSchema),
  reviewNote: z.string().optional(),
  availability: AvailabilitySchema.optional(),
});

export const AppStoreModelSchema = z.object({
  schemaVersion: z.string(),
  appId: z.string(),
  pricing: PriceScheduleSchema.optional(),
  availableTerritories: z.array(TerritoryCodeSchema),
  inAppPurchases: z.array(InAppPurchaseSchema),
  subscriptionGroups: z.array(SubscriptionGroupSchema),
});
