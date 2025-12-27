import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import os from "os";
import { logger } from "@semihcihan/shared";
import { UserService, userService } from "./user-service";
import { getInfo } from "./info-service";

jest.mock("fs");
jest.mock("path");
jest.mock("os");
jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
  },
}));
jest.mock("./info-service");

const mockFs = jest.mocked(fs);
const mockPath = jest.mocked(path);
const mockOs = jest.mocked(os);
const mockLogger = jest.mocked(logger);
const mockGetInfo = jest.mocked(getInfo);

describe("UserService", () => {
  let userServiceInstance: UserService;
  const mockUserPath = "/test/path/user";
  const mockUserDir = "/test/path";
  const mockEmail = "test@example.com";

  beforeEach(() => {
    jest.clearAllMocks();

    mockPath.dirname.mockReturnValue(mockUserDir);

    userServiceInstance = new UserService(mockUserPath);
  });

  describe("constructor", () => {
    it("should initialize with injected user path", () => {
      const testUserPath = "/custom/test/path";
      const service = new UserService(testUserPath);
      expect(service.getUserPath()).toBe(testUserPath);
    });

    it("should use default user path when no path provided", () => {
      mockOs.homedir.mockReturnValue("/home/user");
      mockPath.join.mockReturnValue("/home/user/.storeconfig/user");

      const service = new UserService();
      expect(service.getUserPath()).toBe("/home/user/.storeconfig/user");
      expect(mockOs.homedir).toHaveBeenCalled();
      expect(mockPath.join).toHaveBeenCalledWith(
        "/home/user",
        ".storeconfig",
        "user"
      );
    });
  });

  describe("getUserPath", () => {
    it("should return the user file path", () => {
      const result = userServiceInstance.getUserPath();
      expect(result).toBe(mockUserPath);
    });
  });

  describe("saveUser", () => {
    it("should save user data to file when directory exists", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.writeFileSync.mockImplementation(() => undefined);

      userServiceInstance.saveUser(mockEmail);

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserDir);
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockUserPath,
        mockEmail,
        "utf8"
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `User data saved to ${mockUserPath}`
      );
    });

    it("should create directory and save user data when directory does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => undefined);

      userServiceInstance.saveUser(mockEmail);

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserDir);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(mockUserDir, {
        recursive: true,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockUserPath,
        mockEmail,
        "utf8"
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `User data saved to ${mockUserPath}`
      );
    });

    it("should log error when directory creation fails", () => {
      const error = new Error("Permission denied");
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {
        throw error;
      });

      userServiceInstance.saveUser(mockEmail);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Failed to save user data",
        error
      );
    });

    it("should log error when file write fails", () => {
      const error = new Error("Disk full");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.writeFileSync.mockImplementation(() => {
        throw error;
      });

      userServiceInstance.saveUser(mockEmail);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Failed to save user data",
        error
      );
    });
  });

  describe("loadUser", () => {
    it("should return null when user file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = userServiceInstance.loadUser();

      expect(result).toBeNull();
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });

    it("should return email when file exists", () => {
      const emailWithWhitespace = `  ${mockEmail}  \n`;
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(emailWithWhitespace);

      const result = userServiceInstance.loadUser();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserPath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockUserPath, "utf8");
      expect(result).toBe(mockEmail);
    });

    it("should return trimmed email when file has whitespace", () => {
      const emailWithWhitespace = `  ${mockEmail}  \n`;
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(emailWithWhitespace);

      const result = userServiceInstance.loadUser();

      expect(result).toBe(mockEmail);
    });

    it("should return null when file read fails", () => {
      const error = new Error("File not accessible");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      const result = userServiceInstance.loadUser();

      expect(result).toBeNull();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Failed to load user data file",
        error
      );
    });
  });

  describe("hasUser", () => {
    it("should return true when user file exists", () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = userServiceInstance.hasUser();

      expect(result).toBe(true);
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserPath);
    });

    it("should return false when user file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = userServiceInstance.hasUser();

      expect(result).toBe(false);
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserPath);
    });
  });

  describe("deleteUser", () => {
    it("should delete user file when it exists", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {});

      userServiceInstance.deleteUser();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserPath);
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockUserPath);
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `User data deleted from ${mockUserPath}`
      );
    });

    it("should do nothing when user file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      userServiceInstance.deleteUser();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUserPath);
      expect(mockFs.unlinkSync).not.toHaveBeenCalled();
      expect(mockLogger.debug).not.toHaveBeenCalled();
    });

    it("should log error when file deletion fails", () => {
      const error = new Error("Permission denied");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {
        throw error;
      });

      userServiceInstance.deleteUser();

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Failed to delete user data file",
        error
      );
    });
  });

  describe("ensureUserCached", () => {
    it("should return early when user already exists", async () => {
      mockFs.existsSync.mockReturnValue(true);

      await userServiceInstance.ensureUserCached();

      expect(mockGetInfo).not.toHaveBeenCalled();
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });

    it("should fetch and save user when user does not exist", async () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => undefined);
      mockGetInfo.mockResolvedValue({
        user: {
          id: "user-123",
          email: mockEmail,
          name: "Test User",
        },
        currentJob: undefined,
      });

      await userServiceInstance.ensureUserCached();

      expect(mockGetInfo).toHaveBeenCalled();
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockUserPath,
        mockEmail,
        "utf8"
      );
    });

    it("should handle errors gracefully when getInfo fails", async () => {
      const error = new Error("Network error");
      mockFs.existsSync.mockReturnValue(false);
      mockGetInfo.mockRejectedValue(error);

      await userServiceInstance.ensureUserCached();

      expect(mockGetInfo).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Could not fetch user info for caching",
        error
      );
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });

    it("should handle errors gracefully when saveUser fails", async () => {
      const error = new Error("Write error");
      mockFs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => {
        throw error;
      });
      mockGetInfo.mockResolvedValue({
        user: {
          id: "user-123",
          email: mockEmail,
          name: "Test User",
        },
        currentJob: undefined,
      });

      await userServiceInstance.ensureUserCached();

      expect(mockGetInfo).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Failed to save user data",
        error
      );
    });
  });

  describe("integration tests", () => {
    it("should handle complete workflow: save -> has -> load -> delete", () => {
      mockFs.existsSync
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

      mockFs.mkdirSync.mockImplementation(() => undefined);
      mockFs.writeFileSync.mockImplementation(() => undefined);
      mockFs.readFileSync.mockReturnValue(mockEmail);
      mockFs.unlinkSync.mockImplementation(() => {});

      userServiceInstance.saveUser(mockEmail);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockUserPath,
        mockEmail,
        "utf8"
      );

      const hasUser = userServiceInstance.hasUser();
      expect(hasUser).toBe(true);

      const loadedEmail = userServiceInstance.loadUser();
      expect(loadedEmail).toBe(mockEmail);

      userServiceInstance.deleteUser();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockUserPath);
    });
  });
});

describe("userService singleton", () => {
  it("should export a singleton instance", () => {
    expect(userService).toBeInstanceOf(UserService);
  });

  it("should have the same instance across imports", () => {
    const { userService: userService2 } = require("./user-service");
    expect(userService).toBe(userService2);
  });
});
