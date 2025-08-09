import * as readline from "readline";
import { logger } from "../../utils/logger";
import type { AppStoreModel } from "../../utils/validation-helpers";
import { fetchUsaPricePointsForSelectedItem } from "./price-point-fetcher";

export interface PricingItem {
  type: "app" | "inAppPurchase" | "subscription" | "offer";
  id: string;
  name: string;
  offerType?: string;
  parentName?: string;
}

function parsePriceInputToNumber(input: string): number | null {
  const trimmed = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  if (!isFinite(value) || value < 0) return null;
  return value;
}

function findNearestPrices(
  enteredPrice: number,
  availablePrices: string[],
  count: number
): string[] {
  const scored = availablePrices
    .map((p) => ({ price: p, diff: Math.abs(Number(p) - enteredPrice) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, Math.max(0, count))
    .map((s) => s.price);
  return scored;
}

export async function promptForBaseUsdPrice(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const availablePrices = await fetchUsaPricePointsForSelectedItem(
    selectedItem,
    appStoreState
  );

  if (!availablePrices.length) {
    throw new Error(
      "No available Apple price points found. This is unexpected. Please try again."
    );
  }

  return await new Promise((resolve) => {
    const ask = () => {
      rl.question(
        logger.prompt("Enter base price in USD (e.g., 5.99): "),
        (answer) => {
          const parsed = parsePriceInputToNumber(answer);
          if (parsed === null) {
            logger.error(
              "❌ Invalid format. Please enter a non-negative number with up to 2 decimals (e.g., 5.99)."
            );
            ask();
            return;
          }

          if (
            availablePrices.length &&
            !availablePrices.includes(parsed.toFixed(2))
          ) {
            const nearest = findNearestPrices(parsed, availablePrices, 20);
            logger.error(
              `❌ The price ${parsed.toFixed(
                2
              )} is not an available Apple price point.`
            );
            logger.info(
              `All available USD price points: ${availablePrices.join(", ")}`
            );
            if (nearest.length) {
              logger.info(
                `Closest ${nearest.length} prices: ${nearest.join(", ")}`
              );
            }
            ask();
            return;
          }

          rl.close();
          resolve(parsed);
        }
      );
    };
    ask();
  });
}
