import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { isNotFoundError } from "../../helpers/error-handling-helpers";
import { paginateV2 } from "../../helpers/pagination-helpers";
import { logger } from "../../utils/logger";
import type { components } from "../../generated/app-store-connect-api";

type AppAvailabilityV2Response =
  components["schemas"]["AppAvailabilityV2Response"];

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
      logger.info(
        `App availability not found for app ${appId} (not created yet)`
      );
      return null;
    }
    throw appAvailabilityResponse.error;
  }

  const appAvailabilityId = appAvailabilityResponse.data?.data?.id;
  if (!appAvailabilityId) {
    logger.warn(`No app availability found for app ${appId}`);
    return null;
  }

  // Now fetch all territory availabilities using the v2 endpoint with proper pagination
  const allTerritoryAvailabilities = await paginateV2(
    "/v2/appAvailabilities/{id}/territoryAvailabilities",
    appAvailabilityId,
    {
      "fields[territoryAvailabilities]": API_FIELD_CONFIGS
        .territoryAvailabilities.fieldsTerritoryAvailabilities as any,
    }
  );

  // Combine the results to match the expected structure
  return {
    data: appAvailabilityResponse.data.data,
    included: allTerritoryAvailabilities as any,
    links: appAvailabilityResponse.data.links,
  };
}
