/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardImageResponse } from '../models/GameCenterLeaderboardImageResponse';
import type { GameCenterLeaderboardLocalizationCreateRequest } from '../models/GameCenterLeaderboardLocalizationCreateRequest';
import type { GameCenterLeaderboardLocalizationGameCenterLeaderboardImageLinkageResponse } from '../models/GameCenterLeaderboardLocalizationGameCenterLeaderboardImageLinkageResponse';
import type { GameCenterLeaderboardLocalizationResponse } from '../models/GameCenterLeaderboardLocalizationResponse';
import type { GameCenterLeaderboardLocalizationUpdateRequest } from '../models/GameCenterLeaderboardLocalizationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardLocalizationsService {
    /**
     * @param requestBody GameCenterLeaderboardLocalization representation
     * @returns GameCenterLeaderboardLocalizationResponse Single GameCenterLeaderboardLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardLocalizationsCreateInstance(
        requestBody: GameCenterLeaderboardLocalizationCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardLocalizations',
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
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param fieldsGameCenterLeaderboardImages the fields to include for returned resources of type gameCenterLeaderboardImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardLocalizationResponse Single GameCenterLeaderboardLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardLocalizationsGetInstance(
        id: string,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        fieldsGameCenterLeaderboardImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardLocalization'>,
        include?: Array<'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
    ): CancelablePromise<GameCenterLeaderboardLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
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
     * @param requestBody GameCenterLeaderboardLocalization representation
     * @returns GameCenterLeaderboardLocalizationResponse Single GameCenterLeaderboardLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardLocalizations/{id}',
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
    public static gameCenterLeaderboardLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardLocalizations/{id}',
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
     * @returns GameCenterLeaderboardLocalizationGameCenterLeaderboardImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardLocalizationsGameCenterLeaderboardImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardLocalizationGameCenterLeaderboardImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardLocalizations/{id}/relationships/gameCenterLeaderboardImage',
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
     * @param fieldsGameCenterLeaderboardImages the fields to include for returned resources of type gameCenterLeaderboardImages
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardImageResponse Single GameCenterLeaderboardImage
     * @throws ApiError
     */
    public static gameCenterLeaderboardLocalizationsGameCenterLeaderboardImageGetToOneRelated(
        id: string,
        fieldsGameCenterLeaderboardImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardLocalization'>,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        include?: Array<'gameCenterLeaderboardLocalization'>,
    ): CancelablePromise<GameCenterLeaderboardImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardLocalizations/{id}/gameCenterLeaderboardImage',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardImages]': fieldsGameCenterLeaderboardImages,
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
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
