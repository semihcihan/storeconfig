/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SandboxTestersClearPurchaseHistoryRequestV2CreateRequest } from '../models/SandboxTestersClearPurchaseHistoryRequestV2CreateRequest';
import type { SandboxTestersClearPurchaseHistoryRequestV2Response } from '../models/SandboxTestersClearPurchaseHistoryRequestV2Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SandboxTestersClearPurchaseHistoryRequestService {
    /**
     * @param requestBody SandboxTestersClearPurchaseHistoryRequest representation
     * @returns SandboxTestersClearPurchaseHistoryRequestV2Response Single SandboxTestersClearPurchaseHistoryRequest
     * @throws ApiError
     */
    public static sandboxTestersClearPurchaseHistoryRequestV2CreateInstance(
        requestBody: SandboxTestersClearPurchaseHistoryRequestV2CreateRequest,
    ): CancelablePromise<SandboxTestersClearPurchaseHistoryRequestV2Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/sandboxTestersClearPurchaseHistoryRequest',
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
