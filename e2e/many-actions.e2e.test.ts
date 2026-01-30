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
  "fr-FR",
  "de-DE",
  "es-ES",
  "ja",
  "pt-BR",
] as const;

describe("Apply Many Actions E2E Tests", () => {
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

  it("should apply a single plan with many actions", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const testIapId = generateTestIdentifier();
    const testGroupId = generateTestIdentifier();
    const testSubscriptionId = generateTestIdentifier();

    const iapLocalizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test IAP ${locale}`,
      description: `Test IAP Description ${locale}`,
    }));

    const subscriptionLocalizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test Subscription ${locale}`,
      description: `Test Subscription Description ${locale}`,
    }));

    const groupLocalizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test Group ${locale}`,
    }));

    const newIap = {
      productId: testIapId,
      type: "NON_CONSUMABLE" as const,
      referenceName: testIapId,
      familySharable: false,
      pricing: {
        baseTerritory: "USA" as const,
        prices: [
          { territory: "USA" as const, price: "2.99" },
          { territory: "GBR" as const, price: "2.49" },
          { territory: "CAN" as const, price: "3.49" },
          { territory: "DEU" as const, price: "2.79" },
        ],
      },
      availability: {
        availableInNewTerritories: true,
        availableTerritories: "worldwide" as const,
      },
      localizations: iapLocalizations,
    };

    const newSubscription = {
      productId: testSubscriptionId,
      referenceName: testSubscriptionId,
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH" as const,
      familySharable: false,
      pricing: {
        baseTerritory: "USA" as const,
        prices: [
          { territory: "USA" as const, price: "4.99" },
          { territory: "GBR" as const, price: "3.99" },
          { territory: "CAN" as const, price: "5.99" },
          { territory: "DEU" as const, price: "4.49" },
        ],
      },
      availability: {
        availableInNewTerritories: true,
        availableTerritories: "worldwide" as const,
      },
      localizations: subscriptionLocalizations,
    };

    const newSubscriptionGroup = {
      referenceName: testGroupId,
      localizations: groupLocalizations,
      subscriptions: [newSubscription],
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      inAppPurchases: [
        ...(currentState.inAppPurchases || []),
        newIap,
      ],
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []),
        newSubscriptionGroup,
      ],
    };

    fs.writeFileSync(
      testContext.tempConfigFile,
      JSON.stringify(desiredState, null, 2)
    );

    await applyCommand.handler!({
      file: testContext.tempConfigFile,
      preview: false,
    } as any);

    await fetchCommand.handler!({
      id: env.APP_ID,
      file: testContext.tempConfigFile,
    } as any);

    const fetchedState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const createdIap = fetchedState.inAppPurchases?.find(
      (iap: any) => iap.productId === testIapId
    );
    expect(createdIap).toBeDefined();
    expect(createdIap.availability).toBeDefined();
    expect(createdIap.availability.availableTerritories).toBe("worldwide");
    expect(createdIap.pricing).toBeDefined();
    expect(createdIap.pricing.prices).toHaveLength(4);
    expect(createdIap.localizations).toHaveLength(TEST_LOCALES.length);

    const createdGroup = fetchedState.subscriptionGroups?.find(
      (group: any) => group.referenceName === testGroupId
    );
    expect(createdGroup).toBeDefined();
    expect(createdGroup.localizations).toHaveLength(TEST_LOCALES.length);
    expect(createdGroup.subscriptions).toHaveLength(1);
    expect(createdGroup.subscriptions[0].productId).toBe(testSubscriptionId);
  }, 600000);
});
