import { logger } from "@semihcihan/shared";
import { fetchInAppPurchases } from "../domains/in-app-purchases/api-client";
import { fetchSubscriptionGroups } from "../domains/subscriptions/api-client";
import { deleteInAppPurchase } from "../domains/in-app-purchases/api-client";
import {
  deleteSubscription,
  deleteSubscriptionGroup,
} from "../domains/subscriptions/api-client";

export const TEST_APP_ID = "6503259293";
const TEST_PREFIX = "INTEG_TEST_";

// Generate a highly unique test identifier to avoid conflicts
// Keep it under 64 characters for Apple API limits
export function generateTestIdentifier(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8); // 6 chars
  const processId = process.pid.toString().slice(-4); // last 4 digits
  return `${TEST_PREFIX}${timestamp}_${processId}_${random}`;
}

// Generate a constant-length test identifier for length-related testing
// This ensures consistent test results when testing Apple's API length limits
export function generateConstantLengthTestIdentifier(): string {
  const random = Math.random().toString(36).substring(2, 8); // 6 chars
  const processId = process.pid.toString().slice(-4); // last 4 digits
  // Use a fixed timestamp to ensure consistent length
  const fixedTimestamp = "1700000000000"; // 13 chars, fixed
  return `${TEST_PREFIX}${fixedTimestamp}_${processId}_${random}`;
}

// Check if a resource identifier is a test resource
function isTestResource(identifier: string): boolean {
  return identifier.startsWith(TEST_PREFIX);
}

// Find and collect all test resources for cleanup
async function findTestResources(appId: string): Promise<{
  iapIds: string[];
  subscriptionIds: string[];
  subscriptionGroupIds: string[];
}> {
  const testResources = {
    iapIds: [] as string[],
    subscriptionIds: [] as string[],
    subscriptionGroupIds: [] as string[],
  };

  try {
    // Find test IAPs
    const iapsResponse = await fetchInAppPurchases(appId);
    if (iapsResponse.data) {
      for (const iap of iapsResponse.data) {
        const productId = iap.attributes?.productId;
        const referenceName = iap.attributes?.name;

        if (
          (productId && isTestResource(productId)) ||
          (referenceName && isTestResource(referenceName))
        ) {
          testResources.iapIds.push(iap.id);
          logger.debug(`Found test IAP: ${productId} (${iap.id})`);
        }
      }
    }
  } catch (error) {
    logger.warn("Failed to fetch IAPs for cleanup:", error);
  }

  try {
    // Find test subscription groups and subscriptions
    const subscriptionGroupsResponse = await fetchSubscriptionGroups(appId);
    if (subscriptionGroupsResponse.data) {
      for (const group of subscriptionGroupsResponse.data) {
        const groupReferenceName = group.attributes?.referenceName;

        if (groupReferenceName && isTestResource(groupReferenceName)) {
          testResources.subscriptionGroupIds.push(group.id);
          logger.debug(
            `Found test subscription group: ${groupReferenceName} (${group.id})`
          );
        }

        // Check subscriptions within the group
        const subscriptions = group.relationships?.subscriptions?.data;
        if (subscriptions) {
          // We need to get subscription details from included data
          const includedSubscriptions =
            subscriptionGroupsResponse.included?.filter(
              (item: any) => item.type === "subscriptions"
            );

          for (const subRef of subscriptions) {
            const subscription = includedSubscriptions?.find(
              (item: any) => item.id === subRef.id
            );

            if (subscription && subscription.attributes) {
              // Check if this is a subscription with productId (not a localization)
              if ("productId" in subscription.attributes) {
                const productId = subscription.attributes.productId;
                const referenceName = subscription.attributes.name;

                if (
                  (productId && isTestResource(productId)) ||
                  (referenceName && isTestResource(referenceName))
                ) {
                  testResources.subscriptionIds.push(subscription.id);
                  logger.debug(
                    `Found test subscription: ${productId} (${subscription.id})`
                  );
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    logger.warn("Failed to fetch subscription groups for cleanup:", error);
  }

  return testResources;
}

// Clean up test IAP resources
export async function cleanupTestIAPResources(appId: string): Promise<void> {
  logger.info("🧹 Starting IAP test cleanup...");

  const testResources = await findTestResources(appId);

  logger.info("   IAPs to clean up:", {
    iapIds: testResources.iapIds.length,
  });

  // Delete IAPs
  for (const iapId of testResources.iapIds) {
    try {
      logger.info(`   Deleting IAP: ${iapId}`);
      await deleteInAppPurchase(iapId);
      logger.info(`   ✅ Deleted IAP: ${iapId}`);
    } catch (error) {
      logger.error(`   ❌ Failed to delete IAP ${iapId}:`, error);
    }
  }

  logger.info("🧹 IAP test cleanup completed!");
}

// Clean up test subscription resources
export async function cleanupTestSubscriptionResources(
  appId: string
): Promise<void> {
  logger.info("🧹 Starting subscription test cleanup...");

  const testResources = await findTestResources(appId);

  logger.info("   Subscriptions to clean up:", {
    subscriptionIds: testResources.subscriptionIds.length,
    subscriptionGroupIds: testResources.subscriptionGroupIds.length,
  });

  // Delete subscriptions first (they depend on groups)
  for (const subscriptionId of testResources.subscriptionIds) {
    try {
      logger.info(`   Deleting subscription: ${subscriptionId}`);
      await deleteSubscription(subscriptionId);
      logger.info(`   ✅ Deleted subscription: ${subscriptionId}`);
    } catch (error) {
      logger.error(
        `   ❌ Failed to delete subscription ${subscriptionId}:`,
        error
      );
    }
  }

  // Delete subscription groups after all subscriptions are removed
  for (const groupId of testResources.subscriptionGroupIds) {
    try {
      logger.info(`   Deleting subscription group: ${groupId}`);
      await deleteSubscriptionGroup(groupId);
      logger.info(`   ✅ Deleted subscription group: ${groupId}`);
    } catch (error) {
      logger.error(
        `   ❌ Failed to delete subscription group ${groupId}:`,
        error
      );
    }
  }

  logger.info("🧹 Subscription test cleanup completed!");
}

// Helper function to wait for API processing
// Useful for integration tests to allow Apple's API to process changes
export const waitForApiProcessing = async (timeoutMs: number = 0) => {
  if (timeoutMs > 0) {
    // Add a delay to allow Apple's API to process changes
    await new Promise((resolve) => setTimeout(resolve, timeoutMs));
  }
};
