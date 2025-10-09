import { logger } from "@semihcihan/shared";
import inquirer from "inquirer";
import { getInfo } from "./info-service";
import { apiClient } from "./api-client";

export const createJob = async (
  plan: any[],
  currentState: any,
  desiredState: any
): Promise<string> => {
  const ongoingJobId = await checkForOngoingJob();
  if (ongoingJobId) {
    return await handleOngoingJob(ongoingJobId);
  }

  const confirmed = await confirmChanges();
  if (!confirmed) {
    logger.warn("Operation cancelled by user");
    throw new Error("Operation cancelled by user");
  }

  const applyResponse = await apiClient.post("/apply", {
    plan: plan,
    currentState: currentState,
    desiredState: desiredState,
  });

  return applyResponse.data.data;
};

const handleOngoingJob = async (ongoingJobId: string): Promise<string> => {
  const watchOngoing = await promptToWatchOngoingJob(ongoingJobId);
  if (watchOngoing) {
    logger.info(`Watching progress of ongoing job: ${ongoingJobId}`);
    return ongoingJobId;
  } else {
    logger.warn(
      "Operation cancelled by user - cannot create new job while another is ongoing"
    );
    throw new Error("Cannot create new job while another is ongoing");
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
      message: `You already have an ongoing job (${jobId}). No new job will be created until the ongoing job is completed. Would you like to track the ongoing job?`,
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
