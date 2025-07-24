import { z } from "zod";
import { PriceSchema } from "../models/app-store";

type Price = z.infer<typeof PriceSchema>;

/**
 * Deep compare two objects, treating arrays as unordered sets
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns true if objects are equal, treating arrays as unordered
 */
export function deepEqualUnordered(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    const visited = new Array(b.length).fill(false);

    for (const itemA of a) {
      let found = false;
      for (let i = 0; i < b.length; i++) {
        if (!visited[i] && deepEqualUnordered(itemA, b[i])) {
          visited[i] = true;
          found = true;
          break;
        }
      }
      if (!found) return false;
    }

    return true;
  }

  if (a && b && typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqualUnordered(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
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
