import { Router, Request, Response } from "express";
import {
  applyPricing,
  type ApplyPricingDependencies,
} from "../services/set-price-service";
import { z } from "zod";
import { PricingRequestSchema } from "@semihcihan/shared";

const router = Router();

// Request validation schema
const ApplyPricingRequestSchema = z.object({
  appStoreState: z.any(),
  pricingRequest: PricingRequestSchema,
});

export async function applyPricingChanges(
  params: {
    appStoreState: any;
    pricingRequest: any;
  },
  dependencies?: ApplyPricingDependencies
) {
  const { appStoreState, pricingRequest } = params;

  const validatedParams = ApplyPricingRequestSchema.parse({
    appStoreState,
    pricingRequest,
  });

  const updatedState = await applyPricing(
    validatedParams.appStoreState,
    validatedParams.pricingRequest,
    dependencies
  );

  return {
    updatedState,
  };
}

// POST /apply-pricing
router.post("/apply-pricing", async (req: Request, res: Response) => {
  try {
    const result = await applyPricingChanges(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
