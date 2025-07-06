/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreReviewAttachmentCreateRequest } from '../models/AppStoreReviewAttachmentCreateRequest';
import type { AppStoreReviewAttachmentResponse } from '../models/AppStoreReviewAttachmentResponse';
import type { AppStoreReviewAttachmentUpdateRequest } from '../models/AppStoreReviewAttachmentUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreReviewAttachmentsService {
    /**
     * @param requestBody AppStoreReviewAttachment representation
     * @returns AppStoreReviewAttachmentResponse Single AppStoreReviewAttachment
     * @throws ApiError
     */
    public static appStoreReviewAttachmentsCreateInstance(
        requestBody: AppStoreReviewAttachmentCreateRequest,
    ): CancelablePromise<AppStoreReviewAttachmentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreReviewAttachments',
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
     * @param fieldsAppStoreReviewAttachments the fields to include for returned resources of type appStoreReviewAttachments
     * @param include comma-separated list of relationships to include
     * @returns AppStoreReviewAttachmentResponse Single AppStoreReviewAttachment
     * @throws ApiError
     */
    public static appStoreReviewAttachmentsGetInstance(
        id: string,
        fieldsAppStoreReviewAttachments?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreReviewDetail'>,
        include?: Array<'appStoreReviewDetail'>,
    ): CancelablePromise<AppStoreReviewAttachmentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/appStoreReviewAttachments/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[appStoreReviewAttachments]': fieldsAppStoreReviewAttachments,
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
     * @param requestBody AppStoreReviewAttachment representation
     * @returns AppStoreReviewAttachmentResponse Single AppStoreReviewAttachment
     * @throws ApiError
     */
    public static appStoreReviewAttachmentsUpdateInstance(
        id: string,
        requestBody: AppStoreReviewAttachmentUpdateRequest,
    ): CancelablePromise<AppStoreReviewAttachmentResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/appStoreReviewAttachments/{id}',
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
    public static appStoreReviewAttachmentsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/appStoreReviewAttachments/{id}',
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
