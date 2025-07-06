/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardReleaseCreateRequest } from '../models/GameCenterLeaderboardReleaseCreateRequest';
import type { GameCenterLeaderboardReleaseResponse } from '../models/GameCenterLeaderboardReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardReleasesService {
    /**
     * @param requestBody GameCenterLeaderboardRelease representation
     * @returns GameCenterLeaderboardReleaseResponse Single GameCenterLeaderboardRelease
     * @throws ApiError
     */
    public static gameCenterLeaderboardReleasesCreateInstance(
        requestBody: GameCenterLeaderboardReleaseCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardReleases',
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
     * @param fieldsGameCenterLeaderboardReleases the fields to include for returned resources of type gameCenterLeaderboardReleases
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardReleaseResponse Single GameCenterLeaderboardRelease
     * @throws ApiError
     */
    public static gameCenterLeaderboardReleasesGetInstance(
        id: string,
        fieldsGameCenterLeaderboardReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboard'>,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboard'>,
    ): CancelablePromise<GameCenterLeaderboardReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardReleases]': fieldsGameCenterLeaderboardReleases,
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
     * @returns void
     * @throws ApiError
     */
    public static gameCenterLeaderboardReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardReleases/{id}',
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
}
