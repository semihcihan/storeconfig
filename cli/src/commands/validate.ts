import { CommandModule } from "yargs";
import {
  DEFAULT_CONFIG_FILENAME,
  readJsonFile,
  validateFileExists,
} from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";

const command: CommandModule = {
  command: "validate",
  describe: "Validate the JSON file format and structure",
  builder: {
    file: {
      alias: "f",
      describe: `Path to the JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
  },
  handler: (argv) => {
    const filePath = validateFileExists(argv.file as string, {
      fileDescription: "JSON file",
    });
    validateAppStoreModel(
      removeShortcuts(readJsonFile(filePath)),
      true,
      "fetch"
    );
  },
};

export default command;
