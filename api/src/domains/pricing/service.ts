import { logger } from "@semihcihan/shared";
import {
  AppStoreModelSchema,
  PriceSchema,
  PriceScheduleSchema,
} from "@semihcihan/shared";
import { TerritoryCodeSchema } from "@semihcihan/shared";
import { z } from "zod";
import {
  fetchAppPricePoints,
  createAppPriceSchedule as createAppPriceScheduleAPI,
} from "../../domains/pricing/api-client";
import { ContextualError } from "@semihcihan/shared";
import type { components } from "@semihcihan/app-store-connect-api-types";

type AppPriceScheduleCreateRequest =
  components["schemas"]["AppPriceScheduleCreateRequest"];
type AppPriceV2 = components["schemas"]["AppPriceV2"];

type Price = z.infer<typeof PriceSchema>;
type Territory = z.infer<typeof TerritoryCodeSchema>;

// Helper function to find app price point ID for a given price and territory
async function findAppPricePointId(
  price: string,
  territory: Territory,
  appId: string
): Promise<string> {
  const response = await fetchAppPricePoints(appId, territory);
  const pricePoints = response?.data || [];

  // Find the price point that matches the price and territory
  const pricePoint = pricePoints.find((point: any) => {
    const pointPrice = point.attributes?.customerPrice;
    const pointTerritoryId = point.relationships?.territory?.data?.id;

    return pointPrice === price && pointTerritoryId === territory;
  });

  if (!pricePoint) {
    throw new ContextualError(
      `No price point found for price ${price} in territory ${territory}`,
      {
        price,
        territory,
        appId,
        pricePoints: pricePoints.map((p: any) => p.attributes?.customerPrice),
      }
    );
  }

  return pricePoint.id;
}

// Create price schedule request builder
function buildPriceScheduleRequest(
  appId: string,
  baseTerritory: Territory,
  prices: Price[]
): AppPriceScheduleCreateRequest {
  const manualPrices: { type: "appPrices"; id: string }[] = [];
  const includedPrices: AppPriceV2[] = [];

  prices.forEach((priceEntry, index) => {
    const tempPriceId = `\${price-${priceEntry.territory}-${index}}`;

    manualPrices.push({
      type: "appPrices" as const,
      id: tempPriceId,
    });

    includedPrices.push({
      type: "appPrices" as const,
      id: tempPriceId,
      attributes: {
        manual: true,
        startDate: undefined,
        endDate: undefined,
      },
      relationships: {
        appPricePoint: {
          data: {
            type: "appPricePoints" as const,
            id: "placeholder", // Will be replaced by actual price point ID
          },
        },
        territory: {
          data: {
            type: "territories" as const,
            id: priceEntry.territory,
          },
        },
      },
    });
  });

  return {
    data: {
      type: "appPriceSchedules" as const,
      relationships: {
        app: {
          data: {
            type: "apps" as const,
            id: appId,
          },
        },
        baseTerritory: {
          data: {
            type: "territories" as const,
            id: baseTerritory,
          },
        },
        manualPrices: {
          data: manualPrices,
        },
      },
    },
    included: includedPrices,
  };
}

// Create app price schedule from scratch
export async function createAppPriceSchedule(
  priceSchedule: z.infer<typeof PriceScheduleSchema>,
  appId: string
): Promise<void> {
  logger.debug(
    `Creating app price schedule with base territory ${priceSchedule.baseTerritory} for app ${appId}`
  );

  const createRequest = buildPriceScheduleRequest(
    appId,
    priceSchedule.baseTerritory,
    priceSchedule.prices
  );

  // Resolve actual price point IDs
  for (let i = 0; i < priceSchedule.prices.length; i++) {
    const priceEntry = priceSchedule.prices[i];
    const pricePointId = await findAppPricePointId(
      priceEntry.price,
      priceEntry.territory,
      appId
    );
    if (createRequest.included) {
      (createRequest.included[i] as any).relationships.appPricePoint.data.id =
        pricePointId;
    }
  }

  await createAppPriceScheduleAPI(createRequest);
  logger.debug(
    `Successfully created app price schedule with base territory ${priceSchedule.baseTerritory}`
  );
}
