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
import type { PricingItem } from "../../models/pricing-request";
import type { components } from "../../generated/app-store-connect-api";

type HasCustomerPrice = { attributes?: { customerPrice?: string | null } };
type PricePointResponseShape = { data?: HasCustomerPrice[] | null };

function extractCustomerPricesFromResponse(
  response:
    | PricePointResponseShape
    | components["schemas"]["AppPricePointsV3Response"]["data"]
    | components["schemas"]["InAppPurchasePricePointsResponse"]
    | components["schemas"]["SubscriptionPricePointsResponse"]
): string[] {
  if (!response || !Array.isArray((response as PricePointResponseShape).data)) {
    return [];
  }
  const dataArray = (response as PricePointResponseShape).data ?? [];
  const prices = dataArray
    .map((item) => item?.attributes?.customerPrice)
    .filter((p): p is string => typeof p === "string");
  const uniquePrices = Array.from(new Set(prices));
  return uniquePrices.sort((a, b) => Number(a) - Number(b));
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
): Promise<string[]> {
  const USA = "USA";
  const resp = await fetchAppPricePoints(appId, USA);
  return extractCustomerPricesFromResponse(resp);
}

export async function fetchUsaPricePointsForInAppPurchase(
  selectedItem: PricingItem,
  appId: string
): Promise<string[]> {
  const USA = "USA";
  const iaps = await fetchInAppPurchases(appId);
  const iapData = (iaps.data || []).find(
    (it) => it.attributes?.productId === selectedItem.id
  );
  const iapId = iapData?.id;
  if (!iapId) return [];
  const resp = await fetchIAPPricePoints(iapId, USA);
  return extractCustomerPricesFromResponse(resp);
}

export async function fetchUsaPricePointsForSubscriptionOrOffer(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<string[]> {
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
  return extractCustomerPricesFromResponse(resp);
}

export async function fetchUsaPricePointsForSelectedItem(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<string[]> {
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
