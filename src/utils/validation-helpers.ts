import { logger } from "./logger";
import { AppStoreModelSchema } from "../models/app-store";
import { readFileSync } from "fs";
import { z } from "zod";

export function validateJsonFile(filePath: string, showSuccessMessage = false) {
  try {
    const fileContent = readFileSync(filePath, "utf-8");

    // First check if it's valid JSON
    let jsonData;
    try {
      jsonData = JSON.parse(fileContent);
    } catch (jsonError) {
      logger.error("❌ Invalid JSON format!", filePath);
      logger.error("JSON parsing error:", jsonError);
      process.exit(1);
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
      logger.error("❌ Validation failed!", filePath);
      logger.error("Schema validation errors:");
      result.error.issues.forEach((issue, index) => {
        logger.error(`${index + 1}. ${issue.path.join(".")}: ${issue.message}`);
      });
      process.exit(1);
    }
  } catch (error) {
    logger.error("❌ Error reading the file:", filePath, error);
    process.exit(1);
  }
}

export type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
