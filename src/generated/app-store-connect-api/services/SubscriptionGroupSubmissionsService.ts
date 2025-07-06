/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionGroupSubmissionCreateRequest } from '../models/SubscriptionGroupSubmissionCreateRequest';
import type { SubscriptionGroupSubmissionResponse } from '../models/SubscriptionGroupSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionGroupSubmissionsService {
    /**
     * @param requestBody SubscriptionGroupSubmission representation
     * @returns SubscriptionGroupSubmissionResponse Single SubscriptionGroupSubmission
     * @throws ApiError
     */
    public static subscriptionGroupSubmissionsCreateInstance(
        requestBody: SubscriptionGroupSubmissionCreateRequest,
    ): CancelablePromise<SubscriptionGroupSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionGroupSubmissions',
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
