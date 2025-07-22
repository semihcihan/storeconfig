import { logger } from "../../utils/logger";
import {
  AppStoreModelSchema,
  AvailabilitySchema,
} from "../../models/app-store";
import { z } from "zod";
import {
  getSubscriptionAvailability,
  createSubscriptionAvailability,
} from "./api-client";
import {
  isNotFoundError,
  throwFormattedError,
} from "../../helpers/error-handling-helpers";
import type { components } from "../../generated/app-store-connect-api";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
type SubscriptionAvailabilityCreateRequest =
  components["schemas"]["SubscriptionAvailabilityCreateRequest"];
type SubscriptionGroupsResponse =
  components["schemas"]["SubscriptionGroupsResponse"];

// Helper function to extract subscription ID from subscription groups response
function extractSubscriptionId(
  currentSubscriptionGroupsResponse: SubscriptionGroupsResponse,
  productId: string
): string | null {
  for (const group of currentSubscriptionGroupsResponse.data || []) {
    const subscriptions = group.relationships?.subscriptions?.data || [];
    for (const subscription of subscriptions) {
      // Find the subscription in the included data
      const subscriptionData = currentSubscriptionGroupsResponse.included?.find(
        (item) => item.type === "subscriptions" && item.id === subscription.id
      );
      if (
        subscriptionData &&
        (subscriptionData as any).attributes?.productId === productId
      ) {
        return subscription.id;
      }
    }
  }
  return null;
}

// Helper function to create subscription availability for a specific subscription
async function createSubscriptionAvailabilityForSubscription(
  subscriptionId: string,
  availability: z.infer<typeof AvailabilitySchema>
): Promise<string> {
  logger.info(
    `Creating subscription availability for subscription ${subscriptionId}...`
  );

  const territoryData = availability.availableTerritories.map((territory) => ({
    type: "territories" as const,
    id: territory,
  }));

  const createRequest: SubscriptionAvailabilityCreateRequest = {
    data: {
      type: "subscriptionAvailabilities" as const,
      attributes: {
        availableInNewTerritories: availability.availableInNewTerritories,
      },
      relationships: {
        subscription: {
          data: {
            type: "subscriptions" as const,
            id: subscriptionId,
          },
        },
        availableTerritories: {
          data: territoryData,
        },
      },
    },
  };

  const response = await createSubscriptionAvailability(createRequest);

  if (!response.data?.id) {
    throw new Error("No subscription availability ID returned from creation");
  }

  logger.info(
    `Successfully created subscription availability: ${response.data.id}`
  );
  return response.data.id;
}

// Main function to update subscription availability
export async function updateSubscriptionAvailability(
  productId: string,
  availability: z.infer<typeof AvailabilitySchema>,
  appId: string,
  currentSubscriptionGroupsResponse: SubscriptionGroupsResponse,
  newlyCreatedSubscriptions?: Map<string, string>
): Promise<void> {
  logger.info(`Updating subscription availability for product ${productId}`);
  logger.info(
    `Available territories: ${JSON.stringify(
      availability.availableTerritories
    )}`
  );
  logger.info(
    `Available in new territories: ${availability.availableInNewTerritories}`
  );

  // Get the subscription ID, checking newly created subscriptions first
  let subscriptionId: string | null = null;

  if (newlyCreatedSubscriptions?.has(productId)) {
    subscriptionId = newlyCreatedSubscriptions.get(productId)!;
  } else {
    subscriptionId = extractSubscriptionId(
      currentSubscriptionGroupsResponse,
      productId
    );
  }

  if (!subscriptionId) {
    throw new Error(`Subscription with product ID ${productId} not found`);
  }

  // Check if subscription already has availability
  const existingAvailability = await getSubscriptionAvailability(
    subscriptionId
  );

  if (existingAvailability?.data?.id) {
    logger.info(
      `Subscription ${productId} already has availability. Updating via POST-as-upsert pattern...`
    );
    logger.info(`Existing availability ID: ${existingAvailability.data.id}`);
    logger.info(
      `Current availableInNewTerritories: ${existingAvailability.data.attributes?.availableInNewTerritories}`
    );

    // Apple's API uses POST-as-upsert pattern: creating availability for a subscription that already has it
    // will update the existing availability rather than creating a duplicate
    logger.info(`Updating subscription availability for product ${productId}`);
    await createSubscriptionAvailabilityForSubscription(
      subscriptionId,
      availability
    );
    logger.info(
      `Successfully updated subscription availability for product ${productId}`
    );
    return;
  }

  // Create new subscription availability
  logger.info(
    `Creating new subscription availability for product ${productId}`
  );
  await createSubscriptionAvailabilityForSubscription(
    subscriptionId,
    availability
  );

  logger.info(
    `Subscription availability update completed for product ${productId}`
  );
}
