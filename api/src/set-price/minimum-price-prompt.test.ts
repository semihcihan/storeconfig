import { promptForMinimumPrice } from "./minimum-price-prompt";
import { logger } from "@semihcihan/shared";

// Mock the logger
jest.mock("../utils/logger", () => ({
  logger: {
    info: jest.fn(),
    prompt: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock readline
jest.mock("readline", () => ({
  createInterface: jest.fn(),
}));

describe("promptForMinimumPrice", () => {
  let mockReadline: any;
  let mockQuestion: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    mockQuestion = jest.fn();
    mockClose = jest.fn();

    mockReadline = {
      question: mockQuestion,
      close: mockClose,
    };

    const readline = require("readline");
    readline.createInterface.mockReturnValue(mockReadline);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return undefined for apple strategy", async () => {
    const result = await promptForMinimumPrice("apple", "9.99");

    expect(result).toBeUndefined();
    expect(require("readline").createInterface).not.toHaveBeenCalled();
  });

  it("should return undefined when user presses Enter", async () => {
    mockQuestion.mockImplementation((prompt, callback) => {
      callback("");
    });

    const result = await promptForMinimumPrice("purchasingPower", "9.99");

    expect(result).toBeUndefined();
    expect(mockClose).toHaveBeenCalled();
  });

  it("should return valid price when user enters a positive number", async () => {
    mockQuestion.mockImplementation((prompt, callback) => {
      callback("9.99");
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("9.99");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should return valid price when user enters a whole number", async () => {
    mockQuestion.mockImplementation((prompt, callback) => {
      callback("5");
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("5");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should return valid price when user enters zero", async () => {
    mockQuestion.mockImplementation((prompt, callback) => {
      callback("0");
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(result).toBe("0");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should show error and retry for negative number", async () => {
    let callCount = 0;
    mockQuestion.mockImplementation((prompt, callback) => {
      callCount++;
      if (callCount === 1) {
        callback("-5");
      } else {
        callback("9.99");
      }
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(logger.error).toHaveBeenCalledWith(
      "❌ Invalid price. Please enter a non-negative number or press Enter to skip."
    );
    expect(result).toBe("9.99");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should show error and retry for invalid input", async () => {
    let callCount = 0;
    mockQuestion.mockImplementation((prompt, callback) => {
      callCount++;
      if (callCount === 1) {
        callback("invalid");
      } else {
        callback("2.50");
      }
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(logger.error).toHaveBeenCalled();
    expect(result).toBe("2.50");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should display correct information for purchasing power strategy", async () => {
    mockQuestion.mockImplementation((prompt, callback) => {
      callback("1.99");
    });

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
    let callCount = 0;
    mockQuestion.mockImplementation((prompt, callback) => {
      callCount++;
      if (callCount === 1) {
        callback("19.99");
      } else {
        callback("15.99");
      }
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(logger.error).toHaveBeenCalledWith(
      "❌ Minimum price (19.99) must be less than base price (19.99). Please enter a lower value or press Enter to skip."
    );
    expect(result).toBe("15.99");
    expect(mockClose).toHaveBeenCalled();
  });

  it("should show error and retry when minimum price is greater than base price", async () => {
    let callCount = 0;
    mockQuestion.mockImplementation((prompt, callback) => {
      callCount++;
      if (callCount === 1) {
        callback("25.99");
      } else {
        callback("15.99");
      }
    });

    const result = await promptForMinimumPrice("purchasingPower", "19.99");

    expect(logger.error).toHaveBeenCalledWith(
      "❌ Minimum price (25.99) must be less than base price (19.99). Please enter a lower value or press Enter to skip."
    );
    expect(result).toBe("15.99");
    expect(mockClose).toHaveBeenCalled();
  });
});
