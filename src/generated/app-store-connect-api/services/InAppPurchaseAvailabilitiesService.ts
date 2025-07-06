/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseAvailabilityAvailableTerritoriesLinkagesResponse } from '../models/InAppPurchaseAvailabilityAvailableTerritoriesLinkagesResponse';
import type { InAppPurchaseAvailabilityCreateRequest } from '../models/InAppPurchaseAvailabilityCreateRequest';
import type { InAppPurchaseAvailabilityResponse } from '../models/InAppPurchaseAvailabilityResponse';
import type { TerritoriesResponse } from '../models/TerritoriesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseAvailabilitiesService {
    /**
     * @param requestBody InAppPurchaseAvailability representation
     * @returns InAppPurchaseAvailabilityResponse Single InAppPurchaseAvailability
     * @throws ApiError
     */
    public static inAppPurchaseAvailabilitiesCreateInstance(
        requestBody: InAppPurchaseAvailabilityCreateRequest,
    ): CancelablePromise<InAppPurchaseAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchaseAvailabilities',
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
     * @param fieldsInAppPurchaseAvailabilities the fields to include for returned resources of type inAppPurchaseAvailabilities
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param include comma-separated list of relationships to include
     * @param limitAvailableTerritories maximum number of related availableTerritories returned (when they are included)
     * @returns InAppPurchaseAvailabilityResponse Single InAppPurchaseAvailability
     * @throws ApiError
     */
    public static inAppPurchaseAvailabilitiesGetInstance(
        id: string,
        fieldsInAppPurchaseAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsTerritories?: Array<'currency'>,
        include?: Array<'availableTerritories'>,
        limitAvailableTerritories?: number,
    ): CancelablePromise<InAppPurchaseAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseAvailabilities/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseAvailabilities]': fieldsInAppPurchaseAvailabilities,
                'fields[territories]': fieldsTerritories,
                'include': include,
                'limit[availableTerritories]': limitAvailableTerritories,
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
     * @returns InAppPurchaseAvailabilityAvailableTerritoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchaseAvailabilitiesAvailableTerritoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchaseAvailabilityAvailableTerritoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseAvailabilities/{id}/relationships/availableTerritories',
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
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @returns TerritoriesResponse List of Territories
     * @throws ApiError
     */
    public static inAppPurchaseAvailabilitiesAvailableTerritoriesGetToManyRelated(
        id: string,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
    ): CancelablePromise<TerritoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseAvailabilities/{id}/availableTerritories',
            path: {
                'id': id,
            },
            query: {
                'fields[territories]': fieldsTerritories,
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
