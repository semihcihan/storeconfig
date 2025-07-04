import { CommandModule } from "yargs";

const command: CommandModule = {
  command: "plan",
  describe: "Show a plan of changes (dry run)",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    console.log("plan command called for file:", argv.file);
  },
};

export default command;
