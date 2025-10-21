#!/usr/bin/env node

import dotenv from "dotenv";
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config();

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logger } from "@semihcihan/shared";

import validateFormatCmd from "./commands/validate";
import applyCmd from "./commands/apply";
import fetchCmd from "./commands/fetch";
import setPriceCmd from "./commands/set-price";
import comparePriceCmd from "./commands/compare-price";
import exampleCmd from "./commands/example";
import configureCmd from "./commands/configure";
import appleCmd from "./commands/apple";
import userCmd from "./commands/user";
import { requireAuth } from "./services/api-client";

logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
logger.setLevel("info");

yargs(hideBin(process.argv))
  .middleware((argv) => {
    // Commands that require authentication
    const protectedCommands = [
      "fetch",
      "apply",
      "set-price",
      "compare-price",
      "apple",
      "user",
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
  .command(userCmd)
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
