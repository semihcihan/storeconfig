import {
  processSubscriptionPriceResponse,
  mapSubscriptionLocalizations,
  parseOfferDuration,
  mapIntroductoryOffers,
  mapSubscriptionAvailability,
  mapSubscription,
} from "./mapper";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { z } from "zod";
import { logger, TerritoryCodeSchema } from "@semihcihan/shared";

type Territory = z.infer<typeof TerritoryCodeSchema>;

// Mock the id-encoding-helpers to control territory validation
jest.mock("../../helpers/id-encoding-helpers", () => ({
  validateTerritoryCode: jest.fn((value: string) => {
    // Return null for INVALID_TERRITORY to simulate validation failure
    if (value === "INVALID_TERRITORY") {
      return null;
    }
    // Return the value for other territories
    return value;
  }),
}));

// Mock the date helpers to control time-based behavior
jest.mock("../../helpers/date-helpers", () => ({
  getMostRecentActivePrice: jest.fn(),
}));

// No need to mock compareNumericValues - it's a pure function

// Mock the pricing service
jest.mock("./pricing-service", () => ({
  buildSubscriptionPricesWithEqualizations: jest.fn(),
}));

// Mock the API client
jest.mock("./api-client", () => ({
  fetchSubscriptionLocalizations: jest.fn(),
  fetchSubscriptionIntroductoryOffers: jest.fn(),
  fetchSubscriptionPromotionalOffers: jest.fn(),
  fetchSubscriptionAvailability: jest.fn(),
  fetchSubscriptionAvailabilityTerritories: jest.fn(),
  fetchSubscriptionPrices: jest.fn(),
  fetchPromotionalOfferPrices: jest.fn(),
}));

import { getMostRecentActivePrice } from "../../helpers/date-helpers";
import { compareNumericValues } from "@semihcihan/shared";
import { buildSubscriptionPricesWithEqualizations } from "./pricing-service";
import {
  fetchSubscriptionLocalizations,
  fetchSubscriptionIntroductoryOffers,
  fetchSubscriptionPromotionalOffers,
  fetchSubscriptionAvailability,
  fetchSubscriptionAvailabilityTerritories,
  fetchSubscriptionPrices,
  fetchPromotionalOfferPrices,
} from "./api-client";

const mockGetMostRecentActivePrice =
  getMostRecentActivePrice as jest.MockedFunction<
    typeof getMostRecentActivePrice
  >;
const mockBuildSubscriptionPricesWithEqualizations =
  buildSubscriptionPricesWithEqualizations as jest.MockedFunction<
    typeof buildSubscriptionPricesWithEqualizations
  >;
const mockFetchSubscriptionLocalizations =
  fetchSubscriptionLocalizations as jest.MockedFunction<
    typeof fetchSubscriptionLocalizations
  >;
const mockFetchSubscriptionIntroductoryOffers =
  fetchSubscriptionIntroductoryOffers as jest.MockedFunction<
    typeof fetchSubscriptionIntroductoryOffers
  >;
const mockFetchSubscriptionPromotionalOffers =
  fetchSubscriptionPromotionalOffers as jest.MockedFunction<
    typeof fetchSubscriptionPromotionalOffers
  >;
const mockFetchSubscriptionAvailability =
  fetchSubscriptionAvailability as jest.MockedFunction<
    typeof fetchSubscriptionAvailability
  >;
const mockFetchSubscriptionAvailabilityTerritories =
  fetchSubscriptionAvailabilityTerritories as jest.MockedFunction<
    typeof fetchSubscriptionAvailabilityTerritories
  >;
const mockFetchSubscriptionPrices =
  fetchSubscriptionPrices as jest.MockedFunction<
    typeof fetchSubscriptionPrices
  >;
const mockFetchPromotionalOfferPrices =
  fetchPromotionalOfferPrices as jest.MockedFunction<
    typeof fetchPromotionalOfferPrices
  >;

describe("Subscription Mapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper functions for creating mock data
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

  describe("mapSubscriptionLocalizations", () => {
    it("should map valid localizations", () => {
      const response = {
        data: [
          {
            attributes: {
              locale: "en-US",
              name: "Test Subscription",
              description: "Test Description",
            },
          },
          {
            attributes: {
              locale: "en-GB",
              name: "Test Subscription UK",
              description: "Test Description UK",
            },
          },
        ],
      };

      const result = mapSubscriptionLocalizations(response as any);
      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test Subscription",
          description: "Test Description",
        },
        {
          locale: "en-GB",
          name: "Test Subscription UK",
          description: "Test Description UK",
        },
      ]);
    });

    it("should filter out invalid locales", () => {
      const response = {
        data: [
          {
            attributes: {
              locale: "en-US",
              name: "Valid",
              description: "Valid",
            },
          },
          {
            attributes: {
              locale: "invalid-locale",
              name: "Invalid",
              description: "Invalid",
            },
          },
        ],
      };

      const result = mapSubscriptionLocalizations(response as any);
      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Valid",
          description: "Valid",
        },
      ]);
    });

    it("should handle missing attributes", () => {
      const response = {
        data: [
          {
            attributes: {
              locale: "en-US",
              name: "Test",
              description: "Test",
            },
          },
          {
            attributes: {
              locale: "en-GB",
              // Missing name and description
            },
          },
        ],
      };

      const result = mapSubscriptionLocalizations(response as any);
      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test",
          description: "Test",
        },
        {
          locale: "en-GB",
          name: "",
          description: "",
        },
      ]);
    });

    it("should prefer non-approved localization for duplicate locale", () => {
      const response = {
        data: [
          {
            attributes: {
              locale: "en-US",
              name: "Approved Name",
              description: "Approved Description",
              state: "APPROVED",
            },
          },
          {
            attributes: {
              locale: "en-US",
              name: "Draft Name",
              description: "Draft Description",
              state: "PREPARE_FOR_SUBMISSION",
            },
          },
        ],
      };

      const result = mapSubscriptionLocalizations(response as any);
      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Draft Name",
          description: "Draft Description",
        },
      ]);
    });
  });

  describe("parseOfferDuration", () => {
    it("should parse PAY_AS_YOU_GO with numberOfPeriods", () => {
      const attributes = {
        offerMode: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        duration: "ONE_MONTH",
      };

      const result = parseOfferDuration(attributes as any);
      expect(result).toEqual({ numberOfPeriods: 3 });
    });

    it("should parse PAY_UP_FRONT with duration", () => {
      const attributes = {
        offerMode: "PAY_UP_FRONT",
        duration: "ONE_MONTH",
      };

      const result = parseOfferDuration(attributes as any);
      expect(result).toEqual({ duration: "ONE_MONTH" });
    });

    it("should parse FREE_TRIAL with duration", () => {
      const attributes = {
        offerMode: "FREE_TRIAL",
        duration: "ONE_WEEK",
      };

      const result = parseOfferDuration(attributes as any);
      expect(result).toEqual({ duration: "ONE_WEEK" });
    });

    it("should throw error for unknown offer mode and duration", () => {
      const attributes = {
        offerMode: "UNKNOWN_MODE",
        duration: "UNKNOWN_DURATION",
      };

      expect(() => parseOfferDuration(attributes as any)).toThrow();
    });

    it("should return empty object for missing attributes", () => {
      const result = parseOfferDuration(undefined as any);
      expect(result).toEqual({});
    });
  });

  describe("mapIntroductoryOffers", () => {
    it("should map FREE_TRIAL offers", async () => {
      const response = {
        data: [
          {
            id: "offer1",
            attributes: {
              offerMode: "FREE_TRIAL",
              duration: "ONE_WEEK",
            },
            relationships: {
              territory: { data: { id: "USA" } },
            },
          },
        ],
        included: [{ type: "territories", id: "USA" }],
      };

      const result = await mapIntroductoryOffers(response as any);
      expect(result).toEqual([
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
      ]);
    });

    it("should map PAY_AS_YOU_GO offers with prices", async () => {
      const response = {
        data: [
          {
            id: "offer1",
            attributes: {
              offerMode: "PAY_AS_YOU_GO",
              numberOfPeriods: 3,
            },
            relationships: {
              territory: { data: { id: "USA" } },
              subscriptionPricePoint: {
                data: { id: "pp1", type: "subscriptionPricePoints" },
              },
            },
          },
        ],
        included: [
          { type: "territories", id: "USA" },
          {
            type: "subscriptionPricePoints",
            id: "pp1",
            attributes: { customerPrice: "4.99" },
          },
        ],
      };

      mockBuildSubscriptionPricesWithEqualizations.mockResolvedValue([]);
      mockGetMostRecentActivePrice.mockReturnValue({
        price: "4.99",
        territory: "USA",
        startDate: undefined,
        endDate: undefined,
      });

      const result = await mapIntroductoryOffers(response as any);
      expect(result).toEqual([
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 3,
          pricing: {
            baseTerritory: "USA",
            prices: [{ price: "4.99", territory: "USA" }],
          },
          availableTerritories: ["USA"],
        },
      ]);
    });

    it("should handle offers without equalizations", async () => {
      const response = {
        data: [
          {
            id: "offer1",
            attributes: {
              offerMode: "FREE_TRIAL",
              duration: "ONE_WEEK",
            },
            relationships: {
              territory: { data: { id: "USA" } },
            },
          },
        ],
        included: [{ type: "territories", id: "USA" }],
      };

      const result = await mapIntroductoryOffers(response as any, false);
      expect(result).toEqual([
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
      ]);
    });
  });

  describe("mapSubscriptionAvailability", () => {
    it("should map availability with territories", async () => {
      const availabilityResponse = {
        data: {
          id: "availability1",
          attributes: {
            availableInNewTerritories: true,
          },
        },
      };

      const territoriesResponse = {
        data: [{ id: "USA" }, { id: "GBR" }],
      };

      mockFetchSubscriptionAvailabilityTerritories.mockResolvedValue(
        territoriesResponse as any
      );

      const result = await mapSubscriptionAvailability(
        availabilityResponse as any
      );
      expect(result).toEqual({
        availableInNewTerritories: true,
        availableTerritories: ["USA", "GBR"],
      });
    });

    it("should return undefined for empty availability ID", async () => {
      const response = {
        data: {
          id: "",
          attributes: {
            availableInNewTerritories: true,
          },
        },
      };

      const result = await mapSubscriptionAvailability(response as any);
      expect(result).toBeUndefined();
    });
  });

  describe("mapSubscription", () => {
    it("should return null for subscription without period", async () => {
      const subRel = { type: "subscriptions", id: "sub1" };
      const includedById = {
        "subscriptions-sub1": {
          type: "subscriptions" as const,
          id: "sub1",
          attributes: {
            productId: "com.test.subscription",
            // Missing subscriptionPeriod
          },
        },
      } as any;

      const result = await mapSubscription(subRel, includedById);
      expect(result).toBeNull();
    });
  });

  describe("processSubscriptionPriceResponse", () => {
    describe("getMostRecentActivePrice integration", () => {
      it("should call getMostRecentActivePrice for each territory with multiple subscription prices", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

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
            pricePointId: "pp1",
          },
          {
            price: "19.99",
            territory: "USA",
            startDate: "2023-07-01",
            endDate: undefined,
            pricePointId: "pp2",
          },
          {
            price: "29.99",
            territory: "USA",
            startDate: "2024-01-01",
            endDate: undefined,
            pricePointId: "pp3",
          },
        ]);

        // GBR call should have 1 price
        expect(gbrCall![0]).toEqual([
          {
            price: "9.99",
            territory: "GBR",
            startDate: "2024-01-01",
            endDate: undefined,
            pricePointId: "pp1",
          },
        ]);

        // Result should contain the selected prices
        expect(result).toEqual({
          baseTerritory: "USA",
          prices: [
            { price: "29.99", territory: "USA" },
            { price: "9.99", territory: "GBR" },
          ],
        });
      });

      it("should handle promotional offer prices (no dates)", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
          baseTerritory: "USA",
          prices: [{ price: "4.99", territory: "USA" }],
        });
      });

      it("should handle mixed subscription and promotional offer prices", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
          baseTerritory: "USA",
          prices: [{ price: "9.99", territory: "USA" }],
        });
      });

      it("should handle territory with no active prices", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
        expect(result).toEqual(undefined);
      });

      it("should handle territory with only future prices", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
        expect(result).toEqual(undefined);
      });

      it("should handle prices with null start dates", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
          baseTerritory: "USA",
          prices: [{ price: "9.99", territory: "USA" }],
        });
      });

      it("should handle empty response", async () => {
        const response = createMockResponse([], []);

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });

      it("should handle response with no data", async () => {
        const response = { data: [], included: [], links: { self: "" } };

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });

      it("should handle response with no included data", async () => {
        const response = { data: [], included: undefined, links: { self: "" } };

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });

      it("should skip prices with missing territory relationships", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });

      it("should skip prices with missing price point relationships", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });

      it("should skip prices with invalid territory codes", async () => {
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

        // The function should return undefined for invalid territory codes
        const result = await processSubscriptionPriceResponse(response);
        expect(result).toBeUndefined();
      });

      it("should handle multiple territories with different price counts", async () => {
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

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(3);
        expect(result).toEqual({
          baseTerritory: "USA",
          prices: [
            { price: "29.99", territory: "USA" },
            { price: "19.99", territory: "GBR" },
            { price: "9.99", territory: "DEU" },
          ],
        });
      });

      it("should fallback to first available territory when BASE_TERRITORY is not found", async () => {
        const territories = [
          createMockTerritory("GBR"),
          createMockTerritory("DEU"),
        ];
        const pricePoints = [
          createMockPricePoint("pp1", "9.99"),
          createMockPricePoint("pp2", "19.99"),
        ];

        // No USA territory, only GBR and DEU
        const prices = [
          createMockSubscriptionPrice("p1", "GBR", "pp1", "2024-01-01"),
          createMockSubscriptionPrice("p2", "DEU", "pp2", "2024-01-01"),
        ];

        const response = createMockResponse(prices, [
          ...territories,
          ...pricePoints,
        ]);

        // Mock getMostRecentActivePrice to return prices for each territory
        mockGetMostRecentActivePrice.mockImplementation((prices) => {
          return prices[0]; // Return first price for each territory
        });

        const result = await processSubscriptionPriceResponse(response);

        expect(mockGetMostRecentActivePrice).toHaveBeenCalledTimes(2);
        expect(result).toEqual({
          baseTerritory: "GBR", // Should fallback to first territory since USA is not found
          prices: [
            { price: "9.99", territory: "GBR" },
            { price: "19.99", territory: "DEU" },
          ],
        });
      });
    });
  });
});
