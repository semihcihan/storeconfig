import { compareNumericValues } from "./numeric-helpers";

describe("Numeric Helpers", () => {
  describe("compareNumericValues", () => {
    it("should return true for equal numeric values with different decimal precision", () => {
      expect(compareNumericValues("0.0", "0.00")).toBe(true);
      expect(compareNumericValues("4.5", "4.50")).toBe(true);
      expect(compareNumericValues("10", "10.000")).toBe(true);
      expect(compareNumericValues("1.23", "1.230")).toBe(true);
      expect(compareNumericValues("0", "0.0")).toBe(true);
    });

    it("should return true for identical values", () => {
      expect(compareNumericValues("5.99", "5.99")).toBe(true);
      expect(compareNumericValues("0", "0")).toBe(true);
      expect(compareNumericValues("100.50", "100.50")).toBe(true);
    });

    it("should return false for different numeric values", () => {
      expect(compareNumericValues("5.99", "6.00")).toBe(false);
      expect(compareNumericValues("0", "1")).toBe(false);
      expect(compareNumericValues("10.5", "10.6")).toBe(false);
    });

    it("should handle null and undefined values", () => {
      expect(compareNumericValues(null, null)).toBe(true);
      expect(compareNumericValues(undefined, undefined)).toBe(true);
      expect(compareNumericValues(null, undefined)).toBe(true);
      expect(compareNumericValues("5.99", null)).toBe(false);
      expect(compareNumericValues("5.99", undefined)).toBe(false);
      expect(compareNumericValues(null, "5.99")).toBe(false);
      expect(compareNumericValues(undefined, "5.99")).toBe(false);
    });

    it("should return false for invalid numeric strings", () => {
      expect(compareNumericValues("invalid", "5.99")).toBe(false);
      expect(compareNumericValues("5.99", "invalid")).toBe(false);
      expect(compareNumericValues("invalid", "invalid")).toBe(false);
      expect(compareNumericValues("", "5.99")).toBe(false);
      expect(compareNumericValues("5.99", "")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(compareNumericValues("0.000", "0")).toBe(true);
      expect(compareNumericValues("1.0", "1")).toBe(true);
      expect(compareNumericValues("999.999", "999.9990")).toBe(true);
    });

    it("should handle negative numbers", () => {
      expect(compareNumericValues("-5.99", "-5.990")).toBe(true);
      expect(compareNumericValues("-0", "0")).toBe(true);
      expect(compareNumericValues("-1.5", "-1.50")).toBe(true);
    });
  });
});
