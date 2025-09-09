import createClient from "openapi-fetch";
import type { paths } from "@semihcihan/app-store-connect-api-types";
import { createRetryMiddleware } from "./retry-middleware";
import { createPaginationWrapper } from "./pagination-wrapper";

/**
 * Creates an API client with custom auth functions
 * @param getAuthToken Function to get auth token
 * @param forceTokenRefresh Function to force token refresh
 * @returns Configured API client with retry middleware
 */
export function createApiClient(
  getAuthToken: () => string,
  forceTokenRefresh: () => string
) {
  const baseApi = createClient<paths>({
    baseUrl: "https://api.appstoreconnect.apple.com",
    querySerializer: (params) => {
      const search = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
          search.append(key, value.join(","));
        } else if (value !== undefined && value !== null) {
          search.append(key, String(value));
        }
      }
      return search.toString();
    },
  });

  // Add middleware to inject fresh token on every request
  baseApi.use({
    onRequest: (options) => {
      // Get token using the provided function
      const token = getAuthToken();

      // Create new request with fresh Authorization header
      const newRequest = new Request(options.request, {
        headers: {
          ...Object.fromEntries(options.request.headers.entries()),
          Authorization: `Bearer ${token}`,
        },
      });

      return newRequest;
    },
  });

  // Wrap the API client with retry middleware
  const retryWrappedApi = createRetryMiddleware(baseApi, {
    getAuthToken,
    forceTokenRefresh,
  });

  // Add pagination wrapper for automatic v1/v2 pagination
  return createPaginationWrapper(retryWrappedApi);
}
