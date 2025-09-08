import { components } from "../generated/app-store-connect-api";

export type ErrorResponse = components["schemas"]["ErrorResponse"];

// Custom error class that preserves original error data and adds context
export class ContextualError extends Error {
  public readonly context?: any;

  constructor(message: string, context?: any) {
    super(message);
    this.name = "ContextualError";
    this.stack = new Error(message).stack;

    // Add context
    this.context = context;

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, ContextualError.prototype);
  }
}

// Recursively find ErrorResponse objects within any input
function findErrorResponse(error: any): ErrorResponse[] {
  const errorResponses: ErrorResponse[] = [];

  if (!error || typeof error !== "object") {
    return errorResponses;
  }

  // Check if current object is an ErrorResponse
  if (error.errors && Array.isArray(error.errors)) {
    errorResponses.push(error);
  }

  // Recursively search in all object properties
  for (const key in error) {
    if (error.hasOwnProperty(key)) {
      const value = error[key];

      if (Array.isArray(value)) {
        // Search in array elements
        value.forEach((item) => {
          errorResponses.push(...findErrorResponse(item));
        });
      } else if (value && typeof value === "object") {
        // Recursively search in nested objects
        errorResponses.push(...findErrorResponse(value));
      }
    }
  }

  return errorResponses;
}

// Helper function to check if an error is a 404 from the Apple API
export function isNotFoundError(error: any): boolean {
  const errorResponses = findErrorResponse(error);

  // Check for 404 status in found ErrorResponse objects
  for (const errorResponse of errorResponses) {
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      if (
        errorResponse.errors.some(
          (err: any) => err.status === "404" || err.status === 404
        )
      ) {
        return true;
      }
    }
  }

  // Fallback to other common error formats
  return (
    error?.status === 404 ||
    error?.status === "404" ||
    error?.response?.status === 404
  );
}

// Helper function to check if an error is a rate limit error
export function isRateLimitError(error: any): boolean {
  // Check for direct 429 status (both number and string)
  if (error?.status === 429 || error?.status === "429") {
    return true;
  }

  const errorResponses = findErrorResponse(error);

  // Check for 429 status in found ErrorResponse objects
  for (const errorResponse of errorResponses) {
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      if (
        errorResponse.errors.some(
          (err: any) => err.status === 429 || err.status === "429"
        )
      ) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to check if an error is a 401 NOT_AUTHORIZED error
export function isNotAuthorizedError(error: any): boolean {
  // Check for direct 401 status (both number and string)
  if (error?.status === 401 || error?.status === "401") {
    return true;
  }

  const errorResponses = findErrorResponse(error);

  // Check for 401 status and NOT_AUTHORIZED code in found ErrorResponse objects
  for (const errorResponse of errorResponses) {
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      if (
        errorResponse.errors.some(
          (err: any) =>
            err.status === 401 ||
            err.status === "401" ||
            err.code === "NOT_AUTHORIZED"
        )
      ) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to check if an error indicates that a version cannot be updated
export function isVersionNotUpdatableError(error: any): boolean {
  // Check for 409 status (Conflict) which often indicates invalid state
  if (error?.status === 409 || error?.status === "409") {
    return true;
  }

  const errorResponses = findErrorResponse(error);

  // Check for specific Apple API error codes that indicate version cannot be updated
  for (const errorResponse of errorResponses) {
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      if (
        errorResponse.errors.some((err: any) => {
          // Check for status 409
          if (err.status === 409 || err.status === "409") {
            return true;
          }

          // Check for specific error codes that indicate version cannot be updated
          if (err.code === "ENTITY_ERROR.ATTRIBUTE.INVALID.INVALID_STATE") {
            return true;
          }

          return false;
        })
      ) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to extract error message from Apple API error
export function extractErrorMessage(error: any): string {
  const errorResponses = findErrorResponse(error);

  // Check for error messages in found ErrorResponse objects
  for (const errorResponse of errorResponses) {
    if (
      errorResponse.errors &&
      Array.isArray(errorResponse.errors) &&
      errorResponse.errors.length > 0
    ) {
      return errorResponse.errors[0].detail || "Unknown error";
    }
  }

  // Fallback to direct error message extraction
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0].detail || "Unknown error";
  }

  return "Unknown error";
}
