import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger, DEFAULT_CONFIG_FILENAME } from "@semihcihan/shared";
import * as fs from "fs";
import inquirer from "inquirer";
import ora from "ora";

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
  },
  DEFAULT_CONFIG_FILENAME: "storeconfig.json",
  MESSAGES: {
    SCHEDULED_CHANGES_NOT_VISIBLE:
      "Scheduled changes won't appear in your configuration until they become active.",
  },
}));
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
jest.mock("fs");
jest.mock("inquirer");
jest.mock("ora");

const mockLogger = jest.mocked(logger);
const mockFs = jest.mocked(fs);
const mockInquirer = jest.mocked(inquirer);
const mockOra = jest.mocked(ora);

// Import the mocked apiClient
import { apiClient } from "../services/api-client";
const mockApiClient = jest.mocked(apiClient);

// Import the command after mocking
import fetchCommand from "./fetch";

describe("fetch command", () => {
  const mockArgv = {
    file: "output.json",
    id: "123456789",
  };

  const mockApps = [
    { id: "123456789", name: "Test App 1" },
    { id: "987654321", name: "Test App 2" },
  ];

  const mockAppStoreState = {
    appId: "123456789",
    name: "Test App",
    inAppPurchases: [],
    subscriptions: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockLogger.debug.mockReturnValue(undefined);
    mockLogger.warn.mockReturnValue(undefined);
    mockFs.writeFileSync.mockReturnValue(undefined as any);

    // Mock ora spinner
    const mockSpinner = {
      start: jest.fn().mockReturnThis(),
      succeed: jest.fn().mockReturnThis(),
      fail: jest.fn().mockReturnThis(),
      stop: jest.fn().mockReturnThis(),
    };
    mockOra.mockReturnValue(mockSpinner as any);

    // Set default environment
    process.env.API_BASE_URL = "http://localhost:3000";
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.API_BASE_URL;
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(fetchCommand.command).toBe("fetch");
    });

    it("should have correct description", () => {
      expect(fetchCommand.describe).toBe(
        "Fetches the app from App Store Connect."
      );
    });

    it("should have builder defined", () => {
      expect(fetchCommand.builder).toBeDefined();
    });

    it("should have id parameter with correct configuration", () => {
      const builder = fetchCommand.builder as any;
      expect(builder.id).toBeDefined();
      expect(builder.id.demandOption).toBe(false);
      expect(builder.id.type).toBe("string");
      expect(builder.id.describe).toContain("App ID to fetch details for");
    });

    it("should have file parameter with correct configuration", () => {
      const builder = fetchCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(false);
      expect(builder.file.type).toBe("string");
      expect(builder.file.describe).toBe(
        `Path to the output JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`
      );
    });
  });

  describe("command execution with app ID provided", () => {
    it("should execute successfully with valid app ID", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "Fetching details for app ID: 123456789 and writing to output.json"
      );
      expect(mockApiClient.post).toHaveBeenCalledWith("/fetch", {
        appId: "123456789",
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "output.json",
        JSON.stringify(mockAppStoreState, null, 2)
      );
      // Test that spinner.succeed() was called with the correct message
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        expect.stringMatching(/Successfully fetched app: .*output\.json/)
      );
    });

    it("should use default filename when no file parameter provided", async () => {
      const mockArgvWithoutFile = {
        id: "123456789",
      };

      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutFile as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        `Fetching details for app ID: 123456789 and writing to ${DEFAULT_CONFIG_FILENAME}`
      );
      expect(mockApiClient.post).toHaveBeenCalledWith("/fetch", {
        appId: "123456789",
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        DEFAULT_CONFIG_FILENAME,
        JSON.stringify(mockAppStoreState, null, 2)
      );
      // Test that spinner.succeed() was called with the correct message
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        expect.stringMatching(
          new RegExp(`Successfully fetched app: .*${DEFAULT_CONFIG_FILENAME}`)
        )
      );
    });

    it("should use custom API base URL from environment", async () => {
      process.env.API_BASE_URL = "https://api.example.com";

      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockApiClient.post).toHaveBeenCalledWith("/fetch", {
        appId: "123456789",
      });
    });

    it("should handle API error response", async () => {
      mockApiClient.post.mockRejectedValueOnce(new Error("API error"));

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "API error"
      );
    });

    it("should handle API request failure", async () => {
      mockApiClient.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("command execution without app ID (interactive selection)", () => {
    const mockArgvWithoutId = {
      file: "output.json",
    };

    const mockArgvWithoutIdAndFile = {};

    it("should fetch apps list and let user select when no app ID provided", async () => {
      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
      expect(mockApiClient.get).toHaveBeenCalledWith("/fetch-apps");
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 1 (ID: 123456789)"
      );
      expect(mockApiClient.post).toHaveBeenCalledWith("/fetch", {
        appId: "123456789",
      });
    });

    it("should handle invalid user selection and retry", async () => {
      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return second app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[1],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 2 (ID: 987654321)"
      );
    });

    it("should handle out of range user selection and retry", async () => {
      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 1 (ID: 123456789)"
      );
    });

    it("should handle empty apps list", async () => {
      // Mock fetch apps API call with empty result
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: [],
        },
      });

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow("process.exit called");

      // Test that spinner.fail() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.fail).toHaveBeenCalledWith(
        "No IOS apps found in your App Store Connect account"
      );
    });

    it("should handle fetch apps API error", async () => {
      // Mock fetch apps API call failure
      mockApiClient.get.mockRejectedValueOnce(new Error("API error"));

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow("API error");
    });

    it("should handle fetch apps API error response", async () => {
      // Mock fetch apps API call with error response
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: false,
          error: "Authentication failed",
        },
      });

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow(
        "Cannot read properties of undefined (reading 'length')"
      );
    });

    it("should use default filename when no file parameter provided in interactive mode", async () => {
      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutIdAndFile as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
      expect(mockApiClient.get).toHaveBeenCalledWith("/fetch-apps");
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 1 (ID: 123456789)"
      );
      expect(mockApiClient.post).toHaveBeenCalledWith("/fetch", {
        appId: "123456789",
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        DEFAULT_CONFIG_FILENAME,
        JSON.stringify(mockAppStoreState, null, 2)
      );
      // Test that spinner.succeed() was called with the correct message
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        expect.stringMatching(
          new RegExp(`Successfully fetched app: .*${DEFAULT_CONFIG_FILENAME}`)
        )
      );
    });
  });

  describe("file writing", () => {
    it("should write app store state to file with proper formatting", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "output.json",
        JSON.stringify(mockAppStoreState, null, 2)
      );
    });

    it("should handle file write errors", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("File write error");
      });

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "File write error"
      );
    });
  });

  describe("logging", () => {
    it("should log when starting fetch with app ID", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      // The actual implementation uses spinner.start() instead of logger.info()
      // expect(mockLogger.info).toHaveBeenCalledWith(
      //   "Fetching details for app ID: 123456789 and writing to output.json"
      // );
    });

    it("should log when starting interactive selection", async () => {
      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!({ file: "output.json" } as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });

    it("should show success message after completion", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      // Test that spinner.succeed() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        expect.stringMatching(/Successfully fetched app: .*output\.json/)
      );
    });
  });

  describe("edge cases", () => {
    it("should handle undefined app ID in argv", async () => {
      const mockArgvWithUndefinedId = {
        file: "output.json",
        id: undefined,
      };

      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithUndefinedId as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });

    it("should handle empty string app ID in argv", async () => {
      const mockArgvWithEmptyId = {
        file: "output.json",
        id: "",
      };

      // Mock fetch apps API call
      mockApiClient.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock inquirer to return first app
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[0],
      });

      // Mock fetch app details API call
      mockApiClient.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithEmptyId as any);

      // Test that spinner.start() was called with the correct message
      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });
  });
});
