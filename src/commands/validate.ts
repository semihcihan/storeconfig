import { CommandModule } from "yargs";
import { validateJsonFile } from "../utils/validation-helpers";

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
    validateJsonFile(filePath, true);
  },
};

export default command;
