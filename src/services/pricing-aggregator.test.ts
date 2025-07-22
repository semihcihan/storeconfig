import { jest } from "@jest/globals";
import { mapAppPricing } from "./pricing-aggregator";
import {
  fetchAppManualPrices,
  fetchAppAutomaticPrices,
  fetchAppPriceScheduleBaseTerritory,
} from "../domains/pricing/api-client";
import { decodeTerritoryFromId } from "../helpers/id-encoding-helpers";
import { isNotFoundError } from "../helpers/error-handling-helpers";
import { logger } from "../utils/logger";

// Mock dependencies
jest.mock("../domains/pricing/api-client");
jest.mock("../helpers/id-encoding-helpers");
jest.mock("../helpers/error-handling-helpers");
jest.mock("../utils/logger");

const MockFetchAppManualPrices = fetchAppManualPrices as any;
const MockFetchAppAutomaticPrices = fetchAppAutomaticPrices as any;
const MockFetchAppPriceScheduleBaseTerritory =
  fetchAppPriceScheduleBaseTerritory as any;
const MockDecodeTerritoryFromId = decodeTerritoryFromId as any;
const MockIsNotFoundError = isNotFoundError as any;
const MockLogger = logger as any;

describe("pricing-aggregator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("mapAppPricing", () => {
    it("should return undefined when base territory is not found", async () => {
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockFetchAppPriceScheduleBaseTerritory).toHaveBeenCalledWith(
        "test-app-id"
      );
    });

    it("should return undefined when base territory has no ID", async () => {
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce({
        data: { id: null },
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.warn).toHaveBeenCalledWith(
        "Invalid base territory: null"
      );
    });

    it("should return undefined when base territory has empty ID", async () => {
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce({
        data: { id: "" },
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.warn).toHaveBeenCalledWith("Invalid base territory: ");
    });

    it("should map pricing successfully with manual and automatic prices", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: { customerPrice: "9.99" },
          },
          {
            type: "appPricePoints",
            id: "encoded-gbr-id",
            attributes: { customerPrice: "7.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-can-id",
            attributes: { customerPrice: "12.99" },
          },
        ],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA")
        .mockReturnValueOnce("GBR")
        .mockReturnValueOnce("CAN");

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [
          { price: "9.99", territory: "USA" },
          { price: "7.99", territory: "GBR" },
          { price: "12.99", territory: "CAN" },
        ],
      });

      expect(MockFetchAppPriceScheduleBaseTerritory).toHaveBeenCalledWith(
        "test-app-id"
      );
      expect(MockFetchAppManualPrices).toHaveBeenCalledWith("test-app-id");
      expect(MockFetchAppAutomaticPrices).toHaveBeenCalledWith(
        "test-app-id",
        "USA"
      );
    });

    it("should filter out price points with invalid territory IDs", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: { customerPrice: "9.99" },
          },
          {
            type: "appPricePoints",
            id: "encoded-invalid-id",
            attributes: { customerPrice: "7.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA").mockReturnValueOnce(
        null
      ); // Invalid territory

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "9.99", territory: "USA" }],
      });
    });

    it("should handle response without included data", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = null;
      const automaticPricesResponse = null;

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [],
      });
    });

    it("should handle response with empty included array", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [],
      });
    });

    it("should filter out non-appPricePoints items", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: { customerPrice: "9.99" },
          },
          {
            type: "territories",
            id: "USA",
            attributes: { name: "United States" },
          },
          {
            type: "appPricePoints",
            id: "encoded-gbr-id",
            attributes: { customerPrice: "7.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA").mockReturnValueOnce(
        "GBR"
      );

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [
          { price: "9.99", territory: "USA" },
          { price: "7.99", territory: "GBR" },
        ],
      });
    });

    it("should handle price points without customerPrice", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: {}, // No customerPrice
          },
          {
            type: "appPricePoints",
            id: "encoded-gbr-id",
            attributes: {}, // No customerPrice
          },
        ],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA").mockReturnValueOnce(
        "GBR"
      );

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [
          { price: "", territory: "USA" },
          { price: "", territory: "GBR" },
        ],
      });
    });

    it("should handle 404 errors gracefully", async () => {
      const error = new Error("Not found");
      MockFetchAppPriceScheduleBaseTerritory.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(true);

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.info).toHaveBeenCalledWith(
        "App pricing not found or not configured yet for app test-app-id"
      );
    });

    it("should re-throw non-404 errors", async () => {
      const error = new Error("Authentication failed");
      MockFetchAppPriceScheduleBaseTerritory.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(false);

      await expect(mapAppPricing("test-app-id")).rejects.toThrow(
        "Authentication failed"
      );

      expect(MockLogger.info).not.toHaveBeenCalled();
    });

    it("should handle 404 error in manual prices fetch", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const error = new Error("Not found");
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(true);

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.info).toHaveBeenCalledWith(
        "App pricing not found or not configured yet for app test-app-id"
      );
    });

    it("should handle 404 error in automatic prices fetch", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [],
      };

      const error = new Error("Not found");
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(true);

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.info).toHaveBeenCalledWith(
        "App pricing not found or not configured yet for app test-app-id"
      );
    });

    it("should handle mixed 404 and non-404 errors", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [],
      };

      const error = new Error("Authentication failed");
      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(false);

      await expect(mapAppPricing("test-app-id")).rejects.toThrow(
        "Authentication failed"
      );

      expect(MockLogger.info).not.toHaveBeenCalled();
    });

    it("should handle price points with null customerPrice", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: { customerPrice: null },
          },
        ],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA");

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "", territory: "USA" }],
      });
    });

    it("should handle price points with undefined customerPrice", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        included: [
          {
            type: "appPricePoints",
            id: "encoded-usa-id",
            attributes: { customerPrice: undefined },
          },
        ],
      };

      const automaticPricesResponse = {
        included: [],
      };

      MockFetchAppPriceScheduleBaseTerritory.mockResolvedValueOnce(
        baseTerritoryResponse
      );
      MockFetchAppManualPrices.mockResolvedValueOnce(manualPricesResponse);
      MockFetchAppAutomaticPrices.mockResolvedValueOnce(
        automaticPricesResponse
      );

      MockDecodeTerritoryFromId.mockReturnValueOnce("USA");

      const result = await mapAppPricing("test-app-id");

      expect(result).toEqual({
        baseTerritory: "USA",
        prices: [{ price: "", territory: "USA" }],
      });
    });
  });
});
