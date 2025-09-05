import { logger, LogOutputModes, LogOutputConfig } from "./logger";
import fs from "fs";
import path from "path";
import os from "os";

describe("Logger Multiple Output Support", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "logger-test-"));
  const testLogFile = path.join(tempDir, "test.log");

  afterAll(() => {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    // Reset logger to console only
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
    // Clear any existing file
    if (fs.existsSync(testLogFile)) {
      fs.unlinkSync(testLogFile);
    }
  });

  it("should support console output only", () => {
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
    const modes = logger.getOutputModes();
    expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);
  });

  it("should support file output only", () => {
    logger.setOutputModes(
      [{ mode: "file", showErrorStack: true }],
      testLogFile
    );
    const modes = logger.getOutputModes();
    expect(modes).toEqual([{ mode: "file", showErrorStack: true }]);
  });

  it("should support both console and file output", () => {
    logger.setOutputModes(
      [
        { mode: "console", showErrorStack: true },
        { mode: "file", showErrorStack: true },
      ],
      testLogFile
    );
    const modes = logger.getOutputModes();
    expect(modes).toContainEqual({ mode: "console", showErrorStack: true });
    expect(modes).toContainEqual({ mode: "file", showErrorStack: true });
    expect(modes).toHaveLength(2);
  });

  it("should add output mode dynamically", () => {
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
    logger.addOutputMode({ mode: "file", showErrorStack: true }, testLogFile);

    const modes = logger.getOutputModes();
    expect(modes).toContainEqual({ mode: "console", showErrorStack: true });
    expect(modes).toContainEqual({ mode: "file", showErrorStack: true });
    expect(modes).toHaveLength(2);
  });

  it("should remove output mode dynamically", () => {
    logger.setOutputModes(
      [
        { mode: "console", showErrorStack: true },
        { mode: "file", showErrorStack: true },
      ],
      testLogFile
    );
    logger.removeOutputMode("file");

    const modes = logger.getOutputModes();
    expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);
  });

  it("should not remove the last output mode", () => {
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);

    // This should warn and not remove console
    logger.removeOutputMode("console");

    const modes = logger.getOutputModes();
    expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);
  });

  it("should handle invalid output modes gracefully", () => {
    logger.setOutputModes([
      { mode: "console", showErrorStack: true },
      { mode: "invalid" as any, showErrorStack: true },
    ]);
    const modes = logger.getOutputModes();
    expect(modes).toHaveLength(1);
    expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);
  });

  it("should write to file when file mode is active", (done) => {
    // Clear the test log file
    if (fs.existsSync(testLogFile)) {
      fs.unlinkSync(testLogFile);
    }

    // Ensure directory exists
    const logDir = path.dirname(testLogFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    logger.setLevel("info"); // Override the test environment log level
    logger.setOutputModes(
      [{ mode: "file", showErrorStack: true }],
      testLogFile
    );

    // Verify modes are set correctly
    const modes = logger.getOutputModes();
    expect(modes).toEqual([{ mode: "file", showErrorStack: true }]);

    logger.info("Test message for file output");

    // Wait a bit for file write to complete
    setTimeout(() => {
      // Check that file was created and contains the message
      expect(fs.existsSync(testLogFile)).toBe(true);
      const logContent = fs.readFileSync(testLogFile, "utf8");
      expect(logContent).toContain("Test message for file output");
      done();
    }, 50);
  });

  it("should write to both console and file when both modes are active", (done) => {
    // Clear the test log file
    if (fs.existsSync(testLogFile)) {
      fs.unlinkSync(testLogFile);
    }

    // Ensure directory exists
    const logDir = path.dirname(testLogFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    logger.setLevel("info"); // Override the test environment log level
    logger.setOutputModes(
      [
        { mode: "console", showErrorStack: true },
        { mode: "file", showErrorStack: true },
      ],
      testLogFile
    );

    // Verify modes are set correctly
    const modes = logger.getOutputModes();
    expect(modes).toContainEqual({ mode: "console", showErrorStack: true });
    expect(modes).toContainEqual({ mode: "file", showErrorStack: true });

    logger.info("Test message for multiple outputs");

    // Wait a bit for file write to complete
    setTimeout(() => {
      // Check that file was created and contains the message
      expect(fs.existsSync(testLogFile)).toBe(true);
      const logContent = fs.readFileSync(testLogFile, "utf8");
      expect(logContent).toContain("Test message for multiple outputs");
      done();
    }, 50);
  });

  it("should control error stack display based on configuration", () => {
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at test (test.js:1:1)";

    // Test with showErrorStack: true - we can't easily test the output format
    // since it goes through Winston's transport system, but we can verify
    // the configuration is set correctly
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
    const configWithStack = logger.getOutputModes();
    expect(configWithStack[0].showErrorStack).toBe(true);

    // Test with showErrorStack: false
    logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
    const configWithoutStack = logger.getOutputModes();
    expect(configWithoutStack[0].showErrorStack).toBe(false);
  });

  it("should preserve showErrorStack configuration in getOutputModes", () => {
    // Set different configurations
    logger.setOutputModes(
      [
        { mode: "console", showErrorStack: true },
        { mode: "file", showErrorStack: false },
      ],
      testLogFile
    );

    const modes = logger.getOutputModes();

    // Check that configurations are preserved
    const consoleMode = modes.find((m) => m.mode === "console");
    const fileMode = modes.find((m) => m.mode === "file");

    expect(consoleMode).toEqual({ mode: "console", showErrorStack: true });
    expect(fileMode).toEqual({ mode: "file", showErrorStack: false });
  });

  it("should preserve showErrorStack configuration when adding modes", () => {
    // Start with console mode
    logger.setOutputModes([{ mode: "console", showErrorStack: true }]);

    // Add file mode with different showErrorStack setting
    logger.addOutputMode({ mode: "file", showErrorStack: false }, testLogFile);

    const modes = logger.getOutputModes();

    // Check that both configurations are preserved
    const consoleMode = modes.find((m) => m.mode === "console");
    const fileMode = modes.find((m) => m.mode === "file");

    expect(consoleMode).toEqual({ mode: "console", showErrorStack: true });
    expect(fileMode).toEqual({ mode: "file", showErrorStack: false });
  });
});
