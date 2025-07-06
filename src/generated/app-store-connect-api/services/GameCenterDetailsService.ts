/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementReleasesResponse } from '../models/GameCenterAchievementReleasesResponse';
import type { GameCenterAchievementsResponse } from '../models/GameCenterAchievementsResponse';
import type { GameCenterActivitiesResponse } from '../models/GameCenterActivitiesResponse';
import type { GameCenterActivityVersionReleasesResponse } from '../models/GameCenterActivityVersionReleasesResponse';
import type { GameCenterAppVersionsResponse } from '../models/GameCenterAppVersionsResponse';
import type { GameCenterChallengesResponse } from '../models/GameCenterChallengesResponse';
import type { GameCenterChallengeVersionReleasesResponse } from '../models/GameCenterChallengeVersionReleasesResponse';
import type { GameCenterDetailAchievementReleasesLinkagesResponse } from '../models/GameCenterDetailAchievementReleasesLinkagesResponse';
import type { GameCenterDetailActivityReleasesLinkagesResponse } from '../models/GameCenterDetailActivityReleasesLinkagesResponse';
import type { GameCenterDetailChallengeReleasesLinkagesResponse } from '../models/GameCenterDetailChallengeReleasesLinkagesResponse';
import type { GameCenterDetailChallengesMinimumPlatformVersionsLinkagesRequest } from '../models/GameCenterDetailChallengesMinimumPlatformVersionsLinkagesRequest';
import type { GameCenterDetailCreateRequest } from '../models/GameCenterDetailCreateRequest';
import type { GameCenterDetailGameCenterAchievementsLinkagesRequest } from '../models/GameCenterDetailGameCenterAchievementsLinkagesRequest';
import type { GameCenterDetailGameCenterAchievementsLinkagesResponse } from '../models/GameCenterDetailGameCenterAchievementsLinkagesResponse';
import type { GameCenterDetailGameCenterActivitiesLinkagesResponse } from '../models/GameCenterDetailGameCenterActivitiesLinkagesResponse';
import type { GameCenterDetailGameCenterAppVersionsLinkagesResponse } from '../models/GameCenterDetailGameCenterAppVersionsLinkagesResponse';
import type { GameCenterDetailGameCenterChallengesLinkagesResponse } from '../models/GameCenterDetailGameCenterChallengesLinkagesResponse';
import type { GameCenterDetailGameCenterGroupLinkageResponse } from '../models/GameCenterDetailGameCenterGroupLinkageResponse';
import type { GameCenterDetailGameCenterLeaderboardSetsLinkagesRequest } from '../models/GameCenterDetailGameCenterLeaderboardSetsLinkagesRequest';
import type { GameCenterDetailGameCenterLeaderboardSetsLinkagesResponse } from '../models/GameCenterDetailGameCenterLeaderboardSetsLinkagesResponse';
import type { GameCenterDetailGameCenterLeaderboardsLinkagesRequest } from '../models/GameCenterDetailGameCenterLeaderboardsLinkagesRequest';
import type { GameCenterDetailGameCenterLeaderboardsLinkagesResponse } from '../models/GameCenterDetailGameCenterLeaderboardsLinkagesResponse';
import type { GameCenterDetailLeaderboardReleasesLinkagesResponse } from '../models/GameCenterDetailLeaderboardReleasesLinkagesResponse';
import type { GameCenterDetailLeaderboardSetReleasesLinkagesResponse } from '../models/GameCenterDetailLeaderboardSetReleasesLinkagesResponse';
import type { GameCenterDetailResponse } from '../models/GameCenterDetailResponse';
import type { GameCenterDetailUpdateRequest } from '../models/GameCenterDetailUpdateRequest';
import type { GameCenterGroupResponse } from '../models/GameCenterGroupResponse';
import type { GameCenterLeaderboardReleasesResponse } from '../models/GameCenterLeaderboardReleasesResponse';
import type { GameCenterLeaderboardSetReleasesResponse } from '../models/GameCenterLeaderboardSetReleasesResponse';
import type { GameCenterLeaderboardSetsResponse } from '../models/GameCenterLeaderboardSetsResponse';
import type { GameCenterLeaderboardsResponse } from '../models/GameCenterLeaderboardsResponse';
import type { GameCenterMatchmakingAppRequestsV1MetricResponse } from '../models/GameCenterMatchmakingAppRequestsV1MetricResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterDetailsService {
    /**
     * @param requestBody GameCenterDetail representation
     * @returns GameCenterDetailResponse Single GameCenterDetail
     * @throws ApiError
     */
    public static gameCenterDetailsCreateInstance(
        requestBody: GameCenterDetailCreateRequest,
    ): CancelablePromise<GameCenterDetailResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterDetails',
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
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
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
     * @param include comma-separated list of relationships to include
     * @param limitAchievementReleases maximum number of related achievementReleases returned (when they are included)
     * @param limitActivityReleases maximum number of related activityReleases returned (when they are included)
     * @param limitChallengeReleases maximum number of related challengeReleases returned (when they are included)
     * @param limitChallengesMinimumPlatformVersions maximum number of related challengesMinimumPlatformVersions returned (when they are included)
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterAppVersions maximum number of related gameCenterAppVersions returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitLeaderboardReleases maximum number of related leaderboardReleases returned (when they are included)
     * @param limitLeaderboardSetReleases maximum number of related leaderboardSetReleases returned (when they are included)
     * @returns GameCenterDetailResponse Single GameCenterDetail
     * @throws ApiError
     */
    public static gameCenterDetailsGetInstance(
        id: string,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
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
        include?: Array<'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        limitAchievementReleases?: number,
        limitActivityReleases?: number,
        limitChallengeReleases?: number,
        limitChallengesMinimumPlatformVersions?: number,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterAppVersions?: number,
        limitGameCenterChallenges?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterLeaderboards?: number,
        limitLeaderboardReleases?: number,
        limitLeaderboardSetReleases?: number,
    ): CancelablePromise<GameCenterDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
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
                'include': include,
                'limit[achievementReleases]': limitAchievementReleases,
                'limit[activityReleases]': limitActivityReleases,
                'limit[challengeReleases]': limitChallengeReleases,
                'limit[challengesMinimumPlatformVersions]': limitChallengesMinimumPlatformVersions,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterAppVersions]': limitGameCenterAppVersions,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
                'limit[leaderboardReleases]': limitLeaderboardReleases,
                'limit[leaderboardSetReleases]': limitLeaderboardSetReleases,
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
     * @param requestBody GameCenterDetail representation
     * @returns GameCenterDetailResponse Single GameCenterDetail
     * @throws ApiError
     */
    public static gameCenterDetailsUpdateInstance(
        id: string,
        requestBody: GameCenterDetailUpdateRequest,
    ): CancelablePromise<GameCenterDetailResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterDetails/{id}',
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
     * @param limit maximum resources per page
     * @returns GameCenterDetailAchievementReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsAchievementReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailAchievementReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/achievementReleases',
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
     * @param filterGameCenterAchievement filter by id(s) of related 'gameCenterAchievement'
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementReleasesResponse List of GameCenterAchievementReleases
     * @throws ApiError
     */
    public static gameCenterDetailsAchievementReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterAchievement?: Array<string>,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterAchievement'>,
    ): CancelablePromise<GameCenterAchievementReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/achievementReleases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterAchievement]': filterGameCenterAchievement,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterDetailActivityReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsActivityReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailActivityReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/activityReleases',
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
     * @param fieldsGameCenterActivityVersionReleases the fields to include for returned resources of type gameCenterActivityVersionReleases
     * @param fieldsGameCenterActivityVersions the fields to include for returned resources of type gameCenterActivityVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterActivityVersionReleasesResponse List of GameCenterActivityVersionReleases
     * @throws ApiError
     */
    public static gameCenterDetailsActivityReleasesGetToManyRelated(
        id: string,
        fieldsGameCenterActivityVersionReleases?: Array<'version'>,
        fieldsGameCenterActivityVersions?: Array<'version' | 'state' | 'fallbackUrl' | 'activity' | 'localizations' | 'defaultImage' | 'releases'>,
        limit?: number,
        include?: Array<'version'>,
    ): CancelablePromise<GameCenterActivityVersionReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/activityReleases',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityVersionReleases]': fieldsGameCenterActivityVersionReleases,
                'fields[gameCenterActivityVersions]': fieldsGameCenterActivityVersions,
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
     * @returns GameCenterDetailChallengeReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsChallengeReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailChallengeReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/challengeReleases',
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
     * @param fieldsGameCenterChallengeVersionReleases the fields to include for returned resources of type gameCenterChallengeVersionReleases
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterChallengeVersionReleasesResponse List of GameCenterChallengeVersionReleases
     * @throws ApiError
     */
    public static gameCenterDetailsChallengeReleasesGetToManyRelated(
        id: string,
        fieldsGameCenterChallengeVersionReleases?: Array<'version'>,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        limit?: number,
        include?: Array<'version'>,
    ): CancelablePromise<GameCenterChallengeVersionReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/challengeReleases',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeVersionReleases]': fieldsGameCenterChallengeVersionReleases,
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
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
     * @param requestBody List of related linkages
     * @returns void
     * @throws ApiError
     */
    public static gameCenterDetailsChallengesMinimumPlatformVersionsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterDetailChallengesMinimumPlatformVersionsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterDetails/{id}/relationships/challengesMinimumPlatformVersions',
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
     * @returns GameCenterDetailGameCenterAchievementsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterAchievementsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterAchievementsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterAchievements',
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
    public static gameCenterDetailsGameCenterAchievementsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterDetailGameCenterAchievementsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterAchievements',
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
    public static gameCenterDetailsGameCenterAchievementsGetToManyRelated(
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
            url: '/v1/gameCenterDetails/{id}/gameCenterAchievements',
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
     * @returns GameCenterDetailGameCenterActivitiesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterActivitiesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterActivitiesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterActivities',
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
    public static gameCenterDetailsGameCenterActivitiesGetToManyRelated(
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
            url: '/v1/gameCenterDetails/{id}/gameCenterActivities',
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
     * @returns GameCenterDetailGameCenterAppVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterAppVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterAppVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterAppVersions',
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
     * @param filterEnabled filter by attribute 'enabled'
     * @param fieldsGameCenterAppVersions the fields to include for returned resources of type gameCenterAppVersions
     * @param fieldsAppStoreVersions the fields to include for returned resources of type appStoreVersions
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitCompatibilityVersions maximum number of related compatibilityVersions returned (when they are included)
     * @returns GameCenterAppVersionsResponse List of GameCenterAppVersions
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterAppVersionsGetToManyRelated(
        id: string,
        filterEnabled?: Array<string>,
        fieldsGameCenterAppVersions?: Array<'enabled' | 'compatibilityVersions' | 'appStoreVersion'>,
        fieldsAppStoreVersions?: Array<'platform' | 'versionString' | 'appStoreState' | 'appVersionState' | 'copyright' | 'reviewType' | 'releaseType' | 'earliestReleaseDate' | 'usesIdfa' | 'downloadable' | 'createdDate' | 'app' | 'ageRatingDeclaration' | 'appStoreVersionLocalizations' | 'build' | 'appStoreVersionPhasedRelease' | 'gameCenterAppVersion' | 'routingAppCoverage' | 'appStoreReviewDetail' | 'appStoreVersionSubmission' | 'appClipDefaultExperience' | 'appStoreVersionExperiments' | 'appStoreVersionExperimentsV2' | 'customerReviews' | 'alternativeDistributionPackage'>,
        limit?: number,
        include?: Array<'compatibilityVersions' | 'appStoreVersion'>,
        limitCompatibilityVersions?: number,
    ): CancelablePromise<GameCenterAppVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/gameCenterAppVersions',
            path: {
                'id': id,
            },
            query: {
                'filter[enabled]': filterEnabled,
                'fields[gameCenterAppVersions]': fieldsGameCenterAppVersions,
                'fields[appStoreVersions]': fieldsAppStoreVersions,
                'limit': limit,
                'include': include,
                'limit[compatibilityVersions]': limitCompatibilityVersions,
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
     * @returns GameCenterDetailGameCenterChallengesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterChallengesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterChallengesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterChallenges',
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
    public static gameCenterDetailsGameCenterChallengesGetToManyRelated(
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
            url: '/v1/gameCenterDetails/{id}/gameCenterChallenges',
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
     * @returns GameCenterDetailGameCenterGroupLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterGroupGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterDetailGameCenterGroupLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterGroup',
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
     * @param fieldsGameCenterGroups the fields to include for returned resources of type gameCenterGroups
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterAchievements the fields to include for returned resources of type gameCenterAchievements
     * @param fieldsGameCenterActivities the fields to include for returned resources of type gameCenterActivities
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterDetails maximum number of related gameCenterDetails returned (when they are included)
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitGameCenterLeaderboardSets maximum number of related gameCenterLeaderboardSets returned (when they are included)
     * @param limitGameCenterAchievements maximum number of related gameCenterAchievements returned (when they are included)
     * @param limitGameCenterActivities maximum number of related gameCenterActivities returned (when they are included)
     * @param limitGameCenterChallenges maximum number of related gameCenterChallenges returned (when they are included)
     * @returns GameCenterGroupResponse Single GameCenterGroup
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterGroupGetToOneRelated(
        id: string,
        fieldsGameCenterGroups?: Array<'referenceName' | 'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterAchievements?: Array<'referenceName' | 'vendorIdentifier' | 'points' | 'showBeforeEarned' | 'repeatable' | 'archived' | 'activityProperties' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupAchievement' | 'localizations' | 'releases' | 'activity'>,
        fieldsGameCenterActivities?: Array<'referenceName' | 'vendorIdentifier' | 'playStyle' | 'minimumPlayersCount' | 'maximumPlayersCount' | 'supportsPartyCode' | 'archived' | 'properties' | 'gameCenterDetail' | 'gameCenterGroup' | 'achievements' | 'leaderboards' | 'versions'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        include?: Array<'gameCenterDetails' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges'>,
        limitGameCenterDetails?: number,
        limitGameCenterLeaderboards?: number,
        limitGameCenterLeaderboardSets?: number,
        limitGameCenterAchievements?: number,
        limitGameCenterActivities?: number,
        limitGameCenterChallenges?: number,
    ): CancelablePromise<GameCenterGroupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/gameCenterGroup',
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
                'limit[gameCenterDetails]': limitGameCenterDetails,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
                'limit[gameCenterLeaderboardSets]': limitGameCenterLeaderboardSets,
                'limit[gameCenterAchievements]': limitGameCenterAchievements,
                'limit[gameCenterActivities]': limitGameCenterActivities,
                'limit[gameCenterChallenges]': limitGameCenterChallenges,
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
     * @returns GameCenterDetailGameCenterLeaderboardSetsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterLeaderboardSetsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterLeaderboardSetsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboardSets',
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
    public static gameCenterDetailsGameCenterLeaderboardSetsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterDetailGameCenterLeaderboardSetsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboardSets',
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
    public static gameCenterDetailsGameCenterLeaderboardSetsGetToManyRelated(
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
            url: '/v1/gameCenterDetails/{id}/gameCenterLeaderboardSets',
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
     * @returns GameCenterDetailGameCenterLeaderboardsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsGameCenterLeaderboardsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailGameCenterLeaderboardsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterDetailsGameCenterLeaderboardsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterDetailGameCenterLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterDetailsGameCenterLeaderboardsGetToManyRelated(
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
            url: '/v1/gameCenterDetails/{id}/gameCenterLeaderboards',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterDetailLeaderboardReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsLeaderboardReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailLeaderboardReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/leaderboardReleases',
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
     * @param filterGameCenterLeaderboard filter by id(s) of related 'gameCenterLeaderboard'
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardReleasesResponse List of GameCenterLeaderboardReleases
     * @throws ApiError
     */
    public static gameCenterDetailsLeaderboardReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterLeaderboard?: Array<string>,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboard'>,
    ): CancelablePromise<GameCenterLeaderboardReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/leaderboardReleases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterLeaderboard]': filterGameCenterLeaderboard,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterDetailLeaderboardSetReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterDetailsLeaderboardSetReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterDetailLeaderboardSetReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/relationships/leaderboardSetReleases',
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
     * @param filterGameCenterLeaderboardSet filter by id(s) of related 'gameCenterLeaderboardSet'
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetReleasesResponse List of GameCenterLeaderboardSetReleases
     * @throws ApiError
     */
    public static gameCenterDetailsLeaderboardSetReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterLeaderboardSet?: Array<string>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
    ): CancelablePromise<GameCenterLeaderboardSetReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/leaderboardSetReleases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterLeaderboardSet]': filterGameCenterLeaderboardSet,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
                'fields[gameCenterDetails]': fieldsGameCenterDetails,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
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
     * @param granularity the granularity of the per-group dataset
     * @param groupBy the dimension by which to group the results
     * @param filterResult filter by 'result' attribute dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingAppRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterDetailsClassicMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingAppRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/metrics/classicMatchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
                'sort': sort,
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
     * @param granularity the granularity of the per-group dataset
     * @param groupBy the dimension by which to group the results
     * @param filterResult filter by 'result' attribute dimension
     * @param sort comma-separated list of sort expressions; metrics will be sorted as specified
     * @param limit maximum number of groups to return per page
     * @returns GameCenterMatchmakingAppRequestsV1MetricResponse Metrics data response
     * @throws ApiError
     */
    public static gameCenterDetailsRuleBasedMatchmakingRequestsGetMetrics(
        id: string,
        granularity: 'P1D' | 'PT1H' | 'PT15M',
        groupBy?: Array<'result'>,
        filterResult?: 'MATCHED' | 'CANCELED' | 'EXPIRED',
        sort?: Array<'count' | '-count' | 'averageSecondsInQueue' | '-averageSecondsInQueue' | 'p50SecondsInQueue' | '-p50SecondsInQueue' | 'p95SecondsInQueue' | '-p95SecondsInQueue'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingAppRequestsV1MetricResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterDetails/{id}/metrics/ruleBasedMatchmakingRequests',
            path: {
                'id': id,
            },
            query: {
                'granularity': granularity,
                'groupBy': groupBy,
                'filter[result]': filterResult,
                'sort': sort,
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
}
