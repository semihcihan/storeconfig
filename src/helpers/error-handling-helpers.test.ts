import { jest } from "@jest/globals";
import {
  isNotFoundError,
  isRateLimitError,
  extractErrorMessage,
  throwFormattedError,
} from "./error-handling-helpers";

describe("error-handling-helpers", () => {
  describe("isNotFoundError", () => {
    it("should return true for Apple API 404 errors with string status", () => {
      const error = {
        errors: [
          { status: "404", detail: "Not found" },
          { status: "500", detail: "Server error" },
        ],
      };

      expect(isNotFoundError(error)).toBe(true);
    });

    it("should return true for Apple API 404 errors with number status", () => {
      const error = {
        errors: [
          { status: 404, detail: "Not found" },
          { status: 500, detail: "Server error" },
        ],
      };

      expect(isNotFoundError(error)).toBe(true);
    });

    it("should return false for Apple API errors without 404", () => {
      const error = {
        errors: [
          { status: "500", detail: "Server error" },
          { status: "403", detail: "Forbidden" },
        ],
      };

      expect(isNotFoundError(error)).toBe(false);
    });

    it("should return true for direct 404 status", () => {
      const error = { status: 404 };

      expect(isNotFoundError(error)).toBe(true);
    });

    it("should return true for response 404 status", () => {
      const error = { response: { status: 404 } };

      expect(isNotFoundError(error)).toBe(true);
    });

    it("should return false for non-404 status", () => {
      const error = { status: 500 };

      expect(isNotFoundError(error)).toBe(false);
    });

    it("should return false for response non-404 status", () => {
      const error = { response: { status: 500 } };

      expect(isNotFoundError(error)).toBe(false);
    });

    it("should return false for null/undefined error", () => {
      expect(isNotFoundError(null)).toBe(false);
      expect(isNotFoundError(undefined)).toBe(false);
    });

    it("should return false for error without status or errors", () => {
      const error = { message: "Some error" };

      expect(isNotFoundError(error)).toBe(false);
    });

    it("should return false for error with empty errors array", () => {
      const error = { errors: [] };

      expect(isNotFoundError(error)).toBe(false);
    });

    it("should return false for error with non-array errors", () => {
      const error = { errors: "not an array" };

      expect(isNotFoundError(error)).toBe(false);
    });
  });

  describe("isRateLimitError", () => {
    it("should return true for direct 429 status", () => {
      const error = { status: 429 };

      expect(isRateLimitError(error)).toBe(true);
    });

    it("should return true for Apple API 429 errors with string status", () => {
      const error = {
        errors: [
          { status: "429", detail: "Rate limited" },
          { status: "500", detail: "Server error" },
        ],
      };

      expect(isRateLimitError(error)).toBe(true);
    });

    it("should return true for Apple API 429 errors with number status", () => {
      const error = {
        errors: [
          { status: 429, detail: "Rate limited" },
          { status: 500, detail: "Server error" },
        ],
      };

      expect(isRateLimitError(error)).toBe(true);
    });

    it("should return false for Apple API errors without 429", () => {
      const error = {
        errors: [
          { status: "500", detail: "Server error" },
          { status: "403", detail: "Forbidden" },
        ],
      };

      expect(isRateLimitError(error)).toBe(false);
    });

    it("should return false for non-429 status", () => {
      const error = { status: 500 };

      expect(isRateLimitError(error)).toBe(false);
    });

    it("should return false for null/undefined error", () => {
      expect(isRateLimitError(null)).toBe(false);
      expect(isRateLimitError(undefined)).toBe(false);
    });

    it("should return false for error without status or errors", () => {
      const error = { message: "Some error" };

      expect(isRateLimitError(error)).toBe(false);
    });

    it("should return false for error with empty errors array", () => {
      const error = { errors: [] };

      expect(isRateLimitError(error)).toBe(false);
    });

    it("should return false for error with non-array errors", () => {
      const error = { errors: "not an array" };

      expect(isRateLimitError(error)).toBe(false);
    });
  });

  describe("extractErrorMessage", () => {
    it("should extract message from Apple API error with detail", () => {
      const error = {
        errors: [{ detail: "Resource not found", status: "404" }],
      };

      expect(extractErrorMessage(error)).toBe("Resource not found");
    });

    it("should return 'Unknown error' for Apple API error without detail", () => {
      const error = {
        errors: [{ status: "404" }],
      };

      expect(extractErrorMessage(error)).toBe("Unknown error");
    });

    it("should return 'Unknown error' for empty errors array", () => {
      const error = {
        errors: [],
      };

      expect(extractErrorMessage(error)).toBe("Unknown error");
    });

    it("should return 'Unknown error' for error without errors array", () => {
      const error = { message: "Some error" };

      expect(extractErrorMessage(error)).toBe("Unknown error");
    });

    it("should return 'Unknown error' for null/undefined error", () => {
      expect(extractErrorMessage(null)).toBe("Unknown error");
      expect(extractErrorMessage(undefined)).toBe("Unknown error");
    });

    it("should return 'Unknown error' for error with non-array errors", () => {
      const error = { errors: "not an array" };

      expect(extractErrorMessage(error)).toBe("Unknown error");
    });

    it("should extract message from first error when multiple exist", () => {
      const error = {
        errors: [
          { detail: "First error", status: "404" },
          { detail: "Second error", status: "500" },
        ],
      };

      expect(extractErrorMessage(error)).toBe("First error");
    });
  });

  describe("throwFormattedError", () => {
    it("should throw error with formatted message", () => {
      const error = {
        errors: [{ detail: "Resource not found", status: "404" }],
      };

      expect(() => throwFormattedError("API Error", error)).toThrow(
        "API Error: Resource not found"
      );
    });

    it("should preserve original error properties", () => {
      const error = {
        status: 404,
        response: { status: 404 },
        errors: [{ detail: "Not found", status: "404" }],
      };

      try {
        throwFormattedError("Test Error", error);
      } catch (thrownError: any) {
        expect(thrownError.status).toBe(404);
        expect(thrownError.response).toEqual({ status: 404 });
        expect(thrownError.errors).toEqual([
          { detail: "Not found", status: "404" },
        ]);
      }
    });

    it("should handle error without detail", () => {
      const error = {
        errors: [{ status: "404" }],
      };

      expect(() => throwFormattedError("API Error", error)).toThrow(
        "API Error: Unknown error"
      );
    });

    it("should handle error without errors array", () => {
      const error = { message: "Some error" };

      expect(() => throwFormattedError("API Error", error)).toThrow(
        "API Error: Unknown error"
      );
    });

    it("should handle null/undefined error", () => {
      expect(() => throwFormattedError("API Error", null)).toThrow(
        "API Error: Unknown error"
      );
      expect(() => throwFormattedError("API Error", undefined)).toThrow(
        "API Error: Unknown error"
      );
    });

    it("should preserve status property when present", () => {
      const error = { status: 500 };

      try {
        throwFormattedError("Test Error", error);
      } catch (thrownError: any) {
        expect(thrownError.status).toBe(500);
      }
    });

    it("should preserve response.status property when present", () => {
      const error = { response: { status: 403 } };

      try {
        throwFormattedError("Test Error", error);
      } catch (thrownError: any) {
        expect(thrownError.response).toEqual({ status: 403 });
      }
    });

    it("should preserve errors property when present", () => {
      const error = {
        errors: [
          { detail: "Error 1", status: "400" },
          { detail: "Error 2", status: "500" },
        ],
      };

      try {
        throwFormattedError("Test Error", error);
      } catch (thrownError: any) {
        expect(thrownError.errors).toEqual([
          { detail: "Error 1", status: "400" },
          { detail: "Error 2", status: "500" },
        ]);
      }
    });

    it("should handle complex error structure", () => {
      const error = {
        status: 429,
        response: { status: 429 },
        errors: [{ detail: "Rate limit exceeded", status: "429" }],
        message: "Rate limited",
      };

      try {
        throwFormattedError("Rate Limit Error", error);
      } catch (thrownError: any) {
        expect(thrownError.message).toBe(
          "Rate Limit Error: Rate limit exceeded"
        );
        expect(thrownError.status).toBe(429);
        expect(thrownError.response).toEqual({ status: 429 });
        expect(thrownError.errors).toEqual([
          { detail: "Rate limit exceeded", status: "429" },
        ]);
      }
    });
  });
});
