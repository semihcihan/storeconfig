/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAdvancedExperienceCreateRequest } from '../models/AppClipAdvancedExperienceCreateRequest';
import type { AppClipAdvancedExperienceResponse } from '../models/AppClipAdvancedExperienceResponse';
import type { AppClipAdvancedExperienceUpdateRequest } from '../models/AppClipAdvancedExperienceUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipAdvancedExperiencesService {
    /**
     * @param requestBody AppClipAdvancedExperience representation
     * @returns AppClipAdvancedExperienceResponse Single AppClipAdvancedExperience
     * @throws ApiError
     */
    public static appClipAdvancedExperiencesCreateInstance(
        requestBody: AppClipAdvancedExperienceCreateRequest,
    ): CancelablePromise<AppClipAdvancedExperienceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipAdvancedExperiences',
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
     * @param fieldsAppClipAdvancedExperiences the fields to include for returned resources of type appClipAdvancedExperiences
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @returns AppClipAdvancedExperienceResponse Single AppClipAdvancedExperience
     * @throws ApiError
     */
    public static appClipAdvancedExperiencesGetInstance(
        id: string,
        fieldsAppClipAdvancedExperiences?: Array<'link' | 'version' | 'status' | 'action' | 'isPoweredBy' | 'place' | 'placeStatus' | 'businessCategory' | 'defaultLanguage' | 'appClip' | 'headerImage' | 'localizations'>,
        include?: Array<'appClip' | 'headerImage' | 'localizations'>,
        limitLocalizations?: number,
    ): CancelablePromise<AppClipAdvancedExperienceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipAdvancedExperiences/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipAdvancedExperiences]': fieldsAppClipAdvancedExperiences,
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
     * @param requestBody AppClipAdvancedExperience representation
     * @returns AppClipAdvancedExperienceResponse Single AppClipAdvancedExperience
     * @throws ApiError
     */
    public static appClipAdvancedExperiencesUpdateInstance(
        id: string,
        requestBody: AppClipAdvancedExperienceUpdateRequest,
    ): CancelablePromise<AppClipAdvancedExperienceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipAdvancedExperiences/{id}',
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
}
