import { logger } from "@semihcihan/shared";
import * as fs from "fs";
import type { AppStoreModel } from "@semihcihan/shared";
import { selectPricingItem } from "../set-price/item-selection";
import { promptForBasePricePoint } from "../set-price/base-price/base-price-prompt";
import { promptForPricingStrategy } from "../set-price/strategy-prompt";
import { promptForMinimumPrice } from "../set-price/minimum-price-prompt";
import {
  SubscriptionSchema,
  PromotionalOfferSchema,
  IntroductoryOfferSchema,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  createPricingStrategy,
  type PricingStrategy,
  BASE_TERRITORY,
} from "./pricing-strategy";

type Subscription = z.infer<typeof SubscriptionSchema>;
type PromotionalOffer = z.infer<typeof PromotionalOfferSchema>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;

export interface InteractivePricingOptions {
  appStoreState: AppStoreModel;
  fetchTerritoryPricePointsForSelectedItem: (
    selectedItem: PricingItem,
    appId: string,
    territoryId: string
  ) => Promise<PricePointInfo[]>;
}

import type {
  PricingRequest,
  PricePointInfo,
  PricingItem,
} from "../models/pricing-request";

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { appStoreState, fetchTerritoryPricePointsForSelectedItem } = options;

  try {
    const selectedItem = await selectPricingItem(appStoreState);

    logger.info(`✅ Selected: ${selectedItem.type} "${selectedItem.name}"`);

    const basePricePoint = await promptForBasePricePoint(
      selectedItem,
      appStoreState,
      fetchTerritoryPricePointsForSelectedItem
    );
    const pricingStrategy = await promptForPricingStrategy();
    const minimumPrice = await promptForMinimumPrice(
      pricingStrategy,
      basePricePoint.price
    );

    return {
      appId: appStoreState.appId,
      selectedItem: {
        type: selectedItem.type,
        id: selectedItem.id,
        name: selectedItem.name,
        offerType: selectedItem.offerType,
      },
      basePricePoint,
      pricingStrategy,
      minimumPrice,
    };
  } catch (error) {
    logger.error(`Interactive pricing failed`, error);

    throw error;
  }
}

export async function applyPricing(
  appStoreState: AppStoreModel,
  pricingRequest: PricingRequest
): Promise<AppStoreModel> {
  logger.debug(
    `Preparing pricing update in state. Item: ${pricingRequest.selectedItem.type} (${pricingRequest.selectedItem.name}), Strategy: ${pricingRequest.pricingStrategy}`
  );

  const strategy = createPricingStrategy(pricingRequest.pricingStrategy);
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
  appStoreState.inAppPurchases[iapIndex].priceSchedule = {
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

  subscription.prices = prices;
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

  offer.prices = prices;
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
