import {
  isValidProductId,
  areStringArraysEqual,
  arePriceArraysEqual,
  deepEqualUnordered,
} from "./validation-helpers";
import { describe, it, expect } from "@jest/globals";
import { z } from "zod";
import { TerritoryCodeSchema } from "../models/territories";

type TerritoryCode = z.infer<typeof TerritoryCodeSchema>;

describe("Validation Helpers", () => {
  describe("isValidProductId", () => {
    it("should return true for valid product IDs", () => {
      expect(isValidProductId("com.example.app")).toBe(true);
      expect(isValidProductId("com.example.app.feature")).toBe(true);
      expect(isValidProductId("com.example.app.feature.premium")).toBe(true);
    });

    it("should return false for invalid product IDs", () => {
      expect(isValidProductId("")).toBe(false);
      expect(isValidProductId("invalid-123")).toBe(false);
      expect(isValidProductId("com@example")).toBe(false);
      expect(isValidProductId("com#example")).toBe(false);
      expect(isValidProductId("com example")).toBe(false);
      expect(isValidProductId("com/example")).toBe(false);
    });
  });

  describe("areStringArraysEqual", () => {
    it("should return true for identical arrays", () => {
      expect(areStringArraysEqual(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
    });

    it("should return true for arrays with same elements in different order", () => {
      expect(areStringArraysEqual(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
      expect(
        areStringArraysEqual(["USA", "CAN", "GBR"], ["CAN", "GBR", "USA"])
      ).toBe(true);
    });

    it("should return false for arrays with different elements", () => {
      expect(areStringArraysEqual(["a", "b", "c"], ["a", "b", "d"])).toBe(
        false
      );
      expect(areStringArraysEqual(["USA", "CAN"], ["USA", "CAN", "GBR"])).toBe(
        false
      );
    });

    it("should return false for arrays with different lengths", () => {
      expect(areStringArraysEqual(["a", "b"], ["a", "b", "c"])).toBe(false);
      expect(areStringArraysEqual(["a", "b", "c"], ["a", "b"])).toBe(false);
    });

    it("should handle empty arrays", () => {
      expect(areStringArraysEqual([], [])).toBe(true);
      expect(areStringArraysEqual([], ["a"])).toBe(false);
      expect(areStringArraysEqual(["a"], [])).toBe(false);
    });

    it("should handle duplicate elements", () => {
      expect(areStringArraysEqual(["a", "a", "b"], ["a", "b", "a"])).toBe(true);
      expect(areStringArraysEqual(["a", "a", "b"], ["a", "b", "b"])).toBe(
        false
      );
    });
  });

  describe("arePriceArraysEqual", () => {
    it("should return true for identical price arrays", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      expect(arePriceArraysEqual(prices1, prices2)).toBe(true);
    });

    it("should return true for price arrays with same elements in different order", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
        { territory: "GBR" as TerritoryCode, price: "3.99" },
      ];
      const prices2 = [
        { territory: "CAN" as TerritoryCode, price: "2.99" },
        { territory: "GBR" as TerritoryCode, price: "3.99" },
        { territory: "USA" as TerritoryCode, price: "1.99" },
      ];
      expect(arePriceArraysEqual(prices1, prices2)).toBe(true);
    });

    it("should return false for price arrays with different prices", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "3.99" }, // Different price
      ];
      expect(arePriceArraysEqual(prices1, prices2)).toBe(false);
    });

    it("should return false for price arrays with different territories", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "GBR" as TerritoryCode, price: "2.99" }, // Different territory
      ];
      expect(arePriceArraysEqual(prices1, prices2)).toBe(false);
    });

    it("should return false for arrays with different lengths", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [{ territory: "USA" as TerritoryCode, price: "1.99" }];
      expect(arePriceArraysEqual(prices1, prices2)).toBe(false);
    });

    it("should handle empty arrays", () => {
      expect(arePriceArraysEqual([], [])).toBe(true);
      expect(
        arePriceArraysEqual(
          [],
          [{ territory: "USA" as TerritoryCode, price: "1.99" }]
        )
      ).toBe(false);
    });
  });

  describe("deepEqualUnordered", () => {
    it("should return true for identical primitive values", () => {
      expect(deepEqualUnordered("test", "test")).toBe(true);
      expect(deepEqualUnordered(123, 123)).toBe(true);
      expect(deepEqualUnordered(true, true)).toBe(true);
      expect(deepEqualUnordered(null, null)).toBe(true);
      expect(deepEqualUnordered(undefined, undefined)).toBe(true);
    });

    it("should return false for different primitive values", () => {
      expect(deepEqualUnordered("test", "other")).toBe(false);
      expect(deepEqualUnordered(123, 456)).toBe(false);
      expect(deepEqualUnordered(true, false)).toBe(false);
    });

    it("should return true for identical objects", () => {
      const obj1 = { a: 1, b: "test", c: true };
      const obj2 = { a: 1, b: "test", c: true };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should return true for objects with same properties in different order", () => {
      const obj1 = { a: 1, b: "test", c: true };
      const obj2 = { c: true, a: 1, b: "test" };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should return false for objects with different properties", () => {
      const obj1 = { a: 1, b: "test" };
      const obj2 = { a: 1, b: "other" };
      expect(deepEqualUnordered(obj1, obj2)).toBe(false);
    });

    it("should handle string arrays as unordered", () => {
      const obj1 = { territories: ["USA", "CAN", "GBR"] };
      const obj2 = { territories: ["CAN", "GBR", "USA"] };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should handle price arrays as unordered", () => {
      const obj1 = {
        prices: [
          { territory: "USA", price: "1.99" },
          { territory: "CAN", price: "2.99" },
        ],
      };
      const obj2 = {
        prices: [
          { territory: "CAN", price: "2.99" },
          { territory: "USA", price: "1.99" },
        ],
      };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should handle nested objects with unordered arrays", () => {
      const obj1 = {
        offer: {
          type: "FREE_TRIAL",
          duration: "THREE_DAYS",
          availableTerritories: ["USA", "CAN", "GBR"],
        },
      };
      const obj2 = {
        offer: {
          type: "FREE_TRIAL",
          duration: "THREE_DAYS",
          availableTerritories: ["CAN", "GBR", "USA"],
        },
      };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should return false for objects with different array content", () => {
      const obj1 = { territories: ["USA", "CAN"] };
      const obj2 = { territories: ["USA", "CAN", "GBR"] };
      expect(deepEqualUnordered(obj1, obj2)).toBe(false);
    });

    it("should handle regular arrays (not unordered)", () => {
      const obj1 = { items: ["a", "b", "c"] };
      const obj2 = { items: ["c", "a", "b"] };
      expect(deepEqualUnordered(obj1, obj2)).toBe(false); // Regular arrays maintain order
    });

    it("should handle null and undefined", () => {
      expect(deepEqualUnordered(null, null)).toBe(true);
      expect(deepEqualUnordered(undefined, undefined)).toBe(true);
      expect(deepEqualUnordered(null, undefined)).toBe(false);
      expect(deepEqualUnordered(null, {})).toBe(false);
    });
  });
});
