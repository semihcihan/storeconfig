import {
  DEFAULT_DIAGNOSTICS_LOG_LEVEL,
  DEFAULT_DIAGNOSTICS_MAX_EVENTS,
  logger,
  LogOutputModes,
  LogOutputConfig,
  processNestedErrors,
} from "./logger";
import { ContextualError } from "../helpers/error-handling-helpers";
import { z } from "zod";
import fs from "fs";
import os from "os";
import path from "path";

describe("Logger Tests", () => {
  let stdoutWriteSpy: jest.SpyInstance;
  const testDiagnosticsLogFile = path.join(
    os.tmpdir(),
    "storeconfig-test-diagnostics.log"
  );

  beforeEach(() => {
    logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
    stdoutWriteSpy = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutWriteSpy.mockRestore();
    logger.configureDiagnostics({
      level: DEFAULT_DIAGNOSTICS_LOG_LEVEL,
      maxEvents: DEFAULT_DIAGNOSTICS_MAX_EVENTS,
      logFile: testDiagnosticsLogFile,
      runtime: "test",
    });
    logger.startRun({ runtime: "test" });
  });

  describe("Multiple Output Support", () => {
    it("should support console output only", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
      const modes = logger.getOutputModes();
      expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);
    });

    it("should support multiple console outputs", () => {
      logger.setOutputModes([
        { mode: "console", showErrorStack: true },
        { mode: "console", showErrorStack: true },
      ]);
      const modes = logger.getOutputModes();
      expect(modes).toContainEqual({ mode: "console", showErrorStack: true });
      expect(modes).toHaveLength(2);
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

    it("should write to console when console mode is active", () => {
      logger.setLevel("info");
      logger.setOutputModes([{ mode: "console", showErrorStack: true }]);

      const modes = logger.getOutputModes();
      expect(modes).toEqual([{ mode: "console", showErrorStack: true }]);

      logger.info("Test message for console output");
      logger.warn("Test warning for console output");
      logger.error("Test error for console output");

      expect(stdoutWriteSpy).toHaveBeenCalledTimes(3);

      const outputs = stdoutWriteSpy.mock.calls.map(
        (call) => call[0] as string
      );

      expect(outputs[0]).toContain("Test message for console output");
      expect(outputs[1]).toContain("Test warning for console output");
      expect(outputs[2]).toContain("Test error for console output");
    });

    it("should write to multiple console outputs when multiple modes are active", () => {
      logger.setLevel("info");
      logger.setOutputModes([
        { mode: "console", showErrorStack: true },
        { mode: "console", showErrorStack: true },
      ]);

      const modes = logger.getOutputModes();
      expect(modes).toContainEqual({ mode: "console", showErrorStack: true });
      expect(modes).toHaveLength(2);

      logger.info("Test message for multiple outputs");

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const outputs = stdoutWriteSpy.mock.calls.map(
        (call) => call[0] as string
      );
      expect(
        outputs.some((output) =>
          output.includes("Test message for multiple outputs")
        )
      ).toBe(true);
    });

    it("should control error stack display based on configuration", () => {
      const error = new Error("Test error");
      error.stack = "Error: Test error\n    at test (test.js:1:1)";

      logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
      const configWithStack = logger.getOutputModes();
      expect(configWithStack[0].showErrorStack).toBe(true);

      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
      const configWithoutStack = logger.getOutputModes();
      expect(configWithoutStack[0].showErrorStack).toBe(false);
    });

    it("should preserve showErrorStack configuration in getOutputModes", () => {
      logger.setOutputModes([
        { mode: "console", showErrorStack: true },
        { mode: "console", showErrorStack: false },
      ]);

      const modes = logger.getOutputModes();

      const consoleMode1 = modes.find(
        (m) => m.mode === "console" && m.showErrorStack === true
      );
      const consoleMode2 = modes.find(
        (m) => m.mode === "console" && m.showErrorStack === false
      );

      expect(consoleMode1).toEqual({ mode: "console", showErrorStack: true });
      expect(consoleMode2).toEqual({ mode: "console", showErrorStack: false });
    });

    it("should handle contextual errors correctly", () => {
      let error = new ContextualError("Message multiline\nLine 2", [
        { title: "Error 1", detail: "Detail 1" },
        { title: "Error 2", detail: "Detail 2" },
      ]);
      logger.error("Contextual error test", error);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Contextual error test");
      expect(output).toContain("Message multiline");
      expect(output).toContain("Line 2");
      expect(output).toContain("Error 1");
      expect(output).toContain("Detail 1");
      expect(output).toContain("Error 2");
      expect(output).toContain("Detail 2");
    });
  });

  describe("Message Deduplication", () => {
    it("should not repeat message in console mode when metadata contains message property", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
      const error = new Error("Error message from error object");
      const metadata = { message: "Metadata message", extra: "extra data" };

      logger.error("Main log message", metadata, error);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Main log message");
      expect(output).toContain("Error message from error object");
      expect(output).toContain("extra data");
      expect(output).toContain("Metadata message");

      const errorMessageCount = (
        output.match(/Error message from error object/g) || []
      ).length;
      expect(errorMessageCount).toBe(1);
      const metadataMessageCount = (output.match(/Metadata message/g) || [])
        .length;
      expect(metadataMessageCount).toBe(1);
    });
  });

  describe("Failure diagnostics", () => {
    it("should buffer diagnostics and write NDJSON only on failure", () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-log-"));
      const logFile = path.join(tempDir, "storeconfig.log");

      try {
        logger.configureDiagnostics({
          level: "debug",
          maxEvents: 2,
          logFile,
          runtime: "cli",
        });
        logger.startRun({
          command: "fetch",
          runtime: "cli",
          runId: "test-run",
        });

        logger.debug("First internal event", {
          authorization: "Bearer secret-token",
        });
        logger.info("Second internal event", { ok: true });

        expect(fs.existsSync(logFile)).toBe(false);

        const failurePath = logger.writeFailureDiagnostics({
          command: "fetch",
          error: new Error("Network failed"),
          metadata: { appId: "123" },
        });

        expect(failurePath).toBe(logFile);

        const lines = fs.readFileSync(logFile, "utf8").trim().split("\n");
        expect(lines).toHaveLength(1);

        const event = JSON.parse(lines[0]);
        expect(event).toMatchObject({
          event: "error-context",
          runId: "test-run",
          runtime: "cli",
          command: "fetch",
          metadata: { appId: "123" },
        });
        expect(event.error).toMatchObject({
          name: "Error",
          message: "Network failed",
          stack: expect.any(String),
        });
        expect(event.recentEvents).toHaveLength(2);
        expect(event.recentEvents[0].meta.authorization).toBe("[REDACTED]");
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });
  });

  describe("Logger JSON Mode Support", () => {
    it("should support JSON output mode", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const modes = logger.getOutputModes();
      expect(modes).toEqual([{ mode: "json", showErrorStack: false }]);
    });

    it("should output valid JSON format for simple messages", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);

      const modes = logger.getOutputModes();
      expect(modes).toEqual([{ mode: "json", showErrorStack: false }]);

      logger.info("Test message");
      logger.warn("Test warning");
      logger.error("Test error");

      expect(stdoutWriteSpy).toHaveBeenCalledTimes(3);
      const outputs = stdoutWriteSpy.mock.calls.map(
        (call) => call[0] as string
      );

      outputs.forEach((output) => {
        const parsed = JSON.parse(output);
        expect(parsed).toHaveProperty("level");
        expect(parsed).toHaveProperty("message");
        expect(parsed).toHaveProperty("timestamp");
      });

      const infoOutput = JSON.parse(outputs[0]);
      expect(infoOutput.message).toContain("Test message");
      expect(infoOutput.level).toBe("INFO");
    });

    it("should output valid JSON format with metadata", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const metadata = { userId: "123", action: "test" };

      logger.info("Test message", metadata);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Test message");
      expect(parsed.meta).toMatchObject(metadata);
      expect(parsed.level).toBe("INFO");
    });

    it("should handle Error objects in JSON format without stack traces", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const testError = new Error("Test error");

      logger.error("Error occurred", testError);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Error occurred");
      expect(parsed.level).toBe("ERROR");
      expect(parsed.meta.message).toBe("Test error");
      expect(parsed.meta.stack).toBeUndefined();
    });

    it("should handle Error objects in JSON format with stack traces", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: true }]);
      const testError = new Error("Test error");
      testError.stack = "Error: Test error\n    at test (test.js:1:1)";

      logger.error("Error occurred", testError);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Error occurred");
      expect(parsed.level).toBe("ERROR");
      expect(parsed.meta.message).toBe("Test error");
      expect(parsed.meta.stack).toContain("at test");
    });

    it("should handle ContextualError objects in JSON format", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const contextualError = new ContextualError("API request failed", {
        endpoint: "/api/test",
        method: "GET",
        userId: "12345",
      });

      logger.error("Contextual error occurred", contextualError);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Contextual error occurred");
      expect(parsed.meta.message).toContain("API request failed");
      expect(parsed.meta.context.endpoint).toBe("/api/test");
      expect(parsed.meta.context.method).toBe("GET");
      expect(parsed.meta.context.userId).toBe("12345");
      expect(parsed.level).toBe("ERROR");
    });

    it("should handle nested Error objects in ContextualError", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const nestedError = new Error("Nested error");
      const contextualError = new ContextualError("API request failed", {
        originalError: nestedError,
        endpoint: "/api/test",
        method: "GET",
      });

      logger.error("Nested error occurred", contextualError);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Nested error occurred");
      expect(parsed.meta.message).toContain("API request failed");
      expect(parsed.meta.context.originalError).toBeDefined();
      expect(parsed.meta.context.originalError.message).toBe("Nested error");
      expect(parsed.meta.context.endpoint).toBe("/api/test");
      expect(parsed.meta.context.method).toBe("GET");
      expect(parsed.level).toBe("ERROR");
    });

    it("should handle multiple metadata arguments", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const metadata1 = { userId: "123" };
      const metadata2 = { action: "test" };

      logger.info("Test message", metadata1, metadata2);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Test message");
      expect(parsed.meta).toEqual([metadata1, metadata2]);
      expect(parsed.level).toBe("INFO");
    });

    it("should handle complex nested objects", () => {
      logger.setLevel("debug");
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
      const complexObject = {
        user: { id: "123", name: "John" },
        actions: ["create", "update", "delete"],
        metadata: {
          timestamp: new Date().toISOString(),
          nested: {
            value: 42,
            flag: true,
          },
        },
      };

      logger.debug("Complex object", complexObject);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Complex object");
      expect(parsed.meta.user.id).toBe("123");
      expect(parsed.meta.user.name).toBe("John");
      expect(parsed.meta.actions).toEqual(["create", "update", "delete"]);
      expect(parsed.meta.metadata.nested.value).toBe(42);
      expect(parsed.meta.metadata.nested.flag).toBe(true);
      expect(parsed.level).toBe("DEBUG");
    });

    it("should handle all log levels in JSON format", () => {
      logger.setLevel("debug");
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);

      logger.debug("Debug message");
      logger.info("Info message");
      logger.warn("Warning message");
      logger.error("Error message");

      expect(stdoutWriteSpy).toHaveBeenCalledTimes(4);
      const outputs = stdoutWriteSpy.mock.calls.map(
        (call) => call[0] as string
      );

      const parsed = outputs.map((output) => JSON.parse(output));

      expect(parsed.find((p) => p.level === "DEBUG")?.message).toContain(
        "Debug message"
      );
      expect(parsed.find((p) => p.level === "INFO")?.message).toContain(
        "Info message"
      );
      expect(parsed.find((p) => p.level === "WARN")?.message).toContain(
        "Warning message"
      );
      expect(parsed.find((p) => p.level === "ERROR")?.message).toContain(
        "Error message"
      );
    });

    it("should include timestamp in JSON output", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);

      logger.info("Test message");

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("Test message");
      expect(parsed.level).toBe("INFO");
      expect(parsed.timestamp).toBeDefined();
      expect(new Date(parsed.timestamp).getTime()).toBeGreaterThan(0);
    });

    it("should handle mixed output modes with JSON", () => {
      logger.setOutputModes([
        { mode: "json", showErrorStack: false },
        { mode: "json", showErrorStack: false },
      ]);

      const modes = logger.getOutputModes();
      expect(modes).toContainEqual({ mode: "json", showErrorStack: false });
      expect(modes).toHaveLength(2);
    });

    it("should handle invalid JSON mode gracefully", () => {
      logger.setOutputModes([
        { mode: "json", showErrorStack: false },
        { mode: "invalid" as any, showErrorStack: false },
      ]);

      const modes = logger.getOutputModes();
      expect(modes).toHaveLength(1);
      expect(modes).toEqual([{ mode: "json", showErrorStack: false }]);
    });
  });

  describe("Logger Zod Error Formatting", () => {
    beforeEach(() => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
    });

    it("should format Zod validation errors with user-friendly messages", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        age: z.number().min(18, "Age must be at least 18"),
        email: z.string().email("Invalid email format"),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({ name: "", age: 16, email: "invalid-email" });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Validation failed");
      expect(output).toContain("Name is required");
      expect(output).toContain("Age must be at least 18");
      expect(output).toContain("Invalid email format");
    });

    it("should handle Zod errors with nested objects", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

      const schema = z.object({
        user: z.object({
          profile: z.object({
            name: z.string().min(1, "Profile name is required"),
            age: z.number().min(18, "Profile age must be at least 18"),
          }),
        }),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({
          user: {
            profile: {
              name: "",
              age: 16,
            },
          },
        });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Nested validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Nested validation failed");
      expect(output).toContain("Profile name is required");
      expect(output).toContain("Profile age must be at least 18");
    });

    it("should handle Zod errors with arrays", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

      const schema = z.object({
        items: z.array(
          z.object({
            id: z.string().min(1, "Item ID is required"),
            value: z.number().min(0, "Item value must be non-negative"),
          })
        ),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({
          items: [
            { id: "", value: -1 },
            { id: "valid-id", value: 10 },
          ],
        });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Array validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Array validation failed");
      expect(output).toContain("Item ID is required");
      expect(output).toContain("Item value must be non-negative");
    });

    it("should handle Zod errors with custom error codes", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

      const schema = z.object({
        subscription: z
          .object({
            productId: z.string().min(1, "Product ID is required"),
            pricing: z.array(
              z.object({
                territory: z.string().min(1, "Territory is required"),
                price: z.string().min(1, "Price is required"),
              })
            ),
          })
          .refine((data) => data.pricing.length > 0, {
            message: "At least one pricing entry is required",
            path: ["pricing"],
          }),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({
          subscription: {
            productId: "com.example.monthly",
            pricing: [],
          },
        });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Custom validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Custom validation failed");
      expect(output).toContain("At least one pricing entry is required");
    });

    it("should handle Zod errors in JSON output mode", () => {
      logger.setOutputModes([{ mode: "json", showErrorStack: false }]);

      const schema = z.object({
        name: z.string().min(1, "Name is required"),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({ name: "" });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("JSON validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output);

      expect(parsed.message).toContain("JSON validation failed");
      expect(parsed.level).toBe("ERROR");
      expect(parsed.meta).toBeDefined();
    });

    it("should handle Zod errors with stack traces when enabled", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: true }]);

      const schema = z.object({
        value: z.number().min(0, "Value must be non-negative"),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({ value: -1 });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Stack trace validation failed", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalled();
      const output = stdoutWriteSpy.mock.calls[0][0] as string;

      expect(output).toContain("Stack trace validation failed");
      expect(output).toContain("Value must be non-negative");
    });

    it("should handle mixed error types including Zod errors", () => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

      const regularError = new Error("Regular error");
      const contextualError = new ContextualError("Contextual error", {
        field: "test",
      });

      const schema = z.object({
        data: z.string().min(1, "Data is required"),
      });

      let zodError: z.ZodError;
      try {
        schema.parse({ data: "" });
      } catch (error) {
        zodError = error as z.ZodError;
      }

      logger.error("Mixed errors", regularError);
      logger.error("Mixed errors", contextualError);
      logger.error("Mixed errors", zodError!);

      expect(stdoutWriteSpy).toHaveBeenCalledTimes(3);
      const outputs = stdoutWriteSpy.mock.calls.map(
        (call) => call[0] as string
      );
      const allOutput = outputs.join(" ");

      expect(allOutput).toContain("Mixed errors");
      expect(allOutput).toContain("Regular error");
      expect(allOutput).toContain("Contextual error");
      expect(allOutput).toContain("field");
      expect(allOutput).toContain("test");
      expect(allOutput).toContain("Data is required");
    });
  });

  describe("Logger Internal Functions - renderValue and processNestedErrors", () => {
    beforeEach(() => {
      logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
    });

    describe("renderValue function", () => {
      it("should handle string values correctly", () => {
        const testString = "Hello\nWorld\twith\ttabs";
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("String test", testString);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("String test");
        expect(output).toContain("Hello");
        expect(output).toContain("World");
        expect(output).toContain("with");
        expect(output).toContain("tabs");
      });

      it("should handle number values correctly", () => {
        const testNumbers = [0, 42, -123, 3.14, Infinity, -Infinity, NaN];
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        testNumbers.forEach((num) => {
          logger.info("Number test", num);
        });

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(testNumbers.length);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Number test");
        expect(allOutput).toContain("0");
        expect(allOutput).toContain("42");
        expect(allOutput).toContain("-123");
        expect(allOutput).toContain("3.14");
        expect(allOutput).toContain("Infinity");
        expect(allOutput).toContain("-Infinity");
        expect(allOutput).toContain("NaN");
      });

      it("should handle boolean values correctly", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Boolean test", true);
        logger.info("Boolean test", false);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Boolean test");
        expect(allOutput).toContain("true");
        expect(allOutput).toContain("false");
      });

      it("should handle null and undefined values correctly", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Null test", null);
        logger.info("Undefined test", undefined);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Null test");
        expect(allOutput).toContain("Undefined test");
        expect(allOutput).toContain("null");
        expect(allOutput).toContain("undefined");
      });

      it("should handle Date objects correctly", () => {
        const testDate = new Date("2023-12-25T10:30:00Z");
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Date test", testDate);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Date test");
        expect(output).toMatch(/\d{4}-\d{2}-\d{2}/);
      });

      it("should handle RegExp objects correctly", () => {
        const testRegex = /test-pattern/gi;
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Regex test", testRegex);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Regex test");
        expect(output).toContain("/test-pattern/gi");
      });

      it("should handle Function objects correctly", () => {
        const testFunction = () => "test";
        const namedFunction = function testFunc() {
          return "test";
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Function test", testFunction);
        logger.info("Named function test", namedFunction);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Function test");
        expect(allOutput).toContain("Named function test");
        expect(allOutput).toContain("function");
      });

      it("should handle Symbol values correctly", () => {
        const testSymbol = Symbol("test");
        const testSymbolWithDescription = Symbol.for("test");
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Symbol test", testSymbol);
        logger.info("Symbol with description test", testSymbolWithDescription);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Symbol test");
        expect(allOutput).toContain("Symbol with description test");
        expect(allOutput).toContain("Symbol");
      });

      it("should handle BigInt values correctly", () => {
        const testBigInt = BigInt(1234567890123456789);
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("BigInt test", testBigInt);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("BigInt test");
        expect(output).toContain("1234567890123456768n");
      });

      it("should handle empty objects and arrays correctly", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Empty object test", {});
        logger.info("Empty array test", []);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Empty object test");
        expect(allOutput).toContain("Empty array test");
        expect(allOutput).toContain("{}");
        expect(allOutput).toContain("[]");
      });

      it("should handle nested objects with various data types", () => {
        const complexObject = {
          string: "test",
          number: 42,
          boolean: true,
          nullValue: null,
          undefinedValue: undefined,
          date: new Date(),
          regex: /test/,
          symbol: Symbol("test"),
          bigint: BigInt(123),
          array: [1, "two", { nested: true }],
          nestedObject: {
            deep: {
              value: "deeply nested",
            },
          },
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Complex object test", complexObject);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Complex object test");
        expect(output).toContain("string");
        expect(output).toContain("test");
        expect(output).toContain("number");
        expect(output).toContain("42");
        expect(output).toContain("boolean");
        expect(output).toContain("true");
        expect(output).toContain("nullValue");
        expect(output).toContain("null");
        expect(output).toContain("undefinedValue");
        expect(output).toContain("undefined");
        expect(output).toContain("array");
        expect(output).toContain("nestedObject");
        expect(output).toContain("deep");
        expect(output).toContain("deeply nested");
      });

      it("should handle circular references gracefully", () => {
        const circularObj: any = { name: "test" };
        circularObj.self = circularObj;
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Circular reference test", circularObj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Circular reference test");
        expect(output).toContain("[Circular]");
        expect(output).toContain("name: 'test'");
      });

      it("should handle objects with non-enumerable properties", () => {
        const obj = { name: "test" };
        Object.defineProperty(obj, "hidden", {
          value: "secret",
          enumerable: false,
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Non-enumerable test", obj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Non-enumerable test");
        expect(output).toContain("name");
        expect(output).toContain("test");
      });

      it("should handle objects with getters and setters", () => {
        const obj = {
          _value: 42,
          get value() {
            return this._value;
          },
          set value(v) {
            this._value = v;
          },
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Getter/setter test", obj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Getter/setter test");
        expect(output).toContain("_value");
        expect(output).toContain("42");
      });

      it("should handle objects with prototype chain", () => {
        class TestClass {
          constructor(public name: string) {}
          get displayName() {
            return `Test: ${this.name}`;
          }
        }

        const instance = new TestClass("example");
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Class instance test", instance);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Class instance test");
        expect(output).toContain("name");
        expect(output).toContain("example");
      });

      it("should handle Map and Set objects", () => {
        const testMap = new Map([
          ["key1", "value1"],
          ["key2", "value2"],
        ]);
        const testSet = new Set([1, 2, 3, 4, 5]);
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Map test", testMap);
        logger.info("Set test", testSet);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Map test");
        expect(allOutput).toContain("Set test");
      });

      it("should handle WeakMap and WeakSet objects", () => {
        const testWeakMap = new WeakMap();
        const testWeakSet = new WeakSet();
        const obj1 = {};
        const obj2 = {};
        testWeakMap.set(obj1, "value1");
        testWeakSet.add(obj2);
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("WeakMap test", testWeakMap);
        logger.info("WeakSet test", testWeakSet);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("WeakMap test");
        expect(allOutput).toContain("WeakSet test");
      });

      it("should handle ArrayBuffer and TypedArray objects", () => {
        const buffer = new ArrayBuffer(8);
        const uint8Array = new Uint8Array(buffer);
        const int32Array = new Int32Array([1, 2, 3, 4]);
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ArrayBuffer test", buffer);
        logger.info("Uint8Array test", uint8Array);
        logger.info("Int32Array test", int32Array);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(3);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("ArrayBuffer test");
        expect(allOutput).toContain("Uint8Array test");
        expect(allOutput).toContain("Int32Array test");
      });

      it("should handle Error objects with and without stack traces", () => {
        const errorWithStack = new Error("Test error");
        errorWithStack.stack = "Error: Test error\n    at test (test.js:1:1)";
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error with stack test", errorWithStack);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error with stack test");
        expect(output).toContain("Test error");
      });

      it("should handle ContextualError objects", () => {
        const contextualError = new ContextualError("Test contextual error", {
          field: "test",
          value: 42,
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ContextualError test", contextualError);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("ContextualError test");
        expect(output).toContain("Test contextual error");
        expect(output).toContain("field");
        expect(output).toContain("test");
        expect(output).toContain("value");
        expect(output).toContain("42");
      });

      it("should handle ZodError objects", () => {
        const schema = z.object({
          name: z.string().min(1, "Name is required"),
        });

        let zodError: z.ZodError;
        try {
          schema.parse({ name: "" });
        } catch (error) {
          zodError = error as z.ZodError;
        }
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ZodError test", zodError!);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("ZodError test");
        expect(output).toContain("Name is required");
      });

      it("should handle very large objects", () => {
        const largeObject = {
          data: new Array(1000).fill(0).map((_, i) => ({
            id: i,
            name: `Item ${i}`,
            value: Math.random(),
          })),
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Large object test", largeObject);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Large object test");
        expect(output).toContain("data");
        expect(output).toContain("id");
        expect(output).toContain("name");
        expect(output).toContain("value");
      });

      it("should handle objects with very long strings", () => {
        const longString = "a".repeat(10000);
        const objWithLongString = {
          longString,
          normalString: "normal",
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Long string test", objWithLongString);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Long string test");
        expect(output).toContain("longString");
        expect(output).toContain("normalString");
        expect(output).toContain("normal");
      });

      it("should handle deeply nested objects", () => {
        let deepObject: any = { value: "deep" };
        for (let i = 0; i < 100; i++) {
          deepObject = { nested: deepObject, level: i };
        }
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Deep object test", deepObject);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Deep object test");
        expect(output).toContain("nested");
        expect(output).toContain("level");
        expect(output).toContain("value");
        expect(output).toContain("deep");
      });
    });

    describe("processNestedErrors function", () => {
      it("should log processed multiline Error without stack", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        try {
          throw new Error("Line 1\nLine 2\nLine 3");
        } catch (err) {
          const processedError = processNestedErrors(err, false);
          logger.error("test", processedError);
        }

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("test");
        expect(output).toContain("Line 1");
        expect(output).toContain("Line 2");
        expect(output).toContain("Line 3");
      });

      it("should handle null and undefined values", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Null test", null);
        logger.info("Undefined test", undefined);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(2);
        const outputs = stdoutWriteSpy.mock.calls.map(
          (call) => call[0] as string
        );
        const allOutput = outputs.join(" ");

        expect(allOutput).toContain("Null test");
        expect(allOutput).toContain("Undefined test");
        expect(allOutput).toContain("null");
        expect(allOutput).toContain("undefined");
      });

      it("should process Error objects without stack traces", () => {
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at test (test.js:1:1)";
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error without stack test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error without stack test");
        expect(output).toContain("Test error");
      });

      it("should process Error objects with stack traces when enabled", () => {
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at test (test.js:1:1)";
        logger.setOutputModes([{ mode: "console", showErrorStack: true }]);

        logger.info("Error with stack test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error with stack test");
        expect(output).toContain("Test error");
      });

      it("should process Error objects with custom properties", () => {
        const error = new Error("Test error");
        (error as any).customProperty = "custom value";
        (error as any).nestedProperty = { value: 42 };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error with custom properties test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error with custom properties test");
        expect(output).toContain("Test error");
        expect(output).toContain("customProperty");
        expect(output).toContain("custom value");
        expect(output).toContain("nestedProperty");
        expect(output).toContain("42");
      });

      it("should process ContextualError objects", () => {
        const contextualError = new ContextualError("Test contextual error", {
          field: "test",
          value: 42,
          nested: { deep: "value" },
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ContextualError test", contextualError);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("ContextualError test");
        expect(output).toContain("Test contextual error");
        expect(output).toContain("field");
        expect(output).toContain("test");
        expect(output).toContain("value");
        expect(output).toContain("42");
        expect(output).toContain("nested");
        expect(output).toContain("deep");
      });

      it("should process ContextualError with nested Error objects", () => {
        const nestedError = new Error("Nested error");
        const contextualError = new ContextualError("Test contextual error", {
          originalError: nestedError,
          field: "test",
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ContextualError with nested error test", contextualError);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("ContextualError with nested error test");
        expect(output).toContain("Test contextual error");
        expect(output).toContain("originalError");
        expect(output).toContain("Nested error");
        expect(output).toContain("field");
        expect(output).toContain("test");
      });

      it("should process ZodError objects", () => {
        const schema = z.object({
          name: z.string().min(1, "Name is required"),
          age: z.number().min(18, "Age must be at least 18"),
        });

        let zodError: z.ZodError;
        try {
          schema.parse({ name: "", age: 16 });
        } catch (error) {
          zodError = error as z.ZodError;
        }
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("ZodError test", zodError!);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("ZodError test");
        expect(output).toContain("Name is required");
        expect(output).toContain("Age must be at least 18");
      });

      it("should process arrays containing Error objects", () => {
        const errorArray = [
          new Error("Error 1"),
          new ContextualError("Contextual error", { field: "test" }),
          "normal string",
          42,
          { nested: new Error("Nested error") },
        ];
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Array with errors test", errorArray);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Array with errors test");
        expect(output).toContain("Error 1");
        expect(output).toContain("Contextual error");
        expect(output).toContain("field");
        expect(output).toContain("test");
        expect(output).toContain("normal string");
        expect(output).toContain("42");
        expect(output).toContain("nested");
        expect(output).toContain("Nested error");
      });

      it("should process objects with Error objects in nested properties", () => {
        const objWithErrors = {
          normal: "value",
          error: new Error("Test error"),
          nested: {
            contextualError: new ContextualError("Nested contextual error", {
              field: "nested",
            }),
            array: [new Error("Array error"), "normal"],
          },
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Object with nested errors test", objWithErrors);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Object with nested errors test");
        expect(output).toContain("normal");
        expect(output).toContain("value");
        expect(output).toContain("Test error");
        expect(output).toContain("Nested contextual error");
        expect(output).toContain("field");
        expect(output).toContain("nested");
        expect(output).toContain("Array error");
      });

      it("should process circular references with Error objects", () => {
        const error = new Error("Circular error");
        const obj: any = { error };
        obj.self = obj;
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Circular reference with error test", obj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Circular reference with error test");
        expect(output).toContain("[Circular]");
        expect(output).toContain("message: 'Circular error'");
      });

      it("should process deeply nested Error objects", () => {
        let deepError: any = new Error("Deep error");
        for (let i = 0; i < 10; i++) {
          deepError = { nested: deepError, level: i };
        }
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Deep error test", deepError);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Deep error test");
        expect(output).toContain("Deep error");
        expect(output).toContain("nested");
        expect(output).toContain("level");
      });

      it("should process Error objects with complex context", () => {
        const complexError = new ContextualError("Complex error", {
          simple: "value",
          array: [1, 2, 3],
          object: { nested: true },
          error: new Error("Nested error"),
          date: new Date(),
          regex: /test/,
          nullValue: null,
          undefinedValue: undefined,
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Complex error context test", complexError);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Complex error context test");
        expect(output).toContain("Complex error");
        expect(output).toContain("simple");
        expect(output).toContain("value");
        expect(output).toContain("array");
        expect(output).toContain("object");
        expect(output).toContain("nested");
        expect(output).toContain("Nested error");
        expect(output).toContain("nullValue");
        expect(output).toContain("null");
        expect(output).toContain("undefinedValue");
        expect(output).toContain("undefined");
      });

      it("should process mixed data types with errors", () => {
        const mixedData = {
          string: "test",
          number: 42,
          boolean: true,
          nullValue: null,
          undefinedValue: undefined,
          error: new Error("Mixed error"),
          contextualError: new ContextualError("Mixed contextual error", {
            field: "mixed",
          }),
          array: ["string", 42, new Error("Array error")],
          object: {
            nested: true,
            error: new Error("Object error"),
          },
          date: new Date(),
          regex: /test/,
          symbol: Symbol("test"),
          bigint: BigInt(123),
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Mixed data with errors test", mixedData);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Mixed data with errors test");
        expect(output).toContain("string");
        expect(output).toContain("test");
        expect(output).toContain("number");
        expect(output).toContain("42");
        expect(output).toContain("boolean");
        expect(output).toContain("true");
        expect(output).toContain("Mixed error");
        expect(output).toContain("Mixed contextual error");
        expect(output).toContain("field");
        expect(output).toContain("mixed");
        expect(output).toContain("Array error");
        expect(output).toContain("Object error");
      });

      it("should handle Error objects with stack traces in different modes", () => {
        const error = new Error("Stack trace test");
        error.stack =
          "Error: Stack trace test\n    at test (test.js:1:1)\n    at another (test.js:2:2)";

        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        logger.info("Error without stack test", error);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(1);
        const output1 = stdoutWriteSpy.mock.calls[0][0] as string;
        expect(output1).toContain("Error without stack test");
        expect(output1).toContain("Stack trace test");

        stdoutWriteSpy.mockClear();

        logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
        logger.info("Error with stack test", error);

        expect(stdoutWriteSpy).toHaveBeenCalledTimes(1);
        const output2 = stdoutWriteSpy.mock.calls[0][0] as string;
        expect(output2).toContain("Error with stack test");
        expect(output2).toContain("Stack trace test");
      });

      it("should handle Error objects without stack traces", () => {
        const error = new Error("No stack error");
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error without stack property test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error without stack property test");
        expect(output).toContain("No stack error");
      });

      it("should handle Error objects with empty stack traces", () => {
        const error = new Error("Empty stack error");
        error.stack = "";
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error with empty stack test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error with empty stack test");
        expect(output).toContain("Empty stack error");
      });

      it("should handle Error objects with custom enumerable properties", () => {
        const error = new Error("Custom properties error");
        (error as any).customProp = "custom value";
        (error as any).anotherProp = { nested: true };

        Object.defineProperty(error, "enumerableProp", {
          value: "enumerable value",
          enumerable: true,
          writable: true,
          configurable: true,
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Error with custom properties test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Error with custom properties test");
        expect(output).toContain("Custom properties error");
        expect(output).toContain("customProp");
        expect(output).toContain("custom value");
        expect(output).toContain("anotherProp");
        expect(output).toContain("nested");
        expect(output).toContain("enumerableProp");
        expect(output).toContain("enumerable value");
      });
    });

    describe("ContextualError with undefined or empty context", () => {
      it("should not print context property when context is undefined", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new ContextualError("Simple error message");

        logger.error("Test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Test");
        expect(output).toContain("Simple error message");
        expect(output).not.toMatch(/context:/);
        expect(output).not.toMatch(/context: undefined/);
      });

      it("should not print context property when context is explicitly undefined", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new ContextualError("Another error", undefined);

        logger.error("Test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Test");
        expect(output).toContain("Another error");
        expect(output).not.toMatch(/context:/);
        expect(output).not.toMatch(/context: undefined/);
      });

      it("should print context when it has valid data", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new ContextualError("Error with context", {
          field: "value",
        });

        logger.error("Test error", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Test error");
        expect(output).toContain("Error with context");
        expect(output).toContain("context");
        expect(output).toContain("field");
        expect(output).toContain("value");
      });

      it("should not print empty object context", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new ContextualError("Error with empty context", {});

        logger.error("Test error", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Test error");
        expect(output).toContain("Error with empty context");
        expect(output).not.toMatch(/context:\s*\{\s*\}/);
      });

      it("should not print undefined context in JSON mode", () => {
        logger.setOutputModes([{ mode: "json", showErrorStack: false }]);
        const error = new ContextualError("Error without context");

        logger.error("Test error", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;
        const parsed = JSON.parse(output);

        expect(parsed.message).toContain("Test error");
        expect(parsed.meta.message).toContain("Error without context");
        expect(parsed.meta.context).toBeUndefined();
      });

      it("should handle Error objects with undefined custom properties", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new Error("Test error");
        (error as any).customProp = undefined;
        (error as any).validProp = "valid";

        logger.error("Test", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Test");
        expect(output).toContain("Test error");
        expect(output).toContain("validProp");
        expect(output).toContain("valid");
        expect(output).not.toContain("customProp");
      });

      it("should not output anything extra when ContextualError has only message", () => {
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
        const error = new ContextualError("Just a message");

        logger.error("Just a message", error);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Just a message");
        expect(output.match(/\{/g)?.length || 0).toBeLessThanOrEqual(0);
      });
    });

    describe("Error handling in renderValue", () => {
      it("should handle objects that cause util.inspect to throw", () => {
        const problematicObj = {
          self: null as any,
          get problematicGetter() {
            return this.self;
          },
        };
        problematicObj.self = problematicObj;
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Problematic object test", problematicObj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Problematic object test");
      });

      it("should handle objects with circular references that cause issues", () => {
        const circularObj: any = { name: "test" };
        circularObj.self = circularObj;

        Object.defineProperty(circularObj, "problematic", {
          get() {
            return this.self;
          },
          enumerable: true,
        });
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Circular reference problematic test", circularObj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Circular reference problematic test");
        expect(output).toContain("[Circular]");
        expect(output).toContain("name: 'test'");
      });

      it("should handle very large objects that might cause memory issues", () => {
        const largeObj = {
          data: new Array(10000).fill(0).map((_, i) => ({
            id: i,
            value: `Item ${i}`,
            nested: { level: i % 100 },
          })),
        };
        logger.setOutputModes([{ mode: "console", showErrorStack: false }]);

        logger.info("Very large object test", largeObj);

        expect(stdoutWriteSpy).toHaveBeenCalled();
        const output = stdoutWriteSpy.mock.calls[0][0] as string;

        expect(output).toContain("Very large object test");
        expect(output).toContain("data");
        expect(output).toContain("id");
        expect(output).toContain("value");
        expect(output).toContain("nested");
        expect(output).toContain("level");
      });
    });
  });
});
