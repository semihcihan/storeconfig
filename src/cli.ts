#!/usr/bin/env node

import dotenv from "dotenv";
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config();

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logger, LOG_LEVELS, DEFAULT_LOG_LEVEL } from "@semihcihan/shared";

import validateFormatCmd from "./commands/validate";
import applyCmd from "./commands/apply";
import fetchCmd from "./commands/fetch";
import setPriceCmd from "./commands/set-price";
import comparePriceCmd from "./commands/compare-price";
import exampleCmd from "./commands/example";
import configureCmd from "./commands/configure";
import appleCmd from "./commands/apple";
import { requireAuth } from "./services/api-client";

logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
logger.setLevel("info");

yargs(hideBin(process.argv))
  .option("log-level", {
    alias: "l",
    describe: "Set the log level (debug, info, warn, error)",
    type: "string",
    choices: LOG_LEVELS,
    default: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  })
  .middleware((argv) => {
    // Commands that require authentication
    const protectedCommands = [
      "fetch",
      "apply",
      "set-price",
      "compare-price",
      "apple",
    ];
    const command = argv._[0] as string;

    if (protectedCommands.includes(command)) {
      try {
        requireAuth();
      } catch (error) {
        logger.error("Authentication required", error);
        process.exit(1);
      }
    }
  })
  .command(validateFormatCmd)
  .command(applyCmd)
  .command(fetchCmd)
  .command(setPriceCmd)
  .command(comparePriceCmd)
  .command(exampleCmd)
  .command(configureCmd)
  .command(appleCmd)
  .command({
    command: "plan",
    describe: "Show a plan of changes (dry run) - alias for apply --preview",
    builder: applyCmd.builder,
    handler: (argv) => {
      argv.preview = true;
      return applyCmd.handler!(argv);
    },
  })
  .demandCommand(1, "Please specify a command")
  .strict()
  .fail((msg, err, yargs) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.error(msg);
    }
    logger.std("\n" + yargs.help());
    process.exit(1);
  })
  .help().argv;
