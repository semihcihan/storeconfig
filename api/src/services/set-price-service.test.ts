import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";

// Mock dependencies
jest.mock("@semihcihan/shared", () => {
  const actual = jest.requireActual("@semihcihan/shared");
  return Object.assign({}, actual, {
    logger: {
      debug: jest.fn(),
    },
  });
});
jest.mock("../domains/pricing/api-client", () => ({
  fetchAppPricePoints: jest.fn(),
}));
jest.mock("../domains/in-app-purchases/api-client", () => ({
  fetchInAppPurchases: jest.fn(),
  fetchIAPPricePoints: jest.fn(),
}));
jest.mock("../domains/subscriptions/api-client", () => ({
  fetchAllSubscriptionPricePoints: jest.fn(),
  fetchSubscriptionGroups: jest.fn(),
}));
jest.mock("../domains/subscriptions/pricing-service", () => ({
  buildSubscriptionPricesWithEqualizations: jest.fn(),
}));

const mockLogger = jest.mocked(logger);

// Import the service after mocking
import { applyPricing } from "./set-price-service";
import { fetchAppPricePoints } from "../domains/pricing/api-client";
import {
  fetchInAppPurchases,
  fetchIAPPricePoints,
} from "../domains/in-app-purchases/api-client";
import {
  fetchAllSubscriptionPricePoints,
  fetchSubscriptionGroups,
} from "../domains/subscriptions/api-client";
import { buildSubscriptionPricesWithEqualizations } from "../domains/subscriptions/pricing-service";

describe("set-price-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default API client mocks
    jest.mocked(fetchAppPricePoints).mockResolvedValue({
      data: [
        { id: "price-1", attributes: { customerPrice: "0.99" } },
        { id: "price-2", attributes: { customerPrice: "1.99" } },
      ],
    } as any);

    jest.mocked(fetchInAppPurchases).mockResolvedValue({
      data: [
        {
          id: "iap-1",
          attributes: { productId: "com.example.premium" },
        },
      ],
    } as any);
    jest.mocked(fetchIAPPricePoints).mockResolvedValue({
      data: [{ id: "iap-price-1", attributes: { customerPrice: "0.99" } }],
    } as any);

    jest.mocked(fetchSubscriptionGroups).mockResolvedValue({
      data: [],
      included: [
        {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "com.example.monthly" },
        },
      ],
      links: { self: "" },
    } as any);
    jest.mocked(fetchAllSubscriptionPricePoints).mockResolvedValue({
      data: [{ id: "sub-price-1", attributes: { customerPrice: "0.99" } }],
    } as any);

    // Mock the equalizations function
    jest.mocked(buildSubscriptionPricesWithEqualizations).mockResolvedValue([
      { price: "0.99", territory: "USA" },
      { price: "0.89", territory: "GBR" },
    ]);
  });

  describe("applyPricing", () => {
    it("updates app pricing in place with USA base territory", async () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
      } as any;

      const result = await applyPricing(state, {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "0.99" },
        pricingStrategy: "apple",
      });

      expect(result).toBe(state);
      expect(state.pricing).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "0.99", territory: "USA" }],
      });
    });

    it("updates IAP pricing in place with USA base territory", async () => {
      const productId = "com.example.premium";
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
        inAppPurchases: [
          {
            productId,
            type: "NON_CONSUMABLE",
            referenceName: "Premium Feature",
            familySharable: false,
            localizations: [
              { locale: "en-US", name: "Premium Feature", description: "" },
            ],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: "worldwide",
            },
          },
        ],
      } as any;

      const result = await applyPricing(state, {
        appId: "app-1",
        selectedItem: { type: "inAppPurchase", id: productId, name: "Premium" },
        basePricePoint: { id: "price-2", price: "1.99" },
        pricingStrategy: "apple",
      });

      expect(result).toBe(state);
      expect(state.inAppPurchases![0].pricing).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "1.99", territory: "USA" }],
      });
    });

    it("throws when IAP is not found", async () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
        inAppPurchases: [],
      } as any;

      await expect(
        applyPricing(state, {
          appId: "app-1",
          selectedItem: { type: "inAppPurchase", id: "missing", name: "IAP" },
          basePricePoint: { id: "price-4", price: "0.99" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow("No in-app purchases found in the state");
    });

    it("throws for subscription when not found", async () => {
      const baseState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
      } as any;

      await expect(
        applyPricing(baseState, {
          appId: "app-1",
          selectedItem: { type: "subscription", id: "sub", name: "Sub" },
          basePricePoint: { id: "price-5", price: "0.99" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow("Subscription with ID sub not found");
    });

    it("throws for offer when not found", async () => {
      const baseState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
      } as any;

      await expect(
        applyPricing(baseState, {
          appId: "app-1",
          selectedItem: { type: "offer", id: "offer", name: "Offer" },
          basePricePoint: { id: "price-6", price: "0.99" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow("Offer with ID offer not found");
    });

    it("updates subscription pricing without using equalizations", async () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
        subscriptionGroups: [
          {
            referenceName: "Premium",
            localizations: [],
            subscriptions: [
              {
                productId: "com.example.monthly",
                referenceName: "Monthly Premium",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: "worldwide",
                },
              } as any,
            ],
          },
        ],
      } as any;

      const result = await applyPricing(state, {
        appId: "app-1",
        selectedItem: {
          type: "subscription",
          id: "com.example.monthly",
          name: "Monthly Premium",
        },
        basePricePoint: { id: "price-7", price: "0.99" },
        pricingStrategy: "apple",
      });

      expect(result).toBe(state);
      expect(state.subscriptionGroups![0].subscriptions[0].pricing).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "0.99", territory: "USA" }],
      });
    });

    it("updates promotional offer pricing without using equalizations", async () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
        subscriptionGroups: [
          {
            referenceName: "Premium",
            localizations: [],
            subscriptions: [
              {
                productId: "com.example.monthly",
                referenceName: "Monthly Premium",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                promotionalOffers: [
                  {
                    id: "promo-1",
                    referenceName: "Intro Offer",
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 3,
                    prices: [],
                  } as any,
                ],
                availability: {
                  availableInNewTerritories: true,
                },
              } as any,
            ],
          },
        ],
      } as any;

      const result = await applyPricing(state, {
        appId: "app-1",
        selectedItem: { type: "offer", id: "promo-1", name: "Intro Offer" },
        basePricePoint: { id: "price-8", price: "0.49" },
        pricingStrategy: "apple",
      });

      expect(result).toBe(state);
      const promotionalOffer =
        state.subscriptionGroups![0].subscriptions[0].promotionalOffers![0];
      if (
        promotionalOffer.type === "PAY_AS_YOU_GO" ||
        promotionalOffer.type === "PAY_UP_FRONT"
      ) {
        expect(promotionalOffer.pricing).toEqual({
          baseTerritory: "USA",
          prices: [{ price: "0.49", territory: "USA" }],
        });
      } else {
        throw new Error("Expected promotional offer to have prices");
      }
    });

    it("throws for FREE_TRIAL promotional offers", async () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-1",
        subscriptionGroups: [
          {
            referenceName: "Premium",
            localizations: [],
            subscriptions: [
              {
                productId: "com.example.monthly",
                referenceName: "Monthly Premium",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                promotionalOffers: [
                  {
                    id: "promo-2",
                    referenceName: "Free Trial",
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                  } as any,
                ],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: "worldwide",
                },
              } as any,
            ],
          },
        ],
      } as any;

      await expect(
        applyPricing(state, {
          appId: "app-1",
          selectedItem: { type: "offer", id: "promo-2", name: "Free Trial" },
          basePricePoint: { id: "price-9", price: "0.00" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow("FREE_TRIAL promotional offers do not support pricing");
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
