/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionAvailabilityAvailableTerritoriesLinkagesResponse } from '../models/SubscriptionAvailabilityAvailableTerritoriesLinkagesResponse';
import type { SubscriptionAvailabilityCreateRequest } from '../models/SubscriptionAvailabilityCreateRequest';
import type { SubscriptionAvailabilityResponse } from '../models/SubscriptionAvailabilityResponse';
import type { TerritoriesResponse } from '../models/TerritoriesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionAvailabilitiesService {
    /**
     * @param requestBody SubscriptionAvailability representation
     * @returns SubscriptionAvailabilityResponse Single SubscriptionAvailability
     * @throws ApiError
     */
    public static subscriptionAvailabilitiesCreateInstance(
        requestBody: SubscriptionAvailabilityCreateRequest,
    ): CancelablePromise<SubscriptionAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionAvailabilities',
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
     * @param fieldsSubscriptionAvailabilities the fields to include for returned resources of type subscriptionAvailabilities
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param include comma-separated list of relationships to include
     * @param limitAvailableTerritories maximum number of related availableTerritories returned (when they are included)
     * @returns SubscriptionAvailabilityResponse Single SubscriptionAvailability
     * @throws ApiError
     */
    public static subscriptionAvailabilitiesGetInstance(
        id: string,
        fieldsSubscriptionAvailabilities?: Array<'availableInNewTerritories' | 'availableTerritories'>,
        fieldsTerritories?: Array<'currency'>,
        include?: Array<'availableTerritories'>,
        limitAvailableTerritories?: number,
    ): CancelablePromise<SubscriptionAvailabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionAvailabilities/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionAvailabilities]': fieldsSubscriptionAvailabilities,
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
     * @returns SubscriptionAvailabilityAvailableTerritoriesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionAvailabilitiesAvailableTerritoriesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionAvailabilityAvailableTerritoriesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionAvailabilities/{id}/relationships/availableTerritories',
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
    public static subscriptionAvailabilitiesAvailableTerritoriesGetToManyRelated(
        id: string,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
    ): CancelablePromise<TerritoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionAvailabilities/{id}/availableTerritories',
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
