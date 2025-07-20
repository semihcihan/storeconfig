import { z } from "zod";
import { validateIntroductoryOffersGrouping } from "./introductory-offer-validation";

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
  const introductoryOffers = subscription.introductoryOffers || [];

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

  // Check introductory offers pricing (except FREE_TRIAL types)
  for (const offer of introductoryOffers) {
    if (offer.type === "FREE_TRIAL") {
      // FREE_TRIAL offers don't have prices, so we skip them
      continue;
    }

    if (offer.type === "PAY_AS_YOU_GO" || offer.type === "PAY_UP_FRONT") {
      const offerPriceTerritories = new Set(
        offer.prices?.map((p: any) => p.territory) || []
      );

      for (const territory of offer.availableTerritories || []) {
        if (!offerPriceTerritories.has(territory)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Introductory offer of type '${offer.type}' for subscription '${subscription.productId}' is available in territory '${territory}' but has no price defined for this territory`,
            path: ["introductoryOffers"],
          });
        }
      }
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
}
