/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionLocalizationCreateRequest } from '../models/SubscriptionLocalizationCreateRequest';
import type { SubscriptionLocalizationResponse } from '../models/SubscriptionLocalizationResponse';
import type { SubscriptionLocalizationUpdateRequest } from '../models/SubscriptionLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionLocalizationsService {
    /**
     * @param requestBody SubscriptionLocalization representation
     * @returns SubscriptionLocalizationResponse Single SubscriptionLocalization
     * @throws ApiError
     */
    public static subscriptionLocalizationsCreateInstance(
        requestBody: SubscriptionLocalizationCreateRequest,
    ): CancelablePromise<SubscriptionLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionLocalizations',
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
     * @param fieldsSubscriptionLocalizations the fields to include for returned resources of type subscriptionLocalizations
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionLocalizationResponse Single SubscriptionLocalization
     * @throws ApiError
     */
    public static subscriptionLocalizationsGetInstance(
        id: string,
        fieldsSubscriptionLocalizations?: Array<'name' | 'locale' | 'description' | 'state' | 'subscription'>,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionLocalizations]': fieldsSubscriptionLocalizations,
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
     * @param requestBody SubscriptionLocalization representation
     * @returns SubscriptionLocalizationResponse Single SubscriptionLocalization
     * @throws ApiError
     */
    public static subscriptionLocalizationsUpdateInstance(
        id: string,
        requestBody: SubscriptionLocalizationUpdateRequest,
    ): CancelablePromise<SubscriptionLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionLocalizations/{id}',
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
    public static subscriptionLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionLocalizations/{id}',
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
