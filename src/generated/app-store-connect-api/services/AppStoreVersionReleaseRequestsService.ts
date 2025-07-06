/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionReleaseRequestCreateRequest } from '../models/AppStoreVersionReleaseRequestCreateRequest';
import type { AppStoreVersionReleaseRequestResponse } from '../models/AppStoreVersionReleaseRequestResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppStoreVersionReleaseRequestsService {
    /**
     * @param requestBody AppStoreVersionReleaseRequest representation
     * @returns AppStoreVersionReleaseRequestResponse Single AppStoreVersionReleaseRequest
     * @throws ApiError
     */
    public static appStoreVersionReleaseRequestsCreateInstance(
        requestBody: AppStoreVersionReleaseRequestCreateRequest,
    ): CancelablePromise<AppStoreVersionReleaseRequestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/appStoreVersionReleaseRequests',
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
