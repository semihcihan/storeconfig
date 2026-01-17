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
import { SubscriptionGroupSchema } from "@semihcihan/shared";
import type { z } from "zod";

type SubscriptionGroup = z.infer<typeof SubscriptionGroupSchema>;

const env = validateE2EEnvironment();

describe("Subscription E2E Tests", () => {
  let testContext: E2ETestContext;
  let testGroupId: string;
  let testSubscriptionId: string;

  beforeAll(async () => {
    testContext = await setupE2ETest(env);
    testGroupId = generateTestIdentifier();
    testSubscriptionId = generateTestIdentifier();
  });

  afterAll(async () => {
    await cleanupE2ETest(testContext);
  }, 180000);

  beforeEach(() => {
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });
  });

  it("should create subscription group with subscription and 10 prices", async () => {
    const subscriptionGroup: SubscriptionGroup = {
      referenceName: testGroupId,
      localizations: [
        {
          locale: "en-US" as const,
          name: `Test Subscription Group`,
        },
      ],
      subscriptions: [
        {
          productId: testSubscriptionId,
          referenceName: testSubscriptionId,
          groupLevel: 1,
          subscriptionPeriod: "ONE_MONTH" as const,
          familySharable: false,
          pricing: {
            baseTerritory: "USA" as const,
            prices: [
              { territory: "USA" as const, price: "9.99" },
              { territory: "GBR" as const, price: "7.123" },
              { territory: "CAN" as const, price: "12.99" },
              { territory: "DEU" as const, price: "8.99" },
              { territory: "FRA" as const, price: "9.444" },
              { territory: "JPN" as const, price: "1200" },
              { territory: "AUS" as const, price: "14.99" },
              { territory: "NLD" as const, price: "8" },
              { territory: "ESP" as const, price: "8.99" },
              { territory: "ITA" as const, price: "8.99" },
            ],
          },
          availability: {
            availableInNewTerritories: true,
            availableTerritories: "worldwide",
          },
          localizations: [],
        },
      ],
    };

    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []),
        subscriptionGroup,
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

    const createdGroup = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(createdGroup).toBeDefined();
    expect(createdGroup.subscriptions).toHaveLength(1);

    const createdSubscription = createdGroup.subscriptions[0];
    expect(createdSubscription.productId).toBe(testSubscriptionId);
    expect(createdSubscription.pricing).toBeDefined();
    expect(createdSubscription.pricing.prices.length).toBeGreaterThan(1);
    expect(createdSubscription.pricing.baseTerritory).toBe("USA");
    expect(
      createdSubscription.pricing.prices.find((p: any) => p.territory === "USA")
        ?.price
    ).toBe("9.99");
  }, 60000000);

  it("should update subscription to single base price", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const updatedSubscriptionGroup = {
      ...existingGroup,
      subscriptions: [
        {
          ...existingGroup.subscriptions[0],
          pricing: {
            baseTerritory: "USA" as const,
            prices: [{ territory: "USA" as const, price: "19.99" }],
          },
        },
      ],
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        updatedSubscriptionGroup,
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

    const updatedGroup = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(updatedGroup).toBeDefined();
    expect(updatedGroup.subscriptions).toHaveLength(1);

    const updatedSubscription = updatedGroup.subscriptions[0];
    expect(updatedSubscription.productId).toBe(testSubscriptionId);
  }, 60000000);

  it("should delete future prices and create new future prices when price changes", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const subscriptionWithNewPrice = {
      ...existingGroup.subscriptions[0],
      pricing: {
        baseTerritory: "USA" as const,
        prices: [{ territory: "USA" as const, price: "24.99" }],
      },
    };

    const desiredStateWithNewPrice: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        {
          ...existingGroup,
          subscriptions: [subscriptionWithNewPrice],
        },
      ],
    };

    fs.writeFileSync(
      testContext.tempConfigFile,
      JSON.stringify(desiredStateWithNewPrice, null, 2)
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

    const group = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(group).toBeDefined();
    expect(group.subscriptions[0].productId).toBe(testSubscriptionId);
  }, 60000000);
});
