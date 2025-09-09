import { logger } from "@semihcihan/shared";
import { ContextualError } from "@semihcihan/shared";

const testError = new Error("This is a test error");

const contextualError = new ContextualError("API request failed", {
  testError,
  endpoint: "/api/apps",
  method: "GET",
  userId: "12345",
  timestamp: new Date().toISOString(),
});

// const contextualError2 = new ContextualError("API request failed", {
//   endpoint: "/api/apps",
//   method: "GET",
//   userId: "12345",
//   timestamp: new Date().toISOString(),
// });

logger.setLevel("debug");

// Test 1: showErrorStack: false - should remove all stack traces
console.log("=== Test 1: showErrorStack: false ===");
logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
logger.debug("message", contextualError);

// Test 2: showErrorStack: true - should show all stack traces
console.log("\n=== Test 2: showErrorStack: true ===");
logger.setOutputModes([{ mode: "console", showErrorStack: true }]);
logger.debug("message", contextualError);

// Test 3: Mixed output modes
console.log("\n=== Test 3: Mixed output modes ===");
logger.setOutputModes(
  [
    { mode: "console", showErrorStack: false },
    { mode: "file", showErrorStack: true },
  ],
  "test-logs.log"
);
logger.debug("message", contextualError);

// logger.debug(`
//   hey
//   hey2
//   hey3
//   `);

// // Example 1: Console-only logging (default)
// console.log("=== Console-only logging (default) ===");
// logger.info("This message appears in console");
// logger.warn("Warning message - console");
// logger.error("Error message - console", contextualError);

// // Example 2: Switch to file-only logging
// console.log("\n=== Switching to file-only logging ===");
// logger.setOutputModes(
//   [{ mode: "file", showErrorStack: true }],
//   "test-logs.log"
// );
// logger.info("This message will only appear in file");
// logger.warn("Warning message - file only");
// logger.error("Error message - file only", contextualError);

// // Example 3: Test both console and file with different error stack settings
// console.log(
//   "\n=== Both console and file logging with different error stack settings ==="
// );
// logger.setOutputModes(
//   [
//     { mode: "console", showErrorStack: false },
//     { mode: "file", showErrorStack: true },
//   ],
//   "test-logs.log"
// );
// logger.info("This message will appear in both console and file");
// logger.error(
//   "Error message - console shows no stack, file shows full stack",
//   contextualError
// );

// console.log("\n=== Test completed successfully! ===");
// console.log("✓ Console output: Shows error message without stack trace");
// console.log("✓ File output: Shows error message with full stack trace");
// console.log(
//   "✓ Each transport controls its own error stack display independently"
// );

// // // Example 4: Switch to different file
// // console.log("\n=== Different file logging ===");
// // logger.setOutputMode("file", "test-logs-2.log");
// // logger.info("This message will go to the new log file");

// // // Example 5: Test all log levels with file logging
// // console.log("\n=== Testing all log levels in file ===");
// // logger.debug("Debug message");
// // logger.info("Info message");
// // logger.warn("Warning message");
// // logger.error("Error message", testError);

// // // (async () => {
// // //   try {
// // //     // Purposely make a wrong call: using invalid app ID
// // //     // This should trigger an Apple API error (404) and throw a ContextualError
// // //     const response = await import("../domains/apps/api-client").then((mod) =>
// // //       mod.fetchApp("12132134234826348236428364283462")
// // //     );
// // //     logger.info("Unexpected success", response);
// // //   } catch (err) {
// // //     logger.debug("Caught error from fetchApp:", err);
// // //     let newError = new ContextualError("API request failed", {
// // //       err,
// // //       endpoint: "/v1/apps/{id}",
// // //       method: "GET",
// // //       userId: "12345",
// // //       timestamp: new Date().toISOString(),
// // //     });
// // //     logger.debug("newError", err);
// // //     logger.debug("Wrapped error:", newError);
// // //   }
// // // })();

// // // [logger.error].forEach((logLevel) => {
// // //   logLevel("hey1", testError);
// // //   logLevel("hey1", contextualError);
// // //   logLevel("hey1", contextualError2);
// // //   logLevel("hey2", contextualError, contextualError);
// // //   logLevel("hey2", contextualError2, contextualError2);

// // //   logLevel({ hello: "world" }, testError);
// // //   logLevel({ hello: "world" }, contextualError);
// // //   logLevel({ hello: "world" }, contextualError2);
// // //   logLevel("heyyy");
// // //   logLevel("heyyyyy", { hello: "world" });
// // //   logLevel("heyyyyy", { hello: "world" }, testError);
// // //   logLevel("heyyyyy", { hello: "world" }, contextualError);
// // //   logLevel("heyyyyy", { hello: "world" }, contextualError2);
// // //   logLevel("heyyyyy", { hello: "world" }, { hello: "world" });
// // //   logLevel("heyyyyy", { hello: "world" }, { hello: "world" }, testError);
// // //   logLevel("heyyyyy", { hello: "world" }, { hello: "world" }, contextualError);
// // // });

// // logger.error("hey", contextualError);

// // // throw contextualError;
