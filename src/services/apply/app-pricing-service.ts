import { logger } from "../../utils/logger";
import { api } from "../api";
import {
  AppStoreModelSchema,
  PriceScheduleSchema,
  PriceSchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Price = z.infer<typeof PriceSchema>;
type Territory = z.infer<typeof TerritoryCodeSchema>;

// Helper function to get app price schedule ID from app ID
async function getAppPriceScheduleId(appId: string): Promise<string> {
  const response = await api.GET("/v1/apps/{id}/appPriceSchedule", {
    params: { path: { id: appId } },
  });

  if (response.error) {
    logger.error(
      `Failed to get app price schedule: ${JSON.stringify(response.error)}`
    );
    throw new Error(
      `Failed to get app price schedule: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  const responseData = response.data;
  if (!responseData || typeof responseData === "string") {
    throw new Error("Invalid response format from app price schedule API");
  }

  return responseData.data.id;
}

// Helper function to find app price point ID for a given price and territory
async function findAppPricePointId(
  price: string,
  territory: Territory,
  appId: string
): Promise<string> {
  const response = await api.GET("/v1/apps/{id}/appPricePoints", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: ["territory"],
        "fields[appPricePoints]": ["customerPrice", "territory"],
        "fields[territories]": ["currency"],
        "filter[territory]": [territory], // Filter for specific territory
      },
    },
  });

  if (response.error) {
    logger.error(
      `Failed to get app price points: ${JSON.stringify(response.error)}`
    );
    throw new Error(
      `Failed to get app price points: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  const responseData = response.data;
  if (!responseData || typeof responseData === "string") {
    throw new Error("Invalid response format from app price points API");
  }

  const pricePoints = responseData.data || [];

  // Find the price point that matches the price and territory
  const pricePoint = pricePoints.find((point: any) => {
    const pointPrice = point.attributes?.customerPrice;
    const pointTerritoryId = point.relationships?.territory?.data?.id;

    return pointPrice === price && pointTerritoryId === territory;
  });

  if (!pricePoint) {
    logger.error(
      `No price point found for price ${price} in territory ${territory}. ` +
        `Found ${pricePoints.length} price points for territory ${territory}. ` +
        `Available prices: ${pricePoints
          .map((p: any) => p.attributes?.customerPrice)
          .join(", ")}`
    );

    throw new Error(
      `No price point found for price ${price} in territory ${territory}`
    );
  }

  return pricePoint.id;
}

// Helper function to get current manual prices from the price schedule
async function getCurrentManualPrices(priceScheduleId: string): Promise<any[]> {
  const response = await api.GET("/v1/appPriceSchedules/{id}/manualPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: ["territory", "appPricePoint"],
        // Don't limit fields so we get all the relationship data
      },
    },
  });

  if (response.error) {
    logger.error(
      `Failed to get manual prices: ${JSON.stringify(response.error)}`
    );
    throw new Error(
      `Failed to get manual prices: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  const responseData = response.data;
  if (!responseData || typeof responseData === "string") {
    throw new Error("Invalid response format from manual prices API");
  }

  return responseData.data || [];
}

// Helper function to get base territory
async function getBaseTerritory(priceScheduleId: string): Promise<string> {
  const response = await api.GET("/v1/appPriceSchedules/{id}/baseTerritory", {
    params: {
      path: { id: priceScheduleId },
      query: {
        "fields[territories]": ["currency"],
      },
    },
  });

  if (response.error) {
    logger.error(
      `Failed to get base territory: ${JSON.stringify(response.error)}`
    );
    throw new Error(
      `Failed to get base territory: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  const responseData = response.data;
  if (!responseData || typeof responseData === "string") {
    throw new Error("Invalid response format from base territory API");
  }

  return responseData.data?.id || "";
}

// Update app base territory by creating a new price schedule
export async function updateAppBaseTerritory(
  territory: Territory,
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(`Updating app base territory to ${territory} for app ${appId}`);

  try {
    // Get current price schedule to preserve manual prices
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const currentManualPrices = await getCurrentManualPrices(
      currentPriceScheduleId
    );

    // Create new price schedule with new base territory
    const response = await api.POST("/v1/appPriceSchedules", {
      body: {
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
                id: territory,
              },
            },
            manualPrices: {
              data: currentManualPrices.map((price: any) => ({
                type: "appPrices" as const,
                id: price.id,
              })),
            },
          },
        },
        included: currentManualPrices.map((price: any) => ({
          type: "appPrices" as const,
          id: price.id,
          attributes: {
            startDate: new Date().toISOString().split("T")[0],
            manual: true,
            // No endDate = permanent
          },
          relationships: {
            appPricePoint: {
              data: {
                type: "appPricePoints" as const,
                id: price.relationships?.appPricePoint?.data?.id,
              },
            },
            territory: {
              data: {
                type: "territories" as const,
                id: price.relationships?.territory?.data?.id,
              },
            },
          },
        })),
      },
    });

    if (response.error) {
      logger.error(
        `Failed to update base territory: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to update base territory: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    logger.info(`Successfully updated app base territory to ${territory}`);
  } catch (error) {
    logger.error(`Error updating app base territory: ${error}`);
    throw error;
  }
}

// Create app price by creating a new price schedule with the additional price
export async function createAppPrice(
  price: Price,
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(
    `Creating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
  );

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const currentManualPrices = await getCurrentManualPrices(
      currentPriceScheduleId
    );
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Find the price point for the new price
    const pricePointId = await findAppPricePointId(
      price.price,
      price.territory,
      appId
    );

    // Create new price schedule with the additional price
    const newPriceId = `new-price-${Date.now()}`;
    const newPriceEntry = {
      type: "appPrices" as const,
      id: newPriceId,
      attributes: {
        startDate: new Date().toISOString().split("T")[0], // Start today
        manual: true,
        // No endDate = permanent
      },
      relationships: {
        appPricePoint: {
          data: {
            type: "appPricePoints" as const,
            id: pricePointId,
          },
        },
        territory: {
          data: {
            type: "territories" as const,
            id: price.territory,
          },
        },
      },
    };

    const response = await api.POST("/v1/appPriceSchedules", {
      body: {
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
              data: [
                ...currentManualPrices
                  .filter(
                    (price: any) =>
                      price.relationships?.appPricePoint?.data?.id &&
                      price.relationships?.territory?.data?.id
                  )
                  .map((price: any) => ({
                    type: "appPrices" as const,
                    id: price.id,
                  })),
                {
                  type: "appPrices" as const,
                  id: newPriceId,
                },
              ],
            },
          },
        },
        included: [
          ...currentManualPrices
            .filter(
              (price: any) =>
                price.relationships?.appPricePoint?.data?.id &&
                price.relationships?.territory?.data?.id
            )
            .map((price: any) => ({
              type: "appPrices" as const,
              id: price.id,
              attributes: {
                startDate: new Date().toISOString().split("T")[0],
                manual: true,
                // No endDate = permanent
              },
              relationships: price.relationships, // Use existing relationships as-is
            })),
          newPriceEntry,
        ],
      },
    });

    if (response.error) {
      logger.error(
        `Failed to create app price: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to create app price: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    logger.info(
      `Successfully created app price for territory ${price.territory}`
    );
  } catch (error) {
    logger.error(`Error creating app price: ${error}`);
    throw error;
  }
}

// Update app price by creating a new price schedule with updated price
export async function updateAppPrice(
  price: Price,
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(
    `Updating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
  );

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const currentManualPrices = await getCurrentManualPrices(
      currentPriceScheduleId
    );
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Find the price point for the new price
    const pricePointId = await findAppPricePointId(
      price.price,
      price.territory,
      appId
    );

    // Today's date for immediate effect
    const today = new Date().toISOString().split("T")[0];

    // Create a new price for the territory (this will replace any existing price)
    const newPriceId = `new-price-${Date.now()}`;
    const newPriceEntry = {
      type: "appPrices" as const,
      id: newPriceId,
      attributes: {
        startDate: today, // Start today
        manual: true,
        // No endDate = permanent
      },
      relationships: {
        appPricePoint: {
          data: {
            type: "appPricePoints" as const,
            id: pricePointId,
          },
        },
        territory: {
          data: {
            type: "territories" as const,
            id: price.territory,
          },
        },
      },
    };

    const response = await api.POST("/v1/appPriceSchedules", {
      body: {
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
              data: [
                {
                  type: "appPrices" as const,
                  id: newPriceId,
                },
              ],
            },
          },
        },
        included: [newPriceEntry],
      },
    });

    if (response.error) {
      logger.error(
        `Failed to update app price: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to update app price: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    logger.info(
      `Successfully updated app price for territory ${price.territory}`
    );
  } catch (error) {
    logger.error(`Error updating app price: ${error}`);
    throw error;
  }
}

// Delete app price by creating a new price schedule without the price
export async function deleteAppPrice(
  territory: Territory,
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(`Deleting app price for territory ${territory} for app ${appId}`);

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const currentManualPrices = await getCurrentManualPrices(
      currentPriceScheduleId
    );
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Today's date for immediate effect
    const today = new Date().toISOString().split("T")[0];

    // Remove the price for the specified territory by setting end date
    const updatedManualPrices = currentManualPrices.map(
      (existingPrice: any) => {
        const territoryId = existingPrice.relationships?.territory?.data?.id;

        if (territoryId === territory) {
          // Set end date to today to "delete" the price
          return {
            ...existingPrice,
            attributes: {
              ...existingPrice.attributes,
              endDate: today, // End price today
            },
          };
        }

        return existingPrice;
      }
    );

    const response = await api.POST("/v1/appPriceSchedules", {
      body: {
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
              data: updatedManualPrices.map((price: any) => ({
                type: "appPrices" as const,
                id: price.id,
              })),
            },
          },
        },
        included: updatedManualPrices.map((price: any) => ({
          type: "appPrices" as const,
          id: price.id,
          attributes: price.attributes,
          relationships: price.relationships,
        })),
      },
    });

    if (response.error) {
      logger.error(
        `Failed to delete app price: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to delete app price: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    logger.info(`Successfully deleted app price for territory ${territory}`);
  } catch (error) {
    logger.error(`Error deleting app price: ${error}`);
    throw error;
  }
}
