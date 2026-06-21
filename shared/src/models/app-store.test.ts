import {
  PriceScheduleSchema,
  SubscriptionSchema,
  InAppPurchaseSchema,
  AppStoreModelSchema,
  SubscriptionGroupLocalizationSchema,
  PromotionalOfferSchema,
  SubscriptionGroupSchema,
  AppStoreLocalizationSchema,
  LocalizationSchema,
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
    it("should fail validation when customName exceeds 30 characters", () => {
      const longCustomName = "a".repeat(31);
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: longCustomName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["customName"]);
      }
    });

    it("should pass validation when customName is within 30 characters", () => {
      const shortCustomName = "Short Name";
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: shortCustomName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when customName is exactly 30 characters", () => {
      const exactLengthCustomName = "a".repeat(30);
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: exactLengthCustomName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when customName is null", () => {
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: null,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when customName is undefined", () => {
      const localizationWithoutCustomName = {
        locale: "en-US",
        name: "Test Name",
      };

      const result = SubscriptionGroupLocalizationSchema.safeParse(
        localizationWithoutCustomName
      );
      expect(result.success).toBe(true);
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

    it("should pass validation when primaryLocale exists in localizations", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        primaryLocale: "en-US",
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "fr-FR", name: "App Test" },
        ],
      };
      const result = AppStoreModelSchema.safeParse(model);
      expect(result.success).toBe(true);
    });

    it("should fail validation when primaryLocale does not exist in localizations", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        primaryLocale: "en-US",
        localizations: [
          { locale: "fr-FR", name: "App Test" },
          { locale: "de-DE", name: "Test App" },
        ],
      };
      const result = AppStoreModelSchema.safeParse(model);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("custom");
        expect(result.error.issues[0].path).toEqual(["primaryLocale"]);
        expect(result.error.issues[0].message).toContain(
          "Primary locale 'en-US' must exist in the localizations array"
        );
      }
    });

    it("should pass validation when primaryLocale is set but localizations is empty", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        primaryLocale: "en-US",
        localizations: [],
      };
      const result = AppStoreModelSchema.safeParse(model);
      expect(result.success).toBe(true);
    });

    it("should pass validation when primaryLocale is undefined", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        localizations: [{ locale: "en-US", name: "Test App" }],
      };
      const result = AppStoreModelSchema.safeParse(model);
      expect(result.success).toBe(true);
    });

    it("should fail validation when localizations contain duplicate locales", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "fr-FR", name: "App Test" },
          { locale: "en-US", name: "Another Name" },
        ],
      };
      const result = AppStoreModelSchema.safeParse(model);
      expect(result.success).toBe(false);
      if (!result.success) {
        const duplicateIssue = result.error.issues.find(
          (i) =>
            i.code === "custom" &&
            typeof i.message === "string" &&
            i.message.includes("Duplicate locale") &&
            i.message.includes("en-US")
        );
        expect(duplicateIssue).toBeDefined();
        expect(duplicateIssue!.path).toEqual(["localizations"]);
      }
    });

    it("should pass validation when localizations have unique locales", () => {
      const model = {
        schemaVersion: "1.0.0",
        appId: "test-app-id",
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "fr-FR", name: "App Test" },
          { locale: "de-DE", name: "App Name" },
        ],
      };
      const result = AppStoreModelSchema.safeParse(model);
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

    it("should fail validation when prices contain duplicate territories", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "USA", price: "8.99" },
        ],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(false);
      if (!result.success) {
        const uniqueTerritoryIssue = result.error.issues.find(
          (i) =>
            typeof i.message === "string" &&
            i.message.includes("Duplicate territory") &&
            i.message.includes("USA") &&
            i.message.includes("at indices 0, 2")
        );
        expect(uniqueTerritoryIssue).toBeDefined();
        expect(uniqueTerritoryIssue!.path).toEqual(["prices"]);
      }
    });

    it("should pass validation when all territories are unique", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation for invalid product ID", () => {
      const subscription = {
        ...validSubscriptionData,
        productId: "invalid-product-123", // hyphen not allowed
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass validation if prices for some territories are missing when context is apply (prices can now be deduced)", () => {
      const subscription = {
        ...validSubscriptionData,
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            // Missing price for GBR
          ],
        },
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

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
    });

    it("should pass validation if prices for some territories are missing when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            // Missing price for GBR
          ],
        },
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

    it("should fail validation if the prices array is empty when context is apply (base territory must have a price)", () => {
      const subscription = {
        ...validSubscriptionData,
        pricing: {
          baseTerritory: "USA",
          prices: [],
        },
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
      ).toThrow();
    });

    it("should pass validation when prices is missing when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        // No prices field - this should be allowed in fetch context
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation when subscription localizations contain duplicate locales", () => {
      const subscription = {
        ...validSubscriptionData,
        localizations: [
          { locale: "en-US", name: "Monthly", description: "Monthly plan desc" },
          { locale: "fr-FR", name: "Mensuel", description: "Plan mensuel desc" },
          { locale: "en-US", name: "Duplicate", description: "Duplicate en desc" },
        ],
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        const duplicateIssue = result.error.issues.find(
          (i) =>
            i.code === "custom" &&
            typeof i.message === "string" &&
            i.message.includes("Duplicate locale") &&
            i.message.includes("en-US")
        );
        expect(duplicateIssue).toBeDefined();
        expect(duplicateIssue!.path).toEqual(["localizations"]);
      }
    });

    it("should pass validation when subscription localizations have unique locales", () => {
      const subscription = {
        ...validSubscriptionData,
        localizations: [
          { locale: "en-US", name: "Monthly", description: "Monthly plan desc" },
          { locale: "fr-FR", name: "Mensuel", description: "Plan mensuel desc" },
        ],
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        "Subscription 'prod.monthly' has pricing defined but no availability. You need to set up availabilities first."
      );
    });

    it("should pass validation when availability is missing but prices exist when context is fetch", () => {
      const subscription = {
        productId: "prod.monthly",
        referenceName: "Monthly Subscription",
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH",
        familySharable: false,
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
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

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
      expect(result.subscriptionGroups?.[0]?.subscriptions?.[0]).toEqual(
        subscription
      );
    });

    it("should not run business rule validation when context is fetch", () => {
      const subscription = {
        ...validSubscriptionData,
        // No prices field - this would fail business rule validation in apply context
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };

      const subscription2 = {
        ...validSubscriptionData,
        productId: "prod.yearly",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "99.99" },
            { territory: "CAN", price: "129.99" },
            // Missing price for GBR - should pass validation now (prices can be deduced)
          ],
        },
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

      const result = validateAppStoreModel(mockAppStoreData, false, "apply");
      expect(result).toBeDefined();
    });

    it("should validate multiple subscription groups when context is apply", () => {
      const subscription1 = {
        ...validSubscriptionData,
        productId: "prod.monthly",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
        },
      };

      const subscription2 = {
        ...validSubscriptionData,
        productId: "prod.yearly",
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "99.99" },
            { territory: "CAN", price: "129.99" },
            { territory: "GBR", price: "89.99" },
          ],
        },
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
        // No prices field - this would fail business rule validation in apply context
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "9.99" },
            { territory: "CAN", price: "12.99" },
            { territory: "GBR", price: "8.99" },
          ],
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

    it("should fail validation when productId exceeds 100 characters", () => {
      const longProductId = "a".repeat(101);
      const subscription = {
        ...validSubscriptionData,
        productId: longProductId,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["productId"]);
      }
    });

    it("should pass validation when productId is exactly 100 characters", () => {
      const exactLengthProductId = "a".repeat(100);
      const subscription = {
        ...validSubscriptionData,
        productId: exactLengthProductId,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation when referenceName exceeds 64 characters", () => {
      const longReferenceName = "a".repeat(65);
      const subscription = {
        ...validSubscriptionData,
        referenceName: longReferenceName,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["referenceName"]);
      }
    });

    it("should pass validation when referenceName is exactly 64 characters", () => {
      const exactLengthReferenceName = "a".repeat(64);
      const subscription = {
        ...validSubscriptionData,
        referenceName: exactLengthReferenceName,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation when both productId and referenceName exceed limits", () => {
      const longProductId = "a".repeat(101);
      const longReferenceName = "a".repeat(65);
      const subscription = {
        ...validSubscriptionData,
        productId: longProductId,
        referenceName: longReferenceName,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(1);
        const paths = result.error.issues.map((issue) => issue.path[0]);
        expect(paths).toContain("productId");
        expect(paths).toContain("referenceName");
      }
    });

    it("should pass validation when both productId and referenceName are within limits", () => {
      const shortProductId = "short.product.id";
      const shortReferenceName = "Short Reference Name";
      const subscription = {
        ...validSubscriptionData,
        productId: shortProductId,
        referenceName: shortReferenceName,
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

    it("should fail validation when productId exceeds 100 characters", () => {
      const longProductId = "a".repeat(101);
      const iap = {
        ...validInAppPurchaseData,
        productId: longProductId,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["productId"]);
      }
    });

    it("should pass validation when productId is exactly 100 characters", () => {
      const exactLengthProductId = "a".repeat(100);
      const iap = {
        ...validInAppPurchaseData,
        productId: exactLengthProductId,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

    it("should fail validation when referenceName exceeds 64 characters", () => {
      const longReferenceName = "a".repeat(65);
      const iap = {
        ...validInAppPurchaseData,
        referenceName: longReferenceName,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["referenceName"]);
      }
    });

    it("should pass validation when referenceName is exactly 64 characters", () => {
      const exactLengthReferenceName = "a".repeat(64);
      const iap = {
        ...validInAppPurchaseData,
        referenceName: exactLengthReferenceName,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

    it("should fail validation when both productId and referenceName exceed limits", () => {
      const longProductId = "a".repeat(101);
      const longReferenceName = "a".repeat(65);
      const iap = {
        ...validInAppPurchaseData,
        productId: longProductId,
        referenceName: longReferenceName,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(1);
        const paths = result.error.issues.map((issue) => issue.path[0]);
        expect(paths).toContain("productId");
        expect(paths).toContain("referenceName");
      }
    });

    it("should pass validation when both productId and referenceName are within limits", () => {
      const shortProductId = "short.product.id";
      const shortReferenceName = "Short Reference Name";
      const iap = {
        ...validInAppPurchaseData,
        productId: shortProductId,
        referenceName: shortReferenceName,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

    it("should fail validation when IAP localizations contain duplicate locales", () => {
      const iap = {
        ...validInAppPurchaseData,
        localizations: [
          { locale: "en-US", name: "Coins", description: "Coin pack desc" },
          { locale: "fr-FR", name: "Pièces", description: "Pack pièces desc" },
          { locale: "en-US", name: "Duplicate", description: "Duplicate en desc" },
        ],
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        const duplicateIssue = result.error.issues.find(
          (i) =>
            i.code === "custom" &&
            typeof i.message === "string" &&
            i.message.includes("Duplicate locale") &&
            i.message.includes("en-US")
        );
        expect(duplicateIssue).toBeDefined();
        expect(duplicateIssue!.path).toEqual(["localizations"]);
      }
    });

    it("should pass validation when IAP localizations have unique locales", () => {
      const iap = {
        ...validInAppPurchaseData,
        localizations: [
          { locale: "en-US", name: "Coins", description: "Coin pack desc" },
          { locale: "fr-FR", name: "Pièces", description: "Pack pièces desc" },
        ],
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });
  });

  describe("PromotionalOfferSchema", () => {
    const validPromoOfferData = {
      id: "promo.offer.id",
      referenceName: "Promotional Offer",
      type: "PAY_AS_YOU_GO" as const,
      numberOfPeriods: 1,
      pricing: {
        baseTerritory: "USA",
        prices: [{ territory: "USA", price: "0.99" }],
      },
    };

    it("should fail validation when id exceeds 100 characters", () => {
      const longId = "a".repeat(101);
      const promoOffer = {
        ...validPromoOfferData,
        id: longId,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["id"]);
      }
    });

    it("should pass validation when id is exactly 100 characters", () => {
      const exactLengthId = "a".repeat(100);
      const promoOffer = {
        ...validPromoOfferData,
        id: exactLengthId,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(true);
    });

    it("should fail validation when referenceName exceeds 64 characters", () => {
      const longReferenceName = "a".repeat(65);
      const promoOffer = {
        ...validPromoOfferData,
        referenceName: longReferenceName,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["referenceName"]);
      }
    });

    it("should pass validation when referenceName is exactly 64 characters", () => {
      const exactLengthReferenceName = "a".repeat(64);
      const promoOffer = {
        ...validPromoOfferData,
        referenceName: exactLengthReferenceName,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(true);
    });

    it("should fail validation when both id and referenceName exceed limits", () => {
      const longId = "a".repeat(101);
      const longReferenceName = "a".repeat(65);
      const promoOffer = {
        ...validPromoOfferData,
        id: longId,
        referenceName: longReferenceName,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(1);
        const paths = result.error.issues.map((issue) => issue.path[0]);
        expect(paths).toContain("id");
        expect(paths).toContain("referenceName");
      }
    });

    it("should pass validation when both id and referenceName are within limits", () => {
      const shortId = "short.promo.id";
      const shortReferenceName = "Short Promo Name";
      const promoOffer = {
        ...validPromoOfferData,
        id: shortId,
        referenceName: shortReferenceName,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(true);
    });

    it("should work with PAY_UP_FRONT type", () => {
      const promoOffer = {
        id: "promo.upfront",
        referenceName: "Upfront Promo",
        type: "PAY_UP_FRONT" as const,
        duration: "ONE_MONTH" as const,
        pricing: {
          baseTerritory: "USA",
          prices: [{ territory: "USA", price: "2.99" }],
        },
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(true);
    });

    it("should work with FREE_TRIAL type", () => {
      const promoOffer = {
        id: "promo.free",
        referenceName: "Free Trial Promo",
        type: "FREE_TRIAL" as const,
        duration: "ONE_WEEK" as const,
      };

      const result = PromotionalOfferSchema.safeParse(promoOffer);
      expect(result.success).toBe(true);
    });
  });

  describe("SubscriptionGroupSchema", () => {
    const validSubscriptionGroupData = {
      referenceName: "Test Subscription Group",
      localizations: [
        {
          locale: "en-US",
          name: "Test Group",
        },
      ],
      subscriptions: [],
    };

    it("should fail validation when referenceName exceeds 64 characters", () => {
      const longReferenceName = "a".repeat(65);
      const subscriptionGroup = {
        ...validSubscriptionGroupData,
        referenceName: longReferenceName,
      };

      const result = SubscriptionGroupSchema.safeParse(subscriptionGroup);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["referenceName"]);
      }
    });

    it("should pass validation when referenceName is exactly 64 characters", () => {
      const exactLengthReferenceName = "a".repeat(64);
      const subscriptionGroup = {
        ...validSubscriptionGroupData,
        referenceName: exactLengthReferenceName,
      };

      const result = SubscriptionGroupSchema.safeParse(subscriptionGroup);
      expect(result.success).toBe(true);
    });

    it("should pass validation when referenceName is within limits", () => {
      const shortReferenceName = "Short Group Name";
      const subscriptionGroup = {
        ...validSubscriptionGroupData,
        referenceName: shortReferenceName,
      };

      const result = SubscriptionGroupSchema.safeParse(subscriptionGroup);
      expect(result.success).toBe(true);
    });

    it("should fail validation when localizations contain duplicate locales", () => {
      const subscriptionGroup = {
        ...validSubscriptionGroupData,
        localizations: [
          { locale: "en-US", name: "Test Group" },
          { locale: "fr-FR", name: "Groupe Test" },
          { locale: "en-US", name: "Duplicate En" },
        ],
      };

      const result = SubscriptionGroupSchema.safeParse(subscriptionGroup);
      expect(result.success).toBe(false);
      if (!result.success) {
        const duplicateIssue = result.error.issues.find(
          (i) =>
            i.code === "custom" &&
            typeof i.message === "string" &&
            i.message.includes("Duplicate locale") &&
            i.message.includes("en-US")
        );
        expect(duplicateIssue).toBeDefined();
        expect(duplicateIssue!.path).toEqual(["localizations"]);
      }
    });

    it("should pass validation when localizations have unique locales", () => {
      const subscriptionGroup = {
        ...validSubscriptionGroupData,
        localizations: [
          { locale: "en-US", name: "Test Group" },
          { locale: "fr-FR", name: "Groupe Test" },
          { locale: "de-DE", name: "Test Gruppe" },
        ],
      };

      const result = SubscriptionGroupSchema.safeParse(subscriptionGroup);
      expect(result.success).toBe(true);
    });
  });

  describe("AppStoreLocalizationSchema", () => {
    const validLocalizationData = {
      locale: "en-US",
      description:
        "This is a valid description that meets the minimum length requirement",
    };

    it("should fail validation when description is less than 10 characters", () => {
      const shortDescription = "Short";
      const localization = {
        ...validLocalizationData,
        description: shortDescription,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_small");
        expect(result.error.issues[0].path).toEqual(["description"]);
      }
    });

    it("should pass validation when description is exactly 10 characters", () => {
      const exactLengthDescription = "a".repeat(10);
      const localization = {
        ...validLocalizationData,
        description: exactLengthDescription,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when description is 10 or more characters", () => {
      const validDescription = "Valid description";
      const localization = {
        ...validLocalizationData,
        description: validDescription,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when description is undefined", () => {
      const localization = {
        locale: "en-US",
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });
  });

  describe("Introductory Offers Grouping Validation", () => {
    const baseSubscription = {
      productId: "test_product",
      referenceName: "Test Subscription",
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH" as const,
      familySharable: false,
      pricing: {
        baseTerritory: "USA",
        prices: [{ territory: "USA", price: "4.99" }],
      },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "0.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_UP_FRONT" as const,
            duration: "ONE_MONTH" as const,
            pricing: {
              baseTerritory: "CAN",
              prices: [{ price: "2.99", territory: "CAN" }],
            },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "0.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_AS_YOU_GO" as const,
            numberOfPeriods: 1,
            pricing: {
              baseTerritory: "GBR",
              prices: [{ price: "1.99", territory: "GBR" }],
            },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "2.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_UP_FRONT" as const,
            duration: "ONE_MONTH" as const,
            pricing: {
              baseTerritory: "GBR",
              prices: [{ price: "3.99", territory: "GBR" }],
            },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "0.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_AS_YOU_GO" as const,
            numberOfPeriods: 2,
            pricing: {
              baseTerritory: "GBR",
              prices: [{ price: "1.99", territory: "GBR" }],
            },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "2.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_UP_FRONT" as const,
            duration: "THREE_MONTHS" as const,
            pricing: {
              baseTerritory: "GBR",
              prices: [{ price: "7.99", territory: "GBR" }],
            },
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
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "0.99", territory: "USA" }],
            },
            availableTerritories: ["USA"],
          },
          {
            type: "PAY_AS_YOU_GO" as const,
            numberOfPeriods: 2,
            pricing: {
              baseTerritory: "GBR",
              prices: [{ price: "1.99", territory: "GBR" }],
            },
            availableTerritories: ["GBR"],
          },
          {
            type: "PAY_UP_FRONT" as const,
            duration: "ONE_MONTH" as const,
            pricing: {
              baseTerritory: "CAN",
              prices: [{ price: "2.99", territory: "CAN" }],
            },
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

  describe("Missing Base Territory Price Validation", () => {
    it("should fail validation when subscription is missing base territory price", () => {
      const subscription = {
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
        pricing: {
          baseTerritory: "USA",
          prices: [{ price: "5.99", territory: "CAN" }],
        },
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });

    it("should fail validation when introductory offer is missing base territory price", () => {
      const subscription = {
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
        pricing: {
          baseTerritory: "USA",
          prices: [
            { price: "9.99", territory: "USA" },
            { price: "12.99", territory: "CAN" },
            { price: "8.99", territory: "GBR" },
          ],
        },
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO" as const,
            numberOfPeriods: 1,
            pricing: {
              baseTerritory: "USA",
              prices: [{ price: "5.99", territory: "CAN" }],
            },
            availableTerritories: ["USA", "CAN"],
          },
        ],
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });
  });

  describe("LocalizationSchema max length validations", () => {
    it("should fail validation when name exceeds 35 characters", () => {
      const longName = "a".repeat(36);
      const localization = {
        locale: "en-US",
        name: longName,
        description: "Valid description",
      };

      const result = LocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["name"]);
      }
    });

    it("should pass validation when name is exactly 35 characters", () => {
      const exactLengthName = "a".repeat(35);
      const localization = {
        locale: "en-US",
        name: exactLengthName,
        description: "Valid description",
      };

      const result = LocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should fail validation when description exceeds 55 characters", () => {
      const longDescription = "a".repeat(56);
      const localization = {
        locale: "en-US",
        name: "Valid name",
        description: longDescription,
      };

      const result = LocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["description"]);
      }
    });

    it("should pass validation when description is exactly 55 characters", () => {
      const exactLengthDescription = "a".repeat(55);
      const localization = {
        locale: "en-US",
        name: "Valid name",
        description: exactLengthDescription,
      };

      const result = LocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });
  });

  describe("SubscriptionGroupLocalizationSchema max length validations", () => {
    it("should fail validation when name exceeds 75 characters", () => {
      const longName = "a".repeat(76);
      const localization = {
        locale: "en-US",
        name: longName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["name"]);
      }
    });

    it("should pass validation when name is exactly 75 characters", () => {
      const exactLengthName = "a".repeat(75);
      const localization = {
        locale: "en-US",
        name: exactLengthName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should fail validation when customName exceeds 30 characters", () => {
      const longCustomName = "a".repeat(31);
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: longCustomName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["customName"]);
      }
    });

    it("should pass validation when customName is exactly 30 characters", () => {
      const exactLengthCustomName = "a".repeat(30);
      const localization = {
        locale: "en-US",
        name: "Test Name",
        customName: exactLengthCustomName,
      };

      const result =
        SubscriptionGroupLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });
  });

  describe("SubscriptionSchema reviewNote max length validation", () => {
    const validSubscriptionData = {
      productId: "prod.monthly",
      referenceName: "Monthly Subscription",
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH",
      familySharable: false,
    };

    it("should fail validation when reviewNote exceeds 4000 characters", () => {
      const longReviewNote = "a".repeat(4001);
      const subscription = {
        ...validSubscriptionData,
        reviewNote: longReviewNote,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["reviewNote"]);
      }
    });

    it("should pass validation when reviewNote is exactly 4000 characters", () => {
      const exactLengthReviewNote = "a".repeat(4000);
      const subscription = {
        ...validSubscriptionData,
        reviewNote: exactLengthReviewNote,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should pass validation when reviewNote is undefined", () => {
      const subscription = {
        ...validSubscriptionData,
      };

      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });
  });

  describe("InAppPurchaseSchema reviewNote max length validation", () => {
    const validInAppPurchaseData = {
      productId: "iap.product",
      type: "CONSUMABLE" as const,
      referenceName: "Test IAP",
      familySharable: false,
    };

    it("should fail validation when reviewNote exceeds 4000 characters", () => {
      const longReviewNote = "a".repeat(4001);
      const iap = {
        ...validInAppPurchaseData,
        reviewNote: longReviewNote,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["reviewNote"]);
      }
    });

    it("should pass validation when reviewNote is exactly 4000 characters", () => {
      const exactLengthReviewNote = "a".repeat(4000);
      const iap = {
        ...validInAppPurchaseData,
        reviewNote: exactLengthReviewNote,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });

    it("should pass validation when reviewNote is undefined", () => {
      const iap = {
        ...validInAppPurchaseData,
      };

      const result = InAppPurchaseSchema.safeParse(iap);
      expect(result.success).toBe(true);
    });
  });

  describe("AppStoreVersionLocalizationSchema max length validations", () => {
    const validLocalizationData = {
      locale: "en-US",
      description:
        "This is a valid description that meets the minimum length requirement",
    };

    it("should fail validation when description exceeds 4000 characters", () => {
      const longDescription = "a".repeat(4001);
      const localization = {
        ...validLocalizationData,
        description: longDescription,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["description"]);
      }
    });

    it("should pass validation when description is exactly 4000 characters", () => {
      const exactLengthDescription = "a".repeat(4000);
      const localization = {
        ...validLocalizationData,
        description: exactLengthDescription,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should fail validation when promotionalText exceeds 170 characters", () => {
      const longPromotionalText = "a".repeat(171);
      const localization = {
        ...validLocalizationData,
        promotionalText: longPromotionalText,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["promotionalText"]);
      }
    });

    it("should pass validation when promotionalText is exactly 170 characters", () => {
      const exactLengthPromotionalText = "a".repeat(170);
      const localization = {
        ...validLocalizationData,
        promotionalText: exactLengthPromotionalText,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should fail validation when whatsNew exceeds 4000 characters", () => {
      const longWhatsNew = "a".repeat(4001);
      const localization = {
        ...validLocalizationData,
        whatsNew: longWhatsNew,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe("too_big");
        expect(result.error.issues[0].path).toEqual(["whatsNew"]);
      }
    });

    it("should pass validation when whatsNew is exactly 4000 characters", () => {
      const exactLengthWhatsNew = "a".repeat(4000);
      const localization = {
        ...validLocalizationData,
        whatsNew: exactLengthWhatsNew,
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });

    it("should pass validation when all optional fields are undefined", () => {
      const localization = {
        locale: "en-US",
      };

      const result = AppStoreLocalizationSchema.safeParse(localization);
      expect(result.success).toBe(true);
    });
  });
});
