import * as fs from "fs";
import {
  validateE2EEnvironment,
  setupE2ETest,
  cleanupE2ETest,
  mockInquirer,
  generateTestIdentifier,
  type E2ETestContext,
} from "./helpers";
import fetchCommand from "../src/commands/fetch";
import applyCommand from "../src/commands/apply";
import type { AppStoreModel } from "@semihcihan/shared";

const env = validateE2EEnvironment();

const TEST_LOCALES = [
  "en-US",
  "en-GB",
  "fr-FR",
  "de-DE",
  "es-ES",
  "it",
  "ja",
  "ko",
  "zh-Hans",
  "pt-BR",
  "ru",
  "ar-SA",
] as const;

describe("IAP Localization E2E Tests", () => {
  let testContext: E2ETestContext;
  let testIAPProductId: string;

  beforeAll(async () => {
    testContext = await setupE2ETest(env);
    testIAPProductId = generateTestIdentifier();
  });

  afterAll(async () => {
    await cleanupE2ETest(testContext);
  }, 180000);

  beforeEach(() => {
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });
  });

  it("should create IAP with 12 localizations, verify, delete all, and verify deletion", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const localizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test IAP Name ${locale}`,
      description: `Test IAP Description for ${locale}`,
    }));

    const newIAP = {
      productId: testIAPProductId,
      type: "NON_CONSUMABLE" as const,
      referenceName: testIAPProductId,
      familySharable: false,
      pricing: {
        baseTerritory: "USA" as const,
        prices: [
          { territory: "USA" as const, price: "1.99" },
          { territory: "GBR" as const, price: "1.49" },
          { territory: "CAN" as const, price: "2.49" },
        ],
      },
      availability: {
        availableInNewTerritories: true,
        availableTerritories: "worldwide" as const,
      },
      localizations,
    };

    const desiredStateWithLocalizations: AppStoreModel = {
      ...currentState,
      inAppPurchases: [...(currentState.inAppPurchases || []), newIAP],
    };

    fs.writeFileSync(
      testContext.tempConfigFile,
      JSON.stringify(desiredStateWithLocalizations, null, 2)
    );

    await applyCommand.handler!({
      file: testContext.tempConfigFile,
      preview: false,
    } as any);

    await fetchCommand.handler!({
      id: env.APP_ID,
      file: testContext.tempConfigFile,
    } as any);

    const fetchedStateWithLocalizations = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const createdIAP = fetchedStateWithLocalizations.inAppPurchases?.find(
      (iap: any) => iap.productId === testIAPProductId
    );

    expect(createdIAP).toBeDefined();
    expect(createdIAP.pricing).toBeDefined();
    expect(createdIAP.pricing.prices).toHaveLength(3);
    expect(createdIAP.localizations).toBeDefined();
    expect(createdIAP.localizations).toHaveLength(12);

    const fetchedLocales = createdIAP.localizations.map(
      (loc: any) => loc.locale
    );
    TEST_LOCALES.forEach((locale) => {
      expect(fetchedLocales).toContain(locale);
    });

    const currentStateAfterFetch = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const iapWithoutLocalizations = {
      ...createdIAP,
      localizations: [],
    };

    const desiredStateWithoutLocalizations: AppStoreModel = {
      ...currentStateAfterFetch,
      inAppPurchases: [
        ...(currentStateAfterFetch.inAppPurchases || []).filter(
          (iap: any) => iap.productId !== testIAPProductId
        ),
        iapWithoutLocalizations,
      ],
    };

    fs.writeFileSync(
      testContext.tempConfigFile,
      JSON.stringify(desiredStateWithoutLocalizations, null, 2)
    );

    await applyCommand.handler!({
      file: testContext.tempConfigFile,
      preview: false,
    } as any);

    await fetchCommand.handler!({
      id: env.APP_ID,
      file: testContext.tempConfigFile,
    } as any);

    const fetchedStateAfterDeletion = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const iapAfterDeletion = fetchedStateAfterDeletion.inAppPurchases?.find(
      (iap: any) => iap.productId === testIAPProductId
    );

    expect(iapAfterDeletion).toBeDefined();
    expect(iapAfterDeletion.localizations).toBeDefined();
    expect(iapAfterDeletion.localizations).toHaveLength(0);
  }, 600000);
});
