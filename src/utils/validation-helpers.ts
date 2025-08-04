import { logger } from "./logger";
import { AppStoreModelSchema } from "../models/app-store";
import { readFileSync } from "fs";
import { z } from "zod";

export function validateJsonFile(filePath: string, showSuccessMessage = false) {
  const fileContent = readFileSync(filePath, "utf-8");

  // First check if it's valid JSON
  let jsonData;
  try {
    jsonData = JSON.parse(fileContent);
  } catch (jsonError) {
    throw new Error(
      `❌ Invalid JSON format! ${filePath}
        ${jsonError}`
    );
  }

  // Then validate against AppStoreModelSchema
  const result = AppStoreModelSchema.safeParse(jsonData);

  if (result.success) {
    if (showSuccessMessage) {
      logger.info(
        "✅ Validation passed! The JSON file format and structure are valid."
      );
    }
    return result.data;
  } else {
    logger.error(`❌ Validation failed! ${filePath}`);
    throw result.error;
  }
}

export type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
