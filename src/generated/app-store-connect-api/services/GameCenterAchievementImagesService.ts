/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementImageCreateRequest } from '../models/GameCenterAchievementImageCreateRequest';
import type { GameCenterAchievementImageResponse } from '../models/GameCenterAchievementImageResponse';
import type { GameCenterAchievementImageUpdateRequest } from '../models/GameCenterAchievementImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterAchievementImagesService {
    /**
     * @param requestBody GameCenterAchievementImage representation
     * @returns GameCenterAchievementImageResponse Single GameCenterAchievementImage
     * @throws ApiError
     */
    public static gameCenterAchievementImagesCreateInstance(
        requestBody: GameCenterAchievementImageCreateRequest,
    ): CancelablePromise<GameCenterAchievementImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAchievementImages',
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
     * @param fieldsGameCenterAchievementImages the fields to include for returned resources of type gameCenterAchievementImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementImageResponse Single GameCenterAchievementImage
     * @throws ApiError
     */
    public static gameCenterAchievementImagesGetInstance(
        id: string,
        fieldsGameCenterAchievementImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterAchievementLocalization'>,
        include?: Array<'gameCenterAchievementLocalization'>,
    ): CancelablePromise<GameCenterAchievementImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementImages/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievementImages]': fieldsGameCenterAchievementImages,
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
     * @param requestBody GameCenterAchievementImage representation
     * @returns GameCenterAchievementImageResponse Single GameCenterAchievementImage
     * @throws ApiError
     */
    public static gameCenterAchievementImagesUpdateInstance(
        id: string,
        requestBody: GameCenterAchievementImageUpdateRequest,
    ): CancelablePromise<GameCenterAchievementImageResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAchievementImages/{id}',
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
    public static gameCenterAchievementImagesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterAchievementImages/{id}',
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
