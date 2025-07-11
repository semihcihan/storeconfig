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

// Fetch in-app purchases for an app
export async function fetchInAppPurchases(
  appId: string
): Promise<InAppPurchasesV2Response> {
  const config = API_FIELD_CONFIGS.inAppPurchases;

  const response = await api.GET("/v1/apps/{id}/inAppPurchasesV2", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: config.include as any,
        "fields[inAppPurchaseLocalizations]":
          config.fieldsInAppPurchaseLocalizations as any,
        "fields[inAppPurchaseAvailabilities]":
          config.fieldsInAppPurchaseAvailabilities as any,
      },
    },
  });

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.info(
        `In-app purchases not found for app ${appId} (not created yet)`
      );
      return { data: [], included: [], links: { self: "" } };
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
