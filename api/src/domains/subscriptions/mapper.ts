import { z } from "zod";
import { logger } from "@semihcihan/shared";
import {
  SubscriptionSchema,
  SubscriptionGroupSchema,
  PriceSchema,
  PriceScheduleSchema,
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
  BASE_TERRITORY,
} from "@semihcihan/shared";
import { TerritoryCodeSchema } from "@semihcihan/shared";
import { LocaleCodeSchema } from "@semihcihan/shared";
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
import { getMostRecentActivePrice } from "../../helpers/date-helpers";
import {
  fetchSubscriptionLocalizations,
  fetchSubscriptionIntroductoryOffers,
  fetchSubscriptionPromotionalOffers,
  fetchSubscriptionAvailability,
  fetchSubscriptionAvailabilityTerritories,
  fetchSubscriptionPrices,
  fetchPromotionalOfferPrices,
} from "./api-client";
import { buildSubscriptionPricesWithEqualizations } from "./pricing-service";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { ContextualError, compareNumericValues } from "@semihcihan/shared";

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
type APISubscriptionPromotionalOfferPricesResponse =
  components["schemas"]["SubscriptionPromotionalOfferPricesResponse"];
const APPROVED_LOCALIZATION_STATE = "APPROVED";

async function filterEqualizedPrices<
  T extends { price: string; territory: string },
>(completeResult: T[], baseTerritoryPricePointId: string): Promise<T[]> {
  if (!completeResult || completeResult.length === 0) {
    return completeResult;
  }

  try {
    // Use buildSubscriptionPricesWithEqualizations to find all territories that share the same price point
    const equalizedPrices = await buildSubscriptionPricesWithEqualizations(
      baseTerritoryPricePointId
    );

    // Create a map of territory -> price from equalizedPrices for easy lookup
    const equalizedPricesMap = new Map(
      equalizedPrices.map((price) => [price.territory, price.price])
    );

    // Filter out territories that have the same price as in equalizedPrices
    const filteredResult = completeResult.filter((price) => {
      const equalizedPrice = equalizedPricesMap.get(price.territory as any);
      // Keep the price if it's not in equalizedPrices or if the price is different
      return !compareNumericValues(equalizedPrice, price.price);
    });

    return filteredResult;
  } catch (error) {
    logger.warn(
      "Failed to fetch equalizations for prices, using original prices",
      error
    );
    return completeResult;
  }
}

// Process subscription price response with BASE_TERRITORY optimization
export async function processSubscriptionPriceResponse(
  response:
    | APISubscriptionPricesResponse
    | APISubscriptionPromotionalOfferPricesResponse,
  useEqualizationsToOptimize: boolean = true
): Promise<z.infer<typeof PriceScheduleSchema> | undefined> {
  if (!response?.data || !response?.included) {
    return undefined;
  }

  const territoryPriceMap = buildTerritoryPriceMap(response);

  const completeResult = buildFinalPriceResult(territoryPriceMap);
  let prices = completeResult.map((p) => p.price);

  if (prices.length === 0) {
    return undefined;
  }

  let baseTerritory = BASE_TERRITORY;
  // check if prices has no item with territory that is BASE_TERRITORY
  if (!prices.some((p) => p.territory === BASE_TERRITORY)) {
    baseTerritory = prices[0].territory;
  }
  if (!useEqualizationsToOptimize) {
    return {
      baseTerritory: BASE_TERRITORY,
      prices: prices,
    };
  }

  const baseTerritoryResult = findBaseTerritoryPricePointId(
    completeResult,
    baseTerritory
  );

  try {
    const filteredPrices = await filterEqualizedPrices(
      prices,
      baseTerritoryResult.pricePointId
    );
    return {
      baseTerritory: baseTerritoryResult.baseTerritory as z.infer<
        typeof TerritoryCodeSchema
      >,
      prices: filteredPrices,
    };
  } catch (error) {
    logger.warn(
      "Failed to fetch equalizations for BASE_TERRITORY optimization, falling back to original behavior",
      error
    );
    return {
      baseTerritory: baseTerritoryResult.baseTerritory as z.infer<
        typeof TerritoryCodeSchema
      >,
      prices: prices,
    };
  }
}

const PRICE_ENTRY_SCHEMA = z.object({
  price: z.string(),
  territory: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  pricePointId: z.string(),
});

function buildTerritoryPriceMap(
  response:
    | APISubscriptionPricesResponse
    | APISubscriptionPromotionalOfferPricesResponse
): Map<string, Array<z.infer<typeof PRICE_ENTRY_SCHEMA>>> {
  const territoryPriceMap = new Map<
    string,
    Array<z.infer<typeof PRICE_ENTRY_SCHEMA>>
  >();

  const includedById = createIncludedByIdMap(response.included);

  for (const priceData of response.data) {
    const priceEntry = extractPriceEntry(priceData, includedById);
    if (!priceEntry) continue;

    if (!territoryPriceMap.has(priceEntry.territory)) {
      territoryPriceMap.set(priceEntry.territory, []);
    }
    territoryPriceMap.get(priceEntry.territory)!.push(priceEntry);
  }

  return territoryPriceMap;
}

function extractPriceEntry(
  priceData:
    | components["schemas"]["SubscriptionPrice"]
    | components["schemas"]["SubscriptionPromotionalOfferPrice"],
  includedById: IncludedByIdMap
): z.infer<typeof PRICE_ENTRY_SCHEMA> | null {
  const territory = findTerritory(priceData, includedById);
  if (!territory) return null;

  const pricePoint = findPricePoint(priceData, includedById);
  if (!pricePoint?.attributes?.customerPrice) return null;

  const territoryCode = validateTerritoryCode(territory.id);
  if (!territoryCode) return null;

  // Only SubscriptionPrice has attributes with startDate, not SubscriptionPromotionalOfferPrice
  const startDate =
    priceData.type === "subscriptionPrices"
      ? (priceData as components["schemas"]["SubscriptionPrice"]).attributes
          ?.startDate
      : undefined;
  // SubscriptionPrice doesn't have endDate field
  const endDate = undefined;

  return {
    price: pricePoint.attributes.customerPrice,
    territory: territoryCode,
    startDate,
    endDate,
    pricePointId: pricePoint.id,
  };
}

function findTerritory(
  priceData:
    | components["schemas"]["SubscriptionPrice"]
    | components["schemas"]["SubscriptionPromotionalOfferPrice"],
  includedById: IncludedByIdMap
): components["schemas"]["Territory"] | null {
  const territoryRel = priceData.relationships?.territory?.data;
  if (!territoryRel) return null;

  return (
    getIncludedResource<components["schemas"]["Territory"]>(
      includedById,
      territoryRel.type,
      territoryRel.id
    ) || null
  );
}

function findPricePoint(
  priceData:
    | components["schemas"]["SubscriptionPrice"]
    | components["schemas"]["SubscriptionPromotionalOfferPrice"],
  includedById: IncludedByIdMap
): APISubscriptionPricePoint | null {
  const pricePointRel = priceData.relationships?.subscriptionPricePoint?.data;
  if (!pricePointRel) return null;

  return (
    getIncludedResource<APISubscriptionPricePoint>(
      includedById,
      pricePointRel.type,
      pricePointRel.id
    ) || null
  );
}

function buildFinalPriceResult(
  territoryPriceMap: Map<string, Array<z.infer<typeof PRICE_ENTRY_SCHEMA>>>
): { pricePointId: string; price: z.infer<typeof PriceSchema> }[] {
  const result: {
    pricePointId: string;
    price: z.infer<typeof PriceSchema>;
  }[] = [];

  for (const [territory, prices] of territoryPriceMap) {
    const activePrice = getMostRecentActivePrice(prices);
    if (activePrice) {
      result.push({
        pricePointId: activePrice.pricePointId,
        price: {
          price: activePrice.price,
          territory: activePrice.territory as z.infer<
            typeof PriceSchema
          >["territory"],
        },
      });
    }
  }

  return result;
}

// Helper function to find BASE_TERRITORY price point ID from response
function findBaseTerritoryPricePointId(
  response: {
    pricePointId: string;
    price: z.infer<typeof PriceSchema>;
  }[],
  baseTerritory: string
): { pricePointId: string; baseTerritory: string } {
  const baseTerritoryPrice = response.find(
    (p) => p.price.territory === baseTerritory
  );
  if (baseTerritoryPrice) {
    return {
      pricePointId: baseTerritoryPrice.pricePointId,
      baseTerritory: baseTerritory,
    };
  }
  throw new ContextualError(`Base Territory should be in the response`, {
    response,
    baseTerritory,
  });
}

// Helper function to find price point ID for a specific offer's base territory
function findPricePointIdForOfferBaseTerritory(
  offer: z.infer<typeof IntroductoryOfferSchema>,
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"],
  includedById: IncludedByIdMap
): { pricePointId: string; baseTerritory: string } | null {
  // Only process offers that have pricing
  if (
    !("pricing" in offer) ||
    !offer.pricing ||
    offer.pricing.prices.length === 0
  ) {
    return null;
  }

  const offerBaseTerritory = offer.pricing.baseTerritory;
  const offerBasePrice = offer.pricing.prices.find(
    (p) => p.territory === offerBaseTerritory
  );

  if (!offerBasePrice) {
    return null;
  }

  // Find the price point that matches the offer's base territory and price
  for (const offerData of response.data || []) {
    if (!offerData.relationships) continue;

    const territoryId = offerData.relationships.territory?.data?.id;
    if (territoryId === offerBaseTerritory) {
      const pricePointRel =
        offerData.relationships.subscriptionPricePoint?.data;
      if (pricePointRel) {
        const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
          includedById,
          pricePointRel.type,
          pricePointRel.id
        );
        if (pricePoint?.id) {
          // Verify that this price point matches the offer's price
          // We need to check if the price point's price matches the offer's base price
          const pricePointPrice = pricePoint.attributes?.customerPrice;
          if (pricePointPrice === offerBasePrice.price) {
            return {
              pricePointId: pricePoint.id,
              baseTerritory: offerBaseTerritory,
            };
          }
        }
      }
    }
  }

  return null;
}

// Map subscription localizations
export function mapSubscriptionLocalizations(
  response: components["schemas"]["SubscriptionLocalizationsResponse"]
): Subscription["localizations"] {
  const localizationMap = new Map<
    z.infer<typeof LocaleCodeSchema>,
    {
      locale: z.infer<typeof LocaleCodeSchema>;
      name: string;
      description: string;
      state?: string;
    }
  >();

  (response.data || []).forEach((loc) => {
    const localeParseResult = LocaleCodeSchema.safeParse(loc.attributes?.locale);
    if (!localeParseResult.success) {
      logger.warn(`Invalid locale code: ${loc.attributes?.locale}. Skipping.`);
      return;
    }

    const mappedLocalization = {
      locale: localeParseResult.data,
      name: loc.attributes?.name || "",
      description: loc.attributes?.description || "",
      state: loc.attributes?.state,
    };
    const existing = localizationMap.get(mappedLocalization.locale);
    if (
      !existing ||
      (existing.state === APPROVED_LOCALIZATION_STATE &&
        mappedLocalization.state !== APPROVED_LOCALIZATION_STATE)
    ) {
      localizationMap.set(mappedLocalization.locale, mappedLocalization);
    }
  });

  return Array.from(localizationMap.values()).map(
    ({ locale, name, description }) => ({
      locale,
      name,
      description,
    })
  );
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
    {
      offerMode,
      duration,
      attributes,
    }
  );
}

function processPayAsYouGoOffer(
  offerData: APIIntroductoryOffer,
  territory: string,
  durationInfo: { numberOfPeriods: number },
  includedById: IncludedByIdMap,
  groupedOffers: { [key: string]: z.infer<typeof IntroductoryOfferSchema> }
): void {
  const key = `PAYG:${durationInfo.numberOfPeriods}`;
  if (!groupedOffers[key]) {
    groupedOffers[key] = {
      type: "PAY_AS_YOU_GO",
      numberOfPeriods: durationInfo.numberOfPeriods,
      pricing: {
        baseTerritory: BASE_TERRITORY as z.infer<typeof TerritoryCodeSchema>, // Will be updated later
        prices: [],
      },
      availableTerritories: [],
    };
  }
  const offer = groupedOffers[key] as any;
  if (offer.availableTerritories) {
    offer.availableTerritories.push(territory);
  }

  const pricePointRel = offerData.relationships?.subscriptionPricePoint?.data;
  if (pricePointRel) {
    const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
      includedById,
      pricePointRel.type,
      pricePointRel.id
    );
    if (pricePoint?.attributes?.customerPrice) {
      offer.pricing.prices.push({
        price: pricePoint.attributes.customerPrice,
        territory: territory as z.infer<typeof TerritoryCodeSchema>,
        startDate: offerData.attributes?.startDate,
        endDate: offerData.attributes?.endDate,
      });
    }
  }
}

function processPayUpFrontOffer(
  offerData: APIIntroductoryOffer,
  territory: string,
  durationInfo: { duration: z.infer<typeof SubscriptionOfferDurationSchema> },
  includedById: IncludedByIdMap,
  groupedOffers: { [key: string]: z.infer<typeof IntroductoryOfferSchema> }
): void {
  const key = `PUF:${durationInfo.duration}`;
  if (!groupedOffers[key]) {
    groupedOffers[key] = {
      type: "PAY_UP_FRONT",
      duration: durationInfo.duration,
      pricing: {
        baseTerritory: BASE_TERRITORY as z.infer<typeof TerritoryCodeSchema>, // Will be updated later
        prices: [],
      },
      availableTerritories: [],
    };
  }
  const offer = groupedOffers[key] as any;
  if (offer.availableTerritories) {
    offer.availableTerritories.push(territory);
  }

  const pricePointRel = offerData.relationships?.subscriptionPricePoint?.data;
  if (pricePointRel) {
    const pricePoint = getIncludedResource<APISubscriptionPricePoint>(
      includedById,
      pricePointRel.type,
      pricePointRel.id
    );
    if (pricePoint?.attributes?.customerPrice) {
      offer.pricing.prices.push({
        price: pricePoint.attributes.customerPrice,
        territory: territory as z.infer<typeof TerritoryCodeSchema>,
        startDate: offerData.attributes?.startDate,
        endDate: offerData.attributes?.endDate,
      });
    }
  }
}

function processFreeTrialOffer(
  offerData: APIIntroductoryOffer,
  territory: string,
  durationInfo: { duration: z.infer<typeof SubscriptionOfferDurationSchema> },
  groupedOffers: { [key: string]: z.infer<typeof IntroductoryOfferSchema> }
): void {
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

function processIntroductoryOfferData(
  offerData: APIIntroductoryOffer,
  includedById: IncludedByIdMap,
  groupedOffers: { [key: string]: z.infer<typeof IntroductoryOfferSchema> }
): void {
  if (!offerData.attributes || !offerData.relationships) {
    return;
  }

  const territoryId = offerData.relationships.territory?.data?.id;
  if (!territoryId) {
    logger.warn(
      `No territory ID found for introductory offer, skipping.`,
      offerData
    );
    return;
  }

  const territoryCode = validateTerritoryCode(territoryId);
  if (!territoryCode) {
    logger.warn(
      `Invalid territory code for introductory offer: ${territoryId}, skipping.`
    );
    return;
  }

  const offerType = offerData.attributes.offerMode;
  const durationInfo = parseOfferDuration(offerData.attributes);

  if (
    offerType === "PAY_AS_YOU_GO" &&
    "numberOfPeriods" in durationInfo &&
    durationInfo.numberOfPeriods
  ) {
    processPayAsYouGoOffer(
      offerData,
      territoryCode,
      durationInfo,
      includedById,
      groupedOffers
    );
  } else if (
    offerType === "PAY_UP_FRONT" &&
    "duration" in durationInfo &&
    durationInfo.duration
  ) {
    processPayUpFrontOffer(
      offerData,
      territoryCode,
      durationInfo,
      includedById,
      groupedOffers
    );
  } else if (
    offerType === "FREE_TRIAL" &&
    "duration" in durationInfo &&
    durationInfo.duration
  ) {
    processFreeTrialOffer(
      offerData,
      territoryCode,
      durationInfo,
      groupedOffers
    );
  }
}

function applyMostRecentActivePriceFiltering(groupedOffers: {
  [key: string]: z.infer<typeof IntroductoryOfferSchema>;
}): void {
  for (const offer of Object.values(groupedOffers)) {
    if (
      "pricing" in offer &&
      offer.pricing &&
      offer.pricing.prices.length > 0
    ) {
      const territoryPriceMap = new Map<
        string,
        Array<{
          price: string;
          territory: string;
          startDate?: string;
          endDate?: string;
        }>
      >();

      // Group prices by territory
      for (const price of offer.pricing.prices) {
        if (!territoryPriceMap.has(price.territory)) {
          territoryPriceMap.set(price.territory, []);
        }
        territoryPriceMap.get(price.territory)!.push(price);
      }

      // Apply getMostRecentActivePrice to each territory
      const filteredPrices: Array<{ price: string; territory: string }> = [];
      for (const [territory, prices] of territoryPriceMap) {
        const activePrice = getMostRecentActivePrice(prices);
        if (activePrice) {
          filteredPrices.push({
            price: activePrice.price,
            territory: activePrice.territory as any,
          });
        }
      }

      offer.pricing.prices = filteredPrices as any;
    }
  }
}

async function applyEqualizedPriceFiltering(
  groupedOffers: { [key: string]: z.infer<typeof IntroductoryOfferSchema> },
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"],
  includedById: IncludedByIdMap
): Promise<void> {
  const offers = Object.values(groupedOffers);
  if (
    offers.length === 0 ||
    offers.every((offer) => offer.type === "FREE_TRIAL")
  ) {
    return;
  }

  for (const offer of offers) {
    if (
      "pricing" in offer &&
      offer.pricing &&
      offer.pricing.prices.length > 0
    ) {
      const baseTerritoryResult = findPricePointIdForOfferBaseTerritory(
        offer,
        response,
        includedById
      );

      if (!baseTerritoryResult) {
        logger.warn(
          `No base territory price point ID found for offer with base territory ${offer.pricing.baseTerritory}. Skipping equalized price filtering for this offer.`
        );
        continue;
      }

      offer.pricing.prices = (await filterEqualizedPrices(
        offer.pricing.prices as any,
        baseTerritoryResult.pricePointId
      )) as any;
    }
  }
}

// Fix base territory for offers to use a territory that has a valid price
function fixBaseTerritoryForOffers(groupedOffers: {
  [key: string]: z.infer<typeof IntroductoryOfferSchema>;
}): void {
  for (const offer of Object.values(groupedOffers)) {
    // Only process offers that have prices (PAY_AS_YOU_GO and PAY_UP_FRONT)
    if (
      "pricing" in offer &&
      offer.pricing &&
      offer.pricing.prices.length > 0
    ) {
      // First try to find BASE_TERRITORY price
      const baseTerritoryPrice = offer.pricing.prices.find(
        (p: { territory: string }) => p.territory === BASE_TERRITORY
      );
      if (baseTerritoryPrice) {
        offer.pricing.baseTerritory = BASE_TERRITORY as z.infer<
          typeof TerritoryCodeSchema
        >;
      } else {
        // Fallback: Use the first territory that has a price
        offer.pricing.baseTerritory = offer.pricing.prices[0].territory;
      }
    }
  }
}

// Map introductory offers
export async function mapIntroductoryOffers(
  response: components["schemas"]["SubscriptionIntroductoryOffersResponse"],
  useEqualizationsToOptimize: boolean = true
): Promise<Subscription["introductoryOffers"]> {
  const includedById = createIncludedByIdMap(response.included);

  const groupedOffers: {
    [key: string]: z.infer<typeof IntroductoryOfferSchema>;
  } = {};

  // Process each offer data
  for (const offerData of response.data || []) {
    processIntroductoryOfferData(offerData, includedById, groupedOffers);
  }

  // check if any offers are present
  if (Object.values(groupedOffers).length === 0) {
    logger.debug("No offers found, returning empty array");
    return [];
  }

  // Fix base territory to use a territory that has a valid price
  fixBaseTerritoryForOffers(groupedOffers);

  // Apply most recent active price filtering
  applyMostRecentActivePriceFiltering(groupedOffers);

  if (useEqualizationsToOptimize) {
    // Apply equalized price filtering
    await applyEqualizedPriceFiltering(groupedOffers, response, includedById);
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

      let pricing: z.infer<typeof PriceScheduleSchema> | undefined = undefined;
      if (offerType !== "FREE_TRIAL") {
        const pricesResponse = await fetchPromotionalOfferPrices(offerData.id);
        const priceSchedule =
          await processSubscriptionPriceResponse(pricesResponse);
        if (!priceSchedule) {
          throw new Error(
            `No base territory price point ID found for promotional offer: ${offerData.id}`
          );
        }
        pricing = priceSchedule;
      }

      const baseOffer = {
        id: offerData.id,
        referenceName: offerData.attributes.name || "",
      };

      if (
        offerType === "PAY_AS_YOU_GO" &&
        "numberOfPeriods" in durationInfo &&
        durationInfo.numberOfPeriods &&
        pricing
      ) {
        return {
          ...baseOffer,
          type: "PAY_AS_YOU_GO" as const,
          numberOfPeriods: durationInfo.numberOfPeriods,
          pricing: pricing,
        };
      } else if (
        offerType === "PAY_UP_FRONT" &&
        "duration" in durationInfo &&
        durationInfo.duration &&
        pricing
      ) {
        return {
          ...baseOffer,
          type: "PAY_UP_FRONT" as const,
          duration: durationInfo.duration,
          pricing: pricing,
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

  if (!availability.id || availability.id === "") {
    logger.debug(
      `Subscription availability has no ID, returning undefined (newly created subscription)`
    );
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
    availabilityResponse,
  ] = await Promise.all([
    fetchSubscriptionLocalizations(subData.id),
    fetchSubscriptionIntroductoryOffers(subData.id),
    fetchSubscriptionAvailability(subData.id),
  ]);

  const localizations = mapSubscriptionLocalizations(localizationsResponse);
  const [introductoryOffers, availability, pricesResponse] = await Promise.all([
    mapIntroductoryOffers(introductoryOffersResponse),
    mapSubscriptionAvailability(availabilityResponse),
    fetchSubscriptionPrices(subData.id),
  ]);
  const prices = await processSubscriptionPriceResponse(pricesResponse);

  const reviewNote = subData.attributes?.reviewNote;
  const sub: Subscription = {
    productId: subData.attributes?.productId || "",
    referenceName: subData.attributes?.name || "",
    groupLevel: subData.attributes?.groupLevel || 1,
    familySharable: subData.attributes?.familySharable || false,
    subscriptionPeriod: mappedPeriod,
    localizations: localizations,
    introductoryOffers: introductoryOffers,
    pricing: prices,
    availability: availability,
    reviewNote: reviewNote === null ? undefined : reviewNote,
  };
  return sub;
}

// Map subscription group
export async function mapSubscriptionGroup(
  group: SubscriptionGroup,
  includedById: IncludedByIdMap
): Promise<SubscriptionGroupType | null> {
  const localizationMap = new Map<
    z.infer<typeof LocaleCodeSchema>,
    {
      locale: z.infer<typeof LocaleCodeSchema>;
      name: string;
      customName: string | null;
      state?: string;
    }
  >();

  (group.relationships?.subscriptionGroupLocalizations?.data || []).forEach(
    (rel) => {
      const locData = getIncludedResource<APISubscriptionGroupLocalization>(
        includedById,
        rel.type,
        rel.id
      );
      if (!locData) return;
      const locale = locData.attributes?.locale;
      const localeParseResult = LocaleCodeSchema.safeParse(locale);
      if (!localeParseResult.success) return;

      const mappedLocalization = {
        locale: localeParseResult.data,
        name: locData.attributes?.name || "",
        customName: locData.attributes?.customAppName || null,
        state: locData.attributes?.state,
      };
      const existing = localizationMap.get(mappedLocalization.locale);
      if (
        !existing ||
        (existing.state === APPROVED_LOCALIZATION_STATE &&
          mappedLocalization.state !== APPROVED_LOCALIZATION_STATE)
      ) {
        localizationMap.set(mappedLocalization.locale, mappedLocalization);
      }
    }
  );

  const groupLocalizations = Array.from(localizationMap.values()).map(
    ({ locale, name, customName }) => ({
      locale,
      name,
      customName,
    })
  );

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
