import { logger } from "../utils/logger";
import * as fs from "fs";
import type { AppStoreModel } from "../utils/validation-helpers";
import { selectPricingItem } from "../set-price/item-selection";
import { promptForBaseUsdPrice } from "../set-price/base-price/base-price-prompt";
import { promptForPricingStrategy } from "../set-price/strategy-prompt";

export interface InteractivePricingOptions {
  inputFile: string;
  appStoreState: AppStoreModel;
}

import type { PricingRequest } from "../models/pricing-request";

export function pricingItemsExist(appStoreState: AppStoreModel): void {
  // Check if file contains at least one item
  const hasItems =
    (appStoreState.inAppPurchases && appStoreState.inAppPurchases.length > 0) ||
    (appStoreState.subscriptionGroups &&
      appStoreState.subscriptionGroups.length > 0);

  if (!hasItems) {
    throw new Error(
      "Input file must contain at least one item (app, in-app purchase, or subscription)"
    );
  }
}

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { inputFile, appStoreState } = options;

  // Keep original content in memory for rollback
  const originalContent = fs.readFileSync(inputFile, "utf-8");

  try {
    const selectedItem = await selectPricingItem(appStoreState);

    logger.info(`✅ Selected: ${selectedItem.type} "${selectedItem.name}"`);

    const basePrice = await promptForBaseUsdPrice(selectedItem, appStoreState);
    const pricingStrategy = await promptForPricingStrategy();
    // TODO: Step 5: Implement minimum price prompt (conditional)

    // Temporary return for now - will be enhanced in next steps
    return {
      selectedItem: {
        type: selectedItem.type,
        id: selectedItem.id,
        name: selectedItem.name,
        offerType: selectedItem.offerType,
      },
      basePrice,
      pricingStrategy,
    };
  } catch (error) {
    logger.error(`Interactive pricing failed`, error);

    // Restore original content from memory
    try {
      fs.writeFileSync(inputFile, originalContent);
      logger.info("Restored file from memory backup");
    } catch (restoreError) {
      logger.error(`Failed to restore from memory backup: ${restoreError}`);
    }

    throw error;
  }
}
