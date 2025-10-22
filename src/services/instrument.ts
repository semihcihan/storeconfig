import Bugsnag from "@bugsnag/js";
import { version } from "../../package.json";

const isDevelopment = process.env.NODE_ENV == "development";
if (!isDevelopment) {
  Bugsnag.start({
    apiKey: "9214ba2acdaeee4012c236461232c4f3",
    autoTrackSessions: false,
    appVersion: version,
    logger: null,
    enabledBreadcrumbTypes: ["error", "manual"],
  });
} else {
  Bugsnag.notify = () => {}; // No-op function
}
