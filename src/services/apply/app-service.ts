import { logger } from "../../utils/logger";
import { updateApp } from "../../domains/app-store/api-client";
import { z } from "zod";
import { AppStoreModelSchema } from "../../models/app-store";
import { LocaleCodeSchema } from "../../models/locales";

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

export async function updateAppDetails(
  appId: string,
  changes: {
    primaryLocale?: z.infer<typeof LocaleCodeSchema>;
    name?: string;
    bundleId?: string;
    copyright?: string;
  }
): Promise<void> {
  logger.info(`Updating app details for app ID: ${appId}`);

  // Filter out undefined values
  const attributes = Object.fromEntries(
    Object.entries(changes).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(attributes).length === 0) {
    logger.info("No app details to update");
    return;
  }

  logger.info(`Updating app attributes: ${JSON.stringify(attributes)}`);

  try {
    const response = await updateApp(appId, attributes);
    logger.info(`Successfully updated app details: ${response.data.id}`);
  } catch (error) {
    // Pass through Apple's error messages as requested
    if (error instanceof Error) {
      throw new Error(`Failed to update app details: ${error.message}`);
    }
    throw error;
  }
}
