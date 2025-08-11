import {
  createPricingStrategy,
  ApplePricingStrategy,
  PurchasingPowerPricingStrategy,
} from "./pricing-strategy";
import { buildSubscriptionPricesWithEqualizations } from "../domains/subscriptions/pricing-service";

jest.mock("../domains/subscriptions/pricing-service", () => ({
  buildSubscriptionPricesWithEqualizations: jest.fn(),
  buildPurchasingPowerPrices: jest.fn(),
}));

describe("PricingStrategy", () => {
  describe("createPricingStrategy", () => {
    it("should create ApplePricingStrategy for 'apple' strategy", () => {
      const strategy = createPricingStrategy("apple");
      expect(strategy).toBeInstanceOf(ApplePricingStrategy);
    });

    it("should create PurchasingPowerPricingStrategy for 'purchasingPower' strategy", () => {
      const strategy = createPricingStrategy("purchasingPower");
      expect(strategy).toBeInstanceOf(PurchasingPowerPricingStrategy);
    });

    it("should throw error for unknown strategy", () => {
      expect(() => createPricingStrategy("unknown" as any)).toThrow(
        "Unknown pricing strategy: unknown"
      );
    });
  });

  describe("ApplePricingStrategy", () => {
    let strategy: ApplePricingStrategy;

    beforeEach(() => {
      strategy = new ApplePricingStrategy();
    });

    it("should build price schedule with USA as base territory", () => {
      const schedule = strategy.buildPriceSchedule("0.99");
      expect(schedule.baseTerritory).toBe("USA");
      expect(schedule.prices).toHaveLength(1);
      expect(schedule.prices[0]).toEqual({
        price: "0.99",
        territory: "USA",
      });
    });

    it("should build subscription prices using equalizations", async () => {
      const mockPrices = [{ price: "0.99", territory: "USA" }];
      (buildSubscriptionPricesWithEqualizations as jest.Mock).mockResolvedValue(
        mockPrices
      );

      const prices = await strategy.buildSubscriptionPrices("test-id");
      expect(prices).toEqual(mockPrices);
      expect(buildSubscriptionPricesWithEqualizations).toHaveBeenCalledWith(
        "test-id"
      );
    });
  });

  describe("PurchasingPowerPricingStrategy", () => {
    let strategy: PurchasingPowerPricingStrategy;

    // TODO: Add tests for PurchasingPowerPricingStrategy
  });
});
