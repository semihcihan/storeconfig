import { Router, Request, Response } from "express";
import { analyzePricing } from "../services/compare-price-service";
import { z } from "zod";
import type { AppStoreModel } from "@semihcihan/shared";
import type { TerritoryData } from "../services/pricing-strategy";

const router = Router();

const ComparePriceRequestSchema = z.object({
  appStoreData: z.any(),
});

export interface ComparePricingDependencies {
  loadCurrencies: () => Promise<TerritoryData[]>;
}

export async function comparePricing(
  params: { appStoreData: any },
  dependencies?: ComparePricingDependencies
) {
  const { appStoreData } = params;

  const validatedParams = ComparePriceRequestSchema.parse({ appStoreData });

  const typedAppStoreData = validatedParams.appStoreData as AppStoreModel;

  if (!dependencies?.loadCurrencies) {
    throw new Error(
      "comparePricing requires currencies loader. Please provide dependencies.loadCurrencies."
    );
  }

  const currencies = await dependencies.loadCurrencies();

  const analysis = await analyzePricing(typedAppStoreData, currencies);

  return analysis;
}

// POST /compare-price
router.post("/compare-price", async (req: Request, res: Response) => {
  try {
    const result = await comparePricing(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
