import { AppStoreVersionService, AppVersionState } from "./service";

// Mock the domain API client
jest.mock("./api-client", () => ({
  createAppStoreVersion: jest.fn(),
  getAppStoreVersion: jest.fn(),
  updateAppStoreVersion: jest.fn(),
  deleteAppStoreVersion: jest.fn(),
  getAppStoreVersionsForApp: jest.fn(),
}));

import * as apiClient from "./api-client";

const mockCreateAppStoreVersion =
  apiClient.createAppStoreVersion as jest.MockedFunction<
    typeof apiClient.createAppStoreVersion
  >;
const mockGetAppStoreVersion =
  apiClient.getAppStoreVersion as jest.MockedFunction<
    typeof apiClient.getAppStoreVersion
  >;
const mockUpdateAppStoreVersion =
  apiClient.updateAppStoreVersion as jest.MockedFunction<
    typeof apiClient.updateAppStoreVersion
  >;
const mockDeleteAppStoreVersion =
  apiClient.deleteAppStoreVersion as jest.MockedFunction<
    typeof apiClient.deleteAppStoreVersion
  >;
const mockGetAppStoreVersionsForApp =
  apiClient.getAppStoreVersionsForApp as jest.MockedFunction<
    typeof apiClient.getAppStoreVersionsForApp
  >;

describe("AppStoreVersionService", () => {
  let service: AppStoreVersionService;

  beforeEach(() => {
    service = new AppStoreVersionService();
    jest.clearAllMocks();
  });

  describe("createVersion", () => {
    it("should create a new app store version", async () => {
      const mockResponse = {
        data: {
          id: "version-123",
          type: "appStoreVersions",
          attributes: {
            versionString: "1.0.0",
            appVersionState: "PREPARE_FOR_SUBMISSION" as AppVersionState,
          },
        },
      } as any;

      mockCreateAppStoreVersion.mockResolvedValue(mockResponse);

      const result = await service.createVersion("app-123", "1.0.0");

      expect(mockCreateAppStoreVersion).toHaveBeenCalledWith(
        "app-123",
        "1.0.0",
        undefined
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when creation fails", async () => {
      const mockError = new Error("Version already exists");
      mockCreateAppStoreVersion.mockRejectedValue(mockError);

      await expect(service.createVersion("app-123", "1.0.0")).rejects.toThrow(
        "Version already exists"
      );
    });
  });

  describe("getVersion", () => {
    it("should get an app store version", async () => {
      const mockResponse = {
        data: {
          id: "version-123",
          type: "appStoreVersions",
          attributes: {
            versionString: "1.0.0",
            appVersionState: "PREPARE_FOR_SUBMISSION" as AppVersionState,
          },
        },
      } as any;

      mockGetAppStoreVersion.mockResolvedValue(mockResponse);

      const result = await service.getVersion("version-123");

      expect(mockGetAppStoreVersion).toHaveBeenCalledWith("version-123");
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when getting version fails", async () => {
      const mockError = new Error("Version not found");
      mockGetAppStoreVersion.mockRejectedValue(mockError);

      await expect(service.getVersion("version-123")).rejects.toThrow(
        "Version not found"
      );
    });
  });

  describe("updateVersion", () => {
    it("should update an app store version", async () => {
      const mockResponse = {
        data: {
          id: "version-123",
          type: "appStoreVersions",
          attributes: {
            versionString: "1.0.1",
            appVersionState: "PREPARE_FOR_SUBMISSION" as AppVersionState,
          },
        },
      } as any;

      mockUpdateAppStoreVersion.mockResolvedValue(mockResponse);

      const result = await service.updateVersion("version-123", "1.0.1");

      expect(mockUpdateAppStoreVersion).toHaveBeenCalledWith(
        "version-123",
        "1.0.1",
        undefined
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when update fails due to immutable state", async () => {
      const mockError = new Error("Version cannot be updated");
      mockUpdateAppStoreVersion.mockRejectedValue(mockError);

      await expect(
        service.updateVersion("version-123", "1.0.1")
      ).rejects.toThrow("Version cannot be updated");
    });
  });

  describe("deleteVersion", () => {
    it("should delete an app store version", async () => {
      mockDeleteAppStoreVersion.mockResolvedValue(undefined);

      await service.deleteVersion("version-123");

      expect(mockDeleteAppStoreVersion).toHaveBeenCalledWith("version-123");
    });

    it("should throw error when deletion fails", async () => {
      const mockError = new Error("Cannot delete version");
      mockDeleteAppStoreVersion.mockRejectedValue(mockError);

      await expect(service.deleteVersion("version-123")).rejects.toThrow(
        "Cannot delete version"
      );
    });
  });

  describe("getVersionsForApp", () => {
    it("should get all versions for an app", async () => {
      const mockResponse = {
        data: [
          {
            id: "version-123",
            type: "appStoreVersions",
            attributes: {
              versionString: "1.0.0",
              appVersionState: "PREPARE_FOR_SUBMISSION" as AppVersionState,
            },
          },
          {
            id: "version-124",
            type: "appStoreVersions",
            attributes: {
              versionString: "1.0.1",
              appVersionState: "READY_FOR_REVIEW" as AppVersionState,
            },
          },
        ],
      } as any;

      mockGetAppStoreVersionsForApp.mockResolvedValue(mockResponse);

      const result = await service.getVersionsForApp("app-123");

      expect(mockGetAppStoreVersionsForApp).toHaveBeenCalledWith("app-123");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("fetchVersionMetadata", () => {
    it("should return empty object when no versions found", async () => {
      mockGetAppStoreVersionsForApp.mockResolvedValue({
        data: [],
      } as any);

      const result = await service.fetchVersionMetadata("app-123");

      expect(result).toEqual({});
      expect(mockGetAppStoreVersionsForApp).toHaveBeenCalledWith("app-123");
    });

    it("should return metadata from the most recently created version", async () => {
      const mockVersions = [
        {
          id: "version-1",
          type: "appStoreVersions",
          attributes: {
            versionString: "1.0.0",
            copyright: "Copyright 2023",
            createdDate: "2023-01-01T00:00:00Z",
          },
        },
        {
          id: "version-2",
          type: "appStoreVersions",
          attributes: {
            versionString: "beta",
            copyright: "Copyright 2024",
            createdDate: "2024-01-01T00:00:00Z",
          },
        },
        {
          id: "version-3",
          type: "appStoreVersions",
          attributes: {
            versionString: "alpha",
            copyright: "Copyright 2023.5",
            createdDate: "2023-06-01T00:00:00Z",
          },
        },
      ] as any;

      mockGetAppStoreVersionsForApp.mockResolvedValue({
        data: mockVersions,
      } as any);

      const result = await service.fetchVersionMetadata("app-123");

      expect(result).toEqual({
        versionString: "beta",
        copyright: "Copyright 2024",
      });
    });

    it("should handle versions without createdDate", async () => {
      const mockVersions = [
        {
          id: "version-1",
          type: "appStoreVersions",
          attributes: {
            versionString: "1.0.0",
            copyright: "Copyright 2023",
            createdDate: "2023-01-01T00:00:00Z",
          },
        },
        {
          id: "version-2",
          type: "appStoreVersions",
          attributes: {
            versionString: "beta",
            copyright: "Copyright 2024",
          },
        },
      ] as any;

      mockGetAppStoreVersionsForApp.mockResolvedValue({
        data: mockVersions,
      } as any);

      const result = await service.fetchVersionMetadata("app-123");

      expect(result).toEqual({
        versionString: "1.0.0",
        copyright: "Copyright 2023",
      });
    });

    it("should handle arbitrary version strings correctly", async () => {
      const mockVersions = [
        {
          id: "version-1",
          type: "appStoreVersions",
          attributes: {
            versionString: "v1.10.0",
            copyright: "Copyright 2023",
            createdDate: "2023-01-01T00:00:00Z",
          },
        },
        {
          id: "version-2",
          type: "appStoreVersions",
          attributes: {
            versionString: "release-candidate",
            copyright: "Copyright 2024",
            createdDate: "2024-01-01T00:00:00Z",
          },
        },
        {
          id: "version-3",
          type: "appStoreVersions",
          attributes: {
            versionString: "2.0.0",
            copyright: "Copyright 2025",
            createdDate: "2023-06-01T00:00:00Z",
          },
        },
      ] as any;

      mockGetAppStoreVersionsForApp.mockResolvedValue({
        data: mockVersions,
      } as any);

      const result = await service.fetchVersionMetadata("app-123");

      expect(result).toEqual({
        versionString: "release-candidate",
        copyright: "Copyright 2024",
      });
    });

    it("should handle error gracefully", async () => {
      mockGetAppStoreVersionsForApp.mockRejectedValue(new Error("API Error"));

      const result = await service.fetchVersionMetadata("app-123");

      expect(result).toEqual({});
    });
  });
});
