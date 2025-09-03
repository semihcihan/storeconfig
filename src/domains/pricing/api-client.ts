import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { ContextualError } from "../../helpers/error-handling-helpers";
import type { components } from "../../generated/app-store-connect-api";

type AppPriceScheduleResponse =
  components["schemas"]["AppPriceScheduleResponse"];
type AppPricePointsV3Response =
  components["schemas"]["AppPricePointsV3Response"];
type AppPricesV2Response = components["schemas"]["AppPricesV2Response"];
type TerritoryResponse = components["schemas"]["TerritoryResponse"];
type AppPriceScheduleCreateRequest =
  components["schemas"]["AppPriceScheduleCreateRequest"];

// Get app price schedule ID from app ID
export async function getAppPriceSchedule(
  appId: string
): Promise<AppPriceScheduleResponse | null> {
  const response = await api.GET("/v1/apps/{id}/appPriceSchedule", {
    params: { path: { id: appId } },
  });

  if (response.error) {
    // Check if it's a 404 error (no price schedule exists)
    const is404Error = response.error.errors?.some(
      (err: any) => err.status === "404" || err.status === 404
    );

    if (is404Error) {
      return null;
    }

    throw new ContextualError("Failed to get app price schedule", {
      error: response.error,
      appId,
      operation: "getAppPriceSchedule",
    });
  }

  return response.data!;
}

// Find app price points for a given app and territory
export async function fetchAppPricePoints(
  appId: string,
  territory: string
): Promise<components["schemas"]["AppPricePointsV3Response"]> {
  const response = await api.GET("/v1/apps/{id}/appPricePoints", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: ["territory"],
        "fields[appPricePoints]": ["customerPrice", "territory"],
        "fields[territories]": API_FIELD_CONFIGS.territories
          .fieldsTerritories as any,
        "filter[territory]": [territory],
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to get app price points", {
      error: response.error,
      appId,
      territory,
      operation: "fetchAppPricePoints",
    });
  }

  return response.data as components["schemas"]["AppPricePointsV3Response"];
}

// Get current manual prices from the price schedule
export async function fetchCurrentManualPrices(
  priceScheduleId: string
): Promise<AppPricesV2Response> {
  const config = API_FIELD_CONFIGS.appPrices;

  const response = await api.GET("/v1/appPriceSchedules/{id}/manualPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: config.include as any,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to get manual prices", {
      error: response.error,
      priceScheduleId,
      operation: "fetchCurrentManualPrices",
    });
  }

  return response.data;
}

// Get base territory for price schedule
export async function fetchBaseTerritory(
  priceScheduleId: string
): Promise<TerritoryResponse> {
  const response = await api.GET("/v1/appPriceSchedules/{id}/baseTerritory", {
    params: {
      path: { id: priceScheduleId },
      query: {
        "fields[territories]": API_FIELD_CONFIGS.territories
          .fieldsTerritories as any,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to get base territory", {
      error: response.error,
      priceScheduleId,
      operation: "fetchBaseTerritory",
    });
  }

  return response.data!;
}

// Create a new app price schedule
export async function createAppPriceSchedule(
  createRequest: AppPriceScheduleCreateRequest
): Promise<AppPriceScheduleResponse> {
  const response = await api.POST("/v1/appPriceSchedules", {
    body: createRequest,
  });

  if (response.error) {
    throw new ContextualError("Failed to create app price schedule", {
      error: response.error,
      createRequest,
      operation: "createAppPriceSchedule",
    });
  }

  return response.data!;
}

// Fetch app manual prices
export async function fetchAppManualPrices(
  priceScheduleId: string
): Promise<AppPricesV2Response> {
  const config = API_FIELD_CONFIGS.appPrices;

  const response = await api.GET("/v1/appPriceSchedules/{id}/manualPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: config.include as any,
        "fields[appPrices]": config.fieldsAppPrices as any,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to fetch app manual prices", {
      error: response.error,
      priceScheduleId,
      operation: "fetchAppManualPrices",
    });
  }

  return response.data!;
}

// Fetch app automatic prices
export async function fetchAppAutomaticPrices(
  priceScheduleId: string,
  territoryId: string
): Promise<AppPricesV2Response> {
  const config = API_FIELD_CONFIGS.appPrices;

  const response = await api.GET("/v1/appPriceSchedules/{id}/automaticPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: config.include as any,
        "fields[appPrices]": config.fieldsAppPrices as any,
        "filter[territory]": [territoryId],
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to fetch app automatic prices", {
      error: response.error,
      priceScheduleId,
      territoryId,
      operation: "fetchAppAutomaticPrices",
    });
  }

  return response.data!;
}

// Fetch app price schedule base territory
export async function fetchAppPriceScheduleBaseTerritory(
  priceScheduleId: string
): Promise<TerritoryResponse> {
  const response = await api.GET("/v1/appPriceSchedules/{id}/baseTerritory", {
    params: { path: { id: priceScheduleId } },
  });

  if (response.error) {
    throw new ContextualError(
      "Failed to fetch app price schedule base territory",
      {
        error: response.error,
        priceScheduleId,
        operation: "fetchAppPriceScheduleBaseTerritory",
      }
    );
  }

  return response.data!;
}
