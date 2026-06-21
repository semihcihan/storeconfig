import { PricingItem } from "../models/pricing-request";
import { AppStoreModel } from "../models/app-store";
import { compareNumericValues } from "./numeric-helpers";

export function collectPricingItems(
  appStoreState: AppStoreModel
): PricingItem[] {
  const items: PricingItem[] = [];

  items.push({
    type: "app",
    id: appStoreState.appId,
    name: "App",
  });

  if (appStoreState.inAppPurchases) {
    appStoreState.inAppPurchases.forEach((iap) => {
      items.push({
        type: "inAppPurchase",
        id: iap.productId,
        name: iap.referenceName,
      });
    });
  }

  if (appStoreState.subscriptionGroups) {
    appStoreState.subscriptionGroups.forEach((group) => {
      group.subscriptions.forEach((subscription) => {
        items.push({
          type: "subscription",
          id: subscription.productId,
          name: subscription.referenceName,
        });

        if (subscription.introductoryOffers) {
          subscription.introductoryOffers
            .filter((offer) => offer.type !== "FREE_TRIAL")
            .forEach((offer) => {
              items.push({
                type: "offer",
                id: subscription.productId,
                name: `${offer.type} Introductory Offer`,
                offerType: offer.type,
                parentName: subscription.referenceName,
              });
            });
        }

        if (subscription.promotionalOffers) {
          subscription.promotionalOffers
            .filter((offer) => offer.type !== "FREE_TRIAL")
            .forEach((offer) => {
              items.push({
                type: "offer",
                id: offer.id,
                name: `${offer.type} Promotional Offer`,
                offerType: offer.type,
                parentName: subscription.referenceName,
              });
            });
        }
      });
    });
  }

  return items;
}

export function findNearestPrices(
  enteredPrice: number | string,
  availablePrices: string[],
  count: number
): string[] {
  let enteredPriceNumber =
    typeof enteredPrice === "string" ? Number(enteredPrice) : enteredPrice;
  const nearest = availablePrices
    .map((p) => ({ price: p, diff: Math.abs(Number(p) - enteredPriceNumber) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, Math.max(0, count))
    .map((s) => s.price);
  // Ensure output is ordered ascending numerically for clearer UX
  return nearest.sort((a, b) => Number(a) - Number(b));
}

function countMeaningfulDecimals(price: string): number {
  const num = Number(price);
  const str = num.toString();
  const decimalIndex = str.indexOf(".");
  if (decimalIndex === -1) {
    return 0;
  }
  return str.length - decimalIndex - 1;
}

export function findBestClosestPrice(
  enteredPrice: string,
  availablePrices: string[]
): string | null {
  if (availablePrices.length === 0) return null;

  const targetPrice = parseFloat(enteredPrice);
  if (isNaN(targetPrice)) return null;

  // First, check for exact match
  for (const priceStr of availablePrices) {
    if (compareNumericValues(enteredPrice, priceStr)) {
      return priceStr;
    }
  }

  let lower: string | null = null;
  let upper: string | null = null;
  let lowerDiff = Infinity;
  let upperDiff = Infinity;

  for (const priceStr of availablePrices) {
    const price = parseFloat(priceStr);
    if (isNaN(price)) continue;

    if (price < targetPrice) {
      const diff = targetPrice - price;
      if (diff < lowerDiff) {
        lowerDiff = diff;
        lower = priceStr;
      }
    } else if (price > targetPrice) {
      const diff = price - targetPrice;
      if (diff < upperDiff) {
        upperDiff = diff;
        upper = priceStr;
      }
    }
  }

  if (!lower && !upper) return null;
  if (!lower) return upper;
  if (!upper) return lower;

  const lowerDecimals = countMeaningfulDecimals(lower);
  const upperDecimals = countMeaningfulDecimals(upper);

  if (lowerDecimals > upperDecimals) {
    return lower;
  } else if (upperDecimals > lowerDecimals) {
    return upper;
  }
  // When meaningful decimals are the same, pick the closer one to the entered price
  // If distances are equal, prefer upper (bigger) as tie-breaker
  return lowerDiff < upperDiff ? lower : upper;
}
