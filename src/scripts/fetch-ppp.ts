import { logger } from "../utils/logger";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

interface TerritoryData {
  id: string;
  currency: string;
  value?: number | null;
}

interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid: string;
  lastupdated: string;
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

async function checkCurrenciesFile(): Promise<void> {
  const currenciesPath = path.join(process.cwd(), "refData", "currencies.json");

  if (!fs.existsSync(currenciesPath)) {
    throw new Error("currencies.json file does not exist");
  }
}

async function loadCurrencies(): Promise<TerritoryData[]> {
  const currenciesPath = path.join(process.cwd(), "refData", "currencies.json");
  const content = fs.readFileSync(currenciesPath, "utf8");
  return JSON.parse(content);
}

const date = "2024";
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
  pppData: WorldBankData[]
): Promise<{
  updatedCurrencies: TerritoryData[];
  nullValueTerritories: string[];
}> {
  const updatedCurrencies = [...currencies];
  const nullValueTerritories: string[] = [];

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
      nullValueTerritories.push(currency.id);
    }
  }

  return { updatedCurrencies, nullValueTerritories };
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
  logger.debug("Starting PPP data fetch from World Bank API...");

  await checkCurrenciesFile();

  const currencies = await loadCurrencies();
  const pppData = await fetchPPPData();

  const { updatedCurrencies, nullValueTerritories } =
    await updateCurrenciesWithPPP(currencies, pppData);

  await saveUpdatedCurrencies(updatedCurrencies);

  if (nullValueTerritories.length > 0) {
    logger.warn(
      `Territories with null PPP values: ${nullValueTerritories.join(", ")}`
    );
  }

  logger.debug("PPP data fetch completed successfully");
}

if (require.main === module) {
  main();
}
