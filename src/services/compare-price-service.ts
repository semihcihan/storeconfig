import { logger } from "../utils/logger";
import type { AppStoreModel } from "../models/app-store";
import type { PricingItem } from "../models/pricing-request";
import { PriceSchema } from "../models/app-store";
import type { TerritoryData } from "./pricing-strategy";
import type { z } from "zod";
import { BASE_TERRITORY } from "./pricing-strategy";
import { collectPricingItems } from "../set-price/item-selection";
import * as XLSX from "xlsx";
import * as fs from "fs";

export interface PriceComparison {
  territory: string;
  localPrice: number;
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
  prices: PriceComparison[];
}

function sheetName(analysis: PricingAnalysis): string {
  return analysis.item.name;
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
        return subscription.prices || [];
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
        localPrice: appStoreCurrencyPriceForTerritory,
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
        prices: priceComparisons,
      });
    }
  });

  return analysis;
}

const headers = [
  "Territory",
  "Local Price",
  "Local Currency",
  "USD Price",
  "Relative to USA (%)",
];

export function exportAnalysisToCSV(
  analysis: PricingAnalysis[],
  outputPath: string
): void {
  const csvRows: string[] = [];

  csvRows.push(["Name", ...headers].join(","));

  analysis.forEach((item) => {
    item.prices.forEach((price) => {
      csvRows.push(
        `${sheetName(item)},${price.territory},${price.localPrice},${
          price.localCurrency
        },${price.usdPrice.toFixed(2)},${price.usdPercentage.toFixed(0)}`
      );
    });
  });

  const csvContent = csvRows.join("\n");
  fs.writeFileSync(outputPath, csvContent, "utf8");
}

export function exportAnalysis(
  analysis: PricingAnalysis[],
  outputPath: string
): void {
  const fileExtension = outputPath.toLowerCase().split(".").pop();

  if (!fileExtension || (fileExtension !== "csv" && fileExtension !== "xlsx")) {
    throw new Error(
      `Unsupported file format. Please use ".csv" or ".xlsx" extension: "${outputPath}"`
    );
  }

  if (fileExtension === "csv") {
    exportAnalysisToCSV(analysis, outputPath);
  } else {
    exportAnalysisToXLSX(analysis, outputPath);
  }
}

export function exportAnalysisToXLSX(
  analysis: PricingAnalysis[],
  outputPath: string
): void {
  const workbook = XLSX.utils.book_new();

  analysis.forEach((item) => {
    const name = sheetName(item);

    const rows = item.prices.map((price) => [
      price.territory,
      price.localPrice,
      price.localCurrency,
      parseFloat(price.usdPrice.toFixed(2)),
      parseFloat(price.usdPercentage.toFixed(0)),
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Set column widths to approximately 2x default (default is ~8-10 characters)
    worksheet["!cols"] = [
      { width: 13 }, // Territory
      { width: 13 }, // Local Price
      { width: 13 }, // Local Currency
      { width: 13 }, // USD Price
      { width: 18 }, // Relative to USA (%)
    ];

    // Freeze the first row (headers) so they stay visible when sorting
    worksheet["!freeze"] = { rows: 1 };

    XLSX.utils.book_append_sheet(workbook, worksheet, name);
  });

  XLSX.writeFile(workbook, outputPath);
}
