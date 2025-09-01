import { logger } from "../utils/logger";
import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";
import { ContextualError } from "./error-handling-helpers";

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
