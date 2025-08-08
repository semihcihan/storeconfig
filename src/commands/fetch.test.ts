import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "../utils/logger";
import { fetchAppStoreState } from "../services/fetch-service";
import { useShortcuts } from "../utils/shortcut-converter";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("../utils/logger");
jest.mock("../services/fetch-service", () => ({
  fetchAppStoreState: jest.fn(),
}));
jest.mock("../utils/shortcut-converter");
jest.mock("fs");

const mockLogger = jest.mocked(logger);
const mockFetchAppStoreState = jest.mocked(fetchAppStoreState);
const mockUseShortcuts = jest.mocked(useShortcuts);

// Import the command after mocking
import fetchCommand from "./fetch";
import * as fs from "fs";

const mockFs = jest.mocked(fs);

describe("fetch command", () => {
  const mockArgv = {
    id: "123456789",
    file: "output.json",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockFetchAppStoreState.mockResolvedValue({ appId: "123456789" } as any);
    mockUseShortcuts.mockReturnValue({ appId: "123456789" } as any);
    mockFs.writeFileSync.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(fetchCommand.command).toBe("fetch");
    });

    it("should have correct description", () => {
      expect(fetchCommand.describe).toBe(
        "Fetches IAPs and subscriptions from App Store Connect for a specific app."
      );
    });

    it("should have builder defined", () => {
      expect(fetchCommand.builder).toBeDefined();
    });

    it("should have id parameter with correct configuration", () => {
      const builder = fetchCommand.builder as any;
      expect(builder.id).toBeDefined();
      expect(builder.id.demandOption).toBe(true);
      expect(builder.id.type).toBe("string");
    });

    it("should have file parameter with correct configuration", () => {
      const builder = fetchCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(true);
      expect(builder.file.type).toBe("string");
    });
  });

  describe("command execution", () => {
    it("should execute successfully with valid input", async () => {
      const mockData = { appId: "123456789" } as any;

      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockUseShortcuts.mockReturnValue(mockData);

      await fetchCommand.handler!(mockArgv as any);

      expect(mockFetchAppStoreState).toHaveBeenCalledWith("123456789");
      expect(mockUseShortcuts).toHaveBeenCalledWith(mockData);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "output.json",
        JSON.stringify(mockData, null, 2)
      );
    });

    it("should handle fetch errors and exit", async () => {
      mockFetchAppStoreState.mockRejectedValue(new Error("Fetch failed"));

      await expect(fetchCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Fetch failed",
        expect.any(Error)
      );
    });

    it("should handle file write errors and exit", async () => {
      const mockData = { appId: "123456789" } as any;

      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockUseShortcuts.mockReturnValue(mockData);
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write failed");
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
    it("should log when starting the command", async () => {
      const mockData = { appId: "123456789" } as any;

      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockUseShortcuts.mockReturnValue(mockData);

      await fetchCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Fetching details for app ID: 123456789 and writing to output.json"
      );
    });

    it("should log successful completion", async () => {
      const mockData = { appId: "123456789" } as any;

      mockFetchAppStoreState.mockResolvedValue(mockData);
      mockUseShortcuts.mockReturnValue(mockData);

      await fetchCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Successfully fetched app and wrote to output.json"
      );
    });
  });
});
