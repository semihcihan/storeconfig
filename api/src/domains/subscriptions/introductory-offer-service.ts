import {
  isNotFoundError,
  logger,
  addJobInfo,
  MESSAGES,
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
  getIntroductoryOfferGroupingKey,
} from "@semihcihan/shared";
import { z } from "zod";
import {
  createSubscriptionIntroductoryOffer,
  deleteSubscriptionIntroductoryOffer,
  fetchSubscriptionIntroductoryOffers,
} from "./api-client";
import {
  findSubscriptionId,
  findSubscriptionPricePointId,
  buildCompleteDesiredPriceMap,
} from "./pricing-service";
import type { components } from "@semihcihan/app-store-connect-api-types";
import { mapIntroductoryOffers } from "./mapper";
import { compareNumericValues } from "@semihcihan/shared";

type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];

type IntroductoryOffer = z.infer<typeof IntroductoryOfferSchema>;
type SubscriptionIntroductoryOfferCreateRequest =
  components["schemas"]["SubscriptionIntroductoryOfferCreateRequest"];

// Create introductory offer for a subscription
export async function createIntroductoryOffer(
  subscriptionProductId: string,
  subscriptionPeriod: z.infer<typeof SubscriptionOfferDurationSchema>,
  offer: IntroductoryOffer,
  newlyCreatedSubscriptions?: Map<string, string>,
  currentSubscriptionGroupsResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(
    `Creating introductory offer for subscription ${subscriptionProductId}`
  );

  // Find the subscription ID
  const subscriptionId = findSubscriptionId(
    subscriptionProductId,
    newlyCreatedSubscriptions,
    currentSubscriptionGroupsResponse
  );

  let completeOffer = offer;
  if (completeOffer.type !== "FREE_TRIAL") {
    const desiredPriceMap = await buildCompleteDesiredPriceMap(
      completeOffer.pricing,
      subscriptionId
    );
    completeOffer.pricing.prices = Array.from(desiredPriceMap.values());
  }

  // Get current offer
  let introductoryOffersResponse =
    await fetchSubscriptionIntroductoryOffers(subscriptionId);
  let currentIntroductoryOffers =
    (await mapIntroductoryOffers(introductoryOffersResponse, false)) ?? [];
  let currentOffer = currentIntroductoryOffers.find((introductoryOffer) => {
    return (
      getIntroductoryOfferGroupingKey(introductoryOffer) ===
      getIntroductoryOfferGroupingKey(completeOffer)
    );
  });

  let preparedOffer = await preparePricesForIntroductoryOffer(
    offer,
    subscriptionId
  );

  await applyDifferences(
    currentOffer,
    preparedOffer,
    subscriptionId,
    subscriptionPeriod,
    introductoryOffersResponse
  );

  logger.debug(
    `Successfully created introductory offer for subscription ${subscriptionProductId}`
  );
}

async function applyDifferences(
  currentOffer: IntroductoryOffer | undefined,
  desiredOffer: IntroductoryOffer,
  subscriptionId: string,
  subscriptionPeriod?: z.infer<typeof SubscriptionOfferDurationSchema>,
  introductoryOffersResponse?: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<IntroductoryOffer> {
  logger.debug("Applying differences for introductory offer", {
    currentOffer,
    desiredOffer,
  });

  // If currentOffer is undefined, we need to create offers for all territories
  if (!currentOffer) {
    return await createDesiredOfferWhenCurrentOfferIsUndefined(
      subscriptionId,
      desiredOffer,
      subscriptionPeriod
    );
  }

  // Both offers should have the same type and duration/numberOfPeriods
  // We only need to handle territory and price differences

  if (desiredOffer.type === "FREE_TRIAL") {
    return await applyDifferencesForFreeTrial(
      currentOffer,
      desiredOffer,
      subscriptionId,
      subscriptionPeriod,
      introductoryOffersResponse
    );
  } else if (
    desiredOffer.type === "PAY_AS_YOU_GO" ||
    desiredOffer.type === "PAY_UP_FRONT"
  ) {
    return await applyDifferencesForPaidOffer(
      currentOffer,
      desiredOffer,
      subscriptionId,
      subscriptionPeriod,
      introductoryOffersResponse
    );
  }

  return desiredOffer;
}

async function createDesiredOfferWhenCurrentOfferIsUndefined(
  subscriptionId: string,
  desiredOffer: IntroductoryOffer,
  subscriptionPeriod?: z.infer<typeof SubscriptionOfferDurationSchema>
): Promise<IntroductoryOffer> {
  logger.debug("No current offer found, creating offers for all territories");

  if (desiredOffer.type === "FREE_TRIAL") {
    // For FREE_TRIAL, create offers for all territories
    await createOffersForTerritories(
      subscriptionId,
      desiredOffer,
      desiredOffer.availableTerritories as string[],
      subscriptionPeriod
    );
  } else if (
    desiredOffer.type === "PAY_AS_YOU_GO" ||
    desiredOffer.type === "PAY_UP_FRONT"
  ) {
    // For paid offers, create offers for all price/territory combinations
    const territories = desiredOffer.pricing.prices.map(
      (price) => price.territory
    );
    await createOffersForTerritories(
      subscriptionId,
      desiredOffer,
      territories,
      subscriptionPeriod
    );
  }

  return desiredOffer;
}

async function applyDifferencesForFreeTrial(
  currentOffer: IntroductoryOffer,
  desiredOffer: IntroductoryOffer,
  subscriptionId: string,
  subscriptionPeriod?: z.infer<typeof SubscriptionOfferDurationSchema>,
  introductoryOffersResponse?: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<IntroductoryOffer> {
  // Type narrowing to ensure we have FREE_TRIAL offers
  if (
    currentOffer.type !== "FREE_TRIAL" ||
    desiredOffer.type !== "FREE_TRIAL"
  ) {
    throw new Error(
      "applyDifferencesForFreeTrial called with non-FREE_TRIAL offer"
    );
  }

  const currentTerritories = new Set(currentOffer.availableTerritories);
  const desiredTerritories = new Set(desiredOffer.availableTerritories);

  // Find territories to remove (in current but not in desired)
  const territoriesToRemove = [...currentTerritories].filter(
    (territory) => !desiredTerritories.has(territory)
  );

  // Find territories to add (in desired but not in current)
  const territoriesToAdd = [...desiredTerritories].filter(
    (territory) => !currentTerritories.has(territory)
  );

  // Delete offers for territories that are no longer needed
  await deleteOffersForTerritories(
    subscriptionId,
    desiredOffer.type,
    desiredOffer.duration,
    territoriesToRemove,
    introductoryOffersResponse
  );

  // Create offers for new territories
  if (territoriesToAdd.length > 0) {
    await createOffersForTerritories(
      subscriptionId,
      desiredOffer,
      territoriesToAdd,
      subscriptionPeriod
    );
  }

  return desiredOffer;
}

async function applyDifferencesForPaidOffer(
  currentOffer: IntroductoryOffer,
  desiredOffer: IntroductoryOffer,
  subscriptionId: string,
  subscriptionPeriod?: z.infer<typeof SubscriptionOfferDurationSchema>,
  introductoryOffersResponse?: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<IntroductoryOffer> {
  // Type narrowing to ensure we have paid offers
  if (
    currentOffer.type === "FREE_TRIAL" ||
    desiredOffer.type === "FREE_TRIAL"
  ) {
    throw new Error(
      "applyDifferencesForPaidOffer called with FREE_TRIAL offer"
    );
  }

  const currentPriceMap = new Map(
    currentOffer.pricing.prices.map((price) => [price.territory, price])
  );
  const desiredPriceMap = new Map(
    desiredOffer.pricing.prices.map((price) => [price.territory, price])
  );

  const currentTerritories = new Set(currentPriceMap.keys());
  const desiredTerritories = new Set(desiredPriceMap.keys());

  // Find territories to remove (in current but not in desired)
  const territoriesToRemove = [...currentTerritories].filter(
    (territory) => !desiredTerritories.has(territory)
  );

  // Find territories to add (in desired but not in current)
  const territoriesToAdd = [...desiredTerritories].filter(
    (territory) => !currentTerritories.has(territory)
  );

  // Find territories with changed prices
  const territoriesWithChangedPrices = [...desiredTerritories].filter(
    (territory) => {
      if (!currentTerritories.has(territory)) return false;

      const currentPrice = currentPriceMap.get(territory);
      const desiredPrice = desiredPriceMap.get(territory);

      if (!currentPrice || !desiredPrice) return false;

      return !compareNumericValues(currentPrice.price, desiredPrice.price);
    }
  );

  // Delete offers for territories that are no longer needed
  await deleteOffersForTerritories(
    subscriptionId,
    desiredOffer.type,
    desiredOffer.type === "PAY_AS_YOU_GO"
      ? desiredOffer.numberOfPeriods
      : desiredOffer.duration,
    territoriesToRemove,
    introductoryOffersResponse
  );

  // Delete and recreate offers for territories with changed prices
  await deleteOffersForTerritories(
    subscriptionId,
    desiredOffer.type,
    desiredOffer.type === "PAY_AS_YOU_GO"
      ? desiredOffer.numberOfPeriods
      : desiredOffer.duration,
    territoriesWithChangedPrices,
    introductoryOffersResponse
  );

  // Add job info message if there are price changes
  if (territoriesWithChangedPrices.length > 0) {
    await addJobInfo(MESSAGES.SUBSCRIPTION_PRICE_CHANGE, "after");
  }

  // Create offers for new territories and territories with changed prices
  const territoriesToCreate = [
    ...territoriesToAdd,
    ...territoriesWithChangedPrices,
  ];
  if (territoriesToCreate.length > 0) {
    await createOffersForTerritories(
      subscriptionId,
      desiredOffer,
      territoriesToCreate,
      subscriptionPeriod
    );
  }

  return desiredOffer;
}

async function deleteOffersForTerritories(
  subscriptionId: string,
  offerType: string,
  durationOrPeriods: string | number,
  territories: string[],
  introductoryOffersResponse?: components["schemas"]["SubscriptionIntroductoryOffersResponse"]
): Promise<void> {
  if (territories.length === 0) return;

  logger.debug(`Deleting offers for territories: ${territories.join(", ")}`);

  // Use provided response or fetch if not available
  const existingOffers = introductoryOffersResponse?.data || [];

  // Find offers that match our criteria
  const offersToDelete = existingOffers.filter((existingOffer) => {
    const attributes = existingOffer.attributes;
    if (!attributes) return false;

    // Match offer type
    if (attributes.offerMode !== offerType) return false;

    // Match duration/numberOfPeriods
    if (offerType === "PAY_AS_YOU_GO") {
      if (attributes.numberOfPeriods !== durationOrPeriods) return false;
    } else if (offerType === "PAY_UP_FRONT" || offerType === "FREE_TRIAL") {
      if (attributes.duration !== durationOrPeriods) return false;
    }

    // Match territory
    const existingTerritory = existingOffer.relationships?.territory?.data?.id;
    if (!existingTerritory || !territories.includes(existingTerritory)) {
      return false;
    }

    return true;
  });

  // Delete matching offers (handle 404 errors gracefully)
  for (const offerToDelete of offersToDelete) {
    try {
      await deleteSubscriptionIntroductoryOffer(offerToDelete.id);
      logger.debug(
        `Deleted introductory offer ${offerToDelete.id} for territory ${offerToDelete.relationships?.territory?.data?.id}`
      );
    } catch (error: any) {
      if (isNotFoundError(error)) {
        // It's ok to get 404 when deleting - the offer might already be deleted
        logger.debug(`Offer ${offerToDelete.id} was already deleted (404)`);
      } else {
        throw error;
      }
    }
  }
}

async function createOffersForTerritories(
  subscriptionId: string,
  offer: IntroductoryOffer,
  territories: string[],
  subscriptionPeriod?: z.infer<typeof SubscriptionOfferDurationSchema>
): Promise<void> {
  if (territories.length === 0) return;

  logger.debug(`Creating offers for territories: ${territories.join(", ")}`);

  if (offer.type === "FREE_TRIAL") {
    // For FREE_TRIAL, create offers for all territories
    for (const territory of territories) {
      const createRequest: SubscriptionIntroductoryOfferCreateRequest = {
        data: {
          type: "subscriptionIntroductoryOffers",
          attributes: {
            startDate: undefined,
            endDate: undefined,
            offerMode: offer.type,
            duration: offer.duration,
            numberOfPeriods: 1,
          },
          relationships: {
            subscription: {
              data: {
                type: "subscriptions",
                id: subscriptionId,
              },
            },
            territory: {
              data: {
                type: "territories",
                id: territory,
              },
            },
          },
        },
      };

      await createSubscriptionIntroductoryOffer(createRequest);
      logger.debug(
        `Created FREE_TRIAL introductory offer for territory ${territory}`
      );
    }
  } else if (offer.type === "PAY_AS_YOU_GO" || offer.type === "PAY_UP_FRONT") {
    // For paid offers, create offers for each price/territory combination
    for (const territory of territories) {
      const price = offer.pricing.prices.find((p) => p.territory === territory);
      if (!price) {
        logger.warn(`No price found for territory ${territory} in offer`);
        continue;
      }

      // Find the price point ID for this price and territory
      const pricePointId = await findSubscriptionPricePointId(
        price.price,
        price.territory,
        subscriptionId
      );

      const createRequest: SubscriptionIntroductoryOfferCreateRequest = {
        data: {
          type: "subscriptionIntroductoryOffers",
          attributes: {
            startDate: undefined,
            endDate: undefined,
            offerMode: offer.type,
            duration:
              offer.type === "PAY_AS_YOU_GO"
                ? subscriptionPeriod || "ONE_MONTH"
                : offer.duration,
            numberOfPeriods:
              offer.type === "PAY_AS_YOU_GO" ? offer.numberOfPeriods : 1,
          },
          relationships: {
            subscription: {
              data: {
                type: "subscriptions",
                id: subscriptionId,
              },
            },
            territory: {
              data: {
                type: "territories",
                id: territory,
              },
            },
            subscriptionPricePoint: {
              data: {
                type: "subscriptionPricePoints",
                id: pricePointId,
              },
            },
          },
        },
      };

      await createSubscriptionIntroductoryOffer(createRequest);
      logger.debug(
        `Created ${offer.type} introductory offer for territory ${territory} with price ${price.price}`
      );
    }
  }
}

async function preparePricesForIntroductoryOffer(
  offer: IntroductoryOffer,
  subscriptionId: string
): Promise<IntroductoryOffer> {
  if (offer.type === "FREE_TRIAL") {
    return offer;
  }

  const desiredPriceMap = await buildCompleteDesiredPriceMap(
    offer.pricing,
    subscriptionId
  );

  const availableTerritoriesSet = new Set(offer.availableTerritories);
  offer.pricing.prices = Array.from(desiredPriceMap.values()).filter((price) =>
    availableTerritoriesSet.has(price.territory)
  );

  return offer;
}

// Delete introductory offer for a subscription
export async function deleteIntroductoryOffer(
  subscriptionProductId: string,
  offer: IntroductoryOffer,
  newlyCreatedSubscriptions?: Map<string, string>,
  currentSubscriptionGroupsResponse?: SubscriptionGroupsResponse
): Promise<void> {
  logger.debug(
    `Deleting introductory offer for subscription ${subscriptionProductId}`
  );

  // Find the subscription ID
  const subscriptionId = findSubscriptionId(
    subscriptionProductId,
    newlyCreatedSubscriptions,
    currentSubscriptionGroupsResponse
  );

  let introductoryOffersResponse =
    await fetchSubscriptionIntroductoryOffers(subscriptionId);

  await deleteOffersForTerritories(
    subscriptionId,
    offer.type,
    offer.type === "PAY_AS_YOU_GO" ? offer.numberOfPeriods : offer.duration,
    offer.availableTerritories as string[],
    introductoryOffersResponse
  );
}
