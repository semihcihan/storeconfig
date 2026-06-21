import {
  logger,
  findBestClosestPrice,
  PriceSchema,
  PriceScheduleSchema,
  TerritoryCodeSchema,
  addJobInfo,
} from "@semihcihan/shared";
import { z } from "zod";
import { createAppPriceSchedule as createAppPriceScheduleAPI } from "../../domains/pricing/api-client";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { compareNumericValues } from "@semihcihan/shared";
import { findPricePointId } from "../../services/price-point";

type AppPriceScheduleCreateRequest =
  components["schemas"]["AppPriceScheduleCreateRequest"];
type AppPriceV2 = components["schemas"]["AppPriceV2"];

type Price = z.infer<typeof PriceSchema>;
type Territory = z.infer<typeof TerritoryCodeSchema>;

// Helper function to find app price point ID for a given price and territory
export async function findAppPricePointId(
  price: string,
  territory: Territory,
  appId: string
): Promise<string> {
  return await findPricePointId(price, territory, appId, "app");
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
  pricing: z.infer<typeof PriceScheduleSchema>,
  appId: string
): Promise<void> {
  logger.debug(
    `Creating app price schedule with base territory ${pricing.baseTerritory} for app ${appId}`
  );

  const createRequest = buildPriceScheduleRequest(
    appId,
    pricing.baseTerritory,
    pricing.prices
  );

  const pricePointIds = await Promise.all(
    pricing.prices.map((priceEntry) =>
      findAppPricePointId(priceEntry.price, priceEntry.territory, appId)
    )
  );

  for (let i = 0; i < pricePointIds.length; i++) {
    if (createRequest.included) {
      (createRequest.included[i] as any).relationships.appPricePoint.data.id =
        pricePointIds[i];
    }
  }

  await createAppPriceScheduleAPI(createRequest);
  logger.debug(
    `Successfully created app price schedule with base territory ${pricing.baseTerritory}`
  );
}
