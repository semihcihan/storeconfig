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

describe("Subscription Localization E2E Tests", () => {
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

  it("should create subscription group with 12 localizations and verify they exist", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const groupLocalizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test Subscription Group ${locale}`,
    }));

    const subscriptionGroup: SubscriptionGroup = {
      referenceName: testGroupId,
      localizations: groupLocalizations,
      subscriptions: [],
    };

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
    expect(createdGroup.localizations).toBeDefined();
    expect(createdGroup.localizations).toHaveLength(12);

    const fetchedLocales = createdGroup.localizations.map(
      (loc: any) => loc.locale
    );
    TEST_LOCALES.forEach((locale) => {
      expect(fetchedLocales).toContain(locale);
    });
  }, 600000);

  it("should delete all 12 localizations from subscription group and verify 0 localizations", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const groupWithoutLocalizations = {
      ...existingGroup,
      localizations: [],
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        groupWithoutLocalizations,
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

    const groupAfterDeletion = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );

    expect(groupAfterDeletion).toBeDefined();
    expect(groupAfterDeletion.localizations).toBeDefined();
    expect(groupAfterDeletion.localizations).toHaveLength(0);
  }, 600000);

  it("should create subscription with 12 localizations and verify they exist", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const subscriptionLocalizations = TEST_LOCALES.map((locale) => ({
      locale,
      name: `Test Subscription ${locale}`,
      description: `Test Subscription Description ${locale}`,
    }));

    const subscriptionWithLocalizations = {
      productId: testSubscriptionId,
      referenceName: testSubscriptionId,
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH" as const,
      familySharable: false,
      localizations: subscriptionLocalizations,
    };

    const groupWithSubscription: SubscriptionGroup = {
      ...existingGroup,
      subscriptions: [subscriptionWithLocalizations],
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        groupWithSubscription,
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

    const group = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );

    expect(group).toBeDefined();
    expect(group.subscriptions).toBeDefined();
    expect(group.subscriptions).toHaveLength(1);

    const createdSubscription = group.subscriptions[0];
    expect(createdSubscription.productId).toBe(testSubscriptionId);
    expect(createdSubscription.localizations).toBeDefined();
    expect(createdSubscription.localizations).toHaveLength(12);

    const fetchedLocales = createdSubscription.localizations.map(
      (loc: any) => loc.locale
    );
    TEST_LOCALES.forEach((locale) => {
      expect(fetchedLocales).toContain(locale);
    });
  }, 600000);

  it("should delete all localizations from subscription and verify 0 localizations", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const existingSubscription = existingGroup.subscriptions?.find(
      (s: any) => s.productId === testSubscriptionId
    );
    expect(existingSubscription).toBeDefined();

    const subscriptionWithoutLocalizations = {
      ...existingSubscription,
      localizations: [],
    };

    const groupWithUpdatedSubscription: SubscriptionGroup = {
      ...existingGroup,
      subscriptions: [
        ...(existingGroup.subscriptions || []).filter(
          (s: any) => s.productId !== testSubscriptionId
        ),
        subscriptionWithoutLocalizations,
      ],
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        groupWithUpdatedSubscription,
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

    const group = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );

    expect(group).toBeDefined();
    expect(group.subscriptions).toBeDefined();
    expect(group.subscriptions).toHaveLength(1);

    const subscriptionAfterDeletion = group.subscriptions[0];
    expect(subscriptionAfterDeletion.productId).toBe(testSubscriptionId);
    expect(subscriptionAfterDeletion.localizations).toBeDefined();
    expect(subscriptionAfterDeletion.localizations).toHaveLength(0);
  }, 600000);

  it("should add 11 more subscriptions and verify 12 subscriptions exist", async () => {
    const currentState = JSON.parse(
      fs.readFileSync(testContext.tempConfigFile, "utf-8")
    );

    const existingGroup = currentState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );
    expect(existingGroup).toBeDefined();

    const existingSubscription = existingGroup.subscriptions?.find(
      (s: any) => s.productId === testSubscriptionId
    );
    expect(existingSubscription).toBeDefined();

    const additionalSubscriptions = Array.from({ length: 11 }, (_, i) => {
      const subscriptionId = generateTestIdentifier();
      return {
        productId: subscriptionId,
        referenceName: subscriptionId,
        groupLevel: 1,
        subscriptionPeriod: "ONE_MONTH" as const,
        familySharable: false,
      };
    });

    const allSubscriptions = [existingSubscription, ...additionalSubscriptions];

    const groupWithAllSubscriptions: SubscriptionGroup = {
      ...existingGroup,
      subscriptions: allSubscriptions,
    };

    const desiredState: AppStoreModel = {
      ...currentState,
      subscriptionGroups: [
        ...(currentState.subscriptionGroups || []).filter(
          (g: any) => g.referenceName !== testGroupId
        ),
        groupWithAllSubscriptions,
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

    const group = fetchedState.subscriptionGroups?.find(
      (g: any) => g.referenceName === testGroupId
    );

    expect(group).toBeDefined();
    expect(group.subscriptions).toBeDefined();
    expect(group.subscriptions).toHaveLength(12);
  }, 600000);
});
