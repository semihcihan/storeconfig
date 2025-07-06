/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookPingCreateRequest } from '../models/WebhookPingCreateRequest';
import type { WebhookPingResponse } from '../models/WebhookPingResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookPingsService {
    /**
     * @param requestBody WebhookPing representation
     * @returns WebhookPingResponse Single WebhookPing
     * @throws ApiError
     */
    public static webhookPingsCreateInstance(
        requestBody: WebhookPingCreateRequest,
    ): CancelablePromise<WebhookPingResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/webhookPings',
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
