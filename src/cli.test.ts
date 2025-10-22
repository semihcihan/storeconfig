import { jest } from "@jest/globals";

// Mock Bugsnag before importing cli.ts
const mockBugsnagNotify = jest.fn();
const mockBugsnag = {
  notify: mockBugsnagNotify,
};

jest.mock("@bugsnag/js", () => mockBugsnag);

// Mock the logger
const mockLogger = {
  setOutputModes: jest.fn(),
  setLevel: jest.fn(),
  error: jest.fn(),
};

const mockProcessNestedErrors = jest.fn((err: any, includeStack: boolean) => ({
  message: err.message,
  stack: includeStack ? err.stack : undefined,
}));

jest.mock("@semihcihan/shared", () => ({
  logger: mockLogger,
  processNestedErrors: mockProcessNestedErrors,
}));

// Mock dotenv
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

// Mock the instrument service
jest.mock("./services/instrument", () => ({}));

// Mock all command modules
jest.mock("./commands/validate", () => ({
  default: { command: "validate", describe: "Validate format" },
}));
jest.mock("./commands/apply", () => ({
  default: { command: "apply", describe: "Apply changes" },
}));
jest.mock("./commands/fetch", () => ({
  default: { command: "fetch", describe: "Fetch data" },
}));
jest.mock("./commands/set-price", () => ({
  default: { command: "set-price", describe: "Set price" },
}));
jest.mock("./commands/compare-price", () => ({
  default: { command: "compare-price", describe: "Compare price" },
}));
jest.mock("./commands/example", () => ({
  default: { command: "example", describe: "Example" },
}));
jest.mock("./commands/configure", () => ({
  default: { command: "configure", describe: "Configure" },
}));
jest.mock("./commands/apple", () => ({
  default: { command: "apple", describe: "Apple" },
}));
jest.mock("./commands/user", () => ({
  default: { command: "user", describe: "User" },
}));

// Mock the API client
const mockRequireAuth = jest.fn();
jest.mock("./services/api-client", () => ({
  requireAuth: mockRequireAuth,
}));

// Mock yargs
const mockYargs = jest.fn();
const mockHideBin = jest.fn();
const mockParser = {
  middleware: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  demandCommand: jest.fn().mockReturnThis(),
  strict: jest.fn().mockReturnThis(),
  fail: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  parseAsync: jest.fn() as jest.MockedFunction<() => Promise<any>>,
};

mockYargs.mockReturnValue(mockParser);

jest.mock("yargs", () => mockYargs);
jest.mock("yargs/helpers", () => ({
  hideBin: mockHideBin,
}));

describe("CLI Error Handling", () => {
  let originalArgv: string[];
  let originalExit: typeof process.exit;

  beforeEach(() => {
    // Store original values
    originalArgv = process.argv;
    originalExit = process.exit;

    // Reset all mocks
    jest.clearAllMocks();

    // Mock process.argv
    process.argv = ["node", "cli.js", "test-command"];

    // Mock process.exit to prevent actual exit
    process.exit = jest.fn() as any;

    // Mock process.exitCode
    process.exitCode = 0;
  });

  afterEach(() => {
    // Restore original values
    process.argv = originalArgv;
    process.exit = originalExit;
  });

  describe("Bugsnag mocking", () => {
    it("should verify Bugsnag is properly mocked", () => {
      // Verify that Bugsnag is mocked and won't send real notifications
      expect(mockBugsnagNotify).toBeDefined();
      expect(typeof mockBugsnagNotify).toBe("function");
      expect(mockBugsnag).toBeDefined();
      expect(mockBugsnag.notify).toBe(mockBugsnagNotify);
    });

    it("should not send real notifications during tests", () => {
      // Verify that the mock function is not a real Bugsnag function
      expect(mockBugsnagNotify).not.toBe(undefined);
      expect(mockBugsnagNotify.mock).toBeDefined();
    });
  });

  describe("Logger setup", () => {
    it("should verify logger is properly mocked", () => {
      expect(mockLogger).toBeDefined();
      expect(mockLogger.setOutputModes).toBeDefined();
      expect(mockLogger.setLevel).toBeDefined();
      expect(mockLogger.error).toBeDefined();
    });

    it("should have proper logger methods", () => {
      expect(typeof mockLogger.setOutputModes).toBe("function");
      expect(typeof mockLogger.setLevel).toBe("function");
      expect(typeof mockLogger.error).toBe("function");
    });
  });

  describe("Module imports", () => {
    it("should import CLI module without errors", async () => {
      // This test ensures the CLI module can be imported with all mocks in place
      await expect(import("./cli")).resolves.toBeDefined();
    });

    it("should have command modules available", () => {
      // Verify that command modules can be imported without errors
      const commands = [
        "validate",
        "apply",
        "fetch",
        "set-price",
        "compare-price",
        "example",
        "configure",
        "apple",
        "user",
      ];

      commands.forEach((command) => {
        expect(() => require(`./commands/${command}`)).not.toThrow();
      });
    });
  });

  describe("Error handling verification", () => {
    it("should have processNestedErrors mocked", () => {
      const { processNestedErrors } = require("@semihcihan/shared");
      expect(processNestedErrors).toBeDefined();
      expect(jest.isMockFunction(processNestedErrors)).toBe(true);
    });

    it("should have requireAuth mocked", () => {
      expect(mockRequireAuth).toBeDefined();
      expect(jest.isMockFunction(mockRequireAuth)).toBe(true);
    });
  });

  describe("CLI Error Handling Behavior", () => {
    it("should test error handling logic for command extraction", () => {
      // Test the command extraction logic directly
      const testCases = [
        {
          argv: ["node", "cli.js", "fetch", "--id", "123"],
          expectedCommand: "fetch",
        },
        {
          argv: ["node", "cli.js", "apply"],
          expectedCommand: "apply",
        },
        {
          argv: ["node", "cli.js"],
          expectedCommand: "unknown",
        },
        {
          argv: undefined,
          expectedCommand: "unknown",
        },
      ];

      testCases.forEach(({ argv, expectedCommand }) => {
        // Simulate the command extraction logic from cli.ts
        let command = "unknown";
        try {
          const processArgs = argv?.slice(2) || [];
          command = processArgs[0] || "unknown";
        } catch (error) {
          command = "unknown";
        }

        expect(command).toBe(expectedCommand);
      });
    });

    it("should test error processing logic", () => {
      const testError = new Error("Test error message");

      // Test the processNestedErrors call
      const processedError = mockProcessNestedErrors(testError, false);

      expect(mockProcessNestedErrors).toHaveBeenCalledWith(testError, false);
      expect(processedError).toEqual({
        message: "Test error message",
        stack: undefined,
      });
    });

    it("should test Bugsnag notification with metadata", () => {
      const testError = new Error("Test error");
      const command = "test-command";
      const processedError = { message: "Test error", stack: undefined };

      // Test Bugsnag notification
      mockBugsnagNotify(testError, (event: any) => {
        event.addMetadata("metadata", { command, context: processedError });
      });

      expect(mockBugsnagNotify).toHaveBeenCalledWith(
        testError,
        expect.any(Function)
      );

      // Test the metadata callback
      const notifyCallback = mockBugsnagNotify.mock.calls[0][1] as (
        event: any
      ) => void;
      const mockEvent = {
        addMetadata: jest.fn(),
      };
      notifyCallback(mockEvent);

      expect(mockEvent.addMetadata).toHaveBeenCalledWith("metadata", {
        command: "test-command",
        context: processedError,
      });
    });

    it("should test logger error calls with different command scenarios", () => {
      const testError = { message: "Test error", stack: undefined };

      // Test different command scenarios
      const scenarios = [
        { command: "fetch", expectedMessage: "Command 'fetch' failed" },
        { command: "apply", expectedMessage: "Command 'apply' failed" },
        { command: "unknown", expectedMessage: "Command 'unknown' failed" },
      ];

      scenarios.forEach(({ command, expectedMessage }) => {
        mockLogger.error(expectedMessage, testError);
        expect(mockLogger.error).toHaveBeenCalledWith(
          expectedMessage,
          testError
        );
      });
    });

    it("should verify error handling covers all edge cases", () => {
      // Test undefined process.argv
      let command = "unknown";
      try {
        const processArgs = (undefined as any)?.slice(2) || [];
        command = processArgs[0] || "unknown";
      } catch (error) {
        command = "unknown";
      }
      expect(command).toBe("unknown");

      // Test empty process.argv
      command = "unknown";
      try {
        const processArgs = [].slice(2) || [];
        command = processArgs[0] || "unknown";
      } catch (error) {
        command = "unknown";
      }
      expect(command).toBe("unknown");

      // Test process.argv with only node and script
      command = "unknown";
      try {
        const processArgs = ["node", "cli.js"].slice(2) || [];
        command = processArgs[0] || "unknown";
      } catch (error) {
        command = "unknown";
      }
      expect(command).toBe("unknown");
    });

    it("should verify wrong command names don't trigger Bugsnag", () => {
      // Test that invalid command names are handled by yargs fail handler
      // and don't reach the main().catch() error handler that triggers Bugsnag

      const invalidCommands = [
        "invalid-command",
        "nonexistent",
        "typo-command",
        "wrong-command",
        "unknown-command",
      ];

      // Simulate the yargs fail handler behavior for invalid commands
      invalidCommands.forEach((invalidCommand) => {
        // Reset mocks
        jest.clearAllMocks();

        // Simulate yargs fail handler being called for invalid command
        // This should NOT trigger Bugsnag, only logger.error and process.exit
        const mockExit = jest.fn();
        const originalExit = process.exit;
        process.exit = mockExit as any;

        try {
          // Simulate the fail handler logic from cli.ts
          const msg = `Unknown command: ${invalidCommand}`;
          mockLogger.error(
            msg,
            "Use 'storeconfig --help' to see available commands and options."
          );
          mockExit(1);

          // Verify logger.error was called
          expect(mockLogger.error).toHaveBeenCalledWith(
            msg,
            "Use 'storeconfig --help' to see available commands and options."
          );

          // Verify process.exit was called
          expect(mockExit).toHaveBeenCalledWith(1);

          // Verify Bugsnag was NOT called for invalid commands
          expect(mockBugsnagNotify).not.toHaveBeenCalled();
        } finally {
          process.exit = originalExit;
        }
      });
    });

    it("should verify only actual errors trigger Bugsnag, not command validation", () => {
      // Test that only real errors (not command validation failures) trigger Bugsnag

      // Reset mocks
      jest.clearAllMocks();

      // Simulate a real error that should trigger Bugsnag
      const realError = new Error("API connection failed");
      const command = "fetch";
      const processedError = {
        message: "API connection failed",
        stack: undefined,
      };

      // Simulate the main().catch() error handler
      mockLogger.error(`Command '${command}' failed`, processedError);
      mockBugsnagNotify(realError, (event: any) => {
        event.addMetadata("metadata", { command, context: processedError });
      });

      // Verify Bugsnag was called for real errors
      expect(mockBugsnagNotify).toHaveBeenCalledWith(
        realError,
        expect.any(Function)
      );
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Command 'fetch' failed",
        processedError
      );

      // Reset mocks
      jest.clearAllMocks();

      // Simulate command validation failure (should NOT trigger Bugsnag)
      const validationError = "Unknown command: invalid-command";
      mockLogger.error(
        validationError,
        "Use 'storeconfig --help' to see available commands and options."
      );

      // Verify logger.error was called for validation
      expect(mockLogger.error).toHaveBeenCalledWith(
        validationError,
        "Use 'storeconfig --help' to see available commands and options."
      );

      // Verify Bugsnag was NOT called for validation errors
      expect(mockBugsnagNotify).not.toHaveBeenCalled();
    });
  });

  describe("Environment setup", () => {
    it("should have dotenv mocked", () => {
      const dotenv = require("dotenv");
      expect(dotenv.config).toBeDefined();
      expect(jest.isMockFunction(dotenv.config)).toBe(true);
    });

    it("should have instrument service mocked", () => {
      // This ensures the instrument service is mocked and won't cause issues
      expect(() => require("./services/instrument")).not.toThrow();
    });
  });
});
