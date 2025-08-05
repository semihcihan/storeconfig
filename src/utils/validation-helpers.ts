import { logger } from "./logger";
import { AppStoreModelSchema } from "../models/app-store";
import { readFileSync } from "fs";
import { z } from "zod";
import { ContextualError } from "../helpers/error-handling-helpers";

export function validateJsonFile(filePath: string, showSuccessMessage = false) {
  const jsonData = readJsonFile(filePath);
  return validateAppStoreModel(jsonData, showSuccessMessage);
}

export function readJsonFile(filePath: string): any {
  const fileContent = readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(fileContent);
  } catch (jsonError) {
    throw new ContextualError(
      `❌ Invalid JSON format! ${filePath}`,
      jsonError,
      {
        filePath,
        jsonError,
      }
    );
  }
}

export function validateAppStoreModel(data: any, showSuccessMessage = false) {
  const result = AppStoreModelSchema.safeParse(data);

  if (result.success) {
    if (showSuccessMessage) {
      logger.info(
        "✅ Validation passed! The JSON file format and structure are valid."
      );
    }
    return result.data;
  } else {
    throw new ContextualError(`❌ Validation failed!`, result.error, {
      result,
    });
  }
}

export type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
