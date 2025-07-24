import { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import { fetchAppStoreState } from "../services/fetch-service";
import { diff } from "../services/diff-service";
import { apply } from "../services/apply-service";
import { showPlan } from "../services/plan-service";
import {
  validateJsonFile,
  type AppStoreModel,
} from "../utils/validation-helpers";
import * as readline from "readline";

const confirmChanges = async (): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    logger.warn(`
⚠️  CRITICAL WARNING: You are about to apply changes to App Store Connect

These changes will be applied immediately and may affect your live app configuration.
Some operations are irreversible and cannot be undone through this tool.
Please ensure you have reviewed the changes above and have a backup if needed.
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
    desired: {
      alias: ["d", "desired-state"],
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
    const desiredStateFile = argv.desired as string;
    const currentStateFile = argv.current as string | undefined;
    const appId = argv.id as string;
    const preview = argv.preview as boolean;

    logger.info(`Processing desired state from ${desiredStateFile}...`);

    try {
      const desiredState = validateJsonFile(desiredStateFile, false);

      let currentState: AppStoreModel;

      if (currentStateFile) {
        logger.info(`Using ${currentStateFile} as current state.`);
        currentState = validateJsonFile(currentStateFile, false);
      } else {
        logger.info(`Fetching current state for app ID: ${appId}`);
        currentState = await fetchAppStoreState(appId);
      }

      const plan = diff(currentState, desiredState);

      await showPlan(plan);

      if (preview) {
        logger.info("Preview mode - no changes will be applied");
        return;
      }

      const confirmed = await confirmChanges();
      if (!confirmed) {
        logger.info("Operation cancelled by user");
        return;
      }

      await apply(plan, currentState, desiredState);
    } catch (error) {
      if (error instanceof Error) {
        logger.error("An error occurred:", error.message);
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default command;
