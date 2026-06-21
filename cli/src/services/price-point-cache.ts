import fs from "fs";
import os from "os";
import path from "path";
import {
  ContextualError,
  logger,
  type PricePointInfo,
  type PricingItem,
} from "@semihcihan/shared";
import {
  type PricePoint,
  type ResourceType,
  type TerritoryPricePoints,
} from "@semihcihan/developer-tool/functions";

interface CachedPricePointsFile {
  updatedAt: string;
  data: TerritoryPricePoints[];
}

const WEEKLY_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_PRICE_POINTS_REPO = "semihcihan/storeconfig";
const PRICE_POINTS_BASE_URL_ENV = "STORECONFIG_PRICE_POINTS_BASE_URL";
const PRICE_POINTS_REPO_ENV = "STORECONFIG_PRICE_POINTS_REPO";

type FetchFn = (url: string) => Promise<{
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
}>;

interface LoadedCacheFile {
  file: CachedPricePointsFile;
  isFresh: boolean;
}

function resourceTypeForSelectedItem(item: PricingItem): ResourceType {
  if (item.type === "app") {
    return "app";
  }
  if (item.type === "inAppPurchase") {
    return "iap";
  }
  return "subscription";
}

function pricePointsToInfo(pricePoints: PricePoint[]): PricePointInfo[] {
  return pricePoints
    .map((pricePoint) => ({
      id: pricePoint.customerPrice,
      price: pricePoint.customerPrice,
    }))
    .sort((a, b) => Number(a.price) - Number(b.price));
}

function githubPagesPricePointsUrl(repo: string): string {
  const parts = repo.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(
      `${PRICE_POINTS_REPO_ENV} must be in OWNER/REPO form, got '${repo}'`
    );
  }

  const [owner, repoName] = parts;
  if (repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
    return `https://${repoName.toLowerCase()}/price-points`;
  }

  return `https://${owner}.github.io/${repoName}/price-points`;
}

export function resolvePricePointsBaseUrl(
  env: NodeJS.ProcessEnv = process.env
): string {
  const configuredBaseUrl = env[PRICE_POINTS_BASE_URL_ENV]?.trim();
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  return githubPagesPricePointsUrl(
    (env[PRICE_POINTS_REPO_ENV] || DEFAULT_PRICE_POINTS_REPO).trim()
  );
}

export class PricePointCache {
  private memoryCache = new Map<ResourceType, CachedPricePointsFile>();
  private readonly remoteBaseUrl: string;

  constructor(
    private cacheDir: string = path.join(
      os.homedir(),
      ".storeconfig",
      "cache",
      "price-points"
    ),
    private cacheTtlMs: number = WEEKLY_CACHE_TTL_MS,
    private now: () => Date = () => new Date(),
    remoteBaseUrl: string = resolvePricePointsBaseUrl(),
    private fetchFn: FetchFn = globalThis.fetch
  ) {
    this.remoteBaseUrl = remoteBaseUrl.replace(/\/+$/, "");
  }

  async getTerritoryPricePoints(
    resourceType: ResourceType,
    territory: string,
    _resourceIdOverride?: string
  ): Promise<TerritoryPricePoints | null> {
    const cached = this.loadCachedFile(resourceType);
    const cachedTerritory = this.findTerritory(cached.file, territory);

    if (cached.isFresh && cachedTerritory) {
      return cachedTerritory;
    }

    try {
      const refreshedFile = await this.fetchRemoteFile(resourceType);
      this.saveCachedFile(resourceType, refreshedFile);
      return this.findTerritory(refreshedFile, territory);
    } catch (error) {
      if (cachedTerritory) {
        logger.warn(
          `Using stale ${resourceType} price point cache for ${territory} because the shared cache could not be refreshed`,
          error
        );
        return cachedTerritory;
      }

      throw new ContextualError(
        `Failed to refresh ${resourceType} price point cache from ${this.remoteBaseUrl}`,
        error
      );
    }
  }

  async getPricePointsForSelectedItem(
    selectedItem: PricingItem,
    _appId: string,
    territoryId: string,
    _subscriptionResourceId?: string
  ): Promise<PricePointInfo[]> {
    const territoryPricePoints = await this.getTerritoryPricePoints(
      resourceTypeForSelectedItem(selectedItem),
      territoryId
    );

    if (!territoryPricePoints?.pricePoints.length) {
      throw new Error(
        `No price points available for ${selectedItem.type} in territory ${territoryId}`
      );
    }

    return pricePointsToInfo(territoryPricePoints.pricePoints);
  }

  clearMemoryCache(): void {
    this.memoryCache.clear();
  }

  private cachePath(resourceType: ResourceType): string {
    return path.join(this.cacheDir, `${resourceType}.json`);
  }

  private loadCachedFile(resourceType: ResourceType): LoadedCacheFile {
    const cached = this.memoryCache.get(resourceType);
    if (cached) {
      return {
        file: cached,
        isFresh: this.isCacheFresh(cached),
      };
    }

    try {
      const cachePath = this.cachePath(resourceType);
      if (!fs.existsSync(cachePath)) {
        const emptyFile = this.emptyCacheFile();
        this.memoryCache.set(resourceType, emptyFile);
        return { file: emptyFile, isFresh: false };
      }

      const parsed = JSON.parse(
        fs.readFileSync(cachePath, "utf8")
      ) as CachedPricePointsFile;
      const validated = this.validateCachedFile(resourceType, parsed);
      const isFresh = this.isCacheFresh(validated);
      this.memoryCache.set(resourceType, validated);
      return { file: validated, isFresh };
    } catch (error) {
      throw new ContextualError(
        `Failed to load ${resourceType} price point cache`,
        error
      );
    }
  }

  private async fetchRemoteFile(
    resourceType: ResourceType
  ): Promise<CachedPricePointsFile> {
    const url = `${this.remoteBaseUrl}/${resourceType}.json`;
    const response = await this.fetchFn(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      );
    }

    return this.validateCachedFile(resourceType, await response.json());
  }

  private saveCachedFile(
    resourceType: ResourceType,
    data: CachedPricePointsFile
  ): void {
    try {
      fs.mkdirSync(this.cacheDir, { recursive: true, mode: 0o700 });
      fs.writeFileSync(
        this.cachePath(resourceType),
        JSON.stringify(data, null, 2) + "\n",
        { encoding: "utf8", mode: 0o600 }
      );
      fs.chmodSync(this.cachePath(resourceType), 0o600);
      this.memoryCache.set(resourceType, data);
    } catch (error) {
      throw new ContextualError(
        `Failed to save ${resourceType} price point cache`,
        error
      );
    }
  }

  private emptyCacheFile(): CachedPricePointsFile {
    return {
      updatedAt: this.now().toISOString(),
      data: [],
    };
  }

  private isCacheFresh(cacheFile: CachedPricePointsFile): boolean {
    const updatedAt = new Date(cacheFile.updatedAt).getTime();
    if (!Number.isFinite(updatedAt)) {
      return false;
    }

    return this.now().getTime() - updatedAt < this.cacheTtlMs;
  }

  private findTerritory(
    cacheFile: CachedPricePointsFile,
    territory: string
  ): TerritoryPricePoints | null {
    return cacheFile.data.find((item) => item.territory === territory) || null;
  }

  private validateCachedFile(
    resourceType: ResourceType,
    value: unknown
  ): CachedPricePointsFile {
    if (!value || typeof value !== "object") {
      throw new Error(`Invalid ${resourceType} price point cache payload`);
    }

    const file = value as CachedPricePointsFile;
    const updatedAt = new Date(file.updatedAt).getTime();
    if (!file.updatedAt || !Number.isFinite(updatedAt)) {
      throw new Error(`Invalid ${resourceType} price point cache updatedAt`);
    }

    if (!Array.isArray(file.data)) {
      throw new Error(`Invalid ${resourceType} price point cache data`);
    }

    for (const territoryData of file.data) {
      if (
        territoryData.resourceType !== resourceType ||
        typeof territoryData.territory !== "string" ||
        !Array.isArray(territoryData.pricePoints)
      ) {
        throw new Error(`Invalid ${resourceType} price point territory data`);
      }

      for (const pricePoint of territoryData.pricePoints) {
        if (
          typeof pricePoint.priceIndex !== "string" ||
          typeof pricePoint.customerPrice !== "string"
        ) {
          throw new Error(`Invalid ${resourceType} price point entry`);
        }
      }
    }

    return file;
  }
}

export const pricePointCache = new PricePointCache();
