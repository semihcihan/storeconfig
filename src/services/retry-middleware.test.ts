import { createRetryMiddleware } from "./retry-middleware";
import { logger } from "../utils/logger";

// Mock the logger to avoid console output during tests
jest.mock("../utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock the rate limit helpers
jest.mock("../helpers/rate-limit-helpers", () => ({
  hasActiveRateLimits: jest.fn(),
  getRemainingRequests: jest.fn(),
}));

// Import the mocked functions
import {
  hasActiveRateLimits,
  getRemainingRequests,
} from "../helpers/rate-limit-helpers";

describe("RetryMiddleware", () => {
  let mockApiClient: any;
  let wrappedApi: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default mock implementations
    (hasActiveRateLimits as jest.Mock).mockReturnValue(false);
    (getRemainingRequests as jest.Mock).mockReturnValue(null);

    // Create a mock API client
    mockApiClient = {
      GET: jest.fn(),
      POST: jest.fn(),
    };

    // Create the wrapped API with retry middleware using minimal delays for testing
    wrappedApi = createRetryMiddleware(mockApiClient, {
      delayMs: 10, // Very short delay for testing
      maxAttempts: 3,
      rateLimitWaitMs: 10, // Very short rate limit wait for testing
      activeRateLimitWaitMs: 10, // Very short active rate limit wait for testing
    });
  });

  describe("Successful requests", () => {
    it("should pass through successful requests without retrying", async () => {
      const mockResponse = { data: "success" };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
      expect(mockApiClient.GET).toHaveBeenCalledWith("/test/endpoint");
    });
  });

  describe("Rate limit errors (429)", () => {
    it("should retry on 429 errors with exponential backoff", async () => {
      const rateLimitError = { status: 429, message: "Rate limit exceeded" };
      const successResponse = { data: "success" };

      // First two calls fail with rate limit, third succeeds
      mockApiClient.GET.mockRejectedValueOnce(rateLimitError)
        .mockRejectedValueOnce(rateLimitError)
        .mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Rate limit exceeded for GET /test/endpoint")
      );
    });

    it("should handle 429 errors when no rate limit info is available", async () => {
      const rateLimitError = { status: 429, message: "Rate limit exceeded" };
      const successResponse = { data: "success" };

      // Mock no rate limit information available
      (getRemainingRequests as jest.Mock).mockReturnValue(null);

      // First call fails with rate limit, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        rateLimitError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Rate limit exceeded for GET /test/endpoint (no rate limit info available)"
        )
      );
    });

    it("should handle 429 errors when rate limit info is available", async () => {
      const rateLimitError = { status: 429, message: "Rate limit exceeded" };
      const successResponse = { data: "success" };

      // Mock rate limit information available
      (getRemainingRequests as jest.Mock).mockReturnValue(5);

      // First call fails with rate limit, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        rateLimitError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Rate limit exceeded for GET /test/endpoint (5 remaining)"
        )
      );
    });

    it("should fail after max attempts", async () => {
      const rateLimitError = { status: 429, message: "Rate limit exceeded" };

      // All calls fail with rate limit
      mockApiClient.GET.mockRejectedValue(rateLimitError);

      await expect(wrappedApi.GET("/test/endpoint")).rejects.toEqual(
        rateLimitError
      );
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3); // Default maxAttempts
    });
  });

  describe("Server errors (5xx)", () => {
    it("should retry on 5xx errors", async () => {
      const serverError = { status: 500, message: "Internal server error" };
      const successResponse = { data: "success" };

      // First call fails with server error, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        serverError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });
  });

  describe("Client errors (4xx)", () => {
    it("should not retry on 4xx errors", async () => {
      const clientError = { status: 400, message: "Bad request" };

      mockApiClient.GET.mockRejectedValue(clientError);

      await expect(wrappedApi.GET("/test/endpoint")).rejects.toEqual(
        clientError
      );
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1); // No retry
    });
  });

  describe("Network errors", () => {
    it("should retry on network errors", async () => {
      const networkError = { code: "ECONNRESET", message: "Connection reset" };
      const successResponse = { data: "success" };

      // First call fails with network error, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        networkError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });
  });

  describe("Custom retry options", () => {
    it("should respect custom maxAttempts", async () => {
      const error = { status: 500, message: "Server error" };
      mockApiClient.GET.mockRejectedValue(error);

      const customWrappedApi = createRetryMiddleware(mockApiClient, {
        maxAttempts: 2,
      });

      await expect(customWrappedApi.GET("/test/endpoint")).rejects.toEqual(
        error
      );
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2); // Custom maxAttempts
    });

    it("should respect custom shouldRetry function", async () => {
      const error = { status: 400, message: "Bad request" };
      mockApiClient.GET.mockRejectedValue(error);

      const customWrappedApi = createRetryMiddleware(mockApiClient, {
        shouldRetry: () => true, // Retry everything
      });

      // Should retry even 4xx errors with custom shouldRetry
      await expect(customWrappedApi.GET("/test/endpoint")).rejects.toEqual(
        error
      );
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3); // Default maxAttempts
    });
  });

  describe("Proactive rate limit checking", () => {
    it("should wait when active rate limits are detected", async () => {
      const successResponse = { data: "success" };
      mockApiClient.GET.mockResolvedValue(successResponse);

      // Mock active rate limits
      (hasActiveRateLimits as jest.Mock).mockReturnValue(true);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Active rate limits detected for GET /test/endpoint"
        )
      );
    });

    it("should wait when endpoint has 0 remaining requests", async () => {
      const successResponse = { data: "success" };
      mockApiClient.GET.mockResolvedValue(successResponse);

      // Mock 0 remaining requests for this endpoint
      (getRemainingRequests as jest.Mock).mockReturnValue(0);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Rate limit reached for GET /test/endpoint")
      );
    });

    it("should warn when endpoint has low remaining requests", async () => {
      const successResponse = { data: "success" };
      mockApiClient.GET.mockResolvedValue(successResponse);

      // Mock low remaining requests for this endpoint
      (getRemainingRequests as jest.Mock).mockReturnValue(2);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Low rate limit remaining for GET /test/endpoint: 2 requests"
        )
      );
    });

    it("should proceed normally when no rate limit info is available", async () => {
      const successResponse = { data: "success" };
      mockApiClient.GET.mockResolvedValue(successResponse);

      // Mock no rate limit information available (default behavior)
      (hasActiveRateLimits as jest.Mock).mockReturnValue(false);
      (getRemainingRequests as jest.Mock).mockReturnValue(null);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });

  describe("Non-function properties", () => {
    it("should pass through non-function properties unchanged", () => {
      const mockApiClientWithProps = {
        GET: jest.fn(),
        someProperty: "value",
        someObject: { key: "value" },
      };

      const wrappedApi = createRetryMiddleware(mockApiClientWithProps);

      expect(wrappedApi.someProperty).toBe("value");
      expect(wrappedApi.someObject).toEqual({ key: "value" });
    });
  });
});
