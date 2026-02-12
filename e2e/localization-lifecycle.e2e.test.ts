import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import {
  validateE2EEnvironment,
  mockInquirer,
  type E2EEnvironment,
} from "./helpers";
import fetchCommand from "../src/commands/fetch";
import applyCommand from "../src/commands/apply";
import { keyService } from "../src/services/key-service";
import type { AppStoreModel } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";

const MAX_IAP_SUB_DESCRIPTION_LENGTH = 55;

const env = validateE2EEnvironment();

const LOCALIZATION_E2E_APP_ID = "6757102197";

const IAP_PRODUCT_ID = "com.lagotgames.manifestapp.premium.unlock";
const SUBSCRIPTION_GROUP_REF = "Premium";
const SUBSCRIPTION_PRODUCT_ID = "com.lagotgames.manifestapp.premium.annual";

const LOCALE_TO_UPDATE = "it";
const NEW_LOCALE = "ko";

interface LocalizationTestContext {
  tempDir: string;
  tempConfigFile: string;
  originalKey: string | null;
  originalState: AppStoreModel;
}

async function setupLocalizationE2E(): Promise<LocalizationTestContext> {
  const originalKey = keyService.loadKey();
  keyService.saveKey(env.API_KEY);
  process.env.API_BASE_URL = env.API_BASE_URL;

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-e2e-localization-"));
  const tempConfigFile = path.join(tempDir, "storeconfig.json");

  await fetchCommand.handler!({
    id: LOCALIZATION_E2E_APP_ID,
    file: tempConfigFile,
  } as any);

  const originalState = JSON.parse(fs.readFileSync(tempConfigFile, "utf-8"));

  return {
    tempDir,
    tempConfigFile,
    originalKey,
    originalState,
  };
}

async function cleanupLocalizationE2E(ctx: LocalizationTestContext): Promise<void> {
  try {
    if (ctx.originalState && fs.existsSync(ctx.tempConfigFile)) {
      const restored = normalizeForValidation(ctx.originalState);
      fs.writeFileSync(
        ctx.tempConfigFile,
        JSON.stringify(restored, null, 2)
      );
      await applyCommand.handler!({
        file: ctx.tempConfigFile,
        preview: false,
      } as any);
    }
  } catch (error) {
    console.error("Failed to restore original config:", error);
  }
  try {
    if (ctx.originalKey) {
      keyService.saveKey(ctx.originalKey);
    } else {
      keyService.deleteKey();
    }
  } catch (error) {
    console.error("Failed to restore key:", error);
  }
  if (fs.existsSync(ctx.tempDir)) {
    fs.rmSync(ctx.tempDir, { recursive: true, force: true });
  }
}

function readState(file: string): AppStoreModel {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function truncateDescription(desc: string, max: number): string {
  if (desc.length <= max) return desc;
  return desc.slice(0, max);
}

function normalizeForValidation(state: AppStoreModel): AppStoreModel {
  const normalized = removeShortcuts(state) as AppStoreModel;
  const iap = normalized.inAppPurchases?.map((p: Record<string, unknown>) => ({
    ...p,
    localizations: (p.localizations as Array<Record<string, unknown>>)?.map((loc) => ({
      ...loc,
      description: truncateDescription(String(loc.description ?? ""), MAX_IAP_SUB_DESCRIPTION_LENGTH),
    })),
  }));
  const groups = normalized.subscriptionGroups?.map((g: Record<string, unknown>) => ({
    ...g,
    subscriptions: (g.subscriptions as Array<Record<string, unknown>>)?.map((s) => ({
      ...s,
      localizations: (s.localizations as Array<Record<string, unknown>>)?.map((loc) => ({
        ...loc,
        description: truncateDescription(String(loc.description ?? ""), MAX_IAP_SUB_DESCRIPTION_LENGTH),
      })),
    })),
  }));
  return {
    ...normalized,
    ...(iap && { inAppPurchases: iap }),
    ...(groups && { subscriptionGroups: groups }),
  } as AppStoreModel;
}

function writeState(file: string, state: AppStoreModel): void {
  const normalized = normalizeForValidation(state);
  fs.writeFileSync(file, JSON.stringify(normalized, null, 2));
}

async function applyConfig(file: string): Promise<void> {
  await applyCommand.handler!({ file, preview: false } as any);
}

async function fetchConfig(file: string): Promise<void> {
  await fetchCommand.handler!({
    id: LOCALIZATION_E2E_APP_ID,
    file,
  } as any);
}

describe("Localization lifecycle E2E (IAP, subscription group, subscription)", () => {
  let ctx: LocalizationTestContext;

  beforeAll(async () => {
    ctx = await setupLocalizationE2E();
  });

  afterAll(async () => {
    await cleanupLocalizationE2E(ctx);
  }, 180000);

  beforeEach(() => {
    mockInquirer.prompt.mockResolvedValue({ confirmed: true });
  });

  describe("IAP localization lifecycle", () => {
    it("should update a localization, create new, update new, then delete both (restore)", async () => {
      let state = readState(ctx.tempConfigFile);
      const iap = state.inAppPurchases?.find((p) => p.productId === IAP_PRODUCT_ID);
      expect(iap).toBeDefined();
      const existingLoc = iap?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(existingLoc).toBeDefined();

      const originalName = existingLoc!.name;
      const originalDescription = existingLoc!.description;
      const updatedName = `${originalName} [E2E Updated]`;
      const updatedDescription = `${originalDescription} [E2E]`;

      const withUpdatedLoc: AppStoreModel = {
        ...state,
        inAppPurchases: state.inAppPurchases!.map((p) =>
          p.productId === IAP_PRODUCT_ID
            ? {
                ...p,
                localizations: (p.localizations ?? []).map((loc) =>
                  loc.locale === LOCALE_TO_UPDATE
                    ? { ...loc, name: updatedName, description: updatedDescription }
                    : loc
                ),
              }
            : p
        ),
      };
      writeState(ctx.tempConfigFile, withUpdatedLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const locAfterUpdate = state.inAppPurchases?.find((p) => p.productId === IAP_PRODUCT_ID)?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(locAfterUpdate?.name).toBe(updatedName);
      expect(locAfterUpdate?.description).toBe(
        truncateDescription(updatedDescription, MAX_IAP_SUB_DESCRIPTION_LENGTH)
      );

      const withNewLoc: AppStoreModel = {
        ...state,
        inAppPurchases: state.inAppPurchases!.map((p) =>
          p.productId === IAP_PRODUCT_ID
            ? {
                ...p,
                localizations: [
                  ...(p.localizations ?? []),
                  { locale: NEW_LOCALE as "ko", name: "E2E 신규 현지화", description: "E2E 테스트용 새 로컬라이제이션" },
                ],
              }
            : p
        ),
      };
      writeState(ctx.tempConfigFile, withNewLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const newLocAfterCreate = state.inAppPurchases?.find((p) => p.productId === IAP_PRODUCT_ID)?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocAfterCreate).toBeDefined();
      expect(newLocAfterCreate?.name).toBe("E2E 신규 현지화");

      const withNewLocUpdated: AppStoreModel = {
        ...state,
        inAppPurchases: state.inAppPurchases!.map((p) =>
          p.productId === IAP_PRODUCT_ID
            ? {
                ...p,
                localizations: (p.localizations ?? []).map((loc) =>
                  loc.locale === NEW_LOCALE
                    ? { ...loc, name: "E2E 신규 (수정됨)", description: "E2E 업데이트된 설명" }
                    : loc
                ),
              }
            : p
        ),
      };
      writeState(ctx.tempConfigFile, withNewLocUpdated);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const newLocUpdated = state.inAppPurchases?.find((p) => p.productId === IAP_PRODUCT_ID)?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocUpdated?.name).toBe("E2E 신규 (수정됨)");

      const restore: AppStoreModel = {
        ...state,
        inAppPurchases: state.inAppPurchases!.map((p) =>
          p.productId === IAP_PRODUCT_ID
            ? {
                ...p,
                localizations: (p.localizations ?? []).filter(
                  (loc) => loc.locale !== NEW_LOCALE && loc.locale !== LOCALE_TO_UPDATE
                ),
              }
            : p
        ),
      };
      writeState(ctx.tempConfigFile, restore);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      const finalState = readState(ctx.tempConfigFile);
      const finalIap = finalState.inAppPurchases?.find((p) => p.productId === IAP_PRODUCT_ID);
      expect(finalIap?.localizations?.find((l) => l.locale === NEW_LOCALE)).toBeUndefined();
      const restoredLoc = finalIap?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(restoredLoc?.name).toBe(originalName);
      expect(restoredLoc?.description).toBe(originalDescription);
    }, 120000);
  });

  describe("Subscription group localization lifecycle", () => {
    it("should update a localization, create new, update new, then delete both (restore)", async () => {
      let state = readState(ctx.tempConfigFile);
      const group = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF);
      expect(group).toBeDefined();
      const existingLoc = group?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(existingLoc).toBeDefined();

      const originalName = existingLoc!.name;
      const updatedName = `${originalName} [E2E Updated]`;

      const withUpdatedLoc: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                localizations: (g.localizations ?? []).map((loc) =>
                  loc.locale === LOCALE_TO_UPDATE ? { ...loc, name: updatedName } : loc
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withUpdatedLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const locAfterUpdate = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(locAfterUpdate?.name).toBe(updatedName);

      const withNewLoc: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                localizations: [
                  ...(g.localizations ?? []),
                  { locale: NEW_LOCALE as "ko", name: "E2E 프리미엄 그룹" },
                ],
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withNewLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const newLocAfterCreate = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocAfterCreate).toBeDefined();

      const withNewLocUpdated: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                localizations: (g.localizations ?? []).map((loc) =>
                  loc.locale === NEW_LOCALE ? { ...loc, name: "E2E 프리미엄 (수정됨)" } : loc
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withNewLocUpdated);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const newLocUpdated = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocUpdated?.name).toBe("E2E 프리미엄 (수정됨)");

      const restore: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                localizations: (g.localizations ?? []).filter(
                  (loc) => loc.locale !== NEW_LOCALE && loc.locale !== LOCALE_TO_UPDATE
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, restore);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      const finalState = readState(ctx.tempConfigFile);
      const finalGroup = finalState.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF);
      expect(finalGroup?.localizations?.find((l) => l.locale === NEW_LOCALE)).toBeUndefined();
      const restoredLoc = finalGroup?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(restoredLoc?.name).toBe(originalName);
    }, 120000);
  });

  describe("Subscription localization lifecycle", () => {
    it("should update a localization, create new, update new, then delete both (restore)", async () => {
      let state = readState(ctx.tempConfigFile);
      const group = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF);
      const sub = group?.subscriptions?.find((s) => s.productId === SUBSCRIPTION_PRODUCT_ID);
      expect(sub).toBeDefined();
      const existingLoc = sub?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(existingLoc).toBeDefined();

      const originalName = existingLoc!.name;
      const originalDescription = existingLoc!.description;
      const updatedName = `${originalName} [E2E Updated]`;
      const updatedDescription = `${originalDescription} [E2E]`;

      const withUpdatedLoc: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                subscriptions: (g.subscriptions ?? []).map((s) =>
                  s.productId === SUBSCRIPTION_PRODUCT_ID
                    ? {
                        ...s,
                        localizations: (s.localizations ?? []).map((loc) =>
                          loc.locale === LOCALE_TO_UPDATE
                            ? { ...loc, name: updatedName, description: updatedDescription }
                            : loc
                        ),
                      }
                    : s
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withUpdatedLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const subAfterUpdate = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.subscriptions?.find((s) => s.productId === SUBSCRIPTION_PRODUCT_ID);
      const locAfterUpdate = subAfterUpdate?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(locAfterUpdate?.name).toBe(updatedName);
      expect(locAfterUpdate?.description).toBe(updatedDescription);

      const withNewLoc: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                subscriptions: (g.subscriptions ?? []).map((s) =>
                  s.productId === SUBSCRIPTION_PRODUCT_ID
                    ? {
                        ...s,
                        localizations: [
                          ...(s.localizations ?? []),
                          { locale: NEW_LOCALE as "ko", name: "E2E 연간 프리미엄", description: "E2E 테스트용 연간 구독 현지화" },
                        ],
                      }
                    : s
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withNewLoc);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const subAfterCreate = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.subscriptions?.find((s) => s.productId === SUBSCRIPTION_PRODUCT_ID);
      const newLocAfterCreate = subAfterCreate?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocAfterCreate).toBeDefined();

      const withNewLocUpdated: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                subscriptions: (g.subscriptions ?? []).map((s) =>
                  s.productId === SUBSCRIPTION_PRODUCT_ID
                    ? {
                        ...s,
                        localizations: (s.localizations ?? []).map((loc) =>
                          loc.locale === NEW_LOCALE
                            ? { ...loc, name: "E2E 연간 (수정됨)", description: "E2E 업데이트된 연간 설명" }
                            : loc
                        ),
                      }
                    : s
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, withNewLocUpdated);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      state = readState(ctx.tempConfigFile);
      const subAfterUpdateNew = state.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF)?.subscriptions?.find((s) => s.productId === SUBSCRIPTION_PRODUCT_ID);
      const newLocUpdated = subAfterUpdateNew?.localizations?.find((l) => l.locale === NEW_LOCALE);
      expect(newLocUpdated?.name).toBe("E2E 연간 (수정됨)");

      const restore: AppStoreModel = {
        ...state,
        subscriptionGroups: state.subscriptionGroups!.map((g) =>
          g.referenceName === SUBSCRIPTION_GROUP_REF
            ? {
                ...g,
                subscriptions: (g.subscriptions ?? []).map((s) =>
                  s.productId === SUBSCRIPTION_PRODUCT_ID
                    ? {
                        ...s,
                        localizations: (s.localizations ?? []).filter(
                          (loc) => loc.locale !== NEW_LOCALE && loc.locale !== LOCALE_TO_UPDATE
                        ),
                      }
                    : s
                ),
              }
            : g
        ),
      };
      writeState(ctx.tempConfigFile, restore);
      await applyConfig(ctx.tempConfigFile);
      await fetchConfig(ctx.tempConfigFile);
      const finalState = readState(ctx.tempConfigFile);
      const finalGroup = finalState.subscriptionGroups?.find((g) => g.referenceName === SUBSCRIPTION_GROUP_REF);
      const finalSub = finalGroup?.subscriptions?.find((s) => s.productId === SUBSCRIPTION_PRODUCT_ID);
      expect(finalSub?.localizations?.find((l) => l.locale === NEW_LOCALE)).toBeUndefined();
      const restoredLoc = finalSub?.localizations?.find((l) => l.locale === LOCALE_TO_UPDATE);
      expect(restoredLoc?.name).toBe(originalName);
      expect(restoredLoc?.description).toBe(originalDescription);
    }, 120000);
  });
});
