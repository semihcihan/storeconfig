import Bugsnag from "@bugsnag/js";
import { version } from "../../package.json";

const isDevelopment = process.env.NODE_ENV == "development";
const isTelemetryDisabled =
  process.env.STORECONFIG_DISABLE_TELEMETRY === "true" ||
  process.env.BUGSNAG_ENABLED === "false";
const bugsnagApiKey =
  process.env.BUGSNAG_API_KEY || process.env.STORECONFIG_BUGSNAG_API_KEY;

if (!isDevelopment && !isTelemetryDisabled && bugsnagApiKey) {
  Bugsnag.start({
    apiKey: bugsnagApiKey,
    autoTrackSessions: false,
    appVersion: version,
    logger: null,
    enabledBreadcrumbTypes: ["error", "manual"],
  });
} else {
  Bugsnag.notify = () => {}; // No-op function
}
