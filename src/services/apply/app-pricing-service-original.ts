// import { logger } from "../../utils/logger";
// import { api } from "../api";
// import {
//   AppStoreModelSchema,
//   PriceScheduleSchema,
//   PriceSchema,
// } from "../../models/app-store";
// import { TerritoryCodeSchema } from "../../models/territories";
// import { z } from "zod";

// type AppStoreModel = z.infer<typeof AppStoreModelSchema>;
// type Price = z.infer<typeof PriceSchema>;
// type Territory = z.infer<typeof TerritoryCodeSchema>;

// // Helper function to get app price schedule ID from app ID
// async function getAppPriceScheduleId(appId: string): Promise<string | null> {
//   const response = await api.GET("/v1/apps/{id}/appPriceSchedule", {
//     params: { path: { id: appId } },
//   });

//   if (response.error) {
//     // Check if it's a 404 error (no price schedule exists)
//     const is404Error = response.error.errors?.some(
//       (err: any) => err.status === "404" || err.status === 404
//     );

//     if (is404Error) {
//       // No price schedule exists yet
//       return null;
//     }

//     logger.error(
//       `Failed to get app price schedule: ${JSON.stringify(response.error)}`
//     );
//     throw new Error(
//       `Failed to get app price schedule: ${
//         response.error.errors?.[0]?.detail || "Unknown error"
//       }`
//     );
//   }

//   const responseData = response.data;
//   if (!responseData || typeof responseData === "string") {
//     throw new Error("Invalid response format from app price schedule API");
//   }

//   return responseData.data.id;
// }

// // Helper function to find app price point ID for a given price and territory
// async function findAppPricePointId(
//   price: string,
//   territory: Territory,
//   appId: string
// ): Promise<string> {
//   const response = await api.GET("/v1/apps/{id}/appPricePoints", {
//     params: {
//       path: { id: appId },
//       query: {
//         limit: 200,
//         include: ["territory"],
//         "fields[appPricePoints]": ["customerPrice", "territory"],
//         "fields[territories]": ["currency"],
//         "filter[territory]": [territory], // Filter for specific territory
//       },
//     },
//   });

//   if (response.error) {
//     logger.error(
//       `Failed to get app price points: ${JSON.stringify(response.error)}`
//     );
//     throw new Error(
//       `Failed to get app price points: ${
//         response.error.errors?.[0]?.detail || "Unknown error"
//       }`
//     );
//   }

//   const responseData = response.data;
//   if (!responseData || typeof responseData === "string") {
//     throw new Error("Invalid response format from app price points API");
//   }

//   const pricePoints = responseData.data || [];

//   // Find the price point that matches the price and territory
//   const pricePoint = pricePoints.find((point: any) => {
//     const pointPrice = point.attributes?.customerPrice;
//     const pointTerritoryId = point.relationships?.territory?.data?.id;

//     return pointPrice === price && pointTerritoryId === territory;
//   });

//   if (!pricePoint) {
//     logger.error(
//       `No price point found for price ${price} in territory ${territory}. ` +
//         `Found ${pricePoints.length} price points for territory ${territory}. ` +
//         `Available prices: ${pricePoints
//           .map((p: any) => p.attributes?.customerPrice)
//           .join(", ")}`
//     );

//     throw new Error(
//       `No price point found for price ${price} in territory ${territory}`
//     );
//   }

//   return pricePoint.id;
// }

// // Helper function to get current manual prices from the price schedule
// async function getCurrentManualPrices(priceScheduleId: string): Promise<any[]> {
//   const response = await api.GET("/v1/appPriceSchedules/{id}/manualPrices", {
//     params: {
//       path: { id: priceScheduleId },
//       query: {
//         limit: 200,
//         include: ["territory", "appPricePoint"],
//         // Don't limit fields so we get all the relationship data
//       },
//     },
//   });

//   if (response.error) {
//     logger.error(
//       `Failed to get manual prices: ${JSON.stringify(response.error)}`
//     );
//     throw new Error(
//       `Failed to get manual prices: ${
//         response.error.errors?.[0]?.detail || "Unknown error"
//       }`
//     );
//   }

//   const responseData = response.data;
//   if (!responseData || typeof responseData === "string") {
//     throw new Error("Invalid response format from manual prices API");
//   }

//   return responseData.data || [];
// }

// // Helper function to get base territory
// async function getBaseTerritory(priceScheduleId: string): Promise<string> {
//   const response = await api.GET("/v1/appPriceSchedules/{id}/baseTerritory", {
//     params: {
//       path: { id: priceScheduleId },
//       query: {
//         "fields[territories]": ["currency"],
//       },
//     },
//   });

//   if (response.error) {
//     logger.error(
//       `Failed to get base territory: ${JSON.stringify(response.error)}`
//     );
//     throw new Error(
//       `Failed to get base territory: ${
//         response.error.errors?.[0]?.detail || "Unknown error"
//       }`
//     );
//   }

//   const responseData = response.data;
//   if (!responseData || typeof responseData === "string") {
//     throw new Error("Invalid response format from base territory API");
//   }

//   return responseData.data?.id || "";
// }

// // Update app base territory by creating a new price schedule
// export async function updateAppBaseTerritory(
//   territory: Territory,
//   appId: string,
//   desiredState: AppStoreModel
// ): Promise<void> {
//   logger.info(`Updating app base territory to ${territory} for app ${appId}`);

//   try {
//     // Get current price schedule to preserve manual prices
//     const currentPriceScheduleId = await getAppPriceScheduleId(appId);

//     if (!currentPriceScheduleId) {
//       throw new Error(
//         "Cannot update base territory when no price schedule exists. " +
//           "Create prices first before updating the base territory."
//       );
//     }

//     const currentManualPrices = await getCurrentManualPrices(
//       currentPriceScheduleId
//     );

//     // Create new price schedule with new base territory
//     const response = await api.POST("/v1/appPriceSchedules", {
//       body: {
//         data: {
//           type: "appPriceSchedules" as const,
//           relationships: {
//             app: {
//               data: {
//                 type: "apps" as const,
//                 id: appId,
//               },
//             },
//             baseTerritory: {
//               data: {
//                 type: "territories" as const,
//                 id: territory,
//               },
//             },
//             manualPrices: {
//               data: currentManualPrices.map((price: any) => ({
//                 type: "appPrices" as const,
//                 id: price.id,
//               })),
//             },
//           },
//         },
//         included: currentManualPrices.map((price: any) => ({
//           type: "appPrices" as const,
//           id: price.id,
//           attributes: {
//             startDate: new Date().toISOString().split("T")[0],
//             manual: true,
//             // No endDate = permanent
//           },
//           relationships: {
//             appPricePoint: {
//               data: {
//                 type: "appPricePoints" as const,
//                 id: price.relationships?.appPricePoint?.data?.id,
//               },
//             },
//             territory: {
//               data: {
//                 type: "territories" as const,
//                 id: price.relationships?.territory?.data?.id,
//               },
//             },
//           },
//         })),
//       },
//     });

//     if (response.error) {
//       logger.error(
//         `Failed to update app base territory: ${JSON.stringify(response.error)}`
//       );
//       throw new Error(
//         `Failed to update app base territory: ${
//           response.error.errors?.[0]?.detail || "Unknown error"
//         }`
//       );
//     }

//     logger.info(`Successfully updated app base territory to ${territory}`);
//   } catch (error) {
//     logger.error(`Error updating app base territory: ${error}`);
//     throw error;
//   }
// }

// // Create app price schedule from scratch (when no pricing exists)
// export async function createAppPriceSchedule(
//   priceSchedule: z.infer<typeof PriceScheduleSchema>,
//   appId: string
// ): Promise<void> {
//   logger.info(
//     `Creating app price schedule with base territory ${priceSchedule.baseTerritory} for app ${appId}`
//   );

//   try {
//     // Create manual price IDs for all territories in the price schedule
//     const manualPrices = [];
//     const includedPrices = [];

//     for (const priceEntry of priceSchedule.prices) {
//       const pricePointId = await findAppPricePointId(
//         priceEntry.price,
//         priceEntry.territory,
//         appId
//       );

//       // Use a temporary ID for this request
//       const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

//       manualPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//       });

//       includedPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//         attributes: {
//           manual: true,
//           startDate: null,
//           endDate: null,
//         },
//         relationships: {
//           appPricePoint: {
//             data: {
//               type: "appPricePoints" as const,
//               id: pricePointId,
//             },
//           },
//           territory: {
//             data: {
//               type: "territories" as const,
//               id: priceEntry.territory,
//             },
//           },
//         },
//       });
//     }

//     // Create a new price schedule with the base territory and all prices
//     const response = await api.POST("/v1/appPriceSchedules", {
//       body: {
//         data: {
//           type: "appPriceSchedules" as const,
//           relationships: {
//             app: {
//               data: {
//                 type: "apps" as const,
//                 id: appId,
//               },
//             },
//             baseTerritory: {
//               data: {
//                 type: "territories" as const,
//                 id: priceSchedule.baseTerritory,
//               },
//             },
//             manualPrices: {
//               data: manualPrices,
//             },
//           },
//         },
//         included: includedPrices,
//       },
//     });

//     if (response.error) {
//       logger.error(
//         `Failed to create app price schedule: ${JSON.stringify(response.error)}`
//       );
//       throw new Error(
//         `Failed to create app price schedule: ${
//           response.error.errors?.[0]?.detail || "Unknown error"
//         }`
//       );
//     }

//     logger.info(
//       `Successfully created app price schedule with base territory ${priceSchedule.baseTerritory}`
//     );
//   } catch (error) {
//     logger.error(`Error creating app price schedule: ${error}`);
//     throw error;
//   }
// }

// // Create app price by updating the existing price schedule
// export async function createAppPrice(
//   price: Price,
//   appId: string,
//   desiredState: AppStoreModel
// ): Promise<void> {
//   logger.info(
//     `Creating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
//   );

//   try {
//     // Check if a price schedule already exists
//     const currentPriceScheduleId = await getAppPriceScheduleId(appId);
//     const allPrices = desiredState.pricing?.prices;

//     if (!allPrices || allPrices.length === 0) {
//       throw new Error("No prices found in desired state");
//     }

//     if (!desiredState.pricing?.baseTerritory) {
//       throw new Error("No base territory found in desired state");
//     }

//     // Create manual price IDs for all territories in the desired state
//     const manualPrices = [];
//     const includedPrices = [];
//     const processedTerritories = new Set<string>();

//     for (const priceEntry of allPrices) {
//       const pricePointId = await findAppPricePointId(
//         priceEntry.price,
//         priceEntry.territory,
//         appId
//       );

//       // Use a temporary ID for this request
//       const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

//       manualPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//       });

//       includedPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//         attributes: {
//           manual: true,
//           startDate: null,
//           endDate: null,
//         },
//         relationships: {
//           appPricePoint: {
//             data: {
//               type: "appPricePoints" as const,
//               id: pricePointId,
//             },
//           },
//           territory: {
//             data: {
//               type: "territories" as const,
//               id: priceEntry.territory,
//             },
//           },
//         },
//       });

//       processedTerritories.add(priceEntry.territory);
//     }

//     // Determine the base territory
//     let baseTerritory: string;
//     if (currentPriceScheduleId) {
//       // If price schedule exists, get the current base territory
//       baseTerritory = await getBaseTerritory(currentPriceScheduleId);

//       // Check if base territory is changing
//       const desiredBaseTerritory = desiredState.pricing.baseTerritory;
//       const baseTerritoryChanging = baseTerritory !== desiredBaseTerritory;

//       // If base territory is changing and current base territory is not in desired prices,
//       // temporarily include the current base territory price to satisfy Apple's requirement
//       if (baseTerritoryChanging && !processedTerritories.has(baseTerritory)) {
//         // Get current prices to find the current base territory price
//         const currentManualPrices = await getCurrentManualPrices(
//           currentPriceScheduleId
//         );
//         const currentBaseTerritoryPrice = currentManualPrices.find(
//           (p: any) => p.relationships?.territory?.data?.id === baseTerritory
//         );

//         if (currentBaseTerritoryPrice) {
//           const tempPriceId = `temp-price-${baseTerritory}-${Date.now()}`;

//           manualPrices.push({
//             type: "appPrices" as const,
//             id: tempPriceId,
//           });

//           includedPrices.push({
//             type: "appPrices" as const,
//             id: tempPriceId,
//             attributes: {
//               manual: true,
//               startDate: null,
//               endDate: null,
//             },
//             relationships: {
//               appPricePoint: {
//                 data: {
//                   type: "appPricePoints" as const,
//                   id: currentBaseTerritoryPrice.relationships?.appPricePoint
//                     ?.data?.id,
//                 },
//               },
//               territory: {
//                 data: {
//                   type: "territories" as const,
//                   id: baseTerritory,
//                 },
//               },
//             },
//           });

//           logger.info(
//             `Temporarily including current base territory ${baseTerritory} price during creation`
//           );
//         }
//       }
//     } else {
//       // If no price schedule exists, use the base territory from desired state
//       baseTerritory = desiredState.pricing.baseTerritory;
//     }

//     // Create a new price schedule with all the desired prices
//     const response = await api.POST("/v1/appPriceSchedules", {
//       body: {
//         data: {
//           type: "appPriceSchedules" as const,
//           relationships: {
//             app: {
//               data: {
//                 type: "apps" as const,
//                 id: appId,
//               },
//             },
//             baseTerritory: {
//               data: {
//                 type: "territories" as const,
//                 id: baseTerritory, // Use current base territory until it's explicitly updated
//               },
//             },
//             manualPrices: {
//               data: manualPrices,
//             },
//           },
//         },
//         included: includedPrices,
//       },
//     });

//     if (response.error) {
//       logger.error(
//         `Failed to create app price: ${JSON.stringify(response.error)}`
//       );
//       throw new Error(
//         `Failed to create app price: ${
//           response.error.errors?.[0]?.detail || "Unknown error"
//         }`
//       );
//     }

//     logger.info(
//       `Successfully created app price for territory ${price.territory}`
//     );
//   } catch (error) {
//     logger.error(`Error creating app price: ${error}`);
//     throw error;
//   }
// }

// // Update app price by updating the existing price schedule
// export async function updateAppPrice(
//   price: Price,
//   appId: string,
//   desiredState: AppStoreModel
// ): Promise<void> {
//   logger.info(
//     `Updating app price for territory ${price.territory} with price ${price.price} for app ${appId}`
//   );

//   try {
//     // Get current price schedule details
//     const currentPriceScheduleId = await getAppPriceScheduleId(appId);

//     if (!currentPriceScheduleId) {
//       throw new Error(
//         "Cannot update price when no price schedule exists. " +
//           "Create prices first before updating them."
//       );
//     }

//     const allPrices = desiredState.pricing?.prices;

//     if (!allPrices || allPrices.length === 0) {
//       throw new Error("No prices found in desired state");
//     }

//     // Get current base territory and check if it's changing
//     const currentBaseTerritory = await getBaseTerritory(currentPriceScheduleId);
//     const desiredBaseTerritory = desiredState.pricing?.baseTerritory;
//     const baseTerritoryChanging = currentBaseTerritory !== desiredBaseTerritory;

//     // Create manual price IDs for all territories in the desired state
//     const manualPrices = [];
//     const includedPrices = [];
//     const processedTerritories = new Set<string>();

//     for (const priceEntry of allPrices) {
//       const pricePointId = await findAppPricePointId(
//         priceEntry.price,
//         priceEntry.territory,
//         appId
//       );

//       // Use a temporary ID for this request
//       const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

//       manualPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//       });

//       includedPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//         attributes: {
//           manual: true,
//           startDate: null,
//           endDate: null,
//         },
//         relationships: {
//           appPricePoint: {
//             data: {
//               type: "appPricePoints" as const,
//               id: pricePointId,
//             },
//           },
//           territory: {
//             data: {
//               type: "territories" as const,
//               id: priceEntry.territory,
//             },
//           },
//         },
//       });

//       processedTerritories.add(priceEntry.territory);
//     }

//     // If base territory is changing and current base territory is not in desired prices,
//     // temporarily include the current base territory price to satisfy Apple's requirement
//     if (
//       baseTerritoryChanging &&
//       !processedTerritories.has(currentBaseTerritory)
//     ) {
//       // Get current prices to find the current base territory price
//       const currentManualPrices = await getCurrentManualPrices(
//         currentPriceScheduleId
//       );
//       const currentBaseTerritoryPrice = currentManualPrices.find(
//         (p: any) =>
//           p.relationships?.territory?.data?.id === currentBaseTerritory
//       );

//       if (currentBaseTerritoryPrice) {
//         const tempPriceId = `temp-price-${currentBaseTerritory}-${Date.now()}`;

//         manualPrices.push({
//           type: "appPrices" as const,
//           id: tempPriceId,
//         });

//         includedPrices.push({
//           type: "appPrices" as const,
//           id: tempPriceId,
//           attributes: {
//             manual: true,
//             startDate: null,
//             endDate: null,
//           },
//           relationships: {
//             appPricePoint: {
//               data: {
//                 type: "appPricePoints" as const,
//                 id: currentBaseTerritoryPrice.relationships?.appPricePoint?.data
//                   ?.id,
//               },
//             },
//             territory: {
//               data: {
//                 type: "territories" as const,
//                 id: currentBaseTerritory,
//               },
//             },
//           },
//         });

//         logger.info(
//           `Temporarily including current base territory ${currentBaseTerritory} price during update`
//         );
//       }
//     }

//     // Create a new price schedule with all the prices (including temporary base territory price if needed)
//     const response = await api.POST("/v1/appPriceSchedules", {
//       body: {
//         data: {
//           type: "appPriceSchedules" as const,
//           relationships: {
//             app: {
//               data: {
//                 type: "apps" as const,
//                 id: appId,
//               },
//             },
//             baseTerritory: {
//               data: {
//                 type: "territories" as const,
//                 id: currentBaseTerritory, // Use current base territory until it's explicitly updated
//               },
//             },
//             manualPrices: {
//               data: manualPrices,
//             },
//           },
//         },
//         included: includedPrices,
//       },
//     });

//     if (response.error) {
//       logger.error(
//         `Failed to update app price: ${JSON.stringify(response.error)}`
//       );
//       throw new Error(
//         `Failed to update app price: ${
//           response.error.errors?.[0]?.detail || "Unknown error"
//         }`
//       );
//     }

//     logger.info(
//       `Successfully updated app price for territory ${price.territory}`
//     );
//   } catch (error) {
//     logger.error(`Error updating app price: ${error}`);
//     throw error;
//   }
// }

// // Delete app price by updating the existing price schedule
// export async function deleteAppPrice(
//   territory: Territory,
//   appId: string,
//   desiredState: AppStoreModel
// ): Promise<void> {
//   logger.info(`Deleting app price for territory ${territory} for app ${appId}`);

//   try {
//     // Get current price schedule details
//     const currentPriceScheduleId = await getAppPriceScheduleId(appId);

//     if (!currentPriceScheduleId) {
//       throw new Error("Cannot delete price when no price schedule exists.");
//     }

//     const allPrices = desiredState.pricing?.prices;

//     if (!allPrices || allPrices.length === 0) {
//       throw new Error("No prices found in desired state");
//     }

//     // Get current base territory and check if it's changing
//     const currentBaseTerritory = await getBaseTerritory(currentPriceScheduleId);
//     const desiredBaseTerritory = desiredState.pricing?.baseTerritory;
//     const baseTerritoryChanging = currentBaseTerritory !== desiredBaseTerritory;

//     // Create manual price IDs for all territories in the desired state
//     // (excluding the territory to be deleted)
//     const manualPrices = [];
//     const includedPrices = [];
//     const processedTerritories = new Set<string>();

//     for (const priceEntry of allPrices) {
//       const pricePointId = await findAppPricePointId(
//         priceEntry.price,
//         priceEntry.territory,
//         appId
//       );

//       // Use a temporary ID for this request
//       const tempPriceId = `temp-price-${priceEntry.territory}-${Date.now()}`;

//       manualPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//       });

//       includedPrices.push({
//         type: "appPrices" as const,
//         id: tempPriceId,
//         attributes: {
//           manual: true,
//           startDate: null,
//           endDate: null,
//         },
//         relationships: {
//           appPricePoint: {
//             data: {
//               type: "appPricePoints" as const,
//               id: pricePointId,
//             },
//           },
//           territory: {
//             data: {
//               type: "territories" as const,
//               id: priceEntry.territory,
//             },
//           },
//         },
//       });

//       processedTerritories.add(priceEntry.territory);
//     }

//     // If base territory is changing and current base territory is not in desired prices,
//     // temporarily include the current base territory price to satisfy Apple's requirement
//     if (
//       baseTerritoryChanging &&
//       !processedTerritories.has(currentBaseTerritory)
//     ) {
//       // Get current prices to find the current base territory price
//       const currentManualPrices = await getCurrentManualPrices(
//         currentPriceScheduleId
//       );
//       const currentBaseTerritoryPrice = currentManualPrices.find(
//         (p: any) =>
//           p.relationships?.territory?.data?.id === currentBaseTerritory
//       );

//       if (currentBaseTerritoryPrice) {
//         const tempPriceId = `temp-price-${currentBaseTerritory}-${Date.now()}`;

//         manualPrices.push({
//           type: "appPrices" as const,
//           id: tempPriceId,
//         });

//         includedPrices.push({
//           type: "appPrices" as const,
//           id: tempPriceId,
//           attributes: {
//             manual: true,
//             startDate: null,
//             endDate: null,
//           },
//           relationships: {
//             appPricePoint: {
//               data: {
//                 type: "appPricePoints" as const,
//                 id: currentBaseTerritoryPrice.relationships?.appPricePoint?.data
//                   ?.id,
//               },
//             },
//             territory: {
//               data: {
//                 type: "territories" as const,
//                 id: currentBaseTerritory,
//               },
//             },
//           },
//         });

//         logger.info(
//           `Temporarily including current base territory ${currentBaseTerritory} price during deletion`
//         );
//       }
//     }

//     // Get base territory for the new price schedule
//     const baseTerritory = await getBaseTerritory(currentPriceScheduleId);

//     // Create a new price schedule with all the desired prices
//     const response = await api.POST("/v1/appPriceSchedules", {
//       body: {
//         data: {
//           type: "appPriceSchedules" as const,
//           relationships: {
//             app: {
//               data: {
//                 type: "apps" as const,
//                 id: appId,
//               },
//             },
//             baseTerritory: {
//               data: {
//                 type: "territories" as const,
//                 id: baseTerritory,
//               },
//             },
//             manualPrices: {
//               data: manualPrices,
//             },
//           },
//         },
//         included: includedPrices,
//       },
//     });

//     if (response.error) {
//       logger.error(
//         `Failed to delete app price: ${JSON.stringify(response.error)}`
//       );
//       throw new Error(
//         `Failed to delete app price: ${
//           response.error.errors?.[0]?.detail || "Unknown error"
//         }`
//       );
//     }

//     logger.info(`Successfully deleted app price for territory ${territory}`);
//   } catch (error) {
//     logger.error(`Error deleting app price: ${error}`);
//     throw error;
//   }
// }
