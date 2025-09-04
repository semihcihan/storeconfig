import * as readline from "readline";
import { logger } from "../utils/logger";
import type { AppStoreModel } from "../models/app-store";
import type { PricingItem } from "../models/pricing-request";

export function collectPricingItems(
  appStoreState: AppStoreModel
): PricingItem[] {
  const items: PricingItem[] = [];

  items.push({
    type: "app",
    id: appStoreState.appId,
    name: "App",
  });

  if (appStoreState.inAppPurchases) {
    appStoreState.inAppPurchases.forEach((iap) => {
      items.push({
        type: "inAppPurchase",
        id: iap.productId,
        name: iap.referenceName,
      });
    });
  }

  if (appStoreState.subscriptionGroups) {
    appStoreState.subscriptionGroups.forEach((group) => {
      group.subscriptions.forEach((subscription) => {
        items.push({
          type: "subscription",
          id: subscription.productId,
          name: subscription.referenceName,
        });

        if (subscription.introductoryOffers) {
          subscription.introductoryOffers
            .filter((offer) => offer.type !== "FREE_TRIAL")
            .forEach((offer) => {
              items.push({
                type: "offer",
                id: subscription.productId,
                name: `${offer.type} Introductory Offer`,
                offerType: offer.type,
                parentName: subscription.referenceName,
              });
            });
        }

        if (subscription.promotionalOffers) {
          subscription.promotionalOffers
            .filter((offer) => offer.type !== "FREE_TRIAL")
            .forEach((offer) => {
              items.push({
                type: "offer",
                id: offer.id,
                name: `${offer.type} Promotional Offer`,
                offerType: offer.type,
                parentName: subscription.referenceName,
              });
            });
        }
      });
    });
  }

  return items;
}

export function displayItemSelection(items: PricingItem[]): void {
  const separator = "=".repeat(50);
  const itemLines = items.map((item, index) => {
    const itemNumber = index + 1;
    let displayName = item.name;
    if (item.type === "offer") {
      displayName = `${item.name} - belongs to "${item.parentName}"`;
    }
    return `${itemNumber}. ${
      item.type.charAt(0).toUpperCase() + item.type.slice(1)
    }: "${displayName}" (ID: ${item.id})`;
  });

  const displayText = `\n📋 Available items for pricing:\n${separator}\n${itemLines.join(
    "\n"
  )}\n${separator}`;
  logger.info(displayText);
}

export async function promptForItemSelection(
  items: PricingItem[]
): Promise<PricingItem> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return await new Promise((resolve) => {
    const ask = () => {
      rl.question(
        logger.prompt(`Select an item (1-${items.length}): `),
        (answer) => {
          const selection = parseInt(answer.trim(), 10);
          if (isNaN(selection) || selection < 1 || selection > items.length) {
            logger.error(
              `❌ Invalid selection. Please enter a number between 1 and ${items.length}.`
            );
            displayItemSelection(items);
            ask();
            return;
          }
          rl.close();
          resolve(items[selection - 1]);
        }
      );
    };
    ask();
  });
}

export async function selectPricingItem(
  appStoreState: AppStoreModel,
  collect: (s: AppStoreModel) => PricingItem[] = collectPricingItems,
  display: (items: PricingItem[]) => void = displayItemSelection,
  prompt: (
    items: PricingItem[]
  ) => Promise<PricingItem> = promptForItemSelection
): Promise<PricingItem> {
  const items = collect(appStoreState);
  if (items.length === 0) {
    throw new Error(
      "No items available for pricing. Please ensure the app contains items with pricing information (app, in-app purchase, or subscription)."
    );
  }
  display(items);
  return await prompt(items);
}
