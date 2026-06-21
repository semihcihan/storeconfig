import { PriceSchema } from "@semihcihan/shared";
import { z } from "zod";
import { logger } from "@semihcihan/shared";
import { TerritoryCodeSchema } from "@semihcihan/shared";
import { ContextualError } from "@semihcihan/shared";
import { territoryCodes } from "@semihcihan/shared";
import { PricingRequest } from "@semihcihan/shared";
import { BASE_TERRITORY } from "@semihcihan/shared";
import { findBestClosestPrice } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";
import { getPricePointsForSelectedItem } from "../set-price/base-price/price-point-fetcher";
import { TerritoryCurrency } from "../scripts/fetch-territories";

type Price = z.infer<typeof PriceSchema>;
type TerritoryCode = z.infer<typeof TerritoryCodeSchema>;

export interface TerritoryData extends TerritoryCurrency {
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
    return [
      {
        price: basePricePoint.price,
        territory: BASE_TERRITORY,
      },
    ];
  }
}

export class PurchasingPowerPricingStrategy implements PricingStrategy {
  private currencies: TerritoryData[] = [];

  constructor(currencies?: TerritoryData[]) {
    if (currencies) {
      this.currencies = currencies;
      logger.debug(
        `Loaded ${currencies.length} territories from provided data`
      );
    } else {
      logger.warn(
        "PurchasingPowerPricingStrategy initialized without currencies. Currencies must be loaded separately."
      );
    }
  }

  setCurrencies(currencies: TerritoryData[]): void {
    this.currencies = currencies;
    logger.debug(`Updated currencies: ${currencies.length} territories`);
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
      throw new ContextualError(
        `Invalid base price format: ${basePricePoint.price}`
      );
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
      throw new ContextualError(`Cannot calculate price for ${territory}`);
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

  private async findNearestValidPrice(
    request: PricingRequest,
    appStoreState: AppStoreModel,
    territoryId: string,
    targetLocalPrice: number
  ): Promise<string> {
    try {
      const pricePoints = await getPricePointsForSelectedItem(
        request.selectedItem,
        appStoreState.appId,
        territoryId
      );
      if (!pricePoints || pricePoints.length === 0) {
        throw new ContextualError(
          `No price points returned for territory: ${territoryId} type: ${request.selectedItem.type}`
        );
      }
      const priceStrings = pricePoints.map((p) => p.price);
      const closestPrice = findBestClosestPrice(
        targetLocalPrice.toString(),
        priceStrings
      );
      if (!closestPrice) {
        throw new ContextualError(
          `Could not find closest price for target: ${targetLocalPrice} in territory: ${territoryId}`
        );
      }
      return closestPrice;
    } catch (error) {
      throw new ContextualError("Failed to find nearest valid price point", {
        error,
        entityType: request.selectedItem.type,
        territoryId,
        targetLocalPrice,
      });
    }
  }
}

export function createPricingStrategy(
  strategy: "apple" | "purchasingPower",
  currencies?: TerritoryData[]
): PricingStrategy {
  switch (strategy) {
    case "apple":
      return new ApplePricingStrategy();
    case "purchasingPower":
      return new PurchasingPowerPricingStrategy(currencies);
    default:
      throw new Error(`Unknown pricing strategy: ${strategy}`);
  }
}
