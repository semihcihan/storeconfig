import { logger } from "../utils/logger";
import * as fs from "fs";
import type { AppStoreModel } from "../utils/validation-helpers";
import { selectPricingItem } from "../set-price/item-selection";
import { promptForBasePricePoint } from "../set-price/base-price/base-price-prompt";
import { promptForPricingStrategy } from "../set-price/strategy-prompt";
import {
  SubscriptionSchema,
  PromotionalOfferSchema,
  IntroductoryOfferSchema,
} from "../models/app-store";
import { z } from "zod";
import {
  createPricingStrategy,
  type PricingStrategy,
} from "./pricing-strategy";

type Subscription = z.infer<typeof SubscriptionSchema>;
type PromotionalOffer = z.infer<typeof PromotionalOfferSchema>;
type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;

export interface InteractivePricingOptions {
  inputFile: string;
  appStoreState: AppStoreModel;
}

import type { PricingRequest } from "../models/pricing-request";
import { PriceScheduleSchema } from "../models/app-store";

export function pricingItemsExist(appStoreState: AppStoreModel): void {
  // Check if file contains at least one item
  const hasItems =
    (appStoreState.inAppPurchases && appStoreState.inAppPurchases.length > 0) ||
    (appStoreState.subscriptionGroups &&
      appStoreState.subscriptionGroups.length > 0);

  if (!hasItems) {
    throw new Error(
      "Input file must contain at least one item (app, in-app purchase, or subscription)"
    );
  }
}

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { inputFile, appStoreState } = options;

  const originalContent = fs.readFileSync(inputFile, "utf-8");

  try {
    const selectedItem = await selectPricingItem(appStoreState);

    logger.info(`✅ Selected: ${selectedItem.type} "${selectedItem.name}"`);

    const basePricePoint = await promptForBasePricePoint(
      selectedItem,
      appStoreState
    );
    const pricingStrategy = await promptForPricingStrategy();
    // TODO: Step 5: Implement minimum price prompt (conditional)

    return {
      selectedItem: {
        type: selectedItem.type,
        id: selectedItem.id,
        name: selectedItem.name,
        offerType: selectedItem.offerType,
      },
      basePricePoint,
      pricingStrategy,
    };
  } catch (error) {
    logger.error(`Interactive pricing failed`, error);

    try {
      fs.writeFileSync(inputFile, originalContent);
      logger.info("Restored file from memory backup");
    } catch (restoreError) {
      logger.error(`Failed to restore from memory backup: ${restoreError}`);
    }

    throw error;
  }
}

type PriceSchedule = z.infer<typeof PriceScheduleSchema>;

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
  const schedule = strategy.buildPriceSchedule(basePricePoint.price);
  appStoreState.pricing = schedule;
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

  const schedule = strategy.buildPriceSchedule(basePricePoint.price);
  appStoreState.inAppPurchases[iapIndex].priceSchedule = schedule;
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

  const prices = await strategy.buildSubscriptionPrices(basePricePoint.id);

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

  const prices = await strategy.buildSubscriptionPrices(basePricePoint.id);

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
