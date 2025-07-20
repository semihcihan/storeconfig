import { diff } from "./diff-service";
import {
  AppStoreModelSchema,
  LocalizationSchema,
  PriceSchema,
  SubscriptionGroupLocalizationSchema,
  SubscriptionSchema,
  IntroductoryOfferSchema,
  PromotionalOfferSchema,
} from "../models/app-store";
import { CreateSubscriptionPriceAction } from "../models/diff-plan";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Localization = z.infer<typeof LocalizationSchema>;
type Price = z.infer<typeof PriceSchema>;
type SubscriptionGroupLocalization = z.infer<
  typeof SubscriptionGroupLocalizationSchema
>;
type Subscription = z.infer<typeof SubscriptionSchema>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;
type PromotionalOffer = z.infer<typeof PromotionalOfferSchema>;

const EMPTY_STATE: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "com.example.app",
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
      priceSchedule: {
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
          prices: [{ territory: "USA", price: "9.99" }],
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
          promotionalOffers: [
            {
              id: "promo1",
              referenceName: "Promo 1",
              type: "FREE_TRIAL",
              duration: "THREE_DAYS",
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

describe("diff-service", () => {
  describe("diff", () => {
    it("should return an empty plan when both states are empty", () => {
      const plan = diff(EMPTY_STATE, EMPTY_STATE);
      expect(plan).toEqual([]);
    });

    it("should throw an error if schema versions mismatch", () => {
      const currentState = { ...EMPTY_STATE, schemaVersion: "1.0.0" };
      const desiredState = { ...EMPTY_STATE, schemaVersion: "2.0.0" };
      expect(() => diff(currentState, desiredState)).toThrow(
        /Schema version mismatch/
      );
    });

    it("should throw an error if app IDs mismatch", () => {
      const currentState = { ...EMPTY_STATE, appId: "app1" };
      const desiredState = { ...EMPTY_STATE, appId: "app2" };
      expect(() => diff(currentState, desiredState)).toThrow(/App ID mismatch/);
    });

    it("should create a plan to update app availability", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        availableTerritories: ["USA", "CAN"],
      };
      const plan = diff(currentState, desiredState);
      const appAvailabilityAction = plan.find(
        (a) => a.type === "UPDATE_APP_AVAILABILITY"
      );
      expect(appAvailabilityAction).toEqual({
        type: "UPDATE_APP_AVAILABILITY",
        payload: {
          availableTerritories: ["USA", "CAN"],
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

      const plan = diff(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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
          ...MOCK_STATE_1.pricing!,
          prices: [],
        },
      };

      const plan = diff(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);
      const action = plan.find((a) => a.type === "UPDATE_APP_PRICING");
      expect(action).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);

      // Should have UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action with both changes
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN", // Changing base territory
          prices: [], // Deleting all prices
        },
      };

      const plan = diff(currentState, desiredState);

      // Should have one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);
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
        prices: [{ territory: "USA", price: "4.99" }],
        localizations: [
          {
            locale: "en-US",
            name: "New Subscription 2",
            description: "This is a new subscription",
          },
        ],
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

      const plan = diff(currentState, desiredState);
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
              localization: newSubscription.localizations[0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub2",
              changes: {
                addedPrices: newSubscription.prices,
                updatedPrices: [],
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
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          priceSchedule: MOCK_STATE_1.inAppPurchases![0].priceSchedule,
          changes: {
            addedPrices: MOCK_STATE_1.inAppPurchases![0].priceSchedule!.prices,
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
      expect(plan[3]).toEqual({
        type: "UPDATE_IAP_AVAILABILITY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          availability: MOCK_STATE_1.inAppPurchases![0].availability,
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

      const plan = diff(currentState, desiredState);
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
        locale: "de",
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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
            priceSchedule: {
              ...(MOCK_STATE_1.inAppPurchases![0].priceSchedule || {
                baseTerritory: "USA",
                prices: [],
              }),
              baseTerritory: "CAN",
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          priceSchedule: {
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
            priceSchedule: {
              ...(MOCK_STATE_1.inAppPurchases![0].priceSchedule || {
                baseTerritory: "USA",
                prices: [],
              }),
              prices: [
                ...(MOCK_STATE_1.inAppPurchases![0].priceSchedule?.prices ||
                  []),
                newPrice,
              ],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          priceSchedule: {
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
            priceSchedule: {
              baseTerritory: "USA",
              prices: [],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICING",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          priceSchedule: {
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

      const plan = diff(currentState, desiredState);
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

    it("should create a plan to update the availability of an IAP when it is not specified in current state", () => {
      const currentState: AppStoreModel = JSON.parse(
        JSON.stringify(MOCK_STATE_1)
      );
      if (currentState.inAppPurchases && currentState.inAppPurchases[0]) {
        delete (currentState.inAppPurchases[0] as any).availability;
      }

      const desiredState: AppStoreModel = MOCK_STATE_1;

      const plan = diff(currentState, desiredState);
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

      expect(() => diff(currentState, desiredState)).toThrow(
        "Subscription group with reference name 'group1' cannot be deleted. Subscription groups cannot be removed once created."
      );
    });

    it("should create a plan to create a subscription group", () => {
      const currentState = EMPTY_STATE;
      const desiredState = MOCK_STATE_1;
      const plan = diff(currentState, desiredState);

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

      expect(() => diff(currentState, desiredState)).toThrow(
        "Subscription group with reference name 'group1' cannot be deleted. Subscription groups cannot be removed once created."
      );
    });

    it("should create a plan to add a localization to a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const newLocalization: SubscriptionGroupLocalization = {
        locale: "de",
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(6); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + CREATE_SUBSCRIPTION_PRICE + CREATE_INTRODUCTORY_OFFER + CREATE_PROMOTIONAL_OFFER + UPDATE_SUBSCRIPTION_AVAILABILITY
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
              localization: newSubscription.localizations[0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub2",
              changes: {
                addedPrices: newSubscription.prices,
                updatedPrices: [],
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
            type: "CREATE_PROMOTIONAL_OFFER",
            payload: {
              subscriptionProductId: "sub2",
              offer: newSubscription.promotionalOffers![0],
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

      expect(() => diff(currentState, desiredState)).toThrow(
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

      const plan = diff(currentState, desiredState);
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
        locale: "de",
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
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                    .localizations,
                  newLocalization,
                ],
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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
        prices: [{ territory: "USA", price: "1.99" }],
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

      const plan = diff(currentState, desiredState);
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

    it("should create a plan to delete and recreate promotional offers when they change", () => {
      const currentState = MOCK_STATE_1;
      const newOffers: PromotionalOffer[] = [
        {
          id: "promo2",
          referenceName: "Promo 2",
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "USA", price: "4.99" }],
        },
      ];
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                promotionalOffers: newOffers,
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(2); // 1 delete, 1 create
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "DELETE_PROMOTIONAL_OFFER",
            payload: {
              subscriptionProductId: "sub1",
              offerId: "promo1",
            },
          },
          {
            type: "CREATE_PROMOTIONAL_OFFER",
            payload: {
              subscriptionProductId: "sub1",
              offer: newOffers[0],
            },
          },
        ])
      );
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
                availability: {
                  availableInNewTerritories: false,
                  availableTerritories: ["USA", "CAN"],
                },
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
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
      }

      const desiredState: AppStoreModel = MOCK_STATE_1;

      const plan = diff(currentState, desiredState);

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
                prices: [
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                    .prices,
                  newPrice,
                ],
              },
            ],
          },
        ],
      };
      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          changes: {
            addedPrices: [newPrice],
            updatedPrices: [],
          },
        },
      });
    });

    it("should throw an error when trying to delete a subscription price", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                prices: [],
              },
            ],
          },
        ],
      };
      expect(() => diff(currentState, desiredState)).toThrow(
        "Cannot delete pricing for territory 'USA' in subscription 'sub1'. Subscriptions must maintain pricing for all territories."
      );
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
                prices: [updatedPrice],
              },
            ],
          },
        ],
      };
      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          changes: {
            addedPrices: [],
            updatedPrices: [updatedPrice],
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
                prices: [
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                    .prices,
                ],
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(0);
    });

    it("should not create a plan when states are identical", () => {
      const plan = diff(MOCK_STATE_1, MOCK_STATE_1);
      expect(plan).toEqual([]);
    });

    describe("Subscription pricing territory deletion prevention", () => {
      it("should throw an error when trying to delete a single territory from subscription pricing", () => {
        const currentState = MOCK_STATE_1;
        const desiredState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  prices: [], // Remove all prices (which includes USA)
                },
              ],
            },
          ],
        };
        expect(() => diff(currentState, desiredState)).toThrow(
          "Cannot delete pricing for territory 'USA' in subscription 'sub1'. Subscriptions must maintain pricing for all territories."
        );
      });

      it("should throw an error when trying to delete multiple territories from subscription pricing", () => {
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
                  prices: [
                    { territory: "USA", price: "9.99" },
                    { territory: "CAN", price: "12.99" },
                    { territory: "GBR", price: "8.99" },
                  ],
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA", "CAN", "GBR"],
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
                  prices: [
                    { territory: "USA", price: "9.99" },
                    // Removed CAN and GBR
                  ],
                },
              ],
            },
          ],
        };

        expect(() => diff(currentState, desiredState)).toThrow(
          "Cannot delete pricing for territory 'CAN' in subscription 'sub1'. Subscriptions must maintain pricing for all territories."
        );
      });

      it("should throw an error when trying to delete territory from subscription with multiple prices", () => {
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
                  prices: [
                    { territory: "USA", price: "9.99" },
                    { territory: "CAN", price: "12.99" },
                  ],
                  localizations: [
                    {
                      locale: "en-US",
                      name: "Subscription 1",
                      description: "This is Subscription 1",
                    },
                  ],
                  availability: {
                    availableInNewTerritories: true,
                    availableTerritories: ["USA", "CAN"],
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
                  prices: [
                    { territory: "USA", price: "9.99" },
                    // Removed CAN
                  ],
                },
              ],
            },
          ],
        };

        expect(() => diff(currentState, desiredState)).toThrow(
          "Cannot delete pricing for territory 'CAN' in subscription 'sub1'. Subscriptions must maintain pricing for all territories."
        );
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
                  prices: [
                    ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .prices,
                    { territory: "CAN", price: "12.99" },
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            changes: {
              addedPrices: [{ territory: "CAN", price: "12.99" }],
              updatedPrices: [],
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
                  prices: [
                    { territory: "USA", price: "10.99" }, // Updated price
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            changes: {
              addedPrices: [],
              updatedPrices: [{ territory: "USA", price: "10.99" }],
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
                  prices: [
                    { territory: "USA", price: "10.99" }, // Updated price
                    { territory: "CAN", price: "12.99" }, // New territory
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "CREATE_SUBSCRIPTION_PRICE",
          payload: {
            subscriptionProductId: "sub1",
            changes: {
              addedPrices: [{ territory: "CAN", price: "12.99" }],
              updatedPrices: [{ territory: "USA", price: "10.99" }],
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
                  prices: [
                    ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .prices,
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
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
                  prices: [{ territory: "USA", price: "9.99" }],
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
                  prices: [{ territory: "USA", price: "99.99" }],
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
                  prices: [{ territory: "USA", price: "9.99" }],
                },
                {
                  ...currentState.subscriptionGroups![0].subscriptions[1],
                  prices: [], // Remove pricing from sub2
                },
              ],
            },
          ],
        };

        expect(() => diff(currentState, desiredState)).toThrow(
          "Cannot delete pricing for territory 'USA' in subscription 'sub2'. Subscriptions must maintain pricing for all territories."
        );
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
                  prices: [
                    { territory: "USA", price: "10.99" }, // Updated price
                    { territory: "CAN", price: "12.99" }, // New territory
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload).toHaveProperty("subscriptionProductId");
        expect(action.payload).toHaveProperty("changes");
        expect(action.payload.changes).toHaveProperty("addedPrices");
        expect(action.payload.changes).toHaveProperty("updatedPrices");

        // Verify deletedTerritories is NOT present
        expect(action.payload.changes).not.toHaveProperty("deletedTerritories");

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
                  prices: [
                    ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
                      .prices,
                    { territory: "CAN", price: "12.99" },
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload.changes).not.toHaveProperty("deletedTerritories");
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
                  prices: [
                    { territory: "USA", price: "10.99" }, // Updated price only
                  ],
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);

        const action = plan[0] as CreateSubscriptionPriceAction;
        expect(action.type).toBe("CREATE_SUBSCRIPTION_PRICE");
        expect(action.payload.changes).not.toHaveProperty("deletedTerritories");
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
                  prices: [{ territory: "USA", price: "9.99" }],
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
                  prices: [{ territory: "USA", price: "99.99" }],
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

        expect(() => diff(currentState, desiredState)).toThrow(
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
                  prices: [{ territory: "USA", price: "9.99" }],
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
                  prices: [{ territory: "USA", price: "99.99" }],
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

        expect(() => diff(currentState, desiredState)).toThrow(
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
                  prices: [{ territory: "USA", price: "9.99" }],
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
                  prices: [{ territory: "USA", price: "99.99" }],
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
        expect(() => diff(currentState, desiredState)).not.toThrow();

        const plan = diff(currentState, desiredState);
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
                  prices: [{ territory: "USA", price: "19.99" }], // Different content
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
                  prices: [{ territory: "USA", price: "29.99" }], // Different content
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
        expect(() => diff(currentState, desiredState)).not.toThrow();

        const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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
          prices: [{ territory: "USA", price: "4.99" }],
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

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(3); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_PRICE + UPDATE_SUBSCRIPTION_AVAILABILITY
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
                  addedPrices: newSubscription.prices,
                  updatedPrices: [],
                },
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
          prices: [], // No prices
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 4",
              description: "This is Subscription 4",
            },
          ],
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

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(3); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + UPDATE_SUBSCRIPTION_AVAILABILITY
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
                localization: newSubscription.localizations[0],
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
          prices: [{ territory: "USA", price: "4.99" }],
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 5",
              description: "This is Subscription 5",
            },
          ],
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

        const plan = diff(currentState, desiredState);
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
                localization: newSubscription.localizations[0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub5",
                changes: {
                  addedPrices: newSubscription.prices,
                  updatedPrices: [],
                },
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
          prices: [{ territory: "USA", price: "4.99" }],
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 6",
              description: "This is Subscription 6",
            },
            {
              locale: "de",
              name: "Abonnement 6",
              description: "Dies ist Abonnement 6",
            },
          ],
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

        const plan = diff(currentState, desiredState);
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
                localization: newSubscription.localizations[0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_LOCALIZATION",
              payload: {
                subscriptionProductId: "sub6",
                localization: newSubscription.localizations[1],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub6",
                changes: {
                  addedPrices: newSubscription.prices,
                  updatedPrices: [],
                },
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
          prices: [
            { territory: "USA", price: "4.99" },
            { territory: "CAN", price: "5.99" },
          ],
          localizations: [
            {
              locale: "en-US",
              name: "Subscription 7",
              description: "This is Subscription 7",
            },
          ],
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

        const plan = diff(currentState, desiredState);
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
                localization: newSubscription.localizations[0],
              },
            },
            {
              type: "CREATE_SUBSCRIPTION_PRICE",
              payload: {
                subscriptionProductId: "sub7",
                changes: {
                  addedPrices: newSubscription.prices,
                  updatedPrices: [],
                },
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

        const plan = diff(currentState, desiredState);
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

        const plan = diff(currentState, desiredState);
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

        const plan = diff(currentState, desiredState);
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

        expect(() => diff(currentState, desiredState)).toThrow(
          /Subscription period for subscription sub1 cannot be changed once created/
        );
      });

      it("should not create a plan when no changes are made", () => {
        const currentState = MOCK_STATE_1;
        const desiredState = MOCK_STATE_1; // Same state

        const plan = diff(currentState, desiredState);
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

        const plan = diff(currentState, desiredState);
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

        const plan = diff(currentState, desiredState);
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

        const plan = diff(currentState, desiredState);
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

    describe("Complex subscription scenarios", () => {
      it("should create a plan for creating multiple subscriptions in the same group", () => {
        const currentState = MOCK_STATE_1;
        const newSubscription1: Subscription = {
          productId: "sub8",
          referenceName: "Subscription 8",
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH",
          familySharable: false,
          prices: [{ territory: "USA", price: "4.99" }],
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
          prices: [{ territory: "USA", price: "49.99" }],
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

        const plan = diff(currentState, desiredState);
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
          prices: [{ territory: "USA", price: "4.99" }],
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

        const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

      const plan = diff(currentState, desiredState);
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

    it("should create a plan to add a promotional offer when none existed", () => {
      const currentState: AppStoreModel = JSON.parse(
        JSON.stringify(MOCK_STATE_1)
      );
      delete currentState.subscriptionGroups![0].subscriptions[0]
        .promotionalOffers;

      const desiredState = MOCK_STATE_1;

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_PROMOTIONAL_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          offer:
            MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
              .promotionalOffers![0],
        },
      });
    });

    it("should create a plan to remove all promotional offers", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                promotionalOffers: [],
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_PROMOTIONAL_OFFER",
        payload: {
          subscriptionProductId: "sub1",
          offerId:
            MOCK_STATE_1.subscriptionGroups![0].subscriptions[0]
              .promotionalOffers![0].id,
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
        prices: [{ territory: "USA", price: "4.99" }],
        localizations: [
          {
            locale: "en-US",
            name: "Subscription 5b",
            description: "This is Subscription 5b",
          },
        ],
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

      const plan = diff(currentState, desiredState);

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
              localization: newSubscription.localizations[0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub5b",
              changes: {
                addedPrices: newSubscription.prices,
                updatedPrices: [],
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
        prices: [], // Empty prices array
        localizations: [
          {
            locale: "en-US",
            name: "Subscription 5c",
            description: "This is Subscription 5c",
          },
        ],
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

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(3); // CREATE_SUBSCRIPTION + CREATE_SUBSCRIPTION_LOCALIZATION + UPDATE_SUBSCRIPTION_AVAILABILITY (no CREATE_SUBSCRIPTION_PRICE)
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
              localization: newSubscription.localizations[0],
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
                    prices: [
                      { territory: "USA", price: "0.99" },
                      { territory: "DEU", price: "0.89" },
                    ],
                    availableTerritories: ["USA", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
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
                    prices: [
                      { territory: "USA", price: "0.99" },
                      { territory: "GBR", price: "0.79" },
                    ],
                    availableTerritories: ["USA", "GBR"],
                  },
                  {
                    type: "PAY_UP_FRONT",
                    duration: "ONE_MONTH",
                    prices: [
                      { territory: "USA", price: "1.99" },
                      { territory: "DEU", price: "1.89" },
                    ],
                    availableTerritories: ["USA", "DEU"],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
        "Multiple introductory offers found for territory 'USA' in subscription 'sub1'. Only one offer per territory is allowed."
      );
    });
  });
});

describe("Optional field detection - App pricing bug", () => {
  describe("Real-world scenario: fetch.json vs apply.json", () => {
    it("should detect all differences between fetch.json (no pricing) and apply.json (with pricing)", () => {
      // Simulate the actual fetch.json content
      const fetchState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
        // No pricing field
      };

      // Simulate the actual apply.json content
      const applyState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { price: "1.99", territory: "USA" },
            { price: "19.99", territory: "TUR" },
          ],
        },
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const plan = diff(fetchState, applyState);

      // This is the main test case - should NOT be empty
      expect(plan.length).toBeGreaterThan(0);

      // Should contain exactly one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
            baseTerritory: "USA",
            prices: [
              { price: "1.99", territory: "USA" },
              { price: "19.99", territory: "TUR" },
            ],
          },
          changes: {
            addedPrices: [
              { price: "1.99", territory: "USA" },
              { price: "19.99", territory: "TUR" },
            ],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should detect when pricing changes from undefined to defined with multiple territories", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
        // pricing is undefined (like fetch.json)
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "1.99" },
            { territory: "TUR", price: "19.99" },
          ],
        },
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const plan = diff(currentState, desiredState);

      // Should not be empty - this is the main bug
      expect(plan.length).toBeGreaterThan(0);

      // Should contain exactly one UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_APP_PRICING",
        payload: {
          priceSchedule: {
            baseTerritory: "USA",
            prices: [
              { territory: "USA", price: "1.99" },
              { territory: "TUR", price: "19.99" },
            ],
          },
          changes: {
            addedPrices: [
              { territory: "USA", price: "1.99" },
              { territory: "TUR", price: "19.99" },
            ],
            updatedPrices: [],
            deletedTerritories: [],
          },
        },
      });
    });

    it("should throw an error when trying to remove all pricing (going from defined to undefined)", () => {
      const currentState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "1.99" },
            { territory: "TUR", price: "19.99" },
          ],
        },
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const desiredState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "1615187332",
        availableTerritories: [],
        inAppPurchases: [],
        subscriptionGroups: [],
        // pricing is undefined (removed)
      };

      // Should throw an error because you can't remove all pricing
      expect(() => diff(currentState, desiredState)).toThrow(
        /Cannot remove all pricing from an app/
      );
    });
  });
});

describe("Subscription and IAP validation constraints", () => {
  describe("Subscription period validation", () => {
    it("should throw an error when trying to change subscription period", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                subscriptionPeriod: "ONE_MONTH",
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
                subscriptionPeriod: "ONE_YEAR",
              },
            ],
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
        /Subscription period for subscription sub1 cannot be changed once created/
      );
    });

    it("should allow subscription period to remain the same", () => {
      const currentState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                subscriptionPeriod: "ONE_MONTH",
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
                subscriptionPeriod: "ONE_MONTH", // Same period
                referenceName: "Updated Name", // Different field
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION",
        payload: {
          productId: "sub1",
          changes: {
            referenceName: "Updated Name",
          },
        },
      });
    });
  });

  describe("Family sharing validation", () => {
    describe("Subscription family sharing", () => {
      it("should throw an error when trying to turn off family sharing for subscription", () => {
        const currentState: AppStoreModel = {
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

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  ...currentState.subscriptionGroups![0].subscriptions[0],
                  familySharable: false,
                },
              ],
            },
          ],
        };

        expect(() => diff(currentState, desiredState)).toThrow(
          /Family sharing cannot be turned off for subscription sub1 once it has been enabled/
        );
      });

      it("should allow turning on family sharing for subscription", () => {
        const currentState: AppStoreModel = {
          ...MOCK_STATE_1,
          subscriptionGroups: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0],
              subscriptions: [
                {
                  ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                  familySharable: false,
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
                  familySharable: true,
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
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

      it("should allow family sharing to remain the same for subscription", () => {
        const currentState: AppStoreModel = {
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

        const desiredState: AppStoreModel = {
          ...currentState,
          subscriptionGroups: [
            {
              ...currentState.subscriptionGroups![0],
              subscriptions: [
                {
                  ...currentState.subscriptionGroups![0].subscriptions[0],
                  familySharable: true, // Same value
                  referenceName: "Updated Name", // Different field
                },
              ],
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_SUBSCRIPTION",
          payload: {
            productId: "sub1",
            changes: {
              referenceName: "Updated Name",
            },
          },
        });
      });
    });

    describe("IAP family sharing", () => {
      it("should throw an error when trying to turn off family sharing for IAP", () => {
        const currentState: AppStoreModel = {
          ...MOCK_STATE_1,
          inAppPurchases: [
            {
              ...MOCK_STATE_1.inAppPurchases[0],
              familySharable: true,
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          inAppPurchases: [
            {
              ...currentState.inAppPurchases[0],
              familySharable: false,
            },
          ],
        };

        expect(() => diff(currentState, desiredState)).toThrow(
          /Family sharing cannot be turned off for in-app purchase iap1 once it has been enabled/
        );
      });

      it("should allow turning on family sharing for IAP", () => {
        const currentState: AppStoreModel = {
          ...MOCK_STATE_1,
          inAppPurchases: [
            {
              ...MOCK_STATE_1.inAppPurchases[0],
              familySharable: false,
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          inAppPurchases: [
            {
              ...currentState.inAppPurchases[0],
              familySharable: true,
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_IN_APP_PURCHASE",
          payload: {
            productId: "iap1",
            changes: {
              familySharable: true,
            },
          },
        });
      });

      it("should allow family sharing to remain the same for IAP", () => {
        const currentState: AppStoreModel = {
          ...MOCK_STATE_1,
          inAppPurchases: [
            {
              ...MOCK_STATE_1.inAppPurchases[0],
              familySharable: true,
            },
          ],
        };

        const desiredState: AppStoreModel = {
          ...currentState,
          inAppPurchases: [
            {
              ...currentState.inAppPurchases[0],
              familySharable: true, // Same value
              referenceName: "Updated Name", // Different field
            },
          ],
        };

        const plan = diff(currentState, desiredState);
        expect(plan).toHaveLength(1);
        expect(plan[0]).toEqual({
          type: "UPDATE_IN_APP_PURCHASE",
          payload: {
            productId: "iap1",
            changes: {
              referenceName: "Updated Name",
            },
          },
        });
      });
    });
  });
});

describe("Introductory offer duration validation", () => {
  it("should throw an error for invalid PAY_UP_FRONT duration", () => {
    const currentState = MOCK_STATE_1;
    const desiredState: AppStoreModel = {
      ...MOCK_STATE_1,
      subscriptionGroups: [
        {
          ...MOCK_STATE_1.subscriptionGroups![0],
          subscriptions: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              subscriptionPeriod: "ONE_MONTH", // Keep same period
              introductoryOffers: [
                {
                  type: "PAY_UP_FRONT",
                  duration: "THREE_DAYS", // Invalid for ONE_MONTH PAY_UP_FRONT (not in valid list)
                  prices: [{ territory: "USA", price: "4.99" }],
                  availableTerritories: ["USA"],
                },
              ],
            },
          ],
        },
      ],
    };

    expect(() => diff(currentState, desiredState)).toThrow(
      /Invalid duration 'THREE_DAYS' for PAY_UP_FRONT offer in subscription 'sub1' with period 'ONE_MONTH'/
    );
  });

  it("should allow valid FREE_TRIAL duration", () => {
    const currentState = MOCK_STATE_1;
    const desiredState: AppStoreModel = {
      ...MOCK_STATE_1,
      subscriptionGroups: [
        {
          ...MOCK_STATE_1.subscriptionGroups![0],
          subscriptions: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              subscriptionPeriod: "ONE_MONTH",
              introductoryOffers: [
                {
                  type: "FREE_TRIAL",
                  duration: "ONE_YEAR", // Valid for ONE_MONTH subscription (changed from ONE_WEEK)
                  availableTerritories: ["USA"],
                },
              ],
            },
          ],
        },
      ],
    };

    const plan = diff(currentState, desiredState);
    expect(plan.length).toBeGreaterThan(0);
    // Should not throw an error
  });

  it("should throw an error for invalid PAY_AS_YOU_GO numberOfPeriods", () => {
    const currentState = MOCK_STATE_1;
    const desiredState: AppStoreModel = {
      ...MOCK_STATE_1,
      subscriptionGroups: [
        {
          ...MOCK_STATE_1.subscriptionGroups![0],
          subscriptions: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              subscriptionPeriod: "ONE_MONTH", // Keep same period
              introductoryOffers: [
                {
                  type: "PAY_AS_YOU_GO",
                  numberOfPeriods: 13, // Invalid for ONE_MONTH subscription (only 1-12 are valid)
                  prices: [{ territory: "USA", price: "4.99" }],
                  availableTerritories: ["USA"],
                },
              ],
            },
          ],
        },
      ],
    };

    expect(() => diff(currentState, desiredState)).toThrow(
      /Invalid numberOfPeriods '13' for PAY_AS_YOU_GO offer in subscription 'sub1' with period 'ONE_MONTH'/
    );
  });

  it("should allow valid PAY_UP_FRONT duration", () => {
    const currentState = MOCK_STATE_1;
    const desiredState: AppStoreModel = {
      ...MOCK_STATE_1,
      subscriptionGroups: [
        {
          ...MOCK_STATE_1.subscriptionGroups![0],
          subscriptions: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              subscriptionPeriod: "ONE_MONTH",
              introductoryOffers: [
                {
                  type: "PAY_UP_FRONT",
                  duration: "ONE_MONTH", // Valid for ONE_MONTH subscription
                  prices: [{ territory: "USA", price: "4.99" }],
                  availableTerritories: ["USA"],
                },
              ],
            },
          ],
        },
      ],
    };

    const plan = diff(currentState, desiredState);
    expect(plan.length).toBeGreaterThan(0);
    // Should not throw an error
  });

  it("should allow valid PAY_AS_YOU_GO numberOfPeriods", () => {
    const currentState = MOCK_STATE_1;
    const desiredState: AppStoreModel = {
      ...MOCK_STATE_1,
      subscriptionGroups: [
        {
          ...MOCK_STATE_1.subscriptionGroups![0],
          subscriptions: [
            {
              ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
              subscriptionPeriod: "ONE_MONTH",
              introductoryOffers: [
                {
                  type: "PAY_AS_YOU_GO",
                  numberOfPeriods: 6, // Valid for ONE_MONTH subscription
                  prices: [{ territory: "USA", price: "4.99" }],
                  availableTerritories: ["USA"],
                },
              ],
            },
          ],
        },
      ],
    };

    const plan = diff(currentState, desiredState);
    expect(plan.length).toBeGreaterThan(0);
    // Should not throw an error
  });
});
