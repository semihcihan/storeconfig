import {
  useShortcuts,
  removeShortcuts,
  WORLDWIDE_TERRITORY_CODE,
} from "./shortcut-converter";
import { territoryCodes } from "../models/territories";
import { jest } from "@jest/globals";

// Mock logger
jest.mock("./logger");

describe("shortcut-converter", () => {
  describe("localization optimization", () => {
    it("should optimize localizations by removing duplicate fields with primary locale", () => {
      const data = {
        primaryLocale: "en-US",
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
            keywords: "test,app,keywords",
            marketingUrl: "http://test.com",
            promotionalText: "Test promo",
            supportUrl: "http://test.com/support",
            subtitle: "Test Subtitle",
            privacyPolicyUrl: "http://test.com/privacy",
            privacyChoicesUrl: "http://test.com/privacy-choices",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
            keywords: "test,app,keywords", // Same as primary
            marketingUrl: "http://test.com", // Same as primary
            promotionalText: "Test promo", // Same as primary
            supportUrl: "http://test.com/support", // Same as primary
            subtitle: "Test Subtitle", // Same as primary
            privacyPolicyUrl: "http://test.com/privacy", // Same as primary
            privacyChoicesUrl: "http://test.com/privacy-choices", // Same as primary
          },
          {
            locale: "fr-FR" as const,
            name: "Test App FR",
            description: "Test description FR",
            keywords: "test,app,keywords", // Same as primary
            marketingUrl: "http://test.com/fr", // Different from primary
            promotionalText: "Test promo FR", // Different from primary
            supportUrl: "http://test.com/support", // Same as primary
            subtitle: "Test Subtitle", // Same as primary
            privacyPolicyUrl: "http://test.com/privacy", // Same as primary
            privacyChoicesUrl: "http://test.com/privacy-choices", // Same as primary
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.localizations).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
          keywords: "test,app,keywords",
          marketingUrl: "http://test.com",
          promotionalText: "Test promo",
          supportUrl: "http://test.com/support",
          subtitle: "Test Subtitle",
          privacyPolicyUrl: "http://test.com/privacy",
          privacyChoicesUrl: "http://test.com/privacy-choices",
        },
        {
          locale: "es-ES",
          name: "Test App ES",
          description: "Test description ES",
        },
        {
          locale: "fr-FR",
          name: "Test App FR",
          description: "Test description FR",
          marketingUrl: "http://test.com/fr",
          promotionalText: "Test promo FR",
        },
      ]);
    });

    it("should restore full localization data when removing shortcuts", () => {
      const data = {
        primaryLocale: "en-US",
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
            keywords: "test,app,keywords",
            marketingUrl: "http://test.com",
            promotionalText: "Test promo",
            supportUrl: "http://test.com/support",
            subtitle: "Test Subtitle",
            privacyPolicyUrl: "http://test.com/privacy",
            privacyChoicesUrl: "http://test.com/privacy-choices",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
          },
          {
            locale: "fr-FR" as const,
            name: "Test App FR",
            description: "Test description FR",
            marketingUrl: "http://test.com/fr",
            promotionalText: "Test promo FR",
          },
        ],
      };

      const result = removeShortcuts(data);

      expect(result.localizations).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
          keywords: "test,app,keywords",
          marketingUrl: "http://test.com",
          promotionalText: "Test promo",
          supportUrl: "http://test.com/support",
          subtitle: "Test Subtitle",
          privacyPolicyUrl: "http://test.com/privacy",
          privacyChoicesUrl: "http://test.com/privacy-choices",
        },
        {
          locale: "es-ES",
          name: "Test App ES",
          description: "Test description ES",
          keywords: "test,app,keywords",
          marketingUrl: "http://test.com",
          promotionalText: "Test promo",
          supportUrl: "http://test.com/support",
          subtitle: "Test Subtitle",
          privacyPolicyUrl: "http://test.com/privacy",
          privacyChoicesUrl: "http://test.com/privacy-choices",
        },
        {
          locale: "fr-FR",
          name: "Test App FR",
          description: "Test description FR",
          keywords: "test,app,keywords",
          marketingUrl: "http://test.com/fr",
          promotionalText: "Test promo FR",
          supportUrl: "http://test.com/support",
          subtitle: "Test Subtitle",
          privacyPolicyUrl: "http://test.com/privacy",
          privacyChoicesUrl: "http://test.com/privacy-choices",
        },
      ]);
    });

    it("should return original localizations when no primary locale is provided", () => {
      const data = {
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.localizations).toEqual(data.localizations);
    });

    it("should return original localizations when primary locale is not found", () => {
      const data = {
        primaryLocale: "fr-FR",
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.localizations).toEqual(data.localizations);
    });
  });

  describe("availability shortcuts", () => {
    it("should convert all territories to worldwide shortcut", () => {
      const data = {
        availableTerritories: [...territoryCodes],
      };

      const result = useShortcuts(data);

      expect(result.availableTerritories).toBe("worldwide");
    });

    it("should not convert partial territories to worldwide", () => {
      const data = {
        availableTerritories: ["US", "CA", "GB"],
      };

      const result = useShortcuts(data);

      expect(result.availableTerritories).toEqual(["US", "CA", "GB"]);
    });

    it("should handle availability objects", () => {
      const data = {
        availability: {
          availableTerritories: [...territoryCodes],
        },
      };

      const result = useShortcuts(data);

      expect(result.availability.availableTerritories).toBe("worldwide");
    });

    it("should handle introductoryOffers with FREE_TRIAL", () => {
      const data = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: [...territoryCodes],
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.introductoryOffers[0].availableTerritories).toBe(
        "worldwide"
      );
    });

    it("should not handle introductoryOffers with PAY_AS_YOU_GO", () => {
      const data = {
        introductoryOffers: [
          {
            type: "PAY_AS_YOU_GO",
            duration: "ONE_WEEK",
            availableTerritories: [...territoryCodes],
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.introductoryOffers[0].availableTerritories).toEqual([
        ...territoryCodes,
      ]);
    });

    it("should handle nested inAppPurchases", () => {
      const data = {
        inAppPurchases: [
          {
            productId: "test_product",
            availableTerritories: [...territoryCodes],
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.inAppPurchases[0].availableTerritories).toBe("worldwide");
    });

    it("should handle nested subscriptionGroups", () => {
      const data = {
        subscriptionGroups: [
          {
            subscriptions: [
              {
                productId: "test_sub",
                availableTerritories: [...territoryCodes],
              },
            ],
          },
        ],
      };

      const result = useShortcuts(data);

      expect(
        result.subscriptionGroups[0].subscriptions[0].availableTerritories
      ).toBe("worldwide");
    });

    it("should preserve existing worldwide string", () => {
      const data = {
        availableTerritories: "worldwide",
      };

      const result = useShortcuts(data);

      expect(result.availableTerritories).toBe("worldwide");
    });

    it("should restore worldwide shortcut to all territories", () => {
      const data = {
        availableTerritories: "worldwide",
      };

      const result = removeShortcuts(data);

      expect(Array.isArray(result.availableTerritories)).toBe(true);
      expect(result.availableTerritories.length).toBeGreaterThan(0);
    });

    it("should restore worldwide in availability objects", () => {
      const data = {
        availability: {
          availableTerritories: "worldwide",
        },
      };

      const result = removeShortcuts(data);

      expect(Array.isArray(result.availability.availableTerritories)).toBe(
        true
      );
    });

    it("should restore worldwide in introductoryOffers", () => {
      const data = {
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: "worldwide",
          },
        ],
      };

      const result = removeShortcuts(data);

      expect(
        Array.isArray(result.introductoryOffers[0].availableTerritories)
      ).toBe(true);
    });

    it("should restore worldwide in nested structures", () => {
      const data = {
        inAppPurchases: [
          {
            productId: "test_product",
            availableTerritories: "worldwide",
          },
        ],
        subscriptionGroups: [
          {
            subscriptions: [
              {
                productId: "test_sub",
                availableTerritories: "worldwide",
              },
            ],
          },
        ],
      };

      const result = removeShortcuts(data);

      expect(Array.isArray(result.inAppPurchases[0].availableTerritories)).toBe(
        true
      );
      expect(
        Array.isArray(
          result.subscriptionGroups[0].subscriptions[0].availableTerritories
        )
      ).toBe(true);
    });

    it("should handle case-insensitive worldwide", () => {
      const data = {
        availableTerritories: "Worldwide",
      };

      const result = removeShortcuts(data);

      expect(Array.isArray(result.availableTerritories)).toBe(true);
    });
  });

  describe("combined shortcuts", () => {
    it("should apply both availability and localization shortcuts", () => {
      const data = {
        primaryLocale: "en-US",
        availableTerritories: [...territoryCodes],
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
          },
        ],
      };

      const result = useShortcuts(data);

      expect(result.availableTerritories).toBe("worldwide");
      expect(result.localizations).toHaveLength(2);
    });

    it("should remove both availability and localization shortcuts", () => {
      const data = {
        primaryLocale: "en-US",
        availableTerritories: "worldwide",
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
          },
        ],
      };

      const result = removeShortcuts(data);

      expect(Array.isArray(result.availableTerritories)).toBe(true);
      expect(result.localizations[1]).toHaveProperty("description");
    });
  });

  describe("round-trip conversion", () => {
    it("should preserve data through useShortcuts -> removeShortcuts", () => {
      const originalData = {
        primaryLocale: "en-US",
        availableTerritories: [...territoryCodes],
        localizations: [
          {
            locale: "en-US" as const,
            name: "Test App",
            description: "Test description",
            keywords: "test,app,keywords",
          },
          {
            locale: "es-ES" as const,
            name: "Test App ES",
            description: "Test description ES",
            keywords: "test,app,keywords", // Same as primary
          },
        ],
        introductoryOffers: [
          {
            type: "FREE_TRIAL",
            duration: "ONE_WEEK",
            availableTerritories: [...territoryCodes],
          },
        ],
      };

      const withShortcuts = useShortcuts(originalData);
      const restored = removeShortcuts(withShortcuts);

      expect(restored.availableTerritories).toEqual([...territoryCodes]);
      expect(restored.introductoryOffers[0].availableTerritories).toEqual([
        ...territoryCodes,
      ]);
      expect(restored.localizations[1].keywords).toBe("test,app,keywords");
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

      const withShortcuts = useShortcuts(originalData);
      const restored = removeShortcuts(withShortcuts);

      expect(restored.availableTerritories).toEqual(["US", "CA", "GB"]);
      expect(restored.introductoryOffers[0].availableTerritories).toEqual([
        "US",
        "CA",
      ]);
    });
  });

  describe("edge cases", () => {
    it("should handle null input", () => {
      expect(useShortcuts(null)).toBeNull();
      expect(removeShortcuts(null)).toBeNull();
    });

    it("should handle undefined input", () => {
      expect(useShortcuts(undefined)).toBeUndefined();
      expect(removeShortcuts(undefined)).toBeUndefined();
    });

    it("should handle primitive values", () => {
      expect(useShortcuts("test")).toBe("test");
      expect(useShortcuts(123)).toBe(123);
      expect(useShortcuts(true)).toBe(true);
      expect(removeShortcuts("test")).toBe("test");
      expect(removeShortcuts(123)).toBe(123);
      expect(removeShortcuts(true)).toBe(true);
    });

    it("should handle empty arrays", () => {
      const data = {
        availableTerritories: [],
        localizations: [],
        introductoryOffers: [],
        inAppPurchases: [],
        subscriptionGroups: [],
      };

      const result = useShortcuts(data);
      expect(result.availableTerritories).toEqual([]);
      expect(result.localizations).toEqual([]);
      expect(result.introductoryOffers).toEqual([]);
      expect(result.inAppPurchases).toEqual([]);
      expect(result.subscriptionGroups).toEqual([]);
    });

    it("should handle objects without shortcut properties", () => {
      const data = {
        appId: "123456789",
        schemaVersion: "1.0.0",
        someOtherProperty: "should remain unchanged",
      };

      const result = useShortcuts(data);
      expect(result.appId).toBe("123456789");
      expect(result.schemaVersion).toBe("1.0.0");
      expect(result.someOtherProperty).toBe("should remain unchanged");
    });
  });
});
