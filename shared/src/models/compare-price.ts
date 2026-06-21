export interface PriceComparison {
  territory: string;
  localPrice: number;
  localCurrency: string;
  usdPrice: number;
  usdPercentage: number;
}

export interface PricingAnalysis {
  item: {
    type: string;
    id: string;
    name: string;
  };
  prices: PriceComparison[];
}
