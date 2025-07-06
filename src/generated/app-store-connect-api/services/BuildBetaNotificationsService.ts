/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildBetaNotificationCreateRequest } from '../models/BuildBetaNotificationCreateRequest';
import type { BuildBetaNotificationResponse } from '../models/BuildBetaNotificationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BuildBetaNotificationsService {
    /**
     * @param requestBody BuildBetaNotification representation
     * @returns BuildBetaNotificationResponse Single BuildBetaNotification
     * @throws ApiError
     */
    public static buildBetaNotificationsCreateInstance(
        requestBody: BuildBetaNotificationCreateRequest,
    ): CancelablePromise<BuildBetaNotificationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/buildBetaNotifications',
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
