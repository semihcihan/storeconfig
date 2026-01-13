import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { keyService } from "./services/key-service";
import fetchCommand from "./commands/fetch";
import applyCommand from "./commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";

const API_BASE_URL = "https://api.storeconfig.com";
const API_KEY = "sc_vQEIMDPf2YjyCbxzTGppo";
const APP_ID = "6566170641";

function generateRandomId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

jest.mock("inquirer");

import inquirer from "inquirer";

const mockInquirer = jest.mocked(inquirer);

describe("CLI E2E Tests", () => {
  let tempDir: string;
  let tempConfigFile: string;
  let originalKey: string | null = null;
  let originalState: AppStoreModel;

  beforeAll(async () => {
    originalKey = keyService.loadKey();
    keyService.saveKey(API_KEY);
    process.env.API_BASE_URL = API_BASE_URL;

    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-e2e-"));
    tempConfigFile = path.join(tempDir, "storeconfig.json");

    await fetchCommand.handler!({
      id: APP_ID,
      file: tempConfigFile,
    } as any);

    originalState = JSON.parse(fs.readFileSync(tempConfigFile, "utf-8"));
  });

  afterAll(async () => {
    // Cleanup: Reapply the original fetched config to remove any localizations added during tests
    try {
      if (originalState && tempConfigFile && fs.existsSync(tempConfigFile)) {
        fs.writeFileSync(
          tempConfigFile,
          JSON.stringify(originalState, null, 2)
        );

        await applyCommand.handler!({
          file: tempConfigFile,
          preview: false,
        } as any);
      }
    } catch (error) {
      console.error(`Failed to restore original config in afterAll:`, error);
    }

    try {
      if (originalKey) {
        keyService.saveKey(originalKey);
      } else {
        keyService.deleteKey();
      }
    } catch (error) {
      console.error("Failed to restore original key:", error);
    }
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }, 180000);

  beforeEach(() => {
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });
  });

  describe("Fetch App", () => {
    it("should fetch the app successfully using fetch command", () => {
      expect(fs.existsSync(tempConfigFile)).toBe(true);
      expect(originalState.appId).toBe(APP_ID);
      expect(originalState.schemaVersion).toBeDefined();
    });
  });

  describe("Add App Localization", () => {
    it("should add a new app localization successfully using CLI commands", async () => {
      const existingLocales = (originalState.localizations || []).map(
        (loc) => loc.locale
      );
      const testLocale = "fr-FR";

      if (existingLocales.includes(testLocale)) {
        throw new Error(`Locale ${testLocale} already exists for the app`);
      }

      const newLocalization = {
        locale: testLocale as "fr-FR",
        description:
          "Test description for e2e test localization. This is a test.",
        keywords: "test, e2e",
      };

      const desiredState: AppStoreModel = {
        ...originalState,
        localizations: [
          ...(originalState.localizations || []),
          newLocalization,
        ],
      };

      fs.writeFileSync(tempConfigFile, JSON.stringify(desiredState, null, 2));

      await applyCommand.handler!({
        file: tempConfigFile,
        preview: false,
      } as any);

      // Wait a bit for the job to be created and processed
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }, 180000);
  });
});
