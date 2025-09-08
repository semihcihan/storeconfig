import { jest } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import {
  fetchAllTerritories,
  saveTerritoriesToFile,
} from "./fetch-territories";

// Mock fs module
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock path
jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;

// Mock the api service
jest.mock("../services/api", () => ({
  api: {
    GET: jest.fn(),
  },
}));

// Mock process.cwd
const originalCwd = process.cwd;
const mockCwd = "/mock/workspace";

// Import the mocked api
const { api } = require("../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("fetch-territories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => mockCwd);
    mockedPath.join.mockImplementation((...args) => args.join("/"));
  });

  afterEach(() => {
    process.cwd = originalCwd;
  });

  describe("fetchAllTerritories", () => {
    it("should fetch territories successfully", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {
                currency: "USD",
              },
            },
            {
              id: "GBR",
              attributes: {
                currency: "GBP",
              },
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const result = await fetchAllTerritories();

      expect(result).toEqual([
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
      ]);

      expect(mockedApi.GET).toHaveBeenCalledWith("/v1/territories", {
        params: {
          query: {
            limit: 200,
            "fields[territories]": ["currency"],
          },
        },
      });
    });

    it("should handle API error", async () => {
      const mockResponse = {
        error: new Error("API Error"),
        data: null,
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow("API Error");
    });

    it("should handle empty data response", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow(
        "No territories found"
      );
    });

    it("should handle missing data property", async () => {
      const mockResponse = {
        error: null,
        data: {
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow(
        "No territories found"
      );
    });

    it("should handle pagination not implemented", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {
                currency: "USD",
              },
            },
          ],
          links: {
            next: "https://api.example.com/territories?page=2",
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow(
        "Pagination not implemented"
      );
    });

    it("should handle missing currency attribute", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {},
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const result = await fetchAllTerritories();

      expect(result).toEqual([{ id: "USA", currency: undefined }]);
    });

    it("should handle null currency attribute", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {
                currency: null,
              },
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const result = await fetchAllTerritories();

      expect(result).toEqual([{ id: "USA", currency: null }]);
    });

    it("should handle API timeout or network error", async () => {
      const error = new Error("Network timeout");
      mockedApi.GET.mockRejectedValue(error);

      await expect(fetchAllTerritories()).rejects.toThrow("Network timeout");
    });
  });

  describe("saveTerritoriesToFile", () => {
    it("should save territories to currencies.json file", async () => {
      const territories = [
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
      ];

      await saveTerritoriesToFile(territories);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        JSON.stringify(territories, null, 2),
        "utf8"
      );
    });

    it("should handle empty territories array", async () => {
      const territories: any[] = [];

      await saveTerritoriesToFile(territories);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        "[]",
        "utf8"
      );
    });

    it("should handle territories with special characters", async () => {
      const territories = [
        { id: "USA", currency: "USD" },
        { id: "EUR", currency: "€" },
        { id: "JPY", currency: "¥" },
      ];

      await saveTerritoriesToFile(territories);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        JSON.stringify(territories, null, 2),
        "utf8"
      );
    });
  });

  describe("integration scenarios", () => {
    it("should handle the complete flow from fetch to save", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {
                currency: "USD",
              },
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const territories = await fetchAllTerritories();
      await saveTerritoriesToFile(territories);

      expect(territories).toEqual([{ id: "USA", currency: "USD" }]);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        "/mock/workspace/src/data/currencies.json",
        JSON.stringify(territories, null, 2),
        "utf8"
      );
    });

    it("should handle territories with various currency formats", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              attributes: {
                currency: "USD",
              },
            },
            {
              id: "GBR",
              attributes: {
                currency: "GBP",
              },
            },
            {
              id: "EUR",
              attributes: {
                currency: "EUR",
              },
            },
            {
              id: "JPY",
              attributes: {
                currency: "JPY",
              },
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const territories = await fetchAllTerritories();

      expect(territories).toEqual([
        { id: "USA", currency: "USD" },
        { id: "GBR", currency: "GBP" },
        { id: "EUR", currency: "EUR" },
        { id: "JPY", currency: "JPY" },
      ]);

      expect(territories).toHaveLength(4);
      expect(territories.every((t) => t.id && t.currency)).toBe(true);
    });

    it("should handle file system errors gracefully", async () => {
      const territories = [{ id: "USA", currency: "USD" }];

      const fileError = new Error("Permission denied");
      mockedFs.writeFileSync.mockImplementation(() => {
        throw fileError;
      });

      await expect(saveTerritoriesToFile(territories)).rejects.toThrow(
        "Permission denied"
      );
    });
  });

  describe("error handling edge cases", () => {
    it("should handle malformed API response", async () => {
      const mockResponse = {
        error: null,
        data: null,
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow(
        "Cannot read properties of null"
      );
    });

    it("should handle API response with missing attributes", async () => {
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: "USA",
              // Missing attributes
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      await expect(fetchAllTerritories()).rejects.toThrow(
        "Cannot read properties of undefined"
      );
    });

    it("should handle very long territory IDs", async () => {
      const longId = "A".repeat(1000);
      const mockResponse = {
        error: null,
        data: {
          data: [
            {
              id: longId,
              attributes: {
                currency: "USD",
              },
            },
          ],
          links: {
            next: null,
          },
        },
      };

      mockedApi.GET.mockResolvedValue(mockResponse);

      const territories = await fetchAllTerritories();

      expect(territories[0].id).toBe(longId);
      expect(territories[0].currency).toBe("USD");
    });
  });
});
