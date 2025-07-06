/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreReviewAttachmentsResponse } from '../models/AppStoreReviewAttachmentsResponse';
import type { AppStoreReviewDetailAppStoreReviewAttachmentsLinkagesResponse } from '../models/AppStoreReviewDetailAppStoreReviewAttachmentsLinkagesResponse';
import type { AppStoreReviewDetailCreateRequest } from '../models/AppStoreReviewDetailCreateRequest';
import type { AppStoreReviewDetailResponse } from '../models/AppStoreReviewDetailResponse';
import type { AppStoreReviewDetailUpdateRequest } from '../models/AppStoreReviewDetailUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreReviewDetailsService {
    /**
     * @param requestBody AppStoreReviewDetail representation
     * @returns AppStoreReviewDetailResponse Single AppStoreReviewDetail
     * @throws ApiError
     */
    public static appStoreReviewDetailsCreateInstance(
        requestBody: AppStoreReviewDetailCreateRequest,
    ): CancelablePromise<AppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreReviewDetails',
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
     * @param fieldsAppStoreReviewDetails the fields to include for returned resources of type appStoreReviewDetails
     * @param fieldsAppStoreReviewAttachments the fields to include for returned resources of type appStoreReviewAttachments
     * @param include comma-separated list of relationships to include
     * @param limitAppStoreReviewAttachments maximum number of related appStoreReviewAttachments returned (when they are included)
     * @returns AppStoreReviewDetailResponse Single AppStoreReviewDetail
     * @throws ApiError
     */
    public static appStoreReviewDetailsGetInstance(
        id: string,
        fieldsAppStoreReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'appStoreVersion' | 'appStoreReviewAttachments'>,
        fieldsAppStoreReviewAttachments?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreReviewDetail'>,
        include?: Array<'appStoreVersion' | 'appStoreReviewAttachments'>,
        limitAppStoreReviewAttachments?: number,
    ): CancelablePromise<AppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreReviewDetails/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreReviewDetails]': fieldsAppStoreReviewDetails,
                'fields[appStoreReviewAttachments]': fieldsAppStoreReviewAttachments,
                'include': include,
                'limit[appStoreReviewAttachments]': limitAppStoreReviewAttachments,
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
     * @param requestBody AppStoreReviewDetail representation
     * @returns AppStoreReviewDetailResponse Single AppStoreReviewDetail
     * @throws ApiError
     */
    public static appStoreReviewDetailsUpdateInstance(
        id: string,
        requestBody: AppStoreReviewDetailUpdateRequest,
    ): CancelablePromise<AppStoreReviewDetailResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreReviewDetails/{id}',
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
     * @returns AppStoreReviewDetailAppStoreReviewAttachmentsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static appStoreReviewDetailsAppStoreReviewAttachmentsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AppStoreReviewDetailAppStoreReviewAttachmentsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreReviewDetails/{id}/relationships/appStoreReviewAttachments',
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
     * @param fieldsAppStoreReviewAttachments the fields to include for returned resources of type appStoreReviewAttachments
     * @param fieldsAppStoreReviewDetails the fields to include for returned resources of type appStoreReviewDetails
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns AppStoreReviewAttachmentsResponse List of AppStoreReviewAttachments
     * @throws ApiError
     */
    public static appStoreReviewDetailsAppStoreReviewAttachmentsGetToManyRelated(
        id: string,
        fieldsAppStoreReviewAttachments?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreReviewDetail'>,
        fieldsAppStoreReviewDetails?: Array<'contactFirstName' | 'contactLastName' | 'contactPhone' | 'contactEmail' | 'demoAccountName' | 'demoAccountPassword' | 'demoAccountRequired' | 'notes' | 'appStoreVersion' | 'appStoreReviewAttachments'>,
        limit?: number,
        include?: Array<'appStoreReviewDetail'>,
    ): CancelablePromise<AppStoreReviewAttachmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreReviewDetails/{id}/appStoreReviewAttachments',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreReviewAttachments]': fieldsAppStoreReviewAttachments,
                'fields[appStoreReviewDetails]': fieldsAppStoreReviewDetails,
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
