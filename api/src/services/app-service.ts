import { logger } from "@semihcihan/shared";
import { updateApp } from "../domains/apps/api-client";
import { z } from "zod";
import { AppStoreModelSchema } from "@semihcihan/shared";
import { LocaleCodeSchema } from "@semihcihan/shared";

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
  logger.debug(`Updating app details for app ID: ${appId}`);

  // Filter out undefined values
  const attributes = Object.fromEntries(
    Object.entries(changes).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(attributes).length === 0) {
    logger.debug("No app details to update");
    return;
  }

  logger.debug(`Updating app attributes:`, attributes);

  const response = await updateApp(appId, attributes);
  logger.debug(`Successfully updated app details: ${response.data.id}`);
}
