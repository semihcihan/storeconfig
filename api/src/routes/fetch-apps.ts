import { Router, Request, Response } from "express";
import { fetchAppsList as fetchAppsListService } from "../domains/apps/service";

const router = Router();

export async function fetchAppsList() {
  return await fetchAppsListService();
}

// GET /fetch-apps
router.get("/fetch-apps", async (req: Request, res: Response) => {
  try {
    const result = await fetchAppsList();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
