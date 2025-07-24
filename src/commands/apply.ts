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
    "current-state-file": {
      alias: "c",
      describe:
        "Path to the JSON file to use as the current state. If not provided, the current state will be fetched from App Store Connect.",
      type: "string",
    },
    id: {
      describe:
        "The App ID to apply changes to. Required if not using --current-state-file.",
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
    const desiredStateFile = argv.file as string;
    const currentStateFile = argv["current-state-file"] as string | undefined;
    const appId = argv.id as string | undefined;
    const preview = argv.preview as boolean;

    if (!currentStateFile && !appId) {
      logger.error(
        "You must provide either an App ID with --id or a file for the current state with --current-state-file."
      );
      process.exit(1);
    }

    logger.info(`Processing desired state from ${desiredStateFile}...`);

    try {
      const desiredState = validateJsonFile(desiredStateFile, false);

      let currentState: AppStoreModel;
      let actualAppId: string;

      if (currentStateFile) {
        logger.info(`Using ${currentStateFile} as current state.`);
        currentState = validateJsonFile(currentStateFile, false);
        actualAppId = currentState.appId;
      } else {
        logger.info(`Fetching current state for app ID: ${appId}`);
        currentState = await fetchAppStoreState(appId!);
        actualAppId = appId!;
      }

      const plan = diff(currentState, desiredState);

      await showPlan(plan);

      if (preview) {
        logger.info("Preview mode - no changes will be applied");
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
