import "./helpers/logging";

// Export all route functions for external use
export { fetchPricePoints } from "./routes/price-points";
export { fetchAppStoreData } from "./routes/fetch";
export { fetchAppsList } from "./routes/fetch-apps";
export { generateDiff } from "./routes/diff";
export { comparePricing } from "./routes/compare-price";
export { applyChanges } from "./routes/apply";
export { applyPricingChanges } from "./routes/apply-pricing";

// Price point exports
export * from "./services/price-point";

// Export logging middleware functions
export {
  logStoredBigResponses,
  clearStoredBigResponses,
  type LoggingOptions,
} from "./services/logging-middleware";

// Re-export shared types that might be useful
export type {
  AppStoreModel,
  PricingItem,
  PricingRequest,
  PricingStrategy,
  PricePointInfo,
} from "@semihcihan/shared";

// Re-export internal types that might be useful
export type { Plan } from "@semihcihan/shared";
export type { TerritoryData } from "./services/pricing-strategy";

export {
  fetchPPPWithDependencies,
  updateExchangeRatesWithDependencies,
  type FetchPPPDependencies,
  type UpdateExchangeRatesDependencies,
  type CurrencyMapping,
} from "./services/currency-service";
export { loadBundledCurrencies } from "./services/bundled-data";

// Export compare pricing with dependencies
export type { ComparePricingDependencies } from "./routes/compare-price";

// Export apply pricing with dependencies
export type { ApplyPricingDependencies } from "./services/set-price-service";
