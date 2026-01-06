import type { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { getInfo } from "../services/info-service";

const userCommand: CommandModule = {
  command: "user",
  describe: "Display current user information and latest job status",
  builder: {},
  handler: async () => {
    const info = await getInfo();

    let output = "";
    output += `Email → ${info.user.email}`;
    if (info.currentJob) {
      output += `\nLatest Actions → Status: ${info.currentJob.status}`;
      if (info.currentJob.error) {
        output += `\n   Error: ${info.currentJob.error}`;
      }

      // Filter and display after messages
      const afterMessages = info.currentJob.info?.filter(
        (item) => item.type === "after"
      );
      if (afterMessages && afterMessages.length > 0) {
        output += `\n\nAdditional information:`;
        for (const item of afterMessages) {
          output += `\n   ${item.message}`;
        }
      }
    }

    logger.std(output);
  },
};

export default userCommand;
