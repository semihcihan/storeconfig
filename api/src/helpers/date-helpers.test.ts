import {
  parseAppleDate,
  getCurrentDate,
  getTomorrowAppleString,
  isPriceCurrentlyActive,
  compareStartDates,
  getMostRecentActivePrice,
} from "./date-helpers";

describe("Date Helpers", () => {
  const mockCurrentDate = new Date("2024-06-15T00:00:00.000Z");

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockCurrentDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  describe("parseAppleDate", () => {
    it("should parse valid YYYY-MM-DD dates", () => {
      const date = parseAppleDate("2024-01-15");
      expect(date).toBeInstanceOf(Date);
      expect(date?.getFullYear()).toBe(2024);
      expect(date?.getMonth()).toBe(0); // January is 0
      expect(date?.getDate()).toBe(15);
    });

    it("should return null for undefined input", () => {
      expect(parseAppleDate(undefined)).toBeNull();
    });

    it("should return null for invalid date strings", () => {
      expect(parseAppleDate("invalid-date")).toBeNull();
      expect(parseAppleDate("2024-13-45")).toBeNull();
    });

    it("should handle edge cases", () => {
      expect(parseAppleDate("")).toBeNull();
      expect(parseAppleDate("2024-02-29")).toBeInstanceOf(Date); // Leap year
    });
  });

  describe("getCurrentDate", () => {
    it("should return a Date object", () => {
      const currentDate = getCurrentDate();
      expect(currentDate).toBeInstanceOf(Date);
    });

    it("should return date at midnight UTC", () => {
      const currentDate = getCurrentDate();
      expect(currentDate.getUTCHours()).toBe(0);
      expect(currentDate.getUTCMinutes()).toBe(0);
      expect(currentDate.getUTCSeconds()).toBe(0);
      expect(currentDate.getUTCMilliseconds()).toBe(0);
    });

    it("should return the correct date regardless of time", () => {
      const currentDate = getCurrentDate();
      expect(currentDate.getUTCFullYear()).toBe(2024);
      expect(currentDate.getUTCMonth()).toBe(5); // June is 5
      expect(currentDate.getUTCDate()).toBe(15);
    });
  });

  describe("getTomorrowAppleString", () => {
    it("should return a string in YYYY-MM-DD format", () => {
      const dateString = getTomorrowAppleString();
      expect(typeof dateString).toBe("string");
      expect(dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should return tomorrow's date for the mocked date", () => {
      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2024-06-16"); // June 15 + 1 day = June 16
    });

    it("should handle end of month correctly", () => {
      // Test with January 31st
      const jan31Date = new Date("2024-01-31T12:00:00.000Z");
      jest.setSystemTime(jan31Date);
      jest.spyOn(require("./date-helpers"), "getCurrentDate").mockReturnValue(
        new Date(Date.UTC(2024, 0, 31)) // January 31, 2024
      );

      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2024-02-01"); // Should roll over to February 1st

      // Reset to original mock date
      jest.setSystemTime(mockCurrentDate);
      jest.restoreAllMocks();
    });

    it("should handle end of year correctly", () => {
      // Test with December 31st
      const dec31Date = new Date("2024-12-31T12:00:00.000Z");
      jest.setSystemTime(dec31Date);
      jest.spyOn(require("./date-helpers"), "getCurrentDate").mockReturnValue(
        new Date(Date.UTC(2024, 11, 31)) // December 31, 2024
      );

      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2025-01-01"); // Should roll over to January 1st of next year

      // Reset to original mock date
      jest.setSystemTime(mockCurrentDate);
      jest.restoreAllMocks();
    });

    it("should handle February 28th in non-leap year correctly", () => {
      // Test with February 28th, 2023 (not a leap year)
      const feb28Date = new Date("2023-02-28T12:00:00.000Z");
      jest.setSystemTime(feb28Date);
      jest.spyOn(require("./date-helpers"), "getCurrentDate").mockReturnValue(
        new Date(Date.UTC(2023, 1, 28)) // February 28, 2023
      );

      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2023-03-01"); // Should roll over to March 1st

      // Reset to original mock date
      jest.setSystemTime(mockCurrentDate);
      jest.restoreAllMocks();
    });

    it("should handle February 29th in leap year correctly", () => {
      // Test with February 29th, 2024 (leap year)
      const feb29Date = new Date("2024-02-29T12:00:00.000Z");
      jest.setSystemTime(feb29Date);
      jest.spyOn(require("./date-helpers"), "getCurrentDate").mockReturnValue(
        new Date(Date.UTC(2024, 1, 29)) // February 29, 2024
      );

      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2024-03-01"); // Should roll over to March 1st

      // Reset to original mock date
      jest.setSystemTime(mockCurrentDate);
      jest.restoreAllMocks();
    });

    it("should handle months with 30 days correctly", () => {
      // Test with April 30th
      const apr30Date = new Date("2024-04-30T12:00:00.000Z");
      jest.setSystemTime(apr30Date);
      jest.spyOn(require("./date-helpers"), "getCurrentDate").mockReturnValue(
        new Date(Date.UTC(2024, 3, 30)) // April 30, 2024
      );

      const dateString = getTomorrowAppleString();
      expect(dateString).toBe("2024-05-01"); // Should roll over to May 1st

      // Reset to original mock date
      jest.setSystemTime(mockCurrentDate);
      jest.restoreAllMocks();
    });

    it("should return date string in UTC timezone", () => {
      const dateString = getTomorrowAppleString();
      const date = new Date(dateString + "T00:00:00.000Z");
      expect(date.getUTCFullYear()).toBe(2024);
      expect(date.getUTCMonth()).toBe(5); // June is 5
      expect(date.getUTCDate()).toBe(16);
    });

    it("should be exactly one day after getCurrentDate", () => {
      const currentDate = getCurrentDate();
      const tomorrowDateString = getTomorrowAppleString();

      const tomorrowDate = new Date(tomorrowDateString + "T00:00:00.000Z");

      const diffInMs = tomorrowDate.getTime() - currentDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      expect(diffInDays).toBe(1);
    });
  });

  describe("isPriceCurrentlyActive", () => {
    it("should return true when no dates are provided (always active)", () => {
      expect(isPriceCurrentlyActive(undefined, undefined)).toBe(true);
    });

    it("should return true when only startDate is provided and current date is after start", () => {
      expect(isPriceCurrentlyActive("2024-01-01", undefined)).toBe(true);
    });

    it("should return false when only startDate is provided and current date is before start", () => {
      expect(isPriceCurrentlyActive("2024-12-01", undefined)).toBe(false);
    });

    it("should return true when only endDate is provided and current date is before end", () => {
      expect(isPriceCurrentlyActive(undefined, "2024-12-01")).toBe(true);
    });

    it("should return false when only endDate is provided and current date is after end", () => {
      expect(isPriceCurrentlyActive(undefined, "2024-01-01")).toBe(false);
    });

    it("should return true when current date is between start and end dates", () => {
      expect(isPriceCurrentlyActive("2024-01-01", "2024-12-31")).toBe(true);
    });

    it("should return true when current date equals start date", () => {
      expect(isPriceCurrentlyActive("2024-06-15", "2024-12-31")).toBe(true);
    });

    it("should return false when current date equals end date", () => {
      expect(isPriceCurrentlyActive("2024-01-01", "2024-06-15")).toBe(false);
    });

    it("should return false when current date is before start date", () => {
      expect(isPriceCurrentlyActive("2024-12-01", "2024-12-31")).toBe(false);
    });

    it("should return false when current date is after end date", () => {
      expect(isPriceCurrentlyActive("2024-01-01", "2024-01-31")).toBe(false);
    });

    it("should handle edge case where start and end dates are the same", () => {
      expect(isPriceCurrentlyActive("2024-06-15", "2024-06-15")).toBe(true);
    });
  });

  describe("compareAppleDates", () => {
    it("should return 0 for equal dates", () => {
      expect(compareStartDates("2024-01-01", "2024-01-01")).toBe(0);
      expect(compareStartDates(undefined, undefined)).toBe(0);
    });

    it("should return -1 when first date is earlier", () => {
      expect(compareStartDates("2024-01-01", "2024-01-02")).toBe(-1);
      expect(compareStartDates("2023-12-31", "2024-01-01")).toBe(-1);
    });

    it("should return 1 when first date is later", () => {
      expect(compareStartDates("2024-01-02", "2024-01-01")).toBe(1);
      expect(compareStartDates("2024-12-31", "2024-01-01")).toBe(1);
    });

    it("should handle undefined dates (undefined comes first)", () => {
      expect(compareStartDates(undefined, "2024-01-01")).toBe(-1);
      expect(compareStartDates("2024-01-01", undefined)).toBe(1);
    });

    it("should handle mixed undefined and valid dates", () => {
      expect(compareStartDates("2024-01-01", undefined)).toBe(1);
      expect(compareStartDates(undefined, "2024-01-01")).toBe(-1);
    });
  });

  describe("getMostRecentActivePrice", () => {
    it("should return null for empty array", () => {
      expect(getMostRecentActivePrice([])).toBeNull();
    });

    it("should return the only active price", () => {
      const prices = [
        {
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          price: "9.99",
          territory: "USA",
        },
      ];
      expect(getMostRecentActivePrice(prices)).toEqual(prices[0]);
    });

    it("should return the most recent active price when multiple are active", () => {
      const prices = [
        {
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          price: "9.99",
          territory: "GBR",
        },
        {
          startDate: "2024-06-01",
          endDate: "2024-12-31",
          price: "12.99",
          territory: "USA",
        },
        {
          startDate: "2024-03-01",
          endDate: "2024-12-31",
          price: "10.99",
          territory: "CAN",
        },
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("12.99");
    });

    it("should filter out inactive prices", () => {
      const prices = [
        {
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          price: "9.99",
          territory: "USA",
        }, // Past
        {
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          price: "12.99",
          territory: "GBR",
        }, // Future
        {
          startDate: "2024-06-01",
          endDate: "2024-12-31",
          price: "10.99",
          territory: "CAN",
        }, // Active
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("10.99");
    });

    it("should handle prices with undefined dates (always active)", () => {
      const prices = [
        {
          startDate: undefined,
          endDate: undefined,
          price: "9.99",
          territory: "USA",
        },
        {
          startDate: "2024-06-01",
          endDate: "2024-12-31",
          price: "12.99",
          territory: "GBR",
        },
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("12.99"); // closer to current date comes first
    });

    it("should pick the price with the closest start date", () => {
      const prices = [
        {
          startDate: undefined,
          endDate: undefined,
          price: "9.99",
          territory: "USA",
        },
        {
          startDate: "2024-06-01",
          endDate: "undefined",
          price: "12.99",
          territory: "GBR",
        },
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("12.99"); // closer to current date comes first
    });

    it("should pick the price with the closest start date excluding future prices", () => {
      const prices = [
        {
          startDate: undefined,
          endDate: undefined,
          price: "9.99",
          territory: "USA",
        },
        {
          startDate: "2024-06-01",
          endDate: "undefined",
          price: "12.99",
          territory: "GBR",
        },
        {
          startDate: "2024-06-16",
          endDate: "undefined",
          price: "13.99",
          territory: "CAN",
        },
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("12.99"); // closer to current date comes first
    });

    it("should pick the price equal to today start date excluding future prices", () => {
      const prices = [
        {
          startDate: undefined,
          endDate: undefined,
          price: "9.99",
          territory: "USA",
        },
        {
          startDate: "2024-06-15",
          endDate: "undefined",
          price: "12.99",
          territory: "GBR",
        },
        {
          startDate: "2024-06-16",
          endDate: "undefined",
          price: "13.99",
          territory: "CAN",
        },
      ];
      const result = getMostRecentActivePrice(prices);
      expect(result?.price).toBe("12.99"); // closer to current date comes first
    });

    it("should handle real API response data structure", () => {
      const prices = [
        {
          startDate: null,
          endDate: "2024-09-11",
          price: "1.99",
          territory: "USA",
        },
        {
          startDate: "2024-09-11",
          endDate: null,
          price: "17.99",
          territory: "USA",
        },
      ];

      const result = getMostRecentActivePrice(prices);
      // The first price should be selected because it has no startDate (always active)
      expect(result?.price).toBe("1.99");
      expect(result?.territory).toBe("USA");
    });

    it("should handle future start dates correctly", () => {
      const prices = [
        {
          startDate: "2024-09-11",
          endDate: null,
          price: "17.99",
          territory: "USA",
        },
        {
          startDate: null,
          endDate: "2024-09-11",
          price: "1.99",
          territory: "USA",
        },
      ];

      const result = getMostRecentActivePrice(prices);
      // Only the second price should be active (no startDate, endDate in future)
      expect(result?.price).toBe("1.99");
    });

    it("should handle past end dates correctly", () => {
      const prices = [
        {
          startDate: null,
          endDate: "2024-01-11",
          price: "1.99",
          territory: "USA",
        },
        {
          startDate: "2024-01-11",
          endDate: null,
          price: "17.99",
          territory: "USA",
        },
      ];

      const result = getMostRecentActivePrice(prices);
      // Only the second price should be active (startDate in past, no endDate)
      expect(result?.price).toBe("17.99");
    });
  });

  describe("Integration test for pricing scenarios", () => {
    it("should handle real-world pricing scenario with multiple territories and dates", () => {
      // Simulate a pricing scenario where:
      // - USA has a base price (always active) and a future price increase
      // - GBR has a current price that started in January
      // - CAN has a price that ends in December (future)
      const prices = [
        // USA prices
        {
          territory: "USA",
          price: "9.99",
          startDate: undefined,
          endDate: undefined,
        }, // Base price, always active
        {
          territory: "USA",
          price: "12.99",
          startDate: "2024-12-01",
          endDate: undefined,
        }, // Future price increase

        // GBR prices
        {
          territory: "GBR",
          price: "7.99",
          startDate: "2024-01-01",
          endDate: undefined,
        }, // Current price

        // CAN prices
        {
          territory: "CAN",
          price: "12.99",
          startDate: undefined,
          endDate: "2024-12-31",
        }, // Current price, ends in December
      ];

      // Group by territory
      const territoryMap = new Map<string, typeof prices>();
      prices.forEach((price) => {
        if (!territoryMap.has(price.territory)) {
          territoryMap.set(price.territory, []);
        }
        territoryMap.get(price.territory)!.push(price);
      });

      // Get active prices for each territory
      const activePrices: Array<{
        territory: string;
        price: string;
        startDate?: string;
        endDate?: string;
      }> = [];
      for (const [territory, territoryPrices] of territoryMap) {
        const activePrice = getMostRecentActivePrice(territoryPrices);
        if (activePrice) {
          activePrices.push({
            territory,
            price: activePrice.price,
            startDate: activePrice.startDate,
            endDate: activePrice.endDate,
          });
        }
      }

      // Should have 3 active prices
      expect(activePrices).toHaveLength(3);

      // USA should have the base price (undefined dates come first)
      const usaPrice = activePrices.find((p) => p.territory === "USA");
      expect(usaPrice?.price).toBe("9.99");

      // GBR should have the current price
      const gbrPrice = activePrices.find((p) => p.territory === "GBR");
      expect(gbrPrice?.price).toBe("7.99");

      // CAN should have the current price
      const canPrice = activePrices.find((p) => p.territory === "CAN");
      expect(canPrice?.price).toBe("12.99");
    });
  });
});
