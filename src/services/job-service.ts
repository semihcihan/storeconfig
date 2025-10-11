import { logger } from "@semihcihan/shared";
import inquirer from "inquirer";
import { getInfo } from "./info-service";
import { apiClient } from "./api-client";
import { Ora } from "ora";

export const createJob = async (
  plan: any[],
  currentState: any,
  desiredState: any,
  dryRun: boolean = false,
  spinner: Ora
): Promise<string | null> => {
  const ongoingJobId = await checkForOngoingJob();
  if (ongoingJobId) {
    return await handleOngoingJob(ongoingJobId, spinner);
  }

  const confirmed = await confirmChanges();
  if (!confirmed) {
    logger.warn("Operation cancelled by user");
    return null;
  }

  spinner.start("Processing actions...");
  const applyResponse = await apiClient.post("/apply", {
    plan: plan,
    currentState: currentState,
    desiredState: desiredState,
    dryRun: dryRun,
  });

  return applyResponse.data.data;
};

const handleOngoingJob = async (
  ongoingJobId: string,
  spinner: Ora
): Promise<string | null> => {
  const watchOngoing = await promptToWatchOngoingJob(ongoingJobId);
  if (watchOngoing) {
    spinner.start(
      `Tracking progress of ongoing actions with ID: ${ongoingJobId}`
    );
    return ongoingJobId;
  } else {
    logger.warn(
      "Operation cancelled by user - cannot create new actions while already processing actions"
    );
    return null;
  }
};

const checkForOngoingJob = async (): Promise<string | null> => {
  const info = await getInfo();
  const { currentJob } = info;

  if (
    currentJob &&
    (currentJob.status === "pending" || currentJob.status === "processing")
  ) {
    return currentJob.id;
  }

  return null;
};

const promptToWatchOngoingJob = async (jobId: string): Promise<boolean> => {
  const { watchOngoing } = await inquirer.prompt([
    {
      type: "confirm",
      name: "watchOngoing",
      message: `You already have ongoing actions with ID: (${jobId}). No new actions will be created until the ongoing actions are completed. Would you like to track the ongoing actions?`,
      default: true,
    },
  ]);

  return watchOngoing;
};

const confirmChanges = async (): Promise<boolean> => {
  logger.warn(`### CRITICAL WARNING ###
You are about to apply changes directly to App Store Connect.

These changes will take effect immediately and may impact your live app configuration.
Some operations are inherently irreversible — even if performed manually through App Store Connect.
`);

  const { confirmed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmed",
      message: "Do you want to proceed with applying these changes?",
      default: false,
    },
  ]);

  return confirmed;
};
