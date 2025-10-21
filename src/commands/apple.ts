import { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { appleAuthService } from "../services/apple-auth-service";

// Apple command
const appleCommand: CommandModule = {
  command: "apple",
  describe: "Add Apple credentials",
  builder: {
    "issuer-id": {
      describe: "Apple App Store Connect Issuer ID",
      demandOption: true,
      type: "string",
    },
    "key-id": {
      describe: "Apple App Store Connect Key ID",
      demandOption: true,
      type: "string",
    },
    "key-path": {
      describe: "Path to Apple private key (.p8 file)",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const issuerId = argv["issuer-id"] as string;
    const keyId = argv["key-id"] as string;
    const keyPath = argv["key-path"] as string;

    await appleAuthService.configureAppleCredentials(issuerId, keyId, keyPath);
  },
};

export default appleCommand;
