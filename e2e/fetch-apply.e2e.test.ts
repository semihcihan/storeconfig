import * as fs from "fs";
import {
  validateE2EEnvironment,
  setupE2ETest,
  cleanupE2ETest,
  mockInquirer,
  type E2ETestContext,
} from "./helpers";
import applyCommand from "../src/commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";

const env = validateE2EEnvironment();

describe("CLI E2E Tests", () => {
  let testContext: E2ETestContext;

  beforeAll(async () => {
    testContext = await setupE2ETest(env);
  });

  afterAll(async () => {
    await cleanupE2ETest(testContext);
  }, 180000);

  beforeEach(() => {
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });
  });

  describe("Fetch App", () => {
    it("should fetch the app successfully using fetch command", () => {
      expect(fs.existsSync(testContext.tempConfigFile)).toBe(true);
      expect(testContext.originalState.appId).toBe(env.APP_ID);
      expect(testContext.originalState.schemaVersion).toBeDefined();
    });
  });

  describe("Add App Localization", () => {
    it("should add a new app localization successfully using CLI commands", async () => {
      const existingLocales = (testContext.originalState.localizations || []).map(
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
        whatsNew: "This is a new version of the app with a new feature.",
      };

      const baseLocalization = testContext.originalState.localizations?.find(
        (loc) => loc.locale === "en-US"
      );
      if (!baseLocalization) {
        throw new Error("No base localization found");
      }
      const updatedBaseLocalization = {
        ...baseLocalization,
        whatsNew: "This is a new version of the app with a new feature.",
      };

      const desiredState: AppStoreModel = {
        ...testContext.originalState,
        localizations: [newLocalization, updatedBaseLocalization],
      };

      fs.writeFileSync(
        testContext.tempConfigFile,
        JSON.stringify(desiredState, null, 2)
      );

      await applyCommand.handler!({
        file: testContext.tempConfigFile,
        preview: false,
      } as any);
    }, 180000);
  });
});
