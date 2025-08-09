import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import {
  readJsonFile,
  validateAppStoreModel,
  type AppStoreModel,
} from "../utils/validation-helpers";
import {
  startInteractivePricing,
  pricingItemsExist,
} from "../services/set-price-service";
import { removeShortcuts } from "../utils/shortcut-converter";

const setPriceCommand: CommandModule = {
  command: "set-price",
  describe:
    "Set prices for apps, in-app purchases, and subscriptions using interactive prompts",
  builder: {
    file: {
      alias: "f",
      describe:
        "Path to the current state file (e.g., fetch.json) - will be updated in place",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = argv.file as string;

    logger.info(`Setting prices using file: ${inputFile}`);

    try {
      // Validate file structure and content
      const appStoreState = validateAppStoreModel(
        removeShortcuts(readJsonFile(inputFile)),
        false
      );

      // Validate that pricing items exist
      pricingItemsExist(appStoreState);

      logger.debug(
        "✅ File validation passed! Ready to proceed with interactive prompts."
      );

      // Delegate to interactive pricing service
      const pricingResult = await startInteractivePricing({
        inputFile,
        appStoreState,
      });

      // TODO: Phase 2 - Apply the pricing changes using the gathered data
      logger.info("Pricing data gathered successfully:", pricingResult);
    } catch (error) {
      logger.error(`Set-price failed`, error);
      process.exit(1);
    }
  },
};

export default setPriceCommand;
