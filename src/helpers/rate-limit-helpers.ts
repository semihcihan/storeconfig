import {
  rateLimitTracker,
  RateLimitInfo,
} from "../services/rate-limit-middleware";
import { logger } from "../utils/logger";

/**
 * Check if we're approaching rate limits for a specific endpoint
 * @param endpoint The API endpoint to check
 * @param method The HTTP method
 * @param threshold Percentage threshold (default: 80%)
 * @returns true if approaching limit, false otherwise
 */
export function isApproachingRateLimit(
  endpoint: string,
  method: string = "GET",
  threshold: number = 0.8
): boolean {
  const key = `${method}:${endpoint}`;
  const stats = rateLimitTracker.getStats();
  const info = stats.endpoints.get(key);

  if (!info) {
    return false; // No rate limit info available
  }

  const utilization = (info.limit - info.remaining) / info.limit;
  return utilization >= threshold;
}

/**
 * Get remaining requests for a specific endpoint
 * @param endpoint The API endpoint to check
 * @param method The HTTP method
 * @returns Number of remaining requests, or null if no info available
 */
export function getRemainingRequests(
  endpoint: string,
  method: string = "GET"
): number | null {
  const key = `${method}:${endpoint}`;
  const stats = rateLimitTracker.getStats();
  const info = stats.endpoints.get(key);

  return info?.remaining ?? null;
}

/**
 * Get a summary of all rate limit information
 * @returns Formatted string with rate limit summary
 */
export function getRateLimitSummary(): string {
  const stats = rateLimitTracker.getStats();
  const lines: string[] = [];

  lines.push(`Total Requests: ${stats.totalRequests}`);
  lines.push(`Rate Limited Requests: ${stats.rateLimitedRequests}`);
  lines.push(
    `Rate Limit Percentage: ${
      stats.totalRequests > 0
        ? `${((stats.rateLimitedRequests / stats.totalRequests) * 100).toFixed(
            2
          )}%`
        : "0%"
    }`
  );

  if (stats.endpoints.size > 0) {
    lines.push("\nActive Endpoints:");
    for (const [key, info] of stats.endpoints.entries()) {
      const utilization = (
        ((info.limit - info.remaining) / info.limit) *
        100
      ).toFixed(1);
      lines.push(
        `  ${key}: ${info.remaining}/${info.limit} (${utilization}% used)`
      );
    }
  }

  return lines.join("\n");
}

/**
 * Check if any endpoint is currently rate limited
 * @returns true if any endpoint has 0 remaining requests
 */
export function hasActiveRateLimits(): boolean {
  const stats = rateLimitTracker.getStats();

  for (const info of stats.endpoints.values()) {
    if (info.remaining === 0) {
      return true;
    }
  }

  return false;
}
