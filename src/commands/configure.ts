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
    try {
      const secretKey = await promptForSecretKey();

      if (!secretKey) {
        logger.error("Secret key cannot be empty");
        process.exit(1);
      }

      // Save the secret key
      keyService.saveKey(secretKey);

      logger.info(
        "✅ Secret key saved successfully! Add Apple credentials now (storeconfig apple) if you haven't already."
      );
    } catch (error) {
      logger.error("Failed to configure secret key", error);
      process.exit(1);
    }
  },
};

export default configureCommand;
