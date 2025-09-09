import { logger } from "@semihcihan/shared";
import { PriceSchema } from "@semihcihan/shared";
import { z } from "zod";
import {
  fetchAllSubscriptionPricePoints,
  createSubscriptionPrice,
  fetchSubscriptionPricePointEqualizations,
} from "./api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { ContextualError } from "@semihcihan/shared";

type SubscriptionPriceCreateRequest =
  components["schemas"]["SubscriptionPriceCreateRequest"];
type SubscriptionPricePointsResponse =
  components["schemas"]["SubscriptionPricePointsResponse"];
type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];

type SubscriptionGroupsIncludedResource =
  | components["schemas"]["Subscription"]
  | components["schemas"]["SubscriptionGroupLocalization"];

type Price = z.infer<typeof PriceSchema>;

// Cache for subscription price points to avoid repeated API calls
const pricePointsCache = new Map<string, Map<string, string>>();

// Function to clear cache (mainly for testing)
export function clearPricePointsCache(): void {
  pricePointsCache.clear();
}

// Helper function to find subscription ID by product ID
export function findSubscriptionId(
  subscriptionProductId: string,
  newlyCreatedSubscriptions?: Map<string, string>,
  currentSubscriptionGroupsResponse?: SubscriptionGroupsResponse
): string {
  // First, check newly created subscriptions
  let targetSubscriptionId = newlyCreatedSubscriptions?.get(
    subscriptionProductId
  );

  if (!targetSubscriptionId) {
    // Try to find it in the current subscription groups response
    if (currentSubscriptionGroupsResponse?.included) {
      const subscription = currentSubscriptionGroupsResponse.included.find(
        (item: SubscriptionGroupsIncludedResource) =>
          item.type === "subscriptions" &&
          item.attributes?.productId === subscriptionProductId
      );
      targetSubscriptionId = subscription?.id;
    }
  }

  if (!targetSubscriptionId) {
    throw new Error(
      `Could not find subscription ID for product ID: ${subscriptionProductId}`
    );
  }

  return targetSubscriptionId;
}

// Helper function to combine added and updated prices
export function combineSubscriptionPrices(
  addedPrices: Price[],
  updatedPrices: Price[]
): Price[] {
  return [...addedPrices, ...updatedPrices];
}

// Helper function to find subscription price point ID for a given price and territory
export async function findSubscriptionPricePointId(
  price: string,
  territory: string,
  subscriptionId: string
): Promise<string> {
  // Check cache first
  const cacheKey = `${subscriptionId}:${territory}`;
  const cachedPricePoints = pricePointsCache.get(cacheKey);

  if (cachedPricePoints) {
    const pricePointId = cachedPricePoints.get(price);
    if (pricePointId) {
      return pricePointId;
    }
  }

  // Fetch price points for this territory
  const response = await fetchAllSubscriptionPricePoints(
    subscriptionId,
    territory
  );

  const pricePoints = response.data || [];

  // Create a map of price to price point ID for this territory
  const territoryPricePoints = new Map<string, string>();

  for (const pricePoint of pricePoints) {
    const pointPrice = pricePoint.attributes?.customerPrice;
    if (pointPrice) {
      territoryPricePoints.set(pointPrice, pricePoint.id);
    }
  }

  // Cache the results
  pricePointsCache.set(cacheKey, territoryPricePoints);

  // Find the price point that matches the price
  const pricePointId = territoryPricePoints.get(price);

  if (!pricePointId) {
    throw new ContextualError(
      `No price point found for price ${price} in territory ${territory}`,
      {
        price,
        territory,
        subscriptionId,
        prices: Array.from(territoryPricePoints.keys()),
      }
    );
  }

  return pricePointId;
}

// Create subscription price for a single territory
async function createSubscriptionPriceForTerritory(
  subscriptionId: string,
  price: Price
): Promise<void> {
  const pricePointId = await findSubscriptionPricePointId(
    price.price,
    price.territory,
    subscriptionId
  );

  const createRequest: SubscriptionPriceCreateRequest = {
    data: {
      type: "subscriptionPrices",
      attributes: {
        preserveCurrentPrice: true, // Protect existing subscribers
      },
      relationships: {
        subscription: {
          data: {
            type: "subscriptions",
            id: subscriptionId,
          },
        },
        territory: {
          data: {
            type: "territories",
            id: price.territory,
          },
        },
        subscriptionPricePoint: {
          data: {
            type: "subscriptionPricePoints",
            id: pricePointId,
          },
        },
      },
    },
  };

  await createSubscriptionPrice(createRequest);

  logger.debug(
    `Created subscription price for territory ${price.territory} with price ${price.price}`
  );
}

// Create subscription prices for all territories
export async function createSubscriptionPrices(
  subscriptionId: string,
  prices: Price[]
): Promise<void> {
  if (prices.length === 0) {
    logger.debug("No prices to create for subscription");
    return;
  }

  logger.debug(
    `Creating ${prices.length} subscription prices for subscription ${subscriptionId}`
  );

  // Process all operations sequentially to avoid 429 API rate limit errors
  for (const price of prices) {
    await createSubscriptionPriceForTerritory(subscriptionId, price);
  }

  logger.debug(
    `Successfully created ${prices.length} subscription prices for subscription ${subscriptionId}`
  );
}

// Update subscription prices (for existing subscriptions)
export async function updateSubscriptionPrices(
  subscriptionId: string,
  prices: Price[]
): Promise<void> {
  // For subscription pricing, we always create new prices with preserveCurrentPrice: true
  // This ensures existing subscribers keep their current price while new subscribers get the new price
  await createSubscriptionPrices(subscriptionId, prices);
}

export async function buildSubscriptionPricesWithEqualizations(
  pricePointId: string
): Promise<Price[]> {
  try {
    const equalizationsResponse =
      await fetchSubscriptionPricePointEqualizations(pricePointId);

    const equalizationsData = equalizationsResponse.data;
    if (!Array.isArray(equalizationsData)) {
      throw new Error("Equalizations response data is not an array");
    }

    const prices: Price[] = equalizationsData
      .map((item: any) => {
        if (
          !item.relationships?.territory?.data?.id ||
          !item.attributes?.customerPrice
        ) {
          return null;
        }
        return {
          price: item.attributes.customerPrice,
          territory: item.relationships.territory.data.id,
        };
      })
      .filter(Boolean) as Price[];

    return prices;
  } catch (error) {
    throw new ContextualError(`Failed to fetch equalizations`, {
      error,
      pricePointId,
    });
  }
}
