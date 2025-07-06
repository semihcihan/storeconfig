/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventCreateRequest } from '../models/AppEventCreateRequest';
import type { AppEventLocalizationsLinkagesResponse } from '../models/AppEventLocalizationsLinkagesResponse';
import type { AppEventLocalizationsResponse } from '../models/AppEventLocalizationsResponse';
import type { AppEventResponse } from '../models/AppEventResponse';
import type { AppEventUpdateRequest } from '../models/AppEventUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppEventsService {
    /**
     * @param requestBody AppEvent representation
     * @returns AppEventResponse Single AppEvent
     * @throws ApiError
     */
    public static appEventsCreateInstance(
        requestBody: AppEventCreateRequest,
    ): CancelablePromise<AppEventResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appEvents',
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
     * @param fieldsAppEvents the fields to include for returned resources of type appEvents
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @returns AppEventResponse Single AppEvent
     * @throws ApiError
     */
    public static appEventsGetInstance(
        id: string,
        fieldsAppEvents?: Array<'referenceName' | 'badge' | 'eventState' | 'deepLink' | 'purchaseRequirement' | 'primaryLocale' | 'priority' | 'purpose' | 'territorySchedules' | 'archivedTerritorySchedules' | 'localizations'>,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        include?: Array<'localizations'>,
        limitLocalizations?: number,
    ): CancelablePromise<AppEventResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEvents/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appEvents]': fieldsAppEvents,
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'include': include,
                'limit[localizations]': limitLocalizations,
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
     * @param requestBody AppEvent representation
     * @returns AppEventResponse Single AppEvent
     * @throws ApiError
     */
    public static appEventsUpdateInstance(
        id: string,
        requestBody: AppEventUpdateRequest,
    ): CancelablePromise<AppEventResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appEvents/{id}',
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
    public static appEventsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appEvents/{id}',
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
     * @returns AppEventLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appEventsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppEventLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEvents/{id}/relationships/localizations',
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
     * @param fieldsAppEventLocalizations the fields to include for returned resources of type appEventLocalizations
     * @param fieldsAppEvents the fields to include for returned resources of type appEvents
     * @param fieldsAppEventScreenshots the fields to include for returned resources of type appEventScreenshots
     * @param fieldsAppEventVideoClips the fields to include for returned resources of type appEventVideoClips
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppEventScreenshots maximum number of related appEventScreenshots returned (when they are included)
     * @param limitAppEventVideoClips maximum number of related appEventVideoClips returned (when they are included)
     * @returns AppEventLocalizationsResponse List of AppEventLocalizations
     * @throws ApiError
     */
    public static appEventsLocalizationsGetToManyRelated(
        id: string,
        fieldsAppEventLocalizations?: Array<'locale' | 'name' | 'shortDescription' | 'longDescription' | 'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        fieldsAppEvents?: Array<'referenceName' | 'badge' | 'eventState' | 'deepLink' | 'purchaseRequirement' | 'primaryLocale' | 'priority' | 'purpose' | 'territorySchedules' | 'archivedTerritorySchedules' | 'localizations'>,
        fieldsAppEventScreenshots?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'assetToken' | 'uploadOperations' | 'assetDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        fieldsAppEventVideoClips?: Array<'fileSize' | 'fileName' | 'previewFrameTimeCode' | 'videoUrl' | 'previewFrameImage' | 'previewImage' | 'uploadOperations' | 'assetDeliveryState' | 'videoDeliveryState' | 'appEventAssetType' | 'appEventLocalization'>,
        limit?: number,
        include?: Array<'appEvent' | 'appEventScreenshots' | 'appEventVideoClips'>,
        limitAppEventScreenshots?: number,
        limitAppEventVideoClips?: number,
    ): CancelablePromise<AppEventLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appEvents/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[appEventLocalizations]': fieldsAppEventLocalizations,
                'fields[appEvents]': fieldsAppEvents,
                'fields[appEventScreenshots]': fieldsAppEventScreenshots,
                'fields[appEventVideoClips]': fieldsAppEventVideoClips,
                'limit': limit,
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
}
