import { z } from "zod";
import { PriceSchema } from "../models/app-store";

type Price = z.infer<typeof PriceSchema>;

/**
 * Compare two arrays of strings regardless of order
 * @param arr1 - First array of strings
 * @param arr2 - Second array of strings
 * @returns true if arrays contain the same elements regardless of order
 */
export function areStringArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((item, index) => item === sorted2[index]);
}

/**
 * Compare two arrays of Price objects regardless of order
 * @param arr1 - First array of Price objects
 * @param arr2 - Second array of Price objects
 * @returns true if arrays contain the same price objects regardless of order
 */
export function arePriceArraysEqual(arr1: Price[], arr2: Price[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort by territory for consistent comparison
  const sorted1 = [...arr1].sort((a, b) =>
    a.territory.localeCompare(b.territory)
  );
  const sorted2 = [...arr2].sort((a, b) =>
    a.territory.localeCompare(b.territory)
  );

  return sorted1.every(
    (price, index) =>
      price.territory === sorted2[index].territory &&
      price.price === sorted2[index].price
  );
}

/**
 * Deep compare two objects, treating arrays as unordered sets
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns true if objects are equal, treating arrays as unordered
 */
export function deepEqualUnordered(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }

  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (typeof obj1 !== "object") {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }

  if (Array.isArray(obj1)) {
    // Handle arrays based on their content type
    if (obj1.length !== obj2.length) {
      return false;
    }

    if (obj1.length === 0) {
      return true;
    }

    // Check if it's an array of strings (like availableTerritories)
    // Only treat as unordered if it's likely a territory list or similar
    if (typeof obj1[0] === "string") {
      // Check if this looks like a territory list (common territory codes)
      const territoryCodes = ["USA", "CAN", "GBR", "AUS", "DEU", "FRA", "JPN"];
      const isLikelyTerritoryList = obj1.some((item) =>
        territoryCodes.includes(item)
      );

      if (isLikelyTerritoryList) {
        return areStringArraysEqual(obj1, obj2);
      }

      // For other string arrays, maintain order
      return obj1.every((item, index) => item === obj2[index]);
    }

    // Check if it's an array of price objects
    if (
      obj1[0] &&
      typeof obj1[0] === "object" &&
      "territory" in obj1[0] &&
      "price" in obj1[0]
    ) {
      return arePriceArraysEqual(obj1, obj2);
    }

    // For other arrays, use regular comparison (maintain order)
    return obj1.every((item: any, index: number) => {
      const otherItem = obj2[index];
      if (typeof item === "object" && item !== null) {
        return deepEqualUnordered(item, otherItem);
      }
      return item === otherItem;
    });
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(
    (key) => keys2.includes(key) && deepEqualUnordered(obj1[key], obj2[key])
  );
}

/**
 * Validates if a product ID follows the correct format
 * Product ID can only contain alphanumeric characters, underscores, and periods
 * @param productId - The product ID to validate
 * @returns true if the product ID is valid, false otherwise
 */
export const isValidProductId = (productId: string): boolean => {
  // Product ID can only contain alphanumeric characters, underscores, and periods
  const productIdRegex = /^[a-zA-Z0-9._]+$/;
  return productIdRegex.test(productId);
};
