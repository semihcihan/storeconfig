import { apply } from "../src/services/apply-service";
import { AppStoreModel, SubscriptionGroupSchema } from "@semihcihan/shared";
import { fetchAndMapSubscriptionGroups } from "../src/services/fetch-service";
import { logger } from "@semihcihan/shared";
import {
  fetchSubscriptionIntroductoryOffers,
  fetchSubscriptionGroups,
} from "../src/domains/subscriptions/api-client";
import {
  generateTestIdentifier,
  TEST_APP_ID,
  waitForApiProcessing,
  cleanupTestSubscriptionResources,
} from "../src/test-utils/cleanup-helper";
import { diffSubscriptionGroups } from "../src/services/diff-service";
import { z } from "zod";

type SubscriptionGroup = z.infer<typeof SubscriptionGroupSchema>;

describe("Apply Service Introductory Offer Integration Tests", () => {
  const mockCurrentState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: TEST_APP_ID,
    primaryLocale: "en-US",
  };

  // Helper function to verify subscription group exists
  const verifySubscriptionGroupExists = async (referenceName: string) => {
    const mappedGroups = await fetchAndMapSubscriptionGroups(TEST_APP_ID);
    const createdGroup = mappedGroups.find(
      (group) => group.referenceName === referenceName
    );
    expect(createdGroup).toBeDefined();
    return createdGroup;
  };

  // Helper function to create a minimal subscription group for testing introductory offers
  const createMinimalSubscriptionGroup = async (
    uniqueId: string,
    subscriptionGroup: Partial<SubscriptionGroup> = {},
    includeSubscription: boolean = true
  ) => {
    const desiredState: AppStoreModel = {
      ...mockCurrentState,
      subscriptionGroups: [
        {
          referenceName: uniqueId,
          localizations: [
            {
              locale: "en-US",
              name: `Group ${uniqueId}`,
            },
          ],
          subscriptions: includeSubscription
            ? [
                {
                  productId: uniqueId,
                  referenceName: uniqueId,
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                },
              ]
            : [],
          ...subscriptionGroup,
        },
      ],
    };

    const actions = diffSubscriptionGroups(mockCurrentState, desiredState);
    await apply(actions, mockCurrentState, desiredState);
    await waitForApiProcessing(2000);
    return await verifySubscriptionGroupExists(uniqueId);
  };

  describe("Introductory Offer Creation Before Subscription Setup", () => {
    it("should fail to create introductory offer when subscription has no availability (Apple restriction)", async () => {
      const uniqueId = generateTestIdentifier();

      // Test the validation logic directly by calling diffSubscriptionGroups
      // with a desired state that has introductory offers but no availability
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            referenceName: uniqueId,
            localizations: [
              {
                locale: "en-US",
                name: `Group ${uniqueId}`,
              },
            ],
            subscriptions: [
              {
                productId: uniqueId,
                referenceName: uniqueId,
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                // No availability set
                availability: undefined,
              },
            ],
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            referenceName: uniqueId,
            localizations: [
              {
                locale: "en-US",
                name: `Group ${uniqueId}`,
              },
            ],
            subscriptions: [
              {
                productId: uniqueId,
                referenceName: uniqueId,
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                // No availability set
                availability: undefined,
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: ["USA", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // The diff service should catch this before we even try to apply
      expect(() => {
        diffSubscriptionGroups(currentState, desiredState);
      }).toThrow();

      logger.info(
        `   ✅ Correctly failed to create introductory offer when subscription has no availability (Apple restriction enforced): ${uniqueId}`
      );
    });

    it("should fail to create introductory offer when subscription has no pricing (Apple restriction)", async () => {
      const uniqueId = generateTestIdentifier();

      // Create a subscription group with a subscription that has no pricing
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "GBR"],
            },
            // No pricing set
          },
        ],
      });

      // Create current state that includes the created subscription group
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [createdGroup!],
      };

      // Add an introductory offer to the subscription
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...createdGroup!,
            subscriptions: [
              {
                ...createdGroup!.subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 1,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { price: "0.99", territory: "USA" },
                        { price: "0.79", territory: "GBR" },
                      ],
                    },
                    availableTerritories: ["USA", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(() => {
        diffSubscriptionGroups(currentState, desiredState);
      }).toThrow();

      logger.info(
        `   ✅ Correctly failed to create introductory offer when subscription has no pricing (Apple restriction enforced): ${uniqueId}`
      );
    });

    it("should fail to create introductory offer when subscription has neither availability nor pricing (Apple restriction)", async () => {
      const uniqueId = generateTestIdentifier();

      // Test the validation logic directly by calling diffSubscriptionGroups
      // with a desired state that has introductory offers but neither availability nor pricing
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            referenceName: uniqueId,
            localizations: [
              {
                locale: "en-US",
                name: `Group ${uniqueId}`,
              },
            ],
            subscriptions: [
              {
                productId: uniqueId,
                referenceName: uniqueId,
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                // No availability or pricing set
                availability: undefined,
              },
            ],
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            referenceName: uniqueId,
            localizations: [
              {
                locale: "en-US",
                name: `Group ${uniqueId}`,
              },
            ],
            subscriptions: [
              {
                productId: uniqueId,
                referenceName: uniqueId,
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                // No availability or pricing set
                availability: undefined,
                introductoryOffers: [
                  {
                    type: "PAY_UP_FRONT",
                    duration: "ONE_MONTH",
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { price: "4.99", territory: "USA" },
                        { price: "3.99", territory: "GBR" },
                      ],
                    },
                    availableTerritories: ["USA", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // The diff service should catch this before we even try to apply
      expect(() => {
        diffSubscriptionGroups(currentState, desiredState);
      }).toThrow();

      logger.info(
        `   ✅ Correctly failed to create introductory offer when subscription has neither availability nor pricing (Apple restriction enforced): ${uniqueId}`
      );
    });
  });

  describe("Introductory Offer with Broader Scope Than Subscription", () => {
    it("should create introductory offer with pricing for territories not in subscription availability", async () => {
      const uniqueId = generateTestIdentifier();

      // Create a subscription group with a subscription that has limited availability but includes pricing
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"], // Only available in USA
            },
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "4.99", territory: "USA" }],
            },
          },
        ],
      });

      // Create current state that includes the created subscription group
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [createdGroup!],
      };

      // Add an introductory offer with pricing for territories not in subscription availability
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...createdGroup!,
            subscriptions: [
              {
                ...createdGroup!.subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 1,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { price: "0.99", territory: "USA" },
                        { price: "0.79", territory: "GBR" }, // GBR not in subscription availability
                        { price: "0.99", territory: "DEU" }, // Considered equalized price with USA
                      ],
                    },
                    availableTerritories: ["USA", "GBR", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      const updatedGroup = await verifySubscriptionGroupExists(uniqueId);
      const updatedSubscription = updatedGroup?.subscriptions?.[0];

      expect(updatedSubscription?.introductoryOffers).toBeDefined();
      expect(updatedSubscription?.introductoryOffers).toHaveLength(1);
      expect(updatedSubscription?.introductoryOffers?.[0]?.type).toBe(
        "PAY_AS_YOU_GO"
      );

      // Type assertion to access prices property for PAY_AS_YOU_GO offers
      const payAsYouGoOffer = updatedSubscription?.introductoryOffers?.[0];
      if (payAsYouGoOffer?.type === "PAY_AS_YOU_GO") {
        expect(payAsYouGoOffer.pricing?.prices).toHaveLength(2);
        // Verify that the offer has pricing for territories not in subscription availability
        expect(payAsYouGoOffer.pricing?.prices).toContainEqual({
          price: "0.79",
          territory: "GBR",
        });
        expect(
          payAsYouGoOffer.pricing?.prices.map((p) => p.territory)
        ).not.toContain("DEU");
        expect(payAsYouGoOffer.pricing?.prices).toContainEqual({
          price: "0.99",
          territory: "USA",
        });
      } else {
        throw new Error("Expected PAY_AS_YOU_GO offer type");
      }

      logger.info(
        `   ✅ Created introductory offer with pricing for territories not in subscription availability: ${uniqueId}`
      );
    });

    it("should create introductory offer with availability for territories not in subscription pricing", async () => {
      const uniqueId = generateTestIdentifier();

      // Create a subscription group with a subscription that has limited pricing
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "GBR", "DEU"], // Available in 3 territories
            },
            pricing: {
              baseTerritory: "USA",
              prices: [
                { price: "4.99", territory: "USA" },
                { price: "3.99", territory: "GBR" },
                // No pricing for DEU
              ],
            },
          },
        ],
      });

      // Create current state that includes the created subscription group
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [createdGroup!],
      };

      // Add an introductory offer with availability for territories not in subscription pricing
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...createdGroup!,
            subscriptions: [
              {
                ...createdGroup!.subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: ["USA", "GBR", "DEU", "FRA"], // FRA not in subscription pricing
                  },
                ],
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      const updatedGroup = await verifySubscriptionGroupExists(uniqueId);
      const updatedSubscription = updatedGroup?.subscriptions?.[0];

      expect(updatedSubscription?.introductoryOffers).toBeDefined();
      expect(updatedSubscription?.introductoryOffers).toHaveLength(1);
      expect(updatedSubscription?.introductoryOffers?.[0]?.type).toBe(
        "FREE_TRIAL"
      );

      // Type assertion to access availableTerritories property for FREE_TRIAL offers
      const freeTrialOffer = updatedSubscription?.introductoryOffers?.[0];
      if (freeTrialOffer?.type === "FREE_TRIAL") {
        expect(freeTrialOffer.availableTerritories).toHaveLength(4);
        // Verify that the offer has availability for territories not in subscription pricing
        expect(freeTrialOffer.availableTerritories).toContain("FRA");
      } else {
        throw new Error("Expected FREE_TRIAL offer type");
      }

      logger.info(
        `   ✅ Created introductory offer with availability for territories not in subscription pricing: ${uniqueId}`
      );
    });

    it("should create introductory offer with both broader pricing and availability than subscription", async () => {
      const uniqueId = generateTestIdentifier();

      // Create a subscription group with a subscription that has limited scope
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"], // Only available in USA
            },
            pricing: {
              baseTerritory: "USA",
              prices: [
                { price: "4.99", territory: "USA" },
                // No pricing for other territories
              ],
            },
          },
        ],
      });

      // Create current state that includes the created subscription group
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [createdGroup!],
      };

      // Add an introductory offer with broader scope in both dimensions
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...createdGroup!,
            subscriptions: [
              {
                ...createdGroup!.subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 1,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { price: "0.99", territory: "USA" },
                        { price: "0.79", territory: "GBR" }, // GBR not in subscription availability or pricing
                        { price: "0.89", territory: "DEU" }, // DEU not in subscription availability or pricing
                      ],
                    },
                    availableTerritories: ["USA", "GBR", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      const updatedGroup = await verifySubscriptionGroupExists(uniqueId);
      const updatedSubscription = updatedGroup?.subscriptions?.[0];

      expect(updatedSubscription?.introductoryOffers).toBeDefined();
      expect(updatedSubscription?.introductoryOffers).toHaveLength(1);
      expect(updatedSubscription?.introductoryOffers?.[0]?.type).toBe(
        "PAY_AS_YOU_GO"
      );

      // Type assertion to access prices property for PAY_AS_YOU_GO offers
      const payAsYouGoOffer = updatedSubscription?.introductoryOffers?.[0];
      if (payAsYouGoOffer?.type === "PAY_AS_YOU_GO") {
        expect(payAsYouGoOffer.pricing?.prices).toHaveLength(3);
        // Verify that the offer has pricing for territories not in subscription scope
        expect(
          payAsYouGoOffer.pricing?.prices?.map((p) => p.territory)
        ).toContain("GBR");
        expect(
          payAsYouGoOffer.pricing?.prices?.map((p) => p.territory)
        ).toContain("DEU");
      } else {
        throw new Error("Expected PAY_AS_YOU_GO offer type");
      }

      logger.info(
        `   ✅ Created introductory offer with both broader pricing and availability than subscription: ${uniqueId}`
      );
    });
  });

  describe("Introductory Offer Deletion", () => {
    it("should delete introductory offer successfully", async () => {
      const uniqueId = generateTestIdentifier();

      // First create a subscription group with an introductory offer
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"],
            },
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "4.99", territory: "USA" }],
            },
            introductoryOffers: [
              {
                type: "FREE_TRIAL",
                duration: "ONE_WEEK",
                availableTerritories: ["USA"],
              },
            ],
          },
        ],
      });

      // Create current state that includes the created subscription group with offer
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [createdGroup!],
      };

      // Remove the introductory offer
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...createdGroup!,
            subscriptions: [
              {
                ...createdGroup!.subscriptions[0],
                introductoryOffers: [], // Remove all offers
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      const updatedGroup = await verifySubscriptionGroupExists(uniqueId);
      const updatedSubscription = updatedGroup?.subscriptions?.[0];

      // Verify the offer was deleted
      expect(updatedSubscription?.introductoryOffers).toBeDefined();
      expect(updatedSubscription?.introductoryOffers).toHaveLength(0);

      logger.info(`   ✅ Successfully deleted introductory offer: ${uniqueId}`);
    });
  });

  describe("Creating New Subscription with Introductory Offer", () => {
    it("should create subscription group with subscription and introductory offer from scratch", async () => {
      const uniqueId = generateTestIdentifier();

      // Current state has no subscription groups
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [],
      };

      // Desired state has a new subscription group with subscription and introductory offer
      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            referenceName: uniqueId,
            localizations: [
              {
                locale: "en-US",
                name: `Group ${uniqueId}`,
              },
            ],
            subscriptions: [
              {
                productId: uniqueId,
                referenceName: uniqueId,
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                availability: {
                  availableInNewTerritories: false,
                  availableTerritories: ["USA"],
                },
                pricing: {
                  baseTerritory: "USA",
                  prices: [{ price: "4.99", territory: "USA" }],
                },
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: ["USA"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      const createdGroup = await verifySubscriptionGroupExists(uniqueId);
      const createdSubscription = createdGroup?.subscriptions?.[0];

      // Verify the subscription group was created
      expect(createdGroup).toBeDefined();
      expect(createdGroup?.referenceName).toBe(uniqueId);

      // Verify the subscription was created
      expect(createdSubscription).toBeDefined();
      expect(createdSubscription?.productId).toBe(uniqueId);
      expect(createdSubscription?.availability?.availableTerritories).toContain(
        "USA"
      );
      expect(createdSubscription?.pricing?.prices).toHaveLength(1);

      // Verify the introductory offer was created
      expect(createdSubscription?.introductoryOffers).toBeDefined();
      expect(createdSubscription?.introductoryOffers).toHaveLength(1);
      expect(createdSubscription?.introductoryOffers?.[0]?.type).toBe(
        "FREE_TRIAL"
      );

      // Type assertion to access duration and availableTerritories properties for FREE_TRIAL offers
      const freeTrialOffer = createdSubscription?.introductoryOffers?.[0];
      if (freeTrialOffer?.type === "FREE_TRIAL") {
        expect(freeTrialOffer.duration).toBe("ONE_WEEK");
        expect(freeTrialOffer.availableTerritories).toContain("USA");
      } else {
        throw new Error("Expected FREE_TRIAL offer type");
      }

      logger.info(
        `   ✅ Successfully created subscription group with subscription and introductory offer from scratch: ${uniqueId}`
      );
    });
  });

  describe("Pricing", () => {
    it("should create intro offer with single USA price but fetch shows equalized pricing", async () => {
      const uniqueId = generateTestIdentifier();

      // Create a subscription group with a PAY_AS_YOU_GO introductory offer with only USA pricing
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"],
            },
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "4.99", territory: "USA" }],
            },
            introductoryOffers: [
              {
                type: "PAY_AS_YOU_GO",
                numberOfPeriods: 1,
                pricing: {
                  baseTerritory: "USA",
                  prices: [{ price: "0.99", territory: "USA" }], // Only USA pricing
                },
                availableTerritories: ["USA"],
              },
            ],
          },
        ],
      });

      // Verify the offer was created
      const initialGroup = await verifySubscriptionGroupExists(uniqueId);
      const initialSubscription = initialGroup?.subscriptions?.[0];
      expect(initialSubscription?.introductoryOffers).toBeDefined();
      expect(initialSubscription?.introductoryOffers).toHaveLength(1);
      expect(initialSubscription?.introductoryOffers?.[0]?.type).toBe(
        "PAY_AS_YOU_GO"
      );

      // Now fetch the raw subscription groups data to get the subscription ID
      const rawSubscriptionGroups = await fetchSubscriptionGroups(TEST_APP_ID);

      // Find the subscription ID from the raw data
      const subscriptionId = rawSubscriptionGroups.included?.find(
        (item) =>
          item.type === "subscriptions" &&
          item.attributes?.productId === uniqueId
      )?.id;

      expect(subscriptionId).toBeDefined();

      const introductoryOffers = await fetchSubscriptionIntroductoryOffers(
        subscriptionId!
      );

      expect(introductoryOffers).toBeDefined();
      expect(introductoryOffers.data).toBeDefined();
      expect(introductoryOffers.data!.length).toBeGreaterThan(0);

      const payAsYouGoOffer = introductoryOffers.data!.filter(
        (offer) => offer.attributes?.offerMode === "PAY_AS_YOU_GO"
      );
      expect(payAsYouGoOffer).toBeDefined();

      expect(payAsYouGoOffer).toHaveLength(3);
      expect(
        payAsYouGoOffer.map((p) => p.relationships?.territory?.data?.id)
      ).toContain("USA");
      expect(
        payAsYouGoOffer.map((p) => p.relationships?.territory?.data?.id)
      ).toContain("GBR");
      expect(
        payAsYouGoOffer.map((p) => p.relationships?.territory?.data?.id)
      ).toContain("DEU");

      logger.info(
        `   ✅ Intro offer created with single USA price but API shows equalized pricing: ${uniqueId}`
      );
    });
  });

  describe("Introductory Offer Persistence After Availability Removal", () => {
    it("remove free trial intro offer when all its availability territories are removed", async () => {
      const uniqueId = generateTestIdentifier();

      // Step 1: Create a free trial intro offer with one availability USA
      const createdGroup = await createMinimalSubscriptionGroup(uniqueId, {
        subscriptions: [
          {
            productId: uniqueId,
            referenceName: uniqueId,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"],
            },
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "4.99", territory: "USA" }],
            },
            introductoryOffers: [
              {
                type: "FREE_TRIAL",
                duration: "ONE_WEEK",
                availableTerritories: ["USA"],
              },
            ],
          },
        ],
      });

      // Verify the offer was created with USA availability
      const initialGroup = await verifySubscriptionGroupExists(uniqueId);
      const initialSubscription = initialGroup?.subscriptions?.[0];
      expect(initialSubscription?.introductoryOffers).toBeDefined();
      expect(initialSubscription?.introductoryOffers).toHaveLength(1);
      expect(initialSubscription?.introductoryOffers?.[0]?.type).toBe(
        "FREE_TRIAL"
      );

      const freeTrialOffer = initialSubscription?.introductoryOffers?.[0];
      if (freeTrialOffer?.type === "FREE_TRIAL") {
        expect(freeTrialOffer.availableTerritories).toContain("USA");
      }

      // Step 2: Remove availability and apply
      const currentState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [initialGroup!],
      };

      const desiredState: AppStoreModel = {
        ...mockCurrentState,
        subscriptionGroups: [
          {
            ...initialGroup!,
            subscriptions: [
              {
                ...initialGroup!.subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: [], // Remove availability from the offer
                  },
                ],
              },
            ],
          },
        ],
      };

      const actions = diffSubscriptionGroups(currentState, desiredState);
      await apply(actions, currentState, desiredState);
      await waitForApiProcessing();

      // Step 3: Check if offer is still there with no availabilities
      const updatedGroup = await verifySubscriptionGroupExists(uniqueId);
      const updatedSubscription = updatedGroup?.subscriptions?.[0];

      // Verify the introductory offer is still there
      expect(updatedSubscription?.introductoryOffers).toBeDefined();
      expect(updatedSubscription?.introductoryOffers).toHaveLength(0);

      logger.info(
        `   ✅ Free trial intro offer removed after all its availability territories are removed: ${uniqueId}`
      );
    });
  });

  // Cleanup after all tests
  afterAll(async () => {
    await cleanupTestSubscriptionResources(TEST_APP_ID);
  }, 300000); // 5 minutes timeout for cleanup operations
});
