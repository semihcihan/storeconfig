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

  logger.info(
    `Fetching IAPs for app ${appId} with URL: /v1/apps/${appId}/inAppPurchasesV2`
  );
  logger.info(`Query parameters: ${JSON.stringify(queryParams, null, 2)}`);

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
      logger.info(
        `In-app purchases not found for app ${appId} (not created yet)`
      );
      return { data: [], included: [], links: { self: "" } };
    }
    throw response.error;
  }

  logger.info(
    `Successfully fetched ${
      response.data.data?.length || 0
    } IAPs for app ${appId}`
  );
  if (response.data.data && response.data.data.length > 0) {
    response.data.data.forEach((iap) => {
      logger.info(
        `  IAP: ${iap.attributes?.productId} (${iap.attributes?.name}) - State: ${iap.attributes?.state}`
      );
    });
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
