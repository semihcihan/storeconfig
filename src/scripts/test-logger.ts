import { logger, setLogLevel, LOG_LEVELS } from "../utils/logger";
import { ContextualError } from "../helpers/error-handling-helpers";

const testError = new Error("This is a test error");

const contextualError = new ContextualError("API request failed", testError, {
  endpoint: "/api/apps",
  method: "GET",
  userId: "12345",
  timestamp: new Date().toISOString(),
});

const contextualError2 = new ContextualError("API request failed", {
  endpoint: "/api/apps",
  method: "GET",
  userId: "12345",
  timestamp: new Date().toISOString(),
});

[logger.debug, logger.info, logger.warn, logger.error].forEach((logLevel) => {
  logLevel("hey1", testError);
  logLevel("hey1", contextualError);
  logLevel("hey1", contextualError2);
  logLevel("hey2", contextualError, contextualError);
  logLevel("hey2", contextualError2, contextualError2);

  logLevel({ hello: "world" }, testError);
  logLevel({ hello: "world" }, contextualError);
  logLevel({ hello: "world" }, contextualError2);
  logLevel("heyyy");
  logLevel("heyyyyy", { hello: "world" });
  logLevel("heyyyyy", { hello: "world" }, testError);
  logLevel("heyyyyy", { hello: "world" }, contextualError);
  logLevel("heyyyyy", { hello: "world" }, contextualError2);
  logLevel("heyyyyy", { hello: "world" }, { hello: "world" });
  logLevel("heyyyyy", { hello: "world" }, { hello: "world" }, testError);
  logLevel("heyyyyy", { hello: "world" }, { hello: "world" }, contextualError);
});

// throw contextualError;
