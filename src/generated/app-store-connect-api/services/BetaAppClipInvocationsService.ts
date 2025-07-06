/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppClipInvocationCreateRequest } from '../models/BetaAppClipInvocationCreateRequest';
import type { BetaAppClipInvocationResponse } from '../models/BetaAppClipInvocationResponse';
import type { BetaAppClipInvocationUpdateRequest } from '../models/BetaAppClipInvocationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaAppClipInvocationsService {
    /**
     * @param requestBody BetaAppClipInvocation representation
     * @returns BetaAppClipInvocationResponse Single BetaAppClipInvocation
     * @throws ApiError
     */
    public static betaAppClipInvocationsCreateInstance(
        requestBody: BetaAppClipInvocationCreateRequest,
    ): CancelablePromise<BetaAppClipInvocationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaAppClipInvocations',
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
     * @param fieldsBetaAppClipInvocations the fields to include for returned resources of type betaAppClipInvocations
     * @param include comma-separated list of relationships to include
     * @param limitBetaAppClipInvocationLocalizations maximum number of related betaAppClipInvocationLocalizations returned (when they are included)
     * @returns BetaAppClipInvocationResponse Single BetaAppClipInvocation
     * @throws ApiError
     */
    public static betaAppClipInvocationsGetInstance(
        id: string,
        fieldsBetaAppClipInvocations?: Array<'url' | 'betaAppClipInvocationLocalizations'>,
        include?: Array<'betaAppClipInvocationLocalizations'>,
        limitBetaAppClipInvocationLocalizations?: number,
    ): CancelablePromise<BetaAppClipInvocationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/betaAppClipInvocations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppClipInvocations]': fieldsBetaAppClipInvocations,
                'include': include,
                'limit[betaAppClipInvocationLocalizations]': limitBetaAppClipInvocationLocalizations,
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
     * @param requestBody BetaAppClipInvocation representation
     * @returns BetaAppClipInvocationResponse Single BetaAppClipInvocation
     * @throws ApiError
     */
    public static betaAppClipInvocationsUpdateInstance(
        id: string,
        requestBody: BetaAppClipInvocationUpdateRequest,
    ): CancelablePromise<BetaAppClipInvocationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaAppClipInvocations/{id}',
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
    public static betaAppClipInvocationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaAppClipInvocations/{id}',
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
