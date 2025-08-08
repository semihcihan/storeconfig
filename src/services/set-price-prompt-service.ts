import { logger } from "../utils/logger";
import * as fs from "fs";
import * as readline from "readline";
import type { AppStoreModel } from "../utils/validation-helpers";

export interface InteractivePricingOptions {
  inputFile: string;
  appStoreState: AppStoreModel;
}

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

export interface PricingRequest {
  selectedItem: {
    type: "app" | "inAppPurchase" | "subscription" | "offer";
    id: string;
    name: string;
    offerType?: string;
  };
  basePrice: number;
  pricingStrategy: "apple" | "purchasingPower";
  minimumPrice?: number;
}

export interface PricingItem {
  type: "app" | "inAppPurchase" | "subscription" | "offer";
  id: string;
  name: string;
  offerType?: string;
  parentName?: string;
}

function collectPricingItems(appStoreState: AppStoreModel): PricingItem[] {
  const items: PricingItem[] = [];

  // Add app if it has pricing
  if (appStoreState.pricing) {
    items.push({
      type: "app",
      id: appStoreState.appId,
      name: `App (ID: ${appStoreState.appId})`,
    });
  }

  // Add in-app purchases
  if (appStoreState.inAppPurchases) {
    appStoreState.inAppPurchases.forEach((iap) => {
      items.push({
        type: "inAppPurchase",
        id: iap.productId,
        name: iap.referenceName,
      });
    });
  }

  // Add subscriptions and their offers
  if (appStoreState.subscriptionGroups) {
    appStoreState.subscriptionGroups.forEach((group) => {
      group.subscriptions.forEach((subscription) => {
        // Add the subscription itself
        items.push({
          type: "subscription",
          id: subscription.productId,
          name: subscription.referenceName,
        });

        // Add introductory offers
        if (subscription.introductoryOffers) {
          subscription.introductoryOffers.forEach((offer) => {
            items.push({
              type: "offer",
              id: subscription.productId,
              name: `${offer.type} Introductory Offer`,
              offerType: offer.type,
              parentName: subscription.referenceName,
            });
          });
        }

        // Add promotional offers
        if (subscription.promotionalOffers) {
          subscription.promotionalOffers.forEach((offer) => {
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

function displayItemSelection(items: PricingItem[]): void {
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

async function promptForItemSelection(
  items: PricingItem[]
): Promise<PricingItem> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    const askForSelection = () => {
      rl.question(
        logger.prompt(`Select an item (1-${items.length}): `),
        (answer) => {
          const selection = parseInt(answer.trim(), 10);

          if (isNaN(selection) || selection < 1 || selection > items.length) {
            logger.error(
              `❌ Invalid selection. Please enter a number between 1 and ${items.length}.`
            );
            displayItemSelection(items);
            askForSelection();
            return;
          }

          rl.close();
          resolve(items[selection - 1]);
        }
      );
    };

    askForSelection();
  });
}

async function selectPricingItem(
  appStoreState: AppStoreModel
): Promise<PricingItem> {
  const items = collectPricingItems(appStoreState);

  if (items.length === 0) {
    throw new Error(
      "No items available for pricing. Please ensure your input file contains items with pricing information."
    );
  }

  displayItemSelection(items);
  return await promptForItemSelection(items);
}

export async function startInteractivePricing(
  options: InteractivePricingOptions
): Promise<PricingRequest> {
  const { inputFile, appStoreState } = options;

  // Keep original content in memory for rollback
  const originalContent = fs.readFileSync(inputFile, "utf-8");

  try {
    const selectedItem = await selectPricingItem(appStoreState);

    logger.info(`✅ Selected: ${selectedItem.type} "${selectedItem.name}"`);

    // TODO: Step 3: Implement base price prompt
    // TODO: Step 4: Implement pricing strategy selection
    // TODO: Step 5: Implement minimum price prompt (conditional)

    // Temporary return for now - will be replaced with actual gathered data
    return {
      selectedItem: {
        type: selectedItem.type,
        id: selectedItem.id,
        name: selectedItem.name,
        offerType: selectedItem.offerType,
      },
      basePrice: 0,
      pricingStrategy: "apple",
    };
  } catch (error) {
    logger.error(`Interactive pricing failed`, error);

    // Restore original content from memory
    try {
      fs.writeFileSync(inputFile, originalContent);
      logger.info("Restored file from memory backup");
    } catch (restoreError) {
      logger.error(`Failed to restore from memory backup: ${restoreError}`);
    }

    throw error;
  }
}
