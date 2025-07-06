/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionSubmissionCreateRequest } from '../models/SubscriptionSubmissionCreateRequest';
import type { SubscriptionSubmissionResponse } from '../models/SubscriptionSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionSubmissionsService {
    /**
     * @param requestBody SubscriptionSubmission representation
     * @returns SubscriptionSubmissionResponse Single SubscriptionSubmission
     * @throws ApiError
     */
    public static subscriptionSubmissionsCreateInstance(
        requestBody: SubscriptionSubmissionCreateRequest,
    ): CancelablePromise<SubscriptionSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionSubmissions',
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
}
