/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingQueueCreateRequest } from '../models/GameCenterMatchmakingQueueCreateRequest';
import type { GameCenterMatchmakingQueueRequestsV1MetricResponse } from '../models/GameCenterMatchmakingQueueRequestsV1MetricResponse';
import type { GameCenterMatchmakingQueueResponse } from '../models/GameCenterMatchmakingQueueResponse';
import type { GameCenterMatchmakingQueueSizesV1MetricResponse } from '../models/GameCenterMatchmakingQueueSizesV1MetricResponse';
import type { GameCenterMatchmakingQueuesResponse } from '../models/GameCenterMatchmakingQueuesResponse';
import type { GameCenterMatchmakingQueueUpdateRequest } from '../models/GameCenterMatchmakingQueueUpdateRequest';
import type { GameCenterMatchmakingSessionsV1MetricResponse } from '../models/GameCenterMatchmakingSessionsV1MetricResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterMatchmakingQueuesService {
    /**
     * @param fieldsGameCenterMatchmakingQueues the fields to include for returned resources of type gameCenterMatchmakingQueues
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterMatchmakingQueuesResponse List of GameCenterMatchmakingQueues
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesGetCollection(
        fieldsGameCenterMatchmakingQueues?: Array<'referenceName' | 'classicMatchmakingBundleIds' | 'ruleSet' | 'experimentRuleSet'>,
        limit?: number,
        include?: Array<'ruleSet' | 'experimentRuleSet'>,
    ): CancelablePromise<GameCenterMatchmakingQueuesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues',
            query: {
                'fields[gameCenterMatchmakingQueues]': fieldsGameCenterMatchmakingQueues,
                'limit': limit,
                'include': include,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param requestBody GameCenterMatchmakingQueue representation
     * @returns GameCenterMatchmakingQueueResponse Single GameCenterMatchmakingQueue
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesCreateInstance(
        requestBody: GameCenterMatchmakingQueueCreateRequest,
    ): CancelablePromise<GameCenterMatchmakingQueueResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterMatchmakingQueues',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param fieldsGameCenterMatchmakingQueues the fields to include for returned resources of type gameCenterMatchmakingQueues
     * @param include comma-separated list of relationships to include
     * @returns GameCenterMatchmakingQueueResponse Single GameCenterMatchmakingQueue
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesGetInstance(
        id: string,
        fieldsGameCenterMatchmakingQueues?: Array<'referenceName' | 'classicMatchmakingBundleIds' | 'ruleSet' | 'experimentRuleSet'>,
        include?: Array<'ruleSet' | 'experimentRuleSet'>,
    ): CancelablePromise<GameCenterMatchmakingQueueResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterMatchmakingQueues]': fieldsGameCenterMatchmakingQueues,
                'include': include,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param requestBody GameCenterMatchmakingQueue representation
     * @returns GameCenterMatchmakingQueueResponse Single GameCenterMatchmakingQueue
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesUpdateInstance(
        id: string,
        requestBody: GameCenterMatchmakingQueueUpdateRequest,
    ): CancelablePromise<GameCenterMatchmakingQueueResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterMatchmakingQueues/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterMatchmakingQueues/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingQueueSizesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesExperimentMatchmakingQueueSizesGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        sort?: Array<'count' | '-count' | 'averageNumberOfRequests' | '-averageNumberOfRequests' | 'p50NumberOfRequests' | '-p50NumberOfRequests' | 'p95NumberOfRequests' | '-p95NumberOfRequests'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingQueueSizesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}/metrics/experimentMatchmakingQueueSizes',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'sort': sort,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param groupBy the dimension by which to group the results
     * @param filterResult filter by 'result' attribute dimension
     * @param filterGameCenterDetail filter by 'gameCenterDetail' relationship dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingQueueRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesExperimentMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result' | 'gameCenterDetail'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        filterGameCenterDetail?: string,
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingQueueRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}/metrics/experimentMatchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
                'filter[gameCenterDetail]': filterGameCenterDetail,
                'sort': sort,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingQueueSizesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesMatchmakingQueueSizesGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        sort?: Array<'count' | '-count' | 'averageNumberOfRequests' | '-averageNumberOfRequests' | 'p50NumberOfRequests' | '-p50NumberOfRequests' | 'p95NumberOfRequests' | '-p95NumberOfRequests'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingQueueSizesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}/metrics/matchmakingQueueSizes',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'sort': sort,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param groupBy the dimension by which to group the results
     * @param filterResult filter by 'result' attribute dimension
     * @param filterGameCenterDetail filter by 'gameCenterDetail' relationship dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingQueueRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result' | 'gameCenterDetail'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        filterGameCenterDetail?: string,
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingQueueRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}/metrics/matchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
                'filter[gameCenterDetail]': filterGameCenterDetail,
                'sort': sort,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingSessionsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingQueuesMatchmakingSessionsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        sort?: Array<'count' | '-count' | 'averagePlayerCount' | '-averagePlayerCount' | 'p50PlayerCount' | '-p50PlayerCount' | 'p95PlayerCount' | '-p95PlayerCount'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingSessionsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingQueues/{id}/metrics/matchmakingSessions',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'sort': sort,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
