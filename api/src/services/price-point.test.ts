import { jest } from "@jest/globals";
import {
  PricePoint,
  findPricePointId,
  setPricePointDataHook,
  encodePricePointId,
  getTerritoryPricePointsData,
  type TerritoryPricePoints,
  type ResourceType,
} from "./price-point";

// Helpers for testing (since encodePricePointId and decodePricePointId are private)
function encodePricePointIdForTest(
  resourceId: string,
  territory: string,
  priceIndex: string
): string {
  const payload = { s: resourceId, t: territory, p: priceIndex };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function decodePricePointIdForTest(pricePointId: string): {
  s: string;
  t: string;
  p: string;
} {
  const decoded = Buffer.from(pricePointId, "base64").toString("utf-8");
  return JSON.parse(decoded);
}

const mockFindBestClosestPrice = jest.fn();
jest.mock("@semihcihan/shared", () => {
  const actual = jest.requireActual("@semihcihan/shared") as any;
  return {
    ...actual,
    logger: {
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    territoryCodes: ["USA", "GBR", "DEU"],
    findNearestPrices: jest.fn(() => ["0.99", "1.99", "2.99"]),
    compareNumericValues: actual.compareNumericValues,
    get findBestClosestPrice() {
      return mockFindBestClosestPrice;
    },
  };
});

jest.mock("../domains/pricing/api-client", () => ({
  fetchAppPricePoints: jest.fn(),
}));

jest.mock("../domains/in-app-purchases/api-client", () => ({
  fetchIAPPricePoints: jest.fn(),
}));

jest.mock("../domains/subscriptions/api-client", () => ({
  fetchAllSubscriptionPricePoints: jest.fn(),
}));

// Setup environment variable mocking for all tests
const originalEnv = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});

// Note: decodePricePointId, findPricePointByCustomerPrice,
// findPricePointByIndex, and FREE_PRICE_INDEX are now private functions.
// They are tested indirectly through findPricePointId which uses them.

describe("encodePricePointId", () => {
  it("should encode price point ID correctly", () => {
    const resourceId = "app123";
    const territory = "USA";
    const priceIndex = "42";

    const encoded = encodePricePointId(resourceId, territory, priceIndex);

    expect(encoded).toBeDefined();
    expect(typeof encoded).toBe("string");
    // Decode to verify
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const payload = JSON.parse(decoded);
    expect(payload.s).toBe(resourceId);
    expect(payload.t).toBe(territory);
    expect(payload.p).toBe(priceIndex);
  });

  it("should produce different IDs for different inputs", () => {
    const id1 = encodePricePointId("app123", "USA", "1");
    const id2 = encodePricePointId("app123", "USA", "2");
    const id3 = encodePricePointId("app456", "USA", "1");
    const id4 = encodePricePointId("app123", "GBR", "1");

    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id1).not.toBe(id4);
  });

  it("should produce same ID for same inputs", () => {
    const id1 = encodePricePointId("app123", "USA", "1");
    const id2 = encodePricePointId("app123", "USA", "1");

    expect(id1).toBe(id2);
  });

  it("should handle special characters in resourceId", () => {
    const encoded = encodePricePointId("app-123_test", "USA", "1");
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const payload = JSON.parse(decoded);
    expect(payload.s).toBe("app-123_test");
  });

  it("should handle empty strings", () => {
    const encoded = encodePricePointId("", "", "");
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const payload = JSON.parse(decoded);
    expect(payload.s).toBe("");
    expect(payload.t).toBe("");
    expect(payload.p).toBe("");
  });
});

describe("getTerritoryPricePointsData", () => {
  let mockHook: jest.MockedFunction<
    (
      resourceType: ResourceType,
      territory: string
    ) => Promise<TerritoryPricePoints | null>
  >;
  let logger: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    setPricePointDataHook(null);

    mockHook = jest.fn() as jest.MockedFunction<
      (
        resourceType: ResourceType,
        territory: string
      ) => Promise<TerritoryPricePoints | null>
    >;

    const sharedModule = await import("@semihcihan/shared");
    logger = (sharedModule as any).logger;
  });

  it("should return price points from hook", async () => {
    const mockPricePoints: PricePoint[] = [
      { priceIndex: "1", customerPrice: "0.99" },
      { priceIndex: "2", customerPrice: "1.99" },
    ];

    mockHook.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: mockPricePoints,
    });

    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("app", "USA");

    expect(result).toEqual(mockPricePoints);
    expect(mockHook).toHaveBeenCalledWith("app", "USA");
    expect(mockHook).toHaveBeenCalledTimes(1);
  });

  it("should return null when hook returns null", async () => {
    mockHook.mockResolvedValue(null);
    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("app", "USA");

    expect(result).toBeNull();
    expect(mockHook).toHaveBeenCalledWith("app", "USA");
  });

  it("should return null when hook is not set", async () => {
    setPricePointDataHook(null);

    const result = await getTerritoryPricePointsData("app", "USA");

    expect(result).toBeNull();
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "Price point data hook not registered for app/USA"
      )
    );
  });

  it("should return null when hook throws error", async () => {
    mockHook.mockRejectedValue(new Error("Hook error"));
    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("app", "USA");

    expect(result).toBeNull();
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to get price points data for app/USA"),
      expect.any(Error)
    );
  });

  it("should return null when hook returns empty pricePoints array", async () => {
    mockHook.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: [],
    });
    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("app", "USA");

    expect(result).toBeNull();
  });

  it("should work with different resource types", async () => {
    const mockPricePoints: PricePoint[] = [
      { priceIndex: "1", customerPrice: "0.99" },
    ];

    mockHook.mockResolvedValue({
      territory: "GBR",
      resourceType: "iap",
      pricePoints: mockPricePoints,
    });
    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("iap", "GBR");

    expect(result).toEqual(mockPricePoints);
    expect(mockHook).toHaveBeenCalledWith("iap", "GBR");
  });

  it("should work with subscription resource type", async () => {
    const mockPricePoints: PricePoint[] = [
      { priceIndex: "1", customerPrice: "4.99" },
    ];

    mockHook.mockResolvedValue({
      territory: "DEU",
      resourceType: "subscription",
      pricePoints: mockPricePoints,
    });
    setPricePointDataHook(mockHook);

    const result = await getTerritoryPricePointsData("subscription", "DEU");

    expect(result).toEqual(mockPricePoints);
    expect(mockHook).toHaveBeenCalledWith("subscription", "DEU");
  });

  it("should handle different territories", async () => {
    const mockPricePoints1: PricePoint[] = [
      { priceIndex: "1", customerPrice: "0.99" },
    ];
    const mockPricePoints2: PricePoint[] = [
      { priceIndex: "1", customerPrice: "1.99" },
    ];

    mockHook
      .mockResolvedValueOnce({
        territory: "USA",
        resourceType: "app",
        pricePoints: mockPricePoints1,
      })
      .mockResolvedValueOnce({
        territory: "GBR",
        resourceType: "app",
        pricePoints: mockPricePoints2,
      });
    setPricePointDataHook(mockHook);

    const result1 = await getTerritoryPricePointsData("app", "USA");
    const result2 = await getTerritoryPricePointsData("app", "GBR");

    expect(result1).toEqual(mockPricePoints1);
    expect(result2).toEqual(mockPricePoints2);
    expect(mockHook).toHaveBeenCalledWith("app", "USA");
    expect(mockHook).toHaveBeenCalledWith("app", "GBR");
  });
});

describe("setPricePointDataHook", () => {
  beforeEach(() => {
    // Clear the hook before each test
    setPricePointDataHook(null);
  });

  it("should set the hook function", async () => {
    const mockHook = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue({
        territory: "USA",
        resourceType: "app" as ResourceType,
        pricePoints: [{ priceIndex: "1", customerPrice: "1.99" }],
      });

    setPricePointDataHook(mockHook);

    // Verify hook is set by using it
    await findPricePointId("1.99", "USA", "app123", "app");
    expect(mockHook).toHaveBeenCalledWith("app", "USA", "app123");
  });

  it("should allow clearing the hook by setting to null", async () => {
    const mockHook = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue({
        territory: "USA",
        resourceType: "app" as ResourceType,
        pricePoints: [{ priceIndex: "1", customerPrice: "1.99" }],
      });

    setPricePointDataHook(mockHook);
    setPricePointDataHook(null);

    // Hook should be cleared - findPricePointId should fail
    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow("No price points data available");
  });

  it("should replace existing hook when set again", async () => {
    const mockHook1 = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue({
        territory: "USA",
        resourceType: "app" as ResourceType,
        pricePoints: [{ priceIndex: "1", customerPrice: "1.99" }],
      });

    const mockHook2 = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue({
        territory: "USA",
        resourceType: "app" as ResourceType,
        pricePoints: [{ priceIndex: "2", customerPrice: "2.99" }],
      });

    setPricePointDataHook(mockHook1);
    setPricePointDataHook(mockHook2);

    await findPricePointId("2.99", "USA", "app123", "app");

    expect(mockHook1).not.toHaveBeenCalled();
    expect(mockHook2).toHaveBeenCalledWith("app", "USA", "app123");
  });
});

describe("findPricePointId", () => {
  let mockGetTerritoryPricePoints: jest.MockedFunction<
    (
      resourceType: ResourceType,
      territory: string
    ) => Promise<TerritoryPricePoints | null>
  >;
  let logger: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    const actual = jest.requireActual("@semihcihan/shared") as any;
    mockFindBestClosestPrice.mockImplementation(actual.findBestClosestPrice);

    // Set up mock hook
    mockGetTerritoryPricePoints = jest.fn() as jest.MockedFunction<
      (
        resourceType: ResourceType,
        territory: string
      ) => Promise<TerritoryPricePoints | null>
    >;
    setPricePointDataHook(mockGetTerritoryPricePoints);

    const sharedModule = await import("@semihcihan/shared");
    logger = (sharedModule as any).logger;
  });

  const mockPricePoints: PricePoint[] = [
    { priceIndex: "1", customerPrice: "0.99" },
    { priceIndex: "2", customerPrice: "1.99" },
    { priceIndex: "3", customerPrice: "2.99" },
  ];

  it("should find and encode price point ID with exact match", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: mockPricePoints,
    });

    const result = await findPricePointId("1.99", "USA", "app123", "app");

    expect(result).toBeDefined();
    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("app123");
    expect(decoded.t).toBe("USA");
    expect(decoded.p).toBe("2");
  });

  it("should find closest price when exact match not found", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: mockPricePoints,
    });

    const result = await findPricePointId("1.50", "USA", "app123", "app");

    expect(result).toBeDefined();
    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("app123");
    expect(decoded.t).toBe("USA");
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("No price point found for price 1.50")
    );
  });

  it("should throw error when price points data is not available", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue(null);

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );
  });

  it("should throw error when price points data returns empty array", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: [],
    });

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );
  });

  it("should throw error when no price point found (even after closest match)", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app",
      pricePoints: mockPricePoints,
    });

    // Mock findBestClosestPrice to return null
    mockFindBestClosestPrice.mockReturnValueOnce(null);

    await expect(
      findPricePointId("999.99", "USA", "app123", "app")
    ).rejects.toThrow("No price point found for price 999.99 in territory USA");
  });

  it("should handle price points data fetch error gracefully", async () => {
    mockGetTerritoryPricePoints.mockRejectedValue(
      new Error("Data fetch error")
    );

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to get price points data for app/USA"),
      expect.any(Error)
    );
  });

  it("should work with different resource types", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "GBR",
      resourceType: "iap",
      pricePoints: mockPricePoints,
    });

    const result = await findPricePointId("2.99", "GBR", "iap456", "iap");

    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("iap456");
    expect(decoded.t).toBe("GBR");
    expect(decoded.p).toBe("3");
  });

  it("should work with subscription resource type", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "DEU",
      resourceType: "subscription",
      pricePoints: mockPricePoints,
    });

    const result = await findPricePointId(
      "0.99",
      "DEU",
      "sub789",
      "subscription"
    );

    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("sub789");
    expect(decoded.t).toBe("DEU");
    expect(decoded.p).toBe("1");
  });

  it("should throw error when hook is not registered", async () => {
    setPricePointDataHook(null);

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "Price point data hook not registered for app/USA"
      )
    );
  });

  it("should use the registered hook to fetch data", async () => {
    const mockHook = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue({
        territory: "USA",
        resourceType: "app" as ResourceType,
        pricePoints: mockPricePoints,
      });

    setPricePointDataHook(mockHook);

    await findPricePointId("1.99", "USA", "app123", "app");

    expect(mockHook).toHaveBeenCalledWith("app", "USA", "app123");
    expect(mockHook).toHaveBeenCalledTimes(1);
  });

  it("should handle hook returning null gracefully", async () => {
    const mockHook = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockResolvedValue(null);
    setPricePointDataHook(mockHook);

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );
  });

  it("should handle hook throwing an error", async () => {
    const mockHook = jest
      .fn<
        (
          resourceType: ResourceType,
          territory: string
        ) => Promise<TerritoryPricePoints | null>
      >()
      .mockRejectedValue(new Error("Hook error"));
    setPricePointDataHook(mockHook);

    await expect(
      findPricePointId("1.99", "USA", "app123", "app")
    ).rejects.toThrow(
      "No price points data available for app in territory USA"
    );

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to get price points data for app/USA"),
      expect.any(Error)
    );
  });

  it("should encode price point ID correctly with exact match", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app" as ResourceType,
      pricePoints: mockPricePoints,
    });

    const result = await findPricePointId("1.99", "USA", "app123", "app");

    // Verify the encoded ID contains the correct data
    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("app123");
    expect(decoded.t).toBe("USA");
    expect(decoded.p).toBe("2"); // priceIndex for "1.99"
  });

  it("should encode price point ID correctly with closest match", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app" as ResourceType,
      pricePoints: mockPricePoints,
    });

    // Mock findBestClosestPrice to return "1.99" for "1.50"
    mockFindBestClosestPrice.mockReturnValueOnce("1.99");

    const result = await findPricePointId("1.50", "USA", "app123", "app");

    const decoded = decodePricePointIdForTest(result);
    expect(decoded.s).toBe("app123");
    expect(decoded.t).toBe("USA");
    expect(decoded.p).toBe("2"); // priceIndex for closest match "1.99"
  });

  it("should be deterministic - same inputs produce same encoded ID", async () => {
    mockGetTerritoryPricePoints.mockResolvedValue({
      territory: "USA",
      resourceType: "app" as ResourceType,
      pricePoints: mockPricePoints,
    });

    const result1 = await findPricePointId("1.99", "USA", "app123", "app");
    const result2 = await findPricePointId("1.99", "USA", "app123", "app");

    expect(result1).toBe(result2);
  });
});

describe("extractPricePointsFromResponse", () => {
  // This tests the internal extractPricePointsFromResponse function indirectly
  // through refreshPricePointsForResourceType
  it("should extract price points from response correctly", async () => {
    const { refreshPricePointsForResourceType } = await import("./price-point");
    const { fetchAppPricePoints } =
      await import("../domains/pricing/api-client");
    const fetchAppPricePointsMock =
      fetchAppPricePoints as jest.MockedFunction<any>;

    const encodedId1 = encodePricePointIdForTest("app123", "USA", "1");
    const encodedId2 = encodePricePointIdForTest("app123", "USA", "2");
    const encodedId3 = encodePricePointIdForTest("app123", "GBR", "1");
    const encodedId4 = encodePricePointIdForTest("app123", "DEU", "1");

    fetchAppPricePointsMock
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId1,
            attributes: {
              customerPrice: "0.99",
            },
          },
          {
            id: encodedId2,
            attributes: {
              customerPrice: "1.99",
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId3,
            attributes: {
              customerPrice: "0.99",
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId4,
            attributes: {
              customerPrice: "0.99",
            },
          },
        ],
      });

    const result = await refreshPricePointsForResourceType("app", "app123");

    expect(result.length).toBe(3);
    const usaPricePoints = result.find((tp) => tp.territory === "USA");
    expect(usaPricePoints?.pricePoints).toHaveLength(2);
    expect(usaPricePoints?.pricePoints[0]).toEqual({
      priceIndex: "1",
      customerPrice: "0.99",
    });
    expect(usaPricePoints?.pricePoints[1]).toEqual({
      priceIndex: "2",
      customerPrice: "1.99",
    });
  });

  it("should filter out price points without id", async () => {
    const { refreshPricePointsForResourceType } = await import("./price-point");
    const { fetchAppPricePoints } =
      await import("../domains/pricing/api-client");
    const fetchAppPricePointsMock =
      fetchAppPricePoints as jest.MockedFunction<any>;

    const encodedId = encodePricePointIdForTest("app123", "USA", "1");
    const encodedId2 = encodePricePointIdForTest("app123", "GBR", "1");
    const encodedId3 = encodePricePointIdForTest("app123", "DEU", "1");

    fetchAppPricePointsMock
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId,
            attributes: {
              customerPrice: "0.99",
            },
          },
          {
            id: null,
            attributes: {
              customerPrice: "1.99",
            },
          },
          {
            attributes: {
              customerPrice: "2.99",
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId2,
            attributes: {
              customerPrice: "0.99",
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId3,
            attributes: {
              customerPrice: "0.99",
            },
          },
        ],
      });

    const result = await refreshPricePointsForResourceType("app", "app123");

    const usaPricePoints = result.find((tp) => tp.territory === "USA");
    expect(usaPricePoints?.pricePoints).toHaveLength(1);
    expect(usaPricePoints?.pricePoints[0].customerPrice).toBe("0.99");
  });

  it("should throw error when territory has empty data array", async () => {
    const { refreshPricePointsForResourceType } = await import("./price-point");
    const { fetchAppPricePoints } =
      await import("../domains/pricing/api-client");
    const fetchAppPricePointsMock =
      fetchAppPricePoints as jest.MockedFunction<any>;

    fetchAppPricePointsMock.mockResolvedValueOnce({ data: [] });

    await expect(
      refreshPricePointsForResourceType("app", "app123")
    ).rejects.toThrow("No price points found for app app123 in territory USA");
  });

  it("should throw error when territory has undefined data", async () => {
    const { refreshPricePointsForResourceType } = await import("./price-point");
    const { fetchAppPricePoints } =
      await import("../domains/pricing/api-client");
    const fetchAppPricePointsMock =
      fetchAppPricePoints as jest.MockedFunction<any>;

    fetchAppPricePointsMock.mockResolvedValueOnce({ data: undefined });

    await expect(
      refreshPricePointsForResourceType("app", "app123")
    ).rejects.toThrow("No price points found for app app123 in territory USA");
  });
});

describe("refreshPricePointsForResourceType", () => {
  let refreshPricePointsForResourceType: typeof import("./price-point").refreshPricePointsForResourceType;
  let fetchAppPricePoints: jest.MockedFunction<any>;
  let fetchIAPPricePoints: jest.MockedFunction<any>;
  let fetchAllSubscriptionPricePoints: jest.MockedFunction<any>;

  beforeEach(async () => {
    fetchAppPricePoints = (await import("../domains/pricing/api-client"))
      .fetchAppPricePoints as jest.MockedFunction<any>;
    fetchIAPPricePoints = (
      await import("../domains/in-app-purchases/api-client")
    ).fetchIAPPricePoints as jest.MockedFunction<any>;
    fetchAllSubscriptionPricePoints = (
      await import("../domains/subscriptions/api-client")
    ).fetchAllSubscriptionPricePoints as jest.MockedFunction<any>;

    const module = await import("./price-point");
    refreshPricePointsForResourceType =
      module.refreshPricePointsForResourceType;
  });

  const createMockPricePointResponse = (
    pricePoints: { id: string; price: string }[]
  ) => ({
    data: pricePoints.map((pp) => ({
      id: pp.id,
      attributes: {
        customerPrice: pp.price,
      },
    })),
  });

  it("should fetch app price points for all territories when appId provided", async () => {
    const encodedId1 = encodePricePointIdForTest("app123", "USA", "42");
    const encodedId2 = encodePricePointIdForTest("app123", "GBR", "42");
    const encodedId3 = encodePricePointIdForTest("app123", "DEU", "42");
    fetchAppPricePoints
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId1, price: "0.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId2, price: "0.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId3, price: "0.99" }])
      );

    const result = await refreshPricePointsForResourceType("app", "app123");

    expect(fetchAppPricePoints).toHaveBeenCalledTimes(3);
    expect(result.length).toBe(3);
    expect(result[0].resourceType).toBe("app");
  });

  it("should fetch IAP price points for all territories when iapId provided", async () => {
    const encodedId1 = encodePricePointIdForTest("iap123", "USA", "10");
    const encodedId2 = encodePricePointIdForTest("iap123", "GBR", "10");
    const encodedId3 = encodePricePointIdForTest("iap123", "DEU", "10");
    fetchIAPPricePoints
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId1, price: "1.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId2, price: "1.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId3, price: "1.99" }])
      );

    const result = await refreshPricePointsForResourceType("iap", "iap123");

    expect(fetchIAPPricePoints).toHaveBeenCalledTimes(3);
    expect(result.length).toBe(3);
    expect(result[0].resourceType).toBe("iap");
  });

  it("should fetch subscription price points for all territories when subscriptionId provided", async () => {
    const encodedId1 = encodePricePointIdForTest("sub123", "USA", "20");
    const encodedId2 = encodePricePointIdForTest("sub123", "GBR", "20");
    const encodedId3 = encodePricePointIdForTest("sub123", "DEU", "20");
    fetchAllSubscriptionPricePoints
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId1, price: "4.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId2, price: "4.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId3, price: "4.99" }])
      );

    const result = await refreshPricePointsForResourceType(
      "subscription",
      "sub123"
    );

    expect(fetchAllSubscriptionPricePoints).toHaveBeenCalledTimes(3);
    expect(result.length).toBe(3);
    expect(result[0].resourceType).toBe("subscription");
  });

  it("should throw error when resource ID not provided", async () => {
    await expect(refreshPricePointsForResourceType("app", "")).rejects.toThrow(
      "Refreshing app price points failed as no resource ID provided"
    );

    expect(fetchAppPricePoints).not.toHaveBeenCalled();
  });

  it("should filter out price points without customerPrice", async () => {
    const encodedId1 = encodePricePointIdForTest("app123", "USA", "1");
    const encodedId2 = encodePricePointIdForTest("app123", "GBR", "1");
    const encodedId3 = encodePricePointIdForTest("app123", "DEU", "1");
    fetchAppPricePoints
      .mockResolvedValueOnce({
        data: [
          {
            id: encodedId1,
            attributes: { customerPrice: "0.99" },
          },
          {
            id: encodePricePointIdForTest("app123", "USA", "2"),
            attributes: { customerPrice: null },
          },
          {
            id: encodePricePointIdForTest("app123", "USA", "3"),
            attributes: {},
          },
          { id: encodePricePointIdForTest("app123", "USA", "4") },
        ],
      })
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId2, price: "0.99" }])
      )
      .mockResolvedValueOnce(
        createMockPricePointResponse([{ id: encodedId3, price: "0.99" }])
      );

    const result = await refreshPricePointsForResourceType("app", "app123");

    const usaPricePoints = result.find((tp) => tp.territory === "USA");
    expect(usaPricePoints?.pricePoints.length).toBe(1);
    expect(usaPricePoints?.pricePoints[0].customerPrice).toBe("0.99");
  });

  it("should throw error when territory fetch fails", async () => {
    fetchAppPricePoints.mockRejectedValueOnce(new Error("USA failed"));

    await expect(
      refreshPricePointsForResourceType("app", "app123")
    ).rejects.toThrow("USA failed");
  });

  it("should throw error when territory has no price points", async () => {
    fetchAppPricePoints.mockResolvedValueOnce({ data: [] });

    await expect(
      refreshPricePointsForResourceType("app", "app123")
    ).rejects.toThrow("No price points found for app app123 in territory USA");
  });
});
