import { Router, Request, Response } from "express";
import { apply } from "../services/apply-service";
import { z } from "zod";
import type { AppStoreModel, Plan } from "@semihcihan/shared";
import type { PricePointDataHook } from "../services/price-point";
import { setPricePointDataHook } from "../services/price-point";

const router = Router();

const ApplyRequestSchema = z.object({
  plan: z.array(z.any()),
  desiredState: z.any(),
  dryRun: z.boolean().optional().default(false),
});

export async function applyChanges(params: {
  plan: any;
  desiredState: any;
  dryRun?: boolean;
  onStepCallback?: (index: number, action: any) => Promise<void>;
  pricePointDataHook: PricePointDataHook;
  startIndex?: number;
}) {
  const {
    plan,
    desiredState,
    dryRun,
    onStepCallback,
    pricePointDataHook,
    startIndex = 0,
  } = params;

  setPricePointDataHook(pricePointDataHook);

  const validatedParams = ApplyRequestSchema.parse({
    plan,
    desiredState,
    dryRun,
  });

  const typedPlan = validatedParams.plan as Plan;
  const typedDesiredState = validatedParams.desiredState as AppStoreModel;

  await apply(
    typedPlan,
    typedDesiredState,
    onStepCallback,
    validatedParams.dryRun,
    startIndex
  );

  return {
    message: "Changes applied successfully",
  };
}

// POST /apply
router.post("/apply", async (req: Request, res: Response) => {
  try {
    const result = await applyChanges(req.body);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
