import type {
  AppStoreModel,
  PricingRequest,
  PricePointInfo,
  PricingItem,
} from "@semihcihan/shared";
import type { Ora } from "ora";
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
  spinner?: Ora;
}

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { appStoreState, fetchTerritoryPricePointsForSelectedItem, spinner } =
    options;

  const selectedItem = await selectPricingItem(appStoreState);

  const basePricePoint = await promptForBasePricePoint(
    selectedItem,
    appStoreState,
    fetchTerritoryPricePointsForSelectedItem,
    spinner
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
}
