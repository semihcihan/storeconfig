import createClient from "openapi-fetch";
import type { paths } from "../generated/app-store-connect-api";
import { getAuthToken } from "./auth";
import { createRetryMiddleware } from "./retry-middleware";

const baseApi = createClient<paths>({
  baseUrl: "https://api.appstoreconnect.apple.com",
  // Remove static headers - we'll use middleware instead
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
    // getAuthToken() will automatically use cached token or refresh if needed
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
export const api = createRetryMiddleware(baseApi);
