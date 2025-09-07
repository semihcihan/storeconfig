import { TerritoryCodeSchema } from "../models/territories";
import { z } from "zod";

// Helper function to validate territory code
export function validateTerritoryCode(
  territoryCode: string
): z.infer<typeof TerritoryCodeSchema> {
  return TerritoryCodeSchema.parse(territoryCode);
}
