import { CommandModule } from "yargs";
import { AppStoreModelSchema } from "../models/app-store";
import { readFileSync } from "fs";

const command: CommandModule = {
  command: "validate",
  describe: "Validate the JSON file",
  builder: {
    file: {
      alias: "f",
      describe: "Path to the JSON file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      const filePath = argv.file as string;
      const fileContent = readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);

      const result = AppStoreModelSchema.safeParse(jsonData);

      if (result.success) {
        console.log("✅ Validation passed! The JSON file is valid.");
      } else {
        console.log("❌ Validation failed!");
        console.log("Errors:");
        result.error.issues.forEach((issue, index) => {
          console.log(
            `${index + 1}. ${issue.path.join(".")}: ${issue.message}`
          );
        });
        process.exit(1);
      }
    } catch (error) {
      console.error("❌ Error reading or parsing the JSON file:", error);
      process.exit(1);
    }
  },
};

export default command;
