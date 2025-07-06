/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionIntroductoryOfferCreateRequest } from '../models/SubscriptionIntroductoryOfferCreateRequest';
import type { SubscriptionIntroductoryOfferResponse } from '../models/SubscriptionIntroductoryOfferResponse';
import type { SubscriptionIntroductoryOfferUpdateRequest } from '../models/SubscriptionIntroductoryOfferUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionIntroductoryOffersService {
    /**
     * @param requestBody SubscriptionIntroductoryOffer representation
     * @returns SubscriptionIntroductoryOfferResponse Single SubscriptionIntroductoryOffer
     * @throws ApiError
     */
    public static subscriptionIntroductoryOffersCreateInstance(
        requestBody: SubscriptionIntroductoryOfferCreateRequest,
    ): CancelablePromise<SubscriptionIntroductoryOfferResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionIntroductoryOffers',
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
     * @param requestBody SubscriptionIntroductoryOffer representation
     * @returns SubscriptionIntroductoryOfferResponse Single SubscriptionIntroductoryOffer
     * @throws ApiError
     */
    public static subscriptionIntroductoryOffersUpdateInstance(
        id: string,
        requestBody: SubscriptionIntroductoryOfferUpdateRequest,
    ): CancelablePromise<SubscriptionIntroductoryOfferResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionIntroductoryOffers/{id}',
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
    public static subscriptionIntroductoryOffersDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subscriptionIntroductoryOffers/{id}',
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
