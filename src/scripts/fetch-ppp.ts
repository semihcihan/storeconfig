import { logger } from "../utils/logger";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { TerritoryData } from "../services/pricing-strategy";

export interface PPPData {
  territory: string;
  value: number | null;
}

interface CurrencyMapping {
  [countryCode: string]: string;
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

export async function checkCurrenciesFile(): Promise<void> {
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

export async function loadCurrencies(): Promise<TerritoryData[]> {
  const currenciesPath = path.join(
    process.cwd(),
    "src",
    "data",
    "currencies.json"
  );
  const content = fs.readFileSync(currenciesPath, "utf8");
  return JSON.parse(content);
}

export async function loadCurrencyMapping(): Promise<CurrencyMapping> {
  const mappingPath = path.join(
    process.cwd(),
    "src",
    "data",
    "alpha3_to_currency.json"
  );
  const content = fs.readFileSync(mappingPath, "utf8");
  return JSON.parse(content);
}

const date = "2025";

export async function fetchPPPData(): Promise<PPPData[]> {
  const apiEndpoint = `https://www.imf.org/external/datamapper/api/v1/PPPEX?periods=${date}`;

  logger.debug(
    `Fetching PPP conversion factor data for ${date} from World Bank API...`
  );

  const response = await axios.get<IMFAPIResponse>(apiEndpoint, {
    timeout: 5000,
    headers: {
      "User-Agent": "Developer-Tool/1.0",
      Accept: "application/json",
    },
  });

  if (response.status === 200 && response.data) {
    logger.debug("Successfully connected to World Bank API");

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
      `Successfully fetched PPP data for ${pppData.length} countries from World Bank API`
    );
    return pppData;
  } else {
    throw new Error(`World Bank API returned status ${response.status}`);
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
      territory.value = matchingPPP.value;

      if (matchingPPP.value === null) {
        nullValueTerritories.push(territory.id);
      }
    } else {
      territory.value = null;
      missingPPPTerritories.push(territory.id);
    }

    // Get local currency from ISO 4217 mapping
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

export async function saveUpdatedCurrencies(
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

  const updatedCurrencies = await updateCurrenciesWithPPP(
    currencies,
    pppData,
    currencyMapping
  );

  await saveUpdatedCurrencies(updatedCurrencies);

  logger.debug("PPP data fetch completed successfully");
}

if (require.main === module) {
  main();
}
