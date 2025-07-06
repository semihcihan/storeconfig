/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchasePriceScheduleAutomaticPricesLinkagesResponse } from '../models/InAppPurchasePriceScheduleAutomaticPricesLinkagesResponse';
import type { InAppPurchasePriceScheduleBaseTerritoryLinkageResponse } from '../models/InAppPurchasePriceScheduleBaseTerritoryLinkageResponse';
import type { InAppPurchasePriceScheduleCreateRequest } from '../models/InAppPurchasePriceScheduleCreateRequest';
import type { InAppPurchasePriceScheduleManualPricesLinkagesResponse } from '../models/InAppPurchasePriceScheduleManualPricesLinkagesResponse';
import type { InAppPurchasePriceScheduleResponse } from '../models/InAppPurchasePriceScheduleResponse';
import type { InAppPurchasePricesResponse } from '../models/InAppPurchasePricesResponse';
import type { TerritoryResponse } from '../models/TerritoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchasePriceSchedulesService {
    /**
     * @param requestBody InAppPurchasePriceSchedule representation
     * @returns InAppPurchasePriceScheduleResponse Single InAppPurchasePriceSchedule
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesCreateInstance(
        requestBody: InAppPurchasePriceScheduleCreateRequest,
    ): CancelablePromise<InAppPurchasePriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchasePriceSchedules',
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
     * @param fieldsInAppPurchasePriceSchedules the fields to include for returned resources of type inAppPurchasePriceSchedules
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param fieldsInAppPurchasePrices the fields to include for returned resources of type inAppPurchasePrices
     * @param include comma-separated list of relationships to include
     * @param limitAutomaticPrices maximum number of related automaticPrices returned (when they are included)
     * @param limitManualPrices maximum number of related manualPrices returned (when they are included)
     * @returns InAppPurchasePriceScheduleResponse Single InAppPurchasePriceSchedule
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesGetInstance(
        id: string,
        fieldsInAppPurchasePriceSchedules?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        fieldsTerritories?: Array<'currency'>,
        fieldsInAppPurchasePrices?: Array<'startDate' | 'endDate' | 'manual' | 'inAppPurchasePricePoint' | 'territory'>,
        include?: Array<'baseTerritory' | 'manualPrices' | 'automaticPrices'>,
        limitAutomaticPrices?: number,
        limitManualPrices?: number,
    ): CancelablePromise<InAppPurchasePriceScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchasePriceSchedules]': fieldsInAppPurchasePriceSchedules,
                'fields[territories]': fieldsTerritories,
                'fields[inAppPurchasePrices]': fieldsInAppPurchasePrices,
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
     * @returns InAppPurchasePriceScheduleAutomaticPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesAutomaticPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchasePriceScheduleAutomaticPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/relationships/automaticPrices',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsInAppPurchasePrices the fields to include for returned resources of type inAppPurchasePrices
     * @param fieldsInAppPurchasePricePoints the fields to include for returned resources of type inAppPurchasePricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchasePricesResponse List of InAppPurchasePrices
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesAutomaticPricesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsInAppPurchasePrices?: Array<'startDate' | 'endDate' | 'manual' | 'inAppPurchasePricePoint' | 'territory'>,
        fieldsInAppPurchasePricePoints?: Array<'customerPrice' | 'proceeds' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'inAppPurchasePricePoint' | 'territory'>,
    ): CancelablePromise<InAppPurchasePricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/automaticPrices',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[inAppPurchasePrices]': fieldsInAppPurchasePrices,
                'fields[inAppPurchasePricePoints]': fieldsInAppPurchasePricePoints,
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
     * @returns InAppPurchasePriceScheduleBaseTerritoryLinkageResponse Related linkage
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesBaseTerritoryGetToOneRelationship(
        id: string,
    ): CancelablePromise<InAppPurchasePriceScheduleBaseTerritoryLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/relationships/baseTerritory',
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
    public static inAppPurchasePriceSchedulesBaseTerritoryGetToOneRelated(
        id: string,
        fieldsTerritories?: Array<'currency'>,
    ): CancelablePromise<TerritoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/baseTerritory',
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
     * @returns InAppPurchasePriceScheduleManualPricesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesManualPricesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchasePriceScheduleManualPricesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/relationships/manualPrices',
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
     * @param filterTerritory filter by id(s) of related 'territory'
     * @param fieldsInAppPurchasePrices the fields to include for returned resources of type inAppPurchasePrices
     * @param fieldsInAppPurchasePricePoints the fields to include for returned resources of type inAppPurchasePricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchasePricesResponse List of InAppPurchasePrices
     * @throws ApiError
     */
    public static inAppPurchasePriceSchedulesManualPricesGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        fieldsInAppPurchasePrices?: Array<'startDate' | 'endDate' | 'manual' | 'inAppPurchasePricePoint' | 'territory'>,
        fieldsInAppPurchasePricePoints?: Array<'customerPrice' | 'proceeds' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'inAppPurchasePricePoint' | 'territory'>,
    ): CancelablePromise<InAppPurchasePricesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePriceSchedules/{id}/manualPrices',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'fields[inAppPurchasePrices]': fieldsInAppPurchasePrices,
                'fields[inAppPurchasePricePoints]': fieldsInAppPurchasePricePoints,
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
