import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import {
  refreshPricePointsForResourceType,
  type ResourceType,
  type TerritoryPricePoints,
} from "../services/price-point";

interface CachedPricePointsFile {
  updatedAt: string;
  data: TerritoryPricePoints[];
}

const RESOURCE_TYPES: ResourceType[] = ["app", "iap", "subscription"];
const RESOURCE_ID_ENV: Record<ResourceType, string> = {
  app: "FALLBACK_APP_APPLE_ID",
  iap: "FALLBACK_IAP_APPLE_ID",
  subscription: "FALLBACK_SUBSCRIPTION_APPLE_ID",
};

function loadEnvFiles(): void {
  const envFiles = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, "../../../.env"),
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile });
    }
  }
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function prepareAppleCredentials(): void {
  const privateKey = readRequiredEnv("ASC_PRIVATE_KEY");
  process.env.ASC_PRIVATE_KEY = privateKey.replace(/\\n/g, "\n");
  process.env.ASC_KEY_ID = readRequiredEnv("ASC_KEY_ID");
  process.env.ASC_ISSUER_ID = readRequiredEnv("ASC_ISSUER_ID");
}

function outputDirectory(): string {
  return (
    process.env.PRICE_POINTS_OUTPUT_DIR ||
    path.resolve(process.cwd(), "public", "price-points")
  );
}

function writeJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", {
    encoding: "utf8",
  });
}

async function refreshResourceType(
  resourceType: ResourceType
): Promise<CachedPricePointsFile> {
  const resourceId = readRequiredEnv(RESOURCE_ID_ENV[resourceType]);
  const data = await refreshPricePointsForResourceType(
    resourceType,
    resourceId
  );

  if (data.length === 0) {
    throw new Error(`Refusing to publish empty ${resourceType} price points`);
  }

  return {
    updatedAt: new Date().toISOString(),
    data,
  };
}

async function main(): Promise<void> {
  loadEnvFiles();
  prepareAppleCredentials();

  const outDir = outputDirectory();
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(path.dirname(outDir), ".nojekyll"), "");

  const startedAt = new Date().toISOString();
  const resources: Record<
    ResourceType,
    { updatedAt: string; territories: number }
  > = {
    app: { updatedAt: startedAt, territories: 0 },
    iap: { updatedAt: startedAt, territories: 0 },
    subscription: { updatedAt: startedAt, territories: 0 },
  };

  for (const resourceType of RESOURCE_TYPES) {
    const cacheFile = await refreshResourceType(resourceType);
    writeJson(path.join(outDir, `${resourceType}.json`), cacheFile);
    resources[resourceType] = {
      updatedAt: cacheFile.updatedAt,
      territories: cacheFile.data.length,
    };
  }

  writeJson(path.join(outDir, "index.json"), {
    updatedAt: new Date().toISOString(),
    resources,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
