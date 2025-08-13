import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { analyzePricing } from "../services/compare-price-service";

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
      describe: "Path to the output JSON file for price comparison analysis",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = argv.input as string;
    const outputFile = argv.output as string;

    logger.info(`Reading app store data from: ${inputFile}`);
    logger.info(`Writing price comparison analysis to: ${outputFile}`);

    try {
      const appStoreData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
      const currenciesData = JSON.parse(
        fs.readFileSync("src/data/currencies.json", "utf8")
      );

      const analysis = analyzePricing(appStoreData, currenciesData);
      logger.info(
        `Generated price comparison analysis for ${analysis.length} items`
      );

      fs.writeFileSync(outputFile, JSON.stringify(analysis, null, 2));
      logger.info(
        `Successfully wrote price comparison analysis to ${outputFile}`
      );
    } catch (error) {
      logger.error(`Price comparison failed`, error);
      process.exit(1);
    }
  },
};

export default comparePriceCommand;
