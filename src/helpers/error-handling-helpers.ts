// Custom error class that preserves original error data and adds context
export class ContextualError extends Error {
  public readonly originalError?: Error;
  public readonly context?: Record<string, any>;
  public readonly status?: number;
  public readonly response?: any;
  public readonly errors?: any[];

  constructor(
    message: string,
    originalError?: Error | any,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = "ContextualError";

    // Preserve original error if it exists
    if (originalError) {
      this.originalError =
        originalError instanceof Error
          ? originalError
          : new Error(String(originalError));

      // Preserve Apple API specific properties
      if (originalError?.status) {
        this.status = originalError.status;
      }
      if (originalError?.response?.status) {
        this.response = { status: originalError.response.status };
      }
      if (originalError?.errors) {
        this.errors = originalError.errors;
      }
    }

    this.stack = originalError?.stack ?? new Error(message).stack;

    // Add context
    if (context) {
      this.context = context;
    }

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, ContextualError.prototype);
  }
}

// Helper function to check if an error is a 404 from the Apple API
export function isNotFoundError(error: any): boolean {
  // Check for 404 status in the errors array (Apple API format)
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.some(
      (err: any) => err.status === "404" || err.status === 404
    );
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

  // Check for 429 status in the errors array (Apple API format)
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.some(
      (err: any) => err.status === 429 || err.status === "429"
    );
  }

  return false;
}

// Helper function to check if an error is a 401 NOT_AUTHORIZED error
export function isNotAuthorizedError(error: any): boolean {
  // Check for direct 401 status (both number and string)
  if (error?.status === 401 || error?.status === "401") {
    return true;
  }

  // Check for 401 status in the errors array (Apple API format)
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.some(
      (err: any) => err.status === 401 || err.status === "401"
    );
  }

  // Check for NOT_AUTHORIZED code in Apple API format
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.some((err: any) => err.code === "NOT_AUTHORIZED");
  }

  return false;
}

// Helper function to extract error message from Apple API error
export function extractErrorMessage(error: any): string {
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0].detail || "Unknown error";
  }
  return "Unknown error";
}
