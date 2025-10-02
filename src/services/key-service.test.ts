import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import os from "os";
import { ContextualError, logger } from "@semihcihan/shared";
import { KeyService, keyService } from "./key-service";

// Mock dependencies
jest.mock("fs");
jest.mock("path");
jest.mock("os");
jest.mock("@semihcihan/shared", () => ({
  ContextualError: jest.fn().mockImplementation((message, cause) => ({
    name: "ContextualError",
    message,
    cause,
  })),
  logger: {
    debug: jest.fn(),
  },
}));

const mockFs = jest.mocked(fs);
const mockPath = jest.mocked(path);
const mockOs = jest.mocked(os);
const mockLogger = jest.mocked(logger);
const mockContextualError = jest.mocked(ContextualError);

describe("KeyService", () => {
  let keyServiceInstance: KeyService;
  const mockKeyPath = "/test/path/key";
  const mockKeyDir = "/test/path";
  const mockSecretKey = "test-secret-key-123";

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock path.dirname to return the directory
    mockPath.dirname.mockReturnValue(mockKeyDir);

    // Create new instance for each test with injected key path
    keyServiceInstance = new KeyService(mockKeyPath);
  });

  describe("constructor", () => {
    it("should initialize with injected key path", () => {
      const testKeyPath = "/custom/test/path";
      const service = new KeyService(testKeyPath);
      expect(service.getKeyPath()).toBe(testKeyPath);
    });

    it("should use default key path when no path provided", () => {
      mockOs.homedir.mockReturnValue("/home/user");
      mockPath.join.mockReturnValue("/home/user/.storeconfig/key");

      const service = new KeyService();
      expect(service.getKeyPath()).toBe("/home/user/.storeconfig/key");
      expect(mockOs.homedir).toHaveBeenCalled();
      expect(mockPath.join).toHaveBeenCalledWith(
        "/home/user",
        ".storeconfig",
        "key"
      );
    });
  });

  describe("getKeyPath", () => {
    it("should return the key file path", () => {
      const result = keyServiceInstance.getKeyPath();
      expect(result).toBe(mockKeyPath);
    });
  });

  describe("saveKey", () => {
    it("should save secret key to file when directory exists", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.writeFileSync.mockImplementation(() => undefined);

      keyServiceInstance.saveKey(mockSecretKey);

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyDir);
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockKeyPath,
        mockSecretKey,
        "utf8"
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `Secret key saved to ${mockKeyPath}`
      );
    });

    it("should create directory and save secret key when directory does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => undefined);

      keyServiceInstance.saveKey(mockSecretKey);

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyDir);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(mockKeyDir, {
        recursive: true,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockKeyPath,
        mockSecretKey,
        "utf8"
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `Secret key saved to ${mockKeyPath}`
      );
    });

    it("should throw ContextualError when directory creation fails", () => {
      const error = new Error("Permission denied");
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {
        throw error;
      });

      expect(() => keyServiceInstance.saveKey(mockSecretKey)).toThrow();
      expect(mockContextualError).toHaveBeenCalledWith(
        "Failed to save secret key",
        error
      );
    });

    it("should throw ContextualError when file write fails", () => {
      const error = new Error("Disk full");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.writeFileSync.mockImplementation(() => {
        throw error;
      });

      expect(() => keyServiceInstance.saveKey(mockSecretKey)).toThrow();
      expect(mockContextualError).toHaveBeenCalledWith(
        "Failed to save secret key",
        error
      );
    });
  });

  describe("loadKey", () => {
    it("should return null when key file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = keyServiceInstance.loadKey();

      expect(result).toBeNull();
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });

    it("should return trimmed secret key when file exists", () => {
      const keyWithWhitespace = "  test-secret-key-123  \n";
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(keyWithWhitespace);

      const result = keyServiceInstance.loadKey();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyPath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockKeyPath, "utf8");
      expect(result).toBe("test-secret-key-123");
    });

    it("should return empty string when file is empty", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue("");

      const result = keyServiceInstance.loadKey();

      expect(result).toBe("");
    });

    it("should throw ContextualError when file read fails", () => {
      const error = new Error("File not accessible");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      expect(() => keyServiceInstance.loadKey()).toThrow();
      expect(mockContextualError).toHaveBeenCalledWith(
        "Failed to load secret key file",
        error
      );
    });
  });

  describe("hasKey", () => {
    it("should return true when key file exists", () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = keyServiceInstance.hasKey();

      expect(result).toBe(true);
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyPath);
    });

    it("should return false when key file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = keyServiceInstance.hasKey();

      expect(result).toBe(false);
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyPath);
    });
  });

  describe("deleteKey", () => {
    it("should delete key file when it exists", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {});

      keyServiceInstance.deleteKey();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyPath);
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockKeyPath);
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `Secret key deleted from ${mockKeyPath}`
      );
    });

    it("should do nothing when key file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      keyServiceInstance.deleteKey();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockKeyPath);
      expect(mockFs.unlinkSync).not.toHaveBeenCalled();
      expect(mockLogger.debug).not.toHaveBeenCalled();
    });

    it("should throw ContextualError when file deletion fails", () => {
      const error = new Error("Permission denied");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {
        throw error;
      });

      expect(() => keyServiceInstance.deleteKey()).toThrow();
      expect(mockContextualError).toHaveBeenCalledWith(
        "Failed to delete secret key",
        error
      );
    });
  });

  describe("integration tests", () => {
    it("should handle complete workflow: save -> has -> load -> delete", () => {
      // Setup mocks for complete workflow
      mockFs.existsSync
        .mockReturnValueOnce(false) // Directory doesn't exist initially
        .mockReturnValueOnce(true) // File exists after save
        .mockReturnValueOnce(true) // File exists for hasKey
        .mockReturnValueOnce(true) // File exists for load
        .mockReturnValueOnce(true); // File exists for delete

      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => undefined);
      mockFs.readFileSync.mockReturnValue(mockSecretKey);
      mockFs.unlinkSync.mockImplementation(() => {});

      // Save key
      keyServiceInstance.saveKey(mockSecretKey);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockKeyPath,
        mockSecretKey,
        "utf8"
      );

      // Check if key exists
      const hasKey = keyServiceInstance.hasKey();
      expect(hasKey).toBe(true);

      // Load key
      const loadedKey = keyServiceInstance.loadKey();
      expect(loadedKey).toBe(mockSecretKey);

      // Delete key
      keyServiceInstance.deleteKey();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockKeyPath);
    });
  });
});

describe("keyService singleton", () => {
  it("should export a singleton instance", () => {
    expect(keyService).toBeInstanceOf(KeyService);
  });

  it("should have the same instance across imports", () => {
    const { keyService: keyService2 } = require("./key-service");
    expect(keyService).toBe(keyService2);
  });
});
