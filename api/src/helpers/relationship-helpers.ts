import type { components } from "../generated/app-store-connect-api";

// Type definition for included resources
type IncludedResource =
  | components["schemas"]["InAppPurchaseLocalization"]
  | components["schemas"]["Subscription"]
  | components["schemas"]["SubscriptionGroupLocalization"]
  | components["schemas"]["SubscriptionIntroductoryOffer"]
  | components["schemas"]["SubscriptionPromotionalOffer"]
  | components["schemas"]["InAppPurchaseAvailability"]
  | components["schemas"]["SubscriptionPricePoint"]
  | components["schemas"]["Territory"]
  | components["schemas"]["InAppPurchasePricePoint"]
  | components["schemas"]["SubscriptionPrice"]
  | components["schemas"]["SubscriptionPromotionalOfferPrice"];

export type IncludedByIdMap = { [key: string]: IncludedResource };

// Helper function to create a map of included resources by their ID
export function createIncludedByIdMap(
  included: IncludedResource[] | undefined
): IncludedByIdMap {
  if (!included) {
    return {};
  }
  return included.reduce((map: IncludedByIdMap, item: IncludedResource) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {});
}

// Helper function to get a resource from the included map
export function getIncludedResource<T extends IncludedResource>(
  includedById: IncludedByIdMap,
  type: string,
  id: string
): T | undefined {
  return includedById[`${type}-${id}`] as T | undefined;
}
