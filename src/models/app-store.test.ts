import {
  PriceScheduleSchema,
  SubscriptionSchema,
  InAppPurchaseSchema,
  AppStoreModelSchema,
  SubscriptionGroupLocalizationSchema,
} from "./app-store";
import { isValidProductId } from "../helpers/validation-helpers";
import { validateAppStoreModel } from "../helpers/validation-model";
import { describe, it, expect } from "@jest/globals";

jest.mock("./territories", () => ({
  ...jest.requireActual("./territories"),
  territoryCodes: ["USA", "CAN", "GBR"],
}));

describe("AppStore Models", () => {
  describe("SubscriptionGroupLocalizationSchema", () => {
    it("should warn when customName exceeds 30 characters", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const longCustomName =
          "This is a very long custom name that exceeds thirty characters limit";
        const localization = {
          locale: "en-US",
          name: "Test Name",
          customName: longCustomName,
        };

        const result =
          SubscriptionGroupLocalizationSchema.safeParse(localization);
        expect(result.success).toBe(true);
        expect(mockWarn).toHaveBeenCalledWith(
          `Warning: customName '${longCustomName}' is ${longCustomName.length} characters long, but should be at most 30 characters for optimal App Store display.`
        );
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });

    it("should not warn when customName is within 30 characters", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const shortCustomName = "Short Name";
        const localization = {
          locale: "en-US",
          name: "Test Name",
          customName: shortCustomName,
        };

        const result =
          SubscriptionGroupLocalizationSchema.safeParse(localization);
        expect(result.success).toBe(true);
        expect(mockWarn).not.toHaveBeenCalled();
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });

    it("should not warn when customName is null or undefined", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const localizationWithoutCustomName = {
          locale: "en-US",
          name: "Test Name",
        };

        const result = SubscriptionGroupLocalizationSchema.safeParse(
          localizationWithoutCustomName
        );
        expect(result.success).toBe(true);
        expect(mockWarn).not.toHaveBeenCalled();
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });
  });

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

    it("should fail validation if prices for some territories are missing when context is apply", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          // Missing price for GBR
        ],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      expect(() =>
        validateAppStoreModel(mockAppStoreData, false, "apply")
      ).toThrow(
        "Business rule validation failed: Subscription 'prod.monthly' is available in territory 'GBR' but has no price defined for this territory"
      );
    });

    it("should pass validation if prices for some territories are missing when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          // Missing price for GBR
        ],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "fetch");
      expect(result).toBeDefined();
    });

    it("should fail validation if the prices array is empty when context is apply", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      expect(() =>
        validateAppStoreModel(mockAppStoreData, false, "apply")
      ).toThrow(
        "Business rule validation failed: Subscription 'prod.monthly' is available in territory 'USA' but has no price defined for this territory"
      );
    });

    it("should pass validation if the prices array is empty when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "fetch");
      expect(result).toBeDefined();
    });

    it("should pass validation when prices is missing", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass validation when localizations is missing but availability exists", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA", "CAN", "GBR"],
        },
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation when availability is missing but prices exist when context is apply", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      expect(() =>
        validateAppStoreModel(mockAppStoreData, false, "apply")
      ).toThrow(
        "Business rule validation failed: Subscription 'prod.monthly' has pricing defined but no availability. You need to set up availabilities first."
      );
    });

    it("should pass validation when availability is missing but prices exist when context is fetch", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      // Create a mock app store data structure
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "fetch");
      expect(result).toBeDefined();
    });

    it("should pass validation when all optional fields are missing", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass business rule validation when context is apply and all validations pass", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
      expect(result.subscriptionGroups?.[0]?.subscriptions?.[0]).toEqual(
        subscription
      );
    });

    it("should not run business rule validation when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [], // This would fail business rule validation
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      // Should pass because business rule validation is not run for fetch context
      const result = validateAppStoreModel(mockAppStoreData, false, "fetch");
      expect(result).toBeDefined();
    });

    it("should handle missing subscriptionGroups gracefully", () => {
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        // No subscriptionGroups
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
    });

    it("should handle empty subscriptionGroups gracefully", () => {
      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
    });

    it("should validate multiple subscriptions in a group when context is apply", () => {
      const subscription1 = {
        ...validSubscriptionData,
        productId: "prod.monthly",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      const subscription2 = {
        ...validSubscriptionData,
        productId: "prod.yearly",
        prices: [
          { territory: "USA", price: "99.99" },
          { territory: "CAN", price: "129.99" },
          // Missing price for GBR - should fail validation
        ],
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription1, subscription2],
          },
        ],
      };

      expect(() =>
        validateAppStoreModel(mockAppStoreData, false, "apply")
      ).toThrow(
        "Business rule validation failed: Subscription 'prod.yearly' is available in territory 'GBR' but has no price defined for this territory"
      );
    });

    it("should validate multiple subscription groups when context is apply", () => {
      const subscription1 = {
        ...validSubscriptionData,
        productId: "prod.monthly",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      const subscription2 = {
        ...validSubscriptionData,
        productId: "prod.yearly",
        prices: [
          { territory: "USA", price: "99.99" },
          { territory: "CAN", price: "129.99" },
          { territory: "GBR", price: "89.99" },
        ],
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Group 1",
            localizations: [],
            subscriptions: [subscription1],
          },
          {
            referenceName: "Group 2",
            localizations: [],
            subscriptions: [subscription2],
          },
        ],
      };

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
      expect(result.subscriptionGroups).toHaveLength(2);
    });

    it("should pass validation when context is fetch even with invalid subscription data", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [], // This would fail business rule validation
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA", "CAN", "GBR"],
        },
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      // Should pass because business rule validation is not run for fetch context
      const result = validateAppStoreModel(mockAppStoreData, false, "fetch");
      expect(result).toBeDefined();
    });

    it("should show success message when showSuccessMessage is true", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };

      const mockAppStoreData = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [subscription],
          },
        ],
      };

      // Mock the logger to capture the info call
      const mockLogger = require("../utils/logger");
      const originalInfo = mockLogger.logger.info;
      const mockInfo = jest.fn();
      mockLogger.logger.info = mockInfo;

      try {
        const result = validateAppStoreModel(mockAppStoreData, true, "fetch");
        expect(result).toBeDefined();
        expect(mockInfo).toHaveBeenCalledWith(
          "✅ Validation passed! The JSON file format and structure are valid."
        );
      } finally {
        // Restore the original logger
        mockLogger.logger.info = originalInfo;
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

    it("should pass validation when localizations is missing", () => {
      const iap = {
        productId: "iap.product",
        type: "CONSUMABLE" as const,
        referenceName: "Test IAP",
        familySharable: false,
      };
      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

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

    it("should warn when productId exceeds 30 characters", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const longProductId =
          "this.is.a.very.long.product.id.that.exceeds.thirty.characters.limit";
        const iap = {
          ...validInAppPurchaseData,
          productId: longProductId,
        };

        const result = InAppPurchaseSchema.safeParse(iap);
        expect(result.success).toBe(true);
        expect(mockWarn).toHaveBeenCalledWith(
          `Warning: productId '${longProductId}' is ${longProductId.length} characters long, but should be at most 30 characters for optimal App Store display.`
        );
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });

    it("should warn when referenceName exceeds 60 characters", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const longReferenceName =
          "This is a very long reference name that exceeds sixty characters limit and should trigger a warning message";
        const iap = {
          ...validInAppPurchaseData,
          referenceName: longReferenceName,
        };

        const result = InAppPurchaseSchema.safeParse(iap);
        expect(result.success).toBe(true);
        expect(mockWarn).toHaveBeenCalledWith(
          `Warning: referenceName '${longReferenceName}' is ${longReferenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
        );
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });

    it("should warn for both productId and referenceName when both exceed limits", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const longProductId =
          "this.is.a.very.long.product.id.that.exceeds.thirty.characters.limit";
        const longReferenceName =
          "This is a very long reference name that exceeds sixty characters limit and should trigger a warning message";
        const iap = {
          ...validInAppPurchaseData,
          productId: longProductId,
          referenceName: longReferenceName,
        };

        const result = InAppPurchaseSchema.safeParse(iap);
        expect(result.success).toBe(true);
        expect(mockWarn).toHaveBeenCalledTimes(2);
        expect(mockWarn).toHaveBeenCalledWith(
          `Warning: productId '${longProductId}' is ${longProductId.length} characters long, but should be at most 30 characters for optimal App Store display.`
        );
        expect(mockWarn).toHaveBeenCalledWith(
          `Warning: referenceName '${longReferenceName}' is ${longReferenceName.length} characters long, but should be at most 60 characters for optimal App Store display.`
        );
      } finally {
        mockLogger.logger.warn = originalWarn;
      }
    });

    it("should not warn when both productId and referenceName are within limits", () => {
      const mockLogger = require("../utils/logger");
      const originalWarn = mockLogger.logger.warn;
      const mockWarn = jest.fn();
      mockLogger.logger.warn = mockWarn;

      try {
        const shortProductId = "short.product.id";
        const shortReferenceName = "Short Reference Name";
        const iap = {
          ...validInAppPurchaseData,
          productId: shortProductId,
          referenceName: shortReferenceName,
        };

        const result = InAppPurchaseSchema.safeParse(iap);
        expect(result.success).toBe(true);
        expect(mockWarn).not.toHaveBeenCalled();
      } finally {
        mockLogger.logger.warn = originalWarn;
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
          prices: [{ price: "2.99", territory: "CAN" }],
          availableTerritories: ["CAN"],
        },
        {
          type: "FREE_TRIAL" as const,
          duration: "ONE_WEEK" as const,
          availableTerritories: ["GBR"],
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
