import { validateSubscription } from "./subscription-validation";
import { z } from "zod";
import { describe, it, expect } from "@jest/globals";

describe("Subscription Validation", () => {
  describe("validateSubscription", () => {
    it("should pass validation for subscription without introductory offers", () => {
      const subscription = {
        productId: "test_product",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should pass validation for subscription with valid introductory offers", () => {
      const subscription = {
        productId: "test_product",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "0.99", territory: "USA" }],
            availableTerritories: ["USA"],
          },
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["USA"],
          },
        ],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should fail validation for subscription with duplicate PAY_AS_YOU_GO offers", () => {
      const subscription = {
        productId: "test_product",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "0.99", territory: "USA" }],
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "1.99", territory: "CAN" }],
            availableTerritories: ["CAN"],
          },
        ],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message: expect.stringContaining("Duplicate introductory offers found"),
        path: ["introductoryOffers"],
      });
    });

    it("should fail validation for subscription with duplicate PAY_UP_FRONT offers", () => {
      const subscription = {
        productId: "test_product",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [
          {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            prices: [{ price: "9.99", territory: "USA" }],
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            prices: [{ price: "12.99", territory: "CAN" }],
            availableTerritories: ["CAN"],
          },
        ],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message: expect.stringContaining("Duplicate introductory offers found"),
        path: ["introductoryOffers"],
      });
    });

    it("should fail validation for subscription with duplicate FREE_TRIAL offers", () => {
      const subscription = {
        productId: "test_product",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["USA"],
          },
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["CAN"],
          },
        ],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message: expect.stringContaining("Duplicate introductory offers found"),
        path: ["introductoryOffers"],
      });
    });

    it("should include productId in error message when validation fails", () => {
      const subscription = {
        productId: "my_test_subscription_123",
        referenceName: "Test Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [{ price: "4.99", territory: "USA" }],
        localizations: [
          { locale: "en-US", name: "Test", description: "Test description" },
        ],
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA"],
        },
        introductoryOffers: [
          {
            type: "PAY_UP_FRONT",
            duration: "THREE_MONTHS",
            prices: [{ price: "19.99", territory: "TUR" }],
            availableTerritories: ["TUR"],
          },
          {
            type: "PAY_UP_FRONT",
            duration: "THREE_MONTHS",
            prices: [{ price: "19.99", territory: "AZE" }],
            availableTerritories: ["AZE"],
          },
        ],
        promotionalOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscription(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message: expect.stringContaining(
          "in subscription 'my_test_subscription_123'"
        ),
        path: ["introductoryOffers"],
      });
    });
  });
});
