const { spawnSync } = require("child_process");

const apiKey =
  process.env.BUGSNAG_API_KEY || process.env.STORECONFIG_BUGSNAG_API_KEY;

if (!apiKey) {
  console.log(
    "Skipping Bugsnag source map upload: BUGSNAG_API_KEY is not set."
  );
  process.exit(0);
}

const result = spawnSync(
  "npx",
  [
    "bugsnag-source-maps",
    "upload-node",
    "--api-key",
    apiKey,
    "--overwrite",
    "--detect-app-version",
    "--bundle",
    "dist/cli.js",
    "--source-map",
    "dist/cli.js.map",
  ],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  }
);

process.exit(result.status ?? 1);
