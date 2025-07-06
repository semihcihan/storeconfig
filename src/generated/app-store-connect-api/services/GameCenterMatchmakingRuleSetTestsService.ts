/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingRuleSetTestCreateRequest } from '../models/GameCenterMatchmakingRuleSetTestCreateRequest';
import type { GameCenterMatchmakingRuleSetTestResponse } from '../models/GameCenterMatchmakingRuleSetTestResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterMatchmakingRuleSetTestsService {
    /**
     * @param requestBody GameCenterMatchmakingRuleSetTest representation
     * @returns GameCenterMatchmakingRuleSetTestResponse Single GameCenterMatchmakingRuleSetTest
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetTestsCreateInstance(
        requestBody: GameCenterMatchmakingRuleSetTestCreateRequest,
    ): CancelablePromise<GameCenterMatchmakingRuleSetTestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterMatchmakingRuleSetTests',
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
}
