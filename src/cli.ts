#!/usr/bin/env node

import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import newCmd from "./commands/new";
import validateCmd from "./commands/validate";
import planCmd from "./commands/plan";
import applyCmd from "./commands/apply";
import fetchCmd from "./commands/fetch";

dotenv.config();

yargs(hideBin(process.argv))
  .command(newCmd)
  .command(validateCmd)
  .command(planCmd)
  .command(applyCmd)
  .command(fetchCmd)
  .demandCommand()
  .help().argv;
