/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreviewSetAppPreviewsLinkagesRequest } from '../models/AppPreviewSetAppPreviewsLinkagesRequest';
import type { AppPreviewSetAppPreviewsLinkagesResponse } from '../models/AppPreviewSetAppPreviewsLinkagesResponse';
import type { AppPreviewSetCreateRequest } from '../models/AppPreviewSetCreateRequest';
import type { AppPreviewSetResponse } from '../models/AppPreviewSetResponse';
import type { AppPreviewsResponse } from '../models/AppPreviewsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppPreviewSetsService {
    /**
     * @param requestBody AppPreviewSet representation
     * @returns AppPreviewSetResponse Single AppPreviewSet
     * @throws ApiError
     */
    public static appPreviewSetsCreateInstance(
        requestBody: AppPreviewSetCreateRequest,
    ): CancelablePromise<AppPreviewSetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appPreviewSets',
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
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param fieldsAppPreviews the fields to include for returned resources of type appPreviews
     * @param include comma-separated list of relationships to include
     * @param limitAppPreviews maximum number of related appPreviews returned (when they are included)
     * @returns AppPreviewSetResponse Single AppPreviewSet
     * @throws ApiError
     */
    public static appPreviewSetsGetInstance(
        id: string,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        fieldsAppPreviews?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'previewFrameTimeCode' | 'mimeType' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appPreviewSet'>,
        include?: Array<'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limitAppPreviews?: number,
    ): CancelablePromise<AppPreviewSetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPreviewSets/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appPreviewSets]': fieldsAppPreviewSets,
                'fields[appPreviews]': fieldsAppPreviews,
                'include': include,
                'limit[appPreviews]': limitAppPreviews,
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
     * @returns void
     * @throws ApiError
     */
    public static appPreviewSetsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appPreviewSets/{id}',
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
     * @returns AppPreviewSetAppPreviewsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appPreviewSetsAppPreviewsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppPreviewSetAppPreviewsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPreviewSets/{id}/relationships/appPreviews',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static appPreviewSetsAppPreviewsReplaceToManyRelationship(
        id: string,
        requestBody: AppPreviewSetAppPreviewsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appPreviewSets/{id}/relationships/appPreviews',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param fieldsAppPreviews the fields to include for returned resources of type appPreviews
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppPreviewsResponse List of AppPreviews
     * @throws ApiError
     */
    public static appPreviewSetsAppPreviewsGetToManyRelated(
        id: string,
        fieldsAppPreviews?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'previewFrameTimeCode' | 'mimeType' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appPreviewSet'>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limit?: number,
        include?: Array<'appPreviewSet'>,
    ): CancelablePromise<AppPreviewsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appPreviewSets/{id}/appPreviews',
            path: {
                'id': id,
            },
            query: {
                'fields[appPreviews]': fieldsAppPreviews,
                'fields[appPreviewSets]': fieldsAppPreviewSets,
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
