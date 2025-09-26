import type { CommandModule } from "yargs";
import {
  logger,
  readJsonFile,
  removeShortcuts,
  validateAppStoreModel,
  validateFileExists,
  DEFAULT_CONFIG_FILENAME,
} from "@semihcihan/shared";
import axios from "axios";
import { exportAnalysis } from "../services/compare-price-service";

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
    const inputFile = validateFileExists(argv.file as string, {
      fileDescription: "input JSON file with app store data",
    });
    const outputFile = (argv.output as string) || "compare-price.csv";
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    try {
      const appStoreData = validateAppStoreModel(
        removeShortcuts(readJsonFile(inputFile)),
        false
      );

      // Call the HTTP API instead of the internal service
      const response = await axios.post(`${apiBaseUrl}/api/v1/compare-price`, {
        appStoreData: appStoreData,
      });

      if (!response.data.success) {
        throw response.data.error;
      }

      const analysis = response.data.data;
      exportAnalysis(analysis, outputFile);
      logger.info(`Successfully exported analysis to ${outputFile}`);
    } catch (error) {
      logger.error(`Price comparison failed`, error);
      process.exit(1);
    }
  },
};

export default comparePriceCommand;
