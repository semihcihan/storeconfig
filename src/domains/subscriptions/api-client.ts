import { api } from "../../services/api";
import { API_FIELD_CONFIGS } from "../../helpers/constants";
import { isNotFoundError } from "../../helpers/error-handling-helpers";
import { logger } from "../../utils/logger";
import type { components } from "../../generated/app-store-connect-api";

type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];
type SubscriptionLocalizationsResponse =
  components["schemas"]["SubscriptionLocalizationsResponse"];
type SubscriptionIntroductoryOffersResponse =
  components["schemas"]["SubscriptionIntroductoryOffersResponse"];
type SubscriptionPromotionalOffersResponse =
  components["schemas"]["SubscriptionPromotionalOffersResponse"];
type SubscriptionAvailabilityResponse =
  components["schemas"]["SubscriptionAvailabilityResponse"];
type SubscriptionPricesResponse =
  components["schemas"]["SubscriptionPricesResponse"];
type SubscriptionPromotionalOfferPricesResponse =
  components["schemas"]["SubscriptionPromotionalOfferPricesResponse"];
type TerritoriesResponse = components["schemas"]["TerritoriesResponse"];

// Fetch subscription groups for an app
export async function fetchSubscriptionGroups(
  appId: string
): Promise<SubscriptionGroupsResponse> {
  const config = API_FIELD_CONFIGS.subscriptionGroups;

  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: config.include as any,
        "fields[subscriptions]": config.fieldsSubscriptions as any,
        "fields[subscriptionGroupLocalizations]":
          config.fieldsSubscriptionGroupLocalizations as any,
        "fields[subscriptionGroups]": config.fieldsSubscriptionGroups as any,
      },
    },
  });

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.info(
        `Subscription groups not found for app ${appId} (not created yet)`
      );
      return { data: [], included: [], links: { self: "" } };
    }
    throw response.error;
  }

  return response.data;
}

// Fetch subscription localizations
export async function fetchSubscriptionLocalizations(
  subscriptionId: string
): Promise<SubscriptionLocalizationsResponse> {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionLocalizations",
    {
      params: { path: { id: subscriptionId }, query: { limit: 200 } },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch subscription introductory offers
export async function fetchSubscriptionIntroductoryOffers(
  subscriptionId: string
): Promise<SubscriptionIntroductoryOffersResponse> {
  const config = API_FIELD_CONFIGS.subscriptionOffers;

  const response = await api.GET("/v1/subscriptions/{id}/introductoryOffers", {
    params: {
      path: { id: subscriptionId },
      query: {
        limit: 200,
        include: config.include as any,
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch subscription promotional offers
export async function fetchSubscriptionPromotionalOffers(
  subscriptionId: string
): Promise<SubscriptionPromotionalOffersResponse> {
  const response = await api.GET("/v1/subscriptions/{id}/promotionalOffers", {
    params: { path: { id: subscriptionId }, query: { limit: 200 } },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch subscription availability
export async function fetchSubscriptionAvailability(
  subscriptionId: string
): Promise<SubscriptionAvailabilityResponse> {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionAvailability",
    {
      params: {
        path: { id: subscriptionId },
      },
    }
  );

  if (response.error) {
    const is404Error = isNotFoundError(response.error);
    if (is404Error) {
      logger.info(
        `Subscription availability not found for subscription ${subscriptionId} (not created yet)`
      );
      return {
        data: {
          type: "subscriptionAvailabilities",
          id: "",
          attributes: { availableInNewTerritories: false },
          relationships: { availableTerritories: { data: [] } },
        },
        included: [],
        links: { self: "" },
      };
    }
    throw response.error;
  }

  return response.data;
}

// Fetch subscription availability territories
export async function fetchSubscriptionAvailabilityTerritories(
  availabilityId: string
): Promise<TerritoriesResponse> {
  const response = await api.GET(
    "/v1/subscriptionAvailabilities/{id}/availableTerritories",
    {
      params: { path: { id: availabilityId }, query: { limit: 200 } },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch subscription prices
export async function fetchSubscriptionPrices(
  subscriptionId: string
): Promise<SubscriptionPricesResponse> {
  const config = API_FIELD_CONFIGS.subscriptionPrices;

  const response = await api.GET("/v1/subscriptions/{id}/prices", {
    params: {
      path: { id: subscriptionId },
      query: {
        limit: 200,
        include: config.include as any,
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch promotional offer prices
export async function fetchPromotionalOfferPrices(
  offerId: string
): Promise<SubscriptionPromotionalOfferPricesResponse> {
  const config = API_FIELD_CONFIGS.subscriptionPrices;

  const response = await api.GET(
    "/v1/subscriptionPromotionalOffers/{id}/prices",
    {
      params: {
        path: { id: offerId },
        query: {
          limit: 200,
          include: config.include as any,
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}
