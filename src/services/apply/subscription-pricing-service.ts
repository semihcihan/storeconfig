import { logger } from "../../utils/logger";
import { PriceSchema } from "../../models/app-store";
import { z } from "zod";
import {
  fetchAllSubscriptionPricePoints,
  createSubscriptionPrice,
} from "../../domains/subscriptions/api-client";
import type { components } from "../../generated/app-store-connect-api";

type SubscriptionPriceCreateRequest =
  components["schemas"]["SubscriptionPriceCreateRequest"];
type SubscriptionPricePointsResponse =
  components["schemas"]["SubscriptionPricePointsResponse"];

type Price = z.infer<typeof PriceSchema>;

// Cache for subscription price points to avoid repeated API calls
const pricePointsCache = new Map<string, Map<string, string>>();

// Helper function to find subscription price point ID for a given price and territory
async function findSubscriptionPricePointId(
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
    logger.error(
      `No price point found for price ${price} in territory ${territory} for subscription ${subscriptionId}. ` +
        `Found ${pricePoints.length} price points for territory ${territory}. ` +
        `Available prices: ${Array.from(territoryPricePoints.keys()).join(
          ", "
        )}`
    );

    throw new Error(
      `No price point found for price ${price} in territory ${territory}`
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

  logger.info(
    `Created subscription price for territory ${price.territory} with price ${price.price}`
  );
}

// Create subscription prices for all territories
export async function createSubscriptionPrices(
  subscriptionId: string,
  prices: Price[]
): Promise<void> {
  if (prices.length === 0) {
    logger.info("No prices to create for subscription");
    return;
  }

  logger.info(
    `Creating ${prices.length} subscription prices for subscription ${subscriptionId}`
  );

  // Process all operations in parallel (each with its own retry logic)
  await Promise.all(
    prices.map((price) =>
      createSubscriptionPriceForTerritory(subscriptionId, price)
    )
  );

  logger.info(
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
