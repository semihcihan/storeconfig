import {
  rateLimitTracker,
  createRateLimitMiddleware,
} from "./rate-limit-middleware";

describe("Rate Limit Middleware", () => {
  beforeEach(() => {
    rateLimitTracker.reset();
  });

  describe("RateLimitTracker", () => {
    it("should track requests and parse rate limit headers", () => {
      const mockHeaders = new Headers({
        "X-Rate-Limit-Limit": "100",
        "X-Rate-Limit-Remaining": "75",
        "X-Rate-Limit-Reset": "1640995200", // Unix timestamp
      });

      const mockResponse = new Response("", { headers: mockHeaders });

      rateLimitTracker.trackRequest("/test/endpoint", "GET", mockResponse);

      const stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(1);
      expect(stats.rateLimitedRequests).toBe(0);

      const endpointInfo = stats.endpoints.get("GET:/test/endpoint");
      expect(endpointInfo).toBeDefined();
      expect(endpointInfo?.limit).toBe(100);
      expect(endpointInfo?.remaining).toBe(75);
      expect(endpointInfo?.resetTime).toEqual(new Date(1640995200 * 1000));
    });

    it("should track rate limited responses", () => {
      const mockResponse = new Response("", { status: 429 });

      rateLimitTracker.trackRequest("/test/endpoint", "GET", mockResponse);

      const stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(1);
      expect(stats.rateLimitedRequests).toBe(1);
    });

    it("should handle missing rate limit headers gracefully", () => {
      const mockResponse = new Response("");

      rateLimitTracker.trackRequest("/test/endpoint", "GET", mockResponse);

      const stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(1);
      expect(stats.rateLimitedRequests).toBe(0);
      expect(stats.endpoints.size).toBe(0); // No rate limit info available
    });

    it("should reset statistics", () => {
      const mockHeaders = new Headers({
        "X-Rate-Limit-Limit": "100",
        "X-Rate-Limit-Remaining": "75",
        "X-Rate-Limit-Reset": "1640995200",
      });

      const mockResponse = new Response("", { headers: mockHeaders });

      rateLimitTracker.trackRequest("/test/endpoint", "GET", mockResponse);

      let stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(1);

      rateLimitTracker.reset();

      stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(0);
      expect(stats.rateLimitedRequests).toBe(0);
      expect(stats.endpoints.size).toBe(0);
    });
  });

  describe("createRateLimitMiddleware", () => {
    it("should wrap API client methods", async () => {
      const mockApiClient = {
        GET: jest
          .fn()
          .mockResolvedValue({ data: "test", response: new Response() }),
        POST: jest
          .fn()
          .mockResolvedValue({ data: "test", response: new Response() }),
      };

      const wrappedClient = createRateLimitMiddleware(mockApiClient);

      expect(wrappedClient.GET).toBeDefined();
      expect(wrappedClient.POST).toBeDefined();
      expect(typeof wrappedClient.GET).toBe("function");
      expect(typeof wrappedClient.POST).toBe("function");
    });

    it("should track requests through middleware", async () => {
      const mockHeaders = new Headers({
        "X-Rate-Limit-Limit": "100",
        "X-Rate-Limit-Remaining": "75",
        "X-Rate-Limit-Reset": "1640995200",
      });

      const mockResponse = new Response("", { headers: mockHeaders });

      const mockApiClient = {
        GET: jest
          .fn()
          .mockResolvedValue({ data: "test", response: mockResponse }),
      };

      const wrappedClient = createRateLimitMiddleware(mockApiClient);

      await wrappedClient.GET("/test/endpoint");

      const stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(1);

      const endpointInfo = stats.endpoints.get("GET:/test/endpoint");
      expect(endpointInfo).toBeDefined();
      expect(endpointInfo?.limit).toBe(100);
    });

    it("should handle errors gracefully", async () => {
      const mockApiClient = {
        GET: jest.fn().mockRejectedValue(new Error("API Error")),
      };

      const wrappedClient = createRateLimitMiddleware(mockApiClient);

      await expect(wrappedClient.GET("/test/endpoint")).rejects.toThrow(
        "API Error"
      );

      const stats = rateLimitTracker.getStats();
      expect(stats.totalRequests).toBe(0); // Failed requests shouldn't be tracked
    });
  });
});
