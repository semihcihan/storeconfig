/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseAppStoreReviewScreenshotCreateRequest } from '../models/InAppPurchaseAppStoreReviewScreenshotCreateRequest';
import type { InAppPurchaseAppStoreReviewScreenshotResponse } from '../models/InAppPurchaseAppStoreReviewScreenshotResponse';
import type { InAppPurchaseAppStoreReviewScreenshotUpdateRequest } from '../models/InAppPurchaseAppStoreReviewScreenshotUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseAppStoreReviewScreenshotsService {
    /**
     * @param requestBody InAppPurchaseAppStoreReviewScreenshot representation
     * @returns InAppPurchaseAppStoreReviewScreenshotResponse Single InAppPurchaseAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static inAppPurchaseAppStoreReviewScreenshotsCreateInstance(
        requestBody: InAppPurchaseAppStoreReviewScreenshotCreateRequest,
    ): CancelablePromise<InAppPurchaseAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchaseAppStoreReviewScreenshots',
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
     * @param fieldsInAppPurchaseAppStoreReviewScreenshots the fields to include for returned resources of type inAppPurchaseAppStoreReviewScreenshots
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseAppStoreReviewScreenshotResponse Single InAppPurchaseAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static inAppPurchaseAppStoreReviewScreenshotsGetInstance(
        id: string,
        fieldsInAppPurchaseAppStoreReviewScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'inAppPurchaseV2'>,
        include?: Array<'inAppPurchaseV2'>,
    ): CancelablePromise<InAppPurchaseAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseAppStoreReviewScreenshots/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseAppStoreReviewScreenshots]': fieldsInAppPurchaseAppStoreReviewScreenshots,
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
     * @param requestBody InAppPurchaseAppStoreReviewScreenshot representation
     * @returns InAppPurchaseAppStoreReviewScreenshotResponse Single InAppPurchaseAppStoreReviewScreenshot
     * @throws ApiError
     */
    public static inAppPurchaseAppStoreReviewScreenshotsUpdateInstance(
        id: string,
        requestBody: InAppPurchaseAppStoreReviewScreenshotUpdateRequest,
    ): CancelablePromise<InAppPurchaseAppStoreReviewScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/inAppPurchaseAppStoreReviewScreenshots/{id}',
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
    public static inAppPurchaseAppStoreReviewScreenshotsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/inAppPurchaseAppStoreReviewScreenshots/{id}',
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
