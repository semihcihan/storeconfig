import { z } from "zod";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { TerritoryCodeSchema } from "./territories";
import { LocaleCodeSchema } from "./locales";

// Re-export base schemas for documentation
export { TerritoryCodeSchema, LocaleCodeSchema };
import {
  addUniqueLocaleIssues,
  addUniqueTerritoryIssues,
  isValidProductId,
  validateAppStoreModelData,
} from "../helpers/validation-helpers";
import { validateSubscription } from "../helpers/subscription-validation";

export const WORLDWIDE_TERRITORY_CODE = "worldwide";
export type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

const MAX_NAME_LENGTH = 64;
const MAX_PRODUCT_ID_LENGTH = 100;

export const APP_STORE_SCHEMA_VERSION = "1.0.0";

type SubscriptionPeriodType = NonNullable<
  components["schemas"]["Subscription"]["attributes"]
>["subscriptionPeriod"];

type SubscriptionOfferDurationType =
  components["schemas"]["SubscriptionOfferDuration"];

export const SubscriptionPeriodSchema = z.enum([
  "ONE_WEEK",
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
] as const) satisfies z.ZodType<SubscriptionPeriodType>;

export const SubscriptionOfferDurationSchema = z.enum([
  "THREE_DAYS",
  "ONE_WEEK",
  "TWO_WEEKS",
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
] as const) satisfies z.ZodType<SubscriptionOfferDurationType>;

export const AvailableTerritoriesSchema = z.union([
  z.array(TerritoryCodeSchema),
  z.literal(WORLDWIDE_TERRITORY_CODE),
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
  )
  .superRefine((data, ctx) => {
    addUniqueTerritoryIssues(data.prices, ["prices"], ctx);
  });

export const LocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string().max(35),
  description: z.string().max(55),
});

export const AvailabilitySchema = z.object({
  availableInNewTerritories: z.boolean(),
  availableTerritories: AvailableTerritoriesSchema,
});

export const SubscriptionGroupLocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string().max(75),
  customName: z.string().max(30).optional().nullable(),
});

const IntroOfferPayAsYouGoSchema = z.object({
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  pricing: PriceScheduleSchema,
  availableTerritories: AvailableTerritoriesSchema,
});

const IntroOfferPayUpFrontSchema = z.object({
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  pricing: PriceScheduleSchema,
  availableTerritories: AvailableTerritoriesSchema,
});

const IntroOfferFreeSchema = z.object({
  type: z.literal("FREE_TRIAL"),
  duration: SubscriptionOfferDurationSchema,
  availableTerritories: AvailableTerritoriesSchema,
});

export const IntroductoryOfferSchema = z.discriminatedUnion("type", [
  IntroOfferPayAsYouGoSchema,
  IntroOfferPayUpFrontSchema,
  IntroOfferFreeSchema,
]);

const PromoOfferPayAsYouGoSchema = z.object({
  id: z.string().max(MAX_PRODUCT_ID_LENGTH),
  referenceName: z.string().max(MAX_NAME_LENGTH),
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  pricing: PriceScheduleSchema,
});

const PromoOfferPayUpFrontSchema = z.object({
  id: z.string().max(MAX_PRODUCT_ID_LENGTH),
  referenceName: z.string().max(MAX_NAME_LENGTH),
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  pricing: PriceScheduleSchema,
});

const PromoOfferFreeSchema = z.object({
  id: z.string().max(MAX_PRODUCT_ID_LENGTH),
  referenceName: z.string().max(MAX_NAME_LENGTH),
  type: z.literal("FREE_TRIAL"),
  duration: SubscriptionOfferDurationSchema,
});

export const PromotionalOfferSchema = z.discriminatedUnion("type", [
  PromoOfferPayAsYouGoSchema,
  PromoOfferPayUpFrontSchema,
  PromoOfferFreeSchema,
]);

export const SubscriptionSchema = z
  .object({
    productId: z.string().max(MAX_PRODUCT_ID_LENGTH).refine(isValidProductId, {
      message:
        "Product ID can only contain alphanumeric characters, underscores, and periods",
    }),
    referenceName: z.string().max(MAX_NAME_LENGTH),
    groupLevel: z.number(),
    subscriptionPeriod: SubscriptionPeriodSchema,
    familySharable: z.boolean(),
    reviewNote: z.string().max(4000).optional(),
    pricing: PriceScheduleSchema.optional(),
    introductoryOffers: z.array(IntroductoryOfferSchema).optional(),
    promotionalOffers: z.array(PromotionalOfferSchema).optional(),
    availability: AvailabilitySchema.optional(),
    localizations: z.array(LocalizationSchema).optional(),
  })
  .superRefine(validateSubscription);

export const SubscriptionGroupSchema = z
  .object({
    referenceName: z.string().max(MAX_NAME_LENGTH), //64
    localizations: z.array(SubscriptionGroupLocalizationSchema),
    subscriptions: z.array(SubscriptionSchema),
  })
  .superRefine((data, ctx) => {
    addUniqueLocaleIssues(data.localizations, ["localizations"], ctx);
  });

export const InAppPurchaseSchema = z
  .object({
    productId: z.string().max(MAX_PRODUCT_ID_LENGTH).refine(isValidProductId, {
      message:
        "Product ID can only contain alphanumeric characters, underscores, and periods",
    }),
    type: z.enum([
      "CONSUMABLE",
      "NON_CONSUMABLE",
      "NON_RENEWING_SUBSCRIPTION",
    ] as const) satisfies z.ZodType<components["schemas"]["InAppPurchaseType"]>,
    referenceName: z.string().max(MAX_NAME_LENGTH),
    familySharable: z.boolean(),
    reviewNote: z.string().max(4000).optional(),
    pricing: PriceScheduleSchema.optional(),
    availability: AvailabilitySchema.optional(),
    localizations: z.array(LocalizationSchema).optional(),
  })
  .superRefine((data, ctx) => {
    addUniqueLocaleIssues(data.localizations, ["localizations"], ctx);
  });

export const AppStoreVersionLocalizationSchema = z.object({
  description: z.string().min(10).max(4000).optional(),
  keywords: z.string().max(100).optional(),
  marketingUrl: z.string().url().optional(),
  promotionalText: z.string().max(170).optional(),
  supportUrl: z.string().url().optional(),
  whatsNew: z.string().max(4000).optional(),
});

export const AppStoreAppInfoLocalizationSchema = z.object({
  name: z.string().max(30).optional(),
  subtitle: z.string().max(30).optional(),
  privacyPolicyUrl: z.string().url().optional(),
  privacyChoicesUrl: z.string().url().optional(),
});

export const AppStoreLocalizationSchema = z
  .object({
    locale: LocaleCodeSchema,
  })
  .and(AppStoreAppInfoLocalizationSchema)
  .and(AppStoreVersionLocalizationSchema);

export const AppStoreModelSchema = z
  .object({
    schemaVersion: z.string(),
    appId: z.string(),
    versionString: z.string().optional(),
    pricing: PriceScheduleSchema.optional(),
    availableTerritories: AvailableTerritoriesSchema.optional(),
    inAppPurchases: z.array(InAppPurchaseSchema).optional(),
    subscriptionGroups: z.array(SubscriptionGroupSchema).optional(),
    primaryLocale: LocaleCodeSchema.optional(),
    localizations: z.array(AppStoreLocalizationSchema).optional(),
    copyright: z.string().optional(),
  })
  .superRefine(validateAppStoreModelData);
