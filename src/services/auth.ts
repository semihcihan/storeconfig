import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { logger } from "../utils/logger";
import { ContextualError } from "../helpers/error-handling-helpers";

dotenv.config();

const privateKeyPath = process.env.ASC_PRIVATE_KEY_PATH;
const keyId = process.env.ASC_KEY_ID;
const issuerId = process.env.ASC_ISSUER_ID;

if (!privateKeyPath || !keyId || !issuerId) {
  throw new ContextualError(
    "Missing App Store Connect API credentials. Please check your .env file for ASC_PRIVATE_KEY_PATH, ASC_KEY_ID, and ASC_ISSUER_ID.",
    undefined,
    {
      ASC_PRIVATE_KEY_PATH: privateKeyPath,
      ASC_KEY_ID: keyId,
      ASC_ISSUER_ID: issuerId,
    }
  );
}

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

let authToken: string | null = null;
let tokenExpiration: number | null = null;

const TOKEN_LIFETIME_SECONDS = 15 * 60; // 15 minutes, max is 20
const TOKEN_REFRESH_MARGIN_SECONDS = 60; // 1 minute

function generateNewAuthToken(): string {
  const now = Math.floor(Date.now() / 1000);
  tokenExpiration = now + TOKEN_LIFETIME_SECONDS;

  const payload = {
    iss: issuerId!,
    iat: now,
    exp: tokenExpiration,
    aud: "appstoreconnect-v1",
  };

  const options: jwt.SignOptions = {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      kid: keyId!,
      typ: "JWT",
    },
  };

  const token = jwt.sign(payload, privateKey, options);
  logger.debug("Successfully generated new App Store Connect API token.");
  authToken = token;
  return token;
}

/**
 * Gets a JWT token for App Store Connect API authentication.
 * Manages a cached token, refreshing it when it's about to expire.
 * @returns A valid JWT.
 */
export function getAuthToken(): string {
  const now = Math.floor(Date.now() / 1000);
  if (
    authToken &&
    tokenExpiration &&
    tokenExpiration - now > TOKEN_REFRESH_MARGIN_SECONDS
  ) {
    logger.debug("Using cached App Store Connect API token.");
    return authToken;
  }
  return generateNewAuthToken();
}
