/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievementReleaseCreateRequest } from '../models/GameCenterAchievementReleaseCreateRequest';
import type { GameCenterAchievementReleaseResponse } from '../models/GameCenterAchievementReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterAchievementReleasesService {
    /**
     * @param requestBody GameCenterAchievementRelease representation
     * @returns GameCenterAchievementReleaseResponse Single GameCenterAchievementRelease
     * @throws ApiError
     */
    public static gameCenterAchievementReleasesCreateInstance(
        requestBody: GameCenterAchievementReleaseCreateRequest,
    ): CancelablePromise<GameCenterAchievementReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterAchievementReleases',
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
     * @param fieldsGameCenterAchievementReleases the fields to include for returned resources of type gameCenterAchievementReleases
     * @param include comma-separated list of relationships to include
     * @returns GameCenterAchievementReleaseResponse Single GameCenterAchievementRelease
     * @throws ApiError
     */
    public static gameCenterAchievementReleasesGetInstance(
        id: string,
        fieldsGameCenterAchievementReleases?: Array<'live' | 'gameCenterDetail' | 'gameCenterAchievement'>,
        include?: Array<'gameCenterDetail' | 'gameCenterAchievement'>,
    ): CancelablePromise<GameCenterAchievementReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterAchievementReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterAchievementReleases]': fieldsGameCenterAchievementReleases,
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
    public static gameCenterAchievementReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterAchievementReleases/{id}',
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
