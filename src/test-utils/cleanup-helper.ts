import { logger } from "../utils/logger";
import { fetchInAppPurchases } from "../domains/in-app-purchases/api-client";
import { fetchSubscriptionGroups } from "../domains/subscriptions/api-client";
import { deleteInAppPurchase } from "../domains/in-app-purchases/api-client";
import {
  deleteSubscription,
  deleteSubscriptionGroup,
} from "../domains/subscriptions/api-client";

// Generate a highly unique test identifier to avoid conflicts
// Keep it under 64 characters for Apple API limits
export function generateTestIdentifier(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8); // 6 chars
  const processId = process.pid.toString().slice(-4); // last 4 digits
  return `INTEG_TEST_${timestamp}_${processId}_${random}`;
}

// Check if a resource identifier is a test resource
export function isTestResource(identifier: string): boolean {
  return identifier.startsWith("INTEG_TEST_");
}

// Find and collect all test resources for cleanup
export async function findTestResources(appId: string): Promise<{
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

// Clean up all test resources
export async function cleanupTestResources(appId: string): Promise<void> {
  logger.info("🧹 Starting automatic test cleanup...");

  const testResources = await findTestResources(appId);

  logger.info("   Resources to clean up:", {
    iapIds: testResources.iapIds.length,
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

  // Delete subscription groups
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

  logger.info("🧹 Test cleanup completed!");
}
