import fs from "fs";
import os from "os";
import path from "path";
import { AppleCredentialStore } from "./apple-credential-store";

const privateKey = `-----BEGIN PRIVATE KEY-----
test-private-key
-----END PRIVATE KEY-----`;

describe("AppleCredentialStore", () => {
  let tempDir: string;
  let credentialsPath: string;
  let store: AppleCredentialStore;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-apple-"));
    credentialsPath = path.join(tempDir, "apple-credentials.json");
    store = new AppleCredentialStore(credentialsPath);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("saves and loads Apple credentials", () => {
    store.saveCredentials({
      issuerId: " issuer-id ",
      keyId: " key-id ",
      privateKey: `${privateKey}\n`,
    });

    expect(store.loadCredentials()).toEqual({
      issuerId: "issuer-id",
      keyId: "key-id",
      privateKey,
    });
  });

  it("writes the credentials file with owner-only permissions", () => {
    store.saveCredentials({
      issuerId: "issuer-id",
      keyId: "key-id",
      privateKey,
    });

    const mode = fs.statSync(credentialsPath).mode & 0o777;
    expect(mode).toBe(0o600);
  });

  it("returns null when credentials do not exist", () => {
    expect(store.loadCredentials()).toBeNull();
    expect(store.hasCredentials()).toBe(false);
  });

  it("deletes stored credentials", () => {
    store.saveCredentials({
      issuerId: "issuer-id",
      keyId: "key-id",
      privateKey,
    });

    expect(store.hasCredentials()).toBe(true);

    store.deleteCredentials();

    expect(store.hasCredentials()).toBe(false);
    expect(store.loadCredentials()).toBeNull();
  });

  it("rejects malformed credentials files", () => {
    fs.writeFileSync(credentialsPath, JSON.stringify({ keyId: "key-id" }));

    expect(() => store.loadCredentials()).toThrow(
      "Failed to load Apple credentials"
    );
  });
});
