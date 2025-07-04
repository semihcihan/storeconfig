import { CommandModule } from "yargs";

const command: CommandModule = {
  command: "init",
  describe: "Create a sample iaps.json file",
  builder: {},
  handler: (argv) => {
    console.log("init command called");
  },
};

export default command;
