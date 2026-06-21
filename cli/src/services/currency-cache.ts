import fs from "fs";
import os from "os";
import path from "path";
import { ContextualError } from "@semihcihan/shared";
import {
  loadBundledCurrencies,
  type TerritoryData,
} from "@semihcihan/developer-tool/functions";

interface CachedCurrencies {
  updatedAt: Date;
  data: TerritoryData[];
}

const WEEKLY_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export class CurrencyCache {
  private memoryCache: CachedCurrencies | null = null;

  constructor(
    private cachePath: string = path.join(
      os.homedir(),
      ".storeconfig",
      "cache",
      "currencies.json"
    ),
    private cacheTtlMs: number = WEEKLY_CACHE_TTL_MS,
    private now: () => Date = () => new Date()
  ) {}

  async loadCurrencies(): Promise<TerritoryData[]> {
    if (this.memoryCache && this.isCacheFresh(this.memoryCache.updatedAt)) {
      return this.memoryCache.data;
    }

    try {
      if (fs.existsSync(this.cachePath)) {
        const stat = fs.statSync(this.cachePath);
        const cached = JSON.parse(
          fs.readFileSync(this.cachePath, "utf8")
        ) as TerritoryData[];
        if (this.isCacheFresh(stat.mtime)) {
          this.memoryCache = {
            updatedAt: stat.mtime,
            data: cached,
          };
          return cached;
        }
      }

      const bundled = loadBundledCurrencies();
      this.saveCurrencies(bundled);
      return bundled;
    } catch (error) {
      throw new ContextualError("Failed to load currency cache", error);
    }
  }

  saveCurrencies(currencies: TerritoryData[]): void {
    try {
      fs.mkdirSync(path.dirname(this.cachePath), {
        recursive: true,
        mode: 0o700,
      });
      fs.writeFileSync(
        this.cachePath,
        JSON.stringify(currencies, null, 2) + "\n",
        { encoding: "utf8", mode: 0o600 }
      );
      fs.chmodSync(this.cachePath, 0o600);
      this.memoryCache = {
        updatedAt: this.now(),
        data: currencies,
      };
    } catch (error) {
      throw new ContextualError("Failed to save currency cache", error);
    }
  }

  clearMemoryCache(): void {
    this.memoryCache = null;
  }

  private isCacheFresh(updatedAt: Date): boolean {
    const updatedAtTime = updatedAt.getTime();
    if (!Number.isFinite(updatedAtTime)) {
      return false;
    }

    return this.now().getTime() - updatedAtTime < this.cacheTtlMs;
  }
}

export const currencyCache = new CurrencyCache();
