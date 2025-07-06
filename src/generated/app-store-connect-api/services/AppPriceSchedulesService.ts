/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPriceScheduleAutomaticPricesLinkagesResponse } from '../models/AppPriceScheduleAutomaticPricesLinkagesResponse';
import type { AppPriceScheduleBaseTerritoryLinkageResponse } from '../models/AppPriceScheduleBaseTerritoryLinkageResponse';
import type { AppPriceScheduleCreateRequest } from '../models/AppPriceScheduleCreateRequest';
import type { AppPriceScheduleManualPricesLinkagesResponse } from '../models/AppPriceScheduleManualPricesLinkagesResponse';
import type { AppPriceScheduleResponse } from '../models/AppPriceScheduleResponse';
import type { AppPricesV2Response } from '../models/AppPricesV2Response';
import type { TerritoryResponse } from '../models/TerritoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppPriceSchedulesService {
    /**
     * @param requestBody AppPriceSchedule representation
     * @returns AppPriceScheduleResponse Single AppPriceSchedule
     * @throws ApiError
     */
    public static appPriceSchedulesCreateInstance(
        requestBody: AppPriceScheduleCreateRequest,
    ): CancelablePromise<AppPriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appPriceSchedules',
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
     * @param fieldsAppPriceSchedules the fields to include for returned resources of type appPriceSchedules
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsAppPrices the fields to include for returned resources of type appPrices
     * @param include comma-separated list of relationships to include
     * @param limitAutomaticPrices maximum number of related automaticPrices returned (when they are included)
     * @param limitManualPrices maximum number of related manualPrices returned (when they are included)
     * @returns AppPriceScheduleResponse Single AppPriceSchedule
     * @throws ApiError
     */
    public static appPriceSchedulesGetInstance(
        id: string,
        fieldsAppPriceSchedules?: Array<'app' | 'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsAppPrices?: Array<'manual' | 'startDate' | 'endDate' | 'appPricePoint' | 'territory'>,
        include?: Array<'app' | 'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        limitAutomaticPrices?: number,
        limitManualPrices?: number,
    ): CancelablePromise<AppPriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appPriceSchedules]': fieldsAppPriceSchedules,
                'fields[territories]': fieldsTerritories,
                'fields[appPrices]': fieldsAppPrices,
                'include': include,
                'limit[automaticPrices]': limitAutomaticPrices,
                'limit[manualPrices]': limitManualPrices,
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
     * @param limit maximum resources per page
     * @returns AppPriceScheduleAutomaticPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appPriceSchedulesAutomaticPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPriceScheduleAutomaticPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/relationships/automaticPrices',
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
     * @param filterStartDate filter by attribute 'startDate'
     * @param filterEndDate filter by attribute 'endDate'
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsAppPrices the fields to include for returned resources of type appPrices
     * @param fieldsAppPricePoints the fields to include for returned resources of type appPricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppPricesV2Response List of AppPrices
     * @throws ApiError
     */
    public static appPriceSchedulesAutomaticPricesGetToManyRelated(
        id: string,
        filterStartDate?: Array<string>,
        filterEndDate?: Array<string>,
        filterTerritory?: Array<string>,
        fieldsAppPrices?: Array<'manual' | 'startDate' | 'endDate' | 'appPricePoint' | 'territory'>,
        fieldsAppPricePoints?: Array<'customerPrice' | 'proceeds' | 'app' | 'equalizations' | 'territory'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'appPricePoint' | 'territory'>,
    ): CancelablePromise<AppPricesV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/automaticPrices',
            path: {
                'id': id,
            },
            query: {
                'filter[startDate]': filterStartDate,
                'filter[endDate]': filterEndDate,
                'filter[territory]': filterTerritory,
                'fields[appPrices]': fieldsAppPrices,
                'fields[appPricePoints]': fieldsAppPricePoints,
                'fields[territories]': fieldsTerritories,
                'limit': limit,
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
     * @returns AppPriceScheduleBaseTerritoryLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appPriceSchedulesBaseTerritoryGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppPriceScheduleBaseTerritoryLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/relationships/baseTerritory',
            path: {
                'id': id,
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
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @returns TerritoryResponse Single Territory
     * @throws ApiError
     */
    public static appPriceSchedulesBaseTerritoryGetToOneRelated(
        id: string,
        fieldsTerritories?: Array<'currency'>,
    ): CancelablePromise<TerritoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/baseTerritory',
            path: {
                'id': id,
            },
            query: {
                'fields[territories]': fieldsTerritories,
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
     * @param limit maximum resources per page
     * @returns AppPriceScheduleManualPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appPriceSchedulesManualPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPriceScheduleManualPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/relationships/manualPrices',
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
     * @param filterStartDate filter by attribute 'startDate'
     * @param filterEndDate filter by attribute 'endDate'
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsAppPrices the fields to include for returned resources of type appPrices
     * @param fieldsAppPricePoints the fields to include for returned resources of type appPricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppPricesV2Response List of AppPrices
     * @throws ApiError
     */
    public static appPriceSchedulesManualPricesGetToManyRelated(
        id: string,
        filterStartDate?: Array<string>,
        filterEndDate?: Array<string>,
        filterTerritory?: Array<string>,
        fieldsAppPrices?: Array<'manual' | 'startDate' | 'endDate' | 'appPricePoint' | 'territory'>,
        fieldsAppPricePoints?: Array<'customerPrice' | 'proceeds' | 'app' | 'equalizations' | 'territory'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'appPricePoint' | 'territory'>,
    ): CancelablePromise<AppPricesV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPriceSchedules/{id}/manualPrices',
            path: {
                'id': id,
            },
            query: {
                'filter[startDate]': filterStartDate,
                'filter[endDate]': filterEndDate,
                'filter[territory]': filterTerritory,
                'fields[appPrices]': fieldsAppPrices,
                'fields[appPricePoints]': fieldsAppPricePoints,
                'fields[territories]': fieldsTerritories,
                'limit': limit,
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
}
