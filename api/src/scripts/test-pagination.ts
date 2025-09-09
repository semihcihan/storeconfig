#!/usr/bin/env ts-node

import { api } from "../services/api";
import { logger } from "@semihcihan/shared";

/**
 * Test script to verify automatic pagination is working
 */
async function testPagination() {
  try {
    logger.info("Testing automatic pagination based on PagingInformation...");

    // Test v1 endpoint that should be paginated (if it has PagingInformation)
    logger.info("Testing v1 in-app purchases endpoint...");
    const iapResponse = await api.GET("/v1/apps/{id}/inAppPurchasesV2", {
      params: {
        path: { id: "1234567890" }, // Use a dummy app ID
        query: {
          include: ["inAppPurchaseLocalizations"],
        },
      },
    });

    logger.info(
      `IAP response has PagingInformation: ${!!iapResponse.data?.meta?.paging}`
    );
    logger.info(
      `IAP response data length: ${iapResponse.data?.data?.length || 0}`
    );
    if (iapResponse.data?.meta?.paging) {
      logger.info(
        `Paging info - limit: ${
          iapResponse.data.meta.paging.limit
        }, nextCursor: ${iapResponse.data.meta.paging.nextCursor || "none"}`
      );
    }

    // Test v2 endpoint that should be paginated (if it has PagingInformation)
    logger.info("Testing v2 territory availabilities endpoint...");
    const territoryResponse = await api.GET(
      "/v2/appAvailabilities/{id}/territoryAvailabilities",
      {
        params: {
          path: { id: "1234567890" }, // Use a dummy ID
          query: {
            include: ["territory"],
          },
        },
      }
    );

    logger.info(
      `Territory response has PagingInformation: ${!!territoryResponse.data
        ?.meta?.paging}`
    );
    logger.info(
      `Territory response data length: ${
        territoryResponse.data?.data?.length || 0
      }`
    );
    if (territoryResponse.data?.meta?.paging) {
      logger.info(
        `Paging info - limit: ${
          territoryResponse.data.meta.paging.limit
        }, nextCursor: ${
          territoryResponse.data.meta.paging.nextCursor || "none"
        }`
      );
    }

    // Test v1 endpoint that should NOT be paginated (single resource)
    logger.info("Testing v1 apps endpoint (should not be paginated)...");
    const appResponse = await api.GET("/v1/apps/{id}", {
      params: {
        path: { id: "1234567890" },
        query: {
          "fields[apps]": ["name", "bundleId"],
        },
      },
    });

    logger.info(`App response has PagingInformation: ${!!appResponse.data}`);

    logger.info("Pagination test completed successfully!");
  } catch (error) {
    logger.error("Pagination test failed:", error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testPagination().catch(console.error);
}

export { testPagination };
