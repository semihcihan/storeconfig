/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { csv } from '../models/csv';
import type { SubscriptionOfferCodeOneTimeUseCodeCreateRequest } from '../models/SubscriptionOfferCodeOneTimeUseCodeCreateRequest';
import type { SubscriptionOfferCodeOneTimeUseCodeResponse } from '../models/SubscriptionOfferCodeOneTimeUseCodeResponse';
import type { SubscriptionOfferCodeOneTimeUseCodeUpdateRequest } from '../models/SubscriptionOfferCodeOneTimeUseCodeUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionOfferCodeOneTimeUseCodesService {
    /**
     * @param requestBody SubscriptionOfferCodeOneTimeUseCode representation
     * @returns SubscriptionOfferCodeOneTimeUseCodeResponse Single SubscriptionOfferCodeOneTimeUseCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeOneTimeUseCodesCreateInstance(
        requestBody: SubscriptionOfferCodeOneTimeUseCodeCreateRequest,
    ): CancelablePromise<SubscriptionOfferCodeOneTimeUseCodeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subscriptionOfferCodeOneTimeUseCodes',
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
     * @param fieldsSubscriptionOfferCodeOneTimeUseCodes the fields to include for returned resources of type subscriptionOfferCodeOneTimeUseCodes
     * @param include comma-separated list of relationships to include
     * @returns SubscriptionOfferCodeOneTimeUseCodeResponse Single SubscriptionOfferCodeOneTimeUseCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeOneTimeUseCodesGetInstance(
        id: string,
        fieldsSubscriptionOfferCodeOneTimeUseCodes?: Array<'numberOfCodes' | 'createdDate' | 'expirationDate' | 'active' | 'offerCode' | 'values'>,
        include?: Array<'offerCode'>,
    ): CancelablePromise<SubscriptionOfferCodeOneTimeUseCodeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodeOneTimeUseCodes/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionOfferCodeOneTimeUseCodes]': fieldsSubscriptionOfferCodeOneTimeUseCodes,
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
     * @param requestBody SubscriptionOfferCodeOneTimeUseCode representation
     * @returns SubscriptionOfferCodeOneTimeUseCodeResponse Single SubscriptionOfferCodeOneTimeUseCode
     * @throws ApiError
     */
    public static subscriptionOfferCodeOneTimeUseCodesUpdateInstance(
        id: string,
        requestBody: SubscriptionOfferCodeOneTimeUseCodeUpdateRequest,
    ): CancelablePromise<SubscriptionOfferCodeOneTimeUseCodeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionOfferCodeOneTimeUseCodes/{id}',
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
     * @returns csv Single SubscriptionOfferCodeOneTimeUseCodeValue
     * @throws ApiError
     */
    public static subscriptionOfferCodeOneTimeUseCodesValuesGetToOneRelated(
        id: string,
    ): CancelablePromise<csv> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionOfferCodeOneTimeUseCodes/{id}/values',
            path: {
                'id': id,
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
}
