import type { CommandModule } from "yargs";
import * as fs from "fs";
import {
  DEFAULT_CONFIG_FILENAME,
  logger,
  validateFileExists,
} from "@semihcihan/shared";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { startInteractivePricing } from "../services/set-price-service";
import { removeShortcuts, useShortcuts } from "@semihcihan/shared";
import { storeConfigEngine } from "../services/storeconfig-engine";
import ora from "ora";

import type {
  PricingItem,
  PricePointInfo,
  PricingRequest,
} from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";

async function fetchTerritoryPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  return await storeConfigEngine.fetchTerritoryPricePointsForSelectedItem(
    selectedItem,
    appId,
    territoryId
  );
}

async function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest
): Promise<AppStoreModel> {
  return await storeConfigEngine.applyPricingChanges(
    appStoreState,
    pricingRequest
  );
}

const setPriceCommand: CommandModule = {
  command: "set-price",
  describe:
    "Set prices for apps, in-app purchases, and subscriptions using interactive prompts",
  builder: {
    file: {
      alias: "f",
      describe: `Path to the store config JSON file - will be updated in place. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
  },
  handler: async (argv) => {
    const inputFile = validateFileExists(argv.file as string, {
      fileDescription: "store config JSON file",
    });

    logger.info(`Setting prices using file: ${inputFile}`);
    const spinner = ora();

    try {
      const appStoreState = validateAppStoreModel(
        removeShortcuts(readJsonFile(inputFile)),
        false,
        "apply"
      );

      logger.debug(
        "✅ File validation passed! Ready to proceed with interactive prompts."
      );

      const pricingRequest = await startInteractivePricing({
        appStoreState,
        fetchTerritoryPricePointsForSelectedItem:
          fetchTerritoryPricePointsForSelectedItem,
        spinner,
      });

      logger.debug("Pricing data:", pricingRequest);

      spinner.start("Applying pricing. Please wait...");
      const updatedState = useShortcuts(
        await applyPricing(appStoreState, pricingRequest)
      );

      fs.writeFileSync(inputFile, JSON.stringify(updatedState, null, 2) + "\n");
      spinner.succeed(
        `Updated ${inputFile} with pricing changes.\nDon’t forget to run 'storeconfig apply' to push the changes to App Store Connect.`
      );
    } catch (error) {
      spinner.stop();
      throw error;
    }
  },
};

export default setPriceCommand;
