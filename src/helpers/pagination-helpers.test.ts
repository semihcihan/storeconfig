import { jest } from "@jest/globals";
import { paginateV2, paginateV1 } from "./pagination-helpers";
import { api } from "../services/api";
import { logger } from "../utils/logger";
import { throwFormattedError } from "./error-handling-helpers";

// Mock dependencies
jest.mock("../services/api");
jest.mock("../utils/logger");
jest.mock("./error-handling-helpers");

const MockApi = api as any;
const MockLogger = logger as any;
const MockThrowFormattedError = throwFormattedError as any;

describe("pagination-helpers", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    MockThrowFormattedError.mockImplementation((prefix: string, error: any) => {
      throw new Error(`${prefix}: ${error.message || "Unknown error"}`);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("paginateV2", () => {
    it("should paginate through all pages with cursor", async () => {
      const mockResponses = [
        {
          data: {
            data: [
              { id: "1", name: "Item 1" },
              { id: "2", name: "Item 2" },
            ],
            meta: {
              paging: {
                nextCursor: "cursor-1",
              },
            },
          },
          error: null,
        },
        {
          data: {
            data: [
              { id: "3", name: "Item 3" },
              { id: "4", name: "Item 4" },
            ],
            meta: {
              paging: {
                nextCursor: "cursor-2",
              },
            },
          },
          error: null,
        },
        {
          data: {
            data: [{ id: "5", name: "Item 5" }],
            meta: {
              paging: {
                nextCursor: undefined,
              },
            },
          },
          error: null,
        },
      ];

      MockApi.GET.mockResolvedValueOnce(mockResponses[0]);
      MockApi.GET.mockResolvedValueOnce(mockResponses[1]);
      MockApi.GET.mockResolvedValueOnce(mockResponses[2]);

      const result = await paginateV2(
        "test-endpoint",
        "test-id",
        { filter: "test" },
        2
      );

      expect(result).toEqual([
        { id: "1", name: "Item 1" },
        { id: "2", name: "Item 2" },
        { id: "3", name: "Item 3" },
        { id: "4", name: "Item 4" },
        { id: "5", name: "Item 5" },
      ]);

      expect(MockApi.GET).toHaveBeenCalledTimes(3);
      expect(MockApi.GET).toHaveBeenNthCalledWith(1, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
          },
        },
      });
      expect(MockApi.GET).toHaveBeenNthCalledWith(2, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            cursor: "cursor-1",
          },
        },
      });
      expect(MockApi.GET).toHaveBeenNthCalledWith(3, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            cursor: "cursor-2",
          },
        },
      });
    });

    it("should handle single page response", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id");

      expect(result).toEqual([{ id: "1", name: "Item 1" }]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should handle empty response", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id");

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should handle response without meta.paging", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id");

      expect(result).toEqual([{ id: "1", name: "Item 1" }]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should handle response without data", async () => {
      const mockResponse = {
        data: null,
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id");

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should throw error when API returns error", async () => {
      const mockResponse = {
        data: null,
        error: { message: "API Error" },
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      await expect(paginateV2("test-endpoint", "test-id")).rejects.toThrow(
        "Failed to paginate test-endpoint: API Error"
      );

      expect(MockLogger.error).toHaveBeenCalledWith(
        'Failed to paginate test-endpoint: {"message":"API Error"}'
      );
      expect(MockThrowFormattedError).toHaveBeenCalledWith(
        "Failed to paginate test-endpoint",
        { message: "API Error" }
      );
    });

    it("should use default limit when not specified", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      await paginateV2("test-endpoint", "test-id");

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: 200, // Default limit from constants
          },
        },
      });
    });

    it("should handle custom parameters", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      await paginateV2(
        "test-endpoint",
        "test-id",
        {
          filter: "active",
          sort: "name",
          include: "localizations",
        },
        50
      );

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "active",
            sort: "name",
            include: "localizations",
            limit: 50,
          },
        },
      });
    });
  });

  describe("paginateV1", () => {
    it("should paginate through all pages with offset", async () => {
      const mockResponses = [
        {
          data: {
            data: [
              { id: "1", name: "Item 1" },
              { id: "2", name: "Item 2" },
            ],
          },
          error: null,
        },
        {
          data: {
            data: [
              { id: "3", name: "Item 3" },
              { id: "4", name: "Item 4" },
            ],
          },
          error: null,
        },
        {
          data: {
            data: [{ id: "5", name: "Item 5" }], // Only 1 item, less than limit of 2
          },
          error: null,
        },
      ];

      MockApi.GET.mockResolvedValueOnce(mockResponses[0]);
      MockApi.GET.mockResolvedValueOnce(mockResponses[1]);
      MockApi.GET.mockResolvedValueOnce(mockResponses[2]);

      const result = await paginateV1(
        "test-endpoint",
        "test-id",
        { filter: "test" },
        2
      );

      expect(result).toEqual([
        { id: "1", name: "Item 1" },
        { id: "2", name: "Item 2" },
        { id: "3", name: "Item 3" },
        { id: "4", name: "Item 4" },
        { id: "5", name: "Item 5" },
      ]);

      expect(MockApi.GET).toHaveBeenCalledTimes(3);
      expect(MockApi.GET).toHaveBeenNthCalledWith(1, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            offset: 0,
          },
        },
      });
      expect(MockApi.GET).toHaveBeenNthCalledWith(2, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            offset: 2,
          },
        },
      });
      expect(MockApi.GET).toHaveBeenNthCalledWith(3, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            offset: 4,
          },
        },
      });
      expect(MockApi.GET).toHaveBeenNthCalledWith(3, "test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "test",
            limit: 2,
            offset: 4,
          },
        },
      });
    });

    it("should handle single page response", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }], // Only 1 item, less than default limit
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV1("test-endpoint", "test-id");

      expect(result).toEqual([{ id: "1", name: "Item 1" }]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should handle empty response", async () => {
      const mockResponse = {
        data: {
          data: [],
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV1("test-endpoint", "test-id");

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should handle response without data", async () => {
      const mockResponse = {
        data: null,
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV1("test-endpoint", "test-id");

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledTimes(1);
    });

    it("should throw error when API returns error", async () => {
      const mockResponse = {
        data: null,
        error: { message: "API Error" },
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      await expect(paginateV1("test-endpoint", "test-id")).rejects.toThrow(
        "Failed to paginate test-endpoint: API Error"
      );

      expect(MockLogger.error).toHaveBeenCalledWith(
        'Failed to paginate test-endpoint: {"message":"API Error"}'
      );
      expect(MockThrowFormattedError).toHaveBeenCalledWith(
        "Failed to paginate test-endpoint",
        { message: "API Error" }
      );
    });

    it("should use default limit when not specified", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);
      MockApi.GET.mockResolvedValueOnce({ data: { data: [] }, error: null });

      await paginateV1("test-endpoint", "test-id");

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: 200, // Default limit from constants
            offset: 0,
          },
        },
      });
    });

    it("should handle custom parameters", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);
      MockApi.GET.mockResolvedValueOnce({ data: { data: [] }, error: null });

      await paginateV1(
        "test-endpoint",
        "test-id",
        {
          filter: "active",
          sort: "name",
          include: "localizations",
        },
        50
      );

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            filter: "active",
            sort: "name",
            include: "localizations",
            limit: 50,
            offset: 0,
          },
        },
      });
    });

    it("should stop when response has fewer items than limit", async () => {
      const mockResponses = [
        {
          data: {
            data: [
              { id: "1", name: "Item 1" },
              { id: "2", name: "Item 2" },
            ],
          },
          error: null,
        },
        {
          data: {
            data: [{ id: "3", name: "Item 3" }], // Only 1 item, less than limit of 2
          },
          error: null,
        },
      ];

      MockApi.GET.mockResolvedValueOnce(mockResponses[0]);
      MockApi.GET.mockResolvedValueOnce(mockResponses[1]);

      const result = await paginateV1("test-endpoint", "test-id", {}, 2);

      expect(result).toEqual([
        { id: "1", name: "Item 1" },
        { id: "2", name: "Item 2" },
        { id: "3", name: "Item 3" },
      ]);

      expect(MockApi.GET).toHaveBeenCalledTimes(2);
    });
  });

  describe("edge cases", () => {
    it("should handle very large limit in paginateV2", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      await paginateV2("test-endpoint", "test-id", {}, 1000);

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: 1000,
          },
        },
      });
    });

    it("should handle very large limit in paginateV1", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Item 1" }],
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);
      MockApi.GET.mockResolvedValueOnce({ data: { data: [] }, error: null });

      await paginateV1("test-endpoint", "test-id", {}, 1000);

      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: 1000,
            offset: 0,
          },
        },
      });
    });

    it("should handle zero limit", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id", {}, 0);

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: 0,
          },
        },
      });
    });

    it("should handle negative limit", async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: {
            paging: {
              nextCursor: undefined,
            },
          },
        },
        error: null,
      };

      MockApi.GET.mockResolvedValueOnce(mockResponse);

      const result = await paginateV2("test-endpoint", "test-id", {}, -1);

      expect(result).toEqual([]);
      expect(MockApi.GET).toHaveBeenCalledWith("test-endpoint", {
        params: {
          path: { id: "test-id" },
          query: {
            limit: -1,
          },
        },
      });
    });
  });
});
