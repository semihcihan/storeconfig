import { Router, Request, Response } from "express";
import { logger } from "@semihcihan/shared";
import { analyzePricing } from "../services/compare-price-service";
import { z } from "zod";
import type { AppStoreModel } from "@semihcihan/shared";
import type { TerritoryData } from "../services/pricing-strategy";
import * as fs from "fs";

const router = Router();

// Request validation schema
const ComparePriceRequestSchema = z.object({
  appStoreData: z.any(), // We'll cast this to AppStoreModel after validation
});

// POST /api/v1/compare-price
router.post("/compare-price", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { appStoreData } = ComparePriceRequestSchema.parse(req.body);

    // Read currencies data from the API
    const currenciesData = JSON.parse(
      fs.readFileSync("src/data/currencies.json", "utf8")
    );

    // Cast to proper types for the service function
    const typedAppStoreData = appStoreData as AppStoreModel;
    const typedCurrenciesData = currenciesData as TerritoryData[];

    // Analyze pricing
    const analysis = analyzePricing(typedAppStoreData, typedCurrenciesData);

    // Return success response
    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    logger.error("API: Compare price failed", error);

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
          : "Failed to analyze pricing",
    });
  }
});

export default router;
