import inquirer from "inquirer";
import { logger } from "@semihcihan/shared";
import type { PricingStrategy } from "@semihcihan/shared";

export async function promptForMinimumPrice(
  pricingStrategy: PricingStrategy,
  basePrice: string
): Promise<string | undefined> {
  if (pricingStrategy === "apple") {
    return undefined;
  }

  const separator = "=".repeat(50);
  const lines = [
    "Enter optional Minimum Price in USD so that no price is below this threshold.",
  ];
  logger.info(`\n${separator}\n${lines.join("\n")}\n${separator}`);

  const validateMinimumPrice = (input: string): boolean | string => {
    const trimmed = input.trim();

    if (trimmed === "") {
      return true;
    }

    const price = parseFloat(trimmed);

    if (isNaN(price) || price < 0) {
      return "❌ Invalid price. Please enter a non-negative number or press Enter to skip.";
    }

    const basePriceNumber = parseFloat(basePrice);
    if (price >= basePriceNumber) {
      return `❌ Minimum price (${trimmed}) must be less than base price (${basePrice}). Please enter a lower value or press Enter to skip.`;
    }

    return true;
  };

  const { minimumPrice } = await inquirer.prompt([
    {
      type: "input",
      name: "minimumPrice",
      message: "Minimum price in USD (optional, press Enter to skip):",
      validate: validateMinimumPrice,
    },
  ]);

  const trimmed = minimumPrice.trim();
  return trimmed === "" ? undefined : trimmed;
}
