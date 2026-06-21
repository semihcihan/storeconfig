import {
  ContextualError,
  isNotFoundError,
  isRateLimitError,
  isNotAuthorizedError,
  isVersionNotUpdatableError,
  isInAppPurchaseLocalizationNotUpdatableError,
  isSubscriptionGroupLocalizationNotUpdatableError,
  isSubscriptionLocalizationNotUpdatableError,
  extractClientErrorToSend,
  extractCorrectedDateFromAppleDetail,
  extractIncludedIndexFromApplePointer,
  extractTerritoryCodeFromAppleDetail,
  handleSubscriptionPricesBulkErrors,
} from "./error-handling-helpers";
import { describe, it, expect } from "@jest/globals";
import { z } from "zod";

describe("ContextualError", () => {
  describe("constructor", () => {
    it("should create error with message only", () => {
      const error = new ContextualError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.name).toBe("Error");
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

  it("should find ErrorResponse when wrapped in ContextualError with context.appleError array", () => {
    const appleErrorResponse = {
      errors: [{ status: "401", detail: "Not authorized via context" }],
    };

    const contextual = new ContextualError("wrapped", {
      data: { some: "data" },
      appleError: [appleErrorResponse],
    });

    expect(isNotAuthorizedError(contextual)).toBe(true);
  });
});

describe("extractClientErrorToSend", () => {
  it("should handle ContextualError with Apple API errors", () => {
    const appleError = {
      errors: [
        { title: "Invalid Request", detail: "The request is invalid" },
        { title: "Missing Field", detail: "Required field is missing" },
      ],
    };
    const contextualError = new ContextualError("Context error", appleError);

    const result = extractClientErrorToSend(contextualError);

    expect(result).toEqual({
      message: "Context error",
      status: 400,
      details: [
        { title: "Invalid Request", detail: "The request is invalid" },
        { title: "Missing Field", detail: "Required field is missing" },
      ],
    });
  });

  it("should handle ContextualError with nested Apple API errors", () => {
    const appleError = {
      response: {
        data: {
          errors: [{ title: "Nested Error", detail: "Nested error detail" }],
        },
      },
    };
    const contextualError = new ContextualError("Context error", appleError);

    const result = extractClientErrorToSend(contextualError);

    expect(result).toEqual({
      message: "Context error",
      status: 400,
      details: [{ title: "Nested Error", detail: "Nested error detail" }],
    });
  });

  it("should handle ContextualError without Apple API errors", () => {
    const contextualError = new ContextualError("Context error", {
      someData: "value",
    });

    const result = extractClientErrorToSend(contextualError);

    expect(result).toEqual({
      message: "Context error",
      status: 400,
    });
  });

  it("should handle generic Error", () => {
    const error = new Error("Generic error message");

    const result = extractClientErrorToSend(error);

    expect(result).toEqual({
      message: "Generic error message",
      status: 400,
    });
  });

  it("should handle string errors", () => {
    const result = extractClientErrorToSend("String error message");

    expect(result).toEqual({
      message: "String error message",
      status: 400,
    });
  });

  it("should handle unknown error types", () => {
    const result = extractClientErrorToSend({ someObject: "value" });

    expect(result).toEqual({
      message: "Internal server error",
      status: 500,
    });
  });

  it("should handle null/undefined errors", () => {
    expect(extractClientErrorToSend(null)).toEqual({
      message: "Internal server error",
      status: 500,
    });

    expect(extractClientErrorToSend(undefined)).toEqual({
      message: "Internal server error",
      status: 500,
    });
  });

  it("should handle Zod validation errors", () => {
    const schema = z.object({
      name: z.string().min(1, "Name is required"),
      age: z.number().min(18, "Age must be at least 18"),
    });

    try {
      schema.parse({ name: "", age: 16 });
    } catch (error) {
      const result = extractClientErrorToSend(error);

      expect(result.status).toBe(400);
      expect(result.message).toContain("Name is required");
      expect(result.message).toContain("Age must be at least 18");
    }
  });

  it("should handle ContextualError with nested Error context", () => {
    const innerError = new Error("Inner error message");
    const contextualError = new ContextualError(
      "Outer error message",
      innerError
    );

    const result = extractClientErrorToSend(contextualError);

    expect(result).toEqual({
      message: "Outer error message\nInner error message",
      status: 400,
    });
  });

  it("should handle ContextualError with nested Error and Apple API errors", () => {
    const appleError = {
      errors: [{ title: "Apple Error", detail: "Apple error detail" }],
    };
    const innerError = new ContextualError(
      "Inner contextual error",
      appleError
    );
    const outerError = new ContextualError("Outer error message", innerError);

    const result = extractClientErrorToSend(outerError);

    expect(result).toEqual({
      message: "Outer error message\nInner contextual error",
      status: 400,
      details: [
        { title: "Apple Error", detail: "Apple error detail" },
        { title: "Apple Error", detail: "Apple error detail" },
      ],
    });
  });
});

describe("extractIncludedIndexFromApplePointer", () => {
  it("should extract included index", () => {
    expect(extractIncludedIndexFromApplePointer("/included/7/relationships/prices")).toBe(7);
  });

  it("should extract included index for pointer ending at index", () => {
    expect(extractIncludedIndexFromApplePointer("/included/0")).toBe(0);
  });

  it("should return null for non-string pointer", () => {
    expect(extractIncludedIndexFromApplePointer(null)).toBeNull();
    expect(extractIncludedIndexFromApplePointer(undefined)).toBeNull();
    expect(extractIncludedIndexFromApplePointer(123)).toBeNull();
  });

  it("should return null for invalid pointer", () => {
    expect(extractIncludedIndexFromApplePointer("/data/0")).toBeNull();
  });
});

describe("extractTerritoryCodeFromAppleDetail", () => {
  it("should extract territory code", () => {
    expect(
      extractTerritoryCodeFromAppleDetail(
        "You cannot create more than one future prices for territory = CHE."
      )
    ).toBe("CHE");
  });

  it("should extract territory code without spaces", () => {
    expect(
      extractTerritoryCodeFromAppleDetail(
        "You cannot create more than one future prices for territory=USA."
      )
    ).toBe("USA");
  });

  it("should return null for non-string detail", () => {
    expect(extractTerritoryCodeFromAppleDetail(null)).toBeNull();
    expect(extractTerritoryCodeFromAppleDetail(undefined)).toBeNull();
    expect(extractTerritoryCodeFromAppleDetail(123)).toBeNull();
  });

  it("should return null if territory code does not match expected format", () => {
    expect(
      extractTerritoryCodeFromAppleDetail(
        "You cannot create more than one future prices for territory = us."
      )
    ).toBeNull();
    expect(
      extractTerritoryCodeFromAppleDetail(
        "You cannot create more than one future prices for territory = USAA."
      )
    ).toBeNull();
  });
});

describe("extractCorrectedDateFromAppleDetail", () => {
  it("should extract corrected date", () => {
    expect(
      extractCorrectedDateFromAppleDetail(
        "Invalid startDate=2026-01-19, and must be on or after 2026-01-20"
      )
    ).toBe("2026-01-20");
  });

  it("should return null if detail does not contain corrected date", () => {
    expect(extractCorrectedDateFromAppleDetail("Some other detail")).toBeNull();
  });

  it("should return null for non-string detail", () => {
    expect(extractCorrectedDateFromAppleDetail(null)).toBeNull();
    expect(extractCorrectedDateFromAppleDetail(undefined)).toBeNull();
    expect(extractCorrectedDateFromAppleDetail(123)).toBeNull();
  });
});

describe("handleSubscriptionPricesBulkErrors", () => {
  it("should return correctedDate and invalid indexes", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "Invalid startDate=2026-01-19, a future date is expected, and must be on or after 2026-01-20",
            source: { pointer: "/included/0/relationships/prices" },
          },
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "Invalid startDate=2026-01-19, a future date is expected, and must be on or after 2026-01-20",
            source: { pointer: "/included/7/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["USA", "GBR", "CAN", "DEU", "FRA", "JPN", "AUS", "NLD"],
    });

    expect(result.invalidIncludedCorrections).toEqual([
      { includedIndex: 0, correctedDate: "2026-01-20" },
      { includedIndex: 7, correctedDate: "2026-01-20" },
    ]);
    expect(result.shouldRetry).toBe(true);
  });

  it("should extract territories from conflict details", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "You cannot create more than one future prices for territory = TUR.",
            source: { pointer: "/included/0/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["TUR"],
    });

    expect(result.territoriesToFix).toEqual(["TUR"]);
    expect(result.shouldRetry).toBe(true);
  });

  it("should map territories from includedTerritories when detail lacks explicit territory", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail: "You cannot create more than one future prices for territory.",
            source: { pointer: "/included/1/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["USA", "DEU"],
    });

    expect(result.territoriesToFix).toEqual(["DEU"]);
    expect(result.shouldRetry).toBe(true);
  });

  it("should prefer territory extracted from detail over includedTerritories mapping", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "You cannot create more than one future prices for territory = CHE.",
            source: { pointer: "/included/0/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["USA"],
    });

    expect(result.territoriesToFix).toEqual(["CHE"]);
    expect(result.shouldRetry).toBe(true);
  });

  it("should dedupe territories and corrections", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "Invalid startDate=2026-01-19, a future date is expected, and must be on or after 2026-01-20",
            source: { pointer: "/included/0/relationships/prices" },
          },
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "Invalid startDate=2026-01-19, a future date is expected, and must be on or after 2026-01-20",
            source: { pointer: "/included/0/relationships/prices" },
          },
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "You cannot create more than one future prices for territory = USA.",
            source: { pointer: "/included/0/relationships/prices" },
          },
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail:
              "You cannot create more than one future prices for territory = USA.",
            source: { pointer: "/included/1/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["USA", "USA"],
    });

    expect(result.invalidIncludedCorrections).toEqual([
      { includedIndex: 0, correctedDate: "2026-01-20" },
      { includedIndex: 0, correctedDate: "2026-01-20" },
    ]);
    expect(result.territoriesToFix).toEqual(["USA"]);
    expect(result.shouldRetry).toBe(true);
  });

  it("should return shouldRetry=false when there is nothing actionable", () => {
    const error = new ContextualError("Apple API error", {
      appleError: {
        errors: [
          {
            status: "500",
            code: "SOME_OTHER",
            detail: "Some other detail",
            source: { pointer: "/included/0/relationships/prices" },
          },
          {
            status: "409",
            code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
            detail: null,
            source: { pointer: "/included/0/relationships/prices" },
          },
        ],
      },
    });

    const result = handleSubscriptionPricesBulkErrors({ error });

    expect(result.invalidIncludedCorrections).toEqual([]);
    expect(result.territoriesToFix).toEqual([]);
    expect(result.shouldRetry).toBe(false);
  });

  it("should find ErrorResponse objects nested in arrays/objects inside error.context", () => {
    const nested = {
      level1: [
        {
          appleError: {
            errors: [
              {
                status: "409",
                code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                detail:
                  "Invalid startDate=2026-01-19, a future date is expected, and must be on or after 2026-01-20",
                source: { pointer: "/included/2/relationships/prices" },
              },
              {
                status: "409",
                code: "ENTITY_ERROR.RELATIONSHIP.INVALID",
                detail:
                  "You cannot create more than one future prices for territory = JPN.",
                source: { pointer: "/included/0/relationships/prices" },
              },
            ],
          },
        },
      ],
    };

    const error = new ContextualError("Apple API error", nested);

    const result = handleSubscriptionPricesBulkErrors({
      error,
      includedTerritories: ["USA", "GBR", "CAN"],
    });

    expect(result.invalidIncludedCorrections).toEqual([
      { includedIndex: 2, correctedDate: "2026-01-20" },
    ]);
    expect(result.territoriesToFix).toEqual(["JPN"]);
    expect(result.shouldRetry).toBe(true);
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

describe("localization not updatable helpers", () => {
  it("should detect in-app purchase localization unmodifiable error", () => {
    const error = {
      errors: [
        {
          code: "ENTITY_ERROR.ATTRIBUTE.INVALID.UNMODIFIABLE",
          detail: "Cannot edit InAppPurchaseLocalization when it is in ACTIVE state",
        },
      ],
    };
    expect(isInAppPurchaseLocalizationNotUpdatableError(error)).toBe(true);
  });

  it("should detect subscription group localization unmodifiable error", () => {
    const error = {
      errors: [
        {
          code: "ENTITY_ERROR.ATTRIBUTE.INVALID.UNMODIFIABLE",
          detail:
            "Cannot edit SubscriptionGroupLocalization when it is in ACTIVE state",
        },
      ],
    };
    expect(isSubscriptionGroupLocalizationNotUpdatableError(error)).toBe(true);
  });

  it("should detect subscription localization unmodifiable error", () => {
    const error = {
      errors: [
        {
          code: "ENTITY_ERROR.ATTRIBUTE.INVALID.UNMODIFIABLE",
          detail: "Cannot edit SubscriptionLocalization when it is in ACTIVE state",
        },
      ],
    };
    expect(isSubscriptionLocalizationNotUpdatableError(error)).toBe(true);
  });
});
