import { api } from "../../services/api";
import { API_FIELD_CONFIGS, API_LIMITS } from "../../helpers/constants";
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
type SubscriptionPricePointsResponse =
  components["schemas"]["SubscriptionPricePointsResponse"];

// Fetch subscription groups for an app
export async function fetchSubscriptionGroups(
  appId: string
): Promise<SubscriptionGroupsResponse> {
  const config = API_FIELD_CONFIGS.subscriptionGroups;

  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: {
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
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
      logger.debug(
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
      params: {
        path: { id: subscriptionId },
        query: { limit: API_LIMITS.DEFAULT_LIMIT_v1 },
      },
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
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
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
    params: {
      path: { id: subscriptionId },
      query: { limit: API_LIMITS.DEFAULT_LIMIT_v1 },
    },
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
      logger.debug(
        `Subscription availability not found for subscription ${subscriptionId} (not created yet)`
      );
      return {
        data: {
          type: "subscriptionAvailabilities",
          id: "",
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
      params: {
        path: { id: availabilityId },
        query: { limit: API_LIMITS.DEFAULT_LIMIT_v1 },
      },
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
        limit: API_LIMITS.DEFAULT_LIMIT_v1,
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
  const includeConfig = API_FIELD_CONFIGS.subscriptionPrices;
  const fieldConfig = API_FIELD_CONFIGS.subscriptionOfferPrices;

  const response = await api.GET(
    "/v1/subscriptionPromotionalOffers/{id}/prices",
    {
      params: {
        path: { id: offerId },
        query: {
          limit: API_LIMITS.DEFAULT_LIMIT_v1,
          include: includeConfig.include as any,
          "fields[subscriptionPromotionalOfferPrices]":
            fieldConfig.include as any,
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create subscription group
export async function createSubscriptionGroup(
  request: components["schemas"]["SubscriptionGroupCreateRequest"]
): Promise<components["schemas"]["SubscriptionGroupResponse"]> {
  const response = await api.POST("/v1/subscriptionGroups", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update subscription group
export async function updateSubscriptionGroup(
  groupId: string,
  request: components["schemas"]["SubscriptionGroupUpdateRequest"]
): Promise<components["schemas"]["SubscriptionGroupResponse"]> {
  const response = await api.PATCH("/v1/subscriptionGroups/{id}", {
    params: { path: { id: groupId } },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create subscription group localization
export async function createSubscriptionGroupLocalization(
  request: components["schemas"]["SubscriptionGroupLocalizationCreateRequest"]
): Promise<components["schemas"]["SubscriptionGroupLocalizationResponse"]> {
  const response = await api.POST("/v1/subscriptionGroupLocalizations", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update subscription group localization
export async function updateSubscriptionGroupLocalization(
  localizationId: string,
  request: components["schemas"]["SubscriptionGroupLocalizationUpdateRequest"]
): Promise<components["schemas"]["SubscriptionGroupLocalizationResponse"]> {
  const response = await api.PATCH("/v1/subscriptionGroupLocalizations/{id}", {
    params: { path: { id: localizationId } },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Delete subscription group localization
export async function deleteSubscriptionGroupLocalization(
  localizationId: string
): Promise<void> {
  const response = await api.DELETE("/v1/subscriptionGroupLocalizations/{id}", {
    params: { path: { id: localizationId } },
  });

  if (response.error) {
    throw response.error;
  }
}

// Create subscription
export async function createSubscription(
  request: components["schemas"]["SubscriptionCreateRequest"]
): Promise<components["schemas"]["SubscriptionResponse"]> {
  const response = await api.POST("/v1/subscriptions", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update subscription
export async function updateSubscription(
  subscriptionId: string,
  request: components["schemas"]["SubscriptionUpdateRequest"]
): Promise<components["schemas"]["SubscriptionResponse"]> {
  const response = await api.PATCH("/v1/subscriptions/{id}", {
    params: { path: { id: subscriptionId } },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create subscription localization
export async function createSubscriptionLocalization(
  request: components["schemas"]["SubscriptionLocalizationCreateRequest"]
): Promise<components["schemas"]["SubscriptionLocalizationResponse"]> {
  const response = await api.POST("/v1/subscriptionLocalizations", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Update subscription localization
export async function updateSubscriptionLocalization(
  localizationId: string,
  request: components["schemas"]["SubscriptionLocalizationUpdateRequest"]
): Promise<components["schemas"]["SubscriptionLocalizationResponse"]> {
  const response = await api.PATCH("/v1/subscriptionLocalizations/{id}", {
    params: { path: { id: localizationId } },
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Delete subscription localization
export async function deleteSubscriptionLocalization(
  localizationId: string
): Promise<void> {
  const response = await api.DELETE("/v1/subscriptionLocalizations/{id}", {
    params: { path: { id: localizationId } },
  });

  if (response.error) {
    throw response.error;
  }
}

// Get subscription availability for a specific subscription
export async function getSubscriptionAvailability(
  subscriptionId: string
): Promise<components["schemas"]["SubscriptionAvailabilityResponse"] | null> {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionAvailability",
    {
      params: {
        path: { id: subscriptionId },
        query: {
          include: ["availableTerritories"],
          "fields[subscriptionAvailabilities]": [
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
        `No subscription availability found for subscription ${subscriptionId} (likely MISSING_METADATA state)`
      );
      return null;
    }
    throw response.error;
  }

  return response.data;
}

// Create subscription availability
export async function createSubscriptionAvailability(
  request: components["schemas"]["SubscriptionAvailabilityCreateRequest"]
): Promise<components["schemas"]["SubscriptionAvailabilityResponse"]> {
  const response = await api.POST("/v1/subscriptionAvailabilities", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Fetch all subscription price points (no pagination needed)
export async function fetchAllSubscriptionPricePoints(
  subscriptionId: string,
  territory?: string
): Promise<SubscriptionPricePointsResponse> {
  const queryParams: any = {
    limit: API_LIMITS.DEFAULT_LIMIT_v2,
    include: ["territory"],
    "fields[subscriptionPricePoints]": ["customerPrice", "territory"],
    "fields[territories]": API_FIELD_CONFIGS.territories
      .fieldsTerritories as any,
  };

  if (territory) {
    queryParams["filter[territory]"] = [territory];
  }

  const response = await api.GET("/v1/subscriptions/{id}/pricePoints", {
    params: {
      path: { id: subscriptionId },
      query: queryParams,
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data as SubscriptionPricePointsResponse;
}

// Create subscription price
export async function createSubscriptionPrice(
  request: components["schemas"]["SubscriptionPriceCreateRequest"]
): Promise<components["schemas"]["SubscriptionPriceResponse"]> {
  const response = await api.POST("/v1/subscriptionPrices", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Create subscription introductory offer
export async function createSubscriptionIntroductoryOffer(
  request: components["schemas"]["SubscriptionIntroductoryOfferCreateRequest"]
): Promise<components["schemas"]["SubscriptionIntroductoryOfferResponse"]> {
  const response = await api.POST("/v1/subscriptionIntroductoryOffers", {
    body: request,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// Delete subscription introductory offer
export async function deleteSubscriptionIntroductoryOffer(
  offerId: string
): Promise<void> {
  const response = await api.DELETE("/v1/subscriptionIntroductoryOffers/{id}", {
    params: { path: { id: offerId } },
  });

  if (response.error) {
    throw response.error;
  }
}

// Delete a subscription
export async function deleteSubscription(
  subscriptionId: string
): Promise<void> {
  const response = await api.DELETE("/v1/subscriptions/{id}", {
    params: { path: { id: subscriptionId } },
  });

  if (response.error) {
    throw response.error;
  }
}

// Delete a subscription group
export async function deleteSubscriptionGroup(groupId: string): Promise<void> {
  const response = await api.DELETE("/v1/subscriptionGroups/{id}", {
    params: { path: { id: groupId } },
  });

  if (response.error) {
    throw response.error;
  }
}

// Fetch subscription price point equalizations
export async function fetchSubscriptionPricePointEqualizations(
  pricePointId: string
): Promise<SubscriptionPricePointsResponse> {
  const response = await api.GET(
    "/v1/subscriptionPricePoints/{id}/equalizations",
    {
      params: {
        path: { id: pricePointId },
        query: {
          "fields[subscriptionPricePoints]": ["customerPrice", "territory"],
          include: ["territory"],
          limit: API_LIMITS.DEFAULT_LIMIT_v2,
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }

  return response.data as SubscriptionPricePointsResponse;
}
