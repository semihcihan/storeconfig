import type { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import * as fs from "fs";
import axios from "axios";
import * as readline from "readline";

interface App {
  id: string;
  name: string;
}

async function fetchApps(apiBaseUrl: string): Promise<App[]> {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/v1/fetch-apps`);

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch apps");
    }

    return response.data.data;
  } catch (error) {
    logger.error("Failed to fetch apps list", error);
    throw error;
  }
}

async function selectApp(apps: App[]): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    logger.info("Available apps:");
    var logs: string[] = [];
    apps.forEach((app, index) => {
      logs.push(`${index + 1}. ${app.name}`);
    });
    logger.info(logs.join("\n"));

    const askForSelection = () => {
      rl.question(
        "\nEnter the number of the app you want to fetch (1-" +
          apps.length +
          "): ",
        (answer) => {
          const selection = parseInt(answer, 10);

          if (isNaN(selection) || selection < 1 || selection > apps.length) {
            logger.error(
              "Invalid selection. Please enter a number between 1 and " +
                apps.length
            );
            askForSelection();
            return;
          }

          const selectedApp = apps[selection - 1];
          logger.info(`Selected: ${selectedApp.name} (ID: ${selectedApp.id})`);
          rl.close();
          resolve(selectedApp.id);
        }
      );
    };

    askForSelection();
  });
}

const fetchCommand: CommandModule = {
  command: "fetch",
  describe: "Fetches the app from App Store Connect.",
  builder: {
    id: {
      describe:
        "The App ID to fetch details for. If not provided, you'll be prompted to select from available apps.",
      demandOption: false,
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
    let appId = argv.id as string;
    const outputFile = argv.file as string;
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    try {
      // If no app ID provided, fetch apps list and let user select
      if (!appId) {
        logger.info("No app ID provided. Fetching available apps...");
        const apps = await fetchApps(apiBaseUrl);

        if (apps.length === 0) {
          logger.error("No apps found in your App Store Connect account");
          process.exit(1);
        }

        appId = await selectApp(apps);
      }

      logger.info(
        `Fetching details for app ID: ${appId} and writing to ${outputFile}`
      );

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
