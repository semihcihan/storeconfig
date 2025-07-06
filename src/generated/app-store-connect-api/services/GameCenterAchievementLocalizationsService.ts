/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementImageResponse } from '../models/GameCenterAchievementImageResponse';
import type { GameCenterAchievementLocalizationCreateRequest } from '../models/GameCenterAchievementLocalizationCreateRequest';
import type { GameCenterAchievementLocalizationGameCenterAchievementImageLinkageResponse } from '../models/GameCenterAchievementLocalizationGameCenterAchievementImageLinkageResponse';
import type { GameCenterAchievementLocalizationGameCenterAchievementLinkageResponse } from '../models/GameCenterAchievementLocalizationGameCenterAchievementLinkageResponse';
import type { GameCenterAchievementLocalizationResponse } from '../models/GameCenterAchievementLocalizationResponse';
import type { GameCenterAchievementLocalizationUpdateRequest } from '../models/GameCenterAchievementLocalizationUpdateRequest';
import type { GameCenterAchievementResponse } from '../models/GameCenterAchievementResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterAchievementLocalizationsService {
    /**
     * @param requestBody GameCenterAchievementLocalization representation
     * @returns GameCenterAchievementLocalizationResponse Single GameCenterAchievementLocalization
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsCreateInstance(
        requestBody: GameCenterAchievementLocalizationCreateRequest,
    ): CancelablePromise<GameCenterAchievementLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAchievementLocalizations',
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
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterAchievementImages the fields to include for returned resources of type gameCenterAchievementImages
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementLocalizationResponse Single GameCenterAchievementLocalization
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsGetInstance(
        id: string,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterAchievementImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterAchievementLocalization'>,
        include?: Array<'gameCenterAchievement' | 'gameCenterAchievementImage'>,
    ): CancelablePromise<GameCenterAchievementLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementLocalizations/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
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
     * @param requestBody GameCenterAchievementLocalization representation
     * @returns GameCenterAchievementLocalizationResponse Single GameCenterAchievementLocalization
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterAchievementLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterAchievementLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAchievementLocalizations/{id}',
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
    public static gameCenterAchievementLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterAchievementLocalizations/{id}',
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
     * @returns GameCenterAchievementLocalizationGameCenterAchievementLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsGameCenterAchievementGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterAchievementLocalizationGameCenterAchievementLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementLocalizations/{id}/relationships/gameCenterAchievement',
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
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterAchievementResponse Single GameCenterAchievement
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsGameCenterAchievementGetToOneRelated(
        id: string,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterAchievementResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementLocalizations/{id}/gameCenterAchievement',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
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
     * @returns GameCenterAchievementLocalizationGameCenterAchievementImageLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsGameCenterAchievementImageGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterAchievementLocalizationGameCenterAchievementImageLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementLocalizations/{id}/relationships/gameCenterAchievementImage',
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
     * @param fieldsGameCenterAchievementImages the fields to include for returned resources of type gameCenterAchievementImages
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementImageResponse Single GameCenterAchievementImage
     * @throws ApiError
     */
    public static gameCenterAchievementLocalizationsGameCenterAchievementImageGetToOneRelated(
        id: string,
        fieldsGameCenterAchievementImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterAchievementLocalization'>,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        include?: Array<'gameCenterAchievementLocalization'>,
    ): CancelablePromise<GameCenterAchievementImageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementLocalizations/{id}/gameCenterAchievementImage',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievementImages]': fieldsGameCenterAchievementImages,
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
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
