/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppInfoLocalizationCreateRequest } from '../models/AppInfoLocalizationCreateRequest';
import type { AppInfoLocalizationResponse } from '../models/AppInfoLocalizationResponse';
import type { AppInfoLocalizationUpdateRequest } from '../models/AppInfoLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppInfoLocalizationsService {
    /**
     * @param requestBody AppInfoLocalization representation
     * @returns AppInfoLocalizationResponse Single AppInfoLocalization
     * @throws ApiError
     */
    public static appInfoLocalizationsCreateInstance(
        requestBody: AppInfoLocalizationCreateRequest,
    ): CancelablePromise<AppInfoLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appInfoLocalizations',
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
     * @param fieldsAppInfoLocalizations the fields to include for returned resources of type appInfoLocalizations
     * @param include comma-separated list of relationships to include
     * @returns AppInfoLocalizationResponse Single AppInfoLocalization
     * @throws ApiError
     */
    public static appInfoLocalizationsGetInstance(
        id: string,
        fieldsAppInfoLocalizations?: Array<'locale' | 'name' | 'subtitle' | 'privacyPolicyUrl' | 'privacyChoicesUrl' | 'privacyPolicyText' | 'appInfo'>,
        include?: Array<'appInfo'>,
    ): CancelablePromise<AppInfoLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appInfoLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appInfoLocalizations]': fieldsAppInfoLocalizations,
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
     * @param requestBody AppInfoLocalization representation
     * @returns AppInfoLocalizationResponse Single AppInfoLocalization
     * @throws ApiError
     */
    public static appInfoLocalizationsUpdateInstance(
        id: string,
        requestBody: AppInfoLocalizationUpdateRequest,
    ): CancelablePromise<AppInfoLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appInfoLocalizations/{id}',
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
    public static appInfoLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appInfoLocalizations/{id}',
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
