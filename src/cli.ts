#!/usr/bin/env node

import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import validateFormatCmd from "./commands/validate";
import applyCmd from "./commands/apply";
import fetchCmd from "./commands/fetch";

dotenv.config();

yargs(hideBin(process.argv))
  .command(validateFormatCmd)
  .command(applyCmd)
  .command(fetchCmd)
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
