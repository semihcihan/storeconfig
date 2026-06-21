jest.mock("inquirer");

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import inquirer from "inquirer";
import { appleCredentialStore } from "../src/services/apple-credential-store";
import fetchCommand from "../src/commands/fetch";
import applyCommand from "../src/commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";

export const mockInquirer = jest.mocked(inquirer);

export interface E2EEnvironment {
  APP_ID: string;
}

export interface E2ETestContext {
  tempDir: string;
  tempConfigFile: string;
  originalState: AppStoreModel;
  appId: string;
}

export function validateE2EEnvironment(): E2EEnvironment {
  const APP_ID = process.env.APP_ID;

  if (!APP_ID) {
    throw new Error(
      "Missing required environment variable APP_ID. Please create a .env.e2e file with APP_ID."
    );
  }

  if (!appleCredentialStore.hasCredentials()) {
    throw new Error(
      "Missing local Apple credentials. Run `storeconfig apple --key-path /path/to/AuthKey.p8` before running E2E tests."
    );
  }

  return { APP_ID };
}

export function generateRandomId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function getLastMockCallArg<T = unknown>(
  mockFn: jest.Mock,
  argIndex: number = 0
): T | undefined {
  const calls = mockFn.mock.calls;
  if (calls.length === 0) return undefined;
  return calls[calls.length - 1]?.[argIndex] as T | undefined;
}

export function setupLoggerStdSpy(): jest.SpyInstance {
  return jest.spyOn(logger, "std").mockImplementation(() => {});
}

export async function setupE2ETest(
  env: E2EEnvironment
): Promise<E2ETestContext> {
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
