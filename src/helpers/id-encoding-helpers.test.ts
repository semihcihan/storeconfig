import { jest } from "@jest/globals";
import {
  decodeTerritoryFromId,
  decodeTerritoryAvailabilityId,
  validateTerritoryCode,
} from "./id-encoding-helpers";
import { TerritoryCodeSchema } from "../models/territories";

// Mock logger
jest.mock("../utils/logger");

describe("id-encoding-helpers", () => {
  describe("decodeTerritoryFromId", () => {
    it("should decode valid territory ID", () => {
      const territoryData = { t: "USA" };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBe("USA");
    });

    it("should return null for invalid territory code", () => {
      const territoryData = { t: "INVALID_TERRITORY" };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
    });

    it("should return null for malformed JSON", () => {
      const invalidJson = "invalid json";
      const encodedId = Buffer.from(invalidJson).toString("base64");

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
    });

    it("should return null for invalid base64", () => {
      const result = decodeTerritoryFromId("invalid-base64");

      expect(result).toBeNull();
    });

    it("should return null for JSON without territory field", () => {
      const data = { other: "field" };
      const encodedId = Buffer.from(JSON.stringify(data)).toString("base64");

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
    });

    it("should handle various valid territory codes", () => {
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
        const territoryData = { t: territory };
        const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
          "base64"
        );

        const result = decodeTerritoryFromId(encodedId);

        expect(result).toBe(territory);
      });
    });

    it("should return null for empty territory code", () => {
      const territoryData = { t: "" };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
    });

    it("should return null for null territory code", () => {
      const territoryData = { t: null };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
    });

    it("should return null for undefined territory code", () => {
      const territoryData = { t: undefined };
      const encodedId = Buffer.from(JSON.stringify(territoryData)).toString(
        "base64"
      );

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBeNull();
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

      const result = decodeTerritoryFromId(encodedId);

      expect(result).toBe("USA");
    });
  });

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
      const invalidJson = "invalid json";
      const encodedId = Buffer.from(invalidJson).toString("base64");

      const result = decodeTerritoryAvailabilityId(encodedId);

      expect(result).toBeNull();
    });

    it("should return null for invalid base64", () => {
      const result = decodeTerritoryAvailabilityId("invalid-base64");

      expect(result).toBeNull();
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
        const result = validateTerritoryCode(territory);

        expect(result).toBeNull();
      });
    });

    it("should return null for null input", () => {
      const result = validateTerritoryCode(null as any);

      expect(result).toBeNull();
    });

    it("should return null for undefined input", () => {
      const result = validateTerritoryCode(undefined as any);

      expect(result).toBeNull();
    });

    it("should return null for non-string input", () => {
      const result = validateTerritoryCode(123 as any);

      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      const result = validateTerritoryCode("");

      expect(result).toBeNull();
    });

    it("should return null for whitespace-only string", () => {
      const result = validateTerritoryCode("   ");

      expect(result).toBeNull();
    });

    it("should handle case sensitivity correctly", () => {
      // Assuming the schema is case-sensitive
      const result = validateTerritoryCode("usa");

      expect(result).toBeNull();
    });

    it("should validate against TerritoryCodeSchema", () => {
      // Test that the function actually uses the schema
      const mockSafeParse = jest
        .fn()
        .mockReturnValue({ success: true, data: "USA" as any });
      const originalSafeParse = TerritoryCodeSchema.safeParse;

      (TerritoryCodeSchema as any).safeParse = mockSafeParse;

      const result = validateTerritoryCode("USA");

      expect(mockSafeParse).toHaveBeenCalledWith("USA");
      expect(result).toBe("USA");

      // Restore original
      (TerritoryCodeSchema as any).safeParse = originalSafeParse;
    });

    it("should handle schema validation failure", () => {
      const mockSafeParse = jest.fn().mockReturnValue({ success: false });
      const originalSafeParse = TerritoryCodeSchema.safeParse;

      (TerritoryCodeSchema as any).safeParse = mockSafeParse;

      const result = validateTerritoryCode("INVALID");

      expect(mockSafeParse).toHaveBeenCalledWith("INVALID");
      expect(result).toBeNull();

      // Restore original
      (TerritoryCodeSchema as any).safeParse = originalSafeParse;
    });
  });
});
