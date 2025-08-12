import { jest } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { TerritoryData, WorldBankData } from "./fetch-ppp";
import {
  checkCurrenciesFile,
  loadCurrencies,
  loadCurrencyMapping,
  fetchPPPData,
  updateCurrenciesWithPPP,
  saveUpdatedCurrencies,
} from "./fetch-ppp";

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

// Helper function to create mock WorldBankData
function createMockWorldBankData(
  countryCode: string,
  value: number | null
): WorldBankData {
  return {
    indicator: {
      id: "PA.NUS.PPP",
      value: "PPP conversion factor, GDP (LCU per international $)",
    },
    country: {
      id: countryCode,
      value: countryCode,
    },
    countryiso3code: countryCode,
    date: "2024",
    value: value,
    unit: "LCU per international $",
    obs_status: "OK",
    decimal: 6,
  };
}

describe("fetch-ppp", () => {
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
        "currencies.json file does not exist"
      );
    });
  });

  describe("loadCurrencies", () => {
    it("should load and parse currencies from file", async () => {
      const mockCurrencies: TerritoryData[] = [
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
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

  describe("loadCurrencyMapping", () => {
    it("should load and parse currency mapping from file", async () => {
      const mockMapping = {
        USA: "USD",
        GBR: "GBP",
        EUR: "EUR",
      };

      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockMapping));

      const result = await loadCurrencyMapping();

      expect(result).toEqual(mockMapping);
      expect(mockedFs.readFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/alpha3_to_currency.json",
        "utf8"
      );
    });

    it("should handle invalid JSON gracefully", async () => {
      mockedFs.readFileSync.mockReturnValue("invalid json");

      await expect(loadCurrencyMapping()).rejects.toThrow();
    });
  });

  describe("fetchPPPData", () => {
    it("should fetch PPP data successfully", async () => {
      const mockResponse = {
        status: 200,
        data: [
          { metadata: "info" },
          [
            createMockWorldBankData("USA", 1.0),
            createMockWorldBankData("GBR", 0.68),
          ],
        ],
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchPPPData();

      expect(result).toEqual(mockResponse.data[1]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.worldbank.org/v2/country/all/indicator/PA.NUS.PPP?date=2024&format=json&per_page=300",
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

      await expect(fetchPPPData()).rejects.toThrow(
        "World Bank API returned status 500"
      );
    });

    it("should throw error on invalid response format", async () => {
      const mockResponse = {
        status: 200,
        data: ["metadata only"],
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      await expect(fetchPPPData()).rejects.toThrow(
        "Invalid response format from World Bank API"
      );
    });

    it("should throw error on non-array data", async () => {
      const mockResponse = {
        status: 200,
        data: [
          { metadata: "info" },
          { invalid: "format" }, // Second element is not an array
        ],
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await expect(fetchPPPData()).rejects.toThrow(
        "Invalid response format from World Bank API"
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
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
        { id: "XXX", currency: "XXX" },
      ];

      const pppData = [
        createMockWorldBankData("USA", 1.0),
        createMockWorldBankData("GBR", 0.68),
      ];

      const currencyMapping = {
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
        { id: "USA", currency: "USD" },
        { id: "NULL", currency: "NULL" },
      ];

      const pppData = [
        createMockWorldBankData("USA", 1.0),
        createMockWorldBankData("NULL", null),
      ];

      const currencyMapping = {
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
        { id: "USA", currency: "USD" },
        { id: "MISSING", currency: "MISSING" },
      ];

      const pppData = [createMockWorldBankData("USA", 1.0)];

      const currencyMapping = {
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
        { id: "USA", currency: "USD" },
        { id: "MISSING", currency: "MISSING" },
      ];

      const pppData = [createMockWorldBankData("USA", 1.0)];

      const currencyMapping = {
        USA: "USD",
        // MISSING is not in mapping
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
          value: 0.5, // Existing value
          localCurrency: "USD", // Existing localCurrency
        },
      ];

      const pppData = [createMockWorldBankData("USA", 1.0)];

      const currencyMapping = {
        USA: "USD",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].value).toBe(1.0); // Updated value
      expect(result[0].localCurrency).toBe("USD"); // Preserved localCurrency
      expect(result[0].currency).toBe("USD"); // Preserved currency
      expect(result[0].id).toBe("USA"); // Preserved id
    });
  });

  describe("saveUpdatedCurrencies", () => {
    it("should save currencies to file", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD", value: 1.0, localCurrency: "USD" },
        { id: "GBR", currency: "GBP", value: 0.68, localCurrency: "GBP" },
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
    it("should handle empty PPP data array", async () => {
      const currencies: TerritoryData[] = [
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
      ];

      const pppData: WorldBankData[] = [];

      const currencyMapping = {
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

    it("should handle currencies with existing usdRate", async () => {
      const currencies: TerritoryData[] = [
        {
          id: "USA",
          currency: "USD",
          usdRate: 1.0, // Existing usdRate
        },
      ];

      const pppData = [createMockWorldBankData("USA", 1.0)];

      const currencyMapping = {
        USA: "USD",
      };

      const result = await updateCurrenciesWithPPP(
        currencies,
        pppData,
        currencyMapping
      );

      expect(result[0].usdRate).toBe(1.0); // Preserved usdRate
      expect(result[0].value).toBe(1.0); // Updated value
      expect(result[0].localCurrency).toBe("USD"); // Added localCurrency
    });
  });
});
