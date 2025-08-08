import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import * as fs from "fs";
import { logger } from "../utils/logger";

// Mock dependencies
jest.mock("fs");
jest.mock("../utils/logger");
jest.mock("../utils/validation-helpers");

const mockFs = jest.mocked(fs);
const mockLogger = jest.mocked(logger);

// Import the service after mocking
import {
  pricingItemsExist,
  startInteractivePricing,
} from "./set-price-prompt-service";

describe("set-price-prompt-service", () => {
  const testInputFile = "test-file.json";

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.info.mockReturnValue(undefined);
    mockLogger.error.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("pricingItemsExist", () => {
    it("should pass validation when file has items", () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;

      expect(() => pricingItemsExist(mockData)).not.toThrow();
    });

    it("should throw error when file contains no items", () => {
      const mockData = { schemaVersion: "1.0.0", appId: "123" } as any;

      expect(() => pricingItemsExist(mockData)).toThrow(
        "Input file must contain at least one item (app, in-app purchase, or subscription)"
      );
    });

    it("should pass validation when file has subscription groups", () => {
      const mockData = { subscriptionGroups: [{ id: "test" }] } as any;

      expect(() => pricingItemsExist(mockData)).not.toThrow();
    });
  });

  describe("startInteractivePricing", () => {
    it("should return pricing result with temporary data", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;
      const fileContent = JSON.stringify(mockData);

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(fileContent);

      const result = await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: mockData,
      });

      expect(result).toEqual({
        selectedItem: {
          type: "app",
          id: "",
          name: "",
        },
        basePrice: 0,
        pricingStrategy: "apple",
      });
    });

    it("should handle rollback functionality", async () => {
      const mockData = { inAppPurchases: [{ id: "test" }] } as any;
      const fileContent = JSON.stringify(mockData);

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(fileContent);
      mockFs.writeFileSync.mockReturnValue(undefined);

      // Test that the function reads the file for backup
      await startInteractivePricing({
        inputFile: testInputFile,
        appStoreState: mockData,
      });

      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        "test-file.json",
        "utf-8"
      );
    });
  });
});
