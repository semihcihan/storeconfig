/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndAppAvailabilityPreOrderCreateRequest } from '../models/EndAppAvailabilityPreOrderCreateRequest';
import type { EndAppAvailabilityPreOrderResponse } from '../models/EndAppAvailabilityPreOrderResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EndAppAvailabilityPreOrdersService {
    /**
     * @param requestBody EndAppAvailabilityPreOrder representation
     * @returns EndAppAvailabilityPreOrderResponse Single EndAppAvailabilityPreOrder
     * @throws ApiError
     */
    public static endAppAvailabilityPreOrdersCreateInstance(
        requestBody: EndAppAvailabilityPreOrderCreateRequest,
    ): CancelablePromise<EndAppAvailabilityPreOrderResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/endAppAvailabilityPreOrders',
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
