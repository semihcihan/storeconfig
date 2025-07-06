/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingTeamCreateRequest } from '../models/GameCenterMatchmakingTeamCreateRequest';
import type { GameCenterMatchmakingTeamResponse } from '../models/GameCenterMatchmakingTeamResponse';
import type { GameCenterMatchmakingTeamUpdateRequest } from '../models/GameCenterMatchmakingTeamUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterMatchmakingTeamsService {
    /**
     * @param requestBody GameCenterMatchmakingTeam representation
     * @returns GameCenterMatchmakingTeamResponse Single GameCenterMatchmakingTeam
     * @throws ApiError
     */
    public static gameCenterMatchmakingTeamsCreateInstance(
        requestBody: GameCenterMatchmakingTeamCreateRequest,
    ): CancelablePromise<GameCenterMatchmakingTeamResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterMatchmakingTeams',
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
     * @param requestBody GameCenterMatchmakingTeam representation
     * @returns GameCenterMatchmakingTeamResponse Single GameCenterMatchmakingTeam
     * @throws ApiError
     */
    public static gameCenterMatchmakingTeamsUpdateInstance(
        id: string,
        requestBody: GameCenterMatchmakingTeamUpdateRequest,
    ): CancelablePromise<GameCenterMatchmakingTeamResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterMatchmakingTeams/{id}',
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
    public static gameCenterMatchmakingTeamsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterMatchmakingTeams/{id}',
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
