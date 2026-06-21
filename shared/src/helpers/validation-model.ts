import { z } from "zod";
import { logger } from "../utils/logger";
import { AppStoreModelSchema } from "../models/app-store";
import { validateSubscriptionTerritoryPricing } from "./subscription-validation";
import { ContextualError } from "./error-handling-helpers";

export function validateAppStoreModel(
  data: any,
  showSuccessMessage = false,
  context: "fetch" | "apply" = "fetch"
) {
  const result = AppStoreModelSchema.safeParse(data);

  if (result.success) {
    // If context is "apply", run additional business rule validations
    if (context === "apply") {
      // Validate subscription territory pricing
      if (result.data.subscriptionGroups) {
        for (const group of result.data.subscriptionGroups) {
          for (const subscription of group.subscriptions) {
            // Create a proper Zod refinement context that accumulates issues
            const issues: z.ZodIssue[] = [];
            const mockCtx = {
              addIssue: (issue: z.ZodIssue) => {
                issues.push(issue);
              },
              path: [],
              value: subscription,
              issues: issues,
            } as unknown as z.RefinementCtx;

            validateSubscriptionTerritoryPricing(subscription, mockCtx);

            // If issues were added, throw a proper Zod error
            if (issues.length > 0) {
              const zodError = new z.ZodError(issues);
              throw zodError;
            }
          }
        }
      }
    }

    if (showSuccessMessage) {
      logger.info(
        "✅ Validation passed! The JSON file format and structure are valid."
      );
    }
    return result.data;
  } else {
    throw new ContextualError(
      `❌ Validation failed for '${context}'!`,
      result.error
    );
  }
}
