import { apiClient } from "./api-client";
import { ContextualError, logger } from "@semihcihan/shared";

const POLL_INTERVAL_MS = 5000; // 5 seconds
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds

interface JobStatusResponse {
  success: boolean;
  data: {
    jobId: string;
    status: "pending" | "processing" | "completed" | "failed";
    currentActionIndex: number;
    currentAction: any;
    totalActions: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const trackJob = async (jobId: string): Promise<void> => {
  let lastActionIndex = 0;

  while (true) {
    const { status, currentActionIndex } = (await getJobStatus(jobId)).data;

    if (currentActionIndex !== lastActionIndex) {
      logger.info("Processing step", currentActionIndex);
      lastActionIndex = currentActionIndex;
    }

    if (status === "completed") {
      logger.info("Job completed successfully");
      return;
    }

    if (status === "failed") {
      throw new ContextualError("Job failed", jobId);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};

const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
  const response = await apiClient.get<JobStatusResponse>(`/status/${jobId}`, {
    timeout: REQUEST_TIMEOUT_MS,
  });
  return response.data;
};
