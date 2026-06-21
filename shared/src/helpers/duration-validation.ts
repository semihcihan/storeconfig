import { z } from "zod";
import type { components } from "@semihcihan/app-store-connect-api-types";
import {
  SubscriptionOfferDurationSchema,
  SubscriptionPeriodSchema,
} from "../models/app-store";
import durationsData from "../data/durations.json";

type SubscriptionPeriod = z.infer<typeof SubscriptionPeriodSchema>;
type SubscriptionOfferDuration = z.infer<
  typeof SubscriptionOfferDurationSchema
>;

type OfferType = components["schemas"]["SubscriptionOfferMode"];

interface DurationConfig {
  duration: number;
  durationType: string;
  introOfferDurations: Array<{
    modeType: string;
    durations: Array<{
      typeDuration: number;
      typeUnit: string;
      numberOfPeriods: number;
    }>;
  }>;
}

// Map subscription periods to duration values
const SUBSCRIPTION_PERIOD_TO_DURATION: Record<SubscriptionPeriod, number> = {
  ONE_WEEK: 7,
  ONE_MONTH: 30,
  TWO_MONTHS: 60,
  THREE_MONTHS: 90,
  SIX_MONTHS: 180,
  ONE_YEAR: 365,
};

// Map offer types to durations.json modeType values
const OFFER_TYPE_MAPPING: Record<OfferType, string> = {
  PAY_AS_YOU_GO: "PayAsYouGo",
  PAY_UP_FRONT: "PayUpFront",
  FREE_TRIAL: "FreeTrial",
};

/**
 * Convert typeDuration and typeUnit to our duration format
 */
function convertToDuration(
  typeDuration: number,
  typeUnit: string
): SubscriptionOfferDuration | null {
  // Handle special cases where typeDuration affects the mapping
  if (typeUnit === "ONE_MONTH") {
    switch (typeDuration) {
      case 1:
        return "ONE_MONTH";
      case 2:
        return "TWO_MONTHS";
      case 3:
        return "THREE_MONTHS";
      case 6:
        return "SIX_MONTHS";
      default:
        return null;
    }
  } else if (typeUnit === "ONE_WEEK") {
    switch (typeDuration) {
      case 1:
        return "ONE_WEEK";
      case 2:
        return "TWO_WEEKS";
      default:
        return null;
    }
  } else if (typeUnit === "ONE_DAY") {
    switch (typeDuration) {
      case 3:
        return "THREE_DAYS";
      default:
        return null;
    }
  } else if (typeUnit === "ONE_YEAR") {
    switch (typeDuration) {
      case 1:
        return "ONE_YEAR";
      default:
        return null;
    }
  }

  return null;
}

/**
 * Get valid introductory offer durations for a given subscription period and offer type
 * @param subscriptionPeriod - The subscription period (e.g., "ONE_MONTH")
 * @param offerType - The type of introductory offer (e.g., "FREE_TRIAL")
 * @returns Array of valid duration values for the given combination
 */
export function getValidIntroductoryOfferDurations(
  subscriptionPeriod: SubscriptionPeriod,
  offerType: OfferType
): SubscriptionOfferDuration[] {
  // PAY_AS_YOU_GO doesn't use durations, only numberOfPeriods
  if (offerType === "PAY_AS_YOU_GO") {
    return [];
  }

  const durationValue = SUBSCRIPTION_PERIOD_TO_DURATION[subscriptionPeriod];
  const modeType = OFFER_TYPE_MAPPING[offerType];

  // Find the duration configuration for this subscription period
  const durationConfig = (durationsData as DurationConfig[]).find(
    (config) => config.duration === durationValue
  );

  if (!durationConfig) {
    throw new Error(
      `No duration configuration found for subscription period: ${subscriptionPeriod}`
    );
  }

  // Find the intro offer durations for this mode type
  const introOfferConfig = durationConfig.introOfferDurations.find(
    (config) => config.modeType === modeType
  );

  if (!introOfferConfig) {
    throw new Error(
      `No intro offer configuration found for offer type: ${offerType}`
    );
  }

  // Extract unique duration values and map them to our schema format
  const validDurations = new Set<SubscriptionOfferDuration>();

  for (const duration of introOfferConfig.durations) {
    const mappedDuration = convertToDuration(
      duration.typeDuration,
      duration.typeUnit
    );
    if (mappedDuration) {
      validDurations.add(mappedDuration);
    }
  }

  return Array.from(validDurations);
}

/**
 * Get valid number of periods for PAY_AS_YOU_GO offers
 * @param subscriptionPeriod - The subscription period (e.g., "ONE_MONTH")
 * @returns Array of valid numberOfPeriods values
 */
export function getValidPayAsYouGoPeriods(
  subscriptionPeriod: SubscriptionPeriod
): number[] {
  const durationValue = SUBSCRIPTION_PERIOD_TO_DURATION[subscriptionPeriod];
  const modeType = OFFER_TYPE_MAPPING["PAY_AS_YOU_GO"];

  const durationConfig = (durationsData as DurationConfig[]).find(
    (config) => config.duration === durationValue
  );

  if (!durationConfig) {
    throw new Error(
      `No duration configuration found for subscription period: ${subscriptionPeriod}`
    );
  }

  const introOfferConfig = durationConfig.introOfferDurations.find(
    (config) => config.modeType === modeType
  );

  if (!introOfferConfig) {
    throw new Error(
      `No PAY_AS_YOU_GO configuration found for subscription period: ${subscriptionPeriod}`
    );
  }

  return introOfferConfig.durations.map((d) => d.numberOfPeriods);
}

/**
 * Validate if a duration is valid for a given subscription period and offer type
 * @param subscriptionPeriod - The subscription period
 * @param offerType - The type of introductory offer
 * @param duration - The duration to validate
 * @returns True if valid, false otherwise
 */
export function isValidIntroductoryOfferDuration(
  subscriptionPeriod: SubscriptionPeriod,
  offerType: OfferType,
  duration: SubscriptionOfferDuration
): boolean {
  // PAY_AS_YOU_GO doesn't use durations, only numberOfPeriods
  if (offerType === "PAY_AS_YOU_GO") {
    return false;
  }

  const validDurations = getValidIntroductoryOfferDurations(
    subscriptionPeriod,
    offerType
  );
  return validDurations.includes(duration);
}

/**
 * Validate if a number of periods is valid for PAY_AS_YOU_GO offers
 * @param subscriptionPeriod - The subscription period
 * @param numberOfPeriods - The number of periods to validate
 * @returns True if valid, false otherwise
 */
export function isValidPayAsYouGoPeriods(
  subscriptionPeriod: SubscriptionPeriod,
  numberOfPeriods: number
): boolean {
  const validPeriods = getValidPayAsYouGoPeriods(subscriptionPeriod);
  return validPeriods.includes(numberOfPeriods);
}
