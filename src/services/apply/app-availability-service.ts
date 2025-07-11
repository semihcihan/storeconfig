import { logger } from "../../utils/logger";
import { AppStoreModelSchema } from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { z } from "zod";
import {
  getAppAvailability,
  createAppAvailability,
  getTerritoryAvailabilities,
  updateTerritoryAvailability,
} from "../../domains/availability/api-client";
import { decodeTerritoryAvailabilityId } from "../../helpers/id-encoding-helpers";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

// Helper function to get territory availability mappings
async function getTerritoryAvailabilityMap(
  appAvailabilityId: string
): Promise<Map<string, string>> {
  const territoryMap = new Map<string, string>();

  const territories = await getTerritoryAvailabilities(appAvailabilityId);

  // Process territories and decode their IDs to get territory codes
  for (const territory of territories) {
    const decoded = decodeTerritoryAvailabilityId(territory.id);
    if (decoded) {
      territoryMap.set(decoded.territoryCode, territory.id);
    }
  }

  return territoryMap;
}

// Helper function to create app availability for a new app
async function createAppAvailabilityForApp(
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
    const territoryAvailabilityId = `temp-territory-availability-${i}`;
    const available = availableTerritories.includes(territoryCode);

    territoryAvailabilityData.push({
      type: "territoryAvailabilities" as const,
      id: territoryAvailabilityId,
    });

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

  const createRequest = {
    data: {
      type: "appAvailabilities" as const,
      attributes: {
        availableInNewTerritories: true,
      },
      relationships: {
        app: {
          data: {
            type: "apps" as const,
            id: appId,
          },
        },
        territoryAvailabilities: {
          data: territoryAvailabilityData,
        },
      },
    },
    included: includedTerritoryAvailabilities,
  };

  const response = await createAppAvailability(createRequest);

  if (!response.data?.id) {
    throw new Error("No app availability ID returned from creation");
  }

  logger.info(`Successfully created app availability: ${response.data.id}`);
  return response.data.id;
}

// Helper function to get or create app availability resource
async function ensureAppAvailability(
  appId: string,
  availableTerritories: string[]
): Promise<string> {
  const existingAvailability = await getAppAvailability(appId);

  if (existingAvailability?.data?.id) {
    logger.info(
      `Found existing app availability: ${existingAvailability.data.id}`
    );
    return existingAvailability.data.id;
  }

  logger.info(
    `No app availability found for app ${appId}. Creating new availability...`
  );
  return await createAppAvailabilityForApp(appId, availableTerritories);
}

// Update territory availability
async function updateTerritoryAvailabilityStatus(
  territoryAvailabilityId: string,
  available: boolean
): Promise<void> {
  const updateRequest = {
    data: {
      type: "territoryAvailabilities" as const,
      id: territoryAvailabilityId,
      attributes: {
        available,
      },
    },
  };

  await updateTerritoryAvailability(territoryAvailabilityId, updateRequest);
  logger.info(`Territory availability updated successfully`);
}

// Main function to update app availability
export async function updateAppAvailability(
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[],
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(`Available Territories: ${JSON.stringify(availableTerritories)}`);

  // Ensure app availability resource exists (create if needed)
  const appAvailabilityId = await ensureAppAvailability(
    appId,
    availableTerritories
  );

  // Get territory availability mapping
  logger.info("Getting territory availability mappings...");
  const territoryMap = await getTerritoryAvailabilityMap(appAvailabilityId);
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
        await updateTerritoryAvailabilityStatus(territoryAvailabilityId, true);
      } else {
        logger.warn(`Territory availability ID not found for: ${territory}`);
      }
    }

    // Disable territories
    for (const territory of territoriesToDisable) {
      const territoryAvailabilityId = territoryMap.get(territory as string);
      if (territoryAvailabilityId) {
        logger.info(`Disabling territory: ${territory}`);
        await updateTerritoryAvailabilityStatus(territoryAvailabilityId, false);
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
