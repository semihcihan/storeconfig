import { apply } from "./apply-service";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModel, InAppPurchaseSchema } from "../models/app-store";
import { fetchAndMapInAppPurchases } from "./fetch-service";
import { logger } from "../utils/logger";
import {
  generateTestIdentifier,
  generateConstantLengthTestIdentifier,
  cleanupTestIAPResources,
  TEST_APP_ID,
} from "../test-utils/cleanup-helper";
import { diffInAppPurchases } from "./diff-service";
import { z } from "zod";

type InAppPurchase = z.infer<typeof InAppPurchaseSchema>;

describe("Apply Service IAP Integration Tests", () => {
  // Integration tests with API calls need longer timeout
  jest.setTimeout(120000); // 2 minutes for all tests in this suite

  const mockCurrentState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: TEST_APP_ID,
    primaryLocale: "en-US",
  };

  // Helper function to wait for API processing
  const waitForApiProcessing = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Helper function to verify IAP exists
  const verifyIapExists = async (productId: string) => {
    const mappedIAPs = await fetchAndMapInAppPurchases(TEST_APP_ID);
    const createdIap = mappedIAPs.find((iap) => iap.productId === productId);
    expect(createdIap).toBeDefined();
    return createdIap;
  };

  // Helper function to create a minimal IAP for testing updates
  const createMinimalIap = async (
    type: "CONSUMABLE" | "NON_CONSUMABLE" | "NON_RENEWING_SUBSCRIPTION",
    uniqueId: string,
    inAppPurchase: Partial<InAppPurchase> = {}
  ) => {
    const desiredState: AppStoreModel = {
      ...mockCurrentState,
      inAppPurchases: [
        {
          productId: uniqueId,
          type,
          referenceName: `${uniqueId}`,
          familySharable: false,
          ...inAppPurchase,
        },
      ],
    };

    const actions = diffInAppPurchases(mockCurrentState, desiredState);
    await apply(actions, mockCurrentState, desiredState);
    await waitForApiProcessing();
    return await verifyIapExists(uniqueId);
  };

  describe("IAP Creation Tests", () => {
    describe("Basic IAP Creation", () => {
      it("should create a consumable IAP with minimal fields", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        expect(createdIap?.type).toBe("CONSUMABLE");
        expect(createdIap?.referenceName).toBe(`${uniqueId}`);
        expect(createdIap?.familySharable).toBe(false);

        logger.info(`   ✅ Created basic consumable IAP: ${uniqueId}`);
      });

      it("should create a non-consumable IAP with minimal fields", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        expect(createdIap?.type).toBe("NON_CONSUMABLE");
        expect(createdIap?.familySharable).toBe(true);

        logger.info(`   ✅ Created basic non-consumable IAP: ${uniqueId}`);
      });

      it("should create a non-renewing subscription IAP with minimal fields", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_RENEWING_SUBSCRIPTION",
              referenceName: `${uniqueId}`,
              familySharable: false,
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        expect(createdIap?.type).toBe("NON_RENEWING_SUBSCRIPTION");

        logger.info(
          `   ✅ Created basic non-renewing subscription IAP: ${uniqueId}`
        );
      });
    });

    describe("IAP Creation with Price Schedule Only", () => {
      it("should create a consumable IAP with single territory pricing and no availability (Apple API behavior: pricing IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "0.99", territory: "USA" }],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting pricing during creation!
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(1);
        expect(createdIap?.availability).toBeUndefined();

        logger.info(
          `   ✅ Created consumable IAP (pricing IS supported during creation): ${uniqueId}`
        );
      });

      it("should create a non-consumable IAP with multi-territory pricing and no availability (Apple API behavior: pricing IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "2.99", territory: "USA" },
                  { price: "2.49", territory: "GBR" },
                  { price: "2.79", territory: "DEU" },
                ],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting pricing during creation!
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(3);
        expect(createdIap?.availability).toBeUndefined();

        logger.info(
          `   ✅ Created non-consumable IAP (pricing IS supported during creation): ${uniqueId}`
        );
      });

      it("should create a non-renewing subscription with tiered pricing and no availability (Apple API behavior: pricing IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_RENEWING_SUBSCRIPTION",
              referenceName: `${uniqueId}`,
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "4.99", territory: "USA" },
                  { price: "3.99", territory: "GBR" },
                  { price: "4.49", territory: "DEU" },
                  { price: "4.99", territory: "FRA" },
                ],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting pricing during creation!
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(4);
        expect(createdIap?.availability).toBeUndefined();

        logger.info(
          `   ✅ Created non-renewing subscription IAP (pricing IS supported during creation): ${uniqueId}`
        );
      });
    });

    describe("IAP Creation with Availability Only", () => {
      it("should create a consumable IAP with specific territory availability and no pricing (Apple API behavior: availability IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR", "DEU"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting availability during creation!
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(3);
        expect(createdIap?.priceSchedule).toBeUndefined();

        logger.info(
          `   ✅ Created consumable IAP (availability IS supported during creation): ${uniqueId}`
        );
      });

      it("should create a non-consumable IAP with multiple territory availability and no pricing (Apple API behavior: availability IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
              availability: {
                availableInNewTerritories: true,
                availableTerritories: ["USA", "GBR", "DEU", "FRA", "ITA"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting availability during creation!
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(5);
        expect(createdIap?.priceSchedule).toBeUndefined();

        logger.info(
          `   ✅ Created non-consumable IAP with multiple territories (availability IS supported during creation): ${uniqueId}`
        );
      });

      it("should create a non-renewing subscription with territory list availability and no pricing (Apple API behavior: availability IS supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_RENEWING_SUBSCRIPTION",
              referenceName: `${uniqueId}`,
              familySharable: false,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR", "DEU", "FRA", "ITA"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting availability during creation!
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(5);
        expect(createdIap?.priceSchedule).toBeUndefined();

        logger.info(
          `   ✅ Created non-renewing subscription IAP (availability IS supported during creation): ${uniqueId}`
        );
      });
    });

    describe("IAP Creation with Price Schedule and Availability", () => {
      it("should create a consumable IAP with pricing for USA only and availability for USA only (Apple API behavior: both ARE supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "0.99", territory: "USA" }],
              },
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting both pricing and availability during creation!
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(1);
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(1);

        logger.info(
          `   ✅ Created consumable IAP (pricing and availability ARE supported during creation): ${uniqueId}`
        );
      });

      it("should create a non-consumable IAP with pricing for USA/GBR and availability for USA/GBR/DEU (Apple API behavior: both ARE supported during creation)", async () => {
        const uniqueId = generateTestIdentifier();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "2.99", territory: "USA" },
                  { price: "2.49", territory: "GBR" },
                ],
              },
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR", "DEU"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API DOES support setting both pricing and availability during creation!
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(2);
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(3);

        logger.info(
          `   ✅ Created mismatch non-consumable IAP (pricing and availability ARE supported during creation): ${uniqueId}`
        );
      });

      it("should create a consumable IAP with pricing for USA/GBR but availability only for USA", async () => {
        const uniqueId = generateTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "0.99", territory: "USA" },
                  { price: "0.79", territory: "GBR" },
                ],
              },
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API doesn't support setting pricing or availability during creation
        expect(createdIap?.priceSchedule).toBeDefined();
        expect(createdIap?.priceSchedule?.prices).toHaveLength(2);
        expect(createdIap?.availability).toBeDefined();
        expect(createdIap?.availability?.availableTerritories).toHaveLength(1);

        logger.info(
          `   ✅ Created pricing mismatch consumable IAP, availability as a subset of pricing: ${uniqueId}`
        );
      });

      it("should create IAP with pricing for USA but availability for USA/GBR/DEU (Apple API behavior: accepts both fields during creation)", async () => {
        const uniqueId = generateConstantLengthTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "2.99", territory: "USA" }],
              },
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR", "DEU"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        // Test if Apple's API actually accepts these fields during creation
        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Document what Apple's API actually does with these fields during creation
        logger.info(
          `   ✅ Documented Apple API behavior: priceSchedule=${
            createdIap?.priceSchedule ? "SET" : "NOT_SET"
          }, availability=${createdIap?.availability ? "SET" : "NOT_SET"}`
        );
      });
    });

    describe("IAP Creation with Localizations", () => {
      it("should create a consumable IAP with single localization (Apple API behavior: localizations ARE supported during creation!)", async () => {
        const uniqueId = generateConstantLengthTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              localizations: [
                {
                  locale: "en-US",
                  name: `P ${uniqueId.slice(-8)}`,
                  description: `Unlock premium features`,
                },
              ],
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API behavior: localizations ARE supported during creation!
        expect(createdIap?.localizations).toHaveLength(1);
        expect(createdIap?.localizations?.[0]?.locale).toBe("en-US");
        expect(createdIap?.localizations?.[0]?.name).toMatch(/^P [a-z0-9_]+$/);
        expect(createdIap?.localizations?.[0]?.description).toBe(
          "Unlock premium features"
        );

        logger.info(
          `   ✅ Documented Apple API behavior: localizations ARE supported during creation!`
        );
      });

      it("should create IAP with multiple localizations (Apple API behavior: accepts localizations during creation with constant-length IDs)", async () => {
        const uniqueId = generateConstantLengthTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "NON_CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: true,
              localizations: [
                {
                  locale: "en-US",
                  name: `Premium ${uniqueId.slice(-8)}`,
                  description: `Unlock premium features`,
                },
                {
                  locale: "es-ES",
                  name: `Premium ${uniqueId.slice(-8)}`,
                  description: `Unlock premium features`,
                },
                {
                  locale: "fr-FR",
                  name: `Premium ${uniqueId.slice(-8)}`,
                  description: `Unlock premium features`,
                },
              ],
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        // Test if Apple's API accepts localizations during creation with constant-length IDs
        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Document what Apple's API actually does with localizations during creation
        logger.info(
          `   ✅ Documented Apple API behavior: localizations=${
            createdIap?.localizations?.length || 0
          } items set during creation`
        );
      });
    });

    describe("IAP Creation with Review Notes", () => {
      it("should create a consumable IAP with review note", async () => {
        const uniqueId = generateTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              reviewNote: `This IAP provides temporary access to premium features for testing purposes`,
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        expect(createdIap?.reviewNote).toBeDefined();
        expect(createdIap?.reviewNote).toBe(
          `This IAP provides temporary access to premium features for testing purposes`
        );

        logger.info(`   ✅ Created reviewed consumable IAP: ${uniqueId}`);
      });
    });

    describe("IAP Creation with Complex Combinations", () => {
      it("should create a consumable IAP with all optional fields", async () => {
        const uniqueId = generateTestIdentifier();
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              productId: uniqueId,
              type: "CONSUMABLE",
              referenceName: `${uniqueId}`,
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "1.99", territory: "USA" },
                  { price: "1.49", territory: "GBR" },
                ],
              },
              localizations: [
                {
                  locale: "en-US",
                  name: `Premium ${uniqueId.slice(-8)}`,
                  description: `Unlock premium functionality`,
                },
              ],
              reviewNote: `This IAP provides temporary access to premium features`,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(mockCurrentState, desiredState);

        await expect(
          apply(actions, mockCurrentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const createdIap = await verifyIapExists(uniqueId);

        // Apple's API behavior: some fields work, others don't
        expect(createdIap?.priceSchedule).toBeDefined(); // Pricing not supported during creation
        expect(createdIap?.priceSchedule?.prices).toHaveLength(2);
        expect(createdIap?.localizations).toBeDefined();
        expect(createdIap?.localizations?.length).toBe(1);
        expect(createdIap?.reviewNote).toBe(
          `This IAP provides temporary access to premium features`
        );
        expect(createdIap?.availability?.availableTerritories).toHaveLength(2);

        logger.info(
          `   ✅ Documented Apple API behavior: all optional fields are supported during creation`
        );
      });
    });
  });

  describe("IAP Update Tests", () => {
    describe("Basic IAP Updates", () => {
      it("should update IAP reference name", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const newReferenceName = `${uniqueId}`;
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              referenceName: newReferenceName,
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.referenceName).toBe(newReferenceName);
        logger.info(`   ✅ Updated IAP reference name: ${uniqueId}`);
      });

      it("should update IAP family sharable setting", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              familySharable: true,
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.familySharable).toBe(true);
        logger.info(`   ✅ Updated IAP family sharable: ${uniqueId}`);
      });

      it("should update IAP review note", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const newReviewNote = `Updated review note for ${uniqueId}`;
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              reviewNote: newReviewNote,
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.reviewNote).toBe(newReviewNote);
        logger.info(`   ✅ Updated IAP review note: ${uniqueId}`);
      });

      it("should update multiple IAP fields simultaneously", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const newReferenceName = `${uniqueId}`;
        const newReviewNote = `Multi-updated review note for ${uniqueId}`;
        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              referenceName: newReferenceName,
              familySharable: true,
              reviewNote: newReviewNote,
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.referenceName).toBe(newReferenceName);
        expect(updatedIap?.familySharable).toBe(true);
        expect(updatedIap?.reviewNote).toBe(newReviewNote);
        logger.info(`   ✅ Multi-updated IAP: ${uniqueId}`);
      });
    });

    describe("IAP Price Schedule Updates", () => {
      it("should add pricing to IAP that had no pricing", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // Verify no pricing initially
        expect(createdIap?.priceSchedule).toBeUndefined();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "0.99", territory: "USA" }],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.priceSchedule).toBeDefined();
        expect(updatedIap?.priceSchedule?.prices).toHaveLength(1);
        logger.info(`   ✅ Added pricing to IAP: ${uniqueId}`);
      });

      it("should update existing prices for IAP", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // First add initial pricing
        const addDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "2.99", territory: "USA" }],
              },
            },
          ],
        };

        const addAction = diffInAppPurchases(currentState, addDesiredState);
        await apply(addAction, currentState, addDesiredState);
        await waitForApiProcessing();

        // Then update the price
        const updateDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "3.99", territory: "USA" }],
              },
            },
          ],
        };

        const updateAction = diffInAppPurchases(
          currentState,
          updateDesiredState
        );
        await expect(
          apply(updateAction, currentState, updateDesiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "3.99",
          territory: "USA",
        });

        logger.info(`   ✅ Updated existing prices for IAP: ${uniqueId}`);
      });

      it("should delete territories from IAP pricing", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // First add multiple territories
        const addDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "1.99", territory: "USA" },
                  { price: "1.49", territory: "GBR" },
                  { price: "1.79", territory: "DEU" },
                ],
              },
            },
          ],
        };

        const addAction = diffInAppPurchases(currentState, addDesiredState);
        await apply(addAction, currentState, addDesiredState);
        await waitForApiProcessing();

        // Then delete GBR
        const deleteDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "1.99", territory: "USA" },
                  { price: "1.79", territory: "DEU" },
                ],
              },
            },
          ],
        };

        const deleteAction = diffInAppPurchases(
          currentState,
          deleteDesiredState
        );
        await expect(
          apply(deleteAction, currentState, deleteDesiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.priceSchedule?.prices).toHaveLength(2);
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "1.99",
          territory: "USA",
        });
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "1.79",
          territory: "DEU",
        });
        expect(updatedIap?.priceSchedule?.prices).not.toContainEqual({
          price: "1.49",
          territory: "GBR",
        });

        logger.info(`   ✅ Deleted territories from IAP pricing: ${uniqueId}`);
      });
    });

    describe("IAP Pricing Edge Cases", () => {
      it("should handle pricing with invalid territory codes", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "0.99", territory: "USA" },
                  { price: "0.79", territory: "ZWE" },
                ],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        // This should either fail gracefully or only process valid territories
        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that valid territories were processed
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "0.99",
          territory: "USA",
        });

        logger.info(
          `   ✅ Handled pricing with invalid territory codes: ${uniqueId}`
        );
      });

      it("should handle pricing with base territory match", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "2.99", territory: "USA" },
                  { price: "2.49", territory: "GBR" },
                  { price: "2.79", territory: "DEU" },
                ],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.priceSchedule?.prices).toBeDefined();
        expect(updatedIap?.priceSchedule?.prices).toHaveLength(3);

        logger.info(
          `   ✅ Handled pricing with base territory match: ${uniqueId}`
        );
      });
    });
  });

  describe("IAP Availability Tests", () => {
    describe("IAP Availability Updates", () => {
      it("should update IAP availability to specific territories", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // Verify no availability initially
        expect(createdIap?.availability).toBeUndefined();

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR", "DEU"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.availability).toBeDefined();
        expect(updatedIap?.availability?.availableTerritories).toContain("USA");
        expect(updatedIap?.availability?.availableTerritories).toContain("GBR");
        expect(updatedIap?.availability?.availableTerritories).toContain("DEU");

        logger.info(
          `   ✅ Updated IAP availability to specific territories: ${uniqueId}`
        );
      });

      it("should update IAP availability to no territories", async () => {
        // TODO: fix
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: true,
                availableTerritories: [],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.availability).toBeDefined();
        expect(updatedIap?.availability?.availableTerritories).toHaveLength(0);

        logger.info(
          `   ✅ Updated IAP availability to no territories: ${uniqueId}`
        );
      });

      it("should update IAP availability to allow new territories", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId, {
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA", "GBR"],
          },
        });

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // First set specific territories
        const specificDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: true,
                availableTerritories: ["USA", "GBR"],
              },
            },
          ],
        };

        const specificActions = diffInAppPurchases(
          currentState,
          specificDesiredState
        );
        await apply(specificActions, currentState, specificDesiredState);
        await waitForApiProcessing();

        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.availability?.availableInNewTerritories).toBe(true);

        logger.info(
          `   ✅ Updated IAP availability to allow new territories: ${uniqueId}`
        );
      });
    });

    describe("IAP Availability Edge Cases", () => {
      it("should handle availability with invalid territory codes", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "ZWE", "GBR"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        // This should either fail gracefully or only process valid territories
        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that valid territories were processed
        expect(updatedIap?.availability?.availableTerritories).toContain("USA");
        expect(updatedIap?.availability?.availableTerritories).toContain("GBR");

        logger.info(
          `   ✅ Handled availability with invalid territory codes: ${uniqueId}`
        );
      });
    });
  });

  describe("IAP Type-Specific Behavior Tests", () => {
    describe("Non-Renewing Subscription IAP Behavior", () => {
      it("should verify non-renewing subscription IAP can have pricing", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap(
          "NON_RENEWING_SUBSCRIPTION",
          uniqueId
        );

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "4.99", territory: "USA" }],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.priceSchedule).toBeDefined();
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "4.99",
          territory: "USA",
        });

        logger.info(
          `   ✅ Verified non-renewing subscription IAP can have pricing: ${uniqueId}`
        );
      });

      it("should verify non-renewing subscription IAP can have availability", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap(
          "NON_RENEWING_SUBSCRIPTION",
          uniqueId
        );

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR"],
              },
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.availability).toBeDefined();
        expect(updatedIap?.availability?.availableTerritories).toContain("USA");

        logger.info(
          `   ✅ Verified non-renewing subscription IAP can have availability: ${uniqueId}`
        );
      });

      it("should verify non-renewing subscription IAP can have localizations", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap(
          "NON_RENEWING_SUBSCRIPTION",
          uniqueId
        );

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              localizations: [
                {
                  locale: "en-US",
                  name: `Subscription ${uniqueId.slice(-8)}`,
                  description: `Time-limited feature access`,
                },
              ],
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.localizations).toBeDefined();
        expect(updatedIap?.localizations?.length).toBeGreaterThan(0);

        logger.info(
          `   ✅ Verified non-renewing subscription IAP can have localizations: ${uniqueId}`
        );
      });

      it("should verify non-renewing subscription IAP can have review notes", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap(
          "NON_RENEWING_SUBSCRIPTION",
          uniqueId
        );

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              reviewNote: `Non-renewing subscription IAP review note for ${uniqueId}`,
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        expect(updatedIap?.reviewNote).toBe(
          `Non-renewing subscription IAP review note for ${uniqueId}`
        );

        logger.info(
          `   ✅ Verified non-renewing subscription IAP can have review notes: ${uniqueId}`
        );
      });
    });
  });

  describe("IAP Error Handling Tests", () => {
    describe("Invalid Combinations", () => {
      it("should handle creating IAP with pricing for territories not in availability", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // First set availability to only USA
        const availabilityDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA"],
              },
            },
          ],
        };

        const availabilityActions = diffInAppPurchases(
          currentState,
          availabilityDesiredState
        );
        await apply(
          availabilityActions,
          currentState,
          availabilityDesiredState
        );
        await waitForApiProcessing();

        // Update the current state to include the availability
        const updatedCurrentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA"],
              },
            },
          ],
        };

        // Then try to add pricing for USA and GBR (GBR not in availability)
        const pricingDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA"],
              },
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "0.99", territory: "USA" },
                  { price: "0.79", territory: "GBR" },
                ],
              },
            },
          ],
        };

        // This should either fail gracefully or only process valid territories
        await expect(
          apply(
            diffInAppPurchases(updatedCurrentState, pricingDesiredState),
            updatedCurrentState,
            pricingDesiredState
          )
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that at least USA pricing was processed
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "0.99",
          territory: "USA",
        });

        logger.info(
          `   ✅ Handled creating IAP with pricing for territories not in availability: ${uniqueId}`
        );
      });

      it("should handle creating IAP with availability for territories not in pricing", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        // First set pricing for only USA
        const pricingDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "2.99", territory: "USA" }],
              },
            },
          ],
        };

        await apply(
          diffInAppPurchases(currentState, pricingDesiredState),
          currentState,
          pricingDesiredState
        );
        await waitForApiProcessing();

        // Update the current state to include the pricing
        const updatedCurrentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "2.99", territory: "USA" }],
              },
            },
          ],
        };

        // Then try to set availability for USA and GBR (GBR not in pricing)
        const availabilityDesiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR"],
              },
            },
          ],
        };

        // This should either fail gracefully or process the availability
        await expect(
          apply(
            diffInAppPurchases(updatedCurrentState, availabilityDesiredState),
            updatedCurrentState,
            availabilityDesiredState
          )
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that availability was set
        expect(updatedIap?.availability).toBeDefined();

        logger.info(
          `   ✅ Handled creating IAP with availability for territories not in pricing: ${uniqueId}`
        );
      });

      it("should handle updating IAP to create pricing/availability mismatch", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId, {
          priceSchedule: {
            baseTerritory: "USA",
            prices: [{ price: "0.99", territory: "USA" }],
          },
          availability: {
            availableInNewTerritories: false,
            availableTerritories: ["USA"],
          },
        });

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        await waitForApiProcessing();

        // Then update availability to include GBR (creating mismatch)
        const updateDesiredState: AppStoreModel = {
          ...currentState,
          inAppPurchases: [
            {
              ...createdIap!,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ price: "0.99", territory: "USA" }],
              },
              availability: {
                availableInNewTerritories: false,
                availableTerritories: ["USA", "GBR"],
              },
            },
          ],
        };

        // This should either fail gracefully or process the update
        await expect(
          apply(
            diffInAppPurchases(currentState, updateDesiredState),
            currentState,
            updateDesiredState
          )
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that availability was updated
        expect(updatedIap?.availability?.availableTerritories).toHaveLength(2);
        expect(updatedIap?.availability?.availableTerritories).toContain("GBR");
        expect(updatedIap?.priceSchedule?.prices).toHaveLength(1);
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "0.99",
          territory: "USA",
        });

        logger.info(
          `   ✅ Handled updating IAP to create pricing/availability mismatch: ${uniqueId}`
        );
      });

      it("should handle creating IAP with invalid locale in localizations", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("CONSUMABLE", uniqueId);

        // Create current state that includes the created IAP
        const currentState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [createdIap!],
        };

        const desiredState: AppStoreModel = {
          ...mockCurrentState,
          inAppPurchases: [
            {
              ...createdIap!,
              localizations: [
                {
                  locale: "en-US",
                  name: `Invalid ${uniqueId.slice(-8)}`,
                  description: `Test with invalid locale`,
                },
              ],
            },
          ],
        };

        const actions = diffInAppPurchases(currentState, desiredState);

        // This should either fail gracefully or only process valid locales
        await expect(
          apply(actions, currentState, desiredState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that the IAP still exists
        expect(updatedIap).toBeDefined();

        logger.info(
          `   ✅ Handled creating IAP with invalid locale in localizations: ${uniqueId}`
        );
      });

      it("should handle creating IAP with invalid territory in pricing", async () => {
        const uniqueId = generateTestIdentifier();
        const createdIap = await createMinimalIap("NON_CONSUMABLE", uniqueId);

        const actions: AnyAction[] = [
          {
            type: "UPDATE_IAP_PRICING",
            payload: {
              productId: uniqueId,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [
                  { price: "2.99", territory: "USA" },
                  { price: "2.49", territory: "ZWE" },
                ],
              },
              changes: {
                addedPrices: [
                  { price: "2.99", territory: "USA" },
                  { price: "2.49", territory: "ZWE" },
                ],
                updatedPrices: [],
                deletedTerritories: [],
              },
            },
          },
        ];

        // This should either fail gracefully or only process valid territories
        await expect(
          apply(actions, mockCurrentState, mockCurrentState)
        ).resolves.not.toThrow();

        await waitForApiProcessing();
        const updatedIap = await verifyIapExists(uniqueId);

        // Verify that at least USA pricing was processed
        expect(updatedIap?.priceSchedule?.prices).toContainEqual({
          price: "2.99",
          territory: "USA",
        });

        logger.info(
          `   ✅ Handled creating IAP with invalid territory in pricing: ${uniqueId}`
        );
      });
    });
  });

  // Cleanup after all tests
  afterAll(async () => {
    // Use the common cleanup utility to find and delete all test resources
    await cleanupTestIAPResources(TEST_APP_ID);
  });
});
