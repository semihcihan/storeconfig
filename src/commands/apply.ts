import { CommandModule } from "yargs";
import {
  logger,
  DEFAULT_CONFIG_FILENAME,
  validateFileExists,
  ContextualError,
} from "@semihcihan/shared";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";
import * as readline from "readline";
import axios from "axios";

const confirmChanges = async (): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    logger.warn(`### CRITICAL WARNING ###
You are about to apply changes directly to App Store Connect.

These changes will take effect immediately and may impact your live app configuration.
Some operations are inherently irreversible — even if performed manually through App Store Connect.
`);

    rl.question(
      "Do you want to proceed with applying these changes? (y/N): ",
      (answer) => {
        rl.close();
        resolve(
          answer.trim().toLowerCase() === "y" ||
            answer.trim().toLowerCase() === "yes"
        );
      }
    );
  });
};

const command: CommandModule = {
  command: "apply",
  describe: "Apply the changes to App Store Connect",
  builder: {
    file: {
      alias: "f",
      describe: `Path to the desired state JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
    preview: {
      alias: "p",
      describe: "Show what changes would be made without applying them",
      type: "boolean",
      default: false,
    },
  },
  handler: async (argv) => {
    const preview = argv.preview as boolean;
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    const desiredStateFile = validateFileExists(argv.file as string, {
      fileDescription: "desired state JSON file",
    });

    logger.debug(`Processing desired state from ${desiredStateFile}...`);

    try {
      const desiredState = validateAppStoreModel(
        removeShortcuts(readJsonFile(desiredStateFile)),
        false,
        "apply"
      );

      // Generate diff plan using the API (which will fetch current state internally)
      const diffResponse = await axios.post(`${apiBaseUrl}/api/v1/diff`, {
        desiredState: desiredState,
      });

      if (!diffResponse.data.success) {
        throw new ContextualError(
          "Failed to generate diff plan",
          diffResponse.data.error
        );
      }

      const { plan, currentState } = diffResponse.data.data;
      if (plan.length === 0) {
        logger.info("No changes to apply. Exiting...");
        return;
      }

      await showPlan(plan);

      if (preview) {
        logger.info("Preview mode - no changes will be applied");
        return;
      }

      const confirmed = await confirmChanges();
      if (!confirmed) {
        logger.warn("Operation cancelled by user");
        return;
      }

      // Apply the plan using the API
      const applyResponse = await axios.post(`${apiBaseUrl}/api/v1/apply`, {
        plan: plan,
        currentState: currentState,
        desiredState: desiredState,
      });

      if (!applyResponse.data.success) {
        throw new Error(applyResponse.data.error);
      }

      logger.info("Changes applied successfully");
    } catch (error) {
      logger.error(`Apply failed`, error);
      process.exit(1);
    }
  },
};

export default command;
