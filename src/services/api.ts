import axios from "axios";
import { getAuthToken } from "./auth";
import { logger } from "../utils/logger";

const API_BASE_URL = "https://api.appstoreconnect.apple.com/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = getAuthToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      logger.error("Failed to generate auth token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
