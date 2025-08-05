import { territoryCodes } from "../models/territories";
import { deepEqualUnordered } from "../helpers/validation-helpers";

export const WORLDWIDE_TERRITORY_CODE = "Worldwide";

export function useShortcuts(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const converted = { ...data };

  // Handle availableTerritories arrays
  if (Array.isArray(converted.availableTerritories)) {
    if (deepEqualUnordered(converted.availableTerritories, territoryCodes)) {
      converted.availableTerritories = [WORLDWIDE_TERRITORY_CODE];
    }
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (Array.isArray(converted.availability.availableTerritories)) {
      if (
        deepEqualUnordered(
          converted.availability.availableTerritories,
          territoryCodes
        )
      ) {
        converted.availability.availableTerritories = [
          WORLDWIDE_TERRITORY_CODE,
        ];
      }
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (Array.isArray(convertedOffer.availableTerritories)) {
          if (
            deepEqualUnordered(
              convertedOffer.availableTerritories,
              territoryCodes
            )
          ) {
            convertedOffer.availableTerritories = [WORLDWIDE_TERRITORY_CODE];
          }
        }

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

  // Handle availableTerritories arrays
  if (Array.isArray(converted.availableTerritories)) {
    if (
      converted.availableTerritories.length === 1 &&
      converted.availableTerritories[0] === WORLDWIDE_TERRITORY_CODE
    ) {
      // Convert WW back to all territories for display
      converted.availableTerritories = [...territoryCodes];
    }
  }

  // Handle availability objects
  if (converted.availability && typeof converted.availability === "object") {
    if (Array.isArray(converted.availability.availableTerritories)) {
      if (
        converted.availability.availableTerritories.length === 1 &&
        converted.availability.availableTerritories[0] ===
          WORLDWIDE_TERRITORY_CODE
      ) {
        converted.availability.availableTerritories = [...territoryCodes];
      }
    }
  }

  // Handle introductoryOffers
  if (Array.isArray(converted.introductoryOffers)) {
    converted.introductoryOffers = converted.introductoryOffers.map(
      (offer: any) => {
        const convertedOffer = { ...offer };

        if (Array.isArray(convertedOffer.availableTerritories)) {
          if (
            convertedOffer.availableTerritories.length === 1 &&
            convertedOffer.availableTerritories[0] === WORLDWIDE_TERRITORY_CODE
          ) {
            convertedOffer.availableTerritories = [...territoryCodes];
          }
        }

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
