/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewSubmissionItemCreateRequest } from '../models/ReviewSubmissionItemCreateRequest';
import type { ReviewSubmissionItemResponse } from '../models/ReviewSubmissionItemResponse';
import type { ReviewSubmissionItemUpdateRequest } from '../models/ReviewSubmissionItemUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewSubmissionItemsService {
    /**
     * @param requestBody ReviewSubmissionItem representation
     * @returns ReviewSubmissionItemResponse Single ReviewSubmissionItem
     * @throws ApiError
     */
    public static reviewSubmissionItemsCreateInstance(
        requestBody: ReviewSubmissionItemCreateRequest,
    ): CancelablePromise<ReviewSubmissionItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reviewSubmissionItems',
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
     * @param requestBody ReviewSubmissionItem representation
     * @returns ReviewSubmissionItemResponse Single ReviewSubmissionItem
     * @throws ApiError
     */
    public static reviewSubmissionItemsUpdateInstance(
        id: string,
        requestBody: ReviewSubmissionItemUpdateRequest,
    ): CancelablePromise<ReviewSubmissionItemResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/reviewSubmissionItems/{id}',
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
    public static reviewSubmissionItemsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/reviewSubmissionItems/{id}',
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
