import { logger } from "../utils/logger";
import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";

// Helper function to decode territory ID from base64 encoded ID
export function decodeTerritoryFromId(
  encodedId: string
): z.infer<typeof TerritoryCodeSchema> | null {
  const decodedId = Buffer.from(encodedId, "base64").toString("utf-8");
  const idParts = JSON.parse(decodedId);
  const territoryId = idParts.t;

  const territoryParseResult = TerritoryCodeSchema.safeParse(territoryId);
  if (!territoryParseResult.success) {
    logger.error(
      `Invalid territory code from ID: ${territoryId}.`,
      "idParts",
      idParts
    );
    throw new Error(`Invalid territory code from ID: ${territoryId}.`);
  }

  return territoryParseResult.data;
}

// Helper function to decode territory availability ID
export function decodeTerritoryAvailabilityId(
  encodedId: string
): { territoryCode: string } | null {
  const decoded = JSON.parse(
    Buffer.from(encodedId, "base64").toString("utf-8")
  );
  return { territoryCode: decoded.t };
}

// Helper function to validate territory code
export function validateTerritoryCode(
  territoryCode: string
): z.infer<typeof TerritoryCodeSchema> {
  return TerritoryCodeSchema.parse(territoryCode);
}
