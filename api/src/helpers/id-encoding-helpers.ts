import { TerritoryCodeSchema } from "@semihcihan/shared";
import { z } from "zod";

// Helper function to validate territory code
export function validateTerritoryCode(
  territoryCode: string
): z.infer<typeof TerritoryCodeSchema> {
  return TerritoryCodeSchema.parse(territoryCode);
}
