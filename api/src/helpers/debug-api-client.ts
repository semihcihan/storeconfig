import createClient from "openapi-fetch";
import type { paths } from "@semihcihan/app-store-connect-api-types";

export function createDebugApiClient(getAuthToken: () => string) {
  const api = createClient<paths>({
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

  api.use({
    onRequest: (options) => {
      const token = getAuthToken();
      const newRequest = new Request(options.request, {
        headers: {
          ...Object.fromEntries(options.request.headers.entries()),
          Authorization: `Bearer ${token}`,
        },
      });
      return newRequest;
    },
  });

  return api;
}
