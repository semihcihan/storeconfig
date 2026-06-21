import * as jwt from "jsonwebtoken";
import { ContextualError } from "@semihcihan/shared";
import { AuthContextManager } from "./auth-context";

// Mock the shared logger
jest.mock("@semihcihan/shared", () => ({
  logger: {
    debug: jest.fn(),
  },
  ContextualError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ContextualError";
    }
  },
}));

// Mock jsonwebtoken
jest.mock("jsonwebtoken");

describe("AuthContext", () => {
  const originalEnv = process.env;
  const mockJwt = jwt as jest.Mocked<typeof jwt>;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const setupEnvironmentCredentials = (
    keyId: string,
    issuerId: string,
    privateKey: string
  ) => {
    process.env.ASC_KEY_ID = keyId;
    process.env.ASC_ISSUER_ID = issuerId;
    process.env.ASC_PRIVATE_KEY = privateKey;
  };

  const mockTokenGeneration = (token: string) => {
    mockJwt.sign.mockImplementation(() => token);
  };

  // Helper to create a fresh AuthContextManager instance
  const createAuthContextManager = () => {
    return new AuthContextManager();
  };

  describe("getAuthToken", () => {
    it("should generate a new token when no cached token exists", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const expectedToken = "generated-token-1";
      mockTokenGeneration(expectedToken);

      const manager = createAuthContextManager();
      const token = manager.getAuthToken();

      expect(token).toBe(expectedToken);
      expect(mockJwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          iss: "issuer1",
          aud: "appstoreconnect-v1",
        }),
        "private-key-1",
        expect.objectContaining({
          algorithm: "ES256",
          header: {
            alg: "ES256",
            kid: "key1",
            typ: "JWT",
          },
        })
      );
    });

    it("should return cached token when it's still valid", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const expectedToken = "cached-token";
      mockTokenGeneration(expectedToken);

      const manager = createAuthContextManager();

      // First call generates the token
      const token1 = manager.getAuthToken();
      expect(token1).toBe(expectedToken);

      // Second call should return the cached token
      const token2 = manager.getAuthToken();
      expect(token2).toBe(expectedToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(1);
    });

    it("should generate new token when cached token is about to expire", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const cachedToken = "cached-token";
      const newToken = "new-token";

      const manager = createAuthContextManager();

      // First call generates the cached token
      mockJwt.sign.mockImplementationOnce(() => cachedToken);
      manager.getAuthToken();

      // Advance time to make token expire (within refresh margin)
      const now = Math.floor(Date.now() / 1000);
      jest.spyOn(Date, "now").mockReturnValue((now + 900) * 1000); // 15 minutes later

      // Mock new token generation
      mockJwt.sign.mockImplementation(() => newToken);

      // Second call should generate a new token
      const token = manager.getAuthToken();
      expect(token).toBe(newToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(2);
    });

    it("should throw error when default credentials are missing", () => {
      // Clear environment variables
      delete process.env.ASC_KEY_ID;
      delete process.env.ASC_ISSUER_ID;
      delete process.env.ASC_PRIVATE_KEY;

      const manager = createAuthContextManager();

      expect(() => manager.getAuthToken()).toThrow(ContextualError);
      expect(() => manager.getAuthToken()).toThrow(
        "Missing App Store Connect API credentials"
      );
    });
  });

  describe("forceTokenRefresh", () => {
    it("should always generate a new token", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const firstToken = "first-token";
      const secondToken = "second-token";

      mockJwt.sign.mockImplementationOnce(() => firstToken);

      const manager = createAuthContextManager();

      // First call
      const token1 = manager.forceTokenRefresh();
      expect(token1).toBe(firstToken);

      // Mock second token generation
      mockJwt.sign.mockImplementation(() => secondToken);

      // Second call should generate a new token even if first is still valid
      const token2 = manager.forceTokenRefresh();
      expect(token2).toBe(secondToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(2);
    });
  });

  describe("Environment switching scenario", () => {
    it("should generate different tokens for different environments with different key/issuer combinations", () => {
      // Setup first environment
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const firstToken = "token-for-env1";
      mockJwt.sign.mockImplementationOnce(() => firstToken);

      const manager = createAuthContextManager();

      // Get token for first environment
      const token1 = manager.getAuthToken();
      expect(token1).toBe(firstToken);
      expect(mockJwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          iss: "issuer1",
        }),
        "private-key-1",
        expect.objectContaining({
          header: expect.objectContaining({
            kid: "key1",
          }),
        })
      );

      // Change environment (simulate different key/issuer)
      setupEnvironmentCredentials("key2", "issuer2", "private-key-2");
      const secondToken = "token-for-env2";
      mockJwt.sign.mockImplementation(() => secondToken);

      // Get token for second environment before first expires
      const token2 = manager.getAuthToken();
      expect(token2).toBe(secondToken);
      expect(token2).not.toBe(token1);

      // Verify the second token was generated with different credentials
      expect(mockJwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          iss: "issuer2",
        }),
        "private-key-2",
        expect.objectContaining({
          header: expect.objectContaining({
            kid: "key2",
          }),
        })
      );

      // Should have been called twice (once for each environment)
      expect(mockJwt.sign).toHaveBeenCalledTimes(2);
    });

    it("should maintain separate token caches for different key/issuer combinations", () => {
      // Setup first environment
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const firstToken = "token-for-env1";
      mockJwt.sign.mockImplementationOnce(() => firstToken);

      const manager = createAuthContextManager();

      // Get token for first environment
      const token1a = manager.getAuthToken();
      const token1b = manager.getAuthToken();
      expect(token1a).toBe(firstToken);
      expect(token1b).toBe(firstToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(1);

      // Change environment
      setupEnvironmentCredentials("key2", "issuer2", "private-key-2");
      const secondToken = "token-for-env2";
      mockJwt.sign.mockImplementation(() => secondToken);

      // Get token for second environment
      const token2a = manager.getAuthToken();
      const token2b = manager.getAuthToken();
      expect(token2a).toBe(secondToken);
      expect(token2b).toBe(secondToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(2);

      // Switch back to first environment - should still have cached token
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");
      const token1c = manager.getAuthToken();
      expect(token1c).toBe(firstToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(2); // Still only 2 calls
    });

    it("should handle rapid environment switches correctly", () => {
      const tokens: string[] = [];
      const manager = createAuthContextManager();

      // Rapidly switch between environments
      for (let i = 0; i < 5; i++) {
        const keyId = `key${i}`;
        const issuerId = `issuer${i}`;
        const privateKey = `private-key-${i}`;
        const expectedToken = `token-${i}`;

        setupEnvironmentCredentials(keyId, issuerId, privateKey);
        mockJwt.sign.mockImplementation(() => expectedToken);

        const token = manager.getAuthToken();
        tokens.push(token);

        expect(token).toBe(expectedToken);
        expect(mockJwt.sign).toHaveBeenCalledWith(
          expect.objectContaining({
            iss: issuerId,
          }),
          privateKey,
          expect.objectContaining({
            header: expect.objectContaining({
              kid: keyId,
            }),
          })
        );
      }

      // All tokens should be different
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(5);
      expect(mockJwt.sign).toHaveBeenCalledTimes(5);
    });
  });

  describe("Token expiration and refresh", () => {
    it("should refresh token when it's within refresh margin", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");

      const firstToken = "first-token";
      const secondToken = "second-token";

      const manager = createAuthContextManager();

      // First call - generate token
      mockJwt.sign.mockImplementationOnce(() => firstToken);
      manager.getAuthToken();

      // Advance time to make token expire (within refresh margin)
      const now = Math.floor(Date.now() / 1000);
      jest.spyOn(Date, "now").mockReturnValue((now + 900) * 1000); // 15 minutes later

      // Mock second token generation
      mockJwt.sign.mockImplementation(() => secondToken);

      // Second call should refresh
      const token = manager.getAuthToken();
      expect(token).toBe(secondToken);
      expect(mockJwt.sign).toHaveBeenCalledTimes(2);
    });

    it("should not refresh token when it's well within validity period", () => {
      setupEnvironmentCredentials("key1", "issuer1", "private-key-1");

      // Mock token with long expiration
      const now = Math.floor(Date.now() / 1000);
      const expiration = now + 600; // 10 minutes from now
      const token = "valid-token";

      // Mock Date.now to return a specific timestamp
      jest.spyOn(Date, "now").mockReturnValue(now * 1000);
      mockTokenGeneration(token);

      const manager = createAuthContextManager();

      // Multiple calls should return same token
      const token1 = manager.getAuthToken();
      const token2 = manager.getAuthToken();
      const token3 = manager.getAuthToken();

      expect(token1).toBe(token);
      expect(token2).toBe(token);
      expect(token3).toBe(token);
      expect(mockJwt.sign).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error handling", () => {
    it("should handle JWT signing errors", () => {
      setupEnvironmentCredentials("key1", "issuer1", "invalid-private-key");
      mockJwt.sign.mockImplementation(() => {
        throw new Error("Invalid private key");
      });

      const manager = createAuthContextManager();

      expect(() => manager.getAuthToken()).toThrow("Invalid private key");
    });

    it("should handle missing environment variables gracefully", () => {
      // Test missing ASC_KEY_ID
      process.env.ASC_ISSUER_ID = "issuer1";
      process.env.ASC_PRIVATE_KEY = "private-key-1";
      delete process.env.ASC_KEY_ID;

      const manager1 = createAuthContextManager();
      expect(() => manager1.getAuthToken()).toThrow(ContextualError);

      // Test missing ASC_ISSUER_ID
      process.env.ASC_KEY_ID = "key1";
      delete process.env.ASC_ISSUER_ID;

      const manager2 = createAuthContextManager();
      expect(() => manager2.getAuthToken()).toThrow(ContextualError);

      // Test missing ASC_PRIVATE_KEY
      process.env.ASC_ISSUER_ID = "issuer1";
      delete process.env.ASC_PRIVATE_KEY;

      const manager3 = createAuthContextManager();
      expect(() => manager3.getAuthToken()).toThrow(ContextualError);
    });
  });
});
