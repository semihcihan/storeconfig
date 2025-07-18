import { logger } from "../utils/logger";

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime?: Date;
  endpoint: string;
  method: string;
}

export interface RateLimitStats {
  totalRequests: number;
  rateLimitedRequests: number;
  endpoints: Map<string, RateLimitInfo>;
}

class RateLimitTracker {
  private stats: RateLimitStats = {
    totalRequests: 0,
    rateLimitedRequests: 0,
    endpoints: new Map(),
  };

  private parseRateLimitHeaders(
    headers: Headers,
    endpoint: string,
    method: string
  ): RateLimitInfo | null {
    // Try Apple's custom rate limit format first
    const appleRateLimit = headers.get("x-rate-limit");
    if (appleRateLimit) {
      // Parse Apple's format: "user-hour-lim:3600;user-hour-rem:3577;"
      const limitMatch = appleRateLimit.match(/user-hour-lim:(\d+)/);
      const remainingMatch = appleRateLimit.match(/user-hour-rem:(\d+)/);

      if (limitMatch && remainingMatch) {
        const limit = parseInt(limitMatch[1]);
        const remaining = parseInt(remainingMatch[1]);

        return {
          limit,
          remaining,
          endpoint,
          method,
        };
      }
    }

    // Fallback to standard rate limit headers (for other APIs)
    const limit = headers.get("X-Rate-Limit-Limit");
    const remaining = headers.get("X-Rate-Limit-Remaining");
    const reset = headers.get("X-Rate-Limit-Reset");

    if (!limit || !remaining) {
      return null;
    }

    return {
      limit: parseInt(limit),
      remaining: parseInt(remaining),
      resetTime: reset ? new Date(parseInt(reset) * 1000) : undefined,
      endpoint,
      method,
    };
  }

  async trackRequest(
    endpoint: string,
    method: string,
    response: Response
  ): Promise<void> {
    this.stats.totalRequests++;

    const rateLimitInfo = this.parseRateLimitHeaders(
      response.headers,
      endpoint,
      method
    );

    if (rateLimitInfo) {
      const key = `${method}:${endpoint}`;
      this.stats.endpoints.set(key, rateLimitInfo);

      // Log rate limit information
      logger.info(`-------- Rate limit for ${method} ${endpoint}:`, {
        limit: rateLimitInfo.limit,
        remaining: rateLimitInfo.remaining,
        utilization: `${(
          ((rateLimitInfo.limit - rateLimitInfo.remaining) /
            rateLimitInfo.limit) *
          100
        ).toFixed(1)}%`,
      });

      // Warn if approaching limit
      if (rateLimitInfo.remaining <= Math.ceil(rateLimitInfo.limit * 0.1)) {
        logger.warn(
          `Rate limit nearly exceeded for ${method} ${endpoint}: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} remaining`
        );
      }
    } else {
      // Log when we don't get rate limit headers (but only for successful responses)
      if (response.status >= 200 && response.status < 300) {
        logger.debug(`No rate limit headers for ${method} ${endpoint}`);
      }
    }

    // Track rate limited responses
    if (response.status === 429) {
      this.stats.rateLimitedRequests++;

      // Try to get response body as text if it hasn't been used
      let responseBody = null;
      if (!response.bodyUsed) {
        try {
          responseBody = await response.clone().text();
        } catch (error) {
          responseBody = `Error reading response body: ${error}`;
        }
      }

      logger.error(`Rate limit exceeded for ${method} ${endpoint}`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
        type: response.type,
        redirected: response.redirected,
        bodyUsed: response.bodyUsed,
        body: responseBody,
        // Additional response properties
        ok: response.ok,
        // Headers as both object and raw entries
        headerEntries: Array.from(response.headers.entries()),
      });
    }
  }

  getStats(): RateLimitStats {
    return {
      ...this.stats,
      endpoints: new Map(this.stats.endpoints), // Return a copy
    };
  }

  logSummary(): void {
    logger.info("Rate limit summary:", {
      totalRequests: this.stats.totalRequests,
      rateLimitedRequests: this.stats.rateLimitedRequests,
      rateLimitPercentage:
        this.stats.totalRequests > 0
          ? `${(
              (this.stats.rateLimitedRequests / this.stats.totalRequests) *
              100
            ).toFixed(2)}%`
          : "0%",
      activeEndpoints: Array.from(this.stats.endpoints.entries()).map(
        ([key, info]) => ({
          endpoint: key,
          remaining: info.remaining,
          limit: info.limit,
        })
      ),
    });
  }

  reset(): void {
    this.stats = {
      totalRequests: 0,
      rateLimitedRequests: 0,
      endpoints: new Map(),
    };
    logger.info("Rate limit tracker reset");
  }
}

export const rateLimitTracker = new RateLimitTracker();

export function createRateLimitMiddleware<T extends Record<string, any>>(
  apiClient: T
): T {
  const middleware = {} as T;

  for (const [method, handler] of Object.entries(apiClient)) {
    if (typeof handler === "function") {
      middleware[method as keyof T] = (async (...args: any[]) => {
        const startTime = Date.now();
        const endpoint = args[0] as string;

        try {
          const response = await handler(...args);

          // Track rate limit information
          if (
            response &&
            typeof response === "object" &&
            "response" in response
          ) {
            await rateLimitTracker.trackRequest(
              endpoint,
              method,
              response.response
            );
          }

          const duration = Date.now() - startTime;
          logger.debug(
            `API call completed: ${method} ${endpoint} (${duration}ms)`
          );

          return response;
        } catch (error) {
          const duration = Date.now() - startTime;
          logger.error(
            `API call failed: ${method} ${endpoint} (${duration}ms)`,
            error
          );
          throw error;
        }
      }) as any;
    } else {
      middleware[method as keyof T] = handler;
    }
  }

  return middleware;
}
