import {
  useShortcuts,
  removeShortcuts,
  WORLDWIDE_TERRITORY_CODE,
} from "./shortcut-converter";
import { territoryCodes } from "../models/territories";

describe("shortcut-converter", () => {
  describe("convertInputUserShortcuts", () => {
    it("should return null for null input", () => {
      expect(useShortcuts(null)).toBeNull();
    });

    it("should return undefined for undefined input", () => {
      expect(useShortcuts(undefined)).toBeUndefined();
    });

    it("should return primitive values as-is", () => {
      expect(useShortcuts("test")).toBe("test");
      expect(useShortcuts(123)).toBe(123);
      expect(useShortcuts(true)).toBe(true);
    });

    it("should convert all territories to WorldWide in availableTerritories", () => {
      const input = {
        availableTerritories: [...territoryCodes],
      };

      const result = useShortcuts(input);

      expect(result.availableTerritories).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should not convert partial territories to WorldWide", () => {
      const input = {
        availableTerritories: ["US", "CA", "GB"],
      };

      const result = useShortcuts(input);

      expect(result.availableTerritories).toEqual(["US", "CA", "GB"]);
    });

    it("should not convert territories in wrong order", () => {
      const input = {
        availableTerritories: [...territoryCodes].reverse(),
      };

      const result = useShortcuts(input);

      expect(result.availableTerritories).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should handle introductoryOffers with all territories", () => {
      const input = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: [...territoryCodes],
          },
        ],
      };

      const result = useShortcuts(input);

      expect(result.introductoryOffers[0].availableTerritories).toEqual([
        WORLDWIDE_TERRITORY_CODE,
      ]);
    });

    it("should handle introductoryOffers with partial territories", () => {
      const input = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["US", "CA"],
          },
        ],
      };

      const result = useShortcuts(input);

      expect(result.introductoryOffers[0].availableTerritories).toEqual([
        "US",
        "CA",
      ]);
    });

    it("should handle inAppPurchases with all territories", () => {
      const input = {
        inAppPurchases: [
          {
            productId: "test_product",
            type: "CONSUMABLE",
            referenceName: "Test Product",
            familySharable: false,
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [...territoryCodes],
            },
          },
        ],
      };

      const result = useShortcuts(input);

      expect(
        result.inAppPurchases[0].availability.availableTerritories
      ).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should handle subscriptionGroups with all territories", () => {
      const input = {
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: [...territoryCodes],
                },
              },
            ],
          },
        ],
      };

      const result = useShortcuts(input);

      expect(
        result.subscriptionGroups[0].subscriptions[0].availability
          .availableTerritories
      ).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should handle nested structures recursively", () => {
      const input = {
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: [...territoryCodes],
                },
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: [...territoryCodes],
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = useShortcuts(input);

      expect(
        result.subscriptionGroups[0].subscriptions[0].availability
          .availableTerritories
      ).toEqual([WORLDWIDE_TERRITORY_CODE]);
      expect(
        result.subscriptionGroups[0].subscriptions[0].introductoryOffers[0]
          .availableTerritories
      ).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should preserve other properties unchanged", () => {
      const input = {
        appId: "123456789",
        schemaVersion: "1.0.0",
        availableTerritories: [...territoryCodes],
        someOtherProperty: "should remain unchanged",
      };

      const result = useShortcuts(input);

      expect(result.appId).toBe("123456789");
      expect(result.schemaVersion).toBe("1.0.0");
      expect(result.someOtherProperty).toBe("should remain unchanged");
      expect(result.availableTerritories).toEqual([WORLDWIDE_TERRITORY_CODE]);
    });

    it("should handle empty arrays", () => {
      const input = {
        availableTerritories: [],
        introductoryOffers: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const result = useShortcuts(input);

      expect(result.availableTerritories).toEqual([]);
      expect(result.introductoryOffers).toEqual([]);
      expect(result.inAppPurchases).toEqual([]);
      expect(result.subscriptionGroups).toEqual([]);
    });
  });

  describe("convertOutputUserShortcuts", () => {
    it("should return null for null input", () => {
      expect(removeShortcuts(null)).toBeNull();
    });

    it("should return undefined for undefined input", () => {
      expect(removeShortcuts(undefined)).toBeUndefined();
    });

    it("should return primitive values as-is", () => {
      expect(removeShortcuts("test")).toBe("test");
      expect(removeShortcuts(123)).toBe(123);
      expect(removeShortcuts(true)).toBe(true);
    });

    it("should convert WorldWide back to all territories in availableTerritories", () => {
      const input = {
        availableTerritories: [WORLDWIDE_TERRITORY_CODE],
      };

      const result = removeShortcuts(input);

      expect(result.availableTerritories).toEqual([...territoryCodes]);
    });

    it("should not convert non-WorldWide territories", () => {
      const input = {
        availableTerritories: ["US", "CA", "GB"],
      };

      const result = removeShortcuts(input);

      expect(result.availableTerritories).toEqual(["US", "CA", "GB"]);
    });

    it("should not convert arrays with multiple items even if WorldWide is present", () => {
      const input = {
        availableTerritories: [WORLDWIDE_TERRITORY_CODE, "US"],
      };

      const result = removeShortcuts(input);

      expect(result.availableTerritories).toEqual([
        WORLDWIDE_TERRITORY_CODE,
        "US",
      ]);
    });

    it("should handle introductoryOffers with WorldWide", () => {
      const input = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: [WORLDWIDE_TERRITORY_CODE],
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(result.introductoryOffers[0].availableTerritories).toEqual([
        ...territoryCodes,
      ]);
    });

    it("should handle introductoryOffers with non-WorldWide territories", () => {
      const input = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["US", "CA"],
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(result.introductoryOffers[0].availableTerritories).toEqual([
        "US",
        "CA",
      ]);
    });

    it("should handle inAppPurchases with WorldWide", () => {
      const input = {
        inAppPurchases: [
          {
            productId: "test_product",
            type: "CONSUMABLE",
            referenceName: "Test Product",
            familySharable: false,
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [WORLDWIDE_TERRITORY_CODE],
            },
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(
        result.inAppPurchases[0].availability.availableTerritories
      ).toEqual([...territoryCodes]);
    });

    it("should handle subscriptionGroups with WorldWide", () => {
      const input = {
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: [WORLDWIDE_TERRITORY_CODE],
                },
              },
            ],
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(
        result.subscriptionGroups[0].subscriptions[0].availability
          .availableTerritories
      ).toEqual([...territoryCodes]);
    });

    it("should handle nested structures recursively", () => {
      const input = {
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: [WORLDWIDE_TERRITORY_CODE],
                },
                introductoryOffers: [
                  {
                    type: "FREE_TRIAL",
                    duration: "ONE_WEEK",
                    availableTerritories: [WORLDWIDE_TERRITORY_CODE],
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(
        result.subscriptionGroups[0].subscriptions[0].availability
          .availableTerritories
      ).toEqual([...territoryCodes]);
      expect(
        result.subscriptionGroups[0].subscriptions[0].introductoryOffers[0]
          .availableTerritories
      ).toEqual([...territoryCodes]);
    });

    it("should preserve other properties unchanged", () => {
      const input = {
        appId: "123456789",
        schemaVersion: "1.0.0",
        availableTerritories: [WORLDWIDE_TERRITORY_CODE],
        someOtherProperty: "should remain unchanged",
      };

      const result = removeShortcuts(input);

      expect(result.appId).toBe("123456789");
      expect(result.schemaVersion).toBe("1.0.0");
      expect(result.someOtherProperty).toBe("should remain unchanged");
      expect(result.availableTerritories).toEqual([...territoryCodes]);
    });

    it("should handle empty arrays", () => {
      const input = {
        availableTerritories: [],
        introductoryOffers: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const result = removeShortcuts(input);

      expect(result.availableTerritories).toEqual([]);
      expect(result.introductoryOffers).toEqual([]);
      expect(result.inAppPurchases).toEqual([]);
      expect(result.subscriptionGroups).toEqual([]);
    });

    it("should handle mixed WorldWide and non-WorldWide in different locations", () => {
      const input = {
        availableTerritories: [WORLDWIDE_TERRITORY_CODE],
        inAppPurchases: [
          {
            productId: "test_product",
            type: "CONSUMABLE",
            referenceName: "Test Product",
            familySharable: false,
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: ["US", "CA"],
            },
          },
        ],
        subscriptionGroups: [
          {
            referenceName: "Test Group",
            localizations: [],
            subscriptions: [
              {
                productId: "test_sub",
                referenceName: "Test Subscription",
                groupLevel: 1,
                subscriptionPeriod: "ONE_MONTH",
                familySharable: false,
                prices: [],
                localizations: [],
                availability: {
                  availableInNewTerritories: true,
                  availableTerritories: [WORLDWIDE_TERRITORY_CODE],
                },
              },
            ],
          },
        ],
      };

      const result = removeShortcuts(input);

      expect(result.availableTerritories).toEqual([...territoryCodes]);
      expect(
        result.inAppPurchases[0].availability.availableTerritories
      ).toEqual(["US", "CA"]);
      expect(
        result.subscriptionGroups[0].subscriptions[0].availability
          .availableTerritories
      ).toEqual([...territoryCodes]);
    });
  });

  describe("round-trip conversion", () => {
    it("should preserve data through input->output conversion", () => {
      const originalData = {
        availableTerritories: [...territoryCodes],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: [...territoryCodes],
          },
        ],
        inAppPurchases: [
          {
            productId: "test_product",
            type: "CONSUMABLE",
            referenceName: "Test Product",
            familySharable: false,
            localizations: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [...territoryCodes],
            },
          },
        ],
      };

      const convertedToWorldWide = useShortcuts(originalData);
      const convertedBack = removeShortcuts(convertedToWorldWide);

      expect(convertedBack.availableTerritories).toEqual([...territoryCodes]);
      expect(convertedBack.introductoryOffers[0].availableTerritories).toEqual([
        ...territoryCodes,
      ]);
      expect(
        convertedBack.inAppPurchases[0].availability.availableTerritories
      ).toEqual([...territoryCodes]);
    });

    it("should preserve partial territories through conversion", () => {
      const originalData = {
        availableTerritories: ["US", "CA", "GB"],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: ["US", "CA"],
          },
        ],
      };

      const convertedToWorldWide = useShortcuts(originalData);
      const convertedBack = removeShortcuts(convertedToWorldWide);

      expect(convertedBack.availableTerritories).toEqual(["US", "CA", "GB"]);
      expect(convertedBack.introductoryOffers[0].availableTerritories).toEqual([
        "US",
        "CA",
      ]);
    });
  });
});
