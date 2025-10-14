import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import type {
  AppStoreModel,
  PricingItem,
  PricePointInfo,
} from "@semihcihan/shared";

// Mock dependencies
jest.mock("@semihcihan/shared", () => {
  const actual = jest.requireActual("@semihcihan/shared");
  return Object.assign({}, actual, {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  });
});
jest.mock("./item-selection", () => ({
  selectPricingItem: jest.fn(),
}));
jest.mock("./base-price-prompt", () => ({
  promptForBasePricePoint: jest.fn(),
}));
jest.mock("./strategy-prompt", () => ({
  promptForPricingStrategy: jest.fn(),
}));
jest.mock("./minimum-price-prompt", () => ({
  promptForMinimumPrice: jest.fn(),
}));

const mockLogger = jest.mocked(logger);

// Import the service after mocking
import { startInteractivePricing } from "./set-price-service";
import { selectPricingItem } from "./item-selection";
import { promptForBasePricePoint } from "./base-price-prompt";
import { promptForPricingStrategy } from "./strategy-prompt";
import { promptForMinimumPrice } from "./minimum-price-prompt";

const mockSelectPricingItem = jest.mocked(selectPricingItem);
const mockPromptForBasePricePoint = jest.mocked(promptForBasePricePoint);
const mockPromptForPricingStrategy = jest.mocked(promptForPricingStrategy);
const mockPromptForMinimumPrice = jest.mocked(promptForMinimumPrice);

describe("set-price-service", () => {
  const mockAppStoreData: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: "app-123",
    pricing: {
      baseTerritory: "USA" as const,
      prices: [
        { territory: "USA" as const, price: "0.99" },
        { territory: "GBR" as const, price: "0.79" },
      ],
    },
  };

  const mockFetchTerritoryPricePoints = jest.fn() as jest.MockedFunction<
    (
      selectedItem: PricingItem,
      appId: string,
      territoryId: string
    ) => Promise<PricePointInfo[]>
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mocks
    mockSelectPricingItem.mockResolvedValue({
      type: "app",
      id: "app-123",
      name: "Test App",
    } as PricingItem);

    mockPromptForBasePricePoint.mockResolvedValue({
      id: "price-1",
      price: "0.99",
    } as PricePointInfo);

    mockPromptForPricingStrategy.mockResolvedValue("apple" as any);
    mockPromptForMinimumPrice.mockResolvedValue(undefined);
  });

  describe("startInteractivePricing", () => {
    it("should handle successful interactive pricing flow", async () => {
      const result = await startInteractivePricing({
        appStoreState: mockAppStoreData,
        fetchTerritoryPricePointsForSelectedItem: mockFetchTerritoryPricePoints,
      });

      expect(result).toEqual({
        appId: "app-123",
        selectedItem: {
          type: "app",
          id: "app-123",
          name: "Test App",
          offerType: undefined,
        },
        basePricePoint: {
          id: "price-1",
          price: "0.99",
        },
        pricingStrategy: "apple",
        minimumPrice: undefined,
      });

      expect(mockSelectPricingItem).toHaveBeenCalledWith(mockAppStoreData);
      expect(mockPromptForBasePricePoint).toHaveBeenCalledWith(
        {
          type: "app",
          id: "app-123",
          name: "Test App",
        },
        mockAppStoreData,
        mockFetchTerritoryPricePoints
      );
      expect(mockPromptForPricingStrategy).toHaveBeenCalled();
      expect(mockPromptForMinimumPrice).toHaveBeenCalledWith("apple", "0.99");
    });

    it("should handle item selection for in-app purchase", async () => {
      mockSelectPricingItem.mockResolvedValue({
        type: "inAppPurchase",
        id: "iap-1",
        name: "Test IAP",
      } as PricingItem);

      const result = await startInteractivePricing({
        appStoreState: mockAppStoreData,
        fetchTerritoryPricePointsForSelectedItem: mockFetchTerritoryPricePoints,
      });

      expect(result.selectedItem).toEqual({
        type: "inAppPurchase",
        id: "iap-1",
        name: "Test IAP",
        offerType: undefined,
      });
    });

    it("should handle item selection for subscription", async () => {
      mockSelectPricingItem.mockResolvedValue({
        type: "subscription",
        id: "sub-1",
        name: "Test Subscription",
      } as PricingItem);

      const result = await startInteractivePricing({
        appStoreState: mockAppStoreData,
        fetchTerritoryPricePointsForSelectedItem: mockFetchTerritoryPricePoints,
      });

      expect(result.selectedItem).toEqual({
        type: "subscription",
        id: "sub-1",
        name: "Test Subscription",
        offerType: undefined,
      });
    });

    it("should handle item selection for offer", async () => {
      mockSelectPricingItem.mockResolvedValue({
        type: "offer",
        id: "sub-1",
        name: "PAY_AS_YOU_GO Introductory Offer",
        offerType: "PAY_AS_YOU_GO",
      } as PricingItem);

      const result = await startInteractivePricing({
        appStoreState: mockAppStoreData,
        fetchTerritoryPricePointsForSelectedItem: mockFetchTerritoryPricePoints,
      });

      expect(result.selectedItem).toEqual({
        type: "offer",
        id: "sub-1",
        name: "PAY_AS_YOU_GO Introductory Offer",
        offerType: "PAY_AS_YOU_GO",
      });
    });

    it("should handle minimum price when strategy is not apple", async () => {
      mockPromptForPricingStrategy.mockResolvedValue("purchasingPower" as any);
      mockPromptForMinimumPrice.mockResolvedValue("0.50");

      const result = await startInteractivePricing({
        appStoreState: mockAppStoreData,
        fetchTerritoryPricePointsForSelectedItem: mockFetchTerritoryPricePoints,
      });

      expect(result.minimumPrice).toBe("0.50");
      expect(mockPromptForMinimumPrice).toHaveBeenCalledWith(
        "purchasingPower",
        "0.99"
      );
    });

    it("should handle error and rethrow", async () => {
      const error = new Error("Test error");
      mockSelectPricingItem.mockRejectedValue(error);

      await expect(
        startInteractivePricing({
          appStoreState: mockAppStoreData,
          fetchTerritoryPricePointsForSelectedItem:
            mockFetchTerritoryPricePoints,
        })
      ).rejects.toThrow("Test error");

      // Error logging was removed from the function, so no error logging is expected
      expect(mockLogger.error).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
