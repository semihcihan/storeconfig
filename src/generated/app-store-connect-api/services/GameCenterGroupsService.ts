/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementsResponse } from '../models/GameCenterAchievementsResponse';
import type { GameCenterActivitiesResponse } from '../models/GameCenterActivitiesResponse';
import type { GameCenterChallengesResponse } from '../models/GameCenterChallengesResponse';
import type { GameCenterDetailsResponse } from '../models/GameCenterDetailsResponse';
import type { GameCenterGroupCreateRequest } from '../models/GameCenterGroupCreateRequest';
import type { GameCenterGroupGameCenterAchievementsLinkagesRequest } from '../models/GameCenterGroupGameCenterAchievementsLinkagesRequest';
import type { GameCenterGroupGameCenterAchievementsLinkagesResponse } from '../models/GameCenterGroupGameCenterAchievementsLinkagesResponse';
import type { GameCenterGroupGameCenterActivitiesLinkagesResponse } from '../models/GameCenterGroupGameCenterActivitiesLinkagesResponse';
import type { GameCenterGroupGameCenterChallengesLinkagesResponse } from '../models/GameCenterGroupGameCenterChallengesLinkagesResponse';
import type { GameCenterGroupGameCenterDetailsLinkagesResponse } from '../models/GameCenterGroupGameCenterDetailsLinkagesResponse';
import type { GameCenterGroupGameCenterLeaderboardSetsLinkagesRequest } from '../models/GameCenterGroupGameCenterLeaderboardSetsLinkagesRequest';
import type { GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse } from '../models/GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse';
import type { GameCenterGroupGameCenterLeaderboardsLinkagesRequest } from '../models/GameCenterGroupGameCenterLeaderboardsLinkagesRequest';
import type { GameCenterGroupGameCenterLeaderboardsLinkagesResponse } from '../models/GameCenterGroupGameCenterLeaderboardsLinkagesResponse';
import type { GameCenterGroupResponse } from '../models/GameCenterGroupResponse';
import type { GameCenterGroupsResponse } from '../models/GameCenterGroupsResponse';
import type { GameCenterGroupUpdateRequest } from '../models/GameCenterGroupUpdateRequest';
import type { GameCenterLeaderboardSetsResponse } from '../models/GameCenterLeaderboardSetsResponse';
import type { GameCenterLeaderboardsResponse } from '../models/GameCenterLeaderboardsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterGroupsService {
    /**
     * @param filterGameCenterDetails filter by id(s) of related 'gameCenterDetails'
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @param limitGameCenterDetails maximum number of related gameCenterDetails returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @returns GameCenterGroupsResponse List of GameCenterGroups
     * @throws ApiError
     */
    public static gameCenterGroupsGetCollection(
        filterGameCenterDetails?: Array<string>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        limit?: number,
        include?: Array<'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterChallenges?: number,
        limitGameCenterDetails?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterLeaderboards?: number,
    ): CancelablePromise<GameCenterGroupsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups',
            query: {
                'filter[gameCenterDetails]': filterGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'limit': limit,
                'include': include,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
                'limit[gameCenterDetails]': limitGameCenterDetails,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param requestBody GameCenterGroup representation
     * @returns GameCenterGroupResponse Single GameCenterGroup
     * @throws ApiError
     */
    public static gameCenterGroupsCreateInstance(
        requestBody: GameCenterGroupCreateRequest,
    ): CancelablePromise<GameCenterGroupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterGroups',
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
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @param limitGameCenterDetails maximum number of related gameCenterDetails returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @returns GameCenterGroupResponse Single GameCenterGroup
     * @throws ApiError
     */
    public static gameCenterGroupsGetInstance(
        id: string,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        include?: Array<'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterChallenges?: number,
        limitGameCenterDetails?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterLeaderboards?: number,
    ): CancelablePromise<GameCenterGroupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'include': include,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
                'limit[gameCenterDetails]': limitGameCenterDetails,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
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
     * @param requestBody GameCenterGroup representation
     * @returns GameCenterGroupResponse Single GameCenterGroup
     * @throws ApiError
     */
    public static gameCenterGroupsUpdateInstance(
        id: string,
        requestBody: GameCenterGroupUpdateRequest,
    ): CancelablePromise<GameCenterGroupResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterGroups/{id}',
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
    public static gameCenterGroupsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterGroups/{id}',
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
     * @param limit maximum resources per page
     * @returns GameCenterGroupGameCenterAchievementsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterAchievementsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterAchievementsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterAchievements',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterAchievementsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterGroupGameCenterAchievementsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterAchievements',
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
     * @param filterReferenceName filter by attribute 'referenceName'
     * @param filterArchived filter by attribute 'archived'
     * @param filterId filter by id(s)
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterAchievementLocalizations the fields to include for returned resources of type gameCenterAchievementLocalizations
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterAchievementsResponse List of GameCenterAchievements
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterAchievementsGetToManyRelated(
        id: string,
        filterReferenceName?: Array<string>,
        filterArchived?: Array<string>,
        filterId?: Array<string>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterAchievementLocalizations?: Array<'locale' | 'name' | 'beforeEarnedDescription' | 'afterEarnedDescription' | 'gameCenterAchievement' | 'gameCenterAchievementImage'>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterAchievementsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterAchievements',
            path: {
                'id': id,
            },
            query: {
                'filter[referenceName]': filterReferenceName,
                'filter[archived]': filterArchived,
                'filter[id]': filterId,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterAchievementLocalizations]': fieldsGameCenterAchievementLocalizations,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterGroupGameCenterActivitiesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterActivitiesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterActivitiesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterActivities',
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
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitAchievements maximum number of related achievements returned (when they are included)
     * @param limitLeaderboards maximum number of related leaderboards returned (when they are included)
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns GameCenterActivitiesResponse List of GameCenterActivities
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterActivitiesGetToManyRelated(
        id: string,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        limitAchievements?: number,
        limitLeaderboards?: number,
        limitVersions?: number,
    ): CancelablePromise<GameCenterActivitiesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterActivities',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
                'limit': limit,
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
     * @param limit maximum resources per page
     * @returns GameCenterGroupGameCenterChallengesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterChallengesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterChallengesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterChallenges',
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
     * @param filterReferenceName filter by attribute 'referenceName'
     * @param filterArchived filter by attribute 'archived'
     * @param filterId filter by id(s)
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns GameCenterChallengesResponse List of GameCenterChallenges
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterChallengesGetToManyRelated(
        id: string,
        filterReferenceName?: Array<string>,
        filterArchived?: Array<string>,
        filterId?: Array<string>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        limitVersions?: number,
    ): CancelablePromise<GameCenterChallengesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterChallenges',
            path: {
                'id': id,
            },
            query: {
                'filter[referenceName]': filterReferenceName,
                'filter[archived]': filterArchived,
                'filter[id]': filterId,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'limit': limit,
                'include': include,
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
     * @param limit maximum resources per page
     * @returns GameCenterGroupGameCenterDetailsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterDetailsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterDetailsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterDetails',
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
     * @param filterGameCenterAppVersionsEnabled filter by attribute 'gameCenterAppVersions.enabled'
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsApps the fields to include for returned resources of type apps
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterActivityVersionReleases the fields to include for returned resources of type gameCenterActivityVersionReleases
     * @param fieldsGameCenterChallengeVersionReleases the fields to include for returned resources of type gameCenterChallengeVersionReleases
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterAppVersions maximum number of related gameCenterAppVersions returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @param limitAchievementReleases maximum number of related achievementReleases returned (when they are included)
     * @param limitActivityReleases maximum number of related activityReleases returned (when they are included)
     * @param limitChallengeReleases maximum number of related challengeReleases returned (when they are included)
     * @param limitLeaderboardReleases maximum number of related leaderboardReleases returned (when they are included)
     * @param limitLeaderboardSetReleases maximum number of related leaderboardSetReleases returned (when they are included)
     * @param limitChallengesMinimumPlatformVersions maximum number of related challengesMinimumPlatformVersions returned (when they are included)
     * @returns GameCenterDetailsResponse List of GameCenterDetails
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterDetailsGetToManyRelated(
        id: string,
        filterGameCenterAppVersionsEnabled?: Array<string>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsApps?: Array<'accessibilityUrl' | 'name' | 'bundleId' | 'sku' | 'primaryLocale' | 'isOrEverWasMadeForKids' | 'subscriptionStatusUrl' | 'subscriptionStatusUrlVersion' | 'subscriptionStatusUrlForSandbox' | 'subscriptionStatusUrlVersionForSandbox' | 'contentRightsDeclaration' | 'streamlinedPurchasingEnabled' | 'accessibilityDeclarations' | 'appEncryptionDeclarations' | 'ciProduct' | 'betaTesters' | 'betaGroups' | 'appStoreVersions' | 'preReleaseVersions' | 'betaAppLocalizations' | 'builds' | 'betaLicenseAgreement' | 'betaAppReviewDetail' | 'appInfos' | 'appClips' | 'appPricePoints' | 'endUserLicenseAgreement' | 'appPriceSchedule' | 'appAvailabilityV2' | 'inAppPurchases' | 'subscriptionGroups' | 'gameCenterEnabledVersions' | 'perfPowerMetrics' | 'appCustomProductPages' | 'inAppPurchasesV2' | 'promotedPurchases' | 'appEvents' | 'reviewSubmissions' | 'subscriptionGracePeriod' | 'customerReviews' | 'customerReviewSummarizations' | 'gameCenterDetail' | 'appStoreVersionExperimentsV2' | 'alternativeDistributionKey' | 'analyticsReportRequests' | 'marketplaceSearchDetail' | 'backgroundAssets' | 'betaFeedbackScreenshotSubmissions' | 'betaFeedbackCrashSubmissions' | 'webhooks'>,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterActivityVersionReleases?: Array<'version'>,
        fieldsGameCenterChallengeVersionReleases?: Array<'version'>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        limit?: number,
        include?: Array<'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        limitGameCenterAppVersions?: number,
        limitGameCenterLeaderboards?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterChallenges?: number,
        limitAchievementReleases?: number,
        limitActivityReleases?: number,
        limitChallengeReleases?: number,
        limitLeaderboardReleases?: number,
        limitLeaderboardSetReleases?: number,
        limitChallengesMinimumPlatformVersions?: number,
    ): CancelablePromise<GameCenterDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterDetails',
            path: {
                'id': id,
            },
            query: {
                'filter[gameCenterAppVersions.enabled]': filterGameCenterAppVersionsEnabled,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[apps]': fieldsApps,
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterAchievements]': fieldsGameCenterAchievements,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
                'fields[gameCenterActivityVersionReleases]': fieldsGameCenterActivityVersionReleases,
                'fields[gameCenterChallengeVersionReleases]': fieldsGameCenterChallengeVersionReleases,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'limit': limit,
                'include': include,
                'limit[gameCenterAppVersions]': limitGameCenterAppVersions,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
                'limit[achievementReleases]': limitAchievementReleases,
                'limit[activityReleases]': limitActivityReleases,
                'limit[challengeReleases]': limitChallengeReleases,
                'limit[leaderboardReleases]': limitLeaderboardReleases,
                'limit[leaderboardSetReleases]': limitLeaderboardSetReleases,
                'limit[challengesMinimumPlatformVersions]': limitChallengesMinimumPlatformVersions,
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
     * @returns GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardSetsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboardSets',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardSetsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterGroupGameCenterLeaderboardSetsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboardSets',
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
     * @param filterReferenceName filter by attribute 'referenceName'
     * @param filterId filter by id(s)
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardSetsResponse List of GameCenterLeaderboardSets
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardSetsGetToManyRelated(
        id: string,
        filterReferenceName?: Array<string>,
        filterId?: Array<string>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        limitLocalizations?: number,
        limitGameCenterLeaderboards?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardSetsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterLeaderboardSets',
            path: {
                'id': id,
            },
            query: {
                'filter[referenceName]': filterReferenceName,
                'filter[id]': filterId,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
                'limit': limit,
                'include': include,
                'limit[localizations]': limitLocalizations,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
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
     * @returns GameCenterGroupGameCenterLeaderboardsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterGroupGameCenterLeaderboardsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboards',
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterGroupGameCenterLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboards',
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
     * @param filterReferenceName filter by attribute 'referenceName'
     * @param filterArchived filter by attribute 'archived'
     * @param filterId filter by id(s)
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardsResponse List of GameCenterLeaderboards
     * @throws ApiError
     */
    public static gameCenterGroupsGameCenterLeaderboardsGetToManyRelated(
        id: string,
        filterReferenceName?: Array<string>,
        filterArchived?: Array<string>,
        filterId?: Array<string>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limitGameCenterLeaderboardSets?: number,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterGroups/{id}/gameCenterLeaderboards',
            path: {
                'id': id,
            },
            query: {
                'filter[referenceName]': filterReferenceName,
                'filter[archived]': filterArchived,
                'filter[id]': filterId,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'limit': limit,
                'include': include,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
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
