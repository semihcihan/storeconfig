/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionOfferCodeCustomCodeCreateRequest } from '../models/SubscriptionOfferCodeCustomCodeCreateRequest';
import type { SubscriptionOfferCodeCustomCodeResponse } from '../models/SubscriptionOfferCodeCustomCodeResponse';
import type { SubscriptionOfferCodeCustomCodeUpdateRequest } from '../models/SubscriptionOfferCodeCustomCodeUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionOfferCodeCustomCodesService {
    /**
     * @param requestBody SubscriptionOfferCodeCustomCode representation
     * @returns SubscriptionOfferCodeCustomCodeResponse Single SubscriptionOfferCodeCustomCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeCustomCodesCreateInstance(
        requestBody: SubscriptionOfferCodeCustomCodeCreateRequest,
    ): CancelablePromise<SubscriptionOfferCodeCustomCodeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionOfferCodeCustomCodes',
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
     * @param fieldsSubscriptionOfferCodeCustomCodes the fields to include for returned resources of type subscriptionOfferCodeCustomCodes
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionOfferCodeCustomCodeResponse Single SubscriptionOfferCodeCustomCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeCustomCodesGetInstance(
        id: string,
        fieldsSubscriptionOfferCodeCustomCodes?: Array<'customCode' | 'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode'>,
        include?: Array<'offerCode'>,
    ): CancelablePromise<SubscriptionOfferCodeCustomCodeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodeCustomCodes/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionOfferCodeCustomCodes]': fieldsSubscriptionOfferCodeCustomCodes,
                'include': include,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param requestBody SubscriptionOfferCodeCustomCode representation
     * @returns SubscriptionOfferCodeCustomCodeResponse Single SubscriptionOfferCodeCustomCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeCustomCodesUpdateInstance(
        id: string,
        requestBody: SubscriptionOfferCodeCustomCodeUpdateRequest,
    ): CancelablePromise<SubscriptionOfferCodeCustomCodeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionOfferCodeCustomCodes/{id}',
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
}
