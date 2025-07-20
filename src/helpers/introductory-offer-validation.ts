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

type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;
type SubscriptionOfferDuration = z.infer<
  typeof SubscriptionOfferDurationSchema
>;

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
        throw new Error(
          `Invalid duration '${offer.duration}' for ${
            offer.type
          } offer in subscription '${subscriptionProductId}' with period '${subscriptionPeriod}'. Valid durations are: ${validDurations.join(
            ", "
          )}`
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
        throw new Error(
          `Invalid numberOfPeriods '${
            offer.numberOfPeriods
          }' for PAY_AS_YOU_GO offer in subscription '${subscriptionProductId}' with period '${subscriptionPeriod}'. Valid periods are: ${validPeriods.join(
            ", "
          )}`
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
      for (const price of offer.prices) {
        if (territoryOffers.has(price.territory)) {
          throw new Error(
            `Multiple introductory offers found for territory '${price.territory}' in subscription '${subscriptionProductId}'. Only one offer per territory is allowed.`
          );
        }
        territoryOffers.set(price.territory, offer);
      }
    }
  }
}
