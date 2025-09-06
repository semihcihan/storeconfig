import { logger } from "../utils/logger";
import { API_LIMITS } from "../helpers/constants";
import { ContextualError } from "../helpers/error-handling-helpers";

interface PaginationConfig {
  v1Limit: number;
  v2Limit: number;
}

const DEFAULT_CONFIG: PaginationConfig = {
  v1Limit: API_LIMITS.DEFAULT_LIMIT_v1,
  v2Limit: API_LIMITS.DEFAULT_LIMIT_v2,
};

interface PaginationState {
  allData: any[];
  allIncluded: any[];
  currentCursor?: string;
  hasMore: boolean;
  pageCount: number;
}

class PaginationHandler {
  private config: PaginationConfig;
  private maxPages = 10;

  constructor(config: PaginationConfig) {
    this.config = config;
  }

  shouldAutoPaginate(response: any, queryParams: any): boolean {
    // Already paginated
    if (response._isPaginated) return false;

    // No pagination info
    if (!response.data?.meta?.paging) return false;

    // No nextCursor
    if (!response.data.meta.paging.nextCursor) return false;

    // No limit parameter
    if (!queryParams.hasOwnProperty("limit")) return false;

    // Custom limit (not default)
    if (
      queryParams.limit !== this.config.v2Limit &&
      queryParams.limit !== this.config.v1Limit
    )
      return false;

    return true;
  }

  private initializeState(response: any): PaginationState {
    return {
      allData: response.data?.data ? [...response.data.data] : [],
      allIncluded: response.data?.included ? [...response.data.included] : [],
      currentCursor: response.data?.meta?.paging?.nextCursor,
      hasMore: !!response.data?.meta?.paging?.nextCursor,
      pageCount: 0,
    };
  }

  private createNextRequestArgs(
    originalArgs: any[],
    nextCursor: string,
    limit: number
  ): any[] {
    const nextArgs = [...originalArgs];
    const nextParams = {
      ...(originalArgs[1]?.params?.query || originalArgs[1]?.query || {}),
      limit,
      cursor: nextCursor,
    };

    if (nextArgs[1]) {
      if (nextArgs[1].params) {
        nextArgs[1] = {
          ...nextArgs[1],
          params: { ...nextArgs[1].params, query: nextParams },
        };
      } else {
        nextArgs[1] = { ...nextArgs[1], query: nextParams };
      }
    } else {
      nextArgs[1] = { query: nextParams };
    }

    return nextArgs;
  }

  private updateState(state: PaginationState, response: any): void {
    // Add new data
    if (response.data?.data) {
      state.allData.push(...response.data.data);
    }
    if (response.data?.included) {
      state.allIncluded.push(...response.data.included);
    }

    // Update pagination state
    const paging = response.data?.meta?.paging;
    if (paging) {
      state.currentCursor = paging.nextCursor;
      state.hasMore = !!paging.nextCursor;
    } else {
      state.hasMore = false;
    }
  }

  private createPaginatedResponse(
    originalResponse: any,
    state: PaginationState
  ): any {
    return {
      ...originalResponse,
      data: {
        ...originalResponse.data,
        data: state.allData,
        included:
          state.allIncluded.length > 0
            ? state.allIncluded
            : originalResponse.data?.included,
      },
      _isPaginated: true,
    };
  }

  async paginate(
    endpoint: string,
    originalArgs: any[],
    handler: Function,
    response: any
  ): Promise<any> {
    const limit = response.data.meta.paging.limit;

    logger.debug(`Auto-paginating ${endpoint} with limit ${limit}`);

    const state = this.initializeState(response);

    while (state.hasMore && state.pageCount < this.maxPages) {
      state.pageCount++;

      const nextArgs = this.createNextRequestArgs(
        originalArgs,
        state.currentCursor!,
        limit
      );
      const nextResponse = await handler(...nextArgs);

      if (nextResponse.error) {
        throw new ContextualError(
          `Failed to paginate ${endpoint} at page ${state.pageCount}`,
          nextResponse.error
        );
      }

      this.updateState(state, nextResponse);

      logger.debug(
        `Page ${state.pageCount}: ${
          nextResponse.data?.data?.length || 0
        } items, hasMore: ${state.hasMore}`
      );
    }

    if (state.pageCount >= this.maxPages) {
      logger.debug(
        `Hit max pages limit (${this.maxPages}), stopping pagination`
      );
    }

    logger.debug(`Pagination complete: ${state.allData.length} total items`);
    return this.createPaginatedResponse(response, state);
  }
}

export function createPaginationWrapper<T extends Record<string, any>>(
  apiClient: T,
  config: PaginationConfig = DEFAULT_CONFIG
): T {
  const paginationHandler = new PaginationHandler(config);
  const wrappedClient = {} as T;

  for (const [method, handler] of Object.entries(apiClient)) {
    if (typeof handler === "function") {
      wrappedClient[method as keyof T] = (async (...args: any[]) => {
        // Only paginate GET requests
        if (method !== "GET") {
          return handler(...args);
        }

        const endpoint = args[0] as string;
        const response = await handler(...args);

        // Check if we should auto-paginate
        const queryParams = args[1]?.params?.query || args[1]?.query || {};
        if (paginationHandler.shouldAutoPaginate(response, queryParams)) {
          return paginationHandler.paginate(endpoint, args, handler, response);
        }

        return response;
      }) as any;
    } else {
      wrappedClient[method as keyof T] = handler;
    }
  }

  return wrappedClient;
}
