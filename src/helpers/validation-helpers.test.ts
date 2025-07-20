import { isValidProductId } from "./validation-helpers";
import { describe, it, expect } from "@jest/globals";

describe("Validation Helpers", () => {
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
});
