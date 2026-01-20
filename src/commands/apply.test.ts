import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import ora from "ora";
import { showPlan } from "../services/plan-service";
import {
  readJsonFile,
  validateAppStoreModel,
  removeShortcuts,
  validateFileExists,
} from "@semihcihan/shared";
import inquirer from "inquirer";

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
jest.mock("../services/job-service");
jest.mock("../services/job-polling-service");
jest.mock("../services/info-service");
jest.mock("inquirer");

const mockLogger = jest.mocked(logger);
const mockOra = jest.mocked(ora);
const mockShowPlan = jest.mocked(showPlan);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockInquirer = jest.mocked(inquirer);

// Import the mocked services
import { apiClient } from "../services/api-client";
import { createJob } from "../services/job-service";
import { trackJob } from "../services/job-polling-service";
import { getInfo } from "../services/info-service";

const mockApiClient = jest.mocked(apiClient);
const mockCreateJob = jest.mocked(createJob);
const mockTrackJob = jest.mocked(trackJob);
const mockGetInfo = jest.mocked(getInfo);

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

    // Mock inquirer to return true by default
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });

    // Mock job services
    mockCreateJob.mockResolvedValue({ jobId: "job-123", newJobCreated: true });
    mockTrackJob.mockResolvedValue(undefined);
    mockGetInfo.mockResolvedValue({
      currentJob: undefined,
      user: { id: "user-123", email: "test@example.com", name: "Test User", appleSetup: false },
    });

    // Mock apiClient responses
    mockApiClient.post.mockResolvedValue({
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
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockValidateFileExists).toHaveBeenCalledWith("desired.json", {
        fileDescription: "target state JSON file",
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
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
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
      expect(mockCreateJob).toHaveBeenCalledWith(
        mockPlan,
        mockData,
        mockData,
        false,
        expect.any(Object)
      );
      expect(mockTrackJob).toHaveBeenCalledWith(
        "job-123",
        expect.any(Object),
        mockPlan
      );
      expect(mockApiClient.post).toHaveBeenCalledTimes(1); // only diff call
    });

    it("should handle no changes scenario", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call with empty plan
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: [],
            currentState: mockData,
          },
        },
      });

      await applyCommand.handler!(mockArgv as any);

      // Test that spinner.succeed() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        "No changes to apply. Your configuration is up to date. Exiting..."
      );
      expect(mockShowPlan).not.toHaveBeenCalled();
      expect(mockCreateJob).not.toHaveBeenCalled();
      expect(mockTrackJob).not.toHaveBeenCalled();
      expect(mockApiClient.post).toHaveBeenCalledTimes(1); // only diff call
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
      mockApiClient.post.mockResolvedValueOnce({
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
      expect(mockCreateJob).not.toHaveBeenCalled();
      expect(mockTrackJob).not.toHaveBeenCalled();
      expect(mockApiClient.post).toHaveBeenCalledTimes(1); // only diff call
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
      mockApiClient.post.mockRejectedValueOnce(new Error("API failed"));

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "API failed"
      );
    });

    it("should handle user cancellation", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            plan: mockPlan,
            currentState: mockData,
          },
        },
      });

      // Mock createJob to throw user cancellation error
      mockCreateJob.mockRejectedValueOnce(
        new Error("Operation cancelled by user")
      );

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "Operation cancelled by user"
      );
    });
  });

  describe("logging", () => {
    it("should log when processing target state", async () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);

      // Mock diff API call
      mockApiClient.post.mockResolvedValueOnce({
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
        "Processing target state from desired.json..."
      );
    });
  });
});
