/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeCreateRequest } from '../models/GameCenterChallengeCreateRequest';
import type { GameCenterChallengeLeaderboardLinkageRequest } from '../models/GameCenterChallengeLeaderboardLinkageRequest';
import type { GameCenterChallengeResponse } from '../models/GameCenterChallengeResponse';
import type { GameCenterChallengeUpdateRequest } from '../models/GameCenterChallengeUpdateRequest';
import type { GameCenterChallengeVersionsLinkagesResponse } from '../models/GameCenterChallengeVersionsLinkagesResponse';
import type { GameCenterChallengeVersionsResponse } from '../models/GameCenterChallengeVersionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterChallengesService {
    /**
     * @param requestBody GameCenterChallenge representation
     * @returns GameCenterChallengeResponse Single GameCenterChallenge
     * @throws ApiError
     */
    public static gameCenterChallengesCreateInstance(
        requestBody: GameCenterChallengeCreateRequest,
    ): CancelablePromise<GameCenterChallengeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterChallenges',
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
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param include comma-separated list of relationships to include
     * @param limitVersions maximum number of related versions returned (when they are included)
     * @returns GameCenterChallengeResponse Single GameCenterChallenge
     * @throws ApiError
     */
    public static gameCenterChallengesGetInstance(
        id: string,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        include?: Array<'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        limitVersions?: number,
    ): CancelablePromise<GameCenterChallengeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallenges/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
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
     * @param requestBody GameCenterChallenge representation
     * @returns GameCenterChallengeResponse Single GameCenterChallenge
     * @throws ApiError
     */
    public static gameCenterChallengesUpdateInstance(
        id: string,
        requestBody: GameCenterChallengeUpdateRequest,
    ): CancelablePromise<GameCenterChallengeResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterChallenges/{id}',
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
    public static gameCenterChallengesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterChallenges/{id}',
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
    public static gameCenterChallengesLeaderboardUpdateToOneRelationship(
        id: string,
        requestBody: GameCenterChallengeLeaderboardLinkageRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterChallenges/{id}/relationships/leaderboard',
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
     * @returns GameCenterChallengeVersionsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterChallengesVersionsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterChallengeVersionsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallenges/{id}/relationships/versions',
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
     * @param fieldsGameCenterChallengeVersions the fields to include for returned resources of type gameCenterChallengeVersions
     * @param fieldsGameCenterChallenges the fields to include for returned resources of type gameCenterChallenges
     * @param fieldsGameCenterChallengeLocalizations the fields to include for returned resources of type gameCenterChallengeLocalizations
     * @param fieldsGameCenterChallengeVersionReleases the fields to include for returned resources of type gameCenterChallengeVersionReleases
     * @param fieldsGameCenterChallengeImages the fields to include for returned resources of type gameCenterChallengeImages
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitLocalizations maximum number of related localizations returned (when they are included)
     * @param limitReleases maximum number of related releases returned (when they are included)
     * @returns GameCenterChallengeVersionsResponse List of GameCenterChallengeVersions
     * @throws ApiError
     */
    public static gameCenterChallengesVersionsGetToManyRelated(
        id: string,
        fieldsGameCenterChallengeVersions?: Array<'version' | 'state' | 'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        fieldsGameCenterChallenges?: Array<'referenceName' | 'vendorIdentifier' | 'allowedDurations' | 'archived' | 'challengeType' | 'repeatable' | 'gameCenterDetail' | 'gameCenterGroup' | 'versions' | 'leaderboard'>,
        fieldsGameCenterChallengeLocalizations?: Array<'locale' | 'name' | 'description' | 'version' | 'image'>,
        fieldsGameCenterChallengeVersionReleases?: Array<'version'>,
        fieldsGameCenterChallengeImages?: Array<'fileSize' | 'fileName' | 'imageAsset' | 'uploadOperations' | 'assetDeliveryState'>,
        limit?: number,
        include?: Array<'challenge' | 'localizations' | 'releases' | 'defaultImage'>,
        limitLocalizations?: number,
        limitReleases?: number,
    ): CancelablePromise<GameCenterChallengeVersionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallenges/{id}/versions',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeVersions]': fieldsGameCenterChallengeVersions,
                'fields[gameCenterChallenges]': fieldsGameCenterChallenges,
                'fields[gameCenterChallengeLocalizations]': fieldsGameCenterChallengeLocalizations,
                'fields[gameCenterChallengeVersionReleases]': fieldsGameCenterChallengeVersionReleases,
                'fields[gameCenterChallengeImages]': fieldsGameCenterChallengeImages,
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
