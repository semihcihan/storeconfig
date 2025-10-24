import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./api-client";

describe("API Client Retry Functionality", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should retry on 500 status code and succeed on second retry", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [500, { message: "Internal Server Error" }];
      }
      return [200, { message: "Success" }];
    });

    const response = await apiClient.get("/test-endpoint");

    expect(response.status).toBe(200);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });

  it("should retry on 502 status code and succeed on third retry", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount <= 2) {
        return [502, { message: "Bad Gateway" }];
      }
      return [200, { message: "Success" }];
    });

    const response = await apiClient.get("/test-endpoint");

    expect(response.status).toBe(200);
    expect(requestCount).toBe(3); // Initial request + 2 retries
  });

  it("should retry on 503 status code", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [503, { message: "Service Unavailable" }];
      }
      return [200, { message: "Success" }];
    });

    const response = await apiClient.get("/test-endpoint");

    expect(response.status).toBe(200);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });

  it("should retry on 504 Gateway Timeout", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [504, { message: "Gateway Timeout" }];
      }
      return [200, { message: "Success" }];
    });

    const response = await apiClient.get("/test-endpoint");

    expect(response.status).toBe(200);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });

  it("should not retry on 400 status code", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      return [400, { message: "Bad Request" }];
    });

    try {
      await apiClient.get("/test-endpoint");
    } catch (error) {
      expect(requestCount).toBe(1); // Only initial request, no retries
    }
  });

  it("should not retry on 404 status code", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      return [404, { message: "Not Found" }];
    });

    try {
      await apiClient.get("/test-endpoint");
    } catch (error) {
      expect(requestCount).toBe(1); // Only initial request, no retries
    }
  });

  it("should not retry on 401 status code", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      return [401, { message: "Unauthorized" }];
    });

    try {
      await apiClient.get("/test-endpoint");
    } catch (error) {
      expect(requestCount).toBe(1); // Only initial request, no retries
    }
  });

  it("should fail after 2 retries on persistent 500 error", async () => {
    let requestCount = 0;

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      return [500, { message: "Internal Server Error" }];
    });

    try {
      await apiClient.get("/test-endpoint");
    } catch (error) {
      expect(requestCount).toBe(3); // Initial request + 2 retries
      // The error gets wrapped in ContextualError by our response interceptor
      expect(error).toBeDefined();
    }
  });

  it("should verify exponential delay timing", async () => {
    let requestCount = 0;
    const startTime = Date.now();

    mock.onGet("/test-endpoint").reply(() => {
      requestCount++;
      return [500, { message: "Internal Server Error" }];
    });

    try {
      await apiClient.get("/test-endpoint");
    } catch (error) {
      const totalTime = Date.now() - startTime;

      expect(requestCount).toBe(3); // Initial request + 2 retries
      // Should take at least 300ms (100ms + 200ms delays)
      // But allow some tolerance for test execution time
      expect(totalTime).toBeGreaterThanOrEqual(250);
    }
  });

  it("should work with POST requests", async () => {
    let requestCount = 0;

    mock.onPost("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [500, { message: "Internal Server Error" }];
      }
      return [201, { message: "Created" }];
    });

    const response = await apiClient.post("/test-endpoint", { data: "test" });

    expect(response.status).toBe(201);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });

  it("should work with PUT requests", async () => {
    let requestCount = 0;

    mock.onPut("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [500, { message: "Internal Server Error" }];
      }
      return [200, { message: "Updated" }];
    });

    const response = await apiClient.put("/test-endpoint", { data: "test" });

    expect(response.status).toBe(200);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });

  it("should work with DELETE requests", async () => {
    let requestCount = 0;

    mock.onDelete("/test-endpoint").reply(() => {
      requestCount++;
      if (requestCount === 1) {
        return [500, { message: "Internal Server Error" }];
      }
      return [204, { message: "Deleted" }];
    });

    const response = await apiClient.delete("/test-endpoint");

    expect(response.status).toBe(204);
    expect(requestCount).toBe(2); // Initial request + 1 retry
  });
});
