/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetUploadFileCreateRequest } from '../models/BackgroundAssetUploadFileCreateRequest';
import type { BackgroundAssetUploadFileResponse } from '../models/BackgroundAssetUploadFileResponse';
import type { BackgroundAssetUploadFileUpdateRequest } from '../models/BackgroundAssetUploadFileUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackgroundAssetUploadFilesService {
    /**
     * @param requestBody BackgroundAssetUploadFile representation
     * @returns BackgroundAssetUploadFileResponse Single BackgroundAssetUploadFile
     * @throws ApiError
     */
    public static backgroundAssetUploadFilesCreateInstance(
        requestBody: BackgroundAssetUploadFileCreateRequest,
    ): CancelablePromise<BackgroundAssetUploadFileResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/backgroundAssetUploadFiles',
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
     * @param fieldsBackgroundAssetUploadFiles the fields to include for returned resources of type backgroundAssetUploadFiles
     * @returns BackgroundAssetUploadFileResponse Single BackgroundAssetUploadFile
     * @throws ApiError
     */
    public static backgroundAssetUploadFilesGetInstance(
        id: string,
        fieldsBackgroundAssetUploadFiles?: Array<'assetDeliveryState' | 'assetToken' | 'assetType' | 'fileName' | 'fileSize' | 'sourceFileChecksum' | 'uploadOperations'>,
    ): CancelablePromise<BackgroundAssetUploadFileResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/backgroundAssetUploadFiles/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[backgroundAssetUploadFiles]': fieldsBackgroundAssetUploadFiles,
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
     * @param requestBody BackgroundAssetUploadFile representation
     * @returns BackgroundAssetUploadFileResponse Single BackgroundAssetUploadFile
     * @throws ApiError
     */
    public static backgroundAssetUploadFilesUpdateInstance(
        id: string,
        requestBody: BackgroundAssetUploadFileUpdateRequest,
    ): CancelablePromise<BackgroundAssetUploadFileResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/backgroundAssetUploadFiles/{id}',
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
}
