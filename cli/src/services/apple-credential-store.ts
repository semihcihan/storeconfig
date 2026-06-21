import fs from "fs";
import path from "path";
import os from "os";
import { ContextualError, logger } from "@semihcihan/shared";

export interface AppleCredentials {
  issuerId: string;
  keyId: string;
  privateKey: string;
}

export class AppleCredentialStore {
  private credentialsPath: string;

  constructor(credentialsPath?: string) {
    this.credentialsPath =
      credentialsPath ??
      path.join(os.homedir(), ".storeconfig", "apple-credentials.json");
  }

  getCredentialsPath(): string {
    return this.credentialsPath;
  }

  saveCredentials(credentials: AppleCredentials): void {
    try {
      const credentialsDir = path.dirname(this.credentialsPath);
      if (!fs.existsSync(credentialsDir)) {
        fs.mkdirSync(credentialsDir, { recursive: true, mode: 0o700 });
      }

      const normalizedCredentials = this.normalizeCredentials(credentials);
      fs.writeFileSync(
        this.credentialsPath,
        JSON.stringify(normalizedCredentials, null, 2) + "\n",
        {
          encoding: "utf8",
          mode: 0o600,
        }
      );
      fs.chmodSync(this.credentialsPath, 0o600);
      logger.debug(`Apple credentials saved to ${this.credentialsPath}`);
    } catch (error) {
      throw new ContextualError("Failed to save Apple credentials", error);
    }
  }

  loadCredentials(): AppleCredentials | null {
    try {
      if (!fs.existsSync(this.credentialsPath)) {
        return null;
      }

      const rawCredentials = fs.readFileSync(this.credentialsPath, "utf8");
      const parsedCredentials = JSON.parse(rawCredentials);
      return this.normalizeCredentials(parsedCredentials);
    } catch (error) {
      throw new ContextualError("Failed to load Apple credentials", error);
    }
  }

  hasCredentials(): boolean {
    return fs.existsSync(this.credentialsPath);
  }

  deleteCredentials(): void {
    try {
      if (fs.existsSync(this.credentialsPath)) {
        fs.unlinkSync(this.credentialsPath);
        logger.debug(`Apple credentials deleted from ${this.credentialsPath}`);
      }
    } catch (error) {
      throw new ContextualError("Failed to delete Apple credentials", error);
    }
  }

  private normalizeCredentials(value: unknown): AppleCredentials {
    if (!value || typeof value !== "object") {
      throw new Error("Apple credentials file must contain a JSON object");
    }

    const credentials = value as Partial<AppleCredentials>;
    const issuerId = credentials.issuerId?.trim();
    const keyId = credentials.keyId?.trim();
    const privateKey = credentials.privateKey?.trim();

    if (!issuerId || !keyId || !privateKey) {
      throw new Error(
        "Apple credentials must include issuerId, keyId, and privateKey"
      );
    }

    return {
      issuerId,
      keyId,
      privateKey,
    };
  }
}

export const appleCredentialStore = new AppleCredentialStore();
