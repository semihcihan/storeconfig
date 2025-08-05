import { jest } from "@jest/globals";
import { LocalizationAggregator } from "./localization-aggregator";
import { LocalizationService as AppStoreVersionLocalizationService } from "../domains/versions/localization-service";
import { LocalizationService as AppInfoLocalizationService } from "../domains/app-info/localization-service";
import { AppStoreVersionService } from "../domains/versions/service";
import { getAppInfosForApp } from "../domains/app-info/api-client";
import { z } from "zod";
import {
  AppStoreLocalizationSchema,
  AppStoreVersionLocalizationSchema,
  AppStoreAppInfoLocalizationSchema,
} from "../models/app-store";
import { LocaleCodeSchema } from "../models/locales";

// Mock dependencies
jest.mock("../domains/versions/localization-service");
jest.mock("../domains/app-info/localization-service");
jest.mock("../domains/versions/service");
jest.mock("../domains/app-info/api-client");
jest.mock("../utils/logger");

const MockAppStoreVersionLocalizationService =
  AppStoreVersionLocalizationService as jest.MockedClass<
    typeof AppStoreVersionLocalizationService
  >;
const MockAppInfoLocalizationService =
  AppInfoLocalizationService as jest.MockedClass<
    typeof AppInfoLocalizationService
  >;
const MockAppStoreVersionService = AppStoreVersionService as jest.MockedClass<
  typeof AppStoreVersionService
>;
const MockGetAppInfosForApp = getAppInfosForApp as jest.MockedFunction<
  typeof getAppInfosForApp
>;

describe("LocalizationAggregator", () => {
  let aggregator: LocalizationAggregator;
  let mockVersionLocalizationService: jest.Mocked<AppStoreVersionLocalizationService>;
  let mockAppInfoLocalizationService: jest.Mocked<AppInfoLocalizationService>;
  let mockVersionService: jest.Mocked<AppStoreVersionService>;

  const testAppId = "test-app-id";
  const testVersionId = "test-version-id";
  const testAppInfoId = "test-app-info-id";
  const testLocale = "en-US" as z.infer<typeof LocaleCodeSchema>;

  beforeEach(() => {
    jest.clearAllMocks();

    aggregator = new LocalizationAggregator();

    // Get the mocked instances
    mockVersionLocalizationService =
      new MockAppStoreVersionLocalizationService() as jest.Mocked<AppStoreVersionLocalizationService>;
    mockAppInfoLocalizationService =
      new MockAppInfoLocalizationService() as jest.Mocked<AppInfoLocalizationService>;
    mockVersionService =
      new MockAppStoreVersionService() as jest.Mocked<AppStoreVersionService>;

    // Replace the instances in the aggregator
    (aggregator as any).versionLocalizationService =
      mockVersionLocalizationService;
    (aggregator as any).appInfoLocalizationService =
      mockAppInfoLocalizationService;
    (aggregator as any).versionService = mockVersionService;
  });

  describe("getCurrentVersion", () => {
    it("should return cached version if available", async () => {
      // Set cached version
      (aggregator as any).cachedVersionId = testVersionId;

      const result = await (aggregator as any).getCurrentVersion(testAppId);

      expect(result).toEqual({ id: testVersionId });
      expect(mockVersionService.getVersionsForApp).not.toHaveBeenCalled();
    });

    it("should fetch and cache version if not cached", async () => {
      const mockVersions = [
        {
          id: "old-version",
          attributes: { appVersionState: "REPLACED_WITH_NEW_VERSION" },
        },
        {
          id: testVersionId,
          attributes: { appVersionState: "PENDING_DEVELOPER_RELEASE" },
        },
        {
          id: "newer-version",
          attributes: { appVersionState: "READY_FOR_SALE" },
        },
      ];

      mockVersionService.getVersionsForApp.mockResolvedValue(
        mockVersions as any
      );

      const result = await (aggregator as any).getCurrentVersion(testAppId);

      expect(result).toEqual(mockVersions[1]);
      expect((aggregator as any).cachedVersionId).toBe(testVersionId);
      expect(mockVersionService.getVersionsForApp).toHaveBeenCalledWith(
        testAppId
      );
    });

    it("should return null if no active version found", async () => {
      const mockVersions = [
        {
          id: "old-version",
          attributes: { appVersionState: "REPLACED_WITH_NEW_VERSION" },
        },
        {
          id: "another-old",
          attributes: { appVersionState: "REPLACED_WITH_NEW_VERSION" },
        },
      ];

      mockVersionService.getVersionsForApp.mockResolvedValue(
        mockVersions as any
      );

      const result = await (aggregator as any).getCurrentVersion(testAppId);

      expect(result).toBeNull();
      expect((aggregator as any).cachedVersionId).toBeNull();
    });

    it("should handle versions without appVersionState", async () => {
      const mockVersions = [
        { id: testVersionId, attributes: {} },
        {
          id: "another-version",
          attributes: { appVersionState: "READY_FOR_SALE" },
        },
      ];

      mockVersionService.getVersionsForApp.mockResolvedValue(
        mockVersions as any
      );

      const result = await (aggregator as any).getCurrentVersion(testAppId);

      expect(result).toEqual(mockVersions[1]);
    });
  });

  describe("getAppInfoId", () => {
    it("should return cached app info ID if available", async () => {
      (aggregator as any).cachedAppInfoId = testAppInfoId;

      const result = await (aggregator as any).getAppInfoId(testAppId);

      expect(result).toBe(testAppInfoId);
      expect(MockGetAppInfosForApp).not.toHaveBeenCalled();
    });

    it("should fetch and cache app info ID if not cached", async () => {
      const mockAppInfos = [
        { id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } },
      ];

      MockGetAppInfosForApp.mockResolvedValue({ data: mockAppInfos } as any);

      const result = await (aggregator as any).getAppInfoId(testAppId);

      expect(result).toBe(testAppInfoId);
      expect((aggregator as any).cachedAppInfoId).toBe(testAppInfoId);
      expect(MockGetAppInfosForApp).toHaveBeenCalledWith(testAppId);
    });

    it("should handle multiple app infos and use first active one", async () => {
      const mockAppInfos = [
        { id: "replaced", attributes: { state: "REPLACED_WITH_NEW_INFO" } },
        { id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } },
        {
          id: "another-active",
          attributes: { state: "PENDING_DEVELOPER_RELEASE" },
        },
      ];

      MockGetAppInfosForApp.mockResolvedValue({ data: mockAppInfos } as any);

      const result = await (aggregator as any).getAppInfoId(testAppId);

      expect(result).toBe(testAppInfoId);
    });

    it("should throw error if no app infos found", async () => {
      MockGetAppInfosForApp.mockResolvedValue({ data: [] } as any);

      await expect((aggregator as any).getAppInfoId(testAppId)).rejects.toThrow(
        "No app info found for app test-app-id"
      );
    });

    it("should throw error if all app infos are replaced", async () => {
      const mockAppInfos = [
        { id: "replaced1", attributes: { state: "REPLACED_WITH_NEW_INFO" } },
        { id: "replaced2", attributes: { state: "REPLACED_WITH_NEW_INFO" } },
      ];

      MockGetAppInfosForApp.mockResolvedValue({ data: mockAppInfos } as any);

      await expect((aggregator as any).getAppInfoId(testAppId)).rejects.toThrow(
        "No app info found for app test-app-id"
      );
    });

    it("should handle API errors gracefully", async () => {
      MockGetAppInfosForApp.mockRejectedValue(new Error("API Error"));

      await expect((aggregator as any).getAppInfoId(testAppId)).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("createAppLocalization", () => {
    const testLocalization: z.infer<typeof AppStoreLocalizationSchema> = {
      locale: testLocale,
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

    beforeEach(() => {
      // Mock successful version and app info retrieval
      mockVersionService.getVersionsForApp.mockResolvedValue([
        {
          id: testVersionId,
          attributes: { appVersionState: "PENDING_DEVELOPER_RELEASE" },
        },
      ] as any);

      MockGetAppInfosForApp.mockResolvedValue({
        data: [{ id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } }],
      } as any);
    });

    it("should create new version localization when none exists", async () => {
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);

      const result = await aggregator.createAppLocalization(
        testAppId,
        testLocale,
        testLocalization
      );

      expect(
        mockVersionLocalizationService.createLocalization
      ).toHaveBeenCalledWith(testVersionId, testLocale, {
        description: testLocalization.description,
        keywords: testLocalization.keywords,
        marketingUrl: testLocalization.marketingUrl,
        promotionalText: testLocalization.promotionalText,
        supportUrl: testLocalization.supportUrl,
        whatsNew: testLocalization.whatsNew,
      });
      expect(result.versionLocalization).toBeDefined();
    });

    it("should update existing version localization", async () => {
      const existingVersionLoc = { id: "existing-version-loc" };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingVersionLoc as any
      );
      mockVersionLocalizationService.updateLocalization.mockResolvedValue({
        id: "updated-version-loc",
      } as any);

      const result = await aggregator.createAppLocalization(
        testAppId,
        testLocale,
        testLocalization
      );

      expect(
        mockVersionLocalizationService.updateLocalization
      ).toHaveBeenCalledWith(existingVersionLoc.id, {
        description: testLocalization.description,
        keywords: testLocalization.keywords,
        marketingUrl: testLocalization.marketingUrl,
        promotionalText: testLocalization.promotionalText,
        supportUrl: testLocalization.supportUrl,
        whatsNew: testLocalization.whatsNew,
      });
      expect(result.versionLocalization).toBeDefined();
    });

    it("should create new app info localization when none exists", async () => {
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockAppInfoLocalizationService.createLocalization.mockResolvedValue({
        id: "new-app-info-loc",
      } as any);

      const result = await aggregator.createAppLocalization(
        testAppId,
        testLocale,
        testLocalization
      );

      expect(
        mockAppInfoLocalizationService.createLocalization
      ).toHaveBeenCalledWith(testAppInfoId, testLocale, {
        name: testLocalization.name,
        subtitle: testLocalization.subtitle,
        privacyPolicyUrl: testLocalization.privacyPolicyUrl,
        privacyChoicesUrl: testLocalization.privacyChoicesUrl,
      });
      expect(result.appInfoLocalization).toBeDefined();
    });

    it("should update existing app info localization", async () => {
      const existingAppInfoLoc = { id: "existing-app-info-loc" };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingAppInfoLoc as any
      );
      mockAppInfoLocalizationService.updateLocalization.mockResolvedValue({
        id: "updated-app-info-loc",
      } as any);

      const result = await aggregator.createAppLocalization(
        testAppId,
        testLocale,
        testLocalization
      );

      expect(
        mockAppInfoLocalizationService.updateLocalization
      ).toHaveBeenCalledWith(existingAppInfoLoc.id, {
        name: testLocalization.name,
        subtitle: testLocalization.subtitle,
        privacyPolicyUrl: testLocalization.privacyPolicyUrl,
        privacyChoicesUrl: testLocalization.privacyChoicesUrl,
      });
      expect(result.appInfoLocalization).toBeDefined();
    });

    it("should throw error when creating app info localization without name", async () => {
      const localizationWithoutName = { ...testLocalization, name: undefined };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );

      await expect(
        aggregator.createAppLocalization(
          testAppId,
          testLocale,
          localizationWithoutName
        )
      ).rejects.toThrow(
        "Name is required when creating a new app info localization for locale: en-US"
      );
    });

    it("should handle version-only localization (no app info fields)", async () => {
      const versionOnlyLocalization = {
        locale: testLocale,
        description: "Test description",
        keywords: "test,app",
      };

      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);

      const result = await aggregator.createAppLocalization(
        testAppId,
        testLocale,
        versionOnlyLocalization
      );

      expect(result.versionLocalization).toBeDefined();
      expect(result.appInfoLocalization).toBeUndefined();
      expect(
        mockAppInfoLocalizationService.findLocalizationByLocale
      ).not.toHaveBeenCalled();
    });
  });

  describe("updateAppLocalization", () => {
    const versionChanges: Partial<
      z.infer<typeof AppStoreVersionLocalizationSchema>
    > = {
      description: "Updated description",
      keywords: "updated,keywords",
    };

    const appInfoChanges: Partial<
      z.infer<typeof AppStoreAppInfoLocalizationSchema>
    > = {
      name: "Updated App Name",
      subtitle: "Updated subtitle",
    };

    beforeEach(() => {
      mockVersionService.getVersionsForApp.mockResolvedValue([
        {
          id: testVersionId,
          attributes: { appVersionState: "PENDING_DEVELOPER_RELEASE" },
        },
      ] as any);

      MockGetAppInfosForApp.mockResolvedValue({
        data: [{ id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } }],
      } as any);
    });

    it("should update version localization when changes provided", async () => {
      const existingVersionLoc = { id: "existing-version-loc" };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingVersionLoc as any
      );
      mockVersionLocalizationService.updateLocalization.mockResolvedValue({
        id: "updated-version-loc",
      } as any);

      const result = await aggregator.updateAppLocalization(
        testAppId,
        testLocale,
        versionChanges,
        {}
      );

      expect(
        mockVersionLocalizationService.updateLocalization
      ).toHaveBeenCalledWith(existingVersionLoc.id, versionChanges);
      expect(result.versionLocalization).toBeDefined();
    });

    it("should create version localization when none exists", async () => {
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockVersionLocalizationService.createLocalization.mockResolvedValue({
        id: "new-version-loc",
      } as any);

      const result = await aggregator.updateAppLocalization(
        testAppId,
        testLocale,
        versionChanges,
        {}
      );

      expect(
        mockVersionLocalizationService.createLocalization
      ).toHaveBeenCalledWith(testVersionId, testLocale, versionChanges);
      expect(result.versionLocalization).toBeDefined();
    });

    it("should update app info localization when changes provided", async () => {
      const existingAppInfoLoc = { id: "existing-app-info-loc" };
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingAppInfoLoc as any
      );
      mockAppInfoLocalizationService.updateLocalization.mockResolvedValue({
        id: "updated-app-info-loc",
      } as any);

      const result = await aggregator.updateAppLocalization(
        testAppId,
        testLocale,
        {},
        appInfoChanges
      );

      expect(
        mockAppInfoLocalizationService.updateLocalization
      ).toHaveBeenCalledWith(existingAppInfoLoc.id, appInfoChanges);
      expect(result.appInfoLocalization).toBeDefined();
    });

    it("should create app info localization when none exists", async () => {
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockAppInfoLocalizationService.createLocalization.mockResolvedValue({
        id: "new-app-info-loc",
      } as any);

      const result = await aggregator.updateAppLocalization(
        testAppId,
        testLocale,
        {},
        appInfoChanges
      );

      expect(
        mockAppInfoLocalizationService.createLocalization
      ).toHaveBeenCalledWith(testAppInfoId, testLocale, {
        name: appInfoChanges.name || "",
        subtitle: appInfoChanges.subtitle,
        privacyPolicyUrl: appInfoChanges.privacyPolicyUrl,
        privacyChoicesUrl: appInfoChanges.privacyChoicesUrl,
      });
      expect(result.appInfoLocalization).toBeDefined();
    });

    it("should handle empty changes gracefully", async () => {
      const result = await aggregator.updateAppLocalization(
        testAppId,
        testLocale,
        {},
        {}
      );

      expect(result.versionLocalization).toBeUndefined();
      expect(result.appInfoLocalization).toBeUndefined();
      expect(
        mockVersionLocalizationService.findLocalizationByLocale
      ).not.toHaveBeenCalled();
      expect(
        mockAppInfoLocalizationService.findLocalizationByLocale
      ).not.toHaveBeenCalled();
    });
  });

  describe("deleteAppLocalization", () => {
    beforeEach(() => {
      mockVersionService.getVersionsForApp.mockResolvedValue([
        {
          id: testVersionId,
          attributes: { appVersionState: "PENDING_DEVELOPER_RELEASE" },
        },
      ] as any);

      MockGetAppInfosForApp.mockResolvedValue({
        data: [{ id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } }],
      } as any);
    });

    it("should delete both version and app info localizations", async () => {
      const existingVersionLoc = { id: "existing-version-loc" };
      const existingAppInfoLoc = { id: "existing-app-info-loc" };

      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingVersionLoc as any
      );
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingAppInfoLoc as any
      );

      await aggregator.deleteAppLocalization(testAppId, testLocale);

      expect(
        mockVersionLocalizationService.deleteLocalization
      ).toHaveBeenCalledWith(existingVersionLoc.id);
      expect(
        mockAppInfoLocalizationService.deleteLocalization
      ).toHaveBeenCalledWith(existingAppInfoLoc.id);
    });

    it("should handle missing version localization gracefully", async () => {
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );

      await expect(
        aggregator.deleteAppLocalization(testAppId, testLocale)
      ).resolves.not.toThrow();

      expect(
        mockVersionLocalizationService.deleteLocalization
      ).not.toHaveBeenCalled();
      expect(
        mockAppInfoLocalizationService.deleteLocalization
      ).not.toHaveBeenCalled();
    });

    it("should handle missing app info localization gracefully", async () => {
      const existingVersionLoc = { id: "existing-version-loc" };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingVersionLoc as any
      );
      mockAppInfoLocalizationService.findLocalizationByLocale.mockResolvedValue(
        null
      );

      await expect(
        aggregator.deleteAppLocalization(testAppId, testLocale)
      ).resolves.not.toThrow();

      expect(
        mockVersionLocalizationService.deleteLocalization
      ).toHaveBeenCalledWith(existingVersionLoc.id);
      expect(
        mockAppInfoLocalizationService.deleteLocalization
      ).not.toHaveBeenCalled();
    });

    it("should handle app info deletion errors gracefully", async () => {
      const existingVersionLoc = { id: "existing-version-loc" };
      mockVersionLocalizationService.findLocalizationByLocale.mockResolvedValue(
        existingVersionLoc as any
      );
      mockAppInfoLocalizationService.findLocalizationByLocale.mockRejectedValue(
        new Error("API Error")
      );

      await expect(
        aggregator.deleteAppLocalization(testAppId, testLocale)
      ).resolves.not.toThrow();

      expect(
        mockVersionLocalizationService.deleteLocalization
      ).toHaveBeenCalledWith(existingVersionLoc.id);
    });
  });

  describe("fetchAllLocalizations", () => {
    beforeEach(() => {
      mockVersionService.getVersionsForApp.mockResolvedValue([
        {
          id: testVersionId,
          attributes: { appVersionState: "PENDING_DEVELOPER_RELEASE" },
        },
      ] as any);

      MockGetAppInfosForApp.mockResolvedValue({
        data: [{ id: testAppInfoId, attributes: { state: "READY_FOR_SALE" } }],
      } as any);
    });

    it("should fetch and merge localizations correctly", async () => {
      const versionLocalizations = [
        {
          id: "version-loc-1",
          attributes: {
            locale: "en-US",
            description: "Version description",
            keywords: "version,keywords",
          },
        },
        {
          id: "version-loc-2",
          attributes: {
            locale: "fr-FR",
            description: "French version description",
            keywords: "french,version",
          },
        },
      ];

      const appInfoLocalizations = [
        {
          id: "app-info-loc-1",
          attributes: {
            locale: "en-US",
            name: "App Name",
            subtitle: "App Subtitle",
          },
        },
        {
          id: "app-info-loc-2",
          attributes: {
            locale: "fr-FR",
            name: "French App Name",
            subtitle: "French App Subtitle",
          },
        },
      ];

      mockVersionLocalizationService.getLocalizationsForVersion.mockResolvedValue(
        versionLocalizations as any
      );
      mockAppInfoLocalizationService.getLocalizationsForAppInfo.mockResolvedValue(
        appInfoLocalizations as any
      );

      const result = await aggregator.fetchAllLocalizations(testAppId);

      expect(result).toHaveLength(2);

      const enUSLocalization = result.find((loc) => loc.locale === "en-US");
      expect(enUSLocalization).toEqual({
        locale: "en-US",
        description: "Version description",
        keywords: "version,keywords",
        name: "App Name",
        subtitle: "App Subtitle",
      });

      const frFRLocalization = result.find((loc) => loc.locale === "fr-FR");
      expect(frFRLocalization).toEqual({
        locale: "fr-FR",
        description: "French version description",
        keywords: "french,version",
        name: "French App Name",
        subtitle: "French App Subtitle",
      });
    });

    it("should handle version localizations without locale", async () => {
      const versionLocalizations = [
        {
          id: "version-loc-1",
          attributes: {
            description: "Version description",
            keywords: "version,keywords",
          },
        },
      ];

      const appInfoLocalizations = [
        {
          id: "app-info-loc-1",
          attributes: {
            locale: "en-US",
            name: "App Name",
          },
        },
      ];

      mockVersionLocalizationService.getLocalizationsForVersion.mockResolvedValue(
        versionLocalizations as any
      );
      mockAppInfoLocalizationService.getLocalizationsForAppInfo.mockResolvedValue(
        appInfoLocalizations as any
      );

      const result = await aggregator.fetchAllLocalizations(testAppId);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        locale: "en-US",
        name: "App Name",
      });
    });

    it("should handle app info localizations without locale", async () => {
      const versionLocalizations = [
        {
          id: "version-loc-1",
          attributes: {
            locale: "en-US",
            description: "Version description",
          },
        },
      ];

      const appInfoLocalizations = [
        {
          id: "app-info-loc-1",
          attributes: {
            name: "App Name",
          },
        },
      ];

      mockVersionLocalizationService.getLocalizationsForVersion.mockResolvedValue(
        versionLocalizations as any
      );
      mockAppInfoLocalizationService.getLocalizationsForAppInfo.mockResolvedValue(
        appInfoLocalizations as any
      );

      const result = await aggregator.fetchAllLocalizations(testAppId);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        locale: "en-US",
        description: "Version description",
      });
    });

    it("should return empty array when no version found", async () => {
      mockVersionService.getVersionsForApp.mockResolvedValue([]);

      const result = await aggregator.fetchAllLocalizations(testAppId);

      expect(result).toEqual([]);
      expect(
        mockVersionLocalizationService.getLocalizationsForVersion
      ).not.toHaveBeenCalled();
      expect(
        mockAppInfoLocalizationService.getLocalizationsForAppInfo
      ).not.toHaveBeenCalled();
    });

    it("should handle empty localizations gracefully", async () => {
      mockVersionLocalizationService.getLocalizationsForVersion.mockResolvedValue(
        []
      );
      mockAppInfoLocalizationService.getLocalizationsForAppInfo.mockResolvedValue(
        []
      );

      const result = await aggregator.fetchAllLocalizations(testAppId);

      expect(result).toEqual([]);
    });
  });
});
