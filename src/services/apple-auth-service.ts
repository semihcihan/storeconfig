import fs from "fs";
import {
  ContextualError,
  logger,
  validateFileExists,
} from "@semihcihan/shared";
import { apiClient } from "./api-client";

export class AppleAuthService {
  constructor() {
    // No need to store API base URL as it's handled by apiClient
  }

  /**
   * Configure Apple credentials by sending them to the backend
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

    logger.info("Sending Apple credentials to backend...");

    // Send credentials to backend
    await this.sendCredentialsToBackend(issuerId, keyId, privateKey);

    logger.info("✅ Apple credentials stored successfully!");
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

  /**
   * Send Apple credentials to the backend API
   */
  private async sendCredentialsToBackend(
    issuerId: string,
    keyId: string,
    privateKey: string
  ): Promise<void> {
    const response = await apiClient.post("/auth", {
      keyId,
      issuerId,
      privateKey,
    });

    // Log the success message from the backend
    if (response.data.message) {
      logger.info(response.data.message);
    }
  }
}

// Export singleton instance
export const appleAuthService = new AppleAuthService();
