import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { ContextualError, logger } from "@semihcihan/shared";
import ora from "ora";
import { trackJob } from "./job-polling-service";
import { apiClient } from "./api-client";

// Mock dependencies
jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
  ContextualError: jest.fn().mockImplementation((...args: any[]) => {
    const error = new Error(args[0]);
    (error as any).context = args[1];
    return error;
  }),
}));

jest.mock("./api-client", () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("ora");

const mockLogger = jest.mocked(logger);
const mockApiClient = jest.mocked(apiClient);
const mockOra = jest.mocked(ora);
const mockContextualError = jest.mocked(ContextualError);

describe("job-polling-service", () => {
  let mockSpinner: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock spinner
    mockSpinner = {
      start: jest.fn().mockReturnThis(),
      succeed: jest.fn().mockReturnThis(),
      fail: jest.fn().mockReturnThis(),
      warn: jest.fn().mockReturnThis(),
      info: jest.fn().mockReturnThis(),
      stop: jest.fn().mockReturnThis(),
      text: "",
    };

    mockOra.mockReturnValue(mockSpinner);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("trackJob", () => {
    const jobId = "test-job-123";

    it("should track job progress and succeed when completed", async () => {
      const mockJobStatus = {
        success: true,
        data: {
          jobId,
          status: "completed" as const,
          currentActionIndex: 2,
          currentAction: {
            type: "CREATE_IN_APP_PURCHASE",
            payload: { productId: "test" },
          },
          totalActions: 3,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:01:00Z",
        },
      };

      mockApiClient.get.mockResolvedValue({ data: mockJobStatus });

      await trackJob(jobId, mockSpinner);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/status/${jobId}`);
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );
    });

    it("should track job progress and fail when job fails", async () => {
      const mockJobStatus = {
        success: true,
        data: {
          jobId,
          status: "failed" as const,
          currentActionIndex: 1,
          currentAction: {
            type: "CREATE_IN_APP_PURCHASE",
            payload: { productId: "test" },
          },
          totalActions: 3,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:01:00Z",
        },
      };

      mockApiClient.get.mockResolvedValue({ data: mockJobStatus });

      await expect(trackJob(jobId, mockSpinner)).rejects.toThrow();

      expect(mockApiClient.get).toHaveBeenCalledWith(`/status/${jobId}`);
      expect(mockSpinner.fail).toHaveBeenCalledWith("Job failed");
      expect(mockContextualError).toHaveBeenCalledWith("Job failed", jobId);
    });

    it("should update spinner text when action index changes", async () => {
      let callCount = 0;
      const mockJobStatuses = [
        {
          success: true,
          data: {
            jobId,
            status: "processing" as const,
            currentActionIndex: 0,
            currentAction: {
              type: "CREATE_IN_APP_PURCHASE",
              payload: { productId: "test1" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
        {
          success: true,
          data: {
            jobId,
            status: "processing" as const,
            currentActionIndex: 1,
            currentAction: {
              type: "UPDATE_IN_APP_PURCHASE",
              payload: { productId: "test2" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
        {
          success: true,
          data: {
            jobId,
            status: "completed" as const,
            currentActionIndex: 2,
            currentAction: {
              type: "DELETE_IN_APP_PURCHASE",
              payload: { productId: "test3" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
      ];

      mockApiClient.get.mockImplementation(() => {
        const response = mockJobStatuses[callCount];
        callCount++;
        return Promise.resolve({ data: response } as any);
      });

      // Mock setTimeout to resolve immediately for testing
      jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      await trackJob(jobId, mockSpinner);

      expect(mockApiClient.get).toHaveBeenCalledTimes(3);
      expect(mockSpinner.text).toBe(
        "Processing action [3/3] DELETE_IN_APP_PURCHASE"
      );
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );

      // Restore setTimeout
      jest.restoreAllMocks();
    });

    it("should not update spinner text when action index doesn't change", async () => {
      let callCount = 0;
      const mockJobStatuses = [
        {
          success: true,
          data: {
            jobId,
            status: "processing" as const,
            currentActionIndex: 1,
            currentAction: {
              type: "CREATE_IN_APP_PURCHASE",
              payload: { productId: "test" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
        {
          success: true,
          data: {
            jobId,
            status: "processing" as const,
            currentActionIndex: 1, // Same index
            currentAction: {
              type: "CREATE_IN_APP_PURCHASE",
              payload: { productId: "test" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
        {
          success: true,
          data: {
            jobId,
            status: "completed" as const,
            currentActionIndex: 2,
            currentAction: {
              type: "UPDATE_IN_APP_PURCHASE",
              payload: { productId: "test2" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
      ];

      mockApiClient.get.mockImplementation(() => {
        const response = mockJobStatuses[callCount];
        callCount++;
        return Promise.resolve({ data: response } as any);
      });

      // Mock setTimeout to resolve immediately for testing
      jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      await trackJob(jobId, mockSpinner);

      expect(mockApiClient.get).toHaveBeenCalledTimes(3);
      // Should only update text twice: once for index 1, once for index 2
      expect(mockSpinner.text).toBe(
        "Processing action [3/3] UPDATE_IN_APP_PURCHASE"
      );
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );

      // Restore setTimeout
      jest.restoreAllMocks();
    });

    it("should handle pending status and continue polling", async () => {
      let callCount = 0;
      const mockJobStatuses = [
        {
          success: true,
          data: {
            jobId,
            status: "pending" as const,
            currentActionIndex: 0,
            currentAction: {
              type: "CREATE_IN_APP_PURCHASE",
              payload: { productId: "test" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
        {
          success: true,
          data: {
            jobId,
            status: "completed" as const,
            currentActionIndex: 2,
            currentAction: {
              type: "CREATE_IN_APP_PURCHASE",
              payload: { productId: "test" },
            },
            totalActions: 3,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:01:00Z",
          },
        },
      ];

      mockApiClient.get.mockImplementation(() => {
        const response = mockJobStatuses[callCount];
        callCount++;
        return Promise.resolve({ data: response } as any);
      });

      // Mock setTimeout to resolve immediately for testing
      jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      await trackJob(jobId, mockSpinner);

      expect(mockApiClient.get).toHaveBeenCalledTimes(2);
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );

      // Restore setTimeout
      jest.restoreAllMocks();
    });

    it("should handle API errors", async () => {
      const apiError = new Error("API Error");
      mockApiClient.get.mockRejectedValue(apiError);

      await expect(trackJob(jobId, mockSpinner)).rejects.toThrow("API Error");
    });

    it("should handle different action types correctly", async () => {
      const mockJobStatus = {
        success: true,
        data: {
          jobId,
          status: "completed" as const,
          currentActionIndex: 0,
          currentAction: { type: "UPDATE_APP_PRICE", payload: { price: 0.99 } },
          totalActions: 1,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:01:00Z",
        },
      };

      mockApiClient.get.mockResolvedValue({ data: mockJobStatus });

      await trackJob(jobId, mockSpinner);

      expect(mockSpinner.text).toBe("Processing action [1/1] UPDATE_APP_PRICE");
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );
    });

    it("should handle empty action type", async () => {
      const mockJobStatus = {
        success: true,
        data: {
          jobId,
          status: "completed" as const,
          currentActionIndex: 0,
          currentAction: { type: "", payload: {} },
          totalActions: 1,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:01:00Z",
        },
      };

      mockApiClient.get.mockResolvedValue({ data: mockJobStatus });

      await trackJob(jobId, mockSpinner);

      expect(mockSpinner.text).toBe("Processing action [1/1] ");
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );
    });

    it("should handle undefined action type", async () => {
      const mockJobStatus = {
        success: true,
        data: {
          jobId,
          status: "completed" as const,
          currentActionIndex: 0,
          currentAction: { type: undefined as any, payload: {} },
          totalActions: 1,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:01:00Z",
        },
      };

      mockApiClient.get.mockResolvedValue({ data: mockJobStatus });

      await trackJob(jobId, mockSpinner);

      expect(mockSpinner.text).toBe("Processing action [1/1] undefined");
      expect(mockSpinner.succeed).toHaveBeenCalledWith(
        "Job completed successfully"
      );
    });
  });
});
