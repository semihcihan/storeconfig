import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import {
  AppStoreModelSchema,
  InAppPurchaseSchema,
  SubscriptionGroupSchema,
  SubscriptionSchema,
  PriceSchema,
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
  SubscriptionPeriodSchema,
  PriceScheduleSchema,
  AvailabilitySchema,
} from "../models/app-store";
import { z } from "zod";
import { api } from "../services/api";
import type { components } from "../generated/app-store-connect-api";
import { TerritoryCodeSchema } from "../models/territories";
import { LocaleCodeSchema } from "../models/locales";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type InAppPurchase = z.infer<typeof InAppPurchaseSchema>;
type SubscriptionGroup = z.infer<typeof SubscriptionGroupSchema>;
type Subscription = z.infer<typeof SubscriptionSchema>;

type InAppPurchasesV2Response =
  components["schemas"]["InAppPurchasesV2Response"];
type InAppPurchaseLocalization =
  components["schemas"]["InAppPurchaseLocalization"];
type APISubscription = components["schemas"]["Subscription"];
type APISubscriptionGroupLocalization =
  components["schemas"]["SubscriptionGroupLocalization"];
type APIIntroductoryOffer =
  components["schemas"]["SubscriptionIntroductoryOffer"];
type APIPromotionalOffer =
  components["schemas"]["SubscriptionPromotionalOffer"];
type APISubscriptionAvailability =
  components["schemas"]["SubscriptionAvailability"];
type InAppPurchaseAvailability =
  components["schemas"]["InAppPurchaseAvailability"];
type APISubscriptionPricesResponse =
  components["schemas"]["SubscriptionPricesResponse"];
type APISubscriptionPricePoint =
  components["schemas"]["SubscriptionPricePoint"];
type InAppPurchaseV2 = components["schemas"]["InAppPurchaseV2"];

type IncludedResource =
  | InAppPurchaseLocalization
  | APISubscription
  | APISubscriptionGroupLocalization
  | APIIntroductoryOffer
  | APIPromotionalOffer
  | InAppPurchaseAvailability
  | APISubscriptionPricePoint
  | components["schemas"]["Territory"]
  | components["schemas"]["InAppPurchasePricePoint"]
  | components["schemas"]["SubscriptionPrice"]
  | components["schemas"]["SubscriptionPromotionalOfferPrice"];

type IncludedByIdMap = { [key: string]: IncludedResource };

function createIncludedByIdMap(
  included: IncludedResource[] | undefined
): IncludedByIdMap {
  if (!included) {
    return {};
  }
  return included.reduce((map: IncludedByIdMap, item: IncludedResource) => {
    map[`${item.type}-${item.id}`] = item;
    return map;
  }, {});
}

async function fetchInAppPurchases(appId: string) {
  const include: (
    | "inAppPurchaseLocalizations"
    | "iapPriceSchedule"
    | "inAppPurchaseAvailability"
  )[] = [
    "inAppPurchaseLocalizations",
    "iapPriceSchedule",
    "inAppPurchaseAvailability",
  ];

  const fieldsInAppPurchaseLocalizations: (
    | "name"
    | "description"
    | "locale"
  )[] = ["name", "description", "locale"];

  const response = await api.GET("/v1/apps/{id}/inAppPurchasesV2", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: include,
        "fields[inAppPurchaseLocalizations]": fieldsInAppPurchaseLocalizations,
        "fields[inAppPurchaseAvailabilities]": [
          "availableInNewTerritories",
          "availableTerritories",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchInAppPurchaseAvailabilityTerritories(
  availabilityId: string
) {
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

async function fetchSubscriptionAvailabilityTerritories(
  availabilityId: string
) {
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

async function fetchSubscriptionAvailability(subscriptionId: string) {
  const response = await api.GET(
    "/v1/subscriptions/{id}/subscriptionAvailability",
    {
      params: {
        path: { id: subscriptionId },
      },
    }
  );
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionLocalizations(subscriptionId: string) {
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

async function fetchSubscriptionIntroductoryOffers(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/introductoryOffers", {
    params: {
      path: { id: subscriptionId },
      query: { limit: 200, include: ["territory", "subscriptionPricePoint"] },
    },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionPromotionalOffers(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/promotionalOffers", {
    params: { path: { id: subscriptionId }, query: { limit: 200 } },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchPromotionalOfferPrices(offerId: string) {
  const response = await api.GET(
    "/v1/subscriptionPromotionalOffers/{id}/prices",
    {
      params: {
        path: { id: offerId },
        query: {
          limit: 200,
          include: ["territory", "subscriptionPricePoint"],
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchSubscriptionPrices(subscriptionId: string) {
  const response = await api.GET("/v1/subscriptions/{id}/prices", {
    params: {
      path: { id: subscriptionId },
      query: {
        limit: 200,
        include: ["territory", "subscriptionPricePoint"],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchManualPrices(priceScheduleId: string) {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/manualPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 200,
          include: ["territory", "inAppPurchasePricePoint"],
          "fields[inAppPurchasePrices]": ["startDate", "territory"],
        },
      },
    }
  );

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAutomaticPrices(
  priceScheduleId: string,
  territoryId: string
) {
  const response = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}/automaticPrices",
    {
      params: {
        path: { id: priceScheduleId },
        query: {
          limit: 1,
          include: ["territory", "inAppPurchasePricePoint"],
          "fields[inAppPurchasePrices]": ["startDate", "territory"],
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

async function fetchSubscriptionGroups(appId: string) {
  const response = await api.GET("/v1/apps/{id}/subscriptionGroups", {
    params: {
      path: { id: appId },
      query: {
        limit: 200,
        include: ["subscriptions", "subscriptionGroupLocalizations"],
        "fields[subscriptions]": [
          "name",
          "productId",
          "subscriptionPeriod",
          "familySharable",
          "subscriptionLocalizations",
          "promotionalOffers",
          "introductoryOffers",
          "groupLevel",
          "reviewNote",
        ],
        "fields[subscriptionGroupLocalizations]": [
          "name",
          "customAppName",
          "locale",
        ],
        "fields[subscriptionGroups]": [
          "referenceName",
          "subscriptions",
          "subscriptionGroupLocalizations",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

function processSubscriptionPriceResponse(
  response:
    | APISubscriptionPricesResponse
    | components["schemas"]["SubscriptionPromotionalOfferPricesResponse"]
): z.infer<typeof PriceSchema>[] {
  if (!response || !response.included) {
    return [];
  }

  const includedById = createIncludedByIdMap(
    response.included as IncludedResource[]
  );

  const prices: z.infer<typeof PriceSchema>[] = [];
  for (const priceData of response.data) {
    const priceRel = priceData.relationships?.subscriptionPricePoint?.data;
    const territoryRel = priceData.relationships?.territory?.data;
    if (priceRel && territoryRel) {
      const pricePoint = includedById[
        `${priceRel.type}-${priceRel.id}`
      ] as APISubscriptionPricePoint;
      const territory = includedById[
        `${territoryRel.type}-${territoryRel.id}`
      ] as components["schemas"]["Territory"];

      if (pricePoint && pricePoint.attributes && territory) {
        const territoryParseResult = TerritoryCodeSchema.safeParse(
          territory.id
        );
        if (
          territoryParseResult.success &&
          pricePoint.attributes.customerPrice
        ) {
          prices.push({
            price: pricePoint.attributes.customerPrice,
            territory: territoryParseResult.data,
          });
        }
      }
    }
  }
  return prices;
}

function processPriceResponse(
  response: components["schemas"]["InAppPurchasePricesResponse"]
): z.infer<typeof PriceSchema>[] {
  if (!response || !response.included) {
    return [];
  }

  return (response.included as any[])
    .filter(
      (item): item is components["schemas"]["InAppPurchasePricePoint"] =>
        item.type === "inAppPurchasePricePoints"
    )
    .map((pricePoint) => {
      let territoryId: string | null = null;
      try {
        const decodedId = Buffer.from(pricePoint.id, "base64").toString(
          "utf-8"
        );
        const idParts = JSON.parse(decodedId);
        territoryId = idParts.t;
      } catch (e) {
        logger.warn(`Could not decode price point ID: ${pricePoint.id}`);
        return null;
      }

      if (!territoryId) return null;

      const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
      if (!territoryParseResult.success) {
        logger.warn(
          `Invalid territory code from price point ID: ${territoryId}`
        );
        return null;
      }

      return {
        price: pricePoint.attributes?.customerPrice || "",
        territory: territoryParseResult.data,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

function mapLocalizations(
  localizationRels:
    | { id: string; type: "inAppPurchaseLocalizations" }[]
    | undefined,
  includedById: IncludedByIdMap
): {
  locale: z.infer<typeof LocaleCodeSchema>;
  name: string;
  description: string;
}[] {
  if (!localizationRels) {
    return [];
  }
  return (
    localizationRels
      .map((rel) => {
        const locData = includedById[
          `${rel.type}-${rel.id}`
        ] as InAppPurchaseLocalization;
        if (!locData) {
          logger.warn(
            `  Could not find included data for localization ${rel.id}`
          );
          return null;
        }
        const locale = locData.attributes?.locale;
        const localeParseResult = LocaleCodeSchema.safeParse(locale);
        if (!localeParseResult.success) {
          logger.warn(`Invalid locale code: ${locale}. Skipping.`);
          return null;
        }
        return {
          locale: localeParseResult.data,
          name: locData.attributes?.name || "",
          description: locData.attributes?.description || "",
        };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null) || []
  );
}

async function fetchBaseTerritory(priceScheduleId: string) {
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

async function fetchAndMapIAPPrices(
  priceScheduleRel:
    | { id: string; type: "inAppPurchasePriceSchedules" }
    | undefined,
  includedById: IncludedByIdMap
): Promise<InAppPurchase["priceSchedule"]> {
  let prices: z.infer<typeof PriceSchema>[] = [];
  let baseTerritory: z.infer<typeof TerritoryCodeSchema> = "USA";

  if (priceScheduleRel) {
    const baseTerritoryResponse = await fetchBaseTerritory(priceScheduleRel.id);
    if (baseTerritoryResponse.data) {
      const territoryParseResult = TerritoryCodeSchema.safeParse(
        baseTerritoryResponse.data.id
      );
      if (territoryParseResult.success) {
        baseTerritory = territoryParseResult.data;
      }
    }

    const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
      fetchManualPrices(priceScheduleRel.id),
      fetchAutomaticPrices(priceScheduleRel.id, baseTerritory),
    ]);

    const manualPrices = processPriceResponse(manualPricesResponse);
    const automaticPrices = processPriceResponse(automaticPricesResponse);

    prices = [...manualPrices, ...automaticPrices];
  }

  return { baseTerritory, prices };
}

async function fetchAndMapSubscriptionPrices(
  subscription: APISubscription
): Promise<z.infer<typeof PriceSchema>[]> {
  if (!subscription.id) {
    logger.warn(`Subscription has no ID. Cannot fetch prices.`);
    return [];
  }
  const pricesResponse = await fetchSubscriptionPrices(subscription.id);
  return processSubscriptionPriceResponse(pricesResponse);
}

async function mapInAppPurchaseAvailability(
  availabilityRel:
    | { id: string; type: "inAppPurchaseAvailabilities" }
    | undefined,
  includedById: IncludedByIdMap
): Promise<{
  availableInNewTerritories: boolean;
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
}> {
  if (!availabilityRel) {
    return {
      availableInNewTerritories: true,
      availableTerritories: [],
    };
  }
  const availability = includedById[
    `${availabilityRel.type}-${availabilityRel.id}`
  ] as InAppPurchaseAvailability;

  if (!availability) {
    return {
      availableInNewTerritories: true,
      availableTerritories: [],
    };
  }

  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

  const territoriesResponse = await fetchInAppPurchaseAvailabilityTerritories(
    availability.id
  );
  const territoryRels = territoriesResponse.data;

  if (!territoryRels) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const availableTerritories = territoryRels
    .map((rel) => {
      const territoryParseResult = TerritoryCodeSchema.safeParse(rel.id);
      if (!territoryParseResult.success) {
        logger.warn(`Invalid territory code from availability: ${rel.id}`);
        return null;
      }
      return territoryParseResult.data;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

async function mapSubscriptionAvailability(
  response: components["schemas"]["SubscriptionAvailabilityResponse"]
): Promise<{
  availableInNewTerritories: boolean;
  availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
}> {
  const availability = response.data;
  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

  if (!availability.id) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const territoriesResponse = await fetchSubscriptionAvailabilityTerritories(
    availability.id
  );
  const territoryRels = territoriesResponse.data;

  if (!territoryRels) {
    return {
      availableInNewTerritories,
      availableTerritories: [],
    };
  }

  const availableTerritories = territoryRels
    .map((rel) => {
      const territoryParseResult = TerritoryCodeSchema.safeParse(rel.id);
      if (!territoryParseResult.success) {
        logger.warn(`Invalid territory code from availability: ${rel.id}`);
        return null;
      }
      return territoryParseResult.data;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

async function mapInAppPurchase(
  iap: InAppPurchaseV2,
  includedById: IncludedByIdMap
): Promise<InAppPurchase | null> {
  const localizations = mapLocalizations(
    iap.relationships?.inAppPurchaseLocalizations?.data,
    includedById
  );

  const priceSchedule = await fetchAndMapIAPPrices(
    iap.relationships?.iapPriceSchedule?.data,
    includedById
  );

  const availability = await mapInAppPurchaseAvailability(
    iap.relationships?.inAppPurchaseAvailability?.data,
    includedById
  );

  const reviewNote = iap.attributes?.reviewNote;
  return {
    productId: iap.attributes?.productId || "",
    type: iap.attributes?.inAppPurchaseType as
      | "CONSUMABLE"
      | "NON_CONSUMABLE"
      | "NON_RENEWING_SUBSCRIPTION",
    referenceName: iap.attributes?.name || "",
    familySharable: iap.attributes?.familySharable || false,
    reviewNote: reviewNote === null ? undefined : reviewNote,
    localizations: localizations,
    priceSchedule: priceSchedule,
    availability: availability,
  };
}

async function mapInAppPurchases(
  data: InAppPurchasesV2Response
): Promise<InAppPurchase[]> {
  const includedById = createIncludedByIdMap(
    data.included as IncludedResource[]
  );

  const iaps = await Promise.all(
    (data.data || []).map((iap) => mapInAppPurchase(iap, includedById))
  );

  return iaps.filter((iap): iap is NonNullable<typeof iap> => iap !== null);
}

function mapSubscriptionLocalizations(
  response: components["schemas"]["SubscriptionLocalizationsResponse"]
): Subscription["localizations"] {
  return (response.data || []).map((loc) => {
    const localeParseResult = LocaleCodeSchema.safeParse(
      loc.attributes?.locale
    );
    return {
      locale: localeParseResult.success ? localeParseResult.data : "en-US",
      name: loc.attributes?.name || "",
      description: loc.attributes?.description || "",
    };
  });
}

async function mapIntroductoryOffers(
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<Subscription["introductoryOffers"]> {
  const includedById = createIncludedByIdMap(
    response.included as IncludedResource[]
  );

  const groupedOffers: {
    [key: string]: z.infer<typeof IntroductoryOfferSchema>;
  } = {};

  for (const offerData of response.data || []) {
    if (!offerData.attributes || !offerData.relationships) {
      continue;
    }

    const territoryId = offerData.relationships.territory?.data?.id;
    const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
    if (!territoryParseResult.success) {
      logger.warn(
        `Invalid territory code for introductory offer: ${territoryId}`
      );
      continue;
    }

    const offerType = offerData.attributes.offerMode;
    const durationInfo = parseOfferDuration(offerData.attributes);
    const territory = territoryParseResult.data;

    if (
      offerType === "PAY_AS_YOU_GO" &&
      "numberOfPeriods" in durationInfo &&
      durationInfo.numberOfPeriods
    ) {
      const key = `PAYG:${durationInfo.numberOfPeriods}`;
      if (!groupedOffers[key]) {
        groupedOffers[key] = {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: durationInfo.numberOfPeriods,
          prices: [],
          availableTerritories: [],
        };
      }
      const offer = groupedOffers[key] as any;
      if (offer.availableTerritories) {
        offer.availableTerritories.push(territory);
      }
      const pricePointRel =
        offerData.relationships.subscriptionPricePoint?.data;
      if (pricePointRel) {
        const pricePoint = includedById[
          `${pricePointRel.type}-${pricePointRel.id}`
        ] as APISubscriptionPricePoint;
        if (pricePoint?.attributes?.customerPrice) {
          offer.prices.push({
            price: pricePoint.attributes.customerPrice,
            territory: territory,
          });
        }
      }
    } else if (
      offerType === "PAY_UP_FRONT" &&
      "duration" in durationInfo &&
      durationInfo.duration
    ) {
      const key = `PUF:${durationInfo.duration}`;
      if (!groupedOffers[key]) {
        groupedOffers[key] = {
          type: "PAY_UP_FRONT",
          duration: durationInfo.duration,
          prices: [],
          availableTerritories: [],
        };
      }
      const offer = groupedOffers[key] as any;
      if (offer.availableTerritories) {
        offer.availableTerritories.push(territory);
      }
      const pricePointRel =
        offerData.relationships.subscriptionPricePoint?.data;
      if (pricePointRel) {
        const pricePoint = includedById[
          `${pricePointRel.type}-${pricePointRel.id}`
        ] as APISubscriptionPricePoint;
        if (pricePoint?.attributes?.customerPrice) {
          offer.prices.push({
            price: pricePoint.attributes.customerPrice,
            territory: territory,
          });
        }
      }
    } else if (
      offerType === "FREE_TRIAL" &&
      "duration" in durationInfo &&
      durationInfo.duration
    ) {
      const key = `FREE:${durationInfo.duration}`;
      if (!groupedOffers[key]) {
        groupedOffers[key] = {
          type: "FREE",
          duration: durationInfo.duration,
          availableTerritories: [],
        };
      }
      const offer = groupedOffers[key] as any;
      if (offer.availableTerritories) {
        offer.availableTerritories.push(territory);
      }
    }
  }

  return Object.values(groupedOffers);
}

async function mapPromotionalOffers(
  response: components["schemas"]["SubscriptionPromotionalOffersResponse"]
): Promise<Subscription["promotionalOffers"]> {
  if (!response.data) {
    return [];
  }

  const offers = await Promise.all(
    response.data.map(async (offerData) => {
      if (!offerData?.attributes || !offerData.id) return null;

      const offerType = offerData.attributes.offerMode;
      const durationInfo = parseOfferDuration(offerData.attributes);

      let prices: z.infer<typeof PriceSchema>[] = [];
      if (offerType !== "FREE_TRIAL") {
        const pricesResponse = await fetchPromotionalOfferPrices(offerData.id);
        prices = processSubscriptionPriceResponse(pricesResponse);
      }

      const baseOffer = {
        id: offerData.id,
        referenceName: offerData.attributes.name || "",
      };

      if (
        offerType === "PAY_AS_YOU_GO" &&
        "numberOfPeriods" in durationInfo &&
        durationInfo.numberOfPeriods
      ) {
        return {
          ...baseOffer,
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: durationInfo.numberOfPeriods,
          prices: prices,
        };
      } else if (
        offerType === "PAY_UP_FRONT" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          ...baseOffer,
          type: "PAY_UP_FRONT" as const,
          duration: durationInfo.duration,
          prices: prices,
        };
      } else if (
        offerType === "FREE_TRIAL" &&
        "duration" in durationInfo &&
        durationInfo.duration
      ) {
        return {
          ...baseOffer,
          type: "FREE" as const,
          duration: durationInfo.duration,
        };
      }
      return null;
    })
  );

  return offers.filter((o): o is NonNullable<typeof o> => o !== null);
}

async function mapSubscription(
  subRel: { type: string; id: string },
  includedById: IncludedByIdMap
): Promise<Subscription | null> {
  const subData = includedById[
    `${subRel.type}-${subRel.id}`
  ] as APISubscription;
  if (!subData) return null;

  const subscriptionPeriod = subData.attributes?.subscriptionPeriod;
  if (!subscriptionPeriod) {
    logger.warn(
      `Subscription ${subData.id} has no subscription period. Skipping.`
    );
    return null;
  }

  const periodMapping: {
    [key: string]: z.infer<typeof SubscriptionPeriodSchema>;
  } = {
    P1W: "ONE_WEEK",
    P1M: "ONE_MONTH",
    P2M: "TWO_MONTHS",
    P3M: "THREE_MONTHS",
    P6M: "SIX_MONTHS",
    P1Y: "ONE_YEAR",
    ONE_WEEK: "ONE_WEEK",
    ONE_MONTH: "ONE_MONTH",
    TWO_MONTHS: "TWO_MONTHS",
    THREE_MONTHS: "THREE_MONTHS",
    SIX_MONTHS: "SIX_MONTHS",
    ONE_YEAR: "ONE_YEAR",
  };

  const mappedPeriod = periodMapping[subscriptionPeriod];
  if (!mappedPeriod) {
    logger.warn(
      `Unknown subscription period: ${subscriptionPeriod}. Skipping.`
    );
    return null;
  }

  const [
    localizationsResponse,
    introductoryOffersResponse,
    promotionalOffersResponse,
    availabilityResponse,
  ] = await Promise.all([
    fetchSubscriptionLocalizations(subData.id),
    fetchSubscriptionIntroductoryOffers(subData.id),
    fetchSubscriptionPromotionalOffers(subData.id),
    fetchSubscriptionAvailability(subData.id),
  ]);

  const localizations = mapSubscriptionLocalizations(localizationsResponse);
  const introductoryOffers = await mapIntroductoryOffers(
    introductoryOffersResponse
  );
  const promotionalOffers = await mapPromotionalOffers(
    promotionalOffersResponse
  );
  const availability = await mapSubscriptionAvailability(availabilityResponse);

  const prices = await fetchAndMapSubscriptionPrices(subData);

  const reviewNote = (subData.attributes as any)?.reviewNote;
  const sub: Subscription = {
    productId: subData.attributes?.productId || "",
    referenceName: subData.attributes?.name || "",
    groupLevel: subData.attributes?.groupLevel || 0,
    familySharable: subData.attributes?.familySharable || false,
    subscriptionPeriod: mappedPeriod,
    localizations: localizations,
    introductoryOffers: introductoryOffers,
    promotionalOffers: promotionalOffers,
    prices: prices,
    availability: availability,
    reviewNote: reviewNote === null ? undefined : reviewNote,
  };
  return sub;
}

async function mapSubscriptionGroup(
  group: components["schemas"]["SubscriptionGroup"],
  includedById: IncludedByIdMap
): Promise<SubscriptionGroup | null> {
  const groupLocalizations = (
    group.relationships?.subscriptionGroupLocalizations?.data?.map((rel) => {
      const locData = includedById[
        `${rel.type}-${rel.id}`
      ] as APISubscriptionGroupLocalization;
      if (!locData) return null;
      const locale = locData.attributes?.locale;
      const localeParseResult = LocaleCodeSchema.safeParse(locale);
      if (!localeParseResult.success) return null;
      return {
        locale: localeParseResult.data,
        name: locData.attributes?.name || "",
        customName: locData.attributes?.customAppName || null,
      };
    }) || []
  ).filter((l): l is NonNullable<typeof l> => l !== null);

  const subscriptions = await Promise.all(
    (group.relationships?.subscriptions?.data || []).map((rel) =>
      mapSubscription(rel, includedById)
    )
  );

  const result: SubscriptionGroup = {
    referenceName: group.attributes?.referenceName || "",
    localizations: groupLocalizations,
    subscriptions: subscriptions.filter(
      (s): s is NonNullable<typeof s> => s !== null
    ),
  };
  return result;
}

async function mapSubscriptionGroups(
  data: components["schemas"]["SubscriptionGroupsResponse"]
): Promise<SubscriptionGroup[]> {
  const includedById = createIncludedByIdMap(
    data.included as IncludedResource[]
  );

  const groups = await Promise.all(
    (data.data || []).map((group) => mapSubscriptionGroup(group, includedById))
  );
  return groups.filter((g): g is NonNullable<typeof g> => g !== null);
}

function parseOfferDuration(
  attributes:
    | APIIntroductoryOffer["attributes"]
    | APIPromotionalOffer["attributes"]
):
  | { duration: z.infer<typeof SubscriptionOfferDurationSchema> }
  | { numberOfPeriods: number }
  | {} {
  if (!attributes) return {};

  const { duration, numberOfPeriods, offerMode } = attributes;

  if (offerMode === "PAY_AS_YOU_GO" && numberOfPeriods && numberOfPeriods > 0) {
    return { numberOfPeriods: numberOfPeriods };
  }

  if (duration) {
    const durationMapping: {
      [key: string]: z.infer<typeof SubscriptionOfferDurationSchema>;
    } = {
      P3D: "THREE_DAYS",
      P7D: "ONE_WEEK",
      P14D: "TWO_WEEKS",
      P1M: "ONE_MONTH",
      P2M: "TWO_MONTHS",
      P3M: "THREE_MONTHS",
      P6M: "SIX_MONTHS",
      P1Y: "ONE_YEAR",
      THREE_DAYS: "THREE_DAYS",
      ONE_WEEK: "ONE_WEEK",
      TWO_WEEKS: "TWO_WEEKS",
      ONE_MONTH: "ONE_MONTH",
      TWO_MONTHS: "TWO_MONTHS",
      THREE_MONTHS: "THREE_MONTHS",
      SIX_MONTHS: "SIX_MONTHS",
      ONE_YEAR: "ONE_YEAR",
    };
    if (durationMapping[duration]) {
      return { duration: durationMapping[duration] };
    }
  }

  return {};
}

async function fetchAppAvailability(appId: string) {
  const response = await api.GET("/v1/apps/{id}/appAvailabilityV2", {
    params: {
      path: { id: appId },
      query: {
        include: ["territoryAvailabilities"],
        "fields[appAvailabilities]": [
          "availableInNewTerritories",
          "territoryAvailabilities",
        ],
        "fields[territoryAvailabilities]": ["available", "territory"],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAppManualPrices(priceScheduleId: string) {
  const response = await api.GET("/v1/appPriceSchedules/{id}/manualPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: ["territory", "appPricePoint"],
        "fields[appPrices]": ["startDate", "endDate", "manual", "territory"],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAppAutomaticPrices(
  priceScheduleId: string,
  territoryId: string
) {
  const response = await api.GET("/v1/appPriceSchedules/{id}/automaticPrices", {
    params: {
      path: { id: priceScheduleId },
      query: {
        limit: 200,
        include: ["territory", "appPricePoint"],
        "fields[appPrices]": ["startDate", "endDate", "manual", "territory"],
        "filter[territory]": [territoryId],
      },
    },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

async function fetchAppPriceScheduleBaseTerritory(priceScheduleId: string) {
  const response = await api.GET("/v1/appPriceSchedules/{id}/baseTerritory", {
    params: { path: { id: priceScheduleId } },
  });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

function processAppPriceResponse(
  response: components["schemas"]["AppPricesV2Response"]
): z.infer<typeof PriceSchema>[] {
  if (!response || !response.included) {
    return [];
  }

  return (response.included as any[])
    .filter(
      (item): item is components["schemas"]["AppPricePointV3"] =>
        item.type === "appPricePoints"
    )
    .map((pricePoint) => {
      let territoryId: string | null = null;
      try {
        const decodedId = Buffer.from(pricePoint.id, "base64").toString(
          "utf-8"
        );
        const idParts = JSON.parse(decodedId);
        territoryId = idParts.t;
      } catch (e) {
        logger.warn(`Could not decode app price point ID: ${pricePoint.id}`);
        return null;
      }

      if (!territoryId) return null;

      const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
      if (!territoryParseResult.success) {
        logger.warn(
          `Invalid territory code from app price point ID: ${territoryId}`
        );
        return null;
      }

      return {
        price: pricePoint.attributes?.customerPrice || "",
        territory: territoryParseResult.data,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

async function mapAppPricing(
  appId: string
): Promise<z.infer<typeof PriceScheduleSchema> | undefined> {
  try {
    let baseTerritory: z.infer<typeof TerritoryCodeSchema> = "USA";
    let prices: z.infer<typeof PriceSchema>[] = [];

    const baseTerritoryResponse = await fetchAppPriceScheduleBaseTerritory(
      appId
    );
    if (baseTerritoryResponse.data) {
      const territoryParseResult = TerritoryCodeSchema.safeParse(
        baseTerritoryResponse.data.id
      );
      if (territoryParseResult.success) {
        baseTerritory = territoryParseResult.data;
      }
    }

    const [manualPricesResponse, automaticPricesResponse] = await Promise.all([
      fetchAppManualPrices(appId),
      fetchAppAutomaticPrices(appId, baseTerritory),
    ]);

    const manualPrices = processAppPriceResponse(manualPricesResponse);
    const automaticPrices = processAppPriceResponse(automaticPricesResponse);

    prices = [...manualPrices, ...automaticPrices];

    // If there are no prices, check if there's actually a price schedule
    if (prices.length === 0) {
      const scheduleResponse = await api.GET("/v1/apps/{id}/appPriceSchedule", {
        params: { path: { id: appId } },
      });
      if (scheduleResponse.error || !scheduleResponse.data) {
        // No price schedule exists - this is normal for new apps
        return undefined;
      }
    }

    return { baseTerritory, prices };
  } catch (error) {
    logger.error(
      `Failed to process app pricing: ${
        (error as any)?.message || JSON.stringify(error)
      }`
    );
    throw error;
  }
}

async function mapAppAvailability(
  response: components["schemas"]["AppAvailabilityV2Response"] | null
): Promise<z.infer<typeof TerritoryCodeSchema>[]> {
  if (!response || !response.data) {
    return [];
  }

  const territoryAvailabilities = response.included || [];
  const availableTerritories = territoryAvailabilities
    .filter(
      (item): item is components["schemas"]["TerritoryAvailability"] =>
        item.type === "territoryAvailabilities" &&
        item.attributes?.available === true
    )
    .map((territoryAvail) => {
      const territoryId = territoryAvail.relationships?.territory?.data?.id;
      if (!territoryId) return null;

      const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
      if (!territoryParseResult.success) {
        logger.warn(`Invalid territory code from availability: ${territoryId}`);
        return null;
      }
      return territoryParseResult.data;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return availableTerritories;
}

async function fetchAppWithDetails(appId: string) {
  const response = await api.GET("/v1/apps/{id}", {
    params: {
      path: { id: appId },
      query: {
        include: ["inAppPurchasesV2", "subscriptionGroups"],
        "fields[apps]": [
          "name",
          "bundleId",
          "sku",
          "primaryLocale",
          "inAppPurchasesV2",
          "subscriptionGroups",
          "appAvailabilityV2",
          "appPriceSchedule",
        ],
      },
    },
  });

  if (response.error) {
    throw response.error;
  }
  return response.data;
}

function hasResource(
  appResponse: components["schemas"]["AppResponse"],
  resourceType: string
): boolean {
  return (
    appResponse.included?.some((resource) => resource.type === resourceType) ||
    false
  );
}

function hasRelationship(
  appResponse: components["schemas"]["AppResponse"],
  relationshipName: string
): boolean {
  const relationships = appResponse.data.relationships;
  if (!relationships) return false;

  const relationship = (relationships as any)[relationshipName];
  if (!relationship) return false;

  // Check if the relationship has data (either array with items or single object)
  if (Array.isArray(relationship.data)) {
    return relationship.data.length > 0;
  }

  return !!relationship.data;
}

export async function fetchAppStoreState(
  appId: string
): Promise<AppStoreModel> {
  // First, fetch the app with its basic details and relationships
  const appResponse = await fetchAppWithDetails(appId);

  logger.info(
    `App details fetched: ${appResponse.data.attributes?.name || "Unknown"}`
  );

  // Check what resources are available based on the app response
  const hasInAppPurchases = hasResource(appResponse, "inAppPurchasesV2");
  const hasSubscriptionGroups = hasResource(appResponse, "subscriptionGroups");
  const hasAppAvailability = hasRelationship(appResponse, "appAvailabilityV2");
  const hasAppPriceSchedule = hasRelationship(appResponse, "appPriceSchedule");

  logger.info(
    `Available resources: IAPs=${hasInAppPurchases}, Subscriptions=${hasSubscriptionGroups}, Availability=${hasAppAvailability}, PriceSchedule=${hasAppPriceSchedule}`
  );

  // Only fetch resources that actually exist
  const fetchPromises: Promise<any>[] = [];

  const inAppPurchasesPromise = hasInAppPurchases
    ? fetchInAppPurchases(appId).catch((error) => {
        logger.warn(
          `Failed to fetch in-app purchases: ${
            error?.message || JSON.stringify(error)
          }`
        );
        return { data: [], included: [], links: { self: "" } };
      })
    : Promise.resolve({ data: [], included: [], links: { self: "" } });

  const subscriptionGroupsPromise = hasSubscriptionGroups
    ? fetchSubscriptionGroups(appId).catch((error) => {
        logger.warn(
          `Failed to fetch subscription groups: ${
            error?.message || JSON.stringify(error)
          }`
        );
        return { data: [], included: [], links: { self: "" } };
      })
    : Promise.resolve({ data: [], included: [], links: { self: "" } });

  const appAvailabilityPromise = hasAppAvailability
    ? fetchAppAvailability(appId).catch((error) => {
        logger.warn(
          `Failed to fetch app availability: ${
            error?.message || JSON.stringify(error)
          }`
        );
        return null;
      })
    : Promise.resolve(null);

  const [inAppPurchasesData, subscriptionGroupsData, appAvailabilityData] =
    await Promise.all([
      inAppPurchasesPromise,
      subscriptionGroupsPromise,
      appAvailabilityPromise,
    ]);

  const appPricingPromise = hasAppPriceSchedule
    ? mapAppPricing(appId).catch((error) => {
        logger.warn(
          `Failed to fetch app pricing: ${
            error?.message || JSON.stringify(error)
          }`
        );
        return undefined;
      })
    : Promise.resolve(undefined);

  const [
    mappedIAPs,
    mappedSubscriptionGroups,
    mappedPricing,
    mappedAvailableTerritories,
  ] = await Promise.all([
    mapInAppPurchases(inAppPurchasesData),
    mapSubscriptionGroups(subscriptionGroupsData),
    appPricingPromise,
    mapAppAvailability(appAvailabilityData),
  ]);

  const result: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: appId,
    pricing: mappedPricing,
    availableTerritories: mappedAvailableTerritories,
    inAppPurchases: mappedIAPs,
    subscriptionGroups: mappedSubscriptionGroups,
  };

  const parsedData = AppStoreModelSchema.parse(result);
  return parsedData;
}
