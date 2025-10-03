import { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { keyService } from "../services/key-service";
import { promptForSecretKey } from "../services/secret-key-prompt";

// Delete subcommand
const deleteSubCommand: CommandModule = {
  command: "delete",
  describe:
    "Deletes the user and all stored authentication data for StoreConfig and Apple",
  builder: {},
  handler: async (argv) => {
    try {
      // Clear the secret key
      if (keyService.hasKey()) {
        keyService.deleteKey();
      } else {
        logger.warn("No secret key found to delete");
      }

      // TODO: Clear Apple credentials from backend
      // TODO: Delete user from backend
      // Note: These endpoints need to be implemented in the serverless backend
    } catch (error) {
      logger.error("Failed to delete user data:", error);
      process.exit(1);
    }
  },
};

// Main configure command with subcommands
const configureCommand: CommandModule = {
  command: "configure",
  describe: "Configure StoreConfig with the Secret Key",
  builder: (yargs) => {
    return yargs
      .command(deleteSubCommand)
      .demandCommand(0, "Please specify a subcommand");
  },
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
        "✅ Secret key saved successfully! Configure Apple credentials now if you haven't already."
      );
    } catch (error) {
      logger.error("Failed to configure secret key", error);
      process.exit(1);
    }
  },
};

export default configureCommand;
