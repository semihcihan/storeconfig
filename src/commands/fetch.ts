import type { CommandModule } from "yargs";
import { logger, DEFAULT_CONFIG_FILENAME, MESSAGES } from "@semihcihan/shared";
import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";
import { apiClient } from "../services/api-client";
import { userService } from "../services/user-service";
import ora from "ora";

interface App {
  id: string;
  name: string;
}

async function fetchApps(): Promise<App[]> {
  const response = await apiClient.get("/fetch-apps");
  return response.data.data;
}

async function selectApp(apps: App[]): Promise<string> {
  const choices = apps.map((app, index) => ({
    name: `${index + 1}. ${app.name}`,
    value: app,
  }));

  const { selectedApp } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedApp",
      message: "Select the app you want to fetch:",
      choices,
    },
  ]);

  logger.info(`Selected: ${selectedApp.name} (ID: ${selectedApp.id})`);
  return selectedApp.id;
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
      describe: `Path to the output JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
    stdout: {
      describe: "Output JSON to stdout instead of writing to a file.",
      demandOption: false,
      type: "boolean",
    },
  },
  handler: async (argv) => {
    const stdout = argv.stdout as boolean;
    const appId = argv.id as string | undefined;

    if (stdout) {
      if (!appId) {
        const apps = await fetchApps();
        console.log(JSON.stringify(apps, null, 2));
      } else {
        const response = await apiClient.post("/fetch", { appId });
        await userService.ensureUserCached();
        console.log(JSON.stringify(response.data.data, null, 2));
      }
      return;
    }

    let selectedAppId = appId;
    const outputFile = (argv.file as string) || DEFAULT_CONFIG_FILENAME;
    const spinner = ora();

    try {
      if (!selectedAppId) {
        spinner.start("No app ID provided. Fetching available apps...");
        const apps = await fetchApps();

        if (apps.length === 0) {
          spinner.fail("No IOS apps found in your App Store Connect account");
          process.exit(1);
        }
        spinner.stop();
        selectedAppId = await selectApp(apps);
      }

      spinner.start(
        `Fetching details for app ID: ${selectedAppId} and writing to ${outputFile}`
      );

      const response = await apiClient.post("/fetch", {
        appId: selectedAppId,
      });

      await userService.ensureUserCached();

      const appStoreState = response.data.data;
      fs.writeFileSync(outputFile, JSON.stringify(appStoreState, null, 2));
      const fullPath = path.resolve(outputFile);
      spinner.stop();
      logger.info(MESSAGES.SCHEDULED_CHANGES_NOT_VISIBLE);
      spinner.succeed(`Successfully fetched app: ${fullPath}`);
    } catch (error) {
      spinner.stop();
      throw error;
    }
  },
};

export default fetchCommand;
