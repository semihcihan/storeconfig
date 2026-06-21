import {
  createLoggingWrapper,
  logStoredBigResponses,
  clearStoredBigResponses,
} from "./logging-middleware";
import { logger } from "@semihcihan/shared";

// Mock the logger
jest.mock("@semihcihan/shared", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

describe("Logging Wrapper", () => {
  let mockLogger: any;
  let mockApiClient: any;
  let wrappedClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger = logger as any;

    // Create a mock API client
    mockApiClient = {
      GET: jest.fn(),
      POST: jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    };

    // Create the wrapped client
    wrappedClient = createLoggingWrapper(mockApiClient, {
      logLevel: "info",
    });
  });

  describe("Successful requests", () => {
    it("should log request and response for successful calls", async () => {
      const mockResponse = {
        data: { items: ["item1", "item2"] },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps", {
        params: { query: { limit: 10 } },
      });

      // Verify request was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/\[[a-z0-9]+\] REQ GET \/v1\/apps/),
        expect.objectContaining({
          method: "GET",
          schemaPath: "/v1/apps",
          params: { query: { limit: 10 }, path: {} },
        })
      );

      // Verify response was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[[a-z0-9]+\] RES GET \/v1\/apps - 200 \(\d+ms\)/
        ),
        expect.objectContaining({
          method: "GET",
          schemaPath: "/v1/apps",
          status: 200,
          statusText: "OK",
        })
      );
    });

    it("should log paginated responses correctly", async () => {
      const mockResponse = {
        data: { items: ["item1", "item2"] },
        response: { status: 200, statusText: "OK" },
        _isPaginated: true,
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps", {
        params: { query: { limit: 10 } },
      });

      // Verify pagination info is logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[[a-z0-9]+\] RES GET \/v1\/apps - 200 \(\d+ms\)/
        ),
        expect.objectContaining({
          isPaginated: true,
        })
      );
    });
  });

  describe("Error responses", () => {
    it("should log error responses correctly", async () => {
      const mockErrorResponse = {
        error: { message: "Not found", status: 404 },
        response: { status: 404, statusText: "Not Found" },
      };
      mockApiClient.GET.mockResolvedValue(mockErrorResponse);

      await wrappedClient.GET("/v1/apps/invalid-id");

      // Verify error response was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[[a-z0-9]+\] RES GET \/v1\/apps\/invalid-id - 404 \(\d+ms\)/
        ),
        expect.objectContaining({
          method: "GET",
          schemaPath: "/v1/apps/invalid-id",
          status: 404,
          statusText: "Not Found",
          error: { message: "Not found", status: 404 },
        })
      );
    });
  });

  describe("Thrown errors", () => {
    it("should log thrown errors correctly", async () => {
      const networkError = new Error("Network error");
      mockApiClient.GET.mockRejectedValue(networkError);

      await expect(wrappedClient.GET("/v1/apps")).rejects.toThrow(
        "Network error"
      );

      // Verify error was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[[a-z0-9]+\] RES GET \/v1\/apps - THROWN ERROR \(\d+ms\)/
        ),
        expect.objectContaining({
          method: "GET",
          schemaPath: "/v1/apps",
          error: {
            name: "Error",
            message: "Network error",
            stack: expect.any(String),
          },
        })
      );
    });
  });

  describe("Request ID tracking", () => {
    it("should generate unique request IDs for each call", async () => {
      const mockResponse = {
        data: { items: [] },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");
      await wrappedClient.GET("/v1/apps");

      // Get all request logs
      const requestLogs = mockLogger.info.mock.calls.filter(
        (call: any) =>
          call[0].includes("REQ GET /v1/apps") && !call[0].includes("-")
      );

      expect(requestLogs).toHaveLength(2);

      // Extract request IDs
      const requestId1 = requestLogs[0][1].requestId;
      const requestId2 = requestLogs[1][1].requestId;

      expect(requestId1).toBeDefined();
      expect(requestId2).toBeDefined();
      expect(requestId1).not.toBe(requestId2);
    });
  });

  describe("Different HTTP methods", () => {
    it("should log POST requests correctly", async () => {
      const mockResponse = {
        data: { id: "123", name: "Test App" },
        response: { status: 201, statusText: "Created" },
      };
      mockApiClient.POST.mockResolvedValue(mockResponse);

      await wrappedClient.POST("/v1/apps", {
        body: { name: "Test App" },
      });

      // Verify request was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/\[[a-z0-9]+\] REQ POST \/v1\/apps/),
        expect.objectContaining({
          method: "POST",
          schemaPath: "/v1/apps",
          body: { name: "Test App" },
        })
      );

      // Verify response was logged
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(
          /\[[a-z0-9]+\] RES POST \/v1\/apps - 201 \(\d+ms\)/
        ),
        expect.objectContaining({
          method: "POST",
          schemaPath: "/v1/apps",
          status: 201,
          statusText: "Created",
        })
      );
    });

    it("should log PUT requests correctly", async () => {
      const mockResponse = {
        data: { id: "123", name: "Updated App" },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.PUT.mockResolvedValue(mockResponse);

      await wrappedClient.PUT("/v1/apps/123", {
        body: { name: "Updated App" },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/\[[a-z0-9]+\] REQ PUT \/v1\/apps\/123/),
        expect.objectContaining({
          method: "PUT",
          schemaPath: "/v1/apps/123",
        })
      );
    });

    it("should log DELETE requests correctly", async () => {
      const mockResponse = {
        response: { status: 204, statusText: "No Content" },
      };
      mockApiClient.DELETE.mockResolvedValue(mockResponse);

      await wrappedClient.DELETE("/v1/apps/123");

      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/\[[a-z0-9]+\] REQ DELETE \/v1\/apps\/123/),
        expect.objectContaining({
          method: "DELETE",
          schemaPath: "/v1/apps/123",
        })
      );
    });
  });

  describe("Request parameters", () => {
    it("should log query parameters correctly", async () => {
      const mockResponse = {
        data: { items: [] },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps", {
        params: {
          query: { limit: 50, offset: 10, sort: "name" },
        },
      });

      const requestLog = mockLogger.info.mock.calls.find(
        (call: any) =>
          call[0].includes("REQ GET /v1/apps") && !call[0].includes("-")
      );

      expect(requestLog[1]).toMatchObject({
        params: {
          query: { limit: 50, offset: 10, sort: "name" },
          path: {},
        },
      });
    });

    it("should log path parameters correctly", async () => {
      const mockResponse = {
        data: { id: "123" },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/{id}", {
        params: {
          path: { id: "123" },
          query: { include: "builds" },
        },
      });

      const requestLog = mockLogger.info.mock.calls.find(
        (call: any) =>
          call[0].includes("REQ GET /v1/apps/{id}") && !call[0].includes("-")
      );

      expect(requestLog[1]).toMatchObject({
        params: {
          path: { id: "123" },
          query: { include: "builds" },
        },
      });
    });
  });

  describe("Response data logging", () => {
    it("should log data length for array responses", async () => {
      const mockResponse = {
        data: ["item1", "item2", "item3"],
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).toMatchObject({
        dataLength: 3,
      });
    });

    it("should log data length for nested data responses", async () => {
      const mockResponse = {
        data: {
          data: ["item1", "item2"],
          meta: { total: 2 },
        },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).toMatchObject({
        dataLength: 2,
      });
    });

    it("should log object key count for non-array responses", async () => {
      const mockResponse = {
        data: { id: "123", name: "Test", status: "active" },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).toMatchObject({
        dataLength: 3,
      });
    });
  });

  describe("Error scenarios", () => {
    it("should handle errors without response object", async () => {
      const mockErrorResponse = {
        error: { message: "Internal server error" },
        // No response object
      };
      mockApiClient.GET.mockResolvedValue(mockErrorResponse);

      await wrappedClient.GET("/v1/apps");

      const errorLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- ERROR")
      );

      expect(errorLog[1]).toMatchObject({
        status: "ERROR",
        error: { message: "Internal server error" },
      });
    });

    it("should handle non-Error thrown objects", async () => {
      const thrownObject = {
        code: "NETWORK_ERROR",
        message: "Connection failed",
      };
      mockApiClient.GET.mockRejectedValue(thrownObject);

      await expect(wrappedClient.GET("/v1/apps")).rejects.toBe(thrownObject);

      const errorLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("THROWN ERROR")
      );

      expect(errorLog[1]).toMatchObject({
        error: { code: "NETWORK_ERROR", message: "Connection failed" },
      });
    });

    it("should handle string errors", async () => {
      const stringError = "Something went wrong";
      mockApiClient.GET.mockRejectedValue(stringError);

      await expect(wrappedClient.GET("/v1/apps")).rejects.toBe(stringError);

      const errorLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("THROWN ERROR")
      );

      expect(errorLog[1]).toMatchObject({
        error: expect.stringContaining("Something went wrong"),
      });
    });
  });

  describe("Logging configuration", () => {
    it("should use different log levels", async () => {
      const debugWrappedClient = createLoggingWrapper(mockApiClient, {
        logLevel: "debug",
      });

      const mockResponse = {
        data: { items: [] },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await debugWrappedClient.GET("/v1/apps");

      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it("should handle custom sensitive headers configuration", async () => {
      const customWrappedClient = createLoggingWrapper(mockApiClient, {
        logLevel: "info",
        sensitiveHeaders: ["authorization", "x-api-key"],
      });

      const mockResponse = {
        data: { items: [] },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await customWrappedClient.GET("/v1/apps");

      // The sensitive headers config is available but not used in the wrapper
      // since we don't have access to raw headers at this level
      expect(mockLogger.info).toHaveBeenCalled();
    });
  });

  describe("Body logging", () => {
    it("should log request body for POST requests", async () => {
      const mockResponse = {
        data: { id: "123", name: "Test App" },
        response: { status: 201, statusText: "Created" },
      };
      mockApiClient.POST.mockResolvedValue(mockResponse);

      const requestBody = { name: "Test App", bundleId: "com.test.app" };
      await wrappedClient.POST("/v1/apps", {
        body: requestBody,
      });

      const requestLog = mockLogger.info.mock.calls.find(
        (call: any) =>
          call[0].includes("REQ POST /v1/apps") && !call[0].includes("-")
      );

      expect(requestLog[1]).toMatchObject({
        body: { name: "Test App", bundleId: "com.test.app" },
      });
    });

    it("should include small response body in the main log for successful responses", async () => {
      const mockResponse = {
        data: { id: "123", name: "Test App", status: "active" },
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Small response body should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        dataLength: 3, // Object.keys count
        responseBody: { id: "123", name: "Test App", status: "active" },
      });
    });

    it("should log response body for error responses", async () => {
      const mockErrorResponse = {
        error: { message: "Not found", status: 404 },
        data: { error: "Resource not found", code: "NOT_FOUND" },
        response: { status: 404, statusText: "Not Found" },
      };
      mockApiClient.GET.mockResolvedValue(mockErrorResponse);

      await wrappedClient.GET("/v1/apps/invalid-id");

      const errorLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 404")
      );

      // Response body should be logged for errors as they're typically small and useful for debugging
      expect(errorLog[1]).toMatchObject({
        status: 404,
        statusText: "Not Found",
        error: { message: "Not found", status: 404 },
        responseBody: { error: "Resource not found", code: "NOT_FOUND" },
      });
    });

    it("should not include large response bodies in the log to reduce log size", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
        meta: { total: 1000 },
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Large response body should not be included in the log
      expect(responseLog[1]).not.toHaveProperty("responseBody");
      // But other details like dataLength should still be logged
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        dataLength: 2, // Object.keys count (items, meta)
      });
    });

    it("should not log body when data is undefined", async () => {
      const mockResponse = {
        response: { status: 204, statusText: "No Content" },
        // No data property
      };
      mockApiClient.DELETE.mockResolvedValue(mockResponse);

      await wrappedClient.DELETE("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 204")
      );

      expect(responseLog[1]).not.toHaveProperty("responseBody");
    });

    it("should include small string response body in the main log", async () => {
      const mockResponse = {
        data: "This is a string response",
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Small string response body should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: "This is a string response",
      });
    });

    it("should include small number response body in the main log", async () => {
      const mockResponse = {
        data: 42,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Small number response body should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
      });
      expect(responseLog[1]).toHaveProperty("responseBody");
    });

    it("should include small boolean response body in the main log", async () => {
      const mockResponse = {
        data: true,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Small boolean response body should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
      });
      expect(responseLog[1]).toHaveProperty("responseBody");
    });

    it("should include null response body in the main log", async () => {
      const mockResponse = {
        data: null,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Null response body should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: null,
      });
    });

    it("should include small complex nested JSON objects in the main log", async () => {
      const complexData = {
        app: {
          id: "123",
          attributes: {
            name: "Test App",
            bundleId: "com.test.app",
            primaryLocale: "en-US",
          },
        },
        relationships: {
          builds: {
            data: [
              { id: "build1", type: "builds" },
              { id: "build2", type: "builds" },
            ],
          },
        },
        meta: {
          paging: {
            total: 2,
            limit: 50,
          },
        },
      };
      const mockResponse = {
        data: complexData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Small complex nested object should be included in the main log
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        dataLength: 3, // Object.keys count (app, relationships, meta)
        responseBody: complexData,
      });
    });
  });

  describe("Response size-based logging", () => {
    it("should exclude response body when content-length header indicates large response (>10KB)", async () => {
      const largeData = {
        items: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          description: "A".repeat(100), // Make it large
        })),
      };
      const mockResponse = {
        data: largeData,
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-length": "15000", // 15KB > 10KB threshold
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Response body should not be included when content-length indicates it's large
      expect(responseLog[1]).not.toHaveProperty("responseBody");
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
      });
    });

    it("should include response body when content-length header indicates small response (<10KB)", async () => {
      const smallData = { id: "123", name: "Test App" };
      const mockResponse = {
        data: smallData,
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-length": "5000", // 5KB < 10KB threshold
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Response body should be included when content-length indicates it's small
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: smallData,
      });
    });

    it("should fall back to serialization when content-length header is missing", async () => {
      const smallData = { id: "123", name: "Test App" };
      const mockResponse = {
        data: smallData,
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            // No content-length header
            "content-type": "application/json",
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Should fall back to serialization and include small response body
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: smallData,
      });
    });

    it("should fall back to serialization when content-length header is invalid", async () => {
      const smallData = { id: "123", name: "Test App" };
      const mockResponse = {
        data: smallData,
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-length": "invalid-number",
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Should fall back to serialization and include small response body
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: smallData,
      });
    });

    it("should exclude large response body when falling back to serialization", async () => {
      // Create data that when serialized will be > 10KB
      const largeData = {
        items: Array.from({ length: 200 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          description: "A".repeat(50), // Make each item large
        })),
      };
      const mockResponse = {
        data: largeData,
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            // No content-length header, will fall back to serialization
            "content-type": "application/json",
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Should exclude large response body when serialization shows it's > 10KB
      expect(responseLog[1]).not.toHaveProperty("responseBody");
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
      });
    });

    it("should handle responses without headers", async () => {
      const smallData = { id: "123", name: "Test App" };
      const mockResponse = {
        data: smallData,
        response: {
          status: 200,
          statusText: "OK",
          // No headers property
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Should fall back to serialization and include small response body
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: smallData,
      });
    });

    it("should handle content-length exactly at 10KB threshold", async () => {
      const mockResponse = {
        data: { test: "data" },
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-length": "10240", // Exactly 10KB
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Exactly 10KB should be considered NOT big (threshold is > 10KB)
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
        responseBody: { test: "data" },
      });
    });

    it("should handle content-length just above 10KB threshold", async () => {
      const mockResponse = {
        data: { test: "data" },
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-length": "10241", // Just above 10KB (10240)
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps/123");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      // Just above 10KB should be considered big
      expect(responseLog[1]).not.toHaveProperty("responseBody");
      expect(responseLog[1]).toMatchObject({
        status: 200,
        statusText: "OK",
      });
    });
  });

  describe("Header logging", () => {
    it("should log and sanitize response headers", async () => {
      const mockResponse = {
        data: { items: [] },
        response: {
          status: 200,
          statusText: "OK",
          headers: new Headers({
            "content-type": "application/json",
            authorization: "Bearer secret-token",
            "x-api-key": "secret-key",
            "cache-control": "no-cache",
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).toMatchObject({
        responseHeaders: {
          "content-type": "application/json",
          authorization: "[REDACTED]",
          "x-api-key": "[REDACTED]",
          "cache-control": "no-cache",
        },
      });
    });

    it("should handle responses without headers", async () => {
      const mockResponse = {
        data: { items: [] },
        response: {
          status: 200,
          statusText: "OK",
          // No headers property
        },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).not.toHaveProperty("responseHeaders");
    });

    it("should sanitize headers in error responses", async () => {
      const mockErrorResponse = {
        error: { message: "Not found", status: 404 },
        response: {
          status: 404,
          statusText: "Not Found",
          headers: new Headers({
            "content-type": "application/json",
            authorization: "Bearer secret-token",
            "x-request-id": "req-123",
          }),
        },
      };
      mockApiClient.GET.mockResolvedValue(mockErrorResponse);

      await wrappedClient.GET("/v1/apps/invalid-id");

      const errorLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 404")
      );

      expect(errorLog[1]).toMatchObject({
        responseHeaders: {
          "content-type": "application/json",
          authorization: "[REDACTED]",
          "x-request-id": "req-123",
        },
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle undefined response", async () => {
      mockApiClient.GET.mockResolvedValue(undefined);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- SUCCESS")
      );

      expect(responseLog[1]).toMatchObject({
        status: "SUCCESS",
      });
    });

    it("should handle null response", async () => {
      mockApiClient.GET.mockResolvedValue(null);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- SUCCESS")
      );

      expect(responseLog[1]).toMatchObject({
        status: "SUCCESS",
      });
    });

    it("should handle non-function handlers", async () => {
      const clientWithNonFunction = {
        GET: jest.fn(),
        someProperty: "not a function",
      };

      const wrappedClient = createLoggingWrapper(clientWithNonFunction);

      expect(wrappedClient.someProperty).toBe("not a function");
    });
  });

  describe("Stored big responses", () => {
    beforeEach(() => {
      clearStoredBigResponses();
      jest.clearAllMocks();
    });

    it("should store big response bodies for later logging", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
        meta: { total: 1000 },
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const responseLog = mockLogger.info.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );

      expect(responseLog[1]).not.toHaveProperty("responseBody");

      const callCountBefore = mockLogger.info.mock.calls.length;
      logStoredBigResponses();

      const storedLog = mockLogger.info.mock.calls
        .slice(callCountBefore)
        .find((call: any) => call[0].includes("RES GET /v1/apps - 200"));

      expect(storedLog).toBeDefined();
      expect(storedLog[1]).toHaveProperty("responseBody");
      expect(storedLog[1].responseBody).toEqual(largeData);
    });

    it("should log stored big responses with stored log message when error occurs", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      const error = new Error("Something went wrong");
      mockApiClient.POST.mockRejectedValue(error);

      try {
        await wrappedClient.POST("/v1/apps/123", { body: { name: "Test" } });
      } catch (e) {
        // Expected to throw
      }

      const callCountBefore = mockLogger.info.mock.calls.length;
      logStoredBigResponses();

      const storedLog = mockLogger.info.mock.calls
        .slice(callCountBefore)
        .find((call: any) => call[0].includes("RES GET /v1/apps - 200"));

      expect(storedLog).toBeDefined();
      expect(storedLog[0]).toMatch(
        /\[[a-z0-9]+\] RES GET \/v1\/apps - 200 \(\d+ms\)/
      );
      expect(storedLog[1]).toHaveProperty("responseBody");
      expect(storedLog[1].responseBody).toEqual(largeData);
      expect(storedLog[1]).not.toHaveProperty("logMessage");
    });

    it("should clear stored responses after logging", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      logStoredBigResponses();

      const firstCallCount = mockLogger.info.mock.calls.length;

      logStoredBigResponses();

      expect(mockLogger.info.mock.calls.length).toBe(firstCallCount);
    });

    it("should clear stored responses when clearStoredBigResponses is called", async () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };
      mockApiClient.GET.mockResolvedValue(mockResponse);

      await wrappedClient.GET("/v1/apps");

      clearStoredBigResponses();

      const callCountBefore = mockLogger.info.mock.calls.length;
      logStoredBigResponses();

      const storedLogs = mockLogger.info.mock.calls
        .slice(callCountBefore)
        .filter((call: any) => call[0].includes("RES GET /v1/apps - 200"));

      expect(storedLogs.length).toBe(0);
    });

    it("should store multiple big responses and log them all", async () => {
      const largeData1 = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
      };
      const largeData2 = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1000,
          name: `Item ${i + 1000}`,
        })),
      };

      mockApiClient.GET.mockResolvedValueOnce({
        data: largeData1,
        response: { status: 200, statusText: "OK" },
      }).mockResolvedValueOnce({
        data: largeData2,
        response: { status: 200, statusText: "OK" },
      });

      await wrappedClient.GET("/v1/apps");
      await wrappedClient.GET("/v1/apps/123");

      const callCountBefore = mockLogger.info.mock.calls.length;
      logStoredBigResponses();

      const storedLogs = mockLogger.info.mock.calls
        .slice(callCountBefore)
        .filter((call: any) => call[0].includes("RES GET"));

      expect(storedLogs.length).toBe(2);
      const storedLog1 = storedLogs.find(
        (call: any) =>
          call[0].includes("/v1/apps - 200") &&
          !call[0].includes("/v1/apps/123")
      );
      const storedLog2 = storedLogs.find((call: any) =>
        call[0].includes("/v1/apps/123 - 200")
      );

      expect(storedLog1).toBeDefined();
      expect(storedLog1[1]).toHaveProperty("responseBody");
      expect(storedLog1[1].responseBody).toEqual(largeData1);
      expect(storedLog2).toBeDefined();
      expect(storedLog2[1]).toHaveProperty("responseBody");
      expect(storedLog2[1].responseBody).toEqual(largeData2);
    });

    it("should use configured log level when logging stored responses", async () => {
      clearStoredBigResponses();
      jest.clearAllMocks();

      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        })),
      };
      const mockResponse = {
        data: largeData,
        response: { status: 200, statusText: "OK" },
      };

      const debugWrappedClient = createLoggingWrapper(mockApiClient, {
        logLevel: "debug",
      });

      mockApiClient.GET.mockResolvedValue(mockResponse);
      await debugWrappedClient.GET("/v1/apps");

      const callCountBefore = mockLogger.debug.mock.calls.length;
      logStoredBigResponses();

      const storedLog = mockLogger.debug.mock.calls
        .slice(callCountBefore)
        .find((call: any) => call[0].includes("RES GET /v1/apps - 200"));

      expect(storedLog).toBeDefined();
      expect(mockLogger.debug).toHaveBeenCalled();
    });
  });
});
