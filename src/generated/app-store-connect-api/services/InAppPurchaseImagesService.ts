/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseImageCreateRequest } from '../models/InAppPurchaseImageCreateRequest';
import type { InAppPurchaseImageResponse } from '../models/InAppPurchaseImageResponse';
import type { InAppPurchaseImageUpdateRequest } from '../models/InAppPurchaseImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InAppPurchaseImagesService {
    /**
     * @param requestBody InAppPurchaseImage representation
     * @returns InAppPurchaseImageResponse Single InAppPurchaseImage
     * @throws ApiError
     */
    public static inAppPurchaseImagesCreateInstance(
        requestBody: InAppPurchaseImageCreateRequest,
    ): CancelablePromise<InAppPurchaseImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/inAppPurchaseImages',
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
     * @param fieldsInAppPurchaseImages the fields to include for returned resources of type inAppPurchaseImages
     * @param include comma-separated list of relationships to include
     * @returns InAppPurchaseImageResponse Single InAppPurchaseImage
     * @throws ApiError
     */
    public static inAppPurchaseImagesGetInstance(
        id: string,
        fieldsInAppPurchaseImages?: Array<'fileSize' | 'fileName' | 'sourceFileChecksum' | 'assetToken' | 'imageAsset' | 'uploadOperations' | 'state' | 'inAppPurchase'>,
        include?: Array<'inAppPurchase'>,
    ): CancelablePromise<InAppPurchaseImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/inAppPurchaseImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[inAppPurchaseImages]': fieldsInAppPurchaseImages,
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
     * @param requestBody InAppPurchaseImage representation
     * @returns InAppPurchaseImageResponse Single InAppPurchaseImage
     * @throws ApiError
     */
    public static inAppPurchaseImagesUpdateInstance(
        id: string,
        requestBody: InAppPurchaseImageUpdateRequest,
    ): CancelablePromise<InAppPurchaseImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/inAppPurchaseImages/{id}',
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
    /**
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static inAppPurchaseImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/inAppPurchaseImages/{id}',
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
