import {
  logger,
  PriceSchema,
  PriceScheduleSchema,
  TerritoryCodeSchema,
  addJobInfo,
  MESSAGES,
  handleSubscriptionPricesBulkErrors,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  fetchSubscriptionPricePointEqualizations,
  fetchSubscriptionPrices,
  deleteSubscriptionPrice,
  updateSubscription,
} from "./api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { compareNumericValues, ContextualError } from "@semihcihan/shared";
import { processSubscriptionPriceResponse } from "./mapper";
import {
  getTomorrowAppleString,
  getCurrentDate,
  parseAppleDate,
} from "../../helpers/date-helpers";
import { findPricePointId } from "../../services/price-point";

type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];
type SubscriptionPricesResponse =
  components["schemas"]["SubscriptionPricesResponse"];
type SubscriptionUpdateRequest =
  components["schemas"]["SubscriptionUpdateRequest"];
type SubscriptionPriceInlineCreate =
  components["schemas"]["SubscriptionPriceInlineCreate"];

type SubscriptionGroupsIncludedResource =
  | components["schemas"]["Subscription"]
  | components["schemas"]["SubscriptionGroupLocalization"];

type Price = z.infer<typeof PriceSchema>;

export function isFuturePrice(startDate: string | undefined): boolean {
  if (!startDate) return false;
  const parsedDate = parseAppleDate(startDate);
  if (!parsedDate) return false;
  return parsedDate > getCurrentDate();
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
  return await findPricePointId(
    price,
    territory,
    subscriptionId,
    "subscription"
  );
}

function buildTempSubscriptionPriceId(
  territory: string,
  index: number
): string {
  return `\${price-${territory}-${index}}`;
}

async function buildBulkSubscriptionPricesUpdateRequest(
  subscriptionId: string,
  prices: { price: Price; new: boolean }[]
): Promise<{
  request: SubscriptionUpdateRequest;
  includedTerritories: string[];
}> {
  const priceRelationshipData: { type: "subscriptionPrices"; id: string }[] =
    [];
  const includedPrices: SubscriptionPriceInlineCreate[] = [];
  const includedTerritories: string[] = [];

  prices.forEach((priceEntry, index) => {
    const tempId = buildTempSubscriptionPriceId(
      priceEntry.price.territory,
      index
    );

    priceRelationshipData.push({
      type: "subscriptionPrices",
      id: tempId,
    });

    includedTerritories.push(priceEntry.price.territory);

    includedPrices.push({
      type: "subscriptionPrices",
      id: tempId,
      attributes: {
        startDate: priceEntry.new ? undefined : getTomorrowAppleString(),
        preserveCurrentPrice: true,
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
            id: priceEntry.price.territory,
          },
        },
        subscriptionPricePoint: {
          data: {
            type: "subscriptionPricePoints",
            id: "placeholder",
          },
        },
      },
    });
  });

  const pricePointIds = await Promise.all(
    prices.map((priceEntry) =>
      findSubscriptionPricePointId(
        priceEntry.price.price,
        priceEntry.price.territory,
        subscriptionId
      )
    )
  );

  for (let i = 0; i < pricePointIds.length; i++) {
    (includedPrices[i] as any).relationships.subscriptionPricePoint.data.id =
      pricePointIds[i];
  }

  const request: SubscriptionUpdateRequest = {
    data: {
      type: "subscriptions",
      id: subscriptionId,
      relationships: {
        prices: {
          data: priceRelationshipData as any,
        },
      },
    },
    included: includedPrices as any,
  };

  return { request, includedTerritories };
}

function applyCorrectedDateToBulkRequest(
  request: SubscriptionUpdateRequest,
  correctedDate: string,
  includedIndexes?: number[]
): void {
  const included = request.included as any[] | undefined;
  if (!included) return;

  const targets =
    includedIndexes && includedIndexes.length > 0
      ? includedIndexes
      : included.map((_, idx) => idx);

  for (const index of targets) {
    const item = included[index];
    if (!item?.attributes) continue;
    if (item.attributes.startDate === undefined) continue;
    item.attributes.startDate = correctedDate;
  }
}

function applyCorrectedDatesToBulkRequest(
  request: SubscriptionUpdateRequest,
  corrections: { includedIndex: number; correctedDate: string }[]
): void {
  for (const correction of corrections) {
    applyCorrectedDateToBulkRequest(
      request,
      correction.correctedDate,
      [correction.includedIndex]
    );
  }
}

// Create subscription prices for all territories
export async function createSubscriptionPrices(
  subscriptionId: string,
  prices: { price: Price; new: boolean }[],
  priceMap?: SubscriptionPricesResponse
): Promise<void> {
  if (prices.length === 0) {
    logger.debug("No prices to create for subscription");
    return;
  }

  logger.debug(
    `Creating ${prices.length} subscription prices for subscription ${subscriptionId}`
  );

  const maxRetries = 3;
  const deletedPriceIds = new Set<string>();
  let currentPriceMap: SubscriptionPricesResponse | undefined = priceMap;

  const { request, includedTerritories } =
    await buildBulkSubscriptionPricesUpdateRequest(subscriptionId, prices);

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await updateSubscription(subscriptionId, request);
      logger.debug(
        `Successfully created ${prices.length} subscription prices for subscription ${subscriptionId}`
      );
      return;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      if (!(error instanceof ContextualError)) {
        throw error;
      }

      const handling = handleSubscriptionPricesBulkErrors({
        error,
        includedTerritories,
      });

      if (!handling.shouldRetry) {
        throw error;
      }

      let handled = false;

      if (handling.invalidIncludedCorrections.length > 0) {
        applyCorrectedDatesToBulkRequest(
          request,
          handling.invalidIncludedCorrections
        );
        handled = true;
      }

      if (handling.territoriesToFix.length > 0) {
        if (!currentPriceMap) {
          currentPriceMap = await fetchSubscriptionPrices(subscriptionId);
        }

        for (const territory of handling.territoriesToFix) {
          const futurePriceId = findFuturePriceIdForTerritory(
            currentPriceMap,
            territory,
            deletedPriceIds
          );
          if (!futurePriceId) continue;
          await deleteSubscriptionPrice(futurePriceId);
          deletedPriceIds.add(futurePriceId);
          handled = true;
        }
      }

      if (!handled) {
        throw error;
      }
    }
  }

  throw new ContextualError("Failed to create subscription prices in bulk");
}

// Apply subscription pricing with equalizations support
export async function applySubscriptionPricingWithEqualizations(
  subscriptionId: string,
  desiredPriceSchedule: z.infer<typeof PriceScheduleSchema>,
  currentPriceSchedule: z.infer<typeof PriceScheduleSchema> | undefined,
  changes: {
    addedPrices: Price[];
    updatedPrices: Price[];
    deletedTerritories: z.infer<typeof TerritoryCodeSchema>[];
  }
): Promise<void> {
  logger.debug(
    `Applying subscription pricing with equalizations for subscription ${subscriptionId}`
  );

  // Step 1: Build the complete desired price map using base territory + equalizations + custom overrides
  const desiredPriceMap = await buildCompleteDesiredPriceMap(
    desiredPriceSchedule,
    subscriptionId
  );

  // Step 2: Fetch current prices from the API
  const priceMap = await fetchSubscriptionPrices(subscriptionId);

  // Step 3: Compute currentPriceMap for comparison
  const fullCurrentPriceSchedule = await processSubscriptionPriceResponse(
    priceMap,
    false
  );
  const currentPriceMap = new Map(
    fullCurrentPriceSchedule?.prices.map((p) => [p.territory, p]) ?? []
  );

  // Step 4: Compare the two maps to determine what needs to be updated
  const pricesToUpdate = findPricesToUpdate(desiredPriceMap, currentPriceMap);

  // Step 5: Apply the changes (passing priceMap for reactive conflict handling)
  if (pricesToUpdate.length > 0) {
    logger.debug(
      `Updating ${pricesToUpdate.length} subscription prices for subscription ${subscriptionId}`
    );

    // Check if there are any price updates (not just new prices)
    const hasPriceUpdates = pricesToUpdate.some((p) => !p.new);
    if (hasPriceUpdates) {
      await addJobInfo(MESSAGES.SUBSCRIPTION_PRICE_CHANGE, "after");
    }

    await createSubscriptionPrices(subscriptionId, pricesToUpdate, priceMap);
  } else {
    logger.debug("No subscription price changes needed");
  }
}

// Build complete desired price map using base territory + equalizations + custom overrides
export async function buildCompleteDesiredPriceMap(
  pricing: z.infer<typeof PriceScheduleSchema>,
  subscriptionId: string
): Promise<Map<string, Price>> {
  const priceMap = new Map<string, Price>();

  // Get the base territory price
  const baseTerritoryPrice = pricing.prices.find(
    (p) => p.territory === pricing.baseTerritory
  );

  if (!baseTerritoryPrice) {
    throw new Error(
      `Base territory price not found for territory ${pricing.baseTerritory}`
    );
  }

  // Find the price point ID for the base territory price
  const basePricePointId = await findSubscriptionPricePointId(
    baseTerritoryPrice.price,
    baseTerritoryPrice.territory,
    subscriptionId
  );

  // Get all equalized prices for the base territory
  const equalizedPrices =
    await buildSubscriptionPricesWithEqualizations(basePricePointId);

  // Add all equalized prices to the map
  for (const price of equalizedPrices) {
    priceMap.set(price.territory, price);
  }

  // Override with custom prices from the price schedule
  for (const price of pricing.prices) {
    priceMap.set(price.territory, price);
  }

  return priceMap;
}

export function extractFuturePriceIds(
  response: SubscriptionPricesResponse
): Map<string, string> {
  const futurePriceMap = new Map<string, string>();

  for (const priceData of response.data || []) {
    const startDate = priceData.attributes?.startDate;
    if (!isFuturePrice(startDate)) continue;

    const territoryId = priceData.relationships?.territory?.data?.id;
    if (!territoryId) continue;

    futurePriceMap.set(territoryId, priceData.id);
  }

  return futurePriceMap;
}

// Find future price ID for a territory from SubscriptionPricesResponse
// If only one price exists for the territory, return it
// If multiple prices exist, find the one with the latest startDate and return its ID
// Return null if no price is found
// Excludes prices that are in the deletedPriceIds set
export function findFuturePriceIdForTerritory(
  priceMap: SubscriptionPricesResponse | undefined,
  territoryCode: string,
  deletedPriceIds?: Set<string>
): string | null {
  if (!priceMap) {
    return null;
  }
  const pricesForTerritory = (priceMap.data || []).filter(
    (priceData) =>
      priceData.relationships?.territory?.data?.id === territoryCode &&
      !deletedPriceIds?.has(priceData.id)
  );

  if (pricesForTerritory.length === 0) {
    return null;
  }

  // If only one price exists for the territory, return it
  if (pricesForTerritory.length === 1) {
    return pricesForTerritory[0].id;
  }

  // If multiple prices exist, find the one with the latest startDate
  let latestPrice: { id: string; startDate: Date } | null = null;

  for (const priceData of pricesForTerritory) {
    const startDate = priceData.attributes?.startDate;
    if (!startDate) continue;

    const parsedDate = parseAppleDate(startDate);
    if (!parsedDate) continue;

    // Find the price with the latest startDate
    if (!latestPrice || parsedDate > latestPrice.startDate) {
      latestPrice = {
        id: priceData.id,
        startDate: parsedDate,
      };
    }
  }

  return latestPrice ? latestPrice.id : null;
}

// Find prices that need to be updated by comparing desired and current price maps
export function findPricesToUpdate(
  desiredPriceMap: Map<string, Price>,
  currentPriceMap: Map<string, Price>
): { price: Price; new: boolean }[] {
  const pricesToUpdate: { price: Price; new: boolean }[] = [];

  // Check all desired prices
  for (const [territory, desiredPrice] of desiredPriceMap.entries()) {
    const currentPrice = currentPriceMap.get(territory);

    if (!currentPrice) {
      // Territory is new - add it
      pricesToUpdate.push({ price: desiredPrice, new: true });
    } else if (!compareNumericValues(currentPrice.price, desiredPrice.price)) {
      // Price has changed - update it
      pricesToUpdate.push({ price: desiredPrice, new: false });
    }
  }

  return pricesToUpdate;
}

export async function buildSubscriptionPricesWithEqualizations(
  pricePointId: string
): Promise<Price[]> {
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
}
