#!/usr/bin/env node

import dotenv from "dotenv";
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config({ path: ".env.internal" });
dotenv.config();

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logger, LOG_LEVELS, DEFAULT_LOG_LEVEL } from "./utils/logger";

import validateFormatCmd from "./commands/validate";
import applyCmd from "./commands/apply";
import fetchCmd from "./commands/fetch";
import setPriceCmd from "./commands/set-price";
import comparePriceCmd from "./commands/compare-price";
import exampleCmd from "./commands/example";

yargs(hideBin(process.argv))
  .option("log-level", {
    alias: "l",
    describe: "Set the log level (debug, info, warn, error)",
    type: "string",
    choices: LOG_LEVELS,
    default: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  })
  .middleware((argv) => {
    // Set the log level from command line argument
    if (argv.logLevel) {
      logger.setLevel(argv.logLevel as any);
    }
  })
  .command(validateFormatCmd)
  .command(applyCmd)
  .command(fetchCmd)
  .command(setPriceCmd)
  .command(comparePriceCmd)
  .command(exampleCmd)
  .command({
    command: "plan",
    describe: "Show a plan of changes (dry run) - alias for apply --preview",
    builder: applyCmd.builder,
    handler: (argv) => {
      argv.preview = true;
      return applyCmd.handler!(argv);
    },
  })
  .demandCommand()
  .help().argv;
