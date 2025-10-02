import fs from "fs";
import path from "path";
import os from "os";
import { ContextualError, logger } from "@semihcihan/shared";

export class KeyService {
  private keyPath: string;

  constructor(keyPath?: string) {
    this.keyPath = keyPath ?? path.join(os.homedir(), ".storeconfig", "key");
  }

  /**
   * Get the key file path
   */
  getKeyPath(): string {
    return this.keyPath;
  }

  /**
   * Save secret key to file
   */
  saveKey(secretKey: string): void {
    try {
      // Ensure directory exists
      const keyDir = path.dirname(this.keyPath);
      if (!fs.existsSync(keyDir)) {
        fs.mkdirSync(keyDir, { recursive: true });
      }

      fs.writeFileSync(this.keyPath, secretKey, "utf8");
      logger.debug(`Secret key saved to ${this.keyPath}`);
    } catch (error) {
      throw new ContextualError("Failed to save secret key", error);
    }
  }

  /**
   * Load secret key from file
   */
  loadKey(): string | null {
    try {
      if (!fs.existsSync(this.keyPath)) {
        return null;
      }

      return fs.readFileSync(this.keyPath, "utf8").trim();
    } catch (error) {
      throw new ContextualError("Failed to load secret key file", error);
    }
  }

  /**
   * Check if secret key exists
   */
  hasKey(): boolean {
    return fs.existsSync(this.keyPath);
  }

  /**
   * Delete secret key file
   */
  deleteKey(): void {
    try {
      if (fs.existsSync(this.keyPath)) {
        fs.unlinkSync(this.keyPath);
        logger.debug(`Secret key deleted from ${this.keyPath}`);
      }
    } catch (error) {
      throw new ContextualError("Failed to delete secret key", error);
    }
  }
}

// Export singleton instance (uses default key path)
export const keyService = new KeyService();
