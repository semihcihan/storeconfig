const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: [
    ".*\\.integration\\.test\\.[jt]s$",
    ".*\\.e2e\\.test\\.[jt]s$",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Unit tests should have minimal logging - only errors
  testEnvironmentOptions: {
    LOG_LEVEL: "error"
  }
};
