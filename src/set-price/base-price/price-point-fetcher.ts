import { fetchAppPricePoints } from "../../domains/pricing/api-client";
import {
  fetchInAppPurchases,
  fetchIAPPricePoints,
} from "../../domains/in-app-purchases/api-client";
import {
  fetchAllSubscriptionPricePoints,
  fetchSubscriptionGroups,
} from "../../domains/subscriptions/api-client";
import type { AppStoreModel } from "../../utils/validation-helpers";
import type { PricingItem, PricePointInfo } from "../../models/pricing-request";
import type { components } from "../../generated/app-store-connect-api";

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

export async function fetchUsaPricePointsForApp(
  appId: string
): Promise<PricePointInfo[]> {
  const USA = "USA";
  const resp = await fetchAppPricePoints(appId, USA);
  return extractPricePointInfoFromResponse(resp);
}

export async function fetchUsaPricePointsForInAppPurchase(
  selectedItem: PricingItem,
  appId: string
): Promise<PricePointInfo[]> {
  const USA = "USA";
  const iaps = await fetchInAppPurchases(appId);
  const iapData = (iaps.data || []).find(
    (it) => it.attributes?.productId === selectedItem.id
  );
  const iapId = iapData?.id;
  if (!iapId) return [];
  const resp = await fetchIAPPricePoints(iapId, USA);
  return extractPricePointInfoFromResponse(resp);
}

export async function fetchUsaPricePointsForSubscriptionOrOffer(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<PricePointInfo[]> {
  const USA = "USA";
  const groups = await fetchSubscriptionGroups(appStoreState.appId);
  const included = groups.included || [];
  let targetSubscription: APISubscription | undefined;

  // Try by subscription productId directly first (works for subscriptions and intro offers)
  targetSubscription = included.find(
    (inc): inc is APISubscription =>
      isAPISubscription(inc) && inc.attributes?.productId === selectedItem.id
  );

  if (!targetSubscription && selectedItem.type === "offer") {
    // For promotional offers, find the subscription that contains this offer id in current state
    const parentProductId = appStoreState.subscriptionGroups
      ?.flatMap((g) => g.subscriptions)
      .find((s) =>
        s.promotionalOffers?.some((o) => o.id === selectedItem.id)
      )?.productId;

    if (parentProductId) {
      targetSubscription = included.find(
        (inc): inc is APISubscription =>
          isAPISubscription(inc) &&
          inc.attributes?.productId === parentProductId
      );
    }
  }

  const subscriptionId = targetSubscription?.id;
  if (!subscriptionId) return [];
  const resp = await fetchAllSubscriptionPricePoints(subscriptionId, USA);
  return extractPricePointInfoFromResponse(resp);
}

export async function fetchUsaPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<PricePointInfo[]> {
  if (selectedItem.type === "app") {
    return fetchUsaPricePointsForApp(appStoreState.appId);
  }

  if (selectedItem.type === "inAppPurchase") {
    return fetchUsaPricePointsForInAppPurchase(
      selectedItem,
      appStoreState.appId
    );
  }

  return fetchUsaPricePointsForSubscriptionOrOffer(selectedItem, appStoreState);
}
