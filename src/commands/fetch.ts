import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";
import { api } from "../services/api";
import { getAuthToken } from "../services/auth";
import axios, { AxiosResponse } from "axios";
import {
  ApiError,
  PagedDocumentLinks,
} from "../generated/app-store-connect-api";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

async function fetchAllWithNext<
  T extends { data: any[]; links: PagedDocumentLinks; included?: any[] }
>(firstPageFetcher: () => Promise<T>) {
  let allData: any[] = [];
  let allIncluded: any[] = [];
  let response = await firstPageFetcher();

  allData = allData.concat(response.data);
  if (response.included) {
    allIncluded = allIncluded.concat(response.included);
  }

  let nextUrl = response.links?.next;

  while (nextUrl) {
    const token = getAuthToken();
    const nextResponse: AxiosResponse<any> = await axios.get(nextUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    allData = allData.concat(nextResponse.data.data);
    if (nextResponse.data.included) {
      allIncluded = allIncluded.concat(nextResponse.data.included);
    }
    nextUrl = nextResponse.data.links?.next;
  }

  return allData.map((item) => ({
    ...item,
    ...resolveRelationships(item, allIncluded),
  }));
}

function resolveRelationships(item: any, included: any[]) {
  const relationships: Record<string, any> = {};
  if (!item.relationships) {
    return relationships;
  }
  for (const key in item.relationships) {
    const relation = item.relationships[key];
    if (relation.data) {
      relationships[key] = Array.isArray(relation.data)
        ? relation.data
            .map((d: any) =>
              included.find((i) => i.type === d.type && i.id === d.id)
            )
            .filter(Boolean)
        : included.find(
            (i) => i.type === relation.data.type && i.id === relation.data.id
          );
    }
  }
  return relationships;
}

async function enrichIapWithPriceSchedule(iap: any) {
  if (!iap.relationships?.iapPriceSchedule?.data?.id) return;
  const scheduleId = iap.relationships.iapPriceSchedule.data.id;
  const scheduleRes =
    await api.inAppPurchasePriceSchedules.inAppPurchasePriceSchedulesGetInstance(
      scheduleId,
      undefined, // fieldsInAppPurchasePriceSchedules
      undefined, // fieldsTerritories
      undefined, // fieldsInAppPurchasePrices
      ["baseTerritory", "manualPrices"] // include
    );

  const scheduleData = scheduleRes.data;
  const scheduleIncluded = scheduleRes.included;

  const resolvedRelationships = resolveRelationships(
    scheduleData,
    scheduleIncluded || []
  );

  iap.iapPriceSchedule = { ...scheduleData, ...resolvedRelationships };

  if (iap.iapPriceSchedule?.relationships?.manualPrices?.links?.related) {
    const pricesUrl =
      iap.iapPriceSchedule.relationships.manualPrices.links.related;
    const prices = await fetchAllWithNext(async () => {
      const token = getAuthToken();
      const response = await axios.get(pricesUrl, {
        headers: { Authorization: `Bearer ${token}` },
        params: { include: "inAppPurchasePricePoint,territory" },
      });
      return response.data;
    });
    if (iap.iapPriceSchedule) {
      iap.iapPriceSchedule.prices = prices;
    }
  }
}

async function fetchInAppPurchases(appId: string) {
  const iaps = await fetchAllWithNext(() =>
    api.apps.appsInAppPurchasesV2GetToManyRelated(
      appId,
      undefined, // filterProductId
      undefined, // filterName
      undefined, // filterState
      ["NON_CONSUMABLE", "CONSUMABLE", "NON_RENEWING_SUBSCRIPTION"], // filterInAppPurchaseType
      undefined, // sort
      [
        "name",
        "productId",
        "inAppPurchaseType",
        "state",
        "familySharable",
        "reviewNote",
      ], // fieldsInAppPurchases
      undefined, // fieldsInAppPurchaseLocalizations
      undefined, // fieldsInAppPurchaseContents
      undefined, // fieldsInAppPurchaseAppStoreReviewScreenshots
      undefined, // fieldsPromotedPurchases
      undefined, // fieldsInAppPurchasePriceSchedules
      undefined, // fieldsInAppPurchaseAvailabilities
      undefined, // fieldsInAppPurchaseImages
      undefined, // limit
      [
        "inAppPurchaseLocalizations",
        "iapPriceSchedule",
        "inAppPurchaseAvailability",
      ], // include
      undefined, // limitInAppPurchaseLocalizations
      undefined // limitImages
    )
  );

  for (const iap of iaps) {
    await enrichIapWithPriceSchedule(iap);
  }

  return iaps;
}

async function enrichSubscriptionWithDetails(sub: any) {
  // Fetch localizations
  sub.subscriptionLocalizations = await fetchAllWithNext(() =>
    api.subscriptions.subscriptionsSubscriptionLocalizationsGetToManyRelated(
      sub.id,
      undefined, // fieldsSubscriptionLocalizations
      [], // include
      undefined // limit
    )
  );

  // Fetch prices
  sub.prices = await fetchAllWithNext(() =>
    api.subscriptions.subscriptionsPricesGetToManyRelated(
      sub.id,
      undefined, // fieldsSubscriptionPrices
      undefined, // fieldsTerritories
      ["subscriptionPricePoint", "territory"], // include
      undefined, // filter[subscriptionPricePoint]
      undefined, // filter[territory]
      undefined // limit
    )
  );

  // Fetch introductory offers
  sub.introductoryOffers = await fetchAllWithNext(() =>
    api.subscriptions.subscriptionsIntroductoryOffersGetToManyRelated(
      sub.id,
      undefined, // filter[territory]
      undefined, // fieldsSubscriptionIntroductoryOffers
      undefined, // fieldsSubscriptionPricePoints
      undefined, // fieldsTerritories
      ["territory"], // include
      undefined // limit
    )
  );

  // Fetch promotional offers and their prices
  const offers = await fetchAllWithNext(() =>
    api.subscriptions.subscriptionsPromotionalOffersGetToManyRelated(
      sub.id,
      undefined, // filter[territory]
      undefined, // fieldsSubscriptionPromotionalOffers
      undefined, // fieldsSubscriptionPromotionalOfferPrices
      undefined, // include
      undefined // limit
    )
  );

  // The above call doesn't resolve nested relationships in prices, so we use the links for that.
  for (const offer of offers) {
    if (offer.relationships?.prices?.links?.related) {
      offer.prices = await fetchAllWithNext(async () => {
        const token = getAuthToken();
        const response = await axios.get(
          offer.relationships.prices.links.related,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { include: "subscriptionPricePoint,territory" },
          }
        );
        return response.data;
      });
    }
  }
  sub.promotionalOffers = offers;
}

async function fetchSubscriptionGroups(appId: string) {
  const groups = await fetchAllWithNext(() =>
    api.apps.appsSubscriptionGroupsGetToManyRelated(
      appId,
      undefined, // filterReferenceName
      undefined, // filterSubscriptionsState
      undefined, // sort
      undefined, // fieldsSubscriptionGroups
      undefined, // fieldsSubscriptions
      undefined, // fieldsSubscriptionGroupLocalizations
      undefined, // limit
      ["subscriptions", "subscriptionGroupLocalizations"], // include
      undefined, // limitSubscriptions
      undefined // limitSubscriptionGroupLocalizations
    )
  );

  for (const group of groups) {
    if (group.subscriptions) {
      for (const sub of group.subscriptions) {
        await enrichSubscriptionWithDetails(sub);
      }
    }
  }
  return groups;
}

const mapLocalizations = (localizations: any[] = []) =>
  localizations.map((loc: any) => ({
    locale: loc.attributes.locale,
    name: loc.attributes.name,
    description: loc.attributes.description,
    customName: loc.attributes.customName,
  }));

const mapPriceSchedule = (
  baseTerritory: any,
  prices: any[] = [],
  pricePointKey = "inAppPurchasePricePoint"
) => ({
  baseTerritory: baseTerritory.id,
  prices: prices.map((p: any) => ({
    price: p[pricePointKey]?.attributes.customerPrice,
    territory: p.territory.id,
  })),
});

function mapIntroductoryOffer(offer: any) {
  const { attributes, territory, subscriptionPricePoint } = offer;
  const type =
    attributes.offerMode === "FREE_TRIAL" ? "FREE" : attributes.offerMode;

  const priceSchedule = subscriptionPricePoint
    ? mapPriceSchedule(territory, [offer], "subscriptionPricePoint")
    : undefined;

  switch (type) {
    case "PAY_AS_YOU_GO":
      if (!priceSchedule) return null;
      return {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: attributes.numberOfPeriods,
        priceSchedule,
        availableTerritories: [territory.id],
      };
    case "PAY_UP_FRONT":
      if (!priceSchedule) return null;
      return {
        type: "PAY_UP_FRONT",
        duration: attributes.duration,
        priceSchedule,
        availableTerritories: [territory.id],
      };
    case "FREE":
      return {
        type: "FREE",
        duration: attributes.duration,
        availableTerritories: [territory.id],
      };
    default:
      return null;
  }
}

function mapPromotionalOffer(offer: any) {
  const { attributes, prices } = offer;
  const type =
    attributes.offerMode === "FREE_TRIAL" ? "FREE" : attributes.offerMode;

  const firstPrice = prices[0];
  if (!firstPrice?.territory?.id) return null;

  const priceSchedule = mapPriceSchedule(
    firstPrice.territory,
    prices,
    "subscriptionPricePoint"
  );

  switch (type) {
    case "PAY_AS_YOU_GO":
      return {
        id: offer.id,
        referenceName: attributes.name,
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: attributes.numberOfPeriods,
        priceSchedule,
      };
    case "PAY_UP_FRONT":
      return {
        id: offer.id,
        referenceName: attributes.name,
        type: "PAY_UP_FRONT",
        duration: attributes.duration,
        priceSchedule,
      };
    case "FREE":
      return {
        id: offer.id,
        referenceName: attributes.name,
        type: "FREE",
        duration: attributes.duration,
      };
    default:
      return null;
  }
}

function groupIntroductoryOffers(offers: any[]) {
  const grouped: Record<string, any> = {};
  for (const offer of offers) {
    if (!offer) continue;
    const key =
      offer.type === "PAY_AS_YOU_GO"
        ? `${offer.type}|${offer.numberOfPeriods}`
        : offer.type === "PAY_UP_FRONT"
        ? `${offer.type}|${offer.duration}`
        : offer.type === "FREE"
        ? `${offer.type}|${offer.duration}`
        : offer.type;
    if (!grouped[key]) {
      grouped[key] = {
        ...offer,
        availableTerritories: [...(offer.availableTerritories || [])],
      };
    } else {
      grouped[key].availableTerritories = Array.from(
        new Set([
          ...(grouped[key].availableTerritories || []),
          ...(offer.availableTerritories || []),
        ])
      );
    }
  }
  return Object.values(grouped);
}

function groupPromotionalOffers(offers: any[]) {
  const grouped: Record<string, any> = {};
  for (const offer of offers) {
    if (!offer) continue;
    const id = offer.id;
    if (!grouped[id]) {
      grouped[id] = { ...offer };
      if (offer.prices) {
        grouped[id].prices = [...offer.prices];
      }
    } else {
      // Merge prices arrays if present
      if (offer.prices) {
        grouped[id].prices = Array.from(
          new Set([...(grouped[id].prices || []), ...offer.prices])
        );
      }
    }
  }
  return Object.values(grouped);
}

function mapInAppPurchases(iaps: any[]): AppStoreModel["inAppPurchases"] {
  if (!iaps) return [];
  return iaps
    .map((iap) => {
      const {
        attributes,
        inAppPurchaseLocalizations,
        iapPriceSchedule,
        inAppPurchaseAvailability,
      } = iap;

      if (!iapPriceSchedule?.baseTerritory?.id) {
        return null;
      }

      return {
        productId: attributes.productId,
        type: attributes.inAppPurchaseType,
        referenceName: attributes.name,
        familySharable: attributes.familySharable,
        reviewNote: attributes.reviewNote,
        localizations: mapLocalizations(inAppPurchaseLocalizations),
        priceSchedule: mapPriceSchedule(
          iapPriceSchedule.baseTerritory,
          iapPriceSchedule.prices
        ),
        availability: iapPriceSchedule.baseTerritory
          ? {
              availableInNewTerritories:
                inAppPurchaseAvailability?.attributes.availableInNewTerritories,
              availableTerritories: (
                inAppPurchaseAvailability?.relationships.availableTerritories
                  .data || []
              ).map((t: any) => t.id),
            }
          : undefined,
      };
    })
    .filter((iap: any): iap is NonNullable<typeof iap> => iap !== null);
}

function mapSubscriptionGroups(
  groups: any[]
): AppStoreModel["subscriptionGroups"] {
  if (!groups) return [];
  return groups.map((group) => {
    const { attributes, subscriptionGroupLocalizations, subscriptions } = group;
    return {
      referenceName: attributes.referenceName,
      localizations: mapLocalizations(subscriptionGroupLocalizations),
      subscriptions: (subscriptions || [])
        .map((sub: any) => {
          const prices = sub.prices || [];
          const firstPrice = prices[0];

          if (!firstPrice?.territory?.id) {
            return null;
          }

          const mappedIntroOffers = (sub.introductoryOffers || [])
            .map(mapIntroductoryOffer)
            .filter((o: any): o is NonNullable<typeof o> => o !== null);
          const mappedPromoOffers = (sub.promotionalOffers || [])
            .map(mapPromotionalOffer)
            .filter((o: any): o is NonNullable<typeof o> => o !== null);

          return {
            productId: sub.attributes.productId,
            referenceName: sub.attributes.name,
            groupLevel: sub.attributes.groupLevel,
            subscriptionPeriod: sub.attributes.subscriptionPeriod,
            familySharable: sub.attributes.familySharable,
            priceSchedule: mapPriceSchedule(
              firstPrice.territory,
              prices,
              "subscriptionPricePoint"
            ),
            localizations: mapLocalizations(sub.subscriptionLocalizations),
            introductoryOffers: groupIntroductoryOffers(mappedIntroOffers),
            promotionalOffers: groupPromotionalOffers(mappedPromoOffers),
          };
        })
        .filter((sub: any): sub is NonNullable<typeof sub> => sub !== null),
    };
  });
}

const fetchCommand: CommandModule = {
  command: "fetch",
  describe:
    "Fetches IAPs and subscriptions from App Store Connect for a specific app.",
  builder: {
    id: {
      describe: "The App ID to fetch details for.",
      demandOption: true,
      type: "string",
    },
    file: {
      describe: "Path to the output JSON file.",
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const appId = argv.id as string;
    const outputFile = argv.file as string;

    logger.info(
      `Fetching details for app ID: ${appId} and writing to ${outputFile}`
    );

    try {
      const inAppPurchasesData = await fetchInAppPurchases(appId);
      const subscriptionGroupsData = await fetchSubscriptionGroups(appId);

      const result: AppStoreModel = {
        schemaVersion: "1.0.0",
        appId: appId,
        inAppPurchases: mapInAppPurchases(
          inAppPurchasesData.filter(
            (iap: any) =>
              !iap.attributes.inAppPurchaseType.includes("SUBSCRIPTION")
          )
        ),
        subscriptionGroups: mapSubscriptionGroups(subscriptionGroupsData),
      };

      const parsedData = AppStoreModelSchema.parse(result);

      fs.writeFileSync(outputFile, JSON.stringify(parsedData, null, 2));

      logger.info(
        `Successfully fetched app details and wrote to ${outputFile}`
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Data validation failed:", error.errors);
      } else if (error instanceof ApiError) {
        logger.error(`Failed to fetch app details: ${error.message}`);
        logger.error("API Error:", JSON.stringify(error.body, null, 2));
      } else if (error instanceof Error) {
        logger.error(`Failed to fetch app details: ${error.message}`);
        const axiosError = error as any;
        if (axiosError.isAxiosError && axiosError.response) {
          logger.error(
            "API Response:",
            JSON.stringify(axiosError.response.data, null, 2)
          );
        }
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default fetchCommand;
