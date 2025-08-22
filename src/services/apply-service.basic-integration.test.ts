import { apply } from "./apply-service";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModel } from "../models/app-store";
import {
  fetchAndMapInAppPurchases,
  fetchAndMapSubscriptionGroups,
} from "./fetch-service";
import { logger, setLogLevel } from "../utils/logger";
import {
  generateTestIdentifier,
  cleanupTestResources,
} from "../test-utils/cleanup-helper";

describe("Apply Service Basic Integration Tests", () => {
  // Integration tests with API calls need longer timeout
  jest.setTimeout(60000); // 60 seconds for all tests in this suite

  const TEST_APP_ID = "6503259293";

  const mockCurrentState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: TEST_APP_ID,
    primaryLocale: "en-US",
  };

  const mockDesiredState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: TEST_APP_ID,
    primaryLocale: "en-US",
  };

  describe("Basic IAP Test", () => {
    it("should create a simple consumable IAP", async () => {
      const uniqueId = generateTestIdentifier();
      const actions: AnyAction[] = [
        {
          type: "CREATE_IN_APP_PURCHASE",
          payload: {
            inAppPurchase: {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `Basic Test IAP ${uniqueId}`,
              familySharable: false,
            },
          },
        },
      ];

      // Apply the actions
      await expect(
        apply(actions, mockCurrentState, mockDesiredState)
      ).resolves.not.toThrow();

      // Wait a moment for the API to process the changes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify the IAP was created by fetching just the IAPs
      const mappedIAPs = await fetchAndMapInAppPurchases(TEST_APP_ID);

      // Check that our IAP exists in the response
      const createdIap = mappedIAPs.find((iap) => iap.productId === uniqueId);

      expect(createdIap).toBeDefined();
      expect(createdIap?.productId).toBe(uniqueId);
      expect(createdIap?.type).toBe("CONSUMABLE");
      expect(createdIap?.referenceName).toBe(`Basic Test IAP ${uniqueId}`);
      expect(createdIap?.familySharable).toBe(false);

      logger.info(`   ✅ Created test IAP: ${uniqueId}`);
    });
  });

  describe("Basic Subscription Test", () => {
    it("should create a simple subscription group with one subscription", async () => {
      const uniqueGroupId = generateTestIdentifier();
      const uniqueSubscriptionId = generateTestIdentifier();

      const actions: AnyAction[] = [
        {
          type: "CREATE_SUBSCRIPTION_GROUP",
          payload: {
            group: {
              referenceName: uniqueGroupId,
              localizations: [
                {
                  locale: "en-US",
                  name: `Basic Test Group ${uniqueGroupId}`,
                  customName: `Basic Group ${uniqueGroupId}`,
                },
              ],
              subscriptions: [],
            },
          },
        },
        {
          type: "CREATE_SUBSCRIPTION",
          payload: {
            groupReferenceName: uniqueGroupId,
            subscription: {
              productId: uniqueSubscriptionId,
              referenceName: `Basic Test Subscription ${uniqueSubscriptionId}`,
              groupLevel: 1,
              subscriptionPeriod: "ONE_MONTH",
              familySharable: false,
            },
          },
        },
      ];

      // Apply the actions
      await expect(
        apply(actions, mockCurrentState, mockDesiredState)
      ).resolves.not.toThrow();

      // Wait a moment for the API to process the changes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify the subscription group was created by fetching just the subscription groups
      const mappedSubscriptionGroups = await fetchAndMapSubscriptionGroups(
        TEST_APP_ID
      );

      // Check that our subscription group exists in the response
      const createdGroup = mappedSubscriptionGroups.find(
        (group) => group.referenceName === uniqueGroupId
      );

      expect(createdGroup).toBeDefined();
      expect(createdGroup?.referenceName).toBe(uniqueGroupId);

      // Check that the group has subscriptions
      expect(createdGroup?.subscriptions).toBeDefined();
      expect(createdGroup?.subscriptions?.length).toBeGreaterThan(0);

      // Check that our subscription exists within the group
      const createdSubscription = createdGroup?.subscriptions?.find(
        (sub) => sub.productId === uniqueSubscriptionId
      );

      expect(createdSubscription).toBeDefined();
      expect(createdSubscription?.productId).toBe(uniqueSubscriptionId);
      expect(createdSubscription?.subscriptionPeriod).toBe("ONE_MONTH");
      expect(createdSubscription?.familySharable).toBe(false);

      logger.info(`   ✅ Created test subscription group: ${uniqueGroupId}`);
      logger.info(`   ✅ Created test subscription: ${uniqueSubscriptionId}`);
    });
  });

  // Cleanup after all tests
  afterAll(async () => {
    // Temporarily enable logging for cleanup
    setLogLevel("info");

    // Use the common cleanup utility to find and delete all test resources
    await cleanupTestResources(TEST_APP_ID);
  });
});
