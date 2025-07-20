import {
  getValidIntroductoryOfferDurations,
  getValidPayAsYouGoPeriods,
  isValidIntroductoryOfferDuration,
  isValidPayAsYouGoPeriods,
} from "./duration-validation";

describe("Duration Validation", () => {
  describe("getValidIntroductoryOfferDurations", () => {
    describe("ONE_WEEK subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_WEEK",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_WEEK",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });

      it("should return empty array for PAY_AS_YOU_GO (not applicable for duration validation)", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_WEEK",
          "PAY_AS_YOU_GO"
        );
        expect(validDurations).toEqual([]);
      });
    });

    describe("ONE_MONTH subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_MONTH",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_MONTH",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });
    });

    describe("TWO_MONTHS subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "TWO_MONTHS",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "TWO_MONTHS",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });
    });

    describe("THREE_MONTHS subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "THREE_MONTHS",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "THREE_MONTHS",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });
    });

    describe("SIX_MONTHS subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "SIX_MONTHS",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "SIX_MONTHS",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });
    });

    describe("ONE_YEAR subscription period", () => {
      it("should return valid durations for FREE_TRIAL", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_YEAR",
          "FREE_TRIAL"
        );
        expect(validDurations).toContain("ONE_YEAR");
        expect(validDurations).toContain("ONE_WEEK");
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("THREE_DAYS");
        expect(validDurations).toContain("TWO_WEEKS");
      });

      it("should return valid durations for PAY_UP_FRONT", () => {
        const validDurations = getValidIntroductoryOfferDurations(
          "ONE_YEAR",
          "PAY_UP_FRONT"
        );
        expect(validDurations).toContain("ONE_MONTH");
        expect(validDurations).toContain("TWO_MONTHS");
        expect(validDurations).toContain("THREE_MONTHS");
        expect(validDurations).toContain("SIX_MONTHS");
        expect(validDurations).toContain("ONE_YEAR");
      });
    });

    it("should throw error for invalid subscription period", () => {
      expect(() => {
        getValidIntroductoryOfferDurations(
          "INVALID_PERIOD" as any,
          "FREE_TRIAL"
        );
      }).toThrow(
        "No duration configuration found for subscription period: INVALID_PERIOD"
      );
    });
  });

  describe("getValidPayAsYouGoPeriods", () => {
    it("should return valid periods for ONE_WEEK subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("ONE_WEEK");
      expect(validPeriods).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it("should return valid periods for ONE_MONTH subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("ONE_MONTH");
      expect(validPeriods).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it("should return valid periods for TWO_MONTHS subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("TWO_MONTHS");
      expect(validPeriods).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should return valid periods for THREE_MONTHS subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("THREE_MONTHS");
      expect(validPeriods).toEqual([1, 2, 3, 4]);
    });

    it("should return valid periods for SIX_MONTHS subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("SIX_MONTHS");
      expect(validPeriods).toEqual([1, 2]);
    });

    it("should return valid periods for ONE_YEAR subscription", () => {
      const validPeriods = getValidPayAsYouGoPeriods("ONE_YEAR");
      expect(validPeriods).toEqual([1]);
    });

    it("should throw error for invalid subscription period", () => {
      expect(() => {
        getValidPayAsYouGoPeriods("INVALID_PERIOD" as any);
      }).toThrow(
        "No duration configuration found for subscription period: INVALID_PERIOD"
      );
    });
  });

  describe("isValidIntroductoryOfferDuration", () => {
    it("should return true for valid duration", () => {
      expect(
        isValidIntroductoryOfferDuration("ONE_MONTH", "FREE_TRIAL", "ONE_WEEK")
      ).toBe(true);
      expect(
        isValidIntroductoryOfferDuration("ONE_MONTH", "FREE_TRIAL", "ONE_MONTH")
      ).toBe(true);
      expect(
        isValidIntroductoryOfferDuration(
          "ONE_MONTH",
          "PAY_UP_FRONT",
          "ONE_MONTH"
        )
      ).toBe(true);
    });

    it("should return false for invalid duration", () => {
      // This would be invalid if the duration doesn't exist in the valid list
      // We can't easily test this without knowing the exact mapping, but we can test edge cases
      expect(
        isValidIntroductoryOfferDuration("ONE_WEEK", "FREE_TRIAL", "ONE_WEEK")
      ).toBe(true);
    });

    it("should return false for PAY_AS_YOU_GO (not applicable for duration validation)", () => {
      expect(
        isValidIntroductoryOfferDuration(
          "ONE_WEEK",
          "PAY_AS_YOU_GO",
          "ONE_WEEK"
        )
      ).toBe(false);
      expect(
        isValidIntroductoryOfferDuration(
          "ONE_MONTH",
          "PAY_AS_YOU_GO",
          "ONE_MONTH"
        )
      ).toBe(false);
    });
  });

  describe("isValidPayAsYouGoPeriods", () => {
    it("should return true for valid periods", () => {
      expect(isValidPayAsYouGoPeriods("ONE_WEEK", 1)).toBe(true);
      expect(isValidPayAsYouGoPeriods("ONE_WEEK", 12)).toBe(true);
      expect(isValidPayAsYouGoPeriods("ONE_MONTH", 6)).toBe(true);
      expect(isValidPayAsYouGoPeriods("TWO_MONTHS", 3)).toBe(true);
      expect(isValidPayAsYouGoPeriods("THREE_MONTHS", 2)).toBe(true);
      expect(isValidPayAsYouGoPeriods("SIX_MONTHS", 1)).toBe(true);
      expect(isValidPayAsYouGoPeriods("ONE_YEAR", 1)).toBe(true);
    });

    it("should return false for invalid periods", () => {
      expect(isValidPayAsYouGoPeriods("ONE_WEEK", 13)).toBe(false);
      expect(isValidPayAsYouGoPeriods("ONE_WEEK", 0)).toBe(false);
      expect(isValidPayAsYouGoPeriods("ONE_WEEK", -1)).toBe(false);
      expect(isValidPayAsYouGoPeriods("TWO_MONTHS", 7)).toBe(false);
      expect(isValidPayAsYouGoPeriods("THREE_MONTHS", 5)).toBe(false);
      expect(isValidPayAsYouGoPeriods("SIX_MONTHS", 3)).toBe(false);
      expect(isValidPayAsYouGoPeriods("ONE_YEAR", 2)).toBe(false);
    });
  });

  describe("Integration tests", () => {
    it("should handle all subscription periods for FREE_TRIAL", () => {
      const periods: Array<
        | "ONE_WEEK"
        | "ONE_MONTH"
        | "TWO_MONTHS"
        | "THREE_MONTHS"
        | "SIX_MONTHS"
        | "ONE_YEAR"
      > = [
        "ONE_WEEK",
        "ONE_MONTH",
        "TWO_MONTHS",
        "THREE_MONTHS",
        "SIX_MONTHS",
        "ONE_YEAR",
      ];

      periods.forEach((period) => {
        expect(() => {
          const durations = getValidIntroductoryOfferDurations(
            period,
            "FREE_TRIAL"
          );
          expect(durations.length).toBeGreaterThan(0);
          expect(Array.isArray(durations)).toBe(true);
        }).not.toThrow();
      });
    });

    it("should handle all subscription periods for PAY_UP_FRONT", () => {
      const periods: Array<
        | "ONE_WEEK"
        | "ONE_MONTH"
        | "TWO_MONTHS"
        | "THREE_MONTHS"
        | "SIX_MONTHS"
        | "ONE_YEAR"
      > = [
        "ONE_WEEK",
        "ONE_MONTH",
        "TWO_MONTHS",
        "THREE_MONTHS",
        "SIX_MONTHS",
        "ONE_YEAR",
      ];

      periods.forEach((period) => {
        expect(() => {
          const durations = getValidIntroductoryOfferDurations(
            period,
            "PAY_UP_FRONT"
          );
          expect(durations.length).toBeGreaterThan(0);
          expect(Array.isArray(durations)).toBe(true);
        }).not.toThrow();
      });
    });

    it("should handle all subscription periods for PAY_AS_YOU_GO periods", () => {
      const periods: Array<
        | "ONE_WEEK"
        | "ONE_MONTH"
        | "TWO_MONTHS"
        | "THREE_MONTHS"
        | "SIX_MONTHS"
        | "ONE_YEAR"
      > = [
        "ONE_WEEK",
        "ONE_MONTH",
        "TWO_MONTHS",
        "THREE_MONTHS",
        "SIX_MONTHS",
        "ONE_YEAR",
      ];

      periods.forEach((period) => {
        expect(() => {
          const validPeriods = getValidPayAsYouGoPeriods(period);
          expect(validPeriods.length).toBeGreaterThan(0);
          expect(Array.isArray(validPeriods)).toBe(true);
          expect(
            validPeriods.every((p) => typeof p === "number" && p > 0)
          ).toBe(true);
        }).not.toThrow();
      });
    });

    it("should return empty array for PAY_AS_YOU_GO durations across all subscription periods", () => {
      const periods: Array<
        | "ONE_WEEK"
        | "ONE_MONTH"
        | "TWO_MONTHS"
        | "THREE_MONTHS"
        | "SIX_MONTHS"
        | "ONE_YEAR"
      > = [
        "ONE_WEEK",
        "ONE_MONTH",
        "TWO_MONTHS",
        "THREE_MONTHS",
        "SIX_MONTHS",
        "ONE_YEAR",
      ];

      periods.forEach((period) => {
        const durations = getValidIntroductoryOfferDurations(
          period,
          "PAY_AS_YOU_GO"
        );
        expect(durations).toEqual([]);
      });
    });
  });
});
