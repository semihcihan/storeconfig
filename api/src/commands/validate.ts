import { CommandModule } from "yargs";
import { readJsonFile } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";
import { removeShortcuts } from "../utils/shortcut-converter";
import { validateAppStoreModel } from "@semihcihan/shared";

const command: CommandModule = {
  command: "validate-format",
  describe: "Validate the JSON file format and structure",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    const filePath = argv.file as string;
    try {
      validateAppStoreModel(
        removeShortcuts(readJsonFile(filePath)),
        true,
        "fetch"
      );
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  },
};

export default command;
