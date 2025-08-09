export type PricingStrategy = "apple" | "purchasingPower";

export interface PricingItem {
  type: "app" | "inAppPurchase" | "subscription" | "offer";
  id: string;
  name: string;
  offerType?: string;
  parentName?: string;
}

export interface PricingRequest {
  selectedItem: PricingItem;
  basePrice: string;
  pricingStrategy: PricingStrategy;
  minimumPrice?: string;
}
