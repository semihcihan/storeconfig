import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import {
  logger,
  readJsonFile,
  removeShortcuts,
  validateAppStoreModel,
  validateFileExists,
} from "@semihcihan/shared";

jest.mock("@semihcihan/shared", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
  DEFAULT_CONFIG_FILENAME: "storeconfig.json",
  validateFileExists: jest.fn(),
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
}));

const mockStoreConfigEngine = {
  comparePricing: jest.fn(),
};

jest.mock("../services/storeconfig-engine", () => ({
  storeConfigEngine: mockStoreConfigEngine,
}));

const mockExportAnalysis = jest.fn();
jest.mock("../services/compare-price-service", () => ({
  exportAnalysis: mockExportAnalysis,
}));

const mockLogger = jest.mocked(logger);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);

import comparePriceCommand from "./compare-price";

describe("compare-price command", () => {
  const mockArgv = {
    file: "test-input.json",
    output: "test-output.csv",
    _: [],
    $0: "test",
  } as any;

  const mockAppStoreData = {
    schemaVersion: "1.0.0",
    appId: "app-123",
    pricing: {
      baseTerritory: "USA",
      prices: [{ territory: "USA", price: "0.99" }],
    },
  };

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
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockValidateFileExists.mockReturnValue("test-input.json");
    mockReadJsonFile.mockReturnValue(mockAppStoreData);
    mockRemoveShortcuts.mockReturnValue(mockAppStoreData);
    mockValidateAppStoreModel.mockReturnValue(mockAppStoreData as any);
    mockStoreConfigEngine.comparePricing.mockResolvedValue(mockAnalysis as never);
    mockExportAnalysis.mockReturnValue(undefined);
  });

  it("has the expected command configuration", () => {
    expect(comparePriceCommand.command).toBe("compare-price");
    expect(comparePriceCommand.describe).toBe(
      "Compare prices across territories in USD"
    );

    const builder = comparePriceCommand.builder as any;
    expect(builder.file.alias).toBe("f");
    expect(builder.output.alias).toBe("o");
  });

  it("validates, compares through the local engine, and exports analysis", async () => {
    await comparePriceCommand.handler(mockArgv);

    expect(mockValidateFileExists).toHaveBeenCalledWith("test-input.json", {
      fileDescription: "input JSON file with app store data",
    });
    expect(mockReadJsonFile).toHaveBeenCalledWith("test-input.json");
    expect(mockRemoveShortcuts).toHaveBeenCalledWith(mockAppStoreData);
    expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
      mockAppStoreData,
      false
    );
    expect(mockStoreConfigEngine.comparePricing).toHaveBeenCalledWith(
      mockAppStoreData
    );
    expect(mockExportAnalysis).toHaveBeenCalledWith(
      mockAnalysis,
      "test-output.csv"
    );
  });

  it("uses the default output filename", async () => {
    await comparePriceCommand.handler({
      file: "test-input.json",
      _: [],
      $0: "test",
    } as any);

    expect(mockExportAnalysis).toHaveBeenCalledWith(
      mockAnalysis,
      "compare-price.csv"
    );
  });

  it("propagates local engine errors", async () => {
    mockStoreConfigEngine.comparePricing.mockRejectedValueOnce(
      new Error("Compare failed") as never
    );

    await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
      "Compare failed"
    );
  });

  it("propagates export errors", async () => {
    mockExportAnalysis.mockImplementation(() => {
      throw new Error("Export failed");
    });

    await expect(comparePriceCommand.handler(mockArgv)).rejects.toThrow(
      "Export failed"
    );
  });
});
