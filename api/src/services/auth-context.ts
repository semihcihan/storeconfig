import * as jwt from "jsonwebtoken";
import { logger } from "@semihcihan/shared";
import { ContextualError } from "@semihcihan/shared";

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

/**
 * Generates a JWT token for Apple App Store Connect API authentication.
 * This is a standalone function that can be used with any credentials.
 * @param credentials The Apple credentials (keyId, issuerId, privateKey)
 * @param now Optional timestamp in seconds. If not provided, uses current time.
 * @returns A JWT token string
 */
export function generateAppleJWT(
  credentials: AuthCredentials,
  now?: number
): string {
  const timestamp = now ?? Math.floor(Date.now() / 1000);
  const expiration = timestamp + TOKEN_LIFETIME_SECONDS;

  const payload = {
    iss: credentials.issuerId,
    iat: timestamp,
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

  return jwt.sign(payload, credentials.privateKey, options);
}

export class AuthContextManager {
  private tokens: Map<string, AuthToken> = new Map();

  private getTokenKey(credentials: AuthCredentials): string {
    return `${credentials.keyId}:${credentials.issuerId}`;
  }

  private environmentCredentials(): AuthCredentials {
    const privateKey = process.env.ASC_PRIVATE_KEY;
    const keyId = process.env.ASC_KEY_ID;
    const issuerId = process.env.ASC_ISSUER_ID;

    if (!privateKey || !keyId || !issuerId) {
      throw new ContextualError(
        "Missing App Store Connect API credentials. Please run 'storeconfig apple --key-path /path/to/key.p8' to add your credentials. Check https://storeconfig.com/docs for more information."
      );
    }

    return {
      privateKey,
      keyId,
      issuerId,
    };
  }

  private generateNewAuthToken(): string {
    const credentials = this.environmentCredentials();

    const now = Math.floor(Date.now() / 1000);
    const token = generateAppleJWT(credentials, now);

    const tokenKey = this.getTokenKey(credentials);
    const expiration = now + TOKEN_LIFETIME_SECONDS;
    this.tokens.set(tokenKey, {
      token,
      expiration,
    });
    logger.debug(
      `Successfully generated new App Store Connect API token with keyId '${credentials.keyId}'`
    );

    return token;
  }

  /**
   * Gets a JWT token for the locally configured Apple credentials.
   * Manages cached tokens, refreshing them when they're about to expire.
   * @returns A valid JWT token
   */
  getAuthToken(): string {
    const credentials = this.environmentCredentials();

    const tokenKey = this.getTokenKey(credentials);
    const cachedToken = this.tokens.get(tokenKey);

    const now = Math.floor(Date.now() / 1000);
    if (
      cachedToken &&
      cachedToken.expiration - now > TOKEN_REFRESH_MARGIN_SECONDS
    ) {
      logger.debug(
        `Using cached App Store Connect API token with keyId '${credentials.keyId}'`
      );
      return cachedToken.token;
    }

    return this.generateNewAuthToken();
  }

  /**
   * Forces a new token to be generated.
   * This is useful when we get 401 errors and need to reauthenticate.
   * @returns A new JWT token
   */
  forceTokenRefresh(): string {
    return this.generateNewAuthToken();
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
export function getAuthToken(): string {
  return getAuthContextManager().getAuthToken();
}

export function forceTokenRefresh(): string {
  return getAuthContextManager().forceTokenRefresh();
}
