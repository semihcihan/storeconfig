import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import axios from "axios";

const fetchCommand: CommandModule = {
  command: "fetch",
  describe: "Fetches the app from App Store Connect.",
  builder: {
    id: {
      describe: "The App ID to fetch details for.",
      demandOption: true,
      type: "string",
    },
    file: {
      alias: "f",
      describe: "Path to the output JSON file.",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const appId = argv.id as string;
    const outputFile = argv.file as string;
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    logger.info(
      `Fetching details for app ID: ${appId} and writing to ${outputFile}`
    );

    try {
      // Call the HTTP API instead of the internal service
      const response = await axios.post(`${apiBaseUrl}/api/v1/fetch`, {
        appId: appId,
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "API request failed");
      }

      const appStoreState = response.data.data;
      fs.writeFileSync(outputFile, JSON.stringify(appStoreState, null, 2));
      logger.info(`Successfully fetched app and wrote to ${outputFile}`);
    } catch (error) {
      logger.error(`Fetch failed`, error);
      process.exit(1);
    }
  },
};

export default fetchCommand;
