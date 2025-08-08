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
import type { AppStoreModel } from "../utils/validation-helpers";

// Mock dependencies
jest.mock("fs");
jest.mock("readline");
jest.mock("../utils/logger");
jest.mock("../utils/validation-helpers");

const mockFs = jest.mocked(fs);
const mockReadline = jest.mocked(readline);
const mockLogger = jest.mocked(logger);

// Import the service after mocking
import {
  pricingItemsExist,
  startInteractivePricing,
} from "./set-price-prompt-service";

describe("set-price-prompt-service", () => {
  const testInputFile = "test-file.json";
  const mockRl = {
    question: jest.fn(),
    close: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.readFileSync.mockReturnValue("{}");
    mockReadline.createInterface.mockReturnValue(mockRl as any);
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
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        callback("1"); // Select the app
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "app",
        id: "123456789",
        name: "App (ID: 123456789)",
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
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        callback("1"); // Select the IAP
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

    it("should handle item selection for introductory offer", async () => {
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
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: "worldwide",
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
      mockRl.question.mockImplementation((prompt: any, callback: any) => {
        callback("2"); // Select the introductory offer
      });

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: appState,
      });

      expect(result.selectedItem).toEqual({
        type: "offer",
        id: "com.example.monthly",
        name: "FREE_TRIAL Introductory Offer",
        offerType: "FREE_TRIAL",
      });
    });

    it("should throw error when no items are available for pricing", async () => {
      const appState: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: "123456789",
        // No pricing, no IAPs, no subscriptions
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(appState));

      await expect(
        startInteractivePricing({
          inputFile: testInputFile,
          appStoreState: appState,
        })
      ).rejects.toThrow(
        "No items available for pricing. Please ensure your input file contains items with pricing information."
      );
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
  });
});
