import type { AppStoreModel, PricingRequest } from "@semihcihan/shared";

jest.mock("./apple-auth-context", () => ({
  requireAppleCredentialsForApi: jest.fn(),
}));

jest.mock("@semihcihan/developer-tool/functions", () => ({
  setPricePointDataHook: jest.fn(),
  fetchAppsList: jest.fn(),
  fetchAppStoreData: jest.fn(),
  generateDiff: jest.fn(),
  applyChanges: jest.fn(),
  comparePricing: jest.fn(),
  applyPricingChanges: jest.fn(),
}));

import { requireAppleCredentialsForApi } from "./apple-auth-context";
import {
  applyChanges,
  applyPricingChanges,
  comparePricing,
  fetchAppStoreData,
  fetchAppsList,
  generateDiff,
  setPricePointDataHook,
} from "@semihcihan/developer-tool/functions";
import { StoreConfigEngine } from "./storeconfig-engine";

const mockRequireAppleCredentialsForApi = jest.mocked(
  requireAppleCredentialsForApi
);
const mockSetPricePointDataHook = jest.mocked(setPricePointDataHook);
const mockFetchAppsList = jest.mocked(fetchAppsList);
const mockFetchAppStoreData = jest.mocked(fetchAppStoreData);
const mockGenerateDiff = jest.mocked(generateDiff);
const mockApplyChanges = jest.mocked(applyChanges);
const mockComparePricing = jest.mocked(comparePricing);
const mockApplyPricingChanges = jest.mocked(applyPricingChanges);

describe("StoreConfigEngine", () => {
  let pricePointCache: {
    getTerritoryPricePoints: jest.Mock;
    getPricePointsForSelectedItem: jest.Mock;
  };
  let currencyCache: { loadCurrencies: jest.Mock };
  let engine: StoreConfigEngine;

  const appStoreState = {
    appId: "app-123",
    inAppPurchases: [{ productId: "iap-123" }],
    subscriptionGroups: [
      {
        subscriptions: [
          {
            productId: "sub-123",
            promotionalOffers: [{ id: "promo-123" }],
          },
        ],
      },
    ],
  } as any as AppStoreModel;

  beforeEach(() => {
    jest.clearAllMocks();
    pricePointCache = {
      getTerritoryPricePoints: jest.fn(),
      getPricePointsForSelectedItem: jest.fn(),
    };
    currencyCache = {
      loadCurrencies: jest.fn().mockResolvedValue([{ id: "USA" }]),
    };
    engine = new StoreConfigEngine(pricePointCache as any, currencyCache as any);
  });

  it("loads Apple credentials before fetching app data", async () => {
    mockFetchAppStoreData.mockResolvedValueOnce(appStoreState);

    await expect(engine.fetchAppStoreData("app-123")).resolves.toBe(
      appStoreState
    );

    expect(mockRequireAppleCredentialsForApi).toHaveBeenCalled();
    expect(mockSetPricePointDataHook).toHaveBeenCalledWith(
      expect.any(Function)
    );
    expect(mockFetchAppStoreData).toHaveBeenCalledWith({ appId: "app-123" });
  });

  it("loads Apple credentials before fetching the app list", async () => {
    const apps = [{ id: "app-123", name: "Example App" }];
    mockFetchAppsList.mockResolvedValueOnce(apps);

    await expect(engine.fetchAppsList()).resolves.toBe(apps);

    expect(mockRequireAppleCredentialsForApi).toHaveBeenCalled();
    expect(mockSetPricePointDataHook).toHaveBeenCalledWith(
      expect.any(Function)
    );
    expect(mockFetchAppsList).toHaveBeenCalled();
  });

  it("compares prices with local currency dependency", async () => {
    mockComparePricing.mockResolvedValueOnce([
      {
        item: { type: "app", id: "app-123", name: "App" },
        prices: [],
      },
    ]);

    await engine.comparePricing(appStoreState);

    expect(mockComparePricing).toHaveBeenCalledWith(
      { appStoreData: appStoreState },
      { loadCurrencies: expect.any(Function) }
    );

    const dependencies = mockComparePricing.mock.calls[0][1]!;
    await expect(dependencies.loadCurrencies()).resolves.toEqual([
      { id: "USA" },
    ]);
  });

  it("fetches price points through the cache", async () => {
    const pricePoints = [{ id: "0.99", price: "0.99" }];
    pricePointCache.getPricePointsForSelectedItem.mockResolvedValueOnce(
      pricePoints
    );

    await expect(
      engine.fetchTerritoryPricePointsForSelectedItem(
        { type: "app", id: "app-123", name: "App" },
        "app-123",
        "USA"
      )
    ).resolves.toBe(pricePoints);

    expect(pricePointCache.getPricePointsForSelectedItem).toHaveBeenCalledWith(
      { type: "app", id: "app-123", name: "App" },
      "app-123",
      "USA"
    );
  });

  it("generates diffs locally with Apple credentials", async () => {
    const plan = [{ type: "UPDATE_APP_DETAILS", payload: {} }];
    mockGenerateDiff.mockResolvedValueOnce({
      plan: plan as any,
      currentState: appStoreState,
    });

    await expect(engine.generateDiff(appStoreState)).resolves.toEqual({
      plan,
      currentState: appStoreState,
    });

    expect(mockRequireAppleCredentialsForApi).toHaveBeenCalled();
    expect(mockGenerateDiff).toHaveBeenCalledWith({
      desiredState: appStoreState,
    });
  });

  it("applies a plan locally with progress and price point hooks", async () => {
    const plan = [{ type: "UPDATE_APP_PRICING", payload: {} }] as any;
    const onStep = jest.fn();
    const onInfo = jest.fn();
    pricePointCache.getTerritoryPricePoints.mockResolvedValueOnce({
      territory: "USA",
      resourceType: "app",
      pricePoints: [],
    });
    mockApplyChanges.mockImplementationOnce(async (params: any) => {
      await params.onStepCallback(0, plan[0]);
      await params.pricePointDataHook("app", "USA", "app-resource-id");
      return { message: "Changes applied successfully" };
    });

    await engine.applyPlan(plan, appStoreState, appStoreState, {
      dryRun: true,
      onStep,
      onInfo,
    });

    expect(mockApplyChanges).toHaveBeenCalledWith({
      plan,
      desiredState: appStoreState,
      dryRun: true,
      pricePointDataHook: expect.any(Function),
      onStepCallback: expect.any(Function),
    });
    expect(onStep).toHaveBeenCalledWith(0, plan[0]);
    expect(pricePointCache.getTerritoryPricePoints).toHaveBeenCalledWith(
      "app",
      "USA",
      "app-resource-id"
    );
  });

  it("applies pricing locally", async () => {
    const pricingRequest = {
      appId: "app-123",
      selectedItem: {
        type: "offer",
        id: "promo-123",
        name: "Promo",
      },
      basePricePoint: { id: "0.99", price: "0.99" },
      pricingStrategy: "apple",
    } as PricingRequest;
    const updatedState = { ...appStoreState, name: "Updated" };
    mockApplyPricingChanges.mockResolvedValueOnce({ updatedState });

    await expect(
      engine.applyPricingChanges(appStoreState, pricingRequest)
    ).resolves.toBe(updatedState);

    expect(mockApplyPricingChanges).toHaveBeenCalledWith(
      {
        appStoreState,
        pricingRequest,
      },
      { loadCurrencies: expect.any(Function) }
    );
  });
});
