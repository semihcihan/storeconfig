import type { CommandModule } from "yargs";
import { logger } from "../utils/logger";
import apiClient from "../services/api";
import * as fs from "fs";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";
import { AxiosResponse } from "axios";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

async function fetchAllWithNext(url: string, params: Record<string, any> = {}) {
  let results: any[] = [];
  let nextUrl: string | undefined = url;

  while (nextUrl) {
    const response: AxiosResponse<any> = await apiClient.get(nextUrl, {
      params,
    });
    let responseData = response.data.data;
    const included = response.data.included;
    if (included) {
      responseData = responseData.map((item: any) => {
        const resolvedRels = resolveRelationships(item, included);
        return {
          ...item,
          ...resolvedRels,
        };
      });
    }
    results = results.concat(responseData);
    nextUrl = response.data.links?.next;
    params = {};
  }
  return results;
}

function resolveRelationships(item: any, included: any[]) {
  const relationships: Record<string, any> = {};
  if (!item.relationships) {
    return relationships;
  }
  for (const key in item.relationships) {
    const relation = item.relationships[key];
    if (relation.data) {
      if (Array.isArray(relation.data)) {
        relationships[key] = relation.data
          .map((d: any) =>
            included.find((i) => i.type === d.type && i.id === d.id)
          )
          .filter(Boolean);
      } else {
        relationships[key] = included.find(
          (i) => i.type === relation.data.type && i.id === relation.data.id
        );
      }
    }
  }
  return relationships;
}

async function fetchInAppPurchases(appId: string) {
  const iaps = await fetchAllWithNext(`apps/${appId}/inAppPurchasesV2`, {
    include:
      "inAppPurchaseLocalizations,iapPriceSchedule,inAppPurchaseAvailability",
    "fields[inAppPurchases]":
      "name,productId,inAppPurchaseType,state,familySharable,reviewNote",
  });

  for (const iap of iaps) {
    if (iap.iapPriceSchedule?.id) {
      const scheduleId = iap.iapPriceSchedule.id;
      const scheduleRes = await apiClient.get(
        `inAppPurchasePriceSchedules/${scheduleId}`,
        { params: { include: "baseTerritory,manualPrices" } }
      );
      const scheduleData = scheduleRes.data.data;
      const scheduleIncluded = scheduleRes.data.included;
      Object.assign(iap.iapPriceSchedule, scheduleData);
      if (scheduleIncluded) {
        const resolved = resolveRelationships(scheduleData, scheduleIncluded);
        Object.assign(iap.iapPriceSchedule, resolved);
      }

      if (iap.iapPriceSchedule.manualPrices?.data?.length > 0) {
        const pricesUrl =
          iap.iapPriceSchedule.relationships.manualPrices.links.related;
        const prices = await fetchAllWithNext(pricesUrl, {
          include: "inAppPurchasePricePoint,territory",
        });
        iap.iapPriceSchedule.prices = prices;
      }
    }
  }

  return iaps;
}

async function fetchSubscriptionGroups(appId: string) {
  const groups = await fetchAllWithNext(`apps/${appId}/subscriptionGroups`, {
    include: "subscriptions,subscriptionGroupLocalizations",
  });

  for (const group of groups) {
    if (group.subscriptions) {
      for (const sub of group.subscriptions) {
        const response: AxiosResponse<any> = await apiClient.get(
          `subscriptions/${sub.id}`,
          {
            params: {
              include: "subscriptionLocalizations",
            },
          }
        );
        const subDetails = response.data.data;
        const included = response.data.included;

        Object.assign(sub, subDetails);

        if (included) {
          const resolvedRels = resolveRelationships(subDetails, included);
          Object.assign(sub, resolvedRels);
        }

        if (sub.relationships?.prices?.links?.related) {
          const prices = await fetchAllWithNext(
            sub.relationships.prices.links.related,
            {
              include: "subscriptionPricePoint,territory",
            }
          );
          sub.prices = prices;
        }

        if (sub.relationships?.introductoryOffers?.links?.related) {
          const offersUrl = sub.relationships.introductoryOffers.links.related;
          const offers = await fetchAllWithNext(offersUrl, {
            include: "territory,subscriptionPricePoint",
          });
          sub.introductoryOffers = offers;
        }

        if (sub.relationships?.promotionalOffers?.links?.related) {
          const offersUrl = sub.relationships.promotionalOffers.links.related;
          const offers = await fetchAllWithNext(offersUrl);
          for (const offer of offers) {
            if (offer.relationships?.prices?.links?.related) {
              const offerPrices = await fetchAllWithNext(
                offer.relationships.prices.links.related,
                {
                  include: "subscriptionPricePoint,territory",
                }
              );
              offer.prices = offerPrices;
            }
          }
          sub.promotionalOffers = offers;
        }
      }
    }
  }
  return groups;
}

function mapIntroductoryOffer(offer: any) {
  const { attributes, territory, subscriptionPricePoint } = offer;
  const type =
    attributes.offerMode === "FREE_TRIAL" ? "FREE" : attributes.offerMode;

  const priceSchedule = subscriptionPricePoint
    ? {
        baseTerritory: territory.id,
        prices: [
          {
            price: subscriptionPricePoint.attributes.customerPrice,
            territory: territory.id,
          },
        ],
      }
    : undefined;

  switch (type) {
    case "PAY_AS_YOU_GO":
      if (!priceSchedule) return null;
      return {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: attributes.numberOfPeriods,
        priceSchedule: priceSchedule,
        availableTerritories: [territory.id],
      };
    case "PAY_UP_FRONT":
      if (!priceSchedule) return null;
      return {
        type: "PAY_UP_FRONT",
        duration: attributes.duration,
        priceSchedule: priceSchedule,
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

  const priceSchedule = {
    baseTerritory: firstPrice.territory.id,
    prices: prices.map((p: any) => ({
      price: p.subscriptionPricePoint.attributes.customerPrice,
      territory: p.territory.id,
    })),
  };

  switch (type) {
    case "PAY_AS_YOU_GO":
      return {
        id: offer.id,
        referenceName: attributes.name,
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: attributes.numberOfPeriods,
        priceSchedule: priceSchedule,
      };
    case "PAY_UP_FRONT":
      return {
        id: offer.id,
        referenceName: attributes.name,
        type: "PAY_UP_FRONT",
        duration: attributes.duration,
        priceSchedule: priceSchedule,
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

      const priceSchedule = {
        baseTerritory: iapPriceSchedule.baseTerritory.id,
        prices: (iapPriceSchedule.prices || []).map((p: any) => ({
          price: p.inAppPurchasePricePoint.attributes.customerPrice,
          territory: p.territory.id,
        })),
      };

      return {
        productId: attributes.productId,
        type: attributes.inAppPurchaseType,
        referenceName: attributes.name,
        familySharable: attributes.familySharable,
        reviewNote: attributes.reviewNote,
        localizations: (inAppPurchaseLocalizations || []).map((loc: any) => ({
          locale: loc.attributes.locale,
          name: loc.attributes.name,
          description: loc.attributes.description,
        })),
        priceSchedule: priceSchedule,
        availability: inAppPurchaseAvailability
          ? {
              availableInNewTerritories:
                inAppPurchaseAvailability.attributes.availableInNewTerritories,
              availableTerritories: (
                inAppPurchaseAvailability.relationships.availableTerritories
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
      localizations: (subscriptionGroupLocalizations || []).map((loc: any) => ({
        locale: loc.attributes.locale,
        name: loc.attributes.name,
        customName: loc.attributes.customName,
      })),
      subscriptions: (subscriptions || [])
        .map((sub: any) => {
          const prices = sub.prices || [];
          const firstPrice = prices[0];

          if (!firstPrice?.territory?.id) {
            return null;
          }

          const priceSchedule = {
            baseTerritory: firstPrice.territory.id,
            prices: prices.map((p: any) => ({
              price: p.subscriptionPricePoint.attributes.customerPrice,
              territory: p.territory.id,
            })),
          };

          const introductoryOffers = (sub.introductoryOffers || [])
            .map(mapIntroductoryOffer)
            .filter((o: any): o is NonNullable<typeof o> => o !== null);

          const promotionalOffers = (sub.promotionalOffers || [])
            .map(mapPromotionalOffer)
            .filter((o: any): o is NonNullable<typeof o> => o !== null);

          return {
            productId: sub.attributes.productId,
            referenceName: sub.attributes.name,
            groupLevel: sub.attributes.groupLevel,
            subscriptionPeriod: sub.attributes.subscriptionPeriod,
            familySharable: sub.attributes.familySharable,
            priceSchedule: priceSchedule,
            localizations: (sub.subscriptionLocalizations || []).map(
              (loc: any) => ({
                locale: loc.attributes.locale,
                name: loc.attributes.name,
                description: loc.attributes.description,
              })
            ),
            introductoryOffers,
            promotionalOffers,
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
            (iap) => !iap.attributes.inAppPurchaseType.includes("SUBSCRIPTION")
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
