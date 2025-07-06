/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionExperimentTreatmentAppStoreVersionExperimentTreatmentLocalizationsLinkagesResponse } from '../models/AppStoreVersionExperimentTreatmentAppStoreVersionExperimentTreatmentLocalizationsLinkagesResponse';
import type { AppStoreVersionExperimentTreatmentCreateRequest } from '../models/AppStoreVersionExperimentTreatmentCreateRequest';
import type { AppStoreVersionExperimentTreatmentLocalizationsResponse } from '../models/AppStoreVersionExperimentTreatmentLocalizationsResponse';
import type { AppStoreVersionExperimentTreatmentResponse } from '../models/AppStoreVersionExperimentTreatmentResponse';
import type { AppStoreVersionExperimentTreatmentUpdateRequest } from '../models/AppStoreVersionExperimentTreatmentUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionExperimentTreatmentsService {
    /**
     * @param requestBody AppStoreVersionExperimentTreatment representation
     * @returns AppStoreVersionExperimentTreatmentResponse Single AppStoreVersionExperimentTreatment
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentsCreateInstance(
        requestBody: AppStoreVersionExperimentTreatmentCreateRequest,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionExperimentTreatments',
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
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreVersionExperimentTreatmentLocalizations maximum number of related appStoreVersionExperimentTreatmentLocalizations returned (when they are included)
     * @returns AppStoreVersionExperimentTreatmentResponse Single AppStoreVersionExperimentTreatment
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentsGetInstance(
        id: string,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        include?: Array<'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        limitAppStoreVersionExperimentTreatmentLocalizations?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'include': include,
                'limit[appStoreVersionExperimentTreatmentLocalizations]': limitAppStoreVersionExperimentTreatmentLocalizations,
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
     * @param requestBody AppStoreVersionExperimentTreatment representation
     * @returns AppStoreVersionExperimentTreatmentResponse Single AppStoreVersionExperimentTreatment
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentsUpdateInstance(
        id: string,
        requestBody: AppStoreVersionExperimentTreatmentUpdateRequest,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreVersionExperimentTreatments/{id}',
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
    public static appStoreVersionExperimentTreatmentsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreVersionExperimentTreatments/{id}',
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
     * @returns AppStoreVersionExperimentTreatmentAppStoreVersionExperimentTreatmentLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentsAppStoreVersionExperimentTreatmentLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentAppStoreVersionExperimentTreatmentLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatments/{id}/relationships/appStoreVersionExperimentTreatmentLocalizations',
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
     * @param fieldsAppStoreVersionExperimentTreatmentLocalizations the fields to include for returned resources of type appStoreVersionExperimentTreatmentLocalizations
     * @param fieldsAppStoreVersionExperimentTreatments the fields to include for returned resources of type appStoreVersionExperimentTreatments
     * @param fieldsAppScreenshotSets the fields to include for returned resources of type appScreenshotSets
     * @param fieldsAppPreviewSets the fields to include for returned resources of type appPreviewSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppScreenshotSets maximum number of related appScreenshotSets returned (when they are included)
     * @param limitAppPreviewSets maximum number of related appPreviewSets returned (when they are included)
     * @returns AppStoreVersionExperimentTreatmentLocalizationsResponse List of AppStoreVersionExperimentTreatmentLocalizations
     * @throws ApiError
     */
    public static appStoreVersionExperimentTreatmentsAppStoreVersionExperimentTreatmentLocalizationsGetToManyRelated(
        id: string,
        filterLocale?: Array<string>,
        fieldsAppStoreVersionExperimentTreatmentLocalizations?: Array<'locale' | 'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        fieldsAppStoreVersionExperimentTreatments?: Array<'name' | 'appIcon' | 'appIconName' | 'promotedDate' | 'appStoreVersionExperiment' | 'appStoreVersionExperimentV2' | 'appStoreVersionExperimentTreatmentLocalizations'>,
        fieldsAppScreenshotSets?: Array<'screenshotDisplayType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appScreenshots'>,
        fieldsAppPreviewSets?: Array<'previewType' | 'appStoreVersionLocalization' | 'appCustomProductPageLocalization' | 'appStoreVersionExperimentTreatmentLocalization' | 'appPreviews'>,
        limit?: number,
        include?: Array<'appStoreVersionExperimentTreatment' | 'appScreenshotSets' | 'appPreviewSets'>,
        limitAppScreenshotSets?: number,
        limitAppPreviewSets?: number,
    ): CancelablePromise<AppStoreVersionExperimentTreatmentLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreVersionExperimentTreatments/{id}/appStoreVersionExperimentTreatmentLocalizations',
            path: {
                'id': id,
            },
            query: {
                'filter[locale]': filterLocale,
                'fields[appStoreVersionExperimentTreatmentLocalizations]': fieldsAppStoreVersionExperimentTreatmentLocalizations,
                'fields[appStoreVersionExperimentTreatments]': fieldsAppStoreVersionExperimentTreatments,
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
