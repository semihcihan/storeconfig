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
  desiredState: AppStoreModel
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
        `Failed to update app base territory: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to update app base territory: ${
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

// Create app price by updating the existing price schedule
export async function createAppPrice(
  price: Price,
  appId: string,
  desiredState: AppStoreModel
): Promise<void> {
  logger.info(
    `Creating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
  );

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const allPrices = desiredState.pricing?.prices || [];

    if (allPrices.length === 0) {
      throw new Error("No prices found in desired state");
    }

    // Create manual price IDs for all territories in the desired state
    const manualPrices = [];
    const includedPrices = [];

    for (const priceEntry of allPrices) {
      const pricePointId = await findAppPricePointId(
        priceEntry.price,
        priceEntry.territory,
        appId
      );

      // Use a temporary ID for this request
      const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

      manualPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
      });

      includedPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
        attributes: {
          manual: true,
          startDate: null,
          endDate: null,
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
              id: priceEntry.territory,
            },
          },
        },
      });
    }

    // Get base territory for the new price schedule
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Create a new price schedule with all the desired prices
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
              data: manualPrices,
            },
          },
        },
        included: includedPrices,
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

// Update app price by updating the existing price schedule
export async function updateAppPrice(
  price: Price,
  appId: string,
  desiredState: AppStoreModel
): Promise<void> {
  logger.info(
    `Updating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
  );

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const allPrices = desiredState.pricing?.prices || [];

    if (allPrices.length === 0) {
      throw new Error("No prices found in desired state");
    }

    // Create manual price IDs for all territories in the desired state
    const manualPrices = [];
    const includedPrices = [];

    for (const priceEntry of allPrices) {
      const pricePointId = await findAppPricePointId(
        priceEntry.price,
        priceEntry.territory,
        appId
      );

      // Use a temporary ID for this request
      const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

      manualPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
      });

      includedPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
        attributes: {
          manual: true,
          startDate: null,
          endDate: null,
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
              id: priceEntry.territory,
            },
          },
        },
      });
    }

    // Get base territory for the new price schedule
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Create a new price schedule with all the desired prices
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
              data: manualPrices,
            },
          },
        },
        included: includedPrices,
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

// Delete app price by updating the existing price schedule
export async function deleteAppPrice(
  territory: Territory,
  appId: string,
  desiredState: AppStoreModel
): Promise<void> {
  logger.info(`Deleting app price for territory ${territory} for app ${appId}`);

  try {
    // Get current price schedule details
    const currentPriceScheduleId = await getAppPriceScheduleId(appId);
    const allPrices = desiredState.pricing?.prices || [];

    if (allPrices.length === 0) {
      throw new Error("No prices found in desired state");
    }

    // Create manual price IDs for all territories in the desired state
    // (excluding the territory to be deleted)
    const manualPrices = [];
    const includedPrices = [];

    for (const priceEntry of allPrices) {
      const pricePointId = await findAppPricePointId(
        priceEntry.price,
        priceEntry.territory,
        appId
      );

      // Use a temporary ID for this request
      const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

      manualPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
      });

      includedPrices.push({
        type: "appPrices" as const,
        id: tempPriceId,
        attributes: {
          manual: true,
          startDate: null,
          endDate: null,
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
              id: priceEntry.territory,
            },
          },
        },
      });
    }

    // Get base territory for the new price schedule
    const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

    // Create a new price schedule with all the desired prices
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
              data: manualPrices,
            },
          },
        },
        included: includedPrices,
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
