import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { logger, DEFAULT_CONFIG_FILENAME } from "@semihcihan/shared";
import * as fs from "fs";
import inquirer from "inquirer";
import ora from "ora";

jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

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

const mockStoreConfigEngine = {
  fetchAppsList: jest.fn(),
  fetchAppStoreData: jest.fn(),
};

jest.mock("../services/storeconfig-engine", () => ({
  storeConfigEngine: mockStoreConfigEngine,
}));

jest.mock("fs");
jest.mock("inquirer");
jest.mock("ora");

const mockLogger = jest.mocked(logger);
const mockFs = jest.mocked(fs);
const mockInquirer = jest.mocked(inquirer);
const mockOra = jest.mocked(ora);

import fetchCommand from "./fetch";

describe("fetch command", () => {
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
    mockFs.writeFileSync.mockReturnValue(undefined as any);
    mockStoreConfigEngine.fetchAppsList.mockResolvedValue(mockApps as never);
    mockStoreConfigEngine.fetchAppStoreData.mockResolvedValue(
      mockAppStoreState as never
    );

    mockOra.mockReturnValue({
      start: jest.fn().mockReturnThis(),
      succeed: jest.fn().mockReturnThis(),
      fail: jest.fn().mockReturnThis(),
      stop: jest.fn().mockReturnThis(),
    } as any);
  });

  describe("command structure", () => {
    it("has the expected command configuration", () => {
      expect(fetchCommand.command).toBe("fetch");
      expect(fetchCommand.describe).toBe(
        "Fetches the app from App Store Connect."
      );

      const builder = fetchCommand.builder as any;
      expect(builder.id.type).toBe("string");
      expect(builder.file.alias).toBe("f");
      expect(builder.stdout.type).toBe("boolean");
      expect(builder.file.describe).toBe(
        `Path to the output JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`
      );
    });
  });

  describe("command execution", () => {
    it("fetches an app through the local engine and writes it to a file", async () => {
      await fetchCommand.handler!({
        file: "output.json",
        id: "123456789",
      } as any);

      expect(mockStoreConfigEngine.fetchAppStoreData).toHaveBeenCalledWith(
        "123456789"
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "output.json",
        JSON.stringify(mockAppStoreState, null, 2)
      );

      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.start).toHaveBeenCalledWith(
        "Fetching details for app ID: 123456789 and writing to output.json"
      );
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        expect.stringMatching(/Successfully fetched app: .*output\.json/)
      );
    });

    it("uses the default output filename", async () => {
      await fetchCommand.handler!({ id: "123456789" } as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        DEFAULT_CONFIG_FILENAME,
        JSON.stringify(mockAppStoreState, null, 2)
      );
    });

    it("lists apps and lets the user select one when no app ID is provided", async () => {
      mockInquirer.prompt.mockResolvedValueOnce({
        selectedApp: mockApps[1],
      } as never);

      await fetchCommand.handler!({ file: "output.json" } as any);

      expect(mockStoreConfigEngine.fetchAppsList).toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Selected: Test App 2 (ID: 987654321)"
      );
      expect(mockStoreConfigEngine.fetchAppStoreData).toHaveBeenCalledWith(
        "987654321"
      );
    });

    it("fails when no apps are available", async () => {
      mockStoreConfigEngine.fetchAppsList.mockResolvedValueOnce([] as never);

      await expect(
        fetchCommand.handler!({ file: "output.json" } as any)
      ).rejects.toThrow("process.exit called");

      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.fail).toHaveBeenCalledWith(
        "No IOS apps found in your App Store Connect account"
      );
    });

    it("propagates local engine errors", async () => {
      mockStoreConfigEngine.fetchAppStoreData.mockRejectedValueOnce(
        new Error("Apple API failed") as never
      );

      await expect(
        fetchCommand.handler!({ id: "123456789" } as any)
      ).rejects.toThrow("Apple API failed");
    });
  });

  describe("stdout mode", () => {
    it("prints app list JSON when --stdout has no app ID", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await fetchCommand.handler!({ stdout: true } as any);

      expect(mockStoreConfigEngine.fetchAppsList).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(mockApps, null, 2));
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it("prints app config JSON when --stdout has an app ID", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await fetchCommand.handler!({
        stdout: true,
        id: "123456789",
      } as any);

      expect(mockStoreConfigEngine.fetchAppStoreData).toHaveBeenCalledWith(
        "123456789"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        JSON.stringify(mockAppStoreState, null, 2)
      );
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
