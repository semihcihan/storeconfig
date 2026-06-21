const dotenv = require("dotenv");
// Integration test setup - allows info logging and longer timeouts

// Set environment variable to suppress dotenv logging
process.env.DOTENV_CONFIG_SILENT = "true";

// Set log level to info for integration tests (no debug)
process.env.LOG_LEVEL = "info";

process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config({ path: ".env.test" });

// Allow all console output for e2e tests
// console.log = console.log;
// console.warn = console.warn;
// console.error = console.error;
// console.info = console.info;
// console.debug = console.debug;

// If you need to see logger output in e2e tests:
// import { setLogLevel } from '../src/utils/logger';
// setLogLevel('info');

// Mock pagination wrapper to disable pagination for e2e tests
const paginationWrapper = require("./src/services/pagination-wrapper");

// Mock createPaginationWrapper to return the original API client without pagination
jest
  .spyOn(paginationWrapper, "createPaginationWrapper")
  .mockImplementation((apiClient) => {
    // Return the original API client without pagination wrapper
    return apiClient;
  });

// Global mock for fetchSubscriptionPricePointEqualizations
// This applies to all e2e tests to filter territories for testing
const apiClient = require("./src/domains/subscriptions/api-client");

// Store the original function before mocking
const originalFetchEqualizations =
  apiClient.fetchSubscriptionPricePointEqualizations;

// Mock the fetchSubscriptionPricePointEqualizations function for all e2e tests
jest
  .spyOn(apiClient, "fetchSubscriptionPricePointEqualizations")
  .mockImplementation(async (pricePointId) => {
    // Call the original function directly
    const realResult = await originalFetchEqualizations(pricePointId);

    // Filter to only return the territories we want for testing
    const filteredData = realResult.data.filter(
      (item) =>
        item.relationships?.territory?.data?.id === "GBR" ||
        item.relationships?.territory?.data?.id === "USA" ||
        item.relationships?.territory?.data?.id === "DEU"
    );

    return {
      ...realResult,
      data: filteredData,
    };
  });
