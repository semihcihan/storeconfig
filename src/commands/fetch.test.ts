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
import * as readline from "readline";

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
}));
jest.mock("axios");
jest.mock("fs");
jest.mock("readline", () => ({
  createInterface: jest.fn(),
}));

const mockLogger = jest.mocked(logger);
const mockAxios = jest.mocked(axios);
const mockFs = jest.mocked(fs);
const mockReadline = jest.mocked(readline);

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

    // Mock readline interface
    const mockRl = {
      question: jest.fn(),
      close: jest.fn(),
    };
    mockReadline.createInterface.mockReturnValue(mockRl as any);

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
      expect(builder.file.demandOption).toBe(true);
      expect(builder.file.type).toBe("string");
      expect(builder.file.describe).toBe("Path to the output JSON file.");
    });
  });

  describe("command execution with app ID provided", () => {
    it("should execute successfully with valid app ID", async () => {
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Fetching details for app ID: 123456789 and writing to output.json"
      );
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/fetch",
        { appId: "123456789" }
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "output.json",
        JSON.stringify(mockAppStoreState, null, 2)
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Successfully fetched app and wrote to output.json"
      );
    });

    it("should use custom API base URL from environment", async () => {
      process.env.API_BASE_URL = "https://api.example.com";

      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockAxios.post).toHaveBeenCalledWith(
        "https://api.example.com/api/v1/fetch",
        { appId: "123456789" }
      );
    });

    it("should handle API error response", async () => {
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: false,
          error: "App not found",
        },
      });

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Fetch failed",
        expect.any(Error)
      );
    });

    it("should handle API request failure", async () => {
      mockAxios.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Fetch failed",
        expect.any(Error)
      );
    });
  });

  describe("command execution without app ID (interactive selection)", () => {
    const mockArgvWithoutId = {
      file: "output.json",
    };

    it("should fetch apps list and let user select when no app ID provided", async () => {
      // Mock fetch apps API call
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callback("1"); // User selects first app
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
      expect(mockAxios.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/fetch-apps"
      );
      expect(mockLogger.info).toHaveBeenCalledWith("Available apps:");
      expect(mockLogger.info).toHaveBeenCalledWith(
        "1. Test App 1\n2. Test App 2"
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 1 (ID: 123456789)"
      );
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/fetch",
        { appId: "123456789" }
      );
    });

    it("should handle invalid user selection and retry", async () => {
      // Mock fetch apps API call
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection with invalid input first, then valid
      let callCount = 0;
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callCount++;
          if (callCount === 1) {
            callback("invalid"); // Invalid input
          } else {
            callback("2"); // Valid selection
          }
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Invalid selection. Please enter a number between 1 and 2"
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 2 (ID: 987654321)"
      );
    });

    it("should handle out of range user selection and retry", async () => {
      // Mock fetch apps API call
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection with out of range input first, then valid
      let callCount = 0;
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callCount++;
          if (callCount === 1) {
            callback("5"); // Out of range
          } else {
            callback("1"); // Valid selection
          }
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithoutId as any);

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Invalid selection. Please enter a number between 1 and 2"
      );
    });

    it("should handle empty apps list", async () => {
      // Mock fetch apps API call with empty result
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: [],
        },
      });

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow("process.exit called");

      expect(mockLogger.error).toHaveBeenCalledWith(
        "No apps found in your App Store Connect account"
      );
    });

    it("should handle fetch apps API error", async () => {
      // Mock fetch apps API call failure
      mockAxios.get.mockRejectedValueOnce(new Error("API error"));

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow("process.exit called");

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch apps list",
        expect.any(Error)
      );
    });

    it("should handle fetch apps API error response", async () => {
      // Mock fetch apps API call with error response
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: false,
          error: "Authentication failed",
        },
      });

      await expect(
        fetchCommand.handler!(mockArgvWithoutId as any)
      ).rejects.toThrow("process.exit called");

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch apps list",
        expect.any(Error)
      );
    });
  });

  describe("file writing", () => {
    it("should write app store state to file with proper formatting", async () => {
      mockAxios.post.mockResolvedValueOnce({
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
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("File write error");
      });

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Fetch failed",
        expect.any(Error)
      );
    });
  });

  describe("logging", () => {
    it("should log when starting fetch with app ID", async () => {
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Fetching details for app ID: 123456789 and writing to output.json"
      );
    });

    it("should log when starting interactive selection", async () => {
      // Mock fetch apps API call
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callback("1");
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!({ file: "output.json" } as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });

    it("should log success message after completion", async () => {
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Successfully fetched app and wrote to output.json"
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
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callback("1");
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithUndefinedId as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });

    it("should handle empty string app ID in argv", async () => {
      const mockArgvWithEmptyId = {
        file: "output.json",
        id: "",
      };

      // Mock fetch apps API call
      mockAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockApps,
        },
      });

      // Mock user selection
      const mockRl = {
        question: jest.fn().mockImplementation((prompt: any, callback: any) => {
          callback("1");
        }),
        close: jest.fn(),
      };
      mockReadline.createInterface.mockReturnValue(mockRl as any);

      // Mock fetch app details API call
      mockAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAppStoreState,
        },
      });

      await fetchCommand.handler!(mockArgvWithEmptyId as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "No app ID provided. Fetching available apps..."
      );
    });
  });
});
