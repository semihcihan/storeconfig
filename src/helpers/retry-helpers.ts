import { logger } from "../utils/logger";

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 2, // Retry once (total 2 attempts)
  delayMs: 1000, // 1 second initial delay
  backoffMultiplier: 2, // Exponential backoff
  shouldRetry: (error: any) => {
    // Retry on network errors, 5xx server errors, and rate limiting
    if (error?.status >= 500) return true;
    if (error?.status === 429) return true; // Rate limiting
    if (error?.code === "ECONNRESET" || error?.code === "ETIMEDOUT")
      return true;
    if (
      error?.message?.includes("network") ||
      error?.message?.includes("timeout")
    )
      return true;
    return false;
  },
};

/**
 * Retry a function with exponential backoff
 * @param fn The function to retry
 * @param options Retry configuration
 * @returns Promise that resolves with the function result
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: any;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if this is the last attempt
      if (attempt === config.maxAttempts) {
        logger.error(
          `Operation failed after ${config.maxAttempts} attempts. Last error:`,
          error
        );
        throw error;
      }

      // Check if we should retry this error
      if (!config.shouldRetry(error)) {
        logger.warn(
          `Operation failed with non-retryable error on attempt ${attempt}:`,
          error
        );
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay =
        config.delayMs * Math.pow(config.backoffMultiplier, attempt - 1);

      logger.warn(
        `Operation failed on attempt ${attempt}/${config.maxAttempts}. Retrying in ${delay}ms. Error:`,
        error
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw lastError;
}
