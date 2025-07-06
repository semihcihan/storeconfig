/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlternativeDistributionPackageDeltasResponse } from '../models/AlternativeDistributionPackageDeltasResponse';
import type { AlternativeDistributionPackageVariantsResponse } from '../models/AlternativeDistributionPackageVariantsResponse';
import type { AlternativeDistributionPackageVersionDeltasLinkagesResponse } from '../models/AlternativeDistributionPackageVersionDeltasLinkagesResponse';
import type { AlternativeDistributionPackageVersionResponse } from '../models/AlternativeDistributionPackageVersionResponse';
import type { AlternativeDistributionPackageVersionVariantsLinkagesResponse } from '../models/AlternativeDistributionPackageVersionVariantsLinkagesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlternativeDistributionPackageVersionsService {
    /**
     * @param id the id of the requested resource
     * @param fieldsAlternativeDistributionPackageVersions the fields to include for returned resources of type alternativeDistributionPackageVersions
     * @param fieldsAlternativeDistributionPackageVariants the fields to include for returned resources of type alternativeDistributionPackageVariants
     * @param fieldsAlternativeDistributionPackageDeltas the fields to include for returned resources of type alternativeDistributionPackageDeltas
     * @param include comma-separated list of relationships to include
     * @param limitDeltas maximum number of related deltas returned (when they are included)
     * @param limitVariants maximum number of related variants returned (when they are included)
     * @returns AlternativeDistributionPackageVersionResponse Single AlternativeDistributionPackageVersion
     * @throws ApiError
     */
    public static alternativeDistributionPackageVersionsGetInstance(
        id: string,
        fieldsAlternativeDistributionPackageVersions?: Array<'url' | 'urlExpirationDate' | 'version' | 'fileChecksum' | 'state' | 'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        fieldsAlternativeDistributionPackageVariants?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        fieldsAlternativeDistributionPackageDeltas?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        include?: Array<'variants' | 'deltas' | 'alternativeDistributionPackage'>,
        limitDeltas?: number,
        limitVariants?: number,
    ): CancelablePromise<AlternativeDistributionPackageVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackageVersions]': fieldsAlternativeDistributionPackageVersions,
                'fields[alternativeDistributionPackageVariants]': fieldsAlternativeDistributionPackageVariants,
                'fields[alternativeDistributionPackageDeltas]': fieldsAlternativeDistributionPackageDeltas,
                'include': include,
                'limit[deltas]': limitDeltas,
                'limit[variants]': limitVariants,
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
     * @returns AlternativeDistributionPackageVersionDeltasLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static alternativeDistributionPackageVersionsDeltasGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionPackageVersionDeltasLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVersions/{id}/relationships/deltas',
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
     * @param fieldsAlternativeDistributionPackageDeltas the fields to include for returned resources of type alternativeDistributionPackageDeltas
     * @param limit maximum resources per page
     * @returns AlternativeDistributionPackageDeltasResponse List of AlternativeDistributionPackageDeltas
     * @throws ApiError
     */
    public static alternativeDistributionPackageVersionsDeltasGetToManyRelated(
        id: string,
        fieldsAlternativeDistributionPackageDeltas?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionPackageDeltasResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVersions/{id}/deltas',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackageDeltas]': fieldsAlternativeDistributionPackageDeltas,
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
     * @param limit maximum resources per page
     * @returns AlternativeDistributionPackageVersionVariantsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static alternativeDistributionPackageVersionsVariantsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionPackageVersionVariantsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVersions/{id}/relationships/variants',
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
     * @param fieldsAlternativeDistributionPackageVariants the fields to include for returned resources of type alternativeDistributionPackageVariants
     * @param limit maximum resources per page
     * @returns AlternativeDistributionPackageVariantsResponse List of AlternativeDistributionPackageVariants
     * @throws ApiError
     */
    public static alternativeDistributionPackageVersionsVariantsGetToManyRelated(
        id: string,
        fieldsAlternativeDistributionPackageVariants?: Array<'url' | 'urlExpirationDate' | 'alternativeDistributionKeyBlob' | 'fileChecksum'>,
        limit?: number,
    ): CancelablePromise<AlternativeDistributionPackageVariantsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/alternativeDistributionPackageVersions/{id}/variants',
            path: {
                'id': id,
            },
            query: {
                'fields[alternativeDistributionPackageVariants]': fieldsAlternativeDistributionPackageVariants,
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
}
