/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardSetReleaseCreateRequest } from '../models/GameCenterLeaderboardSetReleaseCreateRequest';
import type { GameCenterLeaderboardSetReleaseResponse } from '../models/GameCenterLeaderboardSetReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardSetReleasesService {
    /**
     * @param requestBody GameCenterLeaderboardSetRelease representation
     * @returns GameCenterLeaderboardSetReleaseResponse Single GameCenterLeaderboardSetRelease
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetReleasesCreateInstance(
        requestBody: GameCenterLeaderboardSetReleaseCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardSetReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardSetReleases',
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
     * @param fieldsGameCenterLeaderboardSetReleases the fields to include for returned resources of type gameCenterLeaderboardSetReleases
     * @param include comma-separated list of relationships to include
     * @returns GameCenterLeaderboardSetReleaseResponse Single GameCenterLeaderboardSetRelease
     * @throws ApiError
     */
    public static gameCenterLeaderboardSetReleasesGetInstance(
        id: string,
        fieldsGameCenterLeaderboardSetReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
        include?: Array<'gameCenterDetail' | 'gameCenterLeaderboardSet'>,
    ): CancelablePromise<GameCenterLeaderboardSetReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterLeaderboardSetReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterLeaderboardSetReleases]': fieldsGameCenterLeaderboardSetReleases,
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
    public static gameCenterLeaderboardSetReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterLeaderboardSetReleases/{id}',
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
