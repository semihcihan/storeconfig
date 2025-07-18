import {
  PriceScheduleSchema,
  SubscriptionSchema,
  InAppPurchaseSchema,
  isValidProductId,
} from "./app-store";
import { territoryCodes } from "./territories";

jest.mock("./territories", () => ({
  ...jest.requireActual("./territories"),
  territoryCodes: ["USA", "CAN", "GBR"],
}));

describe("AppStore Models", () => {
  describe("isValidProductId", () => {
    it("should return true for valid product IDs", () => {
      const validProductIds = [
        "product123",
        "product_123",
        "product.123",
        "PRODUCT_123",
        "123_product",
        "product.123_test",
        "a",
        "123",
        "_test",
        "test_",
        "test.",
        ".test",
      ];

      validProductIds.forEach((productId) => {
        expect(isValidProductId(productId)).toBe(true);
      });
    });

    it("should return false for invalid product IDs", () => {
      const invalidProductIds = [
        "product-123", // hyphen not allowed
        "product 123", // space not allowed
        "product@123", // special character not allowed
        "product#123", // special character not allowed
        "product$123", // special character not allowed
        "product%123", // special character not allowed
        "product^123", // special character not allowed
        "product&123", // special character not allowed
        "product*123", // special character not allowed
        "product(123", // special character not allowed
        "product)123", // special character not allowed
        "product+123", // special character not allowed
        "product=123", // special character not allowed
        "product[123", // special character not allowed
        "product]123", // special character not allowed
        "product{123", // special character not allowed
        "product}123", // special character not allowed
        "product|123", // special character not allowed
        "product\\123", // special character not allowed
        "product/123", // special character not allowed
        "product<123", // special character not allowed
        "product>123", // special character not allowed
        "product?123", // special character not allowed
        "product,123", // special character not allowed
        "product;123", // special character not allowed
        "product:123", // special character not allowed
        'product"123', // special character not allowed
        "product'123", // special character not allowed
        "", // empty string
      ];

      invalidProductIds.forEach((productId) => {
        expect(isValidProductId(productId)).toBe(false);
      });
    });
  });

  describe("PriceScheduleSchema", () => {
    it("should pass validation if baseTerritory has a corresponding price", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
        ],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(true);
    });

    it("should fail validation if baseTerritory does not have a corresponding price", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [{ territory: "CAN", price: "12.99" }],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });

    it("should fail validation if prices array is empty", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });

    it("should pass validation with a single price entry for the base territory", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [{ territory: "USA", price: "9.99" }],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(true);
    });
  });

  describe("SubscriptionSchema", () => {
    const validSubscriptionData = {
      productId: "prod.monthly",
      referenceName: "Monthly Subscription",
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH",
      familySharable: false,
      localizations: [],
      availability: {
        availableInNewTerritories: true,
        availableTerritories: ["USA", "CAN", "GBR"],
      },
    };

    it("should pass validation for valid product ID", () => {
      const subscription = {
        ...validSubscriptionData,
        productId: "valid_product_123",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation for invalid product ID", () => {
      const subscription = {
        ...validSubscriptionData,
        productId: "invalid-product-123", // hyphen not allowed
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });

    it("should fail validation for product ID with spaces", () => {
      const subscription = {
        ...validSubscriptionData,
        productId: "invalid product 123", // spaces not allowed
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });

    it("should fail validation for product ID with special characters", () => {
      const subscription = {
        ...validSubscriptionData,
        productId: "invalid@product#123", // special characters not allowed
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });

    it("should pass validation when prices for all territories are provided", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass validation even if prices for some territories are missing", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass validation if the prices array is empty", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });
  });

  describe("InAppPurchaseSchema", () => {
    const validInAppPurchaseData = {
      productId: "iap.product",
      type: "CONSUMABLE" as const,
      referenceName: "Test IAP",
      familySharable: false,
      localizations: [],
    };

    it("should pass validation for valid product ID", () => {
      const iap = {
        ...validInAppPurchaseData,
        productId: "valid_iap_123",
      };
      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

    it("should fail validation for invalid product ID", () => {
      const iap = {
        ...validInAppPurchaseData,
        productId: "invalid-iap-123", // hyphen not allowed
      };
      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });

    it("should fail validation for product ID with spaces", () => {
      const iap = {
        ...validInAppPurchaseData,
        productId: "invalid iap 123", // spaces not allowed
      };
      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });

    it("should fail validation for product ID with special characters", () => {
      const iap = {
        ...validInAppPurchaseData,
        productId: "invalid@iap#123", // special characters not allowed
      };
      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Product ID can only contain alphanumeric characters, underscores, and periods"
        );
      }
    });
  });
});
