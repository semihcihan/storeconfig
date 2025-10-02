import inquirer from "inquirer";
import { logger } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem } from "@semihcihan/shared";
import { collectPricingItems } from "@semihcihan/shared";

async function promptForItemSelection(
  items: PricingItem[]
): Promise<PricingItem> {
  const choices = items.map((item, index) => {
    let displayName = item.name;
    if (item.type === "offer") {
      displayName = `${item.name} - belongs to "${item.parentName}"`;
    }
    return {
      name: `${
        item.type.charAt(0).toUpperCase() + item.type.slice(1)
      }: "${displayName}" (ID: ${item.id})`,
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
