import { diff } from "./diff-service";
import {
  AppStoreModelSchema,
  LocalizationSchema,
  PriceSchema,
  SubscriptionGroupLocalizationSchema,
  SubscriptionSchema,
  IntroductoryOfferSchema,
  removeShortcuts,
  Plan,
} from "@semihcihan/shared";
import { CreateSubscriptionPriceAction } from "@semihcihan/shared";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Localization = z.infer<typeof LocalizationSchema>;
type Price = z.infer<typeof PriceSchema>;
type SubscriptionGroupLocalization = z.infer<
  typeof SubscriptionGroupLocalizationSchema
>;
type Subscription = z.infer<typeof SubscriptionSchema>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;

function diffWithShortcutsRemoved(
  currentState: AppStoreModel,
  desiredState: AppStoreModel
): Plan {
  const expandedCurrentState = removeShortcuts(currentState);
  const expandedDesiredState = removeShortcuts(desiredState);
  return diff(expandedCurrentState, expandedDesiredState);
}

const EMPTY_STATE: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "com.example.app",
  copyright: undefined,
  pricing: undefined,
  availableTerritories: [],
  inAppPurchases: [],
  subscriptionGroups: [],
};

const MOCK_STATE_1: AppStoreModel = {
  ...EMPTY_STATE,
  pricing: {
    baseTerritory: "USA",
    prices: [{ territory: "USA", price: "4.99" }],
  },
  availableTerritories: ["USA"],
  inAppPurchases: [
    {
      productId: "iap1",
      referenceName: "IAP 1",
      type: "CONSUMABLE",
      familySharable: false,
      pricing: {
        baseTerritory: "USA",
        prices: [{ territory: "USA", price: "0.99" }],
      },
      localizations: [
        {
          locale: "en-US",
          name: "IAP 1",
          description: "This is IAP 1",
        },
      ],
      availability: {
        availableInNewTerritories: true,
        availableTerritories: ["USA"],
      },
    },
  ],
  subscriptionGroups: [
    {
      referenceName: "group1",
      localizations: [
        {
          locale: "en-US",
          name: "Group 1",
          customName: "Custom Group 1",
        },
      ],
      subscriptions: [
        {
          productId: "sub1",
          referenceName: "Subscription 1",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "9.99" }],
          },
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 1",
              description: "This is Subscription 1",
            },
          ],
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

describe("diff-service", () => {
  describe("diff", () => {
    it("should return an empty plan when both states are empty", () => {
      const plan = diff(EMPTY_STATE, EMPTY_STATE);
      expect(plan).toEqual([]);
    });

    it("should throw an error if schema versions mismatch", () => {
      const currentState = { ...EMPTY_STATE, schemaVersion: "1.0.0" };
      const desiredState = { ...EMPTY_STATE, schemaVersion: "2.0.0" };
      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(/Schema version mismatch/);
    });

    it("should throw an error if app IDs mismatch", () => {
      const currentState = { ...EMPTY_STATE, appId: "app1" };
      const desiredState = { ...EMPTY_STATE, appId: "app2" };
      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(/App ID mismatch/);
    });

    it("should create a plan to update app availability", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        availableTerritories: ["USA", "CAN"],
      };
      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const appAvailabilityAction = plan.find(
        (a) => a.type === "UPDATE_APP_AVAILABILITY"
      );
      expect(appAvailabilityAction).toEqual({
        type: "UPDATE_APP_AVAILABILITY",
        payload: {
          currentTerritories: ["USA"],
          desiredTerritories: ["USA", "CAN"],
        },
      });
    });

    it("should create a plan to update the base territory of the app price schedule", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN",
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "CAN",
            prices: MOCK_STATE_1.pricing!.prices,
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to add a price to the app price schedule", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          prices: [...MOCK_STATE_1.pricing!.prices, newPrice],
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "USA",
            prices: [...MOCK_STATE_1.pricing!.prices, newPrice],
          },
          changes: {
            addedPrices: [newPrice],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to remove a price from the app price schedule", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          baseTerritory: "USA",
          prices: [],
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "USA",
            prices: [],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update a price in the app price schedule", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          prices: [updatedPrice],
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "USA",
            prices: [updatedPrice],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [updatedPrice],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a single UPDATE_APP_PRICING action for complex changes", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "5.99" };
      const updatedPrice: Price = { territory: "USA", price: "3.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN", // Changing base territory
          prices: [updatedPrice, newPrice], // Updating existing and adding new
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "CAN",
            prices: [updatedPrice, newPrice],
          },
          changes: {
            addedPrices: [newPrice],
            updatedPrices: [updatedPrice],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create UPDATE_APP_PRICING when changing base territory without touching prices", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN", // Only changing base territory, keeping same prices
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "CAN",
            prices: MOCK_STATE_1.pricing!.prices,
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should include base territory change in UPDATE_APP_PRICING when also changing prices", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN", // Changing base territory
          prices: [updatedPrice], // Updating existing price
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action with both changes
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "CAN",
            prices: [updatedPrice],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [updatedPrice],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should handle deleting prices with base territory change", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          baseTerritory: "CAN", // Changing base territory
          prices: [], // Deleting all prices
        },
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          pricing: {
            baseTerritory: "CAN",
            prices: [],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update a subscription in a group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                referenceName: "Updated Subscription 1",
                groupLevel: 2,
                familySharable: true,
                subscriptionPeriod: "ONE_MONTH", // Keep same period
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION",
        payload: {
          productId: "sub1",
          changes: {
            referenceName: "Updated Subscription 1",
            groupLevel: 2,
            familySharable: true,
          },
        },
      });
    });

    it("should create a plan to create a new subscription in a group", () => {
      const currentState = MOCK_STATE_1;
      const newSubscription: Subscription = {
        productId: "sub2",
        referenceName: "New Subscription 2",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "4.99" }],
        },
        localizations: [
          {
            locale: "en-US",
            name: "New Subscription 2",
            description: "This is a new subscription",
          },
        ]!,
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
      };

      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              newSubscription,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "CREATE_SUBSCRIPTION",
            payload: {
              groupReferenceName: "group1",
              subscription: newSubscription,
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_LOCALIZATION",
            payload: {
              subscriptionProductId: "sub2",
              localization: newSubscription.localizations![0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub2",
              desiredPriceSchedule: newSubscription.pricing,
              currentPriceSchedule: undefined,
              changes: {
                addedPrices: newSubscription.pricing?.prices || [],
                updatedPrices: [],
                deletedTerritories: [],
              },
            },
          },
          {
            type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
            payload: {
              subscriptionProductId: "sub2",
              availability: newSubscription.availability,
            },
          },
        ])
      );
    });

    it("should create a plan to add an in-app purchase", () => {
      const desiredState = {
        ...EMPTY_STATE,
        inAppPurchases: MOCK_STATE_1.inAppPurchases,
      };
      const plan = diff(EMPTY_STATE, desiredState);
      expect(plan).toHaveLength(4);
      expect(plan[0]).toEqual({
        type: "CREATE_IN_APP_PURCHASE",
        payload: {
          inAppPurchase: MOCK_STATE_1.inAppPurchases![0],
        },
      });
      expect(plan[1]).toEqual({
        type: "CREATE_IAP_LOCALIZATION",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          localization: MOCK_STATE_1.inAppPurchases![0].localizations![0],
        },
      });
      expect(plan[2]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: MOCK_STATE_1.inAppPurchases![0].availability,
        },
      });
      expect(plan[3]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          pricing: MOCK_STATE_1.inAppPurchases![0].pricing,
          changes: {
            addedPrices: MOCK_STATE_1.inAppPurchases![0].pricing!.prices,
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to update an in-app purchase", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            referenceName: "Updated IAP 1",
            familySharable: true,
            reviewNote: "Updated review note",
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IN_APP_PURCHASE",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          changes: {
            referenceName: "Updated IAP 1",
            familySharable: true,
            reviewNote: "Updated review note",
          },
        },
      });
    });

    it("should create a plan to add a localization to an in-app purchase", () => {
      const currentState = MOCK_STATE_1;
      const newLocalization: Localization = {
        locale: "de-DE",
        name: "IAP 1 DE",
        description: "Dies ist IAP 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            localizations: [
              ...(MOCK_STATE_1.inAppPurchases![0].localizations || []),
              newLocalization,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_IAP_LOCALIZATION",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          localization: newLocalization,
        },
      });
    });

    it("should create a plan to remove a localization from an in-app purchase", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            localizations: [],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_IAP_LOCALIZATION",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          locale: "en-US",
        },
      });
    });

    it("should create a plan to update a localization for an in-app purchase", () => {
      const currentState = MOCK_STATE_1;
      const updatedLocalization: Localization = {
        locale: "en-US",
        name: "Updated IAP 1",
        description: "This is the updated IAP 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            localizations: [updatedLocalization],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_LOCALIZATION",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          locale: "en-US",
          changes: {
            name: "Updated IAP 1",
            description: "This is the updated IAP 1",
          },
        },
      });
    });

    it("should create a plan to update the base territory of an IAP price schedule", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            pricing: {
              ...(MOCK_STATE_1.inAppPurchases![0].pricing || {
                baseTerritory: "USA",
                prices: [],
              }),
              baseTerritory: "CAN",
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          pricing: {
            baseTerritory: "CAN",
            prices: [
              {
                price: "0.99",
                territory: "USA",
              },
            ],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to add a price to an IAP price schedule", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "1.29" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            pricing: {
              ...(MOCK_STATE_1.inAppPurchases![0].pricing || {
                baseTerritory: "USA",
                prices: [],
              }),
              prices: [
                ...(MOCK_STATE_1.inAppPurchases![0].pricing?.prices || []),
                newPrice,
              ],
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          pricing: {
            baseTerritory: "USA",
            prices: [
              {
                price: "0.99",
                territory: "USA",
              },
              {
                price: "1.29",
                territory: "CAN",
              },
            ],
          },
          changes: {
            addedPrices: [
              {
                price: "1.29",
                territory: "CAN",
              },
            ],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to remove a price from an IAP price schedule", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            pricing: {
              baseTerritory: "USA",
              prices: [],
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          pricing: {
            baseTerritory: "USA",
            prices: [],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update the availability of an IAP", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "CAN"],
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA", "CAN"],
          },
        },
      });
    });

    it("should create a plan to update IAP availability when only availableInNewTerritories changes", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false, // Changed from true to false
              availableTerritories: ["USA"], // Same territories
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update IAP availability when only availableInNewTerritories changes from false to true", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA"],
            },
          },
        ],
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: true, // Changed from false to true
              availableTerritories: ["USA"], // Same territories
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update the availability of an IAP when it is not specified in current state", () => {
      const currentState: AppStoreModel = JSON.parse(
        JSON.stringify(MOCK_STATE_1)
      );
      if (currentState.inAppPurchases && currentState.inAppPurchases[0]) {
        delete (currentState.inAppPurchases[0] as any).availability;
      }

      const desiredState: AppStoreModel = MOCK_STATE_1;

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const iapAvailabilityAction = plan.find(
        (a) => a.type === "UPDATE_IAP_AVAILABILITY"
      );
      expect(iapAvailabilityAction).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: MOCK_STATE_1.inAppPurchases![0].availability,
        },
      });
    });

    it("should throw an error when trying to rename a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            referenceName: "group1_renamed",
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                groupLevel: 2,
              },
            ],
          },
        ],
      };

      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(
        "Subscription group with reference name 'group1' cannot be deleted. Subscription groups cannot be removed once created."
      );
    });

    it("should create a plan to create a subscription group", () => {
      const currentState = EMPTY_STATE;
      const desiredState = MOCK_STATE_1;
      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // We expect a CREATE_SUBSCRIPTION_GROUP action.
      // The mock state also contains an IAP, so we filter for the group action.
      const groupAction = plan.find(
        (a) => a.type === "CREATE_SUBSCRIPTION_GROUP"
      );
      expect(groupAction).toEqual({
        type: "CREATE_SUBSCRIPTION_GROUP",
        payload: {
          group: MOCK_STATE_1.subscriptionGroups![0],
        },
      });
    });

    it("should throw an error when trying to delete a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState = {
        ...MOCK_STATE_1,
        subscriptionGroups: [], // Only remove subscription groups
      };

      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(
        "Subscription group with reference name 'group1' cannot be deleted. Subscription groups cannot be removed once created."
      );
    });

    it("should create a plan to add a localization to a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const newLocalization: SubscriptionGroupLocalization = {
        locale: "de-DE",
        name: "Gruppe 1",
        customName: "Benutzerdefinierte Gruppe 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            localizations: [
              ...MOCK_STATE_1.subscriptionGroups![0].localizations,
              newLocalization,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION",
        payload: {
          groupReferenceName: "group1",
          localization: newLocalization,
        },
      });
    });

    it("should create a plan to remove a localization from a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            localizations: [],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION",
        payload: {
          groupReferenceName: "group1",
          locale: "en-US",
        },
      });
    });

    it("should create a plan to update a localization in a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const updatedLocalization: SubscriptionGroupLocalization = {
        locale: "en-US",
        name: "Updated Group 1",
        customName: "Updated Custom Group 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            localizations: [updatedLocalization],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION",
        payload: {
          groupReferenceName: "group1",
          locale: "en-US",
          changes: {
            name: "Updated Group 1",
            customName: "Updated Custom Group 1",
          },
        },
      });
    });

    it("should create a plan to add a subscription to a group", () => {
      const currentState = MOCK_STATE_1;
      const newSubscription = {
        ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
        productId: "sub2",
        referenceName: "Subscription 2",
        groupLevel: 2,
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
              newSubscription,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(5); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + CREATE_INTRODUCTORY_OFFER + UPDATE_SUBSCRIPTION_AVAILABILITY
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "CREATE_SUBSCRIPTION",
            payload: {
              groupReferenceName: "group1",
              subscription: newSubscription,
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_LOCALIZATION",
            payload: {
              subscriptionProductId: "sub2",
              localization: newSubscription.localizations![0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub2",
              desiredPriceSchedule: newSubscription.pricing,
              currentPriceSchedule: undefined,
              changes: {
                addedPrices: newSubscription.pricing?.prices || [],
                updatedPrices: [],
                deletedTerritories: [],
              },
            },
          },
          {
            type: "CREATE_INTRODUCTORY_OFFER",
            payload: {
              subscriptionProductId: "sub2",
              subscriptionPeriod: "ONE_MONTH",
              offer: newSubscription.introductoryOffers![0],
            },
          },
          {
            type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
            payload: {
              subscriptionProductId: "sub2",
              availability: newSubscription.availability,
            },
          },
        ])
      );
    });

    it("should throw an error when trying to delete a subscription", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [],
          },
        ],
      };

      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(
        "Subscription with productId 'sub1' cannot be deleted. Subscriptions cannot be removed once created."
      );
    });

    it("should create a plan to update a subscription in a group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                referenceName: "Updated Subscription 1",
                groupLevel: 2,
                familySharable: true,
                subscriptionPeriod: "ONE_MONTH", // Keep same period
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION",
        payload: {
          productId: "sub1",
          changes: {
            referenceName: "Updated Subscription 1",
            groupLevel: 2,
            familySharable: true,
          },
        },
      });
    });

    it("should create a plan to add a localization to a subscription", () => {
      const currentState = MOCK_STATE_1;
      const newLocalization: Localization = {
        locale: "de-DE",
        name: "Abonnement 1",
        description: "Dies ist Abonnement 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                localizations: [
                  ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                    .localizations || []),
                  newLocalization,
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_LOCALIZATION",
        payload: {
          subscriptionProductId: "sub1",
          localization: newLocalization,
        },
      });
    });

    it("should create a plan to remove a localization from a subscription", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                localizations: [],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_SUBSCRIPTION_LOCALIZATION",
        payload: {
          subscriptionProductId: "sub1",
          locale: "en-US",
        },
      });
    });

    it("should create a plan to update a localization for a subscription", () => {
      const currentState = MOCK_STATE_1;
      const updatedLocalization: Localization = {
        locale: "en-US",
        name: "Updated Subscription 1",
        description: "This is the updated subscription 1",
      };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                localizations: [updatedLocalization],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION_LOCALIZATION",
        payload: {
          subscriptionProductId: "sub1",
          locale: "en-US",
          changes: {
            name: "Updated Subscription 1",
            description: "This is the updated subscription 1",
          },
        },
      });
    });

    it("should create a plan to delete and recreate introductory offers when they change", () => {
      const currentState = MOCK_STATE_1;
      const newOffer: IntroductoryOffer = {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "1.99" }],
        },
        availableTerritories: ["USA"],
      };

      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [newOffer],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(2); // 1 delete, 1 create
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "DELETE_INTRODUCTORY_OFFER",
            payload: {
              subscriptionProductId: "sub1",
              offer:
                MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                  .introductoryOffers![0],
            },
          },
          {
            type: "CREATE_INTRODUCTORY_OFFER",
            payload: {
              subscriptionProductId: "sub1",
              subscriptionPeriod: "ONE_MONTH",
              offer: newOffer,
            },
          },
        ])
      );
    });

    it("should create a plan to handle individual introductory offer changes efficiently", () => {
      // Create a state with multiple introductory offers
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "CAN",
                      prices: [{ territory: "CAN", price: "2.99" }],
                    },
                    availableTerritories: ["CAN"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Modify only one offer (change the price of PAY_AS_YOU_GO offer)
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "CAN",
                      prices: [{ territory: "CAN", price: "3.99" }], // Changed price
                    },
                    availableTerritories: ["CAN"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have 1 action: create the new offer (the system now handles updates by creating directly)
      expect(plan).toHaveLength(1);

      // Verify the action is for the PAY_AS_YOU_GO offer
      const createAction = plan.find(
        (a) => a.type === "CREATE_INTRODUCTORY_OFFER"
      );

      expect(createAction).toBeDefined();

      // Verify the create action is for the new PAY_AS_YOU_GO offer
      expect(createAction!.payload.offer).toEqual({
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "CAN",
          prices: [{ territory: "CAN", price: "3.99" }],
        },
        availableTerritories: ["CAN"],
      });
    });

    it("should create a plan to add a new introductory offer while keeping existing ones", () => {
      // Create a state with one introductory offer
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Add a new offer while keeping the existing one
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                  {
                    type: "PAY_UP_FRONT",
                    duration: "ONE_MONTH",
                    pricing: {
                      baseTerritory: "CAN",
                      prices: [{ territory: "CAN", price: "4.99" }],
                    },
                    availableTerritories: ["CAN"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should only have 1 action: create the new offer
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          subscriptionPeriod: "ONE_MONTH",
          offer: {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            pricing: {
              baseTerritory: "CAN",
              prices: [{ territory: "CAN", price: "4.99" }],
            },
            availableTerritories: ["CAN"],
          },
        },
      });
    });

    it("should create a plan to remove a specific introductory offer while keeping others", () => {
      // Create a state with multiple introductory offers
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "CAN",
                      prices: [{ territory: "CAN", price: "2.99" }],
                    },
                    availableTerritories: ["CAN"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Remove only the PAY_AS_YOU_GO offer
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should only have 1 action: delete the PAY_AS_YOU_GO offer
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          offer: {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 3,
            pricing: {
              baseTerritory: "CAN",
              prices: [{ territory: "CAN", price: "2.99" }],
            },
            availableTerritories: ["CAN"],
          },
        },
      });
    });

    it("should not create actions when only array order changes in introductory offer availableTerritories", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["USA", "CAN", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Same territories but different order
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "THREE_DAYS",
                    availableTerritories: ["CAN", "GBR", "USA"], // Different order
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should not create any actions since the content is the same
      expect(plan).toHaveLength(0);
    });

    it("should not create actions when only array order changes in introductory offer prices", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "1.99" },
                        { territory: "CAN", price: "2.99" },
                        { territory: "GBR", price: "3.99" },
                      ],
                    },
                    availableTerritories: ["USA", "CAN", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Same prices but different order
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA", // Keep the same base territory
                      prices: [
                        { territory: "CAN", price: "2.99" },
                        { territory: "GBR", price: "3.99" },
                        { territory: "USA", price: "1.99" },
                      ],
                    },
                    availableTerritories: ["CAN", "GBR", "USA"], // Different order
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should not create any actions since the content is the same
      expect(plan).toHaveLength(0);
    });

    it("should create actions when actual content changes in introductory offer", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "1.99" },
                        { territory: "CAN", price: "2.99" },
                      ],
                    },
                    availableTerritories: ["USA", "CAN"],
                  },
                ],
              },
            ],
          },
        ],
      };

      // Different content (added GBR)
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "1.99" },
                        { territory: "CAN", price: "2.99" },
                        { territory: "GBR", price: "3.99" }, // Added new territory
                      ],
                    },
                    availableTerritories: ["USA", "CAN", "GBR"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should create actions since content actually changed
      expect(plan).toHaveLength(1); // 1 create (the system now handles updates by creating directly)
      expect(plan).toEqual([
        {
          type: "CREATE_INTRODUCTORY_OFFER",
          payload: {
            subscriptionProductId: "sub1",
            subscriptionPeriod: "ONE_MONTH",
            offer: {
              type: "PAY_AS_YOU_GO",
              numberOfPeriods: 3,
              pricing: {
                baseTerritory: "USA",
                prices: [
                  { territory: "USA", price: "1.99" },
                  { territory: "CAN", price: "2.99" },
                  { territory: "GBR", price: "3.99" },
                ],
              },
              availableTerritories: ["USA", "CAN", "GBR"],
            },
          },
        },
      ]);
    });

    it("should not create actions when only array order changes in IAP availability", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "CAN", "GBR"],
            },
          },
        ],
      };

      // Same territories but different order
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["CAN", "GBR", "USA"], // Different order
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should not create any actions since the content is the same
      expect(plan).toHaveLength(0);
    });

    it("should create actions when actual content changes in IAP availability", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "CAN"],
            },
          },
        ],
      };

      // Different content (added GBR)
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["USA", "CAN", "GBR"], // Added new territory
            },
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should create actions since content actually changed
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: "iap1",
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA", "CAN", "GBR"],
          },
        },
      });
    });

    it("should create a plan to update the availability of a subscription", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                pricing: {
                  baseTerritory: "CAN",
                  prices: [
                    ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .pricing?.prices || []),
                    { territory: "CAN", price: "12.99" },
                  ],
                },
                availability: {
                  availableInNewTerritories: false,
                  availableTerritories: ["USA", "CAN"],
                },
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(2); // Should create both price and availability actions
      expect(plan).toContainEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          desiredPriceSchedule: {
            baseTerritory: "CAN",
            prices: [
              { territory: "USA" as const, price: "9.99" },
              { territory: "CAN" as const, price: "12.99" },
            ],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA" as const, price: "9.99" }],
          },
          changes: {
            addedPrices: [{ territory: "CAN" as const, price: "12.99" }],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
      expect(plan).toContainEqual({
        type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
        payload: {
          subscriptionProductId: "sub1",
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA", "CAN"],
          },
        },
      });
    });

    it("should create a plan to update the availability of a subscription when it is not specified in current state", () => {
      const currentState: AppStoreModel = JSON.parse(
        JSON.stringify(MOCK_STATE_1)
      );
      if (
        currentState.subscriptionGroups &&
        currentState.subscriptionGroups[0] &&
        currentState.subscriptionGroups[0].subscriptions[0]
      ) {
        delete (currentState.subscriptionGroups[0].subscriptions[0] as any)
          .availability;
        delete (currentState.subscriptionGroups[0].subscriptions[0] as any)
          .introductoryOffers;
      }

      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                // Remove introductory offers to avoid creation attempts
                introductoryOffers: [],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      const subAvailabilityAction = plan.find(
        (a) => a.type === "UPDATE_SUBSCRIPTION_AVAILABILITY"
      );

      expect(subAvailabilityAction).toEqual({
        type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
        payload: {
          subscriptionProductId: "sub1",
          availability:
            MOCK_STATE_1.subscriptionGroups![0].subscriptions[0].availability,
        },
      });
    });

    it("should create a plan to add a new subscription with all required fields including introductory offer", () => {
      const currentState: AppStoreModel = {
        ...EMPTY_STATE,
        subscriptionGroups: [
          {
            referenceName: "group1",
            localizations: [
              {
                locale: "en-US",
                name: "Group 1",
                customName: "Custom Group 1",
              },
            ],
            subscriptions: [],
          },
        ],
      };

      const newSubscription: Subscription = {
        productId: "sub2",
        referenceName: "Subscription 2",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "14.99" }],
        },
        localizations: [
          {
            locale: "en-US",
            name: "Subscription 2",
            description: "This is Subscription 2",
          },
        ],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["USA"],
          },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
      };

      const desiredState: AppStoreModel = {
        ...EMPTY_STATE,
        subscriptionGroups: [
          {
            referenceName: "group1",
            localizations: [
              {
                locale: "en-US",
                name: "Group 1",
                customName: "Custom Group 1",
              },
            ],
            subscriptions: [newSubscription],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      expect(plan).toHaveLength(5);

      // Verify the order of actions - subscription should be created first
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION",
        payload: {
          groupReferenceName: "group1",
          subscription: newSubscription,
        },
      });

      // Then subscription localizations
      expect(plan[1]).toEqual({
        type: "CREATE_SUBSCRIPTION_LOCALIZATION",
        payload: {
          subscriptionProductId: "sub2",
          localization: newSubscription.localizations![0],
        },
      });

      // Then subscription availability (needed before creating offers)
      expect(plan[2]).toEqual({
        type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
        payload: {
          subscriptionProductId: "sub2",
          availability: newSubscription.availability,
        },
      });

      // Then subscription prices
      expect(plan[3]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub2",
          changes: {
            addedPrices: newSubscription.pricing?.prices || [],
            deletedTerritories: [],
            updatedPrices: [],
          },
          desiredPriceSchedule: newSubscription.pricing!,
          currentPriceSchedule: undefined,
        },
      });

      // Finally, introductory offer (after availability and pricing are set)
      expect(plan[4]).toEqual({
        type: "CREATE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId: "sub2",
          subscriptionPeriod: "ONE_MONTH",
          offer: newSubscription.introductoryOffers![0],
        },
      });
    });

    it("should create a plan to add a subscription price", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "12.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                pricing: {
                  baseTerritory: "USA",
                  prices: [
                    ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .pricing?.prices || []),
                    newPrice,
                  ],
                },
              },
            ],
          },
        ],
      };
      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA" as const, price: "9.99" }, newPrice],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA" as const, price: "9.99" }],
          },
          changes: {
            addedPrices: [newPrice],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should create a plan to delete subscription prices", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                pricing: {
                  baseTerritory: "USA",
                  prices: [],
                },
              },
            ],
          },
        ],
      };
      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA" as const, price: "9.99" }],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [],
            deletedTerritories: ["USA"],
          },
        },
      });
    });

    it("should create a plan to update a subscription price", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "10.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                pricing: {
                  baseTerritory: "USA",
                  prices: [updatedPrice],
                },
              },
            ],
          },
        ],
      };
      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [updatedPrice],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA" as const, price: "9.99" }],
          },
          changes: {
            addedPrices: [],
            updatedPrices: [updatedPrice],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should not create a plan when subscription prices are unchanged", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                pricing: {
                  baseTerritory: "USA",
                  prices: [
                    ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .pricing?.prices || []),
                  ],
                },
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(0);
    });

    it("should not create a plan when states are identical", () => {
      const plan = diff(MOCK_STATE_1, MOCK_STATE_1);
      expect(plan).toEqual([]);
    });

    describe("Subscription pricing territory deletion prevention", () => {
      it("should create a plan to delete a single territory from subscription pricing", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: { baseTerritory: "USA", prices: [] }, // Remove all prices (which includes USA)
                },
              ],
            },
          ],
        };
        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            desiredPriceSchedule: {
              baseTerritory: "USA",
              prices: [],
            },
            currentPriceSchedule: {
              baseTerritory: "USA",
              prices: [{ territory: "USA" as const, price: "9.99" }],
            },
            changes: {
              addedPrices: [],
              updatedPrices: [],
              deletedTerritories: ["USA"],
            },
          },
        });
      });

      it("should create a plan to delete multiple territories from subscription pricing", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA" as const,
                    prices: [
                      { territory: "USA" as const, price: "9.99" },
                      { territory: "CAN" as const, price: "12.99" },
                      { territory: "GBR" as const, price: "8.99" },
                    ],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: [
                      "USA" as const,
                      "CAN" as const,
                      "GBR" as const,
                    ],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  ...currentState.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA" as const,
                    prices: [
                      { territory: "USA" as const, price: "9.99" },
                      // Removed CAN and GBR
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0].type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(plan[0].payload).toEqual({
          subscriptionProductId: "sub1",
          changes: {
            addedPrices: [],
            deletedTerritories: ["CAN", "GBR"],
            updatedPrices: [],
          },
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "9.99" }],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [
              { territory: "USA", price: "9.99" },
              { territory: "CAN", price: "12.99" },
              { territory: "GBR", price: "8.99" },
            ],
          },
        });
      });

      it("should create a plan to delete territory from subscription with multiple prices", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA" as const,
                    prices: [
                      { territory: "USA" as const, price: "9.99" },
                      { territory: "CAN" as const, price: "12.99" },
                    ],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA" as const, "CAN" as const],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  ...currentState.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA" as const,
                    prices: [
                      { territory: "USA" as const, price: "9.99" },
                      // Removed CAN
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0].type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(plan[0].payload).toEqual({
          subscriptionProductId: "sub1",
          changes: {
            addedPrices: [],
            deletedTerritories: ["CAN"],
            updatedPrices: [],
          },
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "9.99" }],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [
              { territory: "USA", price: "9.99" },
              { territory: "CAN", price: "12.99" },
            ],
          },
        });
      });

      it("should allow adding new territories to subscription pricing", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                        .pricing?.prices || []),
                      { territory: "CAN", price: "12.99" },
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            desiredPriceSchedule: {
              baseTerritory: "USA",
              prices: [
                { territory: "USA", price: "9.99" },
                { territory: "CAN", price: "12.99" },
              ],
            },
            currentPriceSchedule: {
              baseTerritory: "USA",
              prices: [{ territory: "USA", price: "9.99" }],
            },
            changes: {
              addedPrices: [{ territory: "CAN", price: "12.99" }],
              updatedPrices: [],
              deletedTerritories: [],
            },
          },
        });
      });

      it("should allow updating existing territories in subscription pricing", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      { territory: "USA", price: "10.99" }, // Updated price
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            desiredPriceSchedule: {
              baseTerritory: "USA",
              prices: [{ territory: "USA", price: "10.99" }],
            },
            currentPriceSchedule: {
              baseTerritory: "USA",
              prices: [{ territory: "USA", price: "9.99" }],
            },
            changes: {
              addedPrices: [],
              updatedPrices: [{ territory: "USA", price: "10.99" }],
              deletedTerritories: [],
            },
          },
        });
      });

      it("should allow adding and updating territories simultaneously", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      { territory: "USA", price: "10.99" }, // Updated price
                      { territory: "CAN", price: "12.99" }, // New territory
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            desiredPriceSchedule: {
              baseTerritory: "USA",
              prices: [
                { territory: "USA", price: "10.99" },
                { territory: "CAN", price: "12.99" },
              ],
            },
            currentPriceSchedule: {
              baseTerritory: "USA",
              prices: [{ territory: "USA", price: "9.99" }],
            },
            changes: {
              addedPrices: [{ territory: "CAN", price: "12.99" }],
              updatedPrices: [{ territory: "USA", price: "10.99" }],
              deletedTerritories: [],
            },
          },
        });
      });

      it("should not create action when no pricing changes are made", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                        .pricing?.prices || []),
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(0);
      });

      it("should throw error with correct subscription ID when deleting territory from specific subscription", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "9.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
                {
                  productId: "sub2",
                  referenceName: "Subscription 2",
                  groupLevel: 2,
                  subscriptionPeriod: "ONE_YEAR",
                  familySharable: true,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "99.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 2",
                      description: "This is Subscription 2",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  ...currentState.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "9.99" }],
                  },
                },
                {
                  ...currentState.subscriptionGroups![0].subscriptions[1],
                  pricing: { baseTerritory: "USA", prices: [] }, // Remove pricing from sub2
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0].type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(plan[0].payload).toEqual({
          subscriptionProductId: "sub2",
          changes: {
            addedPrices: [],
            deletedTerritories: ["USA"],
            updatedPrices: [],
          },
          desiredPriceSchedule: {
            baseTerritory: "USA",
            prices: [],
          },
          currentPriceSchedule: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "99.99" }],
          },
        });
      });

      it("should verify CREATE_SUBSCRIPTION_PRICE action payload structure", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      { territory: "USA", price: "10.99" }, // Updated price
                      { territory: "CAN", price: "12.99" }, // New territory
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload).toHaveProperty("subscriptionProductId");
        expect(action.payload).toHaveProperty("changes");
        expect(action.payload.changes).toHaveProperty("addedPrices");
        expect(action.payload.changes).toHaveProperty("updatedPrices");

        // Verify deletedTerritories is present and is an array
        expect(action.payload.changes).toHaveProperty("deletedTerritories");
        expect(Array.isArray(action.payload.changes.deletedTerritories)).toBe(
          true
        );

        // Verify the structure matches the expected type
        expect(action.payload.changes.addedPrices).toEqual([
          { territory: "CAN", price: "12.99" },
        ]);
        expect(action.payload.changes.updatedPrices).toEqual([
          { territory: "USA", price: "10.99" },
        ]);
      });

      it("should verify action payload structure for add-only changes", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      ...(MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                        .pricing?.prices || []),
                      { territory: "CAN", price: "12.99" },
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload.changes).toHaveProperty("deletedTerritories");
        expect(action.payload.changes.addedPrices).toHaveLength(1);
        expect(action.payload.changes.updatedPrices).toHaveLength(0);
      });

      it("should verify action payload structure for update-only changes", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      { territory: "USA", price: "10.99" }, // Updated price only
                    ],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload.changes).toHaveProperty("deletedTerritories");
        expect(action.payload.changes.addedPrices).toHaveLength(0);
        expect(action.payload.changes.updatedPrices).toHaveLength(1);
      });
    });

    describe("Subscription deletion scenarios", () => {
      it("should throw an error when trying to delete multiple subscriptions from a group", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "9.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
                {
                  productId: "sub2",
                  referenceName: "Subscription 2",
                  groupLevel: 2,
                  subscriptionPeriod: "ONE_YEAR",
                  familySharable: true,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "99.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 2",
                      description: "This is Subscription 2",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [], // Remove both subscriptions
            },
          ],
        };

        expect(() =>
          diffWithShortcutsRemoved(currentState, desiredState)
        ).toThrow(
          "Subscription with productId 'sub1' cannot be deleted. Subscriptions cannot be removed once created."
        );
      });

      it("should throw an error when trying to delete a subscription while keeping others", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "9.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
                {
                  productId: "sub2",
                  referenceName: "Subscription 2",
                  groupLevel: 2,
                  subscriptionPeriod: "ONE_YEAR",
                  familySharable: true,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "99.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 2",
                      description: "This is Subscription 2",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                // Only keep sub2, remove sub1
                currentState.subscriptionGroups![0].subscriptions[1],
              ],
            },
          ],
        };

        expect(() =>
          diffWithShortcutsRemoved(currentState, desiredState)
        ).toThrow(
          "Subscription with productId 'sub1' cannot be deleted. Subscriptions cannot be removed once created."
        );
      });

      it("should allow adding new subscriptions while keeping all existing ones", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1",
                  referenceName: "Subscription 1",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH",
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "9.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                // Keep existing subscription
                currentState.subscriptionGroups![0].subscriptions[0],
                // Add new subscription
                {
                  productId: "sub2",
                  referenceName: "Subscription 2",
                  groupLevel: 2,
                  subscriptionPeriod: "ONE_YEAR",
                  familySharable: true,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "99.99" }],
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 2",
                      description: "This is Subscription 2",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  },
                },
              ],
            },
          ],
        };

        // Should not throw - all existing subscriptions are preserved
        expect(() =>
          diffWithShortcutsRemoved(currentState, desiredState)
        ).not.toThrow();

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(
          plan.some((action) => action.type === "CREATE_SUBSCRIPTION")
        ).toBe(true);
      });

      it("should allow updating existing subscription content while keeping same productId", () => {
        const currentState: AppStoreModel = {
          ...EMPTY_STATE,
          subscriptionGroups: [
            {
              referenceName: "group1",
              localizations: [
                {
                  locale: "en-US",
                  name: "Group 1",
                  customName: "Custom Group 1",
                },
              ],
              subscriptions: [
                {
                  productId: "sub1", // Same productId
                  referenceName: "Updated Subscription 1", // Different content
                  groupLevel: 2, // Different content
                  subscriptionPeriod: "ONE_YEAR", // Different content
                  familySharable: true, // Different content
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "19.99" }], // Different content
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Updated Subscription 1",
                      description: "This is the updated subscription 1",
                    },
                  ], // Different content
                  availability: {
                    availableInNewTerritories: false,
                    availableTerritories: ["USA", "CAN"],
                  }, // Different content
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  productId: "sub1", // Same productId
                  referenceName: "Different Subscription 1", // Different content
                  groupLevel: 3, // Different content
                  subscriptionPeriod: "ONE_YEAR", // Keep same period
                  familySharable: true, // Keep family sharing enabled
                  pricing: {
                    baseTerritory: "USA",
                    prices: [{ territory: "USA", price: "29.99" }], // Different content
                  },
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Different Subscription 1",
                      description: "This is a different subscription 1",
                    },
                  ], // Different content
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA"],
                  }, // Different content
                },
              ],
            },
          ],
        };

        // Should not throw - content can change, productId is the same
        expect(() =>
          diffWithShortcutsRemoved(currentState, desiredState)
        ).not.toThrow();

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(
          plan.some((action) => action.type === "UPDATE_SUBSCRIPTION")
        ).toBe(true);
      });
    });

    it("should create a plan to update a subscription's review note", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                reviewNote: "This is a new review note.",
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION",
        payload: {
          productId: "sub1",
          changes: {
            reviewNote: "This is a new review note.",
          },
        },
      });
    });

    // Additional test cases for CREATE_SUBSCRIPTION and UPDATE_SUBSCRIPTION
    describe("CREATE_SUBSCRIPTION edge cases", () => {
      it("should create a plan for subscription with no localizations", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub3",
          referenceName: "Subscription 3",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "4.99" }],
          },
          localizations: [], // No localizations
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(3); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY (no localization since empty)
        expect(plan).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub3",
                changes: {
                  addedPrices: newSubscription.pricing?.prices || [],
                  deletedTerritories: [],
                  updatedPrices: [],
                },
                desiredPriceSchedule: newSubscription.pricing!,
                currentPriceSchedule: undefined,
              },
            },
            {
              type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
              payload: {
                subscriptionProductId: "sub3",
                availability: newSubscription.availability,
              },
            },
          ])
        );
      });

      it("should create a plan for subscription with no prices", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub4",
          referenceName: "Subscription 4",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: { baseTerritory: "USA", prices: [] }, // No prices
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 4",
              description: "This is Subscription 4",
            },
          ]!,
          availability: {
            availableInNewTerritories: true,
            availableTerritories: [], // No territories since no prices
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + UPDATE_SUBSCRIPTION_AVAILABILITY + CREATE_SUBSCRIPTION_PRICE
        expect(plan).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub4",
                localization: newSubscription.localizations![0],
              },
            },
            {
              type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
              payload: {
                subscriptionProductId: "sub4",
                availability: newSubscription.availability,
              },
            },
          ])
        );
      });

      it("should create a plan for subscription with availability", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub5",
          referenceName: "Subscription 5",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "4.99" }],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 5",
              description: "This is Subscription 5",
            },
          ]!,
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY
        expect(plan).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub5",
                localization: newSubscription.localizations![0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub5",
                changes: {
                  addedPrices: newSubscription.pricing?.prices || [],
                  deletedTerritories: [],
                  updatedPrices: [],
                },
                desiredPriceSchedule: newSubscription.pricing!,
                currentPriceSchedule: undefined,
              },
            },
            {
              type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
              payload: {
                subscriptionProductId: "sub5",
                availability: newSubscription.availability,
              },
            },
          ])
        );
      });

      it("should create a plan for subscription with multiple localizations", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub6",
          referenceName: "Subscription 6",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "4.99" }],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 6",
              description: "This is Subscription 6",
            },
            {
              locale: "de-DE",
              name: "Abonnement 6",
              description: "Dies ist Abonnement 6",
            },
          ]!,
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(5); // CREATE_SUBSCRIPTION + 2 CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY
        expect(plan).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub6",
                localization: newSubscription.localizations![0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub6",
                localization: newSubscription.localizations![1],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub6",
                changes: {
                  addedPrices: newSubscription.pricing?.prices || [],
                  deletedTerritories: [],
                  updatedPrices: [],
                },
                desiredPriceSchedule: newSubscription.pricing!,
                currentPriceSchedule: undefined,
              },
            },
            {
              type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
              payload: {
                subscriptionProductId: "sub6",
                availability: newSubscription.availability,
              },
            },
          ])
        );
      });

      it("should create a plan for subscription with multiple prices", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub7",
          referenceName: "Subscription 7",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [
              { territory: "USA", price: "4.99" },
              { territory: "CAN", price: "5.99" },
            ],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 7",
              description: "This is Subscription 7",
            },
          ]!,
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY
        expect(plan).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub7",
                localization: newSubscription.localizations![0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub7",
                changes: {
                  addedPrices: newSubscription.pricing?.prices || [],
                  deletedTerritories: [],
                  updatedPrices: [],
                },
                desiredPriceSchedule: newSubscription.pricing!,
                currentPriceSchedule: undefined,
              },
            },
            {
              type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
              payload: {
                subscriptionProductId: "sub7",
                availability: newSubscription.availability,
              },
            },
          ])
        );
      });
    });

    describe("UPDATE_SUBSCRIPTION edge cases", () => {
      it("should create a plan for partial update - only referenceName", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  referenceName: "Updated Reference Name Only",
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              referenceName: "Updated Reference Name Only",
            },
          },
        });
      });

      it("should create a plan for partial update - only familySharable", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  familySharable: true,
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              familySharable: true,
            },
          },
        });
      });

      it("should create a plan for partial update - only groupLevel", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  groupLevel: 3,
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              groupLevel: 3,
            },
          },
        });
      });

      it("should create a plan for partial update - only subscriptionPeriod", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  subscriptionPeriod: "SIX_MONTHS",
                },
              ],
            },
          ],
        };

        expect(() =>
          diffWithShortcutsRemoved(currentState, desiredState)
        ).toThrow(
          /Subscription period for subscription sub1 cannot be changed once created/
        );
      });

      it("should not create a plan when no changes are made", () => {
        const currentState = MOCK_STATE_1;
        const desiredState = MOCK_STATE_1; // Same state

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(0);
      });

      it("should create a plan for updating all fields at once", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  referenceName: "All Fields Updated",
                  familySharable: true,
                  groupLevel: 3,
                  subscriptionPeriod: "ONE_MONTH", // Keep same period
                  reviewNote: "Updated review note for all fields",
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              referenceName: "All Fields Updated",
              familySharable: true,
              groupLevel: 3,
              reviewNote: "Updated review note for all fields",
            },
          },
        });
      });

      it("should create a plan for updating just the review note", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  reviewNote: "Just updating the review note",
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              reviewNote: "Just updating the review note",
            },
          },
        });
      });

      it("should create a plan for removing the review note", () => {
        const currentStateWithReviewNote: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  reviewNote: "This is the current review note",
                },
              ],
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  reviewNote: undefined,
                },
              ],
            },
          ],
        };

        const plan = diff(currentStateWithReviewNote, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              reviewNote: undefined,
            },
          },
        });
      });

      it("should throw an error when trying to remove availability from existing subscription", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  availability: {
                    availableInNewTerritories: false,
                    availableTerritories: [],
                  },
                },
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
          payload: {
            subscriptionProductId: "sub1",
            availability: {
              availableInNewTerritories: false,
              availableTerritories: [],
            },
          },
        });
      });
    });

    describe("Price comparison with different decimal precision", () => {
      it("should not detect changes when IAP prices differ only in decimal precision", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          inAppPurchases: [
            {
              productId: "test.iap",
              type: "CONSUMABLE" as const,
              referenceName: "Test IAP",
              familySharable: false,
              pricing: {
                baseTerritory: "USA" as const,
                prices: [
                  { territory: "USA" as const, price: "0.0" },
                  { territory: "GBR" as const, price: "4.5" },
                ],
              },
              localizations: [],
            },
          ],
        };

        const currentStateWithIAP = {
          ...MOCK_STATE_1,
          inAppPurchases: [
            {
              productId: "test.iap",
              type: "CONSUMABLE" as const,
              referenceName: "Test IAP",
              familySharable: false,
              pricing: {
                baseTerritory: "USA" as const,
                prices: [
                  { territory: "USA" as const, price: "0.00" },
                  { territory: "GBR" as const, price: "4.50" },
                ],
              },
              localizations: [],
            },
          ],
        };

        const plan = diff(currentStateWithIAP, desiredState);

        // Should not have any UPDATE_IAP_PRICING actions
        const pricingActions = plan.filter(
          (action) => action.type === "UPDATE_IAP_PRICING"
        );
        expect(pricingActions).toHaveLength(0);
      });

      it("should not detect changes when app prices differ only in decimal precision", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          pricing: {
            baseTerritory: "USA" as const,
            prices: [
              { territory: "USA" as const, price: "0.0" },
              { territory: "GBR" as const, price: "2.5" },
            ],
          },
        };

        const currentStateWithDifferentPrecision = {
          ...MOCK_STATE_1,
          pricing: {
            baseTerritory: "USA" as const,
            prices: [
              { territory: "USA" as const, price: "0.00" },
              { territory: "GBR" as const, price: "2.50" },
            ],
          },
        };

        const plan = diff(currentStateWithDifferentPrecision, desiredState);

        // Should not have any UPDATE_APP_PRICING actions
        const pricingActions = plan.filter(
          (action) => action.type === "UPDATE_APP_PRICING"
        );
        expect(pricingActions).toHaveLength(0);
      });

      it("should not detect changes when subscription prices differ only in decimal precision", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              referenceName: "test-group",
              localizations: [],
              subscriptions: [
                {
                  productId: "test.subscription",
                  referenceName: "Test Subscription",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH" as const,
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA",
                    prices: [
                      { territory: "USA" as const, price: "9.9" },
                      { territory: "GBR" as const, price: "7.5" },
                    ],
                  },
                  localizations: [],
                },
              ],
            },
          ],
        };

        const currentStateWithDifferentPrecision = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              referenceName: "test-group",
              localizations: [],
              subscriptions: [
                {
                  productId: "test.subscription",
                  referenceName: "Test Subscription",
                  groupLevel: 1,
                  subscriptionPeriod: "ONE_MONTH" as const,
                  familySharable: false,
                  pricing: {
                    baseTerritory: "USA" as const,
                    prices: [
                      { territory: "USA" as const, price: "9.90" },
                      { territory: "GBR" as const, price: "7.50" },
                    ],
                  },
                  localizations: [],
                },
              ],
            },
          ],
        };

        const plan = diff(currentStateWithDifferentPrecision, desiredState);

        // Should not have any CREATE_SUBSCRIPTION_PRICE actions
        const pricingActions = plan.filter(
          (action) => action.type === "CREATE_SUBSCRIPTION_PRICE"
        );
        expect(pricingActions).toHaveLength(0);
      });

      it("should detect changes when prices actually differ", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          pricing: {
            baseTerritory: "USA" as const,
            prices: [
              { territory: "USA" as const, price: "2.99" },
              { territory: "GBR" as const, price: "2.5" },
            ],
          },
        };

        const currentStateWithDifferentPrice = {
          ...MOCK_STATE_1,
          pricing: {
            baseTerritory: "USA" as const,
            prices: [
              { territory: "USA" as const, price: "4.99" },
              { territory: "GBR" as const, price: "2.50" },
            ],
          },
        };

        const plan = diff(currentStateWithDifferentPrice, desiredState);

        // Should have UPDATE_APP_PRICING action for the actual price change
        const pricingActions = plan.filter(
          (action) => action.type === "UPDATE_APP_PRICING"
        );
        expect(pricingActions).toHaveLength(1);
        expect(pricingActions[0].payload.changes.updatedPrices).toHaveLength(1);
        expect(pricingActions[0].payload.changes.updatedPrices[0].price).toBe(
          "2.99"
        );
      });
    });

    describe("Complex subscription scenarios", () => {
      it("should create a plan for creating multiple subscriptions in the same group", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription1: Subscription = {
          productId: "sub8",
          referenceName: "Subscription 8",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "4.99" }],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 8",
              description: "This is Subscription 8",
            },
          ],
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const newSubscription2: Subscription = {
          productId: "sub9",
          referenceName: "Subscription 9",
          groupLevel: 2,
          subscriptionPeriod: "ONE_YEAR",
          familySharable: true,
          pricing: {
            baseTerritory: "USA",
            prices: [
              { territory: "USA", price: "49.99" },
              { territory: "CAN", price: "59.99" },
            ],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 9",
              description: "This is Subscription 9",
            },
          ],
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA", "CAN"],
          },
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                newSubscription1,
                newSubscription2,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(8); // 2 * (CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY)

        // Check that both subscriptions are created
        const createActions = plan.filter(
          (action) => action.type === "CREATE_SUBSCRIPTION"
        );
        expect(createActions).toHaveLength(2);
        expect(createActions).toEqual(
          expect.arrayContaining([
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription1,
              },
            },
            {
              type: "CREATE_SUBSCRIPTION",
              payload: {
                groupReferenceName: "group1",
                subscription: newSubscription2,
              },
            },
          ])
        );
      });

      it("should create a plan for creating and immediately updating a subscription", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription: Subscription = {
          productId: "sub10",
          referenceName: "Subscription 10",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [{ territory: "USA", price: "4.99" }],
          },
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 10",
              description: "This is Subscription 10",
            },
          ],
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        };

        const updatedSubscription: Subscription = {
          ...newSubscription,
          referenceName: "Updated Subscription 10",
          familySharable: true,
        };

        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
                updatedSubscription,
              ],
            },
          ],
        };

        const plan = diffWithShortcutsRemoved(currentState, desiredState);
        expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY

        // Check that subscription is created with the updated values
        const createAction = plan.find(
          (action) => action.type === "CREATE_SUBSCRIPTION"
        );
        expect(createAction).toEqual({
          type: "CREATE_SUBSCRIPTION",
          payload: {
            groupReferenceName: "group1",
            subscription: updatedSubscription,
          },
        });
      });
    });

    it("should create a plan to add an introductory offer when none existed", () => {
      const currentState: AppStoreModel = JSON.parse(
        JSON.stringify(MOCK_STATE_1)
      );
      delete currentState.subscriptionGroups![0].subscriptions[0]
        .introductoryOffers;

      const desiredState = MOCK_STATE_1;

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          subscriptionPeriod: "ONE_MONTH",
          offer:
            MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
              .introductoryOffers![0],
        },
      });
    });

    it("should create a plan to remove all introductory offers", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [],
              },
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_INTRODUCTORY_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          offer:
            MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
              .introductoryOffers![0],
        },
      });
    });

    it("should create a plan for subscription with availability", () => {
      const currentState = MOCK_STATE_1;
      const newSubscription: Subscription = {
        productId: "sub5b",
        referenceName: "Subscription 5b",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "4.99" }],
        },
        localizations: [
          {
            locale: "en-US",
            name: "Subscription 5b",
            description: "This is Subscription 5b",
          },
        ]!,
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
      };

      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
              newSubscription,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Verify the correct order: CREATE_SUBSCRIPTION, CREATE_SUBSCRIPTION_LOCALIZATION, UPDATE_SUBSCRIPTION_AVAILABILITY, CREATE_SUBSCRIPTION_PRICE
      expect(plan).toHaveLength(4);
      expect(plan[0].type).toBe("CREATE_SUBSCRIPTION");
      expect(plan[1].type).toBe("CREATE_SUBSCRIPTION_LOCALIZATION");
      expect(plan[2].type).toBe("UPDATE_SUBSCRIPTION_AVAILABILITY");
      expect(plan[3].type).toBe("CREATE_SUBSCRIPTION_PRICE");
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "CREATE_SUBSCRIPTION",
            payload: {
              groupReferenceName: "group1",
              subscription: newSubscription,
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_LOCALIZATION",
            payload: {
              subscriptionProductId: "sub5b",
              localization: newSubscription.localizations![0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub5b",
              desiredPriceSchedule: newSubscription.pricing,
              currentPriceSchedule: undefined,
              changes: {
                addedPrices: newSubscription.pricing?.prices || [],
                updatedPrices: [],
                deletedTerritories: [],
              },
            },
          },
          {
            type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
            payload: {
              subscriptionProductId: "sub5b",
              availability: newSubscription.availability,
            },
          },
        ])
      );
    });

    it("should create a plan for subscription with empty prices array", () => {
      const currentState = MOCK_STATE_1;
      const newSubscription: Subscription = {
        productId: "sub5c",
        referenceName: "Subscription 5c",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        pricing: { baseTerritory: "USA", prices: [] }, // Empty prices array
        localizations: [
          {
            locale: "en-US",
            name: "Subscription 5c",
            description: "This is Subscription 5c",
          },
        ]!,
        availability: {
          availableInNewTerritories: true,
          availableTerritories: [], // No territories since no prices
        },
      };

      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions,
              newSubscription,
            ],
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(4); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + UPDATE_SUBSCRIPTION_AVAILABILITY + CREATE_SUBSCRIPTION_PRICE
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "CREATE_SUBSCRIPTION",
            payload: {
              groupReferenceName: "group1",
              subscription: newSubscription,
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_LOCALIZATION",
            payload: {
              subscriptionProductId: "sub5c",
              localization: newSubscription.localizations![0],
            },
          },
          {
            type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
            payload: {
              subscriptionProductId: "sub5c",
              availability: newSubscription.availability,
            },
          },
        ])
      );
    });

    it("should throw an error when multiple introductory offers are defined for the same territory", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_MONTH",
                    availableTerritories: ["USA", "GBR"],
                  },
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "0.99" },
                        { territory: "DEU", price: "0.89" },
                      ],
                    },
                    availableTerritories: ["USA", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(
        "Multiple introductory offers found for territory 'USA' in subscription 'sub1'. Only one offer per territory is allowed."
      );
    });

    it("should throw an error when multiple introductory offers with prices are defined for the same territory", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                introductoryOffers: [
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "0.99" },
                        { territory: "GBR", price: "0.79" },
                      ],
                    },
                    availableTerritories: ["USA", "GBR"],
                  },
                  {
                    type: "PAY_UP_FRONT",
                    duration: "ONE_MONTH",
                    pricing: {
                      baseTerritory: "USA",
                      prices: [
                        { territory: "USA", price: "1.99" },
                        { territory: "DEU", price: "1.89" },
                      ],
                    },
                    availableTerritories: ["USA", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(
        "Multiple introductory offers found for territory 'USA' in subscription 'sub1'. Only one offer per territory is allowed."
      );
    });

    it("should handle subscription availability with empty string ID gracefully", () => {
      const currentState = EMPTY_STATE;
      const desiredState: AppStoreModel = {
        ...EMPTY_STATE,
        subscriptionGroups: [
          {
            referenceName: "group1",
            localizations: [
              {
                locale: "en-US",
                name: "Group 1",
                customName: "Custom Group 1",
              },
            ],
            subscriptions: [
              {
                productId: "sub1",
                referenceName: "Subscription 1",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                pricing: {
                  baseTerritory: "USA",
                  prices: [{ territory: "USA", price: "9.99" }],
                },
                localizations: [
                  {
                    locale: "en-US",
                    name: "Subscription 1",
                    description: "This is Subscription 1",
                  },
                ],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: ["USA"],
                },
              },
            ],
          },
        ],
      };

      // This test verifies that the diff service can handle subscriptions
      // even when the availability mapping encounters empty string IDs
      // (which happens for newly created subscriptions)
      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).not.toThrow();

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should create the subscription group, group localization, subscription, subscription localization, subscription availability, and subscription price
      expect(plan).toHaveLength(6); // CREATE_SUBSCRIPTION_GROUP + CREATE_SUBSCRIPTION_GROUP_LOCALIZATION + CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + UPDATE_SUBSCRIPTION_AVAILABILITY + CREATE_SUBSCRIPTION_PRICE

      // Verify the subscription availability action is created
      const availabilityAction = plan.find(
        (a) => a.type === "UPDATE_SUBSCRIPTION_AVAILABILITY"
      );
      expect(availabilityAction).toBeDefined();
      expect(availabilityAction).toEqual({
        type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
        payload: {
          subscriptionProductId: "sub1",
          availability: {
            availableInNewTerritories: true,
            availableTerritories: ["USA"],
          },
        },
      });
    });
  });

  describe("Optional fields handling", () => {
    it("should skip availableTerritories diff when not provided in desired state", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA", "CAN"],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const availabilityActions = plan.filter(
        (action) => action.type === "UPDATE_APP_AVAILABILITY"
      );
      expect(availabilityActions).toHaveLength(0);
    });

    it("should skip inAppPurchases diff when not provided in desired state", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA"],
        inAppPurchases: [
          {
            productId: "test-iap",
            type: "CONSUMABLE",
            referenceName: "Test IAP",
            familySharable: false,
            localizations: [],
          },
        ],
        subscriptionGroups: [],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA"],
        subscriptionGroups: [],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const iapActions = plan.filter(
        (action) =>
          action.type.includes("IN_APP_PURCHASE") || action.type.includes("IAP")
      );
      expect(iapActions).toHaveLength(0);
    });

    it("should skip subscriptionGroups diff when not provided in desired state", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA"],
        inAppPurchases: [],
        subscriptionGroups: [
          {
            referenceName: "test-group",
            localizations: [],
            subscriptions: [],
          },
        ],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA"],
        inAppPurchases: [],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const subscriptionActions = plan.filter(
        (action) =>
          action.type.includes("SUBSCRIPTION") ||
          action.type.includes("INTRODUCTORY_OFFER")
      );
      expect(subscriptionActions).toHaveLength(0);
    });

    it("should still process other diffs when optional fields are not provided", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA"],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        availableTerritories: ["USA", "CAN"],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      const availabilityActions = plan.filter(
        (action) => action.type === "UPDATE_APP_AVAILABILITY"
      );
      expect(availabilityActions).toHaveLength(1);
    });

    it("should create UPDATE_VERSION_METADATA action when versionString is removed", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        pricing: {
          baseTerritory: "USA",
          prices: [
            {
              price: "9.99",
              territory: "USA",
            },
          ],
        },
        availableTerritories: ["USA", "CAN"],
        inAppPurchases: [
          {
            productId: "test_iap",
            type: "CONSUMABLE",
            referenceName: "Test IAP",
            familySharable: false,
            localizations: [
              {
                locale: "en-US",
                name: "Test IAP",
                description: "Test IAP description",
              },
            ],
          },
        ],
        subscriptionGroups: [
          {
            referenceName: "test_group",
            localizations: [
              {
                locale: "en-US",
                name: "Test Group",
              },
            ],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                pricing: {
                  baseTerritory: "USA",
                  prices: [
                    {
                      price: "9.99",
                      territory: "USA",
                    },
                  ],
                },
                localizations: [
                  {
                    locale: "en-US",
                    name: "Test Subscription",
                    description: "Test subscription description",
                  },
                ],
                availability: {
                  availableInNewTerritories: false,
                  availableTerritories: ["USA"],
                },
              },
            ],
          },
        ],
        versionString: "1.0.0",
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
        versionString: undefined,
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: undefined,
          versionString: undefined,
        },
      });
    });

    it("should create UPDATE_VERSION_METADATA action when copyright changes", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2023 Old Company",
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2024 New Company",
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: "© 2024 New Company",
          versionString: undefined,
        },
      });
    });

    it("should create UPDATE_VERSION_METADATA action when copyright is added", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2024 New Company",
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: "© 2024 New Company",
          versionString: undefined,
        },
      });
    });

    it("should create UPDATE_VERSION_METADATA action when copyright is removed", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2024 Old Company",
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: undefined,
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: undefined,
          versionString: undefined,
        },
      });
    });

    it("should create UPDATE_VERSION_METADATA action when versionString changes", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "1.0.0",
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "2.0.0",
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: undefined,
          versionString: "2.0.0",
        },
      });
    });

    it("should create UPDATE_VERSION_METADATA action when both copyright and versionString change", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2023 Old Company",
        versionString: "1.0.0",
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        copyright: "© 2024 New Company",
        versionString: "2.0.0",
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_VERSION_METADATA",
        payload: {
          copyright: "© 2024 New Company",
          versionString: "2.0.0",
        },
      });
    });

    it("should create CREATE_APP_LOCALIZATION action when localization is added", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            description: "Test app description",
            keywords: "test, app",
            whatsNew: "New features added",
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_APP_LOCALIZATION",
        payload: {
          localization: {
            locale: "en-US",
            name: "Test App",
            description: "Test app description",
            keywords: "test, app",
            whatsNew: "New features added",
          },
        },
      });
    });

    it("should create UPDATE_APP_LOCALIZATION action when localization is updated", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            description: "Old description",
            keywords: "old, keywords",
          },
        ],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            description: "New description",
            keywords: "new, keywords",
            whatsNew: "Updated features",
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_LOCALIZATION",
        payload: {
          locale: "en-US",
          versionChanges: {
            description: "New description",
            keywords: "new, keywords",
            whatsNew: "Updated features",
          },
          appInfoChanges: {},
        },
      });
    });

    it("should create DELETE_APP_LOCALIZATION action when localization is removed", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            description: "Test description",
          },
        ],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        localizations: [],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_APP_LOCALIZATION",
        payload: {
          locale: "en-US",
        },
      });
    });

    it("should include whatsNew in updates when version string changes, even if content is identical", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "1.0.0",
        primaryLocale: "en-US",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            whatsNew: "Bug fixes",
          },
          {
            locale: "en-GB",
            name: "Test App",
            whatsNew: "Bug fixes",
          },
        ],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "1.1.0",
        primaryLocale: "en-US",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            whatsNew: "Bug fixes",
          },
          {
            locale: "en-GB",
            name: "Test App",
            // whatsNew omitted, should inherit from en-US via removeShortcuts
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);

      // Should have UPDATE_VERSION_METADATA and UPDATE_APP_LOCALIZATION for both en-US and en-GB
      // en-US has explicit whatsNew
      // en-GB inherits whatsNew from en-US via removeShortcuts, so it also has "Bug fixes"
      // Since version changed, both should be updated
      expect(plan.length).toBe(3);

      const updateLocActionUS = plan.find(
        (a) =>
          a.type === "UPDATE_APP_LOCALIZATION" && a.payload.locale === "en-US"
      );
      expect(updateLocActionUS).toBeDefined();
      expect(updateLocActionUS?.payload).toEqual({
        locale: "en-US",
        versionChanges: {
          whatsNew: "Bug fixes",
        },
        appInfoChanges: {},
      });

      const updateLocActionGB = plan.find(
        (a) =>
          a.type === "UPDATE_APP_LOCALIZATION" && a.payload.locale === "en-GB"
      );
      expect(updateLocActionGB).toBeDefined();
      expect(updateLocActionGB?.payload).toEqual({
        locale: "en-GB",
        versionChanges: {
          whatsNew: "Bug fixes", // Inherited from en-US
        },
        appInfoChanges: {},
      });
    });

    it("should NOT include whatsNew in updates when version string is same and content is identical", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "1.0.0",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            whatsNew: "Bug fixes",
          },
        ],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "test-app",
        versionString: "1.0.0",
        localizations: [
          {
            locale: "en-US",
            name: "Test App",
            whatsNew: "Bug fixes",
          },
        ],
      };

      const plan = diffWithShortcutsRemoved(currentState, desiredState);
      expect(plan).toHaveLength(0);
    });
  });

  describe("Basic diff functionality", () => {
    it("should return an empty plan when both states are empty", () => {
      const plan = diff(EMPTY_STATE, EMPTY_STATE);
      expect(plan).toEqual([]);
    });

    it("should throw an error if schema versions mismatch", () => {
      const currentState = { ...EMPTY_STATE, schemaVersion: "1.0.0" };
      const desiredState = { ...EMPTY_STATE, schemaVersion: "2.0.0" };
      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(/Schema version mismatch/);
    });

    it("should throw an error if app IDs mismatch", () => {
      const currentState = { ...EMPTY_STATE, appId: "app1" };
      const desiredState = { ...EMPTY_STATE, appId: "app2" };
      expect(() =>
        diffWithShortcutsRemoved(currentState, desiredState)
      ).toThrow(/App ID mismatch/);
    });
  });
});
