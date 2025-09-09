import { logger } from "@semihcihan/shared";
import {
  IntroductoryOfferSchema,
  SubscriptionOfferDurationSchema,
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
} from "./pricing-service";
import type { components } from "@semihcihan/app-store-connect-api-types";

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

  // Handle different offer types
  if (offer.type === "FREE_TRIAL") {
    // For FREE_TRIAL, create offers for all available territories
    for (const territory of offer.availableTerritories) {
      // Build the create request
      const createRequest: SubscriptionIntroductoryOfferCreateRequest = {
        data: {
          type: "subscriptionIntroductoryOffers",
          attributes: {
            startDate: undefined, // Immediate start
            endDate: undefined, // No end date
            offerMode: offer.type,
            duration: offer.duration,
            numberOfPeriods: 1, // FREE_TRIAL always has numberOfPeriods = 1
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
  } else if (offer.type === "PAY_AS_YOU_GO") {
    // For PAY_AS_YOU_GO, create offers for each price/territory combination
    for (const price of offer.prices) {
      // Find the price point ID for this price and territory
      const pricePointId = await findSubscriptionPricePointId(
        price.price,
        price.territory,
        subscriptionId
      );

      // Build the create request
      const createRequest: SubscriptionIntroductoryOfferCreateRequest = {
        data: {
          type: "subscriptionIntroductoryOffers",
          attributes: {
            startDate: undefined, // Immediate start
            endDate: undefined, // No end date
            offerMode: offer.type,
            duration: subscriptionPeriod, // Duration matches subscription period for PAY_AS_YOU_GO
            numberOfPeriods: offer.numberOfPeriods, // Variable and inputted
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
                id: price.territory,
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
        `Created PAY_AS_YOU_GO introductory offer for territory ${price.territory} with price ${price.price}`
      );
    }
  } else if (offer.type === "PAY_UP_FRONT") {
    // For PAY_UP_FRONT, create offers for each price/territory combination
    for (const price of offer.prices) {
      // Find the price point ID for this price and territory
      const pricePointId = await findSubscriptionPricePointId(
        price.price,
        price.territory,
        subscriptionId
      );

      // Build the create request
      const createRequest: SubscriptionIntroductoryOfferCreateRequest = {
        data: {
          type: "subscriptionIntroductoryOffers",
          attributes: {
            startDate: undefined, // Immediate start
            endDate: undefined, // No end date
            offerMode: offer.type,
            duration: offer.duration, // Variable and inputted
            numberOfPeriods: 1, // PAY_UP_FRONT always has numberOfPeriods = 1
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
                id: price.territory,
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
        `Created PAY_UP_FRONT introductory offer for territory ${price.territory} with price ${price.price}`
      );
    }
  }

  logger.debug(
    `Successfully created introductory offer for subscription ${subscriptionProductId}`
  );
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

  // Fetch existing introductory offers
  const existingOffersResponse = await fetchSubscriptionIntroductoryOffers(
    subscriptionId
  );

  const existingOffers = existingOffersResponse.data || [];

  // Find offers that match our criteria
  const offersToDelete = existingOffers.filter((existingOffer) => {
    const attributes = existingOffer.attributes;
    if (!attributes) return false;

    // Match offer type
    if (attributes.offerMode !== offer.type) return false;

    // Match duration/numberOfPeriods
    if (offer.type === "PAY_AS_YOU_GO") {
      if (attributes.numberOfPeriods !== offer.numberOfPeriods) return false;
    } else if (offer.type === "PAY_UP_FRONT" || offer.type === "FREE_TRIAL") {
      if (attributes.duration !== offer.duration) return false;
    }

    // Match territory based on offer type
    if (offer.type === "FREE_TRIAL") {
      const existingTerritory =
        existingOffer.relationships?.territory?.data?.id;
      if (
        !existingTerritory ||
        !offer.availableTerritories.includes(existingTerritory as any)
      ) {
        return false;
      }
    } else if (
      offer.type === "PAY_AS_YOU_GO" ||
      offer.type === "PAY_UP_FRONT"
    ) {
      const offerTerritories = offer.prices.map((p: any) => p.territory);
      const existingTerritory =
        existingOffer.relationships?.territory?.data?.id;
      if (!existingTerritory || !offerTerritories.includes(existingTerritory)) {
        return false;
      }
    }

    return true;
  });

  // Delete matching offers
  for (const offerToDelete of offersToDelete) {
    await deleteSubscriptionIntroductoryOffer(offerToDelete.id);
    logger.debug(
      `Deleted introductory offer ${offerToDelete.id} for subscription ${subscriptionProductId}`
    );
  }

  if (offersToDelete.length === 0) {
    logger.debug(
      `No matching introductory offers found to delete for subscription ${subscriptionProductId}`
    );
  } else {
    logger.debug(
      `Successfully deleted ${offersToDelete.length} introductory offers for subscription ${subscriptionProductId}`
    );
  }
}
