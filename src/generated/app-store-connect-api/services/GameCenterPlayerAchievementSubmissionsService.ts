/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterPlayerAchievementSubmissionCreateRequest } from '../models/GameCenterPlayerAchievementSubmissionCreateRequest';
import type { GameCenterPlayerAchievementSubmissionResponse } from '../models/GameCenterPlayerAchievementSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterPlayerAchievementSubmissionsService {
    /**
     * @param requestBody GameCenterPlayerAchievementSubmission representation
     * @returns GameCenterPlayerAchievementSubmissionResponse Single GameCenterPlayerAchievementSubmission
     * @throws ApiError
     */
    public static gameCenterPlayerAchievementSubmissionsCreateInstance(
        requestBody: GameCenterPlayerAchievementSubmissionCreateRequest,
    ): CancelablePromise<GameCenterPlayerAchievementSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterPlayerAchievementSubmissions',
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
