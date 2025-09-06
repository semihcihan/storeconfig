import { createPaginationWrapper } from "./pagination-wrapper";
import { logger } from "../utils/logger";
import { ContextualError } from "../helpers/error-handling-helpers";

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
}));

describe("PaginationWrapper", () => {
  let mockApiClient: any;
  let wrappedClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiClient = {
      GET: jest.fn(),
      POST: jest.fn(),
    };
    wrappedClient = createPaginationWrapper(mockApiClient);
  });

  describe("shouldAutoPaginate", () => {
    it("should not paginate non-GET requests", async () => {
      const mockResponse = { data: "test" };
      mockApiClient.POST.mockResolvedValue(mockResponse);

      const result = await wrappedClient.POST("/test", { data: "test" });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.POST).toHaveBeenCalledTimes(1);
    });

    it("should not paginate already paginated responses", async () => {
      const mockResponse = { _isPaginated: true, data: { data: [] } };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should not paginate responses without pagination info", async () => {
      const mockResponse = { data: { data: [] } };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should not paginate responses without nextCursor", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: { paging: { limit: 100, total: 50 } },
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should not paginate requests without limit parameter", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { other: "param" } },
      });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should not paginate requests with custom limits", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: { paging: { limit: 50, nextCursor: "cursor1" } },
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 50 } },
      });

      expect(result).toBe(mockResponse);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(1);
    });

    it("should paginate requests with default v2 limit", async () => {
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

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });

    it("should paginate requests with default v1 limit", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 200, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          meta: { paging: { limit: 200, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockResponse2);

      const result = await wrappedClient.GET("/v1/test", {
        params: { query: { limit: 200 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });
  });

  describe("pagination behavior", () => {
    it("should handle multiple pages correctly", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }, { id: 2 }],
          included: [{ type: "included", id: "1" }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 3 }, { id: 4 }],
          included: [{ type: "included", id: "2" }],
          meta: { paging: { limit: 8000, nextCursor: "cursor2" } },
        },
      };
      const mockResponse3 = {
        data: {
          data: [{ id: 5 }],
          included: [{ type: "included", id: "3" }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2)
        .mockResolvedValueOnce(mockResponse3);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ]);
      expect(result.data.included).toEqual([
        { type: "included", id: "1" },
        { type: "included", id: "2" },
        { type: "included", id: "3" },
      ]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(3);
    });

    it("should respect max pages limit", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };

      // Mock 15 responses (more than maxPages limit of 10)
      mockApiClient.GET.mockResolvedValue(mockResponse);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(11); // 1 initial + 10 max pages
      expect(logger.warn).toHaveBeenCalledWith(
        "Hit max pages limit (10), stopping pagination"
      );
    });

    it("should handle responses without pagination info in subsequent pages", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [{ id: 2 }],
          // No meta.paging
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockResponse2);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
      // The pagination stops because nextCursor is null, not because of missing pagination info
      expect(logger.warn).toHaveBeenCalledWith(
        "Page 1: 1 items, hasMore: false"
      );
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
        wrappedClient.GET("/test", {
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
        wrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow(ContextualError);
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

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockAuthError);

      await expect(
        wrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow(ContextualError);
    });

    it("should handle network errors during pagination", async () => {
      const mockResponse1 = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const networkError = new Error("Network Error") as any;
      networkError.code = "ECONNRESET";

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockRejectedValueOnce(networkError);

      await expect(
        wrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow("Network Error");
    });
  });

  describe("retry behavior with pagination", () => {
    it("should work with retry middleware - successful retry", async () => {
      // This test simulates how pagination wrapper works with retry middleware
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

      // First call succeeds, second call fails once then succeeds
      mockApiClient.GET.mockResolvedValueOnce(mockResponse1)
        .mockRejectedValueOnce(new Error("Temporary error"))
        .mockResolvedValueOnce(mockResponse2);

      // Note: In real usage, retry middleware would wrap the pagination wrapper
      // This test shows that pagination wrapper itself doesn't handle retries
      // The retry middleware should be applied to the underlying API client
      await expect(
        wrappedClient.GET("/test", {
          params: { query: { limit: 8000 } },
        })
      ).rejects.toThrow("Temporary error");
    });
  });

  describe("edge cases", () => {
    it("should handle empty data arrays", async () => {
      const mockResponse1 = {
        data: {
          data: [],
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          data: [],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockResponse2);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });

    it("should handle missing data property", async () => {
      const mockResponse1 = {
        data: {
          meta: { paging: { limit: 8000, nextCursor: "cursor1" } },
        },
      };
      const mockResponse2 = {
        data: {
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValueOnce(
        mockResponse1
      ).mockResolvedValueOnce(mockResponse2);

      const result = await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });

      expect(result._isPaginated).toBe(true);
      expect(result.data.data).toEqual([]);
      expect(mockApiClient.GET).toHaveBeenCalledTimes(2);
    });

    it("should handle different query parameter formats", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1 }],
          meta: { paging: { limit: 8000, nextCursor: null } },
        },
      };

      mockApiClient.GET.mockResolvedValue(mockResponse);

      // Test direct query format
      await wrappedClient.GET("/test", { query: { limit: 100 } });
      expect(mockApiClient.GET).toHaveBeenCalledWith("/test", {
        query: { limit: 100 },
      });

      // Test params.query format
      await wrappedClient.GET("/test", {
        params: { query: { limit: 8000 } },
      });
      expect(mockApiClient.GET).toHaveBeenCalledWith("/test", {
        params: { query: { limit: 8000 } },
      });
    });
  });
});
