import { validateFileExists } from "./file-validation";
import { DEFAULT_CONFIG_FILENAME } from "./constants";
import { logger } from "../utils/logger";
import fs from "fs";
import path from "path";
import os from "os";
import { jest } from "@jest/globals";

// Mock the logger to avoid console output during tests
jest.mock("../utils/logger", () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock process.exit to prevent actual exit during tests
const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

describe("validateFileExists", () => {
  const tempDir = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "file-validation-test-"))
  );
  const originalCwd = process.cwd();

  beforeAll(() => {
    // Change to temp directory for tests
    process.chdir(tempDir);
  });

  afterAll(() => {
    // Restore original working directory
    process.chdir(originalCwd);
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (logger.error as jest.Mock).mockClear();
    (logger.info as jest.Mock).mockClear();
  });

  describe("when a file is specified", () => {
    it("should return the specified file path if it exists", () => {
      const testFile = path.join(tempDir, "test-file.json");
      fs.writeFileSync(testFile, '{"test": "data"}');

      const result = validateFileExists(testFile);

      expect(result).toBe(testFile);
      expect(mockExit).not.toHaveBeenCalled();
    });

    it("should exit with error if specified file does not exist", () => {
      const nonExistentFile = path.join(tempDir, "non-existent.json");

      expect(() => {
        validateFileExists(nonExistentFile);
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });

  describe("when no file is specified", () => {
    it("should return default file path if it exists", () => {
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      fs.writeFileSync(defaultFile, '{"test": "data"}');

      const result = validateFileExists(undefined);

      expect(path.resolve(result)).toBe(path.resolve(defaultFile));
      expect(mockExit).not.toHaveBeenCalled();
    });

    it("should exit with error if default file does not exist", () => {
      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists(undefined);
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should use custom default filename when provided", () => {
      const customDefault = "custom-config.json";
      const customFile = path.join(tempDir, customDefault);
      fs.writeFileSync(customFile, '{"test": "data"}');

      const result = validateFileExists(undefined, {
        defaultFilename: customDefault,
      });

      expect(path.resolve(result)).toBe(path.resolve(customFile));
      expect(mockExit).not.toHaveBeenCalled();
    });
  });

  describe("file description customization", () => {
    it("should use custom file description in error messages", () => {
      const customDescription = "custom JSON file";

      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists(undefined, {
          fileDescription: customDescription,
        });
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });

  describe("resolution customization", () => {
    it("should use custom resolution message", () => {
      const customResolution =
        "Custom resolution message:\n1. Do this\n2. Do that";

      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists(undefined, {
          resolution: customResolution,
        });
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining(customResolution)
      );
    });

    it("should use default resolution when not provided", () => {
      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists(undefined);
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining("Please either:")
      );
      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining("Create a storeconfig.json file")
      );
      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining(
          "Specify a JSON file using the --file or -f option"
        )
      );
    });
  });

  describe("path resolution", () => {
    it("should resolve relative paths correctly", () => {
      const relativeFile = "relative-test.json";
      const fullPath = path.join(tempDir, relativeFile);
      fs.writeFileSync(fullPath, '{"test": "data"}');

      const result = validateFileExists(relativeFile);

      expect(path.resolve(result)).toBe(path.resolve(fullPath));
      expect(mockExit).not.toHaveBeenCalled();
    });

    it("should handle absolute paths correctly", () => {
      const absoluteFile = path.join(tempDir, "absolute-test.json");
      fs.writeFileSync(absoluteFile, '{"test": "data"}');

      const result = validateFileExists(absoluteFile);

      expect(path.resolve(result)).toBe(path.resolve(absoluteFile));
      expect(mockExit).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle empty string as specified file", () => {
      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists("");
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should handle null as specified file", () => {
      // Ensure the default file doesn't exist
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      if (fs.existsSync(defaultFile)) {
        fs.unlinkSync(defaultFile);
      }

      expect(() => {
        validateFileExists(null as any);
      }).toThrow("process.exit called");

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should work with different file extensions", () => {
      const testFile = path.join(tempDir, "test.txt");
      fs.writeFileSync(testFile, "test data");

      const result = validateFileExists(testFile);

      expect(path.resolve(result)).toBe(path.resolve(testFile));
      expect(mockExit).not.toHaveBeenCalled();
    });
  });

  describe("options parameter", () => {
    it("should use default options when none provided", () => {
      const defaultFile = path.join(tempDir, DEFAULT_CONFIG_FILENAME);
      fs.writeFileSync(defaultFile, '{"test": "data"}');

      const result = validateFileExists(undefined);

      expect(path.resolve(result)).toBe(path.resolve(defaultFile));
      expect(mockExit).not.toHaveBeenCalled();
    });

    it("should merge provided options with defaults", () => {
      const customDefault = "custom.json";
      const customFile = path.join(tempDir, customDefault);
      fs.writeFileSync(customFile, '{"test": "data"}');

      const result = validateFileExists(undefined, {
        defaultFilename: customDefault,
        fileDescription: "custom file",
      });

      expect(path.resolve(result)).toBe(path.resolve(customFile));
      expect(mockExit).not.toHaveBeenCalled();
    });
  });
});
