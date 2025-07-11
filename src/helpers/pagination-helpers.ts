import { api } from "../services/api";
import { logger } from "../utils/logger";
import { API_LIMITS } from "./constants";

// Generic pagination helper for v2 endpoints with cursor-based pagination
export async function paginateV2<T>(
  endpoint: string,
  pathId: string,
  params: Record<string, any> = {},
  limit: number = API_LIMITS.DEFAULT_LIMIT
): Promise<T[]> {
  const allData: T[] = [];
  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await api.GET(endpoint as any, {
      params: {
        path: { id: pathId },
        query: {
          ...params,
          limit,
          ...(cursor ? { cursor } : {}),
        },
      },
    });

    if (response.error) {
      logger.error(
        `Failed to paginate ${endpoint}: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to paginate ${endpoint}: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    const data = response.data?.data || [];
    allData.push(...data);

    // Check for more pages
    cursor = response.data?.meta?.paging?.nextCursor;
    hasMore = !!cursor;
  }

  return allData;
}

// Helper for v1 endpoints with offset-based pagination
export async function paginateV1<T>(
  endpoint: string,
  pathId: string,
  params: Record<string, any> = {},
  limit: number = API_LIMITS.DEFAULT_LIMIT
): Promise<T[]> {
  const allData: T[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await api.GET(endpoint as any, {
      params: {
        path: { id: pathId },
        query: {
          ...params,
          limit,
          offset,
        },
      },
    });

    if (response.error) {
      logger.error(
        `Failed to paginate ${endpoint}: ${JSON.stringify(response.error)}`
      );
      throw new Error(
        `Failed to paginate ${endpoint}: ${
          response.error.errors?.[0]?.detail || "Unknown error"
        }`
      );
    }

    const data = response.data?.data || [];
    allData.push(...data);

    // Check if we got less data than requested (indicating end of results)
    hasMore = data.length === limit;
    offset += limit;
  }

  return allData;
}
