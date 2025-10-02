import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import {
  logger,
  validateFileExists,
  readJsonFile,
  validateAppStoreModel,
  removeShortcuts,
} from "@semihcihan/shared";
import * as fs from "fs";

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
  validateFileExists: jest.fn(),
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
}));
jest.mock("fs");
jest.mock("../services/api-client", () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  isAuthenticated: jest.fn(),
  requireAuth: jest.fn(),
}));

// Mock the entire compare-price-service module
const mockAnalyzePricing = jest.fn();
const mockExportAnalysis = jest.fn();
jest.mock("../services/compare-price-service", () => ({
  analyzePricing: mockAnalyzePricing,
  exportAnalysis: mockExportAnalysis,
}));

const mockLogger = jest.mocked(logger);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockFs = jest.mocked(fs);

// Import the mocked apiClient
import { apiClient } from "../services/api-client";
const mockApiClient = jest.mocked(apiClient);

// Import the command after mocking
import comparePriceCommand from "./compare-price";

describe("compare-price command", () => {
  const mockArgv = {
    file: "test-input.json",
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
    mockValidateFileExists.mockReturnValue("test-input.json");
    mockReadJsonFile.mockReturnValue(mockAppStoreData);
    mockValidateAppStoreModel.mockReturnValue(mockAppStoreData);
    mockRemoveShortcuts.mockReturnValue(mockAppStoreData);
    mockFs.readFileSync.mockReturnValue("" as any);
    mockFs.writeFileSync.mockReturnValue(undefined as any);
    mockFs.existsSync.mockReturnValue(true);

    // Mock axios response
    mockApiClient.post.mockResolvedValue({
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

    it("should have file parameter with correct configuration", () => {
      const builder = comparePriceCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(false);
      expect(builder.file.type).toBe("string");
    });

    it("should have output parameter with correct configuration", () => {
      const builder = comparePriceCommand.builder as any;
      expect(builder.output).toBeDefined();
      expect(builder.output.alias).toBe("o");
      expect(builder.output.demandOption).toBe(false);
      expect(builder.output.type).toBe("string");
    });
  });

  describe("handler", () => {
    it("should validate file exists before processing", async () => {
      await comparePriceCommand.handler(mockArgv);

      expect(mockValidateFileExists).toHaveBeenCalledWith("test-input.json", {
        fileDescription: "input JSON file with app store data",
      });
    });

    it("should read input file and call API successfully", async () => {
      await comparePriceCommand.handler(mockArgv);

      expect(mockReadJsonFile).toHaveBeenCalledWith("test-input.json");
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockAppStoreData,
        false
      );
      expect(mockApiClient.post).toHaveBeenCalledWith("/api/v1/compare-price", {
        appStoreData: mockAppStoreData,
      });
    });

    it("should call API with correct parameters", async () => {
      await comparePriceCommand.handler(mockArgv);

      expect(mockApiClient.post).toHaveBeenCalledWith("/api/v1/compare-price", {
        appStoreData: mockAppStoreData,
      });
    });

    it("should write analysis to output file", async () => {
      await comparePriceCommand.handler(mockArgv);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "test-output.json"
      );
    });

    it("should use default output filename when output parameter is not provided", async () => {
      const argvWithoutOutput = {
        file: "test-input.json",
        _: [],
        $0: "test",
      } as any;

      await comparePriceCommand.handler(argvWithoutOutput);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "compare-price.csv"
      );
    });

    it("should use default output filename when output parameter is undefined", async () => {
      const argvWithUndefinedOutput = {
        file: "test-input.json",
        output: undefined,
        _: [],
        $0: "test",
      } as any;

      await comparePriceCommand.handler(argvWithUndefinedOutput);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "compare-price.csv"
      );
    });

    it("should use default output filename when output parameter is empty string", async () => {
      const argvWithEmptyOutput = {
        file: "test-input.json",
        output: "",
        _: [],
        $0: "test",
      } as any;

      await comparePriceCommand.handler(argvWithEmptyOutput);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "compare-price.csv"
      );
    });

    it("should use default output filename when output parameter is null", async () => {
      const argvWithNullOutput = {
        file: "test-input.json",
        output: null,
        _: [],
        $0: "test",
      } as any;

      await comparePriceCommand.handler(argvWithNullOutput);

      expect(mockExportAnalysis).toHaveBeenCalledWith(
        mockAnalysis,
        "compare-price.csv"
      );
    });

    it("should handle input file read error", async () => {
      mockValidateFileExists.mockImplementation(() => {
        throw new Error("process.exit called");
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );
    });

    it("should handle API error", async () => {
      mockApiClient.post.mockRejectedValueOnce(new Error("API failed"));

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle invalid JSON in input file", async () => {
      mockValidateAppStoreModel.mockImplementation(() => {
        throw new Error("Invalid JSON");
      });

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle API response error", async () => {
      mockApiClient.post.mockRejectedValueOnce(new Error("API error"));

      await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Price comparison failed",
        expect.any(Error)
      );
    });

    it("should handle export error", async () => {
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
