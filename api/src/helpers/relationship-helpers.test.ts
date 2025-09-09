import { jest } from "@jest/globals";
import {
  createIncludedByIdMap,
  getIncludedResource,
  IncludedByIdMap,
} from "./relationship-helpers";

// Mock the generated types for testing
jest.mock("@semihcihan/app-store-connect-api-types");

describe("relationship-helpers", () => {
  describe("createIncludedByIdMap", () => {
    it("should create map from included resources", () => {
      const included = [
        {
          type: "inAppPurchaseLocalizations",
          id: "loc-1",
          attributes: { name: "Test IAP" },
        },
        {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "test.product" },
        },
        {
          type: "territories",
          id: "USA",
          attributes: { name: "United States" },
        },
      ] as any;

      const result = createIncludedByIdMap(included);

      expect(result).toEqual({
        "inAppPurchaseLocalizations-loc-1": {
          type: "inAppPurchaseLocalizations",
          id: "loc-1",
          attributes: { name: "Test IAP" },
        },
        "subscriptions-sub-1": {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "test.product" },
        },
        "territories-USA": {
          type: "territories",
          id: "USA",
          attributes: { name: "United States" },
        },
      });
    });

    it("should return empty object for undefined included", () => {
      const result = createIncludedByIdMap(undefined);

      expect(result).toEqual({});
    });

    it("should return empty object for null included", () => {
      const result = createIncludedByIdMap(null as any);

      expect(result).toEqual({});
    });

    it("should return empty object for empty array", () => {
      const result = createIncludedByIdMap([]);

      expect(result).toEqual({});
    });

    it("should handle single resource", () => {
      const included = [
        {
          type: "inAppPurchaseLocalizations",
          id: "loc-1",
          attributes: { name: "Test IAP" },
        },
      ] as any;

      const result = createIncludedByIdMap(included);

      expect(result).toEqual({
        "inAppPurchaseLocalizations-loc-1": {
          type: "inAppPurchaseLocalizations",
          id: "loc-1",
          attributes: { name: "Test IAP" },
        },
      });
    });

    it("should handle resources with same type but different IDs", () => {
      const included = [
        {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "product.1" },
        },
        {
          type: "subscriptions",
          id: "sub-2",
          attributes: { productId: "product.2" },
        },
      ] as any;

      const result = createIncludedByIdMap(included);

      expect(result).toEqual({
        "subscriptions-sub-1": {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "product.1" },
        },
        "subscriptions-sub-2": {
          type: "subscriptions",
          id: "sub-2",
          attributes: { productId: "product.2" },
        },
      });
    });

    it("should handle resources without attributes", () => {
      const included = [
        {
          type: "territories",
          id: "USA",
        },
        {
          type: "subscriptionPricePoints",
          id: "price-1",
        },
      ] as any;

      const result = createIncludedByIdMap(included);

      expect(result).toEqual({
        "territories-USA": {
          type: "territories",
          id: "USA",
        },
        "subscriptionPricePoints-price-1": {
          type: "subscriptionPricePoints",
          id: "price-1",
        },
      });
    });

    it("should handle complex nested attributes", () => {
      const included = [
        {
          type: "subscriptionIntroductoryOffers",
          id: "offer-1",
          attributes: {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            numberOfPeriods: 1,
          },
          relationships: {
            subscription: {
              data: {
                type: "subscriptions",
                id: "sub-1",
              },
            },
          },
        },
      ] as any;

      const result = createIncludedByIdMap(included);

      expect(result).toEqual({
        "subscriptionIntroductoryOffers-offer-1": {
          type: "subscriptionIntroductoryOffers",
          id: "offer-1",
          attributes: {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            numberOfPeriods: 1,
          },
          relationships: {
            subscription: {
              data: {
                type: "subscriptions",
                id: "sub-1",
              },
            },
          },
        },
      });
    });
  });

  describe("getIncludedResource", () => {
    let includedById: any;

    beforeEach(() => {
      includedById = {
        "inAppPurchaseLocalizations-loc-1": {
          type: "inAppPurchaseLocalizations",
          id: "loc-1",
          attributes: { name: "Test IAP", description: "Test description" },
        },
        "subscriptions-sub-1": {
          type: "subscriptions",
          id: "sub-1",
          attributes: {
            productId: "test.product",
            referenceName: "Test Product",
          },
        },
        "territories-USA": {
          type: "territories",
          id: "USA",
          attributes: { name: "United States" },
        },
        "subscriptionPricePoints-price-1": {
          type: "subscriptionPricePoints",
          id: "price-1",
          attributes: { customerPrice: "9.99" },
        },
      };
    });

    it("should return resource when found", () => {
      const result = getIncludedResource(
        includedById,
        "inAppPurchaseLocalizations",
        "loc-1"
      );

      expect(result).toEqual({
        type: "inAppPurchaseLocalizations",
        id: "loc-1",
        attributes: { name: "Test IAP", description: "Test description" },
      });
    });

    it("should return undefined when resource not found", () => {
      const result = getIncludedResource(
        includedById,
        "inAppPurchaseLocalizations",
        "non-existent"
      );

      expect(result).toBeUndefined();
    });

    it("should return undefined when type not found", () => {
      const result = getIncludedResource(
        includedById,
        "nonExistentType",
        "loc-1"
      );

      expect(result).toBeUndefined();
    });

    it("should return undefined for empty map", () => {
      const result = getIncludedResource(
        {},
        "inAppPurchaseLocalizations",
        "loc-1"
      );

      expect(result).toBeUndefined();
    });

    it("should handle different resource types", () => {
      const subscriptionResult = getIncludedResource(
        includedById,
        "subscriptions",
        "sub-1"
      );

      expect(subscriptionResult).toEqual({
        type: "subscriptions",
        id: "sub-1",
        attributes: {
          productId: "test.product",
          referenceName: "Test Product",
        },
      });

      const territoryResult = getIncludedResource(
        includedById,
        "territories",
        "USA"
      );

      expect(territoryResult).toEqual({
        type: "territories",
        id: "USA",
        attributes: { name: "United States" },
      });
    });

    it("should handle resources without attributes", () => {
      const includedWithoutAttributes = {
        "territories-USA": {
          type: "territories",
          id: "USA",
        },
      } as any;

      const result = getIncludedResource(
        includedWithoutAttributes,
        "territories",
        "USA"
      );

      expect(result).toEqual({
        type: "territories",
        id: "USA",
      });
    });

    it("should handle case sensitivity in type and ID", () => {
      const result = getIncludedResource(
        includedById,
        "InAppPurchaseLocalizations", // Different case
        "LOC-1" // Different case
      );

      expect(result).toBeUndefined();
    });

    it("should handle special characters in IDs", () => {
      const specialCharMap = {
        "subscriptions-sub-1-with-dashes": {
          type: "subscriptions",
          id: "sub-1-with-dashes",
          attributes: { productId: "test.product" },
        },
        "territories-USA_with_underscores": {
          type: "territories",
          id: "USA_with_underscores",
          attributes: { name: "United States" },
        },
      } as any;

      const result1 = getIncludedResource(
        specialCharMap,
        "subscriptions",
        "sub-1-with-dashes"
      );

      expect(result1).toEqual({
        type: "subscriptions",
        id: "sub-1-with-dashes",
        attributes: { productId: "test.product" },
      });

      const result2 = getIncludedResource(
        specialCharMap,
        "territories",
        "USA_with_underscores"
      );

      expect(result2).toEqual({
        type: "territories",
        id: "USA_with_underscores",
        attributes: { name: "United States" },
      });
    });

    it("should handle numeric IDs", () => {
      const numericMap = {
        "subscriptions-123": {
          type: "subscriptions",
          id: "123",
          attributes: { productId: "test.product" },
        },
      } as any;

      const result = getIncludedResource(numericMap, "subscriptions", "123");

      expect(result).toEqual({
        type: "subscriptions",
        id: "123",
        attributes: { productId: "test.product" },
      });
    });

    it("should handle empty string ID", () => {
      const emptyIdMap = {
        "territories-": {
          type: "territories",
          id: "",
          attributes: { name: "Empty Territory" },
        },
      } as any;

      const result = getIncludedResource(emptyIdMap, "territories", "");

      expect(result).toEqual({
        type: "territories",
        id: "",
        attributes: { name: "Empty Territory" },
      });
    });
  });

  describe("integration tests", () => {
    it("should work together for real-world scenario", () => {
      const included = [
        {
          type: "subscriptions",
          id: "sub-1",
          attributes: { productId: "weekly.sub", referenceName: "Weekly Plan" },
        },
        {
          type: "subscriptionLocalizations",
          id: "loc-1",
          attributes: {
            name: "Weekly Premium",
            description: "Weekly premium subscription",
          },
        },
        {
          type: "subscriptionPricePoints",
          id: "price-1",
          attributes: { customerPrice: "9.99" },
        },
        {
          type: "territories",
          id: "USA",
          attributes: { name: "United States" },
        },
      ] as any;

      const includedById = createIncludedByIdMap(included);

      // Test retrieving different types of resources
      const subscription = getIncludedResource(
        includedById,
        "subscriptions",
        "sub-1"
      );
      expect(subscription).toBeDefined();
      expect((subscription as any)?.attributes.productId).toBe("weekly.sub");

      const localization = getIncludedResource(
        includedById,
        "subscriptionLocalizations",
        "loc-1"
      );
      expect(localization).toBeDefined();
      expect((localization as any)?.attributes.name).toBe("Weekly Premium");

      const pricePoint = getIncludedResource(
        includedById,
        "subscriptionPricePoints",
        "price-1"
      );
      expect(pricePoint).toBeDefined();
      expect((pricePoint as any)?.attributes.customerPrice).toBe("9.99");

      const territory = getIncludedResource(includedById, "territories", "USA");
      expect(territory).toBeDefined();
      expect((territory as any)?.attributes.name).toBe("United States");

      // Test non-existent resource
      const nonExistent = getIncludedResource(
        includedById,
        "subscriptions",
        "non-existent"
      );
      expect(nonExistent).toBeUndefined();
    });
  });
});
