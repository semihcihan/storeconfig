import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import * as fs from "fs";
import axios from "axios";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("@semihcihan/shared", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));
jest.mock("fs");
jest.mock("axios");

// Mock the entire compare-price-service module
const mockAnalyzePricing = jest.fn();
const mockExportAnalysis = jest.fn();
jest.mock("../services/compare-price-service", () => ({
  analyzePricing: mockAnalyzePricing,
  exportAnalysis: mockExportAnalysis,
}));

const mockLogger = jest.mocked(logger);
const mockFs = jest.mocked(fs);
const mockAxios = jest.mocked(axios);

// Import the command after mocking
import comparePriceCommand from "./compare-price";

describe("compare-price command", () => {
  const mockArgv = {
    input: "test-input.json",
    output: "test-output.json",
    _: [],
    $0: "test",
  } as any;

  const mockAppStoreData = {
    schemaVersion: "1.0.0",
    appId: "app-123",
    pricing: {
      baseTerritory: "USA" as const,
      prices: [
        { territory: "USA" as const, price: "0.99" },
        { territory: "GBR" as const, price: "0.79" },
      ],
    },
  };

  const mockCurrenciesData = [
    { id: "USA", currency: "USD", usdRate: 1.0 },
    { id: "GBR", currency: "GBP", usdRate: 0.8 },
  ];

  const mockAnalysis = [
    {
      item: {
        type: "app",
        id: "app-123",
        name: "App (ID: app-123)",
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
          usdPrice: 0.99,
          usdPercentage: 100,
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.error.mockReturnValue(undefined);
    mockLogger.info.mockReturnValue(undefined);
    mockExportAnalysis.mockReturnValue(undefined);
    mockFs.readFileSync.mockReturnValue("" as any);
    mockFs.writeFileSync.mockReturnValue(undefined as any);
    mockFs.existsSync.mockReturnValue(true);

    // Mock axios response
    mockAxios.post.mockResolvedValue({
      data: {
        success: true,
        data: mockAnalysis,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(comparePriceCommand.command).toBe("compare-price");
    });

    it("should have correct description", () => {
      expect(comparePriceCommand.describe).toBe(
        "Compare prices across territories in USD"
      );
    });

    it("should have builder defined", () => {
      expect(comparePriceCommand.builder).toBeDefined();
    });

    it("should have input parameter with correct configuration", () => {
      const builder = comparePriceCommand.builder as any;
      expect(builder.input).toBeDefined();
      expect(builder.input.alias).toBe("i");
      expect(builder.input.demandOption).toBe(true);
      expect(builder.input.type).toBe("string");
    });

    it("should have output parameter with correct configuration", () => {
      const builder = comparePriceCommand.builder as any;
      expect(builder.output).toBeDefined();
      expect(builder.output.alias).toBe("o");
      expect(builder.output.demandOption).toBe(true);
      expect(builder.output.type).toBe("string");
    });
  });

  describe("handler", () => {
    it("should read input file and call API successfully", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));

      await comparePriceCommand.handler(mockArgv);

      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockArgv.input, "utf8");
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/compare-price",
        { appStoreData: mockAppStoreData }
      );
    });

    it("should call API with correct parameters", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));

      await comparePriceCommand.handler(mockArgv);

      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/compare-price",
        { appStoreData: mockAppStoreData }
      );
    });

    it("should write analysis to output file", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));

      await comparePriceCommand.handler(mockArgv);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "test-output.json"
      );
    });

    it("should handle input file read error", async () => {
      const error = new Error("File not found");
      mockFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        error
      );
    });

    it("should handle API error", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));
      mockAxios.post.mockRejectedValueOnce(new Error("API failed"));

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle invalid JSON in input file", async () => {
      mockFs.readFileSync.mockReturnValue("invalid json" as any);

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle API response error", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: false,
          error: "API error",
        },
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle export error", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));
      mockExportAnalysis.mockImplementation(() => {
        throw new Error("Export failed");
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle write file error", async () => {
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAppStoreData));
      mockExportAnalysis.mockImplementation(() => {
        throw new Error("Export failed");
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });
  });
});
