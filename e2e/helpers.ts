jest.mock("inquirer");

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execFile } from "child_process";
import { promisify } from "util";
import { parse } from "yaml";
import inquirer from "inquirer";
import { keyService } from "../src/services/key-service";
import fetchCommand from "../src/commands/fetch";
import applyCommand from "../src/commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";

export const mockInquirer = jest.mocked(inquirer);

export interface E2EEnvironment {
  API_BASE_URL: string;
  API_KEY: string;
  APP_ID: string;
}

export interface E2ETestContext {
  tempDir: string;
  tempConfigFile: string;
  originalKey: string | null;
  originalState: AppStoreModel;
  appId: string;
}

export function validateE2EEnvironment(): E2EEnvironment {
  const API_BASE_URL = process.env.API_BASE_URL;
  const API_KEY = process.env.API_KEY;
  const APP_ID = process.env.APP_ID;

  if (!API_BASE_URL || !API_KEY || !APP_ID) {
    throw new Error(
      "Missing required environment variables. Please create a .env.e2e file with API_BASE_URL, API_KEY, and APP_ID. See .env.e2e.example for reference."
    );
  }

  return { API_BASE_URL, API_KEY, APP_ID };
}

export function generateRandomId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

const execFileAsync = promisify(execFile);

export function getLastMockCallArg<T = unknown>(
  mockFn: jest.Mock,
  argIndex: number = 0
): T | undefined {
  const calls = mockFn.mock.calls;
  if (calls.length === 0) return undefined;
  return calls[calls.length - 1]?.[argIndex] as T | undefined;
}

type ServerlessTableConfig = {
  tableNameTemplate: string;
  gsi1: string;
  gsi2: string;
  gsi3: string;
};

function loadServerlessTableConfig(): ServerlessTableConfig {
  const serverlessConfigPath = path.resolve(
    __dirname,
    "../../serverless/serverless.yml"
  );
  const contents = fs.readFileSync(serverlessConfigPath, "utf-8");
  const parsed = parse(contents, { logLevel: "silent" }) as {
    custom?: {
      storeConfigTableName?: string;
      storeConfigTableGSI1?: string;
      storeConfigTableGSI2?: string;
      storeConfigTableGSI3?: string;
    };
  };
  const tableNameTemplate = parsed.custom?.storeConfigTableName ?? "";
  const gsi1 = parsed.custom?.storeConfigTableGSI1 ?? "";
  const gsi2 = parsed.custom?.storeConfigTableGSI2 ?? "";
  const gsi3 = parsed.custom?.storeConfigTableGSI3 ?? "";
  if (!tableNameTemplate || !gsi1 || !gsi2 || !gsi3) {
    throw new Error("Failed to read table config from serverless.yml");
  }
  return { tableNameTemplate, gsi1, gsi2, gsi3 };
}

function resolveStageFromApiBaseUrl(apiBaseUrl: string): "test" | "dev" {
  return apiBaseUrl.includes("test") ? "test" : "dev";
}

export function setupLoggerStdSpy(): jest.SpyInstance {
  return jest.spyOn(logger, "std").mockImplementation(() => {});
}

export async function backdateJobViaAws(options: {
  env: E2EEnvironment;
  jobId: string;
  status: "pending" | "processing" | "yielded";
  updatedAt: string;
  createIfMissing?: boolean;
}) {
  const envFile = process.env.ENV_FILE;
  if (!envFile) {
    throw new Error("ENV_FILE must be set for backdateJobViaAws");
  }
  const awsProfile = process.env.AWS_PROFILE;
  if (!awsProfile) {
    throw new Error("AWS_PROFILE must be set for backdateJobViaAws");
  }
  const serverlessConfig = loadServerlessTableConfig();
  const stage = resolveStageFromApiBaseUrl(options.env.API_BASE_URL);
  const tableName = serverlessConfig.tableNameTemplate.replace(
    "${sls:stage}",
    stage
  );
  const { gsi1, gsi2, gsi3 } = serverlessConfig;
  const serverlessRoot = path.resolve(__dirname, "../../serverless");
  const scriptPath = path.join(serverlessRoot, "src/scripts/backdate-job.ts");
  const args = [
    "-r",
    "ts-node/register",
    scriptPath,
    "--api-key",
    options.env.API_KEY,
    "--job-id",
    options.jobId,
    "--status",
    options.status,
    "--updated-at",
    options.updatedAt,
  ];
  if (options.createIfMissing) {
    args.push("--create-if-missing");
  }
  await execFileAsync(process.execPath, args, {
    cwd: serverlessRoot,
    env: {
      ...process.env,
      AWS_PROFILE: awsProfile,
      ENV_FILE: envFile,
      STORE_CONFIG_TABLE_NAME: process.env.STORE_CONFIG_TABLE_NAME || tableName,
      STORE_CONFIG_TABLE_GSI1: process.env.STORE_CONFIG_TABLE_GSI1 || gsi1,
      STORE_CONFIG_TABLE_GSI2: process.env.STORE_CONFIG_TABLE_GSI2 || gsi2,
      STORE_CONFIG_TABLE_GSI3: process.env.STORE_CONFIG_TABLE_GSI3 || gsi3,
    },
  });
}

export async function setupE2ETest(
  env: E2EEnvironment
): Promise<E2ETestContext> {
  const originalKey = keyService.loadKey();
  keyService.saveKey(env.API_KEY);
  process.env.API_BASE_URL = env.API_BASE_URL;

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-e2e-"));
  const tempConfigFile = path.join(tempDir, "storeconfig.json");

  await fetchCommand.handler!({
    id: env.APP_ID,
    file: tempConfigFile,
  } as any);

  const originalState = JSON.parse(fs.readFileSync(tempConfigFile, "utf-8"));

  return {
    tempDir,
    tempConfigFile,
    originalKey,
    originalState,
    appId: env.APP_ID,
  };
}

export async function cleanupE2ETest(context: E2ETestContext): Promise<void> {
  try {
    const { cleanupTestIAPResources, cleanupTestSubscriptionResources } =
      await import("../../api/src/test-utils/cleanup-helper");

    await cleanupTestIAPResources(context.appId);
    await cleanupTestSubscriptionResources(context.appId);
  } catch (error) {
    console.error("Failed to cleanup test resources:", error);
  }

  try {
    if (
      context.originalState &&
      context.tempConfigFile &&
      fs.existsSync(context.tempConfigFile)
    ) {
      fs.writeFileSync(
        context.tempConfigFile,
        JSON.stringify(context.originalState, null, 2)
      );

      await applyCommand.handler!({
        file: context.tempConfigFile,
        preview: false,
      } as any);
    }
  } catch (error) {
    console.error(`Failed to restore original config in cleanup:`, error);
  }

  try {
    if (context.originalKey) {
      keyService.saveKey(context.originalKey);
    } else {
      keyService.deleteKey();
    }
  } catch (error) {
    console.error("Failed to restore original key:", error);
  }

  if (context.tempDir && fs.existsSync(context.tempDir)) {
    fs.rmSync(context.tempDir, { recursive: true, force: true });
  }
}

export {
  cleanupTestIAPResources,
  cleanupTestSubscriptionResources,
  generateTestIdentifier,
  generateConstantLengthTestIdentifier,
  waitForApiProcessing,
} from "../../api/src/test-utils/cleanup-helper";
