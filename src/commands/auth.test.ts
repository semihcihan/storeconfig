import { configService, StoreKitConfig } from "../services/config-service";

describe("ConfigService", () => {
  const originalHomedir = process.env.HOME;

  beforeEach(() => {
    // Mock os.homedir() to use a test directory
    jest.spyOn(require("os"), "homedir").mockReturnValue("/tmp/test-home");
    // Clear any existing config before each test
    configService.clearAuth();
  });

  afterEach(() => {
    // Restore original homedir
    if (originalHomedir) {
      process.env.HOME = originalHomedir;
    }
  });

  describe("loadConfig", () => {
    it("should return empty config when file does not exist", () => {
      const config = configService.loadConfig();
      expect(config).toEqual({});
    });

    it("should load existing config from file", () => {
      const testConfig: StoreKitConfig = {
        apiKey: "test-api-key",
      };

      configService.saveConfig(testConfig);
      const loadedConfig = configService.loadConfig();

      expect(loadedConfig).toEqual(testConfig);
    });
  });

  describe("saveConfig", () => {
    it("should save config to file", () => {
      const testConfig: StoreKitConfig = {
        apiKey: "test-api-key",
      };

      configService.saveConfig(testConfig);
      const loadedConfig = configService.loadConfig();

      expect(loadedConfig.apiKey).toBe("test-api-key");
    });
  });

  describe("API key methods", () => {
    it("should get and set API key", () => {
      const apiKey = "test-api-key-123";

      configService.setApiKey(apiKey);
      const retrievedKey = configService.getApiKey();

      expect(retrievedKey).toBe(apiKey);
    });
  });

  describe("clearAuth", () => {
    it("should clear all authentication data", () => {
      const testConfig: StoreKitConfig = {
        apiKey: "test-api-key",
      };

      configService.saveConfig(testConfig);
      configService.clearAuth();
      const clearedConfig = configService.loadConfig();

      expect(clearedConfig.apiKey).toBeUndefined();
    });
  });

  describe("isAuthenticated", () => {
    it("should return false when no API key is stored", () => {
      expect(configService.isAuthenticated()).toBe(false);
    });

    it("should return true when API key is stored", () => {
      configService.setApiKey("test-api-key");
      expect(configService.isAuthenticated()).toBe(true);
    });
  });
});
