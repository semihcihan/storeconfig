import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { isNotFoundError } from "../../helpers/error-handling-helpers";
import { logger } from "../../utils/logger";
import type { components } from "../../generated/app-store-connect-api";

type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchasePricesResponse =
  components["schemas"]["InAppPurchasePricesResponse"];
type TerritoryResponse = components["schemas"]["TerritoryResponse"];
type TerritoriesResponse = components["schemas"]["TerritoriesResponse"];
type InAppPurchaseV2CreateRequest =
  components["schemas"]["InAppPurchaseV2CreateRequest"];
type InAppPurchaseV2UpdateRequest =
  components["schemas"]["InAppPurchaseV2UpdateRequest"];
type InAppPurchaseV2Response = components["schemas"]["InAppPurchaseV2Response"];

type InAppPurchaseLocalizationCreateRequest =
  components["schemas"]["InAppPurchaseLocalizationCreateRequest"];
type InAppPurchaseLocalizationUpdateRequest =
  components["schemas"]["InAppPurchaseLocalizationUpdateRequest"];
type InAppPurchaseLocalizationResponse =
  components["schemas"]["InAppPurchaseLocalizationResponse"];

// Fetch in-app purchases for an app
export async function fetchInAppPurchases(
  appId: string
): Promise<InAppPurchasesV2Response> {
  const config = API_FIELD_CONFIGS.inAppPurchases;

  const queryParams = {
    limit: 200,
    include: ["inAppPurchaseLocalizations", "iapPriceSchedule"],
    "fields[inAppPurchaseLocalizations]":
      config.fieldsInAppPurchaseLocalizations as any,
  };

  logger.debug(
    `Fetching IAPs for app ${appId} with URL: /v1/apps/${appId}/inAppPurchasesV2`
  );
  logger.debug(`Query parameters: ${JSON.stringify(queryParams, null, 2)}`);

  const response = await api.GET("/v1/apps/{id}/inAppPurchasesV2", {
    params: {
      path: { id: appId },
      query: queryParams as any,
    },
  });

  if (response.error) {
    logger.error(
      "Error fetching IAPs:",
      JSON.stringify(response.error, null, 2)
    );
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.debug(
        `In-app purchases not found for app ${appId} (not created yet)`
      );
      return { data: [], included: [], links: { self: "" } };
    }
    throw response.error;
  }

  logger.debug(
    `Successfully fetched ${
      response.data.data?.length || 0
    } IAPs for app ${appId}`
  );
  if (response.data.data && response.data.data.length > 0) {
    response.data.data.forEach((iap) => {
      logger.debug(
        `  IAP: ${iap.attributes?.productId} (${iap.attributes?.name}) - State: ${iap.attributes?.state}`
      );
    });
  }

  return response.data;
}

// Fetch availability for an in-app purchase
export async function fetchInAppPurchaseAvailability(
  iapId: string
): Promise<components["schemas"]["InAppPurchaseAvailabilityResponse"]> {
  const response = await api.GET(
    "/v2/inAppPurchases/{id}/inAppPurchaseAvailability",
    {
      params: { path: { id: iapId } },
    }
  );

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.debug(
        `No availability found for IAP ${iapId} (likely MISSING_METADATA state)`
      );
      throw response.error;
    }
    throw response.error;
  }

  return response.data;
}

// Fetch availability territories for an in-app purchase
export async function fetchInAppPurchaseAvailabilityTerritories(
  availabilityId: string
): Promise<TerritoriesResponse> {
  const response = await api.GET(
    "/v1/inAppPurchaseAvailabilities/{id}/availableTerritories",
    {
      params: { path: { id: availabilityId }, query: { limit: 200 } },
    }
  );

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.warn(`No territories found for availability ${availabilityId}`);
      throw response.error;
    }
    throw response.error;
  }

  return response.data;
}

// Fetch base territory for a price schedule
export async function fetchBaseTerritory(
  priceScheduleId: string
): Promise<TerritoryResponse> {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/baseTerritory",
    {
      params: { path: { id: priceScheduleId } },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch manual prices for a price schedule
export async function fetchManualPrices(
  priceScheduleId: string
): Promise<InAppPurchasePricesResponse> {
  const config = API_FIELD_CONFIGS.manualPrices;

  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/manualPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 200,
          include: config.include as any,
          "fields[inAppPurchasePrices]":
            config.fieldsInAppPurchasePrices as any,
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch automatic prices for a price schedule
export async function fetchAutomaticPrices(
  priceScheduleId: string,
  territoryId: string
): Promise<InAppPurchasePricesResponse> {
  const config = API_FIELD_CONFIGS.automaticPrices;

  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/automaticPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 1,
          include: config.include as any,
          "fields[inAppPurchasePrices]":
            config.fieldsInAppPurchasePrices as any,
          "filter[territory]": [territoryId],
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create a new in-app purchase
export async function createInAppPurchase(
  request: InAppPurchaseV2CreateRequest
): Promise<InAppPurchaseV2Response> {
  const response = await api.POST("/v2/inAppPurchases", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update an existing in-app purchase
export async function updateInAppPurchase(
  iapId: string,
  request: InAppPurchaseV2UpdateRequest
): Promise<InAppPurchaseV2Response> {
  const response = await api.PATCH("/v2/inAppPurchases/{id}", {
    params: {
      path: { id: iapId },
    },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create a new IAP localization
export async function createInAppPurchaseLocalization(
  request: InAppPurchaseLocalizationCreateRequest
): Promise<InAppPurchaseLocalizationResponse> {
  const response = await api.POST("/v1/inAppPurchaseLocalizations", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update an existing IAP localization
export async function updateInAppPurchaseLocalization(
  localizationId: string,
  request: InAppPurchaseLocalizationUpdateRequest
): Promise<InAppPurchaseLocalizationResponse> {
  const response = await api.PATCH("/v1/inAppPurchaseLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Delete an IAP localization
export async function deleteInAppPurchaseLocalization(
  localizationId: string
): Promise<void> {
  const response = await api.DELETE("/v1/inAppPurchaseLocalizations/{id}", {
    params: {
      path: { id: localizationId },
    },
  });

  if (response.error) {
    throw response.error;
  }
}

// Get IAP availability for a specific IAP
export async function getIAPAvailability(
  iapId: string
): Promise<components["schemas"]["InAppPurchaseAvailabilityResponse"] | null> {
  const response = await api.GET(
    "/v2/inAppPurchases/{id}/inAppPurchaseAvailability",
    {
      params: {
        path: { id: iapId },
        query: {
          include: ["availableTerritories"],
          "fields[inAppPurchaseAvailabilities]": [
            "availableInNewTerritories",
            "availableTerritories",
          ],
        },
      },
    }
  );

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.debug(
        `No IAP availability found for IAP ${iapId} (likely MISSING_METADATA state)`
      );
      return null;
    }
    throw response.error;
  }

  return response.data;
}

// Create IAP availability
export async function createIAPAvailability(
  request: components["schemas"]["InAppPurchaseAvailabilityCreateRequest"]
): Promise<components["schemas"]["InAppPurchaseAvailabilityResponse"]> {
  const response = await api.POST("/v1/inAppPurchaseAvailabilities", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Get IAP price schedule ID from IAP ID
export async function getIAPPriceScheduleId(
  iapId: string
): Promise<string | null> {
  const response = await api.GET("/v2/inAppPurchases/{id}/iapPriceSchedule", {
    params: { path: { id: iapId } },
  });

  if (response.error) {
    const is404Error = response.error.errors?.some(
      (err: any) => err.status === "404" || err.status === 404
    );
    if (is404Error) {
      return null;
    }
    throw response.error;
  }

  return response.data.data?.id || null;
}

// Find IAP price point ID for a given price and territory
export async function findIAPPricePointId(
  price: string,
  territory: string,
  iapId: string
): Promise<string> {
  const response = await api.GET("/v2/inAppPurchases/{id}/pricePoints", {
    params: {
      path: { id: iapId },
      query: {
        limit: 200,
        include: ["territory"],
        "filter[territory]": [territory],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  let pricePoints: any[] = [];
  if (
    response.data &&
    typeof response.data === "object" &&
    Array.isArray((response.data as any).data)
  ) {
    pricePoints = (response.data as any).data;
  }

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

// Create IAP price schedule
export async function createIAPPriceSchedule(
  request: components["schemas"]["InAppPurchasePriceScheduleCreateRequest"]
): Promise<components["schemas"]["InAppPurchasePriceScheduleResponse"]> {
  const response = await api.POST("/v1/inAppPurchasePriceSchedules", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}
