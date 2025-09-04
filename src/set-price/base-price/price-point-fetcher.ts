import { fetchAppPricePoints } from "../../domains/pricing/api-client";
import {
  fetchInAppPurchases,
  fetchIAPPricePoints,
} from "../../domains/in-app-purchases/api-client";
import {
  fetchAllSubscriptionPricePoints,
  fetchSubscriptionGroups,
} from "../../domains/subscriptions/api-client";
import type { AppStoreModel } from "../../models/app-store";
import type { PricingItem, PricePointInfo } from "../../models/pricing-request";
import type { components } from "../../generated/app-store-connect-api";
import { ContextualError } from "../../helpers/error-handling-helpers";

// Simple caches to avoid refetching/resolving per territory
const iapIdCache = new Map<string, string>(); // key: `${appId}:${productId}` → iapId
const subscriptionIdCache = new Map<string, string>(); // key: `${appId}:${selectedKey}` → subscriptionId
const pricePointsCache = new Map<string, PricePointInfo[]>(); // key: `${kind}:${identifier}:${territory}`

// Function to clear all caches (mainly for testing)
export function clearCaches(): void {
  iapIdCache.clear();
  subscriptionIdCache.clear();
  pricePointsCache.clear();
}

type HasCustomerPrice = {
  id?: string;
  attributes?: { customerPrice?: string | null };
};
type PricePointResponseShape = { data?: HasCustomerPrice[] | null };

function extractPricePointInfoFromResponse(
  response:
    | PricePointResponseShape
    | components["schemas"]["AppPricePointsV3Response"]["data"]
    | components["schemas"]["InAppPurchasePricePointsResponse"]
    | components["schemas"]["SubscriptionPricePointsResponse"]
): PricePointInfo[] {
  if (!response || !Array.isArray((response as PricePointResponseShape).data)) {
    return [];
  }
  const dataArray = (response as PricePointResponseShape).data ?? [];
  const pricePoints = dataArray
    .map((item) => {
      const price = item?.attributes?.customerPrice;
      if (typeof price === "string" && item?.id) {
        return { id: item.id, price };
      }
      return null;
    })
    .filter((p): p is PricePointInfo => p !== null);

  const uniquePricePoints = pricePoints.reduce((acc, current) => {
    const existing = acc.find((item) => item.price === current.price);
    if (!existing) {
      acc.push(current);
    }
    return acc;
  }, [] as PricePointInfo[]);

  return uniquePricePoints.sort((a, b) => Number(a.price) - Number(b.price));
}

type APISubscription = components["schemas"]["Subscription"];
function isAPISubscription(item: unknown): item is APISubscription {
  return (
    typeof item === "object" &&
    item !== null &&
    (item as { type?: unknown }).type === "subscriptions"
  );
}

async function fetchTerritoryPricePointsForApp(
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  const cacheKey = `app:${appId}:${territoryId}`;
  const cached = pricePointsCache.get(cacheKey);
  if (cached) return cached;
  const resp = await fetchAppPricePoints(appId, territoryId);
  const points = extractPricePointInfoFromResponse(resp);
  pricePointsCache.set(cacheKey, points);
  return points;
}

async function fetchTerritoryPricePointsForInAppPurchase(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  const idCacheKey = `${appId}:${selectedItem.id}`;
  let iapId = iapIdCache.get(idCacheKey);
  if (!iapId) {
    const iaps = await fetchInAppPurchases(appId);
    const iapData = (iaps.data || []).find(
      (it) => it.attributes?.productId === selectedItem.id
    );
    iapId = iapData?.id || "";
    if (!iapId) {
      throw new ContextualError(
        "The in-app purchase does not exist, please create it first.",
        {
          appId,
          selectedItem,
          territoryId,
        }
      );
    }
    iapIdCache.set(idCacheKey, iapId);
  }
  const cacheKey = `iap:${iapId}:${territoryId}`;
  const cached = pricePointsCache.get(cacheKey);
  if (cached) return cached;
  const resp = await fetchIAPPricePoints(iapId, territoryId);
  const points = extractPricePointInfoFromResponse(resp);
  pricePointsCache.set(cacheKey, points);
  return points;
}

async function fetchTerritoryPricePointsForSubscriptionOrOffer(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel,
  territoryId: string
): Promise<PricePointInfo[]> {
  const selectedKey = `${selectedItem.id}:${selectedItem.offerType || ""}`;
  const idCacheKey = `${appStoreState.appId}:${selectedKey}`;
  let subscriptionId = subscriptionIdCache.get(idCacheKey);
  if (!subscriptionId) {
    const groups = await fetchSubscriptionGroups(appStoreState.appId);
    const included = groups.included || [];
    const subs = included.filter(isAPISubscription);

    // Direct productId match
    subscriptionId = subs.find(
      (s) => s.attributes?.productId === selectedItem.id
    )?.id as string | undefined;

    if (!subscriptionId && selectedItem.type === "offer") {
      // For promotional offers, search owning subscription. For intro offers we already have the subscription id on selectedItem.id.
      for (const sub of subs) {
        const offers = sub.relationships?.promotionalOffers?.data;
        if (
          Array.isArray(offers) &&
          offers.some((o) => o.id === selectedItem.id)
        ) {
          subscriptionId = sub.id;
          break;
        }
      }
    }

    if (!subscriptionId) {
      throw new ContextualError(
        "The subscription does not exist, please create it first.",
        {
          appId: appStoreState.appId,
          selectedItem,
          territoryId,
        }
      );
    }
    subscriptionIdCache.set(idCacheKey, subscriptionId);
  }

  const cacheKey = `sub:${subscriptionId}:${territoryId}`;
  const cached = pricePointsCache.get(cacheKey);
  if (cached) return cached;
  const resp = await fetchAllSubscriptionPricePoints(
    subscriptionId,
    territoryId
  );
  const points = extractPricePointInfoFromResponse(resp);
  pricePointsCache.set(cacheKey, points);
  return points;
}

export async function fetchTerritoryPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel,
  territoryId: string
): Promise<PricePointInfo[]> {
  if (selectedItem.type === "app") {
    return fetchTerritoryPricePointsForApp(appStoreState.appId, territoryId);
  }

  if (selectedItem.type === "inAppPurchase") {
    return fetchTerritoryPricePointsForInAppPurchase(
      selectedItem,
      appStoreState.appId,
      territoryId
    );
  }

  return fetchTerritoryPricePointsForSubscriptionOrOffer(
    selectedItem,
    appStoreState,
    territoryId
  );
}
