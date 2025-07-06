/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppScreenshotSetAppScreenshotsLinkagesRequest } from '../models/AppScreenshotSetAppScreenshotsLinkagesRequest';
import type { AppScreenshotSetAppScreenshotsLinkagesResponse } from '../models/AppScreenshotSetAppScreenshotsLinkagesResponse';
import type { AppScreenshotSetCreateRequest } from '../models/AppScreenshotSetCreateRequest';
import type { AppScreenshotSetResponse } from '../models/AppScreenshotSetResponse';
import type { AppScreenshotsResponse } from '../models/AppScreenshotsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppScreenshotSetsService {
    /**
     * @param requestBody AppScreenshotSet representation
     * @returns AppScreenshotSetResponse Single AppScreenshotSet
     * @throws ApiError
     */
    public static appScreenshotSetsCreateInstance(
        requestBody: AppScreenshotSetCreateRequest,
    ): CancelablePromise<AppScreenshotSetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appScreenshotSets',
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
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppScreenshots the fields to include for returned resources of type appScreenshots
     * @param include comma-separated list of relationships to include
     * @param limitAppScreenshots maximum number of related appScreenshots returned (when they are included)
     * @returns AppScreenshotSetResponse Single AppScreenshotSet
     * @throws ApiError
     */
    public static appScreenshotSetsGetInstance(
        id: string,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'appScreenshotSet'>,
        include?: Array<'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        limitAppScreenshots?: number,
    ): CancelablePromise<AppScreenshotSetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appScreenshotSets/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
                'fields[appScreenshots]': fieldsAppScreenshots,
                'include': include,
                'limit[appScreenshots]': limitAppScreenshots,
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
    public static appScreenshotSetsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appScreenshotSets/{id}',
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
     * @returns AppScreenshotSetAppScreenshotsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appScreenshotSetsAppScreenshotsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppScreenshotSetAppScreenshotsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appScreenshotSets/{id}/relationships/appScreenshots',
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
    public static appScreenshotSetsAppScreenshotsReplaceToManyRelationship(
        id: string,
        requestBody: AppScreenshotSetAppScreenshotsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appScreenshotSets/{id}/relationships/appScreenshots',
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
     * @param fieldsAppScreenshots the fields to include for returned resources of type appScreenshots
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppScreenshotsResponse List of AppScreenshots
     * @throws ApiError
     */
    public static appScreenshotSetsAppScreenshotsGetToManyRelated(
        id: string,
        fieldsAppScreenshots?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'assetToken' | 'assetType' | 'uploadOperations' | 'assetDeliveryState' | 'appScreenshotSet'>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        limit?: number,
        include?: Array<'appScreenshotSet'>,
    ): CancelablePromise<AppScreenshotsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appScreenshotSets/{id}/appScreenshots',
            path: {
                'id': id,
            },
            query: {
                'fields[appScreenshots]': fieldsAppScreenshots,
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
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
