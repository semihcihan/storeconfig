/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetCreateRequest } from '../models/BackgroundAssetCreateRequest';
import type { BackgroundAssetResponse } from '../models/BackgroundAssetResponse';
import type { BackgroundAssetVersionsLinkagesResponse } from '../models/BackgroundAssetVersionsLinkagesResponse';
import type { BackgroundAssetVersionsResponse } from '../models/BackgroundAssetVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackgroundAssetsService {
    /**
     * @param requestBody BackgroundAsset representation
     * @returns BackgroundAssetResponse Single BackgroundAsset
     * @throws ApiError
     */
    public static backgroundAssetsCreateInstance(
        requestBody: BackgroundAssetCreateRequest,
    ): CancelablePromise<BackgroundAssetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/backgroundAssets',
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
     * @param fieldsBackgroundAssets the fields to include for returned resources of type backgroundAssets
     * @param include comma-separated list of relationships to include
     * @returns BackgroundAssetResponse Single BackgroundAsset
     * @throws ApiError
     */
    public static backgroundAssetsGetInstance(
        id: string,
        fieldsBackgroundAssets?: Array<'assetPackIdentifier' | 'createdDate' | 'versions' | 'internalBetaVersion'>,
        include?: Array<'internalBetaVersion'>,
    ): CancelablePromise<BackgroundAssetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssets/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[backgroundAssets]': fieldsBackgroundAssets,
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
     * @param limit maximum resources per page
     * @returns BackgroundAssetVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static backgroundAssetsVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BackgroundAssetVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssets/{id}/relationships/versions',
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
     * @param filterVersion filter by attribute 'version'
     * @param filterInternalBetaReleaseState filter by attribute 'internalBetaRelease.state'
     * @param sort comma-separated list of sort expressions; resources will be sorted as specified
     * @param fieldsBackgroundAssetVersions the fields to include for returned resources of type backgroundAssetVersions
     * @param fieldsBackgroundAssetVersionInternalBetaReleases the fields to include for returned resources of type backgroundAssetVersionInternalBetaReleases
     * @param fieldsBackgroundAssetUploadFiles the fields to include for returned resources of type backgroundAssetUploadFiles
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns BackgroundAssetVersionsResponse List of BackgroundAssetVersions
     * @throws ApiError
     */
    public static backgroundAssetsVersionsGetToManyRelated(
        id: string,
        filterState?: Array<'AWAITING_UPLOAD' | 'PROCESSING' | 'FAILED' | 'COMPLETE'>,
        filterVersion?: Array<string>,
        filterInternalBetaReleaseState?: Array<'READY_FOR_TESTING' | 'SUPERSEDED'>,
        sort?: Array<'version' | '-version'>,
        fieldsBackgroundAssetVersions?: Array<'createdDate' | 'platforms' | 'state' | 'version' | 'internalBetaRelease' | 'assetFile' | 'manifestFile' | 'backgroundAssetUploadFiles'>,
        fieldsBackgroundAssetVersionInternalBetaReleases?: Array<'state' | 'backgroundAssetVersion'>,
        fieldsBackgroundAssetUploadFiles?: Array<'assetDeliveryState' | 'assetToken' | 'assetType' | 'fileName' | 'fileSize' | 'sourceFileChecksum' | 'uploadOperations'>,
        limit?: number,
        include?: Array<'internalBetaRelease' | 'assetFile' | 'manifestFile'>,
    ): CancelablePromise<BackgroundAssetVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssets/{id}/versions',
            path: {
                'id': id,
            },
            query: {
                'filter[state]': filterState,
                'filter[version]': filterVersion,
                'filter[internalBetaRelease.state]': filterInternalBetaReleaseState,
                'sort': sort,
                'fields[backgroundAssetVersions]': fieldsBackgroundAssetVersions,
                'fields[backgroundAssetVersionInternalBetaReleases]': fieldsBackgroundAssetVersionInternalBetaReleases,
                'fields[backgroundAssetUploadFiles]': fieldsBackgroundAssetUploadFiles,
                'limit': limit,
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
}
