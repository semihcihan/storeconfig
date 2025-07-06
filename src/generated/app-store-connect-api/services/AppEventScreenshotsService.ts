/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventScreenshotCreateRequest } from '../models/AppEventScreenshotCreateRequest';
import type { AppEventScreenshotResponse } from '../models/AppEventScreenshotResponse';
import type { AppEventScreenshotUpdateRequest } from '../models/AppEventScreenshotUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEventScreenshotsService {
    /**
     * @param requestBody AppEventScreenshot representation
     * @returns AppEventScreenshotResponse Single AppEventScreenshot
     * @throws ApiError
     */
    public static appEventScreenshotsCreateInstance(
        requestBody: AppEventScreenshotCreateRequest,
    ): CancelablePromise<AppEventScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEventScreenshots',
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
     * @param fieldsAppEventScreenshots the fields to include for returned resources of type appEventScreenshots
     * @param include comma-separated list of relationships to include
     * @returns AppEventScreenshotResponse Single AppEventScreenshot
     * @throws ApiError
     */
    public static appEventScreenshotsGetInstance(
        id: string,
        fieldsAppEventScreenshots?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'assetToken' | 'uploadOperations' | 'assetDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        include?: Array<'appEventLocalization'>,
    ): CancelablePromise<AppEventScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventScreenshots/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventScreenshots]': fieldsAppEventScreenshots,
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
     * @param requestBody AppEventScreenshot representation
     * @returns AppEventScreenshotResponse Single AppEventScreenshot
     * @throws ApiError
     */
    public static appEventScreenshotsUpdateInstance(
        id: string,
        requestBody: AppEventScreenshotUpdateRequest,
    ): CancelablePromise<AppEventScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appEventScreenshots/{id}',
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
    public static appEventScreenshotsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appEventScreenshots/{id}',
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
