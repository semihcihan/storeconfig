/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardEntrySubmissionCreateRequest } from '../models/GameCenterLeaderboardEntrySubmissionCreateRequest';
import type { GameCenterLeaderboardEntrySubmissionResponse } from '../models/GameCenterLeaderboardEntrySubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterLeaderboardEntrySubmissionsService {
    /**
     * @param requestBody GameCenterLeaderboardEntrySubmission representation
     * @returns GameCenterLeaderboardEntrySubmissionResponse Single GameCenterLeaderboardEntrySubmission
     * @throws ApiError
     */
    public static gameCenterLeaderboardEntrySubmissionsCreateInstance(
        requestBody: GameCenterLeaderboardEntrySubmissionCreateRequest,
    ): CancelablePromise<GameCenterLeaderboardEntrySubmissionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterLeaderboardEntrySubmissions',
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
