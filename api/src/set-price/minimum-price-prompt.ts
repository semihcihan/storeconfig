import * as readline from "readline";
import { logger } from "@semihcihan/shared";
import type { PricingStrategy } from "../models/pricing-request";

export async function promptForMinimumPrice(
  pricingStrategy: PricingStrategy,
  basePrice: string
): Promise<string | undefined> {
  if (pricingStrategy === "apple") {
    return undefined;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const separator = "=".repeat(50);
  const lines = [
    "Enter optional Minimum Price in USD so that no price is below this threshold.",
  ];
  logger.info(`\n${separator}\n${lines.join("\n")}\n${separator}`);

  return await new Promise((resolve) => {
    const ask = () => {
      rl.question(
        logger.prompt("Minimum price in USD (optional, press Enter to skip): "),
        (answer) => {
          const trimmed = String(answer ?? "").trim();

          if (trimmed === "") {
            rl.close();
            resolve(undefined);
            return;
          }

          const price = parseFloat(trimmed);

          if (isNaN(price) || price < 0) {
            logger.error(
              "❌ Invalid price. Please enter a non-negative number or press Enter to skip."
            );
            ask();
            return;
          }

          const basePriceNumber = parseFloat(basePrice);
          if (price >= basePriceNumber) {
            logger.error(
              `❌ Minimum price (${trimmed}) must be less than base price (${basePrice}). Please enter a lower value or press Enter to skip.`
            );
            ask();
            return;
          }

          rl.close();
          resolve(trimmed);
        }
      );
    };
    ask();
  });
}
