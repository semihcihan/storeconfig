import { logger } from "../utils/logger";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

interface TerritoryData {
  id: string;
  currency: string;
  value?: number | null;
  localCurrency?: string;
}

interface WorldBankData {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

interface CurrencyMapping {
  [countryCode: string]: string;
}

async function checkCurrenciesFile(): Promise<void> {
  const currenciesPath = path.join(
    process.cwd(),
    "src",
    "data",
    "currencies.json"
  );

  if (!fs.existsSync(currenciesPath)) {
    throw new Error("currencies.json file does not exist");
  }
}

async function loadCurrencies(): Promise<TerritoryData[]> {
  const currenciesPath = path.join(
    process.cwd(),
    "src",
    "data",
    "currencies.json"
  );
  const content = fs.readFileSync(currenciesPath, "utf8");
  return JSON.parse(content);
}

async function loadCurrencyMapping(): Promise<CurrencyMapping> {
  const mappingPath = path.join(
    process.cwd(),
    "src",
    "data",
    "alpha3_to_currency.json"
  );
  const content = fs.readFileSync(mappingPath, "utf8");
  return JSON.parse(content);
}

const date = "2024";
/*
We should manually fallback to https://www.imf.org/external/datamapper/api/?meta&geoitems&indicators&datasets&values=PPPEX
PPP conversion factor, GDP (LCU per international $)
*/
async function fetchPPPData(): Promise<WorldBankData[]> {
  const apiEndpoint = `https://api.worldbank.org/v2/country/all/indicator/PA.NUS.PPP?date=${date}&format=json&per_page=300`;

  logger.debug(
    `Fetching PPP conversion factor data for ${date} from World Bank API...`
  );

  const response = await axios.get(apiEndpoint, {
    timeout: 5000,
    headers: {
      "User-Agent": "Developer-Tool/1.0",
      Accept: "application/json",
    },
  });

  if (response.status === 200 && response.data) {
    logger.debug("Successfully connected to World Bank API");

    const [metadata, data] = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from World Bank API");
    }

    logger.debug(
      `Successfully fetched PPP data for ${data.length} countries from World Bank API`
    );
    return data;
  } else {
    throw new Error(`World Bank API returned status ${response.status}`);
  }
}

async function updateCurrenciesWithPPP(
  currencies: TerritoryData[],
  pppData: WorldBankData[],
  currencyMapping: CurrencyMapping
): Promise<{
  updatedCurrencies: TerritoryData[];
  nullValueTerritories: string[];
  missingPPPTerritories: string[];
}> {
  const updatedCurrencies = [...currencies];
  const nullValueTerritories: string[] = [];
  const missingPPPTerritories: string[] = [];
  const missingLocalCurrency: string[] = [];

  logger.debug("Adding local currency information to territories...");

  for (const currency of updatedCurrencies) {
    const matchingPPP = pppData.find(
      (ppp) => ppp.countryiso3code === currency.id
    );

    if (matchingPPP) {
      currency.value = matchingPPP.value;

      if (matchingPPP.value === null) {
        nullValueTerritories.push(currency.id);
      }
    } else {
      currency.value = null;
      missingPPPTerritories.push(currency.id);
    }

    // Get local currency from ISO 4217 mapping
    const localCurrency = currencyMapping[currency.id];
    if (localCurrency) {
      currency.localCurrency = localCurrency;
    } else {
      missingLocalCurrency.push(currency.id);
    }
  }

  if (missingLocalCurrency.length > 0) {
    throw new Error(
      `Territories not found in ISO 4217 mapping: ${missingLocalCurrency.join(
        ", "
      )}. Please update alpha3_to_currency.json to include these territories.`
    );
  }

  return {
    updatedCurrencies,
    nullValueTerritories,
    missingPPPTerritories,
  };
}

async function saveUpdatedCurrencies(
  currencies: TerritoryData[]
): Promise<void> {
  const outputPath = path.join(process.cwd(), "src", "data", "currencies.json");

  logger.debug(`Saving updated currencies to ${outputPath}`);
  const jsonContent = JSON.stringify(currencies, null, 2);
  fs.writeFileSync(outputPath, jsonContent, "utf8");
  logger.debug(`Updated currencies saved to ${outputPath}`);
}

async function main(): Promise<void> {
  logger.debug("Starting PPP data fetch from World Bank API...");

  await checkCurrenciesFile();

  const currencies = await loadCurrencies();
  const currencyMapping = await loadCurrencyMapping();
  const pppData = await fetchPPPData();

  const { updatedCurrencies, nullValueTerritories, missingPPPTerritories } =
    await updateCurrenciesWithPPP(currencies, pppData, currencyMapping);

  await saveUpdatedCurrencies(updatedCurrencies);

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

  logger.debug("PPP data fetch completed successfully");
}

if (require.main === module) {
  main();
}
