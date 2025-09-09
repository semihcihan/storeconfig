import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import { fetchAppStoreState } from "../services/fetch-service";
import { diff } from "../services/diff-service";
import { apply } from "../services/apply-service";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "../helpers/validation-model";
import { removeShortcuts } from "../utils/shortcut-converter";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("../utils/logger");
jest.mock("../services/fetch-service");
jest.mock("../services/diff-service");
jest.mock("../services/apply-service");
jest.mock("../services/plan-service");
jest.mock("../helpers/validation-helpers");
jest.mock("../helpers/validation-model");
jest.mock("../utils/shortcut-converter");
jest.mock("readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementation((prompt: any, callback: any) => {
      callback("y"); // Auto-confirm
    }),
    close: jest.fn(),
  }),
}));

const mockLogger = jest.mocked(logger);
const mockFetchAppStoreState = jest.mocked(fetchAppStoreState);
const mockDiff = jest.mocked(diff);
const mockApply = jest.mocked(apply);
const mockShowPlan = jest.mocked(showPlan);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);

// Import the command after mocking
import applyCommand from "./apply";

describe("apply command", () => {
  const mockArgv = {
    file: "desired.json",
    preview: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockLogger.debug.mockReturnValue(undefined);
    mockLogger.warn.mockReturnValue(undefined);

    const mockData = { appId: "123456789" } as any;
    mockReadJsonFile.mockReturnValue(mockData);
    mockValidateAppStoreModel.mockReturnValue(mockData);
    mockRemoveShortcuts.mockReturnValue(mockData);
    mockFetchAppStoreState.mockResolvedValue(mockData);
    mockDiff.mockReturnValue([]);
    mockShowPlan.mockResolvedValue(undefined);
    mockApply.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(applyCommand.command).toBe("apply");
    });

    it("should have correct description", () => {
      expect(applyCommand.describe).toBe(
        "Apply the changes to App Store Connect"
      );
    });

    it("should have builder defined", () => {
      expect(applyCommand.builder).toBeDefined();
    });

    it("should have file parameter with correct configuration", () => {
      const builder = applyCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(true);
      expect(builder.file.type).toBe("string");
    });

    it("should have preview parameter with correct configuration", () => {
      const builder = applyCommand.builder as any;
      expect(builder.preview).toBeDefined();
      expect(builder.preview.alias).toBe("p");
      expect(builder.preview.type).toBe("boolean");
      expect(builder.preview.default).toBe(false);
    });
  });

  describe("command execution", () => {
    it("should execute successfully with changes", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockDiff.mockReturnValue(mockPlan);

      await applyCommand.handler!(mockArgv as any);

      expect(mockReadJsonFile).toHaveBeenCalledWith("desired.json");
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockData,
        false,
        "apply"
      );
      expect(mockFetchAppStoreState).toHaveBeenCalledWith("123456789");
      expect(mockDiff).toHaveBeenCalledWith(mockData, mockData);
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockApply).toHaveBeenCalledWith(mockPlan, mockData, mockData);
    });

    it("should handle no changes scenario", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockDiff.mockReturnValue([]);

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No changes to apply. Exiting..."
      );
      expect(mockShowPlan).not.toHaveBeenCalled();
      expect(mockApply).not.toHaveBeenCalled();
    });

    it("should handle preview mode", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;
      const previewArgv = { ...mockArgv, preview: true };

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockDiff.mockReturnValue(mockPlan);

      await applyCommand.handler!(previewArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Preview mode - no changes will be applied"
      );
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockApply).not.toHaveBeenCalled();
    });

    it("should handle validation errors and exit", async () => {
      mockReadJsonFile.mockImplementation(() => {
        throw new Error("File not found");
      });

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Apply failed",
        expect.any(Error)
      );
    });

    it("should handle fetch errors and exit", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockRejectedValue(new Error("Fetch failed"));

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Apply failed",
        expect.any(Error)
      );
    });

    it("should handle user cancellation", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      // Mock readline to return "n" (no)
      const readline = require("readline");
      readline.createInterface.mockReturnValue({
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callback("n"); // User cancels
        }),
        close: jest.fn(),
      });

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockDiff.mockReturnValue(mockPlan);

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        "Operation cancelled by user"
      );
      expect(mockApply).not.toHaveBeenCalled();
    });
  });

  describe("logging", () => {
    it("should log when processing desired state", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockDiff.mockReturnValue([]);

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Processing desired state from desired.json..."
      );
    });
  });
});
