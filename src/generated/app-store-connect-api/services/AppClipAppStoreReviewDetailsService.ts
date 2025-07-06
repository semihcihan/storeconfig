/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAppStoreReviewDetailCreateRequest } from '../models/AppClipAppStoreReviewDetailCreateRequest';
import type { AppClipAppStoreReviewDetailResponse } from '../models/AppClipAppStoreReviewDetailResponse';
import type { AppClipAppStoreReviewDetailUpdateRequest } from '../models/AppClipAppStoreReviewDetailUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppClipAppStoreReviewDetailsService {
    /**
     * @param requestBody AppClipAppStoreReviewDetail representation
     * @returns AppClipAppStoreReviewDetailResponse Single AppClipAppStoreReviewDetail
     * @throws ApiError
     */
    public static appClipAppStoreReviewDetailsCreateInstance(
        requestBody: AppClipAppStoreReviewDetailCreateRequest,
    ): CancelablePromise<AppClipAppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appClipAppStoreReviewDetails',
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
     * @param fieldsAppClipAppStoreReviewDetails the fields to include for returned resources of type appClipAppStoreReviewDetails
     * @param include comma-separated list of relationships to include
     * @returns AppClipAppStoreReviewDetailResponse Single AppClipAppStoreReviewDetail
     * @throws ApiError
     */
    public static appClipAppStoreReviewDetailsGetInstance(
        id: string,
        fieldsAppClipAppStoreReviewDetails?: Array<'invocationUrls' | 'appClipDefaultExperience'>,
        include?: Array<'appClipDefaultExperience'>,
    ): CancelablePromise<AppClipAppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appClipAppStoreReviewDetails/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipAppStoreReviewDetails]': fieldsAppClipAppStoreReviewDetails,
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
     * @param requestBody AppClipAppStoreReviewDetail representation
     * @returns AppClipAppStoreReviewDetailResponse Single AppClipAppStoreReviewDetail
     * @throws ApiError
     */
    public static appClipAppStoreReviewDetailsUpdateInstance(
        id: string,
        requestBody: AppClipAppStoreReviewDetailUpdateRequest,
    ): CancelablePromise<AppClipAppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appClipAppStoreReviewDetails/{id}',
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
