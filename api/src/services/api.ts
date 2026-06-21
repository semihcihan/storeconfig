import { createApiClient } from "./api-factory";
import { getAuthToken, forceTokenRefresh } from "./auth-context";

const api = createApiClient(
  () => getAuthToken(),
  () => forceTokenRefresh()
);

export { api };
