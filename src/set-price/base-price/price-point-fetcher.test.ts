import { jest } from "@jest/globals";
import {
  fetchTerritoryPricePointsForSelectedItem,
  clearCaches,
} from "./price-point-fetcher";
import { fetchAppPricePoints } from "../../domains/pricing/api-client";
import {
  fetchInAppPurchases,
  fetchIAPPricePoints,
} from "../../domains/in-app-purchases/api-client";
import {
  fetchAllSubscriptionPricePoints,
  fetchSubscriptionGroups,
} from "../../domains/subscriptions/api-client";
import type { AppStoreModel } from "../../models/app-store";

// Mock dependencies
jest.mock("../../domains/pricing/api-client");
jest.mock("../../domains/in-app-purchases/api-client");
jest.mock("../../domains/subscriptions/api-client");

const MockFetchAppPricePoints = fetchAppPricePoints as jest.MockedFunction<
  typeof fetchAppPricePoints
>;
const MockFetchInAppPurchases = fetchInAppPurchases as jest.MockedFunction<
  typeof fetchInAppPurchases
>;
const MockFetchIAPPricePoints = fetchIAPPricePoints as jest.MockedFunction<
  typeof fetchIAPPricePoints
>;
const MockFetchAllSubscriptionPricePoints =
  fetchAllSubscriptionPricePoints as jest.MockedFunction<
    typeof fetchAllSubscriptionPricePoints
  >;
const MockFetchSubscriptionGroups =
  fetchSubscriptionGroups as jest.MockedFunction<
    typeof fetchSubscriptionGroups
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
    clearCaches(); // Clear all caches before each test
  });

  describe("App Price Points Caching", () => {
    it("should cache app price points and return cached results on subsequent calls", async () => {
      const mockPricePoints = {
        data: [
          { id: "pp1", attributes: { customerPrice: "0.99" } },
          { id: "pp2", attributes: { customerPrice: "1.99" } },
        ],
      };

      MockFetchAppPricePoints.mockResolvedValue(mockPricePoints as any);

      // First call - should fetch from API
      const result1 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app", name: "Test App" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchAppPricePoints).toHaveBeenCalledTimes(1);
      expect(result1).toHaveLength(2);

      // Second call - should use cache
      const result2 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app", name: "Test App" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchAppPricePoints).toHaveBeenCalledTimes(1); // Still only called once
      expect(result2).toEqual(result1);
    });

    it("should use different cache keys for different app-territory combinations", async () => {
      const mockPricePoints1 = {
        data: [{ id: "pp1", attributes: { customerPrice: "0.99" } }],
      };
      const mockPricePoints2 = {
        data: [{ id: "pp2", attributes: { customerPrice: "1.99" } }],
      };

      MockFetchAppPricePoints.mockResolvedValueOnce(
        mockPricePoints1 as any
      ).mockResolvedValueOnce(mockPricePoints2 as any);

      // First territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app", name: "Test App" },
        testAppStoreState,
        "territory1"
      );

      // Second territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app", name: "Test App" },
        testAppStoreState,
        "territory2"
      );

      expect(MockFetchAppPricePoints).toHaveBeenCalledTimes(2);
      expect(MockFetchAppPricePoints).toHaveBeenCalledWith(
        testAppId,
        "territory1"
      );
      expect(MockFetchAppPricePoints).toHaveBeenCalledWith(
        testAppId,
        "territory2"
      );
    });
  });

  describe("In-App Purchase ID Caching", () => {
    it("should cache IAP ID and reuse it on subsequent calls", async () => {
      const mockIAPs = {
        data: [
          { id: "iap1", attributes: { productId: "product1" } },
          { id: "iap2", attributes: { productId: "product2" } },
        ],
      };

      const mockPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "0.99" } }],
      };

      MockFetchInAppPurchases.mockResolvedValue(mockIAPs as any);
      MockFetchIAPPricePoints.mockResolvedValue(mockPricePoints as any);

      // First call - should fetch IAP and cache ID
      const result1 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchInAppPurchases).toHaveBeenCalledTimes(1);
      expect(MockFetchIAPPricePoints).toHaveBeenCalledWith(
        "iap1",
        testTerritoryId
      );

      // Second call with different territory - should use cached IAP ID but fetch new price points
      const result2 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        "different-territory"
      );

      expect(MockFetchInAppPurchases).toHaveBeenCalledTimes(1); // Still only called once for IAP ID
      expect(MockFetchIAPPricePoints).toHaveBeenCalledTimes(2); // Called twice for different territories
      expect(result2).toEqual(result1);
    });

    it("should use different cache keys for different app-product combinations", async () => {
      const mockIAPs1 = {
        data: [{ id: "iap1", attributes: { productId: "product1" } }],
      };
      const mockIAPs2 = {
        data: [{ id: "iap2", attributes: { productId: "product2" } }],
      };

      MockFetchInAppPurchases.mockResolvedValueOnce(
        mockIAPs1 as any
      ).mockResolvedValueOnce(mockIAPs2 as any);

      MockFetchIAPPricePoints.mockResolvedValue({
        data: [{ id: "pp1", attributes: { customerPrice: "0.99" } }],
      } as any);

      // First product
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP 1" },
        testAppStoreState,
        testTerritoryId
      );

      // Second product
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product2", name: "Test IAP 2" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchInAppPurchases).toHaveBeenCalledTimes(2);
    });

    it("should return empty array if IAP not found", async () => {
      const mockIAPs = {
        data: [{ id: "iap1", attributes: { productId: "different-product" } }],
      };

      MockFetchInAppPurchases.mockResolvedValue(mockIAPs as any);

      await expect(
        fetchTerritoryPricePointsForSelectedItem(
          { type: "inAppPurchase", id: "product1", name: "Test IAP" },
          testAppStoreState,
          testTerritoryId
        )
      ).rejects.toThrow(
        "The selected in-app purchase is available locally but not created on App Store Connect yet. For pricing to work, it needs to be created first.\n        You can do so by only providing the required fields which don't include prices."
      );

      expect(MockFetchIAPPricePoints).not.toHaveBeenCalled();
    });
  });

  describe("Subscription ID Caching", () => {
    it("should cache subscription ID and reuse it on subsequent calls", async () => {
      const mockSubscriptionGroups = {
        included: [
          {
            type: "subscriptions",
            id: "sub1",
            attributes: { productId: "sub-product1" },
          },
        ],
      };

      const mockPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "4.99" } }],
      };

      MockFetchSubscriptionGroups.mockResolvedValue(
        mockSubscriptionGroups as any
      );
      MockFetchAllSubscriptionPricePoints.mockResolvedValue(
        mockPricePoints as any
      );

      // First call - should fetch subscription groups and cache ID
      const result1 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "subscription", id: "sub-product1", name: "Test Subscription" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchSubscriptionGroups).toHaveBeenCalledTimes(1);
      expect(MockFetchAllSubscriptionPricePoints).toHaveBeenCalledWith(
        "sub1",
        testTerritoryId
      );

      // Second call with different territory - should use cached subscription ID but fetch new price points
      const result2 = await fetchTerritoryPricePointsForSelectedItem(
        { type: "subscription", id: "sub-product1", name: "Test Subscription" },
        testAppStoreState,
        "different-territory"
      );

      expect(MockFetchSubscriptionGroups).toHaveBeenCalledTimes(1); // Still only called once for subscription ID
      expect(MockFetchAllSubscriptionPricePoints).toHaveBeenCalledTimes(2); // Called twice for different territories
      expect(result2).toEqual(result1);
    });

    it("should handle promotional offers and find owning subscription", async () => {
      const mockSubscriptionGroups = {
        included: [
          {
            type: "subscriptions",
            id: "sub1",
            attributes: { productId: "sub-product1" },
            relationships: {
              promotionalOffers: {
                data: [{ id: "offer1" }],
              },
            },
          },
        ],
      };

      const mockPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "2.99" } }],
      };

      MockFetchSubscriptionGroups.mockResolvedValue(
        mockSubscriptionGroups as any
      );
      MockFetchAllSubscriptionPricePoints.mockResolvedValue(
        mockPricePoints as any
      );

      const result = await fetchTerritoryPricePointsForSelectedItem(
        { type: "offer", id: "offer1", name: "Test Offer" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchAllSubscriptionPricePoints).toHaveBeenCalledWith(
        "sub1",
        testTerritoryId
      );
      expect(result).toHaveLength(1);
    });

    it("should use different cache keys for different app-subscription combinations", async () => {
      const mockSubscriptionGroups = {
        included: [
          {
            type: "subscriptions",
            id: "sub1",
            attributes: { productId: "sub-product1" },
          },
          {
            type: "subscriptions",
            id: "sub2",
            attributes: { productId: "sub-product2" },
          },
        ],
      };

      MockFetchSubscriptionGroups.mockResolvedValue(
        mockSubscriptionGroups as any
      );
      MockFetchAllSubscriptionPricePoints.mockResolvedValue({
        data: [{ id: "pp1", attributes: { customerPrice: "4.99" } }],
      } as any);

      // First subscription
      await fetchTerritoryPricePointsForSelectedItem(
        {
          type: "subscription",
          id: "sub-product1",
          name: "Test Subscription 1",
        },
        testAppStoreState,
        testTerritoryId
      );

      // Second subscription
      await fetchTerritoryPricePointsForSelectedItem(
        {
          type: "subscription",
          id: "sub-product2",
          name: "Test Subscription 2",
        },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchSubscriptionGroups).toHaveBeenCalledTimes(2);
    });

    it("should return empty array if subscription not found", async () => {
      const mockSubscriptionGroups = {
        included: [
          {
            type: "subscriptions",
            id: "sub1",
            attributes: { productId: "different-product" },
          },
        ],
      };

      MockFetchSubscriptionGroups.mockResolvedValue(
        mockSubscriptionGroups as any
      );

      await expect(
        fetchTerritoryPricePointsForSelectedItem(
          {
            type: "subscription",
            id: "sub-product1",
            name: "Test Subscription",
          },
          testAppStoreState,
          testTerritoryId
        )
      ).rejects.toThrow();

      expect(MockFetchAllSubscriptionPricePoints).not.toHaveBeenCalled();
    });
  });

  describe("Price Points Caching", () => {
    it("should cache price points for IAPs and reuse them", async () => {
      const mockIAPs = {
        data: [{ id: "iap1", attributes: { productId: "product1" } }],
      };

      const mockPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "0.99" } }],
      };

      MockFetchInAppPurchases.mockResolvedValue(mockIAPs as any);
      MockFetchIAPPricePoints.mockResolvedValue(mockPricePoints as any);

      // First territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        "territory1"
      );

      // Second territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        "territory2"
      );

      // Same territory again - should use cache
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        "territory1"
      );

      expect(MockFetchIAPPricePoints).toHaveBeenCalledTimes(2); // Called for territory1 and territory2
      expect(MockFetchInAppPurchases).toHaveBeenCalledTimes(1); // Called only once for IAP ID
    });

    it("should cache price points for subscriptions and reuse them", async () => {
      const mockSubscriptionGroups = {
        included: [
          {
            type: "subscriptions",
            id: "sub1",
            attributes: { productId: "sub-product1" },
          },
        ],
      };

      const mockPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "4.99" } }],
      };

      MockFetchSubscriptionGroups.mockResolvedValue(
        mockSubscriptionGroups as any
      );
      MockFetchAllSubscriptionPricePoints.mockResolvedValue(
        mockPricePoints as any
      );

      // First territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "subscription", id: "sub-product1", name: "Test Subscription" },
        testAppStoreState,
        "territory1"
      );

      // Second territory
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "subscription", id: "sub-product1", name: "Test Subscription" },
        testAppStoreState,
        "territory2"
      );

      // Same territory again - should use cache
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "subscription", id: "sub-product1", name: "Test Subscription" },
        testAppStoreState,
        "territory1"
      );

      expect(MockFetchAllSubscriptionPricePoints).toHaveBeenCalledTimes(2); // Called for territory1 and territory2
      expect(MockFetchSubscriptionGroups).toHaveBeenCalledTimes(1); // Called only once for subscription ID
    });
  });

  describe("Cache Key Uniqueness", () => {
    it("should use different cache keys for different item types", async () => {
      const mockAppPricePoints = {
        data: [{ id: "pp1", attributes: { customerPrice: "0.99" } }],
      };
      const mockIAPs = {
        data: [{ id: "iap1", attributes: { productId: "product1" } }],
      };
      const mockIAPPricePoints = {
        data: [{ id: "pp2", attributes: { customerPrice: "1.99" } }],
      };

      MockFetchAppPricePoints.mockResolvedValue(mockAppPricePoints as any);
      MockFetchInAppPurchases.mockResolvedValue(mockIAPs as any);
      MockFetchIAPPricePoints.mockResolvedValue(mockIAPPricePoints as any);

      // App price points
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app", name: "Test App" },
        testAppStoreState,
        testTerritoryId
      );

      // IAP price points
      await fetchTerritoryPricePointsForSelectedItem(
        { type: "inAppPurchase", id: "product1", name: "Test IAP" },
        testAppStoreState,
        testTerritoryId
      );

      expect(MockFetchAppPricePoints).toHaveBeenCalledTimes(1);
      expect(MockFetchInAppPurchases).toHaveBeenCalledTimes(1);
      expect(MockFetchIAPPricePoints).toHaveBeenCalledTimes(1);
    });
  });
});
