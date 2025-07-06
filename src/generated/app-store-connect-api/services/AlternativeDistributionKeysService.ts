/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionKeyCreateRequest } from '../models/AlternativeDistributionKeyCreateRequest';
import type { AlternativeDistributionKeyResponse } from '../models/AlternativeDistributionKeyResponse';
import type { AlternativeDistributionKeysResponse } from '../models/AlternativeDistributionKeysResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionKeysService {
    /**
     * @param existsApp filter by existence or non-existence of related 'app'
     * @param fieldsAlternativeDistributionKeys the fields to include for returned resources of type alternativeDistributionKeys
     * @param limit maximum resources per page
     * @returns AlternativeDistributionKeysResponse List of AlternativeDistributionKeys
     * @throws ApiError
     */
    public static alternativeDistributionKeysGetCollection(
        existsApp?: boolean,
        fieldsAlternativeDistributionKeys?: Array<'publicKey'>,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionKeysResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionKeys',
            query: {
                'exists[app]': existsApp,
                'fields[alternativeDistributionKeys]': fieldsAlternativeDistributionKeys,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param requestBody AlternativeDistributionKey representation
     * @returns AlternativeDistributionKeyResponse Single AlternativeDistributionKey
     * @throws ApiError
     */
    public static alternativeDistributionKeysCreateInstance(
        requestBody: AlternativeDistributionKeyCreateRequest,
    ): CancelablePromise<AlternativeDistributionKeyResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/alternativeDistributionKeys',
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
     * @param fieldsAlternativeDistributionKeys the fields to include for returned resources of type alternativeDistributionKeys
     * @returns AlternativeDistributionKeyResponse Single AlternativeDistributionKey
     * @throws ApiError
     */
    public static alternativeDistributionKeysGetInstance(
        id: string,
        fieldsAlternativeDistributionKeys?: Array<'publicKey'>,
    ): CancelablePromise<AlternativeDistributionKeyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionKeys/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionKeys]': fieldsAlternativeDistributionKeys,
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
    public static alternativeDistributionKeysDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/alternativeDistributionKeys/{id}',
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
