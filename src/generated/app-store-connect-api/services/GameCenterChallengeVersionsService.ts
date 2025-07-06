/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeImageResponse } from '../models/GameCenterChallengeImageResponse';
import type { GameCenterChallengeLocalizationsResponse } from '../models/GameCenterChallengeLocalizationsResponse';
import type { GameCenterChallengeVersionCreateRequest } from '../models/GameCenterChallengeVersionCreateRequest';
import type { GameCenterChallengeVersionDefaultImageLinkageResponse } from '../models/GameCenterChallengeVersionDefaultImageLinkageResponse';
import type { GameCenterChallengeVersionLocalizationsLinkagesResponse } from '../models/GameCenterChallengeVersionLocalizationsLinkagesResponse';
import type { GameCenterChallengeVersionResponse } from '../models/GameCenterChallengeVersionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterChallengeVersionsService {
    /**
     * @param requestBody GameCenterChallengeVersion representation
     * @returns GameCenterChallengeVersionResponse Single GameCenterChallengeVersion
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsCreateInstance(
        requestBody: GameCenterChallengeVersionCreateRequest,
    ): CancelablePromise<GameCenterChallengeVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterChallengeVersions',
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
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param fieldsGameCenterChallengeLocalizations the fields to include for returned resources of type gameCenterChallengeLocalizations
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterChallengeVersionResponse Single GameCenterChallengeVersion
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsGetInstance(
        id: string,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        fieldsGameCenterChallengeLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        include?: Array<'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterChallengeVersionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersions/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
                'fields[gameCenterChallengeLocalizations]': fieldsGameCenterChallengeLocalizations,
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
                'include': include,
                'limit[localizations]': limitLocalizations,
                'limit[releases]': limitReleases,
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
     * @returns GameCenterChallengeVersionDefaultImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsDefaultImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterChallengeVersionDefaultImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersions/{id}/relationships/defaultImage',
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
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @returns GameCenterChallengeImageResponse Single GameCenterChallengeImage
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsDefaultImageGetToOneRelated(
        id: string,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
    ): CancelablePromise<GameCenterChallengeImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersions/{id}/defaultImage',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
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
     * @returns GameCenterChallengeVersionLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterChallengeVersionLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersions/{id}/relationships/localizations',
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
     * @param fieldsGameCenterChallengeLocalizations the fields to include for returned resources of type gameCenterChallengeLocalizations
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterChallengeLocalizationsResponse List of GameCenterChallengeLocalizations
     * @throws ApiError
     */
    public static gameCenterChallengeVersionsLocalizationsGetToManyRelated(
        id: string,
        fieldsGameCenterChallengeLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        limit?: number,
        include?: Array<'version' | 'image'>,
    ): CancelablePromise<GameCenterChallengeLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersions/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeLocalizations]': fieldsGameCenterChallengeLocalizations,
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
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
