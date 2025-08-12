import { jest } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { TerritoryData } from "./fetch-ppp";
import {
  checkCurrenciesFile,
  loadCurrencies,
  fetchUSDExchangeRates,
  updateExchangeRates,
  saveUpdatedCurrencies,
  ExchangeRateResponse,
} from "./update-exchange-rates";

// Mock fs module
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock path
jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;

// Mock process.cwd
const originalCwd = process.cwd;
const mockCwd = "/mock/workspace";

// Helper function to create mock exchange rate responses
function createMockExchangeRateResponse(
  rates: Record<string, number>
): ExchangeRateResponse {
  return {
    result: "success",
    provider: "mock-provider",
    documentation: "https://example.com/docs",
    terms_of_use: "https://example.com/terms",
    time_last_update_unix: 1234567890,
    time_last_update_utc: "2024-01-01T00:00:00Z",
    time_next_update_unix: 1234567890,
    time_next_update_utc: "2024-01-01T00:00:00Z",
    time_eol_unix: 1234567890,
    base_code: "USD",
    rates,
  };
}

describe("update-exchange-rates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => mockCwd);
    mockedPath.join.mockImplementation((...args) => args.join("/"));
  });

  afterEach(() => {
    process.cwd = originalCwd;
  });

  describe("checkCurrenciesFile", () => {
    it("should not throw when currencies.json exists", async () => {
      mockedFs.existsSync.mockReturnValue(true);

      await expect(checkCurrenciesFile()).resolves.not.toThrow();
      expect(mockedFs.existsSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json"
      );
    });

    it("should throw error when currencies.json does not exist", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      await expect(checkCurrenciesFile()).rejects.toThrow(
        "currencies.json file does not exist. Please run fetch-currencies first."
      );
    });
  });

  describe("loadCurrencies", () => {
    it("should load and parse currencies from file", async () => {
      const mockCurrencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD" },
        { id: "GBR", currency: "GBP", localCurrency: "GBP" },
      ];

      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockCurrencies));

      const result = await loadCurrencies();

      expect(result).toEqual(mockCurrencies);
      expect(mockedFs.readFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        "utf8"
      );
    });

    it("should handle invalid JSON gracefully", async () => {
      mockedFs.readFileSync.mockReturnValue("invalid json");

      await expect(loadCurrencies()).rejects.toThrow();
    });
  });

  describe("fetchUSDExchangeRates", () => {
    it("should fetch exchange rates successfully", async () => {
      const mockResponse = {
        status: 200,
        data: {
          result: "success",
          rates: {
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110.0,
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchUSDExchangeRates();

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://open.er-api.com/v6/latest/USD",
        {
          timeout: 5000,
          headers: {
            "User-Agent": "Developer-Tool/1.0",
            Accept: "application/json",
          },
        }
      );
    });

    it("should throw error on non-200 status", async () => {
      const mockResponse = { status: 500, data: null };
      mockedAxios.get.mockResolvedValue(mockResponse);

      await expect(fetchUSDExchangeRates()).rejects.toThrow(
        "Exchange Rate API returned status 500"
      );
    });

    it("should throw error on axios failure", async () => {
      const error = new Error("Network error");
      mockedAxios.get.mockRejectedValue(error);

      await expect(fetchUSDExchangeRates()).rejects.toThrow("Network error");
    });
  });

  describe("updateExchangeRates", () => {
    it("should update currencies with valid exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD" },
        { id: "GBR", currency: "GBP", localCurrency: "GBP" },
        { id: "EUR", currency: "EUR", localCurrency: "EUR" },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        GBP: 0.73,
        EUR: 0.85,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBeUndefined(); // USD has no rate
      expect(result.updatedCurrencies[1].usdRate).toBe(0.73);
      expect(result.updatedCurrencies[2].usdRate).toBe(0.85);
      expect(result.nullValueExchangeRates).toEqual(["USA"]);
    });

    it("should handle missing exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD" },
        { id: "XXX", currency: "XXX", localCurrency: "XXX" },
      ];

      const exchangeRates = createMockExchangeRateResponse({});

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBeUndefined();
      expect(result.updatedCurrencies[1].usdRate).toBeUndefined();
      expect(result.nullValueExchangeRates).toEqual(["USA", "XXX"]);
    });

    it("should handle zero exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD" },
        { id: "ZERO", currency: "ZERO", localCurrency: "ZERO" },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        ZERO: 0,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBeUndefined();
      expect(result.updatedCurrencies[1].usdRate).toBeUndefined();
      expect(result.nullValueExchangeRates).toEqual(["USA", "ZERO"]);
    });

    it("should handle negative exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD" },
        { id: "NEG", currency: "NEG", localCurrency: "NEG" },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        NEG: -1.5,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBeUndefined();
      expect(result.updatedCurrencies[1].usdRate).toBeUndefined();
      expect(result.nullValueExchangeRates).toEqual(["USA", "NEG"]);
    });
  });

  describe("saveUpdatedCurrencies", () => {
    it("should save currencies to file", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD", usdRate: 1 },
        { id: "GBR", currency: "GBP", localCurrency: "GBP", usdRate: 0.73 },
      ];

      await saveUpdatedCurrencies(currencies);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        JSON.stringify(currencies, null, 2),
        "utf8"
      );
    });
  });

  describe("integration scenarios", () => {
    it("should handle currencies without localCurrency", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD" }, // No localCurrency
        { id: "GBR", currency: "GBP", localCurrency: "GBP" },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        GBP: 0.73,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBeUndefined();
      expect(result.updatedCurrencies[1].usdRate).toBe(0.73);
      expect(result.nullValueExchangeRates).toEqual([]); // No territories added because first has no localCurrency
    });

    it("should preserve existing data in currencies", async () => {
      const currencies: TerritoryData[] = [
        {
          id: "USA",
          currency: "USD",
          localCurrency: "USD",
          value: 1.0,
        },
      ];

      const exchangeRates = createMockExchangeRateResponse({});

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].value).toBe(1.0);
      expect(result.updatedCurrencies[0].currency).toBe("USD");
      expect(result.updatedCurrencies[0].id).toBe("USA");
    });
  });
});
