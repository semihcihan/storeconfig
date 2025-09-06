import { api } from "../../services/api";
import { API_FIELD_CONFIGS, API_LIMITS } from "../../helpers/constants";
import {
  ContextualError,
  isNotFoundError,
} from "../../helpers/error-handling-helpers";
import { logger } from "../../utils/logger";
import type { components } from "../../generated/app-store-connect-api";

type AppAvailabilityV2Response =
  components["schemas"]["AppAvailabilityV2Response"];
type AppAvailabilityV2CreateRequest =
  components["schemas"]["AppAvailabilityV2CreateRequest"];
type TerritoryAvailabilityUpdateRequest =
  components["schemas"]["TerritoryAvailabilityUpdateRequest"];

// Get existing app availability
export async function getAppAvailability(
  appId: string
): Promise<AppAvailabilityV2Response | null> {
  const response = await api.GET("/v1/apps/{id}/appAvailabilityV2", {
    params: {
      path: { id: appId },
    },
  });

  if (response.error) {
    return null;
  }

  return response.data;
}

// Fetch app availability with all territory availabilities
export async function fetchAppAvailability(
  appId: string
): Promise<AppAvailabilityV2Response | null> {
  // First, get the app availability ID without including territoryAvailabilities
  const appAvailabilityResponse = await api.GET(
    "/v1/apps/{id}/appAvailabilityV2",
    {
      params: {
        path: { id: appId },
        query: {
          "fields[appAvailabilities]": API_FIELD_CONFIGS.appAvailability
            .fieldsAppAvailabilities as any,
        },
      },
    }
  );

  if (appAvailabilityResponse.error) {
    const is404Error = isNotFoundError(appAvailabilityResponse.error);
    if (is404Error) {
      logger.debug(
        `App availability not found for app ${appId} (not created yet)`
      );
      return null;
    }
    throw appAvailabilityResponse.error;
  }

  const appAvailabilityId = appAvailabilityResponse.data?.data?.id;
  if (!appAvailabilityId) {
    logger.debug(`No app availability found for app ${appId}`);
    return null;
  }

  // Now fetch all territory availabilities using the v2 endpoint (automatic pagination)
  const territoryAvailabilitiesResponse = await api.GET(
    "/v2/appAvailabilities/{id}/territoryAvailabilities",
    {
      params: {
        path: { id: appAvailabilityId },
        query: {
          limit: API_LIMITS.DEFAULT_LIMIT_v1,
          include: API_FIELD_CONFIGS.territoryAvailabilities.include as any,
          "fields[territoryAvailabilities]": API_FIELD_CONFIGS
            .territoryAvailabilities.fieldsTerritoryAvailabilities as any,
        },
      },
    }
  );

  if (territoryAvailabilitiesResponse.error) {
    throw new ContextualError(
      "Failed to fetch territory availabilities",
      territoryAvailabilitiesResponse.error
    );
  }

  // Combine the results to match the expected structure
  return {
    data: appAvailabilityResponse.data.data,
    included: territoryAvailabilitiesResponse.data?.data || [],
    links: appAvailabilityResponse.data.links,
  };
}

// Create new app availability
export async function createAppAvailability(
  createRequest: AppAvailabilityV2CreateRequest
): Promise<AppAvailabilityV2Response> {
  const response = await api.POST("/v2/appAvailabilities", {
    body: createRequest,
  });

  if (response.error) {
    throw new ContextualError(
      "Failed to create app availability",
      response.error
    );
  }

  return response.data;
}

// Get territory availabilities for an app availability
export async function getTerritoryAvailabilities(
  appAvailabilityId: string
): Promise<components["schemas"]["TerritoryAvailability"][]> {
  const config = API_FIELD_CONFIGS.territoryAvailabilities;

  const response = await api.GET(
    "/v2/appAvailabilities/{id}/territoryAvailabilities",
    {
      params: {
        path: { id: appAvailabilityId },
        query: {
          limit: API_LIMITS.DEFAULT_LIMIT_v2,
          include: config.include as any,
          "fields[territoryAvailabilities]":
            config.fieldsTerritoryAvailabilities as any,
        },
      },
    }
  );

  if (response.error) {
    throw new ContextualError(
      "Failed to fetch territory availabilities",
      response.error
    );
  }

  return response.data?.data || [];
}

// Update a territory's availability
export async function updateTerritoryAvailability(
  territoryAvailabilityId: string,
  updateRequest: TerritoryAvailabilityUpdateRequest
): Promise<void> {
  const response = await api.PATCH("/v1/territoryAvailabilities/{id}", {
    params: {
      path: { id: territoryAvailabilityId },
    },
    body: updateRequest,
  });

  if (response.error) {
    throw new ContextualError(
      "Failed to update territory availability",
      response.error
    );
  }
}
