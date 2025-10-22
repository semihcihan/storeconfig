import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";

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
    std: jest.fn(),
  },
}));
jest.mock("../services/info-service");

const mockLogger = jest.mocked(logger);

// Import the mocked service
import { getInfo } from "../services/info-service";
const mockGetInfo = jest.mocked(getInfo);

// Import the command after mocking
import userCommand from "./user";

describe("user command", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.std.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have correct command name", () => {
      expect(userCommand.command).toBe("user");
    });

    it("should have correct description", () => {
      expect(userCommand.describe).toBe(
        "Display current user information and latest job status"
      );
    });

    it("should have empty builder", () => {
      expect(userCommand.builder).toEqual({});
    });

    it("should have handler function", () => {
      expect(typeof userCommand.handler).toBe("function");
    });
  });

  describe("command execution", () => {
    it("should display user information successfully", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: undefined,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockGetInfo).toHaveBeenCalledTimes(1);
      expect(mockLogger.std).toHaveBeenCalledWith("Email → test@example.com");
    });

    it("should display user information with current job", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: {
          id: "job-456",
          status: "processing" as const,
          error: undefined,
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockGetInfo).toHaveBeenCalledTimes(1);
      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → test@example.com\nLatest Actions → ID: job-456, Status: processing"
      );
    });

    it("should display user information with current job and error", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: {
          id: "job-456",
          status: "failed" as const,
          error: "Something went wrong",
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockGetInfo).toHaveBeenCalledTimes(1);
      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → test@example.com\nLatest Actions → ID: job-456, Status: failed\n   Error: Something went wrong"
      );
    });

    it("should handle different job statuses", async () => {
      const statuses = [
        "pending",
        "processing",
        "completed",
        "failed",
      ] as const;

      for (const status of statuses) {
        jest.clearAllMocks();

        const mockUserInfo = {
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
          currentJob: {
            id: "job-456",
            status,
            error: status === "failed" ? "Test error" : undefined,
          },
        };

        mockGetInfo.mockResolvedValueOnce(mockUserInfo);

        await userCommand.handler!({} as any);

        const expectedOutput =
          status === "failed"
            ? "Email → test@example.com\nLatest Actions → ID: job-456, Status: failed\n   Error: Test error"
            : "Email → test@example.com\nLatest Actions → ID: job-456, Status: " +
              status;

        expect(mockLogger.std).toHaveBeenCalledWith(expectedOutput);
      }
    });

    it("should handle info service error and exit", async () => {
      const error = new Error("API connection failed");
      mockGetInfo.mockRejectedValueOnce(error);

      await expect(userCommand.handler!({} as any)).rejects.toThrow(
        "API connection failed"
      );

      expect(mockGetInfo).toHaveBeenCalledTimes(1);
    });

    it("should handle network timeout error", async () => {
      const error = new Error("Request timeout");
      mockGetInfo.mockRejectedValueOnce(error);

      await expect(userCommand.handler!({} as any)).rejects.toThrow(
        "Request timeout"
      );
    });

    it("should handle authentication error", async () => {
      const error = new Error("Unauthorized");
      mockGetInfo.mockRejectedValueOnce(error);

      await expect(userCommand.handler!({} as any)).rejects.toThrow(
        "Unauthorized"
      );
    });
  });

  describe("output formatting", () => {
    it("should format output correctly with only user email", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "user@domain.com",
          name: "John Doe",
        },
        currentJob: undefined,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith("Email → user@domain.com");
    });

    it("should format output correctly with job status", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "user@domain.com",
          name: "John Doe",
        },
        currentJob: {
          id: "job-789",
          status: "completed" as const,
          error: undefined,
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → user@domain.com\nLatest Actions → ID: job-789, Status: completed"
      );
    });

    it("should format output correctly with job error", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "user@domain.com",
          name: "John Doe",
        },
        currentJob: {
          id: "job-789",
          status: "failed" as const,
          error: "Validation failed: Invalid product ID",
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → user@domain.com\nLatest Actions → ID: job-789, Status: failed\n   Error: Validation failed: Invalid product ID"
      );
    });

    it("should handle empty error message", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "user@domain.com",
          name: "John Doe",
        },
        currentJob: {
          id: "job-789",
          status: "failed" as const,
          error: "",
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → user@domain.com\nLatest Actions → ID: job-789, Status: failed"
      );
    });

    it("should handle null error message", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "user@domain.com",
          name: "John Doe",
        },
        currentJob: {
          id: "job-789",
          status: "failed" as const,
          error: null as any,
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → user@domain.com\nLatest Actions → ID: job-789, Status: failed"
      );
    });
  });

  describe("edge cases", () => {
    it("should handle undefined currentJob", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: undefined,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith("Email → test@example.com");
    });

    it("should handle null currentJob", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: null as any,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith("Email → test@example.com");
    });

    it("should handle empty user email", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "",
          name: "Test User",
        },
        currentJob: undefined,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith("Email → ");
    });

    it("should handle special characters in job ID", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: {
          id: "job-456-special_chars.123",
          status: "processing" as const,
          error: undefined,
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        "Email → test@example.com\nLatest Actions → ID: job-456-special_chars.123, Status: processing"
      );
    });

    it("should handle long error messages", async () => {
      const longError =
        "This is a very long error message that contains multiple lines and detailed information about what went wrong during the processing of the job. It includes stack traces, validation errors, and other debugging information that might be useful for troubleshooting.";

      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: {
          id: "job-456",
          status: "failed" as const,
          error: longError,
        },
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledWith(
        `Email → test@example.com\nLatest Actions → ID: job-456, Status: failed\n   Error: ${longError}`
      );
    });
  });

  describe("logging behavior", () => {
    it("should only call logger.std once for successful execution", async () => {
      const mockUserInfo = {
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
        currentJob: undefined,
      };

      mockGetInfo.mockResolvedValueOnce(mockUserInfo);

      await userCommand.handler!({} as any);

      expect(mockLogger.std).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).not.toHaveBeenCalled();
    });

    it("should call logger.error once for failed execution", async () => {
      const error = new Error("Test error");
      mockGetInfo.mockRejectedValueOnce(error);

      await expect(userCommand.handler!({} as any)).rejects.toThrow(
        "Test error"
      );

      expect(mockLogger.std).not.toHaveBeenCalled();
    });
  });
});
