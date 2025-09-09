import * as jwt from "jsonwebtoken";
import { logger } from "@semihcihan/shared";
import { ContextualError } from "@semihcihan/shared";

export type AuthContext = "default" | "fallback";

export interface AuthCredentials {
  privateKey: string;
  keyId: string;
  issuerId: string;
}

export interface AuthToken {
  token: string;
  expiration: number;
}

const TOKEN_LIFETIME_SECONDS = 15 * 60; // 15 minutes, max is 20
const TOKEN_REFRESH_MARGIN_SECONDS = 60; // 1 minute

class AuthContextManager {
  private credentials: Map<AuthContext, AuthCredentials> = new Map();
  private tokens: Map<AuthContext, AuthToken> = new Map();
  private privateKeys: Map<AuthContext, string> = new Map();

  constructor() {
    this.initializeDefaultCredentials();
    this.initializeFallbackCredentials();
  }

  private initializeDefaultCredentials(): void {
    const privateKey = process.env.ASC_PRIVATE_KEY;
    const keyId = process.env.ASC_KEY_ID;
    const issuerId = process.env.ASC_ISSUER_ID;

    if (!privateKey || !keyId || !issuerId) {
      throw new ContextualError(
        "Missing App Store Connect API credentials. Please check your .env file for ASC_PRIVATE_KEY, ASC_KEY_ID, and ASC_ISSUER_ID.",
        {
          ASC_PRIVATE_KEY: privateKey,
          ASC_KEY_ID: keyId,
          ASC_ISSUER_ID: issuerId,
        }
      );
    }

    this.credentials.set("default", {
      privateKey,
      keyId,
      issuerId,
    });
  }

  private initializeFallbackCredentials(): void {
    const fallbackPrivateKey = process.env.FALLBACK_ASC_PRIVATE_KEY;
    const fallbackKeyId = process.env.FALLBACK_ASC_KEY_ID;
    const fallbackIssuerId = process.env.FALLBACK_ASC_ISSUER_ID;

    if (fallbackPrivateKey && fallbackKeyId && fallbackIssuerId) {
      this.credentials.set("fallback", {
        privateKey: fallbackPrivateKey,
        keyId: fallbackKeyId,
        issuerId: fallbackIssuerId,
      });
      logger.debug("Fallback App Store Connect API credentials loaded");
    } else {
      logger.debug(
        "Fallback App Store Connect API credentials not found in environment"
      );
    }
  }

  private getPrivateKey(context: AuthContext): string {
    if (this.privateKeys.has(context)) {
      return this.privateKeys.get(context)!;
    }

    const credentials = this.credentials.get(context);
    if (!credentials) {
      throw new ContextualError(`Auth context '${context}' not found`, {
        context,
      });
    }

    // Always read from environment variable
    const envVarName =
      context === "default" ? "ASC_PRIVATE_KEY" : "FALLBACK_ASC_PRIVATE_KEY";
    const privateKeyFromEnv = process.env[envVarName];

    if (!privateKeyFromEnv) {
      throw new ContextualError(
        `Private key not found in environment variable '${envVarName}' for context '${context}'`,
        { context, envVarName, privateKey: credentials.privateKey }
      );
    }

    this.privateKeys.set(context, privateKeyFromEnv);
    return privateKeyFromEnv;
  }

  private generateNewAuthToken(context: AuthContext): string {
    const credentials = this.credentials.get(context);
    if (!credentials) {
      throw new ContextualError(`Auth context '${context}' not found`, {
        context,
      });
    }

    const now = Math.floor(Date.now() / 1000);
    const expiration = now + TOKEN_LIFETIME_SECONDS;

    const payload = {
      iss: credentials.issuerId,
      iat: now,
      exp: expiration,
      aud: "appstoreconnect-v1",
    };

    const options: jwt.SignOptions = {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: credentials.keyId,
        typ: "JWT",
      },
    };

    const privateKey = this.getPrivateKey(context);
    const token = jwt.sign(payload, privateKey, options);

    this.tokens.set(context, { token, expiration });
    logger.debug(
      `Successfully generated new App Store Connect API token for context '${context}'`
    );

    return token;
  }

  /**
   * Gets a JWT token for the specified auth context.
   * Manages cached tokens, refreshing them when they're about to expire.
   * @param context The auth context to use ("default" or "fallback")
   * @returns A valid JWT token
   */
  getAuthToken(context: AuthContext = "default"): string {
    const now = Math.floor(Date.now() / 1000);
    const cachedToken = this.tokens.get(context);

    if (
      cachedToken &&
      cachedToken.expiration - now > TOKEN_REFRESH_MARGIN_SECONDS
    ) {
      logger.debug(
        `Using cached App Store Connect API token for context '${context}'`
      );
      return cachedToken.token;
    }

    return this.generateNewAuthToken(context);
  }

  /**
   * Forces a new token to be generated for the specified context.
   * This is useful when we get 401 errors and need to reauthenticate.
   * @param context The auth context to refresh
   * @returns A new JWT token
   */
  forceTokenRefresh(context: AuthContext = "default"): string {
    logger.debug(
      `Forcing App Store Connect API token refresh for context '${context}' due to authentication failure`
    );
    this.tokens.delete(context);
    return this.generateNewAuthToken(context);
  }
}

// Lazy-loaded singleton instance
let _authContextManager: AuthContextManager | null = null;

function getAuthContextManager(): AuthContextManager {
  if (!_authContextManager) {
    _authContextManager = new AuthContextManager();
  }
  return _authContextManager;
}

// Export convenience functions for backward compatibility
export function getAuthToken(context?: AuthContext): string {
  return getAuthContextManager().getAuthToken(context);
}

export function forceTokenRefresh(context?: AuthContext): string {
  return getAuthContextManager().forceTokenRefresh(context);
}
