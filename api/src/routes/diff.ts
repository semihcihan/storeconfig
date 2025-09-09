import { Router, Request, Response } from "express";
import { logger } from "@semihcihan/shared";
import { diff } from "../services/diff-service";
import { fetchAppStoreState } from "../services/fetch-service";
import { useShortcuts } from "../utils/shortcut-converter";
import { z } from "zod";
import type { AppStoreModel } from "@semihcihan/shared";

const router = Router();

// Request validation schema
const DiffRequestSchema = z.object({
  desiredState: z.any(), // We'll cast this to AppStoreModel after validation
});

// POST /api/v1/diff
router.post("/diff", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { desiredState } = DiffRequestSchema.parse(req.body);

    // Cast to proper types
    const typedDesiredState = desiredState as AppStoreModel;

    // Fetch current state from App Store Connect
    const currentState = await fetchAppStoreState(typedDesiredState.appId);

    // Generate diff plan
    const plan = diff(currentState, typedDesiredState);

    // Return success response
    res.json({
      success: true,
      data: {
        plan: plan,
        currentState: currentState,
      },
    });
  } catch (error) {
    logger.error("API: Diff failed", error);

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
          : "Failed to generate diff plan",
    });
  }
});

export default router;
