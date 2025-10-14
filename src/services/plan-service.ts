import { logger } from "@semihcihan/shared";
import { Plan, AnyAction } from "@semihcihan/shared";
import { territoryCodes } from "@semihcihan/shared";
import {
  deepEqualUnordered,
  WORLDWIDE_TERRITORY_CODE,
} from "@semihcihan/shared";

function isWorldwideTerritories(territories: string[] | string): boolean {
  if (territories === WORLDWIDE_TERRITORY_CODE) {
    return true;
  }
  // Check if the array contains all possible territories using deep equality
  return deepEqualUnordered(territories, territoryCodes);
}

function formatPrices(
  prices: Array<{ price: string; territory: string }>
): string {
  return prices.map((p) => `${p.territory}: $${p.price}`).join(", ");
}

export async function showAction(action: AnyAction) {
  let title = "";
  let details = "";

  switch (action.type) {
    case "UPDATE_APP_AVAILABILITY":
      const territories = action.payload.availableTerritories;
      const isWorldwide = isWorldwideTerritories(territories);
      title = "Updating app availability";
      details = isWorldwide
        ? "worldwide"
        : `${Array.isArray(territories) ? territories.length : 1} territories`;
      break;

    case "UPDATE_IN_APP_PURCHASE":
      const changes = JSON.stringify(action.payload.changes);
      title = `Updating in-app purchase "${action.payload.productId}"`;
      details = changes;
      break;

    case "UPDATE_IAP_AVAILABILITY":
      const iapTerritories = action.payload.availability.availableTerritories;
      const iapAvailIsWorldwide = isWorldwideTerritories(iapTerritories);
      title = `Updating IAP "${action.payload.productId}" availability`;
      details = iapAvailIsWorldwide
        ? "worldwide"
        : `${
            Array.isArray(iapTerritories) ? iapTerritories.length : 1
          } territories`;
      break;

    case "UPDATE_IAP_PRICING":
      const pricing = action.payload.pricing;
      const priceList = formatPrices(pricing.prices);
      title = `Updating IAP "${action.payload.productId}" pricing`;
      details = priceList;
      break;

    case "CREATE_SUBSCRIPTION":
      const sub = action.payload.subscription;
      const subPriceList = sub.pricing
        ? formatPrices(sub.pricing.prices)
        : "No pricing set";
      const subTerritories = sub.availability?.availableTerritories;
      const subIsWorldwide = subTerritories
        ? isWorldwideTerritories(subTerritories)
        : false;
      const subTerritoryInfo = subIsWorldwide
        ? "worldwide"
        : subTerritories
        ? `${
            Array.isArray(subTerritories) ? subTerritories.length : 1
          } territories`
        : "No territories set";
      title = `Creating subscription "${sub.productId}" (${sub.referenceName}) in group "${action.payload.groupReferenceName}"`;
      details = `Period: ${sub.subscriptionPeriod}, Pricing: ${subPriceList}, Territories: ${subTerritoryInfo}`;
      break;

    case "UPDATE_SUBSCRIPTION_AVAILABILITY":
      const subAvailTerritories =
        action.payload.availability.availableTerritories;
      const subAvailIsWorldwide = isWorldwideTerritories(subAvailTerritories);
      title = `Updating subscription "${action.payload.subscriptionProductId}" availability`;
      details = subAvailIsWorldwide
        ? "worldwide"
        : `${
            Array.isArray(subAvailTerritories) ? subAvailTerritories.length : 1
          } territories`;
      break;

    case "CREATE_SUBSCRIPTION_PRICE":
      const subPrice = action.payload.desiredPriceSchedule;
      const subPriceListFormatted = formatPrices(subPrice.prices);
      title = `Creating subscription price for "${action.payload.subscriptionProductId}"`;
      details = subPriceListFormatted;
      break;

    case "CREATE_INTRODUCTORY_OFFER":
      const offer = action.payload.offer;
      const offerPriceList =
        offer.type === "FREE_TRIAL"
          ? "Free trial"
          : formatPrices(offer.pricing.prices);
      const offerTerritories = offer.availableTerritories;
      const offerIsWorldwide = isWorldwideTerritories(offerTerritories);
      const offerTerritoryInfo = offerIsWorldwide
        ? "worldwide"
        : `${
            Array.isArray(offerTerritories) ? offerTerritories.length : 1
          } territories`;
      title = `Creating introductory offer for subscription "${action.payload.subscriptionProductId}"`;
      details = `Type: ${offer.type}, Period: ${action.payload.subscriptionPeriod}, Pricing: ${offerPriceList}, Territories: ${offerTerritoryInfo}`;
      break;

    case "CREATE_IN_APP_PURCHASE":
      const iap = action.payload.inAppPurchase;
      const iapPriceList = iap.pricing
        ? formatPrices(iap.pricing.prices)
        : "No pricing set";
      const iapAvailTerritories = iap.availability?.availableTerritories;
      const iapCreateIsWorldwide = iapAvailTerritories
        ? isWorldwideTerritories(iapAvailTerritories)
        : false;
      const iapTerritoryInfo = iapCreateIsWorldwide
        ? "worldwide"
        : iapAvailTerritories
        ? `${
            Array.isArray(iapAvailTerritories) ? iapAvailTerritories.length : 1
          } territories`
        : "No territories set";
      title = `Creating in-app purchase "${iap.productId}" (${iap.referenceName})"`;
      details = `Type: ${iap.type}, Pricing: ${iapPriceList}, Territories: ${iapTerritoryInfo}`;
      break;

    case "UPDATE_APP_PRICING":
      const appPricing = action.payload.pricing;
      const appPriceList = formatPrices(appPricing.prices);
      title = "Updating app pricing";
      details = appPriceList;
      break;

    case "UPDATE_APP_DETAILS":
      const detailsKeys = JSON.stringify(action.payload);
      title = "Updating app details";
      details = detailsKeys;
      break;

    case "UPDATE_VERSION_METADATA":
      const metadata = JSON.stringify(action.payload);
      title = "Updating version metadata";
      details = metadata;
      break;

    case "CREATE_APP_LOCALIZATION":
      const appLoc = action.payload.localization;
      title = "Creating app localization";
      details = appLoc.locale;
      break;

    case "UPDATE_APP_LOCALIZATION":
      const appLocUpdate = action.payload;
      title = `Updating app localization`;
      details = appLocUpdate.locale;
      break;

    case "DELETE_APP_LOCALIZATION":
      title = "Deleting app localization";
      details = action.payload.locale;
      break;

    case "CREATE_SUBSCRIPTION_GROUP":
      const group = action.payload.group;
      title = "Creating subscription group";
      details = `"${group.referenceName}"`;
      break;

    case "UPDATE_SUBSCRIPTION_GROUP":
      const groupUpdate = action.payload;
      const groupChanges = JSON.stringify(action.payload.changes || {});
      title = `Updating subscription group "${groupUpdate.referenceName}"`;
      details = groupChanges;
      break;

    case "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      const groupLoc = action.payload.localization;
      title = "Creating subscription group localization";
      details = groupLoc.locale;
      break;

    case "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION":
      const groupLocUpdate = action.payload;
      const groupLocChanges = JSON.stringify(action.payload.changes || {});
      title = `Updating subscription group localization for ${groupLocUpdate.locale}`;
      details = groupLocChanges;
      break;

    case "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION":
      title = "Deleting subscription group localization";
      details = action.payload.locale;
      break;

    case "UPDATE_SUBSCRIPTION":
      const subUpdate = action.payload;
      const subUpdateChanges = JSON.stringify(action.payload.changes || {});
      title = `Updating subscription "${subUpdate.productId}"`;
      details = subUpdateChanges;
      break;

    case "CREATE_SUBSCRIPTION_LOCALIZATION":
      const subLoc = action.payload.localization;
      title = "Creating subscription localization";
      details = subLoc.locale;
      break;

    case "UPDATE_SUBSCRIPTION_LOCALIZATION":
      const subLocUpdate = action.payload;
      const subLocChanges = JSON.stringify(action.payload.changes || {});
      title = `Updating subscription localization for ${subLocUpdate.locale}`;
      details = subLocChanges;
      break;

    case "DELETE_SUBSCRIPTION_LOCALIZATION":
      title = "Deleting subscription localization";
      details = action.payload.locale;
      break;

    case "CREATE_IAP_LOCALIZATION":
      const iapLoc = action.payload.localization;
      title = "Creating IAP localization";
      details = iapLoc.locale;
      break;

    case "UPDATE_IAP_LOCALIZATION":
      const iapLocUpdate = action.payload;
      const iapLocChanges = JSON.stringify(action.payload.changes || {});
      title = `Updating IAP localization for ${iapLocUpdate.locale}`;
      details = iapLocChanges;
      break;

    case "DELETE_IAP_LOCALIZATION":
      title = "Deleting IAP localization";
      details = action.payload.locale;
      break;

    case "DELETE_INTRODUCTORY_OFFER":
      title = "Deleting introductory offer";
      details = `subscription "${action.payload.subscriptionProductId}"`;
      break;

    case "CREATE_PROMOTIONAL_OFFER":
      const promo = action.payload.offer;
      const promoPriceList =
        promo.type === "FREE_TRIAL"
          ? "Free trial"
          : formatPrices(promo.pricing.prices);
      title = `Creating promotional offer "${promo.referenceName}" for subscription "${action.payload.subscriptionProductId}"`;
      details = `Type: ${promo.type}, Pricing: ${promoPriceList}`;
      break;

    case "DELETE_PROMOTIONAL_OFFER":
      title = "Deleting promotional offer";
      details = `"${action.payload.offerId}" subscription "${action.payload.subscriptionProductId}"`;
      break;

    default:
      title = "Unknown action type";
      details = (action as any).type;
      break;
  }

  logger.info(`${title}\n   ${details}`);
}

export async function showPlan(plan: Plan) {
  for (const action of plan) {
    await showAction(action);
  }
}
