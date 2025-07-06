/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdCapabilityCreateRequest } from '../models/BundleIdCapabilityCreateRequest';
import type { BundleIdCapabilityResponse } from '../models/BundleIdCapabilityResponse';
import type { BundleIdCapabilityUpdateRequest } from '../models/BundleIdCapabilityUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BundleIdCapabilitiesService {
    /**
     * @param requestBody BundleIdCapability representation
     * @returns BundleIdCapabilityResponse Single BundleIdCapability
     * @throws ApiError
     */
    public static bundleIdCapabilitiesCreateInstance(
        requestBody: BundleIdCapabilityCreateRequest,
    ): CancelablePromise<BundleIdCapabilityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/bundleIdCapabilities',
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
     * @param requestBody BundleIdCapability representation
     * @returns BundleIdCapabilityResponse Single BundleIdCapability
     * @throws ApiError
     */
    public static bundleIdCapabilitiesUpdateInstance(
        id: string,
        requestBody: BundleIdCapabilityUpdateRequest,
    ): CancelablePromise<BundleIdCapabilityResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/bundleIdCapabilities/{id}',
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
    public static bundleIdCapabilitiesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/bundleIdCapabilities/{id}',
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
