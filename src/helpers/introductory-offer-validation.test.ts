import { validateIntroductoryOffers } from "./introductory-offer-validation";
import { z } from "zod";
import { IntroductoryOfferSchema } from "../models/app-store";

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
          availableTerritories: ["USA"],
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
          availableTerritories: ["USA"],
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
          availableTerritories: ["USA"],
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
          availableTerritories: ["USA"],
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
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_UP_FRONT",
          duration: "TWO_MONTHS",
          prices: [{ territory: "USA", price: "8.99" }],
          availableTerritories: ["USA"],
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
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 12,
          prices: [{ territory: "USA", price: "8.99" }],
          availableTerritories: ["USA"],
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
        validateIntroductoryOffers("sub1", "ONE_YEAR", offers);
      }).toThrow(/period 'ONE_YEAR'/);
    });
  });
});
