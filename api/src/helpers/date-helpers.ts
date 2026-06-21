const DEFAULT_START_DATE = new Date(2000, 0, 1);
const DEFAULT_END_DATE = new Date(3000, 0, 1);

/**
 * Parse a date string in YYYY-MM-DD format to a Date object
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object or null if invalid
 */
export function parseAppleDate(dateString: string | undefined): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Get the current date at midnight UTC for consistent date comparisons
 * @returns Current date at midnight UTC
 */
export function getCurrentDate(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

/**
 * Get tomorrow's date in YYYY-MM-DD format
 * @returns Tomorrow's date in YYYY-MM-DD format
 */
export function getTomorrowAppleString(): string {
  const tomorrow = new Date(getCurrentDate());
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

/**
 * Check if a price is currently active based on its start and end dates
 * @param startDate - Start date string in YYYY-MM-DD format (undefined means always active)
 * @param endDate - End date string in YYYY-MM-DD format (undefined means always active, exclusive end date)
 * @returns true if the price is currently active
 */
export function isPriceCurrentlyActive(
  startDate: string | undefined,
  endDate: string | undefined
): boolean {
  const currentDate = getCurrentDate();

  // Parse dates
  const start = parseAppleDate(startDate) ?? DEFAULT_START_DATE;
  const end = parseAppleDate(endDate) ?? DEFAULT_END_DATE;

  // Price is active between start date (inclusive) and end date (exclusive)
  // Special case: if start and end dates are the same, price is active only on that date
  if (start.getTime() === end.getTime()) {
    return isSameDate(currentDate, start);
  }
  return currentDate >= start && currentDate < end;
}

/**
 * Compare two dates in YYYY-MM-DD format
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareStartDates(
  date1: string | undefined,
  date2: string | undefined
): number {
  const parsed1 = parseAppleDate(date1) ?? DEFAULT_START_DATE;
  const parsed2 = parseAppleDate(date2) ?? DEFAULT_START_DATE;

  if (parsed1 < parsed2) return -1;
  if (parsed1 > parsed2) return 1;
  return 0;
}

/**
 * Get the most recent active price from a list of prices for the same territory
 * @param prices - Array of prices with startDate and endDate
 * @returns The most recent active price, or null if none are active
 */
// TODO: bug
export function getMostRecentActivePrice<
  T extends {
    startDate?: string | null;
    endDate?: string | null;
    territory: string;
    price: string;
  },
>(prices: T[]): T | null {
  if (prices.length === 0) return null;

  // Filter to only currently active prices
  const activePrices = prices.filter((price) => {
    // Convert null to undefined for compatibility with isPriceCurrentlyActive
    const startDate = price.startDate ?? undefined;
    const endDate = price.endDate ?? undefined;
    return isPriceCurrentlyActive(startDate, endDate);
  });

  if (activePrices.length === 0) return null;
  // Sort by start date most recent first
  activePrices.sort((a, b) => {
    // Convert null to undefined for comparison
    const aStartDate = a.startDate ?? undefined;
    const bStartDate = b.startDate ?? undefined;

    return compareStartDates(bStartDate, aStartDate);
  });

  return activePrices[0];
}
