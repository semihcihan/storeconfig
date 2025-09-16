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
import axios from "axios";

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
  territoryId: string,
  apiBaseUrl: string
): Promise<PricePointInfo[]> {
  const response = await axios.post(`${apiBaseUrl}/api/v1/price-points`, {
    selectedItem,
    appId,
    territoryId,
  });

  if (!response.data.success) {
    throw new Error(response.data.error || "Failed to fetch price points");
  }

  return response.data.data.pricePoints;
}

async function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  apiBaseUrl: string
): Promise<AppStoreModel> {
  const response = await axios.post(`${apiBaseUrl}/api/v1/apply-pricing`, {
    appStoreState,
    pricingRequest,
  });

  if (!response.data.success) {
    throw new Error(response.data.error || "Failed to apply pricing");
  }

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
    const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

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

      // Create a bound version of the function with the API base URL
      const boundFetchTerritoryPricePointsForSelectedItem = (
        selectedItem: PricingItem,
        appId: string,
        territoryId: string
      ) =>
        fetchTerritoryPricePointsForSelectedItem(
          selectedItem,
          appId,
          territoryId,
          apiBaseUrl
        );

      // Use the new API-based flow with injected function
      const pricingRequest = await startInteractivePricing({
        appStoreState,
        fetchTerritoryPricePointsForSelectedItem:
          boundFetchTerritoryPricePointsForSelectedItem,
      });

      logger.debug("Pricing data:", pricingRequest);

      // Apply pricing via API
      const updatedState = useShortcuts(
        await applyPricing(appStoreState, pricingRequest, apiBaseUrl)
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
