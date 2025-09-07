import {
  parseAppleDate,
  getCurrentDate,
  isPriceCurrentlyActive,
  compareAppleDates,
  getMostRecentActivePrice,
} from "./date-helpers";

describe("Date Helpers", () => {
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
  });

  describe("isPriceCurrentlyActive", () => {
    const mockCurrentDate = new Date("2024-06-15T00:00:00.000Z");

    beforeEach(() => {
      // Mock the current date to a fixed value for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(mockCurrentDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

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
      expect(compareAppleDates("2024-01-01", "2024-01-01")).toBe(0);
      expect(compareAppleDates(undefined, undefined)).toBe(0);
    });

    it("should return -1 when first date is earlier", () => {
      expect(compareAppleDates("2024-01-01", "2024-01-02")).toBe(-1);
      expect(compareAppleDates("2023-12-31", "2024-01-01")).toBe(-1);
    });

    it("should return 1 when first date is later", () => {
      expect(compareAppleDates("2024-01-02", "2024-01-01")).toBe(1);
      expect(compareAppleDates("2024-12-31", "2024-01-01")).toBe(1);
    });

    it("should handle undefined dates (undefined comes first)", () => {
      expect(compareAppleDates(undefined, "2024-01-01")).toBe(-1);
      expect(compareAppleDates("2024-01-01", undefined)).toBe(1);
    });

    it("should handle mixed undefined and valid dates", () => {
      expect(compareAppleDates("2024-01-01", undefined)).toBe(1);
      expect(compareAppleDates(undefined, "2024-01-01")).toBe(-1);
    });
  });

  describe("getMostRecentActivePrice", () => {
    const mockCurrentDate = new Date("2024-06-15T00:00:00.000Z");

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockCurrentDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

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
      expect(result?.price).toBe("9.99"); // undefined startDate comes first
    });

    it("should handle real API response data structure", () => {
      // Mock current date to be in the middle of the date range
      jest.setSystemTime(new Date("2025-01-15T00:00:00.000Z"));

      const prices = [
        {
          startDate: null,
          endDate: "2025-09-11",
          price: "1.99",
          territory: "USA",
        },
        {
          startDate: "2025-09-11",
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
      // Mock current date to be before the future start date
      jest.setSystemTime(new Date("2025-01-15T00:00:00.000Z"));

      const prices = [
        {
          startDate: "2025-09-11",
          endDate: null,
          price: "17.99",
          territory: "USA",
        },
        {
          startDate: null,
          endDate: "2025-09-11",
          price: "1.99",
          territory: "USA",
        },
      ];

      const result = getMostRecentActivePrice(prices);
      // Only the second price should be active (no startDate, endDate in future)
      expect(result?.price).toBe("1.99");
    });

    it("should handle past end dates correctly", () => {
      // Mock current date to be after the end date
      jest.setSystemTime(new Date("2025-10-15T00:00:00.000Z"));

      const prices = [
        {
          startDate: null,
          endDate: "2025-09-11",
          price: "1.99",
          territory: "USA",
        },
        {
          startDate: "2025-09-11",
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
    const mockCurrentDate = new Date("2024-06-15T00:00:00.000Z");

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockCurrentDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

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
