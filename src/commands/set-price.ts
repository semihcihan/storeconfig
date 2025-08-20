import type { CommandModule } from "yargs";
import * as fs from "fs";
import { logger } from "../utils/logger";
import {
  readJsonFile,
  validateAppStoreModel,
} from "../utils/validation-helpers";
import {
  startInteractivePricing,
  pricingItemsExist,
  applyPricing,
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
      const appStoreState = validateAppStoreModel(
        removeShortcuts(readJsonFile(inputFile)),
        false
      );

      pricingItemsExist(appStoreState);

      logger.debug(
        "✅ File validation passed! Ready to proceed with interactive prompts."
      );

      const pricingRequest = await startInteractivePricing({
        inputFile,
        appStoreState,
      });

      logger.debug("Pricing data:", pricingRequest);

      const updatedState = await applyPricing(appStoreState, pricingRequest);
      fs.writeFileSync(inputFile, JSON.stringify(updatedState, null, 2) + "\n");
      logger.info(`✅ Updated ${inputFile} with pricing changes.`);
    } catch (error) {
      logger.error(`Set-price failed`, error);
      process.exit(1);
    }
  },
};

export default setPriceCommand;
