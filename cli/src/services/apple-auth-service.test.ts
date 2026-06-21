import fs from "fs";
import os from "os";
import path from "path";
import { logger } from "@semihcihan/shared";
import { AppleAuthService } from "./apple-auth-service";
import { AppleCredentialStore } from "./apple-credential-store";

const privateKey = `-----BEGIN PRIVATE KEY-----
test-private-key
-----END PRIVATE KEY-----`;

describe("AppleAuthService", () => {
  let tempDir: string;
  let keyPath: string;
  let credentialsPath: string;
  let credentialStore: AppleCredentialStore;
  let service: AppleAuthService;
  let originalEnv: NodeJS.ProcessEnv;
  let loggerInfoSpy: jest.SpiedFunction<typeof logger.info>;

  beforeEach(() => {
    loggerInfoSpy = jest.spyOn(logger, "info").mockImplementation(() => {});
    originalEnv = process.env;
    process.env = { ...originalEnv };
    delete process.env.ASC_PRIVATE_KEY;
    delete process.env.ASC_KEY_ID;
    delete process.env.ASC_ISSUER_ID;

    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "storeconfig-apple-auth-"));
    keyPath = path.join(tempDir, "AuthKey_TEST.p8");
    credentialsPath = path.join(tempDir, "apple-credentials.json");
    credentialStore = new AppleCredentialStore(credentialsPath);
    service = new AppleAuthService(credentialStore);
    fs.writeFileSync(keyPath, privateKey);
  });

  afterEach(() => {
    loggerInfoSpy.mockRestore();
    process.env = originalEnv;
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("stores Apple credentials locally and prepares the API auth environment", async () => {
    await service.configureAppleCredentials("issuer-id", "key-id", keyPath);

    expect(credentialStore.loadCredentials()).toEqual({
      issuerId: "issuer-id",
      keyId: "key-id",
      privateKey,
    });
    expect(process.env.ASC_PRIVATE_KEY).toBe(privateKey);
    expect(process.env.ASC_KEY_ID).toBe("key-id");
    expect(process.env.ASC_ISSUER_ID).toBe("issuer-id");
  });

  it("rejects files that are not private keys", async () => {
    fs.writeFileSync(keyPath, "not a private key");

    await expect(
      service.configureAppleCredentials("issuer-id", "key-id", keyPath)
    ).rejects.toThrow("Invalid private key file");
  });
});
