/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipDomainStatusResponse } from '../models/AppClipDomainStatusResponse';
import type { BetaAppClipInvocationsResponse } from '../models/BetaAppClipInvocationsResponse';
import type { BuildBundleAppClipDomainCacheStatusLinkageResponse } from '../models/BuildBundleAppClipDomainCacheStatusLinkageResponse';
import type { BuildBundleAppClipDomainDebugStatusLinkageResponse } from '../models/BuildBundleAppClipDomainDebugStatusLinkageResponse';
import type { BuildBundleBetaAppClipInvocationsLinkagesResponse } from '../models/BuildBundleBetaAppClipInvocationsLinkagesResponse';
import type { BuildBundleBuildBundleFileSizesLinkagesResponse } from '../models/BuildBundleBuildBundleFileSizesLinkagesResponse';
import type { BuildBundleFileSizesResponse } from '../models/BuildBundleFileSizesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BuildBundlesService {
    /**
     * @param id the id of the requested resource
     * @returns BuildBundleAppClipDomainCacheStatusLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildBundlesAppClipDomainCacheStatusGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildBundleAppClipDomainCacheStatusLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/relationships/appClipDomainCacheStatus',
            path: {
                'id': id,
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
     * @param fieldsAppClipDomainStatuses the fields to include for returned resources of type appClipDomainStatuses
     * @returns AppClipDomainStatusResponse Single AppClipDomainStatus
     * @throws ApiError
     */
    public static buildBundlesAppClipDomainCacheStatusGetToOneRelated(
        id: string,
        fieldsAppClipDomainStatuses?: Array<'domains' | 'lastUpdatedDate'>,
    ): CancelablePromise<AppClipDomainStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/appClipDomainCacheStatus',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipDomainStatuses]': fieldsAppClipDomainStatuses,
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
     * @returns BuildBundleAppClipDomainDebugStatusLinkageResponse Related linkage
     * @throws ApiError
     */
    public static buildBundlesAppClipDomainDebugStatusGetToOneRelationship(
        id: string,
    ): CancelablePromise<BuildBundleAppClipDomainDebugStatusLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/relationships/appClipDomainDebugStatus',
            path: {
                'id': id,
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
     * @param fieldsAppClipDomainStatuses the fields to include for returned resources of type appClipDomainStatuses
     * @returns AppClipDomainStatusResponse Single AppClipDomainStatus
     * @throws ApiError
     */
    public static buildBundlesAppClipDomainDebugStatusGetToOneRelated(
        id: string,
        fieldsAppClipDomainStatuses?: Array<'domains' | 'lastUpdatedDate'>,
    ): CancelablePromise<AppClipDomainStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/appClipDomainDebugStatus',
            path: {
                'id': id,
            },
            query: {
                'fields[appClipDomainStatuses]': fieldsAppClipDomainStatuses,
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
     * @returns BuildBundleBetaAppClipInvocationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildBundlesBetaAppClipInvocationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildBundleBetaAppClipInvocationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/relationships/betaAppClipInvocations',
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
     * @param fieldsBetaAppClipInvocations the fields to include for returned resources of type betaAppClipInvocations
     * @param fieldsBetaAppClipInvocationLocalizations the fields to include for returned resources of type betaAppClipInvocationLocalizations
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitBetaAppClipInvocationLocalizations maximum number of related betaAppClipInvocationLocalizations returned (when they are included)
     * @returns BetaAppClipInvocationsResponse List of BetaAppClipInvocations
     * @throws ApiError
     */
    public static buildBundlesBetaAppClipInvocationsGetToManyRelated(
        id: string,
        fieldsBetaAppClipInvocations?: Array<'url' | 'betaAppClipInvocationLocalizations'>,
        fieldsBetaAppClipInvocationLocalizations?: Array<'title' | 'locale'>,
        limit?: number,
        include?: Array<'betaAppClipInvocationLocalizations'>,
        limitBetaAppClipInvocationLocalizations?: number,
    ): CancelablePromise<BetaAppClipInvocationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/betaAppClipInvocations',
            path: {
                'id': id,
            },
            query: {
                'fields[betaAppClipInvocations]': fieldsBetaAppClipInvocations,
                'fields[betaAppClipInvocationLocalizations]': fieldsBetaAppClipInvocationLocalizations,
                'limit': limit,
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
     * @param limit maximum resources per page
     * @returns BuildBundleBuildBundleFileSizesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static buildBundlesBuildBundleFileSizesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BuildBundleBuildBundleFileSizesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/relationships/buildBundleFileSizes',
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
     * @param fieldsBuildBundleFileSizes the fields to include for returned resources of type buildBundleFileSizes
     * @param limit maximum resources per page
     * @returns BuildBundleFileSizesResponse List of BuildBundleFileSizes
     * @throws ApiError
     */
    public static buildBundlesBuildBundleFileSizesGetToManyRelated(
        id: string,
        fieldsBuildBundleFileSizes?: Array<'deviceModel' | 'osVersion' | 'downloadBytes' | 'installBytes'>,
        limit?: number,
    ): CancelablePromise<BuildBundleFileSizesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildBundles/{id}/buildBundleFileSizes',
            path: {
                'id': id,
            },
            query: {
                'fields[buildBundleFileSizes]': fieldsBuildBundleFileSizes,
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
