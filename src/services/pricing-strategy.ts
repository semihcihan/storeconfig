import { PriceSchema, PriceScheduleSchema } from "../models/app-store";
import { z } from "zod";
import { buildSubscriptionPricesWithEqualizations } from "../domains/subscriptions/pricing-service";
import { logger } from "../utils/logger";
import { TerritoryCodeSchema } from "../models/territories";
import * as fs from "fs";
import * as path from "path";
import { ContextualError } from "../helpers/error-handling-helpers";
import { territoryCodes } from "../models/territories";

type Price = z.infer<typeof PriceSchema>;
type PriceSchedule = z.infer<typeof PriceScheduleSchema>;
type TerritoryCode = z.infer<typeof TerritoryCodeSchema>;

export interface TerritoryData {
  id: string;
  currency: string;
  value?: number | null;
  localCurrency?: string;
  usdRate?: number;
}

export interface PricingStrategy {
  buildPriceSchedule(basePrice: string, minPrice?: string): PriceSchedule;
  buildSubscriptionPrices(
    pricePointId: string,
    minPrice?: string
  ): Promise<Price[]>;
}

export class ApplePricingStrategy implements PricingStrategy {
  private readonly BASE_TERRITORY = "USA";

  buildPriceSchedule(basePrice: string, minPrice?: string): PriceSchedule {
    return {
      baseTerritory: this.BASE_TERRITORY,
      prices: [
        {
          price: basePrice,
          territory: this.BASE_TERRITORY,
        },
      ],
    };
  }

  async buildSubscriptionPrices(
    pricePointId: string,
    minPrice?: string
  ): Promise<Price[]> {
    return await buildSubscriptionPricesWithEqualizations(pricePointId);
  }
}

export class PurchasingPowerPricingStrategy implements PricingStrategy {
  private readonly BASE_TERRITORY = "USA";
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

  buildPriceSchedule(basePrice: string, minPrice?: string): PriceSchedule {
    const basePriceNumber = parseFloat(basePrice);
    const minPriceNumber = minPrice ? parseFloat(minPrice) : 0;
    if (isNaN(basePriceNumber)) {
      throw new ContextualError("Invalid base price format", {
        basePrice,
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

      const price = this.calculateTerritoryPrice(
        territory,
        basePriceNumber,
        minPriceNumber
      );
      if (price !== null) {
        prices.push({
          price: price.toString(),
          territory: territory.id as TerritoryCode,
        });
      } else {
        territoriesWithMissingData.push(territory.id);
      }
    }

    if (territoriesWithMissingData.length > 0) {
      // TODO: handle by using Apple prices?
      logger.warn(
        `Could not calculate prices for ${territoriesWithMissingData.length} territories due to missing data:`,
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

    return {
      baseTerritory: this.BASE_TERRITORY,
      prices,
    };
  }

  private calculateTerritoryPrice(
    territory: TerritoryData,
    basePriceUSD: number,
    minPriceUSD: number
  ): number | null {
    const resultConverter = (price: number) => Math.round(price * 100) / 100;

    if (!territory.value || territory.value <= 0) {
      return null;
    }

    // Calculate fair price in local currency using PPP ratio
    const fairPriceLocalCurrency = basePriceUSD * territory.value;

    // If the territory doesn't have a USD conversion rate, we can't calculate the price
    if (!territory.usdRate) {
      return resultConverter(fairPriceLocalCurrency);
    }

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
      return null;
    }

    return resultConverter(fairPriceUSD * targetCurrencyTerritory.usdRate);
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

  async buildSubscriptionPrices(
    pricePointId: string,
    minPrice?: string
  ): Promise<Price[]> {
    const schedule = this.buildPriceSchedule(pricePointId, minPrice);
    return schedule.prices;
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
