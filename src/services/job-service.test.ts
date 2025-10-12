import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logger } from "@semihcihan/shared";
import inquirer from "inquirer";
import ora from "ora";
import { createJob } from "./job-service";
import { getInfo } from "./info-service";
import { apiClient } from "./api-client";

// Mock dependencies
jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("./info-service");
jest.mock("./api-client", () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("inquirer");
jest.mock("ora");

const mockLogger = jest.mocked(logger);
const mockGetInfo = jest.mocked(getInfo);
const mockApiClient = jest.mocked(apiClient);
const mockInquirer = jest.mocked(inquirer);
const mockOra = jest.mocked(ora);

describe("job-service", () => {
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

  describe("createJob", () => {
    const mockPlan = [
      { type: "CREATE_IN_APP_PURCHASE", payload: { productId: "test" } },
    ];
    const mockCurrentState = { appId: "123456789" };
    const mockDesiredState = { appId: "123456789", inAppPurchases: [] };

    describe("when no ongoing job exists", () => {
      beforeEach(() => {
        mockGetInfo.mockResolvedValue({
          currentJob: undefined,
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
      });

      it("should create a new job when user confirms", async () => {
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
        mockApiClient.post.mockResolvedValue({
          data: { data: "job-123" },
        });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toEqual({ jobId: "job-123", newJobCreated: true });
        expect(mockGetInfo).toHaveBeenCalled();
        expect(mockInquirer.prompt).toHaveBeenCalledWith([
          {
            type: "confirm",
            name: "confirmed",
            message: "Do you want to proceed with applying these changes?",
            default: false,
          },
        ]);
        expect(mockSpinner.start).toHaveBeenCalledWith("Processing actions...");
        expect(mockApiClient.post).toHaveBeenCalledWith("/apply", {
          plan: mockPlan,
          currentState: mockCurrentState,
          desiredState: mockDesiredState,
          dryRun: false,
        });
        expect(mockLogger.warn).toHaveBeenCalled();
      });

      it("should create a new job with dryRun=true when specified", async () => {
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
        mockApiClient.post.mockResolvedValue({
          data: { data: "job-123" },
        });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          true,
          mockSpinner
        );

        expect(result).toEqual({ jobId: "job-123", newJobCreated: true });
        expect(mockApiClient.post).toHaveBeenCalledWith("/apply", {
          plan: mockPlan,
          currentState: mockCurrentState,
          desiredState: mockDesiredState,
          dryRun: true,
        });
      });

      it("should return null when user cancels", async () => {
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: false });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toBeNull();
        expect(mockLogger.warn).toHaveBeenCalledWith(
          "Operation cancelled by user"
        );
        expect(mockApiClient.post).not.toHaveBeenCalled();
      });

      it("should handle API errors", async () => {
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
        const apiError = new Error("API Error");
        mockApiClient.post.mockRejectedValue(apiError);

        await expect(
          createJob(
            mockPlan,
            mockCurrentState,
            mockDesiredState,
            false,
            mockSpinner
          )
        ).rejects.toThrow("API Error");
      });
    });

    describe("when ongoing job exists", () => {
      beforeEach(() => {
        mockGetInfo.mockResolvedValue({
          currentJob: {
            id: "ongoing-job-123",
            status: "processing",
          },
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
      });

      it("should handle ongoing job when user chooses to watch", async () => {
        mockInquirer.prompt.mockResolvedValueOnce({ watchOngoing: true });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toEqual({
          jobId: "ongoing-job-123",
          newJobCreated: false,
        });
        expect(mockInquirer.prompt).toHaveBeenCalled();
        expect(mockSpinner.start).toHaveBeenCalledWith(
          "Tracking progress of ongoing actions with ID: ongoing-job-123"
        );
        expect(mockApiClient.post).not.toHaveBeenCalled();
      });

      it("should return null when user chooses not to watch ongoing job", async () => {
        mockInquirer.prompt
          .mockResolvedValueOnce({ watchOngoing: false })
          .mockResolvedValueOnce({ confirmed: false });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toBeNull();
        expect(mockLogger.warn).toHaveBeenCalledWith(
          "Operation cancelled by user - cannot create new actions while already processing actions"
        );
        expect(mockApiClient.post).not.toHaveBeenCalled();
      });

      it("should handle pending status as ongoing job", async () => {
        mockGetInfo.mockResolvedValue({
          currentJob: {
            id: "pending-job-123",
            status: "pending",
          },
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
        mockInquirer.prompt.mockResolvedValueOnce({ watchOngoing: true });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toEqual({
          jobId: "pending-job-123",
          newJobCreated: false,
        });
      });

      it("should not treat completed job as ongoing", async () => {
        mockGetInfo.mockResolvedValue({
          currentJob: {
            id: "completed-job-123",
            status: "completed",
          },
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
        mockApiClient.post.mockResolvedValue({
          data: { data: "new-job-123" },
        });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toEqual({ jobId: "new-job-123", newJobCreated: true });
        expect(mockApiClient.post).toHaveBeenCalled();
      });

      it("should not treat failed job as ongoing", async () => {
        mockGetInfo.mockResolvedValue({
          currentJob: {
            id: "failed-job-123",
            status: "failed",
          },
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
        mockInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
        mockApiClient.post.mockResolvedValue({
          data: { data: "new-job-123" },
        });

        const result = await createJob(
          mockPlan,
          mockCurrentState,
          mockDesiredState,
          false,
          mockSpinner
        );

        expect(result).toEqual({ jobId: "new-job-123", newJobCreated: true });
        expect(mockApiClient.post).toHaveBeenCalled();
      });
    });

    describe("error handling", () => {
      it("should handle getInfo errors", async () => {
        const infoError = new Error("Info service error");
        mockGetInfo.mockRejectedValue(infoError);

        await expect(
          createJob(
            mockPlan,
            mockCurrentState,
            mockDesiredState,
            false,
            mockSpinner
          )
        ).rejects.toThrow("Info service error");
      });

      it("should handle inquirer errors", async () => {
        mockGetInfo.mockResolvedValue({
          currentJob: undefined,
          user: {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
          },
        });
        const inquirerError = new Error("Inquirer error");
        mockInquirer.prompt.mockRejectedValue(inquirerError);

        await expect(
          createJob(
            mockPlan,
            mockCurrentState,
            mockDesiredState,
            false,
            mockSpinner
          )
        ).rejects.toThrow("Inquirer error");
      });
    });
  });
});
