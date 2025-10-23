import type { CommandModule } from "yargs";
import {
  logger,
  readJsonFile,
  removeShortcuts,
  validateAppStoreModel,
  validateFileExists,
  DEFAULT_CONFIG_FILENAME,
} from "@semihcihan/shared";
import { exportAnalysis } from "../services/compare-price-service";
import { apiClient } from "../services/api-client";
import path from "path";

const comparePriceCommand: CommandModule = {
  command: "compare-price",
  describe: "Compare prices across territories in USD",
  builder: {
    file: {
      alias: "f",
      describe: `Path to the input JSON file with app store data. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
    output: {
      alias: "o",
      describe:
        "Path to the output file for price comparison analysis (.csv). Defaults to compare-price.csv in current directory.",
      demandOption: false,
      type: "string",
    },
  },
  handler: async (argv) => {
    logger.warn("this command will be available soon");
    return;

    const inputFile = validateFileExists(argv.file as string, {
      fileDescription: "input JSON file with app store data",
    });
    const outputFile = (argv.output as string) || "compare-price.csv";

    const appStoreData = validateAppStoreModel(
      removeShortcuts(readJsonFile(inputFile)),
      false
    );

    // Call the HTTP API using the api client
    const response = await apiClient.post("/compare-price", {
      appStoreData: appStoreData,
    });

    const analysis = response.data.data;
    exportAnalysis(analysis, outputFile);
    const fullPath = path.resolve(outputFile);
    logger.info(`Successfully exported analysis to ${fullPath}`);
  },
};

export default comparePriceCommand;
