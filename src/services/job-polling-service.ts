import { apiClient } from "./api-client";
import { AnyAction, Plan } from "@semihcihan/shared";
import { Ora } from "ora";
import { logger } from "@semihcihan/shared";

const POLL_INTERVAL_MS = 5000;

interface JobInfo {
  actionIndex: number;
  message: string;
  type: "default" | "after";
}

interface JobStatusResponse {
  success: boolean;
  data: {
    jobId: string;
    status: "pending" | "processing" | "completed" | "failed";
    error: string | undefined;
    currentActionIndex: number;
    currentAction: AnyAction | undefined;
    totalActions: number;
    createdAt: string;
    updatedAt: string;
    info: JobInfo[];
  };
}

export const trackJob = async (
  jobId: string,
  spinner: Ora,
  plan?: Plan
): Promise<void> => {
  let lastActionIndex = -1;
  let displayedInfoCount = 0;

  while (true) {
    const {
      status,
      currentActionIndex,
      currentAction,
      totalActions,
      error,
      info,
    } = (await getJobStatus(jobId)).data;

    // Display new info messages (only default type, not after)
    displayedInfoCount = displayNewInfoMessages(
      info,
      displayedInfoCount,
      spinner
    );

    if (currentActionIndex !== lastActionIndex) {
      if (
        plan &&
        currentActionIndex !== lastActionIndex + 1 &&
        lastActionIndex >= 0
      ) {
        await displaySkippedActions(
          plan,
          lastActionIndex + 1,
          currentActionIndex,
          spinner
        );
      }

      const actionDescription = getActionDescription(currentAction);
      const progressText = `Processing action [${
        currentActionIndex + 1
      }/${totalActions}] ${actionDescription}`;
      spinner.text = progressText;
      lastActionIndex = currentActionIndex;
    }

    if (status === "completed") {
      spinner.succeed("Actions completed successfully");
      // Display after messages if any
      displayAfterMessages(info);
      return;
    }

    if (status === "failed") {
      // Display after messages even on failure
      displayAfterMessages(info);
      throw new Error(error);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};

const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
  const response = await apiClient.get<JobStatusResponse>(`/status/${jobId}`);
  return response.data;
};

const getActionDescription = (action: AnyAction | undefined): string => {
  if (!action) {
    return "Unknown Action";
  }
  return action.type;
};

const displaySkippedActions = async (
  plan: Plan,
  startIndex: number,
  endIndex: number,
  spinner: Ora
): Promise<void> => {
  const safeStartIndex = Math.max(0, startIndex);
  const safeEndIndex = Math.min(plan.length, endIndex);

  for (let i = safeStartIndex; i < safeEndIndex; i++) {
    const action = plan[i];
    let totalActions = plan.length;
    if (action) {
      const actionDescription = getActionDescription(action);
      const progressText = `Processing action [${
        i + 1
      }/${totalActions}] ${actionDescription}`;
      spinner.text = progressText;

      // Display for 0.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};

const displayNewInfoMessages = (
  info: JobInfo[] | undefined,
  displayedInfoCount: number,
  spinner: Ora
): number => {
  if (!info || info.length <= displayedInfoCount) {
    return displayedInfoCount;
  }

  for (let i = displayedInfoCount; i < info.length; i++) {
    const infoMessage = info[i];
    if (infoMessage.type === "default") {
      spinner.stop();
      logger.info(infoMessage.message);
      spinner.start();
    }
  }

  return info.length;
};

const displayAfterMessages = (info: JobInfo[] | undefined): void => {
  if (!info) return;

  const afterMessages = info.filter((item) => item.type === "after");
  if (afterMessages.length === 0) return;

  for (const item of afterMessages) {
    logger.info(item.message);
  }
};
