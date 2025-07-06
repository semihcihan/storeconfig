/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetUploadFilesResponse } from '../models/BackgroundAssetUploadFilesResponse';
import type { BackgroundAssetVersionBackgroundAssetUploadFilesLinkagesResponse } from '../models/BackgroundAssetVersionBackgroundAssetUploadFilesLinkagesResponse';
import type { BackgroundAssetVersionCreateRequest } from '../models/BackgroundAssetVersionCreateRequest';
import type { BackgroundAssetVersionResponse } from '../models/BackgroundAssetVersionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackgroundAssetVersionsService {
    /**
     * @param requestBody BackgroundAssetVersion representation
     * @returns BackgroundAssetVersionResponse Single BackgroundAssetVersion
     * @throws ApiError
     */
    public static backgroundAssetVersionsCreateInstance(
        requestBody: BackgroundAssetVersionCreateRequest,
    ): CancelablePromise<BackgroundAssetVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/backgroundAssetVersions',
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
     * @param fieldsBackgroundAssetVersions the fields to include for returned resources of type backgroundAssetVersions
     * @param include comma-separated list of relationships to include
     * @returns BackgroundAssetVersionResponse Single BackgroundAssetVersion
     * @throws ApiError
     */
    public static backgroundAssetVersionsGetInstance(
        id: string,
        fieldsBackgroundAssetVersions?: Array<'createdDate' | 'platforms' | 'state' | 'version' | 'internalBetaRelease' | 'assetFile' | 'manifestFile' | 'backgroundAssetUploadFiles'>,
        include?: Array<'internalBetaRelease' | 'assetFile' | 'manifestFile'>,
    ): CancelablePromise<BackgroundAssetVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssetVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[backgroundAssetVersions]': fieldsBackgroundAssetVersions,
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
     * @returns BackgroundAssetVersionBackgroundAssetUploadFilesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static backgroundAssetVersionsBackgroundAssetUploadFilesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<BackgroundAssetVersionBackgroundAssetUploadFilesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssetVersions/{id}/relationships/backgroundAssetUploadFiles',
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
     * @param fieldsBackgroundAssetUploadFiles the fields to include for returned resources of type backgroundAssetUploadFiles
     * @param limit maximum resources per page
     * @returns BackgroundAssetUploadFilesResponse List of BackgroundAssetUploadFiles
     * @throws ApiError
     */
    public static backgroundAssetVersionsBackgroundAssetUploadFilesGetToManyRelated(
        id: string,
        fieldsBackgroundAssetUploadFiles?: Array<'assetDeliveryState' | 'assetToken' | 'assetType' | 'fileName' | 'fileSize' | 'sourceFileChecksum' | 'uploadOperations'>,
        limit?: number,
    ): CancelablePromise<BackgroundAssetUploadFilesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssetVersions/{id}/backgroundAssetUploadFiles',
            path: {
                'id': id,
            },
            query: {
                'fields[backgroundAssetUploadFiles]': fieldsBackgroundAssetUploadFiles,
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
