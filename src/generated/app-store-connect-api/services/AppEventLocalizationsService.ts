/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventLocalizationAppEventScreenshotsLinkagesResponse } from '../models/AppEventLocalizationAppEventScreenshotsLinkagesResponse';
import type { AppEventLocalizationAppEventVideoClipsLinkagesResponse } from '../models/AppEventLocalizationAppEventVideoClipsLinkagesResponse';
import type { AppEventLocalizationCreateRequest } from '../models/AppEventLocalizationCreateRequest';
import type { AppEventLocalizationResponse } from '../models/AppEventLocalizationResponse';
import type { AppEventLocalizationUpdateRequest } from '../models/AppEventLocalizationUpdateRequest';
import type { AppEventScreenshotsResponse } from '../models/AppEventScreenshotsResponse';
import type { AppEventVideoClipsResponse } from '../models/AppEventVideoClipsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEventLocalizationsService {
    /**
     * @param requestBody AppEventLocalization representation
     * @returns AppEventLocalizationResponse Single AppEventLocalization
     * @throws ApiError
     */
    public static appEventLocalizationsCreateInstance(
        requestBody: AppEventLocalizationCreateRequest,
    ): CancelablePromise<AppEventLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEventLocalizations',
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
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param fieldsAppEventScreenshots the fields to include for returned resources of type appEventScreenshots
     * @param fieldsAppEventVideoClips the fields to include for returned resources of type appEventVideoClips
     * @param include comma-separated list of relationships to include
     * @param limitAppEventScreenshots maximum number of related appEventScreenshots returned (when they are included)
     * @param limitAppEventVideoClips maximum number of related appEventVideoClips returned (when they are included)
     * @returns AppEventLocalizationResponse Single AppEventLocalization
     * @throws ApiError
     */
    public static appEventLocalizationsGetInstance(
        id: string,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        fieldsAppEventScreenshots?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'assetToken' | 'uploadOperations' | 'assetDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        fieldsAppEventVideoClips?: Array<'fileSize' | 'fileName' | 'previewFrameTimeCode' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        include?: Array<'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        limitAppEventScreenshots?: number,
        limitAppEventVideoClips?: number,
    ): CancelablePromise<AppEventLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'fields[appEventScreenshots]': fieldsAppEventScreenshots,
                'fields[appEventVideoClips]': fieldsAppEventVideoClips,
                'include': include,
                'limit[appEventScreenshots]': limitAppEventScreenshots,
                'limit[appEventVideoClips]': limitAppEventVideoClips,
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
     * @param requestBody AppEventLocalization representation
     * @returns AppEventLocalizationResponse Single AppEventLocalization
     * @throws ApiError
     */
    public static appEventLocalizationsUpdateInstance(
        id: string,
        requestBody: AppEventLocalizationUpdateRequest,
    ): CancelablePromise<AppEventLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appEventLocalizations/{id}',
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
    public static appEventLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appEventLocalizations/{id}',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns AppEventLocalizationAppEventScreenshotsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appEventLocalizationsAppEventScreenshotsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppEventLocalizationAppEventScreenshotsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventLocalizations/{id}/relationships/appEventScreenshots',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
     * @param fieldsAppEventScreenshots the fields to include for returned resources of type appEventScreenshots
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppEventScreenshotsResponse List of AppEventScreenshots
     * @throws ApiError
     */
    public static appEventLocalizationsAppEventScreenshotsGetToManyRelated(
        id: string,
        fieldsAppEventScreenshots?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'assetToken' | 'uploadOperations' | 'assetDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        limit?: number,
        include?: Array<'appEventLocalization'>,
    ): CancelablePromise<AppEventScreenshotsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventLocalizations/{id}/appEventScreenshots',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventScreenshots]': fieldsAppEventScreenshots,
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'limit': limit,
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
     * @param limit maximum resources per page
     * @returns AppEventLocalizationAppEventVideoClipsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appEventLocalizationsAppEventVideoClipsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppEventLocalizationAppEventVideoClipsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventLocalizations/{id}/relationships/appEventVideoClips',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
     * @param fieldsAppEventVideoClips the fields to include for returned resources of type appEventVideoClips
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppEventVideoClipsResponse List of AppEventVideoClips
     * @throws ApiError
     */
    public static appEventLocalizationsAppEventVideoClipsGetToManyRelated(
        id: string,
        fieldsAppEventVideoClips?: Array<'fileSize' | 'fileName' | 'previewFrameTimeCode' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        limit?: number,
        include?: Array<'appEventLocalization'>,
    ): CancelablePromise<AppEventVideoClipsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEventLocalizations/{id}/appEventVideoClips',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventVideoClips]': fieldsAppEventVideoClips,
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'limit': limit,
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
}
