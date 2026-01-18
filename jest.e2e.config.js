const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testMatch: ["<rootDir>/**/*.e2e.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.e2e.setup.js"],
  testTimeout: 180000, // 3 minutes
  maxWorkers: 1,
  testEnvironmentOptions: {
    LOG_LEVEL: "info",
  },
};
