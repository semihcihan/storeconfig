import { withAuthRetry } from "./auth-interceptor";
import { logger } from "../utils/logger";

// Mock the logger
jest.mock("../utils/logger");

const mockLogger = logger as jest.Mocked<typeof logger>;

describe("Auth Interceptor", () => {
  const mockGetAuthToken = jest.fn();
  const mockForceTokenRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.warn = jest.fn();
    mockGetAuthToken.mockReturnValue("mock-token");
    mockForceTokenRefresh.mockReturnValue("refreshed-token");
  });

  it("should return successful result without retry", async () => {
    const apiCall = jest.fn().mockResolvedValue("success");

    const result = await withAuthRetry(
      apiCall,
      0,
      mockGetAuthToken,
      mockForceTokenRefresh
    );

    expect(result).toBe("success");
    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(mockForceTokenRefresh).not.toHaveBeenCalled();
  });

  it("should retry once on 401 error and succeed", async () => {
    const apiCall = jest
      .fn()
      .mockRejectedValueOnce({
        status: 401,
        errors: [{ status: 401, code: "NOT_AUTHORIZED" }],
      })
      .mockResolvedValueOnce("success");

    const result = await withAuthRetry(
      apiCall,
      0,
      mockGetAuthToken,
      mockForceTokenRefresh
    );

    expect(result).toBe("success");
    expect(apiCall).toHaveBeenCalledTimes(2);
    expect(mockForceTokenRefresh).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      "Authentication failed, refreshing token and retrying once"
    );
  });

  it("should not retry on non-401 errors", async () => {
    const apiCall = jest.fn().mockRejectedValue({
      status: 500,
      message: "Internal server error",
    });

    try {
      await withAuthRetry(apiCall, 0, mockGetAuthToken, mockForceTokenRefresh);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toEqual({
        status: 500,
        message: "Internal server error",
      });
    }

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(mockForceTokenRefresh).not.toHaveBeenCalled();
  });

  it("should not retry more than once on 401 errors", async () => {
    const apiCall = jest.fn().mockRejectedValue({
      status: 401,
      errors: [{ status: 401, code: "NOT_AUTHORIZED" }],
    });

    try {
      await withAuthRetry(apiCall, 0, mockGetAuthToken, mockForceTokenRefresh);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toEqual({
        status: 401,
        errors: [{ status: 401, code: "NOT_AUTHORIZED" }],
      });
    }

    expect(apiCall).toHaveBeenCalledTimes(2); // Initial call + 1 retry
    expect(mockForceTokenRefresh).toHaveBeenCalledTimes(1);
  });
});
