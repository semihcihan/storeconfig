import { withRetry } from "./retry-helpers";

// Mock logger
jest.mock("../utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe("retry-helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("withRetry", () => {
    it("should succeed on first attempt", async () => {
      const mockFn = jest.fn().mockResolvedValue("success");

      const result = await withRetry(mockFn);

      expect(result).toBe("success");
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should retry on retryable error and succeed", async () => {
      const mockFn = jest
        .fn()
        .mockRejectedValueOnce({ status: 500, message: "Server error" })
        .mockResolvedValue("success");

      const result = await withRetry(mockFn);

      expect(result).toBe("success");
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("should fail after max attempts", async () => {
      const error = { status: 500, message: "Server error" };
      const mockFn = jest.fn().mockRejectedValue(error);

      await expect(withRetry(mockFn)).rejects.toEqual(error);
      expect(mockFn).toHaveBeenCalledTimes(2); // Default maxAttempts is 2
    });

    it("should not retry on non-retryable error", async () => {
      const error = { status: 400, message: "Bad request" };
      const mockFn = jest.fn().mockRejectedValue(error);

      await expect(withRetry(mockFn)).rejects.toEqual(error);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should use custom retry options", async () => {
      const mockFn = jest
        .fn()
        .mockRejectedValueOnce({ status: 500 })
        .mockRejectedValueOnce({ status: 500 })
        .mockResolvedValue("success");

      const result = await withRetry(mockFn, { maxAttempts: 3 });

      expect(result).toBe("success");
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it("should use exponential backoff", async () => {
      const mockFn = jest
        .fn()
        .mockRejectedValueOnce({ status: 500 })
        .mockResolvedValue("success");

      const startTime = Date.now();
      await withRetry(mockFn, { delayMs: 100 });
      const endTime = Date.now();

      // Should have waited at least 100ms
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });
  });
});
