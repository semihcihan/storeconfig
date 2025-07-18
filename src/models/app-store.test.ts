import { PriceScheduleSchema, SubscriptionSchema } from "./app-store";
import { territoryCodes } from "./territories";

jest.mock("./territories", () => ({
  ...jest.requireActual("./territories"),
  territoryCodes: ["USA", "CAN", "GBR"],
}));

describe("AppStore Models", () => {
  describe("PriceScheduleSchema", () => {
    it("should pass validation if baseTerritory has a corresponding price", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
        ],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(true);
    });

    it("should fail validation if baseTerritory does not have a corresponding price", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [{ territory: "CAN", price: "12.99" }],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });

    it("should fail validation if prices array is empty", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "The base territory must have a corresponding price in the prices array"
        );
      }
    });

    it("should pass validation with a single price entry for the base territory", () => {
      const schedule = {
        baseTerritory: "USA",
        prices: [{ territory: "USA", price: "9.99" }],
      };
      const result = PriceScheduleSchema.safeParse(schedule);
      expect(result.success).toBe(true);
    });
  });

  describe("SubscriptionSchema", () => {
    const validSubscriptionData = {
      productId: "prod.monthly",
      referenceName: "Monthly Subscription",
      groupLevel: 1,
      subscriptionPeriod: "ONE_MONTH",
      familySharable: false,
      localizations: [],
      availability: {
        availableInNewTerritories: true,
        availableTerritories: ["USA", "CAN", "GBR"],
      },
    };

    it("should pass validation when prices for all territories are provided", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
          { territory: "GBR", price: "8.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });

    it("should fail validation if a price for a territory is missing", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [
          { territory: "USA", price: "9.99" },
          { territory: "CAN", price: "12.99" },
        ],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Subscription must include prices for all territories"
        );
      }
    });

    it("should pass validation if the prices array is empty", () => {
      const subscription = {
        ...validSubscriptionData,
        prices: [],
      };
      const result = SubscriptionSchema.safeParse(subscription);
      expect(result.success).toBe(true);
    });
  });
});
