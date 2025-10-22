import Bugsnag from "@bugsnag/js";

const isDevelopment = process.env.NODE_ENV == "development";
if (!isDevelopment) {
  Bugsnag.start({
    apiKey: "9214ba2acdaeee4012c236461232c4f3",
    autoTrackSessions: false,
    appType: "worker",
    logger: null,
  });
} else {
  Bugsnag.notify = () => {}; // No-op function
}
