import { CommandModule } from "yargs";
import { validateJsonFile } from "../utils/validation-helpers";
import { logger } from "../utils/logger";

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
      validateJsonFile(filePath, true);
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  },
};

export default command;
