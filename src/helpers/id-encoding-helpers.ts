import { logger } from "../utils/logger";
import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";

// Helper function to decode territory ID from base64 encoded ID
export function decodeTerritoryFromId(
  encodedId: string
): z.infer<typeof TerritoryCodeSchema> | null {
  try {
    const decodedId = Buffer.from(encodedId, "base64").toString("utf-8");
    const idParts = JSON.parse(decodedId);
    const territoryId = idParts.t;

    const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
    if (!territoryParseResult.success) {
      logger.warn(`Invalid territory code from ID: ${territoryId}`);
      return null;
    }

    return territoryParseResult.data;
  } catch (e) {
    logger.warn(`Could not decode territory from ID: ${encodedId}`);
    return null;
  }
}

// Helper function to decode territory availability ID
export function decodeTerritoryAvailabilityId(
  encodedId: string
): { territoryCode: string } | null {
  try {
    const decoded = JSON.parse(
      Buffer.from(encodedId, "base64").toString("utf-8")
    );
    return { territoryCode: decoded.t };
  } catch (error) {
    logger.warn(`Failed to decode territory availability ID: ${encodedId}`);
    return null;
  }
}

// Helper function to validate territory code
export function validateTerritoryCode(
  territoryCode: string
): z.infer<typeof TerritoryCodeSchema> | null {
  const territoryParseResult = TerritoryCodeSchema.safeParse(territoryCode);
  if (!territoryParseResult.success) {
    logger.warn(`Invalid territory code: ${territoryCode}`);
    return null;
  }
  return territoryParseResult.data;
}
