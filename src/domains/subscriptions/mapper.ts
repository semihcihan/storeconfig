import { z } from "zod";
import { logger } from "../../utils/logger";
import {
  SubscriptionSchema,
  SubscriptionGroupSchema,
  PriceSchema,
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
} from "../../models/app-store";
import { TerritoryCodeSchema } from "../../models/territories";
import { LocaleCodeSchema } from "../../models/locales";
import {
  createIncludedByIdMap,
  getIncludedResource,
  type IncludedByIdMap,
} from "../../helpers/relationship-helpers";
import { validateTerritoryCode } from "../../helpers/id-encoding-helpers";
import {
  SUBSCRIPTION_PERIOD_MAPPING,
  DURATION_MAPPING,
} from "../../helpers/constants";
import {
  fetchSubscriptionLocalizations,
  fetchSubscriptionIntroductoryOffers,
  fetchSubscriptionPromotionalOffers,
  fetchSubscriptionAvailability,
  fetchSubscriptionAvailabilityTerritories,
  fetchSubscriptionPrices,
  fetchPromotionalOfferPrices,
} from "./api-client";
import type { components } from "../../generated/app-store-connect-api";
import { ContextualError } from "../../helpers/error-handling-helpers";

type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];
type SubscriptionGroup = components["schemas"]["SubscriptionGroup"];
type Subscription = z.infer<typeof SubscriptionSchema>;
type SubscriptionGroupType = z.infer<typeof SubscriptionGroupSchema>;
type APISubscription = components["schemas"]["Subscription"];
type APISubscriptionGroupLocalization =
  components["schemas"]["SubscriptionGroupLocalization"];
type APIIntroductoryOffer =
  components["schemas"]["SubscriptionIntroductoryOffer"];
type APIPromotionalOffer =
  components["schemas"]["SubscriptionPromotionalOffer"];
type APISubscriptionPricePoint =
  components["schemas"]["SubscriptionPricePoint"];
type APISubscriptionPricesResponse =
  components["schemas"]["SubscriptionPricesResponse"];

// Process subscription price response
export function processSubscriptionPriceResponse(
  response:
    | APISubscriptionPricesResponse
    | components["schemas"]["SubscriptionPromotionalOfferPricesResponse"]
): z.infer<typeof PriceSchema>[] {
  if (!response || !response.included) {
    return [];
  }

  const includedById = createIncludedByIdMap(response.included);

  const prices: z.infer<typeof PriceSchema>[] = [];
  for (const priceData of response.data) {
    const priceRel = priceData.relationships?.subscriptionPricePoint?.data;
    const territoryRel = priceData.relationships?.territory?.data;
    if (priceRel && territoryRel) {
      const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
        includedById,
        priceRel.type,
        priceRel.id
      );
      const territory = getIncludedResource<components["schemas"]["Territory"]>(
        includedById,
        territoryRel.type,
        territoryRel.id
      );

      if (pricePoint && pricePoint.attributes && territory) {
        const territoryCode = validateTerritoryCode(territory.id);
        if (territoryCode && pricePoint.attributes.customerPrice) {
          prices.push({
            price: pricePoint.attributes.customerPrice,
            territory: territoryCode,
          });
        }
      }
    }
  }
  return prices;
}

// Map subscription localizations
export function mapSubscriptionLocalizations(
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

// Parse offer duration
export function parseOfferDuration(
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

  if (duration && DURATION_MAPPING[duration]) {
    return { duration: DURATION_MAPPING[duration] };
  }

  throw new ContextualError(
    `Unknown offer mode and duration: ${offerMode} ${duration} for subscription`,
    undefined,
    {
      offerMode,
      duration,
      attributes,
    }
  );
}

// Map introductory offers
export async function mapIntroductoryOffers(
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<Subscription["introductoryOffers"]> {
  const includedById = createIncludedByIdMap(response.included);

  const groupedOffers: {
    [key: string]: z.infer<typeof IntroductoryOfferSchema>;
  } = {};

  for (const offerData of response.data || []) {
    if (!offerData.attributes || !offerData.relationships) {
      continue;
    }

    const territoryId = offerData.relationships.territory?.data?.id;
    if (!territoryId) {
      logger.warn(
        `No territory ID found for introductory offer, skipping.`,
        offerData
      );
      continue;
    }
    const territoryCode = validateTerritoryCode(territoryId);
    if (!territoryCode) {
      logger.warn(
        `Invalid territory code for introductory offer: ${territoryId}, skipping.`
      );
      continue;
    }

    const offerType = offerData.attributes.offerMode;
    const durationInfo = parseOfferDuration(offerData.attributes);
    const territory = territoryCode;

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
        };
      }
      const offer = groupedOffers[key] as any;
      const pricePointRel =
        offerData.relationships.subscriptionPricePoint?.data;
      if (pricePointRel) {
        const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
          includedById,
          pricePointRel.type,
          pricePointRel.id
        );
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
        };
      }
      const offer = groupedOffers[key] as any;
      const pricePointRel =
        offerData.relationships.subscriptionPricePoint?.data;
      if (pricePointRel) {
        const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
          includedById,
          pricePointRel.type,
          pricePointRel.id
        );
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
      const key = `FREE_TRIAL:${durationInfo.duration}`;
      if (!groupedOffers[key]) {
        groupedOffers[key] = {
          type: "FREE_TRIAL",
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

// Map promotional offers
export async function mapPromotionalOffers(
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
          type: "FREE_TRIAL" as const,
          duration: durationInfo.duration,
        };
      }
      logger.warn(
        `Unknown offer type and duration: ${offerType} ${durationInfo} for subscription`,
        offerData.attributes,
        "in response:",
        response
      );
      return null;
    })
  );

  return offers.filter((o): o is NonNullable<typeof o> => o !== null);
}

// Map subscription availability
export async function mapSubscriptionAvailability(
  response: components["schemas"]["SubscriptionAvailabilityResponse"]
): Promise<
  | {
      availableInNewTerritories: boolean;
      availableTerritories: z.infer<typeof TerritoryCodeSchema>[];
    }
  | undefined
> {
  const availability = response.data;

  if (!availability.id) {
    return undefined;
  }

  const availableInNewTerritories =
    availability.attributes?.availableInNewTerritories || false;

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
      const territoryCode = validateTerritoryCode(rel.id);
      if (!territoryCode) {
        logger.warn(`Invalid territory code from availability: ${rel.id}`);
        return null;
      }
      return territoryCode;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return {
    availableInNewTerritories,
    availableTerritories,
  };
}

// Map single subscription
export async function mapSubscription(
  subRel: { type: string; id: string },
  includedById: IncludedByIdMap
): Promise<Subscription | null> {
  const subData = getIncludedResource<APISubscription>(
    includedById,
    subRel.type,
    subRel.id
  );
  if (!subData) return null;

  const subscriptionPeriod = subData.attributes?.subscriptionPeriod;
  if (!subscriptionPeriod) {
    logger.warn(
      `Subscription ${subData.id} has no subscription period. Skipping.`,
      subData
    );
    return null;
  }

  const mappedPeriod = SUBSCRIPTION_PERIOD_MAPPING[subscriptionPeriod];
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

  const pricesResponse = await fetchSubscriptionPrices(subData.id);
  const prices = processSubscriptionPriceResponse(pricesResponse);

  const reviewNote = subData.attributes?.reviewNote;
  const sub: Subscription = {
    productId: subData.attributes?.productId || "",
    referenceName: subData.attributes?.name || "",
    groupLevel: subData.attributes?.groupLevel || 1,
    familySharable: subData.attributes?.familySharable || false,
    subscriptionPeriod: mappedPeriod,
    localizations: localizations,
    introductoryOffers: introductoryOffers,
    promotionalOffers: promotionalOffers,
    prices: prices,
    availability: availability || {
      availableInNewTerritories: true,
      availableTerritories: [],
    },
    reviewNote: reviewNote === null ? undefined : reviewNote,
  };
  return sub;
}

// Map subscription group
export async function mapSubscriptionGroup(
  group: SubscriptionGroup,
  includedById: IncludedByIdMap
): Promise<SubscriptionGroupType | null> {
  const groupLocalizations = (
    group.relationships?.subscriptionGroupLocalizations?.data?.map((rel) => {
      const locData = getIncludedResource<APISubscriptionGroupLocalization>(
        includedById,
        rel.type,
        rel.id
      );
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

  const result: SubscriptionGroupType = {
    referenceName: group.attributes?.referenceName || "",
    localizations: groupLocalizations,
    subscriptions: subscriptions.filter(
      (s): s is NonNullable<typeof s> => s !== null
    ),
  };
  return result;
}

// Map subscription groups response
export async function mapSubscriptionGroups(
  data: SubscriptionGroupsResponse
): Promise<SubscriptionGroupType[]> {
  const includedById = createIncludedByIdMap(data.included);

  const groups = await Promise.all(
    (data.data || []).map((group) => mapSubscriptionGroup(group, includedById))
  );
  return groups.filter((g): g is NonNullable<typeof g> => g !== null);
}
