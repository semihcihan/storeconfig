import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import apiClient from "../services/api";
import * as fs from "fs";

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
    logger.info(
      `Fetching details for app ID: ${argv.id} and writing to ${argv.file}`
    );
    try {
      const response = await apiClient.get(`/apps/${argv.id}`);
      const appDetails = response.data;
      fs.writeFileSync(
        argv.file as string,
        JSON.stringify(appDetails, null, 2)
      );
      logger.info(`Successfully fetched app details and wrote to ${argv.file}`);
    } catch (error) {
      logger.error("Failed to fetch app details:", error);
      process.exit(1);
    }
  },
};

export default fetchCommand;
