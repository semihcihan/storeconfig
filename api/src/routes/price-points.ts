import { Router, Request, Response } from "express";
import { getPricePointsForSelectedItem } from "../set-price/base-price/price-point-fetcher";
import { z } from "zod";
import { PricingItemSchema } from "@semihcihan/shared";

const router = Router();

// Request validation schema
const PricePointsRequestSchema = z.object({
  selectedItem: PricingItemSchema,
  appId: z.string(),
  territoryId: z.string(),
});

export async function fetchPricePoints(params: {
  selectedItem: any;
  appId: string;
  territoryId?: string;
}) {
  const { selectedItem, appId, territoryId } = params;

  const validatedParams = PricePointsRequestSchema.parse({
    selectedItem,
    appId,
    territoryId,
  });

  const pricePoints = await getPricePointsForSelectedItem(
    validatedParams.selectedItem,
    validatedParams.appId,
    validatedParams.territoryId
  );

  return {
    pricePoints,
    territoryId: validatedParams.territoryId,
  };
}

// POST /price-points
router.post("/price-points", async (req: Request, res: Response) => {
  try {
    const result = await fetchPricePoints(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
