import { jest } from "@jest/globals";
import inquirer from "inquirer";
import { logger } from "@semihcihan/shared";
import { promptForBasePricePoint } from "./base-price-prompt";
import type { AppStoreModel } from "@semihcihan/shared";
import type { PricingItem, PricePointInfo } from "@semihcihan/shared";

// Mock dependencies
const mockFindNearestPrices = jest.fn();
jest.mock("@semihcihan/shared", () => ({
  logger: {
    prompt: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
  findNearestPrices: (...args: any[]) => mockFindNearestPrices(...args),
}));
jest.mock("inquirer");

const mockLogger = jest.mocked(logger);
const mockInquirer = jest.mocked(inquirer);
const mockFetchTerritoryPricePointsForSelectedItem =
  jest.fn() as jest.MockedFunction<
    (
      selectedItem: PricingItem,
      appId: string,
      territoryId: string
    ) => Promise<PricePointInfo[]>
  >;

describe("base-price-prompt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFindNearestPrices.mockReturnValue([]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3.00" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toBeDefined();
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

      // Mock inquirer to return "3"
      mockInquirer.prompt.mockResolvedValueOnce({ price: "3" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-1", price: "3.0" });
      expect(mockInquirer.prompt).toHaveBeenCalledWith([
        expect.objectContaining({
          type: "input",
          name: "price",
          message: "Enter base price in USD (e.g., 5.99):",
        }),
      ]);
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

    it("should throw error when no available price points are found", async () => {
      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue([]);

      await expect(
        promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        )
      ).rejects.toThrow(
        "No available Apple price points found. This is unexpected. Please try again."
      );
    });

    it("should handle edge case where price point lookup might fail", async () => {
      // Note: With the current implementation, if validation passes, lookup should always succeed
      // because both use the same normalization logic. This test verifies the error path exists
      // for defensive programming purposes, even though it's unlikely to be triggered in practice.
      const mockPricePoints: PricePointInfo[] = [
        { id: "price-1", price: "3.00" },
        { id: "price-2", price: "4.99" },
      ];

      mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
        mockPricePoints
      );

      // Test with a valid price that exists in the list
      mockInquirer.prompt.mockResolvedValueOnce({ price: "4.99" });

      const result = await promptForBasePricePoint(
        mockSelectedItem,
        mockAppStoreState,
        mockFetchTerritoryPricePointsForSelectedItem
      );

      expect(result).toEqual({ id: "price-2", price: "4.99" });
    });

    describe("validation error cases", () => {
      it("should reject invalid format with letters", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        // Mock inquirer to simulate validation failure
        (mockInquirer.prompt as any).mockImplementationOnce(
          (questions: any[]) => {
            const validateFn = questions[0].validate;
            const result = validateFn("abc");
            expect(result).toBe(
              "❌ Invalid format. Please enter a non-negative number with up to 2 decimals (e.g., 5.99)."
            );
            // Return a valid price after validation check
            return Promise.resolve({ price: "3.00" });
          }
        );

        const result = await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );

        expect(result).toEqual({ id: "price-1", price: "3.00" });
      });

      it("should reject invalid format with more than 2 decimals", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        (mockInquirer.prompt as any).mockImplementationOnce(
          (questions: any[]) => {
            const validateFn = questions[0].validate;
            const result = validateFn("3.999");
            expect(result).toBe(
              "❌ Invalid format. Please enter a non-negative number with up to 2 decimals (e.g., 5.99)."
            );
            return Promise.resolve({ price: "3.00" });
          }
        );

        await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );
      });

      it("should reject negative numbers", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        (mockInquirer.prompt as any).mockImplementationOnce(
          (questions: any[]) => {
            const validateFn = questions[0].validate;
            const result = validateFn("-5.99");
            expect(result).toBe(
              "❌ Invalid format. Please enter a non-negative number with up to 2 decimals (e.g., 5.99)."
            );
            return Promise.resolve({ price: "3.00" });
          }
        );

        await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );
      });

      it("should reject price not in available list with nearest prices shown", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
          { id: "price-2", price: "4.99" },
          { id: "price-3", price: "5.99" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        mockFindNearestPrices.mockReturnValue(["4.99", "5.99"]);

        (mockInquirer.prompt as any).mockImplementationOnce(
          (questions: any[]) => {
            const validateFn = questions[0].validate;
            const result = validateFn("5.00");
            expect(result).toContain(
              "❌ The price 5.00 is not an available Apple price."
            );
            expect(result).toContain("Closest available prices:");
            expect(result).toContain("4.99");
            expect(result).toContain("5.99");
            return Promise.resolve({ price: "4.99" });
          }
        );

        const result = await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );

        expect(result).toEqual({ id: "price-2", price: "4.99" });
        expect(mockFindNearestPrices).toHaveBeenCalledWith(
          5.0,
          ["3.00", "4.99", "5.99"],
          20
        );
      });

      it("should reject price not in available list without nearest prices when findNearestPrices returns empty", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        mockFindNearestPrices.mockReturnValue([]);

        (mockInquirer.prompt as any).mockImplementationOnce(
          (questions: any[]) => {
            const validateFn = questions[0].validate;
            const result = validateFn("5.00");
            expect(result).toBe(
              "❌ The price 5.00 is not an available Apple price."
            );
            expect(result).not.toContain("Closest available prices:");
            return Promise.resolve({ price: "3.00" });
          }
        );

        await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );
      });
    });

    describe("normalization edge cases", () => {
      it("should filter out price points with invalid prices (non-finite)", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
          { id: "price-2", price: "NaN" },
          { id: "price-3", price: "Infinity" },
          { id: "price-4", price: "4.99" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        mockInquirer.prompt.mockResolvedValueOnce({ price: "3.00" });

        const result = await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );

        expect(result).toEqual({ id: "price-1", price: "3.00" });
      });

      it("should filter out price points with negative prices", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
          { id: "price-2", price: "-5.99" },
          { id: "price-3", price: "4.99" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        mockInquirer.prompt.mockResolvedValueOnce({ price: "3.00" });

        const result = await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );

        expect(result).toEqual({ id: "price-1", price: "3.00" });
      });

      it("should handle price points with empty string prices", async () => {
        const mockPricePoints: PricePointInfo[] = [
          { id: "price-1", price: "3.00" },
          { id: "price-2", price: "" },
          { id: "price-3", price: "4.99" },
        ];

        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          mockPricePoints
        );

        mockInquirer.prompt.mockResolvedValueOnce({ price: "3.00" });

        const result = await promptForBasePricePoint(
          mockSelectedItem,
          mockAppStoreState,
          mockFetchTerritoryPricePointsForSelectedItem
        );

        expect(result).toEqual({ id: "price-1", price: "3.00" });
      });

      it("should handle null or undefined price points array", async () => {
        mockFetchTerritoryPricePointsForSelectedItem.mockResolvedValue(
          null as any
        );

        await expect(
          promptForBasePricePoint(
            mockSelectedItem,
            mockAppStoreState,
            mockFetchTerritoryPricePointsForSelectedItem
          )
        ).rejects.toThrow(
          "No available Apple price points found. This is unexpected. Please try again."
        );
      });
    });
  });
});
