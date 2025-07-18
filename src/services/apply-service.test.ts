import { apply } from "./apply-service";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";

// Mock the services
jest.mock("./apply/app-availability-service");
jest.mock("./apply/app-pricing-service");
jest.mock("./apply/in-app-purchase-service");
jest.mock("./apply/iap-availability-service");
jest.mock("./apply/subscription-availability-service");
jest.mock("./apply/subscription-service");
jest.mock("../domains/in-app-purchases/api-client");
jest.mock("../domains/subscriptions/api-client");
jest.mock("../utils/logger");

// Mock implementations
const mockUpdateAppAvailability = jest.fn();
const mockCreateAppPriceSchedule = jest.fn();
const mockCreateNewInAppPurchase = jest.fn();
const mockUpdateExistingInAppPurchase = jest.fn();
const mockCreateIAPLocalization = jest.fn();
const mockUpdateIAPLocalization = jest.fn();
const mockDeleteIAPLocalization = jest.fn();
const mockUpdateIAPAvailability = jest.fn();
const mockUpdateSubscriptionAvailability = jest.fn();
const mockFetchInAppPurchases = jest.fn();
const mockCreateNewSubscriptionGroup = jest.fn();
const mockUpdateExistingSubscriptionGroup = jest.fn();

const mockCreateSubscriptionGroupLocalization = jest.fn();
const mockUpdateSubscriptionGroupLocalization = jest.fn();
const mockDeleteSubscriptionGroupLocalization = jest.fn();
const mockFetchSubscriptionGroups = jest.fn();
const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set up mocks
jest.mocked(require("./apply/app-availability-service")).updateAppAvailability =
  mockUpdateAppAvailability;
jest.mocked(require("./apply/app-pricing-service")).createAppPriceSchedule =
  mockCreateAppPriceSchedule;
jest.mocked(require("./apply/in-app-purchase-service")).createNewInAppPurchase =
  mockCreateNewInAppPurchase;
jest.mocked(
  require("./apply/in-app-purchase-service")
).updateExistingInAppPurchase = mockUpdateExistingInAppPurchase;
jest.mocked(require("./apply/in-app-purchase-service")).createIAPLocalization =
  mockCreateIAPLocalization;
jest.mocked(require("./apply/in-app-purchase-service")).updateIAPLocalization =
  mockUpdateIAPLocalization;
jest.mocked(require("./apply/in-app-purchase-service")).deleteIAPLocalization =
  mockDeleteIAPLocalization;
jest.mocked(require("./apply/iap-availability-service")).updateIAPAvailability =
  mockUpdateIAPAvailability;
jest.mocked(
  require("./apply/subscription-availability-service")
).updateSubscriptionAvailability = mockUpdateSubscriptionAvailability;
jest.mocked(
  require("../domains/in-app-purchases/api-client")
).fetchInAppPurchases = mockFetchInAppPurchases;
jest.mocked(
  require("./apply/subscription-service")
).createNewSubscriptionGroup = mockCreateNewSubscriptionGroup;
jest.mocked(
  require("./apply/subscription-service")
).updateExistingSubscriptionGroup = mockUpdateExistingSubscriptionGroup;

jest.mocked(
  require("./apply/subscription-service")
).createSubscriptionGroupLocalization = mockCreateSubscriptionGroupLocalization;
jest.mocked(
  require("./apply/subscription-service")
).updateSubscriptionGroupLocalization = mockUpdateSubscriptionGroupLocalization;
jest.mocked(
  require("./apply/subscription-service")
).deleteSubscriptionGroupLocalization = mockDeleteSubscriptionGroupLocalization;
jest.mocked(
  require("../domains/subscriptions/api-client")
).fetchSubscriptionGroups = mockFetchSubscriptionGroups;
jest.mocked(require("../utils/logger")).logger = mockLogger;

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

const MOCK_CURRENT_STATE: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "test-app-id",
  pricing: {
    baseTerritory: "USA",
    prices: [
      { territory: "USA", price: "4.99" },
      { territory: "CAN", price: "5.99" },
    ],
  },
  availableTerritories: ["USA", "CAN"],
  inAppPurchases: [],
  subscriptionGroups: [],
};

const MOCK_DESIRED_STATE: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "test-app-id",
  pricing: {
    baseTerritory: "GBR",
    prices: [
      { territory: "USA", price: "3.99" },
      { territory: "GBR", price: "3.99" },
      { territory: "DEU", price: "4.49" },
    ],
  },
  availableTerritories: ["USA", "GBR", "DEU"],
  inAppPurchases: [],
  subscriptionGroups: [],
};

describe("apply-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateNewInAppPurchase.mockResolvedValue(undefined);
    mockUpdateExistingInAppPurchase.mockResolvedValue(undefined);
    mockUpdateIAPAvailability.mockResolvedValue(undefined);
    mockUpdateSubscriptionAvailability.mockResolvedValue(undefined);
    mockFetchInAppPurchases.mockResolvedValue({
      data: [],
      included: [],
      links: { self: "" },
    });
    mockCreateNewSubscriptionGroup.mockResolvedValue(undefined);
    mockUpdateExistingSubscriptionGroup.mockResolvedValue(undefined);

    mockCreateSubscriptionGroupLocalization.mockResolvedValue(undefined);
    mockUpdateSubscriptionGroupLocalization.mockResolvedValue(undefined);
    mockDeleteSubscriptionGroupLocalization.mockResolvedValue(undefined);
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [],
      links: { self: "" },
    });
  });

  describe("apply", () => {
    it("should execute UPDATE_APP_PRICING action with detailed logging", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_PRICING",
          payload: {
            priceSchedule: {
              baseTerritory: "GBR",
              prices: [
                { territory: "GBR", price: "3.99" },
                { territory: "USA", price: "3.99" },
              ],
            },
            changes: {
              addedPrices: [{ territory: "GBR", price: "3.99" }],
              updatedPrices: [{ territory: "USA", price: "3.99" }],
              deletedTerritories: ["CAN"],
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should call createAppPriceSchedule once with the priceSchedule from action
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledTimes(1);
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledWith(
        {
          baseTerritory: "GBR",
          prices: [
            { territory: "GBR", price: "3.99" },
            { territory: "USA", price: "3.99" },
          ],
        },
        "test-app-id"
      );

      // Should log detailed pricing changes
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Executing action: UPDATE_APP_PRICING"
      );
      expect(mockLogger.info).toHaveBeenCalledWith("  Pricing changes:");
      expect(mockLogger.info).toHaveBeenCalledWith("    Base Territory: GBR");
      expect(mockLogger.info).toHaveBeenCalledWith("    Added Prices: 1");
      expect(mockLogger.info).toHaveBeenCalledWith("      GBR: 3.99");
      expect(mockLogger.info).toHaveBeenCalledWith("    Updated Prices: 1");
      expect(mockLogger.info).toHaveBeenCalledWith("      USA: 3.99");
      expect(mockLogger.info).toHaveBeenCalledWith(
        "    Deleted Territories: CAN"
      );
    });

    it("should execute UPDATE_APP_PRICING action with priceSchedule for creating from scratch", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_PRICING",
          payload: {
            priceSchedule: {
              baseTerritory: "USA",
              prices: [
                { territory: "USA", price: "4.99" },
                { territory: "CAN", price: "5.99" },
              ],
            },
            changes: {
              addedPrices: [
                { territory: "USA", price: "4.99" },
                { territory: "CAN", price: "5.99" },
              ],
              updatedPrices: [],
              deletedTerritories: [],
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should call createAppPriceSchedule with the schedule from the action
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledTimes(1);
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledWith(
        {
          baseTerritory: "USA",
          prices: [
            { territory: "USA", price: "4.99" },
            { territory: "CAN", price: "5.99" },
          ],
        },
        "test-app-id"
      );
    });

    it("should execute non-pricing actions individually", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_AVAILABILITY",
          payload: { availableTerritories: ["USA", "GBR", "DEU"] },
        },
        {
          type: "CREATE_IN_APP_PURCHASE",
          payload: {
            inAppPurchase: {
              productId: "test-iap",
              type: "CONSUMABLE",
              referenceName: "Test IAP",
              familySharable: false,
              localizations: [
                {
                  locale: "en-US",
                  name: "Test IAP",
                  description: "A test in-app purchase",
                },
              ],
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should call updateAppAvailability for the availability action
      expect(mockUpdateAppAvailability).toHaveBeenCalledTimes(1);
      expect(mockUpdateAppAvailability).toHaveBeenCalledWith(
        ["USA", "GBR", "DEU"],
        "test-app-id",
        MOCK_CURRENT_STATE
      );

      // Should call createNewInAppPurchase for the IAP creation action
      expect(mockCreateNewInAppPurchase).toHaveBeenCalledTimes(1);
      expect(mockCreateNewInAppPurchase).toHaveBeenCalledWith("test-app-id", {
        productId: "test-iap",
        type: "CONSUMABLE",
        referenceName: "Test IAP",
        familySharable: false,
        localizations: [
          {
            locale: "en-US",
            name: "Test IAP",
            description: "A test in-app purchase",
          },
        ],
      });

      // Should not call pricing service for non-pricing actions
      expect(mockCreateAppPriceSchedule).not.toHaveBeenCalled();
    });

    it("should handle mixed pricing and non-pricing actions", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_AVAILABILITY",
          payload: { availableTerritories: ["USA", "GBR", "DEU"] },
        },
        {
          type: "UPDATE_APP_PRICING",
          payload: {
            priceSchedule: {
              baseTerritory: "GBR",
              prices: [
                { territory: "USA", price: "3.99" },
                { territory: "GBR", price: "3.99" },
                { territory: "DEU", price: "4.49" },
              ],
            },
            changes: {
              addedPrices: [{ territory: "GBR", price: "3.99" }],
              updatedPrices: [],
              deletedTerritories: [],
            },
          },
        },
        {
          type: "CREATE_IN_APP_PURCHASE",
          payload: {
            inAppPurchase: {
              productId: "test-iap",
              type: "CONSUMABLE",
              referenceName: "Test IAP",
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ territory: "USA", price: "0.99" }],
              },
              localizations: [],
              availability: {
                availableInNewTerritories: true,
                availableTerritories: [],
              },
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should call pricing service once for the pricing action
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledTimes(1);
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledWith(
        {
          baseTerritory: "GBR",
          prices: [
            { territory: "USA", price: "3.99" },
            { territory: "GBR", price: "3.99" },
            { territory: "DEU", price: "4.49" },
          ],
        },
        "test-app-id"
      );

      // Should call availability service for availability action
      expect(mockUpdateAppAvailability).toHaveBeenCalledTimes(1);
      expect(mockUpdateAppAvailability).toHaveBeenCalledWith(
        ["USA", "GBR", "DEU"],
        "test-app-id",
        MOCK_CURRENT_STATE
      );
    });

    it("should handle empty plan", async () => {
      const plan: AnyAction[] = [];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should not call any services
      expect(mockCreateAppPriceSchedule).not.toHaveBeenCalled();
      expect(mockUpdateAppAvailability).not.toHaveBeenCalled();

      // Should log start and completion
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Applying plan with 0 actions for app test-app-id"
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        "Plan application completed"
      );
    });

    it("should handle plan with only non-pricing actions", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_AVAILABILITY",
          payload: { availableTerritories: ["USA", "GBR"] },
        },
        {
          type: "CREATE_IN_APP_PURCHASE",
          payload: {
            inAppPurchase: {
              productId: "test-iap",
              type: "CONSUMABLE",
              referenceName: "Test IAP",
              familySharable: false,
              priceSchedule: {
                baseTerritory: "USA",
                prices: [{ territory: "USA", price: "0.99" }],
              },
              localizations: [],
              availability: {
                availableInNewTerritories: true,
                availableTerritories: [],
              },
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should not call pricing service
      expect(mockCreateAppPriceSchedule).not.toHaveBeenCalled();

      // Should call availability service
      expect(mockUpdateAppAvailability).toHaveBeenCalledTimes(1);
    });

    it("should handle plan with only pricing actions", async () => {
      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_PRICING",
          payload: {
            priceSchedule: {
              baseTerritory: "GBR",
              prices: [
                { territory: "USA", price: "3.99" },
                { territory: "GBR", price: "3.99" },
                { territory: "DEU", price: "4.49" },
              ],
            },
            changes: {
              addedPrices: [{ territory: "GBR", price: "3.99" }],
              updatedPrices: [],
              deletedTerritories: [],
            },
          },
        },
      ];

      await apply(plan, "test-app-id", MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should call pricing service once
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledTimes(1);

      // Should not call availability service
      expect(mockUpdateAppAvailability).not.toHaveBeenCalled();
    });

    it("should execute UPDATE_APP_PRICING action with priceSchedule even when desired state has no pricing", async () => {
      const desiredStateWithoutPricing = {
        ...MOCK_DESIRED_STATE,
        pricing: undefined,
      };

      const plan: AnyAction[] = [
        {
          type: "UPDATE_APP_PRICING",
          payload: {
            priceSchedule: {
              baseTerritory: "USA",
              prices: [],
            },
            changes: {
              addedPrices: [],
              updatedPrices: [],
              deletedTerritories: ["CAN"],
            },
          },
        },
      ];

      await apply(
        plan,
        "test-app-id",
        MOCK_CURRENT_STATE,
        desiredStateWithoutPricing
      );

      // Should call pricing service with the priceSchedule from action
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledTimes(1);
      expect(mockCreateAppPriceSchedule).toHaveBeenCalledWith(
        {
          baseTerritory: "USA",
          prices: [],
        },
        "test-app-id"
      );
    });
  });
});

describe("IAP Localization Actions", () => {
  const testAppId = "test-app-id";
  const mockCurrentState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: testAppId,
    pricing: {
      baseTerritory: "USA",
      prices: [{ territory: "USA", price: "4.99" }],
    },
    availableTerritories: ["USA"],
    inAppPurchases: [
      {
        productId: "test-iap",
        type: "CONSUMABLE",
        referenceName: "Test IAP",
        familySharable: false,
        localizations: [
          {
            locale: "en-US",
            name: "Test IAP",
            description: "A test in-app purchase",
          },
        ],
      },
    ],
    subscriptionGroups: [],
  };
  const mockDesiredState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: testAppId,
    pricing: {
      baseTerritory: "USA",
      prices: [{ territory: "USA", price: "4.99" }],
    },
    availableTerritories: ["USA"],
    inAppPurchases: [
      {
        productId: "test-iap",
        type: "CONSUMABLE",
        referenceName: "Test IAP",
        familySharable: false,
        localizations: [
          {
            locale: "en-US",
            name: "Test IAP",
            description: "A test in-app purchase",
          },
          {
            locale: "fr-FR",
            name: "Test IAP FR",
            description: "A test in-app purchase FR",
          },
        ],
      },
    ],
    subscriptionGroups: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchInAppPurchases.mockResolvedValue({
      data: [],
      included: [],
      links: { self: "" },
    });
  });

  it("should handle CREATE_IAP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "CREATE_IAP_LOCALIZATION",
      payload: {
        productId: "test-product",
        localization: {
          locale: "en-US",
          name: "Test Product",
          description: "A test product",
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockCreateIAPLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-product",
      {
        locale: "en-US",
        name: "Test Product",
        description: "A test product",
      },
      expect.any(Object), // currentIAPsResponse
      expect.any(Map) // newlyCreatedIAPs
    );
  });

  it("should handle UPDATE_IAP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "UPDATE_IAP_LOCALIZATION",
      payload: {
        productId: "test-product",
        locale: "en-US",
        changes: {
          name: "Updated Product Name",
          description: "Updated description",
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockUpdateIAPLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-product",
      "en-US",
      {
        name: "Updated Product Name",
        description: "Updated description",
      },
      expect.any(Object) // currentIAPsResponse
    );
  });

  it("should handle DELETE_IAP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "DELETE_IAP_LOCALIZATION",
      payload: {
        productId: "test-product",
        locale: "en-US",
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockDeleteIAPLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-product",
      "en-US",
      expect.any(Object) // currentIAPsResponse
    );
  });

  it("should handle UPDATE_IAP_AVAILABILITY action", async () => {
    const action: AnyAction = {
      type: "UPDATE_IAP_AVAILABILITY",
      payload: {
        productId: "test-product",
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA", "GBR", "DEU"],
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockFetchInAppPurchases).toHaveBeenCalledWith(testAppId);
    expect(mockUpdateIAPAvailability).toHaveBeenCalledWith(
      "test-product",
      {
        availableInNewTerritories: true,
        availableTerritories: ["USA", "GBR", "DEU"],
      },
      testAppId,
      expect.objectContaining({
        data: expect.any(Array),
        included: expect.any(Array),
        links: expect.any(Object),
      }),
      expect.any(Map) // newlyCreatedIAPs
    );
  });
});

describe("Subscription Group Actions", () => {
  const testAppId = "test-app-id";
  const mockCurrentState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: testAppId,
    pricing: {
      baseTerritory: "USA",
      prices: [{ territory: "USA", price: "4.99" }],
    },
    availableTerritories: ["USA"],
    inAppPurchases: [],
    subscriptionGroups: [],
  };
  const mockDesiredState: AppStoreModel = {
    schemaVersion: "1.0.0",
    appId: testAppId,
    pricing: {
      baseTerritory: "USA",
      prices: [{ territory: "USA", price: "4.99" }],
    },
    availableTerritories: ["USA"],
    inAppPurchases: [],
    subscriptionGroups: [
      {
        referenceName: "test-group",
        localizations: [
          {
            locale: "en-US",
            name: "Test Group",
            customName: null,
          },
        ],
        subscriptions: [],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [],
      links: { self: "" },
    });
  });

  it("should handle CREATE_SUBSCRIPTION_GROUP action", async () => {
    const action: AnyAction = {
      type: "CREATE_SUBSCRIPTION_GROUP",
      payload: {
        group: {
          referenceName: "test-group",
          localizations: [],
          subscriptions: [],
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockCreateNewSubscriptionGroup).toHaveBeenCalledWith(testAppId, {
      referenceName: "test-group",
      localizations: [],
      subscriptions: [],
    });
  });

  it("should handle UPDATE_SUBSCRIPTION_GROUP action", async () => {
    const action: AnyAction = {
      type: "UPDATE_SUBSCRIPTION_GROUP",
      payload: {
        referenceName: "test-group",
        changes: {
          referenceName: "updated-group",
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockUpdateExistingSubscriptionGroup).toHaveBeenCalledWith(
      testAppId,
      "test-group",
      {
        referenceName: "updated-group",
      },
      expect.any(Object) // currentSubscriptionGroupsResponse
    );
  });

  it("should handle CREATE_SUBSCRIPTION_GROUP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "CREATE_SUBSCRIPTION_GROUP_LOCALIZATION",
      payload: {
        groupReferenceName: "test-group",
        localization: {
          locale: "en-US",
          name: "Test Group",
          customName: null,
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockCreateSubscriptionGroupLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-group",
      {
        locale: "en-US",
        name: "Test Group",
        customName: null,
      },
      expect.any(Object), // currentSubscriptionGroupsResponse
      expect.any(Map) // newlyCreatedSubscriptionGroups
    );
  });

  it("should handle UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "UPDATE_SUBSCRIPTION_GROUP_LOCALIZATION",
      payload: {
        groupReferenceName: "test-group",
        locale: "en-US",
        changes: {
          name: "Updated Group Name",
          customAppName: "Custom App Name",
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockUpdateSubscriptionGroupLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-group",
      "en-US",
      {
        name: "Updated Group Name",
        customAppName: "Custom App Name",
      },
      expect.any(Object), // currentSubscriptionGroupsResponse
      expect.any(Map) // newlyCreatedSubscriptionGroups
    );
  });

  it("should handle DELETE_SUBSCRIPTION_GROUP_LOCALIZATION action", async () => {
    const action: AnyAction = {
      type: "DELETE_SUBSCRIPTION_GROUP_LOCALIZATION",
      payload: {
        groupReferenceName: "test-group",
        locale: "en-US",
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockDeleteSubscriptionGroupLocalization).toHaveBeenCalledWith(
      testAppId,
      "test-group",
      "en-US",
      expect.any(Object), // currentSubscriptionGroupsResponse
      expect.any(Map) // newlyCreatedSubscriptionGroups
    );
  });

  it("should fetch subscription groups when subscription actions are present", async () => {
    const action: AnyAction = {
      type: "CREATE_SUBSCRIPTION_GROUP",
      payload: {
        group: {
          referenceName: "test-group",
          localizations: [],
          subscriptions: [],
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockFetchSubscriptionGroups).toHaveBeenCalledWith(testAppId);
  });

  it("should handle UPDATE_SUBSCRIPTION_AVAILABILITY action", async () => {
    const action: AnyAction = {
      type: "UPDATE_SUBSCRIPTION_AVAILABILITY",
      payload: {
        subscriptionProductId: "test-subscription",
        availability: {
          availableInNewTerritories: true,
          availableTerritories: ["USA", "GBR", "DEU"],
        },
      },
    };

    await apply([action], testAppId, mockCurrentState, mockDesiredState);

    expect(mockFetchSubscriptionGroups).toHaveBeenCalledWith(testAppId);
    expect(mockUpdateSubscriptionAvailability).toHaveBeenCalledWith(
      "test-subscription",
      {
        availableInNewTerritories: true,
        availableTerritories: ["USA", "GBR", "DEU"],
      },
      testAppId,
      expect.objectContaining({
        data: expect.any(Array),
        included: expect.any(Array),
        links: expect.any(Object),
      }),
      expect.any(Map) // newlyCreatedSubscriptions
    );
  });
});
