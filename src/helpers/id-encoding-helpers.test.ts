import { jest } from "@jest/globals";
import {
  decodeTerritoryAvailabilityId,
  validateTerritoryCode,
} from "./id-encoding-helpers";
import { TerritoryCodeSchema } from "../models/territories";

// Mock logger
jest.mock("../utils/logger");

describe("id-encoding-helpers", () => {
  describe("decodeTerritoryAvailabilityId", () => {
    it("should decode valid territory availability ID", () => {
      const territoryData = { t: "USA" };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: "USA" });
    });

    it("should return null for malformed JSON", () => {
      const malformedJson = Buffer.from("invalid json").toString("base64");

      expect(() => decodeTerritoryAvailabilityId(malformedJson)).toThrow();
    });

    it("should return null for invalid base64", () => {
      const invalidBase64 = "invalid-base64-string";

      expect(() => decodeTerritoryAvailabilityId(invalidBase64)).toThrow();
    });

    it("should return object with undefined territory code for JSON without territory field", () => {
      const data = { other: "field" };
      const encodedId = Buffer.from(JSON.stringify(data)).toString("base64");

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: undefined });
    });

    it("should handle various territory codes", () => {
      const territories = ["USA", "GBR", "CAN", "AUS", "DEU", "FRA", "JPN"];

      territories.forEach((territory) => {
        const territoryData = { t: territory };
        const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
          "base64"
        );

        const result = decodeTerritoryAvailabilityId(encodedId);

        expect(result).toEqual({ territoryCode: territory });
      });
    });

    it("should handle empty territory code", () => {
      const territoryData = { t: "" };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: "" });
    });

    it("should handle null territory code", () => {
      const territoryData = { t: null };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: null });
    });

    it("should handle undefined territory code", () => {
      const territoryData = { t: undefined };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: undefined });
    });

    it("should handle complex JSON structure", () => {
      const territoryData = {
        t: "USA",
        other: "data",
        nested: { field: "value" },
      };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: "USA" });
    });

    it("should handle non-string territory codes", () => {
      const territoryData = { t: 123 };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toEqual({ territoryCode: 123 });
    });
  });

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
