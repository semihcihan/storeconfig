import createClient from "openapi-fetch";
import type { paths } from "../generated/app-store-connect-api";
import { getAuthToken } from "./auth";

export const api = createClient<paths>({
  baseUrl: "https://api.appstoreconnect.apple.com",
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
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
