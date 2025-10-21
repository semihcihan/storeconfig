const Bugsnag = require("@bugsnag/js");
Bugsnag.start({
  apiKey: "9214ba2acdaeee4012c236461232c4f3",
  autoTrackSessions: false,
  appType: "worker",
  logger: null,
});
