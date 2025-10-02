import inquirer from "inquirer";
import { logger } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem, PricePointInfo } from "@semihcihan/shared";
import { BASE_TERRITORY } from "@semihcihan/shared";

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
  appStoreState: AppStoreModel,
  fetchTerritoryPricePointsForSelectedItem: (
    selectedItem: PricingItem,
    appId: string,
    territoryId: string
  ) => Promise<PricePointInfo[]>
): Promise<PricePointInfo> {
  let availablePricePoints: PricePointInfo[];

  availablePricePoints = await fetchTerritoryPricePointsForSelectedItem(
    selectedItem,
    appStoreState.appId,
    BASE_TERRITORY
  );

  // Normalize available price points to two decimals for robust comparison (e.g., "4.0" → "4.00")
  const normalizedAvailablePricePoints = Array.from(
    new Set(
      (availablePricePoints || [])
        .map((p: PricePointInfo) => ({ id: p.id, price: Number(p.price) }))
        .filter(
          (p: { id: string; price: number }) =>
            Number.isFinite(p.price) && p.price >= 0
        )
        .map((p: { id: string; price: number }) => ({
          id: p.id,
          price: p.price.toFixed(2),
        }))
    )
  ).sort(
    (a: { id: string; price: string }, b: { id: string; price: string }) =>
      Number(a.price) - Number(b.price)
  );

  if (!availablePricePoints.length) {
    throw new Error(
      "No available Apple price points found. This is unexpected. Please try again."
    );
  }

  const validatePrice = (input: string): boolean | string => {
    const parsed = parsePriceInputToNumber(input);
    if (parsed === null) {
      return "❌ Invalid format. Please enter a non-negative number with up to 2 decimals (e.g., 5.99).";
    }

    const canonical = parsed.toFixed(2);
    if (
      normalizedAvailablePricePoints.length &&
      !normalizedAvailablePricePoints.some((p) => p.price === canonical)
    ) {
      const nearest = findNearestPrices(
        parsed,
        normalizedAvailablePricePoints.map(
          (p: { id: string; price: string }) => p.price
        ),
        20
      );
      let errorMessage = `❌ The price ${canonical} is not an available Apple price.`;
      if (nearest.length) {
        errorMessage += `\nClosest available prices:\n${nearest.join(" | ")}`;
      }
      return errorMessage;
    }

    return true;
  };

  const { price } = await inquirer.prompt([
    {
      type: "input",
      name: "price",
      message: "Enter base price in USD (e.g., 5.99):",
      validate: validatePrice,
    },
  ]);

  const parsed = parsePriceInputToNumber(price);
  const canonical = parsed!.toFixed(2);
  const selectedNormalizedPricePoint = normalizedAvailablePricePoints.find(
    (p: { id: string; price: string }) => p.price === canonical
  );
  const selectedPricePoint = availablePricePoints.find(
    (p: PricePointInfo) => p.id === selectedNormalizedPricePoint?.id
  );

  if (selectedPricePoint) {
    return selectedPricePoint;
  } else {
    throw new Error(`Price point not found for price ${canonical}`);
  }
}
