import { diff } from "./diff-service";
import {
  AppStoreModelSchema,
  LocalizationSchema,
  PriceSchema,
  SubscriptionGroupLocalizationSchema,
  IntroductoryOfferSchema,
  PromotionalOfferSchema,
} from "../models/app-store";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Localization = z.infer<typeof LocalizationSchema>;
type Price = z.infer<typeof PriceSchema>;
type SubscriptionGroupLocalization = z.infer<
  typeof SubscriptionGroupLocalizationSchema
>;
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
              type: "FREE",
              duration: "ONE_WEEK",
              availableTerritories: ["USA"],
            },
          ],
          promotionalOffers: [
            {
              id: "promo1",
              referenceName: "Promo 1",
              type: "FREE",
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

    it("should create UPDATE_APP_PRICING with all types of changes", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "3.99" };
      const updatedPrice: Price = { territory: "USA", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          baseTerritory: "CAN", // Changing base territory
          prices: [updatedPrice, newPrice], // Both updating existing and adding new (implicitly deleting nothing)
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

    it("should generate only UPDATE_APP_PRICING when adding price without base territory change", () => {
      const currentState = MOCK_STATE_1;
      const newPrice: Price = { territory: "CAN", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          // baseTerritory stays "USA"
          prices: [...MOCK_STATE_1.pricing!.prices, newPrice],
        },
      };

      const plan = diff(currentState, desiredState);

      // Should have only UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
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

    it("should generate only UPDATE_APP_PRICING when updating price without base territory change", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "5.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          // baseTerritory stays "USA"
          prices: [updatedPrice],
        },
      };

      const plan = diff(currentState, desiredState);

      // Should have only UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
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

    it("should generate only UPDATE_APP_PRICING when deleting price without base territory change", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        pricing: {
          ...MOCK_STATE_1.pricing!,
          // baseTerritory stays "USA"
          prices: [], // Deleting the only price
        },
      };

      const plan = diff(currentState, desiredState);

      // Should have only UPDATE_APP_PRICING action
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
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

    it("should throw an error if an in-app purchase type is changed", () => {
      const currentState = MOCK_STATE_1;
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            type: "NON_CONSUMABLE",
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
        `The type for in-app purchase iap1 cannot be changed. Current: CONSUMABLE, Desired: NON_CONSUMABLE.`
      );
    });

    it("should throw error when trying to delete an in-app purchase", () => {
      const currentState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          {
            productId: "iap1",
            referenceName: "IAP 1",
            type: "CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
          {
            productId: "iap2",
            referenceName: "IAP 2",
            type: "NON_CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          // Only iap2, missing iap1 - should throw
          {
            productId: "iap2",
            referenceName: "IAP 2",
            type: "NON_CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
        `In-app purchase with productId 'iap1' cannot be deleted. In-app purchases cannot be removed once created.`
      );
    });

    it("should throw error when type is changed for existing productId", () => {
      const currentState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          {
            productId: "iap1",
            referenceName: "IAP 1",
            type: "CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...currentState,
        inAppPurchases: [
          {
            productId: "iap1", // Same productId
            referenceName: "IAP 1",
            type: "NON_CONSUMABLE", // But different type - should fail
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      expect(() => diff(currentState, desiredState)).toThrow(
        `The type for in-app purchase iap1 cannot be changed. Current: CONSUMABLE, Desired: NON_CONSUMABLE.`
      );
    });

    it("should allow adding new IAPs while keeping all existing ones", () => {
      const currentState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          {
            productId: "iap1",
            referenceName: "IAP 1",
            type: "CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          // Keep existing IAP
          {
            productId: "iap1",
            referenceName: "IAP 1",
            type: "CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
          // Add new IAP
          {
            productId: "iap2",
            referenceName: "IAP 2",
            type: "NON_CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      // Should not throw - all existing IAPs are preserved
      expect(() => diff(currentState, desiredState)).not.toThrow();

      const plan = diff(currentState, desiredState);
      expect(
        plan.some((action) => action.type === "CREATE_IN_APP_PURCHASE")
      ).toBe(true);
    });

    it("should allow updating existing IAP content while keeping same type", () => {
      const currentState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          {
            productId: "iap1",
            referenceName: "IAP 1",
            type: "CONSUMABLE",
            familySharable: false,
            priceSchedule: { baseTerritory: "USA", prices: [] },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        ],
      };

      const desiredState: AppStoreModel = {
        ...EMPTY_STATE,
        inAppPurchases: [
          {
            productId: "iap1", // Same productId
            referenceName: "Updated IAP 1", // Different content
            type: "CONSUMABLE", // Same type - OK
            familySharable: true, // Different content
            priceSchedule: {
              baseTerritory: "CAN",
              prices: [{ territory: "CAN", price: "1.99" }],
            }, // Different content
            localizations: [
              { locale: "en-US", name: "New Name", description: "New Desc" },
            ], // Different content
            availability: {
              availableInNewTerritories: false,
              availableTerritories: ["CAN"],
            }, // Different content
          },
        ],
      };

      // Should not throw - content can change, type is the same
      expect(() => diff(currentState, desiredState)).not.toThrow();

      const plan = diff(currentState, desiredState);
      expect(
        plan.some((action) => action.type === "UPDATE_IN_APP_PURCHASE")
      ).toBe(true);
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

    it.skip("should create a plan to update a price in an IAP price schedule", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "1.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            priceSchedule: {
              baseTerritory: "USA",
              prices: [updatedPrice],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_PRICE",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          price: updatedPrice,
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
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_SUBSCRIPTION",
        payload: {
          groupReferenceName: "group1",
          subscription: newSubscription,
        },
      });
    });

    it("should create a plan to delete a subscription from a group", () => {
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

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_SUBSCRIPTION",
        payload: {
          productId: "sub1",
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
                subscriptionPeriod: "ONE_YEAR",
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
            subscriptionPeriod: "ONE_YEAR",
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
          price: newPrice,
        },
      });
    });

    it("should create a plan to delete a subscription price", () => {
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
      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          territory: "USA",
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
                prices: [updatedPrice],
              },
            ],
          },
        ],
      };
      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_SUBSCRIPTION_PRICE",
        payload: {
          subscriptionProductId: "sub1",
          price: updatedPrice,
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
