import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { applyPricing } from "../services/set-price-service";
import { z } from "zod";
import { PricingRequestSchema } from "../models/pricing-request";

const router = Router();

// Request validation schema
const ApplyPricingRequestSchema = z.object({
  appStoreState: z.any(), // We'll cast this to AppStoreModel after validation
  pricingRequest: PricingRequestSchema,
});

// POST /api/v1/apply-pricing
router.post("/apply-pricing", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { appStoreState, pricingRequest } = ApplyPricingRequestSchema.parse(
      req.body
    );

    // Apply pricing
    const updatedState = await applyPricing(appStoreState, pricingRequest);

    // Return success response
    res.json({
      success: true,
      data: {
        updatedState,
      },
    });
  } catch (error) {
    logger.error("API: Apply pricing failed", error);

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
          : "Failed to apply pricing",
    });
  }
});

export default router;
