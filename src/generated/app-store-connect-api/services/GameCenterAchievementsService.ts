/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementActivityLinkageRequest } from '../models/GameCenterAchievementActivityLinkageRequest';
import type { GameCenterAchievementCreateRequest } from '../models/GameCenterAchievementCreateRequest';
import type { GameCenterAchievementGroupAchievementLinkageRequest } from '../models/GameCenterAchievementGroupAchievementLinkageRequest';
import type { GameCenterAchievementGroupAchievementLinkageResponse } from '../models/GameCenterAchievementGroupAchievementLinkageResponse';
import type { GameCenterAchievementLocalizationsLinkagesResponse } from '../models/GameCenterAchievementLocalizationsLinkagesResponse';
import type { GameCenterAchievementLocalizationsResponse } from '../models/GameCenterAchievementLocalizationsResponse';
import type { GameCenterAchievementReleasesLinkagesResponse } from '../models/GameCenterAchievementReleasesLinkagesResponse';
import type { GameCenterAchievementReleasesResponse } from '../models/GameCenterAchievementReleasesResponse';
import type { GameCenterAchievementResponse } from '../models/GameCenterAchievementResponse';
import type { GameCenterAchievementUpdateRequest } from '../models/GameCenterAchievementUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterAchievementsService {
    /**
     * @param requestBody GameCenterAchievement representation
     * @returns GameCenterAchievementResponse Single GameCenterAchievement
     * @throws ApiError
     */
    public static gameCenterAchievementsCreateInstance(
        requestBody: GameCenterAchievementCreateRequest,
    ): CancelablePromise<GameCenterAchievementResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAchievements',
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
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterAchievementResponse Single GameCenterAchievement
     * @throws ApiError
     */
    public static gameCenterAchievementsGetInstance(
        id: string,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterAchievementResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
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
     * @param requestBody GameCenterAchievement representation
     * @returns GameCenterAchievementResponse Single GameCenterAchievement
     * @throws ApiError
     */
    public static gameCenterAchievementsUpdateInstance(
        id: string,
        requestBody: GameCenterAchievementUpdateRequest,
    ): CancelablePromise<GameCenterAchievementResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAchievements/{id}',
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
    public static gameCenterAchievementsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterAchievements/{id}',
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
     * @param requestBody Related linkage
     * @returns void
     * @throws ApiError
     */
    public static gameCenterAchievementsActivityUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterAchievementActivityLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAchievements/{id}/relationships/activity',
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
     * @deprecated
     * @param id the id of the requested resource
     * @returns GameCenterAchievementGroupAchievementLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterAchievementsGroupAchievementGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterAchievementGroupAchievementLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}/relationships/groupAchievement',
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
     * @deprecated
     * @param id the id of the requested resource
     * @param requestBody Related linkage
     * @returns void
     * @throws ApiError
     */
    public static gameCenterAchievementsGroupAchievementUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterAchievementGroupAchievementLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterAchievements/{id}/relationships/groupAchievement',
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
     * @deprecated
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
    public static gameCenterAchievementsGroupAchievementGetToOneRelated(
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
            url: '/v1/gameCenterAchievements/{id}/groupAchievement',
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
     * @param limit maximum resources per page
     * @returns GameCenterAchievementLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterAchievementsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterAchievementLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}/relationships/localizations',
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
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterAchievementImages the fields to include for returned resources of type gameCenterAchievementImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementLocalizationsResponse List of GameCenterAchievementLocalizations
     * @throws ApiError
     */
    public static gameCenterAchievementsLocalizationsGetToManyRelated(
        id: string,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterAchievementImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterAchievementLocalization'>,
        limit?: number,
        include?: Array<'gameCenterAchievement' | 'gameCenterAchievementImage'>,
    ): CancelablePromise<GameCenterAchievementLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterAchievementImages]': fieldsGameCenterAchievementImages,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterAchievementReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterAchievementsReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterAchievementReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}/relationships/releases',
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
     * @param filterLive filter by attribute 'live'
     * @param filterGameCenterDetail filter by id(s) of related 'gameCenterDetail'
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementReleasesResponse List of GameCenterAchievementReleases
     * @throws ApiError
     */
    public static gameCenterAchievementsReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterDetail?: Array<string>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterAchievement'>,
    ): CancelablePromise<GameCenterAchievementReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievements/{id}/releases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterDetail]': filterGameCenterDetail,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
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
