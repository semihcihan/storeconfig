import { logger } from "@semihcihan/shared";
import axios from "axios";
import { TerritoryData } from "./pricing-strategy";

export interface PPPData {
  territory: string;
  value: number | null;
}

export interface CurrencyMapping {
  [countryCode: string]: string;
}

export interface ExchangeRateResponse {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: {
    [currencyCode: string]: number;
  };
}

interface PPEXValue {
  [date: string]: number;
}

interface PPPEXData {
  [territory: string]: PPEXValue;
}

interface IMFAPIResponse {
  values: {
    PPPEX: PPPEXData;
  };
}

const date = "2026";

export async function fetchPPPData(): Promise<PPPData[]> {
  const apiEndpoint = `https://www.imf.org/external/datamapper/api/v1/PPPEX?periods=${date}`;

  logger.debug(
    `Fetching PPP conversion factor data for ${date} from IMF API...`
  );

  const response = await axios.get<IMFAPIResponse>(apiEndpoint, {
    timeout: 5000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36",
      Accept: "application/json",
    },
  });

  if (response.status === 200 && response.data) {
    logger.debug("Successfully connected to IMF API");

    const {
      values: { PPPEX },
    } = response.data;

    const pppData: PPPData[] = Object.entries(PPPEX).map(
      ([territory, dateValues]: [string, PPEXValue]) => ({
        territory,
        value: dateValues[date] || null,
      })
    );

    logger.debug(
      `Successfully fetched PPP data for ${pppData.length} countries from IMF API`
    );
    return pppData;
  } else {
    throw new Error(`IMF API returned status ${response.status}`);
  }
}

export async function updateCurrenciesWithPPP(
  territoryData: TerritoryData[],
  pppData: PPPData[],
  currencyMapping: CurrencyMapping
): Promise<TerritoryData[]> {
  const updatedTerritoryData = [...territoryData];
  const nullValueTerritories: string[] = [];
  const missingPPPTerritories: string[] = [];
  const missingLocalCurrency: string[] = [];

  logger.debug("Adding local currency information to territories...");

  for (const territory of updatedTerritoryData) {
    const matchingPPP = pppData.find((ppp) => ppp.territory === territory.id);

    if (matchingPPP) {
      if (territory.id === "YEM") {
        matchingPPP.value = null;
      }
      territory.value = matchingPPP.value;

      if (matchingPPP.value === null) {
        nullValueTerritories.push(territory.id);
      }
    } else {
      territory.value = null;
      missingPPPTerritories.push(territory.id);
    }

    const localCurrency = currencyMapping[territory.id];
    if (localCurrency) {
      territory.localCurrency = localCurrency;
    } else {
      missingLocalCurrency.push(territory.id);
    }
  }

  if (missingLocalCurrency.length > 0) {
    throw new Error(
      `Territories not found in ISO 4217 mapping: ${missingLocalCurrency.join(
        ", "
      )}. Please update alpha3_to_currency.json to include these territories.`
    );
  }

  if (nullValueTerritories.length > 0) {
    logger.warn(
      `Territories with null PPP values: ${nullValueTerritories.join(", ")}`
    );
  }

  if (missingPPPTerritories.length > 0) {
    logger.warn(
      `Territories missing PPP data: ${missingPPPTerritories.join(", ")}`
    );
  }

  return updatedTerritoryData;
}

export async function fetchUSDExchangeRates(): Promise<ExchangeRateResponse> {
  const apiEndpoint = "https://open.er-api.com/v6/latest/USD";

  logger.debug("Fetching USD exchange rates from Exchange Rate API...");

  const response = await axios.get(apiEndpoint, {
    timeout: 5000,
    headers: {
      "User-Agent": "Developer-Tool/1.0",
      Accept: "application/json",
    },
  });

  if (response.status === 200 && response.data) {
    logger.debug(
      `Successfully fetched exchange rates for ${
        Object.keys(response.data.rates).length
      } currencies`
    );
    return response.data;
  } else {
    throw new Error(`Exchange Rate API returned status ${response.status}`);
  }
}

export async function updateExchangeRates(
  currencies: TerritoryData[],
  exchangeRates: ExchangeRateResponse
): Promise<{
  updatedCurrencies: TerritoryData[];
  nullValueExchangeRates: string[];
}> {
  const updatedCurrencies = [...currencies];
  const nullValueExchangeRates: string[] = [];

  logger.debug("Updating USD exchange rates for territories...");

  for (const currency of updatedCurrencies) {
    if (currency.localCurrency) {
      const usdRate = exchangeRates.rates[currency.localCurrency];
      if (usdRate !== undefined && usdRate > 0) {
        currency.usdRate = usdRate;
      } else {
        nullValueExchangeRates.push(currency.id);
      }
    }
  }

  return { updatedCurrencies, nullValueExchangeRates };
}

export interface FetchPPPDependencies {
  loadCurrencies: () => Promise<TerritoryData[]>;
  loadCurrencyMapping: () => Promise<CurrencyMapping>;
  saveCurrencies: (currencies: TerritoryData[]) => Promise<void>;
}

export async function fetchPPPWithDependencies(
  dependencies: FetchPPPDependencies
): Promise<void> {
  logger.debug("Starting PPP data fetch from IMF API...");

  const currencies = await dependencies.loadCurrencies();
  const currencyMapping = await dependencies.loadCurrencyMapping();
  const pppData = await fetchPPPData();

  const updatedCurrencies = await updateCurrenciesWithPPP(
    currencies,
    pppData,
    currencyMapping
  );

  await dependencies.saveCurrencies(updatedCurrencies);

  logger.debug("PPP data fetch completed successfully");
}

export interface UpdateExchangeRatesDependencies {
  loadCurrencies: () => Promise<TerritoryData[]>;
  saveCurrencies: (currencies: TerritoryData[]) => Promise<void>;
}

export async function updateExchangeRatesWithDependencies(
  dependencies: UpdateExchangeRatesDependencies
): Promise<void> {
  logger.debug("Starting exchange rate update...");

  const currencies = await dependencies.loadCurrencies();
  const exchangeRates = await fetchUSDExchangeRates();

  const { updatedCurrencies, nullValueExchangeRates } =
    await updateExchangeRates(currencies, exchangeRates);

  await dependencies.saveCurrencies(updatedCurrencies);

  if (nullValueExchangeRates.length > 0) {
    throw new Error(
      `Territories with missing USD exchange rates: ${nullValueExchangeRates.join(
        ", "
      )}`
    );
  }

  logger.debug("Exchange rate update completed successfully");
}
