/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromotedPurchaseCreateRequest } from '../models/PromotedPurchaseCreateRequest';
import type { PromotedPurchaseResponse } from '../models/PromotedPurchaseResponse';
import type { PromotedPurchaseUpdateRequest } from '../models/PromotedPurchaseUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PromotedPurchasesService {
    /**
     * @param requestBody PromotedPurchase representation
     * @returns PromotedPurchaseResponse Single PromotedPurchase
     * @throws ApiError
     */
    public static promotedPurchasesCreateInstance(
        requestBody: PromotedPurchaseCreateRequest,
    ): CancelablePromise<PromotedPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/promotedPurchases',
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
     * @param fieldsPromotedPurchases the fields to include for returned resources of type promotedPurchases
     * @param include comma-separated list of relationships to include
     * @returns PromotedPurchaseResponse Single PromotedPurchase
     * @throws ApiError
     */
    public static promotedPurchasesGetInstance(
        id: string,
        fieldsPromotedPurchases?: Array<'visibleForAllUsers' | 'enabled' | 'state' | 'inAppPurchaseV2' | 'subscription'>,
        include?: Array<'inAppPurchaseV2' | 'subscription'>,
    ): CancelablePromise<PromotedPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/promotedPurchases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[promotedPurchases]': fieldsPromotedPurchases,
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
     * @param requestBody PromotedPurchase representation
     * @returns PromotedPurchaseResponse Single PromotedPurchase
     * @throws ApiError
     */
    public static promotedPurchasesUpdateInstance(
        id: string,
        requestBody: PromotedPurchaseUpdateRequest,
    ): CancelablePromise<PromotedPurchaseResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/promotedPurchases/{id}',
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
    public static promotedPurchasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/promotedPurchases/{id}',
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
}
