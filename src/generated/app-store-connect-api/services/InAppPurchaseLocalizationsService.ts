/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseLocalizationCreateRequest } from '../models/InAppPurchaseLocalizationCreateRequest';
import type { InAppPurchaseLocalizationResponse } from '../models/InAppPurchaseLocalizationResponse';
import type { InAppPurchaseLocalizationUpdateRequest } from '../models/InAppPurchaseLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseLocalizationsService {
    /**
     * @param requestBody InAppPurchaseLocalization representation
     * @returns InAppPurchaseLocalizationResponse Single InAppPurchaseLocalization
     * @throws ApiError
     */
    public static inAppPurchaseLocalizationsCreateInstance(
        requestBody: InAppPurchaseLocalizationCreateRequest,
    ): CancelablePromise<InAppPurchaseLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchaseLocalizations',
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
     * @param fieldsInAppPurchaseLocalizations the fields to include for returned resources of type inAppPurchaseLocalizations
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseLocalizationResponse Single InAppPurchaseLocalization
     * @throws ApiError
     */
    public static inAppPurchaseLocalizationsGetInstance(
        id: string,
        fieldsInAppPurchaseLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'inAppPurchaseV2'>,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseLocalizations]': fieldsInAppPurchaseLocalizations,
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
     * @param requestBody InAppPurchaseLocalization representation
     * @returns InAppPurchaseLocalizationResponse Single InAppPurchaseLocalization
     * @throws ApiError
     */
    public static inAppPurchaseLocalizationsUpdateInstance(
        id: string,
        requestBody: InAppPurchaseLocalizationUpdateRequest,
    ): CancelablePromise<InAppPurchaseLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/inAppPurchaseLocalizations/{id}',
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
    public static inAppPurchaseLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/inAppPurchaseLocalizations/{id}',
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
