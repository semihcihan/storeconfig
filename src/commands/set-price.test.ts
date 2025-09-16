import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger, validateFileExists } from "@semihcihan/shared";
import { readJsonFile } from "@semihcihan/shared";
import {
  validateAppStoreModel,
  removeShortcuts,
  useShortcuts,
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
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
  useShortcuts: jest.fn(),
  validateFileExists: jest.fn(),
}));
jest.mock("../services/set-price-service", () => ({
  startInteractivePricing: jest.fn(),
}));
jest.mock("axios");
jest.mock("fs");

const mockLogger = jest.mocked(logger);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockFs = jest.mocked(fs);

// Import the command after mocking
import setPriceCommand from "./set-price";
import { startInteractivePricing } from "../services/set-price-service";
import axios from "axios";

const mockStartInteractivePricing = jest.mocked(startInteractivePricing);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockUseShortcuts = jest.mocked(useShortcuts);
const mockAxios = jest.mocked(axios);

describe("set-price command", () => {
  const mockArgv = {
    file: "test-file.json",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockValidateFileExists.mockReturnValue("test-file.json");
    mockStartInteractivePricing.mockResolvedValue({
      appId: "app-1",
      selectedItem: {
        type: "app",
        id: "",
        name: "",
      },
      basePricePoint: { id: "price-1", price: "0.00" },
      pricingStrategy: "apple",
    });
    mockRemoveShortcuts.mockReturnValue({} as any);
    mockUseShortcuts.mockReturnValue({} as any);
    mockFs.writeFileSync.mockReturnValue(undefined as any);
  });

  afterEach(() => {
    // Only clear some mocks, not axios
    mockLogger.info.mockClear();
    mockLogger.error.mockClear();
    mockLogger.warn.mockClear();
    mockLogger.debug.mockClear();
    mockReadJsonFile.mockClear();
    mockValidateAppStoreModel.mockClear();
    mockRemoveShortcuts.mockClear();
    mockUseShortcuts.mockClear();
    mockStartInteractivePricing.mockClear();
    mockFs.writeFileSync.mockClear();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(setPriceCommand.command).toBe("set-price");
    });

    it("should have correct description", () => {
      expect(setPriceCommand.describe).toBe(
        "Set prices for apps, in-app purchases, and subscriptions using interactive prompts"
      );
    });

    it("should have builder defined", () => {
      expect(setPriceCommand.builder).toBeDefined();
    });

    it("should have file parameter with correct configuration", () => {
      const builder = setPriceCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(false);
      expect(builder.file.type).toBe("string");
    });
  });

  describe("command execution", () => {
    it("should execute successfully with valid input", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;
      const mockDataWithoutShortcuts = {
        inAppPurchases: [{ id: "test" }],
      } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockDataWithoutShortcuts);
      mockValidateAppStoreModel.mockReturnValue(mockDataWithoutShortcuts);

      // Mock axios response - only apply pricing is called
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            updatedState: {},
          },
        },
      });

      await setPriceCommand.handler!(mockArgv as any);

      expect(mockReadJsonFile).toHaveBeenCalledWith("test-file.json");
      expect(mockRemoveShortcuts).toHaveBeenCalledWith(mockData);
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockDataWithoutShortcuts,
        false,
        "apply"
      );
      expect(mockStartInteractivePricing).toHaveBeenCalledWith({
        appStoreState: mockDataWithoutShortcuts,
        fetchTerritoryPricePointsForSelectedItem: expect.any(Function),
      });
      expect(mockAxios.post).toHaveBeenCalled(); // API call for apply pricing
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it("should handle file read errors and exit", async () => {
      mockReadJsonFile.mockImplementation(() => {
        throw new Error("File not found");
      });

      await expect(setPriceCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Set-price failed",
        expect.any(Error)
      );
    });
  });

  describe("logging", () => {
    it("should log when starting the command", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);

      // Mock axios response - only apply pricing is called
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            updatedState: {},
          },
        },
      });

      await setPriceCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Setting prices using file: test-file.json"
      );
    });
  });

  describe("shortcut handling", () => {
    it("should remove shortcuts at start and apply them back at end", async () => {
      const mockDataWithShortcuts = {
        inAppPurchases: [{ id: "test" }],
        availableTerritories: "worldwide",
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "tr-TR" }, // Shortcut: only locale, other fields inherited
        ],
      } as any;

      const mockDataWithoutShortcuts = {
        inAppPurchases: [{ id: "test" }],
        availableTerritories: ["US", "TR", "GB"], // Expanded from "worldwide"
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "tr-TR", name: "Test App" }, // Deoptimized: full data
        ],
      } as any;

      const mockUpdatedState = {
        inAppPurchases: [{ id: "test", price: "0.99" }],
        availableTerritories: ["US", "TR", "GB"],
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "tr-TR", name: "Test App" },
        ],
      } as any;

      const mockFinalStateWithShortcuts = {
        inAppPurchases: [{ id: "test", price: "0.99" }],
        availableTerritories: "worldwide", // Converted back to shortcut
        localizations: [
          { locale: "en-US", name: "Test App" },
          { locale: "tr-TR" }, // Optimized back to shortcut
        ],
      } as any;

      mockReadJsonFile.mockReturnValue(mockDataWithShortcuts);
      mockRemoveShortcuts.mockReturnValue(mockDataWithoutShortcuts);
      mockValidateAppStoreModel.mockReturnValue(mockDataWithoutShortcuts);
      mockUseShortcuts.mockReturnValue(mockFinalStateWithShortcuts);

      // Mock axios response - only apply pricing is called
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            updatedState: mockUpdatedState,
          },
        },
      });

      await setPriceCommand.handler!(mockArgv as any);

      // Verify shortcuts are removed at the start
      expect(mockRemoveShortcuts).toHaveBeenCalledWith(mockDataWithShortcuts);
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockDataWithoutShortcuts,
        false,
        "apply"
      );

      // Verify shortcuts are applied back at the end
      expect(mockUseShortcuts).toHaveBeenCalledWith(mockUpdatedState);

      // Verify the final file is written with shortcuts applied
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test-file.json",
        JSON.stringify(mockFinalStateWithShortcuts, null, 2) + "\n"
      );
    });

    it("should handle case where shortcuts are not present", async () => {
      const mockData = {
        inAppPurchases: [{ id: "test" }],
        availableTerritories: ["US", "TR"], // No shortcuts
      } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData); // No change
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockUseShortcuts.mockReturnValue(mockData); // No change

      // Mock axios response - only apply pricing is called
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            updatedState: mockData,
          },
        },
      });

      await setPriceCommand.handler!(mockArgv as any);

      // Verify both functions are still called
      expect(mockRemoveShortcuts).toHaveBeenCalledWith(mockData);
      expect(mockUseShortcuts).toHaveBeenCalledWith(mockData);
    });
  });
});
