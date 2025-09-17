import { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";

// Configure subcommand
const configureCommand: CommandModule = {
  command: "configure",
  describe: "Configure StoreConfig with the Secret Key",
  builder: {},
  handler: async (argv) => {
    logger.info("Configure command - not implemented yet");
    logger.info("This will prompt for Secret Key and store it in config");

    // TODO: Implement actual configure logic
    // - Prompt for Secret Key key
    // - Validate Secret Key with backend (Optional)
    // - Store in config
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
    const issuerId = argv["issuer-id"] as string;
    const keyId = argv["key-id"] as string;
    const keyPath = argv["key-path"] as string;

    logger.info("Apple authentication command - not implemented yet");
    logger.info(`Issuer ID: ${issuerId}`);
    logger.info(`Key ID: ${keyId}`);
    logger.info(`Key Path: ${keyPath}`);

    // TODO: Implement actual Apple auth logic
    // - Validate key file exists and is readable
    // - Send credentials to backend for association with stored Secret Key
    // - Apple credentials are not stored locally, only sent to backend
  },
};

// Delete user subcommand
const deleteUserCommand: CommandModule = {
  command: "delete",
  describe:
    "Deletes the user and all stored authentication data for StoreConfig and Apple",
  builder: {},
  handler: async (argv) => {
    logger.info("Delete user command - not implemented yet");
    logger.info("This will clear the stored keys for StoreConfig and Apple");

    // TODO: Implement actual delete user logic
    // - Delete user from backend
    // - Clear Secret Key and Apple credentials from config
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
