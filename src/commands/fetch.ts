import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";
import { api } from "../services/api";
import { components } from "../generated/app-store-connect-api";
import { getAuthToken } from "../services/auth";
import axios from "axios";

type PagedDocumentLinks = components["schemas"]["PagedDocumentLinks"];
type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

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
  const { data: scheduleRes, error: scheduleError } = await api.GET(
    "/v1/inAppPurchasePriceSchedules/{id}",
    {
      params: {
        path: {
          id: scheduleId,
        },
        query: {
          include: ["baseTerritory", "manualPrices"],
        },
      },
    }
  );

  if (scheduleError || !scheduleRes) {
    throw scheduleError;
  }

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

    let allPrices: any[] = [];
    let nextUrl: string | undefined = pricesUrl;

    while (nextUrl) {
      const token = getAuthToken();
      const response = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${token}` },
        params: { include: "inAppPurchasePricePoint,territory" },
      });
      allPrices = allPrices.concat(response.data.data);
      nextUrl = response.data.links?.next;
    }

    if (iap.iapPriceSchedule) {
      iap.iapPriceSchedule.prices = allPrices;
    }
  }
}

async function fetchInAppPurchases(appId: string) {
  let allIaps: any[] = [];
  let allIncluded: any[] = [];
  let nextUrl: string | undefined = `/v1/apps/${appId}/inAppPurchasesV2`;

  while (nextUrl) {
    const { data: iapsRes, error: iapsError } = await api.GET(
      "/v1/apps/{id}/inAppPurchasesV2",
      {
        params: {
          path: {
            id: appId,
          },
          query: {
            filterInAppPurchaseType: [
              "NON_CONSUMABLE",
              "CONSUMABLE",
              "NON_RENEWING_SUBSCRIPTION",
            ],
            fieldsInAppPurchases: [
              "name",
              "productId",
              "inAppPurchaseType",
              "state",
              "familySharable",
              "reviewNote",
            ],
            include: [
              "inAppPurchaseLocalizations",
              "iapPriceSchedule",
              "inAppPurchaseAvailability",
            ],
          },
        },
      }
    );

    if (iapsError || !iapsRes) {
      throw iapsError;
    }

    allIaps = allIaps.concat(iapsRes.data);
    if (iapsRes.included) {
      allIncluded = allIncluded.concat(iapsRes.included);
    }
    nextUrl = iapsRes.links?.next;
  }

  const resolvedIaps = allIaps.map((item) => ({
    ...item,
    ...resolveRelationships(item, allIncluded),
  }));

  for (const iap of resolvedIaps) {
    await enrichIapWithPriceSchedule(iap);
  }

  return resolvedIaps;
}

async function enrichSubscriptionWithDetails(sub: any) {
  // Fetch localizations
  let allLocalizations: any[] = [];
  let nextLocalizationsUrl:
    | string
    | undefined = `/v1/subscriptions/${sub.id}/subscriptionLocalizations`;
  while (nextLocalizationsUrl) {
    const { data: locsRes, error: locsError } = await api.GET(
      "/v1/subscriptions/{id}/subscriptionLocalizations",
      {
        params: {
          path: {
            id: sub.id,
          },
        },
      }
    );
    if (locsError || !locsRes) throw locsError;
    allLocalizations = allLocalizations.concat(locsRes.data);
    nextLocalizationsUrl = locsRes.links?.next;
  }
  sub.subscriptionLocalizations = allLocalizations;

  // Fetch prices
  let allPrices: any[] = [];
  let nextPricesUrl: string | undefined = `/v1/subscriptions/${sub.id}/prices`;
  while (nextPricesUrl) {
    const { data: pricesRes, error: pricesError } = await api.GET(
      "/v1/subscriptions/{id}/prices",
      {
        params: {
          path: {
            id: sub.id,
          },
          query: {
            include: ["subscriptionPricePoint", "territory"],
          },
        },
      }
    );
    if (pricesError || !pricesRes) throw pricesError;
    allPrices = allPrices.concat(pricesRes.data);
    nextPricesUrl = pricesRes.links?.next;
  }
  sub.prices = allPrices;

  // Fetch introductory offers
  let allIntroOffers: any[] = [];
  let nextIntroOffersUrl:
    | string
    | undefined = `/v1/subscriptions/${sub.id}/introductoryOffers`;
  while (nextIntroOffersUrl) {
    const { data: offersRes, error: offersError } = await api.GET(
      "/v1/subscriptions/{id}/introductoryOffers",
      {
        params: {
          path: {
            id: sub.id,
          },
          query: {
            include: ["territory"],
          },
        },
      }
    );
    if (offersError || !offersRes) throw offersError;
    allIntroOffers = allIntroOffers.concat(offersRes.data);
    nextIntroOffersUrl = offersRes.links?.next;
  }
  sub.introductoryOffers = allIntroOffers;

  // Fetch promotional offers and their prices
  const { data: offersRes, error: offersError } = await api.GET(
    "/v1/subscriptions/{id}/promotionalOffers",
    {
      params: {
        path: {
          id: sub.id,
        },
      },
    }
  );

  if (offersError) throw offersError;

  if (offersRes) {
    for (const offer of offersRes.data) {
      if (offer.relationships?.prices?.links?.related) {
        let allPromoPrices: any[] = [];
        let nextPromoPricesUrl: string | undefined =
          offer.relationships.prices.links.related;
        while (nextPromoPricesUrl) {
          const token = getAuthToken();
          const response: { data: any } = await axios.get(nextPromoPricesUrl, {
            headers: { Authorization: `Bearer ${token}` },
            params: { include: "subscriptionPricePoint,territory" },
          });
          allPromoPrices = allPromoPrices.concat(response.data.data);
          nextPromoPricesUrl = response.data.links?.next;
        }
        (offer as any).prices = allPromoPrices;
      }
    }
    sub.promotionalOffers = offersRes.data;
  }
}

async function fetchSubscriptionGroups(appId: string) {
  let allGroups: any[] = [];
  let allIncluded: any[] = [];
  let nextUrl: string | undefined = `/v1/apps/${appId}/subscriptionGroups`;

  while (nextUrl) {
    const { data: groupsRes, error: groupsError } = await api.GET(
      "/v1/apps/{id}/subscriptionGroups",
      {
        params: {
          path: {
            id: appId,
          },
          query: {
            include: ["subscriptions", "subscriptionGroupLocalizations"],
          },
        },
      }
    );
    if (groupsError || !groupsRes) throw groupsError;

    allGroups = allGroups.concat(groupsRes.data);
    if (groupsRes.included) {
      allIncluded = allIncluded.concat(groupsRes.included);
    }
    nextUrl = groupsRes.links?.next;
  }

  const resolvedGroups = allGroups.map((item) => ({
    ...item,
    ...resolveRelationships(item, allIncluded),
  }));

  for (const group of resolvedGroups) {
    if (group.subscriptions) {
      for (const sub of group.subscriptions) {
        await enrichSubscriptionWithDetails(sub);
      }
    }
  }
  return resolvedGroups;
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
        logger.error("An error occurred:", error.message);
      } else {
        logger.error("An unknown error occurred:", error);
      }
      process.exit(1);
    }
  },
};

export default fetchCommand;
