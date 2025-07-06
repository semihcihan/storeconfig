/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardSetCreateRequest } from '../models/GameCenterLeaderboardSetCreateRequest';
import type { GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesRequest } from '../models/GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesRequest';
import type { GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesResponse } from '../models/GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesResponse';
import type { GameCenterLeaderboardSetGroupLeaderboardSetLinkageRequest } from '../models/GameCenterLeaderboardSetGroupLeaderboardSetLinkageRequest';
import type { GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse } from '../models/GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse';
import type { GameCenterLeaderboardSetLocalizationsLinkagesResponse } from '../models/GameCenterLeaderboardSetLocalizationsLinkagesResponse';
import type { GameCenterLeaderboardSetLocalizationsResponse } from '../models/GameCenterLeaderboardSetLocalizationsResponse';
import type { GameCenterLeaderboardSetReleasesLinkagesResponse } from '../models/GameCenterLeaderboardSetReleasesLinkagesResponse';
import type { GameCenterLeaderboardSetReleasesResponse } from '../models/GameCenterLeaderboardSetReleasesResponse';
import type { GameCenterLeaderboardSetResponse } from '../models/GameCenterLeaderboardSetResponse';
import type { GameCenterLeaderboardSetUpdateRequest } from '../models/GameCenterLeaderboardSetUpdateRequest';
import type { GameCenterLeaderboardsResponse } from '../models/GameCenterLeaderboardsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardSetsService {
    /**
     * @param requestBody GameCenterLeaderboardSet representation
     * @returns GameCenterLeaderboardSetResponse Single GameCenterLeaderboardSet
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsCreateInstance(
        requestBody: GameCenterLeaderboardSetCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSets',
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
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param fieldsGameCenterLeaderboards the fields to include for returned resources of type gameCenterLeaderboards
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param include comma-separated list of relationships to include
     * @param limitGameCenterLeaderboards maximum number of related gameCenterLeaderboards returned (when they are included)
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterLeaderboardSetResponse Single GameCenterLeaderboardSet
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsGetInstance(
        id: string,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        fieldsGameCenterLeaderboards?: Array<'defaultFormatter' | 'referenceName' | 'vendorIdentifier' | 'submissionType' | 'scoreSortType' | 'scoreRangeStart' | 'scoreRangeEnd' | 'recurrenceStartDate' | 'recurrenceDuration' | 'recurrenceRule' | 'archived' | 'activityProperties' | 'visibility' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboard' | 'gameCenterLeaderboardSets' | 'localizations' | 'releases' | 'activity' | 'challenge'>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        limitGameCenterLeaderboards?: number,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterLeaderboardSetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
                'fields[gameCenterLeaderboards]': fieldsGameCenterLeaderboards,
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
                'include': include,
                'limit[gameCenterLeaderboards]': limitGameCenterLeaderboards,
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
     * @param requestBody GameCenterLeaderboardSet representation
     * @returns GameCenterLeaderboardSetResponse Single GameCenterLeaderboardSet
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsUpdateInstance(
        id: string,
        requestBody: GameCenterLeaderboardSetUpdateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSets/{id}',
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
    public static gameCenterLeaderboardSetsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSets/{id}',
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
     * @returns GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsGameCenterLeaderboardsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterLeaderboardSetsGameCenterLeaderboardsCreateToManyRelationship(
        id: string,
        requestBody: GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterLeaderboardSetsGameCenterLeaderboardsReplaceToManyRelationship(
        id: string,
        requestBody: GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterLeaderboardSetsGameCenterLeaderboardsDeleteToManyRelationship(
        id: string,
        requestBody: GameCenterLeaderboardSetGameCenterLeaderboardsLinkagesRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards',
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
    public static gameCenterLeaderboardSetsGameCenterLeaderboardsGetToManyRelated(
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
            url: '/v1/gameCenterLeaderboardSets/{id}/gameCenterLeaderboards',
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
     * @deprecated
     * @param id the id of the requested resource
     * @returns GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse Related linkage
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsGroupLeaderboardSetGetToOneRelationship(
        id: string,
    ): CancelablePromise<GameCenterLeaderboardSetGroupLeaderboardSetLinkageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/groupLeaderboardSet',
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
    public static gameCenterLeaderboardSetsGroupLeaderboardSetUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterLeaderboardSetGroupLeaderboardSetLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/groupLeaderboardSet',
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
    public static gameCenterLeaderboardSetsGroupLeaderboardSetGetToOneRelated(
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
            url: '/v1/gameCenterLeaderboardSets/{id}/groupLeaderboardSet',
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterLeaderboardSetLocalizationsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsLocalizationsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/localizations',
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
     * @param fieldsGameCenterLeaderboardSetLocalizations the fields to include for returned resources of type gameCenterLeaderboardSetLocalizations
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param fieldsGameCenterLeaderboardSetImages the fields to include for returned resources of type gameCenterLeaderboardSetImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetLocalizationsResponse List of GameCenterLeaderboardSetLocalizations
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsLocalizationsGetToManyRelated(
        id: string,
        fieldsGameCenterLeaderboardSetLocalizations?: Array<'locale' | 'name' | 'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        fieldsGameCenterLeaderboardSetImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState' | 'gameCenterLeaderboardSetLocalization'>,
        limit?: number,
        include?: Array<'gameCenterLeaderboardSet' | 'gameCenterLeaderboardSetImage'>,
    ): CancelablePromise<GameCenterLeaderboardSetLocalizationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/localizations',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSetLocalizations]': fieldsGameCenterLeaderboardSetLocalizations,
                'fields[gameCenterLeaderboardSets]': fieldsGameCenterLeaderboardSets,
                'fields[gameCenterLeaderboardSetImages]': fieldsGameCenterLeaderboardSetImages,
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
     * @returns GameCenterLeaderboardSetReleasesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsReleasesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterLeaderboardSetReleasesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/relationships/releases',
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
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param fieldsGameCenterDetails the fields to include for returned resources of type gameCenterDetails
     * @param fieldsGameCenterLeaderboardSets the fields to include for returned resources of type gameCenterLeaderboardSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetReleasesResponse List of GameCenterLeaderboardSetReleases
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetsReleasesGetToManyRelated(
        id: string,
        filterLive?: Array<string>,
        filterGameCenterDetail?: Array<string>,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        fieldsGameCenterDetails?: Array<'arcadeEnabled' | 'challengeEnabled' | 'app' | 'gameCenterAppVersions' | 'gameCenterGroup' | 'gameCenterLeaderboards' | 'gameCenterLeaderboardSets' | 'gameCenterAchievements' | 'gameCenterActivities' | 'gameCenterChallenges' | 'defaultLeaderboard' | 'defaultGroupLeaderboard' | 'achievementReleases' | 'activityReleases' | 'challengeReleases' | 'leaderboardReleases' | 'leaderboardSetReleases' | 'challengesMinimumPlatformVersions'>,
        fieldsGameCenterLeaderboardSets?: Array<'referenceName' | 'vendorIdentifier' | 'gameCenterDetail' | 'gameCenterGroup' | 'groupLeaderboardSet' | 'localizations' | 'gameCenterLeaderboards' | 'releases'>,
        limit?: number,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
    ): CancelablePromise<GameCenterLeaderboardSetReleasesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSets/{id}/releases',
            path: {
                'id': id,
            },
            query: {
                'filter[live]': filterLive,
                'filter[gameCenterDetail]': filterGameCenterDetail,
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
}
