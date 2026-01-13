import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { keyService } from "./key-service";
import { ContextualError, CLI_VERSION_HEADER } from "@semihcihan/shared";
import packageJson from "../../package.json";

// Create a configured axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "https://api.storeconfig.com",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Configure retry middleware
axiosRetry(apiClient, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status !== undefined && error.response.status >= 500)
    );
  },
});

// Add request interceptor to inject API key and CLI version
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = keyService.loadKey();
    if (apiKey) {
      config.headers["X-StoreConfig-ApiKey"] = apiKey;
    }
    config.headers[CLI_VERSION_HEADER] = packageJson.version;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.data && error.response.status) {
        const statusCode = error.response.status;
        const message =
          error.response.data?.message ||
          `API request failed with status ${statusCode}`;
        const details = error.response.data?.details;
        throw new ContextualError(message, details);
      }
    }
    throw error;
  }
);

// Export utility functions
export const isAuthenticated = (): boolean => {
  return keyService.hasKey();
};

export const requireAuth = (): void => {
  if (!isAuthenticated()) {
    throw new Error(
      "Authentication required. Please run 'storeconfig configure' first to set up your secret key"
    );
  }
};

// Export the configured axios instance
export { apiClient };
