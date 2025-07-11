import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { throwFormattedError } from "../../helpers/error-handling-helpers";
import { paginateV2 } from "../../helpers/pagination-helpers";
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

// Create new app availability
export async function createAppAvailability(
  createRequest: AppAvailabilityV2CreateRequest
): Promise<AppAvailabilityV2Response> {
  const response = await api.POST("/v2/appAvailabilities", {
    body: createRequest,
  });

  if (response.error) {
    throwFormattedError("Failed to create app availability", response.error);
  }

  return response.data;
}

// Get territory availabilities for an app availability
export async function getTerritoryAvailabilities(
  appAvailabilityId: string
): Promise<any[]> {
  const config = API_FIELD_CONFIGS.territoryAvailabilities;

  return await paginateV2(
    "/v2/appAvailabilities/{id}/territoryAvailabilities",
    appAvailabilityId,
    {
      "fields[territoryAvailabilities]":
        config.fieldsTerritoryAvailabilities as any,
    },
    50 // Use smaller limit for territory availabilities
  );
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
    throwFormattedError(
      "Failed to update territory availability",
      response.error
    );
  }
}
