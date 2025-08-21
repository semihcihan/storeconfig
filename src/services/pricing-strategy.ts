import { PriceSchema, PriceScheduleSchema } from "../models/app-store";
import { z } from "zod";
import { buildSubscriptionPricesWithEqualizations } from "../domains/subscriptions/pricing-service";
import { logger } from "../utils/logger";
import { TerritoryCodeSchema } from "../models/territories";
import * as fs from "fs";
import * as path from "path";
import { ContextualError } from "../helpers/error-handling-helpers";
import { territoryCodes } from "../models/territories";
import { PricingRequest } from "../models/pricing-request";
import type { AppStoreModel } from "../models/app-store";
import { fetchTerritoryPricePointsForSelectedItem } from "../set-price/base-price/price-point-fetcher";

export const BASE_TERRITORY = "USA";

type Price = z.infer<typeof PriceSchema>;
type TerritoryCode = z.infer<typeof TerritoryCodeSchema>;

export interface TerritoryData {
  id: string;
  currency: string;
  value?: number | null;
  localCurrency?: string;
  usdRate: number;
}

export interface PricingStrategy {
  getPrices(
    request: PricingRequest,
    appStoreState: AppStoreModel
  ): Promise<Price[]>;
}

export class ApplePricingStrategy implements PricingStrategy {
  async getPrices(
    request: PricingRequest,
    _appStoreState: AppStoreModel
  ): Promise<Price[]> {
    const { basePricePoint } = request;
    switch (request.selectedItem.type) {
      case "app":
      case "inAppPurchase":
        return [
          {
            price: basePricePoint.price,
            territory: BASE_TERRITORY,
          },
        ];
      case "subscription":
      case "offer":
        const equalizedPrices = await buildSubscriptionPricesWithEqualizations(
          basePricePoint.id
        );
        // Filter out the base territory from equalized prices to avoid duplicates
        const filteredEqualizedPrices = equalizedPrices.filter(
          (price) => price.territory !== BASE_TERRITORY
        );
        return [
          {
            price: basePricePoint.price,
            territory: BASE_TERRITORY,
          },
          ...filteredEqualizedPrices,
        ];
    }
  }
}

export class PurchasingPowerPricingStrategy implements PricingStrategy {
  private currencies: TerritoryData[] = [];

  constructor() {
    this.loadCurrencies();
  }

  private loadCurrencies(): void {
    logger.debug(`Loading territories from currencies.json`);
    try {
      const currenciesPath = path.join(
        process.cwd(),
        "src",
        "data",
        "currencies.json"
      );
      if (fs.existsSync(currenciesPath)) {
        const content = fs.readFileSync(currenciesPath, "utf8");
        this.currencies = JSON.parse(content);
      } else {
        throw new ContextualError("Currencies file not found", {
          currenciesPath,
        });
      }
    } catch (error) {
      throw new ContextualError("Failed to load currencies", error, {
        error,
      });
    }
  }

  async getPrices(
    request: PricingRequest,
    appStoreState: AppStoreModel
  ): Promise<Price[]> {
    return await this.prices(request, appStoreState);
  }

  async prices(
    request: PricingRequest,
    appStoreState: AppStoreModel
  ): Promise<Price[]> {
    const { basePricePoint, minimumPrice } = request;
    const basePriceNumber = parseFloat(basePricePoint.price);
    const minPriceNumber = minimumPrice ? parseFloat(minimumPrice) : 0;
    if (isNaN(basePriceNumber)) {
      throw new ContextualError("Invalid base price format", {
        basePrice: basePricePoint.price,
      });
    }

    const prices: Price[] = [];
    const territoriesWithMissingData: string[] = [];
    const invalidTerritories: string[] = [];

    for (const territory of this.currencies) {
      if (!territoryCodes.includes(territory.id as any)) {
        invalidTerritories.push(territory.id);
        continue;
      }

      const pppPriceLocal = this.calculatePPPPrice(
        territory,
        basePriceNumber,
        minPriceNumber
      );
      if (pppPriceLocal === null) {
        territoriesWithMissingData.push(territory.id);
        continue;
      }

      // Snap to nearest valid price point for the entity and territory
      const snappedPrice = await this.findNearestValidPrice(
        request,
        appStoreState,
        territory.id,
        pppPriceLocal
      );

      prices.push({
        price: snappedPrice,
        territory: territory.id as TerritoryCode,
      });
    }

    if (territoriesWithMissingData.length > 0) {
      logger.warn(
        `Could not calculate prices for ${territoriesWithMissingData.length} territories due to missing data,
        Will use value as usdRate to ignore the PPP ratio`,
        territoriesWithMissingData
      );
    }

    if (invalidTerritories.length > 0) {
      logger.debug(
        `Skipped ${invalidTerritories.length} territories with invalid territory codes:`,
        invalidTerritories
      );
    }

    logger.info(
      `Successfully calculated prices for ${prices.length} territories`
    );

    return prices;
  }

  private resultConverter(price: number): number {
    return Math.round(price * 100) / 100;
  }

  private calculatePPPPrice(
    territory: TerritoryData,
    basePriceUSD: number,
    minPriceUSD: number
  ): number | null {
    let pppValue = territory.value;
    if (!pppValue || pppValue <= 0) {
      // If the territory doesn't have a PPP value
      // use the USD conversion rate to ignore the PPP ratio and convert with exchange rate
      pppValue = territory.usdRate;
    }

    // Calculate fair price in local currency using PPP ratio
    const fairPriceLocalCurrency = basePriceUSD * pppValue;

    // Convert from fair local price to fair USD price
    const fairPriceUSD = Math.max(
      fairPriceLocalCurrency / territory.usdRate,
      minPriceUSD
    );

    // Find the target currency
    const targetCurrencyTerritory = this.findTerritoryByLocalCurrency(
      territory.currency
    );

    // If the target currency doesn't have a USD conversion rate, we can't calculate the price
    if (!targetCurrencyTerritory || !targetCurrencyTerritory.usdRate) {
      throw new ContextualError("Cannot calculate price", territory);
    }

    return this.resultConverter(fairPriceUSD * targetCurrencyTerritory.usdRate);
  }

  private findTerritoryByLocalCurrency(currency: string): TerritoryData | null {
    return (
      this.currencies.find(
        (territory) =>
          territory.localCurrency === currency &&
          territory.usdRate &&
          territory.usdRate > 0
      ) || null
    );
  }

  private pickNearestPriceString(
    target: number,
    priceStrings: string[]
  ): string {
    if (!priceStrings || priceStrings.length === 0) {
      throw new Error("No price points available to pick from");
    }

    // First, look for exact match (preserving original string format)
    for (const priceStr of priceStrings) {
      if (Math.abs(Number(priceStr) - target) < 0.0001) {
        return priceStr;
      }
    }

    // Convert to numbers for comparison, but keep original strings for return
    const priceNumbers = priceStrings.map((p) => Number(p));
    const sortedIndices = priceNumbers
      .map((num, index) => ({ num, index }))
      .sort((a, b) => a.num - b.num);

    // Find first >= target (round up)
    for (const { num, index } of sortedIndices) {
      if (num >= target) {
        return priceStrings[index];
      }
    }

    // Otherwise, round down to the largest < target
    return priceStrings[sortedIndices[sortedIndices.length - 1].index];
  }

  private async findNearestValidPrice(
    request: PricingRequest,
    appStoreState: AppStoreModel,
    territoryId: string,
    targetLocalPrice: number
  ): Promise<string> {
    try {
      const pricePoints = await fetchTerritoryPricePointsForSelectedItem(
        request.selectedItem,
        appStoreState,
        territoryId
      );
      if (!pricePoints || pricePoints.length === 0) {
        throw new ContextualError(
          "No price points returned for territory",
          undefined,
          {
            entityType: request.selectedItem.type,
            territoryId,
          }
        );
      }
      const priceStrings = pricePoints.map((p) => p.price);
      return this.pickNearestPriceString(targetLocalPrice, priceStrings);
    } catch (error) {
      throw new ContextualError(
        "Failed to find nearest valid price point",
        error,
        {
          entityType: request.selectedItem.type,
          territoryId,
          targetLocalPrice,
        }
      );
    }
  }
}

export function createPricingStrategy(
  strategy: "apple" | "purchasingPower"
): PricingStrategy {
  switch (strategy) {
    case "apple":
      return new ApplePricingStrategy();
    case "purchasingPower":
      return new PurchasingPowerPricingStrategy();
    default:
      throw new Error(`Unknown pricing strategy: ${strategy}`);
  }
}
