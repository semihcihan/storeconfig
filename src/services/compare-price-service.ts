import { logger } from "../utils/logger";
import type { AppStoreModel } from "../utils/validation-helpers";
import type { PricingItem } from "../models/pricing-request";
import { PriceSchema } from "../models/app-store";
import type { TerritoryData } from "./pricing-strategy";
import type { z } from "zod";
import { BASE_TERRITORY } from "./pricing-strategy";
import { collectPricingItems } from "../set-price/item-selection";

export interface PriceComparison {
  territory: string;
  localPrice: string;
  localCurrency: string;
  usdPrice: number;
  usdPercentage: number;
}

export interface PricingAnalysis {
  item: {
    type: string;
    id: string;
    name: string;
  };
  prices: {
    territory: string;
    usdPrice: number;
  }[];
}

export function getPricesForItem(
  appStoreState: AppStoreModel,
  item: PricingItem
): z.infer<typeof PriceSchema>[] {
  if (item.type === "app" && appStoreState.pricing) {
    return appStoreState.pricing.prices;
  }

  if (item.type === "inAppPurchase") {
    const iap = appStoreState.inAppPurchases?.find(
      (i) => i.productId === item.id
    );
    return iap?.priceSchedule?.prices || [];
  }

  if (item.type === "subscription") {
    for (const group of appStoreState.subscriptionGroups || []) {
      const subscription = group.subscriptions.find(
        (s) => s.productId === item.id
      );
      if (subscription) {
        return subscription.prices;
      }
    }
  }

  if (item.type === "offer") {
    for (const group of appStoreState.subscriptionGroups || []) {
      for (const subscription of group.subscriptions) {
        if (subscription.productId === item.id) {
          const introOffer = subscription.introductoryOffers?.find(
            (o) => o.type !== "FREE_TRIAL" && "prices" in o
          );
          if (introOffer && "prices" in introOffer) {
            return introOffer.prices;
          }

          const promoOffer = subscription.promotionalOffers?.find(
            (o) => o.type !== "FREE_TRIAL" && "prices" in o
          );
          if (promoOffer && "prices" in promoOffer) {
            return promoOffer.prices;
          }
        }
      }
    }
  }

  return [];
}

export function analyzePricing(
  appStoreState: AppStoreModel,
  currencies: TerritoryData[]
): PricingAnalysis[] {
  const items = collectPricingItems(appStoreState);
  const analysis: PricingAnalysis[] = [];

  const baseTerritoryCurrency = currencies.find(
    (c) => c.id === BASE_TERRITORY
  )?.currency;

  if (!baseTerritoryCurrency) {
    throw new Error(
      `Base territory currency not found in currency data for ${BASE_TERRITORY}`
    );
  }

  items.forEach((item) => {
    const prices = getPricesForItem(appStoreState, item);
    const priceComparisons: PriceComparison[] = [];

    prices.forEach((price) => {
      const territoryData = currencies.find((c) => c.id === price.territory);
      if (!territoryData) {
        logger.warn(`No currency data found for territory: ${price.territory}`);
        return;
      }

      const appStoreCurrencyPriceForTerritory = parseFloat(price.price);
      if (isNaN(appStoreCurrencyPriceForTerritory)) {
        logger.warn(
          `Invalid price format for territory ${price.territory}: ${price.price}`
        );
        return;
      }

      let usdPrice: number;
      if (territoryData.currency === baseTerritoryCurrency) {
        usdPrice = appStoreCurrencyPriceForTerritory;
      } else {
        const appStoreCurrencyUsdRate = currencies.find(
          (c) => c.localCurrency === territoryData.currency
        )?.usdRate;

        if (!appStoreCurrencyUsdRate) {
          logger.warn(
            `No USD rate found for currency: ${territoryData.currency} could not calculate usd price for ${price.territory}`
          );
          return;
        }
        usdPrice = appStoreCurrencyPriceForTerritory / appStoreCurrencyUsdRate;
      }

      priceComparisons.push({
        territory: price.territory,
        localPrice: price.price,
        localCurrency: territoryData.currency,
        usdPrice,
        usdPercentage: 0, // Will be calculated later
      });
    });

    if (priceComparisons.length > 0) {
      const usdPrice = priceComparisons.find(
        (p) => p.territory === BASE_TERRITORY
      )?.usdPrice;
      if (usdPrice) {
        priceComparisons.forEach((comparison) => {
          comparison.usdPercentage = (comparison.usdPrice / usdPrice) * 100;
        });
      }

      analysis.push({
        item: {
          type: item.type,
          id: item.id,
          name: item.name,
        },
        prices: priceComparisons.map((p) => ({
          territory: p.territory,
          usdPrice: p.usdPrice,
        })),
      });
    }
  });

  return analysis;
}
