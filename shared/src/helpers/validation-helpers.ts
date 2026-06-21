import { z } from "zod";
import { readFileSync } from "fs";
import { ContextualError } from "./error-handling-helpers";

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

export function readJsonFile(filePath: string): any {
  const fileContent = readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(fileContent);
  } catch (jsonError) {
    throw new ContextualError(`❌ Invalid JSON format! ${filePath}`, {
      filePath,
      jsonError,
    });
  }
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

export function addUniqueLocaleIssues(
  items: Array<{ locale?: string }> | undefined,
  path: (string | number)[],
  ctx: z.RefinementCtx
): void {
  if (!items || items.length === 0) return;
  const seen = new Map<string, number[]>();
  items.forEach((item, index) => {
    const locale = item.locale;
    if (locale === undefined) return;
    if (!seen.has(locale)) seen.set(locale, []);
    seen.get(locale)!.push(index);
  });
  const duplicates = [...seen.entries()].filter(([, indices]) => indices.length > 1);
  for (const [locale, indices] of duplicates) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Duplicate locale '${locale}' (at indices ${indices.join(", ")}). Only one entry per locale is allowed.`,
      path,
    });
  }
}

export function addUniqueTerritoryIssues(
  items: Array<{ territory?: string }> | undefined,
  path: (string | number)[],
  ctx: z.RefinementCtx
): void {
  if (!items || items.length === 0) return;
  const seen = new Map<string, number[]>();
  items.forEach((item, index) => {
    const territory = item.territory;
    if (territory === undefined) return;
    if (!seen.has(territory)) seen.set(territory, []);
    seen.get(territory)!.push(index);
  });
  const duplicates = [...seen.entries()].filter(([, indices]) => indices.length > 1);
  for (const [territory, indices] of duplicates) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Duplicate territory '${territory}' (at indices ${indices.join(", ")}). Only one entry per territory is allowed.`,
      path,
    });
  }
}

/**
 * Validates AppStore model data with custom business logic
 * @param data - The AppStore model data to validate
 * @param ctx - The Zod refinement context
 */
export function validateAppStoreModelData(
  data: any,
  ctx: z.RefinementCtx
): void {
  addUniqueLocaleIssues(data.localizations, ["localizations"], ctx);
  if (
    data.primaryLocale &&
    data.localizations &&
    data.localizations.length > 0
  ) {
    const primaryLocaleExists = data.localizations.some(
      (loc: any) => loc.locale === data.primaryLocale
    );
    if (!primaryLocaleExists) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Primary locale '${data.primaryLocale}' must exist in the localizations array`,
        path: ["primaryLocale"],
      });
    }
  }
}
