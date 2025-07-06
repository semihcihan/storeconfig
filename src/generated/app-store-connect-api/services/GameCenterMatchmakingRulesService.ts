/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingBooleanRuleResultsV1MetricResponse } from '../models/GameCenterMatchmakingBooleanRuleResultsV1MetricResponse';
import type { GameCenterMatchmakingNumberRuleResultsV1MetricResponse } from '../models/GameCenterMatchmakingNumberRuleResultsV1MetricResponse';
import type { GameCenterMatchmakingRuleCreateRequest } from '../models/GameCenterMatchmakingRuleCreateRequest';
import type { GameCenterMatchmakingRuleErrorsV1MetricResponse } from '../models/GameCenterMatchmakingRuleErrorsV1MetricResponse';
import type { GameCenterMatchmakingRuleResponse } from '../models/GameCenterMatchmakingRuleResponse';
import type { GameCenterMatchmakingRuleUpdateRequest } from '../models/GameCenterMatchmakingRuleUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterMatchmakingRulesService {
    /**
     * @param requestBody GameCenterMatchmakingRule representation
     * @returns GameCenterMatchmakingRuleResponse Single GameCenterMatchmakingRule
     * @throws ApiError
     */
    public static gameCenterMatchmakingRulesCreateInstance(
        requestBody: GameCenterMatchmakingRuleCreateRequest,
    ): CancelablePromise<GameCenterMatchmakingRuleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterMatchmakingRules',
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
     * @param requestBody GameCenterMatchmakingRule representation
     * @returns GameCenterMatchmakingRuleResponse Single GameCenterMatchmakingRule
     * @throws ApiError
     */
    public static gameCenterMatchmakingRulesUpdateInstance(
        id: string,
        requestBody: GameCenterMatchmakingRuleUpdateRequest,
    ): CancelablePromise<GameCenterMatchmakingRuleResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterMatchmakingRules/{id}',
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
    public static gameCenterMatchmakingRulesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterMatchmakingRules/{id}',
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
