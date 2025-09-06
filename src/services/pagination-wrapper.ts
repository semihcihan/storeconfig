import { logger } from "../utils/logger";
import { API_LIMITS } from "../helpers/constants";
import { ContextualError } from "../helpers/error-handling-helpers";

/**
 * Configuration for pagination wrapper
 */
interface PaginationConfig {
  /** Default limit for v1 endpoints */
  v1Limit: number;
  /** Default limit for v2 endpoints */
  v2Limit: number;
}

const DEFAULT_CONFIG: PaginationConfig = {
  v1Limit: API_LIMITS.DEFAULT_LIMIT_v1,
  v2Limit: API_LIMITS.DEFAULT_LIMIT_v2,
};

/**
 * Checks if a response has pagination information
 */
function hasPagingInfo(response: any): boolean {
  return !!response.data?.meta?.paging;
}

/**
 * Determines if an endpoint should be automatically paginated based on response
 */
function shouldPaginate(response: any): boolean {
  return hasPagingInfo(response);
}

/**
 * Gets the pagination limit from the response
 */
function getPaginationLimit(response: any): number {
  const paging = response.data?.meta?.paging;
  if (!paging) {
    throw new Error("No pagination information found in response");
  }

  return paging.limit;
}

/**
 * Checks if a response indicates there are more pages
 */
function hasMorePages(response: any): boolean {
  const paging = response.data?.meta?.paging;
  if (!paging) return false;

  // Check if we got a full page (indicates more pages available)
  const data = response.data?.data || [];
  return data.length === paging.limit;
}

/**
 * Gets the next page parameters for pagination
 */
function getNextPageParams(
  currentParams: any,
  limit: number,
  currentOffset: number
): any {
  return {
    ...currentParams,
    limit,
    offset: currentOffset + limit,
  };
}

/**
 * Creates a pagination wrapper that automatically handles pagination for v1 and v2 endpoints
 */
export function createPaginationWrapper<T extends Record<string, any>>(
  apiClient: T,
  config: PaginationConfig = DEFAULT_CONFIG
): T {
  const wrappedClient = {} as T;

  for (const [method, handler] of Object.entries(apiClient)) {
    if (typeof handler === "function") {
      wrappedClient[method as keyof T] = (async (...args: any[]) => {
        const endpoint = args[0] as string;

        // Only paginate GET requests
        if (method !== "GET") {
          return handler(...args);
        }

        const response = await handler(...args);

        // Check if this is already a paginated response (has _isPaginated flag)
        if (response._isPaginated) {
          return response;
        }

        // Check if we need to paginate based on response structure
        if (!shouldPaginate(response)) {
          return response;
        }

        // Check if there are more pages
        if (!hasMorePages(response)) {
          return response;
        }

        logger.warn(`Paginating`, args);
        logger.warn(`Auto-paginating ${endpoint}`);

        // Get pagination limit from the response
        const limit = getPaginationLimit(response);

        const allData: any[] = [];
        const allIncluded: any[] = [];
        let currentOffset = 0;
        let hasMore = true;
        let pageCount = 0;
        const maxPages = 10; // Safety limit to prevent infinite loops

        // Add current page data
        if (response.data?.data) {
          allData.push(...response.data.data);
        }
        if (response.data?.included) {
          allIncluded.push(...response.data.included);
        }

        // Initialize pagination state
        hasMore = (response.data?.data?.length || 0) === limit;
        currentOffset = limit;

        // Paginate through remaining pages
        while (hasMore && pageCount < maxPages) {
          pageCount++;
          const nextParams = getNextPageParams(
            args[1]?.query || {},
            limit,
            currentOffset
          );
          logger.warn(`Next params: ${JSON.stringify(nextParams)}`);

          // Create new args with updated query params
          const nextArgs = [...args];
          if (nextArgs[1]) {
            nextArgs[1] = {
              ...nextArgs[1],
              query: nextParams,
            };
          } else {
            nextArgs[1] = { query: nextParams };
          }

          const nextResponse = await handler(...nextArgs);

          if (nextResponse.error) {
            throw new ContextualError(
              `Failed to paginate ${endpoint} at offset ${currentOffset}`,
              nextResponse.error
            );
          }

          const nextDataLength = nextResponse.data?.data?.length || 0;
          logger.warn(
            `Next response data length: ${nextDataLength}, limit: ${limit}`
          );

          let newItems: any[] = [];
          if (nextResponse.data?.data) {
            // Check if we're getting duplicate data (same IDs)
            const existingIds = new Set(allData.map((item) => item.id));
            newItems = nextResponse.data.data.filter(
              (item: any) => !existingIds.has(item.id)
            );
            logger.warn(
              `New unique items: ${newItems.length} out of ${nextResponse.data.data.length}`
            );

            allData.push(...newItems);
          }
          if (nextResponse.data?.included) {
            allIncluded.push(...nextResponse.data.included);
          }

          // Update pagination state - stop if we got less than a full page or no new data
          hasMore =
            nextDataLength === limit &&
            nextDataLength > 0 &&
            newItems.length > 0;
          currentOffset += limit;

          logger.warn(
            `Has more pages: ${hasMore}, current offset: ${currentOffset}`
          );

          // Stop if we got no data at all
          if (nextDataLength === 0) {
            logger.warn(
              `No more data at offset ${currentOffset}, stopping pagination`
            );
            hasMore = false;
          }
        }

        // Check if we hit the max pages limit
        if (pageCount >= maxPages) {
          logger.warn(
            `Hit maximum page limit (${maxPages}), stopping pagination to prevent infinite loop`
          );
        }

        // Create paginated response
        const paginatedResponse = {
          ...response,
          data: {
            ...response.data,
            data: allData,
            included:
              allIncluded.length > 0 ? allIncluded : response.data?.included,
          },
          _isPaginated: true,
        };

        logger.warn(
          `Auto-pagination completed for ${endpoint}: ${allData.length} total items`
        );

        return paginatedResponse;
      }) as any;
    } else {
      wrappedClient[method as keyof T] = handler;
    }
  }

  return wrappedClient;
}
