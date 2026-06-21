import fs from "fs";
import {
  ContextualError,
  logger,
  validateFileExists,
} from "@semihcihan/shared";
import {
  AppleCredentialStore,
  appleCredentialStore,
} from "./apple-credential-store";
import { applyAppleCredentialsToEnvironment } from "./apple-auth-context";

export class AppleAuthService {
  constructor(
    private credentialStore: AppleCredentialStore = appleCredentialStore
  ) {}

  /**
   * Configure Apple credentials for local App Store Connect API calls
   */
  async configureAppleCredentials(
    issuerId: string,
    keyId: string,
    keyPath: string
  ): Promise<void> {
    // Validate key file exists and is readable
    validateFileExists(keyPath, {
      fileDescription: "Apple private key (.p8 file)",
    });

    // Read the private key file
    const privateKey = this.readPrivateKeyFile(keyPath);

    // Validate that it looks like a private key
    this.validatePrivateKey(privateKey);

    const credentials = {
      issuerId,
      keyId,
      privateKey,
    };

    this.credentialStore.saveCredentials(credentials);
    applyAppleCredentialsToEnvironment(credentials);

    logger.info(
      `✅ Apple credentials stored locally at ${this.credentialStore.getCredentialsPath()}`
    );
  }

  /**
   * Read and validate the private key file
   */
  private readPrivateKeyFile(keyPath: string): string {
    try {
      return fs.readFileSync(keyPath, "utf8");
    } catch (error) {
      throw new ContextualError(
        `Failed to read private key file at ${keyPath}`,
        error
      );
    }
  }

  /**
   * Validate that the private key content looks valid
   */
  private validatePrivateKey(privateKey: string): void {
    if (
      !privateKey.includes("BEGIN PRIVATE KEY") &&
      !privateKey.includes("BEGIN RSA PRIVATE KEY")
    ) {
      throw new Error(
        "Invalid private key file, the file does not appear to be a valid Apple private key (.p8 file)"
      );
    }
  }
}

// Export singleton instance
export const appleAuthService = new AppleAuthService();
