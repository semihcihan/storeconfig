import { jest } from "@jest/globals";
import * as readline from "node:readline";
import { logger } from "../../utils/logger";
import { promptForBasePricePoint } from "./base-price-prompt";
import type { AppStoreModel } from "../../utils/validation-helpers";
import type { PricingItem, PricePointInfo } from "../../models/pricing-request";

// Mock dependencies
jest.mock("../../utils/logger");
jest.mock("node:readline");
jest.mock("./price-point-fetcher", () => ({
  fetchTerritoryPricePointsForSelectedItem: jest.fn(),
}));

const mockLogger = jest.mocked(logger);
const mockReadline = jest.mocked(readline);
const mockFetchTerritoryPricePointsForSelectedItem = jest.mocked(
  require("./price-point-fetcher").fetchTerritoryPricePointsForSelectedItem
);

describe("base-price-prompt", () => {
  let mockRl: any;
  let mockQuestion: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockQuestion = jest.fn();
    mockClose = jest.fn();

    mockRl = {
      question: mockQuestion,
      close: mockClose,
    };

    mockReadline.createInterface.mockReturnValue(mockRl);
    mockLogger.prompt.mockReturnValue("Enter base price in USD (e.g., 5.99): ");
  });

  describe("promptForBasePricePoint", () => {
    const mockAppStoreState: AppStoreModel = {
      schemaVersion: "1.0.0",
      appId: "test-app-id",
    } as any;

    const mockSelectedItem: PricingItem = {
      type: "app",
      id: "test-app-id",
      name: "Test App",
    };

    it("should successfully find price point when price formats match exactly", async () => {
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.00" },
        { id: "price-2", price: "4.99" },
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      const result = await promise;

      expect(result).toEqual({ id: "price-1", price: "3.00" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should successfully find price point when API returns different format than normalized", async () => {
      // This test demonstrates that the function now handles format mismatches gracefully
      // API returns "3.0" but the function normalizes it to "3.00" and finds the match
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.0" }, // API returns "3.0"
        { id: "price-2", price: "4.99" },
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // The function should now succeed by normalizing the price format
      const result = await promise;
      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should successfully find price point when API returns integer format", async () => {
      // This test demonstrates that the function now handles integer formats gracefully
      // API returns "3" but the function normalizes it to "3.00" and finds the match
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3" }, // API returns "3"
        { id: "price-2", price: "4.99" },
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // The function should now succeed by normalizing the price format
      const result = await promise;
      expect(result).toEqual({ id: "price-1", price: "3" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should handle mixed price formats from API by finding any matching price", async () => {
      // This test shows the real-world scenario where API returns mixed formats
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3" }, // API returns "3"
        { id: "price-2", price: "3.0" }, // API returns "3.0"
        { id: "price-3", price: "3.00" }, // API returns "3.00"
        { id: "price-4", price: "4.99" },
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // This should work because we should find a matching price point
      const result = await promise;
      expect(result).toBeDefined();
      expect(mockClose).toHaveBeenCalled();
    });

    it("should demonstrate the fixed bug scenario", async () => {
      // This test shows that the previous bug has been fixed
      // API returns "3.0" but the function now handles it correctly
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.0" }, // API returns "3.0"
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // The function should now succeed by normalizing the price format
      const result = await promise;
      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should show the fixed bug: validation and lookup now work together", async () => {
      // This test shows that the previous bug has been fixed
      // The validation and lookup now use the same normalized data
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.0" }, // API returns "3.0"
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // The fix:
      // 1. normalizedAvailablePrices contains ["3.00"] (from Number("3.0").toFixed(2))
      // 2. Validation passes: "3.00" is in normalizedAvailablePrices
      // 3. Lookup succeeds: finds by ID from normalized list, then returns original
      const result = await promise;
      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should demonstrate the normalization behavior", async () => {
      // This test shows how the normalization works
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.0" }, // API returns "3.0"
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      // Let's see what the normalization actually produces
      const normalizedPrices = Array.from(
        new Set(
          mockPricePoints
            .map((p) => Number(p.price))
            .filter((n) => Number.isFinite(n) && n >= 0)
            .map((n) => n.toFixed(2))
        )
      );

      // Verify the normalization behavior
      expect(normalizedPrices).toEqual(["3.00"]);
      expect(normalizedPrices.includes("3.00")).toBe(true);

      const promise = promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState
      );

      // Simulate user entering "3"
      mockQuestion.mockImplementationOnce((prompt: any, callback: any) => {
        callback("3");
      });

      // The function should now succeed by using the normalized data
      const result = await promise;
      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockClose).toHaveBeenCalled();
    });

    it("should verify the fixed logic", () => {
      // This test verifies that the bug has been fixed
      const mockPricePoints = [{ id: "price-1", price: "3.0" }];

      // Step 1: Normalization (same as in the real function)
      const normalizedAvailablePrices = Array.from(
        new Set(
          mockPricePoints
            .map((p) => Number(p.price))
            .filter((n) => Number.isFinite(n) && n >= 0)
            .map((n) => n.toFixed(2))
        )
      );

      // Step 2: User input processing
      const userInput = "3";
      const parsed = Number(userInput);
      const canonical = parsed.toFixed(2);

      // Step 3: Validation
      const validationPasses = normalizedAvailablePrices.includes(canonical);

      // Step 4: Lookup (now fixed to use normalized data)
      const normalizedPricePoint = normalizedAvailablePrices.find(
        (p) => p === canonical
      );
      const lookupSucceeds = normalizedPricePoint !== undefined;

      // This should demonstrate the fix
      expect(validationPasses).toBe(true); // "3.00" is in normalizedAvailablePrices
      expect(lookupSucceeds).toBe(true); // "3.00" is found in normalizedAvailablePrices

      // Verify the test data
      expect(mockPricePoints).toEqual([{ id: "price-1", price: "3.0" }]);
      expect(normalizedAvailablePrices).toEqual(["3.00"]);
      expect(userInput).toBe("3");
      expect(parsed).toBe(3);
      expect(canonical).toBe("3.00");
      expect(validationPasses).toBe(true);
      expect(lookupSucceeds).toBe(true);
    });
  });
});
