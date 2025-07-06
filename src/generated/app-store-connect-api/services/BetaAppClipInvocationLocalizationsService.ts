/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppClipInvocationLocalizationCreateRequest } from '../models/BetaAppClipInvocationLocalizationCreateRequest';
import type { BetaAppClipInvocationLocalizationResponse } from '../models/BetaAppClipInvocationLocalizationResponse';
import type { BetaAppClipInvocationLocalizationUpdateRequest } from '../models/BetaAppClipInvocationLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BetaAppClipInvocationLocalizationsService {
    /**
     * @param requestBody BetaAppClipInvocationLocalization representation
     * @returns BetaAppClipInvocationLocalizationResponse Single BetaAppClipInvocationLocalization
     * @throws ApiError
     */
    public static betaAppClipInvocationLocalizationsCreateInstance(
        requestBody: BetaAppClipInvocationLocalizationCreateRequest,
    ): CancelablePromise<BetaAppClipInvocationLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/betaAppClipInvocationLocalizations',
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
     * @param requestBody BetaAppClipInvocationLocalization representation
     * @returns BetaAppClipInvocationLocalizationResponse Single BetaAppClipInvocationLocalization
     * @throws ApiError
     */
    public static betaAppClipInvocationLocalizationsUpdateInstance(
        id: string,
        requestBody: BetaAppClipInvocationLocalizationUpdateRequest,
    ): CancelablePromise<BetaAppClipInvocationLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/betaAppClipInvocationLocalizations/{id}',
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
    public static betaAppClipInvocationLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/betaAppClipInvocationLocalizations/{id}',
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
