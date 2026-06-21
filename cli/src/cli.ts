#!/usr/bin/env node
import "./load-env";
import "./services/instrument";
import Bugsnag from "@bugsnag/js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  DEFAULT_DIAGNOSTICS_LOG_LEVEL,
  DEFAULT_LOG_LEVEL,
  logger,
  processNestedErrors,
  type LogLevel,
} from "@semihcihan/shared";

import { localCommands } from "./commands/local-commands";
import { checkVersionUpdateSync } from "./services/version-check-service";

logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
logger.setLevel((process.env.LOG_LEVEL as LogLevel) || DEFAULT_LOG_LEVEL);
logger.configureDiagnostics({
  level:
    (process.env.STORECONFIG_FILE_LOG_LEVEL as LogLevel) ||
    DEFAULT_DIAGNOSTICS_LOG_LEVEL,
  logFile: process.env.STORECONFIG_LOG_FILE,
  runtime: "cli",
});
logger.startRun({
  command: process.argv?.slice(2)[0] || "unknown",
  runtime: "cli",
});

async function main() {
  checkVersionUpdateSync();

  const parser = localCommands
    .reduce(
      (currentParser, command) => currentParser.command(command),
      yargs(hideBin(process.argv))
    )
    .demandCommand(1, "Please specify a command")
    .strict()
    .fail(async (msg, err, yargs) => {
      if (msg) {
        logger.error(
          msg,
          "Use 'storeconfig --help' to see available commands and options."
        );
        process.exit(1);
      }
    })
    .help();

  await parser.parseAsync();
  logger.clearDiagnosticsBuffer();
}

main().catch((err) => {
  let command = "unknown";

  try {
    const processArgs = process.argv?.slice(2) || [];
    command = processArgs[0] || "unknown";
  } catch (error) {
    command = "unknown";
  }

  const processedError = processNestedErrors(err, false);

  logger.writeFailureDiagnostics({
    command,
    error: err,
    metadata: { processedError },
  });
  logger.error(`Command '${command}' failed`, processedError);
  Bugsnag.notify(err, (event) => {
    event.addMetadata("metadata", { command, context: processedError });
  });
  process.exitCode = 1;
});
