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

const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    prompt: jest.fn(),
    std: jest.fn(),
  },
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
  validateFileExists: jest.fn(),
}));
jest.mock("../services/plan-service");
jest.mock("../services/storeconfig-engine", () => ({
  storeConfigEngine: {
    generateDiff: jest.fn(),
    applyPlan: jest.fn(),
  },
}));
jest.mock("inquirer");

const mockLogger = jest.mocked(logger);
const mockOra = jest.mocked(ora);
const mockShowPlan = jest.mocked(showPlan);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockValidateFileExists = jest.mocked(validateFileExists);
const mockInquirer = jest.mocked(inquirer);

import { storeConfigEngine } from "../services/storeconfig-engine";

const mockStoreConfigEngine = jest.mocked(storeConfigEngine);

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
    mockLogger.std.mockReturnValue(undefined);

    const mockData = { appId: "123456789" } as any;
    mockReadJsonFile.mockReturnValue(mockData);
    mockValidateAppStoreModel.mockReturnValue(mockData);
    mockRemoveShortcuts.mockReturnValue(mockData);
    mockValidateFileExists.mockReturnValue("desired.json");
    mockShowPlan.mockResolvedValue(undefined);
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });

    mockStoreConfigEngine.generateDiff.mockResolvedValue({
      plan: [],
      currentState: mockData,
    });
    mockStoreConfigEngine.applyPlan.mockResolvedValue(undefined);
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

      mockStoreConfigEngine.generateDiff.mockResolvedValueOnce({
        plan: mockPlan,
        currentState: mockData,
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

      mockStoreConfigEngine.generateDiff.mockResolvedValueOnce({
        plan: mockPlan,
        currentState: mockData,
      });

      await applyCommand.handler!(mockArgv as any);

      expect(mockReadJsonFile).toHaveBeenCalledWith("desired.json");
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockData,
        false,
        "apply"
      );
      expect(mockStoreConfigEngine.generateDiff).toHaveBeenCalledWith(mockData);
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "confirm",
          name: "confirmed",
          default: false,
        }),
      ]);
      expect(mockStoreConfigEngine.applyPlan).toHaveBeenCalledWith(
        mockPlan,
        mockData,
        mockData,
        {
          dryRun: false,
          onStep: expect.any(Function),
          onInfo: expect.any(Function),
        }
      );
    });

    it("should handle no changes scenario", async () => {
      await applyCommand.handler!(mockArgv as any);

      expect(mockOra).toHaveBeenCalled();
      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        "No changes to apply. Your configuration is up to date. Exiting..."
      );
      expect(mockShowPlan).not.toHaveBeenCalled();
      expect(mockInquirer.prompt).not.toHaveBeenCalled();
      expect(mockStoreConfigEngine.applyPlan).not.toHaveBeenCalled();
    });

    it("should handle preview mode", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;
      const previewArgv = { ...mockArgv, preview: true };

      mockStoreConfigEngine.generateDiff.mockResolvedValueOnce({
        plan: mockPlan,
        currentState: mockData,
      });

      await applyCommand.handler!(previewArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Preview mode - no changes will be applied"
      );
      expect(mockShowPlan).toHaveBeenCalledWith(mockPlan);
      expect(mockInquirer.prompt).not.toHaveBeenCalled();
      expect(mockStoreConfigEngine.applyPlan).not.toHaveBeenCalled();
    });

    it("should handle validation errors and exit", async () => {
      mockValidateFileExists.mockImplementation(() => {
        throw new Error("process.exit called");
      });

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );
    });

    it("should handle local diff errors and exit", async () => {
      mockStoreConfigEngine.generateDiff.mockRejectedValueOnce(
        new Error("Diff failed")
      );

      await expect(applyCommand.handler!(mockArgv as any)).rejects.toThrow(
        "Diff failed"
      );
    });

    it("should handle user cancellation", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
      ] as any;

      mockStoreConfigEngine.generateDiff.mockResolvedValueOnce({
        plan: mockPlan,
        currentState: mockData,
      });
      mockInquirer.prompt.mockResolvedValueOnce({ confirmed: false });

      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        "Operation cancelled by user"
      );
      expect(mockStoreConfigEngine.applyPlan).not.toHaveBeenCalled();
    });

    it("should wire progress and info handlers for local apply", async () => {
      const mockData = { appId: "123456789" } as any;
      const mockPlan = [
        { type: "UPDATE_APP_DETAILS", payload: { name: "Test" } },
      ] as any;

      mockStoreConfigEngine.generateDiff.mockResolvedValueOnce({
        plan: mockPlan,
        currentState: mockData,
      });
      mockStoreConfigEngine.applyPlan.mockImplementationOnce(
        async (_plan, _current, _desired, options) => {
          await options?.onStep?.(0, mockPlan[0]);
          await options?.onInfo?.("Closest price was used", "default", 0);
          await options?.onInfo?.("Scheduled price note", "after", 0);
        }
      );

      await applyCommand.handler!(mockArgv as any);

      const spinnerInstance = mockOra.mock.results[0].value as any;
      expect(spinnerInstance.text).toBe(
        "Processing action [1/1] UPDATE_APP_DETAILS"
      );
      expect(mockLogger.info).toHaveBeenCalledWith("Closest price was used");
      expect(mockLogger.info).toHaveBeenCalledWith("Scheduled price note");
      expect(spinnerInstance.succeed).toHaveBeenCalledWith(
        "Actions completed successfully"
      );
    });
  });

  describe("logging", () => {
    it("should log when processing target state", async () => {
      await applyCommand.handler!(mockArgv as any);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Processing target state from desired.json..."
      );
    });
  });
});
