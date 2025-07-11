import { z } from "zod";
import { logger } from "../../utils/logger";
import { TerritoryCodeSchema } from "../../models/territories";
import { validateTerritoryCode } from "../../helpers/id-encoding-helpers";
import type { components } from "../../generated/app-store-connect-api";

// Map app availability response to territory codes
export async function mapAppAvailability(
  response: components["schemas"]["AppAvailabilityV2Response"] | null
): Promise<z.infer<typeof TerritoryCodeSchema>[]> {
  if (!response || !response.data) {
    return [];
  }

  const territoryAvailabilities = response.included || [];
  const availableTerritories = territoryAvailabilities
    .filter(
      (item): item is components["schemas"]["TerritoryAvailability"] =>
        item.type === "territoryAvailabilities" &&
        item.attributes?.available === true
    )
    .map((territoryAvail) => {
      // First try to get territory from relationships
      const territoryId = territoryAvail.relationships?.territory?.data?.id;
      if (territoryId) {
        const territoryCode = validateTerritoryCode(territoryId);
        if (territoryCode) {
          return territoryCode;
        }
      }

      // Fallback: decode territory from the territoryAvailability ID
      try {
        const decodedId = Buffer.from(territoryAvail.id, "base64").toString(
          "utf-8"
        );
        const idParts = JSON.parse(decodedId);
        const territoryCode = idParts.t;

        const validatedTerritoryCode = validateTerritoryCode(territoryCode);
        if (validatedTerritoryCode) {
          return validatedTerritoryCode;
        }
      } catch (e) {
        logger.warn(
          `Could not decode territory availability ID: ${territoryAvail.id}`
        );
      }

      return null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return availableTerritories;
}
