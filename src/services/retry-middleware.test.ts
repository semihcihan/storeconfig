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

describe("RetryMiddleware", () => {
  let mockApiClient: any;
  let wrappedApi: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create a mock API client
    mockApiClient = {
      GET: jest.fn(),
      POST: jest.fn(),
    };

    // Create the wrapped API with retry middleware using minimal delays for testing
    wrappedApi = createRetryMiddleware(mockApiClient, {
      delayMs: 10, // Very short delay for testing
      maxAttempts: 3,
      rateLimitDelayMs: [10, 30, 60], // Progressive delays for testing
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

      // First call fails with rate limit, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        rateLimitError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Rate limit exceeded for GET /test/endpoint")
      );
    });

    it("should handle Apple API error structure with errors array", async () => {
      const appleApiError = {
        errors: [
          {
            status: "429",
            code: "RATE_LIMIT_EXCEEDED",
            title: "The request rate limit has been reached.",
            detail:
              "We've received too many requests for this API. Please wait and try again or slow down your request rate.",
          },
        ],
      };
      const successResponse = { data: "success" };

      // First call fails with Apple API error structure, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        appleApiError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Rate limit exceeded for GET /test/endpoint")
      );
    });

    it("should handle openapi-fetch response with error property", async () => {
      const appleApiError = {
        errors: [
          {
            status: "429",
            code: "RATE_LIMIT_EXCEEDED",
            title: "The request rate limit has been reached.",
            detail:
              "We've received too many requests for this API. Please wait and try again or slow down your request rate.",
          },
        ],
      };
      const errorResponse = { data: null, error: appleApiError };
      const successResponse = { data: "success" };

      // First call returns response with error property, second succeeds
      mockApiClient.GET.mockResolvedValueOnce(
        errorResponse
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Rate limit exceeded for GET /test/endpoint")
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

    it("should use progressive waiting for rate limit errors", async () => {
      const rateLimitError = { status: 429, message: "Rate limit exceeded" };
      const successResponse = { data: "success" };

      // First two calls fail with rate limit, third succeeds
      mockApiClient.GET.mockRejectedValueOnce(rateLimitError)
        .mockRejectedValueOnce(rateLimitError)
        .mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3);

      // Verify the warning messages show the correct wait times
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("waiting 0.01s before retry (attempt 1)")
      );
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("waiting 0.03s before retry (attempt 2)")
      );
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

    it("should not retry on 404 errors (handled by isNotFoundError)", async () => {
      const notFoundError = {
        errors: [
          {
            status: "404",
            code: "NOT_FOUND",
            title: "The specified resource does not exist",
            detail:
              "There is no resource of type 'subscriptionAvailabilities' with id '123'",
          },
        ],
      };

      mockApiClient.GET.mockRejectedValue(notFoundError);

      await expect(wrappedApi.GET("/test/endpoint")).rejects.toEqual(
        notFoundError
      );
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1); // No retry
    });

    it("should not retry on 404 errors in openapi-fetch response format", async () => {
      const notFoundError = {
        errors: [
          {
            status: "404",
            code: "NOT_FOUND",
            title: "The specified resource does not exist",
            detail:
              "There is no resource of type 'subscriptionAvailabilities' with id '123'",
          },
        ],
      };
      const errorResponse = { data: null, error: notFoundError };

      mockApiClient.GET.mockResolvedValue(errorResponse);

      const result = await wrappedApi.GET("/test/endpoint");
      expect(result).toEqual(errorResponse);
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

    it("should retry on undici connection timeout errors", async () => {
      const undiciTimeoutError = {
        code: "UND_ERR_CONNECT_TIMEOUT",
        message: "Connect Timeout Error",
      };
      const successResponse = { data: "success" };

      // First call fails with undici timeout error, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        undiciTimeoutError
      ).mockResolvedValueOnce(successResponse);

      const result = await wrappedApi.GET("/test/endpoint");

      expect(result).toBe(successResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });

    it("should retry on fetch failed errors", async () => {
      const fetchFailedError = {
        message: "fetch failed",
        cause: { code: "UND_ERR_CONNECT_TIMEOUT" },
      };
      const successResponse = { data: "success" };

      // First call fails with fetch failed error, second succeeds
      mockApiClient.GET.mockRejectedValueOnce(
        fetchFailedError
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
