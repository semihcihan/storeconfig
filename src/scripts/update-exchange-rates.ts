import { logger } from "../utils/logger";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

interface TerritoryData {
  id: string;
  currency: string;
  value?: number | null;
  localCurrency?: string;
  usdRate?: number;
}

interface ExchangeRateResponse {
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

async function checkCurrenciesFile(): Promise<void> {
  const currenciesPath = path.join(process.cwd(), "refData", "currencies.json");

  if (!fs.existsSync(currenciesPath)) {
    throw new Error(
      "currencies.json file does not exist. Please run fetch-currencies first."
    );
  }
}

async function loadCurrencies(): Promise<TerritoryData[]> {
  const currenciesPath = path.join(process.cwd(), "refData", "currencies.json");
  const content = fs.readFileSync(currenciesPath, "utf8");
  return JSON.parse(content);
}

async function fetchUSDExchangeRates(): Promise<ExchangeRateResponse> {
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

async function updateExchangeRates(
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
      // Get USD exchange rate for the local currency
      const usdRate = exchangeRates.rates[currency.localCurrency];
      if (usdRate !== undefined) {
        currency.usdRate = usdRate;
      } else {
        nullValueExchangeRates.push(currency.id);
      }
    }
  }

  return { updatedCurrencies, nullValueExchangeRates };
}

async function saveUpdatedCurrencies(
  currencies: TerritoryData[]
): Promise<void> {
  const outputPath = path.join(process.cwd(), "refData", "currencies.json");

  logger.debug(`Saving updated currencies to ${outputPath}`);
  const jsonContent = JSON.stringify(currencies, null, 2);
  fs.writeFileSync(outputPath, jsonContent, "utf8");
  logger.debug(`Updated currencies saved to ${outputPath}`);
}

async function main(): Promise<void> {
  logger.debug("Starting exchange rate update...");

  await checkCurrenciesFile();

  const currencies = await loadCurrencies();
  const exchangeRates = await fetchUSDExchangeRates();

  const { updatedCurrencies, nullValueExchangeRates } =
    await updateExchangeRates(currencies, exchangeRates);

  await saveUpdatedCurrencies(updatedCurrencies);

  if (nullValueExchangeRates.length > 0) {
    logger.warn(
      `Territories with missing USD exchange rates: ${nullValueExchangeRates.join(
        ", "
      )}`
    );
  }

  logger.debug("Exchange rate update completed successfully");
}

if (require.main === module) {
  main();
}
