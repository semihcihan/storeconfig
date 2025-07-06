/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerReviewResponseV1CreateRequest } from '../models/CustomerReviewResponseV1CreateRequest';
import type { CustomerReviewResponseV1Response } from '../models/CustomerReviewResponseV1Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerReviewResponsesService {
    /**
     * @param requestBody CustomerReviewResponse representation
     * @returns CustomerReviewResponseV1Response Single CustomerReviewResponse
     * @throws ApiError
     */
    public static customerReviewResponsesCreateInstance(
        requestBody: CustomerReviewResponseV1CreateRequest,
    ): CancelablePromise<CustomerReviewResponseV1Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/customerReviewResponses',
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
     * @param fieldsCustomerReviewResponses the fields to include for returned resources of type customerReviewResponses
     * @param include comma-separated list of relationships to include
     * @returns CustomerReviewResponseV1Response Single CustomerReviewResponse
     * @throws ApiError
     */
    public static customerReviewResponsesGetInstance(
        id: string,
        fieldsCustomerReviewResponses?: Array<'responseBody' | 'lastModifiedDate' | 'state' | 'review'>,
        include?: Array<'review'>,
    ): CancelablePromise<CustomerReviewResponseV1Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/customerReviewResponses/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[customerReviewResponses]': fieldsCustomerReviewResponses,
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
     * @returns void
     * @throws ApiError
     */
    public static customerReviewResponsesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/customerReviewResponses/{id}',
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
