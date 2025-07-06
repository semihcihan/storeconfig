/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipHeaderImageCreateRequest } from '../models/AppClipHeaderImageCreateRequest';
import type { AppClipHeaderImageResponse } from '../models/AppClipHeaderImageResponse';
import type { AppClipHeaderImageUpdateRequest } from '../models/AppClipHeaderImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipHeaderImagesService {
    /**
     * @param requestBody AppClipHeaderImage representation
     * @returns AppClipHeaderImageResponse Single AppClipHeaderImage
     * @throws ApiError
     */
    public static appClipHeaderImagesCreateInstance(
        requestBody: AppClipHeaderImageCreateRequest,
    ): CancelablePromise<AppClipHeaderImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipHeaderImages',
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
     * @param fieldsAppClipHeaderImages the fields to include for returned resources of type appClipHeaderImages
     * @param include comma-separated list of relationships to include
     * @returns AppClipHeaderImageResponse Single AppClipHeaderImage
     * @throws ApiError
     */
    public static appClipHeaderImagesGetInstance(
        id: string,
        fieldsAppClipHeaderImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'appClipDefaultExperienceLocalization'>,
        include?: Array<'appClipDefaultExperienceLocalization'>,
    ): CancelablePromise<AppClipHeaderImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipHeaderImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipHeaderImages]': fieldsAppClipHeaderImages,
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
     * @param requestBody AppClipHeaderImage representation
     * @returns AppClipHeaderImageResponse Single AppClipHeaderImage
     * @throws ApiError
     */
    public static appClipHeaderImagesUpdateInstance(
        id: string,
        requestBody: AppClipHeaderImageUpdateRequest,
    ): CancelablePromise<AppClipHeaderImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipHeaderImages/{id}',
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
    public static appClipHeaderImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appClipHeaderImages/{id}',
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
