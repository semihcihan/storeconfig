/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppAvailabilityV2CreateRequest } from '../models/AppAvailabilityV2CreateRequest';
import type { AppAvailabilityV2Response } from '../models/AppAvailabilityV2Response';
import type { AppAvailabilityV2TerritoryAvailabilitiesLinkagesResponse } from '../models/AppAvailabilityV2TerritoryAvailabilitiesLinkagesResponse';
import type { TerritoryAvailabilitiesResponse } from '../models/TerritoryAvailabilitiesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppAvailabilitiesService {
    /**
     * @param requestBody AppAvailability representation
     * @returns AppAvailabilityV2Response Single AppAvailability
     * @throws ApiError
     */
    public static appAvailabilitiesV2CreateInstance(
        requestBody: AppAvailabilityV2CreateRequest,
    ): CancelablePromise<AppAvailabilityV2Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/appAvailabilities',
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
     * @param fieldsAppAvailabilities the fields to include for returned resources of type appAvailabilities
     * @param fieldsTerritoryAvailabilities the fields to include for returned resources of type territoryAvailabilities
     * @param include comma-separated list of relationships to include
     * @param limitTerritoryAvailabilities maximum number of related territoryAvailabilities returned (when they are included)
     * @returns AppAvailabilityV2Response Single AppAvailability
     * @throws ApiError
     */
    public static appAvailabilitiesV2GetInstance(
        id: string,
        fieldsAppAvailabilities?: Array<'availableInNewTerritories' | 'territoryAvailabilities'>,
        fieldsTerritoryAvailabilities?: Array<'available' | 'releaseDate' | 'preOrderEnabled' | 'preOrderPublishDate' | 'contentStatuses' | 'territory'>,
        include?: Array<'territoryAvailabilities'>,
        limitTerritoryAvailabilities?: number,
    ): CancelablePromise<AppAvailabilityV2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appAvailabilities/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appAvailabilities]': fieldsAppAvailabilities,
                'fields[territoryAvailabilities]': fieldsTerritoryAvailabilities,
                'include': include,
                'limit[territoryAvailabilities]': limitTerritoryAvailabilities,
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
     * @returns AppAvailabilityV2TerritoryAvailabilitiesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appAvailabilitiesV2TerritoryAvailabilitiesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppAvailabilityV2TerritoryAvailabilitiesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appAvailabilities/{id}/relationships/territoryAvailabilities',
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
     * @param fieldsTerritoryAvailabilities the fields to include for returned resources of type territoryAvailabilities
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns TerritoryAvailabilitiesResponse List of TerritoryAvailabilities
     * @throws ApiError
     */
    public static appAvailabilitiesV2TerritoryAvailabilitiesGetToManyRelated(
        id: string,
        fieldsTerritoryAvailabilities?: Array<'available' | 'releaseDate' | 'preOrderEnabled' | 'preOrderPublishDate' | 'contentStatuses' | 'territory'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<TerritoryAvailabilitiesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/appAvailabilities/{id}/territoryAvailabilities',
            path: {
                'id': id,
            },
            query: {
                'fields[territoryAvailabilities]': fieldsTerritoryAvailabilities,
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
