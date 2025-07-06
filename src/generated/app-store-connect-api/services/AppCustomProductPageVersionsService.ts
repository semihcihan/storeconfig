/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalizationsResponse } from '../models/AppCustomProductPageLocalizationsResponse';
import type { AppCustomProductPageVersionAppCustomProductPageLocalizationsLinkagesResponse } from '../models/AppCustomProductPageVersionAppCustomProductPageLocalizationsLinkagesResponse';
import type { AppCustomProductPageVersionCreateRequest } from '../models/AppCustomProductPageVersionCreateRequest';
import type { AppCustomProductPageVersionResponse } from '../models/AppCustomProductPageVersionResponse';
import type { AppCustomProductPageVersionUpdateRequest } from '../models/AppCustomProductPageVersionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppCustomProductPageVersionsService {
    /**
     * @param requestBody AppCustomProductPageVersion representation
     * @returns AppCustomProductPageVersionResponse Single AppCustomProductPageVersion
     * @throws ApiError
     */
    public static appCustomProductPageVersionsCreateInstance(
        requestBody: AppCustomProductPageVersionCreateRequest,
    ): CancelablePromise<AppCustomProductPageVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appCustomProductPageVersions',
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
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param fieldsAppCustomProductPageLocalizations the fields to include for returned resources of type appCustomProductPageLocalizations
     * @param include comma-separated list of relationships to include
     * @param limitAppCustomProductPageLocalizations maximum number of related appCustomProductPageLocalizations returned (when they are included)
     * @returns AppCustomProductPageVersionResponse Single AppCustomProductPageVersion
     * @throws ApiError
     */
    public static appCustomProductPageVersionsGetInstance(
        id: string,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        fieldsAppCustomProductPageLocalizations?: Array<'locale' | 'promotionalText' | 'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        include?: Array<'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        limitAppCustomProductPageLocalizations?: number,
    ): CancelablePromise<AppCustomProductPageVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPageVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'fields[appCustomProductPageLocalizations]': fieldsAppCustomProductPageLocalizations,
                'include': include,
                'limit[appCustomProductPageLocalizations]': limitAppCustomProductPageLocalizations,
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
     * @param requestBody AppCustomProductPageVersion representation
     * @returns AppCustomProductPageVersionResponse Single AppCustomProductPageVersion
     * @throws ApiError
     */
    public static appCustomProductPageVersionsUpdateInstance(
        id: string,
        requestBody: AppCustomProductPageVersionUpdateRequest,
    ): CancelablePromise<AppCustomProductPageVersionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appCustomProductPageVersions/{id}',
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
     * @param limit maximum resources per page
     * @returns AppCustomProductPageVersionAppCustomProductPageLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appCustomProductPageVersionsAppCustomProductPageLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppCustomProductPageVersionAppCustomProductPageLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPageVersions/{id}/relationships/appCustomProductPageLocalizations',
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
     * @param filterLocale filter by attribute 'locale'
     * @param fieldsAppCustomProductPageLocalizations the fields to include for returned resources of type appCustomProductPageLocalizations
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppScreenshotSets maximum number of related appScreenshotSets returned (when they are included)
     * @param limitAppPreviewSets maximum number of related appPreviewSets returned (when they are included)
     * @returns AppCustomProductPageLocalizationsResponse List of AppCustomProductPageLocalizations
     * @throws ApiError
     */
    public static appCustomProductPageVersionsAppCustomProductPageLocalizationsGetToManyRelated(
        id: string,
        filterLocale?: Array<string>,
        fieldsAppCustomProductPageLocalizations?: Array<'locale' | 'promotionalText' | 'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limit?: number,
        include?: Array<'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        limitAppScreenshotSets?: number,
        limitAppPreviewSets?: number,
    ): CancelablePromise<AppCustomProductPageLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPageVersions/{id}/appCustomProductPageLocalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[locale]': filterLocale,
                'fields[appCustomProductPageLocalizations]': fieldsAppCustomProductPageLocalizations,
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'fields[appScreenshotSets]': fieldsAppScreenshotSets,
                'fields[appPreviewSets]': fieldsAppPreviewSets,
                'limit': limit,
                'include': include,
                'limit[appScreenshotSets]': limitAppScreenshotSets,
                'limit[appPreviewSets]': limitAppPreviewSets,
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
