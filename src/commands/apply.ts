import { CommandModule } from "yargs";
import {
  logger,
  DEFAULT_CONFIG_FILENAME,
  validateFileExists,
} from "@semihcihan/shared";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";
import { apiClient } from "../services/api-client";
import { trackJob } from "../services/job-polling-service";
import { createJob } from "../services/job-service";

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
      const diffResponse = await apiClient.post("/diff", {
        desiredState: desiredState,
      });

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

      const jobId = await createJob(plan, currentState, desiredState);
      await trackJob(jobId);
    } catch (error) {
      logger.error(`Apply failed`, error);
      process.exit(1);
    }
  },
};

export default command;
