/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityVersionReleaseCreateRequest } from '../models/GameCenterActivityVersionReleaseCreateRequest';
import type { GameCenterActivityVersionReleaseResponse } from '../models/GameCenterActivityVersionReleaseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterActivityVersionReleasesService {
    /**
     * @param requestBody GameCenterActivityVersionRelease representation
     * @returns GameCenterActivityVersionReleaseResponse Single GameCenterActivityVersionRelease
     * @throws ApiError
     */
    public static gameCenterActivityVersionReleasesCreateInstance(
        requestBody: GameCenterActivityVersionReleaseCreateRequest,
    ): CancelablePromise<GameCenterActivityVersionReleaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterActivityVersionReleases',
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
     * @param fieldsGameCenterActivityVersionReleases the fields to include for returned resources of type gameCenterActivityVersionReleases
     * @param include comma-separated list of relationships to include
     * @returns GameCenterActivityVersionReleaseResponse Single GameCenterActivityVersionRelease
     * @throws ApiError
     */
    public static gameCenterActivityVersionReleasesGetInstance(
        id: string,
        fieldsGameCenterActivityVersionReleases?: Array<'version'>,
        include?: Array<'version'>,
    ): CancelablePromise<GameCenterActivityVersionReleaseResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterActivityVersionReleases/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterActivityVersionReleases]': fieldsGameCenterActivityVersionReleases,
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
    public static gameCenterActivityVersionReleasesDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterActivityVersionReleases/{id}',
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
