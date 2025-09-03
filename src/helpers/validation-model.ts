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
            // Create a mock context for the validation function
            const mockCtx = {
              addIssue: (issue: any) => {
                throw new ContextualError(
                  `Business rule validation failed: ${issue.message}`,
                  { issue, path: issue.path }
                );
              },
              path: [],
            };
            validateSubscriptionTerritoryPricing(subscription, mockCtx);
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
    throw new ContextualError(`❌ Validation failed!`, result.error);
  }
}
