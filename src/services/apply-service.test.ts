import { apply } from "./apply-service";
import { AnyAction } from "../models/diff-plan";
import { AppStoreModelSchema } from "../models/app-store";
import { z } from "zod";

// Mock the services
jest.mock("../domains/availability/service");
jest.mock("../domains/pricing/service");
jest.mock("../domains/in-app-purchases/service");
jest.mock("../domains/in-app-purchases/availability-service");
jest.mock("../domains/in-app-purchases/pricing-service");
jest.mock("../domains/subscriptions/availability-service");
jest.mock("../domains/subscriptions/pricing-service");
jest.mock("../domains/subscriptions/service");
jest.mock("../domains/subscriptions/introductory-offer-service");
jest.mock("../domains/subscriptions/api-client");
jest.mock("../utils/logger");

// Mock the findSubscriptionId function
const mockFindSubscriptionId = jest.fn().mockReturnValue("subscription-123");
jest.mocked(
  require("../domains/subscriptions/pricing-service")
).findSubscriptionId = mockFindSubscriptionId;

// Mock the combineSubscriptionPrices function
const mockCombineSubscriptionPrices = jest
  .fn()
  .mockImplementation((addedPrices, updatedPrices) => {
    return [...addedPrices, ...updatedPrices];
  });
jest.mocked(
  require("../domains/subscriptions/pricing-service")
).combineSubscriptionPrices = mockCombineSubscriptionPrices;

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
const mockCreateSubscriptionPrices = jest.fn();

const mockCreateSubscriptionGroupLocalization = jest.fn();
const mockUpdateSubscriptionGroupLocalization = jest.fn();
const mockDeleteSubscriptionGroupLocalization = jest.fn();
const mockFetchSubscriptionGroups = jest.fn();
const mockCreateIntroductoryOffer = jest.fn();
const mockDeleteIntroductoryOffer = jest.fn();
const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Set up mocks
jest.mocked(require("../domains/availability/service")).updateAppAvailability =
  mockUpdateAppAvailability;
jest.mocked(require("../domains/pricing/service")).createAppPriceSchedule =
  mockCreateAppPriceSchedule;
jest.mocked(
  require("../domains/in-app-purchases/service")
).createNewInAppPurchase = mockCreateNewInAppPurchase;
jest.mocked(
  require("../domains/in-app-purchases/service")
).updateExistingInAppPurchase = mockUpdateExistingInAppPurchase;
jest.mocked(
  require("../domains/in-app-purchases/service")
).createIAPLocalization = mockCreateIAPLocalization;
jest.mocked(
  require("../domains/in-app-purchases/service")
).updateIAPLocalization = mockUpdateIAPLocalization;
jest.mocked(
  require("../domains/in-app-purchases/service")
).deleteIAPLocalization = mockDeleteIAPLocalization;
jest.mocked(
  require("../domains/in-app-purchases/availability-service")
).updateIAPAvailability = mockUpdateIAPAvailability;
jest.mocked(
  require("../domains/subscriptions/availability-service")
).updateSubscriptionAvailability = mockUpdateSubscriptionAvailability;
jest.mocked(
  require("../domains/in-app-purchases/api-client")
).fetchInAppPurchases = mockFetchInAppPurchases;
jest.mocked(
  require("../domains/subscriptions/service")
).createNewSubscriptionGroup = mockCreateNewSubscriptionGroup;
jest.mocked(
  require("../domains/subscriptions/service")
).updateExistingSubscriptionGroup = mockUpdateExistingSubscriptionGroup;

jest.mocked(
  require("../domains/subscriptions/service")
).createSubscriptionGroupLocalization = mockCreateSubscriptionGroupLocalization;
jest.mocked(
  require("../domains/subscriptions/service")
).updateSubscriptionGroupLocalization = mockUpdateSubscriptionGroupLocalization;
jest.mocked(
  require("../domains/subscriptions/service")
).deleteSubscriptionGroupLocalization = mockDeleteSubscriptionGroupLocalization;
jest.mocked(
  require("../domains/subscriptions/api-client")
).fetchSubscriptionGroups = mockFetchSubscriptionGroups;
jest.mocked(
  require("../domains/subscriptions/pricing-service")
).createSubscriptionPrices = mockCreateSubscriptionPrices;
jest.mocked(
  require("../domains/subscriptions/introductory-offer-service")
).createIntroductoryOffer = mockCreateIntroductoryOffer;
jest.mocked(
  require("../domains/subscriptions/introductory-offer-service")
).deleteIntroductoryOffer = mockDeleteIntroductoryOffer;
jest.mocked(require("../utils/logger")).logger = mockLogger;

type AppStoreModel = z.infer<typeof AppStoreModelSchema>;

const MOCK_CURRENT_STATE: AppStoreModel = {
  schemaVersion: "1.0.0",
  appId: "test-app-id",
  copyright: undefined,
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
  copyright: undefined,
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
    mockCreateSubscriptionPrices.mockResolvedValue(undefined);
    mockCreateIntroductoryOffer.mockResolvedValue(undefined);
    mockDeleteIntroductoryOffer.mockResolvedValue(undefined);
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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      // Should not log detailed pricing changes - that's the responsibility of the pricing service
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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

      // Should not call any services
      expect(mockCreateAppPriceSchedule).not.toHaveBeenCalled();
      expect(mockUpdateAppAvailability).not.toHaveBeenCalled();

      // Should complete successfully
      expect(mockLogger.debug).toHaveBeenCalled();
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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      await apply(plan, MOCK_CURRENT_STATE, MOCK_DESIRED_STATE);

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

      await apply(plan, MOCK_CURRENT_STATE, desiredStateWithoutPricing);

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
    copyright: undefined,
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
    copyright: undefined,
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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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
    copyright: undefined,
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
    copyright: undefined,
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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

    await apply([action], mockCurrentState, mockDesiredState);

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

  it("should handle CREATE_SUBSCRIPTION_PRICE action", async () => {
    // Mock subscription groups response with a subscription
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [
        {
          type: "subscriptions",
          id: "subscription-123",
          attributes: {
            productId: "test-subscription",
          },
        },
      ],
      links: { self: "" },
    });

    const action: AnyAction = {
      type: "CREATE_SUBSCRIPTION_PRICE",
      payload: {
        subscriptionProductId: "test-subscription",
        changes: {
          addedPrices: [
            { territory: "USA", price: "4.99" },
            { territory: "GBR", price: "3.99" },
          ],
          updatedPrices: [{ territory: "DEU", price: "4.49" }],
        },
      },
    };

    await apply([action], mockCurrentState, mockDesiredState);

    // Should fetch subscription groups
    expect(mockFetchSubscriptionGroups).toHaveBeenCalledWith(testAppId);

    // Should call createSubscriptionPrices with the subscription ID and all prices
    expect(mockCreateSubscriptionPrices).toHaveBeenCalledWith(
      "subscription-123",
      [
        { territory: "USA", price: "4.99" },
        { territory: "GBR", price: "3.99" },
        { territory: "DEU", price: "4.49" },
      ]
    );

    // Should execute the action successfully
    expect(mockLogger.info).toHaveBeenCalled();
  });

  it("should handle CREATE_SUBSCRIPTION_PRICE action with newly created subscription", async () => {
    // Mock subscription groups response without the subscription (it will be in newlyCreatedSubscriptions)
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [],
      links: { self: "" },
    });

    const action: AnyAction = {
      type: "CREATE_SUBSCRIPTION_PRICE",
      payload: {
        subscriptionProductId: "test-subscription",
        changes: {
          addedPrices: [{ territory: "USA", price: "4.99" }],
          updatedPrices: [],
        },
      },
    };

    // Create a plan that first creates the subscription, then creates its pricing
    const plan: AnyAction[] = [
      {
        type: "CREATE_SUBSCRIPTION",
        payload: {
          groupReferenceName: "test-group",
          subscription: {
            productId: "test-subscription",
            referenceName: "test-subscription",
            familySharable: false,
            groupLevel: 1,
            subscriptionPeriod: "ONE_MONTH",
            localizations: [],
            prices: [],
            availability: {
              availableInNewTerritories: true,
              availableTerritories: [],
            },
          },
        },
      },
      action,
    ];

    // Mock the createNewSubscription to return a subscription ID
    mockCreateNewSubscriptionGroup.mockResolvedValue("subscription-123");

    // Mock the createNewSubscription function from subscription service
    const mockCreateNewSubscription = jest
      .fn()
      .mockResolvedValue("subscription-123");
    jest.mocked(
      require("../domains/subscriptions/service")
    ).createNewSubscription = mockCreateNewSubscription;

    await apply(plan, mockCurrentState, mockDesiredState);

    // Should call createSubscriptionPrices with the subscription ID from newlyCreatedSubscriptions
    expect(mockCreateSubscriptionPrices).toHaveBeenCalledWith(
      "subscription-123",
      [{ territory: "USA", price: "4.99" }]
    );
  });

  it("should handle CREATE_INTRODUCTORY_OFFER action", async () => {
    // Mock subscription groups response with a subscription
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [
        {
          type: "subscriptions",
          id: "subscription-123",
          attributes: {
            productId: "test-subscription",
          },
        },
      ],
      links: { self: "" },
    });

    const action: AnyAction = {
      type: "CREATE_INTRODUCTORY_OFFER",
      payload: {
        subscriptionProductId: "test-subscription",
        subscriptionPeriod: "ONE_MONTH",
        offer: {
          type: "FREE_TRIAL",
          duration: "ONE_MONTH",
          availableTerritories: ["USA", "GBR"],
        },
      },
    };

    await apply([action], mockCurrentState, mockDesiredState);

    expect(mockFetchSubscriptionGroups).toHaveBeenCalledWith(testAppId);
    expect(mockCreateIntroductoryOffer).toHaveBeenCalledWith(
      "test-subscription",
      "ONE_MONTH", // subscription period
      {
        type: "FREE_TRIAL",
        duration: "ONE_MONTH",
        availableTerritories: ["USA", "GBR"],
      },
      expect.any(Map), // newlyCreatedSubscriptions
      expect.objectContaining({
        data: expect.any(Array),
        included: expect.any(Array),
        links: expect.any(Object),
      }) // currentSubscriptionGroupsResponse
    );
  });

  it("should handle DELETE_INTRODUCTORY_OFFER action", async () => {
    // Mock subscription groups response with a subscription
    mockFetchSubscriptionGroups.mockResolvedValue({
      data: [],
      included: [
        {
          type: "subscriptions",
          id: "subscription-123",
          attributes: {
            productId: "test-subscription",
          },
        },
      ],
      links: { self: "" },
    });

    const action: AnyAction = {
      type: "DELETE_INTRODUCTORY_OFFER",
      payload: {
        subscriptionProductId: "test-subscription",
        offer: {
          type: "PAY_AS_YOU_GO",
          numberOfPeriods: 3,
          prices: [
            { territory: "USA", price: "0.99" },
            { territory: "GBR", price: "0.79" },
          ],
          availableTerritories: ["USA", "GBR"],
        },
      },
    };

    await apply([action], mockCurrentState, mockDesiredState);

    expect(mockFetchSubscriptionGroups).toHaveBeenCalledWith(testAppId);
    expect(mockDeleteIntroductoryOffer).toHaveBeenCalledWith(
      "test-subscription",
      {
        type: "PAY_AS_YOU_GO",
        numberOfPeriods: 3,
        prices: [
          { territory: "USA", price: "0.99" },
          { territory: "GBR", price: "0.79" },
        ],
        availableTerritories: ["USA", "GBR"],
      },
      expect.any(Map), // newlyCreatedSubscriptions
      expect.objectContaining({
        data: expect.any(Array),
        included: expect.any(Array),
        links: expect.any(Object),
      }) // currentSubscriptionGroupsResponse
    );
  });
});
