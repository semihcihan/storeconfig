import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import { showPlan } from "../services/plan-service";
import {
  readJsonFile,
  validateAppStoreModel,
  removeShortcuts,
  validateFileExists,
} from "@semihcihan/shared";
import axios from "axios";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    prompt: jest.fn(),
  },
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
  validateFileExists: jest.fn(),
}));
jest.mock("../services/plan-service");
jest.mock("axios");
jest.mock("readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementation((prompt: any, callback: any) => {
      callback("y"); // Auto-confirm
    }),
    close: jest.fn(),
  }),
}));

const mockLogger = jest.mocked(logger);
const mockShowPlan = jest.mocked(showPlan);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockAxios = jest.mocked(axios);

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
    mockValidateFileExists.mockReturnValue("desired.json");
    mockShowPlan.mockResolvedValue(undefined);

    // Mock axios responses
    mockAxios.post.mockResolvedValue({
      data: {
        success: true,
        data: {
          plan: [],
          currentState: mockData,
        },
      },
    });
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
      expect(builder.file.demandOption).toBe(false);
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
    it("should validate file exists before processing", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      // Mock apply API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockValidateFileExists).toHaveBeenCalledWith("desired.json", {
        fileDescription: "desired state JSON file",
      });
    });

    it("should execute successfully with changes", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      // Mock apply API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockReadJsonFile).toHaveBeenCalledWith("desired.json");
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockData,
        false,
        "apply"
      );
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockAxios.post).toHaveBeenCalledTimes(2); // diff + apply calls
    });

    it("should handle no changes scenario", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call with empty plan
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: [],
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No changes to apply. Exiting..."
      );
      expect(mockShowPlan).not.toHaveBeenCalled();
      expect(mockAxios.post).toHaveBeenCalledTimes(1); // only diff call
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

      // Mock diff API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(previewArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Preview mode - no changes will be applied"
      );
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockAxios.post).toHaveBeenCalledTimes(1); // only diff call
    });

    it("should handle validation errors and exit", async () => {
      mockValidateFileExists.mockImplementation(() => {
        throw new Error("process.exit called");
      });

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );
    });

    it("should handle API errors and exit", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call failure
      mockAxios.post.mockRejectedValueOnce(new Error("API failed"));

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

      // Mock diff API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        "Operation cancelled by user"
      );
      expect(mockAxios.post).toHaveBeenCalledTimes(1); // only diff call
    });
  });

  describe("logging", () => {
    it("should log when processing desired state", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: [],
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Processing desired state from desired.json..."
      );
    });
  });
});
