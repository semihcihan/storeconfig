import { logger } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";
import {
  SubscriptionSchema,
  PromotionalOfferSchema,
  IntroductoryOfferSchema,
  BASE_TERRITORY,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  createPricingStrategy,
  type PricingStrategy,
  type TerritoryData,
} from "./pricing-strategy";
import type { PricingRequest } from "@semihcihan/shared";

type Subscription = z.infer<typeof SubscriptionSchema>;
type PromotionalOffer = z.infer<typeof PromotionalOfferSchema>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;

export interface ApplyPricingDependencies {
  loadCurrencies?: () => Promise<TerritoryData[]>;
}

export async function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  dependencies?: ApplyPricingDependencies
): Promise<AppStoreModel> {
  logger.debug(
    `Preparing pricing update in state. Item: ${pricingRequest.selectedItem.type} (${pricingRequest.selectedItem.name}), Strategy: ${pricingRequest.pricingStrategy}`
  );

  let currencies: TerritoryData[] | undefined;
  if (
    pricingRequest.pricingStrategy === "purchasingPower" &&
    dependencies?.loadCurrencies
  ) {
    currencies = await dependencies.loadCurrencies();
  }

  const strategy = createPricingStrategy(
    pricingRequest.pricingStrategy,
    currencies
  );
  return await applyPricingWithStrategy(
    appStoreState,
    pricingRequest,
    strategy
  );
}

async function applyPricingWithStrategy(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  strategy: PricingStrategy
): Promise<AppStoreModel> {
  const { selectedItem } = pricingRequest;

  switch (selectedItem.type) {
    case "app":
      return applyAppPricing(appStoreState, pricingRequest, strategy);
    case "inAppPurchase":
      return applyInAppPurchasePricing(appStoreState, pricingRequest, strategy);
    case "subscription":
      return applySubscriptionPricing(appStoreState, pricingRequest, strategy);
    case "offer":
      return applyOfferPricing(appStoreState, pricingRequest, strategy);
    default:
      const _never: never = selectedItem.type as never;
      throw new Error(`Unsupported item type: ${_never as any}`);
  }
}

async function applyAppPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  strategy: PricingStrategy
): Promise<AppStoreModel> {
  const { basePricePoint } = pricingRequest;
  const prices = await strategy.getPrices(pricingRequest, appStoreState);
  appStoreState.pricing = {
    baseTerritory: BASE_TERRITORY,
    prices,
  };
  return appStoreState;
}

async function applyInAppPurchasePricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  strategy: PricingStrategy
): Promise<AppStoreModel> {
  const { selectedItem, basePricePoint } = pricingRequest;

  if (
    !appStoreState.inAppPurchases ||
    appStoreState.inAppPurchases.length === 0
  ) {
    throw new Error("No in-app purchases found in the state");
  }

  const iapIndex = appStoreState.inAppPurchases.findIndex(
    (p) => p.productId === selectedItem.id
  );

  if (iapIndex === -1) {
    throw new Error(
      `In-app purchase with productId '${selectedItem.id}' not found`
    );
  }

  const prices = await strategy.getPrices(pricingRequest, appStoreState);
  appStoreState.inAppPurchases[iapIndex].pricing = {
    baseTerritory: BASE_TERRITORY,
    prices,
  };
  return appStoreState;
}

async function applySubscriptionPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  strategy: PricingStrategy
): Promise<AppStoreModel> {
  const { selectedItem, basePricePoint } = pricingRequest;

  const subscription = findSubscriptionInState(appStoreState, selectedItem.id);

  if (!subscription) {
    throw new Error(`Subscription with ID ${selectedItem.id} not found`);
  }

  const prices = await strategy.getPrices(pricingRequest, appStoreState);

  subscription.pricing = {
    baseTerritory: BASE_TERRITORY,
    prices,
  };

  return appStoreState;
}

async function applyOfferPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest,
  strategy: PricingStrategy
): Promise<AppStoreModel> {
  const { selectedItem, basePricePoint } = pricingRequest;

  const offerResult = findOfferInState(
    appStoreState,
    selectedItem.id,
    selectedItem.offerType
  );

  if (!offerResult) {
    throw new Error(`Offer with ID ${selectedItem.id} not found`);
  }

  const { offer } = offerResult;

  if (offer.type === "FREE_TRIAL") {
    throw new Error("FREE_TRIAL promotional offers do not support pricing");
  }

  const prices = await strategy.getPrices(pricingRequest, appStoreState);

  offer.pricing = {
    baseTerritory: BASE_TERRITORY,
    prices,
  };

  return appStoreState;
}

function findSubscriptionInState(
  appStoreState: AppStoreModel,
  subscriptionId: string
): Subscription | undefined {
  // Search through subscriptionGroups for the subscription
  for (const group of appStoreState.subscriptionGroups || []) {
    const subscription = group.subscriptions.find(
      (sub) => sub.productId === subscriptionId
    );
    if (subscription) {
      return subscription;
    }
  }
  return undefined;
}

function findOfferInState(
  appStoreState: AppStoreModel,
  id: string,
  offerType?: string
):
  | { subscription: Subscription; offer: PromotionalOffer | IntroductoryOffer }
  | undefined {
  // Search through subscriptionGroups for the offer
  for (const group of appStoreState.subscriptionGroups || []) {
    for (const subscription of group.subscriptions) {
      // Check promotional offers first (by ID)
      const promotionalOffer = subscription.promotionalOffers?.find(
        (o) => o.id === id
      );
      if (promotionalOffer) {
        return { subscription, offer: promotionalOffer };
      }

      // Check introductory offers (by subscription ID and offer type)
      if (subscription.productId === id && offerType) {
        const introductoryOffer = subscription.introductoryOffers?.find(
          (o) => o.type === offerType
        );
        if (introductoryOffer) {
          return { subscription, offer: introductoryOffer };
        }
      }
    }
  }
  return undefined;
}
