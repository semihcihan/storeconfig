import { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { fetchAppStoreState } from "../services/app-store-aggregator";
import { z } from "zod";
import { diff } from "../services/diff-service";
import { apply } from "../services/apply-service";

const command: CommandModule = {
  command: "apply",
  describe: "Apply the changes to App Store Connect",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "The App ID to apply changes to.",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = argv.file as string;
    const appId = argv.id as string;

    logger.info(`Applying changes from ${inputFile} to app ID: ${appId}`);

    try {
      const fileContents = fs.readFileSync(inputFile, "utf-8");
      const desiredState = AppStoreModelSchema.parse(JSON.parse(fileContents));

      const currentState = await fetchAppStoreState(appId);

      logger.info("Desired state:", desiredState);
      logger.info("Current state:", currentState);

      const plan = diff(currentState, desiredState);

      logger.info("Generated plan:", plan);

      await apply(plan);
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
