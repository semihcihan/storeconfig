import fs from "fs";
import path from "path";
import os from "os";
import { logger } from "@semihcihan/shared";

export interface StoreKitConfig {
  apiKey?: string;
}

export class ConfigService {
  private configPath: string;

  constructor() {
    // Store config in user's home directory
    this.configPath = path.join(os.homedir(), ".store-config", "config.json");
  }

  /**
   * Load configuration from file
   */
  loadConfig(): StoreKitConfig {
    try {
      if (!fs.existsSync(this.configPath)) {
        return {};
      }

      const configData = fs.readFileSync(this.configPath, "utf8");
      return JSON.parse(configData);
    } catch (error) {
      logger.warn("Failed to load config file, using empty config");
      return {};
    }
  }

  /**
   * Save configuration to file
   */
  saveConfig(config: StoreKitConfig): void {
    try {
      // Ensure directory exists
      const configDir = path.dirname(this.configPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
      logger.debug(`Config saved to ${this.configPath}`);
    } catch (error) {
      logger.error("Failed to save config file", error);
      throw error;
    }
  }

  /**
   * Get API key from config
   */
  getApiKey(): string | undefined {
    const config = this.loadConfig();
    return config.apiKey;
  }

  /**
   * Set API key in config
   */
  setApiKey(apiKey: string): void {
    const config = this.loadConfig();
    config.apiKey = apiKey;
    this.saveConfig(config);
  }

  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    const config = this.loadConfig();
    delete config.apiKey;
    this.saveConfig(config);
  }

  /**
   * Check if user is authenticated (has API key)
   */
  isAuthenticated(): boolean {
    const config = this.loadConfig();
    return !!config.apiKey;
  }
}

// Export singleton instance
export const configService = new ConfigService();
