import { Router, Request, Response } from "express";
import { logger } from "@semihcihan/shared";
import { apply } from "../services/apply-service";
import { z } from "zod";
import type { AppStoreModel } from "@semihcihan/shared";
import type { Plan } from "../models/diff-plan";

const router = Router();

// Request validation schema
const ApplyRequestSchema = z.object({
  plan: z.array(z.any()), // We'll cast this to Plan after validation
  currentState: z.any(), // We'll cast this to AppStoreModel after validation
  desiredState: z.any(), // We'll cast this to AppStoreModel after validation
});

// POST /api/v1/apply
router.post("/apply", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { plan, currentState, desiredState } = ApplyRequestSchema.parse(
      req.body
    );

    // Cast to proper types
    const typedPlan = plan as Plan;
    const typedCurrentState = currentState as AppStoreModel;
    const typedDesiredState = desiredState as AppStoreModel;

    // Apply the plan
    await apply(typedPlan, typedCurrentState, typedDesiredState);

    // Return success response
    res.json({
      success: true,
      message: "Changes applied successfully",
    });
  } catch (error) {
    logger.error("API: Apply failed", error);

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
          : "Failed to apply changes",
    });
  }
});

export default router;
