/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionGroupLocalizationCreateRequest } from '../models/SubscriptionGroupLocalizationCreateRequest';
import type { SubscriptionGroupLocalizationResponse } from '../models/SubscriptionGroupLocalizationResponse';
import type { SubscriptionGroupLocalizationUpdateRequest } from '../models/SubscriptionGroupLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionGroupLocalizationsService {
    /**
     * @param requestBody SubscriptionGroupLocalization representation
     * @returns SubscriptionGroupLocalizationResponse Single SubscriptionGroupLocalization
     * @throws ApiError
     */
    public static subscriptionGroupLocalizationsCreateInstance(
        requestBody: SubscriptionGroupLocalizationCreateRequest,
    ): CancelablePromise<SubscriptionGroupLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionGroupLocalizations',
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
     * @param fieldsSubscriptionGroupLocalizations the fields to include for returned resources of type subscriptionGroupLocalizations
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionGroupLocalizationResponse Single SubscriptionGroupLocalization
     * @throws ApiError
     */
    public static subscriptionGroupLocalizationsGetInstance(
        id: string,
        fieldsSubscriptionGroupLocalizations?: Array<'name' | 'customAppName' | 'locale' | 'state' | 'subscriptionGroup'>,
        include?: Array<'subscriptionGroup'>,
    ): CancelablePromise<SubscriptionGroupLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGroupLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionGroupLocalizations]': fieldsSubscriptionGroupLocalizations,
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
     * @param requestBody SubscriptionGroupLocalization representation
     * @returns SubscriptionGroupLocalizationResponse Single SubscriptionGroupLocalization
     * @throws ApiError
     */
    public static subscriptionGroupLocalizationsUpdateInstance(
        id: string,
        requestBody: SubscriptionGroupLocalizationUpdateRequest,
    ): CancelablePromise<SubscriptionGroupLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionGroupLocalizations/{id}',
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
    public static subscriptionGroupLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionGroupLocalizations/{id}',
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
