/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeVersionReleaseCreateRequest } from '../models/GameCenterChallengeVersionReleaseCreateRequest';
import type { GameCenterChallengeVersionReleaseResponse } from '../models/GameCenterChallengeVersionReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterChallengeVersionReleasesService {
    /**
     * @param requestBody GameCenterChallengeVersionRelease representation
     * @returns GameCenterChallengeVersionReleaseResponse Single GameCenterChallengeVersionRelease
     * @throws ApiError
     */
    public static gameCenterChallengeVersionReleasesCreateInstance(
        requestBody: GameCenterChallengeVersionReleaseCreateRequest,
    ): CancelablePromise<GameCenterChallengeVersionReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterChallengeVersionReleases',
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
     * @param fieldsGameCenterChallengeVersionReleases the fields to include for returned resources of type gameCenterChallengeVersionReleases
     * @param include comma-separated list of relationships to include
     * @returns GameCenterChallengeVersionReleaseResponse Single GameCenterChallengeVersionRelease
     * @throws ApiError
     */
    public static gameCenterChallengeVersionReleasesGetInstance(
        id: string,
        fieldsGameCenterChallengeVersionReleases?: Array<'version'>,
        include?: Array<'version'>,
    ): CancelablePromise<GameCenterChallengeVersionReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterChallengeVersionReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterChallengeVersionReleases]': fieldsGameCenterChallengeVersionReleases,
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
    public static gameCenterChallengeVersionReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterChallengeVersionReleases/{id}',
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
