#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const dotenv = require("dotenv");

const DEFAULT_REPO = "semihcihan/storeconfig";
const DEFAULT_REF = "main";
const WORKFLOW = "refresh-price-points.yml";
const RESOURCE_FILES = ["index", "app", "iap", "subscription"];
const SECRET_NAMES = [
  "ASC_PRIVATE_KEY",
  "ASC_KEY_ID",
  "ASC_ISSUER_ID",
  "FALLBACK_APP_APPLE_ID",
  "FALLBACK_IAP_APPLE_ID",
  "FALLBACK_SUBSCRIPTION_APPLE_ID",
];

function loadEnvFiles() {
  const envFiles = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../.env"),
  ];

  for (const envFile of [...new Set(envFiles)]) {
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile });
    }
  }
}

function pricePointsRepo() {
  const repo = (
    process.env.STORECONFIG_PRICE_POINTS_REPO || DEFAULT_REPO
  ).trim();

  if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    throw new Error(
      `STORECONFIG_PRICE_POINTS_REPO must be in OWNER/REPO form, got '${repo}'`
    );
  }

  return repo;
}

function pricePointsRef() {
  return (process.env.STORECONFIG_PRICE_POINTS_REF || DEFAULT_REF).trim();
}

function pricePointsBaseUrl(repo = pricePointsRepo()) {
  const configured = process.env.STORECONFIG_PRICE_POINTS_BASE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const [owner, repoName] = repo.split("/");
  if (repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
    return `https://${repoName.toLowerCase()}/price-points`;
  }

  return `https://${owner}.github.io/${repoName}/price-points`;
}

function run(command, args, input) {
  const result = spawnSync(command, args, {
    input,
    stdio: input === undefined ? "inherit" : ["pipe", "inherit", "inherit"],
    shell: process.platform === "win32",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function readRequiredEnv(name) {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value;
}

function capture(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });

  return {
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error,
  };
}

function outputText(result) {
  return `${result.stderr || ""}${result.stdout || ""}`;
}

function isPlanUnsupportedForPages(result) {
  return outputText(result).includes(
    "current plan does not support GitHub Pages"
  );
}

function setupPages() {
  const repo = pricePointsRepo();
  console.log(`Configuring GitHub Pages for ${repo}...`);

  const post = capture("gh", [
    "api",
    "--method",
    "POST",
    `repos/${repo}/pages`,
    "-f",
    "build_type=workflow",
  ]);

  if (post.status === 0) {
    console.log(`Configured GitHub Pages for ${repo}.`);
    return;
  }

  if (isPlanUnsupportedForPages(post)) {
    throw new Error(
      `GitHub Pages is not available for ${repo} on the current GitHub plan. Use a public repository for the snapshots, or set STORECONFIG_PRICE_POINTS_REPO to a repository whose plan supports Pages.`
    );
  }

  const put = capture("gh", [
    "api",
    "--method",
    "PUT",
    `repos/${repo}/pages`,
    "-f",
    "build_type=workflow",
  ]);

  if (put.status === 0) {
    console.log(`Updated GitHub Pages for ${repo}.`);
    return;
  }

  process.stderr.write(outputText(post));
  process.stderr.write(outputText(put));
  process.exit(put.status || post.status || 1);
}

function syncSecrets() {
  const repo = pricePointsRepo();

  for (const secretName of SECRET_NAMES) {
    run(
      "gh",
      ["secret", "set", secretName, "--app", "actions", "-R", repo],
      readRequiredEnv(secretName)
    );
  }

  console.log(`Synced ${SECRET_NAMES.length} price point secrets to ${repo}.`);
}

function refresh() {
  run("gh", [
    "workflow",
    "run",
    WORKFLOW,
    "-R",
    pricePointsRepo(),
    "--ref",
    pricePointsRef(),
  ]);
}

function latestRefreshRunId() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const result = capture("gh", [
      "run",
      "list",
      "-R",
      pricePointsRepo(),
      "--workflow",
      WORKFLOW,
      "--limit",
      "1",
      "--json",
      "databaseId",
      "--jq",
      ".[0].databaseId",
    ]);

    const runId = result.stdout.trim();
    if (result.status === 0 && runId) {
      return runId;
    }

    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
  }

  throw new Error(`No ${WORKFLOW} run found for ${pricePointsRepo()}`);
}

function watch() {
  run("gh", [
    "run",
    "watch",
    "-R",
    pricePointsRepo(),
    "--exit-status",
    latestRefreshRunId(),
  ]);
}

async function verify() {
  const baseUrl = pricePointsBaseUrl();

  for (const file of RESOURCE_FILES) {
    const url = `${baseUrl}/${file}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    console.log(`OK ${url}`);
  }
}

function printUrl() {
  console.log(pricePointsBaseUrl());
}

async function main() {
  const command = process.argv[2];

  switch (command) {
    case "setup-pages":
      setupPages();
      break;
    case "secrets":
      syncSecrets();
      break;
    case "refresh":
      refresh();
      break;
    case "watch":
      watch();
      break;
    case "verify":
      await verify();
      break;
    case "url":
      printUrl();
      break;
    default:
      console.error(
        "Usage: node scripts/price-points-github.js <setup-pages|secrets|refresh|watch|verify|url>"
      );
      process.exit(1);
  }
}

loadEnvFiles();

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
