import { z } from "zod";
import { validateIntroductoryOffersGrouping } from "./introductory-offer-validation";

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
}
