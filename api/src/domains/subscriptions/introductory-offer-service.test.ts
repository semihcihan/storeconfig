import { jest } from "@jest/globals";
import {
  createIntroductoryOffer,
  deleteIntroductoryOffer,
} from "./introductory-offer-service";
import {
  createSubscriptionIntroductoryOffer,
  deleteSubscriptionIntroductoryOffer,
  fetchSubscriptionIntroductoryOffers,
} from "./api-client";
import {
  findSubscriptionId,
  findSubscriptionPricePointId,
  buildCompleteDesiredPriceMap,
} from "./pricing-service";
import { mapIntroductoryOffers } from "./mapper";
import { compareNumericValues, TerritoryCodeSchema } from "@semihcihan/shared";
import { z } from "zod";

type Territory = z.infer<typeof TerritoryCodeSchema>;

// Mock dependencies
jest.mock("./api-client");
jest.mock("./pricing-service");
jest.mock("./mapper");

const MockCreateSubscriptionIntroductoryOffer =
  createSubscriptionIntroductoryOffer as jest.MockedFunction<
    typeof createSubscriptionIntroductoryOffer
  >;
const MockDeleteSubscriptionIntroductoryOffer =
  deleteSubscriptionIntroductoryOffer as jest.MockedFunction<
    typeof deleteSubscriptionIntroductoryOffer
  >;
const MockFetchSubscriptionIntroductoryOffers =
  fetchSubscriptionIntroductoryOffers as jest.MockedFunction<
    typeof fetchSubscriptionIntroductoryOffers
  >;
const MockFindSubscriptionId = findSubscriptionId as jest.MockedFunction<
  typeof findSubscriptionId
>;
const MockFindSubscriptionPricePointId =
  findSubscriptionPricePointId as jest.MockedFunction<
    typeof findSubscriptionPricePointId
  >;
const MockBuildCompleteDesiredPriceMap =
  buildCompleteDesiredPriceMap as jest.MockedFunction<
    typeof buildCompleteDesiredPriceMap
  >;
const MockMapIntroductoryOffers = mapIntroductoryOffers as jest.MockedFunction<
  typeof mapIntroductoryOffers
>;

describe("IntroductoryOfferService", () => {
  const testSubscriptionProductId = "com.test.subscription";
  const testSubscriptionId = "test-subscription-id";
  const testTerritory = "USA";
  const testPrice = "4.99";
  const testPricePointId = "test-price-point-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createIntroductoryOffer", () => {
    it("should create FREE_TRIAL introductory offer", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([]);

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      expect(MockFindSubscriptionId).toHaveBeenCalledWith(
        testSubscriptionProductId,
        undefined,
        undefined
      );
      expect(MockFetchSubscriptionIntroductoryOffers).toHaveBeenCalledWith(
        testSubscriptionId
      );
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(2); // USA and GBR
    });

    it("should create PAY_AS_YOU_GO introductory offer with prices", async () => {
      const offer = {
        type: "PAY_AS_YOU_GO" as const,
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [
            { price: "4.99", territory: "USA" as Territory },
            { price: "3.99", territory: "GBR" as Territory },
          ],
        },
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockBuildCompleteDesiredPriceMap.mockResolvedValue(
        new Map([
          ["USA", { price: "4.99", territory: "USA" as Territory }],
          ["GBR", { price: "3.99", territory: "GBR" as Territory }],
        ])
      );
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([]);
      MockFindSubscriptionPricePointId.mockResolvedValueOnce(
        "pp1"
      ).mockResolvedValueOnce("pp2");

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      expect(MockBuildCompleteDesiredPriceMap).toHaveBeenCalledWith(
        offer.pricing,
        testSubscriptionId
      );
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(2);
    });

    it("should create PAY_UP_FRONT introductory offer with prices", async () => {
      const offer = {
        type: "PAY_UP_FRONT" as const,
        duration: "ONE_MONTH" as const,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [
            { price: "4.99", territory: "USA" as Territory },
            { price: "3.99", territory: "GBR" as Territory },
          ],
        },
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockBuildCompleteDesiredPriceMap.mockResolvedValue(
        new Map([
          ["USA", { price: "4.99", territory: "USA" as Territory }],
          ["GBR", { price: "3.99", territory: "GBR" as Territory }],
        ])
      );
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([]);
      MockFindSubscriptionPricePointId.mockResolvedValueOnce(
        "pp1"
      ).mockResolvedValueOnce("pp2");

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      expect(MockBuildCompleteDesiredPriceMap).toHaveBeenCalledWith(
        offer.pricing,
        testSubscriptionId
      );
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(2);
    });

    it("should filter prices to only include territories in availableTerritories", async () => {
      const offer = {
        type: "PAY_AS_YOU_GO" as const,
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [
            { price: "4.99", territory: "USA" as Territory },
            { price: "3.99", territory: "GBR" as Territory },
          ],
        },
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockBuildCompleteDesiredPriceMap.mockResolvedValue(
        new Map([
          ["USA", { price: "4.99", territory: "USA" as Territory }],
          ["GBR", { price: "3.99", territory: "GBR" as Territory }],
          ["DEU", { price: "3.49", territory: "DEU" as Territory }],
          ["FRA", { price: "3.49", territory: "FRA" as Territory }],
        ])
      );
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([]);
      MockFindSubscriptionPricePointId.mockResolvedValueOnce(
        "pp1"
      ).mockResolvedValueOnce("pp2");

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      expect(MockBuildCompleteDesiredPriceMap).toHaveBeenCalledWith(
        offer.pricing,
        testSubscriptionId
      );
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(2);
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            relationships: expect.objectContaining({
              territory: expect.objectContaining({
                data: expect.objectContaining({ id: "USA" }),
              }),
            }),
          }),
        })
      );
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            relationships: expect.objectContaining({
              territory: expect.objectContaining({
                data: expect.objectContaining({ id: "GBR" }),
              }),
            }),
          }),
        })
      );
    });

    it("should handle existing offers and apply differences", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;
      const existingOffer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([existingOffer]);

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      // Should create offer for GBR (new territory)
      expect(MockCreateSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(1);
    });

    it("should handle API errors gracefully", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockImplementation(() => {
        throw new Error("Subscription not found");
      });

      await expect(
        createIntroductoryOffer(
          testSubscriptionProductId,
          subscriptionPeriod,
          offer
        )
      ).rejects.toThrow("Subscription not found");
    });
  });

  describe("deleteIntroductoryOffer", () => {
    it("should delete FREE_TRIAL introductory offer", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const existingOffers = [
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
        {
          id: "offer2",
          attributes: {
            offerMode: "FREE_TRIAL",
            duration: "ONE_WEEK",
          },
          relationships: {
            territory: { data: { id: "GBR" } },
          },
        },
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);

      await deleteIntroductoryOffer(testSubscriptionProductId, offer);

      expect(MockDeleteSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(2);
      expect(MockDeleteSubscriptionIntroductoryOffer).toHaveBeenCalledWith(
        "offer1"
      );
      expect(MockDeleteSubscriptionIntroductoryOffer).toHaveBeenCalledWith(
        "offer2"
      );
    });

    it("should delete PAY_AS_YOU_GO introductory offer", async () => {
      const offer = {
        type: "PAY_AS_YOU_GO" as const,
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [{ price: "4.99", territory: "USA" as Territory }],
        },
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
        {
          id: "offer1",
          attributes: {
            offerMode: "PAY_AS_YOU_GO",
            numberOfPeriods: 3,
          },
          relationships: {
            territory: { data: { id: "USA" } },
          },
        },
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);

      await deleteIntroductoryOffer(testSubscriptionProductId, offer);

      expect(MockDeleteSubscriptionIntroductoryOffer).toHaveBeenCalledTimes(1);
      expect(MockDeleteSubscriptionIntroductoryOffer).toHaveBeenCalledWith(
        "offer1"
      );
    });

    it("should handle 404 errors when deleting offers", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
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
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);
      MockDeleteSubscriptionIntroductoryOffer.mockRejectedValueOnce({
        status: 404,
        message: "Not found",
      });

      // Should not throw error for 404
      await expect(
        deleteIntroductoryOffer(testSubscriptionProductId, offer)
      ).resolves.not.toThrow();
    });

    it("should throw error for non-404 API errors", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
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
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);
      MockDeleteSubscriptionIntroductoryOffer.mockRejectedValue({
        status: 500,
        message: "Internal server error",
      });

      await expect(
        deleteIntroductoryOffer(testSubscriptionProductId, offer)
      ).rejects.toBeDefined();
    });

    it("should handle offers with no matching criteria", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
        {
          id: "offer1",
          attributes: {
            offerMode: "PAY_AS_YOU_GO", // Different type
            numberOfPeriods: 3,
          },
          relationships: {
            territory: { data: { id: "USA" } },
          },
        },
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);

      await deleteIntroductoryOffer(testSubscriptionProductId, offer);

      // Should not call delete for non-matching offers
      expect(MockDeleteSubscriptionIntroductoryOffer).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases and error handling", () => {
    it("should handle missing offer attributes", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
        {
          id: "offer1",
          attributes: null, // Missing attributes
          relationships: {
            territory: { data: { id: "USA" } },
          },
        },
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);

      await deleteIntroductoryOffer(testSubscriptionProductId, offer);

      // Should not call delete for offers with missing attributes
      expect(MockDeleteSubscriptionIntroductoryOffer).not.toHaveBeenCalled();
    });

    it("should handle missing territory relationships", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: ["USA"] as Territory[],
      };

      const existingOffers = [
        {
          id: "offer1",
          attributes: {
            offerMode: "FREE_TRIAL",
            duration: "ONE_WEEK",
          },
          relationships: {
            // Missing territory relationship
          },
        },
      ];

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: existingOffers,
        included: [],
      } as any);

      await deleteIntroductoryOffer(testSubscriptionProductId, offer);

      // Should not call delete for offers with missing territory
      expect(MockDeleteSubscriptionIntroductoryOffer).not.toHaveBeenCalled();
    });

    it("should handle price comparison for paid offers", async () => {
      const currentOffer = {
        type: "PAY_AS_YOU_GO" as const,
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [
            { price: "4.99", territory: "USA" as Territory },
            { price: "3.99", territory: "GBR" as Territory },
          ],
        },
        availableTerritories: ["USA", "GBR"] as Territory[],
      };

      const desiredOffer = {
        type: "PAY_AS_YOU_GO" as const,
        numberOfPeriods: 3,
        pricing: {
          baseTerritory: "USA" as const,
          prices: [
            { price: "5.99", territory: "USA" as Territory }, // Changed price
            { price: "3.99", territory: "GBR" as Territory }, // Same price
            { price: "6.99", territory: "DEU" as Territory }, // New territory
          ],
        },
        availableTerritories: ["USA", "GBR", "DEU"] as Territory[],
      };

      // Using real compareNumericValues implementation

      // This would be called internally by the service
      const currentPriceMap = new Map(
        currentOffer.pricing.prices.map((price) => [price.territory, price])
      );
      const desiredPriceMap = new Map(
        desiredOffer.pricing.prices.map((price) => [price.territory, price])
      );

      const currentTerritories = new Set(currentPriceMap.keys());
      const desiredTerritories = new Set(desiredPriceMap.keys());

      // Find territories with changed prices
      const territoriesWithChangedPrices = [...desiredTerritories].filter(
        (territory) => {
          if (!currentTerritories.has(territory)) return false;

          const currentPrice = currentPriceMap.get(territory);
          const desiredPrice = desiredPriceMap.get(territory);

          if (!currentPrice || !desiredPrice) return false;

          return !compareNumericValues(currentPrice.price, desiredPrice.price);
        }
      );

      expect(territoriesWithChangedPrices).toEqual(["USA"]);
    });

    it("should handle empty available territories", async () => {
      const offer = {
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
        availableTerritories: [] as Territory[],
      };

      const subscriptionPeriod = "ONE_MONTH" as const;

      MockFindSubscriptionId.mockReturnValue(testSubscriptionId);
      MockFetchSubscriptionIntroductoryOffers.mockResolvedValue({
        data: [],
        included: [],
      } as any);
      MockMapIntroductoryOffers.mockResolvedValue([]);

      await createIntroductoryOffer(
        testSubscriptionProductId,
        subscriptionPeriod,
        offer
      );

      // Should not create any offers for empty territories
      expect(MockCreateSubscriptionIntroductoryOffer).not.toHaveBeenCalled();
    });
  });
});
