import { createPaginationWrapper } from "./pagination-wrapper";
import { createRetryMiddleware } from "./retry-middleware";

// Mock the logger
jest.mock("../utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock the error handling
jest.mock("../helpers/error-handling-helpers", () => ({
  ContextualError: class extends Error {
    constructor(message: string, context?: any) {
      super(message);
      this.name = "ContextualError";
    }
  },
  isNotFoundError: jest.fn((error: any) => error?.status === 404),
  isRateLimitError: jest.fn((error: any) => error?.status === 429),
  isNotAuthorizedError: jest.fn((error: any) => error?.status === 401),
}));

// Mock auth functions
const mockGetAuthToken = jest.fn(() => "mock-token");
const mockForceTokenRefresh = jest.fn();

describe("Pagination + Retry Integration", () => {
  let mockApiClient: any;
  let retryWrappedClient: any;
  let paginationWrappedClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiClient = {
      GET: jest.fn(),
    };

    // Create retry middleware first
    retryWrappedClient = createRetryMiddleware(mockApiClient, {
      maxAttempts: 3,
      delayMs: 10, // Very short delay for tests
      getAuthToken: mockGetAuthToken,
      forceTokenRefresh: mockForceTokenRefresh,
    });

    // Then wrap with pagination
    paginationWrappedClient = createPaginationWrapper(retryWrappedClient);
  });

  describe("successful pagination with retry middleware", () => {
    it("should paginate successfully when all requests succeed", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockResponse2);

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });
  });

  describe("error handling during pagination", () => {
    it("should throw error when API call fails during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockError = new Error("API Error");

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockRejectedValueOnce(mockError);

      await expect(
        paginationWrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow("API Error");
    });

    it("should throw ContextualError when API returns error response during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockErrorResponse = {
        error: { message: "API Error", status: 500 },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockErrorResponse);

      await expect(
        paginationWrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow();
    });
  });

  describe("retry behavior during pagination", () => {
    it("should retry 5xx errors during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      // First page succeeds, second page fails with 500 then succeeds
      mockApiClient.GET.mockResolvedValueOnce(mockResponse1) // First page
        .mockResolvedValueOnce({
          error: { message: "Internal Server Error", status: 500 },
        }) // Second page - 500 error
        .mockResolvedValueOnce(mockResponse2); // Second page - retry success

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3);
    });

    it("should not retry 4xx errors during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };

      // First page succeeds, second page fails with 404 (not retryable)
      mockApiClient.GET.mockResolvedValueOnce(mockResponse1) // First page
        .mockResolvedValueOnce({
          error: { message: "Not Found", status: 404 },
        }); // Second page - 404 error

      await expect(
        paginationWrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow("Failed to paginate");

      // Should only try once for the second page (404 is not retryable)
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });

    it("should retry network errors during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      const networkError = new Error("Network Error") as any;
      networkError.code = "ECONNRESET";

      // First page succeeds, second page fails with network error then succeeds
      mockApiClient.GET.mockResolvedValueOnce(mockResponse1) // First page
        .mockRejectedValueOnce(networkError) // Second page - network error
        .mockResolvedValueOnce(mockResponse2); // Second page - retry success

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3);
    });
  });

  describe("authentication failures during pagination", () => {
    it("should handle 401 errors during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockAuthError = {
        error: { message: "Unauthorized", status: 401 },
      };

      mockApiClient.GET.mockResolvedValueOnce(mockResponse1) // First page
        .mockResolvedValueOnce(mockAuthError); // Second page - 401 error

      await expect(
        paginationWrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow("Failed to paginate");
    });
  });

  describe("complex pagination scenarios", () => {
    it("should handle mixed success/failure across multiple pages", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor2" } },
        },
      };
      const mockResponse3 = {
        data: {
          data: [{ id: 3 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      // First page succeeds, second page fails once then succeeds, third page succeeds
      mockApiClient.GET.mockResolvedValueOnce(mockResponse1) // First page - success
        .mockResolvedValueOnce({
          error: { message: "Temporary error", status: 500 },
        }) // Second page - 500 error
        .mockResolvedValueOnce(mockResponse2) // Second page - retry success
        .mockResolvedValueOnce(mockResponse3); // Third page - success

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(4);
    });
  });

  describe("edge cases", () => {
    it("should not paginate when using custom limits", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 50, nextCursor: "cursor1" } },
        },
      };

      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 50 } },
      });

      // Should not be paginated because limit 50 is not a default limit
      expect(result._isPaginated).toBeUndefined();
      expect(result.data.data).toEqual([{ id: 1 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should not paginate when response has no nextCursor", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await paginationWrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      // Should not be paginated because there's no nextCursor
      expect(result._isPaginated).toBeUndefined();
      expect(result.data.data).toEqual([{ id: 1 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });
  });
});
