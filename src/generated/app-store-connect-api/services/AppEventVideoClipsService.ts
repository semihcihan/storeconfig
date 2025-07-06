/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventVideoClipCreateRequest } from '../models/AppEventVideoClipCreateRequest';
import type { AppEventVideoClipResponse } from '../models/AppEventVideoClipResponse';
import type { AppEventVideoClipUpdateRequest } from '../models/AppEventVideoClipUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEventVideoClipsService {
    /**
     * @param requestBody AppEventVideoClip representation
     * @returns AppEventVideoClipResponse Single AppEventVideoClip
     * @throws ApiError
     */
    public static appEventVideoClipsCreateInstance(
        requestBody: AppEventVideoClipCreateRequest,
    ): CancelablePromise<AppEventVideoClipResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEventVideoClips',
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
     * @param fieldsAppEventVideoClips the fields to include for returned resources of type appEventVideoClips
     * @param include comma-separated list of relationships to include
     * @returns AppEventVideoClipResponse Single AppEventVideoClip
     * @throws ApiError
     */
    public static appEventVideoClipsGetInstance(
        id: string,
        fieldsAppEventVideoClips?: Array<'fileSize' | 'fileName' | 'previewFrameTimeCode' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        include?: Array<'appEventLocalization'>,
    ): CancelablePromise<AppEventVideoClipResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventVideoClips/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventVideoClips]': fieldsAppEventVideoClips,
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
     * @param requestBody AppEventVideoClip representation
     * @returns AppEventVideoClipResponse Single AppEventVideoClip
     * @throws ApiError
     */
    public static appEventVideoClipsUpdateInstance(
        id: string,
        requestBody: AppEventVideoClipUpdateRequest,
    ): CancelablePromise<AppEventVideoClipResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appEventVideoClips/{id}',
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
    public static appEventVideoClipsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appEventVideoClips/{id}',
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
