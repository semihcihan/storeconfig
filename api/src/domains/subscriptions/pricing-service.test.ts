import { jest } from "@jest/globals";
import {
  findSubscriptionId,
  combineSubscriptionPrices,
  findSubscriptionPricePointId,
  createSubscriptionPrices,
  applySubscriptionPricingWithEqualizations,
  buildCompleteDesiredPriceMap,
  buildSubscriptionPricesWithEqualizations,
  findPricesToUpdate,
  isFuturePrice,
  extractFuturePriceIds,
} from "./pricing-service";
import {
  fetchAllSubscriptionPricePoints,
  updateSubscription,
  fetchSubscriptionPricePointEqualizations,
  fetchSubscriptionPrices,
  deleteSubscriptionPrice,
} from "./api-client";
import { processSubscriptionPriceResponse } from "./mapper";
import { api } from "../../services/api";
import {
  PriceSchema,
  PriceScheduleSchema,
  TerritoryCodeSchema,
  ContextualError,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  setPricePointDataHook,
  type TerritoryPricePoints,
} from "../../services/price-point";

// Helper for testing (since encodePricePointId is private)
function encodePricePointIdForTest(
  resourceId: string,
  territory: string,
  priceIndex: string
): string {
  const payload = { s: resourceId, t: territory, p: priceIndex };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

type Territory = z.infer<typeof TerritoryCodeSchema>;

// Mock dependencies
jest.mock("./api-client");
jest.mock("../../services/api");
jest.mock("./mapper");

const MockFetchAllSubscriptionPricePoints =
  fetchAllSubscriptionPricePoints as jest.MockedFunction<
    typeof fetchAllSubscriptionPricePoints
  >;
const MockUpdateSubscription = updateSubscription as jest.MockedFunction<
  typeof updateSubscription
>;
const MockFetchSubscriptionPricePointEqualizations =
  fetchSubscriptionPricePointEqualizations as jest.MockedFunction<
    typeof fetchSubscriptionPricePointEqualizations
  >;
const MockFetchSubscriptionPrices =
  fetchSubscriptionPrices as jest.MockedFunction<
    typeof fetchSubscriptionPrices
  >;
const MockDeleteSubscriptionPrice =
  deleteSubscriptionPrice as jest.MockedFunction<
    typeof deleteSubscriptionPrice
  >;
const MockProcessSubscriptionPriceResponse =
  processSubscriptionPriceResponse as jest.MockedFunction<
    typeof processSubscriptionPriceResponse
  >;
const MockApi = api as jest.Mocked<typeof api>;

// Mock price point data hook
let mockGetTerritoryPricePoints: jest.MockedFunction<
  (
    resourceType: string,
    territory: string
  ) => Promise<TerritoryPricePoints | null>
>;

type Price = z.infer<typeof PriceSchema>;
type PriceSchedule = z.infer<typeof PriceScheduleSchema>;

describe("SubscriptionPricingService", () => {
  const testSubscriptionId = "test-subscription-id";
  const testTerritory = "USA";
  const testPrice = "4.99";
  const testPricePointId = "test-price-point-id";

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up mock hook
    mockGetTerritoryPricePoints = jest.fn();
    setPricePointDataHook(mockGetTerritoryPricePoints);
  });

  describe("findSubscriptionId", () => {
    it("should find subscription ID from newly created subscriptions", () => {
      const newlyCreatedSubscriptions = new Map([
        ["com.test.subscription", "sub-123"],
        ["com.test.subscription2", "sub-456"],
      ]);

      const result = findSubscriptionId(
        "com.test.subscription",
        newlyCreatedSubscriptions
      );

      expect(result).toBe("sub-123");
    });

    it("should find subscription ID from current subscription groups response", () => {
      const currentSubscriptionGroupsResponse = {
        included: [
          {
            type: "subscriptions",
            id: "sub-789",
            attributes: {
              productId: "com.test.subscription",
            },
          },
          {
            type: "subscriptionGroupLocalizations",
            id: "loc-123",
            attributes: {
              locale: "en-US",
            },
          },
        ],
      };

      const result = findSubscriptionId(
        "com.test.subscription",
        undefined,
        currentSubscriptionGroupsResponse as any
      );

      expect(result).toBe("sub-789");
    });

    it("should throw error when subscription ID not found", () => {
      expect(() => {
        findSubscriptionId("com.test.nonexistent");
      }).toThrow(
        "Could not find subscription ID for product ID: com.test.nonexistent"
      );
    });

    it("should prioritize newly created subscriptions over current response", () => {
      const newlyCreatedSubscriptions = new Map([
        ["com.test.subscription", "sub-new"],
      ]);

      const currentSubscriptionGroupsResponse = {
        included: [
          {
            type: "subscriptions",
            id: "sub-old",
            attributes: {
              productId: "com.test.subscription",
            },
          },
        ],
      };

      const result = findSubscriptionId(
        "com.test.subscription",
        newlyCreatedSubscriptions,
        currentSubscriptionGroupsResponse as any
      );

      expect(result).toBe("sub-new");
    });
  });

  describe("combineSubscriptionPrices", () => {
    it("should combine added and updated prices", () => {
      const addedPrices: Price[] = [
        { price: "4.99", territory: "USA" },
        { price: "3.99", territory: "GBR" },
      ];

      const updatedPrices: Price[] = [
        { price: "5.99", territory: "DEU" },
        { price: "6.99", territory: "FRA" },
      ];

      const result = combineSubscriptionPrices(addedPrices, updatedPrices);

      expect(result).toEqual([
        { price: "4.99", territory: "USA" },
        { price: "3.99", territory: "GBR" },
        { price: "5.99", territory: "DEU" },
        { price: "6.99", territory: "FRA" },
      ]);
    });

    it("should handle empty arrays", () => {
      const result = combineSubscriptionPrices([], []);
      expect(result).toEqual([]);
    });

    it("should handle one empty array", () => {
      const addedPrices: Price[] = [{ price: "4.99", territory: "USA" }];
      const result = combineSubscriptionPrices(addedPrices, []);
      expect(result).toEqual(addedPrices);
    });
  });

  describe("findSubscriptionPricePointId", () => {
    it("should return price point ID for matching price and territory", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "0", customerPrice: "3.99" },
          { priceIndex: "1", customerPrice: testPrice },
          { priceIndex: "2", customerPrice: "5.99" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        testTerritory,
        testSubscriptionId
      );
    });

    it("should make API call for each request (no caching)", async () => {
      mockGetTerritoryPricePoints.mockResolvedValue({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: testPrice }],
      });

      // First call
      await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        testSubscriptionId
      );

      // Second call - should make another cache call
      await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        testSubscriptionId
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
    });

    it("should call API for different subscription-territory combinations", async () => {
      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "1", customerPrice: testPrice }],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "1", customerPrice: testPrice }],
        });

      // First combination
      await findSubscriptionPricePointId(testPrice, "USA", "subscription1");

      // Second combination
      await findSubscriptionPricePointId(testPrice, "GBR", "subscription1");

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        "USA",
        "subscription1"
      );
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        "GBR",
        "subscription1"
      );
    });

    it("should call API for different subscriptions in same territory", async () => {
      const mockResponse1 = {
        data: [
          {
            id: "pp1",
            attributes: { customerPrice: testPrice },
            relationships: { territory: { data: { id: testTerritory } } },
          },
        ],
      };
      const mockResponse2 = {
        data: [
          {
            id: "pp2",
            attributes: { customerPrice: testPrice },
            relationships: { territory: { data: { id: testTerritory } } },
          },
        ],
      };

      MockFetchAllSubscriptionPricePoints.mockResolvedValueOnce(
        mockResponse1 as any
      ).mockResolvedValueOnce(mockResponse2 as any);

      // Set up mock hook to return price points
      mockGetTerritoryPricePoints.mockResolvedValue({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: testPrice }],
      });

      // First subscription
      await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        "subscription1"
      );

      // Second subscription
      await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        "subscription2"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        testTerritory,
        "subscription1"
      );
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        testTerritory,
        "subscription2"
      );
    });

    it("should handle price points without customerPrice attribute", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        "subscription-no-price-test",
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: testPrice }],
      });

      const result = await findSubscriptionPricePointId(
        testPrice,
        testTerritory,
        "subscription-no-price-test"
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should use closest price point when no exact match is found", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "2"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "3.99" },
          { priceIndex: "2", customerPrice: "5.99" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        testPrice, // 4.99 - not in the mock data, closest is 5.99
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "subscription",
        testTerritory,
        testSubscriptionId
      );
    });

    it("should pick price with more meaningful decimals (8.9 over 9.0)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "8.9" },
          { priceIndex: "2", customerPrice: "9.0" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        "8.95",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should pick price with more meaningful decimals (8.09 over 8.1)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "8.09" },
          { priceIndex: "2", customerPrice: "8.1" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        "8.095",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should pick price with more meaningful decimals (7.99 over 7.9)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "2"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "7.9" },
          { priceIndex: "2", customerPrice: "7.99" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        "7.95",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should pick bigger price when both have same number of meaningful decimals", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "2"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "7.99" },
          { priceIndex: "2", customerPrice: "8.99" },
        ],
      });

      const result = await findSubscriptionPricePointId(
        "8.5",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should throw error when no price points are available", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce(null);

      await expect(
        findSubscriptionPricePointId(
          testPrice,
          testTerritory,
          testSubscriptionId
        )
      ).rejects.toThrow(
        "No price points data available for subscription in territory USA"
      );
    });

    it("should find price point when price has different decimal precision (0.00 vs 0.0)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "0.00" },
          { priceIndex: "2", customerPrice: "1.99" },
        ],
      });

      // This should find the price point even though we're looking for "0.0" and the cache returns "0.00"
      const result = await findSubscriptionPricePointId(
        "0.0",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should find price point when price has different decimal precision (4.50 vs 4.5)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "4.50" },
          { priceIndex: "2", customerPrice: "5.99" },
        ],
      });

      // This should find the price point even though we're looking for "4.5" and the cache returns "4.50"
      const result = await findSubscriptionPricePointId(
        "4.5",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });

    it("should find price point when price has different decimal precision (10.000 vs 10)", async () => {
      const encodedPricePointId = encodePricePointIdForTest(
        testSubscriptionId,
        testTerritory,
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: testTerritory,
        resourceType: "subscription",
        pricePoints: [
          { priceIndex: "1", customerPrice: "10.000" },
          { priceIndex: "2", customerPrice: "15.99" },
        ],
      });

      // This should find the price point even though we're looking for "10" and the cache returns "10.000"
      const result = await findSubscriptionPricePointId(
        "10",
        testTerritory,
        testSubscriptionId
      );

      expect(result).toBe(encodedPricePointId);
    });
  });

  describe("createSubscriptionPrices", () => {
    it("should handle empty prices array", async () => {
      await createSubscriptionPrices("subscription-empty-test", []);

      expect(MockUpdateSubscription).not.toHaveBeenCalled();
    });

    it("should create prices with a single subscription PATCH", async () => {
      const prices: { price: Price; new: boolean }[] = [
        { price: { price: "4.99", territory: "USA" }, new: true },
        { price: { price: "3.99", territory: "GBR" }, new: false },
        { price: { price: "5.99", territory: "DEU" }, new: true },
      ];

      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
        })
        .mockResolvedValueOnce({
          territory: "DEU",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "3", customerPrice: "5.99" }],
        });

      jest
        .spyOn(require("../../helpers/date-helpers"), "getTomorrowAppleString")
        .mockReturnValue("2024-01-16");

      const encodedPricePointIdUSA = encodePricePointIdForTest(
        testSubscriptionId,
        "USA",
        "1"
      );
      const encodedPricePointIdGBR = encodePricePointIdForTest(
        testSubscriptionId,
        "GBR",
        "2"
      );
      const encodedPricePointIdDEU = encodePricePointIdForTest(
        testSubscriptionId,
        "DEU",
        "3"
      );

      MockUpdateSubscription.mockResolvedValueOnce({} as any);

      await createSubscriptionPrices(testSubscriptionId, prices);

      expect(MockUpdateSubscription).toHaveBeenCalledTimes(1);
      expect(MockUpdateSubscription).toHaveBeenCalledWith(
        testSubscriptionId,
        expect.any(Object)
      );

      const request = MockUpdateSubscription.mock.calls[0][1] as any;
      expect(request.data).toEqual({
        type: "subscriptions",
        id: testSubscriptionId,
        relationships: {
          prices: {
            data: [
              { type: "subscriptionPrices", id: "${price-USA-0}" },
              { type: "subscriptionPrices", id: "${price-GBR-1}" },
              { type: "subscriptionPrices", id: "${price-DEU-2}" },
            ],
          },
        },
      });

      expect(request.included).toHaveLength(3);
      expect(request.included[0]).toEqual({
        type: "subscriptionPrices",
        id: "${price-USA-0}",
        attributes: { startDate: undefined, preserveCurrentPrice: true },
        relationships: {
          subscription: { data: { type: "subscriptions", id: testSubscriptionId } },
          territory: { data: { type: "territories", id: "USA" } },
          subscriptionPricePoint: {
            data: { type: "subscriptionPricePoints", id: encodedPricePointIdUSA },
          },
        },
      });
      expect(request.included[1]).toEqual({
        type: "subscriptionPrices",
        id: "${price-GBR-1}",
        attributes: { startDate: "2024-01-16", preserveCurrentPrice: true },
        relationships: {
          subscription: { data: { type: "subscriptions", id: testSubscriptionId } },
          territory: { data: { type: "territories", id: "GBR" } },
          subscriptionPricePoint: {
            data: { type: "subscriptionPricePoints", id: encodedPricePointIdGBR },
          },
        },
      });
      expect(request.included[2]).toEqual({
        type: "subscriptionPrices",
        id: "${price-DEU-2}",
        attributes: { startDate: undefined, preserveCurrentPrice: true },
        relationships: {
          subscription: { data: { type: "subscriptions", id: testSubscriptionId } },
          territory: { data: { type: "territories", id: "DEU" } },
          subscriptionPricePoint: {
            data: { type: "subscriptionPricePoints", id: encodedPricePointIdDEU },
          },
        },
      });

      jest.restoreAllMocks();
    });

    it("should handle API errors gracefully", async () => {
      const prices: { price: Price; new: boolean }[] = [
        { price: { price: "4.99", territory: "USA" }, new: true },
      ];

      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
      });
      MockUpdateSubscription.mockRejectedValueOnce(new Error("boom"));

      await expect(
        createSubscriptionPrices(testSubscriptionId, prices)
      ).rejects.toThrow("boom");
    });

    it("should retry with corrected startDate when Apple returns invalid startDate errors", async () => {
      const prices: { price: Price; new: boolean }[] = [
        { price: { price: "4.99", territory: "USA" }, new: false },
        { price: { price: "3.99", territory: "GBR" }, new: false },
      ];

      jest
        .spyOn(require("../../helpers/date-helpers"), "getTomorrowAppleString")
        .mockReturnValue("2024-01-16");

      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
        })

      const capturedRequests: any[] = [];
      MockUpdateSubscription.mockImplementation(async (_id: string, req: any) => {
        capturedRequests.push(JSON.parse(JSON.stringify(req)));
        if (capturedRequests.length === 1) {
          throw new ContextualError("Apple API error", {
            appleError: {
              errors: [
                {
                  status: "409",
                  code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                  detail:
                    "Invalid startDate=2024-01-16, a future date is expected, and must be on or after 2024-01-17",
                  source: { pointer: "/included/0/relationships/prices" },
                },
              ],
            },
          });
        }
        return {} as any;
      });

      await createSubscriptionPrices(testSubscriptionId, prices);

      expect(MockUpdateSubscription).toHaveBeenCalledTimes(2);
      expect(capturedRequests[0].included[0].attributes.startDate).toBe(
        "2024-01-16"
      );
      expect(capturedRequests[1].included[0].attributes.startDate).toBe(
        "2024-01-17"
      );

      jest.restoreAllMocks();
    });

    it("should delete conflicting future prices per territory and retry", async () => {
      const prices: { price: Price; new: boolean }[] = [
        { price: { price: "4.99", territory: "CHE" }, new: false },
        { price: { price: "3.99", territory: "VNM" }, new: false },
      ];

      jest
        .spyOn(require("../../helpers/date-helpers"), "getTomorrowAppleString")
        .mockReturnValue("2024-01-16");

      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "CHE",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
        })
        .mockResolvedValueOnce({
          territory: "VNM",
          resourceType: "subscription",
          pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
        });

      const priceMap = {
        data: [
          {
            type: "subscriptionPrices" as const,
            id: "future-price-che",
            attributes: { startDate: "2025-01-01" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "CHE" } },
            },
          },
          {
            type: "subscriptionPrices" as const,
            id: "future-price-vnm",
            attributes: { startDate: "2025-01-01" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "VNM" } },
            },
          },
        ],
        included: [],
        links: { self: "" },
      };

      MockDeleteSubscriptionPrice.mockResolvedValue(undefined);

      MockUpdateSubscription.mockImplementationOnce(async () => {
        throw new ContextualError("Apple API error", {
          appleError: {
            errors: [
              {
                status: "409",
                code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                detail:
                  "You cannot create more than one future prices for territory = CHE.",
                source: { pointer: "/included/0/relationships/prices" },
              },
              {
                status: "409",
                code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                detail:
                  "You cannot create more than one future prices for territory = VNM.",
                source: { pointer: "/included/1/relationships/prices" },
              },
            ],
          },
        });
      });
      MockUpdateSubscription.mockResolvedValueOnce({} as any);

      await createSubscriptionPrices(testSubscriptionId, prices, priceMap as any);

      expect(MockDeleteSubscriptionPrice).toHaveBeenCalledTimes(2);
      expect(MockDeleteSubscriptionPrice).toHaveBeenCalledWith("future-price-che");
      expect(MockDeleteSubscriptionPrice).toHaveBeenCalledWith("future-price-vnm");
      expect(MockUpdateSubscription).toHaveBeenCalledTimes(2);

      jest.restoreAllMocks();
    });
  });

  describe("applySubscriptionPricingWithEqualizations", () => {
    it("should apply pricing changes with equalizations", async () => {
      const desiredPriceSchedule: PriceSchedule = {
        baseTerritory: "USA",
        prices: [
          { price: "4.99", territory: "USA" },
          { price: "3.99", territory: "GBR" },
        ],
      };

      const currentPriceSchedule: PriceSchedule = {
        baseTerritory: "USA",
        prices: [{ price: "4.99", territory: "USA" }],
      };

      const changes = {
        addedPrices: [{ price: "3.99", territory: "GBR" as const }],
        updatedPrices: [],
        deletedTerritories: [],
      };

      // Mock the internal functions by directly calling them
      MockFetchSubscriptionPrices.mockResolvedValue({
        data: [
          {
            id: "price-1",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-01" },
            relationships: { territory: { data: { id: "USA" } } },
          },
        ],
        included: [],
        links: { self: "" },
      } as any);

      MockProcessSubscriptionPriceResponse.mockResolvedValue(
        currentPriceSchedule
      );

      mockGetTerritoryPricePoints.mockResolvedValue({
        territory: "GBR",
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: "3.99" }],
      });

      MockUpdateSubscription.mockResolvedValue({} as any);

      MockFetchSubscriptionPricePointEqualizations.mockResolvedValue({
        data: [
          {
            type: "subscriptionPricePoints" as const,
            id: "pp1",
            attributes: { customerPrice: "4.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "USA" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp2",
            attributes: { customerPrice: "3.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "GBR" } },
            },
          },
        ],
        links: { self: "" },
      });

      await applySubscriptionPricingWithEqualizations(
        testSubscriptionId,
        desiredPriceSchedule,
        currentPriceSchedule,
        changes
      );

      expect(MockUpdateSubscription).toHaveBeenCalled();
    });
  });

  describe("buildCompleteDesiredPriceMap", () => {
    it("should build complete price map with equalizations and overrides", async () => {
      const pricing: PriceSchedule = {
        baseTerritory: "USA",
        prices: [
          { price: "4.99", territory: "USA" },
          { price: "5.99", territory: "DEU" }, // will override the price from equalizations
        ],
      };

      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
      });

      MockFetchSubscriptionPricePointEqualizations.mockResolvedValue({
        data: [
          {
            type: "subscriptionPricePoints" as const,
            id: "pp1",
            attributes: { customerPrice: "4.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "USA" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp2",
            attributes: { customerPrice: "3.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "GBR" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp3",
            attributes: { customerPrice: "4.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "FRA" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp4",
            attributes: { customerPrice: "2.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "DEU" } },
            },
          },
        ],
        links: { self: "" },
      });

      const result = await buildCompleteDesiredPriceMap(
        pricing,
        testSubscriptionId
      );

      expect(result.size).toBe(4);
      expect(result.get("USA")).toEqual({ price: "4.99", territory: "USA" });
      expect(result.get("GBR")).toEqual({ price: "3.99", territory: "GBR" });
      expect(result.get("FRA")).toEqual({ price: "4.99", territory: "FRA" });
      expect(result.get("DEU")).toEqual({ price: "5.99", territory: "DEU" }); // Override
    });

    it("should throw error when base territory price not found", async () => {
      const pricing: PriceSchedule = {
        baseTerritory: "USA",
        prices: [
          { price: "4.99", territory: "GBR" }, // No USA price
        ],
      };

      await expect(
        buildCompleteDesiredPriceMap(pricing, testSubscriptionId)
      ).rejects.toThrow("Base territory price not found for territory USA");
    });
  });

  describe("buildSubscriptionPricesWithEqualizations", () => {
    it("should fetch equalizations and return prices", async () => {
      const mockEqualizationsResponse = {
        data: [
          {
            type: "subscriptionPricePoints" as const,
            id: "pp1",
            attributes: { customerPrice: "3.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "USA" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp2",
            attributes: { customerPrice: "4.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "GBR" } },
            },
          },
        ],
        links: { self: "" },
      };

      MockFetchSubscriptionPricePointEqualizations.mockResolvedValue(
        mockEqualizationsResponse
      );

      const result =
        await buildSubscriptionPricesWithEqualizations(testPricePointId);

      expect(result).toEqual([
        { price: "3.99", territory: "USA" },
        { price: "4.99", territory: "GBR" },
      ]);

      expect(MockFetchSubscriptionPricePointEqualizations).toHaveBeenCalledWith(
        testPricePointId
      );
    });

    it("should filter out items without required attributes", async () => {
      const mockEqualizationsResponse = {
        data: [
          {
            type: "subscriptionPricePoints" as const,
            id: "pp1",
            attributes: { customerPrice: "3.99" },
            relationships: {
              territory: { data: { type: "territories" as const, id: "USA" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp2",
            attributes: {}, // Missing customerPrice
            relationships: {
              territory: { data: { type: "territories" as const, id: "GBR" } },
            },
          },
          {
            type: "subscriptionPricePoints" as const,
            id: "pp3",
            attributes: { customerPrice: "4.99" },
            relationships: {}, // Missing territory
          },
        ],
        links: { self: "" },
      };

      MockFetchSubscriptionPricePointEqualizations.mockResolvedValue(
        mockEqualizationsResponse
      );

      const result =
        await buildSubscriptionPricesWithEqualizations(testPricePointId);

      expect(result).toEqual([{ price: "3.99", territory: "USA" }]);
    });

    it("should throw error when response data is not array", async () => {
      const mockEqualizationsResponse = {
        data: "not an array",
        links: { self: "" },
      };

      MockFetchSubscriptionPricePointEqualizations.mockResolvedValue(
        mockEqualizationsResponse as any
      );

      await expect(
        buildSubscriptionPricesWithEqualizations(testPricePointId)
      ).rejects.toThrow("Equalizations response data is not an array");
    });

    it("should throw contextual error when API call fails", async () => {
      MockFetchSubscriptionPricePointEqualizations.mockRejectedValue(
        new Error("API Error")
      );

      await expect(
        buildSubscriptionPricesWithEqualizations(testPricePointId)
      ).rejects.toThrow("API Error");
    });
  });

  describe("findPricesToUpdate", () => {
    it("should return empty array when both maps are empty", () => {
      const desiredPriceMap = new Map<string, Price>();
      const currentPriceMap = new Map<string, Price>();

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([]);
    });

    it("should return all desired prices when current map is empty", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
      ]);
      const currentPriceMap = new Map<string, Price>();

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "4.99", territory: "USA" }, new: true },
        { price: { price: "3.99", territory: "GBR" }, new: true },
      ]);
    });

    it("should return empty array when prices are identical", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([]);
    });

    it("should return prices that have changed", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "5.99", territory: "USA" }], // Changed from 4.99
        ["GBR", { price: "3.99", territory: "GBR" }], // Same
        ["DEU", { price: "4.99", territory: "DEU" }], // New territory
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "5.99", territory: "USA" }, new: false },
        { price: { price: "4.99", territory: "DEU" }, new: true },
      ]);
    });

    it("should handle numeric price comparison correctly", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.50", territory: "USA" }],
        ["GBR", { price: "3.00", territory: "GBR" }],
        ["DEU", { price: "5.0", territory: "DEU" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.5", territory: "USA" }], // Same as 4.50
        ["GBR", { price: "3", territory: "GBR" }], // Same as 3.00
        ["DEU", { price: "5.00", territory: "DEU" }], // Same as 5.0
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([]);
    });

    it("should handle different decimal precisions as different prices", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.50", territory: "USA" }],
        ["GBR", { price: "3.00", territory: "GBR" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.5", territory: "USA" }], // Should be considered same
        ["GBR", { price: "3.01", territory: "GBR" }], // Different
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "3.00", territory: "GBR" }, new: false },
      ]);
    });

    it("should not include territories that exist in current but not in desired", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }], // Not in desired
        ["DEU", { price: "5.99", territory: "DEU" }], // Not in desired
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([]);
    });

    it("should handle large maps efficiently", () => {
      const desiredPriceMap = new Map<string, Price>();
      const currentPriceMap = new Map<string, Price>();

      // Use valid territory codes for testing
      const validTerritories = [
        "USA",
        "GBR",
        "DEU",
        "FRA",
        "JPN",
        "AUS",
        "CAN",
        "BRA",
        "IND",
        "CHN",
      ];

      // Create large maps with valid territories
      for (let i = 0; i < 100; i++) {
        const territory = validTerritories[i % validTerritories.length];
        const price = (i + 1).toString();

        if (i % 2 === 0) {
          desiredPriceMap.set(territory, {
            price,
            territory: territory as any,
          });
        }

        if (i % 3 === 0) {
          currentPriceMap.set(territory, {
            price,
            territory: territory as any,
          });
        }
      }

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      // Should include territories that are in desired but not current
      // and territories where prices differ
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThan(100);
    });

    it("should handle edge case with zero prices", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "0", territory: "USA" }],
        ["GBR", { price: "0.00", territory: "GBR" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "0.0", territory: "USA" }], // Should be same as "0"
        ["GBR", { price: "0.01", territory: "GBR" }], // Different from "0.00"
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "0.00", territory: "GBR" }, new: false },
      ]);
    });

    it("should handle very small price differences", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.98", territory: "USA" }], // Very close but different
        ["GBR", { price: "3.99", territory: "GBR" }], // Same
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "4.99", territory: "USA" }, new: false },
      ]);
    });

    it("should correctly identify new vs existing prices", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }], // New territory
        ["GBR", { price: "3.99", territory: "GBR" }], // Same price
        ["DEU", { price: "5.99", territory: "DEU" }], // Changed price
        ["FRA", { price: "6.99", territory: "FRA" }], // New territory
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["GBR", { price: "3.99", territory: "GBR" }], // Same price - should not be included
        ["DEU", { price: "4.99", territory: "DEU" }], // Different price - should be included as existing
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "4.99", territory: "USA" }, new: true }, // New territory
        { price: { price: "5.99", territory: "DEU" }, new: false }, // Changed price
        { price: { price: "6.99", territory: "FRA" }, new: true }, // New territory
      ]);

      // Verify that GBR is not included (same price)
      expect(result.find((r) => r.price.territory === "GBR")).toBeUndefined();
    });

    it("should handle all new territories correctly", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
        ["DEU", { price: "5.99", territory: "DEU" }],
      ]);
      const currentPriceMap = new Map<string, Price>(); // Empty current map

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "4.99", territory: "USA" }, new: true },
        { price: { price: "3.99", territory: "GBR" }, new: true },
        { price: { price: "5.99", territory: "DEU" }, new: true },
      ]);

      // All should be marked as new
      expect(result.every((r) => r.new === true)).toBe(true);
    });

    it("should handle all existing territories with price changes correctly", () => {
      const desiredPriceMap = new Map<string, Price>([
        ["USA", { price: "5.99", territory: "USA" }], // Changed from 4.99
        ["GBR", { price: "4.99", territory: "GBR" }], // Changed from 3.99
        ["DEU", { price: "6.99", territory: "DEU" }], // Changed from 5.99
      ]);
      const currentPriceMap = new Map<string, Price>([
        ["USA", { price: "4.99", territory: "USA" }],
        ["GBR", { price: "3.99", territory: "GBR" }],
        ["DEU", { price: "5.99", territory: "DEU" }],
      ]);

      const result = findPricesToUpdate(desiredPriceMap, currentPriceMap);

      expect(result).toEqual([
        { price: { price: "5.99", territory: "USA" }, new: false },
        { price: { price: "4.99", territory: "GBR" }, new: false },
        { price: { price: "6.99", territory: "DEU" }, new: false },
      ]);

      // All should be marked as existing (not new)
      expect(result.every((r) => r.new === false)).toBe(true);
    });
  });

  describe("isFuturePrice", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("should return false for undefined startDate", () => {
      expect(isFuturePrice(undefined)).toBe(false);
    });

    it("should return false for invalid date string", () => {
      expect(isFuturePrice("not-a-date")).toBe(false);
      expect(isFuturePrice("")).toBe(false);
    });

    it("should return true for a date in the future", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      expect(isFuturePrice("2024-01-16")).toBe(true);
      expect(isFuturePrice("2024-02-01")).toBe(true);
      expect(isFuturePrice("2025-01-01")).toBe(true);
    });

    it("should return false for a date in the past", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      expect(isFuturePrice("2024-01-14")).toBe(false);
      expect(isFuturePrice("2024-01-01")).toBe(false);
      expect(isFuturePrice("2023-12-31")).toBe(false);
    });

    it("should return false for today's date (not strictly future)", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      expect(isFuturePrice("2024-01-15")).toBe(false);
    });

    it("should handle date strings with time components correctly", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      expect(isFuturePrice("2024-01-16T00:00:00Z")).toBe(true);
      expect(isFuturePrice("2024-01-14T23:59:59Z")).toBe(false);
    });

    it("should correctly compare dates at midnight boundaries", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      expect(isFuturePrice("2024-01-15")).toBe(false);
      expect(isFuturePrice("2024-01-16")).toBe(true);
    });
  });

  describe("extractFuturePriceIds", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it("should return empty map when response has no data", () => {
      const response = { data: [], included: [], links: { self: "" } };
      const result = extractFuturePriceIds(response as any);
      expect(result.size).toBe(0);
    });

    it("should return empty map when all prices are current", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      const response = {
        data: [
          {
            id: "price-1",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-10" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-2",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-15" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
        ],
        included: [],
        links: { self: "" },
      };

      const result = extractFuturePriceIds(response as any);
      expect(result.size).toBe(0);
    });

    it("should extract future price IDs correctly", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      const response = {
        data: [
          {
            id: "price-1",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-10" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-2",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-20" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
          {
            id: "price-3",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-02-01" },
            relationships: { territory: { data: { id: "DEU" } } },
          },
        ],
        included: [],
        links: { self: "" },
      };

      const result = extractFuturePriceIds(response as any);
      expect(result.size).toBe(2);
      expect(result.get("GBR")).toBe("price-2");
      expect(result.get("DEU")).toBe("price-3");
      expect(result.has("USA")).toBe(false);
    });

    it("should skip prices without territory", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      const response = {
        data: [
          {
            id: "price-1",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-20" },
            relationships: {},
          },
          {
            id: "price-2",
            type: "subscriptionPrices",
            attributes: { startDate: "2024-01-20" },
            relationships: { territory: { data: { id: "USA" } } },
          },
        ],
        included: [],
        links: { self: "" },
      };

      const result = extractFuturePriceIds(response as any);
      expect(result.size).toBe(1);
      expect(result.get("USA")).toBe("price-2");
    });

    it("should handle prices without startDate as not future", () => {
      const mockCurrentDate = new Date("2024-01-15T00:00:00.000Z");
      jest
        .spyOn(require("../../helpers/date-helpers"), "getCurrentDate")
        .mockReturnValue(mockCurrentDate);

      const response = {
        data: [
          {
            id: "price-1",
            type: "subscriptionPrices",
            attributes: {},
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-2",
            type: "subscriptionPrices",
            attributes: { startDate: undefined },
            relationships: { territory: { data: { id: "GBR" } } },
          },
        ],
        included: [],
        links: { self: "" },
      };

      const result = extractFuturePriceIds(response as any);
      expect(result.size).toBe(0);
    });
  });

  describe("createSubscriptionPrices bulk retry behavior", () => {
    it("should delete multiple future prices across retries for the same territory", async () => {
      const prices: { price: Price; new: boolean }[] = [
        { price: { price: "4.99", territory: "USA" }, new: false },
      ];

      jest
        .spyOn(require("../../helpers/date-helpers"), "getTomorrowAppleString")
        .mockReturnValue("2024-01-16");

      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "subscription",
        pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
      });

      const priceMap = createPriceMapWithMultipleFuturePrices("USA", [
        { id: "future-price-1", startDate: "2025-01-01" },
        { id: "future-price-2", startDate: "2025-02-01" },
      ]);

      const deleted: string[] = [];
      MockDeleteSubscriptionPrice.mockImplementation(async (id: string) => {
        deleted.push(id);
        return undefined;
      });

      let attempt = 0;
      MockUpdateSubscription.mockImplementation(async () => {
        attempt++;
        if (attempt <= 2) {
          throw new ContextualError("Apple API error", {
            appleError: {
              errors: [
                {
                  status: "409",
                  code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                  detail:
                    "You cannot create more than one future prices for territory = USA.",
                  source: { pointer: "/included/0/relationships/prices" },
                },
              ],
            },
          });
        }
        return {} as any;
      });

      await createSubscriptionPrices(testSubscriptionId, prices, priceMap as any);

      expect(MockUpdateSubscription).toHaveBeenCalledTimes(3);
      expect(MockDeleteSubscriptionPrice).toHaveBeenCalledTimes(2);
      expect(deleted).toEqual(["future-price-2", "future-price-1"]);

      jest.restoreAllMocks();
    });
  });
});

const createPriceMapWithMultipleFuturePrices = (
  territory: string,
  priceIds: { id: string; startDate: string }[]
) => ({
  data: priceIds.map(({ id, startDate }) => ({
    type: "subscriptionPrices" as const,
    id,
    attributes: { startDate },
    relationships: {
      territory: {
        data: {
          type: "territories" as const,
          id: territory,
        },
      },
    },
  })),
  included: [],
  links: { self: "" },
});
