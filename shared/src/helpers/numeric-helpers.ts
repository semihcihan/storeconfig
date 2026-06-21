/**
 * Compare two numeric values represented as strings, handling different decimal precision
 * @param value1 - First numeric value as string
 * @param value2 - Second numeric value as string
 * @returns true if the numeric values are equal, false otherwise
 */
export function compareNumericValues(
  value1: string | undefined | null,
  value2: string | undefined | null
): boolean {
  // Handle null/undefined cases
  if (value1 === null || value1 === undefined) {
    return value2 === null || value2 === undefined;
  }
  if (value2 === null || value2 === undefined) {
    return false;
  }

  // Convert to numbers and compare
  const num1 = parseFloat(value1);
  const num2 = parseFloat(value2);

  // Check for NaN cases
  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }

  return num1 === num2;
}
