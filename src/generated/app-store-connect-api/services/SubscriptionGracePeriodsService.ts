/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionGracePeriodResponse } from '../models/SubscriptionGracePeriodResponse';
import type { SubscriptionGracePeriodUpdateRequest } from '../models/SubscriptionGracePeriodUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionGracePeriodsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsSubscriptionGracePeriods the fields to include for returned resources of type subscriptionGracePeriods
     * @returns SubscriptionGracePeriodResponse Single SubscriptionGracePeriod
     * @throws ApiError
     */
    public static subscriptionGracePeriodsGetInstance(
        id: string,
        fieldsSubscriptionGracePeriods?: Array<'optIn' | 'sandboxOptIn' | 'duration' | 'renewalType'>,
    ): CancelablePromise<SubscriptionGracePeriodResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subscriptionGracePeriods/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[subscriptionGracePeriods]': fieldsSubscriptionGracePeriods,
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
     * @param requestBody SubscriptionGracePeriod representation
     * @returns SubscriptionGracePeriodResponse Single SubscriptionGracePeriod
     * @throws ApiError
     */
    public static subscriptionGracePeriodsUpdateInstance(
        id: string,
        requestBody: SubscriptionGracePeriodUpdateRequest,
    ): CancelablePromise<SubscriptionGracePeriodResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/subscriptionGracePeriods/{id}',
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
