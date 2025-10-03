import type { CommandModule } from "yargs";
import * as fs from "fs";
import {
  ContextualError,
  DEFAULT_CONFIG_FILENAME,
  logger,
  validateFileExists,
} from "@semihcihan/shared";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { startInteractivePricing } from "../services/set-price-service";
import { removeShortcuts, useShortcuts } from "@semihcihan/shared";
import { apiClient } from "../services/api-client";

import type {
  PricingItem,
  PricePointInfo,
  PricingRequest,
} from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";

// Helper function to make HTTP requests to the API
async function fetchTerritoryPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  const response = await apiClient.post("/price-points", {
    selectedItem,
    appId,
    territoryId,
  });

  return response.data.data.pricePoints;
}

async function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest
): Promise<AppStoreModel> {
  const response = await apiClient.post("/apply-pricing", {
    appStoreState,
    pricingRequest,
  });

  return response.data.data.updatedState;
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

    try {
      // Generate appStoreState from the file
      const appStoreState = validateAppStoreModel(
        removeShortcuts(readJsonFile(inputFile)),
        false,
        "apply"
      );

      logger.debug(
        "✅ File validation passed! Ready to proceed with interactive prompts."
      );

      // Use the new API-based flow with injected function
      const pricingRequest = await startInteractivePricing({
        appStoreState,
        fetchTerritoryPricePointsForSelectedItem:
          fetchTerritoryPricePointsForSelectedItem,
      });

      logger.debug("Pricing data:", pricingRequest);

      // Apply pricing via API
      const updatedState = useShortcuts(
        await applyPricing(appStoreState, pricingRequest)
      );

      fs.writeFileSync(inputFile, JSON.stringify(updatedState, null, 2) + "\n");
      logger.info(`✅ Updated ${inputFile} with pricing changes.`);
    } catch (error) {
      logger.error(`Set-price failed`, error);
      process.exit(1);
    }
  },
};

export default setPriceCommand;
