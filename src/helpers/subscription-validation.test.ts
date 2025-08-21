import {
  validateSubscription,
  validateSubscriptionTerritoryPricing,
} from "./subscription-validation";
import { z } from "zod";
import { describe, it, expect } from "@jest/globals";

describe("Subscription Validation", () => {
  describe("validateSubscriptionTerritoryPricing", () => {
    it("should pass validation when subscription has prices for all available territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA", "CAN"],
        },
        prices: [
          { price: "4.99", territory: "USA" },
          { price: "5.99", territory: "CAN" },
        ],
        introductoryOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should fail validation when subscription is missing prices for available territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA", "CAN", "GBR"],
        },
        prices: [
          { price: "4.99", territory: "USA" },
          { price: "5.99", territory: "CAN" },
        ],
        introductoryOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message:
          "Subscription 'test_product' is available in territory 'GBR' but has no price defined for this territory",
        path: ["prices"],
      });
    });

    it("should pass validation for FREE_TRIAL offers (which don't need prices)", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["USA", "CAN"],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should pass validation for PAY_AS_YOU_GO offers with prices for all territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [
              { price: "0.99", territory: "USA" },
              { price: "1.99", territory: "CAN" },
            ],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should pass validation for PAY_AS_YOU_GO offers with prices for all territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "0.99", territory: "USA" }],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should pass validation for PAY_UP_FRONT offers with prices for all territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            prices: [
              { price: "9.99", territory: "USA" },
              { price: "12.99", territory: "CAN" },
            ],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should pass validation for PAY_UP_FRONT offers with prices for all territories", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            prices: [{ price: "9.99", territory: "USA" }],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should handle multiple introductory offers correctly", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["USA", "CAN"],
          },
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "0.99", territory: "USA" }],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should require availability when pricing exists", () => {
      const subscription = {
        productId: "test_product",
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message:
          "Subscription 'test_product' has pricing defined but no availability. You need to set up availabilities first.",
        path: ["availability"],
      });
    });

    it("should allow missing availability when no pricing exists", () => {
      const subscription = {
        productId: "test_product",
        prices: [],
        introductoryOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should handle missing prices gracefully", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [],
        introductoryOffers: [],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).toHaveBeenCalledWith({
        code: z.ZodIssueCode.custom,
        message:
          "Subscription 'test_product' is available in territory 'USA' but has no price defined for this territory",
        path: ["prices"],
      });
    });

    it("should handle missing introductory offers gracefully", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: undefined,
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should handle missing prices in introductory offers gracefully", () => {
      const subscription = {
        productId: "test_product",
        availability: {
          availableTerritories: ["USA"],
        },
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: undefined,
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });

    it("should handle missing availableTerritories in introductory offers gracefully", () => {
      const subscription = {
        productId: "test_product",
        availability: {},
        prices: [{ price: "4.99", territory: "USA" }],
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "0.99", territory: "USA" }],
          },
        ],
      };

      const mockCtx = {
        addIssue: jest.fn(),
      } as any;

      validateSubscriptionTerritoryPricing(subscription, mockCtx);
      expect(mockCtx.addIssue).not.toHaveBeenCalled();
    });
  });

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
          },
          {
            type: "PAY_AS_YOU_GO",
            numberOfPeriods: 1,
            prices: [{ price: "1.99", territory: "CAN" }],
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
          },
          {
            type: "PAY_UP_FRONT",
            duration: "ONE_MONTH",
            prices: [{ price: "12.99", territory: "CAN" }],
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
          },
          {
            type: "PAY_UP_FRONT",
            duration: "THREE_MONTHS",
            prices: [{ price: "19.99", territory: "AZE" }],
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
