jest.mock("inquirer");

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import inquirer from "inquirer";
import { keyService } from "../src/services/key-service";
import fetchCommand from "../src/commands/fetch";
import applyCommand from "../src/commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";

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

export async function cleanupE2ETest(
  context: E2ETestContext
): Promise<void> {
  try {
    const {
      cleanupTestIAPResources,
      cleanupTestSubscriptionResources,
    } = await import("../../api/src/test-utils/cleanup-helper");
    
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
