import { jest } from "@jest/globals";
import axios from "axios";
import { TerritoryData } from "./pricing-strategy";
import {
  PPPData,
  CurrencyMapping,
  ExchangeRateResponse,
  fetchPPPData,
  updateCurrenciesWithPPP,
  fetchUSDExchangeRates,
  updateExchangeRates,
} from "./currency-service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

function createMockPPPData(countryCode: string, value: number | null): PPPData {
  return {
    territory: countryCode,
    value: value,
  };
}

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

describe("currency-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchPPPData", () => {
    it("should fetch PPP data successfully", async () => {
      const mockResponse = {
        status: 200,
        data: {
          values: {
            PPPEX: {
              USA: { "2026": 1.0 },
              GBR: { "2026": 0.68 },
            },
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchPPPData();

      expect(result).toEqual([
        { territory: "USA", value: 1.0 },
        { territory: "GBR", value: 0.68 },
      ]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://www.imf.org/external/datamapper/api/v1/PPPEX?periods=2026",
        {
          timeout: 5000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36",
            Accept: "application/json",
          },
        }
      );
    });

    it("should handle missing date values", async () => {
      const mockResponse = {
        status: 200,
        data: {
          values: {
            PPPEX: {
              USA: { "2023": 1.0 },
              GBR: { "2026": 0.68 },
            },
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchPPPData();

      expect(result).toEqual([
        { territory: "USA", value: null },
        { territory: "GBR", value: 0.68 },
      ]);
    });

    it("should throw error on non-200 status", async () => {
      const mockResponse = { status: 500, data: null };
      mockedAxios.get.mockResolvedValue(mockResponse);

      await expect(fetchPPPData()).rejects.toThrow(
        "IMF API returned status 500"
      );
    });

    it("should throw error on axios failure", async () => {
      const error = new Error("Network error");
      mockedAxios.get.mockRejectedValue(error);

      await expect(fetchPPPData()).rejects.toThrow("Network error");
    });
  });

  describe("updateCurrenciesWithPPP", () => {
    it("should update currencies with PPP data and local currency mapping", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "GBR", currency: "GBP", usdRate: 1 },
        { id: "XXX", currency: "XXX", usdRate: 1 },
      ];

      const pppData = [
        createMockPPPData("USA", 1.0),
        createMockPPPData("GBR", 0.68),
      ];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
        GBR: "GBP",
        XXX: "XXX",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBe(1.0);
      expect(result[0].localCurrency).toBe("USD");
      expect(result[1].value).toBe(0.68);
      expect(result[1].localCurrency).toBe("GBP");
      expect(result[2].value).toBeNull();
      expect(result[2].localCurrency).toBe("XXX");
    });

    it("should handle null PPP values", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "NULL", currency: "NULL", usdRate: 1 },
      ];

      const pppData = [
        createMockPPPData("USA", 1.0),
        createMockPPPData("NULL", null),
      ];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
        NULL: "NULL",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBe(1.0);
      expect(result[1].value).toBeNull();
    });

    it("should handle missing PPP data", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "MISSING", currency: "MISSING", usdRate: 1 },
      ];

      const pppData = [createMockPPPData("USA", 1.0)];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
        MISSING: "MISSING",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBe(1.0);
      expect(result[1].value).toBeNull();
    });

    it("should throw error when territory is missing from currency mapping", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "MISSING", currency: "MISSING", usdRate: 1 },
      ];

      const pppData = [createMockPPPData("USA", 1.0)];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
      };

      await expect(
        updateCurrenciesWithPPP(currencies, pppData, currencyMapping)
      ).rejects.toThrow(
        "Territories not found in ISO 4217 mapping: MISSING. Please update alpha3_to_currency.json to include these territories."
      );
    });

    it("should preserve existing data in currencies", async () => {
      const currencies: TerritoryData[] = [
        {
          id: "USA",
          currency: "USD",
          value: 0.5,
          localCurrency: "USD",
          usdRate: 1,
        },
      ];

      const pppData = [createMockPPPData("USA", 1.0)];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBe(1.0);
      expect(result[0].localCurrency).toBe("USD");
      expect(result[0].currency).toBe("USD");
      expect(result[0].id).toBe("USA");
    });

    it("should handle YEM special case", async () => {
      const currencies: TerritoryData[] = [
        { id: "YEM", currency: "YER", usdRate: 1 },
      ];

      const pppData = [createMockPPPData("YEM", 100.0)];

      const currencyMapping: CurrencyMapping = {
        YEM: "YER",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBeNull();
    });

    it("should handle empty PPP data array", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "GBR", currency: "GBP", usdRate: 1 },
      ];

      const pppData: PPPData[] = [];

      const currencyMapping: CurrencyMapping = {
        USA: "USD",
        GBR: "GBP",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBeNull();
      expect(result[1].value).toBeNull();
      expect(result[0].localCurrency).toBe("USD");
      expect(result[1].localCurrency).toBe("GBP");
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
        { id: "USA", currency: "USD", localCurrency: "USD", usdRate: 1 },
        { id: "GBR", currency: "GBP", localCurrency: "GBP", usdRate: 1 },
        { id: "EUR", currency: "EUR", localCurrency: "EUR", usdRate: 1 },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        GBP: 0.73,
        EUR: 0.85,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBe(1);
      expect(result.updatedCurrencies[1].usdRate).toBe(0.73);
      expect(result.updatedCurrencies[2].usdRate).toBe(0.85);
      expect(result.nullValueExchangeRates).toEqual(["USA"]);
    });

    it("should handle zero exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD", usdRate: 1 },
        { id: "ZERO", currency: "ZERO", localCurrency: "ZERO", usdRate: 1 },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        ZERO: 0,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBe(1);
      expect(result.updatedCurrencies[1].usdRate).toBe(1);
      expect(result.nullValueExchangeRates).toEqual(["USA", "ZERO"]);
    });

    it("should handle negative exchange rates", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", localCurrency: "USD", usdRate: 1 },
        { id: "NEG", currency: "NEG", localCurrency: "NEG", usdRate: 1 },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        NEG: -1.5,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBe(1);
      expect(result.updatedCurrencies[1].usdRate).toBe(1);
      expect(result.nullValueExchangeRates).toEqual(["USA", "NEG"]);
    });

    it("should handle currencies without localCurrency", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", usdRate: 1 },
        { id: "GBR", currency: "GBP", localCurrency: "GBP", usdRate: 1 },
      ];

      const exchangeRates = createMockExchangeRateResponse({
        GBP: 0.73,
      });

      const result = await updateExchangeRates(currencies, exchangeRates);

      expect(result.updatedCurrencies[0].usdRate).toBe(1);
      expect(result.updatedCurrencies[1].usdRate).toBe(0.73);
      expect(result.nullValueExchangeRates).toEqual([]);
    });

    it("should preserve existing data in currencies", async () => {
      const currencies: TerritoryData[] = [
        {
          id: "USA",
          currency: "USD",
          localCurrency: "USD",
          value: 1.0,
          usdRate: 1,
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
