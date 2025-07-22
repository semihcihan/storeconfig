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
});
