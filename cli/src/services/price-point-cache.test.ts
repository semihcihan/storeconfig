import fs from "fs";
import os from "os";
import path from "path";
import { PricePointCache, resolvePricePointsBaseUrl } from "./price-point-cache";

type FetchMock = jest.MockedFunction<
  (url: string) => Promise<{
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<unknown>;
  }>
>;

const remoteBaseUrl = "https://example.com/price-points";
const originalEnv = process.env;

function createFetchMock(payload: unknown): FetchMock {
  return jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => payload,
  });
}

describe("PricePointCache", () => {
  let tempDir: string;
  let fetchMock: FetchMock;
  let cache: PricePointCache;

  beforeEach(() => {
    process.env = { ...originalEnv };
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-prices-"));
    fetchMock = createFetchMock({
      updatedAt: new Date().toISOString(),
      data: [
        {
          territory: "USA",
          resourceType: "app" as const,
          pricePoints: [
            { priceIndex: "2", customerPrice: "1.99" },
            { priceIndex: "1", customerPrice: "0.99" },
          ],
        },
      ],
    });
    cache = new PricePointCache(
      tempDir,
      7 * 24 * 60 * 60 * 1000,
      () => new Date(),
      remoteBaseUrl,
      fetchMock
    );
  });

  afterEach(() => {
    process.env = originalEnv;
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("resolves the official price point endpoint by default", () => {
    expect(resolvePricePointsBaseUrl({})).toBe(
      "https://semihcihan.github.io/storeconfig/price-points"
    );
  });

  it("derives the price point endpoint from a configured GitHub repo", () => {
    expect(
      resolvePricePointsBaseUrl({
        STORECONFIG_PRICE_POINTS_REPO: "example/mobile-storeconfig",
      })
    ).toBe("https://example.github.io/mobile-storeconfig/price-points");
  });

  it("supports user or organization Pages repositories", () => {
    expect(
      resolvePricePointsBaseUrl({
        STORECONFIG_PRICE_POINTS_REPO: "example/example.github.io",
      })
    ).toBe("https://example.github.io/price-points");
  });

  it("prefers an explicit price point base URL over the repo-derived URL", () => {
    expect(
      resolvePricePointsBaseUrl({
        STORECONFIG_PRICE_POINTS_REPO: "example/mobile-storeconfig",
        STORECONFIG_PRICE_POINTS_BASE_URL:
          "https://cdn.example.com/storeconfig/price-points",
      })
    ).toBe("https://cdn.example.com/storeconfig/price-points");
  });

  it("rejects malformed configured GitHub repos", () => {
    expect(() =>
      resolvePricePointsBaseUrl({
        STORECONFIG_PRICE_POINTS_REPO: "example/mobile-storeconfig/extra",
      })
    ).toThrow("STORECONFIG_PRICE_POINTS_REPO must be in OWNER/REPO form");
  });

  it("fetches and caches a resource snapshot on cache miss", async () => {
    await expect(cache.getTerritoryPricePoints("app", "USA")).resolves.toEqual({
      territory: "USA",
      resourceType: "app",
      pricePoints: [
        { priceIndex: "2", customerPrice: "1.99" },
        { priceIndex: "1", customerPrice: "0.99" },
      ],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/price-points/app.json"
    );

    const cacheFile = JSON.parse(
      fs.readFileSync(path.join(tempDir, "app.json"), "utf8")
    );
    expect(cacheFile.data).toHaveLength(1);
    expect(cacheFile.data[0].territory).toBe("USA");
  });

  it("uses cached territory price points without refetching", async () => {
    const cached = {
      updatedAt: new Date().toISOString(),
      data: [
        {
          territory: "USA",
          resourceType: "app" as const,
          pricePoints: [{ priceIndex: "1", customerPrice: "0.99" }],
        },
      ],
    };
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(path.join(tempDir, "app.json"), JSON.stringify(cached));

    await expect(cache.getTerritoryPricePoints("app", "USA")).resolves.toEqual(
      cached.data[0]
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refreshes a stale cached resource snapshot", async () => {
    const staleCached = {
      updatedAt: "2026-01-01T00:00:00.000Z",
      data: [
        {
          territory: "USA",
          resourceType: "app" as const,
          pricePoints: [{ priceIndex: "1", customerPrice: "0.99" }],
        },
      ],
    };
    const refreshed = {
      updatedAt: "2026-01-09T00:00:00.000Z",
      data: [
        {
          territory: "USA",
          resourceType: "app" as const,
          pricePoints: [{ priceIndex: "2", customerPrice: "1.99" }],
        },
      ],
    };

    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(
      path.join(tempDir, "app.json"),
      JSON.stringify(staleCached)
    );
    fetchMock = createFetchMock(refreshed);
    cache = new PricePointCache(
      tempDir,
      7 * 24 * 60 * 60 * 1000,
      () => new Date("2026-01-09T00:00:00.000Z"),
      remoteBaseUrl,
      fetchMock
    );

    await expect(cache.getTerritoryPricePoints("app", "USA")).resolves.toEqual(
      refreshed.data[0]
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/price-points/app.json"
    );
    const cacheFile = JSON.parse(
      fs.readFileSync(path.join(tempDir, "app.json"), "utf8")
    );
    expect(cacheFile.data).toEqual(refreshed.data);
  });

  it("returns price point prompt options sorted by price", async () => {
    const pricePoints = await cache.getPricePointsForSelectedItem(
      { type: "app", id: "app-123", name: "App" },
      "app-123",
      "USA"
    );

    expect(pricePoints).toEqual([
      { id: "0.99", price: "0.99" },
      { id: "1.99", price: "1.99" },
    ]);
  });

  it("returns null when the shared snapshot does not include the territory", async () => {
    fetchMock = createFetchMock({
      updatedAt: new Date().toISOString(),
      data: [
        {
          territory: "CAN",
          resourceType: "iap" as const,
          pricePoints: [{ priceIndex: "1", customerPrice: "0.99" }],
        },
      ],
    });
    cache = new PricePointCache(
      tempDir,
      7 * 24 * 60 * 60 * 1000,
      () => new Date(),
      remoteBaseUrl,
      fetchMock
    );

    await expect(
      cache.getTerritoryPricePoints("iap", "USA")
    ).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/price-points/iap.json"
    );
  });

  it("uses stale cached territory price points when remote refresh fails", async () => {
    const staleCached = {
      updatedAt: "2026-01-01T00:00:00.000Z",
      data: [
        {
          territory: "USA",
          resourceType: "subscription" as const,
          pricePoints: [{ priceIndex: "1", customerPrice: "0.99" }],
        },
      ],
    };
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(
      path.join(tempDir, "subscription.json"),
      JSON.stringify(staleCached)
    );
    fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({}),
    });
    cache = new PricePointCache(
      tempDir,
      7 * 24 * 60 * 60 * 1000,
      () => new Date("2026-01-09T00:00:00.000Z"),
      remoteBaseUrl,
      fetchMock
    );

    await expect(
      cache.getTerritoryPricePoints("subscription", "USA")
    ).resolves.toEqual(staleCached.data[0]);
  });

  it("throws when remote refresh fails and there is no cached territory", async () => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({}),
    });
    cache = new PricePointCache(
      tempDir,
      7 * 24 * 60 * 60 * 1000,
      () => new Date(),
      remoteBaseUrl,
      fetchMock
    );

    await expect(cache.getTerritoryPricePoints("app", "USA")).rejects.toThrow(
      "Failed to refresh app price point cache"
    );
  });
});
