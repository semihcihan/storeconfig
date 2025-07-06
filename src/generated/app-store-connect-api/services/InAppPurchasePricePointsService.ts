/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchasePricePointEqualizationsLinkagesResponse } from '../models/InAppPurchasePricePointEqualizationsLinkagesResponse';
import type { InAppPurchasePricePointsResponse } from '../models/InAppPurchasePricePointsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchasePricePointsService {
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns InAppPurchasePricePointEqualizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static inAppPurchasePricePointsEqualizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<InAppPurchasePricePointEqualizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePricePoints/{id}/relationships/equalizations',
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
     * @param filterInAppPurchaseV2 filter by id(s) of related 'inAppPurchaseV2'
     * @param fieldsInAppPurchasePricePoints the fields to include for returned resources of type inAppPurchasePricePoints
     * @param fieldsTerritories the fields to include for returned resources of type territories
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchasePricePointsResponse List of InAppPurchasePricePoints
     * @throws ApiError
     */
    public static inAppPurchasePricePointsEqualizationsGetToManyRelated(
        id: string,
        filterTerritory?: Array<string>,
        filterInAppPurchaseV2?: Array<string>,
        fieldsInAppPurchasePricePoints?: Array<'customerPrice' | 'proceeds' | 'territory' | 'equalizations'>,
        fieldsTerritories?: Array<'currency'>,
        limit?: number,
        include?: Array<'territory'>,
    ): CancelablePromise<InAppPurchasePricePointsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchasePricePoints/{id}/equalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[territory]': filterTerritory,
                'filter[inAppPurchaseV2]': filterInAppPurchaseV2,
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
