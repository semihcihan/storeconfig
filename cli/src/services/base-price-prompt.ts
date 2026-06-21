import inquirer from "inquirer";
import { findNearestPrices } from "@semihcihan/shared";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem, PricePointInfo } from "@semihcihan/shared";
import { BASE_TERRITORY } from "@semihcihan/shared";
import type { Ora } from "ora";

function parsePriceInputToNumber(input: string): number | null {
  const trimmed = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  if (!isFinite(value) || value < 0) return null;
  return value;
}

export async function promptForBasePricePoint(
  selectedItem: PricingItem,
  appStoreState: AppStoreModel,
  fetchTerritoryPricePointsForSelectedItem: (
    selectedItem: PricingItem,
    appId: string,
    territoryId: string
  ) => Promise<PricePointInfo[]>,
  spinner?: Ora
): Promise<PricePointInfo> {
  let availablePricePoints: PricePointInfo[];

  if (spinner) {
    spinner.start("Fetching available price points...");
  }

  availablePricePoints = await fetchTerritoryPricePointsForSelectedItem(
    selectedItem,
    appStoreState.appId,
    BASE_TERRITORY
  );

  if (spinner) {
    spinner.stop();
  }

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

  if (!availablePricePoints || !availablePricePoints.length) {
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

  // Match by normalized price - convert API price to canonical format for comparison
  // This handles cases where API returns "3.0" but user enters "3" (normalized to "3.00")
  const selectedPricePoint = availablePricePoints.find((p: PricePointInfo) => {
    const apiPriceParsed = parsePriceInputToNumber(p.price);
    if (apiPriceParsed === null) return false;
    const apiPriceCanonical = apiPriceParsed.toFixed(2);
    return apiPriceCanonical === canonical;
  });

  if (selectedPricePoint) {
    return selectedPricePoint;
  } else {
    throw new Error(`Price point not found for price ${canonical}`);
  }
}
