import { apiClient } from "./api-client";

interface JobInfo {
  actionIndex: number;
  message: string;
  type: "default" | "after";
}

interface InfoResponse {
  success: boolean;
  data: {
    currentJob?: {
      id: string;
      status: "pending" | "processing" | "completed" | "failed";
      error: string | undefined;
      info: JobInfo[];
    };
    user: {
      id: string;
      email: string;
      name: string;
      appleSetup: boolean;
    };
  };
}

export const getInfo = async () => {
  const response = await apiClient.get<InfoResponse>("/info");
  return response.data.data;
};
