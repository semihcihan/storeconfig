/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionImageCreateRequest } from '../models/SubscriptionImageCreateRequest';
import type { SubscriptionImageResponse } from '../models/SubscriptionImageResponse';
import type { SubscriptionImageUpdateRequest } from '../models/SubscriptionImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionImagesService {
    /**
     * @param requestBody SubscriptionImage representation
     * @returns SubscriptionImageResponse Single SubscriptionImage
     * @throws ApiError
     */
    public static subscriptionImagesCreateInstance(
        requestBody: SubscriptionImageCreateRequest,
    ): CancelablePromise<SubscriptionImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionImages',
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
     * @param fieldsSubscriptionImages the fields to include for returned resources of type subscriptionImages
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionImageResponse Single SubscriptionImage
     * @throws ApiError
     */
    public static subscriptionImagesGetInstance(
        id: string,
        fieldsSubscriptionImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'subscription'>,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionImages]': fieldsSubscriptionImages,
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
     * @param requestBody SubscriptionImage representation
     * @returns SubscriptionImageResponse Single SubscriptionImage
     * @throws ApiError
     */
    public static subscriptionImagesUpdateInstance(
        id: string,
        requestBody: SubscriptionImageUpdateRequest,
    ): CancelablePromise<SubscriptionImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionImages/{id}',
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
    public static subscriptionImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionImages/{id}',
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
