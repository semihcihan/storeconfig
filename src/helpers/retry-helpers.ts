import { logger } from "../utils/logger";
import {
  hasActiveRateLimits,
  getRemainingRequests,
} from "./rate-limit-helpers";

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
  waitForRateLimit?: boolean;
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
  waitForRateLimit: true, // Wait for rate limit reset by default
};

/**
 * Retry a function with exponential backoff and rate limit handling
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
      // Check for active rate limits before making the request
      if (config.waitForRateLimit && hasActiveRateLimits()) {
        logger.warn("Active rate limits detected, waiting before retry");
        // Wait a bit before retrying when rate limits are active
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      }

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

      // Special handling for rate limit errors
      if ((error as any)?.status === 429 && config.waitForRateLimit) {
        logger.warn("Rate limit exceeded, waiting before retry");
        // Wait for rate limit reset (simplified approach)
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds for rate limit
        continue;
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

/**
 * Retry a function with rate limit awareness for specific endpoints
 * @param fn The function to retry
 * @param endpoint The API endpoint being called
 * @param method The HTTP method
 * @param options Retry configuration
 * @returns Promise that resolves with the function result
 */
export async function withRateLimitAwareRetry<T>(
  fn: () => Promise<T>,
  endpoint: string,
  method: string = "GET",
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: any;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      // Check for rate limits on this specific endpoint
      if (config.waitForRateLimit) {
        const remaining = getRemainingRequests(endpoint, method);

        if (remaining === 0) {
          logger.warn(
            `Rate limit reached for ${method} ${endpoint}, waiting before retry`
          );
          // Wait a bit when rate limit is reached
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
        } else if (remaining !== null && remaining <= 2) {
          logger.warn(
            `Low rate limit remaining for ${method} ${endpoint}: ${remaining} requests`
          );
        }
      }

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

      // Special handling for rate limit errors
      if ((error as any)?.status === 429 && config.waitForRateLimit) {
        logger.warn(
          `Rate limit exceeded for ${method} ${endpoint}, waiting before retry`
        );
        // Wait for rate limit reset (simplified approach)
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
        continue;
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
