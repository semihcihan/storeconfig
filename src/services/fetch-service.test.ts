import { jest } from "@jest/globals";
import { z } from "zod";
import { AppStoreLocalizationSchema } from "../models/app-store";
import { localeCodes } from "../models/locales";

// Import the function we want to test
import { optimizeLocalizationsByPrimaryLocale } from "./fetch-service";

// Mock dependencies
jest.mock("../utils/logger");
jest.mock("../domains/in-app-purchases/api-client");
jest.mock("../domains/subscriptions/api-client");
jest.mock("../domains/availability/api-client");
jest.mock("../domains/apps/api-client");
jest.mock("../domains/in-app-purchases/mapper");
jest.mock("../domains/subscriptions/mapper");
jest.mock("../domains/availability/mapper");
jest.mock("./pricing-aggregator");
jest.mock("../domains/versions/service");
jest.mock("./localization-aggregator");

describe("fetch-service", () => {
  describe("optimizeLocalizationsByPrimaryLocale", () => {
    // Test data
    const primaryLocale = "en-US" as const;
    const primaryLocalization = {
      locale: "en-US" as const,
      name: "Test App",
      description: "Test description",
      keywords: "test,app",
      marketingUrl: "https://example.com",
      promotionalText: "Promo text",
      supportUrl: "https://support.example.com",
      subtitle: "Test subtitle",
      privacyPolicyUrl: "https://privacy.example.com",
      privacyChoicesUrl: "https://choices.example.com",
      whatsNew: "What's new text",
    };

    const frLocalization = {
      locale: "fr-FR" as const,
      name: "Test App FR",
      description: "Test description FR",
      keywords: "test,app,fr",
      marketingUrl: "https://example.fr",
      promotionalText: "Promo text FR",
      supportUrl: "https://support.example.fr",
      subtitle: "Test subtitle FR",
      privacyPolicyUrl: "https://privacy.example.fr",
      privacyChoicesUrl: "https://choices.example.fr",
      whatsNew: "What's new text FR",
    };

    const esLocalization = {
      locale: "es-ES" as const,
      name: "Test App", // Same as primary
      description: "Test description", // Same as primary
      keywords: "test,app", // Same as primary
      marketingUrl: "https://example.com", // Same as primary
      promotionalText: "Promo text", // Same as primary
      supportUrl: "https://support.example.com", // Same as primary
      subtitle: "Test subtitle", // Same as primary
      privacyPolicyUrl: "https://privacy.example.com", // Same as primary
      privacyChoicesUrl: "https://choices.example.com", // Same as primary
      whatsNew: "What's new text", // Same as primary
    };

    const deLocalization = {
      locale: "de-DE" as const,
      name: "Test App DE",
      description: "Test description", // Same as primary
      keywords: "test,app", // Same as primary
      marketingUrl: "https://example.com", // Same as primary
      promotionalText: "Promo text", // Same as primary
      supportUrl: "https://support.example.com", // Same as primary
      subtitle: "Test subtitle", // Same as primary
      privacyPolicyUrl: "https://privacy.example.com", // Same as primary
      privacyChoicesUrl: "https://choices.example.com", // Same as primary
      whatsNew: "What's new text", // Same as primary
    };

    const itLocalization = {
      locale: "it" as const,
      // Only locale, no other fields
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return original localizations when primaryLocale is undefined", () => {
      const localizations = [primaryLocalization, frLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        undefined
      );

      expect(result).toEqual(localizations);
    });

    it("should return original localizations when primaryLocale is null", () => {
      const localizations = [primaryLocalization, frLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        null as any
      );

      expect(result).toEqual(localizations);
    });

    it("should return original localizations when primaryLocale is empty string", () => {
      const localizations = [primaryLocalization, frLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(localizations, "");

      expect(result).toEqual(localizations);
    });

    it("should return original localizations when primary localization is not found", () => {
      const localizations = [frLocalization, esLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      expect(result).toEqual(localizations);
    });

    it("should return primary localization unchanged", () => {
      const localizations = [
        primaryLocalization,
        frLocalization,
        esLocalization,
      ];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      const primaryResult = result.find(
        (loc: any) => loc.locale === primaryLocale
      );
      expect(primaryResult).toEqual(primaryLocalization);
    });

    it("should optimize localizations with different values from primary", () => {
      const localizations = [
        primaryLocalization,
        frLocalization,
        esLocalization,
      ];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      // Primary should be unchanged
      const primaryResult = result.find(
        (loc: any) => loc.locale === primaryLocale
      );
      expect(primaryResult).toEqual(primaryLocalization);

      // French should keep all fields since they're all different
      const frResult = result.find((loc: any) => loc.locale === "fr-FR");
      expect(frResult).toEqual(frLocalization);

      // Spanish should only have locale since all other fields match primary
      const esResult = result.find((loc: any) => loc.locale === "es-ES");
      expect(esResult).toEqual({ locale: "es-ES" });
    });

    it("should optimize localizations with partial differences from primary", () => {
      const localizations = [primaryLocalization, deLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      // Primary should be unchanged
      const primaryResult = result.find(
        (loc: any) => loc.locale === primaryLocale
      );
      expect(primaryResult).toEqual(primaryLocalization);

      // German should only have name since that's the only field that differs
      const deResult = result.find((loc: any) => loc.locale === "de-DE");
      expect(deResult).toEqual({
        locale: "de-DE",
        name: "Test App DE",
      });
    });

    it("should handle localizations with only locale field", () => {
      const localizations = [primaryLocalization, itLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      // Primary should be unchanged
      const primaryResult = result.find(
        (loc: any) => loc.locale === primaryLocale
      );
      expect(primaryResult).toEqual(primaryLocalization);

      // Italian should remain unchanged since it only has locale
      const itResult = result.find((loc: any) => loc.locale === "it");
      expect(itResult).toEqual(itLocalization);
    });

    it("should handle empty localizations array", () => {
      const result = optimizeLocalizationsByPrimaryLocale([], primaryLocale);
      expect(result).toEqual([]);
    });

    it("should handle single localization that is primary", () => {
      const localizations = [primaryLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );
      expect(result).toEqual(localizations);
    });

    it("should handle single localization that is not primary", () => {
      const localizations = [frLocalization];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );
      expect(result).toEqual(localizations);
    });

    it("should handle undefined values in localization fields", () => {
      const localizationWithUndefined = {
        locale: "pt-BR" as const,
        name: undefined,
        description: "Some description",
        keywords: undefined,
      };

      const localizations = [primaryLocalization, localizationWithUndefined];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      const ptResult = result.find((loc: any) => loc.locale === "pt-BR");
      expect(ptResult).toEqual({
        locale: "pt-BR",
        description: "Some description",
      });
    });

    it("should handle undefined values in localization fields (null case)", () => {
      const localizationWithNull = {
        locale: "pt-BR" as const,
        name: undefined,
        description: "Some description",
        keywords: undefined,
      };

      const localizations = [primaryLocalization, localizationWithNull];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      const ptResult = result.find((loc: any) => loc.locale === "pt-BR");
      expect(ptResult).toEqual({
        locale: "pt-BR",
        description: "Some description",
      });
    });

    it("should handle mixed case scenarios", () => {
      const mixedLocalizations = [
        primaryLocalization,
        frLocalization, // All different
        esLocalization, // All same as primary
        deLocalization, // Only name different
        itLocalization, // Only locale
      ];

      const result = optimizeLocalizationsByPrimaryLocale(
        mixedLocalizations,
        primaryLocale
      );

      expect(result).toHaveLength(5);

      // Primary unchanged
      expect(result.find((loc: any) => loc.locale === "en-US")).toEqual(
        primaryLocalization
      );

      // French unchanged (all different)
      expect(result.find((loc: any) => loc.locale === "fr-FR")).toEqual(
        frLocalization
      );

      // Spanish optimized (only locale)
      expect(result.find((loc: any) => loc.locale === "es-ES")).toEqual({
        locale: "es-ES",
      });

      // German optimized (only name different)
      expect(result.find((loc: any) => loc.locale === "de-DE")).toEqual({
        locale: "de-DE",
        name: "Test App DE",
      });

      // Italian unchanged (only locale)
      expect(result.find((loc: any) => loc.locale === "it")).toEqual(
        itLocalization
      );
    });

    it("should validate that result maintains schema compatibility", () => {
      const localizations = [
        primaryLocalization,
        frLocalization,
        esLocalization,
      ];
      const result = optimizeLocalizationsByPrimaryLocale(
        localizations,
        primaryLocale
      );

      // All results should be valid according to the schema
      result.forEach((localization: any) => {
        expect(() =>
          AppStoreLocalizationSchema.parse(localization)
        ).not.toThrow();
      });
    });
  });
});
