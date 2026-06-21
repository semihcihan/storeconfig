import { fetchAppPricePoints } from "../src/domains/pricing/api-client";
import { TEST_APP_ID } from "../src/test-utils/cleanup-helper";
import { logger, territoryCodes } from "@semihcihan/shared";
import { writeFile } from "fs/promises";
import { join } from "path";

describe("Fetch App Price Points - Multiple Territories E2E Tests", () => {
  describe("Multiple Territories Support", () => {
    it("should fetch price points for all territories in a single request", async () => {
      const territories = [...territoryCodes];

      logger.info(
        `Testing fetchAppPricePoints with all ${territories.length} territories`
      );

      const response = await fetchAppPricePoints(TEST_APP_ID, territories);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);

      // Verify that we got price points for multiple territories
      const territoryIds = new Set<string>();
      if (response.included) {
        for (const item of response.included) {
          if (item.type === "territories" && item.id) {
            territoryIds.add(item.id);
          }
        }
      }

      // Extract territory IDs from price point relationships
      if (response.data) {
        for (const pricePoint of response.data) {
          const territoryId = pricePoint.relationships?.territory?.data?.id;
          if (territoryId) {
            territoryIds.add(territoryId);
          }
        }
      }

      logger.info(
        `Found price points for territories: ${Array.from(territoryIds).join(
          ", "
        )}`
      );

      // Verify we got at least some of the requested territories
      const foundTerritories = territories.filter((t) => territoryIds.has(t));
      expect(foundTerritories.length).toBeGreaterThan(0);

      logger.info(
        `✅ Successfully fetched price points for ${foundTerritories.length} of ${territories.length} requested territories`
      );

      // Verify price points have the expected structure
      if (response.data && response.data.length > 0) {
        const firstPricePoint = response.data[0];
        expect(firstPricePoint).toHaveProperty("id");
        expect(firstPricePoint).toHaveProperty("type", "appPricePoints");
        expect(firstPricePoint).toHaveProperty("attributes");
        expect(firstPricePoint.attributes).toHaveProperty("customerPrice");
        expect(firstPricePoint).toHaveProperty("relationships");
        expect(firstPricePoint.relationships).toHaveProperty("territory");
      }

      // Save response to file for inspection
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `app-price-points-all-territories-${timestamp}.json`;
      const filepath = join(__dirname, filename);

      await writeFile(filepath, JSON.stringify(response, null, 2), "utf-8");

      logger.info(`✅ Saved response to file: ${filepath}`);
    }, 1800000); // 30 minutes timeout for this long-running test
  });
});
