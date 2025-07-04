import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { logger } from "../utils/logger";

dotenv.config();

const privateKey = process.env.APP_STORE_CONNECT_API_PRIVATE_KEY;
const keyId = process.env.APP_STORE_CONNECT_API_KEY_ID;
const issuerId = process.env.APP_STORE_CONNECT_API_ISSUER_ID;

if (!privateKey || !keyId || !issuerId) {
  logger.error(
    "Missing App Store Connect API credentials. Please check your .env file for APP_STORE_CONNECT_API_PRIVATE_KEY, APP_STORE_CONNECT_API_KEY_ID, and APP_STORE_CONNECT_API_ISSUER_ID."
  );
  process.exit(1);
}

/**
 * Generates a JWT token for App Store Connect API authentication.
 * The token is valid for 15 minutes.
 * @returns The generated JWT.
 */
export function generateAuthToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const expirationTime = now + 15 * 60; // 15 minutes

  const payload = {
    iss: issuerId!,
    iat: now,
    exp: expirationTime,
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

  const token = jwt.sign(payload, privateKey!.replace(/\\n/g, "\n"), options);
  logger.info("Successfully generated App Store Connect API token.");
  return token;
}
