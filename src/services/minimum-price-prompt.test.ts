import { promptForMinimumPrice } from "./minimum-price-prompt";
import { logger } from "@semihcihan/shared";
import inquirer from "inquirer";

// Mock the logger
jest.mock("@semihcihan/shared", () => ({
  logger: {
    info: jest.fn(),
    prompt: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock inquirer
jest.mock("inquirer");

describe("promptForMinimumPrice", () => {
  const mockInquirer = jest.mocked(inquirer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return undefined for apple strategy", async () => {
    const result = await promptForMinimumPrice("apple", "9.99");

    expect(result).toBeUndefined();
    expect(mockInquirer.prompt).not.toHaveBeenCalled();
  });

  it("should return undefined when user presses Enter", async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "" });

    const result = await promptForMinimumPrice("purchasingPower", "9.99");

    expect(result).toBeUndefined();
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
      }),
    ]);
  });

  it("should return valid price when user enters a positive number", async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "9.99" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("9.99");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
      }),
    ]);
  });

  it("should return valid price when user enters a whole number", async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "5" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("5");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
      }),
    ]);
  });

  it("should return valid price when user enters zero", async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "0" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("0");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
      }),
    ]);
  });

  it("should show error and retry for negative number", async () => {
    // Mock inquirer to return valid input after validation
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "9.99" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("9.99");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
        validate: expect.any(Function),
      }),
    ]);
  });

  it("should show error and retry for invalid input", async () => {
    // Mock inquirer to return valid input after validation
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "2.50" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("2.50");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
        validate: expect.any(Function),
      }),
    ]);
  });

  it("should display correct information for purchasing power strategy", async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "1.99" });

    await promptForMinimumPrice("purchasingPower", "19.99");

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Enter optional Minimum Price in USD")
    );
  });

  it("should not display information for apple strategy", async () => {
    await promptForMinimumPrice("apple", "19.99");

    expect(logger.info).not.toHaveBeenCalled();
  });

  it("should show error and retry when minimum price equals base price", async () => {
    // Mock inquirer to return valid input after validation
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "15.99" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("15.99");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
        validate: expect.any(Function),
      }),
    ]);
  });

  it("should show error and retry when minimum price is greater than base price", async () => {
    // Mock inquirer to return valid input after validation
    mockInquirer.prompt.mockResolvedValueOnce({ minimumPrice: "15.99" });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("15.99");
    expect(mockInquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: "input",
        name: "minimumPrice",
        message: "Minimum price in USD (optional, press Enter to skip):",
        validate: expect.any(Function),
      }),
    ]);
  });
});
