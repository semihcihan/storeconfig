/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPriceCreateRequest } from '../models/SubscriptionPriceCreateRequest';
import type { SubscriptionPriceResponse } from '../models/SubscriptionPriceResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionPricesService {
    /**
     * @param requestBody SubscriptionPrice representation
     * @returns SubscriptionPriceResponse Single SubscriptionPrice
     * @throws ApiError
     */
    public static subscriptionPricesCreateInstance(
        requestBody: SubscriptionPriceCreateRequest,
    ): CancelablePromise<SubscriptionPriceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionPrices',
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
     * @returns void
     * @throws ApiError
     */
    public static subscriptionPricesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionPrices/{id}',
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
