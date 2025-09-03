import {
  ContextualError,
  isNotFoundError,
  isRateLimitError,
  isNotAuthorizedError,
  extractErrorMessage,
  isVersionNotUpdatableError,
} from "./error-handling-helpers";

describe("ContextualError", () => {
  describe("constructor", () => {
    it("should create error with message only", () => {
      const error = new ContextualError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.name).toBe("ContextualError");
      expect(error.context).toBeUndefined();
    });

    it("should create error with message and context", () => {
      const context = { userId: "123", operation: "fetch" };
      const error = new ContextualError("Test error", context);

      expect(error.message).toBe("Test error");
      expect(error.context).toEqual(context);
    });

    it("should create error with message and original error", () => {
      const originalError = new Error("Original error");
      originalError.stack = "Original stack trace";

      const error = new ContextualError("Test error", originalError);

      expect(error.message).toBe("Test error");
      expect(error.stack).not.toBe(originalError.stack);
      expect(error.context).toBe(originalError);
    });

    it("should create error with message, original error, and context", () => {
      const originalError = new Error("Original error");
      const context = { userId: "123", operation: "fetch" };

      const error = new ContextualError("Test error", context);

      expect(error.message).toBe("Test error");
      expect(error.context).toEqual(context);
    });

    it("should maintain proper prototype chain", () => {
      const error = new ContextualError("Test error");

      expect(error).toBeInstanceOf(ContextualError);
      expect(error).toBeInstanceOf(Error);
    });
  });
});

describe("isNotFoundError", () => {
  it("should return true for 404 status in errors array", () => {
    const error = {
      errors: [{ status: "404", detail: "Not found" }],
    };

    expect(isNotFoundError(error)).toBe(true);
  });

  it("should return true for numeric 404 status in errors array", () => {
    const error = {
      errors: [{ status: 404, detail: "Not found" }],
    };

    expect(isNotFoundError(error)).toBe(true);
  });

  it("should return true for direct 404 status", () => {
    const error = { status: 404 };

    expect(isNotFoundError(error)).toBe(true);
  });

  it("should return true for 404 status in response", () => {
    const error = { response: { status: 404 } };

    expect(isNotFoundError(error)).toBe(true);
  });

  it("should return false for non-404 errors", () => {
    const error = { status: 500 };

    expect(isNotFoundError(error)).toBe(false);
  });

  it("should return false for errors without status", () => {
    const error = { message: "Some error" };

    expect(isNotFoundError(error)).toBe(false);
  });
});

describe("isRateLimitError", () => {
  it("should return true for 429 status in errors array", () => {
    const error = {
      errors: [{ status: "429", detail: "Rate limited" }],
    };

    expect(isRateLimitError(error)).toBe(true);
  });

  it("should return true for numeric 429 status in errors array", () => {
    const error = {
      errors: [{ status: 429, detail: "Rate limited" }],
    };

    expect(isRateLimitError(error)).toBe(true);
  });

  it("should return true for direct 429 status", () => {
    const error = { status: 429 };

    expect(isRateLimitError(error)).toBe(true);
  });

  it("should return false for non-429 errors", () => {
    const error = { status: 500 };

    expect(isRateLimitError(error)).toBe(false);
  });
});

describe("isNotAuthorizedError", () => {
  it("should return true for 401 status in errors array", () => {
    const error = {
      errors: [{ status: "401", detail: "Not authorized" }],
    };

    expect(isNotAuthorizedError(error)).toBe(true);
  });

  it("should return true for numeric 401 status in errors array", () => {
    const error = {
      errors: [{ status: 401, detail: "Not authorized" }],
    };

    expect(isNotAuthorizedError(error)).toBe(true);
  });

  it("should return true for direct 401 status", () => {
    const error = { status: 401 };

    expect(isNotAuthorizedError(error)).toBe(true);
  });

  it("should return true for direct string 401 status", () => {
    const error = { status: "401" };

    expect(isNotAuthorizedError(error)).toBe(true);
  });

  it("should return true for NOT_AUTHORIZED code in errors array", () => {
    const error = {
      errors: [{ code: "NOT_AUTHORIZED", detail: "Not authorized" }],
    };

    expect(isNotAuthorizedError(error)).toBe(true);
  });

  it("should return false for non-401 errors", () => {
    const error = { status: 500 };

    expect(isNotAuthorizedError(error)).toBe(false);
  });

  it("should return false for errors without status or code", () => {
    const error = { message: "Some error" };

    expect(isNotAuthorizedError(error)).toBe(false);
  });

  it("should find ErrorResponse in nested objects", () => {
    const error = {
      response: {
        data: {
          errors: [{ status: "401", detail: "Not authorized" }],
        },
      },
    };

    expect(isNotAuthorizedError(error)).toBe(true);
  });
});

describe("extractErrorMessage", () => {
  it("should extract message from Apple API error format", () => {
    const error = {
      errors: [{ detail: "Specific error message" }],
    };

    expect(extractErrorMessage(error)).toBe("Specific error message");
  });

  it("should return 'Unknown error' when no detail is available", () => {
    const error = {
      errors: [{}],
    };

    expect(extractErrorMessage(error)).toBe("Unknown error");
  });

  it("should return 'Unknown error' when errors array is empty", () => {
    const error = {
      errors: [],
    };

    expect(extractErrorMessage(error)).toBe("Unknown error");
  });

  it("should return 'Unknown error' when errors is not an array", () => {
    const error = { message: "Some error" };

    expect(extractErrorMessage(error)).toBe("Unknown error");
  });

  it("should extract message from nested ErrorResponse", () => {
    const error = {
      response: {
        data: {
          errors: [{ detail: "Nested error message" }],
        },
      },
    };

    expect(extractErrorMessage(error)).toBe("Nested error message");
  });
});

describe("isVersionNotUpdatableError", () => {
  it("should return true for 409 status errors", () => {
    const error = { status: 409 };
    expect(isVersionNotUpdatableError(error)).toBe(true);
  });

  it("should return true for string 409 status errors", () => {
    const error = { status: "409" };
    expect(isVersionNotUpdatableError(error)).toBe(true);
  });

  it("should return true for Apple API errors with 409 status", () => {
    const error = {
      errors: [
        {
          status: "409",
          code: "SOME_ERROR_CODE",
          detail: "Some error detail",
        },
      ],
    };
    expect(isVersionNotUpdatableError(error)).toBe(true);
  });

  it("should return true for Apple API errors with ENTITY_ERROR.ATTRIBUTE.INVALID.INVALID_STATE code", () => {
    const error = {
      errors: [
        {
          status: "400",
          code: "ENTITY_ERROR.ATTRIBUTE.INVALID.INVALID_STATE",
          detail: "The attribute 'versionString' can not be modified.",
        },
      ],
    };
    expect(isVersionNotUpdatableError(error)).toBe(true);
  });

  it("should return false for other error types", () => {
    const error = { status: 500 };
    expect(isVersionNotUpdatableError(error)).toBe(false);
  });

  it("should return false for Apple API errors with other codes", () => {
    const error = {
      errors: [
        {
          status: "400",
          code: "SOME_OTHER_ERROR_CODE",
          detail: "Some other error detail",
        },
      ],
    };
    expect(isVersionNotUpdatableError(error)).toBe(false);
  });

  it("should return false for null/undefined errors", () => {
    expect(isVersionNotUpdatableError(null)).toBe(false);
    expect(isVersionNotUpdatableError(undefined)).toBe(false);
  });
});
