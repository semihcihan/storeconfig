import { processSubscriptionPriceResponse } from "./mapper";
import type { components } from "@semihcihan/app-store-connect-api-types";

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

describe("Subscription Mapper - processSubscriptionPriceResponse", () => {
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
  ): components["schemas"]["SubscriptionPricePoint"] => ({
    type: "subscriptionPricePoints",
    id,
    attributes: { customerPrice, proceeds: "0.85" },
  });

  const createMockSubscriptionPrice = (
    id: string,
    territoryId: string,
    pricePointId: string,
    startDate?: string
  ): components["schemas"]["SubscriptionPrice"] => ({
    type: "subscriptionPrices",
    id,
    attributes: {
      startDate,
      preserved: false,
    },
    relationships: {
      territory: { data: { type: "territories", id: territoryId } },
      subscriptionPricePoint: {
        data: { type: "subscriptionPricePoints", id: pricePointId },
      },
    },
  });

  const createMockPromotionalOfferPrice = (
    id: string,
    territoryId: string,
    pricePointId: string
  ): components["schemas"]["SubscriptionPromotionalOfferPrice"] => ({
    type: "subscriptionPromotionalOfferPrices",
    id,
    relationships: {
      territory: { data: { type: "territories", id: territoryId } },
      subscriptionPricePoint: {
        data: { type: "subscriptionPricePoints", id: pricePointId },
      },
    },
  });

  const createMockResponse = (prices: any[], included: any[]) => ({
    data: prices,
    included,
    links: { self: "" },
  });

  describe("getMostRecentActivePrice integration", () => {
    it("should call getMostRecentActivePrice for each territory with multiple subscription prices", () => {
      const territories = [
        createMockTerritory("USA"),
        createMockTerritory("GBR"),
      ];
      const pricePoints = [
        createMockPricePoint("pp1", "9.99"),
        createMockPricePoint("pp2", "19.99"),
        createMockPricePoint("pp3", "29.99"),
      ];

      // Create multiple subscription prices for USA territory
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", "2023-01-01"), // Old
        createMockSubscriptionPrice("p2", "USA", "pp2", "2023-07-01"), // Old
        createMockSubscriptionPrice("p3", "USA", "pp3", "2024-01-01"), // Current
        createMockSubscriptionPrice("p4", "GBR", "pp1", "2024-01-01"), // Single price for GBR
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

      const result = processSubscriptionPriceResponse(response);

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
          price: "9.99",
          territory: "USA",
          startDate: "2023-01-01",
          endDate: undefined,
        },
        {
          price: "19.99",
          territory: "USA",
          startDate: "2023-07-01",
          endDate: undefined,
        },
        {
          price: "29.99",
          territory: "USA",
          startDate: "2024-01-01",
          endDate: undefined,
        },
      ]);

      // GBR call should have 1 price
      expect(gbrCall![0]).toEqual([
        {
          price: "9.99",
          territory: "GBR",
          startDate: "2024-01-01",
          endDate: undefined,
        },
      ]);

      // Result should contain the selected prices
      expect(result).toEqual([
        { price: "29.99", territory: "USA" },
        { price: "9.99", territory: "GBR" },
      ]);
    });

    it("should handle promotional offer prices (no dates)", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "4.99")];

      // Create promotional offer prices (no date attributes)
      const prices = [
        createMockPromotionalOfferPrice("p1", "USA", "pp1"),
        createMockPromotionalOfferPrice("p2", "USA", "pp1"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the first price
      mockGetMostRecentActivePrice.mockReturnValue({
        price: "4.99",
        territory: "USA",
        startDate: undefined,
        endDate: undefined,
      });

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ price: "4.99", territory: "USA" }]);
    });

    it("should handle mixed subscription and promotional offer prices", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [
        createMockPricePoint("pp1", "9.99"),
        createMockPricePoint("pp2", "4.99"),
      ];

      // Mix of subscription prices (with dates) and promotional offer prices (no dates)
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", "2023-01-01"),
        createMockPromotionalOfferPrice("p2", "USA", "pp2"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the subscription price
      mockGetMostRecentActivePrice.mockReturnValue({
        price: "9.99",
        territory: "USA",
        startDate: "2023-01-01",
        endDate: undefined,
      });

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ price: "9.99", territory: "USA" }]);
    });

    it("should handle territory with no active prices", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      // Create only old prices
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", "2023-01-01"),
        createMockSubscriptionPrice("p2", "USA", "pp1", "2023-07-01"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return null (no active prices)
      mockGetMostRecentActivePrice.mockReturnValue(null);

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it("should handle territory with only future prices", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      // Create only future prices
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", "2025-01-01"),
        createMockSubscriptionPrice("p2", "USA", "pp1", "2025-07-01"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return null (no active prices)
      mockGetMostRecentActivePrice.mockReturnValue(null);

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it("should handle prices with null start dates", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      // Price with null start date (should be treated as always active)
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", null as any),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return the price
      mockGetMostRecentActivePrice.mockReturnValue({
        price: "9.99",
        territory: "USA",
        startDate: null,
        endDate: undefined,
      });

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ price: "9.99", territory: "USA" }]);
    });

    it("should handle empty response", () => {
      const response = createMockResponse([], []);

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should handle response with no data", () => {
      const response = { data: [], included: [], links: { self: "" } };

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should handle response with no included data", () => {
      const response = { data: [], included: undefined, links: { self: "" } };

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with missing territory relationships", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      // Price without territory relationship
      const prices = [
        {
          type: "subscriptionPrices",
          id: "p1",
          attributes: { startDate: "2024-01-01" },
          relationships: {
            subscriptionPricePoint: {
              data: { type: "subscriptionPricePoints", id: "pp1" },
            },
            // Missing territory relationship
          },
        } as any,
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with missing price point relationships", () => {
      const territories = [createMockTerritory("USA")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      // Price without price point relationship
      const prices = [
        {
          type: "subscriptionPrices",
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

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should skip prices with invalid territory codes", () => {
      const territories = [createMockTerritory("INVALID_TERRITORY")];
      const pricePoints = [createMockPricePoint("pp1", "9.99")];

      const prices = [
        createMockSubscriptionPrice(
          "p1",
          "INVALID_TERRITORY",
          "pp1",
          "2024-01-01"
        ),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // The function should throw an error for invalid territory codes
      expect(() => processSubscriptionPriceResponse(response)).toThrow();
    });

    it("should handle multiple territories with different price counts", () => {
      const territories = [
        createMockTerritory("USA"),
        createMockTerritory("GBR"),
        createMockTerritory("DEU"),
      ];
      const pricePoints = [
        createMockPricePoint("pp1", "9.99"),
        createMockPricePoint("pp2", "19.99"),
        createMockPricePoint("pp3", "29.99"),
      ];

      // Different number of prices per territory
      const prices = [
        createMockSubscriptionPrice("p1", "USA", "pp1", "2023-01-01"),
        createMockSubscriptionPrice("p2", "USA", "pp2", "2024-01-01"),
        createMockSubscriptionPrice("p3", "USA", "pp3", "2024-07-01"),
        createMockSubscriptionPrice("p4", "GBR", "pp1", "2024-01-01"),
        createMockSubscriptionPrice("p5", "GBR", "pp2", "2024-07-01"),
        createMockSubscriptionPrice("p6", "DEU", "pp1", "2024-01-01"),
      ];

      const response = createMockResponse(prices, [
        ...territories,
        ...pricePoints,
      ]);

      // Mock getMostRecentActivePrice to return different prices for each territory
      mockGetMostRecentActivePrice.mockImplementation((prices) => {
        if (prices.length === 3) {
          // USA territory with 3 prices
          return prices[2]; // Most recent
        }
        if (prices.length === 2) {
          // GBR territory with 2 prices
          return prices[1]; // Most recent
        }
        if (prices.length === 1) {
          // DEU territory with 1 price
          return prices[0];
        }
        return null;
      });

      const result = processSubscriptionPriceResponse(response);

      expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(3);
      expect(result).toEqual([
        { price: "29.99", territory: "USA" },
        { price: "19.99", territory: "GBR" },
        { price: "9.99", territory: "DEU" },
      ]);
    });
  });
});
