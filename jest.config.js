module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  verbose: true,
  silent: false,
  testLocationInResults: true,
  collectCoverage: false,
  coverageReporters: ["text"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Add Jest caching for better performance
  cache: true,
  cacheDirectory: ".jest-cache",
  // Use modern transform syntax instead of deprecated globals
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        useESM: false,
      },
    ],
  },
  // Transform ES modules that are in node_modules
  transformIgnorePatterns: ["node_modules/(?!(inquirer)/)"],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/**/*.test.{js,ts}",
    "!src/**/*.spec.{js,ts}",
    "!src/**/*.integration.test.{js,ts}",
    "!src/**/*.e2e.test.{js,ts}",
    "!src/generated/**/*",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/build/**",
  ],
};
