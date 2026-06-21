import inquirer from "inquirer";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem } from "@semihcihan/shared";
import { collectPricingItems, logger } from "@semihcihan/shared";

function formatItemType(type: PricingItem["type"]): string {
  switch (type) {
    case "inAppPurchase":
      return "In App Purchase";
    case "subscription":
      return "Subscription";
    case "offer":
      return "Offer";
    case "app":
      return "App";
  }
}

function formatOfferName(item: PricingItem): string {
  if (item.type !== "offer" || !item.offerType) {
    return `"${item.name}"`;
  }

  const offerType = item.offerType.replace(/_/g, " ").toLowerCase();
  const capitalizedOfferType =
    offerType.charAt(0).toUpperCase() + offerType.slice(1);

  return `"${capitalizedOfferType}" | belongs to "${item.parentName}"`;
}

async function promptForItemSelection(
  items: PricingItem[]
): Promise<PricingItem> {
  const choices = items.map((item, index) => {
    let displayName = `"${item.name}"`;
    if (item.type === "offer") {
      displayName = formatOfferName(item);
    }
    return {
      name: `${formatItemType(item.type)}: ${displayName} (ID: ${item.id})`,
      value: item,
    };
  });

  const { selectedItem } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedItem",
      message: "Select an item:",
      choices,
    },
  ]);

  const displayName =
    selectedItem.type === "offer"
      ? formatOfferName(selectedItem)
      : `"${selectedItem.name}"`;

  logger.info(
    `✅ Selected: ${formatItemType(selectedItem.type)}: ${displayName} (ID: ${
      selectedItem.id
    })`
  );

  return selectedItem;
}

export async function selectPricingItem(
  appStoreState: AppStoreModel,
  collect: (s: AppStoreModel) => PricingItem[] = collectPricingItems,
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
  return await prompt(items);
}
