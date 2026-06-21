import { logger } from "@semihcihan/shared";
import type { AppStoreModel, PricingItem } from "@semihcihan/shared";
import {
  PriceSchema,
  PriceScheduleSchema,
  TerritoryCodeSchema,
  compareNumericValues,
} from "@semihcihan/shared";
import type { TerritoryData } from "./pricing-strategy";
import type { z } from "zod";
import {
  BASE_TERRITORY,
  WORLDWIDE_TERRITORY_CODE,
  territoryCodes,
} from "@semihcihan/shared";
import { collectPricingItems } from "@semihcihan/shared";
import type { PricingAnalysis, PriceComparison } from "@semihcihan/shared";
import { findAppPricePointId } from "../domains/pricing/service";
import { fetchAppPricePointEqualizations } from "../domains/pricing/api-client";
import {
  getTerritoryPricePointsData,
  type ResourceType,
} from "./price-point";

function getAvailableTerritories(
  appStoreState: AppStoreModel,
  item: PricingItem
): z.infer<typeof TerritoryCodeSchema>[] | "worldwide" | undefined {
  if (item.type === "app") {
    return appStoreState.availableTerritories;
  }

  if (item.type === "inAppPurchase") {
    const iap = appStoreState.inAppPurchases?.find(
      (i) => i.productId === item.id
    );
    return iap?.availability?.availableTerritories;
  }

  if (item.type === "subscription") {
    for (const group of appStoreState.subscriptionGroups || []) {
      const subscription = group.subscriptions.find(
        (s) => s.productId === item.id
      );
      if (subscription) {
        return subscription.availability?.availableTerritories;
      }
    }
  }

  if (item.type === "offer") {
    for (const group of appStoreState.subscriptionGroups || []) {
      for (const subscription of group.subscriptions) {
        if (subscription.productId === item.id) {
          const introOffer = subscription.introductoryOffers?.find(
            (o) => o.type !== "FREE_TRIAL" && "pricing" in o
          );
          if (
            introOffer &&
            "pricing" in introOffer &&
            "availableTerritories" in introOffer
          ) {
            return introOffer.availableTerritories;
          }
        }

        const promoOffer = subscription.promotionalOffers?.find(
          (o) => o.id === item.id && o.type !== "FREE_TRIAL"
        );
        if (promoOffer) {
          return subscription.availability?.availableTerritories;
        }
      }
    }
  }

  return undefined;
}

function filterPricesByAvailability(
  prices: z.infer<typeof PriceSchema>[],
  availableTerritories:
    | z.infer<typeof TerritoryCodeSchema>[]
    | "worldwide"
    | undefined
): z.infer<typeof PriceSchema>[] {
  if (!availableTerritories || availableTerritories.length === 0) {
    return prices;
  }

  if (availableTerritories === WORLDWIDE_TERRITORY_CODE) {
    return prices;
  }

  const availableTerritoriesSet = new Set(availableTerritories);
  return prices.filter((price) => availableTerritoriesSet.has(price.territory));
}

async function buildAppPricesWithEqualizations(
  pricePointId: string
): Promise<z.infer<typeof PriceSchema>[]> {
  const equalizationsResponse =
    await fetchAppPricePointEqualizations(pricePointId);

  const equalizationsData = equalizationsResponse.data;
  if (!Array.isArray(equalizationsData)) {
    throw new Error("Equalizations response data is not an array");
  }

  const prices: z.infer<typeof PriceSchema>[] = equalizationsData
    .map((item: any) => {
      if (
        !item.relationships?.territory?.data?.id ||
        !item.attributes?.customerPrice
      ) {
        return null;
      }
      return {
        price: item.attributes.customerPrice,
        territory: item.relationships.territory.data.id,
      };
    })
    .filter(Boolean) as z.infer<typeof PriceSchema>[];

  return prices;
}

function mergeEqualizedPricesWithOverrides(
  equalizedPrices: z.infer<typeof PriceSchema>[],
  schedulePrices: z.infer<typeof PriceSchema>[]
): z.infer<typeof PriceSchema>[] {
  const priceMap = new Map<string, z.infer<typeof PriceSchema>>();

  for (const price of equalizedPrices) {
    priceMap.set(price.territory, price);
  }

  for (const price of schedulePrices) {
    priceMap.set(price.territory, price);
  }

  return Array.from(priceMap.values());
}

async function buildCachedPricesWithEqualizations(
  pricing: z.infer<typeof PriceScheduleSchema> | undefined,
  resourceType: ResourceType
): Promise<z.infer<typeof PriceSchema>[] | null> {
  if (!pricing) {
    return [];
  }

  const baseTerritoryPrice = pricing.prices.find(
    (p) => p.territory === pricing.baseTerritory
  );

  if (!baseTerritoryPrice) {
    logger.warn(
      `Base territory price not found for territory ${pricing.baseTerritory}, using prices from pricing schedule`
    );
    return pricing.prices;
  }

  const baseTerritoryPricePoints = await getTerritoryPricePointsData(
    resourceType,
    baseTerritoryPrice.territory
  );
  const basePricePoint = baseTerritoryPricePoints?.find((pricePoint) =>
    compareNumericValues(baseTerritoryPrice.price, pricePoint.customerPrice)
  );

  if (!basePricePoint) {
    return null;
  }

  const equalizedPrices: z.infer<typeof PriceSchema>[] = [];
  for (const territory of territoryCodes) {
    const territoryPricePoints = await getTerritoryPricePointsData(
      resourceType,
      territory
    );
    const equalizedPricePoint = territoryPricePoints?.find(
      (pricePoint) => pricePoint.priceIndex === basePricePoint.priceIndex
    );

    if (equalizedPricePoint) {
      equalizedPrices.push({
        territory: territory as z.infer<typeof TerritoryCodeSchema>,
        price: equalizedPricePoint.customerPrice,
      });
    }
  }

  if (equalizedPrices.length === 0) {
    return null;
  }

  return mergeEqualizedPricesWithOverrides(equalizedPrices, pricing.prices);
}

async function buildCompletePricesForSubscription(
  pricing: z.infer<typeof PriceScheduleSchema> | undefined,
  subscriptionId: string
): Promise<z.infer<typeof PriceSchema>[]> {
  try {
    const cachedPrices = await buildCachedPricesWithEqualizations(
      pricing,
      "subscription"
    );
    if (cachedPrices) {
      return cachedPrices;
    }
  } catch (error) {
    logger.warn(
      `Failed to build cached equalized prices for subscription ${subscriptionId}, using prices from pricing schedule`,
      error
    );
  }

  return pricing?.prices || [];
}

async function buildCompletePricesForIAP(
  pricing: z.infer<typeof PriceScheduleSchema> | undefined,
  iapId: string
): Promise<z.infer<typeof PriceSchema>[]> {
  try {
    const cachedPrices = await buildCachedPricesWithEqualizations(
      pricing,
      "iap"
    );
    if (cachedPrices) {
      return cachedPrices;
    }
  } catch (error) {
    logger.warn(
      `Failed to build cached equalized prices for IAP ${iapId}, using prices from pricing schedule`,
      error
    );
  }

  return pricing?.prices || [];
}

async function buildCompletePricesForApp(
  pricing: z.infer<typeof PriceScheduleSchema> | undefined,
  appId: string
): Promise<z.infer<typeof PriceSchema>[]> {
  if (!pricing) {
    return [];
  }

  const baseTerritoryPrice = pricing.prices.find(
    (p) => p.territory === pricing.baseTerritory
  );

  if (!baseTerritoryPrice) {
    logger.warn(
      `Base territory price not found for territory ${pricing.baseTerritory}, using prices from pricing schedule`
    );
    return pricing.prices;
  }

  try {
    const basePricePointId = await findAppPricePointId(
      baseTerritoryPrice.price,
      baseTerritoryPrice.territory,
      appId
    );

    const equalizedPrices =
      await buildAppPricesWithEqualizations(basePricePointId);

    return mergeEqualizedPricesWithOverrides(equalizedPrices, pricing.prices);
  } catch (error) {
    logger.warn(
      `Failed to build equalized prices for app ${appId}, using prices from pricing schedule`,
      error
    );
    return pricing.prices;
  }
}

export async function getPricesForItem(
  appStoreState: AppStoreModel,
  item: PricingItem
): Promise<z.infer<typeof PriceSchema>[]> {
  if (item.type === "app" && appStoreState.pricing) {
    const appId = appStoreState.appId;
    return await buildCompletePricesForApp(appStoreState.pricing, appId);
  }

  if (item.type === "inAppPurchase") {
    const iap = appStoreState.inAppPurchases?.find(
      (i) => i.productId === item.id
    );
    if (iap?.pricing) {
      return await buildCompletePricesForIAP(iap.pricing, iap.productId);
    }
    return [];
  }

  if (item.type === "subscription") {
    for (const group of appStoreState.subscriptionGroups || []) {
      const subscription = group.subscriptions.find(
        (s) => s.productId === item.id
      );
      if (subscription?.pricing) {
        return await buildCompletePricesForSubscription(
          subscription.pricing,
          subscription.productId
        );
      }
    }
  }

  if (item.type === "offer") {
    for (const group of appStoreState.subscriptionGroups || []) {
      for (const subscription of group.subscriptions) {
        let offerPricing: z.infer<typeof PriceScheduleSchema> | undefined;

        if (subscription.productId === item.id) {
          const introOffer = subscription.introductoryOffers?.find(
            (o) => o.type !== "FREE_TRIAL" && "pricing" in o
          );
          if (introOffer && "pricing" in introOffer) {
            offerPricing = introOffer.pricing;
          }
        }

        if (!offerPricing) {
          const promoOffer = subscription.promotionalOffers?.find(
            (o) => o.id === item.id && o.type !== "FREE_TRIAL" && "pricing" in o
          );
          if (promoOffer && "pricing" in promoOffer) {
            offerPricing = promoOffer.pricing;
          }
        }

        if (offerPricing) {
          return await buildCompletePricesForSubscription(
            offerPricing,
            subscription.productId
          );
        }
      }
    }
  }

  return [];
}

export async function analyzePricing(
  appStoreState: AppStoreModel,
  currencies: TerritoryData[]
): Promise<PricingAnalysis[]> {
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

  for (const item of items) {
    const prices = await getPricesForItem(appStoreState, item);
    const availableTerritories = getAvailableTerritories(appStoreState, item);
    const filteredPrices = filterPricesByAvailability(
      prices,
      availableTerritories
    );
    const priceComparisons: PriceComparison[] = [];

    for (const price of filteredPrices) {
      const territoryData = currencies.find((c) => c.id === price.territory);
      if (!territoryData) {
        logger.warn(`No currency data found for territory: ${price.territory}`);
        continue;
      }

      const appStoreCurrencyPriceForTerritory = parseFloat(price.price);
      if (isNaN(appStoreCurrencyPriceForTerritory)) {
        logger.warn(
          `Invalid price format for territory ${price.territory}: ${price.price}`
        );
        continue;
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
          continue;
        }
        usdPrice = appStoreCurrencyPriceForTerritory / appStoreCurrencyUsdRate;
      }

      priceComparisons.push({
        territory: price.territory,
        localPrice: appStoreCurrencyPriceForTerritory,
        localCurrency: territoryData.currency,
        usdPrice,
        usdPercentage: 0,
      });
    }

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
        prices: priceComparisons,
      });
    }
  }

  return analysis;
}
