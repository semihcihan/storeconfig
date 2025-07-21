import { AppStoreVersionLocalizationService } from "./app-store-version-localization-service";

// Mock the api module
jest.mock("./api", () => ({
  api: {
    POST: jest.fn(),
    GET: jest.fn(),
    PATCH: jest.fn(),
    DELETE: jest.fn(),
  },
}));

import { api } from "./api";

const mockApi = api as any;

describe("AppStoreVersionLocalizationService", () => {
  let service: AppStoreVersionLocalizationService;

  beforeEach(() => {
    service = new AppStoreVersionLocalizationService();
    jest.clearAllMocks();
  });

  describe("createLocalization", () => {
    it("should create a new app store version localization", async () => {
      const mockResponse = {
        data: {
          data: {
            id: "localization-123",
            type: "appStoreVersionLocalizations",
            attributes: {
              locale: "en-US",
              description: "Test description",
            },
          },
        },
      };

      mockApi.POST.mockResolvedValue(mockResponse);

      const localizationData = {
        locale: "en-US" as const,
        description: "Test description",
      };

      const result = await service.createLocalization(
        "version-123",
        "en-US",
        localizationData
      );

      expect(mockApi.POST).toHaveBeenCalledWith(
        "/v1/appStoreVersionLocalizations",
        {
          body: {
            data: {
              type: "appStoreVersionLocalizations",
              attributes: {
                locale: "en-US",
                description: "Test description",
              },
              relationships: {
                appStoreVersion: {
                  data: {
                    type: "appStoreVersions",
                    id: "version-123",
                  },
                },
              },
            },
          },
        }
      );

      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe("getLocalization", () => {
    it("should get an app store version localization", async () => {
      const mockResponse = {
        data: {
          data: {
            id: "localization-123",
            type: "appStoreVersionLocalizations",
            attributes: {
              locale: "en-US",
              description: "Test description",
            },
          },
        },
      };

      mockApi.GET.mockResolvedValue(mockResponse);

      const result = await service.getLocalization("localization-123");

      expect(mockApi.GET).toHaveBeenCalledWith(
        "/v1/appStoreVersionLocalizations/{id}",
        {
          params: {
            path: { id: "localization-123" },
          },
        }
      );

      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe("updateLocalization", () => {
    it("should update an app store version localization", async () => {
      const mockResponse = {
        data: {
          data: {
            id: "localization-123",
            type: "appStoreVersionLocalizations",
            attributes: {
              locale: "en-US",
              description: "Updated description",
            },
          },
        },
      };

      mockApi.PATCH.mockResolvedValue(mockResponse);

      const localizationData = {
        locale: "en-US" as const,
        description: "Updated description",
      };

      const result = await service.updateLocalization(
        "localization-123",
        localizationData
      );

      expect(mockApi.PATCH).toHaveBeenCalledWith(
        "/v1/appStoreVersionLocalizations/{id}",
        {
          params: {
            path: { id: "localization-123" },
          },
          body: {
            data: {
              type: "appStoreVersionLocalizations",
              id: "localization-123",
              attributes: {
                description: "Updated description",
              },
            },
          },
        }
      );

      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe("deleteLocalization", () => {
    it("should delete an app store version localization", async () => {
      mockApi.DELETE.mockResolvedValue({});

      await service.deleteLocalization("localization-123");

      expect(mockApi.DELETE).toHaveBeenCalledWith(
        "/v1/appStoreVersionLocalizations/{id}",
        {
          params: {
            path: { id: "localization-123" },
          },
        }
      );
    });
  });

  describe("getLocalizationsForVersion", () => {
    it("should get all localizations for a version", async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: "localization-123",
              type: "appStoreVersionLocalizations",
              attributes: {
                locale: "en-US",
                description: "English description",
              },
            },
          ],
        },
      };

      mockApi.GET.mockResolvedValue(mockResponse);

      const result = await service.getLocalizationsForVersion("version-123");

      expect(mockApi.GET).toHaveBeenCalledWith(
        "/v1/appStoreVersions/{id}/appStoreVersionLocalizations",
        {
          params: {
            path: { id: "version-123" },
          },
        }
      );

      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe("findLocalizationByLocale", () => {
    it("should find localization by locale", async () => {
      const mockLocalizations = [
        {
          id: "localization-123",
          type: "appStoreVersionLocalizations" as const,
          attributes: {
            locale: "en-US",
            description: "English description",
          },
        },
      ];

      jest
        .spyOn(service, "getLocalizationsForVersion")
        .mockResolvedValue(mockLocalizations);

      const result = await service.findLocalizationByLocale(
        "version-123",
        "en-US"
      );

      expect(result).toEqual(mockLocalizations[0]);
    });

    it("should return null when localization not found", async () => {
      const mockLocalizations = [
        {
          id: "localization-123",
          type: "appStoreVersionLocalizations" as const,
          attributes: {
            locale: "en-US",
            description: "English description",
          },
        },
      ];

      jest
        .spyOn(service, "getLocalizationsForVersion")
        .mockResolvedValue(mockLocalizations);

      const result = await service.findLocalizationByLocale(
        "version-123",
        "fr-FR"
      );

      expect(result).toBeNull();
    });
  });
});
