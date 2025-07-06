/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewCreateRequest } from '../models/AppPreviewCreateRequest';
import type { AppPreviewResponse } from '../models/AppPreviewResponse';
import type { AppPreviewUpdateRequest } from '../models/AppPreviewUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppPreviewsService {
    /**
     * @param requestBody AppPreview representation
     * @returns AppPreviewResponse Single AppPreview
     * @throws ApiError
     */
    public static appPreviewsCreateInstance(
        requestBody: AppPreviewCreateRequest,
    ): CancelablePromise<AppPreviewResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appPreviews',
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
     * @param fieldsAppPreviews the fields to include for returned resources of type appPreviews
     * @param include comma-separated list of relationships to include
     * @returns AppPreviewResponse Single AppPreview
     * @throws ApiError
     */
    public static appPreviewsGetInstance(
        id: string,
        fieldsAppPreviews?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'previewFrameTimeCode' | 'mimeType' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appPreviewSet'>,
        include?: Array<'appPreviewSet'>,
    ): CancelablePromise<AppPreviewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPreviews/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appPreviews]': fieldsAppPreviews,
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
     * @param requestBody AppPreview representation
     * @returns AppPreviewResponse Single AppPreview
     * @throws ApiError
     */
    public static appPreviewsUpdateInstance(
        id: string,
        requestBody: AppPreviewUpdateRequest,
    ): CancelablePromise<AppPreviewResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appPreviews/{id}',
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
    public static appPreviewsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appPreviews/{id}',
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
