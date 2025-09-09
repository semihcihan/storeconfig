import {
  validateIntroductoryOffers,
  validateIntroductoryOffersGrouping,
  getIntroductoryOfferGroupingKey,
  getIntroductoryOfferGroupingDescription,
} from "./introductory-offer-validation";
import { z } from "zod";
import { IntroductoryOfferSchema } from "@semihcihan/shared";

type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;

describe("Introductory Offer Validation", () => {
  describe("validateIntroductoryOffers", () => {
    it("should pass validation for valid FREE_TRIAL offer", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).not.toThrow();
    });

    it("should pass validation for valid PAY_UP_FRONT offer", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "USA", price: "4.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).not.toThrow();
    });

    it("should pass validation for valid PAY_AS_YOU_GO offer", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 6,
          prices: [{ territory: "USA", price: "4.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).not.toThrow();
    });

    it("should throw error for invalid FREE_TRIAL duration", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "FOUR_MONTHS" as any, // Invalid duration (doesn't exist in schema)
          availableTerritories: ["USA"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Invalid duration 'FOUR_MONTHS' for FREE_TRIAL offer/);
    });

    it("should throw error for invalid PAY_UP_FRONT duration", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "THREE_DAYS", // Invalid for ONE_MONTH PAY_UP_FRONT
          prices: [{ territory: "USA", price: "4.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Invalid duration 'THREE_DAYS' for PAY_UP_FRONT offer/);
    });

    it("should throw error for invalid PAY_AS_YOU_GO numberOfPeriods", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 13, // Invalid for ONE_MONTH subscription
          prices: [{ territory: "USA", price: "4.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Invalid numberOfPeriods '13' for PAY_AS_YOU_GO offer/);
    });

    it("should throw error for multiple FREE_TRIAL offers in same territory", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_MONTH",
          availableTerritories: ["USA"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Multiple introductory offers found for territory 'USA'/);
    });

    it("should throw error for multiple PAY_UP_FRONT offers in same territory", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "USA", price: "4.99" }],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "TWO_MONTHS",
          prices: [{ territory: "USA", price: "8.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Multiple introductory offers found for territory 'USA'/);
    });

    it("should throw error for multiple PAY_AS_YOU_GO offers in same territory", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 6,
          prices: [{ territory: "USA", price: "4.99" }],
        },
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 12,
          prices: [{ territory: "USA", price: "8.99" }],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Multiple introductory offers found for territory 'USA'/);
    });

    it("should allow multiple offers in different territories", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_MONTH",
          availableTerritories: ["CAN"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).not.toThrow();
    });

    it("should include subscription ID in error messages", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "FOUR_MONTHS" as any, // Invalid duration
          availableTerritories: ["USA"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("my-subscription", "ONE_MONTH", offers);
      }).toThrow(/subscription 'my-subscription'/);
    });

    it("should include subscription period in error messages", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "FOUR_MONTHS" as any, // Invalid duration
          availableTerritories: ["USA"],
        },
      ];

      expect(() => {
        validateIntroductoryOffers("my-subscription", "ONE_MONTH", offers);
      }).toThrow(/period 'ONE_MONTH'/);
    });

    it("should check all price territories for territory uniqueness for PAY_AS_YOU_GO and PAY_UP_FRONT offers", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [
            { territory: "USA", price: "4.99" },
            { territory: "CAN", price: "5.99" },
            { territory: "GBR", price: "3.99" },
          ],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["GBR"], // GBR is available for this offer
        },
      ];

      // This SHOULD throw an error because GBR appears in both offers
      // (PAY_UP_FRONT has a price for GBR, and FREE_TRIAL is available in GBR)
      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Multiple introductory offers found for territory 'GBR'/);
    });

    it("should throw error when offers are actually available in the same territory", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [
            { territory: "USA", price: "4.99" },
            { territory: "CAN", price: "5.99" },
          ],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"], // USA is available for both offers
        },
      ];

      // This SHOULD throw an error because both offers are available in USA
      expect(() => {
        validateIntroductoryOffers("sub1", "ONE_MONTH", offers);
      }).toThrow(/Multiple introductory offers found for territory 'USA'/);
    });
  });

  describe("validateIntroductoryOffersGrouping", () => {
    it("should return true for valid offers with unique groupings", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 1,
          prices: [{ territory: "USA", price: "0.99" }],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "GBR", price: "2.99" }],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["CAN"],
        },
      ];

      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });

    it("should return false for duplicate PAY_AS_YOU_GO with same numberOfPeriods", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 1,
          prices: [{ territory: "USA", price: "0.99" }],
        },
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 1,
          prices: [{ territory: "GBR", price: "1.99" }],
        },
      ];

      const result = validateIntroductoryOffersGrouping(offers, "test_product");
      expect(result.success).toBe(false);
      expect(result.error).toContain(
        "type 'PAY_AS_YOU_GO' with numberOfPeriods '1'"
      );
      expect(result.error).toContain("in subscription 'test_product'");
      expect(result.error).toContain("Items at indices 0 and 1");
    });

    it("should return false for duplicate PAY_UP_FRONT with same duration", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "USA", price: "2.99" }],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "GBR", price: "3.99" }],
        },
      ];

      const result = validateIntroductoryOffersGrouping(offers, "test_product");
      expect(result.success).toBe(false);
      expect(result.error).toContain(
        "type 'PAY_UP_FRONT' with duration 'ONE_MONTH'"
      );
      expect(result.error).toContain("in subscription 'test_product'");
      expect(result.error).toContain("Items at indices 0 and 1");
    });

    it("should return false for duplicate FREE_TRIAL with same duration", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["GBR"],
        },
      ];

      const result = validateIntroductoryOffersGrouping(offers, "test_product");
      expect(result.success).toBe(false);
      expect(result.error).toContain(
        "type 'FREE_TRIAL' with duration 'ONE_WEEK'"
      );
      expect(result.error).toContain("in subscription 'test_product'");
      expect(result.error).toContain("Items at indices 0 and 1");
    });

    it("should return true for different PAY_AS_YOU_GO with different numberOfPeriods", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 1,
          prices: [{ territory: "USA", price: "0.99" }],
        },
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 2,
          prices: [{ territory: "GBR", price: "1.99" }],
        },
      ];

      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });

    it("should return true for different PAY_UP_FRONT with different durations", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "USA", price: "2.99" }],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "THREE_MONTHS",
          prices: [{ territory: "GBR", price: "7.99" }],
        },
      ];

      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });

    it("should return true for different FREE_TRIAL with different durations", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL",
          duration: "TWO_WEEKS",
          availableTerritories: ["GBR"],
        },
      ];

      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });

    it("should return true for empty array", () => {
      const offers: IntroductoryOffer[] = [];
      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });

    it("should return true for mixed types with unique groupings", () => {
      const offers: IntroductoryOffer[] = [
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 1,
          prices: [{ territory: "USA", price: "0.99" }],
        },
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 2,
          prices: [{ territory: "GBR", price: "1.99" }],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "ONE_MONTH",
          prices: [{ territory: "CAN", price: "2.99" }],
        },
        {
          type: "FREE_TRIAL",
          duration: "ONE_WEEK",
          availableTerritories: ["AUS"],
        },
      ];

      expect(validateIntroductoryOffersGrouping(offers).success).toBe(true);
    });
  });

  describe("getIntroductoryOfferGroupingKey", () => {
    it("should generate correct key for PAY_AS_YOU_GO offer", () => {
      const offer: IntroductoryOffer = {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        prices: [{ territory: "USA", price: "1.99" }],
      };

      const key = getIntroductoryOfferGroupingKey(offer);
      expect(key).toBe("PAY_AS_YOU_GO_3");
    });

    it("should generate correct key for PAY_UP_FRONT offer", () => {
      const offer: IntroductoryOffer = {
        type: "PAY_UP_FRONT",
        duration: "ONE_MONTH",
        prices: [{ territory: "USA", price: "4.99" }],
      };

      const key = getIntroductoryOfferGroupingKey(offer);
      expect(key).toBe("PAY_UP_FRONT_ONE_MONTH");
    });

    it("should generate correct key for FREE_TRIAL offer", () => {
      const offer: IntroductoryOffer = {
        type: "FREE_TRIAL",
        duration: "THREE_DAYS",
        availableTerritories: ["USA"],
      };

      const key = getIntroductoryOfferGroupingKey(offer);
      expect(key).toBe("FREE_TRIAL_THREE_DAYS");
    });

    it("should generate different keys for different offers", () => {
      const offer1: IntroductoryOffer = {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        prices: [{ territory: "USA", price: "1.99" }],
      };

      const offer2: IntroductoryOffer = {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 5,
        prices: [{ territory: "USA", price: "2.99" }],
      };

      const key1 = getIntroductoryOfferGroupingKey(offer1);
      const key2 = getIntroductoryOfferGroupingKey(offer2);

      expect(key1).toBe("PAY_AS_YOU_GO_3");
      expect(key2).toBe("PAY_AS_YOU_GO_5");
      expect(key1).not.toBe(key2);
    });
  });

  describe("getIntroductoryOfferGroupingDescription", () => {
    it("should generate correct description for PAY_AS_YOU_GO offer", () => {
      const offer: IntroductoryOffer = {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        prices: [{ territory: "USA", price: "1.99" }],
      };

      const description = getIntroductoryOfferGroupingDescription(offer);
      expect(description).toBe("type 'PAY_AS_YOU_GO' with numberOfPeriods '3'");
    });

    it("should generate correct description for PAY_UP_FRONT offer", () => {
      const offer: IntroductoryOffer = {
        type: "PAY_UP_FRONT",
        duration: "ONE_MONTH",
        prices: [{ territory: "USA", price: "4.99" }],
      };

      const description = getIntroductoryOfferGroupingDescription(offer);
      expect(description).toBe("type 'PAY_UP_FRONT' with duration 'ONE_MONTH'");
    });

    it("should generate correct description for FREE_TRIAL offer", () => {
      const offer: IntroductoryOffer = {
        type: "FREE_TRIAL",
        duration: "THREE_DAYS",
        availableTerritories: ["USA"],
      };

      const description = getIntroductoryOfferGroupingDescription(offer);
      expect(description).toBe("type 'FREE_TRIAL' with duration 'THREE_DAYS'");
    });
  });
});
