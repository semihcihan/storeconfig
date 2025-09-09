import type {
  AppStoreModel,
  PricingRequest,
  PricePointInfo,
  PricingItem,
} from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";
import { selectPricingItem } from "./item-selection";
import { promptForBasePricePoint } from "../services/base-price-prompt";
import { promptForPricingStrategy } from "../services/strategy-prompt";
import { promptForMinimumPrice } from "../services/minimum-price-prompt";

export interface InteractivePricingOptions {
  appStoreState: AppStoreModel;
  fetchTerritoryPricePointsForSelectedItem: (
    selectedItem: PricingItem,
    appId: string,
    territoryId: string
  ) => Promise<PricePointInfo[]>;
}

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { appStoreState, fetchTerritoryPricePointsForSelectedItem } = options;

  try {
    const selectedItem = await selectPricingItem(appStoreState);

    logger.info(`✅ Selected: ${selectedItem.type} "${selectedItem.name}"`);

    const basePricePoint = await promptForBasePricePoint(
      selectedItem,
      appStoreState,
      fetchTerritoryPricePointsForSelectedItem
    );
    const pricingStrategy = await promptForPricingStrategy();
    const minimumPrice = await promptForMinimumPrice(
      pricingStrategy,
      basePricePoint.price
    );

    return {
      appId: appStoreState.appId,
      selectedItem: {
        type: selectedItem.type,
        id: selectedItem.id,
        name: selectedItem.name,
        offerType: selectedItem.offerType,
      },
      basePricePoint,
      pricingStrategy,
      minimumPrice,
    };
  } catch (error) {
    logger.error(`Interactive pricing failed`, error);

    throw error;
  }
}
