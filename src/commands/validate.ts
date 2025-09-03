import { CommandModule } from "yargs";
import { readJsonFile } from "../helpers/validation-helpers";
import { logger } from "../utils/logger";
import { removeShortcuts } from "../utils/shortcut-converter";
import { validateAppStoreModel } from "../helpers/validation-model";

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
      validateAppStoreModel(removeShortcuts(readJsonFile(filePath)), true);
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  },
};

export default command;
