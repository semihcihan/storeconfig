import { Router, Request, Response } from "express";
import { fetchAppStoreState } from "../services/fetch-service";
import { useShortcuts } from "@semihcihan/shared";
import { z } from "zod";

const router = Router();

const FetchRequestSchema = z.object({
  appId: z.string().min(1, "App ID is required"),
});

export async function fetchAppStoreData(params: { appId: string }) {
  const { appId } = params;

  const validatedParams = FetchRequestSchema.parse({ appId });

  const appStoreState = useShortcuts(
    await fetchAppStoreState(validatedParams.appId)
  );

  return appStoreState;
}

// POST /fetch
router.post("/fetch", async (req: Request, res: Response) => {
  try {
    const result = await fetchAppStoreData(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
