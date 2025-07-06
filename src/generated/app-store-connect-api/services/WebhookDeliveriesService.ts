/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookDeliveryCreateRequest } from '../models/WebhookDeliveryCreateRequest';
import type { WebhookDeliveryResponse } from '../models/WebhookDeliveryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookDeliveriesService {
    /**
     * @param requestBody WebhookDelivery representation
     * @returns WebhookDeliveryResponse Single WebhookDelivery
     * @throws ApiError
     */
    public static webhookDeliveriesCreateInstance(
        requestBody: WebhookDeliveryCreateRequest,
    ): CancelablePromise<WebhookDeliveryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/webhookDeliveries',
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
