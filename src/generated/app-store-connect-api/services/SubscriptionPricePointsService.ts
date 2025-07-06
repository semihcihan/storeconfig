/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPricePointEqualizationsLinkagesResponse } from '../models/SubscriptionPricePointEqualizationsLinkagesResponse';
import type { SubscriptionPricePointResponse } from '../models/SubscriptionPricePointResponse';
import type { SubscriptionPricePointsResponse } from '../models/SubscriptionPricePointsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionPricePointsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionPricePointResponse Single SubscriptionPricePoint
     * @throws ApiError
     */
    public static subscriptionPricePointsGetInstance(
        id: string,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        include?: Array<'territory'>,
    ): CancelablePromise<SubscriptionPricePointResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPricePoints/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
     * @param limit maximum resources per page
     * @returns SubscriptionPricePointEqualizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static subscriptionPricePointsEqualizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<SubscriptionPricePointEqualizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPricePoints/{id}/relationships/equalizations',
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
     * @param filterSubscription filter by id(s) of related 'subscription'
     * @param fieldsSubscriptionPricePoints the fields to include for returned resources of type subscriptionPricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionPricePointsResponse List of SubscriptionPricePoints
     * @throws ApiError
     */
    public static subscriptionPricePointsEqualizationsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        filterSubscription?: Array<string>,
        fieldsSubscriptionPricePoints?: Array<'customerPrice' | 'proceeds' | 'proceedsYear2' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<SubscriptionPricePointsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionPricePoints/{id}/equalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'filter[subscription]': filterSubscription,
                'fields[subscriptionPricePoints]': fieldsSubscriptionPricePoints,
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
