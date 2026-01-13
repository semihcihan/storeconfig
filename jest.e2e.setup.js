process.env.DOTENV_CONFIG_SILENT = "true";
process.env.LOG_LEVEL = "info";

// Mock ora spinner to avoid ES module issues
jest.mock("ora", () => {
  return jest.fn(() => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    warn: jest.fn().mockReturnThis(),
    info: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    text: "",
    color: "cyan",
    spinner: "dots",
    prefixText: "",
  }));
});
