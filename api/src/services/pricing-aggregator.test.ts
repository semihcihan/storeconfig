import { jest } from "@jest/globals";
import { mapAppPricing } from "./pricing-aggregator";
import {
  fetchAppManualPrices,
  fetchAppAutomaticPrices,
  fetchAppPriceScheduleBaseTerritory,
  getAppPriceSchedule,
} from "../domains/pricing/api-client";
import { isNotFoundError } from "@semihcihan/shared";
import { logger } from "@semihcihan/shared";

// Mock dependencies
jest.mock("../domains/pricing/api-client");
jest.mock("../helpers/id-encoding-helpers");
jest.mock("../helpers/error-handling-helpers");
jest.mock("../utils/logger");

const MockFetchAppManualPrices = fetchAppManualPrices as any;
const MockFetchAppAutomaticPrices = fetchAppAutomaticPrices as any;
const MockFetchAppPriceScheduleBaseTerritory =
  fetchAppPriceScheduleBaseTerritory as any;
const MockGetAppPriceSchedule = getAppPriceSchedule as any;
const MockIsNotFoundError = isNotFoundError as any;
const MockLogger = logger as any;

describe("pricing-aggregator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock implementations to default values
    MockIsNotFoundError.mockReset();
    MockIsNotFoundError.mockImplementation(() => false);
  });

  describe("mapAppPricing", () => {
    it("should return undefined when base territory is not found", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockGetAppPriceSchedule).toHaveBeenCalledWith("test-app-id");
    });

    it("should return undefined when base territory has no ID", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: null },
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.warn).toHaveBeenCalledWith(
        "Invalid price schedule ID:",
        {
          data: { id: null },
          error: null,
        }
      );
    });

    it("should return undefined when base territory has empty ID", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "" },
        error: null,
      });

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
      expect(MockLogger.warn).toHaveBeenCalledWith(
        "Invalid price schedule ID:",
        {
          data: { id: "" },
          error: null,
        }
      );
    });

    it("should map pricing successfully with manual and automatic prices", async () => {
      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "encoded-usa-id",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
          {
            type: "appPrices",
            id: "encoded-gbr-id",
            attributes: { startDate: "2023-01-01", endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-gbr" },
              },
              territory: { data: { type: "territories", id: "GBR" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "territories",
            id: "GBR",
            attributes: { currency: "GBP" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: { customerPrice: "9.99" },
          },
          {
            type: "appPricePoints",
            id: "price-point-gbr",
            attributes: { customerPrice: "7.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "encoded-can-id",
            attributes: { startDate: "2023-01-01", endDate: "2025-12-31" },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-can" },
              },
              territory: { data: { type: "territories", id: "CAN" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "CAN",
            attributes: { currency: "CAD" },
          },
          {
            type: "appPricePoints",
            id: "price-point-can",
            attributes: { customerPrice: "12.99" },
          },
        ],
      };

      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });
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
        prices: [
          { price: "9.99", territory: "USA" },
          { price: "7.99", territory: "GBR" },
          { price: "12.99", territory: "CAN" },
        ],
      });

      expect(MockFetchAppPriceScheduleBaseTerritory).toHaveBeenCalledWith(
        "price-schedule-id"
      );
      expect(MockFetchAppManualPrices).toHaveBeenCalledWith(
        "price-schedule-id"
      );
      expect(MockFetchAppAutomaticPrices).toHaveBeenCalledWith(
        "price-schedule-id",
        "USA"
      );
    });

    it("should filter out price points with invalid territory IDs", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "valid-price-usa",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: { customerPrice: "9.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        data: [],
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
        prices: [{ price: "9.99", territory: "USA" }],
      });
    });

    it("should handle response without included data", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

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
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [],
        included: [],
      };

      const automaticPricesResponse = {
        data: [],
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
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "price-usa",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
          {
            type: "appPrices",
            id: "price-gbr",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-gbr" },
              },
              territory: { data: { type: "territories", id: "GBR" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "territories",
            id: "GBR",
            attributes: { currency: "GBP" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: { customerPrice: "9.99" },
          },
          {
            type: "appPricePoints",
            id: "price-point-gbr",
            attributes: { customerPrice: "7.99" },
          },
        ],
      };

      const automaticPricesResponse = {
        data: [],
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
        prices: [
          { price: "9.99", territory: "USA" },
          { price: "7.99", territory: "GBR" },
        ],
      });
    });

    it("should handle price points without customerPrice", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "price-usa",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
          {
            type: "appPrices",
            id: "price-gbr",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-gbr" },
              },
              territory: { data: { type: "territories", id: "GBR" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "territories",
            id: "GBR",
            attributes: { currency: "GBP" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: {}, // No customerPrice
          },
          {
            type: "appPricePoints",
            id: "price-point-gbr",
            attributes: {}, // No customerPrice
          },
        ],
      };

      const automaticPricesResponse = {
        data: [],
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

    it("should handle 404 errors gracefully", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const error = new Error("Not found");
      MockFetchAppPriceScheduleBaseTerritory.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(true);

      const result = await mapAppPricing("test-app-id");

      expect(result).toBeUndefined();
    });

    it("should re-throw non-404 errors", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const error = new Error("Authentication failed");
      MockFetchAppPriceScheduleBaseTerritory.mockRejectedValueOnce(error);
      MockIsNotFoundError.mockReturnValueOnce(false);

      await expect(mapAppPricing("test-app-id")).rejects.toThrow(
        "Authentication failed"
      );

      expect(MockLogger.info).not.toHaveBeenCalled();
    });

    it("should handle 404 error in manual prices fetch", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

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
    });

    it("should handle 404 error in automatic prices fetch", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [],
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
    });

    it("should handle mixed 404 and non-404 errors", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [],
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
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "price-usa",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: { customerPrice: null },
          },
        ],
      };

      const automaticPricesResponse = {
        data: [],
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

    it("should handle price points with undefined customerPrice", async () => {
      MockGetAppPriceSchedule.mockResolvedValueOnce({
        data: { id: "price-schedule-id" },
        error: null,
      });

      const baseTerritoryResponse = {
        data: { id: "USA" },
        error: null,
      };

      const manualPricesResponse = {
        data: [
          {
            type: "appPrices",
            id: "price-usa",
            attributes: { startDate: undefined, endDate: undefined },
            relationships: {
              appPricePoint: {
                data: { type: "appPricePoints", id: "price-point-usa" },
              },
              territory: { data: { type: "territories", id: "USA" } },
            },
          },
        ],
        included: [
          {
            type: "territories",
            id: "USA",
            attributes: { currency: "USD" },
          },
          {
            type: "appPricePoints",
            id: "price-point-usa",
            attributes: { customerPrice: undefined },
          },
        ],
      };

      const automaticPricesResponse = {
        data: [],
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
  });
});
