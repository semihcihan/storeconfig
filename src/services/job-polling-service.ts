import { apiClient } from "./api-client";
import { AnyAction, Plan } from "@semihcihan/shared";
import { Ora } from "ora";

const POLL_INTERVAL_MS = 5000;

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
  };
}

export const trackJob = async (
  jobId: string,
  spinner: Ora,
  plan?: Plan
): Promise<void> => {
  let lastActionIndex = -1;

  while (true) {
    const { status, currentActionIndex, currentAction, totalActions, error } = (
      await getJobStatus(jobId)
    ).data;

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
      return;
    }

    if (status === "failed") {
      let message = `Actions ID '${jobId}'`;
      if (error) {
        message += `\n${error}`;
      }
      throw new Error(message);
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
