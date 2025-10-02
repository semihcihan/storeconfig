import { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { keyService } from "../services/key-service";
import { promptForSecretKey } from "../services/secret-key-prompt";
import { appleAuthService } from "../services/apple-auth-service";

// Configure subcommand
const configureCommand: CommandModule = {
  command: "configure",
  describe: "Configure StoreConfig with the Secret Key",
  builder: {},
  handler: async (argv) => {
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

// Apple subcommand
const appleCommand: CommandModule = {
  command: "apple",
  describe: "Configure Apple credentials",
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
    try {
      const issuerId = argv["issuer-id"] as string;
      const keyId = argv["key-id"] as string;
      const keyPath = argv["key-path"] as string;

      await appleAuthService.configureAppleCredentials(
        issuerId,
        keyId,
        keyPath
      );
    } catch (error) {
      logger.error("Failed to configure Apple credentials", error);
      process.exit(1);
    }
  },
};

// Delete user subcommand
const deleteUserCommand: CommandModule = {
  command: "delete",
  describe:
    "Deletes the user and all stored authentication data for StoreConfig and Apple",
  builder: {},
  handler: async (argv) => {
    try {
      logger.info("Deleting user authentication data...");

      // Clear the secret key
      if (keyService.hasKey()) {
        keyService.deleteKey();
        logger.info("✅ Secret key deleted successfully!");
      } else {
        logger.info("No secret key found to delete");
      }

      // TODO: Clear Apple credentials from backend
      // TODO: Delete user from backend
      // Note: These endpoints need to be implemented in the serverless backend

      logger.info("✅ User authentication data cleared!");
    } catch (error) {
      logger.error("Failed to delete user data:", error);
      process.exit(1);
    }
  },
};

// Main auth command with subcommands
const authCommand: CommandModule = {
  command: "auth",
  describe: "Authentication commands for StoreConfig and Apple credentials",
  builder: (yargs) => {
    return yargs
      .command(configureCommand)
      .command(appleCommand)
      .command(deleteUserCommand)
      .demandCommand(1, "You must specify a subcommand");
  },
  handler: async (argv) => {
    // This should not be called as we have subcommands
    logger.error(
      "No subcommand specified. Use 'auth configure', 'auth apple', or 'auth delete'"
    );
  },
};

export default authCommand;
