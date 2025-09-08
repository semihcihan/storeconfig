import { z } from "zod";

// Zod schemas as the source of truth
const PricingStrategySchema = z.enum(["apple", "purchasingPower"]);

const PricePointInfoSchema = z.object({
  id: z.string(),
  price: z.string(),
});

const PricingItemSchema = z.object({
  type: z.enum(["app", "inAppPurchase", "subscription", "offer"]),
  id: z.string(),
  name: z.string(),
  offerType: z.string().optional(),
  parentName: z.string().optional(),
});

const PricingRequestSchema = z.object({
  appId: z.string(),
  selectedItem: PricingItemSchema,
  basePricePoint: PricePointInfoSchema,
  pricingStrategy: PricingStrategySchema,
  minimumPrice: z.string().optional(),
});

// Export the schemas for use in validation
export {
  PricingStrategySchema,
  PricePointInfoSchema,
  PricingItemSchema,
  PricingRequestSchema,
};

// Derive TypeScript types from Zod schemas (keeping existing exports unchanged)
export type PricingStrategy = z.infer<typeof PricingStrategySchema>;
export type PricePointInfo = z.infer<typeof PricePointInfoSchema>;
export type PricingItem = z.infer<typeof PricingItemSchema>;
export type PricingRequest = z.infer<typeof PricingRequestSchema>;
