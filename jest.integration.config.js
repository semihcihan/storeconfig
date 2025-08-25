const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testMatch: ["<rootDir>/src/**/*.integration.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.integration.setup.js"],
  // Integration tests need longer timeouts and info logging (no debug)
  testTimeout: 120000, // 2 minutes
  testEnvironmentOptions: {
    LOG_LEVEL: "info"
  },
  // Integration tests should not be cached as they depend on external state
  cache: false
};
