import { createApiClient } from "./api-factory";
import { getAuthToken, forceTokenRefresh } from "./auth-context";

// Create both API clients
const defaultApi = createApiClient(
  () => getAuthToken("default"),
  () => forceTokenRefresh("default")
);

const fallbackApi = createApiClient(
  () => getAuthToken("fallback"),
  () => forceTokenRefresh("fallback")
);

let currentApi = defaultApi;

export function switchApiContext(context: "default" | "fallback"): void {
  currentApi = context === "default" ? defaultApi : fallbackApi;
}

export function getCurrentApiContext(): "default" | "fallback" {
  return currentApi === defaultApi ? "default" : "fallback";
}

export { currentApi as api };
