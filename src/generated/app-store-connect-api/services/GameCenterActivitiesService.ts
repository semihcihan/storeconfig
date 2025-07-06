/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityAchievementsLinkagesRequest } from '../models/GameCenterActivityAchievementsLinkagesRequest';
import type { GameCenterActivityCreateRequest } from '../models/GameCenterActivityCreateRequest';
import type { GameCenterActivityLeaderboardsLinkagesRequest } from '../models/GameCenterActivityLeaderboardsLinkagesRequest';
import type { GameCenterActivityResponse } from '../models/GameCenterActivityResponse';
import type { GameCenterActivityUpdateRequest } from '../models/GameCenterActivityUpdateRequest';
import type { GameCenterActivityVersionsLinkagesResponse } from '../models/GameCenterActivityVersionsLinkagesResponse';
import type { GameCenterActivityVersionsResponse } from '../models/GameCenterActivityVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterActivitiesService {
    /**
     * @param requestBody GameCenterActivity representation
     * @returns GameCenterActivityResponse Single GameCenterActivity
     * @throws ApiError
     */
    public static gameCenterActivitiesCreateInstance(
        requestBody: GameCenterActivityCreateRequest,
    ): CancelablePromise<GameCenterActivityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivities',
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
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param include comma-separated list of relationships to include
     * @param limitAchievements maximum number of related achievements returned (when they are included)
     * @param limitLeaderboards maximum number of related leaderboards returned (when they are included)
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns GameCenterActivityResponse Single GameCenterActivity
     * @throws ApiError
     */
    public static gameCenterActivitiesGetInstance(
        id: string,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        limitAchievements?: number,
        limitLeaderboards?: number,
        limitVersions?: number,
    ): CancelablePromise<GameCenterActivityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivities/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
                'include': include,
                'limit[achievements]': limitAchievements,
                'limit[leaderboards]': limitLeaderboards,
                'limit[versions]': limitVersions,
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
     * @param requestBody GameCenterActivity representation
     * @returns GameCenterActivityResponse Single GameCenterActivity
     * @throws ApiError
     */
    public static gameCenterActivitiesUpdateInstance(
        id: string,
        requestBody: GameCenterActivityUpdateRequest,
    ): CancelablePromise<GameCenterActivityResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterActivities/{id}',
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
    public static gameCenterActivitiesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivities/{id}',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterActivitiesAchievementsCreateToManyRelationship(
        id: string,
        requestBody: GameCenterActivityAchievementsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivities/{id}/relationships/achievements',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterActivitiesAchievementsDeleteToManyRelationship(
        id: string,
        requestBody: GameCenterActivityAchievementsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivities/{id}/relationships/achievements',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterActivitiesLeaderboardsCreateToManyRelationship(
        id: string,
        requestBody: GameCenterActivityLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivities/{id}/relationships/leaderboards',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterActivitiesLeaderboardsDeleteToManyRelationship(
        id: string,
        requestBody: GameCenterActivityLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivities/{id}/relationships/leaderboards',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
     * @param limit maximum resources per page
     * @returns GameCenterActivityVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterActivitiesVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterActivityVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivities/{id}/relationships/versions',
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
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterActivityLocalizations the fields to include for returned resources of type gameCenterActivityLocalizations
     * @param fieldsGameCenterActivityImages the fields to include for returned resources of type gameCenterActivityImages
     * @param fieldsGameCenterActivityVersionReleases the fields to include for returned resources of type gameCenterActivityVersionReleases
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterActivityVersionsResponse List of GameCenterActivityVersions
     * @throws ApiError
     */
    public static gameCenterActivitiesVersionsGetToManyRelated(
        id: string,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterActivityLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterActivityImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        fieldsGameCenterActivityVersionReleases?: Array<'version'>,
        limit?: number,
        include?: Array<'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterActivityVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivities/{id}/versions',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterActivityLocalizations]': fieldsGameCenterActivityLocalizations,
                'fields[gameCenterActivityImages]': fieldsGameCenterActivityImages,
                'fields[gameCenterActivityVersionReleases]': fieldsGameCenterActivityVersionReleases,
                'limit': limit,
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
}
