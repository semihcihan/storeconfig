import fs from "fs";
import os from "os";
import path from "path";
import { AppleCredentialStore } from "./apple-credential-store";
import {
  applyAppleCredentialsToEnvironment,
  loadAppleCredentialsForApi,
  requireAppleCredentialsForApi,
} from "./apple-auth-context";

const credentials = {
  issuerId: "issuer-id",
  keyId: "key-id",
  privateKey: `-----BEGIN PRIVATE KEY-----
test-private-key
-----END PRIVATE KEY-----`,
};

describe("Apple auth context", () => {
  let tempDir: string;
  let store: AppleCredentialStore;
  let env: NodeJS.ProcessEnv;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-auth-"));
    store = new AppleCredentialStore(
      path.join(tempDir, "apple-credentials.json")
    );
    env = {};
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("applies Apple credentials to the API auth environment", () => {
    applyAppleCredentialsToEnvironment(credentials, env);

    expect(env.ASC_PRIVATE_KEY).toBe(credentials.privateKey);
    expect(env.ASC_KEY_ID).toBe(credentials.keyId);
    expect(env.ASC_ISSUER_ID).toBe(credentials.issuerId);
  });

  it("loads stored credentials into the API auth environment", () => {
    store.saveCredentials(credentials);

    const loaded = loadAppleCredentialsForApi(store, env);

    expect(loaded).toEqual(credentials);
    expect(env.ASC_PRIVATE_KEY).toBe(credentials.privateKey);
    expect(env.ASC_KEY_ID).toBe(credentials.keyId);
    expect(env.ASC_ISSUER_ID).toBe(credentials.issuerId);
  });

  it("returns null when no local credentials exist", () => {
    expect(loadAppleCredentialsForApi(store, env)).toBeNull();
    expect(env.ASC_PRIVATE_KEY).toBeUndefined();
  });

  it("throws when credentials are required but missing", () => {
    expect(() => requireAppleCredentialsForApi(store, env)).toThrow(
      "Missing local App Store Connect credentials"
    );
  });
});
