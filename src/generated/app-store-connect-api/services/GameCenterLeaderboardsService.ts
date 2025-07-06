/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardActivityLinkageRequest } from '../models/GameCenterLeaderboardActivityLinkageRequest';
import type { GameCenterLeaderboardChallengeLinkageRequest } from '../models/GameCenterLeaderboardChallengeLinkageRequest';
import type { GameCenterLeaderboardCreateRequest } from '../models/GameCenterLeaderboardCreateRequest';
import type { GameCenterLeaderboardGroupLeaderboardLinkageRequest } from '../models/GameCenterLeaderboardGroupLeaderboardLinkageRequest';
import type { GameCenterLeaderboardGroupLeaderboardLinkageResponse } from '../models/GameCenterLeaderboardGroupLeaderboardLinkageResponse';
import type { GameCenterLeaderboardLocalizationsLinkagesResponse } from '../models/GameCenterLeaderboardLocalizationsLinkagesResponse';
import type { GameCenterLeaderboardLocalizationsResponse } from '../models/GameCenterLeaderboardLocalizationsResponse';
import type { GameCenterLeaderboardReleasesLinkagesResponse } from '../models/GameCenterLeaderboardReleasesLinkagesResponse';
import type { GameCenterLeaderboardReleasesResponse } from '../models/GameCenterLeaderboardReleasesResponse';
import type { GameCenterLeaderboardResponse } from '../models/GameCenterLeaderboardResponse';
import type { GameCenterLeaderboardUpdateRequest } from '../models/GameCenterLeaderboardUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardsService {
    /**
     * @param requestBody GameCenterLeaderboard representation
     * @returns GameCenterLeaderboardResponse Single GameCenterLeaderboard
     * @throws ApiError
     */
    public static gameCenterLeaderboardsCreateInstance(
        requestBody: GameCenterLeaderboardCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboards',
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
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardResponse Single GameCenterLeaderboard
     * @throws ApiError
     */
    public static gameCenterLeaderboardsGetInstance(
        id: string,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limitGameCenterLeaderboardSets?: number,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
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
     * @param requestBody GameCenterLeaderboard representation
     * @returns GameCenterLeaderboardResponse Single GameCenterLeaderboard
     * @throws ApiError
     */
    public static gameCenterLeaderboardsUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboards/{id}',
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
    public static gameCenterLeaderboardsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboards/{id}',
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
    public static gameCenterLeaderboardsActivityUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterLeaderboardActivityLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/activity',
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
     * @param requestBody Related linkage
     * @returns void
     * @throws ApiError
     */
    public static gameCenterLeaderboardsChallengeUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterLeaderboardChallengeLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/challenge',
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
     * @returns GameCenterLeaderboardGroupLeaderboardLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardsGroupLeaderboardGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardGroupLeaderboardLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/groupLeaderboard',
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
    public static gameCenterLeaderboardsGroupLeaderboardUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterLeaderboardGroupLeaderboardLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/groupLeaderboard',
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
    public static gameCenterLeaderboardsGroupLeaderboardGetToOneRelated(
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
            url: '/v1/gameCenterLeaderboards/{id}/groupLeaderboard',
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
     * @param limit maximum resources per page
     * @returns GameCenterLeaderboardLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterLeaderboardsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterLeaderboardLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/localizations',
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
     * @param fieldsGameCenterLeaderboardLocalizations the fields to include for returned resources of type gameCenterLeaderboardLocalizations
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardImages the fields to include for returned resources of type gameCenterLeaderboardImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardLocalizationsResponse List of GameCenterLeaderboardLocalizations
     * @throws ApiError
     */
    public static gameCenterLeaderboardsLocalizationsGetToManyRelated(
        id: string,
        fieldsGameCenterLeaderboardLocalizations?: Array<'locale' | 'name' | 'formatterOverride' | 'formatterSuffix' | 'formatterSuffixSingular' | 'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardLocalization'>,
        limit?: number,
        include?: Array<'gameCenterLeaderboard' | 'gameCenterLeaderboardImage'>,
    ): CancelablePromise<GameCenterLeaderboardLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardLocalizations]': fieldsGameCenterLeaderboardLocalizations,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardImages]': fieldsGameCenterLeaderboardImages,
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
     * @returns GameCenterLeaderboardReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterLeaderboardsReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterLeaderboardReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}/relationships/releases',
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
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardReleasesResponse List of GameCenterLeaderboardReleases
     * @throws ApiError
     */
    public static gameCenterLeaderboardsReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterDetail?: Array<string>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboard'>,
    ): CancelablePromise<GameCenterLeaderboardReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboards/{id}/releases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterDetail]': filterGameCenterDetail,
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
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
