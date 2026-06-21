import { api } from "../services/api";
import { ContextualError, logger } from "@semihcihan/shared";
import * as fs from "fs";
import * as path from "path";

export interface TerritoryCurrency {
  id: string;
  currency: string;
}

export async function fetchAllTerritories(): Promise<TerritoryCurrency[]> {
  const territories: TerritoryCurrency[] = [];
  const limit = 200;

  logger.debug("Fetching territories...");

  const response = await api.GET("/v1/territories", {
    params: {
      query: {
        limit,
        "fields[territories]": ["currency"],
      },
    },
  });

  if (response.error) {
    throw new ContextualError("fetch all territories failed", {
      appleError: response.error,
    });
  }

  const data = response.data;
  if (!data.data || data.data.length === 0) {
    throw new Error("No territories found");
  }

  const pageTerritories = data.data.map((territory: any) => ({
    id: territory.id,
    currency: territory.attributes.currency,
  }));

  territories.push(...pageTerritories);

  // Check if we need to fetch more pages
  let nextUrl = data.links?.next;
  if (nextUrl) {
    throw new Error("Pagination not implemented");
  }
  logger.debug(`Successfully fetched ${territories.length} territories`);
  return territories;
}

export async function saveTerritoriesToFile(
  territories: TerritoryCurrency[]
): Promise<void> {
  const outputPath = path.join(process.cwd(), "src", "data", "currencies.json");
  logger.debug(`Saving territories to ${outputPath}`);

  const jsonContent = JSON.stringify(territories, null, 2);
  fs.writeFileSync(outputPath, jsonContent, "utf8");
  logger.debug(`Territories saved to ${outputPath}`);
}

async function main(): Promise<void> {
  try {
    logger.debug("Starting territories fetch...");
    const territories = await fetchAllTerritories();
    await saveTerritoriesToFile(territories);
    logger.debug("Territories fetch completed successfully");
  } catch (error) {
    logger.error("Territories fetch failed", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
