/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardResponse } from '../models/GameCenterLeaderboardResponse';
import type { GameCenterLeaderboardSetMemberLocalizationCreateRequest } from '../models/GameCenterLeaderboardSetMemberLocalizationCreateRequest';
import type { GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardLinkageResponse } from '../models/GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardLinkageResponse';
import type { GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardSetLinkageResponse } from '../models/GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardSetLinkageResponse';
import type { GameCenterLeaderboardSetMemberLocalizationResponse } from '../models/GameCenterLeaderboardSetMemberLocalizationResponse';
import type { GameCenterLeaderboardSetMemberLocalizationsResponse } from '../models/GameCenterLeaderboardSetMemberLocalizationsResponse';
import type { GameCenterLeaderboardSetMemberLocalizationUpdateRequest } from '../models/GameCenterLeaderboardSetMemberLocalizationUpdateRequest';
import type { GameCenterLeaderboardSetResponse } from '../models/GameCenterLeaderboardSetResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardSetMemberLocalizationsService {
    /**
     * @param filterGameCenterLeaderboardSet filter by id(s) of related 'gameCenterLeaderboardSet'
     * @param filterGameCenterLeaderboard filter by id(s) of related 'gameCenterLeaderboard'
     * @param fieldsGameCenterLeaderboardSetMemberLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetMemberLocalizations
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetMemberLocalizationsResponse List of GameCenterLeaderboardSetMemberLocalizations
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsGetCollection(
        filterGameCenterLeaderboardSet: Array<string>,
        filterGameCenterLeaderboard: Array<string>,
        fieldsGameCenterLeaderboardSetMemberLocalizations?: Array<'name' | 'locale' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboard'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limit?: number,
        include?: Array<'gameCenterLeaderboardSet' | 'gameCenterLeaderboard'>,
    ): CancelablePromise<GameCenterLeaderboardSetMemberLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations',
            query: {
                'filter[gameCenterLeaderboardSet]': filterGameCenterLeaderboardSet,
                'filter[gameCenterLeaderboard]': filterGameCenterLeaderboard,
                'fields[gameCenterLeaderboardSetMemberLocalizations]': fieldsGameCenterLeaderboardSetMemberLocalizations,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'limit': limit,
                'include': include,
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
     * @param requestBody GameCenterLeaderboardSetMemberLocalization representation
     * @returns GameCenterLeaderboardSetMemberLocalizationResponse Single GameCenterLeaderboardSetMemberLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsCreateInstance(
        requestBody: GameCenterLeaderboardSetMemberLocalizationCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetMemberLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations',
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
     * @param requestBody GameCenterLeaderboardSetMemberLocalization representation
     * @returns GameCenterLeaderboardSetMemberLocalizationResponse Single GameCenterLeaderboardSetMemberLocalization
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardSetMemberLocalizationUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetMemberLocalizationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}',
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
    public static gameCenterLeaderboardSetMemberLocalizationsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}',
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
     * @returns GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsGameCenterLeaderboardGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}/relationships/gameCenterLeaderboard',
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
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardResponse Single GameCenterLeaderboard
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsGameCenterLeaderboardGetToOneRelated(
        id: string,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limitGameCenterLeaderboardSets?: number,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}/gameCenterLeaderboard',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
                'fields[gameCenterActivities]': fieldsGameCenterActivities,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
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
    /**
     * @param id the id of the requested resource
     * @returns GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardSetLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsGameCenterLeaderboardSetGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardSetMemberLocalizationGameCenterLeaderboardSetLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}/relationships/gameCenterLeaderboardSet',
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
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardSetResponse Single GameCenterLeaderboardSet
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetMemberLocalizationsGameCenterLeaderboardSetGetToOneRelated(
        id: string,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        limitLocalizations?: number,
        limitGameCenterLeaderboards?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardSetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetMemberLocalizations/{id}/gameCenterLeaderboardSet',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterGroups]': fieldsGameCenterGroups,
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
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
}
