/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityImageCreateRequest } from '../models/GameCenterActivityImageCreateRequest';
import type { GameCenterActivityImageResponse } from '../models/GameCenterActivityImageResponse';
import type { GameCenterActivityImageUpdateRequest } from '../models/GameCenterActivityImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterActivityImagesService {
    /**
     * @param requestBody GameCenterActivityImage representation
     * @returns GameCenterActivityImageResponse Single GameCenterActivityImage
     * @throws ApiError
     */
    public static gameCenterActivityImagesCreateInstance(
        requestBody: GameCenterActivityImageCreateRequest,
    ): CancelablePromise<GameCenterActivityImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivityImages',
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
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @returns GameCenterActivityImageResponse Single GameCenterActivityImage
     * @throws ApiError
     */
    public static gameCenterActivityImagesGetInstance(
        id: string,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterActivityImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
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
     * @param requestBody GameCenterActivityImage representation
     * @returns GameCenterActivityImageResponse Single GameCenterActivityImage
     * @throws ApiError
     */
    public static gameCenterActivityImagesUpdateInstance(
        id: string,
        requestBody: GameCenterActivityImageUpdateRequest,
    ): CancelablePromise<GameCenterActivityImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterActivityImages/{id}',
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
    public static gameCenterActivityImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivityImages/{id}',
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
