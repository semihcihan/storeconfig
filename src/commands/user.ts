import type { CommandModule } from "yargs";
import { logger } from "@semihcihan/shared";
import { getInfo } from "../services/info-service";

const userCommand: CommandModule = {
  command: "user",
  describe: "Display current user information and latest 'apply' status and Apple credentials status if not configured",
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

    if (!info.user.appleSetup) {
      output += `\n\nApple Credentials missing. Run 'storeconfig apple --key-path /path/to/key.p8' to set up. Check https://storeconfig.com/docs for more information.`;
    }

    logger.std(output);
  },
};

export default userCommand;
