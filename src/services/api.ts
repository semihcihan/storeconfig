import { OpenAPI } from "../generated/app-store-connect-api";
import { getAuthToken } from "./auth";
import { AppsService } from "../generated/app-store-connect-api/services/AppsService";
import { InAppPurchasesService } from "../generated/app-store-connect-api/services/InAppPurchasesService";
import { InAppPurchasePriceSchedulesService } from "../generated/app-store-connect-api/services/InAppPurchasePriceSchedulesService";
import { SubscriptionsService } from "../generated/app-store-connect-api/services/SubscriptionsService";
import { SubscriptionGroupsService } from "../generated/app-store-connect-api/services/SubscriptionGroupsService";
import { SubscriptionLocalizationsService } from "../generated/app-store-connect-api/services/SubscriptionLocalizationsService";
import { SubscriptionPricesService } from "../generated/app-store-connect-api/services/SubscriptionPricesService";
import { SubscriptionIntroductoryOffersService } from "../generated/app-store-connect-api/services/SubscriptionIntroductoryOffersService";
import { SubscriptionPromotionalOffersService } from "../generated/app-store-connect-api/services/SubscriptionPromotionalOffersService";

OpenAPI.BASE = "https://api.appstoreconnect.apple.com/v1";

OpenAPI.TOKEN = async () => {
  return getAuthToken();
};

export const api = {
  apps: AppsService,
  inAppPurchases: InAppPurchasesService,
  inAppPurchasePriceSchedules: InAppPurchasePriceSchedulesService,
  subscriptions: SubscriptionsService,
  subscriptionGroups: SubscriptionGroupsService,
  subscriptionLocalizations: SubscriptionLocalizationsService,
  subscriptionPrices: SubscriptionPricesService,
  subscriptionIntroductoryOffers: SubscriptionIntroductoryOffersService,
  subscriptionPromotionalOffers: SubscriptionPromotionalOffersService,
};
