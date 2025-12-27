#!/usr/bin/env node
import "./load-env";
import "./services/instrument";
import Bugsnag from "@bugsnag/js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logger, processNestedErrors } from "@semihcihan/shared";

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
import { userService } from "./services/user-service";

logger.setOutputModes([{ mode: "console", showErrorStack: false }]);
logger.setLevel("info");

async function main() {
  const parser = yargs(hideBin(process.argv))
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
        requireAuth();
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
}

main().catch((err) => {
  let command = "unknown";

  try {
    const processArgs = process.argv?.slice(2) || [];
    command = processArgs[0] || "unknown";
  } catch (error) {
    command = "unknown";
  }

  let processedError = processNestedErrors(err, false);

  logger.error(`Command '${command}' failed`, processedError);
  Bugsnag.notify(err, (event) => {
    event.addMetadata("metadata", { command, context: processedError });
    const email = userService.loadUser();
    if (email) {
      event.setUser(email, email);
    }
  });
  process.exitCode = 1;
});
