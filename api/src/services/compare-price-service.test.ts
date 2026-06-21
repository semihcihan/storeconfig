import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { collectPricingItems } from "@semihcihan/shared";
import { getPricesForItem, analyzePricing } from "./compare-price-service";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem } from "@semihcihan/shared";
import type { TerritoryData } from "./pricing-strategy";

jest.mock("../domains/pricing/service", () => ({
  findAppPricePointId: jest.fn(),
}));

jest.mock("../domains/pricing/api-client", () => ({
  fetchAppPricePointEqualizations: jest.fn(),
}));

jest.mock("./price-point", () => ({
  getTerritoryPricePointsData: jest.fn(),
}));

import { findAppPricePointId } from "../domains/pricing/service";
import { fetchAppPricePointEqualizations } from "../domains/pricing/api-client";
import { getTerritoryPricePointsData } from "./price-point";

const mockFindAppPricePointId = jest.mocked(findAppPricePointId);
const mockFetchAppPricePointEqualizations = jest.mocked(
  fetchAppPricePointEqualizations
);
const mockGetTerritoryPricePointsData = jest.mocked(
  getTerritoryPricePointsData
);

jest.mock("@semihcihan/shared", () => {
  const actual = jest.requireActual("@semihcihan/shared");
  return Object.assign({}, actual, {
    logger: {
      warn: jest.fn(),
    },
    collectPricingItems: jest.fn(),
  });
});

const mockCollectPricingItems = jest.mocked(collectPricingItems);

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
        pricing: {
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
            pricing: {
              baseTerritory: "USA" as const,
              prices: [
                { territory: "USA" as const, price: "9.99" },
                { territory: "GBR" as const, price: "7.99" },
              ],
            },
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: ["USA", "GBR"],
            },
            introductoryOffers: [
              {
                type: "PAY_AS_YOU_GO",
                numberOfPeriods: 1,
                pricing: {
                  baseTerritory: "USA" as const,
                  prices: [
                    { territory: "USA" as const, price: "4.99" },
                    { territory: "GBR" as const, price: "3.99" },
                  ],
                },
                availableTerritories: ["USA", "GBR"],
              },
            ],
            promotionalOffers: [
              {
                id: "promo-1",
                referenceName: "Promotional Offer",
                type: "PAY_AS_YOU_GO",
                numberOfPeriods: 1,
                pricing: {
                  baseTerritory: "USA" as const,
                  prices: [
                    { territory: "USA" as const, price: "6.99" },
                    { territory: "GBR" as const, price: "5.59" },
                  ],
                },
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
    mockFindAppPricePointId.mockResolvedValue("app-price-point-id");
    mockFetchAppPricePointEqualizations.mockResolvedValue({
      data: [],
    } as any);
    const cachedPricePoints = {
      iap: {
        USA: [{ priceIndex: "iap-tier-1", customerPrice: "1.99" }],
        GBR: [{ priceIndex: "iap-tier-1", customerPrice: "1.49" }],
        CAN: [{ priceIndex: "iap-tier-1", customerPrice: "2.49" }],
      },
      subscription: {
        USA: [
          { priceIndex: "sub-tier-1", customerPrice: "9.99" },
          { priceIndex: "intro-tier-1", customerPrice: "4.99" },
          { priceIndex: "promo-tier-1", customerPrice: "6.99" },
        ],
        GBR: [
          { priceIndex: "sub-tier-1", customerPrice: "8.49" },
          { priceIndex: "intro-tier-1", customerPrice: "3.49" },
          { priceIndex: "promo-tier-1", customerPrice: "5.49" },
        ],
        CAN: [
          { priceIndex: "sub-tier-1", customerPrice: "12.99" },
          { priceIndex: "intro-tier-1", customerPrice: "6.49" },
          { priceIndex: "promo-tier-1", customerPrice: "8.99" },
        ],
      },
    };
    mockGetTerritoryPricePointsData.mockImplementation(
      async (resourceType, territory) =>
        cachedPricePoints[resourceType as "iap" | "subscription"]?.[
          territory as "USA" | "GBR" | "CAN"
        ] || null
    );
  });

  describe("getPricesForItem", () => {
    it("should return app pricing when item type is app", async () => {
      const item: PricingItem = {
        type: "app",
        id: "app-123",
        name: "Test App",
      };

      mockFetchAppPricePointEqualizations.mockResolvedValue({
        data: [
          {
            id: "price-point-1",
            attributes: { customerPrice: "0.99" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-point-2",
            attributes: { customerPrice: "0.79" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
          {
            id: "price-point-3",
            attributes: { customerPrice: "1.29" },
            relationships: { territory: { data: { id: "CAN" } } },
          },
        ],
      } as any);

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(mockFindAppPricePointId).toHaveBeenCalledWith(
        "0.99",
        "USA",
        "app-123"
      );
      expect(mockFetchAppPricePointEqualizations).toHaveBeenCalledWith(
        "app-price-point-id"
      );
      expect(result).toEqual([
        { territory: "USA", price: "0.99" },
        { territory: "GBR", price: "0.79" },
        { territory: "CAN", price: "1.29" },
      ]);
    });

    it("should return empty array when app has no pricing", async () => {
      const appWithoutPricing: AppStoreModel = {
        ...mockAppStoreData,
        pricing: undefined,
      };

      const item: PricingItem = {
        type: "app",
        id: "app-123",
        name: "Test App",
      };

      const result = await getPricesForItem(appWithoutPricing, item);

      expect(result).toEqual([]);
    });

    it("should return IAP pricing when item type is inAppPurchase", async () => {
      const item: PricingItem = {
        type: "inAppPurchase",
        id: "iap-1",
        name: "Test IAP",
      };

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          { territory: "USA", price: "1.99" },
          { territory: "GBR", price: "1.59" },
          { territory: "CAN", price: "2.49" },
        ])
      );
    });

    it("should return empty array when IAP has no pricing", async () => {
      const iapWithoutPricing = {
        ...mockAppStoreData.inAppPurchases![0],
        pricing: undefined,
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

      const result = await getPricesForItem(appWithIapWithoutPricing, item);

      expect(result).toEqual([]);
    });

    it("should return subscription pricing when item type is subscription", async () => {
      const item: PricingItem = {
        type: "subscription",
        id: "sub-1",
        name: "Monthly Plan",
      };

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          { territory: "USA", price: "9.99" },
          { territory: "GBR", price: "7.99" },
          { territory: "CAN", price: "12.99" },
        ])
      );
    });

    it("should return empty array when subscription is not found", async () => {
      const item: PricingItem = {
        type: "subscription",
        id: "nonexistent-sub",
        name: "Nonexistent Subscription",
      };

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([]);
    });

    it("should return introductory offer pricing when item type is offer", async () => {
      const item: PricingItem = {
        type: "offer",
        id: "sub-1",
        name: "PAY_AS_YOU_GO Introductory Offer",
        offerType: "PAY_AS_YOU_GO",
        parentName: "Monthly Plan",
      };

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          { territory: "USA", price: "4.99" },
          { territory: "GBR", price: "3.99" },
          { territory: "CAN", price: "6.49" },
        ])
      );
    });

    it("should return promotional offer pricing when item type is offer", async () => {
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
                pricing: {
                  baseTerritory: "USA" as const,
                  prices: [
                    { territory: "USA" as const, price: "9.99" },
                    { territory: "GBR" as const, price: "7.99" },
                  ],
                },
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
                    pricing: {
                      baseTerritory: "USA" as const,
                      prices: [
                        { territory: "USA" as const, price: "6.99" },
                        { territory: "GBR" as const, price: "5.59" },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      };

      const item: PricingItem = {
        type: "offer",
        id: "promo-1",
        name: "PAY_AS_YOU_GO Promotional Offer",
        offerType: "PAY_AS_YOU_GO",
        parentName: "Monthly Plan",
      };

      const result = await getPricesForItem(subscriptionWithOnlyPromo, item);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          { territory: "USA", price: "6.99" },
          { territory: "GBR", price: "5.59" },
          { territory: "CAN", price: "8.99" },
        ])
      );
    });

    it("should filter out FREE_TRIAL offers", async () => {
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
                pricing: {
                  baseTerritory: "USA" as const,
                  prices: [{ territory: "USA" as const, price: "9.99" }],
                },
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

      const result = await getPricesForItem(appWithFreeTrial, item);

      expect(result).toEqual([]);
    });

    it("should return empty array for unknown item type", async () => {
      const item = {
        type: "unknown" as any,
        id: "unknown-1",
        name: "Unknown Item",
      } as PricingItem;

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([]);
    });

    it("should merge equalized prices with custom overrides", async () => {
      const item: PricingItem = {
        type: "app",
        id: "app-123",
        name: "Test App",
      };

      mockFetchAppPricePointEqualizations.mockResolvedValue({
        data: [
          {
            id: "price-point-1",
            attributes: { customerPrice: "0.99" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-point-2",
            attributes: { customerPrice: "0.75" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
          {
            id: "price-point-3",
            attributes: { customerPrice: "1.29" },
            relationships: { territory: { data: { id: "CAN" } } },
          },
        ],
      } as any);

      const result = await getPricesForItem(mockAppStoreData, item);

      expect(result).toEqual([
        { territory: "USA", price: "0.99" },
        { territory: "GBR", price: "0.79" },
        { territory: "CAN", price: "1.29" },
      ]);
    });

    it("should filter prices by availability", async () => {
      const appWithLimitedAvailability: AppStoreModel = {
        ...mockAppStoreData,
        availableTerritories: ["USA", "GBR"],
      };

      mockFetchAppPricePointEqualizations.mockResolvedValue({
        data: [
          {
            id: "price-point-1",
            attributes: { customerPrice: "0.99" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-point-2",
            attributes: { customerPrice: "0.79" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
          {
            id: "price-point-3",
            attributes: { customerPrice: "1.29" },
            relationships: { territory: { data: { id: "CAN" } } },
          },
        ],
      } as any);

      mockCollectPricingItems.mockReturnValue([
        {
          type: "app",
          id: "app-123",
          name: "Test App",
        },
      ]);

      const analysis = await analyzePricing(
        appWithLimitedAvailability,
        mockCurrencies
      );

      const appAnalysis = analysis.find((a) => a.item.type === "app");
      expect(appAnalysis?.prices).toHaveLength(2);
      expect(appAnalysis?.prices.map((p) => p.territory)).toEqual([
        "USA",
        "GBR",
      ]);
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
      mockFetchAppPricePointEqualizations.mockResolvedValue({
        data: [
          {
            id: "price-point-1",
            attributes: { customerPrice: "0.99" },
            relationships: { territory: { data: { id: "USA" } } },
          },
          {
            id: "price-point-2",
            attributes: { customerPrice: "0.79" },
            relationships: { territory: { data: { id: "GBR" } } },
          },
          {
            id: "price-point-3",
            attributes: { customerPrice: "1.29" },
            relationships: { territory: { data: { id: "CAN" } } },
          },
        ],
      } as any);
    });

    it("should analyze pricing for all items", async () => {
      const result = await analyzePricing(mockAppStoreData, mockCurrencies);

      expect(result).toHaveLength(1);
      expect(result[0].item.type).toBe("app");
      expect(result[0].item.id).toBe("app-123");
    });

    it("should calculate USD prices correctly for different currencies", async () => {
      const result = await analyzePricing(mockAppStoreData, mockCurrencies);

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

    it("should throw error when base territory currency not found", async () => {
      const currenciesWithoutUSA = mockCurrencies.filter((c) => c.id !== "USA");

      await expect(
        analyzePricing(mockAppStoreData, currenciesWithoutUSA)
      ).rejects.toThrow(
        "Base territory currency not found in currency data for USA"
      );
    });

    it("should handle items with no prices", async () => {
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

      const result = await analyzePricing(appWithoutPricing, mockCurrencies);

      expect(result).toHaveLength(0);
    });

    it("should calculate USD percentages correctly", async () => {
      const result = await analyzePricing(mockAppStoreData, mockCurrencies);

      const appPrices = result[0].prices;
      const usaPrice = appPrices.find((p) => p.territory === "USA");
      const gbrPrice = appPrices.find((p) => p.territory === "GBR");

      expect(usaPrice?.usdPrice).toBe(0.99);
      expect(gbrPrice?.usdPrice).toBe(0.9875);
    });
  });
});
