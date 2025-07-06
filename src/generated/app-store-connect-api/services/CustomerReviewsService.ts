/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerReviewResponse } from '../models/CustomerReviewResponse';
import type { CustomerReviewResponseLinkageResponse } from '../models/CustomerReviewResponseLinkageResponse';
import type { CustomerReviewResponseV1Response } from '../models/CustomerReviewResponseV1Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerReviewsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsCustomerReviews the fields to include for returned resources of type customerReviews
     * @param fieldsCustomerReviewResponses the fields to include for returned resources of type customerReviewResponses
     * @param include comma-separated list of relationships to include
     * @returns CustomerReviewResponse Single CustomerReview
     * @throws ApiError
     */
    public static customerReviewsGetInstance(
        id: string,
        fieldsCustomerReviews?: Array<'rating' | 'title' | 'body' | 'reviewerNickname' | 'createdDate' | 'territory' | 'response'>,
        fieldsCustomerReviewResponses?: Array<'responseBody' | 'lastModifiedDate' | 'state' | 'review'>,
        include?: Array<'response'>,
    ): CancelablePromise<CustomerReviewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/customerReviews/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[customerReviews]': fieldsCustomerReviews,
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
     * @returns CustomerReviewResponseLinkageResponse Related linkage
     * @throws ApiError
     */
    public static customerReviewsResponseGetToOneRelationship(
        id: string,
    ): CancelablePromise<CustomerReviewResponseLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/customerReviews/{id}/relationships/response',
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
    /**
     * @param id the id of the requested resource
     * @param fieldsCustomerReviewResponses the fields to include for returned resources of type customerReviewResponses
     * @param fieldsCustomerReviews the fields to include for returned resources of type customerReviews
     * @param include comma-separated list of relationships to include
     * @returns CustomerReviewResponseV1Response Single CustomerReviewResponse
     * @throws ApiError
     */
    public static customerReviewsResponseGetToOneRelated(
        id: string,
        fieldsCustomerReviewResponses?: Array<'responseBody' | 'lastModifiedDate' | 'state' | 'review'>,
        fieldsCustomerReviews?: Array<'rating' | 'title' | 'body' | 'reviewerNickname' | 'createdDate' | 'territory' | 'response'>,
        include?: Array<'review'>,
    ): CancelablePromise<CustomerReviewResponseV1Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/customerReviews/{id}/response',
            path: {
                'id': id,
            },
            query: {
                'fields[customerReviewResponses]': fieldsCustomerReviewResponses,
                'fields[customerReviews]': fieldsCustomerReviews,
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
}
