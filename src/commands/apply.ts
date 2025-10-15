import { CommandModule } from "yargs";
import {
  logger,
  DEFAULT_CONFIG_FILENAME,
  validateFileExists,
  Plan,
  AppStoreModel,
} from "@semihcihan/shared";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";
import { apiClient } from "../services/api-client";
import { trackJob } from "../services/job-polling-service";
import { createJob } from "../services/job-service";
import ora from "ora";

interface DiffResponse {
  success: boolean;
  data: {
    plan: Plan;
    currentState: AppStoreModel;
  };
}

const APPLY_REMINDER =
  "\n┌─────────────────────────────────────────────────────────────┐\n" +
  "│  This may take up to 30 minutes depending on the changes.   │\n" +
  "│  Processing continues on our servers even if CLI is closed. │\n" +
  "│  You can rerun the same command to check current status.    │\n" +
  "└─────────────────────────────────────────────────────────────┘\n\n";

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
    const dryRun = process.env.dryRun === "true";

    const desiredStateFile = validateFileExists(argv.file as string, {
      fileDescription: "desired state JSON file",
    });

    logger.debug(`Processing desired state from ${desiredStateFile}...`);

    if (dryRun) {
      logger.debug(
        "Dry run mode enabled - no actual changes will be applied to App Store Connect"
      );
    }

    const spinner = ora("Generating actions...").start();
    try {
      const desiredState = validateAppStoreModel(
        removeShortcuts(readJsonFile(desiredStateFile)),
        false,
        "apply"
      );

      // Generate diff plan using the API (which will fetch current state internally)
      const diffResponse = await apiClient.post<DiffResponse>("/diff", {
        desiredState: desiredState,
      });

      const { plan, currentState } = diffResponse.data.data;
      if (plan.length === 0) {
        spinner.succeed(
          "No changes to apply. Your configuration is up to date. Exiting..."
        );
        return;
      }
      spinner.stop();

      await showPlan(plan);

      if (preview) {
        logger.info("Preview mode - no changes will be applied");
        return;
      }

      const jobResponse = await createJob(
        plan,
        currentState,
        desiredState,
        dryRun,
        spinner
      );
      if (jobResponse) {
        const { jobId, newJobCreated } = jobResponse;
        // If new job was created plan matches the jobId, if not it's an old job and and old plan
        spinner.prefixText = APPLY_REMINDER;
        await trackJob(jobId, spinner, newJobCreated ? plan : undefined);
      }
    } catch (error) {
      spinner.fail("Apply failed");
      logger.error(`Apply failed`, error);
      process.exit(1);
    }
  },
};

export default command;
