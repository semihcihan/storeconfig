import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { fetchAppStoreState } from "../services/fetch-service";
import { useShortcuts } from "../utils/shortcut-converter";
import { z } from "zod";

const router = Router();

// Request validation schema
const FetchRequestSchema = z.object({
  appId: z.string().min(1, "App ID is required"),
});

// POST /api/v1/fetch
router.post("/fetch", async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { appId } = FetchRequestSchema.parse(req.body);

    logger.info(`API: Fetching details for app ID: ${appId}`);

    // Fetch app store state
    const appStoreState = useShortcuts(await fetchAppStoreState(appId));

    // Return success response
    res.json({
      success: true,
      data: appStoreState,
    });

    logger.info(`API: Successfully fetched app data for ID: ${appId}`);
  } catch (error) {
    logger.error("API: Fetch failed", error);

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
          : "Failed to fetch app data",
    });
  }
});

export default router;
