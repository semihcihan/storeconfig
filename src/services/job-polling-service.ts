import { apiClient } from "./api-client";
import { ContextualError, logger } from "@semihcihan/shared";
import { AnyAction } from "@semihcihan/shared";
import { Ora } from "ora";

const POLL_INTERVAL_MS = 1000;

const getActionDescription = (action: AnyAction): string => {
  return action.type;
};

interface JobStatusResponse {
  success: boolean;
  data: {
    jobId: string;
    status: "pending" | "processing" | "completed" | "failed";
    currentActionIndex: number;
    currentAction: AnyAction;
    totalActions: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const trackJob = async (jobId: string, spinner: Ora): Promise<void> => {
  let lastActionIndex = -1;

  while (true) {
    const { status, currentActionIndex, currentAction, totalActions } = (
      await getJobStatus(jobId)
    ).data;

    if (currentActionIndex !== lastActionIndex) {
      const actionDescription = getActionDescription(currentAction);
      const progressText = `Processing action [${
        currentActionIndex + 1
      }/${totalActions}] ${actionDescription}`;
      spinner.text = progressText;
      lastActionIndex = currentActionIndex;
    }

    if (status === "completed") {
      spinner.succeed("Job completed successfully");
      return;
    }

    if (status === "failed") {
      spinner.fail("Job failed");
      // TODO: receive error on failed job
      throw new ContextualError("Job failed", jobId);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};

const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
  const response = await apiClient.get<JobStatusResponse>(`/status/${jobId}`);
  return response.data;
};
