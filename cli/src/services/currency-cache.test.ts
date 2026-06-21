import fs from "fs";
import os from "os";
import path from "path";

jest.mock("@semihcihan/developer-tool/functions", () => ({
  loadBundledCurrencies: jest.fn(),
}));

import { loadBundledCurrencies } from "@semihcihan/developer-tool/functions";
import { CurrencyCache } from "./currency-cache";

const mockLoadBundledCurrencies = jest.mocked(loadBundledCurrencies);

describe("CurrencyCache", () => {
  let tempDir: string;
  let cachePath: string;
  let cache: CurrencyCache;

  const currencies = [
    {
      id: "USA",
      currency: "USD",
      value: 1,
      localCurrency: "USD",
      usdRate: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-currency-"));
    cachePath = path.join(tempDir, "currencies.json");
    cache = new CurrencyCache(cachePath);
    mockLoadBundledCurrencies.mockReturnValue(currencies);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("loads bundled currencies and saves them when cache is missing", async () => {
    await expect(cache.loadCurrencies()).resolves.toEqual(currencies);
    expect(mockLoadBundledCurrencies).toHaveBeenCalled();
    expect(JSON.parse(fs.readFileSync(cachePath, "utf8"))).toEqual(currencies);
  });

  it("loads currencies from cache when present", async () => {
    const cachedCurrencies = [
      {
        id: "GBR",
        currency: "GBP",
        value: 1,
        localCurrency: "GBP",
        usdRate: 0.8,
      },
    ];
    fs.writeFileSync(cachePath, JSON.stringify(cachedCurrencies));

    await expect(cache.loadCurrencies()).resolves.toEqual(cachedCurrencies);
    expect(mockLoadBundledCurrencies).not.toHaveBeenCalled();
  });

  it("refreshes currencies from bundled data when cache is stale", async () => {
    const cachedCurrencies = [
      {
        id: "GBR",
        currency: "GBP",
        value: 1,
        localCurrency: "GBP",
        usdRate: 0.8,
      },
    ];
    fs.writeFileSync(cachePath, JSON.stringify(cachedCurrencies));
    fs.utimesSync(
      cachePath,
      new Date("2026-01-01T00:00:00.000Z"),
      new Date("2026-01-01T00:00:00.000Z")
    );
    cache = new CurrencyCache(
      cachePath,
      7 * 24 * 60 * 60 * 1000,
      () => new Date("2026-01-09T00:00:00.000Z")
    );

    await expect(cache.loadCurrencies()).resolves.toEqual(currencies);
    expect(mockLoadBundledCurrencies).toHaveBeenCalled();
    expect(JSON.parse(fs.readFileSync(cachePath, "utf8"))).toEqual(currencies);
  });

  it("saves currencies with owner-only file permissions", () => {
    cache.saveCurrencies(currencies);

    const mode = fs.statSync(cachePath).mode & 0o777;
    expect(mode).toBe(0o600);
  });
});
