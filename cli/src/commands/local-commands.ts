import validateFormatCmd from "./validate";
import applyCmd from "./apply";
import fetchCmd from "./fetch";
import setPriceCmd from "./set-price";
import comparePriceCmd from "./compare-price";
import exampleCmd from "./example";
import appleCmd from "./apple";

export const localCommands = [
  validateFormatCmd,
  applyCmd,
  fetchCmd,
  setPriceCmd,
  comparePriceCmd,
  exampleCmd,
  appleCmd,
];

export const localCommandNames = localCommands.map((command) => command.command);
