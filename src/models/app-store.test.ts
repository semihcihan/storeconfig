import {
  PriceScheduleSchema,
  SubscriptionSchema,
  InAppPurchaseSchema,
  AppStoreModelSchema,
} from "./app-store";
import { isValidProductId } from "../helpers/validation-helpers";
import { describe, it, expect } from "@jest/globals";

jest.mock("./territories", () => ({
  ...jest.requireActual("./territories"),
  territoryCodes: ["USA", "CAN", "GBR"],
}));

describe("AppStore Models", () => {
  describe("AppStoreModelSchema", () => {
    it("should accept minimal valid app store model", () => {
      const minimalModel = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
      };
      const result = AppStoreModelSchema.safeParse(minimalModel);
      expect(result.success).toBe(true);
    });

    it("should accept app store model with all optional fields", () => {
      const fullModel = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        copyright: "© 2024 Test Company",
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "4.99" }],
        },
        availableTerritories: ["USA", "CAN"],
        inAppPurchases: [],
        subscriptionGroups: [],
        versionString: "1.0.0",
        localizations: [],
      };
      const result = AppStoreModelSchema.safeParse(fullModel);
      expect(result.success).toBe(true);
    });

    it("should accept app store model with some optional fields missing", () => {
      const partialModel = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "4.99" }],
        },
        versionString: "1.0.0",
      };
      const result = AppStoreModelSchema.safeParse(partialModel);
      expect(result.success).toBe(true);
    });

    it("should accept app store model with copyright field", () => {
      const modelWithCopyright = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        copyright: "© 2024 My Company, Inc.",
      };
      const result = AppStoreModelSchema.safeParse(modelWithCopyright);
      expect(result.success).toBe(true);
    });
  });

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

    it("should fail validation if prices for some territories are missing", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          // Missing price for GBR
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Subscription 'prod.monthly' is available in territory 'GBR' but has no price defined for this territory"
        );
      }
    });

    it("should fail validation if the prices array is empty", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Subscription 'prod.monthly' is available in territory 'USA' but has no price defined for this territory"
        );
      }
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

describe("Introductory Offers Grouping Validation", () => {
  const baseSubscription = {
    productId: "test_product",
    referenceName: "Test Subscription",
    groupLevel: 1,
    subscriptionPeriod: "ONE_MONTH" as const,
    familySharable: false,
    prices: [{ price: "4.99", territory: "USA" }],
    localizations: [
      { locale: "en-US", name: "Test", description: "Test description" },
    ],
    availability: {
      availableInNewTerritories: true,
      availableTerritories: ["USA"],
    },
  };

  it("should allow valid introductory offers with unique groupings", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 1,
          prices: [{ price: "0.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_UP_FRONT" as const,
          duration: "ONE_MONTH" as const,
          prices: [{ price: "2.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["USA"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should reject duplicate PAY_AS_YOU_GO with same numberOfPeriods", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 1,
          prices: [{ price: "0.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 1,
          prices: [{ price: "1.99", territory: "GBR" }],
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "Duplicate introductory offers found"
      );
      expect(result.error.issues[0].message).toContain(
        "type 'PAY_AS_YOU_GO' with numberOfPeriods '1'"
      );
      expect(result.error.issues[0].message).toContain(
        "in subscription 'test_product'"
      );
      expect(result.error.issues[0].message).toContain(
        "Items at indices 0 and 1"
      );
    }
  });

  it("should reject duplicate PAY_UP_FRONT with same duration", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_UP_FRONT" as const,
          duration: "ONE_MONTH" as const,
          prices: [{ price: "2.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_UP_FRONT" as const,
          duration: "ONE_MONTH" as const,
          prices: [{ price: "3.99", territory: "GBR" }],
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "Duplicate introductory offers found"
      );
      expect(result.error.issues[0].message).toContain(
        "type 'PAY_UP_FRONT' with duration 'ONE_MONTH'"
      );
      expect(result.error.issues[0].message).toContain(
        "in subscription 'test_product'"
      );
      expect(result.error.issues[0].message).toContain(
        "Items at indices 0 and 1"
      );
    }
  });

  it("should reject duplicate FREE_TRIAL with same duration", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "Duplicate introductory offers found"
      );
      expect(result.error.issues[0].message).toContain(
        "type 'FREE_TRIAL' with duration 'ONE_WEEK'"
      );
      expect(result.error.issues[0].message).toContain(
        "in subscription 'test_product'"
      );
      expect(result.error.issues[0].message).toContain(
        "Items at indices 0 and 1"
      );
    }
  });

  it("should allow different PAY_AS_YOU_GO with different numberOfPeriods", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 1,
          prices: [{ price: "0.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 2,
          prices: [{ price: "1.99", territory: "GBR" }],
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should allow different PAY_UP_FRONT with different durations", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_UP_FRONT" as const,
          duration: "ONE_MONTH" as const,
          prices: [{ price: "2.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_UP_FRONT" as const,
          duration: "THREE_MONTHS" as const,
          prices: [{ price: "7.99", territory: "GBR" }],
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should allow different FREE_TRIAL with different durations", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["USA"],
        },
        {
          type: "FREE_TRIAL" as const,
          duration: "TWO_WEEKS" as const,
          availableTerritories: ["GBR"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should allow empty introductory offers array", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should allow undefined introductory offers", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: undefined,
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });

  it("should allow mixed types with unique groupings", () => {
    const subscription = {
      ...baseSubscription,
      introductoryOffers: [
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 1,
          prices: [{ price: "0.99", territory: "USA" }],
          availableTerritories: ["USA"],
        },
        {
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: 2,
          prices: [{ price: "1.99", territory: "GBR" }],
          availableTerritories: ["GBR"],
        },
        {
          type: "PAY_UP_FRONT" as const,
          duration: "ONE_MONTH" as const,
          prices: [{ price: "2.99", territory: "CAN" }],
          availableTerritories: ["CAN"],
        },
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["AUS"],
        },
      ],
    };

    const result = SubscriptionSchema.safeParse(subscription);
    expect(result.success).toBe(true);
  });
});
