/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoutingAppCoverageCreateRequest } from '../models/RoutingAppCoverageCreateRequest';
import type { RoutingAppCoverageResponse } from '../models/RoutingAppCoverageResponse';
import type { RoutingAppCoverageUpdateRequest } from '../models/RoutingAppCoverageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoutingAppCoveragesService {
    /**
     * @param requestBody RoutingAppCoverage representation
     * @returns RoutingAppCoverageResponse Single RoutingAppCoverage
     * @throws ApiError
     */
    public static routingAppCoveragesCreateInstance(
        requestBody: RoutingAppCoverageCreateRequest,
    ): CancelablePromise<RoutingAppCoverageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/routingAppCoverages',
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
     * @param fieldsRoutingAppCoverages the fields to include for returned resources of type routingAppCoverages
     * @param include comma-separated list of relationships to include
     * @returns RoutingAppCoverageResponse Single RoutingAppCoverage
     * @throws ApiError
     */
    public static routingAppCoveragesGetInstance(
        id: string,
        fieldsRoutingAppCoverages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'uploadOperations' | 'assetDeliveryState' | 'appStoreVersion'>,
        include?: Array<'appStoreVersion'>,
    ): CancelablePromise<RoutingAppCoverageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/routingAppCoverages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[routingAppCoverages]': fieldsRoutingAppCoverages,
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
     * @param requestBody RoutingAppCoverage representation
     * @returns RoutingAppCoverageResponse Single RoutingAppCoverage
     * @throws ApiError
     */
    public static routingAppCoveragesUpdateInstance(
        id: string,
        requestBody: RoutingAppCoverageUpdateRequest,
    ): CancelablePromise<RoutingAppCoverageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/routingAppCoverages/{id}',
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
    public static routingAppCoveragesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/routingAppCoverages/{id}',
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
