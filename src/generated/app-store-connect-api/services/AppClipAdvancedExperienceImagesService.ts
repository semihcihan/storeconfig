/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAdvancedExperienceImageCreateRequest } from '../models/AppClipAdvancedExperienceImageCreateRequest';
import type { AppClipAdvancedExperienceImageResponse } from '../models/AppClipAdvancedExperienceImageResponse';
import type { AppClipAdvancedExperienceImageUpdateRequest } from '../models/AppClipAdvancedExperienceImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipAdvancedExperienceImagesService {
    /**
     * @param requestBody AppClipAdvancedExperienceImage representation
     * @returns AppClipAdvancedExperienceImageResponse Single AppClipAdvancedExperienceImage
     * @throws ApiError
     */
    public static appClipAdvancedExperienceImagesCreateInstance(
        requestBody: AppClipAdvancedExperienceImageCreateRequest,
    ): CancelablePromise<AppClipAdvancedExperienceImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipAdvancedExperienceImages',
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
     * @param fieldsAppClipAdvancedExperienceImages the fields to include for returned resources of type appClipAdvancedExperienceImages
     * @returns AppClipAdvancedExperienceImageResponse Single AppClipAdvancedExperienceImage
     * @throws ApiError
     */
    public static appClipAdvancedExperienceImagesGetInstance(
        id: string,
        fieldsAppClipAdvancedExperienceImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<AppClipAdvancedExperienceImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipAdvancedExperienceImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipAdvancedExperienceImages]': fieldsAppClipAdvancedExperienceImages,
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
     * @param requestBody AppClipAdvancedExperienceImage representation
     * @returns AppClipAdvancedExperienceImageResponse Single AppClipAdvancedExperienceImage
     * @throws ApiError
     */
    public static appClipAdvancedExperienceImagesUpdateInstance(
        id: string,
        requestBody: AppClipAdvancedExperienceImageUpdateRequest,
    ): CancelablePromise<AppClipAdvancedExperienceImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipAdvancedExperienceImages/{id}',
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
}
