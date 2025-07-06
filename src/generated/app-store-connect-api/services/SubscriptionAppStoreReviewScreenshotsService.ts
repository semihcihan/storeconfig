/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionAppStoreReviewScreenshotCreateRequest } from '../models/SubscriptionAppStoreReviewScreenshotCreateRequest';
import type { SubscriptionAppStoreReviewScreenshotResponse } from '../models/SubscriptionAppStoreReviewScreenshotResponse';
import type { SubscriptionAppStoreReviewScreenshotUpdateRequest } from '../models/SubscriptionAppStoreReviewScreenshotUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionAppStoreReviewScreenshotsService {
    /**
     * @param requestBody SubscriptionAppStoreReviewScreenshot representation
     * @returns SubscriptionAppStoreReviewScreenshotResponse Single SubscriptionAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static subscriptionAppStoreReviewScreenshotsCreateInstance(
        requestBody: SubscriptionAppStoreReviewScreenshotCreateRequest,
    ): CancelablePromise<SubscriptionAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionAppStoreReviewScreenshots',
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
     * @param fieldsSubscriptionAppStoreReviewScreenshots the fields to include for returned resources of type subscriptionAppStoreReviewScreenshots
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionAppStoreReviewScreenshotResponse Single SubscriptionAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static subscriptionAppStoreReviewScreenshotsGetInstance(
        id: string,
        fieldsSubscriptionAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'subscription'>,
        include?: Array<'subscription'>,
    ): CancelablePromise<SubscriptionAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionAppStoreReviewScreenshots/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionAppStoreReviewScreenshots]': fieldsSubscriptionAppStoreReviewScreenshots,
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
     * @param requestBody SubscriptionAppStoreReviewScreenshot representation
     * @returns SubscriptionAppStoreReviewScreenshotResponse Single SubscriptionAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static subscriptionAppStoreReviewScreenshotsUpdateInstance(
        id: string,
        requestBody: SubscriptionAppStoreReviewScreenshotUpdateRequest,
    ): CancelablePromise<SubscriptionAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionAppStoreReviewScreenshots/{id}',
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
    public static subscriptionAppStoreReviewScreenshotsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionAppStoreReviewScreenshots/{id}',
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
