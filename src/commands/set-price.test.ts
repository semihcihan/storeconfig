import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "../utils/logger";
import {
  validateAppStoreModel,
  readJsonFile,
} from "../utils/validation-helpers";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("../utils/logger");
jest.mock("../utils/validation-helpers");
jest.mock("../services/set-price-prompt-service");

const mockLogger = jest.mocked(logger);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockReadJsonFile = jest.mocked(readJsonFile);

// Import the command after mocking
import setPriceCommand from "./set-price";
import {
  startInteractivePricing,
  pricingItemsExist,
} from "../services/set-price-prompt-service";

const mockStartInteractivePricing = jest.mocked(startInteractivePricing);
const mockPricingItemsExist = jest.mocked(pricingItemsExist);

describe("set-price command", () => {
  const mockArgv = {
    file: "test-file.json",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockStartInteractivePricing.mockResolvedValue({
      selectedItem: {
        type: "app",
        id: "",
        name: "",
      },
      basePrice: 0,
      pricingStrategy: "apple",
    });
    mockPricingItemsExist.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      expect(builder.file.demandOption).toBe(true);
      expect(builder.file.type).toBe("string");
    });
  });

  describe("command execution", () => {
    it("should execute successfully with valid input", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);

      await setPriceCommand.handler!(mockArgv as any);

      expect(mockReadJsonFile).toHaveBeenCalledWith("test-file.json");
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(mockData, false);
      expect(mockPricingItemsExist).toHaveBeenCalledWith(mockData);
      expect(mockStartInteractivePricing).toHaveBeenCalledWith({
        inputFile: "test-file.json",
        appStoreState: mockData,
      });
    });

    it("should handle validation errors and exit", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockPricingItemsExist.mockImplementation(() => {
        throw new Error("Validation failed");
      });

      await expect(setPriceCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Set-price failed",
        expect.any(Error)
      );
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

      await setPriceCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Setting prices using file: test-file.json"
      );
    });

    it("should log successful completion", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);

      await setPriceCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Pricing data gathered successfully:",
        {
          selectedItem: {
            type: "app",
            id: "",
            name: "",
          },
          basePrice: 0,
          pricingStrategy: "apple",
        }
      );
    });
  });
});
