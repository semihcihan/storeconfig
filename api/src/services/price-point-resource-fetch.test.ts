import { fetchTerritoryPricePointsForResource } from "./price-point";
import { encodePricePointId } from "./price-point";
import { fetchAppPricePoints } from "../domains/pricing/api-client";
import { fetchIAPPricePoints } from "../domains/in-app-purchases/api-client";
import { fetchAllSubscriptionPricePoints } from "../domains/subscriptions/api-client";

jest.mock("../domains/pricing/api-client", () => ({
  fetchAppPricePoints: jest.fn(),
}));

jest.mock("../domains/in-app-purchases/api-client", () => ({
  fetchIAPPricePoints: jest.fn(),
}));

jest.mock("../domains/subscriptions/api-client", () => ({
  fetchAllSubscriptionPricePoints: jest.fn(),
}));

describe("fetchTerritoryPricePointsForResource", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and maps app price points for a territory", async () => {
    jest.mocked(fetchAppPricePoints).mockResolvedValueOnce({
      data: [
        {
          id: encodePricePointId("app-123", "USA", "1"),
          attributes: { customerPrice: "0.99" },
        },
      ],
    } as any);

    await expect(
      fetchTerritoryPricePointsForResource("app", "app-123", "USA")
    ).resolves.toEqual({
      territory: "USA",
      resourceType: "app",
      pricePoints: [{ priceIndex: "1", customerPrice: "0.99" }],
    });

    expect(fetchAppPricePoints).toHaveBeenCalledWith("app-123", "USA");
  });

  it("uses the resource-specific fetcher", async () => {
    jest.mocked(fetchIAPPricePoints).mockResolvedValueOnce({
      data: [
        {
          id: encodePricePointId("iap-123", "USA", "2"),
          attributes: { customerPrice: "1.99" },
        },
      ],
    } as any);

    await fetchTerritoryPricePointsForResource("iap", "iap-123", "USA");

    expect(fetchIAPPricePoints).toHaveBeenCalledWith("iap-123", "USA");
    expect(fetchAllSubscriptionPricePoints).not.toHaveBeenCalled();
  });

  it("throws when no price points are returned", async () => {
    jest.mocked(fetchAllSubscriptionPricePoints).mockResolvedValueOnce({
      data: [],
    } as any);

    await expect(
      fetchTerritoryPricePointsForResource("subscription", "sub-123", "USA")
    ).rejects.toThrow(
      "No price points found for subscription sub-123 in territory USA"
    );
  });
});
