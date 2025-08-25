import { logger } from "../utils/logger";
import { forceTokenRefresh } from "./auth";
import { isNotAuthorizedError } from "../helpers/error-handling-helpers";

/**
 * Simple authentication interceptor that retries failed requests once after reauthentication
 */
export async function withAuthRetry<T>(
  apiCall: () => Promise<T>,
  retryCount = 0
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    // Only retry 401 errors once
    if (isNotAuthorizedError(error) && retryCount === 0) {
      logger.warn("Authentication failed, refreshing token and retrying once");
      // Force token refresh and wait for it to complete
      forceTokenRefresh();
      // Add a small delay to ensure the new token is properly set
      await new Promise((resolve) => setTimeout(resolve, 100));
      return withAuthRetry(apiCall, retryCount + 1);
    }
    // Re-throw non-401 errors or errors after retry
    throw error;
  }
}
