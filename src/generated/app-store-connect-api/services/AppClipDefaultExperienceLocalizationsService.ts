/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipDefaultExperienceLocalizationAppClipHeaderImageLinkageResponse } from '../models/AppClipDefaultExperienceLocalizationAppClipHeaderImageLinkageResponse';
import type { AppClipDefaultExperienceLocalizationCreateRequest } from '../models/AppClipDefaultExperienceLocalizationCreateRequest';
import type { AppClipDefaultExperienceLocalizationResponse } from '../models/AppClipDefaultExperienceLocalizationResponse';
import type { AppClipDefaultExperienceLocalizationUpdateRequest } from '../models/AppClipDefaultExperienceLocalizationUpdateRequest';
import type { AppClipHeaderImageResponse } from '../models/AppClipHeaderImageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipDefaultExperienceLocalizationsService {
    /**
     * @param requestBody AppClipDefaultExperienceLocalization representation
     * @returns AppClipDefaultExperienceLocalizationResponse Single AppClipDefaultExperienceLocalization
     * @throws ApiError
     */
    public static appClipDefaultExperienceLocalizationsCreateInstance(
        requestBody: AppClipDefaultExperienceLocalizationCreateRequest,
    ): CancelablePromise<AppClipDefaultExperienceLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipDefaultExperienceLocalizations',
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
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param fieldsAppClipHeaderImages the fields to include for returned resources of type appClipHeaderImages
     * @param include comma-separated list of relationships to include
     * @returns AppClipDefaultExperienceLocalizationResponse Single AppClipDefaultExperienceLocalization
     * @throws ApiError
     */
    public static appClipDefaultExperienceLocalizationsGetInstance(
        id: string,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        fieldsAppClipHeaderImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'appClipDefaultExperienceLocalization'>,
        include?: Array<'appClipDefaultExperience' | 'appClipHeaderImage'>,
    ): CancelablePromise<AppClipDefaultExperienceLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperienceLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipDefaultExperienceLocalizations]': fieldsAppClipDefaultExperienceLocalizations,
                'fields[appClipHeaderImages]': fieldsAppClipHeaderImages,
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
     * @param requestBody AppClipDefaultExperienceLocalization representation
     * @returns AppClipDefaultExperienceLocalizationResponse Single AppClipDefaultExperienceLocalization
     * @throws ApiError
     */
    public static appClipDefaultExperienceLocalizationsUpdateInstance(
        id: string,
        requestBody: AppClipDefaultExperienceLocalizationUpdateRequest,
    ): CancelablePromise<AppClipDefaultExperienceLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipDefaultExperienceLocalizations/{id}',
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
    public static appClipDefaultExperienceLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appClipDefaultExperienceLocalizations/{id}',
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
     * @returns AppClipDefaultExperienceLocalizationAppClipHeaderImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static appClipDefaultExperienceLocalizationsAppClipHeaderImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<AppClipDefaultExperienceLocalizationAppClipHeaderImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperienceLocalizations/{id}/relationships/appClipHeaderImage',
            path: {
                'id': id,
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
     * @param fieldsAppClipHeaderImages the fields to include for returned resources of type appClipHeaderImages
     * @param fieldsAppClipDefaultExperienceLocalizations the fields to include for returned resources of type appClipDefaultExperienceLocalizations
     * @param include comma-separated list of relationships to include
     * @returns AppClipHeaderImageResponse Single AppClipHeaderImage
     * @throws ApiError
     */
    public static appClipDefaultExperienceLocalizationsAppClipHeaderImageGetToOneRelated(
        id: string,
        fieldsAppClipHeaderImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'appClipDefaultExperienceLocalization'>,
        fieldsAppClipDefaultExperienceLocalizations?: Array<'locale' | 'subtitle' | 'appClipDefaultExperience' | 'appClipHeaderImage'>,
        include?: Array<'appClipDefaultExperienceLocalization'>,
    ): CancelablePromise<AppClipHeaderImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipDefaultExperienceLocalizations/{id}/appClipHeaderImage',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipHeaderImages]': fieldsAppClipHeaderImages,
                'fields[appClipDefaultExperienceLocalizations]': fieldsAppClipDefaultExperienceLocalizations,
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
