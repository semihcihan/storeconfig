import type { PricingItem, PricePointInfo } from "@semihcihan/shared";
import {
  type PricePoint,
  getTerritoryPricePointsData,
} from "../../services/price-point";

/**
 * Convert cached PricePoint[] to PricePointInfo[] format
 * The id field is only used for matching in the prompt - we use the price itself
 * since prices are unique per territory and the id is never used for actual price setting.
 */
function convertCachedPricePointsToPricePointInfo(
  cachedPricePoints: PricePoint[]
): PricePointInfo[] {
  return cachedPricePoints
    .map((pp) => ({
      // Use price as id since it's unique per territory and only used for matching
      id: pp.customerPrice,
      price: pp.customerPrice,
    }))
    .sort((a, b) => Number(a.price) - Number(b.price));
}

/**
 * Get price points for a selected item using cached data
 * The id field in PricePointInfo is only used for matching in the prompt.
 * When actually setting prices, findPricePointId is used with the actual resource ID.
 */
export async function getPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  let resourceType: "app" | "iap" | "subscription";

  if (selectedItem.type === "app") {
    resourceType = "app";
  } else if (selectedItem.type === "inAppPurchase") {
    resourceType = "iap";
  } else {
    // subscription or offer
    resourceType = "subscription";
  }

  const pricePoints = await getTerritoryPricePointsData(
    resourceType,
    territoryId
  );
  if (!pricePoints || pricePoints.length === 0) {
    throw new Error(
      `No price points available for ${resourceType} in territory ${territoryId}`
    );
  }

  return convertCachedPricePointsToPricePointInfo(pricePoints);
}
