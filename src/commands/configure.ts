import { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { keyService } from "../services/key-service";
import { promptForSecretKey } from "../services/secret-key-prompt";

// Main configure command
const configureCommand: CommandModule = {
  command: "configure",
  describe: "Configure StoreConfig with the Secret Key",
  handler: async (argv) => {
    // Default behavior: configure with secret key
    const secretKey = await promptForSecretKey();

    if (!secretKey) {
      throw new Error("Secret key cannot be empty");
    }

    // Save the secret key
    keyService.saveKey(secretKey);

    logger.info(
      "✅ Secret key saved successfully! Add Apple credentials now (storeconfig apple) if you haven't already."
    );
  },
};

export default configureCommand;
