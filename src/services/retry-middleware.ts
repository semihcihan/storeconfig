import { logger } from "../utils/logger";
import {
  isNotFoundError,
  isRateLimitError,
} from "../helpers/error-handling-helpers";

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  shouldRetry?: (error: any) => boolean;
  rateLimitDelayMs?: number[]; // Array of wait times for rate limit retries
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3, // Retry twice (total 3 attempts)
  delayMs: 1000, // 1 second initial delay
  shouldRetry: (error: any) => {
    // Don't retry 404 errors
    if (isNotFoundError(error)) return false;

    // Retry on rate limiting
    if (isRateLimitError(error)) return true;

    // Retry on 5xx server errors
    if (error?.status >= 500) return true;

    // Handle Apple API error structure where status is in errors array
    if (error?.errors && Array.isArray(error.errors)) {
      for (const err of error.errors) {
        if (err.status >= 500) return true;
      }
    }

    // Handle various network error codes
    if (
      error?.code === "ECONNRESET" ||
      error?.code === "ETIMEDOUT" ||
      error?.code === "UND_ERR_CONNECT_TIMEOUT" ||
      error?.code === "UND_ERR_SOCKET" ||
      error?.code === "UND_ERR_ABORTED" ||
      error?.code === "UND_ERR_DESTROYED"
    )
      return true;
    if (
      error?.message?.includes("network") ||
      error?.message?.includes("timeout") ||
      error?.message?.includes("fetch failed")
    )
      return true;
    return false;
  },
  rateLimitDelayMs: [10000, 30000, 60000, 60000],
};

/**
 * Calculate delay with jitter (0-10% of base delay)
 */
function calculateJitteredDelay(baseDelay: number): number {
  const jitter = Math.random() * 0.1 * baseDelay;
  return baseDelay + jitter;
}

/**
 * Handle rate limit errors with progressive waiting
 */
async function waitForRateLimit(
  endpoint: string,
  method: string,
  attempt: number,
  config: Required<RetryOptions>
): Promise<void> {
  // Use the delay from the array, fallback to last value if attempt exceeds array length
  const baseWaitTime =
    config.rateLimitDelayMs[
      Math.min(attempt - 1, config.rateLimitDelayMs.length - 1)
    ];

  // Add jitter: random value between 0-10% of base delay
  const waitTime = calculateJitteredDelay(baseWaitTime);

  logger.warn(
    `Rate limit exceeded for ${method} ${endpoint}, waiting ${(
      waitTime / 1000
    ).toFixed(2)}s before retry (attempt ${attempt})`
  );

  // Wait for rate limit reset
  await new Promise((resolve) => setTimeout(resolve, waitTime));
}

/**
 * Handle non-rate-limit errors with exponential backoff
 */
async function waitForOtherErrors(
  error: any,
  endpoint: string,
  method: string,
  attempt: number,
  config: Required<RetryOptions>
): Promise<void> {
  const backoffMultiplier = 2; // Exponential backoff
  const baseDelay = config.delayMs * Math.pow(backoffMultiplier, attempt - 1);

  // Add jitter: random value between 0-10% of base delay
  const delay = calculateJitteredDelay(baseDelay);

  logger.warn(
    `${method} ${endpoint} failed on attempt ${attempt}/${
      config.maxAttempts
    }. Retrying in ${Math.round(delay)}ms. Error:`,
    error
  );

  // Wait before retrying
  await new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Create a retry wrapper for a single API method
 */
function createRetryWrapper<T extends Record<string, any>>(
  method: string,
  handler: Function,
  config: Required<RetryOptions>
): Function {
  return async (...args: any[]) => {
    const endpoint = args[0] as string;
    let lastError: any;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        // Make the actual API call
        const response = await handler(...args);

        // Check if the response contains an error (openapi-fetch pattern)
        if (response && typeof response === "object" && response.error) {
          // This is an error response from openapi-fetch
          if (config.shouldRetry(response.error)) {
            lastError = response.error;

            // Don't retry if this is the last attempt
            if (attempt === config.maxAttempts) {
              logger.error(
                `${method} ${endpoint} failed after ${config.maxAttempts} attempts. Last error:`,
                response.error
              );
              throw response.error;
            }

            // Handle rate limit errors
            if (isRateLimitError(response.error)) {
              await waitForRateLimit(endpoint, method, attempt, config);
              continue;
            }

            // Handle other retryable errors
            await waitForOtherErrors(
              response.error,
              endpoint,
              method,
              attempt,
              config
            );
            continue;
          } else {
            // Non-retryable error in response - return the response with error
            logger.warn(
              `${method} ${endpoint} failed with non-retryable error on attempt ${attempt}:`,
              response.error
            );
            return response; // Return the response with error property
          }
        }

        // If we get here, the call succeeded
        if (attempt > 1) {
          logger.info(`${method} ${endpoint} succeeded on attempt ${attempt}`);
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

        // Handle rate limit errors
        if (isRateLimitError(error)) {
          await waitForRateLimit(endpoint, method, attempt, config);
          continue;
        }

        // Handle other retryable errors
        await waitForOtherErrors(error, endpoint, method, attempt, config);
      }
    }

    // This should never be reached, but TypeScript requires it
    throw lastError;
  };
}

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
      middleware[method as keyof T] = createRetryWrapper(
        method,
        handler,
        config
      ) as any;
    } else {
      middleware[method as keyof T] = handler;
    }
  }

  return middleware;
}
