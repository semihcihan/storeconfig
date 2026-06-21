import { api } from "../../services/api";
import { API_FIELD_CONFIGS, API_LIMITS } from "../../helpers/constants";
import { ContextualError, isNotFoundError } from "@semihcihan/shared";
import type { components } from "@semihcihan/app-store-connect-api-types";

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
    const is404Error = isNotFoundError(response.error);

    if (is404Error) {
      return null;
    }

    throw new ContextualError("Failed to get app price schedule", {
      appleError: response.error,
    });
  }

  return response.data!;
}

// Find app price points for a given app and territory(ies)
export async function fetchAppPricePoints(
  appId: string,
  territory: string
): Promise<components["schemas"]["AppPricePointsV3Response"]> {
  const response = await api.GET("/v1/apps/{id}/appPricePoints", {
    params: {
      path: { id: appId },
      query: {
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
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
      appleError: response.error,
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
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
        include: config.include as any,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to get manual prices", {
      appleError: response.error,
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
      appleError: response.error,
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
      appleError: response.error,
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
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
        include: config.include as any,
        "fields[appPrices]": config.fieldsAppPrices as any,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to fetch app manual prices", {
      appleError: response.error,
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
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
        include: config.include as any,
        "fields[appPrices]": config.fieldsAppPrices as any,
        "filter[territory]": [territoryId],
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Failed to fetch app automatic prices", {
      appleError: response.error,
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
        appleError: response.error,
      }
    );
  }

  return response.data!;
}

export async function fetchAppPricePointEqualizations(
  pricePointId: string
): Promise<AppPricePointsV3Response> {
  const response = await api.GET("/v3/appPricePoints/{id}/equalizations", {
    params: {
      path: { id: pricePointId },
      query: {
        "fields[appPricePoints]": ["customerPrice", "territory"],
        include: ["territory"],
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
      },
    },
  });

  if (response.error) {
    throw new ContextualError("Apple API error", {
      appleError: response.error,
    });
  }

  return response.data as AppPricePointsV3Response;
}
