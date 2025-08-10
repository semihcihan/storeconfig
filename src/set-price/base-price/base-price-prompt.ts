import * as readline from "readline";
import { logger } from "../../utils/logger";
import type { AppStoreModel } from "../../utils/validation-helpers";
import { fetchUsaPricePointsForSelectedItem } from "./price-point-fetcher";
import type { PricingItem, PricePointInfo } from "../../models/pricing-request";

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
  const nearest = availablePrices
    .map((p) => ({ price: p, diff: Math.abs(Number(p) - enteredPrice) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, Math.max(0, count))
    .map((s) => s.price);
  // Ensure output is ordered ascending numerically for clearer UX
  return nearest.sort((a, b) => Number(a) - Number(b));
}

export async function promptForBasePricePoint(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel
): Promise<PricePointInfo> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const availablePricePoints = await fetchUsaPricePointsForSelectedItem(
    selectedItem,
    appStoreState
  );

  // Normalize available prices to two decimals for robust comparison (e.g., "4.0" → "4.00")
  const normalizedAvailablePrices = Array.from(
    new Set(
      (availablePricePoints || [])
        .map((p) => Number(p.price))
        .filter((n) => Number.isFinite(n) && n >= 0)
        .map((n) => n.toFixed(2))
    )
  ).sort((a, b) => Number(a) - Number(b));

  if (!availablePricePoints.length) {
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

          const canonical = parsed.toFixed(2);
          if (
            normalizedAvailablePrices.length &&
            !normalizedAvailablePrices.includes(canonical)
          ) {
            const nearest = findNearestPrices(
              parsed,
              normalizedAvailablePrices,
              20
            );
            logger.error(
              `❌ The price ${canonical} is not an available Apple price.`
            );
            if (nearest.length) {
              logger.info(`Closest available prices:\n${nearest.join(" | ")}`);
            }
            ask();
            return;
          }

          rl.close();
          const selectedPricePoint = availablePricePoints.find(
            (p) => p.price === canonical
          );
          if (selectedPricePoint) {
            resolve(selectedPricePoint);
          } else {
            // This shouldn't happen since we validated the price, but handle it gracefully
            throw new Error(`Price point not found for price ${canonical}`);
          }
        }
      );
    };
    ask();
  });
}
