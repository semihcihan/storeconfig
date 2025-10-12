import { apiClient } from "./api-client";

interface InfoResponse {
  success: boolean;
  data: {
    currentJob?: {
      id: string;
      status: "pending" | "processing" | "completed" | "failed";
    };
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export const getInfo = async () => {
  const response = await apiClient.get<InfoResponse>("/info");
  return response.data.data;
};
