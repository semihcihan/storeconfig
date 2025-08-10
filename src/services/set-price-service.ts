import { logger } from "../utils/logger";
import * as fs from "fs";
import type { AppStoreModel } from "../utils/validation-helpers";
import { selectPricingItem } from "../set-price/item-selection";
import { promptForBasePricePoint } from "../set-price/base-price/base-price-prompt";
import { promptForPricingStrategy } from "../set-price/strategy-prompt";

export interface InteractivePricingOptions {
  inputFile: string;
  appStoreState: AppStoreModel;
}

import type { PricingRequest } from "../models/pricing-request";
import { z } from "zod";
import { PriceScheduleSchema } from "../models/app-store";

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

    const basePricePoint = await promptForBasePricePoint(
      selectedItem,
      appStoreState
    );
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
      basePricePoint,
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

type PriceSchedule = z.infer<typeof PriceScheduleSchema>;

function isAppleStrategy(request: PricingRequest): boolean {
  return request.pricingStrategy === "apple";
}

const BASE_TERRITORY = "USA";

function buildBaseTerritoryPriceSchedule(basePrice: string): PriceSchedule {
  return {
    baseTerritory: BASE_TERRITORY,
    prices: [
      {
        price: basePrice,
        territory: BASE_TERRITORY,
      },
    ],
  };
}

export function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest
): AppStoreModel {
  logger.debug(
    `Preparing pricing update in state. Item: ${pricingRequest.selectedItem.type} (${pricingRequest.selectedItem.name}), Strategy: ${pricingRequest.pricingStrategy}`
  );

  if (!isAppleStrategy(pricingRequest)) {
    throw new Error(
      `Pricing strategy '${pricingRequest.pricingStrategy}' is not implemented yet`
    );
  } else {
    return applyApplePricing(appStoreState, pricingRequest);
  }
}

function applyApplePricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest
): AppStoreModel {
  const { selectedItem, basePricePoint } = pricingRequest;

  if (selectedItem.type === "app") {
    const schedule = buildBaseTerritoryPriceSchedule(basePricePoint.price);
    appStoreState.pricing = schedule;
    return appStoreState;
  }

  if (selectedItem.type === "inAppPurchase") {
    if (
      !appStoreState.inAppPurchases ||
      appStoreState.inAppPurchases.length === 0
    ) {
      throw new Error("No in-app purchases found in the state");
    }
    const iapIndex = appStoreState.inAppPurchases.findIndex(
      (p) => p.productId === selectedItem.id
    );
    if (iapIndex === -1) {
      throw new Error(
        `In-app purchase with productId '${selectedItem.id}' not found`
      );
    }
    const schedule = buildBaseTerritoryPriceSchedule(basePricePoint.price);
    appStoreState.inAppPurchases[iapIndex].priceSchedule = schedule;
    return appStoreState;
  }

  if (selectedItem.type === "subscription" || selectedItem.type === "offer") {
    throw new Error(
      `Apple pricing for '${selectedItem.type}' is not implemented yet for state updates`
    );
  }

  const _never: never = selectedItem.type as never;
  throw new Error(`Unsupported item type: ${_never as any}`);
}
