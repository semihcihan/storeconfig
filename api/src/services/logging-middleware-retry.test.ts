import { createApiClient } from "./api-factory";
import { logger } from "@semihcihan/shared";

// Mock only the logger, import the actual shared functions
jest.mock("@semihcihan/shared", () => ({
  ...jest.requireActual("@semihcihan/shared"),
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock auth functions
const mockGetAuthToken = jest.fn(() => "mock-token");
const mockForceTokenRefresh = jest.fn(() => "mock-refreshed-token");

// Mock fetch to simulate different responses
const mockFetch = jest.fn();

// Store original fetch
const originalFetch = global.fetch;

describe("Logging and Retry Integration (Simple)", () => {
  let mockLogger: any;
  let apiClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger = logger as any;

    // Mock global fetch
    global.fetch = mockFetch;

    // Create API client
    apiClient = createApiClient(mockGetAuthToken, mockForceTokenRefresh);
  });

  afterEach(() => {
    // Restore original fetch
    global.fetch = originalFetch;
  });

  describe("Successful Request", () => {
    it("should log request and response for successful calls", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: "success" }), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
        })
      );

      // Make API call
      await apiClient.GET("/v1/apps", {
        params: {
          query: { limit: 10 },
        },
      });

      // Verify logging calls
      expect(mockLogger.debug).toHaveBeenCalledTimes(2); // One request, one response

      // Check request log
      const requestLog = mockLogger.debug.mock.calls.find(
        (call: any) =>
          call[0].includes("GET /v1/apps") && !call[0].includes("-")
      );
      expect(requestLog).toBeDefined();
      expect(requestLog[0]).toMatch(/\[[a-z0-9]+\] REQ GET \/v1\/apps/);
      expect(requestLog[1]).toMatchObject({
        method: "GET",
        schemaPath: "/v1/apps",
        params: { query: { limit: 10 }, path: {} },
      });

      // Check response log
      const responseLog = mockLogger.debug.mock.calls.find((call: any) =>
        call[0].includes("- 200")
      );
      expect(responseLog).toBeDefined();
      expect(responseLog[0]).toMatch(
        /\[[a-z0-9]+\] RES GET \/v1\/apps - 200 \(\d+ms\)/
      );
      expect(responseLog[1]).toMatchObject({
        method: "GET",
        schemaPath: "/v1/apps",
        status: 200,
        statusText: "OK",
      });
    });
  });

  describe("Error Response", () => {
    it("should log error responses correctly", async () => {
      // Mock error response
      mockFetch.mockResolvedValueOnce(
        new Response(
          JSON.stringify({ errors: [{ status: "404", detail: "Not found" }] }),
          {
            status: 404,
            statusText: "Not Found",
            headers: { "Content-Type": "application/json" },
          }
        )
      );

      // Make API call
      await apiClient.GET("/v1/apps/invalid-id");

      // Verify logging calls
      expect(mockLogger.debug).toHaveBeenCalled();

      // Check error response log
      const errorLog = mockLogger.debug.mock.calls.find((call: any) =>
        call[0].includes("- 404")
      );
      expect(errorLog).toBeDefined();
      expect(errorLog[0]).toMatch(
        /\[[a-z0-9]+\] RES GET \/v1\/apps\/invalid-id - 404 \(\d+ms\)/
      );
      expect(errorLog[1]).toMatchObject({
        method: "GET",
        schemaPath: "/v1/apps/invalid-id",
        status: 404,
        statusText: "Not Found",
      });
    });
  });

  describe("Network Error", () => {
    it("should log network errors correctly", async () => {
      // Mock network error
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      // Make API call and expect it to throw
      await expect(apiClient.GET("/v1/apps")).rejects.toThrow("Network error");

      // Verify logging calls
      expect(mockLogger.debug).toHaveBeenCalled();
      expect(mockLogger.error).not.toHaveBeenCalled();

      // Check request log
      const requestLog = mockLogger.debug.mock.calls.find(
        (call: any) =>
          call[0].includes("GET /v1/apps") && !call[0].includes("-")
      );
      expect(requestLog).toBeDefined();

      // Check error log
      const errorLog = mockLogger.debug.mock.calls.find((call: any) =>
        call[0].includes("THROWN ERROR")
      );
      expect(errorLog).toBeDefined();
      expect(errorLog[0]).toMatch(
        /\[[a-z0-9]+\] RES GET \/v1\/apps - THROWN ERROR \(\d+ms\)/
      );
      expect(errorLog[1]).toMatchObject({
        method: "GET",
        schemaPath: "/v1/apps",
        error: {
          name: "Error",
          message: "Network error",
          stack: expect.any(String),
        },
      });
    });
  });

  describe("Request ID Tracking", () => {
    it("should generate unique request IDs for each call", async () => {
      // Mock two successful responses
      mockFetch
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ data: "success1" }), {
            status: 200,
            statusText: "OK",
          })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ data: "success2" }), {
            status: 200,
            statusText: "OK",
          })
        );

      // Make two API calls
      await apiClient.GET("/v1/apps");
      await apiClient.GET("/v1/apps");

      // Get all request logs
      const requestLogs = mockLogger.debug.mock.calls.filter(
        (call: any) =>
          call[0].includes("GET /v1/apps") && !call[0].includes("-")
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
});
