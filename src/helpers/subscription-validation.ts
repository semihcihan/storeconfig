import { z } from "zod";
import {
  validateIntroductoryOffersGrouping,
  validateIntroductoryOffers,
} from "./introductory-offer-validation";

/**
 * Validates that each available territory has subscription prices defined
 * for both the subscription itself and its introductory offers (except FREE_TRIAL types)
 * @param subscription - The subscription object to validate
 * @param ctx - The Zod refinement context
 */
export function validateSubscriptionTerritoryPricing(
  subscription: any,
  ctx: z.RefinementCtx
): void {
  const availableTerritories =
    subscription.availability?.availableTerritories || [];
  const subscriptionPrices = subscription.prices || [];

  // Create sets for efficient lookup
  const subscriptionPriceTerritories = new Set(
    subscriptionPrices.map((p: any) => p.territory)
  );

  // Check subscription pricing
  for (const territory of availableTerritories) {
    if (!subscriptionPriceTerritories.has(territory)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Subscription '${subscription.productId}' is available in territory '${territory}' but has no price defined for this territory`,
        path: ["prices"],
      });
    }
  }
}

/**
 * Validates a subscription object with custom business logic
 * @param subscription - The subscription object to validate
 * @param ctx - The Zod refinement context
 */
export function validateSubscription(
  subscription: any,
  ctx: z.RefinementCtx
): void {
  // Validate introductory offers grouping with productId
  if (
    subscription.introductoryOffers &&
    subscription.introductoryOffers.length > 0
  ) {
    const result = validateIntroductoryOffersGrouping(
      subscription.introductoryOffers,
      subscription.productId
    );
    if (!result.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          result.error ||
          "Introductory offers must have unique type+duration or type+numberOfPeriods combinations",
        path: ["introductoryOffers"],
      });
    }
  }

  // Validate territory pricing
  validateSubscriptionTerritoryPricing(subscription, ctx);
  validateIntroductoryOffers(
    subscription.productId,
    subscription.subscriptionPeriod,
    subscription.introductoryOffers
  );
}
