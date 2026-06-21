import { Router, Request, Response } from "express";
import { diff } from "../services/diff-service";
import { fetchAppStoreState } from "../services/fetch-service";
import { z } from "zod";
import type { AppStoreModel } from "@semihcihan/shared";

const router = Router();

// Request validation schema
const DiffRequestSchema = z.object({
  desiredState: z.any(), // We'll cast this to AppStoreModel after validation
});

export async function generateDiff(params: { desiredState: any }) {
  const { desiredState } = params;

  const validatedParams = DiffRequestSchema.parse({ desiredState });

  const typedDesiredState = validatedParams.desiredState as AppStoreModel;

  const currentState = await fetchAppStoreState(typedDesiredState.appId);

  const plan = diff(currentState, typedDesiredState);

  return {
    plan,
    currentState,
  };
}

// POST /diff
router.post("/diff", async (req: Request, res: Response) => {
  try {
    const result = await generateDiff(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
