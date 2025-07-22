// Helper function to check if an error is a 404 from the Apple API
export function isNotFoundError(error: any): boolean {
  // Check for 404 status in the errors array (Apple API format)
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.some(
      (err: any) => err.status === "404" || err.status === 404
    );
  }

  // Fallback to other common error formats
  return error?.status === 404 || error?.response?.status === 404;
}

// Helper function to check if an error is a rate limit error
export function isRateLimitError(error: any): boolean {
  // Check for direct 429 status
  if (error?.status === 429) {
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

// Helper function to extract error message from Apple API error
export function extractErrorMessage(error: any): string {
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0].detail || "Unknown error";
  }
  return "Unknown error";
}

// Helper function to throw formatted error
export function throwFormattedError(prefix: string, error: any): never {
  const message = extractErrorMessage(error);
  const formattedError = new Error(`${prefix}: ${message}`);

  // Preserve original error properties for status checking
  if (error?.status) {
    (formattedError as any).status = error.status;
  }
  if (error?.response?.status) {
    (formattedError as any).response = { status: error.response.status };
  }
  if (error?.errors) {
    (formattedError as any).errors = error.errors;
  }

  throw formattedError;
}
