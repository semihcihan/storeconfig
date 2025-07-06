import createClient from "openapi-fetch";
import type { paths } from "../generated/app-store-connect-api";
import { getAuthToken } from "./auth";

export const api = createClient<paths>({
  baseUrl: "https://api.appstoreconnect.apple.com/v1",
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});
