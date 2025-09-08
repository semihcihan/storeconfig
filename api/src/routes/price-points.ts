import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { fetchTerritoryPricePointsForSelectedItem } from "../set-price/base-price/price-point-fetcher";
import { z } from "zod";
import { PricingItemSchema } from "../models/pricing-request";

const router = Router();

// Request validation schema
const PricePointsRequestSchema = z.object({
  selectedItem: PricingItemSchema,
  appId: z.string(),
  territoryId: z.string().optional().default("USA"),
});

// POST /api/v1/price-points
router.post("/price-points", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { selectedItem, appId, territoryId } = PricePointsRequestSchema.parse(
      req.body
    );

    // Fetch price points
    const pricePoints = await fetchTerritoryPricePointsForSelectedItem(
      selectedItem,
      appId,
      territoryId
    );

    // Return success response
    res.json({
      success: true,
      data: {
        pricePoints,
        territoryId,
      },
    });
  } catch (error) {
    logger.error("API: Fetch price points failed", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.errors,
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Failed to fetch price points",
    });
  }
});

export default router;
