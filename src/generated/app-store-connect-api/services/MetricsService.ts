/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppsBetaTesterUsagesV1MetricResponse } from '../models/AppsBetaTesterUsagesV1MetricResponse';
import type { BetaBuildUsagesV1MetricResponse } from '../models/BetaBuildUsagesV1MetricResponse';
import type { BetaPublicLinkUsagesV1MetricResponse } from '../models/BetaPublicLinkUsagesV1MetricResponse';
import type { BetaTesterUsagesV1MetricResponse } from '../models/BetaTesterUsagesV1MetricResponse';
import type { GameCenterMatchmakingAppRequestsV1MetricResponse } from '../models/GameCenterMatchmakingAppRequestsV1MetricResponse';
import type { GameCenterMatchmakingBooleanRuleResultsV1MetricResponse } from '../models/GameCenterMatchmakingBooleanRuleResultsV1MetricResponse';
import type { GameCenterMatchmakingNumberRuleResultsV1MetricResponse } from '../models/GameCenterMatchmakingNumberRuleResultsV1MetricResponse';
import type { GameCenterMatchmakingQueueRequestsV1MetricResponse } from '../models/GameCenterMatchmakingQueueRequestsV1MetricResponse';
import type { GameCenterMatchmakingQueueSizesV1MetricResponse } from '../models/GameCenterMatchmakingQueueSizesV1MetricResponse';
import type { GameCenterMatchmakingRuleErrorsV1MetricResponse } from '../models/GameCenterMatchmakingRuleErrorsV1MetricResponse';
import type { GameCenterMatchmakingSessionsV1MetricResponse } from '../models/GameCenterMatchmakingSessionsV1MetricResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MetricsService {
    /**
     * @param id the id of the requested resource
     * @param period the duration of the reporting period
     * @param groupBy the dimension by which to group the results
     * @param filterBetaTesters filter by 'betaTesters' relationship dimension
     * @param limit maximum number of groups to return per page
     * @returns AppsBetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static appsBetaTesterUsagesGetMetrics(
        id: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        groupBy?: Array<'betaTesters'>,
        filterBetaTesters?: string,
        limit?: number,
    ): CancelablePromise<AppsBetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/apps/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'groupBy': groupBy,
                'filter[betaTesters]': filterBetaTesters,
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
     * @param period the duration of the reporting period
     * @param groupBy the dimension by which to group the results
     * @param filterBetaTesters filter by 'betaTesters' relationship dimension
     * @param limit maximum number of groups to return per page
     * @returns AppsBetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaGroupsBetaTesterUsagesGetMetrics(
        id: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        groupBy?: Array<'betaTesters'>,
        filterBetaTesters?: string,
        limit?: number,
    ): CancelablePromise<AppsBetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'groupBy': groupBy,
                'filter[betaTesters]': filterBetaTesters,
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
     * @param limit maximum number of groups to return per page
     * @returns BetaPublicLinkUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaGroupsPublicLinkUsagesGetMetrics(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaPublicLinkUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaGroups/{id}/metrics/publicLinkUsages',
            path: {
                'id': id,
            },
            query: {
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
     * @param filterApps filter by 'apps' relationship dimension
     * @param period the duration of the reporting period
     * @param limit maximum number of groups to return per page
     * @returns BetaTesterUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static betaTestersBetaTesterUsagesGetMetrics(
        id: string,
        filterApps: string,
        period?: 'P7D' | 'P30D' | 'P90D' | 'P365D',
        limit?: number,
    ): CancelablePromise<BetaTesterUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaTesters/{id}/metrics/betaTesterUsages',
            path: {
                'id': id,
            },
            query: {
                'period': period,
                'filter[apps]': filterApps,
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
     * @param limit maximum number of groups to return per page
     * @returns BetaBuildUsagesV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static buildsBetaBuildUsagesGetMetrics(
        id: string,
        limit?: number,
    ): CancelablePromise<BetaBuildUsagesV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/builds/{id}/metrics/betaBuildUsages',
            path: {
                'id': id,
            },
            query: {
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
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingAppRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterDetailsClassicMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingAppRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/metrics/classicMatchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
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
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingAppRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterDetailsRuleBasedMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingAppRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/metrics/ruleBasedMatchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
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
    /**
     * @param id the id of the requested resource
     * @param granularity the granularity of the per-group dataset
     * @param groupBy the dimension by which to group the results
     * @param filterResult filter by 'result' attribute dimension
     * @param filterGameCenterMatchmakingQueue filter by 'gameCenterMatchmakingQueue' relationship dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingBooleanRuleResultsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingRulesMatchmakingBooleanRuleResultsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result' | 'gameCenterMatchmakingQueue'>,
        filterResult?: string,
        filterGameCenterMatchmakingQueue?: string,
        sort?: Array<'count' | '-count'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingBooleanRuleResultsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingBooleanRuleResults',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
                'filter[gameCenterMatchmakingQueue]': filterGameCenterMatchmakingQueue,
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
     * @param filterGameCenterMatchmakingQueue filter by 'gameCenterMatchmakingQueue' relationship dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingNumberRuleResultsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingRulesMatchmakingNumberRuleResultsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'gameCenterMatchmakingQueue'>,
        filterGameCenterMatchmakingQueue?: string,
        sort?: Array<'count' | '-count' | 'averageResult' | '-averageResult' | 'p50Result' | '-p50Result' | 'p95Result' | '-p95Result'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingNumberRuleResultsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingNumberRuleResults',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[gameCenterMatchmakingQueue]': filterGameCenterMatchmakingQueue,
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
     * @param filterGameCenterMatchmakingQueue filter by 'gameCenterMatchmakingQueue' relationship dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingRuleErrorsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterMatchmakingRulesMatchmakingRuleErrorsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'gameCenterMatchmakingQueue'>,
        filterGameCenterMatchmakingQueue?: string,
        sort?: Array<'count' | '-count'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleErrorsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingRuleErrors',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[gameCenterMatchmakingQueue]': filterGameCenterMatchmakingQueue,
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
