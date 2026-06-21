const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testMatch: ["<rootDir>/**/*.e2e.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.e2e.setup.js"],
  // Integration tests need longer timeouts and info logging (no debug)
  testTimeout: 180000, // 3 minutes
  testEnvironmentOptions: {
    LOG_LEVEL: "info",
  },
};
