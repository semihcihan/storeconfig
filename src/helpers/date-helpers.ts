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
  const start = parseAppleDate(startDate);
  const end = parseAppleDate(endDate);

  // If no start date, price has always been active
  if (!start) {
    // If no end date, price is always active
    if (!end) return true;
    // Check if current date is before end date (exclusive)
    return currentDate < end;
  }

  // If no end date, price is active from start date onwards
  if (!end) {
    return currentDate >= start;
  }

  // Price is active between start date (inclusive) and end date (exclusive)
  // Special case: if start and end dates are the same, price is active only on that date
  if (start.getTime() === end.getTime()) {
    return currentDate.getTime() === start.getTime();
  }
  return currentDate >= start && currentDate < end;
}

/**
 * Compare two dates in YYYY-MM-DD format
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareAppleDates(
  date1: string | undefined,
  date2: string | undefined
): number {
  const parsed1 = parseAppleDate(date1);
  const parsed2 = parseAppleDate(date2);

  // Handle undefined dates (undefined means "always")
  if (!parsed1 && !parsed2) return 0;
  if (!parsed1) return -1; // undefined dates come first
  if (!parsed2) return 1;

  if (parsed1 < parsed2) return -1;
  if (parsed1 > parsed2) return 1;
  return 0;
}

/**
 * Get the most recent active price from a list of prices for the same territory
 * @param prices - Array of prices with startDate and endDate
 * @returns The most recent active price, or null if none are active
 */
export function getMostRecentActivePrice<
  T extends {
    startDate?: string | null;
    endDate?: string | null;
    territory: string;
    price: string;
  }
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

  // Sort by start date (undefined dates come first, then most recent first)
  activePrices.sort((a, b) => {
    // Convert null to undefined for comparison
    const aStartDate = a.startDate ?? undefined;
    const bStartDate = b.startDate ?? undefined;

    // If both have undefined start dates, they're equal
    if (!aStartDate && !bStartDate) return 0;
    // If only a has undefined start date, it comes first
    if (!aStartDate) return -1;
    // If only b has undefined start date, it comes first
    if (!bStartDate) return 1;
    // Both have start dates, compare them (most recent first)
    return compareAppleDates(bStartDate, aStartDate);
  });

  return activePrices[0];
}
