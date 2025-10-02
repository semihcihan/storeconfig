import axios, { AxiosInstance } from "axios";
import { ContextualError } from "@semihcihan/shared";
import { keyService } from "./key-service";

// Create a configured axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to inject API key
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = keyService.loadKey();
    if (apiKey) {
      config.headers["X-StoreConfig-ApiKey"] = apiKey;
    }
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
      if (error.response?.data?.error) {
        throw new ContextualError(
          "API request failed",
          error.response.data.error
        );
      }
      throw new ContextualError(
        "API request failed",
        `HTTP ${error.response?.status}: ${error.message}`
      );
    }
    throw new ContextualError("Network request failed", error);
  }
);

// Export utility functions
export const isAuthenticated = (): boolean => {
  return keyService.hasKey();
};

export const requireAuth = (): void => {
  if (!isAuthenticated()) {
    throw new ContextualError(
      "Authentication required",
      "Please run 'storeconfig auth configure' first to set up your secret key"
    );
  }
};

// Export the configured axios instance
export { apiClient };
