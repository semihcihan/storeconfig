import { z } from "zod";
import {
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
} from "../models/app-store";
import {
  getValidIntroductoryOfferDurations,
  getValidPayAsYouGoPeriods,
  isValidIntroductoryOfferDuration,
  isValidPayAsYouGoPeriods,
} from "./duration-validation";
import { logger } from "../utils/logger";
import { ContextualError } from "./error-handling-helpers";

type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;
type SubscriptionOfferDuration = z.infer<
  typeof SubscriptionOfferDurationSchema
>;

/**
 * Generate a grouping key for an introductory offer based on its type and duration/numberOfPeriods
 * @param offer - The introductory offer to generate a key for
 * @returns A string key that uniquely identifies the offer's grouping criteria
 */
export function getIntroductoryOfferGroupingKey(
  offer: IntroductoryOffer
): string {
  if (offer.type === "PAY_AS_YOU_GO") {
    return `${offer.type}_${offer.numberOfPeriods}`;
  } else {
    // For PAY_UP_FRONT and FREE_TRIAL
    return `${offer.type}_${offer.duration}`;
  }
}

/**
 * Get a human-readable description of the grouping criteria for an introductory offer
 * @param offer - The introductory offer to describe
 * @returns A string describing the grouping criteria
 */
export function getIntroductoryOfferGroupingDescription(
  offer: IntroductoryOffer
): string {
  if (offer.type === "PAY_AS_YOU_GO") {
    return `type '${offer.type}' with numberOfPeriods '${offer.numberOfPeriods}'`;
  } else {
    // For PAY_UP_FRONT and FREE_TRIAL
    return `type '${offer.type}' with duration '${offer.duration}'`;
  }
}

/**
 * Validate introductory offers grouping to ensure unique type+duration or type+numberOfPeriods combinations
 * @param introductoryOffers - Array of introductory offers to validate
 * @param productId - The product ID of the subscription for error messages
 * @returns Object with success status and error details if validation fails
 */
export function validateIntroductoryOffersGrouping(
  introductoryOffers: IntroductoryOffer[],
  productId?: string
): { success: boolean; error?: string } {
  const groups = new Map<string, { count: number; indices: number[] }>();

  for (let i = 0; i < introductoryOffers.length; i++) {
    const offer = introductoryOffers[i];
    const key = getIntroductoryOfferGroupingKey(offer);
    const groupingType = getIntroductoryOfferGroupingDescription(offer);

    if (groups.has(key)) {
      const existing = groups.get(key)!;
      existing.count++;
      existing.indices.push(i);

      const duplicateIndices = existing.indices;

      // We should always have at least 2 indices when we find a duplicate
      if (duplicateIndices.length < 2) {
        logger.error(
          `Logic error: Expected at least 2 duplicate indices, but found ${
            duplicateIndices.length
          } for ${groupingType} in subscription '${productId || "unknown"}'`
        );
        continue;
      }

      const firstIndex = duplicateIndices[0];
      const secondIndex = duplicateIndices[1];

      const productIdText = productId ? ` in subscription '${productId}'` : "";

      return {
        success: false,
        error: `Duplicate introductory offers found with ${groupingType}${productIdText}. Items at indices ${firstIndex} and ${secondIndex} have the same grouping criteria.`,
      };
    } else {
      groups.set(key, { count: 1, indices: [i] });
    }
  }

  return { success: true };
}

/**
 * Validate introductory offers for a subscription
 * @param subscriptionProductId - The subscription product ID for error messages
 * @param subscriptionPeriod - The subscription period to validate against
 * @param offers - Array of introductory offers to validate
 * @throws Error if validation fails
 */
export function validateIntroductoryOffers(
  subscriptionProductId: string,
  subscriptionPeriod: string,
  offers: IntroductoryOffer[]
): void {
  const territoryOffers = new Map<string, IntroductoryOffer>();

  for (const offer of offers) {
    // Validate duration restrictions based on subscription period
    if (offer.type === "FREE_TRIAL" || offer.type === "PAY_UP_FRONT") {
      if (
        !isValidIntroductoryOfferDuration(
          subscriptionPeriod as any,
          offer.type,
          offer.duration
        )
      ) {
        const validDurations = getValidIntroductoryOfferDurations(
          subscriptionPeriod as any,
          offer.type
        );
        throw new ContextualError(
          `Invalid duration '${offer.duration}' for ${offer.type} offer in subscription '${subscriptionProductId}' with period '${subscriptionPeriod}'.`,
          undefined,
          {
            subscriptionProductId,
            subscriptionPeriod,
            offer,
            validDurations,
          }
        );
      }
    } else if (offer.type === "PAY_AS_YOU_GO") {
      if (
        !isValidPayAsYouGoPeriods(
          subscriptionPeriod as any,
          offer.numberOfPeriods
        )
      ) {
        const validPeriods = getValidPayAsYouGoPeriods(
          subscriptionPeriod as any
        );
        throw new ContextualError(
          `Invalid numberOfPeriods '${offer.numberOfPeriods}' for PAY_AS_YOU_GO offer in subscription '${subscriptionProductId}' with period '${subscriptionPeriod}'.`,
          undefined,
          {
            subscriptionProductId,
            subscriptionPeriod,
            offer,
            validPeriods,
          }
        );
      }
    }

    // Validate territory uniqueness
    if (offer.type === "FREE_TRIAL") {
      for (const territory of offer.availableTerritories) {
        if (territoryOffers.has(territory)) {
          throw new Error(
            `Multiple introductory offers found for territory '${territory}' in subscription '${subscriptionProductId}'. Only one offer per territory is allowed.`
          );
        }
        territoryOffers.set(territory, offer);
      }
    } else if (
      offer.type === "PAY_AS_YOU_GO" ||
      offer.type === "PAY_UP_FRONT"
    ) {
      // Only check territories where the offer is actually available
      for (const territory of offer.availableTerritories) {
        if (territoryOffers.has(territory)) {
          throw new Error(
            `Multiple introductory offers found for territory '${territory}' in subscription '${subscriptionProductId}'. Only one offer per territory is allowed.`
          );
        }
        territoryOffers.set(territory, offer);
      }
    }
  }
}
