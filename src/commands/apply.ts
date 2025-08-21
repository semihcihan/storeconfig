import { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import { fetchAppStoreState } from "../services/fetch-service";
import { diff } from "../services/diff-service";
import { apply } from "../services/apply-service";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "../helpers/validation-helpers";
import { validateAppStoreModel } from "../helpers/validation-model";
import { removeShortcuts } from "../utils/shortcut-converter";
import * as readline from "readline";

import type { AppStoreModel } from "../models/app-store";

const confirmChanges = async (): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    logger.warn(`
⚠️ CRITICAL WARNING
You are about to apply changes directly to App Store Connect.

These changes will take effect immediately and may impact your live app configuration.
Some operations are inherently irreversible — even if performed manually through App Store Connect.
`);

    rl.question(
      logger.prompt(
        "Do you want to proceed with applying these changes? (y/N): "
      ),
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
      describe: "Path to the desired state JSON file.",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "The App ID to apply changes to.",
      demandOption: true,
      type: "string",
    },
    current: {
      alias: ["c", "current-state"],
      describe:
        "Path to the JSON file to use as the current (live) state. If not provided, the current state will be fetched from App Store Connect.",
      type: "string",
      hidden: process.env.NODE_ENV === "production",
    },
    preview: {
      alias: "p",
      describe: "Show what changes would be made without applying them",
      type: "boolean",
      default: false,
    },
  },
  handler: async (argv) => {
    const desiredStateFile = argv.file as string;
    const currentStateFile = argv.current as string | undefined;
    const appId = argv.id as string;
    const preview = argv.preview as boolean;

    logger.debug(`Processing desired state from ${desiredStateFile}...`);

    try {
      const desiredState = validateAppStoreModel(
        removeShortcuts(readJsonFile(desiredStateFile))
      );

      let currentState: AppStoreModel;

      if (currentStateFile) {
        logger.info(`Using ${currentStateFile} as current state.`);
        currentState = validateAppStoreModel(
          removeShortcuts(readJsonFile(currentStateFile))
        );
      } else {
        logger.info(`Fetching current state for app ID: ${appId}`);
        currentState = removeShortcuts(await fetchAppStoreState(appId));
      }

      const plan = diff(currentState, desiredState);
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

      await apply(plan, currentState, desiredState);
      logger.info("Changes applied successfully");
    } catch (error) {
      logger.error(`Apply failed`, error);
      process.exit(1);
    }
  },
};

export default command;
