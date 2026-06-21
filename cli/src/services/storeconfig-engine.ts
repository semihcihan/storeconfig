import type {
  AnyAction,
  AppStoreModel,
  PricePointInfo,
  Plan,
  PricingItem,
  PricingRequest,
} from "@semihcihan/shared";
import { runWithJobContext } from "@semihcihan/shared";
import {
  applyChanges as applyPlanWithApiEngine,
  applyPricingChanges as applyPricingWithApiEngine,
  comparePricing as comparePricingWithApiEngine,
  fetchAppsList as fetchAppsListWithApiEngine,
  fetchAppStoreData as fetchAppStoreDataWithApiEngine,
  generateDiff as generateDiffWithApiEngine,
  setPricePointDataHook,
} from "@semihcihan/developer-tool/functions";
import { requireAppleCredentialsForApi } from "./apple-auth-context";
import { CurrencyCache, currencyCache } from "./currency-cache";
import { PricePointCache, pricePointCache } from "./price-point-cache";

type JobInfoType = "default" | "after";

export interface ApplyPlanOptions {
  dryRun?: boolean;
  onStep?: (index: number, action: AnyAction) => Promise<void> | void;
  onInfo?: (
    message: string,
    type: JobInfoType,
    actionIndex: number
  ) => Promise<void> | void;
}

export class StoreConfigEngine {
  constructor(
    private pricePoints: PricePointCache = pricePointCache,
    private currencies: CurrencyCache = currencyCache
  ) {}

  async fetchAppsList() {
    this.prepareAppleRuntime();
    return await fetchAppsListWithApiEngine();
  }

  async fetchAppStoreData(appId: string): Promise<AppStoreModel> {
    this.prepareAppleRuntime();
    return await fetchAppStoreDataWithApiEngine({ appId });
  }

  async comparePricing(appStoreData: AppStoreModel) {
    this.prepareAppleRuntime();

    return await comparePricingWithApiEngine(
      { appStoreData },
      {
        loadCurrencies: () => this.currencies.loadCurrencies(),
      }
    );
  }

  async generateDiff(desiredState: AppStoreModel): Promise<{
    plan: Plan;
    currentState: AppStoreModel;
  }> {
    this.prepareAppleRuntime();
    const result = await generateDiffWithApiEngine({ desiredState });
    return result;
  }

  async applyPlan(
    plan: Plan,
    currentState: AppStoreModel,
    desiredState: AppStoreModel,
    options: ApplyPlanOptions = {}
  ): Promise<void> {
    this.prepareAppleRuntime();

    let currentActionIndex = -1;

    await runWithJobContext(
      {
        jobId: "local-apply",
        currentActionIndex: () => currentActionIndex,
        appendInfo: async (message: string, type: JobInfoType = "default") => {
          await options.onInfo?.(message, type, currentActionIndex);
        },
      },
      async () => {
        await applyPlanWithApiEngine({
          plan,
          desiredState,
          dryRun: options.dryRun ?? false,
          pricePointDataHook: (resourceType, territory, resourceId) =>
            this.pricePoints.getTerritoryPricePoints(
              resourceType,
              territory,
              resourceId
            ),
          onStepCallback: async (index, action) => {
            currentActionIndex = index;
            await options.onStep?.(index, action);
          },
        });
      }
    );
  }

  async fetchTerritoryPricePointsForSelectedItem(
    selectedItem: PricingItem,
    appId: string,
    territoryId: string
  ): Promise<PricePointInfo[]> {
    this.prepareAppleRuntime();
    return await this.pricePoints.getPricePointsForSelectedItem(
      selectedItem,
      appId,
      territoryId
    );
  }

  async applyPricingChanges(
    appStoreState: AppStoreModel,
    pricingRequest: PricingRequest
  ): Promise<AppStoreModel> {
    this.prepareAppleRuntime();

    const result = await applyPricingWithApiEngine(
      {
        appStoreState,
        pricingRequest,
      },
      {
        loadCurrencies: () => this.currencies.loadCurrencies(),
      }
    );

    return result.updatedState;
  }

  private prepareAppleRuntime(): void {
    requireAppleCredentialsForApi();
    setPricePointDataHook((resourceType, territory, resourceId) =>
      this.pricePoints.getTerritoryPricePoints(
        resourceType,
        territory,
        resourceId
      )
    );
  }
}

export const storeConfigEngine = new StoreConfigEngine();
