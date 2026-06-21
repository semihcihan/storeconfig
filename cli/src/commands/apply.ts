import { CommandModule } from "yargs";
import {
  logger,
  DEFAULT_CONFIG_FILENAME,
  validateFileExists,
  AnyAction,
} from "@semihcihan/shared";
import { showPlan } from "../services/plan-service";
import { readJsonFile } from "@semihcihan/shared";
import { validateAppStoreModel } from "@semihcihan/shared";
import { removeShortcuts } from "@semihcihan/shared";
import { boxifyMessage } from "../services/format-helper";
import { storeConfigEngine } from "../services/storeconfig-engine";
import inquirer from "inquirer";
import ora from "ora";

const APPLY_REMINDER = boxifyMessage([
  "This may take up to 15 minutes depending on the changes.",
  "Processing runs locally from this terminal.",
  "Keep the terminal open until the operation completes.",
]);

const APPLY_CRITICAL_WARNING = boxifyMessage([
  "CRITICAL WARNING",
  "You are about to apply changes directly to App Store Connect.",
  "These changes will take effect immediately.",
  "Some operations may be irreversible.",
]);

async function confirmChanges(): Promise<boolean> {
  logger.std(APPLY_CRITICAL_WARNING);

  const { confirmed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmed",
      message: "Do you want to proceed with applying these changes?",
      default: false,
    },
  ]);

  return confirmed;
}

function getActionDescription(action: AnyAction | undefined): string {
  return action?.type ?? "Unknown Action";
}

const command: CommandModule = {
  command: "apply",
  describe: "Apply the changes to App Store Connect",
  builder: {
    file: {
      alias: "f",
      describe: `Path to the target state JSON file. Defaults to ${DEFAULT_CONFIG_FILENAME} in current directory.`,
      demandOption: false,
      type: "string",
    },
    preview: {
      alias: "p",
      describe:
        "Show what changes would be made without applying them (i.e., perform a 'dry run' preview only).",
      type: "boolean",
      default: false,
    },
  },
  handler: async (argv) => {
    const preview = argv.preview as boolean;
    const dryRun = process.env.dryRun === "true";

    const desiredStateFile = validateFileExists(argv.file as string, {
      fileDescription: "target state JSON file",
    });

    logger.debug(`Processing target state from ${desiredStateFile}...`);

    if (dryRun) {
      logger.debug(
        "Dry run mode enabled - no actual changes will be applied to App Store Connect"
      );
    }

    const spinner = ora("Generating actions...").start();
    try {
      const desiredState = validateAppStoreModel(
        removeShortcuts(readJsonFile(desiredStateFile)),
        false,
        "apply"
      );

      const { plan, currentState } =
        await storeConfigEngine.generateDiff(desiredState);
      if (plan.length === 0) {
        spinner.succeed(
          "No changes to apply. Your configuration is up to date. Exiting..."
        );
        return;
      }
      spinner.stop();

      await showPlan(plan);

      if (preview) {
        logger.info("Preview mode - no changes will be applied");
        return;
      }

      const confirmed = await confirmChanges();
      if (!confirmed) {
        logger.warn("Operation cancelled by user");
        return;
      }

      const afterMessages: string[] = [];
      spinner.prefixText = APPLY_REMINDER;
      spinner.start("Processing actions...");

      await storeConfigEngine.applyPlan(plan, currentState, desiredState, {
        dryRun,
        onStep: (index, action) => {
          spinner.text = `Processing action [${index + 1}/${
            plan.length
          }] ${getActionDescription(action)}`;
        },
        onInfo: (message, type) => {
          if (type === "after") {
            afterMessages.push(message);
            return;
          }

          spinner.stop();
          logger.info(message);
          spinner.start();
        },
      });

      spinner.succeed("Actions completed successfully");
      for (const message of afterMessages) {
        logger.info(message);
      }
    } catch (error) {
      spinner.stop();
      throw error;
    }
  },
};

export default command;
