import { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { fetchAppStoreState } from "../services/app-store-aggregator";
import { z } from "zod";
import { diff } from "../services/diff-service";
import { apply } from "../services/apply-service";
import { showPlan } from "../services/plan-service";

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
  },
  handler: async (argv) => {
    const desiredStateFile = argv.file as string;
    const currentStateFile = argv["current-state-file"] as string | undefined;
    const appId = argv.id as string | undefined;

    if (!currentStateFile && !appId) {
      logger.error(
        "You must provide either an App ID with --id or a file for the current state with --current-state-file."
      );
      process.exit(1);
    }

    logger.info(`Processing desired state from ${desiredStateFile}...`);

    try {
      const fileContents = fs.readFileSync(desiredStateFile, "utf-8");
      const desiredState = AppStoreModelSchema.parse(JSON.parse(fileContents));

      let currentState: z.infer<typeof AppStoreModelSchema>;
      let actualAppId: string;

      if (currentStateFile) {
        logger.info(`Using ${currentStateFile} as current state.`);
        const currentFileContents = fs.readFileSync(currentStateFile, "utf-8");
        currentState = AppStoreModelSchema.parse(
          JSON.parse(currentFileContents)
        );
        actualAppId = currentState.appId;
      } else {
        logger.info(`Fetching current state for app ID: ${appId}`);
        currentState = await fetchAppStoreState(appId!);
        actualAppId = appId!;
      }

      const plan = diff(currentState, desiredState);

      await showPlan(plan);
      await apply(plan, actualAppId, currentState, desiredState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Data validation failed:", error.errors);
      } else if (error instanceof Error) {
        logger.error("An error occurred:", error.message);
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default command;
