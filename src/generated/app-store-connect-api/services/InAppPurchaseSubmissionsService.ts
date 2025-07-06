/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseSubmissionCreateRequest } from '../models/InAppPurchaseSubmissionCreateRequest';
import type { InAppPurchaseSubmissionResponse } from '../models/InAppPurchaseSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseSubmissionsService {
    /**
     * @param requestBody InAppPurchaseSubmission representation
     * @returns InAppPurchaseSubmissionResponse Single InAppPurchaseSubmission
     * @throws ApiError
     */
    public static inAppPurchaseSubmissionsCreateInstance(
        requestBody: InAppPurchaseSubmissionCreateRequest,
    ): CancelablePromise<InAppPurchaseSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchaseSubmissions',
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
