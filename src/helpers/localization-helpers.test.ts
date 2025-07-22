import { jest } from "@jest/globals";
import { optimizeLocalizationsByPrimaryLocale } from "./localization-helpers";

// Mock logger
jest.mock("../utils/logger");

describe("localization-helpers", () => {
  describe("optimizeLocalizationsByPrimaryLocale", () => {
    it("should return original localizations when no primary locale is provided", () => {
      const localizations = [
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
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        undefined
      );

      expect(result).toEqual(localizations);
    });

    it("should return original localizations when primary locale is not found", () => {
      const localizations = [
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
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "fr-FR"
      );

      expect(result).toEqual(localizations);
    });

    it("should optimize localizations by removing duplicate fields with primary locale", () => {
      const localizations = [
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
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual([
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
          // Other fields omitted since they're the same as primary
        },
        {
          locale: "fr-FR",
          name: "Test App FR",
          description: "Test description FR",
          marketingUrl: "http://test.com/fr",
          promotionalText: "Test promo FR",
          // Other fields omitted since they're the same as primary
        },
      ]);
    });

    it("should handle localizations with only locale field", () => {
      const localizations = [
        {
          locale: "en-US" as const,
          name: "Test App",
          description: "Test description",
        },
        {
          locale: "it" as const,
        },
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
        },
        {
          locale: "it",
          // Only locale field since no other fields to compare
        },
      ]);
    });

    it("should handle mixed case scenarios", () => {
      const localizations = [
        {
          locale: "en-US" as const,
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "it" as const,
          name: "Test App IT",
          description: "Test description",
          keywords: "test,keywords,italian",
        },
        {
          locale: "zh-Hans" as const,
          name: "Test App",
          description: "Test description ZH",
          keywords: "test,keywords",
        },
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "it",
          name: "Test App IT",
          keywords: "test,keywords,italian",
          // description omitted since it's the same as primary
        },
        {
          locale: "zh-Hans",
          description: "Test description ZH",
          // name and keywords omitted since they're the same as primary
        },
      ]);
    });

    it("should handle null and undefined values correctly", () => {
      const localizations = [
        {
          locale: "en-US" as const,
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "es-ES" as const,
          name: "Test App ES",
          description: undefined,
          keywords: undefined,
        },
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "es-ES",
          name: "Test App ES",
          // description and keywords omitted since they're undefined (same as primary's defined values)
        },
      ]);
    });

    it("should handle empty localizations array", () => {
      const result = optimizeLocalizationsByPrimaryLocale([], "en-US");

      expect(result).toEqual([]);
    });

    it("should handle single localization", () => {
      const localizations = [
        {
          locale: "en-US" as const,
          name: "Test App",
          description: "Test description",
        },
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual(localizations);
    });

    it("should preserve all fields when they differ from primary locale", () => {
      const localizations = [
        {
          locale: "en-US" as const,
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "fr-FR" as const,
          name: "Test App FR",
          description: "Test description FR",
          keywords: "test,keywords,french",
        },
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        "en-US"
      );

      expect(result).toEqual([
        {
          locale: "en-US",
          name: "Test App",
          description: "Test description",
          keywords: "test,keywords",
        },
        {
          locale: "fr-FR",
          name: "Test App FR",
          description: "Test description FR",
          keywords: "test,keywords,french",
        },
      ]);
    });
  });
});
