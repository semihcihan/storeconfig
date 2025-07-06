/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionDomainCreateRequest } from '../models/AlternativeDistributionDomainCreateRequest';
import type { AlternativeDistributionDomainResponse } from '../models/AlternativeDistributionDomainResponse';
import type { AlternativeDistributionDomainsResponse } from '../models/AlternativeDistributionDomainsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionDomainsService {
    /**
     * @param fieldsAlternativeDistributionDomains the fields to include for returned resources of type alternativeDistributionDomains
     * @param limit maximum resources per page
     * @returns AlternativeDistributionDomainsResponse List of AlternativeDistributionDomains
     * @throws ApiError
     */
    public static alternativeDistributionDomainsGetCollection(
        fieldsAlternativeDistributionDomains?: Array<'domain' | 'referenceName' | 'createdDate'>,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionDomainsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionDomains',
            query: {
                'fields[alternativeDistributionDomains]': fieldsAlternativeDistributionDomains,
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
     * @param requestBody AlternativeDistributionDomain representation
     * @returns AlternativeDistributionDomainResponse Single AlternativeDistributionDomain
     * @throws ApiError
     */
    public static alternativeDistributionDomainsCreateInstance(
        requestBody: AlternativeDistributionDomainCreateRequest,
    ): CancelablePromise<AlternativeDistributionDomainResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/alternativeDistributionDomains',
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
     * @param fieldsAlternativeDistributionDomains the fields to include for returned resources of type alternativeDistributionDomains
     * @returns AlternativeDistributionDomainResponse Single AlternativeDistributionDomain
     * @throws ApiError
     */
    public static alternativeDistributionDomainsGetInstance(
        id: string,
        fieldsAlternativeDistributionDomains?: Array<'domain' | 'referenceName' | 'createdDate'>,
    ): CancelablePromise<AlternativeDistributionDomainResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionDomains/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionDomains]': fieldsAlternativeDistributionDomains,
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
    public static alternativeDistributionDomainsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/alternativeDistributionDomains/{id}',
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
