/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersionResponse } from '../models/CiMacOsVersionResponse';
import type { CiMacOsVersionsResponse } from '../models/CiMacOsVersionsResponse';
import type { CiMacOsVersionXcodeVersionsLinkagesResponse } from '../models/CiMacOsVersionXcodeVersionsLinkagesResponse';
import type { CiXcodeVersionsResponse } from '../models/CiXcodeVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CiMacOsVersionsService {
    /**
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitXcodeVersions maximum number of related xcodeVersions returned (when they are included)
     * @returns CiMacOsVersionsResponse List of CiMacOsVersions
     * @throws ApiError
     */
    public static ciMacOsVersionsGetCollection(
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        limit?: number,
        include?: Array<'xcodeVersions'>,
        limitXcodeVersions?: number,
    ): CancelablePromise<CiMacOsVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciMacOsVersions',
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
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param include comma-separated list of relationships to include
     * @param limitXcodeVersions maximum number of related xcodeVersions returned (when they are included)
     * @returns CiMacOsVersionResponse Single CiMacOsVersion
     * @throws ApiError
     */
    public static ciMacOsVersionsGetInstance(
        id: string,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        include?: Array<'xcodeVersions'>,
        limitXcodeVersions?: number,
    ): CancelablePromise<CiMacOsVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciMacOsVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[ciMacOsVersions]': fieldsCiMacOsVersions,
                'fields[ciXcodeVersions]': fieldsCiXcodeVersions,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns CiMacOsVersionXcodeVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static ciMacOsVersionsXcodeVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<CiMacOsVersionXcodeVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciMacOsVersions/{id}/relationships/xcodeVersions',
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
     * @param fieldsCiXcodeVersions the fields to include for returned resources of type ciXcodeVersions
     * @param fieldsCiMacOsVersions the fields to include for returned resources of type ciMacOsVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitMacOsVersions maximum number of related macOsVersions returned (when they are included)
     * @returns CiXcodeVersionsResponse List of CiXcodeVersions
     * @throws ApiError
     */
    public static ciMacOsVersionsXcodeVersionsGetToManyRelated(
        id: string,
        fieldsCiXcodeVersions?: Array<'version' | 'name' | 'testDestinations' | 'macOsVersions'>,
        fieldsCiMacOsVersions?: Array<'version' | 'name' | 'xcodeVersions'>,
        limit?: number,
        include?: Array<'macOsVersions'>,
        limitMacOsVersions?: number,
    ): CancelablePromise<CiXcodeVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ciMacOsVersions/{id}/xcodeVersions',
            path: {
                'id': id,
            },
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
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
