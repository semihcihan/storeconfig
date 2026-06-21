/**
 * Debug script to test Apple App Store Connect API calls with custom credentials.
 *
 * To run:
 *   1. Create a .env.debug file in the same directory as this script (api/src/scripts/.env.debug) with:
 *      DEBUG_ASC_KEY_ID=your_key_id
 *      DEBUG_ASC_ISSUER_ID=your_issuer_id
 *      DEBUG_ASC_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----
 *      ...
 *      -----END PRIVATE KEY-----'
 *
 *   2. Run the script:
 *      cd api
 *      npx ts-node -r tsconfig-paths/register src/scripts/debug-api-call.ts
 *
 * Or after building:
 *   cd api
 *   npm run build
 *   node dist/scripts/debug-api-call.js
 *
 * Modify the API call parameters in this file as needed.
 */

import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { generateAppleJWT, AuthCredentials } from "../services/auth-context";
import { createDebugApiClient } from "../helpers/debug-api-client";

const scriptDir = __dirname;
const envPath = path.join(scriptDir, ".env.debug");
dotenv.config({ path: envPath });

function getCredentialsFromEnv(): AuthCredentials {
  const keyId = process.env.DEBUG_ASC_KEY_ID;
  const issuerId = process.env.DEBUG_ASC_ISSUER_ID;
  const privateKey = process.env.DEBUG_ASC_PRIVATE_KEY;

  if (!keyId || !issuerId || !privateKey) {
    throw new Error(
      `Missing debug credentials in ${envPath}. Please create the file with:\n` +
        "  DEBUG_ASC_KEY_ID=your_key_id\n" +
        "  DEBUG_ASC_ISSUER_ID=your_issuer_id\n" +
        "  DEBUG_ASC_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----'\n"
    );
  }

  return {
    keyId,
    issuerId,
    privateKey,
  };
}

const credentials = getCredentialsFromEnv();

const getAuthToken = () => generateAppleJWT(credentials);
const api = createDebugApiClient(getAuthToken);

async function debugApiCall() {
  try {
    const response = await api.GET("/v1/subscriptions/{id}/prices", {
      params: {
        path: {
          id: "6757758881",
        },
        query: {
          limit: 200,
          include: ["territory", "subscriptionPricePoint"],
        },
      },
    });

    if (response.error) {
      console.error("API Error:", JSON.stringify(response.error, null, 2));
      process.exit(1);
    }

    const outputPath = path.join(process.cwd(), "debug-api-call-result.json");
    const jsonContent = JSON.stringify(response.data, null, 2);
    fs.writeFileSync(outputPath, jsonContent, "utf8");
    console.log(`API response written to: ${outputPath}`);
  } catch (error) {
    console.error("Unexpected error:", error);
    process.exit(1);
  }
}

debugApiCall();
