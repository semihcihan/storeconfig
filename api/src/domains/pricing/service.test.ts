import { jest } from "@jest/globals";
import { createAppPriceSchedule } from "./service";
import {
  fetchAppPricePoints,
  createAppPriceSchedule as createAppPriceScheduleAPI,
} from "./api-client";
import { ContextualError } from "@semihcihan/shared";
import { PriceScheduleSchema, PriceSchema } from "@semihcihan/shared";
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

// Mock dependencies
jest.mock("./api-client");

const MockFetchAppPricePoints = fetchAppPricePoints as jest.MockedFunction<
  typeof fetchAppPricePoints
>;
const MockCreateAppPriceScheduleAPI =
  createAppPriceScheduleAPI as jest.MockedFunction<
    typeof createAppPriceScheduleAPI
  >;

// Mock price point data hook
let mockGetTerritoryPricePoints: jest.MockedFunction<
  (
    resourceType: string,
    territory: string
  ) => Promise<TerritoryPricePoints | null>
>;

type Price = z.infer<typeof PriceSchema>;
type PriceSchedule = z.infer<typeof PriceScheduleSchema>;

describe("PricingService", () => {
  const testAppId = "test-app-id";
  const testTerritory = "USA";
  const testPrice = "4.99";
  const testPricePointId = "test-price-point-id";

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up mock hook
    mockGetTerritoryPricePoints = jest.fn();
    setPricePointDataHook(mockGetTerritoryPricePoints);
  });

  describe("createAppPriceSchedule", () => {
    const validPriceSchedule: PriceSchedule = {
      baseTerritory: "USA",
      prices: [
        {
          territory: "USA",
          price: "4.99",
        },
        {
          territory: "GBR",
          price: "3.99",
        },
      ],
    };

    it("should successfully create app price schedule", async () => {
      // Mock cached price points for USA
      const encodedPricePointIdUSA = encodePricePointIdForTest(
        testAppId,
        "USA",
        "1"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
      });

      // Mock cached price points for GBR
      const encodedPricePointIdGBR = encodePricePointIdForTest(
        testAppId,
        "GBR",
        "2"
      );
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "GBR",
        resourceType: "app",
        pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
      });

      MockCreateAppPriceScheduleAPI.mockResolvedValue({
        data: {
          type: "appPriceSchedules" as const,
          id: "test-schedule-id",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/appPriceSchedules/test-schedule-id",
        },
      } as any);

      await createAppPriceSchedule(validPriceSchedule, testAppId);

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(mockGetTerritoryPricePoints).toHaveBeenNthCalledWith(
        1,
        "app",
        "USA",
        testAppId
      );
      expect(mockGetTerritoryPricePoints).toHaveBeenNthCalledWith(
        2,
        "app",
        "GBR",
        testAppId
      );

      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalledTimes(1);
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            type: "appPriceSchedules",
            relationships: {
              app: {
                data: {
                  type: "apps",
                  id: testAppId,
                },
              },
              baseTerritory: {
                data: {
                  type: "territories",
                  id: "USA",
                },
              },
              manualPrices: {
                data: [
                  {
                    type: "appPrices",
                    id: "${price-USA-0}",
                  },
                  {
                    type: "appPrices",
                    id: "${price-GBR-1}",
                  },
                ],
              },
            },
          },
          included: expect.arrayContaining([
            expect.objectContaining({
              type: "appPrices",
              id: "${price-USA-0}",
              attributes: {
                manual: true,
                startDate: undefined,
                endDate: undefined,
              },
              relationships: {
                appPricePoint: {
                  data: {
                    type: "appPricePoints",
                    id: encodedPricePointIdUSA,
                  },
                },
                territory: {
                  data: {
                    type: "territories",
                    id: "USA",
                  },
                },
              },
            }),
            expect.objectContaining({
              type: "appPrices",
              id: "${price-GBR-1}",
              relationships: {
                appPricePoint: {
                  data: {
                    type: "appPricePoints",
                    id: encodedPricePointIdGBR,
                  },
                },
                territory: {
                  data: {
                    type: "territories",
                    id: "GBR",
                  },
                },
              },
            }),
          ]),
        })
      );
    });

    it("should use closest price when exact price point not found for first price", async () => {
      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "app",
          pricePoints: [
            { priceIndex: "1", customerPrice: "5.99" }, // Different price
          ],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "app",
          pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
        });

      MockCreateAppPriceScheduleAPI.mockResolvedValue({
        data: {
          type: "appPriceSchedules" as const,
          id: "test-schedule-id",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/appPriceSchedules/test-schedule-id",
        },
      } as any);

      await createAppPriceSchedule(validPriceSchedule, testAppId);

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalled();
    });

    it("should use closest price when exact price point not found for second price", async () => {
      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "app",
          pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "app",
          pricePoints: [
            { priceIndex: "2", customerPrice: "5.99" }, // Different price
          ],
        });

      MockCreateAppPriceScheduleAPI.mockResolvedValue({
        data: {
          type: "appPriceSchedules" as const,
          id: "test-schedule-id",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/appPriceSchedules/test-schedule-id",
        },
      } as any);

      await createAppPriceSchedule(validPriceSchedule, testAppId);

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalled();
    });

    it("should handle empty price points response", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce(null);

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow(
        "No price points data available for app in territory USA"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).not.toHaveBeenCalled();
    });

    it("should handle null price points response", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce(null);

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow(
        "No price points data available for app in territory USA"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).not.toHaveBeenCalled();
    });

    it("should handle single price in schedule", async () => {
      const singlePriceSchedule: PriceSchedule = {
        baseTerritory: "USA",
        prices: [
          {
            territory: "USA",
            price: "4.99",
          },
        ],
      };

      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
      });

      MockCreateAppPriceScheduleAPI.mockResolvedValue({
        data: {
          type: "appPriceSchedules" as const,
          id: "test-schedule-id",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/appPriceSchedules/test-schedule-id",
        },
      } as any);

      await createAppPriceSchedule(singlePriceSchedule, testAppId);

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(1);
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalledTimes(1);
    });

    it("should handle API error when creating price schedule", async () => {
      mockGetTerritoryPricePoints
        .mockResolvedValueOnce({
          territory: "USA",
          resourceType: "app",
          pricePoints: [{ priceIndex: "1", customerPrice: "4.99" }],
        })
        .mockResolvedValueOnce({
          territory: "GBR",
          resourceType: "app",
          pricePoints: [{ priceIndex: "2", customerPrice: "3.99" }],
        });
      MockCreateAppPriceScheduleAPI.mockRejectedValue(new Error("API Error"));

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow("API Error");

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalledTimes(1);
    });

    it("should handle price points with missing attributes", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: [], // Empty price points
      });

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow(
        "No price points data available for app in territory USA"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).not.toHaveBeenCalled();
    });

    it("should handle price points with missing relationships", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: [], // Empty price points
      });
      MockCreateAppPriceScheduleAPI.mockReset();

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow(
        "No price points data available for app in territory USA"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).not.toHaveBeenCalled();
    });

    it("should handle price points with missing territory data", async () => {
      mockGetTerritoryPricePoints.mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: [], // Empty price points
      });
      MockCreateAppPriceScheduleAPI.mockReset();

      await expect(
        createAppPriceSchedule(validPriceSchedule, testAppId)
      ).rejects.toThrow(
        "No price points data available for app in territory USA"
      );

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledWith(
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).not.toHaveBeenCalled();
    });

    it("should handle multiple prices with same territory", async () => {
      const multiPriceSchedule: PriceSchedule = {
        baseTerritory: "USA",
        prices: [
          {
            territory: "USA",
            price: "4.99",
          },
          {
            territory: "USA",
            price: "9.99",
          },
        ],
      };

      mockGetTerritoryPricePoints.mockResolvedValue({
        territory: "USA",
        resourceType: "app",
        pricePoints: [
          { priceIndex: "1", customerPrice: "4.99" },
          { priceIndex: "2", customerPrice: "9.99" },
        ],
      });

      MockCreateAppPriceScheduleAPI.mockResolvedValue({
        data: {
          type: "appPriceSchedules" as const,
          id: "test-schedule-id",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/appPriceSchedules/test-schedule-id",
        },
      } as any);

      await createAppPriceSchedule(multiPriceSchedule, testAppId);

      expect(mockGetTerritoryPricePoints).toHaveBeenCalledTimes(2);
      expect(mockGetTerritoryPricePoints).toHaveBeenNthCalledWith(
        1,
        "app",
        "USA",
        testAppId
      );
      expect(mockGetTerritoryPricePoints).toHaveBeenNthCalledWith(
        2,
        "app",
        "USA",
        testAppId
      );
      expect(MockCreateAppPriceScheduleAPI).toHaveBeenCalledTimes(1);
    });
  });
});
