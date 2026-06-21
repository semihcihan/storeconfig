import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import * as fs from "fs";
import { exportAnalysisToCSV, exportAnalysis } from "./compare-price-service";
import type { PricingAnalysis } from "@semihcihan/shared";

// Mock dependencies
jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
}));

const mockFs = jest.mocked(fs);

describe("compare-price-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("exportAnalysisToCSV", () => {
    it("should export analysis to CSV with correct format", () => {
      const mockAnalysis: PricingAnalysis[] = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
            {
              territory: "GBR",
              localPrice: 0.79,
              localCurrency: "GBP",
              usdPrice: 0.9875,
              usdPercentage: 99.75,
            },
          ],
        },
      ];

      exportAnalysisToCSV(mockAnalysis, "test-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining(
          "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)"
        ),
        "utf8"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining("Test App,USA,0.99,USD,0.99,100"),
        "utf8"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining("Test App,GBR,0.79,GBP,0.99,100"),
        "utf8"
      );
    });

    it("should handle empty analysis", () => {
      exportAnalysisToCSV([], "empty-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "empty-output.csv",
        "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)",
        "utf8"
      );
    });
  });

  describe("exportAnalysis", () => {
    it("should export to CSV when .csv extension is provided", () => {
      const mockAnalysis: PricingAnalysis[] = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      exportAnalysis(mockAnalysis, "test-output.csv");

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-output.csv",
        expect.stringContaining(
          "Name,Territory,Local Price,Local Currency,USD Price,Relative to USA (%)"
        ),
        "utf8"
      );
    });

    it("should throw error for unsupported file format", () => {
      const mockAnalysis: PricingAnalysis[] = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      expect(() => exportAnalysis(mockAnalysis, "test-output.txt")).toThrow();
    });

    it("should throw error for no file extension", () => {
      const mockAnalysis: PricingAnalysis[] = [
        {
          item: {
            type: "app",
            id: "app-123",
            name: "Test App",
          },
          prices: [
            {
              territory: "USA",
              localPrice: 0.99,
              localCurrency: "USD",
              usdPrice: 0.99,
              usdPercentage: 100,
            },
          ],
        },
      ];

      expect(() => exportAnalysis(mockAnalysis, "test-output")).toThrow();
    });
  });
});
