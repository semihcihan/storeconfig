import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import * as fs from "fs";
import * as readline from "readline";
import { logger } from "../utils/logger";
import type { AppStoreModel } from "../models/app-store";

// Mock dependencies
jest.mock("fs");
jest.mock("readline");
jest.mock("../utils/logger");
jest.mock("../helpers/validation-helpers");
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

const mockFs = jest.mocked(fs);
const mockReadline = jest.mocked(readline);
const mockLogger = jest.mocked(logger);

// Import the service after mocking
import {
  pricingItemsExist,
  startInteractivePricing,
  applyPricing,
} from "./set-price-service";
import { collectPricingItems } from "../set-price/item-selection";
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
  const testInputFile = "test-file.json";
  const mockRl = {
    question: jest.fn(),
    close: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.readFileSync.mockReturnValue("{}");
    mockReadline.createInterface.mockReturnValue(mockRl as any);

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

    it("updates IAP priceSchedule in place with USA base territory", async () => {
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
      expect(state.inAppPurchases![0].priceSchedule).toEqual({
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

    it("updates subscription pricing using equalizations", async () => {
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
      expect(state.subscriptionGroups![0].subscriptions[0].prices).toEqual([
        { price: "0.99", territory: "USA" },
        { price: "0.89", territory: "GBR" },
      ]);
    });

    it("updates promotional offer pricing using equalizations", async () => {
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
        expect(promotionalOffer.prices).toEqual([
          { price: "0.49", territory: "USA" },
          { price: "0.89", territory: "GBR" },
        ]);
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

  describe("pricingItemsExist", () => {
    it("should throw error when no items exist", () => {
      const emptyState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
      };

      expect(() => pricingItemsExist(emptyState)).toThrow(
        "Input file must contain at least one item (app, in-app purchase, or subscription)"
      );
    });

    it("should not throw when in-app purchases exist", () => {
      const stateWithIAP: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        inAppPurchases: [
          {
            productId: "com.example.premium",
            type: "NON_CONSUMABLE",
            referenceName: "Premium Feature",
            familySharable: false,
            localizations: [
              {
                locale: "en-US",
                name: "Premium Feature",
                description: "Premium feature description",
              },
            ],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: "worldwide",
            },
          },
        ],
      };

      expect(() => pricingItemsExist(stateWithIAP)).not.toThrow();
    });

    it("should not throw when subscription groups exist", () => {
      const stateWithSubscriptions: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        subscriptionGroups: [
          {
            referenceName: "Premium Subscription",
            localizations: [
              {
                locale: "en-US",
                name: "Premium Subscription",
                customName: null,
              },
            ],
            subscriptions: [
              {
                productId: "com.example.monthly",
                referenceName: "Monthly Plan",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [
                  {
                    locale: "en-US",
                    name: "Monthly Plan",
                    description: "Monthly subscription plan",
                  },
                ],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: "worldwide",
                },
              },
            ],
          },
        ],
      };

      expect(() => pricingItemsExist(stateWithSubscriptions)).not.toThrow();
    });
  });

  describe("startInteractivePricing", () => {
    it("should handle item selection for app with pricing", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        pricing: {
          baseTerritory: "USA",
          prices: [{ price: "0.99", territory: "USA" }],
        },
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));
      const answers = ["1", "0.99", "1"]; // select app, base price, strategy=Apple
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        const next = answers.shift();
        callback(next);
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "app",
        id: "123456789",
        name: "App",
        offerType: undefined,
      });
    });

    it("should handle item selection for in-app purchase", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        inAppPurchases: [
          {
            productId: "com.example.premium",
            type: "NON_CONSUMABLE",
            referenceName: "Premium Feature",
            familySharable: false,
            localizations: [
              {
                locale: "en-US",
                name: "Premium Feature",
                description: "Premium feature description",
              },
            ],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: "worldwide",
            },
          },
        ],
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));
      const answers = ["2", "0.99", "2"]; // select iap (now 2nd item), base price, strategy=PurchasingPower
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        const next = answers.shift();
        callback(next);
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "inAppPurchase",
        id: "com.example.premium",
        name: "Premium Feature",
        offerType: undefined,
      });
    });

    it("should handle item selection for paid introductory offer (FREE_TRIAL excluded)", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        subscriptionGroups: [
          {
            referenceName: "Premium Subscription",
            localizations: [
              {
                locale: "en-US",
                name: "Premium Subscription",
                customName: null,
              },
            ],
            subscriptions: [
              {
                productId: "com.example.monthly",
                referenceName: "Monthly Plan",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [
                  {
                    locale: "en-US",
                    name: "Monthly Plan",
                    description: "Monthly subscription plan",
                  },
                ],
                introductoryOffers: [
                  {
                    type: "PAY_UP_FRONT",
                    duration: "ONE_MONTH",
                    prices: [
                      { price: "0.99", territory: "USA" },
                      { price: "0.99", territory: "TUR" },
                    ],
                  },
                ],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: "worldwide",
                },
              },
            ],
          },
        ],
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));
      const answers = ["3", "0.99", "1"]; // select offer (now 3rd item), base price, strategy=Apple
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        const next = answers.shift();
        callback(next);
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "offer",
        id: "com.example.monthly",
        name: "PAY_UP_FRONT Introductory Offer",
        offerType: "PAY_UP_FRONT",
      });
    });

    it("should handle app selection when no other items are available for pricing", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        // No pricing, no IAPs, no subscriptions - only app will be available
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));
      const answers = ["1", "0.99", "1"]; // select app (1st item), base price, strategy=Apple
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        const next = answers.shift();
        callback(next);
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "app",
        id: "123456789",
        name: "App",
        offerType: undefined,
      });
    });

    it("should restore file from backup on error", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        inAppPurchases: [
          {
            productId: "com.example.premium",
            type: "NON_CONSUMABLE",
            referenceName: "Premium Feature",
            familySharable: false,
            localizations: [
              {
                locale: "en-US",
                name: "Premium Feature",
                description: "Premium feature description",
              },
            ],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: "worldwide",
            },
          },
        ],
      };

      const originalContent = JSON.stringify(appState);
      mockFs.readFileSync.mockReturnValue(originalContent);
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        throw new Error("Test error");
      });

      await expect(
        startInteractivePricing({
          inputFile: testInputFile,
          appStoreState: appState,
        })
      ).rejects.toThrow("Test error");

      // Should have attempted to restore the file
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testInputFile,
        originalContent
      );
    });

    it("should show nearest Apple prices in ascending order when entered price is invalid", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        pricing: {
          baseTerritory: "USA",
          prices: [{ price: "0.99", territory: "USA" }],
        },
      };

      // Override available price points for this test
      jest.mocked(fetchAppPricePoints).mockResolvedValue({
        data: [
          { id: "price-3", attributes: { customerPrice: "2.99" } },
          { id: "price-1", attributes: { customerPrice: "0.99" } },
          { id: "price-2", attributes: { customerPrice: "1.99" } },
        ],
      } as any);

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));
      const answers = ["1", "1.50", "0.99", "1"]; // select app, invalid price, valid price, strategy
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        const next = answers.shift();
        callback(next);
      });

      await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      const infoCalls = mockLogger.info.mock.calls.map((c) => String(c[0]));
      const nearestLine = infoCalls.find((m) =>
        m.includes("Closest available prices:")
      );
      expect(nearestLine).toBeDefined();
      // Ensure ascending numeric order - the output shows only 2 prices
      expect(nearestLine).toContain("0.99 | 1.99");
    });
  });

  describe("collectPricingItems", () => {
    it("excludes FREE_TRIAL offers from selectable items", () => {
      const state: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "app-123",
        subscriptionGroups: [
          {
            referenceName: "Group A",
            localizations: [
              { locale: "en-US", name: "Group A", customName: null },
            ],
            subscriptions: [
              {
                productId: "sub.monthly",
                referenceName: "Monthly",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [
                  { locale: "en-US", name: "Monthly", description: "desc" },
                ],
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: "worldwide",
                  },
                  {
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 1,
                    prices: [{ price: "0.99", territory: "USA" }],
                  },
                ],
                promotionalOffers: [
                  {
                    id: "promo-free",
                    referenceName: "Promo Free",
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                  },
                ],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: "worldwide",
                },
              },
            ],
          },
        ],
      };

      const items = collectPricingItems(state as any);
      const names = items.map((i) => i.name);
      expect(names.some((n) => n.includes("FREE_TRIAL"))).toBe(false);
      expect(names.some((n) => n.includes("PAY_AS_YOU_GO"))).toBe(true);
    });

    it("should handle error when file restoration fails", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        inAppPurchases: [
          {
            productId: "com.example.premium",
            type: "NON_CONSUMABLE",
            referenceName: "Premium Feature",
            familySharable: false,
            localizations: [
              {
                locale: "en-US",
                name: "Premium Feature",
                description: "Premium feature description",
              },
            ],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: "worldwide",
            },
          },
        ],
      };

      const originalContent = JSON.stringify(appState);
      mockFs.readFileSync.mockReturnValue(originalContent);
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        throw new Error("Test error");
      });

      // Mock file restoration to fail
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("File write error");
      });

      await expect(
        startInteractivePricing({
          inputFile: testInputFile,
          appStoreState: appState,
        })
      ).rejects.toThrow("Test error");

      // Should have attempted to restore the file
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        testInputFile,
        originalContent
      );

      // Should log the restoration failure
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to restore from memory backup: Error: File write error"
      );
    });

    it("should handle error when findSubscriptionInState returns undefined", async () => {
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
      };

      await expect(
        applyPricing(state, {
          appId: "app-1",
          selectedItem: {
            type: "subscription",
            id: "non-existent-subscription",
            name: "Non-existent Subscription",
          },
          basePricePoint: { id: "price-7", price: "0.99" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow(
        "Subscription with ID non-existent-subscription not found"
      );
    });

    it("should handle error when findOfferInState returns undefined", async () => {
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
      };

      await expect(
        applyPricing(state, {
          appId: "app-1",
          selectedItem: {
            type: "offer",
            id: "non-existent-offer",
            name: "Non-existent Offer",
          },
          basePricePoint: { id: "price-8", price: "0.49" },
          pricingStrategy: "apple",
        })
      ).rejects.toThrow("Offer with ID non-existent-offer not found");
    });
  });
});
