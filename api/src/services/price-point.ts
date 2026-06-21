import { fetchAppPricePoints } from "../domains/pricing/api-client";
import { fetchIAPPricePoints } from "../domains/in-app-purchases/api-client";
import { fetchAllSubscriptionPricePoints } from "../domains/subscriptions/api-client";
import {
  territoryCodes,
  logger,
  findBestClosestPrice,
  compareNumericValues,
  addJobInfo,
} from "@semihcihan/shared";

export type ResourceType = "app" | "iap" | "subscription";

export interface PricePoint {
  priceIndex: string;
  customerPrice: string;
}

export interface TerritoryPricePoints {
  territory: string;
  resourceType: ResourceType;
  pricePoints: PricePoint[];
}

interface DecodedPricePointId {
  s: string;
  t: string;
  p: string;
}

/**
 * Hook function type for fetching price points data
 * This hook is provided by the local runtime/cache layer.
 */
export type PricePointDataHook = (
  resourceType: ResourceType,
  territory: string,
  resourceId?: string
) => Promise<TerritoryPricePoints | null>;

let pricePointDataHook: PricePointDataHook | null = null;

/**
 * Set the hook function for fetching price points data
 * This can be called directly or passed through applyChanges/applyPricingChanges
 * The hook is cached for the lifetime of the API call
 */
export function setPricePointDataHook(hook: PricePointDataHook | null): void {
  pricePointDataHook = hook;
}

export function encodePricePointId(
  resourceId: string,
  territory: string,
  priceIndex: string
): string {
  const payload: DecodedPricePointId = {
    s: resourceId,
    t: territory,
    p: priceIndex,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function decodePricePointId(pricePointId: string): DecodedPricePointId {
  const decoded = Buffer.from(pricePointId, "base64").toString("utf-8");
  return JSON.parse(decoded) as DecodedPricePointId;
}

function findPricePointByCustomerPrice(
  pricePoints: PricePoint[],
  customerPrice: string
): PricePoint | undefined {
  return pricePoints.find((pp) =>
    compareNumericValues(customerPrice, pp.customerPrice)
  );
}

/**
 * Get price points data for a given resource type and territory
 * Returns null if data is not available or not found
 */
export async function getTerritoryPricePointsData(
  resourceType: ResourceType,
  territory: string,
  resourceId?: string
): Promise<PricePoint[] | null> {
  if (!pricePointDataHook) {
    logger.warn(
      `Price point data hook not registered for ${resourceType}/${territory}`
    );
    return null;
  }

  try {
    const data = resourceId
      ? await pricePointDataHook(resourceType, territory, resourceId)
      : await pricePointDataHook(resourceType, territory);
    if (!data?.pricePoints || data.pricePoints.length === 0) {
      return null;
    }
    return data.pricePoints;
  } catch (error) {
    logger.warn(
      `Failed to get price points data for ${resourceType}/${territory}`,
      error
    );
    return null;
  }
}

/**
 * Find and encode price point ID from a list of price points
 * Tries exact match first, then falls back to closest price
 */
async function findAndEncodePricePointId(
  pricePoints: PricePoint[],
  price: string,
  territory: string,
  resourceId: string
): Promise<string | null> {
  if (pricePoints.length === 0) {
    return null;
  }

  // Find exact match
  const pricePoint = findPricePointByCustomerPrice(pricePoints, price);
  if (pricePoint) {
    return encodePricePointId(resourceId, territory, pricePoint.priceIndex);
  }

  // Find closest price
  const availablePrices = pricePoints.map((pp) => pp.customerPrice);
  const bestPrice = findBestClosestPrice(price, availablePrices);

  if (!bestPrice) {
    return null;
  }

  const closestPricePoint = findPricePointByCustomerPrice(
    pricePoints,
    bestPrice
  );

  if (!closestPricePoint) {
    return null;
  }

  const message = `No price point found for price ${price} in territory ${territory}. Closest available price ${bestPrice} is used.`;
  logger.info(message);
  await addJobInfo(message);

  return encodePricePointId(
    resourceId,
    territory,
    closestPricePoint.priceIndex
  );
}

/**
 * Find price point ID using price points data
 * This function finds the price point by customer price, gets the priceIndex,
 * and then encodes it with the resourceId to generate the final price point ID
 */
export async function findPricePointId(
  price: string,
  territory: string,
  resourceId: string,
  resourceType: ResourceType
): Promise<string> {
  const pricePointsData = await getTerritoryPricePointsData(
    resourceType,
    territory,
    resourceId
  );

  if (!pricePointsData || pricePointsData.length === 0) {
    throw new Error(
      `No price points data available for ${resourceType} in territory ${territory}`
    );
  }

  const pricePointId = await findAndEncodePricePointId(
    pricePointsData,
    price,
    territory,
    resourceId
  );

  if (!pricePointId) {
    throw new Error(
      `No price point found for price ${price} in territory ${territory}`
    );
  }

  return pricePointId;
}

interface PricePointDataItem {
  id: string;
  attributes?: {
    customerPrice?: string | null;
  };
}

function extractPricePointsFromResponse(
  pricePointsData: PricePointDataItem[] | undefined
): PricePoint[] {
  if (!pricePointsData || pricePointsData.length === 0) {
    return [];
  }

  return pricePointsData
    .filter(
      (
        pp
      ): pp is PricePointDataItem & {
        id: string;
        attributes: { customerPrice: string };
      } => {
        return !!pp.id && !!pp.attributes?.customerPrice;
      }
    )
    .map((pp) => {
      const decoded = decodePricePointId(pp.id);
      return {
        priceIndex: decoded.p,
        customerPrice: pp.attributes.customerPrice,
      };
    });
}

type FetchPricePointsFn = (
  resourceId: string,
  territory: string
) => Promise<{ data?: PricePointDataItem[] | null }>;

function getFetchPricePointsFn(resourceType: ResourceType): FetchPricePointsFn {
  switch (resourceType) {
    case "app":
      return fetchAppPricePoints;
    case "iap":
      return fetchIAPPricePoints;
    case "subscription":
      return fetchAllSubscriptionPricePoints;
    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }
}

export async function fetchTerritoryPricePointsForResource(
  resourceType: ResourceType,
  resourceId: string,
  territory: string
): Promise<TerritoryPricePoints> {
  const fetchFn = getFetchPricePointsFn(resourceType);
  const response = await fetchFn(resourceId, territory);
  const pricePoints = extractPricePointsFromResponse(
    response.data as PricePointDataItem[]
  );

  if (pricePoints.length === 0) {
    throw new Error(
      `No price points found for ${resourceType} ${resourceId} in territory ${territory}`
    );
  }

  return { territory, resourceType, pricePoints };
}

async function fetchPricePointsForAllTerritories(
  fetchFn: FetchPricePointsFn,
  resourceType: ResourceType,
  resourceId: string
): Promise<TerritoryPricePoints[]> {
  const results: TerritoryPricePoints[] = [];

  for (const territory of territoryCodes) {
    const response = await fetchFn(resourceId, territory);
    const pricePoints = extractPricePointsFromResponse(
      response.data as PricePointDataItem[]
    );

    if (pricePoints.length > 0) {
      results.push({ territory, resourceType, pricePoints });
      logger.debug(
        `Fetched ${pricePoints.length} ${resourceType} price points for ${territory}`
      );
    } else {
      throw new Error(
        `No price points found for ${resourceType} ${resourceId} in territory ${territory}`
      );
    }
  }

  return results;
}

/**
 * Fetch price points for a single resource type
 */
export async function refreshPricePointsForResourceType(
  resourceType: ResourceType,
  resourceId: string
): Promise<TerritoryPricePoints[]> {
  if (!resourceId) {
    throw new Error(
      `Refreshing ${resourceType} price points failed as no resource ID provided`
    );
  }

  let fetchFn: FetchPricePointsFn;

  switch (resourceType) {
    case "app":
    case "iap":
    case "subscription":
      fetchFn = getFetchPricePointsFn(resourceType);
      break;
    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }

  logger.info(`Fetching ${resourceType} price points for ID: ${resourceId}`);
  const result = await fetchPricePointsForAllTerritories(
    fetchFn,
    resourceType,
    resourceId
  );
  logger.info(
    `Fetched ${resourceType} price points for ${result.length} territories`
  );

  return result;
}
