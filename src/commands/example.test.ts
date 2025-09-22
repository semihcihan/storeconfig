import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger, removeShortcuts } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import * as fs from "fs";

// Mock process.exit before importing the command
const mockProcessExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// Mock fs module
jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
}));

// Mock only the logger, let everything else through for real validation
jest.mock("@semihcihan/shared", () => {
  const actual = jest.requireActual("@semihcihan/shared");
  return Object.assign({}, actual, {
    logger: {
      std: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    },
  });
});

const mockLogger = jest.mocked(logger);
const mockFs = jest.mocked(fs);

// Import the command after mocking
import exampleCommand from "./example";

describe("example command", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.std.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
    mockLogger.info.mockReturnValue(undefined);
    mockFs.writeFileSync.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(exampleCommand.command).toBe("example");
    });

    it("should have correct description", () => {
      expect(exampleCommand.describe).toBe(
        "Generate example JSON files for different data types"
      );
    });

    it("should have builder defined", () => {
      expect(exampleCommand.builder).toBeDefined();
    });

    it("should have type parameter with correct configuration", () => {
      const builder = exampleCommand.builder as any;
      expect(builder.type).toBeDefined();
      expect(builder.type.alias).toBe("t");
      expect(builder.type.describe).toBe("Type of example to generate");
      expect(builder.type.choices).toEqual([
        "minimal",
        "full",
        "subscription",
        "iap",
        "in-app-purchase",
      ]);
      expect(builder.type.demandOption).toBeUndefined();
      expect(builder.type.type).toBe("string");
    });
  });

  describe("command execution", () => {
    it("should generate minimal app example successfully", async () => {
      const mockArgv = { type: "minimal" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename, content] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("storeconfig_example.json");
      expect(content).toBeDefined();
      const parsedContent = JSON.parse(content as string);
      expect(typeof parsedContent).toBe("object");
    });

    it("should generate full app example successfully", async () => {
      const mockArgv = { type: "full" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename, content] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("storeconfig_example.json");
      expect(content).toBeDefined();
      const parsedContent = JSON.parse(content as string);
      expect(typeof parsedContent).toBe("object");
    });

    it("should generate subscription example successfully", async () => {
      const mockArgv = { type: "subscription" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename, content] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("storeconfig_example.json");
      expect(content).toBeDefined();
      const parsedContent = JSON.parse(content as string);
      expect(Array.isArray(parsedContent)).toBe(true);
    });

    it("should generate in-app-purchase example successfully", async () => {
      const mockArgv = { type: "in-app-purchase" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename, content] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("storeconfig_example.json");
      expect(content).toBeDefined();
      const parsedContent = JSON.parse(content as string);
      expect(Array.isArray(parsedContent)).toBe(true);
    });

    it("should handle unknown example type and exit", async () => {
      const mockArgv = { type: "unknown" };

      await expect(exampleCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Unknown example type: unknown"
      );
    });
  });

  describe("example data validation", () => {
    it("should generate valid minimal app example that passes validation", async () => {
      const mockArgv = { type: "minimal" };

      await exampleCommand.handler!(mockArgv as any);

      const [, content] = mockFs.writeFileSync.mock.calls[0];
      const output = JSON.parse(content as string);
      // Use real validation instead of mocked schema
      expect(() =>
        validateAppStoreModel(removeShortcuts(output), false, "fetch")
      ).not.toThrow();
    });

    it("should generate valid full app example that passes validation", async () => {
      const mockArgv = { type: "full" };

      await exampleCommand.handler!(mockArgv as any);

      const [, content] = mockFs.writeFileSync.mock.calls[0];
      const output = JSON.parse(content as string);
      // Use real validation instead of mocked schema
      expect(() =>
        validateAppStoreModel(removeShortcuts(output), false, "fetch")
      ).not.toThrow();
    });
  });

  describe("type validation", () => {
    it("should return correct types for all example types", async () => {
      const testCases = [
        { type: "minimal", expectedType: "object" },
        { type: "full", expectedType: "object" },
        { type: "subscription", expectedType: "array" },
        { type: "in-app-purchase", expectedType: "array" },
      ];

      for (const testCase of testCases) {
        jest.clearAllMocks();
        const mockArgv = { type: testCase.type };

        await exampleCommand.handler!(mockArgv as any);

        const [, content] = mockFs.writeFileSync.mock.calls[0];
        const output = JSON.parse(content as string);
        if (testCase.expectedType === "object") {
          expect(typeof output).toBe("object");
          expect(Array.isArray(output)).toBe(false);
        } else {
          expect(Array.isArray(output)).toBe(true);
        }
      }
    });

    it("should generate examples with proper data structure", async () => {
      const mockArgv = { type: "full" };

      await exampleCommand.handler!(mockArgv as any);

      const [, content] = mockFs.writeFileSync.mock.calls[0];
      const output = JSON.parse(content as string);

      // Test that the output has the expected top-level structure
      expect(output).toHaveProperty("schemaVersion");
      expect(output).toHaveProperty("appId");
      expect(output).toHaveProperty("versionString");
      expect(output).toHaveProperty("pricing");
      expect(output).toHaveProperty("localizations");

      // Test that arrays are properly structured
      if (output.inAppPurchases) {
        expect(Array.isArray(output.inAppPurchases)).toBe(true);
      }
      if (output.subscriptionGroups) {
        expect(Array.isArray(output.subscriptionGroups)).toBe(true);
      }
    });

    it("should generate subscription examples with proper array structure", async () => {
      const mockArgv = { type: "subscription" };

      await exampleCommand.handler!(mockArgv as any);

      const [, content] = mockFs.writeFileSync.mock.calls[0];
      const output = JSON.parse(content as string);
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBeGreaterThan(0);

      // Each subscription should be an object
      output.forEach((item: any) => {
        expect(typeof item).toBe("object");
        expect(Array.isArray(item)).toBe(false);
      });
    });

    it("should generate in-app-purchase examples with proper array structure", async () => {
      const mockArgv = { type: "in-app-purchase" };

      await exampleCommand.handler!(mockArgv as any);

      const [, content] = mockFs.writeFileSync.mock.calls[0];
      const output = JSON.parse(content as string);
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBeGreaterThan(0);

      // Each purchase should be an object
      output.forEach((item: any) => {
        expect(typeof item).toBe("object");
        expect(Array.isArray(item)).toBe(false);
      });
    });
  });

  describe("file output behavior", () => {
    it("should use default filename when no file option provided", async () => {
      const mockArgv = { type: "minimal" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("storeconfig_example.json");
    });

    it("should use custom filename when file option provided", async () => {
      const mockArgv = { type: "minimal", file: "custom.json" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("custom.json");
    });

    it("should use custom filename without extension when file option provided", async () => {
      const mockArgv = { type: "minimal", file: "custom" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [filename] = mockFs.writeFileSync.mock.calls[0];
      expect(filename).toBe("custom");
    });

    it("should write JSON content with proper formatting", async () => {
      const mockArgv = { type: "minimal" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      const [, content] = mockFs.writeFileSync.mock.calls[0];

      // Should be valid JSON
      expect(() => JSON.parse(content as string)).not.toThrow();

      // Should be formatted with 2-space indentation
      const parsed = JSON.parse(content as string);
      const formatted = JSON.stringify(parsed, null, 2);
      expect(content).toBe(formatted);
    });

    it("should log success message after writing file", async () => {
      const mockArgv = { type: "minimal" };

      await exampleCommand.handler!(mockArgv as any);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Successfully generated example and wrote to storeconfig_example.json"
      );
    });

    it("should handle file write errors and exit", async () => {
      const mockArgv = { type: "minimal" };
      const mockError = new Error("File write failed");
      mockFs.writeFileSync.mockImplementation(() => {
        throw mockError;
      });

      await expect(exampleCommand.handler!(mockArgv as any)).rejects.toThrow(
        "process.exit called"
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to write example file",
        mockError
      );
    });
  });

  describe("builder configuration", () => {
    it("should have file parameter with correct configuration", () => {
      const builder = exampleCommand.builder as any;
      expect(builder.file).toBeDefined();
      expect(builder.file.alias).toBe("f");
      expect(builder.file.describe).toContain("Path to the output JSON file");
      expect(builder.file.describe).toContain("storeconfig_example.json");
      expect(builder.file.demandOption).toBe(false);
      expect(builder.file.type).toBe("string");
    });
  });
});
