import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { logger } from "../utils/logger";
import {
  getPricesForItem,
  analyzePricing,
  exportAnalysisToCSV,
  exportAnalysisToXLSX,
  exportAnalysis,
} from "./compare-price-service";
import type { AppStoreModel } from "../utils/validation-helpers";
import type { PricingItem } from "../models/pricing-request";
import type { TerritoryData } from "./pricing-strategy";

// Mock dependencies
jest.mock("../utils/logger");
jest.mock("../set-price/item-selection", () => ({
  collectPricingItems: jest.fn(),
}));
jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
}));
jest.mock("xlsx", () => ({
  utils: {
    book_new: jest.fn(() => ({ Sheets: {}, SheetNames: [] })),
    aoa_to_sheet: jest.fn(() => ({
      "!cols": [
        { width: 13 },
        { width: 13 },
        { width: 13 },
        { width: 13 },
        { width: 18 },
      ],
      "!freeze": { rows: 1 },
    })),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));
jest.mock("./pricing-strategy", () => ({
  BASE_TERRITORY: "USA",
}));

const mockLogger = jest.mocked(logger);

// Get the mocked function
import { collectPricingItems } from "../set-price/item-selection";
import * as XLSX from "xlsx";
import * as fs from "fs";
const mockCollectPricingItems = jest.mocked(collectPricingItems);
const mockXLSX = jest.mocked(XLSX);
const mockFs = jest.mocked(fs);

describe("compare-price-service", () => {
  const mockAppStoreData: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: "app-123",
    pricing: {
      baseTerritory: "USA" as const,
      prices: [
        { territory: "USA" as const, price: "0.99" },
        { territory: "GBR" as const, price: "0.79" },
        { territory: "CAN" as const, price: "1.29" },
      ],
    },
    inAppPurchases: [
      {
        productId: "iap-1",
        type: "CONSUMABLE",
        referenceName: "Test IAP",
        familySharable: false,
        priceSchedule: {
          baseTerritory: "USA" as const,
          prices: [
            { territory: "USA" as const, price: "1.99" },
            { territory: "GBR" as const, price: "1.59" },
          ],
        },
        localizations: [],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA", "GBR"],
        },
      },
    ],
    subscriptionGroups: [
      {
        referenceName: "Test Subscription",
        localizations: [],
        subscriptions: [
          {
            productId: "sub-1",
            referenceName: "Monthly Plan",
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            familySharable: false,
            prices: [
              { territory: "USA" as const, price: "9.99" },
              { territory: "GBR" as const, price: "7.99" },
            ],
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: ["USA", "GBR"],
            },
            introductoryOffers: [
              {
                type: "PAY_AS_YOU_GO",
                numberOfPeriods: 1,
                prices: [
                  { territory: "USA" as const, price: "4.99" },
                  { territory: "GBR" as const, price: "3.99" },
                ],
              },
            ],
            promotionalOffers: [
              {
                id: "promo-1",
                referenceName: "Promotional Offer",
                type: "PAY_AS_YOU_GO",
                numberOfPeriods: 1,
                prices: [
                  { territory: "USA" as const, price: "6.99" },
                  { territory: "GBR" as const, price: "5.59" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const mockCurrencies: TerritoryData[] = [
    { id: "USA", currency: "USD", localCurrency: "USD", usdRate: 1.0 },
    { id: "GBR", currency: "GBP", localCurrency: "GBP", usdRate: 0.8 },
    { id: "CAN", currency: "CAD", localCurrency: "CAD", usdRate: 1.35 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPricesForItem", () => {
    it("should return app pricing when item type is app", () => {
      const item: PricingItem = {
        type: "app",
        id: "app-123",
        name: "Test App",
      };

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([
        { territory: "USA", price: "0.99" },
        { territory: "GBR", price: "0.79" },
        { territory: "CAN", price: "1.29" },
      ]);
    });

    it("should return empty array when app has no pricing", () => {
      const appWithoutPricing: AppStoreModel = {
        ...mockAppStoreData,
        pricing: undefined,
      };

      const item: PricingItem = {
        type: "app",
        id: "app-123",
        name: "Test App",
      };

      const result = getPricesForItem(appWithoutPricing, item);

      expect(result).toEqual([]);
    });

    it("should return IAP pricing when item type is inAppPurchase", () => {
      const item: PricingItem = {
        type: "inAppPurchase",
        id: "iap-1",
        name: "Test IAP",
      };

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([
        { territory: "USA", price: "1.99" },
        { territory: "GBR", price: "1.59" },
      ]);
    });

    it("should return empty array when IAP has no priceSchedule", () => {
      const iapWithoutPricing = {
        ...mockAppStoreData.inAppPurchases![0],
        priceSchedule: undefined,
      };

      const appWithIapWithoutPricing: AppStoreModel = {
        ...mockAppStoreData,
        inAppPurchases: [iapWithoutPricing],
      };

      const item: PricingItem = {
        type: "inAppPurchase",
        id: "iap-1",
        name: "Test IAP",
      };

      const result = getPricesForItem(appWithIapWithoutPricing, item);

      expect(result).toEqual([]);
    });

    it("should return subscription pricing when item type is subscription", () => {
      const item: PricingItem = {
        type: "subscription",
        id: "sub-1",
        name: "Monthly Plan",
      };

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([
        { territory: "USA", price: "9.99" },
        { territory: "GBR", price: "7.99" },
      ]);
    });

    it("should return empty array when subscription is not found", () => {
      const item: PricingItem = {
        type: "subscription",
        id: "nonexistent-sub",
        name: "Nonexistent Subscription",
      };

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([]);
    });

    it("should return introductory offer pricing when item type is offer", () => {
      const item: PricingItem = {
        type: "offer",
        id: "sub-1",
        name: "PAY_AS_YOU_GO Introductory Offer",
        offerType: "PAY_AS_YOU_GO",
        parentName: "Monthly Plan",
      };

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([
        { territory: "USA", price: "4.99" },
        { territory: "GBR", price: "3.99" },
      ]);
    });

    it("should return promotional offer pricing when item type is offer", () => {
      // Create a subscription with only promotional offers (no introductory offers)
      const subscriptionWithOnlyPromo: AppStoreModel = {
        ...mockAppStoreData,
        subscriptionGroups: [
          {
            referenceName: "Test Subscription",
            localizations: [],
            subscriptions: [
              {
                productId: "sub-1",
                referenceName: "Monthly Plan",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [
                  { territory: "USA" as const, price: "9.99" },
                  { territory: "GBR" as const, price: "7.99" },
                ],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: ["USA", "GBR"],
                },
                promotionalOffers: [
                  {
                    id: "promo-1",
                    referenceName: "Promotional Offer",
                    type: "PAY_AS_YOU_GO",
                    numberOfPeriods: 1,
                    prices: [
                      { territory: "USA" as const, price: "6.99" },
                      { territory: "GBR" as const, price: "5.59" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const item: PricingItem = {
        type: "offer",
        id: "sub-1",
        name: "PAY_AS_YOU_GO Promotional Offer",
        offerType: "PAY_AS_YOU_GO",
        parentName: "Monthly Plan",
      };

      const result = getPricesForItem(subscriptionWithOnlyPromo, item);

      expect(result).toEqual([
        { territory: "USA", price: "6.99" },
        { territory: "GBR", price: "5.59" },
      ]);
    });

    it("should filter out FREE_TRIAL offers", () => {
      const appWithFreeTrial: AppStoreModel = {
        ...mockAppStoreData,
        subscriptionGroups: [
          {
            referenceName: "Test Subscription",
            localizations: [],
            subscriptions: [
              {
                productId: "sub-1",
                referenceName: "Monthly Plan",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [{ territory: "USA" as const, price: "9.99" }],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: ["USA"],
                },
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_MONTH",
                    availableTerritories: ["USA"],
                  },
                ],
              },
            ],
          },
        ],
      };

      const item: PricingItem = {
        type: "offer",
        id: "sub-1",
        name: "FREE_TRIAL Introductory Offer",
        offerType: "FREE_TRIAL",
        parentName: "Monthly Plan",
      };

      const result = getPricesForItem(appWithFreeTrial, item);

      expect(result).toEqual([]);
    });

    it("should return empty array for unknown item type", () => {
      const item = {
        type: "unknown" as any,
        id: "unknown-1",
        name: "Unknown Item",
      } as PricingItem;

      const result = getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([]);
    });
  });

  describe("analyzePricing", () => {
    beforeEach(() => {
      mockCollectPricingItems.mockReturnValue([
        {
          type: "app",
          id: "app-123",
          name: "Test App",
        },
      ]);
    });

    it("should analyze pricing for all items", () => {
      const result = analyzePricing(mockAppStoreData, mockCurrencies);

      expect(result).toHaveLength(1);
      expect(result[0].item.type).toBe("app");
      expect(result[0].item.id).toBe("app-123");
    });

    it("should calculate USD prices correctly for different currencies", () => {
      const result = analyzePricing(mockAppStoreData, mockCurrencies);

      // Verify the mock was called
      expect(mockCollectPricingItems).toHaveBeenCalledWith(mockAppStoreData);

      const appPrices = result[0].prices;
      expect(appPrices).toHaveLength(3);

      const usaPrice = appPrices.find((p) => p.territory === "USA");
      const gbrPrice = appPrices.find((p) => p.territory === "GBR");
      const canPrice = appPrices.find((p) => p.territory === "CAN");

      expect(usaPrice?.usdPrice).toBe(0.99); // USD: 0.99 * 1.0 = 0.99
      expect(usaPrice?.localPrice).toBe(0.99);
      expect(usaPrice?.localCurrency).toBe("USD");
      expect(usaPrice?.usdPercentage).toBe(100);

      expect(gbrPrice?.usdPrice).toBe(0.9875); // GBP: 0.79 / 0.8 = 0.9875
      expect(gbrPrice?.localPrice).toBe(0.79);
      expect(gbrPrice?.localCurrency).toBe("GBP");
      expect(gbrPrice?.usdPercentage).toBeCloseTo(99.75, 1);

      expect(canPrice?.usdPrice).toBeCloseTo(0.9555555555555556, 10); // CAD: 1.29 / 1.35 = 0.9555555555555556
      expect(canPrice?.localPrice).toBe(1.29);
      expect(canPrice?.localCurrency).toBe("CAD");
      expect(canPrice?.usdPercentage).toBeCloseTo(96.5, 1);
    });

    it("should throw error when base territory currency not found", () => {
      const currenciesWithoutUSA = mockCurrencies.filter((c) => c.id !== "USA");

      expect(() =>
        analyzePricing(mockAppStoreData, currenciesWithoutUSA)
      ).toThrow("Base territory currency not found in currency data for USA");
    });

    it("should handle items with no prices", () => {
      const appWithoutPricing: AppStoreModel = {
        ...mockAppStoreData,
        pricing: undefined,
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      mockCollectPricingItems.mockReturnValue([
        {
          type: "app",
          id: "app-123",
          name: "Test App",
        },
      ]);

      const result = analyzePricing(appWithoutPricing, mockCurrencies);

      expect(result).toHaveLength(0);
    });

    it("should calculate USD percentages correctly", () => {
      const result = analyzePricing(mockAppStoreData, mockCurrencies);

      const appPrices = result[0].prices;
      const usaPrice = appPrices.find((p) => p.territory === "USA");
      const gbrPrice = appPrices.find((p) => p.territory === "GBR");

      expect(usaPrice?.usdPrice).toBe(0.99);
      expect(gbrPrice?.usdPrice).toBe(0.9875);
    });
  });

  describe("exportAnalysisToCSV", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should export analysis to CSV with correct format", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
            {
              territory: "GBR",
              localPrice: 0.79,
              localCurrency: "GBP",
              usdPrice: 0.9875,
              usdPercentage: 99.75,
            },
          ],
        },
      ];

      exportAnalysisToCSV(mockAnalysis, "test-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining(
          "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)"
        ),
        "utf8"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining("Test App,USA,0.99,USD,0.99,100"),
        "utf8"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining("Test App,GBR,0.79,GBP,0.99,100"),
        "utf8"
      );
    });

    it("should handle empty analysis", () => {
      exportAnalysisToCSV([], "empty-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "empty-output.csv",
        "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)",
        "utf8"
      );
    });
  });

  describe("exportAnalysis", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should export to CSV when .csv extension is provided", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      exportAnalysis(mockAnalysis, "test-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining(
          "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)"
        ),
        "utf8"
      );
    });

    it("should export to XLSX when .xlsx extension is provided", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      exportAnalysis(mockAnalysis, "test-output.xlsx");

      expect(mockXLSX.utils.book_new).toHaveBeenCalled();
      expect(mockXLSX.writeFile).toHaveBeenCalledWith(
        expect.any(Object),
        "test-output.xlsx"
      );
    });

    it("should throw error for unsupported file format", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      expect(() => exportAnalysis(mockAnalysis, "test-output.txt")).toThrow(
        'Unsupported file format. Please use ".csv" or ".xlsx" extension: "test-output.txt"'
      );
    });

    it("should throw error for no file extension", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      expect(() => exportAnalysis(mockAnalysis, "test-output")).toThrow(
        'Unsupported file format. Please use ".csv" or ".xlsx" extension: "test-output"'
      );
    });
  });

  describe("exportAnalysisToXLSX", () => {
    const mockWorkbook = { Sheets: {}, SheetNames: [] };

    beforeEach(() => {
      mockXLSX.utils.book_new.mockReturnValue(mockWorkbook);
      mockXLSX.utils.aoa_to_sheet.mockReturnValue({
        "!cols": [
          { width: 13 },
          { width: 13 },
          { width: 13 },
          { width: 13 },
          { width: 18 },
        ],
        "!freeze": { rows: 1 },
      });
    });

    it("should export analysis to XLSX with correct format", () => {
      const mockAnalysis = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
            {
              territory: "GBR",
              localPrice: 0.79,
              localCurrency: "GBP",
              usdPrice: 0.9875,
              usdPercentage: 99.75,
            },
          ],
        },
      ];

      exportAnalysisToXLSX(mockAnalysis, "test-output.xlsx");

      expect(mockXLSX.utils.book_new).toHaveBeenCalled();
      expect(mockXLSX.utils.aoa_to_sheet).toHaveBeenCalledWith([
        [
          "Territory",
          "Local Price",
          "Local Currency",
          "USD Price",
          "Relative to USA (%)",
        ],
        ["USA", 0.99, "USD", 0.99, 100],
        ["GBR", 0.79, "GBP", 0.99, 100],
      ]);
      expect(mockXLSX.utils.book_append_sheet).toHaveBeenCalledWith(
        mockWorkbook,
        {
          "!cols": [
            { width: 13 },
            { width: 13 },
            { width: 13 },
            { width: 13 },
            { width: 18 },
          ],
          "!freeze": { rows: 1 },
        },
        "Test App"
      );
      expect(mockXLSX.writeFile).toHaveBeenCalledWith(
        mockWorkbook,
        "test-output.xlsx"
      );
    });

    it("should handle empty analysis", () => {
      exportAnalysisToXLSX([], "empty-output.xlsx");

      expect(mockXLSX.utils.book_new).toHaveBeenCalled();
      expect(mockXLSX.writeFile).toHaveBeenCalledWith(
        mockWorkbook,
        "empty-output.xlsx"
      );
    });
  });
});
