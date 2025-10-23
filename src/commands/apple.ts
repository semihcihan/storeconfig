import { CommandModule } from "yargs";
import { appleAuthService } from "../services/apple-auth-service";
import { promptForAppleCredentials } from "../services/apple-credentials-prompt";
import { existsSync } from "fs";
import path from "path";

// Apple command
const appleCommand: CommandModule = {
  command: "apple",
  describe: "Add Apple credentials",
  builder: {
    "key-path": {
      describe: "Path to Apple private key (.p8 file)",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const keyPath = argv["key-path"] as string;

    // Prompt for the IDs
    const credentials = await promptForAppleCredentials();

    await appleAuthService.configureAppleCredentials(
      credentials.issuerId,
      credentials.keyId,
      keyPath
    );
  },
};

export default appleCommand;
