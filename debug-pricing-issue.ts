import { api } from "./src/services/api";

async function debugPricingIssue() {
  const appId = "1523230470";

  console.log("=== DEBUGGING PRICING ISSUE ===");

  // 1. Get current app price schedule
  console.log("\n1. Getting current app price schedule...");
  const currentScheduleResponse = await api.GET(
    "/v1/apps/{id}/appPriceSchedule",
    {
      params: {
        path: { id: appId },
        query: {
          include: ["manualPrices", "baseTerritory"],
        },
      },
    }
  );

  if (currentScheduleResponse.data) {
    console.log("Current schedule ID:", currentScheduleResponse.data.data.id);
    console.log(
      "Current schedule type:",
      currentScheduleResponse.data.data.type
    );

    // 2. Get manual prices for current schedule
    console.log("\n2. Manual prices for current schedule:");
    const manualPricesResponse = await api.GET(
      "/v1/appPriceSchedules/{id}/manualPrices",
      {
        params: {
          path: { id: currentScheduleResponse.data.data.id },
          query: {
            include: ["territory", "appPricePoint"],
            limit: 200,
          },
        },
      }
    );

    if (manualPricesResponse.data) {
      console.log(
        "Manual prices count:",
        manualPricesResponse.data.data.length
      );
      manualPricesResponse.data.data.forEach((price: any) => {
        const territory = manualPricesResponse.data.included?.find(
          (item: any) =>
            item.type === "territories" &&
            item.id === price.relationships?.territory?.data?.id
        );
        const pricePoint = manualPricesResponse.data.included?.find(
          (item: any) =>
            item.type === "appPricePoints" &&
            item.id === price.relationships?.appPricePoint?.data?.id
        );

        console.log(`  Price:`, {
          id: price.id,
          territory: territory?.id,
          price: (pricePoint?.attributes as any)?.customerPrice,
          startDate: price.attributes?.startDate,
          endDate: price.attributes?.endDate,
          manual: price.attributes?.manual,
        });
      });
    }
  }

  console.log("\n=== END DEBUG ===");
}

debugPricingIssue().catch(console.error);
