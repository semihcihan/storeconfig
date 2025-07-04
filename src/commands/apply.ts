import { CommandModule } from "yargs";

const command: CommandModule = {
  command: "apply",
  describe: "Apply the changes to App Store Connect",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    console.log("apply command called for file:", argv.file);
  },
};

export default command;
