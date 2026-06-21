import {
  isValidProductId,
  deepEqualUnordered,
  addUniqueLocaleIssues,
  addUniqueTerritoryIssues,
} from "./validation-helpers";
import { z } from "zod";
import { TerritoryCodeSchema } from "../models/territories";
import { describe, it, expect } from "@jest/globals";

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

  describe("deepEqualUnordered with string arrays", () => {
    it("should return true for identical arrays", () => {
      expect(deepEqualUnordered(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
    });

    it("should return true for arrays with same elements in different order", () => {
      expect(deepEqualUnordered(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
      expect(
        deepEqualUnordered(["USA", "CAN", "GBR"], ["CAN", "GBR", "USA"])
      ).toBe(true);
    });

    it("should return false for arrays with different elements", () => {
      expect(deepEqualUnordered(["a", "b", "c"], ["a", "b", "d"])).toBe(false);
      expect(deepEqualUnordered(["USA", "CAN"], ["USA", "CAN", "GBR"])).toBe(
        false
      );
    });

    it("should return false for arrays with different lengths", () => {
      expect(deepEqualUnordered(["a", "b"], ["a", "b", "c"])).toBe(false);
      expect(deepEqualUnordered(["a", "b", "c"], ["a", "b"])).toBe(false);
    });

    it("should handle empty arrays", () => {
      expect(deepEqualUnordered([], [])).toBe(true);
      expect(deepEqualUnordered([], ["a"])).toBe(false);
      expect(deepEqualUnordered(["a"], [])).toBe(false);
    });

    it("should handle duplicate elements", () => {
      expect(deepEqualUnordered(["a", "a", "b"], ["a", "b", "a"])).toBe(true);
      expect(deepEqualUnordered(["a", "a", "b"], ["a", "b", "b"])).toBe(false);
    });
  });

  describe("deepEqualUnordered with price arrays", () => {
    it("should return true for identical price arrays", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      expect(deepEqualUnordered(prices1, prices2)).toBe(true);
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
      expect(deepEqualUnordered(prices1, prices2)).toBe(true);
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
      expect(deepEqualUnordered(prices1, prices2)).toBe(false);
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
      expect(deepEqualUnordered(prices1, prices2)).toBe(false);
    });

    it("should return false for arrays with different lengths", () => {
      const prices1 = [
        { territory: "USA" as TerritoryCode, price: "1.99" },
        { territory: "CAN" as TerritoryCode, price: "2.99" },
      ];
      const prices2 = [{ territory: "USA" as TerritoryCode, price: "1.99" }];
      expect(deepEqualUnordered(prices1, prices2)).toBe(false);
    });

    it("should handle empty arrays", () => {
      expect(deepEqualUnordered([], [])).toBe(true);
      expect(
        deepEqualUnordered(
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
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should handle null and undefined", () => {
      expect(deepEqualUnordered(null, null)).toBe(true);
      expect(deepEqualUnordered(undefined, undefined)).toBe(true);
      expect(deepEqualUnordered(null, undefined)).toBe(false);
      expect(deepEqualUnordered(null, {})).toBe(false);
    });

    it("should fail when territory codes are not in hardcoded list", () => {
      const obj1 = { territories: ["ITA", "ESP", "NLD"] };
      const obj2 = { territories: ["NLD", "ITA", "ESP"] };

      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should fail when territory codes are completely different from hardcoded list", () => {
      const obj1 = { territories: ["BRA", "MEX", "ARG"] };
      const obj2 = { territories: ["ARG", "BRA", "MEX"] };

      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });

    it("should fail when territory codes are mixed with hardcoded and non-hardcoded", () => {
      const obj1 = { territories: ["USA", "ITA", "ESP"] };
      const obj2 = { territories: ["ITA", "USA", "ESP"] };

      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
    });
  });

  describe("addUniqueLocaleIssues", () => {
    function makeCtx(): { issues: z.ZodIssue[]; ctx: z.RefinementCtx } {
      const issues: z.ZodIssue[] = [];
      const ctx = {
        addIssue: (arg: unknown) => issues.push(arg as z.ZodIssue),
      } as unknown as z.RefinementCtx;
      return { issues, ctx };
    }

    it("should not add issues when items is undefined", () => {
      const { issues, ctx } = makeCtx();
      addUniqueLocaleIssues(undefined, ["localizations"], ctx);
      expect(issues).toHaveLength(0);
    });

    it("should not add issues when items is empty", () => {
      const { issues, ctx } = makeCtx();
      addUniqueLocaleIssues([], ["localizations"], ctx);
      expect(issues).toHaveLength(0);
    });

    it("should not add issues when all locales are unique", () => {
      const { issues, ctx } = makeCtx();
      addUniqueLocaleIssues(
        [
          { locale: "en-US" },
          { locale: "fr-FR" },
          { locale: "de-DE" },
        ],
        ["localizations"],
        ctx
      );
      expect(issues).toHaveLength(0);
    });

    it("should add one issue per duplicate locale with indices", () => {
      const { issues, ctx } = makeCtx();
      addUniqueLocaleIssues(
        [
          { locale: "en-US" },
          { locale: "fr-FR" },
          { locale: "en-US" },
        ],
        ["localizations"],
        ctx
      );
      expect(issues).toHaveLength(1);
      expect(issues[0].code).toBe("custom");
      expect(issues[0].path).toEqual(["localizations"]);
      expect(issues[0].message).toContain("Duplicate locale 'en-US'");
      expect(issues[0].message).toContain("at indices 0, 2");
      expect(issues[0].message).toContain(
        "Only one entry per locale is allowed"
      );
    });

    it("should add issues for multiple duplicate locales", () => {
      const { issues, ctx } = makeCtx();
      addUniqueLocaleIssues(
        [
          { locale: "en-US" },
          { locale: "en-US" },
          { locale: "fr-FR" },
          { locale: "fr-FR" },
        ],
        ["localizations"],
        ctx
      );
      expect(issues).toHaveLength(2);
      const messages = issues.map((i) => i.message);
      expect(
        messages.some((m) => typeof m === "string" && m.includes("en-US"))
      ).toBe(true);
      expect(
        messages.some((m) => typeof m === "string" && m.includes("fr-FR"))
      ).toBe(true);
    });
  });

  describe("addUniqueTerritoryIssues", () => {
    function makeCtx(): { issues: z.ZodIssue[]; ctx: z.RefinementCtx } {
      const issues: z.ZodIssue[] = [];
      const ctx = {
        addIssue: (arg: unknown) => issues.push(arg as z.ZodIssue),
      } as unknown as z.RefinementCtx;
      return { issues, ctx };
    }

    it("should not add issues when items is undefined", () => {
      const { issues, ctx } = makeCtx();
      addUniqueTerritoryIssues(undefined, ["prices"], ctx);
      expect(issues).toHaveLength(0);
    });

    it("should not add issues when items is empty", () => {
      const { issues, ctx } = makeCtx();
      addUniqueTerritoryIssues([], ["prices"], ctx);
      expect(issues).toHaveLength(0);
    });

    it("should not add issues when all territories are unique", () => {
      const { issues, ctx } = makeCtx();
      addUniqueTerritoryIssues(
        [{ territory: "USA" }, { territory: "CAN" }, { territory: "GBR" }],
        ["prices"],
        ctx
      );
      expect(issues).toHaveLength(0);
    });

    it("should add one issue per duplicate territory with indices", () => {
      const { issues, ctx } = makeCtx();
      addUniqueTerritoryIssues(
        [
          { territory: "USA" },
          { territory: "CAN" },
          { territory: "USA" },
        ],
        ["prices"],
        ctx
      );
      expect(issues).toHaveLength(1);
      expect(issues[0].code).toBe("custom");
      expect(issues[0].path).toEqual(["prices"]);
      expect(issues[0].message).toContain("Duplicate territory 'USA'");
      expect(issues[0].message).toContain("at indices 0, 2");
      expect(issues[0].message).toContain(
        "Only one entry per territory is allowed"
      );
    });

    it("should add issues for multiple duplicate territories", () => {
      const { issues, ctx } = makeCtx();
      addUniqueTerritoryIssues(
        [
          { territory: "USA" },
          { territory: "USA" },
          { territory: "CAN" },
          { territory: "CAN" },
        ],
        ["prices"],
        ctx
      );
      expect(issues).toHaveLength(2);
      const messages = issues.map((i) => i.message);
      expect(
        messages.some((m) => typeof m === "string" && m.includes("USA"))
      ).toBe(true);
      expect(
        messages.some((m) => typeof m === "string" && m.includes("CAN"))
      ).toBe(true);
    });
  });
});
