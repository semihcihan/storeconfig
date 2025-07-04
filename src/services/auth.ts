import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { logger } from "../utils/logger";

dotenv.config();

const privateKeyPath = process.env.ASC_PRIVATE_KEY_PATH;
const keyId = process.env.ASC_KEY_ID;
const issuerId = process.env.ASC_ISSUER_ID;

if (!privateKeyPath || !keyId || !issuerId) {
  logger.error(
    "Missing App Store Connect API credentials. Please check your .env file for ASC_PRIVATE_KEY_PATH, ASC_KEY_ID, and ASC_ISSUER_ID."
  );
  process.exit(1);
}

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

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

  const token = jwt.sign(payload, privateKey, options);
  logger.info("Successfully generated App Store Connect API token.");
  return token;
}
