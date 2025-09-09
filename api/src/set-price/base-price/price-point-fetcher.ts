import { fetchAppPricePoints } from "../../domains/pricing/api-client";
import {
  fetchInAppPurchases,
  fetchIAPPricePoints,
} from "../../domains/in-app-purchases/api-client";
import {
  fetchAllSubscriptionPricePoints,
  fetchSubscriptionGroups,
} from "../../domains/subscriptions/api-client";
import { switchApiContext } from "../../services/api";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem, PricePointInfo } from "../../models/pricing-request";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { ContextualError } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";

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
      const fallbackIapId = process.env.FALLBACK_IAP_APPLE_ID;
      if (fallbackIapId) {
        iapId = fallbackIapId;
        logger.debug("Using fallback IAP ID", iapId);
        switchApiContext("fallback");
      } else {
        throw new ContextualError(
          `The selected in-app purchase is available locally but not created on App Store Connect yet. For pricing to work, it needs to be created first.
          You can do so by only providing the required fields which don't include prices.`,
          {
            appId,
            selectedItem,
          }
        );
      }
    }
    iapIdCache.set(idCacheKey, iapId);
  }

  const cacheKey = `iap:${iapId}:${territoryId}`;
  const cached = pricePointsCache.get(cacheKey);
  if (cached) return cached;

  const resp = await fetchIAPPricePoints(iapId, territoryId);
  switchApiContext("default");
  const points = extractPricePointInfoFromResponse(resp);
  pricePointsCache.set(cacheKey, points);
  return points;
}

async function fetchTerritoryPricePointsForSubscriptionOrOffer(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  const selectedKey = `${selectedItem.id}:${selectedItem.offerType || ""}`;
  const idCacheKey = `${appId}:${selectedKey}`;
  let subscriptionId = subscriptionIdCache.get(idCacheKey);

  if (!subscriptionId) {
    const groups = await fetchSubscriptionGroups(appId);
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
      const fallbackSubscriptionId = process.env.FALLBACK_SUBSCRIPTION_APPLE_ID;
      if (fallbackSubscriptionId) {
        subscriptionId = fallbackSubscriptionId;
        logger.debug("Using fallback subscription ID", subscriptionId);
        switchApiContext("fallback");
      } else {
        throw new ContextualError(
          `The selected subscription is available locally but not created on App Store Connect yet. For pricing to work, it needs to be created first.
          You can do so by only providing the required fields which don't include prices.`,
          {
            appId: appId,
            selectedItem,
          }
        );
      }
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
  switchApiContext("default");
  const points = extractPricePointInfoFromResponse(resp);
  pricePointsCache.set(cacheKey, points);
  return points;
}

export async function fetchTerritoryPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appId: string,
  territoryId: string
): Promise<PricePointInfo[]> {
  if (selectedItem.type === "app") {
    return fetchTerritoryPricePointsForApp(appId, territoryId);
  }

  if (selectedItem.type === "inAppPurchase") {
    return fetchTerritoryPricePointsForInAppPurchase(
      selectedItem,
      appId,
      territoryId
    );
  }

  return fetchTerritoryPricePointsForSubscriptionOrOffer(
    selectedItem,
    appId,
    territoryId
  );
}
