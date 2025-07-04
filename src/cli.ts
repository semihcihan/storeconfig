#!/usr/bin/env node

import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initCmd from "./commands/init";
import validateCmd from "./commands/validate";
import planCmd from "./commands/plan";
import applyCmd from "./commands/apply";

dotenv.config();

yargs(hideBin(process.argv))
  .command(initCmd)
  .command(validateCmd)
  .command(planCmd)
  .command(applyCmd)
  .demandCommand()
  .help().argv;
