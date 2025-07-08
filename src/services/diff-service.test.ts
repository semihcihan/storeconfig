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
  inAppPurchases: [],
  subscriptionGroups: [],
};

const MOCK_STATE_1: AppStoreModel = {
  ...EMPTY_STATE,
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

    it("should create a plan to add an in-app purchase", () => {
      const desiredState = {
        ...EMPTY_STATE,
        inAppPurchases: MOCK_STATE_1.inAppPurchases,
      };
      const plan = diff(EMPTY_STATE, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_IN_APP_PURCHASE",
        payload: {
          inAppPurchase: MOCK_STATE_1.inAppPurchases![0],
        },
      });
    });

    it("should create a plan to delete an in-app purchase", () => {
      const currentState = {
        ...EMPTY_STATE,
        inAppPurchases: MOCK_STATE_1.inAppPurchases,
      };
      const plan = diff(currentState, EMPTY_STATE);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_IN_APP_PURCHASE",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
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
              ...MOCK_STATE_1.inAppPurchases![0].localizations,
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
              ...MOCK_STATE_1.inAppPurchases![0].priceSchedule,
              baseTerritory: "CAN",
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "UPDATE_IAP_BASE_TERRITORY",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          territory: "CAN",
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
              ...MOCK_STATE_1.inAppPurchases![0].priceSchedule,
              prices: [
                ...MOCK_STATE_1.inAppPurchases![0].priceSchedule.prices,
                newPrice,
              ],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_IAP_PRICE",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          price: newPrice,
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
              ...MOCK_STATE_1.inAppPurchases![0].priceSchedule,
              prices: [],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "DELETE_IAP_PRICE",
        payload: {
          productId: MOCK_STATE_1.inAppPurchases![0].productId,
          territory: "USA",
        },
      });
    });

    it("should create a plan to update a price in an IAP price schedule", () => {
      const currentState = MOCK_STATE_1;
      const updatedPrice: Price = { territory: "USA", price: "1.99" };
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        inAppPurchases: [
          {
            ...MOCK_STATE_1.inAppPurchases![0],
            priceSchedule: {
              ...MOCK_STATE_1.inAppPurchases![0].priceSchedule,
              prices: [updatedPrice],
            },
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(1);
      expect(plan[0]).toEqual({
        type: "CREATE_IAP_PRICE",
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

    it("should correctly identify a subscription group rename and diff its contents", () => {
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
      const plan = diff(currentState, desiredState);
      expect(plan).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "UPDATE_SUBSCRIPTION_GROUP",
            payload: {
              referenceName: "group1",
              changes: {
                referenceName: "group1_renamed",
              },
            },
          }),
          expect.objectContaining({
            type: "UPDATE_SUBSCRIPTION",
            payload: {
              productId: "sub1",
              changes: {
                groupLevel: 2,
              },
            },
          }),
        ])
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

    it("should create a plan to delete a subscription group", () => {
      const currentState = MOCK_STATE_1;
      const desiredState = EMPTY_STATE;
      const plan = diff(currentState, desiredState);

      // We expect a DELETE_SUBSCRIPTION_GROUP action.
      // The mock state also contains an IAP, so we filter for the group action.
      const groupAction = plan.find(
        (a) => a.type === "DELETE_SUBSCRIPTION_GROUP"
      );
      expect(groupAction).toEqual({
        type: "DELETE_SUBSCRIPTION_GROUP",
        payload: {
          referenceName: MOCK_STATE_1.subscriptionGroups![0].referenceName,
        },
      });
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
            customAppName: "Updated Custom Group 1",
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

    it("should create a plan to delete and recreate subscription prices when they change", () => {
      const currentState = MOCK_STATE_1;
      const newPrices: Price[] = [
        { territory: "USA", price: "10.99" },
        { territory: "CAN", price: "12.99" },
      ];
      const desiredState: AppStoreModel = {
        ...MOCK_STATE_1,
        subscriptionGroups: [
          {
            ...MOCK_STATE_1.subscriptionGroups![0],
            subscriptions: [
              {
                ...MOCK_STATE_1.subscriptionGroups![0].subscriptions[0],
                prices: newPrices,
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(3); // 1 delete, 2 creates
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "DELETE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub1",
              territory: "USA",
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub1",
              price: newPrices[0],
            },
          },
          {
            type: "CREATE_SUBSCRIPTION_PRICE",
            payload: {
              subscriptionProductId: "sub1",
              price: newPrices[1],
            },
          },
        ])
      );
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

    it("should create a plan to delete and recreate introductory offers when they change", () => {
      const currentState = MOCK_STATE_1;
      const newOffers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 3,
          prices: [{ territory: "USA", price: "1.99" }],
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
                introductoryOffers: newOffers,
              },
            ],
          },
        ],
      };

      const plan = diff(currentState, desiredState);
      expect(plan).toHaveLength(2); // 1 delete all, 1 create
      expect(plan).toEqual(
        expect.arrayContaining([
          {
            type: "DELETE_ALL_INTRODUCTORY_OFFERS",
            payload: {
              subscriptionProductId: "sub1",
            },
          },
          {
            type: "CREATE_INTRODUCTORY_OFFER",
            payload: {
              subscriptionProductId: "sub1",
              offer: newOffers[0],
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
  });
});
