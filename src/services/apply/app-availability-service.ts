import { logger } from "../../utils/logger";
import { api } from "../api";
import {
  AppStoreModelSchema,
  AvailabilitySchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type Availability = z.infer<typeof AvailabilitySchema>;

// Helper function to get territory availability IDs from an app availability
async function getTerritoryAvailabilities(
  appAvailabilityId: string
): Promise<Map<string, string>> {
  const territoryMap = new Map<string, string>();

  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await api.GET(
      "/v2/appAvailabilities/{id}/territoryAvailabilities",
      {
        params: {
          path: { id: appAvailabilityId },
          query: {
            "fields[territoryAvailabilities]": ["available", "territory"],
            limit: 50,
            ...(cursor ? { cursor } : {}),
          },
        },
      }
    );

    if (response.error) {
      logger.error(
        `Failed to get territory availabilities: ${JSON.stringify(
          response.error
        )}`
      );
      throw new Error(
        `Failed to get territory availabilities: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    const territories = response.data?.data || [];

    // Process territories and decode their IDs to get territory codes
    for (const territory of territories) {
      try {
        const decoded = JSON.parse(
          Buffer.from(territory.id, "base64").toString("utf-8")
        );
        const territoryCode = decoded.t;
        territoryMap.set(territoryCode, territory.id);
      } catch (error) {
        logger.warn(`Failed to decode territory ID: ${territory.id}`);
      }
    }

    // Check for more pages
    cursor = response.data?.meta?.paging?.nextCursor;
    hasMore = !!cursor;
  }

  return territoryMap;
}

// Helper function to update a territory's availability
async function updateTerritoryAvailability(
  territoryAvailabilityId: string,
  available: boolean
): Promise<void> {
  const response = await api.PATCH("/v1/territoryAvailabilities/{id}", {
    params: {
      path: { id: territoryAvailabilityId },
    },
    body: {
      data: {
        type: "territoryAvailabilities",
        id: territoryAvailabilityId,
        attributes: {
          available,
        },
      },
    },
  });

  if (response.error) {
    logger.error(
      `Failed to update territory availability: ${JSON.stringify(
        response.error
      )}`
    );
    throw new Error(
      `Failed to update territory availability: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  logger.info(`Territory availability updated successfully`);
}

// Helper function to create app availability for a new app
async function createAppAvailability(
  appId: string,
  availableTerritories: string[]
): Promise<string> {
  logger.info("Creating new app availability...");

  // Import territory codes
  const { territoryCodes } = await import("../../models/territories");

  // Create territory availability objects for all territories
  const territoryAvailabilityData = [];
  const includedTerritoryAvailabilities = [];

  for (let i = 0; i < territoryCodes.length; i++) {
    const territoryCode = territoryCodes[i];
    // Create a unique ID for this territory availability (using index-based approach)
    const territoryAvailabilityId = `temp-territory-availability-${i}`;

    // Set available to true only if this territory is in the desired list
    const available = availableTerritories.includes(territoryCode);

    // Add to relationship data
    territoryAvailabilityData.push({
      type: "territoryAvailabilities" as const,
      id: territoryAvailabilityId,
    });

    // Add to included objects
    includedTerritoryAvailabilities.push({
      type: "territoryAvailabilities" as const,
      id: territoryAvailabilityId,
      attributes: {
        available,
      },
      relationships: {
        territory: {
          data: {
            type: "territories" as const,
            id: territoryCode,
          },
        },
      },
    });
  }

  const response = await api.POST("/v2/appAvailabilities", {
    body: {
      data: {
        type: "appAvailabilities",
        attributes: {
          availableInNewTerritories: true,
        },
        relationships: {
          app: {
            data: {
              type: "apps",
              id: appId,
            },
          },
          territoryAvailabilities: {
            data: territoryAvailabilityData,
          },
        },
      },
      included: includedTerritoryAvailabilities,
    },
  });

  if (response.error) {
    logger.error(
      `Failed to create app availability: ${JSON.stringify(response.error)}`
    );
    throw new Error(
      `Failed to create app availability: ${
        response.error.errors?.[0]?.detail || "Unknown error"
      }`
    );
  }

  if (!response.data?.data?.id) {
    throw new Error("No app availability ID returned from creation");
  }

  logger.info(
    `Successfully created app availability: ${response.data.data.id}`
  );
  return response.data.data.id;
}

// Helper function to get or create app availability resource
async function ensureAppAvailability(
  appId: string,
  availableTerritories: string[]
): Promise<string> {
  // Try to get existing app availability
  const existingResponse = await api.GET("/v1/apps/{id}/appAvailabilityV2", {
    params: {
      path: { id: appId },
    },
  });

  if (existingResponse.data?.data?.id) {
    logger.info(
      `Found existing app availability: ${existingResponse.data.data.id}`
    );
    return existingResponse.data.data.id;
  }

  // If no existing availability exists, create one
  logger.info(
    `No app availability found for app ${appId}. Creating new availability...`
  );
  return await createAppAvailability(appId, availableTerritories);
}

export async function updateAppAvailability(
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[],
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(
    `  Available Territories: ${JSON.stringify(availableTerritories)}`
  );

  // Ensure app availability resource exists (create if needed)
  const appAvailabilityId = await ensureAppAvailability(
    appId,
    availableTerritories
  );

  // Get territory availability mapping
  logger.info("Getting territory availability mappings...");
  const territoryMap = await getTerritoryAvailabilities(appAvailabilityId);
  logger.info(`Found ${territoryMap.size} territories`);

  // Build sets of current and desired territories
  const currentTerritories = new Set(currentState.availableTerritories);
  const desiredTerritories = new Set(availableTerritories);

  // Find territories that need to be enabled
  const territoriesToEnable = Array.from(desiredTerritories).filter(
    (territory) => !currentTerritories.has(territory)
  );

  // Find territories that need to be disabled
  const territoriesToDisable = Array.from(currentTerritories).filter(
    (territory) => !desiredTerritories.has(territory)
  );

  // Update territories
  const totalChanges = territoriesToEnable.length + territoriesToDisable.length;
  if (totalChanges > 0) {
    logger.info(`Updating ${totalChanges} territory availabilities...`);

    // Enable territories
    for (const territory of territoriesToEnable) {
      const territoryAvailabilityId = territoryMap.get(territory as string);
      if (territoryAvailabilityId) {
        logger.info(`Enabling territory: ${territory}`);
        await updateTerritoryAvailability(territoryAvailabilityId, true);
      } else {
        logger.warn(`Territory availability ID not found for: ${territory}`);
      }
    }

    // Disable territories
    for (const territory of territoriesToDisable) {
      const territoryAvailabilityId = territoryMap.get(territory as string);
      if (territoryAvailabilityId) {
        logger.info(`Disabling territory: ${territory}`);
        await updateTerritoryAvailability(territoryAvailabilityId, false);
      } else {
        logger.warn(`Territory availability ID not found for: ${territory}`);
      }
    }

    logger.info("Territory availability updates completed successfully");
  } else {
    logger.info("No territory availability changes needed");
  }

  logger.info("App availability update completed");
}
