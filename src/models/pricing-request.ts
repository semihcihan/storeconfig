export type PricingStrategy = "apple" | "purchasingPower";

export interface PricePointInfo {
  id: string;
  price: string;
}

export interface PricingItem {
  type: "app" | "inAppPurchase" | "subscription" | "offer";
  id: string;
  name: string;
  offerType?: string;
  parentName?: string;
}

export interface PricingRequest {
  appId: string;
  selectedItem: PricingItem;
  basePricePoint: PricePointInfo;
  pricingStrategy: PricingStrategy;
  minimumPrice?: string;
}
