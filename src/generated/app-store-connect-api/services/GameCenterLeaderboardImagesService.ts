/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardImageCreateRequest } from '../models/GameCenterLeaderboardImageCreateRequest';
import type { GameCenterLeaderboardImageResponse } from '../models/GameCenterLeaderboardImageResponse';
import type { GameCenterLeaderboardImageUpdateRequest } from '../models/GameCenterLeaderboardImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardImagesService {
    /**
     * @param requestBody GameCenterLeaderboardImage representation
     * @returns GameCenterLeaderboardImageResponse Single GameCenterLeaderboardImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardImagesCreateInstance(
        requestBody: GameCenterLeaderboardImageCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardImages',
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
     * @param fieldsGameCenterLeaderboardImages the fields to include for returned resources of type gameCenterLeaderboardImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardImageResponse Single GameCenterLeaderboardImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardImagesGetInstance(
        id: string,
        fieldsGameCenterLeaderboardImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardLocalization'>,
        include?: Array<'gameCenterLeaderboardLocalization'>,
    ): CancelablePromise<GameCenterLeaderboardImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardImages]': fieldsGameCenterLeaderboardImages,
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
     * @param requestBody GameCenterLeaderboardImage representation
     * @returns GameCenterLeaderboardImageResponse Single GameCenterLeaderboardImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardImagesUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardImageUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardImages/{id}',
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
    public static gameCenterLeaderboardImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardImages/{id}',
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
