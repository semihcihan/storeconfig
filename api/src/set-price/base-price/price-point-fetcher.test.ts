import { jest } from "@jest/globals";
import { getPricePointsForSelectedItem } from "./price-point-fetcher";
import {
  getTerritoryPricePointsData,
  setPricePointDataHook,
} from "../../services/price-point";
import type { AppStoreModel } from "@semihcihan/shared";

// Mock dependencies
jest.mock("../../services/price-point");

const MockGetTerritoryPricePointsData =
  getTerritoryPricePointsData as jest.MockedFunction<
    typeof getTerritoryPricePointsData
  >;

describe("PricePointFetcher", () => {
  const testAppId = "test-app-id";
  const testTerritoryId = "test-territory-id";
  const testAppStoreState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: testAppId,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setPricePointDataHook(null);
  });

  describe("getPricePointsForSelectedItem", () => {
    describe("App Price Points", () => {
      it("should return price points for app using cached data", async () => {
        const mockPricePoints = [
          { priceIndex: "1", customerPrice: "0.99" },
          { priceIndex: "2", customerPrice: "1.99" },
        ];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          { type: "app", id: "app", name: "Test App" },
          testAppStoreState.appId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "app",
          testTerritoryId
        );
        expect(result).toHaveLength(2);
        // IDs are just the price values since they're only used for matching
        expect(result[0]).toEqual({
          id: "0.99",
          price: "0.99",
        });
        expect(result[1]).toEqual({
          id: "1.99",
          price: "1.99",
        });
        // Verify prices are sorted
        expect(Number(result[0].price)).toBeLessThan(Number(result[1].price));
      });

      it("should throw error when no price points are available", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue(null);

        await expect(
          getPricePointsForSelectedItem(
            { type: "app", id: "app", name: "Test App" },
            testAppStoreState.appId,
            testTerritoryId
          )
        ).rejects.toThrow(
          "No price points available for app in territory test-territory-id"
        );
      });

      it("should throw error when price points array is empty", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue([]);

        await expect(
          getPricePointsForSelectedItem(
            { type: "app", id: "app", name: "Test App" },
            testAppStoreState.appId,
            testTerritoryId
          )
        ).rejects.toThrow(
          "No price points available for app in territory test-territory-id"
        );
      });
    });

    describe("In-App Purchase Price Points", () => {
      it("should return price points for IAP", async () => {
        const mockPricePoints = [
          { priceIndex: "1", customerPrice: "0.99" },
          { priceIndex: "2", customerPrice: "1.99" },
        ];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          { type: "inAppPurchase", id: "product1", name: "Test IAP" },
          testAppStoreState.appId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "iap",
          testTerritoryId
        );
        expect(result).toHaveLength(2);
        // IDs are just the price values
        expect(result[0].id).toBe(result[0].price);
        expect(result[1].id).toBe(result[1].price);
      });

      it("should use different cache keys for different territories", async () => {
        const mockPricePoints1 = [{ priceIndex: "1", customerPrice: "0.99" }];
        const mockPricePoints2 = [{ priceIndex: "1", customerPrice: "1.99" }];

        MockGetTerritoryPricePointsData.mockResolvedValueOnce(
          mockPricePoints1
        ).mockResolvedValueOnce(mockPricePoints2);

        // First territory
        const result1 = await getPricePointsForSelectedItem(
          { type: "inAppPurchase", id: "product1", name: "Test IAP" },
          testAppStoreState.appId,
          "territory1"
        );

        // Second territory
        const result2 = await getPricePointsForSelectedItem(
          { type: "inAppPurchase", id: "product1", name: "Test IAP" },
          testAppStoreState.appId,
          "territory2"
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "iap",
          "territory1"
        );
        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "iap",
          "territory2"
        );
        expect(result1[0].price).toBe("0.99");
        expect(result2[0].price).toBe("1.99");
      });
    });

    describe("Subscription Price Points", () => {
      it("should return price points for subscription", async () => {
        const mockPricePoints = [
          { priceIndex: "1", customerPrice: "4.99" },
          { priceIndex: "2", customerPrice: "9.99" },
        ];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          {
            type: "subscription",
            id: "sub-product1",
            name: "Test Subscription",
          },
          testAppStoreState.appId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "subscription",
          testTerritoryId
        );
        expect(result).toHaveLength(2);
        // IDs are just the price values
        expect(result[0].id).toBe(result[0].price);
        expect(result[1].id).toBe(result[1].price);
      });

      it("should handle offer type subscriptions", async () => {
        const mockPricePoints = [{ priceIndex: "1", customerPrice: "2.99" }];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          { type: "offer", id: "offer1", name: "Test Offer" },
          testAppStoreState.appId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "subscription",
          testTerritoryId
        );
        expect(result).toHaveLength(1);
        // ID is just the price value
        expect(result[0].id).toBe(result[0].price);
      });
    });

    describe("Price Point Conversion", () => {
      it("should convert cached PricePoint[] to PricePointInfo[] with price as id", async () => {
        const mockPricePoints = [
          { priceIndex: "10", customerPrice: "5.99" },
          { priceIndex: "20", customerPrice: "3.99" },
          { priceIndex: "30", customerPrice: "7.99" },
        ];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          { type: "app", id: "app", name: "Test App" },
          testAppId,
          testTerritoryId
        );

        expect(result).toHaveLength(3);
        // Verify all prices are present
        expect(result.map((r) => r.price)).toContain("3.99");
        expect(result.map((r) => r.price)).toContain("5.99");
        expect(result.map((r) => r.price)).toContain("7.99");
        // Verify prices are sorted
        expect(Number(result[0].price)).toBeLessThanOrEqual(
          Number(result[1].price)
        );
        expect(Number(result[1].price)).toBeLessThanOrEqual(
          Number(result[2].price)
        );
        // Verify IDs are just the price values
        expect(result[0].id).toBe(result[0].price);
        expect(result[1].id).toBe(result[1].price);
        expect(result[2].id).toBe(result[2].price);
      });

      it("should sort price points by price value", async () => {
        const mockPricePoints = [
          { priceIndex: "1", customerPrice: "9.99" },
          { priceIndex: "2", customerPrice: "0.99" },
          { priceIndex: "3", customerPrice: "4.99" },
        ];

        MockGetTerritoryPricePointsData.mockResolvedValue(mockPricePoints);

        const result = await getPricePointsForSelectedItem(
          { type: "app", id: "app", name: "Test App" },
          testAppId,
          testTerritoryId
        );

        expect(result[0].price).toBe("0.99");
        expect(result[1].price).toBe("4.99");
        expect(result[2].price).toBe("9.99");
      });
    });

    describe("Resource Type Mapping", () => {
      it("should map app type to 'app' resource type", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue([
          { priceIndex: "1", customerPrice: "0.99" },
        ]);

        await getPricePointsForSelectedItem(
          { type: "app", id: "app", name: "Test App" },
          testAppId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "app",
          testTerritoryId
        );
      });

      it("should map inAppPurchase type to 'iap' resource type", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue([
          { priceIndex: "1", customerPrice: "0.99" },
        ]);

        await getPricePointsForSelectedItem(
          { type: "inAppPurchase", id: "product1", name: "Test IAP" },
          testAppId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "iap",
          testTerritoryId
        );
      });

      it("should map subscription type to 'subscription' resource type", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue([
          { priceIndex: "1", customerPrice: "4.99" },
        ]);

        await getPricePointsForSelectedItem(
          {
            type: "subscription",
            id: "sub-product1",
            name: "Test Subscription",
          },
          testAppId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "subscription",
          testTerritoryId
        );
      });

      it("should map offer type to 'subscription' resource type", async () => {
        MockGetTerritoryPricePointsData.mockResolvedValue([
          { priceIndex: "1", customerPrice: "2.99" },
        ]);

        await getPricePointsForSelectedItem(
          { type: "offer", id: "offer1", name: "Test Offer" },
          testAppId,
          testTerritoryId
        );

        expect(MockGetTerritoryPricePointsData).toHaveBeenCalledWith(
          "subscription",
          testTerritoryId
        );
      });
    });
  });
});
