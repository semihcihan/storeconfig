import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import {
  analyzePricing,
  exportAnalysis,
} from "../services/compare-price-service";

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
      describe:
        "Path to the output file for price comparison analysis (.csv or .xlsx)",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = argv.input as string;
    let outputFile = argv.output as string;

    try {
      const appStoreData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
      const currenciesData = JSON.parse(
        fs.readFileSync("src/data/currencies.json", "utf8")
      );

      const analysis = analyzePricing(appStoreData, currenciesData);

      exportAnalysis(analysis, outputFile);
      logger.info(`Successfully exported analysis to ${outputFile}`);
    } catch (error) {
      logger.error(`Price comparison failed`, error);
      process.exit(1);
    }
  },
};

export default comparePriceCommand;
