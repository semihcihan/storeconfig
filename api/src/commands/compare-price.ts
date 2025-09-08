import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import axios from "axios";
import { exportAnalysis } from "../services/compare-price-service";

const comparePriceCommand: CommandModule = {
  command: "compare-price",
  describe: "Compare prices across territories in USD",
  builder: {
    input: {
      alias: "i",
      describe: "Path to the input JSON file with app store data",
      demandOption: true,
      type: "string",
    },
    output: {
      alias: "o",
      describe: "Path to the output file for price comparison analysis (.csv)",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = argv.input as string;
    const outputFile = argv.output as string;
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    try {
      const appStoreData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
      // TODO: consider validating the appStoreData

      // Call the HTTP API instead of the internal service
      const response = await axios.post(`${apiBaseUrl}/api/v1/compare-price`, {
        appStoreData: appStoreData,
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "API request failed");
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
