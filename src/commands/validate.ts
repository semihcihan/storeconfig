import { CommandModule } from "yargs";

const command: CommandModule = {
  command: "validate",
  describe: "Validate the JSON file",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    console.log("validate command called for file:", argv.file);
  },
};

export default command;
