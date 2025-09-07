import { z } from "zod";
import type { components } from "../generated/app-store-connect-api";
import { TerritoryCodeSchema } from "./territories";
import { LocaleCodeSchema } from "./locales";
import {
  isValidProductId,
  validateAppStoreModelData,
} from "../helpers/validation-helpers";
import { validateSubscription } from "../helpers/subscription-validation";
import { logger } from "../utils/logger";

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
  );

export const LocalizationSchema = z.object({
  locale: LocaleCodeSchema,
  name: z.string(),
  description: z.string(),
});

export const AvailabilitySchema = z.object({
  availableInNewTerritories: z.boolean(),
  availableTerritories: AvailableTerritoriesSchema,
});

export const SubscriptionGroupLocalizationSchema = z
  .object({
    locale: LocaleCodeSchema,
    name: z.string(),
    customName: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.customName && data.customName.length > MAX_NAME_LENGTH) {
      logger.warn(
        `Warning: customName '${data.customName}' is ${data.customName.length} characters long, but should be at most 30 characters for optimal App Store display.`
      );
    }
  });

const IntroOfferPayAsYouGoSchema = z.object({
  type: z.literal("PAY_AS_YOU_GO"),
  numberOfPeriods: z.number(),
  prices: z.array(PriceSchema),
});

const IntroOfferPayUpFrontSchema = z.object({
  type: z.literal("PAY_UP_FRONT"),
  duration: SubscriptionOfferDurationSchema,
  prices: z.array(PriceSchema),
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
  type: z.literal("FREE_TRIAL"),
  duration: SubscriptionOfferDurationSchema,
});

export const PromotionalOfferSchema = z
  .discriminatedUnion("type", [
    PromoOfferPayAsYouGoSchema,
    PromoOfferPayUpFrontSchema,
    PromoOfferFreeSchema,
  ])
  .superRefine((data, ctx) => {
    if (data.referenceName.length > MAX_NAME_LENGTH) {
      logger.warn(
        `Warning: referenceName '${data.referenceName}' is ${data.referenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
      );
    }
    if (data.id.length > MAX_PRODUCT_ID_LENGTH) {
      logger.warn(
        `Warning: productId '${data.id}' is ${data.id.length} characters long, but should be at most 100 characters for optimal App Store display.`
      );
    }
  });

export const SubscriptionSchema = z
  .object({
    productId: z.string().refine(isValidProductId, {
      message:
        "Product ID can only contain alphanumeric characters, underscores, and periods",
    }),
    referenceName: z.string(),
    groupLevel: z.number(),
    subscriptionPeriod: SubscriptionPeriodSchema,
    familySharable: z.boolean(),
    prices: z.array(PriceSchema).optional(),
    localizations: z.array(LocalizationSchema).optional(),
    introductoryOffers: z.array(IntroductoryOfferSchema).optional(),
    promotionalOffers: z.array(PromotionalOfferSchema).optional(),
    reviewNote: z.string().optional(),
    availability: AvailabilitySchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.productId.length > MAX_PRODUCT_ID_LENGTH) {
      logger.warn(
        `Warning: productId '${data.productId}' is ${data.productId.length} characters long, but should be at most 100 characters for optimal App Store display.`
      );
    }
    if (data.referenceName.length > MAX_NAME_LENGTH) {
      logger.warn(
        `Warning: referenceName '${data.referenceName}' is ${data.referenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
      );
    }
  })
  .superRefine(validateSubscription);

export const SubscriptionGroupSchema = z
  .object({
    referenceName: z.string(),
    localizations: z.array(SubscriptionGroupLocalizationSchema),
    subscriptions: z.array(SubscriptionSchema),
  })
  .superRefine((data, ctx) => {
    if (data.referenceName.length > MAX_NAME_LENGTH) {
      logger.warn(
        `Warning: referenceName '${data.referenceName}' is ${data.referenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
      );
    }
  });

export const InAppPurchaseSchema = z
  .object({
    productId: z.string().refine(isValidProductId, {
      message:
        "Product ID can only contain alphanumeric characters, underscores, and periods",
    }),
    type: z.enum([
      "CONSUMABLE",
      "NON_CONSUMABLE",
      "NON_RENEWING_SUBSCRIPTION",
    ] as const) satisfies z.ZodType<components["schemas"]["InAppPurchaseType"]>,
    referenceName: z.string(),
    familySharable: z.boolean(),
    priceSchedule: PriceScheduleSchema.optional(),
    localizations: z.array(LocalizationSchema).optional(),
    reviewNote: z.string().optional(),
    availability: AvailabilitySchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.productId.length > MAX_PRODUCT_ID_LENGTH) {
      logger.warn(
        `Warning: productId '${data.productId}' is ${data.productId.length} characters long, but should be at most 30 characters for optimal App Store display.`
      );
    }
    if (data.referenceName.length > MAX_NAME_LENGTH) {
      logger.warn(
        `Warning: referenceName '${data.referenceName}' is ${data.referenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
      );
    }
  });

export const AppStoreVersionLocalizationSchema = z.object({
  description: z.string().optional(),
  keywords: z.string().optional(),
  marketingUrl: z.string().url().optional(),
  promotionalText: z.string().optional(),
  supportUrl: z.string().url().optional(),
  whatsNew: z.string().optional(),
});

export const AppStoreAppInfoLocalizationSchema = z.object({
  name: z.string().optional(),
  subtitle: z.string().optional(),
  privacyPolicyUrl: z.string().url().optional(),
  privacyChoicesUrl: z.string().url().optional(),
});

export const AppStoreLocalizationSchema = z
  .object({
    locale: LocaleCodeSchema,
  })
  .and(AppStoreVersionLocalizationSchema)
  .and(AppStoreAppInfoLocalizationSchema)
  .superRefine((data, ctx) => {
    if (data.description && data.description.length < 10) {
      logger.warn(
        `Warning: description for locale '${data.locale}' is ${data.description.length} characters long, but should be at least 10 characters.`
      );
    }
  });
export const AppStoreModelSchema = z
  .object({
    schemaVersion: z.string(),
    appId: z.string(),
    copyright: z.string().optional(),
    primaryLocale: LocaleCodeSchema.optional(),
    pricing: PriceScheduleSchema.optional(),
    availableTerritories: AvailableTerritoriesSchema.optional(),
    inAppPurchases: z.array(InAppPurchaseSchema).optional(),
    subscriptionGroups: z.array(SubscriptionGroupSchema).optional(),
    versionString: z.string().optional(),
    localizations: z.array(AppStoreLocalizationSchema).optional(),
  })
  .superRefine(validateAppStoreModelData);
