import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { z } from "zod";
import { fetchAppStoreState } from "../services/app-store-aggregator";

const fetchCommand: CommandModule = {
  command: "fetch",
  describe:
    "Fetches IAPs and subscriptions from App Store Connect for a specific app.",
  builder: {
    id: {
      describe: "The App ID to fetch details for.",
      demandOption: true,
      type: "string",
    },
    file: {
      describe: "Path to the output JSON file.",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const appId = argv.id as string;
    const outputFile = argv.file as string;

    logger.info(
      `Fetching details for app ID: ${appId} and writing to ${outputFile}`
    );

    try {
      const appStoreState = await fetchAppStoreState(appId);
      fs.writeFileSync(outputFile, JSON.stringify(appStoreState, null, 2));
      logger.info(
        `Successfully fetched app details and wrote to ${outputFile}`
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Data validation failed:", error.errors);
      } else if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        (error as any).data?.errors
      ) {
        logger.error("Failed to fetch app details:");
        logger.error(
          "API Error:",
          JSON.stringify((error as any).data, null, 2)
        );
      } else if (error instanceof Error) {
        logger.error("An error occurred:", error.message);
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default fetchCommand;
