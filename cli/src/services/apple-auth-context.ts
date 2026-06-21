import { ContextualError } from "@semihcihan/shared";
import {
  AppleCredentialStore,
  AppleCredentials,
  appleCredentialStore,
} from "./apple-credential-store";

export function applyAppleCredentialsToEnvironment(
  credentials: AppleCredentials,
  env: NodeJS.ProcessEnv = process.env
): void {
  env.ASC_PRIVATE_KEY = credentials.privateKey;
  env.ASC_KEY_ID = credentials.keyId;
  env.ASC_ISSUER_ID = credentials.issuerId;
}

export function loadAppleCredentialsForApi(
  credentialStore: AppleCredentialStore = appleCredentialStore,
  env: NodeJS.ProcessEnv = process.env
): AppleCredentials | null {
  const credentials = credentialStore.loadCredentials();
  if (!credentials) {
    return null;
  }

  applyAppleCredentialsToEnvironment(credentials, env);
  return credentials;
}

export function requireAppleCredentialsForApi(
  credentialStore: AppleCredentialStore = appleCredentialStore,
  env: NodeJS.ProcessEnv = process.env
): AppleCredentials {
  const credentials = loadAppleCredentialsForApi(credentialStore, env);
  if (!credentials) {
    throw new ContextualError(
      "Missing local App Store Connect credentials. Run 'storeconfig apple --key-path /path/to/key.p8' first."
    );
  }
  return credentials;
}
