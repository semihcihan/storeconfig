/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardSetImageCreateRequest } from '../models/GameCenterLeaderboardSetImageCreateRequest';
import type { GameCenterLeaderboardSetImageResponse } from '../models/GameCenterLeaderboardSetImageResponse';
import type { GameCenterLeaderboardSetImageUpdateRequest } from '../models/GameCenterLeaderboardSetImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardSetImagesService {
    /**
     * @param requestBody GameCenterLeaderboardSetImage representation
     * @returns GameCenterLeaderboardSetImageResponse Single GameCenterLeaderboardSetImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetImagesCreateInstance(
        requestBody: GameCenterLeaderboardSetImageCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSetImages',
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
     * @param fieldsGameCenterLeaderboardSetImages the fields to include for returned resources of type gameCenterLeaderboardSetImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetImageResponse Single GameCenterLeaderboardSetImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetImagesGetInstance(
        id: string,
        fieldsGameCenterLeaderboardSetImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardSetLocalization'>,
        include?: Array<'gameCenterLeaderboardSetLocalization'>,
    ): CancelablePromise<GameCenterLeaderboardSetImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSetImages]': fieldsGameCenterLeaderboardSetImages,
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
     * @param requestBody GameCenterLeaderboardSetImage representation
     * @returns GameCenterLeaderboardSetImageResponse Single GameCenterLeaderboardSetImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetImagesUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardSetImageUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSetImages/{id}',
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
    public static gameCenterLeaderboardSetImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSetImages/{id}',
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
