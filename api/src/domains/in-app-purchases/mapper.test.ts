import { processPriceResponse } from "./mapper";
import type { components } from "../../generated/app-store-connect-api";

type InAppPurchasePricesResponse =
  components["schemas"]["InAppPurchasePricesResponse"];

// Mock the logger to avoid console output during tests
jest.mock("../../utils/logger", () => ({
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

// Mock the date helpers to control time-based behavior
jest.mock("../../helpers/date-helpers", () => ({
  getMostRecentActivePrice: jest.fn(),
}));

import { getMostRecentActivePrice } from "../../helpers/date-helpers";

const mockGetMostRecentActivePrice =
  getMostRecentActivePrice as jest.MockedFunction<
    typeof getMostRecentActivePrice
  >;

describe("In-App Purchase Mapper - processPriceResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockTerritory = (
    id: string
  ): components["schemas"]["Territory"] => ({
    type: "territories",
    id,
    attributes: { currency: "USD" },
  });

  const createMockPricePoint = (
    id: string,
    customerPrice: string
  ): components["schemas"]["InAppPurchasePricePoint"] => ({
    type: "inAppPurchasePricePoints",
    id,
    attributes: { customerPrice, proceeds: "0.85" },
  });

  const createMockPrice = (
    id: string,
    territoryId: string,
    pricePointId: string,
    startDate?: string,
    endDate?: string
  ): components["schemas"]["InAppPurchasePrice"] => ({
    type: "inAppPurchasePrices",
    id,
    attributes: {
      startDate,
      endDate,
      manual: true,
    },
    relationships: {
      territory: { data: { type: "territories", id: territoryId } },
      inAppPurchasePricePoint: {
        data: { type: "inAppPurchasePricePoints", id: pricePointId },
      },
    },
  });

  const createMockResponse = (
    prices: components["schemas"]["InAppPurchasePrice"][],
    included: any[]
  ): InAppPurchasePricesResponse => ({
    data: prices,
    included,
    links: { self: "" },
  });

  describe("getMostRecentActivePrice integration", () => {
    it("should call getMostRecentActivePrice for each territory with multiple prices", () => {
      const territories = [
        createMockTerritory("USA"),
        createMockTerritory("GBR"),
      ];
      const pricePoints = [
        createMockPricePoint("pp1", "0.99"),
        createMockPricePoint("pp2", "1.99"),
        createMockPricePoint("pp3", "2.99"),
      ];

      // Create multiple prices for USA territory
      const prices = [
        createMockPrice("p1", "USA", "pp1", "2023-01-01", "2023-06-30"), // Expired
        createMockPrice("p2", "USA", "pp2", "2023-07-01", "2023-12-31"), // Expired
        createMockPrice("p3", "USA", "pp3", "2024-01-01"), // Current (no end date)
        createMockPrice("p4", "GBR", "pp1", "2024-01-01"), // Single price for GBR
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the third price for USA
      mockGetMostRecentActivePrice.mockImplementation((prices) => {
        if (prices.length === 3) {
          // USA territory with 3 prices
          return prices[2]; // Return the most recent one
        }
        if (prices.length === 1) {
          // GBR territory with 1 price
          return prices[0];
        }
        return null;
      });

      const result = processPriceResponse(response);

      // Should call getMostRecentActivePrice twice (once per territory)
      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(2);

      // Should call with correct price arrays
      const usaCall = mockGetMostRecentActivePrice.mock.calls.find(
        (call) => call[0].length === 3
      );
      const gbrCall = mockGetMostRecentActivePrice.mock.calls.find(
        (call) => call[0].length === 1
      );

      expect(usaCall).toBeDefined();
      expect(gbrCall).toBeDefined();

      // USA call should have 3 prices with correct structure
      expect(usaCall![0]).toEqual([
        {
          price: "0.99",
          territory: "USA",
          startDate: "2023-01-01",
          endDate: "2023-06-30",
        },
        {
          price: "1.99",
          territory: "USA",
          startDate: "2023-07-01",
          endDate: "2023-12-31",
        },
        {
          price: "2.99",
          territory: "USA",
          startDate: "2024-01-01",
          endDate: undefined,
        },
      ]);

      // GBR call should have 1 price
      expect(gbrCall![0]).toEqual([
        {
          price: "0.99",
          territory: "GBR",
          startDate: "2024-01-01",
          endDate: undefined,
        },
      ]);

      // Result should contain the selected prices
      expect(result).toEqual([
        { price: "2.99", territory: "USA" },
        { price: "0.99", territory: "GBR" },
      ]);
    });

    it("should handle territory with no active prices", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      // Create only expired prices
      const prices = [
        createMockPrice("p1", "USA", "pp1", "2023-01-01", "2023-06-30"), // Expired
        createMockPrice("p2", "USA", "pp1", "2023-07-01", "2023-12-31"), // Expired
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return null (no active prices)
      mockGetMostRecentActivePrice.mockReturnValue(null);

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it("should handle territory with only future prices", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      // Create only future prices
      const prices = [
        createMockPrice("p1", "USA", "pp1", "2025-01-01", "2025-06-30"), // Future
        createMockPrice("p2", "USA", "pp1", "2025-07-01"), // Future
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return null (no active prices)
      mockGetMostRecentActivePrice.mockReturnValue(null);

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it("should handle mixed active and inactive prices correctly", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [
        createMockPricePoint("pp1", "0.99"),
        createMockPricePoint("pp2", "1.99"),
        createMockPricePoint("pp3", "2.99"),
      ];

      // Mix of expired, active, and future prices
      const prices = [
        createMockPrice("p1", "USA", "pp1", "2023-01-01", "2023-06-30"), // Expired
        createMockPrice("p2", "USA", "pp2", "2023-07-01"), // Active (no end date)
        createMockPrice("p3", "USA", "pp3", "2025-01-01"), // Future
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the active price
      mockGetMostRecentActivePrice.mockImplementation((prices) => {
        // Return the price with no end date (active)
        return prices.find((p) => !p.endDate) || null;
      });

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ price: "1.99", territory: "USA" }]);
    });

    it("should handle prices with null dates correctly", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      // Price with null dates (should be treated as always active)
      const prices = [
        createMockPrice("p1", "USA", "pp1", null as any, null as any),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the price
      mockGetMostRecentActivePrice.mockReturnValue({
        price: "0.99",
        territory: "USA",
        startDate: null,
        endDate: null,
      });

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ price: "0.99", territory: "USA" }]);
    });

    it("should handle empty response", () => {
      const response = createMockResponse([], []);

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should handle response with no data", () => {
      const response = { data: [], included: [], links: { self: "" } };

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should handle response with no included data", () => {
      const response = { data: [], included: undefined, links: { self: "" } };

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with missing territory relationships", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      // Price without territory relationship
      const prices = [
        {
          type: "inAppPurchasePrices",
          id: "p1",
          attributes: { startDate: "2024-01-01" },
          relationships: {
            inAppPurchasePricePoint: {
              data: { type: "inAppPurchasePricePoints", id: "pp1" },
            },
            // Missing territory relationship
          },
        } as any,
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with missing price point relationships", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      // Price without price point relationship
      const prices = [
        {
          type: "inAppPurchasePrices",
          id: "p1",
          attributes: { startDate: "2024-01-01" },
          relationships: {
            territory: { data: { type: "territories", id: "USA" } },
            // Missing price point relationship
          },
        } as any,
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      const result = processPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with invalid territory codes", () => {
      const territories = [createMockTerritory("INVALID_TERRITORY")];
      const pricePoints = [createMockPricePoint("pp1", "0.99")];

      const prices = [
        createMockPrice("p1", "INVALID_TERRITORY", "pp1", "2024-01-01"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // The function should throw an error for invalid territory codes
      expect(() => processPriceResponse(response)).toThrow();
    });
  });
});
