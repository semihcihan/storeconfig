import fs from "fs";
import axios from "axios";
import {
  logger,
  validateFileExists,
  ContextualError,
} from "@semihcihan/shared";
import { keyService } from "./key-service";

export class AppleAuthService {
  private apiBaseUrl: string;

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl =
      apiBaseUrl || process.env.API_BASE_URL || "http://localhost:3000";
  }

  /**
   * Configure Apple credentials by sending them to the backend
   */
  async configureAppleCredentials(
    issuerId: string,
    keyId: string,
    keyPath: string
  ): Promise<void> {
    // Check if secret key exists
    if (!keyService.hasKey()) {
      throw new ContextualError(
        "No secret key found",
        "Please run 'auth configure' first to set up your secret key"
      );
    }

    // Validate key file exists and is readable
    validateFileExists(keyPath, {
      fileDescription: "Apple private key (.p8 file)",
    });

    // Read the private key file
    const privateKey = this.readPrivateKeyFile(keyPath);

    // Validate that it looks like a private key
    this.validatePrivateKey(privateKey);

    logger.info("Sending Apple credentials to backend...");

    // Get the secret key for authentication
    const secretKey = this.getSecretKey();

    // Send credentials to backend
    await this.sendCredentialsToBackend(issuerId, keyId, privateKey, secretKey);

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
        "Failed to read private key file",
        `Could not read the file at ${keyPath}: ${error}`
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
      throw new ContextualError(
        "Invalid private key file",
        "The file does not appear to be a valid Apple private key (.p8 file)"
      );
    }
  }

  /**
   * Get the stored secret key for authentication
   */
  private getSecretKey(): string {
    const secretKey = keyService.loadKey();
    if (!secretKey) {
      throw new ContextualError(
        "Failed to load secret key",
        "Secret key file exists but could not be read"
      );
    }
    return secretKey;
  }

  /**
   * Send Apple credentials to the backend API
   */
  private async sendCredentialsToBackend(
    issuerId: string,
    keyId: string,
    privateKey: string,
    secretKey: string
  ): Promise<void> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/api/v1/auth`,
        {
          keyId,
          issuerId,
          privateKey,
        },
        {
          headers: {
            "X-StoreConfig-ApiKey": secretKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new ContextualError(
          "Failed to store Apple credentials",
          response.data.error
        );
      }

      // Log the success message from the backend
      if (response.data.message) {
        logger.info(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          throw new ContextualError(
            "API request failed",
            error.response.data.error
          );
        }
        throw new ContextualError(
          "API request failed",
          `HTTP ${error.response?.status}: ${error.message}`
        );
      }
      throw new ContextualError("Failed to send credentials to backend", error);
    }
  }
}

// Export singleton instance
export const appleAuthService = new AppleAuthService();
