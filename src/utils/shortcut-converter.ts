import { territoryCodes } from "../models/territories";
import { deepEqualUnordered } from "../helpers/validation-helpers";

export const WORLDWIDE_TERRITORY_CODE = "worldwide";

function isWorldwideTerritory(territory: string): boolean {
  return territory.toLowerCase() === WORLDWIDE_TERRITORY_CODE.toLowerCase();
}

function isAllTerritories(territories: string[]): boolean {
  return deepEqualUnordered(territories, territoryCodes);
}

export function useShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle availableTerritories - can be array or string
  if (converted.availableTerritories) {
    if (Array.isArray(converted.availableTerritories)) {
      if (isAllTerritories(converted.availableTerritories)) {
        converted.availableTerritories = WORLDWIDE_TERRITORY_CODE;
      }
    }
    // If it's already a string (worldwide), leave it as is
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (converted.availability.availableTerritories) {
      if (Array.isArray(converted.availability.availableTerritories)) {
        if (isAllTerritories(converted.availability.availableTerritories)) {
          converted.availability.availableTerritories =
            WORLDWIDE_TERRITORY_CODE;
        }
      }
      // If it's already a string (worldwide), leave it as is
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (
          offer.type === "FREE_TRIAL" &&
          convertedOffer.availableTerritories
        ) {
          if (Array.isArray(convertedOffer.availableTerritories)) {
            if (isAllTerritories(convertedOffer.availableTerritories)) {
              convertedOffer.availableTerritories = WORLDWIDE_TERRITORY_CODE;
            }
          }
          // If it's already a string (worldwide), leave it as is
        }
        // PAY_AS_YOU_GO and PAY_UP_FRONT offers no longer have availableTerritories
        // so they don't participate in shortcut conversion

        return convertedOffer;
      }
    );
  }

  // Handle inAppPurchases
  if (Array.isArray(converted.inAppPurchases)) {
    converted.inAppPurchases = converted.inAppPurchases.map((iap: any) => {
      return useShortcuts(iap);
    });
  }

  // Handle subscriptionGroups
  if (Array.isArray(converted.subscriptionGroups)) {
    converted.subscriptionGroups = converted.subscriptionGroups.map(
      (group: any) => {
        const convertedGroup = { ...group };

        if (Array.isArray(convertedGroup.subscriptions)) {
          convertedGroup.subscriptions = convertedGroup.subscriptions.map(
            (sub: any) => {
              return useShortcuts(sub);
            }
          );
        }

        return convertedGroup;
      }
    );
  }

  return converted;
}

export function removeShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle availableTerritories - can be array or string
  if (converted.availableTerritories) {
    if (
      typeof converted.availableTerritories === "string" &&
      isWorldwideTerritory(converted.availableTerritories)
    ) {
      // Convert WW back to all territories for display
      converted.availableTerritories = [...territoryCodes];
    }
    // If it's already an array, leave it as is
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (converted.availability.availableTerritories) {
      if (
        typeof converted.availability.availableTerritories === "string" &&
        isWorldwideTerritory(converted.availability.availableTerritories)
      ) {
        converted.availability.availableTerritories = [...territoryCodes];
      }
      // If it's already an array, leave it as is
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (
          offer.type === "FREE_TRIAL" &&
          convertedOffer.availableTerritories
        ) {
          if (
            typeof convertedOffer.availableTerritories === "string" &&
            isWorldwideTerritory(convertedOffer.availableTerritories)
          ) {
            convertedOffer.availableTerritories = [...territoryCodes];
          }
          // If it's already an array, leave it as is
        }
        // PAY_AS_YOU_GO and PAY_UP_FRONT offers no longer have availableTerritories
        // so they don't participate in shortcut conversion

        return convertedOffer;
      }
    );
  }

  // Handle inAppPurchases
  if (Array.isArray(converted.inAppPurchases)) {
    converted.inAppPurchases = converted.inAppPurchases.map((iap: any) => {
      return removeShortcuts(iap);
    });
  }

  // Handle subscriptionGroups
  if (Array.isArray(converted.subscriptionGroups)) {
    converted.subscriptionGroups = converted.subscriptionGroups.map(
      (group: any) => {
        const convertedGroup = { ...group };

        if (Array.isArray(convertedGroup.subscriptions)) {
          convertedGroup.subscriptions = convertedGroup.subscriptions.map(
            (sub: any) => {
              return removeShortcuts(sub);
            }
          );
        }

        return convertedGroup;
      }
    );
  }

  return converted;
}
