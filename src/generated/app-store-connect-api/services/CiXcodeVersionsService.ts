/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersionsResponse } from '../models/CiMacOsVersionsResponse';
import type { CiXcodeVersionMacOsVersionsLinkagesResponse } from '../models/CiXcodeVersionMacOsVersionsLinkagesResponse';
import type { CiXcodeVersionResponse } from '../models/CiXcodeVersionResponse';
import type { CiXcodeVersionsResponse } from '../models/CiXcodeVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiXcodeVersionsService {
    /**
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitMacOsVersions maximum number of related macOsVersions returned (when they are included)
     * @returns CiXcodeVersionsResponse List of CiXcodeVersions
     * @throws ApiError
     */
    public static ciXcodeVersionsGetCollection(
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        limit?: number,
        include?: Array<'macOsVersions'>,
        limitMacOsVersions?: number,
    ): CancelablePromise<CiXcodeVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciXcodeVersions',
            query: {
                'fields[ciXcodeVersions]': fieldsCiXcodeVersions,
                'fields[ciMacOsVersions]': fieldsCiMacOsVersions,
                'limit': limit,
                'include': include,
                'limit[macOsVersions]': limitMacOsVersions,
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
     * @param id the id of the requested resource
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param include comma-separated list of relationships to include
     * @param limitMacOsVersions maximum number of related macOsVersions returned (when they are included)
     * @returns CiXcodeVersionResponse Single CiXcodeVersion
     * @throws ApiError
     */
    public static ciXcodeVersionsGetInstance(
        id: string,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        include?: Array<'macOsVersions'>,
        limitMacOsVersions?: number,
    ): CancelablePromise<CiXcodeVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciXcodeVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciXcodeVersions]': fieldsCiXcodeVersions,
                'fields[ciMacOsVersions]': fieldsCiMacOsVersions,
                'include': include,
                'limit[macOsVersions]': limitMacOsVersions,
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
     * @returns CiXcodeVersionMacOsVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciXcodeVersionsMacOsVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiXcodeVersionMacOsVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciXcodeVersions/{id}/relationships/macOsVersions',
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
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitXcodeVersions maximum number of related xcodeVersions returned (when they are included)
     * @returns CiMacOsVersionsResponse List of CiMacOsVersions
     * @throws ApiError
     */
    public static ciXcodeVersionsMacOsVersionsGetToManyRelated(
        id: string,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        limit?: number,
        include?: Array<'xcodeVersions'>,
        limitXcodeVersions?: number,
    ): CancelablePromise<CiMacOsVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciXcodeVersions/{id}/macOsVersions',
            path: {
                'id': id,
            },
            query: {
                'fields[ciMacOsVersions]': fieldsCiMacOsVersions,
                'fields[ciXcodeVersions]': fieldsCiXcodeVersions,
                'limit': limit,
                'include': include,
                'limit[xcodeVersions]': limitXcodeVersions,
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
