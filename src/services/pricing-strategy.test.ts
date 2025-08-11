import {
  createPricingStrategy,
  ApplePricingStrategy,
  PurchasingPowerPricingStrategy,
} from "./pricing-strategy";
import { buildSubscriptionPricesWithEqualizations } from "../domains/subscriptions/pricing-service";
import type { AppStoreModel } from "../utils/validation-helpers";
import type { PricingRequest } from "../models/pricing-request";
import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";

type TerritoryCode = z.infer<typeof TerritoryCodeSchema>;

jest.mock("../domains/subscriptions/pricing-service", () => ({
  buildSubscriptionPricesWithEqualizations: jest.fn(),
}));

// Mock fs and path modules
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock("path", () => ({
  join: jest.fn(),
}));

// Mock the price point fetcher
jest.mock("../set-price/base-price/price-point-fetcher", () => ({
  fetchTerritoryPricePointsForSelectedItem: jest.fn(),
}));

describe("PricingStrategy", () => {
  const mockFs = require("fs");
  const mockPath = require("path");
  const mockBuildSubscriptionPricesWithEqualizations = jest.mocked(
    buildSubscriptionPricesWithEqualizations
  );

  const mockAppStoreState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: "app-1",
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockReturnValue("/mock/path/currencies.json");

    // Default mock for price point fetcher
    const {
      fetchTerritoryPricePointsForSelectedItem,
    } = require("../set-price/base-price/price-point-fetcher");
    jest.mocked(fetchTerritoryPricePointsForSelectedItem).mockResolvedValue([
      { id: "price-1", price: "0.99" },
      { id: "price-2", price: "1.99" },
      { id: "price-3", price: "2.99" },
    ]);
  });

  describe("createPricingStrategy", () => {
    it("should create ApplePricingStrategy for 'apple' strategy", () => {
      const strategy = createPricingStrategy("apple");
      expect(strategy).toBeInstanceOf(ApplePricingStrategy);
    });

    it("should create PurchasingPowerPricingStrategy for 'purchasingPower' strategy", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify([
          {
            id: "USA",
            currency: "USD",
            value: 1.0,
            localCurrency: "USD",
            usdRate: 1.0,
          },
        ])
      );

      const strategy = createPricingStrategy("purchasingPower");
      expect(strategy).toBeInstanceOf(PurchasingPowerPricingStrategy);
    });

    it("should throw error for unknown strategy", () => {
      expect(() => createPricingStrategy("unknown" as any)).toThrow(
        "Unknown pricing strategy: unknown"
      );
    });
  });

  describe("ApplePricingStrategy", () => {
    let strategy: ApplePricingStrategy;

    beforeEach(() => {
      strategy = new ApplePricingStrategy();
    });

    it("should return single price for app with USA as base territory", async () => {
      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "0.99" },
        pricingStrategy: "apple",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(1);
      expect(prices[0]).toEqual({
        price: "0.99",
        territory: "USA",
      });
    });

    it("should return single price for in-app purchase with USA as base territory", async () => {
      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "inAppPurchase", id: "iap-1", name: "IAP" },
        basePricePoint: { id: "price-1", price: "1.99" },
        pricingStrategy: "apple",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(1);
      expect(prices[0]).toEqual({
        price: "1.99",
        territory: "USA",
      });
    });

    it("should build subscription prices using equalizations", async () => {
      const mockPrices = [
        { price: "0.99", territory: "USA" as TerritoryCode },
        { price: "0.89", territory: "GBR" as TerritoryCode },
      ];
      mockBuildSubscriptionPricesWithEqualizations.mockResolvedValue(
        mockPrices
      );

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "subscription", id: "sub-1", name: "Sub" },
        basePricePoint: { id: "price-1", price: "0.99" },
        pricingStrategy: "apple",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toEqual(mockPrices);
      expect(mockBuildSubscriptionPricesWithEqualizations).toHaveBeenCalledWith(
        "price-1"
      );
    });

    it("should build offer prices using equalizations", async () => {
      const mockPrices = [
        { price: "0.49", territory: "USA" as TerritoryCode },
        { price: "0.44", territory: "GBR" as TerritoryCode },
      ];
      mockBuildSubscriptionPricesWithEqualizations.mockResolvedValue(
        mockPrices
      );

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "offer", id: "offer-1", name: "Offer" },
        basePricePoint: { id: "price-1", price: "0.49" },
        pricingStrategy: "apple",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toEqual(mockPrices);
      expect(mockBuildSubscriptionPricesWithEqualizations).toHaveBeenCalledWith(
        "price-1"
      );
    });
  });

  describe("PurchasingPowerPricingStrategy", () => {
    let strategy: PurchasingPowerPricingStrategy;
    const mockFs = require("fs");
    const mockPath = require("path");

    beforeEach(() => {
      jest.clearAllMocks();
      mockPath.join.mockReturnValue("/mock/path/currencies.json");
    });

    it("should load currencies from file on construction", () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "GBR",
          currency: "USD",
          value: 0.679372,
          localCurrency: "GBP",
          usdRate: 0.743916,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        "/mock/path/currencies.json"
      );
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        "/mock/path/currencies.json",
        "utf8"
      );
    });

    it("should throw error when loading currencies file fails", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });

      expect(() => new PurchasingPowerPricingStrategy()).toThrow(
        "Failed to load currencies"
      );
    });

    it("should throw error when currencies file contains invalid JSON", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue("invalid json");

      expect(() => new PurchasingPowerPricingStrategy()).toThrow(
        "Failed to load currencies"
      );
    });

    it("should calculate prices for multiple territories", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "GBR",
          currency: "USD",
          value: 0.679372,
          localCurrency: "GBP",
          usdRate: 0.743916,
        },
        {
          id: "DEU",
          currency: "EUR",
          value: 0.713045,
          localCurrency: "EUR",
          usdRate: 0.858474,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
        minimumPrice: "0.50",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(3);

      const usaPrice = prices.find((p: any) => p.territory === "USA");
      const gbrPrice = prices.find((p: any) => p.territory === "GBR");
      const deuPrice = prices.find((p: any) => p.territory === "DEU");

      // USA: 1.00 * 1.0 = 1.00, snaps to nearest available: 1.99
      expect(usaPrice?.price).toBe("1.99");
      // GBR: 1.00 * 0.679372 = 0.68, snaps to nearest available: 0.99
      expect(gbrPrice?.price).toBe("0.99");
      // DEU: 1.00 * 0.713045 = 0.71, snaps to nearest available: 0.99
      expect(deuPrice?.price).toBe("0.99");
    });

    it("should skip territories with missing purchasing power data", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "AFG",
          currency: "USD",
          value: null,
          localCurrency: "AFN",
          usdRate: 68.587167,
        },
        {
          id: "BTN",
          currency: "USD",
          value: undefined,
          localCurrency: "BTN",
          usdRate: 87.624905,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(1);
      expect(prices[0].territory).toBe("USA");
    });

    it("should skip territories with invalid territory codes", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "INVALID_CODE",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(1);
      expect(prices[0].territory).toBe("USA");
    });

    it("should handle minimum price constraint", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "GBR",
          currency: "USD",
          value: 0.5,
          localCurrency: "GBP",
          usdRate: 0.743916,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
        minimumPrice: "0.75",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(2);

      const usaPrice = prices.find((p: any) => p.territory === "USA");
      const gbrPrice = prices.find((p: any) => p.territory === "GBR");

      // USA: 1.00 * 1.0 = 1.00, snaps to nearest available: 1.99
      expect(usaPrice?.price).toBe("1.99");
      // GBR: 1.00 * 0.5 = 0.5, but minimum is 0.75, so price should be 0.75, snaps to nearest available: 0.99
      expect(gbrPrice?.price).toBe("0.99");
    });

    it("should throw error for invalid base price format", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "invalid" },
        pricingStrategy: "purchasingPower",
      };

      await expect(
        strategy.getPrices(request, mockAppStoreState)
      ).rejects.toThrow("Invalid base price format");
    });

    it("should handle territories with missing local currency data", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
        {
          id: "GBR",
          currency: "USD",
          value: 0.679372,
          localCurrency: "GBP",
          usdRate: 0.743916,
        },
        {
          id: "DEU",
          currency: "UNKNOWN_CURRENCY",
          value: 0.5,
          localCurrency: "EUR",
          usdRate: 1.0,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
      };

      const prices = await strategy.getPrices(request, mockAppStoreState);

      expect(prices).toHaveLength(2);
      expect(prices.find((p: any) => p.territory === "DEU")).toBeUndefined();
    });

    it("should handle error when price point fetcher fails", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      // Mock the price point fetcher to throw an error
      const {
        fetchTerritoryPricePointsForSelectedItem,
      } = require("../set-price/base-price/price-point-fetcher");
      jest
        .mocked(fetchTerritoryPricePointsForSelectedItem)
        .mockRejectedValue(new Error("API Error"));

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
      };

      await expect(
        strategy.getPrices(request, mockAppStoreState)
      ).rejects.toThrow("Failed to find nearest valid price point");
    });

    it("should handle error when no price points are returned", async () => {
      const mockCurrencies = [
        {
          id: "USA",
          currency: "USD",
          value: 1.0,
          localCurrency: "USD",
          usdRate: 1.0,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      strategy = new PurchasingPowerPricingStrategy();

      // Mock the price point fetcher to return empty array
      const {
        fetchTerritoryPricePointsForSelectedItem,
      } = require("../set-price/base-price/price-point-fetcher");
      jest
        .mocked(fetchTerritoryPricePointsForSelectedItem)
        .mockResolvedValue([]);

      const request: PricingRequest = {
        appId: "app-1",
        selectedItem: { type: "app", id: "app-1", name: "App" },
        basePricePoint: { id: "price-1", price: "1.00" },
        pricingStrategy: "purchasingPower",
      };

      await expect(
        strategy.getPrices(request, mockAppStoreState)
      ).rejects.toThrow("Failed to find nearest valid price point");
    });

    it("should handle error when currencies file doesn't exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => new PurchasingPowerPricingStrategy()).toThrow(
        "Failed to load currencies"
      );
    });

    it("should handle error when currencies file path is invalid", () => {
      mockPath.join.mockReturnValue("/invalid/path/currencies.json");
      mockFs.existsSync.mockReturnValue(false);

      expect(() => new PurchasingPowerPricingStrategy()).toThrow(
        "Failed to load currencies"
      );
    });
  });
});
