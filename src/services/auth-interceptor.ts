import { logger } from "../utils/logger";
import { isNotAuthorizedError } from "../helpers/error-handling-helpers";

/**
 * Simple authentication interceptor that retries failed requests once after reauthentication
 * @param apiCall The API call to execute
 * @param retryCount Current retry count
 * @param getAuthToken Function to get auth token
 * @param forceTokenRefresh Function to force token refresh
 */
export async function withAuthRetry<T>(
  apiCall: () => Promise<T>,
  retryCount = 0,
  getAuthToken: () => string,
  forceTokenRefresh: () => void
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
      return withAuthRetry(
        apiCall,
        retryCount + 1,
        getAuthToken,
        forceTokenRefresh
      );
    }
    // Re-throw non-401 errors or errors after retry
    throw error;
  }
}
