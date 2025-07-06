/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageAppCustomProductPageVersionsLinkagesResponse } from '../models/AppCustomProductPageAppCustomProductPageVersionsLinkagesResponse';
import type { AppCustomProductPageCreateRequest } from '../models/AppCustomProductPageCreateRequest';
import type { AppCustomProductPageResponse } from '../models/AppCustomProductPageResponse';
import type { AppCustomProductPageUpdateRequest } from '../models/AppCustomProductPageUpdateRequest';
import type { AppCustomProductPageVersionsResponse } from '../models/AppCustomProductPageVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppCustomProductPagesService {
    /**
     * @param requestBody AppCustomProductPage representation
     * @returns AppCustomProductPageResponse Single AppCustomProductPage
     * @throws ApiError
     */
    public static appCustomProductPagesCreateInstance(
        requestBody: AppCustomProductPageCreateRequest,
    ): CancelablePromise<AppCustomProductPageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appCustomProductPages',
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
     * @param fieldsAppCustomProductPages the fields to include for returned resources of type appCustomProductPages
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param include comma-separated list of relationships to include
     * @param limitAppCustomProductPageVersions maximum number of related appCustomProductPageVersions returned (when they are included)
     * @returns AppCustomProductPageResponse Single AppCustomProductPage
     * @throws ApiError
     */
    public static appCustomProductPagesGetInstance(
        id: string,
        fieldsAppCustomProductPages?: Array<'name' | 'url' | 'visible' | 'app' | 'appCustomProductPageVersions'>,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        include?: Array<'app' | 'appCustomProductPageVersions'>,
        limitAppCustomProductPageVersions?: number,
    ): CancelablePromise<AppCustomProductPageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appCustomProductPages]': fieldsAppCustomProductPages,
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'include': include,
                'limit[appCustomProductPageVersions]': limitAppCustomProductPageVersions,
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
     * @param requestBody AppCustomProductPage representation
     * @returns AppCustomProductPageResponse Single AppCustomProductPage
     * @throws ApiError
     */
    public static appCustomProductPagesUpdateInstance(
        id: string,
        requestBody: AppCustomProductPageUpdateRequest,
    ): CancelablePromise<AppCustomProductPageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appCustomProductPages/{id}',
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
    public static appCustomProductPagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appCustomProductPages/{id}',
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
     * @returns AppCustomProductPageAppCustomProductPageVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appCustomProductPagesAppCustomProductPageVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppCustomProductPageAppCustomProductPageVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPages/{id}/relationships/appCustomProductPageVersions',
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
     * @param filterState filter by attribute 'state'
     * @param fieldsAppCustomProductPageVersions the fields to include for returned resources of type appCustomProductPageVersions
     * @param fieldsAppCustomProductPages the fields to include for returned resources of type appCustomProductPages
     * @param fieldsAppCustomProductPageLocalizations the fields to include for returned resources of type appCustomProductPageLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAppCustomProductPageLocalizations maximum number of related appCustomProductPageLocalizations returned (when they are included)
     * @returns AppCustomProductPageVersionsResponse List of AppCustomProductPageVersions
     * @throws ApiError
     */
    public static appCustomProductPagesAppCustomProductPageVersionsGetToManyRelated(
        id: string,
        filterState?: Array<'PREPARE_FOR_SUBMISSION' | 'READY_FOR_REVIEW' | 'WAITING_FOR_REVIEW' | 'IN_REVIEW' | 'ACCEPTED' | 'APPROVED' | 'REPLACED_WITH_NEW_VERSION' | 'REJECTED'>,
        fieldsAppCustomProductPageVersions?: Array<'version' | 'state' | 'deepLink' | 'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        fieldsAppCustomProductPages?: Array<'name' | 'url' | 'visible' | 'app' | 'appCustomProductPageVersions'>,
        fieldsAppCustomProductPageLocalizations?: Array<'locale' | 'promotionalText' | 'appCustomProductPageVersion' | 'appScreenshotSets' | 'appPreviewSets'>,
        limit?: number,
        include?: Array<'appCustomProductPage' | 'appCustomProductPageLocalizations'>,
        limitAppCustomProductPageLocalizations?: number,
    ): CancelablePromise<AppCustomProductPageVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appCustomProductPages/{id}/appCustomProductPageVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[state]': filterState,
                'fields[appCustomProductPageVersions]': fieldsAppCustomProductPageVersions,
                'fields[appCustomProductPages]': fieldsAppCustomProductPages,
                'fields[appCustomProductPageLocalizations]': fieldsAppCustomProductPageLocalizations,
                'limit': limit,
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
}
