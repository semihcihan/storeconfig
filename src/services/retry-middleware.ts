import { logger } from "../utils/logger";
import {
  hasActiveRateLimits,
  getRemainingRequests,
} from "../helpers/rate-limit-helpers";

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
  waitForRateLimit?: boolean;
  rateLimitWaitMs?: number; // Time to wait when rate limited
  activeRateLimitWaitMs?: number; // Time to wait when active rate limits detected
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3, // Retry twice (total 3 attempts)
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
  rateLimitWaitMs: 10000, // 10 seconds when rate limited
  activeRateLimitWaitMs: 5000, // 5 seconds when active rate limits detected
};

/**
 * Create retry middleware that wraps an API client with automatic retry logic
 * @param apiClient The API client to wrap
 * @param options Retry configuration
 * @returns Wrapped API client with retry logic
 */
export function createRetryMiddleware<T extends Record<string, any>>(
  apiClient: T,
  options: RetryOptions = {}
): T {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  const middleware = {} as T;

  for (const [method, handler] of Object.entries(apiClient)) {
    if (typeof handler === "function") {
      middleware[method as keyof T] = (async (...args: any[]) => {
        const endpoint = args[0] as string;
        let lastError: any;

        for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
          try {
            // Check for active rate limits before making the request
            // Only check if we have rate limit information available
            if (config.waitForRateLimit) {
              const hasActiveLimits = hasActiveRateLimits();
              const remaining = getRemainingRequests(endpoint, method);

              // If we have rate limit information and limits are active, wait
              if (hasActiveLimits) {
                logger.warn(
                  `Active rate limits detected for ${method} ${endpoint}, waiting before attempt ${attempt}`
                );
                await new Promise((resolve) =>
                  setTimeout(resolve, config.activeRateLimitWaitMs)
                );
              }

              // If we have specific endpoint rate limit information
              if (remaining !== null) {
                if (remaining === 0) {
                  logger.warn(
                    `Rate limit reached for ${method} ${endpoint}, waiting before attempt ${attempt}`
                  );
                  await new Promise((resolve) =>
                    setTimeout(resolve, config.activeRateLimitWaitMs)
                  );
                } else if (remaining <= 2) {
                  logger.warn(
                    `Low rate limit remaining for ${method} ${endpoint}: ${remaining} requests`
                  );
                }
              }
              // If remaining is null, we don't have rate limit info for this endpoint
              // This is normal for some Apple API endpoints
            }

            // Make the actual API call
            const response = await handler(...args);

            // If we get here, the call succeeded
            if (attempt > 1) {
              logger.info(
                `${method} ${endpoint} succeeded on attempt ${attempt}`
              );
            }

            return response;
          } catch (error) {
            lastError = error;

            // Don't retry if this is the last attempt
            if (attempt === config.maxAttempts) {
              logger.error(
                `${method} ${endpoint} failed after ${config.maxAttempts} attempts. Last error:`,
                error
              );
              throw error;
            }

            // Check if we should retry this error
            if (!config.shouldRetry(error)) {
              logger.warn(
                `${method} ${endpoint} failed with non-retryable error on attempt ${attempt}:`,
                error
              );
              throw error;
            }

            // Special handling for rate limit errors
            if ((error as any)?.status === 429 && config.waitForRateLimit) {
              const remaining = getRemainingRequests(endpoint, method);

              if (remaining !== null) {
                logger.warn(
                  `Rate limit exceeded for ${method} ${endpoint} (${remaining} remaining), waiting before retry (attempt ${attempt})`
                );
              } else {
                logger.warn(
                  `Rate limit exceeded for ${method} ${endpoint} (no rate limit info available), waiting before retry (attempt ${attempt})`
                );
              }

              // Wait for rate limit reset (simplified approach)
              await new Promise((resolve) =>
                setTimeout(resolve, config.rateLimitWaitMs)
              );
              continue;
            }

            // Calculate delay with exponential backoff
            const delay =
              config.delayMs * Math.pow(config.backoffMultiplier, attempt - 1);

            logger.warn(
              `${method} ${endpoint} failed on attempt ${attempt}/${config.maxAttempts}. Retrying in ${delay}ms. Error:`,
              error
            );

            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }

        // This should never be reached, but TypeScript requires it
        throw lastError;
      }) as any;
    } else {
      middleware[method as keyof T] = handler;
    }
  }

  return middleware;
}
