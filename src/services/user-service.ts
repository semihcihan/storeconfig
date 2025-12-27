import fs from "fs";
import path from "path";
import os from "os";
import { logger } from "@semihcihan/shared";
import { getInfo } from "./info-service";

export class UserService {
  private userPath: string;

  constructor(userPath?: string) {
    this.userPath = userPath ?? path.join(os.homedir(), ".storeconfig", "user");
  }

  getUserPath(): string {
    return this.userPath;
  }

  saveUser(email: string): void {
    try {
      const userDir = path.dirname(this.userPath);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      fs.writeFileSync(this.userPath, email, "utf8");
      logger.debug(`User data saved to ${this.userPath}`);
    } catch (error) {
      logger.debug("Failed to save user data", error);
    }
  }

  loadUser(): string | null {
    try {
      if (!fs.existsSync(this.userPath)) {
        return null;
      }

      return fs.readFileSync(this.userPath, "utf8").trim();
    } catch (error) {
      logger.debug("Failed to load user data file", error);
      return null;
    }
  }

  hasUser(): boolean {
    return fs.existsSync(this.userPath);
  }

  deleteUser(): void {
    try {
      if (fs.existsSync(this.userPath)) {
        fs.unlinkSync(this.userPath);
        logger.debug(`User data deleted from ${this.userPath}`);
      }
    } catch (error) {
      logger.debug("Failed to delete user data file", error);
    }
  }

  async ensureUserCached(): Promise<void> {
    if (this.hasUser()) {
      return;
    }

    try {
      const info = await getInfo();
      this.saveUser(info.user.email);
    } catch (error) {
      logger.debug("Could not fetch user info for caching", error);
    }
  }
}

export const userService = new UserService();
