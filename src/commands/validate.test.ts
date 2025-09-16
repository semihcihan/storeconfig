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
import { validateAppStoreModel, removeShortcuts } from "@semihcihan/shared";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock dependencies
jest.mock("@semihcihan/shared", () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
  readJsonFile: jest.fn(),
  validateAppStoreModel: jest.fn(),
  removeShortcuts: jest.fn(),
  validateFileExists: jest.fn(),
}));

const mockLogger = jest.mocked(logger);
const mockReadJsonFile = jest.mocked(readJsonFile);
const mockValidateAppStoreModel = jest.mocked(validateAppStoreModel);
const mockRemoveShortcuts = jest.mocked(removeShortcuts);
const mockValidateFileExists = jest.mocked(validateFileExists);

// Import the command after mocking
import validateCommand from "./validate";

describe("validate command", () => {
  const mockArgv = {
    file: "test.json",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.error.mockReturnValue(undefined);

    const mockData = { appId: "123456789" } as any;
    mockValidateFileExists.mockReturnValue("test.json");
    mockReadJsonFile.mockReturnValue(mockData);
    mockRemoveShortcuts.mockReturnValue(mockData);
    mockValidateAppStoreModel.mockReturnValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(validateCommand.command).toBe("validate-format");
    });

    it("should have correct description", () => {
      expect(validateCommand.describe).toBe(
        "Validate the JSON file format and structure"
      );
    });

    it("should have builder defined", () => {
      expect(validateCommand.builder).toBeDefined();
    });

    it("should have file parameter with correct configuration", () => {
      const builder = validateCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.demandOption).toBe(false);
      expect(builder.file.type).toBe("string");
    });
  });

  describe("command execution", () => {
    it("should execute successfully with valid file", () => {
      const mockData = { appId: "123456789" } as any;

      mockReadJsonFile.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockReturnValue(mockData);

      expect(() => validateCommand.handler!(mockArgv as any)).not.toThrow();

      expect(mockReadJsonFile).toHaveBeenCalledWith("test.json");
      expect(mockRemoveShortcuts).toHaveBeenCalledWith(mockData);
      expect(mockValidateAppStoreModel).toHaveBeenCalledWith(
        mockData,
        true,
        "fetch"
      );
    });

    it("should handle file read errors and exit", () => {
      mockValidateFileExists.mockImplementation(() => {
        throw new Error("process.exit called");
      });

      expect(() => validateCommand.handler!(mockArgv as any)).toThrow(
        "process.exit called"
      );
    });

    it("should handle validation errors and exit", () => {
      const mockData = { appId: "123456789" } as any;
      const validationError = new Error("Validation failed");

      mockReadJsonFile.mockReturnValue(mockData);
      mockRemoveShortcuts.mockReturnValue(mockData);
      mockValidateAppStoreModel.mockImplementation(() => {
        throw validationError;
      });

      expect(() => validateCommand.handler!(mockArgv as any)).toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(validationError);
    });

    it("should handle shortcut conversion errors and exit", () => {
      mockReadJsonFile.mockReturnValue({} as any);
      mockRemoveShortcuts.mockImplementation(() => {
        throw new Error("Shortcut conversion failed");
      });

      expect(() => validateCommand.handler!(mockArgv as any)).toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
