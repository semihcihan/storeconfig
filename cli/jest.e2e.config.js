const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testMatch: ["<rootDir>/src/**/*.e2e.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.e2e.setup.js"],
  // E2E tests need even longer timeouts and info logging (no debug)
  testTimeout: 300000, // 5 minutes
  testEnvironmentOptions: {
    LOG_LEVEL: "info",
  },
};
