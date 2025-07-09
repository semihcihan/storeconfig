import { logger } from "../../utils/logger";
import { api } from "../api";
import {
  AppStoreModelSchema,
  AvailabilitySchema,
} from "../../models/app-store";
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

// Helper function to ensure app availability resource exists
async function ensureAppAvailability(appId: string): Promise<string> {
  // First try to get existing app availability
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

  // If no existing availability exists, throw an error with helpful message
  throw new Error(
    `App availability not found for app ${appId}. Please ensure the app has availability settings configured in App Store Connect.`
  );
}

export async function updateAppAvailability(
  availability: Availability,
  appId: string,
  currentState: AppStoreModel
): Promise<void> {
  logger.info(`  Availability: ${JSON.stringify(availability)}`);

  // Ensure app availability resource exists
  const appAvailabilityId = await ensureAppAvailability(appId);

  // Update availableInNewTerritories setting if needed
  const currentAvailability = currentState.availability;
  const desiredAvailability = availability;

  if (
    !currentAvailability ||
    currentAvailability.availableInNewTerritories !==
      desiredAvailability.availableInNewTerritories
  ) {
    logger.info(
      `Updating availableInNewTerritories: ${desiredAvailability.availableInNewTerritories}`
    );
    logger.warn(
      "⚠️  availableInNewTerritories updates are not yet implemented"
    );
    logger.warn("📝 Please manually update this setting in App Store Connect");
  }

  // Get territory availability mapping
  logger.info("Getting territory availability mappings...");
  const territoryMap = await getTerritoryAvailabilities(appAvailabilityId);
  logger.info(`Found ${territoryMap.size} territories`);

  // Build sets of current and desired territories
  const currentTerritories = new Set(
    currentAvailability?.availableTerritories || []
  );
  const desiredTerritories = new Set(desiredAvailability.availableTerritories);

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
