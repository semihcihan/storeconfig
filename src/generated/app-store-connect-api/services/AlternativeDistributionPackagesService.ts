/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackageCreateRequest } from '../models/AlternativeDistributionPackageCreateRequest';
import type { AlternativeDistributionPackageResponse } from '../models/AlternativeDistributionPackageResponse';
import type { AlternativeDistributionPackageVersionsLinkagesResponse } from '../models/AlternativeDistributionPackageVersionsLinkagesResponse';
import type { AlternativeDistributionPackageVersionsResponse } from '../models/AlternativeDistributionPackageVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionPackagesService {
    /**
     * @param requestBody AlternativeDistributionPackage representation
     * @returns AlternativeDistributionPackageResponse Single AlternativeDistributionPackage
     * @throws ApiError
     */
    public static alternativeDistributionPackagesCreateInstance(
        requestBody: AlternativeDistributionPackageCreateRequest,
    ): CancelablePromise<AlternativeDistributionPackageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/alternativeDistributionPackages',
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
     * @param fieldsAlternativeDistributionPackages the fields to include for returned resources of type alternativeDistributionPackages
     * @param fieldsAlternativeDistributionPackageVersions the fields to include for returned resources of type alternativeDistributionPackageVersions
     * @param include comma-separated list of relationships to include
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns AlternativeDistributionPackageResponse Single AlternativeDistributionPackage
     * @throws ApiError
     */
    public static alternativeDistributionPackagesGetInstance(
        id: string,
        fieldsAlternativeDistributionPackages?: Array<'versions'>,
        fieldsAlternativeDistributionPackageVersions?: Array<'url' | 'urlExpirationDate' | 'version' | 'fileChecksum' | 'state' | 'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        include?: Array<'versions'>,
        limitVersions?: number,
    ): CancelablePromise<AlternativeDistributionPackageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackages]': fieldsAlternativeDistributionPackages,
                'fields[alternativeDistributionPackageVersions]': fieldsAlternativeDistributionPackageVersions,
                'include': include,
                'limit[versions]': limitVersions,
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
     * @param limit maximum resources per page
     * @returns AlternativeDistributionPackageVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static alternativeDistributionPackagesVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionPackageVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackages/{id}/relationships/versions',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
     * @param filterState filter by attribute 'state'
     * @param fieldsAlternativeDistributionPackageVersions the fields to include for returned resources of type alternativeDistributionPackageVersions
     * @param fieldsAlternativeDistributionPackageVariants the fields to include for returned resources of type alternativeDistributionPackageVariants
     * @param fieldsAlternativeDistributionPackageDeltas the fields to include for returned resources of type alternativeDistributionPackageDeltas
     * @param fieldsAlternativeDistributionPackages the fields to include for returned resources of type alternativeDistributionPackages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitVariants maximum number of related variants returned (when they are included)
     * @param limitDeltas maximum number of related deltas returned (when they are included)
     * @returns AlternativeDistributionPackageVersionsResponse List of AlternativeDistributionPackageVersions
     * @throws ApiError
     */
    public static alternativeDistributionPackagesVersionsGetToManyRelated(
        id: string,
        filterState?: Array<'COMPLETED' | 'REPLACED'>,
        fieldsAlternativeDistributionPackageVersions?: Array<'url' | 'urlExpirationDate' | 'version' | 'fileChecksum' | 'state' | 'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        fieldsAlternativeDistributionPackageVariants?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        fieldsAlternativeDistributionPackageDeltas?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        fieldsAlternativeDistributionPackages?: Array<'versions'>,
        limit?: number,
        include?: Array<'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        limitVariants?: number,
        limitDeltas?: number,
    ): CancelablePromise<AlternativeDistributionPackageVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackages/{id}/versions',
            path: {
                'id': id,
            },
            query: {
                'filter[state]': filterState,
                'fields[alternativeDistributionPackageVersions]': fieldsAlternativeDistributionPackageVersions,
                'fields[alternativeDistributionPackageVariants]': fieldsAlternativeDistributionPackageVariants,
                'fields[alternativeDistributionPackageDeltas]': fieldsAlternativeDistributionPackageDeltas,
                'fields[alternativeDistributionPackages]': fieldsAlternativeDistributionPackages,
                'limit': limit,
                'include': include,
                'limit[variants]': limitVariants,
                'limit[deltas]': limitDeltas,
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
