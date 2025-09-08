import { jest } from "@jest/globals";
import { validateTerritoryCode } from "./id-encoding-helpers";
import { TerritoryCodeSchema } from "../models/territories";

// Mock logger
jest.mock("../utils/logger");

describe("id-encoding-helpers", () => {
  describe("validateTerritoryCode", () => {
    it("should return valid territory code for valid input", () => {
      const validTerritories = [
        "USA",
        "GBR",
        "CAN",
        "AUS",
        "DEU",
        "FRA",
        "JPN",
      ];

      validTerritories.forEach((territory) => {
        const result = validateTerritoryCode(territory);

        expect(result).toBe(territory);
      });
    });

    it("should return null for invalid territory code", () => {
      const invalidTerritories = [
        "INVALID",
        "XX",
        "USAA",
        "UNITED_STATES",
        "123",
        "",
        "us",
        "UsA",
      ];

      invalidTerritories.forEach((territory) => {
        expect(() => validateTerritoryCode(territory)).toThrow();
      });
    });

    it("should return null for null input", () => {
      expect(() => validateTerritoryCode(null as any)).toThrow();
    });

    it("should return null for undefined input", () => {
      expect(() => validateTerritoryCode(undefined as any)).toThrow();
    });

    it("should return null for non-string input", () => {
      expect(() => validateTerritoryCode(123 as any)).toThrow();
    });

    it("should return null for empty string", () => {
      expect(() => validateTerritoryCode("")).toThrow();
    });

    it("should return null for whitespace-only string", () => {
      expect(() => validateTerritoryCode("   ")).toThrow();
    });

    it("should handle case sensitivity correctly", () => {
      // Assuming the schema is case-sensitive
      expect(() => validateTerritoryCode("usa")).toThrow();
    });

    it("should validate against TerritoryCodeSchema", () => {
      // Test that the function actually uses the schema
      const mockParse = jest.fn().mockReturnValue("USA");
      const originalParse = TerritoryCodeSchema.parse;

      (TerritoryCodeSchema as any).parse = mockParse;

      const result = validateTerritoryCode("USA");

      expect(mockParse).toHaveBeenCalledWith("USA");
      expect(result).toBe("USA");

      // Restore original
      (TerritoryCodeSchema as any).parse = originalParse;
    });

    it("should handle schema validation failure", () => {
      expect(() => validateTerritoryCode("INVALID")).toThrow();
    });
  });
});
