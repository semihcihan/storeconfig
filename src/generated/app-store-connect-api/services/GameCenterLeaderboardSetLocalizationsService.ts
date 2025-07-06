/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardSetImageResponse } from '../models/GameCenterLeaderboardSetImageResponse';
import type { GameCenterLeaderboardSetLocalizationCreateRequest } from '../models/GameCenterLeaderboardSetLocalizationCreateRequest';
import type { GameCenterLeaderboardSetLocalizationGameCenterLeaderboardSetImageLinkageResponse } from '../models/GameCenterLeaderboardSetLocalizationGameCenterLeaderboardSetImageLinkageResponse';
import type { GameCenterLeaderboardSetLocalizationResponse } from '../models/GameCenterLeaderboardSetLocalizationResponse';
import type { GameCenterLeaderboardSetLocalizationUpdateRequest } from '../models/GameCenterLeaderboardSetLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardSetLocalizationsService {
    /**
     * @param requestBody GameCenterLeaderboardSetLocalization representation
     * @returns GameCenterLeaderboardSetLocalizationResponse Single GameCenterLeaderboardSetLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetLocalizationsCreateInstance(
        requestBody: GameCenterLeaderboardSetLocalizationCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSetLocalizations',
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
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param fieldsGameCenterLeaderboardSetImages the fields to include for returned resources of type gameCenterLeaderboardSetImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetLocalizationResponse Single GameCenterLeaderboardSetLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetLocalizationsGetInstance(
        id: string,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        fieldsGameCenterLeaderboardSetImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardSetLocalization'>,
        include?: Array<'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
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
     * @param requestBody GameCenterLeaderboardSetLocalization representation
     * @returns GameCenterLeaderboardSetLocalizationResponse Single GameCenterLeaderboardSetLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardSetLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSetLocalizations/{id}',
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
    public static gameCenterLeaderboardSetLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSetLocalizations/{id}',
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
    /**
     * @param id the id of the requested resource
     * @returns GameCenterLeaderboardSetLocalizationGameCenterLeaderboardSetImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetLocalizationsGameCenterLeaderboardSetImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationGameCenterLeaderboardSetImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetLocalizations/{id}/relationships/gameCenterLeaderboardSetImage',
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
     * @param fieldsGameCenterLeaderboardSetImages the fields to include for returned resources of type gameCenterLeaderboardSetImages
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetImageResponse Single GameCenterLeaderboardSetImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetLocalizationsGameCenterLeaderboardSetImageGetToOneRelated(
        id: string,
        fieldsGameCenterLeaderboardSetImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardSetLocalization'>,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        include?: Array<'gameCenterLeaderboardSetLocalization'>,
    ): CancelablePromise<GameCenterLeaderboardSetImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetLocalizations/{id}/gameCenterLeaderboardSetImage',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSetImages]': fieldsGameCenterLeaderboardSetImages,
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
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
