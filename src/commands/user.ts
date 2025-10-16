import type { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { getInfo } from "../services/info-service";

const userCommand: CommandModule = {
  command: "user",
  describe: "Display current user information and latest job status",
  builder: {},
  handler: async () => {
    try {
      const info = await getInfo();

      let output = "";
      output += `Email → ${info.user.email}`;
      if (info.currentJob) {
        output += `\nLatest Actions → ID: ${info.currentJob.id}, Status: ${info.currentJob.status}`;
      }

      logger.std(output);
    } catch (error) {
      logger.error("Failed to fetch user information", error);
      process.exit(1);
    }
  },
};

export default userCommand;
