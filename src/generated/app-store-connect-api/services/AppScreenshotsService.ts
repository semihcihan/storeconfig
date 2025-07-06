/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppScreenshotCreateRequest } from '../models/AppScreenshotCreateRequest';
import type { AppScreenshotResponse } from '../models/AppScreenshotResponse';
import type { AppScreenshotUpdateRequest } from '../models/AppScreenshotUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppScreenshotsService {
    /**
     * @param requestBody AppScreenshot representation
     * @returns AppScreenshotResponse Single AppScreenshot
     * @throws ApiError
     */
    public static appScreenshotsCreateInstance(
        requestBody: AppScreenshotCreateRequest,
    ): CancelablePromise<AppScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appScreenshots',
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
     * @param fieldsAppScreenshots the fields to include for returned resources of type appScreenshots
     * @param include comma-separated list of relationships to include
     * @returns AppScreenshotResponse Single AppScreenshot
     * @throws ApiError
     */
    public static appScreenshotsGetInstance(
        id: string,
        fieldsAppScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'appScreenshotSet'>,
        include?: Array<'appScreenshotSet'>,
    ): CancelablePromise<AppScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appScreenshots/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appScreenshots]': fieldsAppScreenshots,
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
     * @param requestBody AppScreenshot representation
     * @returns AppScreenshotResponse Single AppScreenshot
     * @throws ApiError
     */
    public static appScreenshotsUpdateInstance(
        id: string,
        requestBody: AppScreenshotUpdateRequest,
    ): CancelablePromise<AppScreenshotResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appScreenshots/{id}',
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
    public static appScreenshotsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appScreenshots/{id}',
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
